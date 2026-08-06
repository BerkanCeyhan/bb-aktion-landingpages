#!/usr/bin/env node
// Einmalige Nachfassstrecke fuer die Leute, die schon vor dem Livegang von
// XZbYcm auf der Liste standen.
//
//   node scripts/klaviyo-nachzuegler.mjs              # Liste + Flow anlegen, nichts senden
//   node scripts/klaviyo-nachzuegler.mjs --live       # Flow scharf schalten
//   node scripts/klaviyo-nachzuegler.mjs --send       # Profile eintragen -> loest den Versand aus
//
// Warum ueberhaupt eine zweite Strecke:
// Ein Klaviyo-Flow loest nur bei NEUEN Listeneintritten aus. Wer beim Livegang
// schon auf TLMGKq stand, wird von XZbYcm nie erfasst, und nachtraeglich
// einspeisen kann man niemanden. Eine Kampagne waere der andere Weg, aber der
// API-Schluessel hat bewusst keine Schreibrechte auf Kampagnen und Segmente
// (sop/e-mail-einsammeln.md §6).
//
// Deshalb: eigene Liste, eigener Flow, und der Eintrag in die Liste IST der
// Ausloeser. Damit bleibt der Versand ein bewusster, einzelner Befehl.
//
// Kein Ueberschneidungsrisiko mit XZbYcm: dessen Trigger ist TLMGKq, und dort
// stehen diese Profile laengst. Ein bestehender Eintrag loest nicht erneut aus.
//
// Die Einwilligung ist dieselbe wie fuer XZbYcm (quiz_newsletter_optin plus
// bestaetigter Double-Opt-in). Eine interne Verteilliste aendert daran nichts.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REVISION = '2026-07-15';
const SOURCE_LIST = 'TLMGKq';         // Quiz Funnel Leads, Double-Opt-in
const PLACED_ORDER_METRIC = 'YuqYbe';
const FROM_EMAIL = 'shop@brustbizeps.de';
const FROM_LABEL = 'BrustBizeps';
const LIST_NAME = 'Quiz Nachfass Nachzuegler (einmalig)';
const FLOW_NAME = 'Quiz Funnel – Nachfass Nachzuegler (einmalig)';
const TPL_1 = 'Quiz Nachfass 1 – Box wartet';
const TPL_2 = 'Quiz Nachfass 2 – 10 % XL und M';

const args = process.argv.slice(2);
const GO_LIVE = args.includes('--live');
const SEND = args.includes('--send');

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
if (!KEY) { console.error('Kein Klaviyo-Key.'); process.exit(1); }

const headers = { Authorization: `Klaviyo-API-Key ${KEY}`, revision: REVISION, 'Content-Type': 'application/json' };

async function api(url, method = 'GET', body) {
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch { /* leerer Body bei 204 */ }
  if (!res.ok) {
    const err = json?.errors?.[0];
    throw new Error(`${res.status} ${err?.detail || text.slice(0, 300)}${err?.source?.pointer ? ` @ ${err.source.pointer}` : ''}`);
  }
  return json;
}

async function findByName(resource, name) {
  const q = `https://a.klaviyo.com/api/${resource}/?filter=${encodeURIComponent(`equals(name,"${name}")`)}`;
  return (await api(q))?.data?.[0] || null;
}

// Livegang der Hauptstrecke XZbYcm. Wer NACH diesem Zeitpunkt auf die
// Quelliste kam, laeuft dort bereits: der wuerde beide Mails ein zweites Mal
// bekommen. Genau diese Grenze trennt "Nachzuegler" von "laeuft schon".
const MAIN_FLOW_LIVE_AT = '2026-08-04T21:30:52+00:00';

