// Nano-Banana 2 (gemini-3.1-flash-image) quiz option illustrations.
// Run once locally: `node scripts/gen-images.mjs`. Committed PNGs are what ship.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = (fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!KEY) { console.error('no GEMINI_API_KEY in .env'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;

const CLINICAL = 'Flat vector icon illustration, thick clean rounded cobalt-blue (#1E50E5) outlines with signal-orange (#FF4D17) accents, solid warm bone background #F1ECE1, minimal, single centered subject, generous margin, no text, no words, no letters, no numbers, 1:1 square, modern mobile app illustration style.';
const SUMMER = 'Flat playful vector icon illustration, rounded shapes in orange (#FF6B2C) and pink-magenta (#FF2E7E), solid warm cream background #FBF1DD, cheerful, single centered subject, generous margin, no text, no words, no letters, no numbers, 1:1 square, modern mobile app illustration style.';

const JOBS = [
  // Creatin Q4 — Beschwerden
  ['quiz-creatin-hcl', 'creatin-q4-blaehbauch', 'a bloated swollen belly with discomfort motion lines', CLINICAL],
  ['quiz-creatin-hcl', 'creatin-q4-moonface', 'a puffy swollen round face with water-retention cheeks', CLINICAL],
  ['quiz-creatin-hcl', 'creatin-q4-wasser', 'water droplets trapped under a stretched skin surface, puffiness', CLINICAL],
  ['quiz-creatin-hcl', 'creatin-q4-magen', 'an upset stomach with a small lightning bolt, digestive distress', CLINICAL],
  ['quiz-creatin-hcl', 'creatin-q4-keinewirkung', 'a deflated limp muscle arm with a tiny dull spark, no effect', CLINICAL],
  ['quiz-creatin-hcl', 'creatin-q4-pulver', 'a messy powder scoop on a kitchen scale, complicated routine', CLINICAL],
  ['quiz-creatin-hcl', 'creatin-q4-nichts', 'a calm smooth relaxed happy stomach, all good, checkmark', CLINICAL],
  // Mystery Q1 — Ziel
  ['quiz-mystery-box', 'mystery-q1-muskelaufbau', 'a strong flexing muscular arm with a dumbbell', SUMMER],
  ['quiz-mystery-box', 'mystery-q1-abnehmen', 'a slim waist with a measuring tape and an apple', SUMMER],
  ['quiz-mystery-box', 'mystery-q1-lifestyle', 'a healthy balanced lifestyle, water bottle and green leaf, wellness', SUMMER],
  ['quiz-mystery-box', 'mystery-q1-sport', 'a running athlete with energy lightning, performance', SUMMER],
  // Mystery Q2 — Warenkorb
  ['quiz-mystery-box', 'mystery-q2-whey', 'a tub of protein whey powder with a shaker', SUMMER],
  ['quiz-mystery-box', 'mystery-q2-riegel', 'a protein bar and small fitness snacks', SUMMER],
  ['quiz-mystery-box', 'mystery-q2-creatin', 'a jar of creatin capsules with a scoop', SUMMER],
  ['quiz-mystery-box', 'mystery-q2-booster', 'a pre-workout booster scoop with an energy lightning bolt', SUMMER],
  ['quiz-mystery-box', 'mystery-q2-vitamine', 'vitamin pills and softgel capsules, daily basics', SUMMER],
  ['quiz-mystery-box', 'mystery-q2-saucen', 'a squeeze bottle of zero sauce and flavor drops', SUMMER],
  ['quiz-mystery-box', 'mystery-q2-kaum', 'an almost empty shopping basket, minimal supplements', SUMMER],
  // EAA Q6 — Symptome
  ['quiz-eaa', 'eaa-q6-leistungsabfall', 'a downward performance arrow, dropping energy in a workout', CLINICAL],
  ['quiz-eaa', 'eaa-q6-muskelkater', 'a sore aching muscle with pain lines lasting days', CLINICAL],
  ['quiz-eaa', 'eaa-q6-plateau', 'a flat plateau line graph, stuck stalled progress', CLINICAL],
  ['quiz-eaa', 'eaa-q6-muedigkeit', 'a tired sleepy exhausted figure, fatigue after training', CLINICAL],
  ['quiz-eaa', 'eaa-q6-schmaler', 'a thinning shrinking muscle arm getting smaller', CLINICAL],
  ['quiz-eaa', 'eaa-q6-nichts', 'a strong confident healthy muscle arm, no issues, checkmark', CLINICAL],
];

async function gen(project, name, subject, style) {
  const out = path.join(ROOT, project, 'public', 'quiz-img', `${name}.png`);
  if (fs.existsSync(out) && fs.statSync(out).size > 5000) { console.log('skip', name); return; }
  const prompt = `${style} Subject: ${subject}.`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1' } },
        }),
      });
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const img = parts.find((p) => p.inlineData);
      if (!img) throw new Error('no image: ' + JSON.stringify(data).slice(0, 200));
      fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
      console.log('ok', name, fs.statSync(out).size);
      return;
    } catch (e) {
      console.warn(`retry ${attempt} ${name}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  console.error('FAILED', name);
}

for (const [p, n, s, st] of JOBS) {
  await gen(p, n, s, st);
}
console.log('done');
