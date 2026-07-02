# Quiz-Funnels — Design Spec

Date: 2026-07-02
Author: Berkan Ceyhan (+ Claude)

## Goal

Three interactive, mobile-first quiz funnels (Typeform-style, in our design) that feel personal and diagnose the prospect's *own* failure, then transition seamlessly into the matching landing page / product. Built to plug into the existing Vite → `dist/<name>` → GitHub Pages monorepo.

Strategy basis: audience is *product-aware*, so quizzes ask "why did it not work for **you**?" not "what is X?". Result mirrors the user's own answers back (perceived personalization).

## Scope

Three projects:

| Project | Theme (reused from) | `base` / URL | Result CTA target | Screens |
|---|---|---|---|---|
| `quiz-creatin-hcl` | Clinical Performance (`creatin-hcl-pro`) | `/quiz-creatin-hcl/` | `/creatin-hcl-pro/` | 16 (0–15) |
| `quiz-mystery-box` | Summer (`mystery-box-summer`) | `/quiz-mystery-box/` | `/mystery-box-summer/` | 12 (0–11) |
| `quiz-eaa` | Clinical Performance (athletic slant) | `/quiz-eaa/` | `https://brustbizeps.de/products/eaa-pulver` | 15 (0–14) |

All copy is verbatim from the user brief (already anti-pattern-clean). No new marketing copy invented beyond micro-UI labels (button text, progress, aria).

## Tech

- **Vite + React 19**, per-project (mirrors existing subprojects). GSAP already in repo deps for transitions/animations.
- Each project: `vite.config.js` with `base: '/<name>/'`, `build.outDir: '../dist/<name>'`, `emptyOutDir: true`.
- No router. Single-page state machine.
- Tailwind: Creatin/EAA use Tailwind v4 `@theme` (copy `creatin-hcl-pro/src/index.css` tokens). Mystery uses Tailwind v3 config (copy `mystery-box-summer` setup). Keeps design homogeneous with the destination LP for a smooth quiz→LP transition.

## Quiz engine (per project, config-driven)

`quizConfig.js` exports an ordered array of screen objects. `<QuizEngine>` holds state and renders the right screen component by `type`.

State:
```
{ index, answers: { [screenId]: value|value[] } }
```

Screen types:
- `hook` — title, subline, trust line, single "Start" CTA. Fires `QuizStart`.
- `single` — question, optional subline, options[]; **auto-advance** on tap (frictionless). Optional per-option image.
- `multi` — question, options[], multi-select toggles + "Weiter" button. Optional images. `Nichts davon` / `Alles davon` are exclusive toggles.
- `interstitial` — `fact` or `social` variant. Statement, no input, "Weiter" button.
- `loading` — animated, timed (~3.5s), embedded testimonial, then auto-advance.
- `result` — dynamic befund + animated diagram(s) + CTA. Fires `Lead`; CTA fires `QuizCTAClick`.

Shared UI:
- **Sticky top progress bar** — `Frage X / N` + animated fill (GSAP width tween). Interstitials/loading don't increment the counter but keep the bar visible.
- **Option card** — mobile-first, min 44px tap target, square image slot on top (when image present) + label + optional helper text in parentheses. Selected state uses theme accent.
- **Transitions** — GSAP fade/slide between screens, respects `prefers-reduced-motion`.
- Back affordance (small, top-left) — non-essential, allowed.

### Reusable across projects

Engine + screen components are generic and identical across the three projects. To avoid drift they are duplicated per project (no workspace tooling in repo); differences live entirely in `quizConfig.js` + theme CSS + a small `theme.js` (accent classes, result diagram variant). YAGNI: no shared package.

## Dynamic result logic

Derived from 2–3 key answers; falls through to a sensible default. Result copy mirrors chosen answers.

### Creatin (`quiz-creatin-hcl`)
Keys: Q3 `genommen` (screen 3), Q4 `beschwerden` (screen 4, multi).
- water/moonface complaint (`aufgeschwemmtes Gesicht` or `Wassereinlagerungen`) → **Wasser-Speicherer**
- `umständlich` complaint OR disciplin answer `chaotisch`/`aufgehört` (screen 10) → **Routine-Abbrecher**
- `Nein, noch nie` → **Erstanwender**
- else → **Sensitiver Nicht-Aufnehmer** (default)

Result fields: Aufnahme-Problem HOCH, Magen-Sensibilität from screen 6, Wirkungs-Potenzial SEHR HOCH. Mirror line built from Q3+Q4 (e.g. "Du hast Monohydrat probiert und wieder abgesetzt. Blähbauch, keine spürbare Wirkung.").
Animated: horizontal bars (Aufnahme-Problem, Magen-Sensibilität, Wirkungs-Potenzial).

