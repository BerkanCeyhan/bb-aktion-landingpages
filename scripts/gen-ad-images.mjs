// Meta ad creatives for the 3 quiz funnels — 4 ads each, 3:4 vertical.
// Nano-Banana 2 (gemini-3.1-flash-image) with the real product image attached
// as a reference so the actual bottle/tub/box shows up accurately.
// Run: `node scripts/gen-ad-images.mjs`   (set FORCE=1 to overwrite existing)
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = (fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!KEY) { console.error('no GEMINI_API_KEY in .env'); process.exit(1); }
const FORCE = process.env.FORCE === '1';

const MODEL = 'gemini-3.1-flash-image';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;

// Shared style anchors keep the 4 ads of a funnel visually coherent.
const CLINIC = 'Premium clinical direct-response advertising aesthetic. Cobalt-blue (#1E50E5) and signal-orange (#FF4D17) accents, bone-white and deep charcoal tones. Sharp, high-contrast, generous negative space, editorial. Photorealistic.';
const SUMMER = 'Playful premium direct-response advertising aesthetic. Warm cream (#FBF1DD) tones with orange (#FF6B2C) and pink-magenta (#FF2E7E) accents, festive but high-end (never cheap or cluttered). Photorealistic.';
const MIME = { '.png': 'image/png', '.webp': 'image/webp' };

