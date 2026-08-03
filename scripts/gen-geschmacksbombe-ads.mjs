// Meta-Statics fuer die Geschmacksbombe — 4 Motive, 4:5 fuer den Feed.
// Nano-Banana 2 (gemini-3.1-flash-image) mit dem echten Probeset-Foto als
// Referenz, damit die Tueten stimmen (Form, Farbe, Label).
// Die vier Winkel kommen aus der Auswertung der Legacy-Kampagnen:
//   1 Magerquark-Rettung  — groesstes Volumen (Sonja Quark, adam, 1229 Kaeufe)
//   2 Zuckerrechnung      — bester ROAS unter den Videos (2,83)
//   3 Risikoumkehr        — beste Statik ueberhaupt (ROAS 2,92, CPA 8,79 EUR)
//   4 Inulin/Ballaststoff — Traeger des 2026er Winners (CTR 5,59 %)
// Run: `node scripts/gen-geschmacksbombe-ads.mjs`   (FORCE=1 ueberschreibt)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = (fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!KEY) { console.error('no GEMINI_API_KEY in .env'); process.exit(1); }
const FORCE = process.env.FORCE === '1';

const MODEL = 'gemini-3.1-flash-image';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
const SEED = 730411;

const OUTDIR = path.join(ROOT, 'assets', 'ads', 'geschmacksbombe');
const REF = path.join(OUTDIR, 'ref-gb-probeset.jpg');

// Gemeinsamer Stilblock. Steht als Konstante hier, nicht in jedem Job kopiert,
// sonst driften die vier Motive auseinander.
const STYLE = 'Photorealistic documentary photograph, shot on a Canon EOS R6 with a 35mm f/1.8 lens, available natural daylight from a side window only, no flash, no studio lighting, no beauty retouching. An ordinary German home kitchen with a light wooden or pale stone worktop, slightly lived-in: a few crumbs, a used spoon, a dish towel out of place. Subtle sensor grain, natural colour, gentle contrast, no HDR, no glossy commercial polish, no lens flare, no plastic-looking surfaces.';

const NEG = 'No watermark, no logo overlay, no arrows, no badges, no starbursts, no price tags, no extra text beyond the one specified line, no gibberish letters, no misspelled words, no human faces, no fitness models, no gym setting.';

const JOBS = [
  // 1 — Magerquark-Rettung. Der Winkel mit dem groessten Legacy-Volumen.
  ['gb-01-magerquark',
    `${STYLE} A large white ceramic bowl of plain, dry-looking low-fat quark sits centred on the worktop, the surface slightly cracked and unappetising, a stainless steel spoon standing upright in it. Directly beside the bowl, leaning against it, lies one single sachet from the attached reference image, label facing the camera and fully legible. Camera slightly above the worktop at a 40 degree angle, the bowl filling the middle third of the frame. The dryness of the quark must read clearly. ${NEG} In the lower third, centred, one short line of German text reading exactly "Quark schmeckt wie trockener Gips." in a bold condensed geometric sans-serif, dark charcoal on a clean light area, the line about one twelfth of the image height, correctly spelled. Vertical 4:5 composition.`],

  // 2 — Zuckerrechnung. Bester ROAS unter den Legacy-Videos (2,83).
  ['gb-02-zuckerrechnung',
    `${STYLE} Top-down flat lay on the worktop. On the left half, a large loose heap of white sugar cubes, roughly a hundred of them, spilling out of a torn paper bag, deliberately excessive. On the right half, by contrast, two single sachets from the attached reference image lying flat, labels facing up and fully legible. A clear empty gap of worktop between the two halves. Camera directly overhead, even daylight, soft shadows. The size contrast between the sugar heap and the two small sachets is the point of the picture. ${NEG} In the lower third, centred, one short line of German text reading exactly "100 g Zucker am Tag. Nur für süß." — spell the German umlauts ü and the ß exactly as written — in a bold condensed geometric sans-serif, dark charcoal, the line about one twelfth of the image height, correctly spelled. Vertical 4:5 composition.`],

  // 3 — Risikoumkehr. Traegt die beste Statik der Kontohistorie (CPA 8,79 EUR).
  ['gb-03-probeset',
    `${STYLE} All five sachets from the attached reference image fanned out side by side on the worktop like a hand of cards, every label facing the camera and fully legible, the different flavour colours clearly distinguishable. Beside them a small white bowl of quark with one sachet already torn open and a little powder dusted over the quark. Camera at a 45 degree angle from slightly above, the fan of sachets occupying the upper two thirds of the frame. Warm, inviting, everyday. ${NEG} In the lower third, centred, one short line of German text reading exactly "Erst fünf Sorten testen. Dann entscheiden." — spell the German umlaut ü exactly as written — in a bold condensed geometric sans-serif, dark charcoal on a clean light area, the line about one twelfth of the image height, correctly spelled. Vertical 4:5 composition.`],

  // 4 — Inulin/Ballaststoff. Der Traeger des 2026er Winners, CTR 5,59 %.
  ['gb-04-inulin',
    `${STYLE} Close macro shot at worktop level. A single torn-open sachet from the attached reference image is held at a slight tilt in a plain adult hand with visible skin texture, pores and short unmanicured nails, and a fine stream of pale powder falls from it into a white bowl of quark below. The falling powder is sharp and clearly visible against the darker background of the kitchen. The sachet label is fully legible. Shallow depth of field, the bowl rim slightly soft. ${NEG} In the lower third, centred, one short line of German text reading exactly "Süß aus Ballaststoff. Nicht aus Zucker." — spell the German umlaut ü and the ß exactly as written — in a bold condensed geometric sans-serif, dark charcoal on a clean light area, the line about one twelfth of the image height, correctly spelled. Vertical 4:5 composition.`],
];

async function gen(name, prompt) {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const out = path.join(OUTDIR, `${name}.jpg`);
  if (!FORCE && fs.existsSync(out) && fs.statSync(out).size > 5000) { console.log('skip', name); return; }

  const refBuf = fs.readFileSync(REF);
  const parts = [
    { inlineData: { mimeType: 'image/jpeg', data: refBuf.toString('base64') } },
    { text: prompt + ' The attached image shows the real product sachets — reproduce them faithfully in shape, colour and label artwork.' },
  ];

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      temperature: 0.15,
      seed: SEED,
      imageConfig: { aspectRatio: '4:5' },
    },
  };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      // Nicht jeder Modellstand nimmt seed und temperature an.
      if (res.status === 400) {
        const bare = { contents: body.contents, generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '4:5' } } };
        res = await fetch(URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bare) });
      }
      const data = await res.json();
      const outParts = data?.candidates?.[0]?.content?.parts || [];
      const img = outParts.find((p) => p.inlineData);
      if (!img) throw new Error('no image: ' + JSON.stringify(data).slice(0, 400));
      fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
      console.log('ok', name, fs.statSync(out).size);
      return;
    } catch (e) {
      console.warn(`retry ${attempt} ${name}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 2500 * attempt));
    }
  }
  console.error('FAILED', name);
}

const only = process.argv.slice(2);
for (const [name, prompt] of JOBS) {
  if (only.length && !only.some((o) => name.startsWith(o))) continue;
  await gen(name, prompt);
}
console.log('done');
