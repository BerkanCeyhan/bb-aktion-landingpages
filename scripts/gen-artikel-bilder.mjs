#!/usr/bin/env node
/**
 * Bilder fuer die Artikelseite /creatin-report/ (gemini-3.1-flash-image).
 *
 *   node scripts/gen-artikel-bilder.mjs            # alle
 *   node scripts/gen-artikel-bilder.mjs rueckstand # nur eins
 *
 * Sie unterbrechen den Text, sie dekorieren ihn nicht. Kein Produkt, kein
 * Text, keine Marke — der Artikel verliert seine Glaubwuerdigkeit in dem
 * Moment, in dem er wie eine Anzeige aussieht.
 *
 * Das wichtigste Bild ist `rueckstand`: der weisse Satz am Glasboden. Es macht
 * den Mechanismus sichtbar, um den sich der halbe Artikel dreht. Ein Leser
 * glaubt, was er sich vorstellen kann.
 *
 * Zwei Seitenverhaeltnisse: 16:9 fuer den Textfluss, 4:5 fuer schmale Displays.
 * Die Seite waehlt ueber <picture> aus.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(dirname(fileURLToPath(import.meta.url))));
const OUTDIR = "static/creatin-report/bilder";

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const orte = [join(homedir(), ".config/kb/env"), resolve(ROOT, ".env")];
  for (const o of orte) {
    try {
      const m = readFileSync(o, "utf8").match(/^\s*GEMINI_API_KEY\s*=\s*(.+)\s*$/m);
      if (m) return m[1].replace(/^["']|["']$/g, "").trim();
    } catch {}
  }
  throw new Error(`GEMINI_API_KEY nicht gefunden. Gesucht in: ${orte.join(", ")}`);
}

// Immer gemini-3.1-flash-image (Nano Banana 2). Kein Fallback auf andere Modelle.
const MODELL = "gemini-3.1-flash-image";

async function generate(prompt, aspect, key, seed) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELL}:generateContent`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      temperature: 0.25,
      seed,
      imageConfig: { aspectRatio: aspect },
    },
  };
  const ruf = () =>
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body) });
  let res = await ruf();
  if (res.status === 400) {
    delete body.generationConfig.seed;
    delete body.generationConfig.temperature;
    res = await ruf();
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const d = await res.json();
  const out = (d?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!out) throw new Error("keine Bilddaten");
  return { b64: out.inlineData.data, mime: out.inlineData.mimeType || "image/png" };
}

/* Helles Tageslicht, weil die Seite hell ist. Ein dunkles Foto in einem hellen
   Satzspiegel reisst ein Loch in die Seite. */
const REGELN = [
  "Dokumentarische Fotografie bei hellem Tageslicht, weiche Schatten, warmes",
  "neutrales Licht, heller Gesamteindruck. Kein Studio, kein Hochglanz, kein Blitz.",
  "KEIN Produkt, keine Dose, keine Verpackung, kein Etikett, keine Marke, kein Logo,",
  "kein Text im Bild. Wirklich kein Text.",
  "Keine Gesichter. Ruhig, sachlich, nah am Alltag.",
].join(" ");

const BILDER = [
  {
    id: "morgen",
    seed: 910101,
    alt: "Kuechentheke am Morgen mit Wasserglas, Messloeffel und aufgeschlagenem Trainingsheft",
    prompt:
      "Eine helle Kuechentheke aus hellem Holz am spaeten Vormittag. Ein Glas Wasser, ein " +
      "kleiner Messloeffel, daneben ein aufgeschlagenes kariertes Notizheft mit handschriftlichen " +
      "Zahlenreihen und ein Stift. Grosses Fenster im Hintergrund, unscharf, viel Licht. " + REGELN,
  },
  {
    id: "rueckstand",
    seed: 910202,
    alt: "Nahaufnahme eines Trinkglases, in dem sich weisses Pulver nicht aufgeloest hat und als Satz am Boden liegt",
    prompt:
      "Makroaufnahme eines klaren Trinkglases mit Wasser, von der Seite und leicht von oben " +
      "fotografiert. Am Boden liegt eine deutlich sichtbare weisse, sandige Schicht ungeloesten " +
      "Pulvers, an der Innenwand kleben einzelne weisse Koerner. Das Wasser darueber ist leicht " +
      "truebe mit feinen Schlieren. Heller neutraler Hintergrund, seitliches Fensterlicht, das " +
      "die Ablagerung am Boden klar zeichnet. Der Bodensatz ist das Motiv. " + REGELN,
  },
  {
    id: "logbuch",
    seed: 910303,
    alt: "Handgeschriebenes Trainingslogbuch mit Gewichts- und Wiederholungszahlen auf einer Hantelbank",
    prompt:
      "Ein aufgeschlagenes, abgegriffenes Notizheft auf der schwarzen Polsterbank einer " +
      "Hantelbank. Auf den Seiten stehen handschriftlich Spalten mit Gewichten und " +
      "Wiederholungszahlen, einige Zeilen durchgestrichen und korrigiert. Ein Kugelschreiber " +
      "liegt quer darauf. Helles Fensterlicht von links, heller Raum. " + REGELN,
  },
];

const FORMATE = [
  { suffix: "quer", aspect: "16:9" },
  { suffix: "hoch", aspect: "4:5" },
];

const nur = process.argv.slice(2);
const key = loadKey();
mkdirSync(resolve(ROOT, OUTDIR), { recursive: true });

for (const b of BILDER) {
  if (nur.length && !nur.includes(b.id)) continue;
  for (const f of FORMATE) {
    const name = `${b.id}-${f.suffix}`;
    try {
      const { b64, mime } = await generate(b.prompt, f.aspect, key, b.seed);
      const ext = mime.includes("png") ? "png" : "jpg";
      writeFileSync(resolve(ROOT, `${OUTDIR}/${name}.${ext}`), Buffer.from(b64, "base64"));
      console.log(`ok    ${OUTDIR}/${name}.${ext}`);
    } catch (e) {
      console.error(`FEHL  ${name}: ${e.message}`);
    }
  }
}

console.log("\nAlt-Texte:");
for (const b of BILDER) console.log(`  ${b.id.padEnd(12)} ${b.alt}`);
