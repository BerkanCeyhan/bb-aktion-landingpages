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
const FROM_EMAIL = 'shop@brustbizeps.de';
const FROM_LABEL = 'BrustBizeps';

// Muss ein echter, in Shopify angelegter Code sein. Solange der Platzhalter
// steht, weigert sich das Skript, Mail 2 zu schreiben: eine Rabattmail ohne
// gueltigen Code ist schlimmer als keine Rabattmail.
const DISCOUNT_CODE = '__RABATTCODE__';

const args = process.argv.slice(2);
const WITH_FLOW = args.includes('--flow');

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
  const attributes = { name, editor_type: 'CODE', html: htmlBody, text: textBody };
  if (existing) {
    await api(`https://a.klaviyo.com/api/templates/${existing.id}/`, 'PATCH',
      { data: { type: 'template', id: existing.id, attributes } });
    console.log(`  Template "${name}" aktualisiert: ${existing.id}`);
    return existing.id;
  }
  const created = await api('https://a.klaviyo.com/api/templates/', 'POST',
    { data: { type: 'template', attributes } });
  console.log(`  Template "${name}" angelegt: ${created.data.id}`);
  return created.data.id;
}

const TEXT_1 = `Deine ${'{{ person.quiz_result_title|default:"Mystery Box" }}'} wartet auf dich.

Du zahlst {{ person.quiz_box_price|default:"84,90EUR" }} und bekommst
{{ person.quiz_box_items|default:"19-25" }} verifizierte Bestseller mit einem
Warenwert von {{ person.quiz_box_wert|default:"ueber 120EUR" }}.

Zur Box: {{ person.quiz_result_url|default:'https://try.brustbizeps.de/mystery-box-summer/' }}

Die Box wird zufaellig gepackt, und nicht jeder Artikel wird dein Favorit.
Genau deshalb ist der Warenwert so gerechnet, dass sie sich auch dann lohnt.

Abmelden: {% unsubscribe_link %}`;

const TEXT_2 = `Na schoen.

Wir wollen, dass du dich selbst ueberzeugst. Deshalb bekommst du 10 % auf die
XL und die M Box.

Dein Code: ${DISCOUNT_CODE}
An der Kasse eingeben. Gilt fuer die XL Box und die M Box.

XL Box: 84,90EUR statt dessen 76,41EUR, Warenwert ueber 120EUR
M Box:  59,90EUR statt dessen 53,91EUR, Warenwert ueber 90EUR

Zur Box: https://try.brustbizeps.de/mystery-box-summer/

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

async function main() {
  console.log('Templates:');
  const t1 = await upsertTemplate('Quiz Nachfass 1 – Box wartet', html('klaviyo-nachfass-1.html'), TEXT_1);

  let t2 = null;
  if (DISCOUNT_CODE === '__RABATTCODE__') {
    console.log('  Template 2 UEBERSPRUNGEN: DISCOUNT_CODE steht noch auf dem Platzhalter.');
    console.log('  Echten Shopify-Code oben im Skript eintragen, dann erneut laufen lassen.');
  } else {
    t2 = await upsertTemplate('Quiz Nachfass 2 – 10 % XL und M', html('klaviyo-nachfass-2.html'), TEXT_2);
  }

  if (!WITH_FLOW) {
    console.log('\nOhne --flow: nur Templates geschrieben, kein Flow angelegt.');
    return;
  }
  if (!t2) {
    console.log('\nFlow nicht angelegt: Mail 2 fehlt, solange kein Rabattcode gesetzt ist.');
    return;
  }

  const definition = {
    triggers: [{ type: 'list', id: LIST_ID }],
    // Nur wer der Werbung zugestimmt hat. Die Pflichteinwilligung fuer die
    // Ergebnismail reicht hier ausdruecklich nicht.
    profile_filter: {
      condition_groups: [{
        conditions: [{
          type: 'profile-property',
          property: 'quiz_newsletter_optin',
          filter: { type: 'boolean', operator: 'equals', value: true },
        }],
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
