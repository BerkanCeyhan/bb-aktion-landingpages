// Meta-Motive fuer den Winkel "Das beste Creatin ueberhaupt".
// Jede Anzeige traegt dieselbe Zeile im Bild, das Umfeld ist je Zielgruppe
// bewusst maximal verschieden — sonst sortiert Meta die Motive in denselben
// Delivery-Bucket und wir zahlen fuer Ueberschneidung statt fuer Reichweite.
//
// Immer gemini-3.1-flash-image (Nano Banana 2). Kein Fallback auf andere Modelle.
// Lauf: `node scripts/gen-beste-creatin.mjs`            alle Motive
//       `node scripts/gen-beste-creatin.mjs beste-02`   nur eines nachziehen
//       FORCE=1 ueberschreibt vorhandene Dateien.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = (fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!KEY) { console.error('no GEMINI_API_KEY in .env'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const OUTDIR = path.join(ROOT, 'assets', 'ads', 'beste-creatin');
const REF = path.join(ROOT, 'assets', 'ads', 'creatin-hcl', 'ref-hcl-dose.jpg');
const FORCE = process.env.FORCE === '1';
const only = process.argv.slice(2);

// Produkttreue steht vor der Bildbeschreibung, sonst erfindet das Modell eine Dose.
const PRODUKT = 'The attached image is the real product. Reproduce this black matte supplement tub EXACTLY: same cylindrical shape, same black matte finish, same silver-to-black gradient label, the same legible wordmark BRUSTBIZEPS above the large headline CREATIN-HCL with HYDROCHLORID spaced underneath, and the same black band with small text around the base. Do not redesign the label, do not invent other products, do not change any word on it.';

// Die eine Zeile, die auf jedem Motiv steht. Wortlaut, Position, Groesse,
// Schriftcharakter und die Negativliste — alle fuenf Angaben, wie in der SOP.
const ZEILE = (pos, farbe, schrift) =>
  `${pos} three stacked lines of German text in ${schrift}, ${farbe}, the whole block about one third of the image height, tightly leaded, reading exactly: DAS BESTE / CREATIN / ÜBERHAUPT. Spelling and the umlaut on ÜBERHAUPT must be exact. No other text, no numbers, no extra headline, no logo, no caption, no watermark, no arrows anywhere in the image.`;

const FOTO = 'Photorealistic documentary photograph, shot on a Canon EOS R6 with a 35mm f/1.8 lens, available daylight only, no flash, no beauty retouching, no skin smoothing. Subtle sensor grain, natural colour, gentle contrast, no HDR, no glossy commercial polish, no lens flare.';