// Wer soll angeschrieben werden: bestaetigtes Profil auf der Quelliste, mit
// Werbeeinwilligung, und schon vor dem Livegang der Hauptstrecke dabei.
// Kaeufer filtert der Flow selbst heraus, damit die Regel an einer Stelle
// steht und nicht an zweien.
async function candidates() {
  let url = `https://a.klaviyo.com/api/lists/${SOURCE_LIST}/profiles/`;
  const out = [];
  const skipped = [];
  const cutoff = Date.parse(MAIN_FLOW_LIVE_AT);
  while (url) {
    const d = await api(url);
    for (const p of d.data) {
      if ((p.attributes.properties || {}).quiz_newsletter_optin !== true) continue;
      const joined = Date.parse(p.attributes.joined_group_at || 0);
      if (joined >= cutoff) { skipped.push(p.attributes.email); continue; }
      out.push({ id: p.id, email: p.attributes.email });
    }
    url = d.links?.next || null;
  }
  if (skipped.length) {
    console.log(`\n${skipped.length} uebersprungen, laeuft schon in der Hauptstrecke:`);
    for (const e of skipped) console.log(`  ${e}`);
  }
  return out;
}

function message(name, subject, preview, templateId, utmCampaign) {
  return {
    from_email: FROM_EMAIL, from_label: FROM_LABEL, reply_to_email: FROM_EMAIL,
    cc_email: null, bcc_email: null,
    subject_line: subject, preview_text: preview, template_id: templateId,
    smart_sending_enabled: true, transactional: false, add_tracking_params: true,
    custom_tracking_params: [
      { param: 'utm_source', value: 'klaviyo' },
      { param: 'utm_medium', value: 'email' },
      { param: 'utm_campaign', value: utmCampaign },
    ],
    additional_filters: null, name,
  };
}

