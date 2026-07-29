const BASE = import.meta.env.BASE_URL;

const quizConfig = {
  id: 'mystery-box',

  screens: [
    {
      type: 'hook',
      badge: '🔒 Unverbindlich · Keine E-Mail nötig',
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
      question: 'Süß oder herzhaft?',
      sub: 'Damit deine Box zu deinem Geschmack passt.',
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
    const geschmack = answers.geschmack;
    const experimentier = answers.experimentier;
    const motivation = answers.motivation;

    const boxes = {
      XL: { name: 'XL-Box', price: '84,90€', priceN: 84.9, items: '19 – 25', wert: 'über 120€', wertN: 120 },
      M: { name: 'M-Box', price: '59,90€', priceN: 59.9, items: '13 – 18', wert: 'über 90€', wertN: 90 },
      S: { name: 'S-Box', price: '39,90€', priceN: 39.9, items: '8 – 12', wert: 'über 55€', wertN: 55 },
    };
    let key;
    if (budget === 'Über 100€' || budget === '60 – 100€') key = 'XL';
    else if (budget === '30 – 60€') key = 'M';
    else key = 'S';
    const box = boxes[key];
    const payPct = Math.round((box.priceN / box.wertN) * 100);

    const wantsSnacks = warenkorb.some((w) => w.includes('Riegel') || w.includes('Zero-Saucen'));

    const budgetLabel = budget ? budget.toLowerCase() : 'einen festen Betrag';
    const geschmackLabel = geschmack ? geschmack.toLowerCase() : 'deinen Geschmack';
    const expMap = { Sehr: 'hohe Experimentierfreude', Offen: 'Offenheit für Neues', Vorsichtig: 'Vorliebe für Bewährtes' };
    const expLabel = expMap[experimentier] || 'deine Vorlieben';
    const motivMap = {
      'Der Deal': 'Dich reizt vor allem der Deal, und genau da liefert diese Box am meisten.',
      'Die Überraschung': 'Dich reizt die Überraschung, und beim Auspacken bekommst du genau die.',
      'Neue Produkte entdecken': 'Du willst Neues entdecken, und die Box bringt dir Sachen, die du sonst nie bestellt hättest.',
      'Günstig Vorrat auffüllen': 'Du willst günstig Vorrat auffüllen, und die Box senkt deinen Preis pro Produkt spürbar.',
    };
    const motivLine = motivMap[motivation] ? ` ${motivMap[motivation]}` : '';
    const mirror = `Du gibst aktuell ca. ${budgetLabel} pro Monat für Supplements aus. Die ${box.name} kostet dich ${box.price} und liefert dir ${box.items} verifizierte Bestseller mit einem Warenwert von deutlich ${box.wert}. Basierend auf deinen Antworten: ${geschmackLabel}, ${expLabel}.${motivLine}`;

    return {
      quiz: 'mystery-box',
      type: key,
      eyebrow: 'Deine Box-Empfehlung:',
      title: box.name,
      explosion: {
        box: 'box-open.png',
        caption: 'Beispiel-Inhalte · jede Box wird individuell gepackt',
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
      calc: [
        { label: 'Dein Box-Preis', amount: box.price, pct: payPct, kind: 'pay' },
        { label: 'Warenwert in der Box', amount: box.wert, pct: 100, kind: 'get' },
      ],
      mirrorTitle: '🔍 Deine Rechnung:',
      mirror,
      note: wantsSnacks
        ? {
            title: '➕ Passend zu deinen Antworten: Snack Mystery Box',
            text: 'Du hast Snacks als festen Teil deiner Käufe angegeben. Die Snack Mystery Box bringt dir mindestens +30 % mehr Warenwert obendrauf.',
          }
        : null,
      cta: { label: `Meine ${box.name} sichern →`, href: '/mystery-box-summer/' },
    };
  },
};

export default quizConfig;
