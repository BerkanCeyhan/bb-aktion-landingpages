# Quiz-Funnel Ad-Kampagnen (Meta)

Stand: 2026-07-21 · Ad-Account **BRUSTBIZEPS** (`519019233368220`, EUR)

## Setup (für alle 3 Kampagnen gleich)

| Einstellung | Wert |
|---|---|
| Ziel | Sales (`OUTCOME_SALES`) |
| Budget | CBO, **10 €/Tag** pro Kampagne |
| Optimierung | **Purchase** (Pixel `458434359587251` „Shopify Pixel", `custom_event_type=PURCHASE`) |
| Gebot | Lowest Cost (autobid) |
| Geo | **DACH** (DE, AT, CH) |
| Zielgruppe | **Advantage+ Audience**, broad, keine Alters-/Demo-Einschränkung |
| Placements | Advantage+ (automatisch) |
| Page / IG | FB `110036545072376` (BrustBizeps) · IG `@brustbizeps` (`17841408120911561`) |
| CTA-Button | „Mehr dazu" (`LEARN_MORE`) |
| Status | **PAUSED** (alles zum Review, nichts läuft live) |

Struktur je Funnel: **1 Kampagne → 1 Ad Set → 4 Ads**. Alle 4 Ads teilen sich das Ad Set (bewusst, damit CBO/A+ zwischen den Kreativen optimieren kann).

Lead-Event feuert bereits auf der Quiz-Ergebnisseite (`track('Lead', …)` in `Screens.jsx`). Purchase feuert auf `brustbizeps.de` über den Shopify-Pixel.

---

## Kampagne 1 — Quiz Creatin HCL
Landing: `https://try.brustbizeps.de/quiz-creatin-hcl/`

**Ad 1 · Löslichkeit / Non-Responder** — Bild `creatin-1-loeslichkeit.png`
> Seit Monaten Creatin, und im Spiegel tut sich trotzdem nichts.
> Die meisten schieben es auf ihre Gene und hören auf. Dabei liegt es oft nur an der Form. Monohydrat löst sich schlecht, bleibt im Magen liegen und zieht dort Wasser, statt im Muskel zu landen.
> 60 Sekunden, 11 Fragen, und du weißt, ob du wirklich ein Non-Responder bist oder einfach das falsche Creatin nimmst. 💪
- H1: **Wirkt dein Creatin wirklich?**
- H2: **Mach den Creatin-Check**

**Ad 2 · Blähbauch / Wasser** — Bild `creatin-2-blaehbauch.png`
> Aufgeschwemmtes Gesicht, Ring am Bauch, das „Creatin-Wasser" kennt fast jeder, der Monohydrat nimmt.
> Das ist kein Zeichen, dass es wirkt. Es ist ein Zeichen, dass ein Teil im Magen hängen bleibt und dort Wasser zieht.
> Finde im kurzen Test heraus, welcher Verträglichkeits-Typ du bist und wie du die Wirkung ohne die Wassereinlagerungen bekommst.
- H1: **Creatin ohne Blähbauch?**
- H2: **Dein Verträglichkeits-Typ in 60 Sek.**

**Ad 3 · Klümpchen / Verträglichkeit** — Bild `creatin-3-kapseln.png`
> Kennst du die Klümpchen am Glasrand und den pappigen Rest am Boden? Genau dieser Teil bleibt bei schlecht löslichem Monohydrat ungenutzt, im Glas wie im Magen.
> Creatin-HCL löst sich 59× besser, rührt sich klar an und liegt dir nicht schwer im Bauch.
> Mach den 60-Sekunden-Test und finde heraus, welcher Creatin-Typ du bist.
- H1: **Kein Klümpchen, kein Blähbauch**
- H2: **Welcher Creatin-Typ bist du?**

**Ad 4 · Erfahren / Profil** — Bild `creatin-4-quizui.png`
> 10 Jahre Training, und beim Creatin immer dasselbe. Viel geschluckt, wenig gemerkt.
> Vielleicht lag es nie an dir. HCL löst sich 59× besser als Monohydrat und kommt dort an, wo es wirken soll, im Muskel statt im Magen.
> Der kurze Test zeigt dir dein Creatin-Profil und was für dich Sinn ergibt. Anonym, ohne E-Mail.
- H1: **Dein Creatin-Profil in 60 Sek.**
- H2: **59× löslicher als Monohydrat**

---

## Kampagne 2 — Quiz EAA
Landing: `https://try.brustbizeps.de/quiz-eaa/`

**Ad 1 · Katabolismus** — Bild `eaa-1-katabol.png`
> Du trainierst hart, lange, oft nüchtern, und wunderst dich, warum kaum etwas dazukommt.
> Ab einem gewissen Punkt gehen deinem Körper im Training die Aminosäuren aus. Das Baumaterial holt er sich dann aus deiner eigenen Muskulatur. Du baust ab, während du glaubst aufzubauen.
> Der Katabol-Test zeigt dir in 60 Sekunden, wie hoch dein Risiko gerade ist.
- H1: **Baust du auf oder ab?**
- H2: **Mach den Katabol-Test**

**Ad 2 · Langer Muskelkater** — Bild `eaa-2-muskelkater.png`
> Muskelkater, der drei Tage bleibt, ist kein Zeichen von besonders hartem Training. Oft fehlen deiner Regeneration einfach die Bausteine.
> Wer lange oder nüchtern trainiert, verliert genau die essenziellen Aminosäuren, die den Muskel schützen und reparieren.
> 60-Sekunden-Test: Finde heraus, wo deine Lücke sitzt.
- H1: **Warum bleibt der Muskelkater?**
- H2: **Dein Regenerations-Check**

**Ad 3 · Nüchtern-Training** — Bild `eaa-3-shaker.png`
> Morgens vor der Arbeit ins Gym, nüchtern, schnell durchziehen. Klingt diszipliniert, ist für deine Muskeln aber die riskanteste Zeit.
> Ohne Aminosäuren im Blut bedient sich dein Körper beim eigenen Gewebe. Ein fruchtiger Drink im Training reicht, um das zu stoppen.
> Mach den kurzen Test und sieh, wie katabol dein Training gerade läuft.
- H1: **Nüchtern trainieren = Muskelabbau?**
- H2: **Schütz deine Muskeln im Training**

**Ad 4 · Plateau** — Bild `eaa-4-aufbau-abbau.png`
> Alles richtig gemacht, Training, Protein, Schlaf, und der Fortschritt steht trotzdem still.
> Oft liegt es am Schutz während der Einheit. Verliert dein Körper im Training zu viele Aminosäuren, tritt der Aufbau auf der Stelle.
> Der Katabol-Test zeigt dir in 60 Sekunden, ob genau das dein Plateau erklärt.
- H1: **Woran hängt dein Plateau?**
- H2: **Katabol-Test: 60 Sekunden**

---

## Kampagne 3 — Quiz Mystery Box
Landing: `https://try.brustbizeps.de/quiz-mystery-box/`

**Ad 1 · Warenwert** — Bild `mystery-1-warenwert.png`
> Der Trick an einer guten Mystery Box: Du zahlst einen Preis und bekommst deutlich mehr Warenwert zurück.
> Bei den BrustBizeps-Boxen liegt der Inhalt nachweislich 40 bis 80 % über dem, was du zahlst. Nur echte Bestseller, keine Ladenhüter.
> Mach den 60-Sekunden-Test und finde heraus, welche Box für dich den höchsten Warenwert bringt.
- H1: **Welche Box bringt dir am meisten?**
- H2: **Warenwert weit über Kaufpreis**

**Ad 2 · Neugier** — Bild `mystery-2-mystery.png`
> Eine Box, bis zu 25 Produkte, und du weißt vorher nicht genau, was drin ist. Nur, dass es sich lohnt.
> Kein Restposten, nichts Abgelaufenes. Ausschließlich verifizierte Bestseller aus dem aktuellen Sortiment.
> In 60 Sekunden findest du heraus, welche Größe zu dir passt. 🎁
- H1: **Was ist in deiner Box?**
- H2: **Finde deine Mystery Box**

**Ad 3 · Sparen** — Bild `mystery-3-sparen.png`
> Wenn du sowieso jeden Monat für Shakes, Riegel und Snacks bezahlst, zahlst du wahrscheinlich zu viel.
> Eine Box bündelt Bestseller zum Bruchteil des Einzelpreises, und nebenbei testest du Sachen, die du dir sonst nie bestellt hättest.
> Der kurze Test rechnet dir aus, welche Box deine monatliche Ersparnis maximiert.
- H1: **Zahlst du zu viel für Supplements?**
- H2: **Deine Ersparnis in 60 Sek.**

**Ad 4 · Ziel / Empfehlung** — Bild `mystery-4-quizui.png`
> Muskelaufbau, Abnehmen oder einfach gut versorgt durch die Woche. Nicht jede Box passt zu jedem Ziel.
> Sag uns in ein paar Fragen, worauf du hinauswillst, und wir zeigen dir die Box mit dem besten Verhältnis aus Preis und Warenwert.
> 60 Sekunden, unverbindlich, ohne E-Mail.
- H1: **Welche Box passt zu deinem Ziel?**
- H2: **Deine Box-Empfehlung in 60 Sek.**

---

## Bild-Archetypen (Diversität)
Jeder Funnel deckt 4 unterschiedliche Formate ab — keine Chat-Ads, keine „dramatischen Momente", kein generischer Stock:
1. **Konzept / Still-Life** (Mechanismus sichtbar gemacht)
2. **Bold Callout-Card** (eine kurze deutsche Zeile)
3. **Native Lifestyle-Flatlay** (echter Kontext)
4. **Quiz-UI / Gauge** (spiegelt das Test-Versprechen)

Generiert mit `scripts/gen-ad-images.mjs` (Gemini `gemini-3.1-flash-image`, 3:4, echtes Produktbild als Referenz angehängt).

## Review-Hinweise
- **Purchase-Optimierung bei 10 €/Tag** ist knapp (Kauf liegt 2 Schritte hinter der Ad). Wenn die Ad Sets nach ~3–4 Tagen in „Learning Limited" hängen und kaum ausliefern: auf **Lead** (Quiz-Abschluss) umstellen oder Budget je Kampagne erhöhen.
- **`conversion_domain`** ist auf `brustbizeps.de` gesetzt (dort feuert Purchase), obwohl die Ad auf `try.brustbizeps.de` klickt. Falls Meta meckert, im Ads Manager prüfen.
- **Produkt = Pulver-Dose.** Die Quiz-Ergebnisseite von Creatin spricht aber von „4 Kapseln". Das ist eine Inkonsistenz in eurem Funnel. Die Ad-Copy wurde bewusst auf **Löslichkeit/Verträglichkeit** gedreht (nicht Kapseln), damit sie zum Pulver-Bild passt. Entscheide, ob die Ergebnisseite angepasst werden soll.

## Google-Sheets-Anbindung
Apps Script: `scripts/quiz-sheets-appsscript.gs` (Setup-Anleitung im Datei-Header). Ein Sheet, ein Tab pro Quiz.

### Frontend-Anbindung (optional, sobald die Web-App-URL steht)
In jeder `src/tracking.js` ergänzen und im Result-Effekt aufrufen:

```js
// tracking.js
const SHEETS_URL = 'https://script.google.com/macros/s/XXXX/exec'; // deine Web-App-URL

export function saveSubmission(quiz, resultType, resultTitle, answers) {
  try {
    const p = new URLSearchParams(location.search);
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',                       // kein Preflight, Antwort wird ignoriert
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        quiz, resultType, resultTitle, answers,
        sessionId: (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()),
        meta: {
          utm_source: p.get('utm_source') || '', utm_medium: p.get('utm_medium') || '',
          utm_campaign: p.get('utm_campaign') || '', utm_content: p.get('utm_content') || '',
          fbclid: p.get('fbclid') || '', referrer: document.referrer,
          userAgent: navigator.userAgent, pageUrl: location.href,
        },
      }),
    });
  } catch {}
}
```

Aufruf im Result-Screen (`Screens.jsx`, neben dem bestehenden `track('Lead', …)`):
```js
saveSubmission(result.quiz, result.type, result.title, answers);
```
`answers` ist das Objekt, das `computeResult(answers)` bekommt.
