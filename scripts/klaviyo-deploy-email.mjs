#!/usr/bin/env node
// Ergebnismail aktualisieren, ohne den Flow neu anzulegen.
//
//   node scripts/klaviyo-deploy-email.mjs [--flow UvLZtY] [--template TXmtwn] [--live]
//
// Hintergrund: Klaviyo klont beim Anlegen eines Flows das Template. Der Klon
// haengt am Flow und ist ueber /api/templates nicht erreichbar (404), ein PATCH
// auf das Original wirkt also nicht rueckwirkend. Der Ausweg ist ein PATCH auf
// die flow-action mit template_id des gepflegten Templates: Klaviyo klont dann
// erneut, diesmal vom aktuellen Stand.
//
// Ablauf: HTML -> Template TXmtwn -> flow-action neu verknuepfen -> pruefen.
// Scopes: templates:write, flows:write. (metrics:read braucht nur die Statistik.)

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REVISION = '2026-07-15';
const args = process.argv.slice(2);
const arg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i > -1 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d;
};
const FLOW_ID = arg('flow', 'UvLZtY');
const TEMPLATE_ID = arg('template', 'TXmtwn');
const GO_LIVE = args.includes('--live');
const HTML_FILE = path.join(import.meta.dirname, 'klaviyo-email.html');

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
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${res.status} ${json?.errors?.[0]?.detail || text.slice(0, 200)}`);
  return json;
}

const PLAIN = `Deine Box-Empfehlung: {{ person.quiz_result_title|default:'Deine Box' }}

Preis: {{ person.quiz_box_price|default:'84,90EUR' }}
Produkte drin: {{ person.quiz_box_items|default:'19-25' }}
Warenwert: {{ person.quiz_box_wert|default:'ueber 120EUR' }}

{{ person.quiz_result_summary|default:'Deine Antworten im Box-Test zeigen, welche Groesse dir den hoechsten Warenwert bringt.' }}

Meine Box sichern: {{ person.quiz_result_url|default:'https://try.brustbizeps.de/mystery-box-summer/' }}

Abmelden: {% unsubscribe_link %}
{{ organization.name }}, {{ organization.full_address }}
`;

async function main() {
  const html = fs.readFileSync(HTML_FILE, 'utf8');
  console.log(`HTML aus ${path.relative(process.cwd(), HTML_FILE)} (${html.length} Zeichen)`);

  // 1. gepflegtes Template aktualisieren
  await api(`https://a.klaviyo.com/api/templates/${TEMPLATE_ID}`, 'PATCH', {
    data: { type: 'template', id: TEMPLATE_ID, attributes: { html, text: PLAIN } },
  });
  console.log(`Template ${TEMPLATE_ID} aktualisiert.`);

  // 2. flow-action des Flows finden
  const actions = await api(`https://a.klaviyo.com/api/flows/${FLOW_ID}/flow-actions`);
  const action = actions.data?.[0];
  if (!action) throw new Error(`Flow ${FLOW_ID} hat keine Aktion.`);

  // 3. neu verknuepfen, damit Klaviyo vom aktuellen Stand klont
  const full = await api(`https://a.klaviyo.com/api/flow-actions/${action.id}`);
  const definition = full.data.attributes.definition;
  definition.data.message.template_id = TEMPLATE_ID;
  const patched = await api(`https://a.klaviyo.com/api/flow-actions/${action.id}`, 'PATCH', {
    data: { type: 'flow-action', id: action.id, attributes: { definition } },
  });
  console.log(`Flow-Aktion ${action.id} neu verknuepft.`);

  // 4. gegenpruefen, dass im Flow wirklich das neue HTML haengt. Die template_id
  //    aus der PATCH-Antwort hinkt hinterher, verlaesslich ist nur diese Abfrage.
  const msgId = patched.data.attributes.definition.data.message.id;
  const live = await api(`https://a.klaviyo.com/api/flow-messages/${msgId}/template`);
  const liveHtml = live.data?.attributes?.html || '';
  console.log(`Frischer Klon im Flow: ${live.data?.id} (${live.data?.attributes?.created})`);
  const marker = ['logo-white', 'quiz_box_image', 'FF2E7E'];
  const missing = marker.filter((m) => !liveHtml.includes(m));
  if (missing.length) throw new Error(`Klon unvollstaendig, fehlt: ${missing.join(', ')}`);
  console.log(`Gegenprobe ok (${liveHtml.length} Zeichen im Flow).`);

  if (GO_LIVE) {
    await api(`https://a.klaviyo.com/api/flows/${FLOW_ID}`, 'PATCH', {
      data: { type: 'flow', id: FLOW_ID, attributes: { status: 'live' } },
    });
    console.log(`Flow ${FLOW_ID} auf live gesetzt.`);
  } else {
    const f = await api(`https://a.klaviyo.com/api/flows/${FLOW_ID}`);
    console.log(`Flow-Status: ${f.data.attributes.status}. Mit --live scharfschalten.`);
  }
}

main().catch((e) => {
  console.error('Fehler:', e.message);
  process.exit(1);
});
