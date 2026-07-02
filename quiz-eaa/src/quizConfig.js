const BASE = import.meta.env.BASE_URL;

const quizConfig = {
  id: 'eaa',

  screens: [
    {
      type: 'hook',
      badge: '🔒 100 % anonym · Keine E-Mail nötig',
      title: 'Trainierst du dich unbemerkt in den Muskelabbau?',
      sub: 'Finde in 60 Sekunden heraus, ob dein Training aufbaut oder heimlich Muskeln frisst.',
      cta: 'Katabol-Test starten',
      trust: '10 Fragen · ca. 60 Sekunden',
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
      id: 'haeufigkeit',
      type: 'single',
      question: 'Wie oft trainierst du pro Woche?',
      options: [
        { label: '1 – 2x', help: 'Ich bleibe dran, so gut es geht' },
        { label: '3 – 4x', help: 'Feste Routine' },
        { label: '5x oder mehr', help: 'Training ist mein Alltag' },
      ],
    },

    {
      id: 'dauer',
      type: 'single',
      question: 'Wie lange dauert eine typische Trainingseinheit bei dir?',
      sub: 'Die kritische Frage für deinen Katabol-Wert.',
      options: [
        { label: 'Unter 45 Minuten' },
        { label: '45 – 60 Minuten' },
        { label: '60 – 90 Minuten' },
        { label: 'Über 90 Minuten' },
      ],
    },

    {
      id: 'nuechtern',
      type: 'single',
      question: 'Trainierst du manchmal nüchtern oder mit leerem Magen?',
      options: [
        { label: 'Ja, regelmäßig', help: 'Morgens vor dem Essen oder nach langem Arbeitstag' },
        { label: 'Manchmal', help: 'Kommt auf den Tag an' },
        { label: 'Nein, ich esse immer vorher' },
      ],
    },

    {
      type: 'interstitial',
      variant: 'fact',
      eyebrow: '⚠ Kurzer Fakten-Check',
      title: 'Ab einem gewissen Punkt kippt dein Training.',
      body: [
        { text: 'Bei langen oder nüchternen Einheiten gehen deinem Körper die verfügbaren Aminosäuren aus. Er braucht aber weiter Baumaterial. Also holt er es sich dort, wo es am schnellsten verfügbar ist: aus deiner eigenen Muskulatur.' },
        { text: 'Das nennt man katabolen Zustand. Du trainierst hart und baust dabei genau das ab, was du aufbauen willst.' },
        { type: 'good', text: '✨ Die gute Nachricht: Der Schutz ist simpel. Sind während des Trainings essenzielle Aminosäuren im Blut, hat dein Körper keinen Grund, an deine Muskeln zu gehen.' },
      ],
    },

    {
      id: 'symptome',
      type: 'multi',
      question: 'Was kennst du aus deinem Training?',
      sub: 'Wähle alles, was zutrifft.',
      options: [
        { label: 'Leistungsabfall in der zweiten Trainingshälfte', img: 'eaa-q6-leistungsabfall' },
        { label: 'Muskelkater, der 3+ Tage bleibt', img: 'eaa-q6-muskelkater' },
        { label: 'Plateau trotz konsequentem Training', img: 'eaa-q6-plateau' },
        { label: 'Müdigkeit statt Pump nach dem Workout', img: 'eaa-q6-muedigkeit' },
        { label: 'Ich werde eher "schmaler" statt definierter', img: 'eaa-q6-schmaler' },
        { label: 'Nichts davon', img: 'eaa-q6-nichts', exclusive: true },
      ],
    },

    {
      id: 'protein',
      type: 'single',
      question: 'Wie sieht deine Protein-Versorgung rund ums Training aus?',
      options: [
        { label: 'Shake nach dem Training', help: 'Klassiker' },
        { label: 'Ich achte generell auf Protein, aber nichts ums Training herum' },
        { label: 'Ehrlich gesagt: unregelmäßig' },
        { label: 'Ich tracke alles genau' },
      ],
    },

    {
      id: 'ziele',
      type: 'multi',
      question: 'Was willst du in den nächsten 8 Wochen erreichen?',
      sub: 'Wähle alle, die passen.',
      options: [
        { label: 'Mehr Energie und Ausdauer im Workout' },
        { label: 'Schnellere Regeneration, weniger Muskelkater' },
        { label: 'Muskeln schützen, während ich Fett abbaue' },
        { label: 'Das Plateau endlich durchbrechen' },
        { label: 'Alles davon', exclusive: true },
      ],
    },

    {
      type: 'interstitial',
      variant: 'social',
      eyebrow: '★ Social Proof',
      title: 'Du bist nicht allein.',
      body: [
        { text: '47.529+ Kunden vertrauen auf BrustBizeps.' },
        { text: 'Die EAA + Vitamin C Formel kombiniert 7 essenzielle Aminosäuren mit einem Immun-Boost, speziell fürs Training entwickelt.' },
        { type: 'stars', text: '★★★★★ 4,8 / 5 · verifizierte Bewertungen' },
      ],
    },

    {
      id: 'erfahrung',
      type: 'single',
      question: 'Hast du schonmal EAAs genommen?',
      options: [
        { label: 'Ja, regelmäßig', help: 'Gehören zu meiner Routine' },
        { label: 'Ja, mal probiert', help: 'Aber nicht dauerhaft' },
        { label: 'Nein, aber ich kenne BCAAs' },
        { label: 'Was ist der Unterschied überhaupt?' },
      ],
    },

    {
      id: 'ladder1',
      type: 'single',
      question: 'Wusstest du, dass dein Körper bei langen Einheiten ohne Aminosäuren-Versorgung eigene Muskulatur abbaut?',
      options: [{ label: 'Nein' }, { label: 'Ja' }],
    },

    {
      id: 'ladder2',
      type: 'single',
      question: 'Klingt ein fruchtiger Drink während des Trainings besser, als hart erarbeitete Muskeln wieder zu verlieren?',
      options: [{ label: 'Ja' }, { label: 'Nein' }],
    },

    {
      type: 'loading',
      title: 'Wir berechnen deinen Katabol-Wert.',
      sub: 'Gleich siehst du dein Trainings-Profil.',
      duration: 3800,
      statuses: [
        'Analysiere dein Trainings-Profil...',
        'Prüfe deine Risikozonen...',
        'Berechne deinen Katabol-Wert...',
        'Erstelle deinen Befund...',
      ],
      testimonial: {
        text: 'Seit ich EAAs im Training trinke, ist das Nachmittagstief nach dem Workout weg und der Muskelkater deutlich kürzer.',
        author: 'Kim R., verifizierte Käuferin',
      },
    },

    { type: 'result' },
  ],

  computeResult(answers) {
    const dauer = answers.dauer;
    const nuechtern = answers.nuechtern;
    const symptome = (answers.symptome || []).filter((s) => s !== 'Nichts davon');

    // --- Risk score from 3 key answers ---
    const durationRisk = { 'Über 90 Minuten': 2, '60 – 90 Minuten': 2, '45 – 60 Minuten': 1, 'Unter 45 Minuten': 0 }[dauer] ?? 1;
    const fastedRisk = { 'Ja, regelmäßig': 2, Manchmal: 1, 'Nein, ich esse immer vorher': 0 }[nuechtern] ?? 1;
    const symptomRisk = Math.min(symptome.length, 3);
    const total = durationRisk + fastedRisk + symptomRisk;

    let level, gaugeVal, tone;
    if (total >= 6) { level = 'KRITISCH'; gaugeVal = 90; tone = 'bad'; }
    else if (total >= 3) { level = 'ERHÖHT'; gaugeVal = 62; tone = 'mid'; }
    else { level = 'NIEDRIG'; gaugeVal = 24; tone = 'good'; }

    const dauerShort = (dauer || '—').replace(' Minuten', ' Min').replace('Minuten', 'Min');
    const nuechternMap = { 'Ja, regelmäßig': 'REGELMÄSSIG', Manchmal: 'MANCHMAL', 'Nein, ich esse immer vorher': 'NIE' };
    const schutzLueckig = total >= 3;

    // --- Mirror reflecting their own answers ---
    const long = durationRisk === 2;
    const fasted = fastedRisk === 2;
    const dauerPhrase = long ? 'oft 60 Minuten und länger' : 'regelmäßig';
    const nuechternPhrase = fasted ? ' und dabei häufig nüchtern' : '';
    let symptomLine = '';
    if (symptome.length) {
      const short = symptome.slice(0, 2).map((s) => {
        const t = s.toLowerCase();
        if (t.includes('leistungsabfall')) return 'den Leistungsabfall';
        if (t.includes('muskelkater')) return 'den langen Muskelkater';
        if (t.includes('plateau')) return 'das Plateau';
        if (t.includes('müdigkeit')) return 'die Müdigkeit statt Pump';
        if (t.includes('schmaler')) return 'dass du eher schmaler wirst';
        return s.toLowerCase();
      });
      symptomLine = ` Das erklärt ${short.join(' und ')}, obwohl du alles richtig machst.`;
    }
    const mirror = `Du trainierst ${dauerPhrase}${nuechternPhrase}. In der zweiten Hälfte deiner Einheiten arbeitet dein Körper gegen dich: ohne verfügbare Aminosäuren bedient er sich an deiner Muskulatur.${symptomLine}`;

    return {
      quiz: 'eaa',
      type: level,
      eyebrow: 'Dein Katabol-Wert:',
      title: level,
      gauge: { label: 'Muskelabbau-Risiko im Training', level, value: gaugeVal, tone },
      product: { img: `${BASE}produkt.webp`, name: 'BrustBizeps EAA + Vitamin C', tag: '7 essenzielle Aminosäuren · fruchtig · fürs Training' },
      metrics: [
        { label: 'Trainingsdauer', level: dauerShort.toUpperCase(), value: durationRisk === 2 ? 85 : durationRisk === 1 ? 55 : 25, tone: durationRisk === 2 ? 'bad' : durationRisk === 1 ? 'mid' : 'good' },
        { label: 'Nüchtern-Training', level: nuechternMap[nuechtern] || '—', value: fastedRisk === 2 ? 85 : fastedRisk === 1 ? 50 : 20, tone: fastedRisk === 2 ? 'bad' : fastedRisk === 1 ? 'mid' : 'good' },
        { label: 'Muskelschutz aktuell', level: schutzLueckig ? 'LÜCKENHAFT' : 'SOLIDE', value: schutzLueckig ? 30 : 80, tone: schutzLueckig ? 'bad' : 'good' },
        { label: 'Aufbau-Potenzial', level: 'HOCH', value: 90, tone: 'good' },
      ],
      mirror,
      cta: { label: 'Meinen Muskelschutz-Plan ansehen →', href: 'https://brustbizeps.de/products/eaa-pulver' },
    };
  },
};

export default quizConfig;