const JOBS = [
  // ── Statics-Kampagne, Ziel creatin-hcl-1 ───────────────────────────────
  {
    name: 'beste-01-mono', seed: 511001,
    prompt: `${PRODUKT} ${FOTO} Vertical 3:4. A worn kitchen worktop in an ordinary German flat in flat morning light, a few crumbs and a water ring on the surface. Two identical drinking glasses, both filled three quarters with water, stand side by side in the left half of the frame on the lower third line. The water in the left glass is cloudy and grey with a thick sludge of undissolved powder settled at the bottom. The water in the right glass is completely clear and colourless with nothing settled in it. The supplement tub stands upright to the right of both glasses with clear space around it, fully visible, not overlapped by anything, label facing the camera. Slightly imperfect, candid framing. ${ZEILE('Across the upper third, centered,', 'deep charcoal almost black', 'a very bold condensed grotesque sans-serif on a clean bone-white band that covers the top third')}`,
  },
  {
    name: 'beste-02-frauen', seed: 511002,
    prompt: `${PRODUKT} ${FOTO} Vertical 3:4. A woman in her early thirties with an ordinary athletic build, no fitness-model physique, no visible six-pack, visible skin texture with pores and a few freckles, hair tied back, wearing a plain grey training top, sits on a bench in a normal well-used gym. She holds the supplement tub loosely in one hand at chest height, label facing the camera, and looks slightly off camera. Racked dumbbells softly out of focus behind her. Candid, unposed. ${ZEILE('Across the lower third, over a semi-transparent dark charcoal bar,', 'bone white', 'a bold geometric sans-serif')}`,
  },
  {
    name: 'beste-03-einsteiger', seed: 511003,
    prompt: `${PRODUKT} Vertical 3:4 flat-lay photographed straight down onto a scuffed dark green changing-room bench under cool fluorescent light. An open black gym bag, a rolled towel, lifting straps, a phone face down, a set of keys and a half-drunk bottle of water lie around, arranged candidly, not styled. The supplement tub stands upright in the centre of the frame, label facing the camera, clearly the hero object. Realistic worn textures, small scratches on the bench. ${ZEILE('Across the top of the frame, on a solid signal-red block,', 'pure white', 'a heavy condensed sans-serif in capitals')}`,
  },
  {
    name: 'beste-04-preis', seed: 511004,
    prompt: `${PRODUKT} Vertical 3:4 clean editorial still life on a solid bone-white studio background with a soft single light from the upper left. The supplement tub stands slightly right of centre on the lower third line, label facing the camera. To its left, laid out in a precise even grid on the white surface, are many small white capsules in neat rows, calm and orderly, filling the space beside the tub. Sharp, high contrast, generous negative space, no props other than the capsules. ${ZEILE('In the upper left corner, left aligned,', 'deep charcoal almost black', 'a bold geometric sans-serif')}`,
  },
  {
    name: 'beste-05-magen', seed: 511005,
    prompt: `${PRODUKT} ${FOTO} Vertical 3:4. A bedside table beside an unmade bed at six in the morning, cool blue window light through a half-open blind, a phone charging, reading glasses and a paperback lying around. On the table stands a full glass of plain water and next to it the supplement tub, label facing the camera. Quiet, domestic, ordinary, nothing staged. Shallow depth of field on the background only. ${ZEILE('Across the lower third, over a semi-transparent bone-white bar,', 'deep charcoal', 'a bold geometric sans-serif')}`,
  },
  {
    name: 'beste-06-unterwegs', seed: 511006,
    prompt: `${PRODUKT} Photorealistic candid photograph in available daylight, no flash, no studio lighting, subtle sensor grain, natural colour, no glossy commercial polish. Vertical 3:4. The passenger seat and centre console of an ordinary compact car in daylight, seen from the driver's side. A gym bag strap, a car key and a phone lie on the seat. The supplement tub sits directly in the cup holder of the centre console, resting on nothing else, label facing the camera, clearly the sharpest object in the frame. No camera equipment, no lens, no tripod and no photographic gear anywhere in the picture. A blurred multi-storey car park visible through the windscreen. Everyday, slightly untidy, real. ${ZEILE('Across the upper third, left aligned, on a solid bone-white horizontal band that covers the top third of the frame,', 'signal red', 'a heavy condensed sans-serif in capitals')}`,
  },

  // ── Quizkampagne, Ziel quiz-creatin-hcl ────────────────────────────────
  {
    name: 'beste-q1-typ', seed: 511011,
    prompt: `${PRODUKT} ${FOTO} Vertical 3:4. A man's hand holds a smartphone upright in a gym, screen facing the camera and clearly readable. On the screen is a clean minimal German quiz interface: a thin progress bar near the top, a short question headline and four plain answer cards below it, in white with a single red accent. Keep the on-screen text minimal, German and plausible. Softly blurred gym background. On a bench in the sharp foreground stands the supplement tub, label facing the camera. ${ZEILE('Across the top of the frame, on a solid deep charcoal block,', 'bone white', 'a bold condensed sans-serif in capitals')}`,
  },
  {
    name: 'beste-q2-tafel', seed: 511012,
    prompt: `Vertical 3:4 bold typographic poster, no photography of people, no product. A deep charcoal background with heavy paper texture and subtle film grain. A single thin signal-red rule sits under the type block. Sharp, high contrast, editorial, generous margins, nothing else in the frame. ${ZEILE('Centred in the middle of the frame,', 'bone white with the middle word CREATIN in signal red', 'an extremely bold condensed grotesque sans-serif in capitals')}`,
  },
  {
    name: 'beste-q3-regal', seed: 511013,
    prompt: `${PRODUKT} ${FOTO} Vertical 3:4. A crowded supplement shelf in a sports nutrition shop under cool retail lighting, packed with a dozen plain unbranded white and neon tubs, all of them completely blank with no wordmark, no logo, no lettering and no readable label of any kind, slightly out of focus. In the centre of the middle shelf, at eye height, one single black supplement tub stands facing forward, sharp and fully readable, lit slightly brighter than everything around it. It is the only object in the picture that carries any writing. Realistic shop clutter, empty price rails without any numbers or text. ${ZEILE('Across the lower third, over a solid bone-white band,', 'deep charcoal with the word ÜBERHAUPT in signal red', 'a bold condensed sans-serif in capitals')}`,
  },
];

fs.mkdirSync(OUTDIR, { recursive: true });
const refB64 = fs.readFileSync(REF).toString('base64');

async function gen(job) {
  const out = path.join(OUTDIR, `${job.name}.jpg`);
  if (!FORCE && fs.existsSync(out) && fs.statSync(out).size > 5000) { console.log('skip', job.name); return; }

  // Referenzbild vor dem Text, sonst wird die Produkttreue ignoriert.
  const parts = [
    { inlineData: { mimeType: 'image/jpeg', data: refB64 } },
    { text: job.prompt },
  ];

  for (let attempt = 1; attempt <= 3; attempt++) {
    const body = {
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '3:4' },
        ...(attempt === 1 ? { temperature: 0.15, seed: job.seed } : {}),
      },
    };
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const img = (data?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData);
      if (!img) throw new Error('no image: ' + JSON.stringify(data).slice(0, 300));
      fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
      console.log('ok  ', job.name, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
      return;
    } catch (e) {
      console.log(`retry ${attempt} ${job.name}: ${String(e.message).slice(0, 160)}`);
      await new Promise((r) => setTimeout(r, 2500 * attempt));
    }
  }
  console.error('FAIL', job.name);
}

for (const job of JOBS) {
  if (only.length && !only.some((o) => job.name.startsWith(o))) continue;
  await gen(job);
}
