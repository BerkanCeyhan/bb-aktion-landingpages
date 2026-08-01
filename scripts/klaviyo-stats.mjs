#!/usr/bin/env node
// Kennzahlen des Quiz-Funnel-Flows holen, damit die Rückkopplungsschleife
// (SOP funnel-rueckkopplung) auch die E-Mail-Stufe sieht.
//
//   node scripts/klaviyo-stats.mjs [--tage 30] [--flow UvLZtY]
//
// Key-Suche in dieser Reihenfolge:
//   KLAVIYO_PRIVATE_KEY aus der Umgebung
//   ~/.config/klaviyo/env        (von `kb bootstrap` befüllt)
//   .env im Projekt
// Braucht die Scopes flows:read und metrics:read.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REVISION = '2026-07-15';
const args = process.argv.slice(2);
const arg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i > -1 && args[i + 1] ? args[i + 1] : d;
};
const FLOW_ID = arg('flow', 'UvLZtY');
const TAGE = Number(arg('tage', '30'));
const TIMEFRAME = TAGE <= 7 ? 'last_7_days' : TAGE <= 30 ? 'last_30_days' : 'last_90_days';

function readKey() {
  if (process.env.KLAVIYO_PRIVATE_KEY) return process.env.KLAVIYO_PRIVATE_KEY.trim();
  const candidates = [
    path.join(os.homedir(), '.config/klaviyo/env'),
    path.join(process.cwd(), '.env'),
  ];
  for (const f of candidates) {
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, 'utf8').match(/KLAVIYO_(?:PRIVATE_KEY|BRUSTBIZEPS)\s*=\s*(.+)/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  return null;
}

const KEY = readKey();
if (!KEY) {
  console.error('Kein Klaviyo-Key gefunden. Erwartet in KLAVIYO_PRIVATE_KEY, ~/.config/klaviyo/env oder .env.');
  console.error('Aus dem Secret Manager holen:');
  console.error('  gcloud secrets versions access latest --secret=KLAVIYO_BRUSTBIZEPS --project=gsuite-agent-access');
  process.exit(1);
}

const headers = {
  Authorization: `Klaviyo-API-Key ${KEY}`,
  revision: REVISION,
  'Content-Type': 'application/json',
};

async function call(url, options = {}) {
  const res = await fetch(url, { ...options, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = body?.errors?.[0]?.detail || res.statusText;
    const err = new Error(detail);
    err.status = res.status;
    throw err;
  }
  return body;
}

async function conversionMetricId() {
  // "Placed Order" ist die Umsatzmetrik des Shopify-Kontos.
  const d = await call('https://a.klaviyo.com/api/metrics');
  const list = d.data || [];
  const hit =
    list.find((m) => m.attributes?.name === 'Placed Order') ||
    list.find((m) => /placed order|bestellung/i.test(m.attributes?.name || ''));
  if (!hit) throw new Error(`Keine "Placed Order"-Metrik gefunden. Vorhanden: ${list.map((m) => m.attributes?.name).join(', ')}`);
  return hit.id;
}

const pct = (v) => (v == null ? '—' : `${(v * 100).toFixed(1)} %`);
const num = (v) => (v == null ? '—' : String(v));

async function main() {
  let metricId;
  try {
    metricId = await conversionMetricId();
  } catch (e) {
    if (e.status === 403) {
      console.error('Dem Key fehlt der Scope metrics:read. In Klaviyo ergänzen: Settings → API keys → Metrics → Read Access.');
      process.exit(2);
    }
    throw e;
  }

  const statistics = [
    'delivered', 'opens_unique', 'clicks_unique',
    'open_rate', 'click_rate', 'click_to_open_rate',
    'conversions', 'conversion_rate', 'conversion_value',
    'unsubscribes', 'spam_complaints', 'bounced',
  ];

  const report = await call('https://a.klaviyo.com/api/flow-values-reports', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        type: 'flow-values-report',
        attributes: {
          timeframe: { key: TIMEFRAME },
          conversion_metric_id: metricId,
          statistics,
          filter: `equals(flow_id,"${FLOW_ID}")`,
        },
      },
    }),
  });

  const row = report?.data?.attributes?.results?.[0];
  if (!row) {
    console.log(`Flow ${FLOW_ID}: noch keine Daten im Zeitraum ${TIMEFRAME}.`);
    console.log('Normal, solange der Flow auf Entwurf steht oder noch niemand bestätigt hat.');
    return;
  }
  const s = row.statistics || {};

  console.log(`Flow ${FLOW_ID} · ${TIMEFRAME}`);
  console.log('─'.repeat(46));
  console.log(`  zugestellt          ${num(s.delivered)}`);
  console.log(`  geoeffnet           ${num(s.opens_unique)}  (${pct(s.open_rate)})`);
  console.log(`  geklickt            ${num(s.clicks_unique)}  (${pct(s.click_rate)})`);
  console.log(`  Klick je Oeffnung   ${pct(s.click_to_open_rate)}`);
  console.log(`  Bestellungen        ${num(s.conversions)}  (${pct(s.conversion_rate)})`);
  console.log(`  Umsatz              ${s.conversion_value == null ? '—' : Number(s.conversion_value).toFixed(2) + ' EUR'}`);
  console.log('─'.repeat(46));
  console.log(`  abgemeldet          ${num(s.unsubscribes)}`);
  console.log(`  Spam-Meldungen      ${num(s.spam_complaints)}`);
  console.log(`  unzustellbar        ${num(s.bounced)}`);

  // Grobe Einordnung, damit die Zahl allein nicht interpretiert werden muss.
  if (s.delivered >= 50) {
    const notes = [];
    if (s.open_rate != null && s.open_rate < 0.25) notes.push('Oeffnungsrate unter 25 %: Betreffzeile testen.');
    if (s.click_rate != null && s.click_rate < 0.02) notes.push('Klickrate unter 2 %: CTA oder Angebot pruefen.');
    if (s.spam_complaints > 0) notes.push('Spam-Meldungen vorhanden: Zustellbarkeit im Auge behalten.');
    if (notes.length) {
      console.log('\nHinweise');
      notes.forEach((n) => console.log('  - ' + n));
    }
  } else {
    console.log('\nUnter 50 Zustellungen. Zu wenig fuer eine Entscheidung.');
  }
}

main().catch((e) => {
  console.error('Fehler:', e.message);
  process.exit(1);
});
