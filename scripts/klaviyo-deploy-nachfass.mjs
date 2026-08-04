#!/usr/bin/env node
// Nachfassstrecke fuer die Quiz-Leads mit Marketing-Einwilligung.
//
//   node scripts/klaviyo-deploy-nachfass.mjs            # Templates anlegen/aktualisieren
//   node scripts/klaviyo-deploy-nachfass.mjs --flow     # zusaetzlich den Flow anlegen (Draft)
//
// Warum ein eigener Flow und nicht der bestehende:
// PATCH /api/flows/<id> aendert ausschliesslich den Status. Die Definition eines
// bestehenden Flows laesst sich per API nicht erweitern, es gibt keinen Endpunkt,
// der einem Flow eine Aktion hinzufuegt. Der bestehende Flow UvLZtY liesse sich
// also nur von Hand in der Oberflaeche verlaengern.
//
// Die Trennung ist ohnehin die sauberere Fassung: UvLZtY liefert die
// Ergebnismail an alle, die den Double-Opt-in bestaetigt haben. Diese Strecke
// geht nur an die Teilmenge mit zusaetzlicher Werbeeinwilligung
// (quiz_newsletter_optin). Zwei Einwilligungen, zwei Strecken, im Streitfall
// nachweisbar getrennt. Siehe sop/e-mail-marketing.md §1.
//
// Der Flow entsteht als DRAFT. Versand loest ein Mensch aus, siehe SOP §6.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REVISION = '2026-07-15';
const LIST_ID = 'TLMGKq';           // Quiz Funnel Leads, Double-Opt-in
const PLACED_ORDER_METRIC = 'YuqYbe'; // "Placed Order", Shopify-Integration
const FROM_EMAIL = 'shop@brustbizeps.de';
const FROM_LABEL = 'BrustBizeps';

// Muss ein echter, in Shopify angelegter Code sein. Fehlt er, weigert sich das
// Skript, Mail 2 zu schreiben: eine Rabattmail ohne gueltigen Code ist
// schlimmer als keine Rabattmail.
//
// Bewusst NICHT im Repo: bb-aktion-landingpages ist oeffentlich. Ein Code im
// Klartext waere fuer jeden auffindbar und einloesbar, und die Aktion damit
// nicht mehr auf die Empfaenger der Strecke begrenzt.
//
//   DISCOUNT_CODE=XXXXX node scripts/klaviyo-deploy-nachfass.mjs --flow
const DISCOUNT_CODE = (process.env.DISCOUNT_CODE || '').trim();

const args = process.argv.slice(2);
const WITH_FLOW = args.includes('--flow');
// Nach jeder Textaenderung noetig: der Flow haengt an Klonen, die beim Anlegen
// entstanden sind. Ein PATCH auf das Original wirkt nicht rueckwirkend, siehe
// sop/e-mail-einsammeln.md §5. --relink verknuepft die Aktionen neu, dann
// klont Klaviyo vom aktuellen Stand.
const RELINK = args.includes('--relink');
const FLOW_NAME = 'Quiz Funnel – Nachfass (Marketing-Opt-in)';

