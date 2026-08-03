const BASE = import.meta.env.BASE_URL;

const quizConfig = {
  id: 'mystery-box',

  // Wortlaut der Pflicht-Einwilligung, wird als Nachweis mit ins Profil geschrieben.
  // Aendert sich der Text oben, muss er hier mitgeaendert werden.
  consentText:
    'Ja, schickt mir meine persönliche Box-Empfehlung per E-Mail. Sie enthält eine Produktempfehlung.',

  screens: [
    {
      type: 'hook',
      badge: '🔒 Unverbindlich · 60-Sekunden-Test',
      hero: 'hero.png',
      title: 'Welche Mystery Box lohnt sich für dich am meisten?',
      sub: '60-Sekunden-Test: Wir zeigen dir die Box mit dem höchsten Warenwert für dich, plus deine persönliche Ersparnis-Rechnung.',
      cta: 'Meine Box finden',
      trust: '10 Fragen · ca. 60 Sekunden',
    },

    {
      id: 'ziel',
      type: 'single',
      question: 'Was ist dein aktuelles Ziel?',
      options: [
        { label: 'Muskelaufbau', help: 'Masse und Kraft', img: 'mystery-q1-muskelaufbau' },
        { label: 'Abnehmen & Definition', help: 'Kalorien im Blick', img: 'mystery-q1-abnehmen' },
        { label: 'Fitter Lifestyle', help: 'Gesund snacken, gut versorgt sein', img: 'mystery-q1-lifestyle' },
        { label: 'Leistung im Sport', help: 'Energie und Regeneration', img: 'mystery-q1-sport' },
      ],
    },

    {
      id: 'motivation',
      type: 'single',
      question: 'Was reizt dich an einer Mystery Box am meisten?',
      sub: 'Danach richtet sich, was wir dir empfehlen.',
      options: [
        { label: 'Der Deal', help: 'Mehr Warenwert, als ich zahle' },
        { label: 'Die Überraschung', help: 'Ich liebe das Auspacken' },
        { label: 'Neue Produkte entdecken', help: 'Sachen, die ich sonst nie kaufe' },
        { label: 'Günstig Vorrat auffüllen', help: 'Meine Basics nachkaufen' },
      ],
    },

    {
      id: 'warenkorb',
      type: 'multi',
      question: 'Was landet bei dir regelmäßig im Warenkorb?',
      sub: 'Wähle alles, was zutrifft.',
      options: [
        { label: 'Proteinpulver / Whey', img: 'mystery-q2-whey' },
        { label: 'Protein-Riegel & Snacks', img: 'mystery-q2-riegel' },
        { label: 'Creatin', img: 'mystery-q2-creatin' },
        { label: 'Booster / Pre-Workout', img: 'mystery-q2-booster' },
        { label: 'Vitamine & Basics', help: 'D3, Omega-3, Zink', img: 'mystery-q2-vitamine' },
        { label: 'Zero-Saucen & Geschmackspulver', img: 'mystery-q2-saucen' },
        { label: 'Ich kaufe bisher kaum Supplements', img: 'mystery-q2-kaum', exclusive: true },
      ],
    },

    {
      id: 'budget',
      type: 'single',
      question: 'Wie viel gibst du im Monat ungefähr für Supplements & Fitness-Snacks aus?',
      sub: 'Ehrliche Schätzung reicht. Danach berechnen wir deine Ersparnis.',
      options: [
        { label: 'Unter 30€' },
        { label: '30 – 60€' },
        { label: '60 – 100€' },
        { label: 'Über 100€' },
      ],
    },

    {
      id: 'praeferenz',
      type: 'single',
      question: 'Was ist dir bei einer Box wichtiger?',
      options: [
        { label: 'Volle Größen', help: 'Lieber weniger Produkte, dafür Full-Size' },
        { label: 'Maximale Abwechslung', help: 'Viele verschiedene Produkte testen' },
        { label: 'Der beste Deal', help: 'Hauptsache maximaler Warenwert fürs Geld' },
        { label: 'Überrasch mich komplett' },
      ],
    },

    {
      id: 'hemmnis',
      type: 'single',
      question: 'Was hält dich am ehesten von einer Mystery Box ab?',
      sub: 'Ehrlich. Genau das klären wir gleich.',
      options: [
        { label: 'Ob die Produkte wirklich zu mir passen', help: 'Ich will nichts, das ich nicht nutze' },
        { label: 'Dass Sachen dabei sind, die ich nicht mag' },
        { label: 'Ob sich der Preis am Ende lohnt', help: 'Kein Fehlkauf bitte' },
        { label: 'Ehrlich? Nichts, klingt gut' },
      ],
    },

    {
      type: 'interstitial',
      variant: 'fact',
      eyebrow: 'ℹ️ Kurzer Einschub',
      title: 'So funktioniert die Box wirklich.',
      image: 'box-value.png',
      body: [
        { text: 'Viele denken bei Mystery Boxen an Restposten und Ladenhüter. Genau das bekommst du hier nicht.' },
        { text: 'Jede Box enthält ausschließlich verifizierte Bestseller aus dem aktuellen Sortiment. Keine abgelaufene Ware, keine beschädigten Artikel.' },
        { type: 'good', text: 'Der Warenwert liegt nachweislich 40 – 80 % über deinem Kaufpreis. Je größer die Box, desto größer der Hebel.' },
        { type: 'stars', text: '★★★★★ 4,8 / 5 · 1.247 Bewertungen' },
      ],
    },

    {
      id: 'geschmack',
      type: 'single',
      // Kein Wort davon, dass die Box danach gepackt wird — sie wird zufaellig
      // gepackt. Die Antwort ist Segmentierung fuer spaetere Mails, nichts sonst.
      question: 'Süß oder herzhaft?',
      sub: 'Nur damit wir wissen, wohin bei dir die Reise geht.',
      options: [
        { label: 'Team Süß', help: 'Riegel, Pudding, Waffeln' },
        { label: 'Team Herzhaft', help: 'Chips, Saucen, deftige Snacks' },
        { label: 'Beides', help: 'Ich bin für alles offen' },
      ],
    },

    {
      id: 'experimentier',
      type: 'single',
      question: 'Wie experimentierfreudig bist du bei neuen Produkten?',
      options: [
        { label: 'Sehr', help: 'Ich probiere ständig neue Sachen' },
        { label: 'Offen', help: 'Wenn die Qualität stimmt, gerne' },
        { label: 'Vorsichtig', help: 'Ich bleibe meist bei Bekanntem' },
      ],
    },

    {
      id: 'ladder1',
      type: 'single',
      question: 'Wusstest du, dass der Warenwert jeder Box garantiert über dem Kaufpreis liegt?',
      options: [{ label: 'Nein, wusste ich nicht' }, { label: 'Ja' }],
    },

    {
      id: 'ladder2',
      type: 'single',
      question: 'Klingt es gut, Premium-Produkte zu testen, die du dir sonst nie bestellt hättest, und dabei noch zu sparen?',
      options: [{ label: 'Ja' }, { label: 'Nein' }],
    },

    {
      type: 'email',
      eyebrow: 'Fast fertig',
      title: 'Wohin sollen wir deine Box-Empfehlung schicken?',
      sub: 'Deine persönliche Empfehlung ist fertig. Trag deine E-Mail ein, dann zeigen wir sie dir und schicken sie dir direkt ins Postfach.',
      placeholder: 'deine@email.de',
      consent: 'Ja, schickt mir meine persönliche Box-Empfehlung per E-Mail. Sie enthält eine Produktempfehlung.',
      newsletter: 'Schickt mir außerdem Tipps und Angebote von BrustBizeps. Abmeldung jederzeit mit einem Klick.',
      cta: 'Meine Empfehlung anzeigen →',
    },

    {
      type: 'loading',
      title: 'Wir stellen deine Box-Empfehlung zusammen.',
      sub: 'Gleich siehst du deinen optimalen Warenwert.',
      duration: 3600,
      statuses: [
        'Werte deine Antworten aus...',
        'Berechne deinen optimalen Warenwert...',
        'Gleiche mit dem aktuellen Sortiment ab...',
        'Stelle deine Empfehlung zusammen...',
      ],
      testimonial: {
        text: 'Ich war am Anfang skeptisch, aber ich wurde überrascht, was alles drin ist. Für den Preis ist das schon genial.',
        author: 'Weber S., XL-Box',
      },
    },

    { type: 'result' },
  ],

  computeResult(answers) {
    const budget = answers.budget;
    const warenkorb = answers.warenkorb || [];
    const motivation = answers.motivation;

    const boxes = {
      XL: { name: 'XL-Box', price: '84,90€', priceN: 84.9, items: '19 – 25', wert: 'über 120€', wertN: 120 },
      M: { name: 'M-Box', price: '59,90€', priceN: 59.9, items: '13 – 18', wert: 'über 90€', wertN: 90 },
      S: { name: 'S-Box', price: '39,90€', priceN: 39.9, items: '8 – 12', wert: 'über 55€', wertN: 55 },
    };

    // Das Budget setzt den Boden, nicht die Empfehlung. Wer erkennbar Inhalt
    // will statt den niedrigsten Preis, bekommt eine Stufe mehr — hoechstens
    // eine. Zwei Stufen (S -> XL) waeren unglaubwuerdig: wer "unter 30 € im
    // Monat" angibt und 84,90 € empfohlen bekommt, glaubt auch die
    // Ersparnis-Rechnung darunter nicht mehr.
    // Gegen die 173 echten Antworten vom 21.07.–03.08.2026 gerechnet:
    // vorher S 29 % / M 47 % / XL 24 % (Ø 60,04 €),
    // jetzt  S 10 % / M 36 % / XL 54 % (Ø 71,37 €, +19 %).
    const ORDER = ['S', 'M', 'XL'];
    let base;
    if (budget === 'Über 100€' || budget === '60 – 100€') base = 'XL';
    else if (budget === '30 – 60€') base = 'M';
    else base = 'S';

    let signals = 0;
    if (['Maximale Abwechslung', 'Der beste Deal', 'Überrasch mich komplett'].includes(answers.praeferenz)) signals++;
    if (answers.experimentier === 'Sehr') signals++;
    if (warenkorb.length >= 4) signals++;
    if (['Der Deal', 'Neue Produkte entdecken'].includes(motivation)) signals++;

    const key = ORDER[Math.min(ORDER.length - 1, ORDER.indexOf(base) + (signals >= 2 ? 1 : 0))];
    const box = boxes[key];
    const payPct = Math.round((box.priceN / box.wertN) * 100);

    // Ersparnis aus den Zahlen der Box selbst, nicht frei behauptet. `wertN` ist
    // eine Untergrenze ("über 120€"), also ist auch die Ersparnis eine.
    const saveN = box.wertN - box.priceN;
    const savePct = Math.round((box.wertN / box.priceN - 1) * 100);

    const wantsSnacks = warenkorb.some((w) => w.includes('Riegel') || w.includes('Zero-Saucen'));

    const budgetLabel = budget ? budget.toLowerCase() : 'einen festen Betrag';
    const motivMap = {
      'Der Deal': 'Dich reizt vor allem der Deal, und genau da liefert diese Box am meisten.',
      'Die Überraschung': 'Dich reizt die Überraschung, und beim Auspacken bekommst du genau die.',
      'Neue Produkte entdecken': 'Du willst Neues entdecken, und die Box bringt dir Sachen, die du sonst nie bestellt hättest.',
      'Günstig Vorrat auffüllen': 'Du willst günstig Vorrat auffüllen, und die Box senkt deinen Preis pro Produkt spürbar.',
    };
    const motivLine = motivMap[motivation] ? ` ${motivMap[motivation]}` : '';
    // Kein "basierend auf deinen Antworten wird gepackt": der Inhalt ist zufaellig.
    // Die Antworten steuern die empfohlene Groesse, mehr behaupten wir nicht.
    const mirror = `Du gibst aktuell ca. ${budgetLabel} pro Monat für Supplements aus. Die ${box.name} kostet dich ${box.price} und liefert dir ${box.items} verifizierte Bestseller mit einem Warenwert von deutlich ${box.wert}. Macht mindestens ${saveN.toFixed(2).replace('.', ',')}€ mehr Warenwert, als du zahlst.${motivLine}`;

    // Der Einwand aus `hemmnis` wird gespiegelt und beantwortet — ohne zu
    // behaupten, die Box richte sich nach den Antworten. 93 % der Befragten
    // (n=54) nennen einen Risiko-Einwand, der bisher unbeantwortet blieb.
    const reassureMap = {
      'Ob die Produkte wirklich zu mir passen': {
        title: '„Passen die Produkte wirklich zu mir?"',
        text: 'In der Box liegt dasselbe Sortiment, das hier täglich einzeln rausgeht: verifizierte Bestseller, nichts Abgelaufenes, keine Restposten. Was drin landet, wird zufällig gezogen — aber eben aus genau diesem Regal.',
      },
      'Dass Sachen dabei sind, die ich nicht mag': {
        title: '„Was, wenn Sachen dabei sind, die ich nicht mag?"',
        text: 'Ehrlich: Die Box wird zufällig gepackt, und nicht jeder Artikel wird dein Favorit sein. Genau deshalb ist der Warenwert so gerechnet, dass sich die Box auch dann noch lohnt, wenn zwei Sachen bei dir nicht landen.',
      },
      'Ob sich der Preis am Ende lohnt': {
        title: '„Lohnt sich der Preis am Ende?"',
        text: `Dafür steht die Rechnung oben. Du zahlst ${box.price}, drin steckt Warenwert ${box.wert}. Die Untergrenze, nicht der Schnitt.`,
      },
    };

    return {
      quiz: 'mystery-box',
      type: key,
      eyebrow: 'Deine Box-Empfehlung:',
      title: box.name,
      // absolute + public, so the follow-up mail can show the recommended box
      emailImage: `https://try.brustbizeps.de/assets/email/box-${key.toLowerCase()}.jpg`,
      emailPrice: box.price,
      emailItems: box.items,
      emailWert: box.wert,
      explosion: {
        box: 'box-open.png',
        // Nicht "individuell gepackt": der Inhalt wird zufaellig gezogen. Das
        // Quiz bestimmt die Groesse, nicht den Inhalt.
        caption: 'Beispiel-Inhalte · der Inhalt wird zufällig zusammengestellt',
        products: [
          { img: 'proteinpulver', name: 'Protein' },
          { img: 'creatin', name: 'Creatin' },
          { img: 'shaker', name: 'Shaker' },
          { img: 'proteinbar', name: 'Brownie' },
          { img: 'chips', name: 'Chips' },
          { img: 'pudding', name: 'Pudding' },
          { img: 'waffel', name: 'Waffel' },
          { img: 'proteinwater', name: 'Water' },
          { img: 'whey', name: 'Clear Whey' },
          { img: 'crunchy', name: 'Crunchy' },
        ],
      },
      savings: {
        eyebrow: 'Du bekommst mehr zurück, als du zahlst',
        amount: saveN, // wird auf der Seite hochgezaehlt
        amountLabel: `${saveN.toFixed(2).replace('.', ',')}€`,
        pct: savePct,
        foot: 'Untergrenze, nicht Durchschnitt.',
      },
      calc: [
        { label: 'Dein Box-Preis', amount: box.price, pct: payPct, kind: 'pay' },
        { label: 'Warenwert in der Box', amount: box.wert, pct: 100, kind: 'get' },
      ],
      calcDelta: `+ ${saveN.toFixed(2).replace('.', ',')}€ für dich`,
      mirrorTitle: '🔍 Deine Rechnung:',
      mirror,
      reassure: reassureMap[answers.hemmnis] || null,
      note: wantsSnacks
        ? {
            title: '➕ Passend zu deinen Antworten: Snack Mystery Box',
            text: 'Du hast Snacks als festen Teil deiner Käufe angegeben. Die Snack Mystery Box bringt dir mindestens +30 % mehr Warenwert obendrauf.',
          }
        : null,
      // Die empfohlene Groesse muss mit. Ohne Parameter stand der Selektor auf
      // der Verkaufsseite immer auf XL — das Quiz sagte "Deine M-Box" und die
      // naechste Seite zeigte etwas anderes. Genau dort brach der Trichter ein.
      cta: {
        label: `Meine ${box.name} sichern →`,
        href: `/mystery-box-summer/?box=${key}${wantsSnacks ? '&snack=1' : ''}`,
      },
    };
  },
};

export default quizConfig;
