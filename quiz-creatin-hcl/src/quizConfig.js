const BASE = import.meta.env.BASE_URL;

const quizConfig = {
  id: 'creatin-hcl',

  screens: [
    {
      type: 'hook',
      badge: '🔒 100 % anonym · Keine E-Mail nötig',
      title: 'Wirkt Creatin bei dir überhaupt?',
      sub: 'Finde in 60 Sekunden heraus, ob du ein Non-Responder bist oder nur das falsche Creatin nimmst.',
      cta: 'Test starten',
      trust: '11 Fragen · ca. 60 Sekunden',
    },

    {
      id: 'alter',
      type: 'single',
      question: 'Wie alt bist du?',
      options: [
        { label: '18 – 24 Jahre' },
        { label: '25 – 34 Jahre' },
        { label: '35 – 44 Jahre' },
        { label: '45+ Jahre' },
      ],
    },

    {
      id: 'erfahrung',
      type: 'single',
      question: 'Wie lange trainierst du schon?',
      options: [
        { label: 'Unter 1 Jahr', help: 'Ich fange gerade richtig an' },
        { label: '1 – 3 Jahre', help: 'Grundlagen sitzen, jetzt will ich mehr' },
        { label: '3 – 10 Jahre', help: 'Erfahren, aber Fortschritt wird zäher' },
        { label: 'Über 10 Jahre', help: 'Alter Hase, ich kenne meinen Körper' },
      ],
    },

    {
      id: 'genommen',
      type: 'single',
      question: 'Hast du schonmal Creatin genommen?',
      sub: 'Die wichtigste Frage für deine Analyse.',
      options: [
        { label: 'Ja, nehme ich aktuell', help: 'Bin aber nicht ganz zufrieden' },
        { label: 'Ja, aber wieder abgesetzt', help: 'Hatte meine Gründe' },
        { label: 'Ja, aber nur unregelmäßig', help: 'Nie konsequent durchgezogen' },
        { label: 'Nein, noch nie', help: 'Ich informiere mich gerade' },
      ],
    },

    {
      id: 'beschwerden',
      type: 'multi',
      question: 'Was hat dich am Creatin gestört?',
      sub: 'Kein Urteil. Wähle alles, was zutrifft.',
      options: [
        { label: 'Blähbauch und Völlegefühl', img: 'creatin-q4-blaehbauch' },
        { label: 'Aufgeschwemmtes Gesicht ("Moon Face")', img: 'creatin-q4-moonface' },
        { label: 'Wassereinlagerungen unter der Haut', img: 'creatin-q4-wasser' },
        { label: 'Magenprobleme oder Durchfall', img: 'creatin-q4-magen' },
        { label: 'Ich habe schlicht keine Wirkung gespürt', img: 'creatin-q4-keinewirkung' },
        { label: 'Die 5g-Pulver-Routine war mir zu umständlich', img: 'creatin-q4-pulver' },
        { label: 'Nichts davon', img: 'creatin-q4-nichts', exclusive: true },
      ],
    },

    {
      type: 'interstitial',
      variant: 'fact',
      eyebrow: '⚠ Kurzer Fakten-Check',
      title: 'Du bist wahrscheinlich kein Non-Responder. Dein Creatin kommt nur nie an.',
      body: [
        { text: 'Normale Creatin-Kristalle (Monohydrat) lösen sich schlecht auf. Ein großer Teil bleibt im Magen liegen, zieht dort Wasser und sorgt für Blähbauch, statt in den Muskel zu gelangen.' },
        { text: 'Die Folge: Du schluckst täglich 5g und dein Muskel sieht davon nur einen Bruchteil.' },
        { type: 'good', text: '✨ Die gute Nachricht: Das Problem ist nicht dein Körper. Es ist die Aufnahme. Und die lässt sich lösen.' },
      ],
    },

    {
      id: 'magen',
      type: 'single',
      question: 'Wie reagiert dein Magen generell auf Supplements?',
      sub: 'Bestimmt deinen Verträglichkeits-Typ.',
      options: [
        { label: 'Sehr empfindlich', help: 'Ich muss bei fast allem aufpassen' },
        { label: 'Eher empfindlich', help: 'Manche Produkte machen Probleme' },
        { label: 'Normal', help: 'Ab und zu was, aber selten' },
        { label: 'Robust', help: 'Mein Magen macht alles mit' },
      ],
    },

    {
      id: 'trainingstyp',
      type: 'single',
      question: 'Welcher Trainings-Typ bist du?',
      sub: 'Dein Ziel verrät, wie Creatin bei dir wirken muss.',
      options: [
        { label: 'Masse & Kraft', help: 'Ich will schwerer heben und größer werden' },
        { label: 'Definition & Ästhetik', help: 'Muskeln ja, aufgeschwemmt nein' },
        { label: 'Athletik & Leistung', help: 'Schneller, explosiver, ausdauernder' },
        { label: 'Wiedereinstieg', help: 'Ich baue gerade wieder auf' },
      ],
    },

    {
      id: 'ziele',
      type: 'multi',
      question: 'Wie möchtest du in 8 Wochen dastehen?',
      sub: 'Wähle alle, die passen.',
      options: [
        { label: 'Prallere, vollere Muskeln' },
        { label: 'Mehr Kraft bei den Grundübungen' },
        { label: 'Definierter Look ohne Wasser unter der Haut' },
        { label: 'Keine Magenprobleme mehr beim Supplementieren' },
        { label: 'Endlich spüren, dass Creatin wirkt' },
        { label: 'Alles davon', exclusive: true },
      ],
    },

    {
      type: 'interstitial',
      variant: 'social',
      eyebrow: '★ Social Proof',
      title: 'Das ist kein Zufall. Du bist nicht allein.',
      body: [
        { text: 'Über 1.200 verifizierte 5-Sterne-Bewertungen.' },
        { text: 'Darunter hunderte ehemalige "Non-Responder", die mit HCL zum ersten Mal eine Wirkung gespürt haben.' },
        { type: 'stars', text: '★★★★★ 4,8 / 5' },
      ],
      stats: [
        { value: '89 %', label: 'spüren mehr Kraft' },
        { value: '92 %', label: 'keine Magenprobleme' },
        { value: '94 %', label: 'Weiterempfehlung' },
      ],
      note: '*interne Befragung, verifizierte Käufer',
    },

    {
      id: 'disziplin',
      type: 'single',
      question: 'Wie diszipliniert bist du bei Einnahme-Routinen?',
      sub: 'Ehrliche Antwort. Danach richtet sich deine Dosier-Empfehlung.',
      options: [
        { label: 'Sehr diszipliniert', help: 'Ich ziehe Routinen komplett durch' },
        { label: 'Meistens dran', help: 'Vergesse es ab und zu' },
        { label: 'Chaotisch', help: 'Pulver abwiegen und anrühren nervt mich' },
        { label: 'Deshalb habe ich ja aufgehört' },
      ],
    },

    {
      id: 'gehoert',
      type: 'single',
      question: 'Wusstest du, dass es Creatin gibt, das sich 59x besser löst als Monohydrat?',
      options: [
        { label: 'Nein, noch nie gehört' },
        { label: 'Ja, aber nie probiert' },
        { label: 'Ja, kenne HCL' },
      ],
    },

    {
      id: 'ladder1',
      type: 'single',
      question: 'Wärst du bereit, deinem Körper eine zweite Chance mit der richtigen Creatin-Form zu geben?',
      options: [{ label: 'Ja' }, { label: 'Nein' }],
    },

    {
      id: 'ladder2',
      type: 'single',
      question: 'Klingen 4 Kapseln ohne Ladephase besser als täglich 5g Pulver-Matsche anrühren?',
      options: [{ label: 'Ja' }, { label: 'Nein' }],
    },

    {
      type: 'loading',
      title: 'Wir berechnen dein Creatin-Profil.',
      sub: 'Das dauert ein paar Sekunden. Die Mühe lohnt sich.',
      duration: 3800,
      statuses: [
        'Analysiere deine Antworten...',
        'Vergleiche mit 1.200+ ähnlichen Profilen...',
        'Bestimme deinen Creatin-Typ...',
        'Erstelle deinen Befund...',
      ],
      testimonial: {
        text: 'Ich dachte 10 Jahre lang, Creatin funktioniert bei mir einfach nicht. Mit HCL habe ich nach 2 Wochen zum ersten Mal den Unterschied im Spiegel gesehen. Und null Blähbauch.',
        author: 'Daniel K., 34',
      },
    },

    { type: 'result' },
  ],

  computeResult(answers) {
    const genommen = answers.genommen;
    const beschwerden = answers.beschwerden || [];
    const disziplin = answers.disziplin;
    const magen = answers.magen;

    const has = (needle) => beschwerden.some((b) => b.toLowerCase().includes(needle));

    // --- Type from 2-3 key answers ---
    let type, title;
    if (has('moon') || has('wasser')) {
      type = 'wasser';
      title = 'Wasser-Speicherer';
    } else if (has('umständlich') || disziplin === 'Chaotisch' || disziplin === 'Deshalb habe ich ja aufgehört') {
      type = 'routine';
      title = 'Routine-Abbrecher';
    } else if (genommen === 'Nein, noch nie') {
      type = 'erst';
      title = 'Erstanwender';
    } else {
      type = 'sensitiv';
      title = 'Sensitiver Nicht-Aufnehmer';
    }

    // --- Magen-Sensibilität metric ---
    const magenMap = {
      'Sehr empfindlich': { level: 'ERHÖHT', value: 85, tone: 'bad' },
      'Eher empfindlich': { level: 'ERHÖHT', value: 68, tone: 'bad' },
      Normal: { level: 'MITTEL', value: 45, tone: 'mid' },
      Robust: { level: 'NIEDRIG', value: 25, tone: 'good' },
    };
    const magenM = magenMap[magen] || { level: 'ERHÖHT', value: 65, tone: 'bad' };

    // --- Mirror: reflect the user's own answers ---
    const openMap = {
      'Ja, nehme ich aktuell': 'Du nimmst Creatin aktuell, bist aber nicht ganz zufrieden.',
      'Ja, aber wieder abgesetzt': 'Du hast Monohydrat probiert und wieder abgesetzt.',
      'Ja, aber nur unregelmäßig': 'Du hast Creatin genommen, aber nie konsequent durchgezogen.',
      'Nein, noch nie': 'Du hast Creatin bisher nie genommen und informierst dich gerade.',
    };
    const open = openMap[genommen] || 'Du hast mit Creatin bisher nicht das erreicht, was du wolltest.';

    const real = beschwerden.filter((b) => b !== 'Nichts davon');
    let complaintLine = '';
    if (real.length) {
      const short = real.slice(0, 2).map((b) => {
        const s = b.toLowerCase();
        if (s.includes('blähbauch')) return 'Blähbauch';
        if (s.includes('moon')) return 'ein aufgeschwemmtes Gesicht';
        if (s.includes('wasser')) return 'Wasser unter der Haut';
        if (s.includes('magen') || s.includes('durchfall')) return 'Magenprobleme';
        if (s.includes('wirkung')) return 'keine spürbare Wirkung';
        if (s.includes('umständlich')) return 'eine nervige Pulver-Routine';
        return b.toLowerCase();
      });
      complaintLine = ` ${short.join(', ')} — genau das kennst du.`;
    }
    const mirror = `${open}${complaintLine} Das liegt nicht an dir und nicht an Creatin. Es liegt an der Form, die nie richtig in deinem Muskel ankommt. HCL löst sich 59x besser als Monohydrat und kommt dort an, wo es wirken soll.`;

    return {
      quiz: 'creatin-hcl',
      type,
      eyebrow: 'Dein Creatin-Profil:',
      title,
      product: { img: `${BASE}produkt.png`, name: 'BrustBizeps Creatin HCL', tag: '4 Kapseln · keine Ladephase · 59x löslicher' },
      metrics: [
        { label: 'Aufnahme-Problem', level: 'HOCH', value: 85, tone: 'bad' },
        { label: 'Magen-Sensibilität', level: magenM.level, value: magenM.value, tone: magenM.tone },
        { label: 'Wirkungs-Potenzial mit HCL', level: 'SEHR HOCH', value: 95, tone: 'good' },
      ],
      mirror,
      cta: { label: 'Meine passende Creatin-Form ansehen →', href: '/creatin-hcl-pro/' },
    };
  },
};

export default quizConfig;
