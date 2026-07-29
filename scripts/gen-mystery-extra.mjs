// Two extra Nano-Banana 2 images for the mystery-box quiz:
//  1) hook hero (pure illustration, no product) to lift start-rate
//  2) interstitial "box value" scene, using the real product box as a reference attachment
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = (fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
const MODEL = 'gemini-3.1-flash-image';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
const OUT = path.join(ROOT, 'quiz-mystery-box', 'public');

async function gen(name, parts) {
  const out = path.join(OUT, name);
  for (let a = 1; a <= 3; a++) {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1' } } }),
      });
      const data = await res.json();
      const img = (data?.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData);
      if (!img) throw new Error('no image: ' + JSON.stringify(data).slice(0, 300));
      fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
      console.log('ok', name, fs.statSync(out).size);
      return;
    } catch (e) {
      console.warn(`retry ${a} ${name}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 2000 * a));
    }
  }
  console.error('FAILED', name);
}

const HERO = 'Flat playful vector illustration: a wrapped surprise mystery box glowing and bursting open, confetti, sparkles, stars, floating question marks and small abstract gift shapes flying upward out of it, energetic and celebratory, conveying surprise and high value. Rounded shapes in orange (#FF6B2C) and pink-magenta (#FF2E7E) with sunny yellow highlights, solid warm cream background #FBF1DD, single centered subject, generous margin, no text, no words, no letters, no numbers, 1:1 square, modern mobile app illustration style.';

const BOX_VALUE = 'Using the provided BrustBizeps mystery box as the centerpiece, create a vibrant flat playful illustration: the box open with premium fitness supplements, protein snacks, a shaker and jars bursting upward out of it in a joyful explosion, wrapped in a warm golden value-glow with sparkles and confetti, communicating that the contents are worth far more than the price. Keep the box looking like the provided product. Rounded style, orange #FF6B2C and pink #FF2E7E accents, sunny highlights, solid warm cream background #FBF1DD, centered, generous margin, no text, no words, no letters, no numbers, 1:1 square.';

const boxImg = fs.readFileSync(path.join(ROOT, 'mystery-box-summer', 'public', 'XL_Variante.png')).toString('base64');

await gen('hero.png', [{ text: HERO }]);
await gen('box-value.png', [{ inlineData: { mimeType: 'image/png', data: boxImg } }, { text: BOX_VALUE }]);
console.log('done');