async function main() {
  // 1. Liste
  let list = await findByName('lists', LIST_NAME);
  if (!list) {
    list = (await api('https://a.klaviyo.com/api/lists/', 'POST',
      { data: { type: 'list', attributes: { name: LIST_NAME } } })).data;
    console.log(`Liste angelegt: ${list.id}`);
  } else {
    console.log(`Liste vorhanden: ${list.id}`);
  }

  // 2. Templates, die die Hauptstrecke schon pflegt
  const t1 = await findByName('templates', TPL_1);
  const t2 = await findByName('templates', TPL_2);
  if (!t1 || !t2) throw new Error('Templates fehlen. Erst klaviyo-deploy-nachfass.mjs laufen lassen.');
  console.log(`Templates: ${t1.id}, ${t2.id}`);

  // 3. Flow
  let flow = await findByName('flows', FLOW_NAME);
  if (flow && flow.attributes.status === 'draft') {
    await api(`https://a.klaviyo.com/api/flows/${flow.id}/`, 'DELETE');
    console.log(`Alten Entwurf ${flow.id} entfernt.`);
    flow = null;
  }
  if (!flow) {
    const definition = {
      triggers: [{ type: 'list', id: list.id }],
      profile_filter: {
        condition_groups: [{
          conditions: [
            {
              type: 'profile-property',
              property: "properties['quiz_newsletter_optin']",
              filter: { type: 'boolean', operator: 'equals', value: true },
            },
            {
              // Hier "in den letzten 30 Tagen" statt "seit Flow-Start": diese
              // Leute haben das Quiz vor Tagen gemacht. Wer seitdem gekauft
              // hat, soll die Strecke nicht bekommen, und ein Kauf von vor
              // Monaten soll niemanden ausschliessen.
              type: 'profile-metric',
              metric_id: PLACED_ORDER_METRIC,
              measurement: 'count',
              measurement_filter: { type: 'numeric', operator: 'equals', value: 0 },
              timeframe_filter: { type: 'date', operator: 'in-the-last', unit: 'day', quantity: 30 },
              metric_filters: null,
            },
          ],
        }],
      },
      actions: [
        {
          // 20 Stunden, nicht eine. Zwei Gruende: Smart Sending ueberspringt
          // jeden, der in den letzten 16 Stunden schon Post bekam, und wer
          // gerade erst den Double-Opt-in bestaetigt hat, soll nicht direkt
          // die naechste Mail bekommen. Ob jemand im Fenster liegt, laesst
          // sich mit diesem Schluessel nicht pruefen (events:read fehlt),
          // also wird der Fall baulich ausgeschlossen statt gemessen.
          temporary_id: 'delay-0',
          type: 'time-delay',
          links: { next: 'mail-1' },
          data: { unit: 'hours', value: 20, secondary_value: 0, timezone: 'profile' },
        },
        {
          temporary_id: 'mail-1',
          type: 'send-email',
          links: { next: 'delay-2' },
          data: {
            message: message('Nachzuegler 1 – Box wartet', 'Deine Mystery Box wartet auf dich',
              'Deine Größe ist auf der Seite schon ausgewählt.', t1.id, 'quiz-mysterybox-nachzuegler-1'),
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
            message: message('Nachzuegler 2 – 10 % XL und M', 'Na schön. Hier sind 10 % auf die XL und die M Box',
              'Der Code gilt für die beiden größten Boxen.', t2.id, 'quiz-mysterybox-nachzuegler-2'),
            status: 'draft',
          },
        },
      ],
      entry_action_id: 'delay-0',
    };
    flow = (await api('https://a.klaviyo.com/api/flows/?additional-fields%5Bflow%5D=definition', 'POST',
      { data: { type: 'flow', attributes: { name: FLOW_NAME, definition } } })).data;
    console.log(`Flow angelegt: ${flow.id}  Status: ${flow.attributes.status}`);
  } else {
    console.log(`Flow vorhanden: ${flow.id}  Status: ${flow.attributes.status}`);
  }

  const people = await candidates();
  console.log(`\nKandidaten auf ${SOURCE_LIST} mit Werbeeinwilligung: ${people.length}`);
  for (const p of people) console.log(`  ${p.email}`);

  if (GO_LIVE) {
    const cur = await api(`https://a.klaviyo.com/api/flows/${flow.id}/`);
    if (cur.data.attributes.status !== 'live') {
      await api(`https://a.klaviyo.com/api/flows/${flow.id}/`, 'PATCH',
        { data: { type: 'flow', id: flow.id, attributes: { status: 'live' } } });
      console.log(`\nFlow ${flow.id} auf live gesetzt.`);
    } else {
      console.log(`\nFlow ${flow.id} steht bereits auf live.`);
    }
  }

  if (!SEND) {
    console.log('\nOhne --send wurde niemand eingetragen, es geht also nichts raus.');
    console.log('Reihenfolge: erst --live, dann --send. Umgekehrt passiert beim Eintragen nichts.');
    return;
  }

  const cur = await api(`https://a.klaviyo.com/api/flows/${flow.id}/`);
  if (cur.data.attributes.status !== 'live') {
    throw new Error('Flow steht nicht auf live. Eintragen wuerde niemanden ausloesen, und ein zweiter Versuch spaeter ebenfalls nicht. Erst --live.');
  }

  try {
    await api(`https://a.klaviyo.com/api/lists/${list.id}/relationships/profiles/`, 'POST',
      { data: people.map((p) => ({ type: 'profile', id: p.id })) });
    console.log(`\n${people.length} Profile eingetragen. Der Flow laeuft jetzt fuer sie an.`);
  } catch (e) {
    if (!/profiles:write/.test(e.message)) throw e;
    // Kein Defekt, sondern Absicht: der Schluessel hat bewusst keine
    // Schreibrechte auf Profile (sop/e-mail-einsammeln.md §6). Damit erzwingt
    // die Rechtevergabe, dass ein Mensch den Versand ausloest, genau wie
    // sop/e-mail-marketing.md §6 es verlangt.
    console.log('\nEintragen per API nicht moeglich: dem Schluessel fehlt profiles:write.');
    console.log('Das ist so gewollt. Der letzte Schritt gehoert an die Hand eines Menschen.\n');
    console.log('In Klaviyo, drei Klicks:');
    console.log(`  1. Lists & Segments -> "${LIST_NAME}" (${list.id}) oeffnen`);
    console.log('  2. Manage List -> Add Members -> die Adressen unten einfuegen');
    console.log('  3. Speichern. Der Flow laeuft 20 Stunden spaeter an.\n');
    console.log(people.map((p) => p.email).join('\n'));
  }
}

main().catch((e) => { console.error('FEHLER:', e.message); process.exit(1); });
