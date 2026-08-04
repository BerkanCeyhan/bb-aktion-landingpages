#!/usr/bin/env node
// Rendert die Explosionsansicht des Quiz einmal als statisches PNG fuer die
// E-Mails. Die Ansicht im Quiz ist absolut positioniert und animiert; beides
// ueberlebt kein E-Mail-HTML (kein Flexbox, kein position:absolute in Outlook).
// Ein Bild traegt dieselbe Bildmarke in die Mail, ohne das Layout zu riskieren.
//
//   node scripts/render-explosion.mjs
//
// Ergebnis: assets/email/explosion.png (wird ueber try.brustbizeps.de/assets/email/
// ausgeliefert, absolute URL, damit die Mail es aus dem Postfach heraus laedt).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'quiz-mystery-box', 'public');
const OUT_DIR = path.join(ROOT, 'assets', 'email');
const OUT = path.join(OUT_DIR, 'explosion.png');

// Dieselben Slots wie BoxExplosion.jsx. Bewusst dupliziert statt importiert:
// die Quiz-Datei ist ein React-Modul mit import.meta.env, hier laeuft nacktes Node.
const LAYOUT = [
  { left: 50, top: 6, scale: 1.15, rot: -3 },
  { left: 22, top: 15, scale: 0.86, rot: -12 },
  { left: 78, top: 15, scale: 0.9, rot: 11 },
  { left: 13, top: 34, scale: 0.72, rot: -16 },
  { left: 87, top: 34, scale: 0.76, rot: 15 },
  { left: 33, top: 30, scale: 1.0, rot: -6 },
  { left: 67, top: 30, scale: 1.05, rot: 7 },
  { left: 18, top: 52, scale: 0.64, rot: -9 },
  { left: 82, top: 52, scale: 0.66, rot: 10 },
  { left: 50, top: 44, scale: 0.82, rot: 2 },
];

const PRODUCTS = [
  ['proteinpulver', 'Protein'], ['creatin', 'Creatin'], ['shaker', 'Shaker'],
  ['proteinbar', 'Brownie'], ['chips', 'Chips'], ['pudding', 'Pudding'],
  ['waffel', 'Waffel'], ['proteinwater', 'Water'], ['whey', 'Clear Whey'],
  ['crunchy', 'Crunchy'],
];

// Fest verdrahtet statt zufaellig: das Bild soll bei jedem Lauf identisch sein,
// sonst ist nicht nachvollziehbar, welche Fassung in welcher Mail steckt.
const CONFETTI = [
  [-118, -96, '#FF6B2C', 8, 24], [96, -132, '#FF2E7E', 7, 310], [-64, -158, '#FFC23C', 9, 130],
  [142, -74, '#FF6B2C', 6, 58], [-152, -52, '#FF2E7E', 8, 200], [38, -176, '#FFC23C', 7, 88],
  [-92, -134, '#FF6B2C', 6, 265], [118, -110, '#FFC23C', 9, 12], [-28, -186, '#FF2E7E', 7, 155],
  [166, -38, '#FF6B2C', 6, 340], [-172, -22, '#FFC23C', 8, 70], [72, -152, '#FF2E7E', 6, 225],
  [-46, -118, '#FF6B2C', 7, 105], [128, -142, '#FFC23C', 7, 190], [-134, -78, '#FF2E7E', 8, 45],
  [16, -196, '#FF6B2C', 6, 280],
];

const b64 = (p) => fs.readFileSync(p).toString('base64');
const img = (p) => `data:image/png;base64,${b64(p)}`;

const items = LAYOUT.map((s, i) => {
  const [file, name] = PRODUCTS[i];
  return `<figure style="position:absolute;margin:0;width:19%;left:${s.left}%;top:${s.top}%;
    transform:translate(-50%,-50%) scale(${s.scale}) rotate(${s.rot}deg);
    text-align:center;z-index:${Math.round(s.scale * 10)};">
    <img src="${img(path.join(PUB, 'products', `${file}.png`))}"
         style="width:100%;height:auto;display:block;filter:drop-shadow(0 6px 9px rgba(36,28,21,.18));">
    <figcaption style="margin-top:3px;font-size:9px;font-weight:700;color:#7A6A57;
      letter-spacing:.01em;line-height:1;white-space:nowrap;">${name}</figcaption>
  </figure>`;
}).join('\n');

const confetti = CONFETTI.map(([tx, ty, color, size, rot]) =>
  `<span style="position:absolute;left:50%;top:60%;width:${size}px;height:${size * 1.6}px;
    background:${color};border-radius:2px;
    transform:translate(${tx}px,${ty}px) rotate(${rot}deg);"></span>`
).join('\n');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  html,body{margin:0;padding:0;background:#FBF1DD;}
  body{font-family:'Hanken Grotesk',system-ui,sans-serif;}
</style></head><body>
<div style="position:relative;width:1040px;height:978px;background:#FBF1DD;">
  <div style="position:absolute;left:50%;top:56%;width:74%;height:60%;transform:translate(-50%,-50%);
    background:radial-gradient(ellipse at center,rgba(255,107,44,.34),transparent 66%);filter:blur(8px);"></div>
  ${confetti}
  ${items}
  <img src="${img(path.join(PUB, 'box-open.png'))}"
       style="position:absolute;left:50%;bottom:0;width:43%;transform:translateX(-50%);z-index:40;
       filter:drop-shadow(0 14px 20px rgba(36,28,21,.24));">
</div></body></html>`;

const tmp = path.join(OUT_DIR, '.explosion-render.html');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(tmp, html);

// Vordergrund und beendet sich selbst: ein Hintergrund-Chromium bricht in dieser
// Umgebung mit Exit 144 ab.
execFileSync('chromium', [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1040,978', '--virtual-time-budget=8000',
  `--screenshot=${OUT}`, `file://${tmp}`,
], { stdio: 'pipe' });

fs.unlinkSync(tmp);
console.log('ok', path.relative(ROOT, OUT), fs.statSync(OUT).size, 'bytes');
