# DOI-Texte für die Liste „Quiz Funnel Leads" (TLMGKq)

Nur über die Oberfläche änderbar, dafür gibt es keine API.

**Wo:** Klaviyo → Lists & Segments → Quiz Funnel Leads → Settings →
Opt-in process → *Customize for this list* (nicht die Default-Seiten ändern,
sonst trifft es alle anderen Listen).

**Warum überhaupt:** Die Standardfassung verspricht einen 10%-Code. Das Quiz
verspricht eine Box-Empfehlung, und die Ergebnismail liefert keinen Code. Wer
bestätigt, wird sonst auf etwas eingestimmt, das nicht kommt. Neben dem
Vertrauensschaden ist das auch rechtlich schief: die Einwilligung muss für den
Zweck gelten, der im Formular stand.

---

## 1. Bestätigungsmail

**Betreff**

```
Nur noch ein Klick zu deiner Box-Empfehlung
```

**Vorschautext**

```
Bestätige kurz, dann schicken wir sie dir.
```

**Absender:** BrustBizeps · `shop@brustbizeps.de` (identisch zur Ergebnismail,
sonst brechen die Bestätigungsraten ein)

**Überschrift**

```
Fast geschafft
```

**Fließtext**

```
Du hast im Box-Test herausgefunden, welche Mystery Box zu dir passt.
Bevor wir dir deine Empfehlung schicken dürfen, brauchen wir nach DSGVO
eine kurze Bestätigung von dir.
```

**Button**

```
Anmeldung bestätigen
```

**Unter dem Button**

```
Danach bekommst du deine persönliche Empfehlung mit der Warenwert-Rechnung.
Falls du dich nicht angemeldet hast, ignoriere diese Mail einfach.
```

---

## 2. Seite nach dem Klick (Subscription confirmed)

**Überschrift**

```
Bestätigt. Deine Empfehlung ist unterwegs.
```

**Text**

```
Schau in dein Postfach, deine Box-Empfehlung ist gleich da.
```

---

## Worauf beim Bauen achten

- **Ein einziger Handlungsaufruf.** Kein Shop-Menü, keine Produktkacheln, keine
  zweite Verlinkung. Jede Ablenkung kostet Bestätigungen.
- **Gleicher Absender wie die Ergebnismail.** Ein Wechsel wirkt wie Phishing.
- **Farben wie die Ergebnismail** (Creme `#FBF1DD`, Pink `#FF2E7E`, Ink
  `#241C15`), damit beide zusammengehören.
- **Kein Rabatt versprechen**, solange die Ergebnismail keinen liefert.

## Reihenfolge, die daraus entsteht

```
Quiz ausgefüllt
  → Adresse + Pflicht-Einwilligung
  → Bestätigungsmail (dieser Text)
  → Klick
  → Eintritt in die Liste TLMGKq
  → Flow UvLZtY schickt die Box-Empfehlung
```

Der Flow triggert auf „Added to List". Bei Double Opt-in tritt niemand vor dem
Klick ein, die Empfehlung geht also nie vor der Bestätigung raus. Dafür ist
nichts umzustellen.