const JOBS = [
  // ── Quiz Creatin HCL ─ product: capsule bottle ───────────────────────────
  ['quiz-creatin-hcl', 'produkt.png', 'creatin-1-loeslichkeit',
    `${CLINIC} 3:4 vertical. Two identical clear drinking glasses of water side by side on a clean matte cobalt-blue surface under soft studio light. The LEFT glass is cloudy with a clump of undissolved white powder sludge settled at the bottom. The RIGHT glass is perfectly clear. Standing next to the clear right glass is the exact supplement bottle from the attached reference image, label facing forward and legible. Lots of negative space. No text, no words, no letters, no numbers.`],
  ['quiz-creatin-hcl', 'produkt.png', 'creatin-2-blaehbauch',
    `${CLINIC} 3:4 vertical bold minimalist ad graphic. Deep cobalt-blue background with subtle film grain. One large, perfectly spelled German word "Blähbauch?" in bold bone-white condensed sans-serif, centered in the upper third, crisp and correctly spelled with the umlaut. A short signal-orange underline accent beneath the word. The exact supplement bottle from the attached reference image sits in the lower right under dramatic side light. High contrast, clean.`],
  ['quiz-creatin-hcl', 'produkt.png', 'creatin-3-kapseln',
    `${CLINIC} 3:4 vertical authentic top-down lifestyle flat-lay on a light oak gym bench in warm natural morning window light. A man's open palm holds four small capsules. Beside the palm: the exact supplement bottle from the attached reference image (open), a chrome dumbbell, a phone and a steel water bottle, arranged candidly, not staged. Realistic textures. No text, no letters, no numbers.`],
  ['quiz-creatin-hcl', 'produkt.png', 'creatin-4-quizui',
    `${CLINIC} 3:4 vertical. A hand holds a smartphone in a gym; on the screen a clean minimal quiz-result app UI shows a circular progress gauge filled only to a low level, in cobalt-blue with a signal-orange indicator and a lime-green accent. Softly blurred gym background with bokeh. In the sharp foreground on a bench sits the exact supplement bottle from the attached reference image. Modern app design. Keep any on-screen text minimal and in German.`],

  // ── Quiz EAA ─ product: EAA tub ──────────────────────────────────────────
  ['quiz-eaa', 'produkt.webp', 'eaa-1-katabol',
    `${CLINIC} 3:4 vertical editorial concept. A performance line rendered as a physical neon light-strip mounted on a dark charcoal clinical wall: it rises then drops steeply in the second half. On a matte surface below, lit by a cool spotlight, stands the exact EAA product tub from the attached reference image, label forward. Cobalt-blue and signal-orange rim light. Dramatic, minimal. No text, no words, no letters, no numbers.`],
  ['quiz-eaa', 'produkt.webp', 'eaa-2-muskelkater',
    `${CLINIC} 3:4 vertical bold minimalist ad graphic. Dark charcoal background with subtle grain. One large, perfectly spelled German line "3 Tage Muskelkater?" in bold bone-white condensed sans-serif, centered, correctly spelled. A short signal-orange accent bar. The exact EAA tub from the attached reference image in the lower right under a hard cool light. High contrast.`],
  ['quiz-eaa', 'produkt.webp', 'eaa-3-shaker',
    `${CLINIC} 3:4 vertical authentic gym photo. A translucent shaker bottle filled with a vibrant fruity red-orange drink stands on a rubber gym floor beside a loaded barbell and a towel, with sweat droplets and dramatic side light from a gym window. Right next to the shaker stands the exact EAA tub from the attached reference image, label forward. Candid, realistic, energetic. No text, no letters, no numbers.`],
  ['quiz-eaa', 'produkt.webp', 'eaa-4-aufbau-abbau',
    `${CLINIC} 3:4 vertical conceptual split image on a clean cobalt-blue background. Left half: a bold, full, brightly lit muscular arm silhouette icon in signal-orange. Right half: the same arm silhouette rendered thin and dim. A crisp vertical divider between them. Centered at the bottom, bridging both halves, stands the exact EAA tub from the attached reference image. Minimal, iconographic, premium. No text, no words, no letters.`],

  // ── Quiz Mystery Box ─ product: box ──────────────────────────────────────
  ['quiz-mystery-box', 'produkt.png', 'mystery-1-warenwert',
    `${SUMMER} 3:4 vertical vibrant product photo on a warm cream background. The exact mystery box from the attached reference image, open and overflowing with a colourful abundance of fitness supplements: protein tubs, protein bars, a shaker, a zero-sauce bottle and vitamin jars spilling generously onto the surface. Orange and pink-magenta studio lighting, festive, high energy, clearly premium. No text, no letters, no numbers.`],
  ['quiz-mystery-box', 'produkt.png', 'mystery-2-mystery',
    `${SUMMER} 3:4 vertical minimalist. The exact closed mystery box from the attached reference image centered on a cream background, tied with a bold pink-magenta ribbon. A single large, clean, glowing orange question mark "?" floats above the box. Soft studio light, curious playful mood. Only the question mark — no other text, no letters, no numbers.`],
  ['quiz-mystery-box', 'produkt.png', 'mystery-3-sparen',
    `${SUMMER} 3:4 vertical top-down flat-lay on a cream surface. A neat, appetizing arrangement of many fitness snacks and supplements — protein bars, a whey scoop, a zero-sauce bottle, vitamin jars, a shaker — grouped beside the exact mystery box from the attached reference image. Warm orange and pink-magenta accents, organized and abundant, lifestyle editorial. No text, no letters, no numbers.`],
  // Winkel "Abnehmen & Definition". 57 % der 171 Quiz-Antworten vom
  // 21.07.–03.08.2026 nennen dieses Ziel, bei Ad1 sogar 62 % — und kein
  // einziges Motiv sprach es an. Warenkorb derselben Leute: 61 % Riegel und
  // Snacks, 45 % Zero-Saucen. Genau das liegt hier im Bild.
  ['quiz-mystery-box', 'produkt.png', 'mystery-5-definition',
    `${SUMMER} 3:4 vertical vibrant product photo on a warm cream background. The exact mystery box from the attached reference image, open and overflowing with a colourful abundance of lean-diet fitness food: many zero-calorie sauce bottles, stacks of protein bars in bright wrappers, protein pudding cups, bags of protein chips, protein water bottles and a shaker, packed full and spilling generously out of the box onto the surface around it in a large abundant arrangement. Light and fresh rather than heavy. A measuring tape lies casually curled in the foreground as a subtle definition cue. Orange and pink-magenta studio lighting, festive, high energy, clearly premium and abundant. No text, no letters, no numbers.`],
  ['quiz-mystery-box', 'produkt.png', 'mystery-4-quizui',
    `${SUMMER} 3:4 vertical. A hand holds a smartphone showing a clean minimal quiz-result screen with a friendly box-recommendation card in orange and pink-magenta with a lime-green accent. Cream background. In soft focus behind the phone stands the exact mystery box from the attached reference image. Modern playful app UI. Keep any on-screen text minimal and in German.`],
];

async function gen(project, productFile, name, prompt) {
  const outDir = path.join(ROOT, project, 'public', 'ads');
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${name}.png`);
  if (!FORCE && fs.existsSync(out) && fs.statSync(out).size > 5000) { console.log('skip', name); return; }

  const prodPath = path.join(ROOT, project, 'public', productFile);
  const prodBuf = fs.readFileSync(prodPath);
  const parts = [
    { text: prompt + ' The attached image is the real product — reproduce it faithfully (shape, colour, label).' },
    { inlineData: { mimeType: MIME[path.extname(productFile)] || 'image/png', data: prodBuf.toString('base64') } },
  ];

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '3:4' } },
        }),
      });
      const data = await res.json();
      const outParts = data?.candidates?.[0]?.content?.parts || [];
      const img = outParts.find((p) => p.inlineData);
      if (!img) throw new Error('no image: ' + JSON.stringify(data).slice(0, 300));
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

for (const [proj, prod, name, prompt] of JOBS) {
  await gen(proj, prod, name, prompt);
}
console.log('done');