function readKey() {
  if (process.env.KLAVIYO_PRIVATE_KEY) return process.env.KLAVIYO_PRIVATE_KEY.trim();
  for (const f of [path.join(os.homedir(), '.config/klaviyo/env'), path.join(process.cwd(), '.env')]) {
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, 'utf8').match(/KLAVIYO_(?:PRIVATE_KEY|BRUSTBIZEPS)\s*=\s*(.+)/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  return null;
}

const KEY = readKey();
if (!KEY) {
  console.error('Kein Klaviyo-Key. Erwartet in KLAVIYO_PRIVATE_KEY, ~/.config/klaviyo/env oder .env.');
  console.error('  gcloud secrets versions access latest --secret=KLAVIYO_BRUSTBIZEPS --project=gsuite-agent-access');
  process.exit(1);
}

const headers = { Authorization: `Klaviyo-API-Key ${KEY}`, revision: REVISION, 'Content-Type': 'application/json' };

async function api(url, method = 'GET', body) {
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch { /* nicht-JSON durchreichen */ }
  if (!res.ok) {
    const err = json?.errors?.[0];
    throw new Error(`${res.status} ${err?.detail || text.slice(0, 400)}${err?.source?.pointer ? ` @ ${err.source.pointer}` : ''}`);
  }
  return json;
}

function html(file) {
  const p = path.join(import.meta.dirname, file);
  return fs.readFileSync(p, 'utf8').replace(/__RABATTCODE__/g, DISCOUNT_CODE);
}

// Template nach Namen suchen, sonst anlegen. Idempotent, damit wiederholte
// Laeufe keine Karteileichen erzeugen.
async function upsertTemplate(name, htmlBody, textBody) {
  const q = `https://a.klaviyo.com/api/templates/?filter=${encodeURIComponent(`equals(name,"${name}")`)}`;
  const found = await api(q);
  const existing = found?.data?.[0];
  const attributes = { name, html: htmlBody, text: textBody };
  if (existing) {
    // editor_type darf nur beim Anlegen mit. Im PATCH lehnt die API es ab.
    await api(`https://a.klaviyo.com/api/templates/${existing.id}/`, 'PATCH',
      { data: { type: 'template', id: existing.id, attributes } });
    console.log(`  Template "${name}" aktualisiert: ${existing.id}`);
    return existing.id;
  }
  const created = await api('https://a.klaviyo.com/api/templates/', 'POST',
    { data: { type: 'template', attributes: { ...attributes, editor_type: 'CODE' } } });
  console.log(`  Template "${name}" angelegt: ${created.data.id}`);
  return created.data.id;
}

const TEXT_1 = `Deine ${'{{ person.quiz_result_title|default:"Mystery Box" }}'} wartet auf dich.

Du zahlst {{ person.quiz_box_price|default:"84,90EUR" }} und bekommst
{{ person.quiz_box_items|default:"19-25" }} verifizierte Bestseller mit einem
Warenwert von {{ person.quiz_box_wert|default:"ueber 120EUR" }}.

Zur Box: https://brustbizeps.de/products/mystery-box-supplements

Die Box wird zufaellig gepackt, und nicht jeder Artikel wird dein Favorit.
Genau deshalb ist der Warenwert so gerechnet, dass sie sich auch dann lohnt.

Abmelden: {% unsubscribe_link %}`;

const TEXT_2 = `Na schoen.

Wir wollen, dass du dich selbst ueberzeugst. Deshalb bekommst du 10 % auf die
XL und die M Box.

Dein Code: ${DISCOUNT_CODE}
Gilt fuer die XL Box und die M Box.

XL Box: 84,90EUR statt dessen 76,41EUR, Warenwert ueber 120EUR
M Box:  59,90EUR statt dessen 53,91EUR, Warenwert ueber 90EUR

Zur Box mit eingeloestem Code:
https://brustbizeps.de/discount/${DISCOUNT_CODE}?redirect=%2Fproducts%2Fmystery-box-supplements

Abmelden: {% unsubscribe_link %}`;

function message(name, subject, preview, templateId, utmCampaign) {
  return {
    from_email: FROM_EMAIL,
    from_label: FROM_LABEL,
    reply_to_email: FROM_EMAIL,
    cc_email: null,
    bcc_email: null,
    subject_line: subject,
    preview_text: preview,
    template_id: templateId,
    // Verhindert, dass jemand dieselbe Strecke bei einem zweiten Quizdurchlauf
    // ein zweites Mal bekommt.
    smart_sending_enabled: true,
    transactional: false,
    add_tracking_params: true,
    custom_tracking_params: [
      { param: 'utm_source', value: 'klaviyo' },
      { param: 'utm_medium', value: 'email' },
      { param: 'utm_campaign', value: utmCampaign },
    ],
    additional_filters: null,
    name,
  };
}

// Die Sende-Aktionen des Flows wieder an die gepflegten Originale haengen.
// Reihenfolge zaehlt: die erste Sende-Aktion im Flow ist Mail 1.
async function relink(templateIds) {
  const flows = await api(`https://a.klaviyo.com/api/flows/?filter=${encodeURIComponent(`equals(name,"${FLOW_NAME}")`)}`);
  const flow = flows?.data?.[0];
  if (!flow) throw new Error(`Kein Flow namens "${FLOW_NAME}". Erst mit --flow anlegen.`);
  console.log(`\nFlow ${flow.id} (${flow.attributes.status}):`);

  const actions = await api(`https://a.klaviyo.com/api/flows/${flow.id}/flow-actions/`);
  const sends = actions.data.filter((a) => a.attributes.definition.type === 'send-email');
  if (sends.length !== templateIds.length) {
    throw new Error(`Flow hat ${sends.length} Sende-Aktionen, erwartet ${templateIds.length}.`);
  }

  for (let i = 0; i < sends.length; i++) {
    const full = await api(`https://a.klaviyo.com/api/flow-actions/${sends[i].id}`);
    const definition = full.data.attributes.definition;
    definition.data.message.template_id = templateIds[i];
    const patched = await api(`https://a.klaviyo.com/api/flow-actions/${sends[i].id}`, 'PATCH', {
      data: { type: 'flow-action', id: sends[i].id, attributes: { definition } },
    });
    // Nur diese Abfrage ist verlaesslich; die template_id aus der PATCH-Antwort
    // hinkt hinterher.
    const msgId = patched.data.attributes.definition.data.message.id;
    const live = await api(`https://a.klaviyo.com/api/flow-messages/${msgId}/template`);
    const liveHtml = live.data?.attributes?.html || '';
    const marker = i === 0
      ? ['explosion.png', '/products/mystery-box-supplements']
      : ['explosion.png', '/discount/', DISCOUNT_CODE];
    const missing = marker.filter((m) => !liveHtml.includes(m));
    if (missing.length) throw new Error(`Klon von Mail ${i + 1} unvollstaendig, fehlt: ${missing.join(', ')}`);
    console.log(`  Mail ${i + 1}: frischer Klon ${live.data.id}, Gegenprobe ok (${liveHtml.length} Zeichen).`);
  }
  console.log(`  Status unveraendert: ${flow.attributes.status}.`);
}

async function main() {
  console.log('Templates:');
  const t1 = await upsertTemplate('Quiz Nachfass 1 – Box wartet', html('klaviyo-nachfass-1.html'), TEXT_1);

  let t2 = null;
  if (!DISCOUNT_CODE) {
    console.log('  Template 2 UEBERSPRUNGEN: kein DISCOUNT_CODE in der Umgebung.');
    console.log('  Aufruf: DISCOUNT_CODE=XXXXX node scripts/klaviyo-deploy-nachfass.mjs --flow');
  } else {
    t2 = await upsertTemplate('Quiz Nachfass 2 – 10 % XL und M', html('klaviyo-nachfass-2.html'), TEXT_2);
  }

  if (RELINK) {
    if (!t2) throw new Error('--relink braucht beide Templates, also auch DISCOUNT_CODE.');
    await relink([t1, t2]);
    return;
  }

  if (!WITH_FLOW) {
    console.log('\nOhne --flow: nur Templates geschrieben, kein Flow angelegt.');
    return;
  }
  if (!t2) {
    console.log('\nFlow nicht angelegt: Mail 2 fehlt, solange kein Rabattcode gesetzt ist.');
    return;
  }

  // Die Definition eines bestehenden Flows laesst sich per API nicht aendern
  // (PATCH kann nur den Status). Ein Entwurf mit demselben Namen wird deshalb
  // vorher entfernt, sonst sammeln sich Karteileichen. Ein LIVE-Flow wird nie
  // angefasst: dort haengt Sendehistorie dran.
  const existingFlows = await api(`https://a.klaviyo.com/api/flows/?filter=${encodeURIComponent(`equals(name,"${FLOW_NAME}")`)}`);
  const prior = existingFlows?.data?.[0];
  if (prior) {
    if (prior.attributes.status !== 'draft') {
      throw new Error(`Flow ${prior.id} steht auf "${prior.attributes.status}", nicht auf draft. Wird nicht angefasst. Erst von Hand in Klaviyo pausieren oder umbenennen.`);
    }
    await api(`https://a.klaviyo.com/api/flows/${prior.id}/`, 'DELETE');
    console.log(`\nAlten Entwurf ${prior.id} entfernt.`);
  }

  const definition = {
    triggers: [{ type: 'list', id: LIST_ID }],
    // Nur wer der Werbung zugestimmt hat. Die Pflichteinwilligung fuer die
    // Ergebnismail reicht hier ausdruecklich nicht.
    // Beide Bedingungen in EINER Gruppe, damit sie mit UND verknuepft sind.
    // Der Flow-Filter wird vor jeder Aktion neu ausgewertet, nicht nur beim
    // Eintritt: wer nach Mail 1 kauft, bekommt Mail 2 nicht mehr.
    profile_filter: {
      condition_groups: [{
        conditions: [
          {
            type: 'profile-property',
            // Eigene Eigenschaften brauchen genau diese Klammerform, ein blosser
            // Name wird mit 400 abgelehnt.
            property: "properties['quiz_newsletter_optin']",
            filter: { type: 'boolean', operator: 'equals', value: true },
          },
          {
            // Wer seit dem Eintritt in die Strecke gekauft hat, bekommt sie
            // nicht weiter. "flow-start" statt "alltime" bewusst: ein Kunde,
            // der vor Monaten bestellt hat und jetzt das Quiz macht, ohne zu
            // kaufen, soll angeschrieben werden. Genau dieselbe Form nutzt der
            // bestehende Flow "Abgebrochener Warenkorb" im selben Konto.
            type: 'profile-metric',
            metric_id: PLACED_ORDER_METRIC,
            measurement: 'count',
            measurement_filter: { type: 'numeric', operator: 'equals', value: 0 },
            timeframe_filter: { type: 'date', operator: 'flow-start' },
            metric_filters: null,
          },
        ],
      }],
    },
    actions: [
      {
        temporary_id: 'delay-1',
        type: 'time-delay',
        links: { next: 'mail-1' },
        data: { unit: 'days', value: 1, secondary_value: 0, timezone: 'profile' },
      },
      {
        temporary_id: 'mail-1',
        type: 'send-email',
        links: { next: 'delay-2' },
        data: {
          message: message('Nachfass 1 – Box wartet', 'Deine Mystery Box wartet auf dich',
            'Deine Größe ist auf der Seite schon ausgewählt.', t1, 'quiz-mysterybox-nachfass-1'),
          status: 'draft',
        },
      },
      {
        temporary_id: 'delay-2',
        type: 'time-delay',
        links: { next: 'mail-2' },
        data: { unit: 'days', value: 2, secondary_value: 0, timezone: 'profile' },
      },
      {
        temporary_id: 'mail-2',
        type: 'send-email',
        links: { next: null },
        data: {
          message: message('Nachfass 2 – 10 % XL und M', 'Na schön. Hier sind 10 % auf die XL und die M Box',
            'Der Code gilt für die beiden größten Boxen.', t2, 'quiz-mysterybox-nachfass-2'),
          status: 'draft',
        },
      },
    ],
    entry_action_id: 'delay-1',
  };

  console.log('\nFlow:');
  const created = await api(
    'https://a.klaviyo.com/api/flows/?additional-fields%5Bflow%5D=definition', 'POST',
    { data: { type: 'flow', attributes: { name: 'Quiz Funnel – Nachfass (Marketing-Opt-in)', definition } } });

  console.log(`  angelegt: ${created.data.id}  Status: ${created.data.attributes.status}`);
  console.log(`  https://www.klaviyo.com/flow/${created.data.id}/edit`);
  console.log('\n  Der Flow ist ein Entwurf. Scharfschalten von Hand in Klaviyo.');
}

main().catch((e) => { console.error('FEHLER:', e.message); process.exit(1); });
