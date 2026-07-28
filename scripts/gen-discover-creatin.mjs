#!/usr/bin/env node
/**
 * Bildmotive fuer die Google-Discover-Kampagne Creatin HCL
 * (Nano Banana 2, gemini-3.1-flash-image).
 *
 *   node scripts/gen-discover-creatin.mjs                 # alle Jobs
 *   node scripts/gen-discover-creatin.mjs kueche          # nur ein Motiv
 *
 * WARUM DIESE MOTIVE ANDERS AUSSEHEN MUESSEN ALS ALLES BISHERIGE
 *
 * Discover ist ein Artikel-Feed. Der Nutzer scrollt durch Beitraege, sieht Bild
 * und Ueberschrift, und entscheidet in einer Sekunde, ob das ein Artikel ist
 * oder Werbung. Sobald es nach Werbung aussieht, ist es vorbei.
 *
 * Deshalb: **kein Produkt im Bild**, keine Dose, keine Verpackung, kein Logo,
 * kein Text. Was zu sehen ist, muss eine Szene sein, die eine Frage aufwirft —
 * die Ueberschrift beantwortet sie, und die Antwort steht im Artikel.
 *
 * Das ist das Gegenteil der PMax-Motive unter assets/ads/creatin-hcl/: dort
 * steht die Dose zentral im Bild, und das ist dort richtig. Hier waere es
 * falsch. Beide Saetze nebeneinander zu haben ist Absicht.
 *
 * Formate (Demand Gen spielt sie getrennt aus):
 *   16:9  wird danach auf 1,91:1 beschnitten  (marketing_images)
 *   1:1                                        (square_marketing_images)
 *   4:5                                        (portrait_marketing_images)
 *
 * gemini kennt kein 1,91:1, und seine 4:5-Ausgabe misst 0,8055 statt 0,800.
 * Beides wird nachtraeglich mit ffmpeg beschnitten.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(dirname(fileURLToPath(import.meta.url))));
const OUTDIR = "assets/ads/discover-creatin";

/* Der Key wird nie ausgegeben, nicht ins Log und nicht in eine URL. */
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
      temperature: 0.3, // etwas hoeher als bei Produktfotos: hier soll es lebendig wirken
      seed,
      imageConfig: { aspectRatio: aspect },
    },
  };
  const ruf = () =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
    });

  let res = await ruf();
  if (res.status === 400) {
    delete body.generationConfig.seed;
    delete body.generationConfig.temperature;
    res = await ruf();
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const out = (data?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
  if (!out) throw new Error("keine Bilddaten in der Antwort");
  return { b64: out.inlineData.data, mime: out.inlineData.mimeType || "image/png" };
}

/* Gilt fuer jedes Motiv. Der Satz zum Produkt steht doppelt, weil das Modell
   sonst gern doch eine Dose dazustellt. */
const REGELN = [
  "Dokumentarische Fotografie, natuerliches Licht, keine Studioanmutung, kein Hochglanz.",
  "Wirkt wie ein Foto in einem Zeitungsartikel, nicht wie Werbung.",
  "KEIN Produkt im Bild: keine Dose, keine Verpackung, kein Etikett, keine Marke,",
  "kein Logo. Wirklich kein Produkt und wirklich kein Text.",
  "Ruhige Farben, leichte Koernung erlaubt. Motiv mittig mit Luft zum Rand,",
  "weil Google je Platzierung beschneidet.",
].join(" ");

const MOTIVE = [
  {
    id: "kueche",
    seed: 810101,
    prompt:
      "Eine schlichte Kuechentheke am fruehen Morgen. Ein Glas Wasser, daneben ein kleiner " +
      "Messloeffel mit weissem, feinem Pulver, ein Kuechentuch, im Hintergrund unscharf eine " +
      "Fensterfront mit Morgenlicht. Alltaeglich, leicht unaufgeraeumt, echt. " + REGELN,
  },
  {
    id: "spind",
    seed: 810202,
    prompt:
      "Eine offene Umkleidekabine in einem Fitnessstudio, kurz nachdem jemand gegangen ist. " +
      "Eine Sporttasche auf der Bank, ein zusammengelegtes Handtuch, ein leerer Shaker ohne " +
      "Beschriftung. Niemand im Bild. Kuehles Deckenlicht, ruhige Stimmung. " + REGELN,
  },
  {
    id: "hand",
    seed: 810303,
    prompt:
      "Nahaufnahme einer geoeffneten Handflaeche, in der eine kleine Menge feines weisses " +
      "Pulver liegt. Weiches Fensterlicht von der Seite, dunkler unscharfer Hintergrund, " +
      "geringe Schaerfentiefe. Ruhig und sachlich, nicht dramatisch. " + REGELN,
  },
];

const FORMATE = [
  { suffix: "16x9", aspect: "16:9" }, // wird auf 1,91:1 beschnitten
  { suffix: "1x1", aspect: "1:1" },
  { suffix: "4x5", aspect: "4:5" },
];

const nur = process.argv.slice(2);
const key = loadKey();
mkdirSync(resolve(ROOT, OUTDIR), { recursive: true });

for (const m of MOTIVE) {
  if (nur.length && !nur.includes(m.id)) continue;
  for (const f of FORMATE) {
    const name = `disc-${m.id}-${f.suffix}`;
    try {
      const { b64, mime } = await generate(m.prompt, f.aspect, key, m.seed);
      const ext = mime.includes("png") ? "png" : "jpg";
      const ziel = `${OUTDIR}/${name}.${ext}`;
      writeFileSync(resolve(ROOT, ziel), Buffer.from(b64, "base64"));
      console.log(`ok    ${ziel}`);
    } catch (e) {
      console.error(`FEHL  ${name}: ${e.message}`);
    }
  }
}