### Mystery (`quiz-mystery-box`)
Keys: Q3 `budget` (screen 3), Q4 `praeferenz` (screen 4), Q2 `warenkorb` (screen 2, multi — snacks?).
- budget `Über 100€` or `60–100€` → **XL-Box**
- budget `30–60€` → **M-Box**
- budget `Unter 30€` → **S-Box**
- Snacks selected in Q2 OR `Team Süß/Herzhaft` → append **Snack Mystery Box** upsell block.
Result: concrete Warenwert calc using the budget bucket + box price (XL 84,90€). Animated: price-vs-Warenwert comparison bar ("du zahlst X, du bekommst >Y").

### EAA (`quiz-eaa`)
Keys: Q3 `dauer` (screen 3), Q4 `nuechtern` (screen 4), Q5 `symptome` (screen 6, multi).
Score = duration risk + fasted risk + symptom count:
- long (`60–90` / `Über 90`) + fasted `regelmäßig` + ≥3 symptoms → **KRITISCH**
- any moderate combination → **ERHÖHT** (default)
- short + never fasted + 0–1 symptom → **NIEDRIG**
Result: Katabol gauge (animated arc), Trainingsdauer/Nüchtern/Muskelschutz/Aufbau-Potenzial rows, mirror line from Q3+Q4.

## Images (nano-banana)

Model: `gemini-3.1-flash-image` (Nano Banana 2), `imageConfig.aspectRatio: "1:1"`, `responseModalities:["IMAGE"]`. No text in images. Flat, homogeneous illustrated icon style, theme palette per quiz.

Generation script: `scripts/gen-images.mjs` (Node, reads `GEMINI_API_KEY` from `.env`, one prompt array per quiz, writes PNGs into each project's `public/quiz-img/`). Run once locally; committed PNGs are what ship (CI does NOT call Gemini).

Approved image set (~24):
- **Creatin Q4** (Beschwerden, 7): Blähbauch, Moon-Face, Wassereinlagerung, Magenprobleme/Durchfall, keine Wirkung, umständliches Pulver, Nichts davon.
- **Mystery Q1** (Ziel, 4): Muskelaufbau, Abnehmen/Definition, Fitter Lifestyle, Sport-Leistung.
- **Mystery Q2** (Warenkorb, 7): Whey, Riegel/Snacks, Creatin, Booster, Vitamine, Zero-Saucen, kaum Supplements.
- **EAA Q6** (Symptome, 6): Leistungsabfall, langer Muskelkater, Plateau, Müdigkeit, "schmaler werden", Nichts davon.

Style anchors:
- Creatin/EAA: warm bone `#F1ECE1` bg, cobalt `#1E50E5` + signal orange `#FF4D17`, thick clean rounded outlines.
- Mystery: warm cream `#FBF1DD` bg, orange `#FF6B2C` + volt `#FF2E7E`, playful rounded.

Product imagery on result pages: reuse existing `public/` assets (e.g. `creatin-hcl-pro/public/produkt-bild.png`, `mystery-box-summer/public/XL_Variante.png`, `EAA.webp`).

## Tracking (Meta Pixel)

Reuse existing pixel ID `458434359587251` in each `index.html` (same snippet as the LPs) + `PageView`. Engine fires via `window.fbq`:
- `QuizStart` (trackCustom) on hook CTA.
- `Lead` (standard) when result screen reached.
- `QuizCTAClick` (trackCustom, with `{quiz, result}`) on result CTA, then navigate.
Guarded so it no-ops if `fbq` is blocked.

## Deploy / integration

- Add all three to root `package.json`: `install:all` (append `npm install --prefix <name>`), `build` (append `npm run build:<name>` before `generate-index.js`), plus `build:<name>` + `dev:<name>` scripts.
- Add three `<li>` links to `generate-index.js` root index.
- Existing `.github/workflows/deploy.yml` (`npm ci` + `npm run build` → `peaceiris/actions-gh-pages` → `dist`, CNAME `try.brustbizeps.de`) ships them unchanged. Final URLs: `https://try.brustbizeps.de/quiz-creatin-hcl/` etc.
- Push to `main` triggers deploy. Provide the three URLs to the user after deploy succeeds.

## Non-goals (YAGNI)

- No backend, no email capture (brief says "keine E-Mail nötig").
- No A/B framework, no analytics beyond the pixel.
- No shared npm workspace/package.
- EAA landing page (does not exist; CTA leaves to brustbizeps.de).
- No CI-side image generation.

## Risks

- Root `npm ci` needs the root lockfile to stay in sync; subprojects install via `install:all` postinstall (existing pattern) — verify CI still green after adding projects.
- Gemini image style consistency across ~24 images: use one shared style suffix string per theme; regenerate outliers individually.
- GSAP is a dep only in `creatin-hcl-pro`/`mystery-box-summer`; each quiz project must declare its own deps.
