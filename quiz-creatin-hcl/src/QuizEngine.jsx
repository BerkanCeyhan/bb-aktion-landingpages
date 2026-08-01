import { useMemo, useState } from 'react';
import { track } from './tracking.js';
import { HookScreen, SingleScreen, MultiScreen, InterstitialScreen, EmailScreen, LoadingScreen, ResultScreen } from './Screens.jsx';
import { subscribe } from './klaviyo.js';

export default function QuizEngine({ config, Explosion }) {
  const { screens } = config;
  const [index, setIndex] = useState(() => {
    const s = Number(new URLSearchParams(window.location.search).get('s'));
    return Number.isInteger(s) && s > 0 && s < screens.length ? s : 0;
  });
  const [answers, setAnswers] = useState({});
  const [draft, setDraft] = useState([]); // in-progress multi-select

  const screen = screens[index];

  // Question numbering: only single/multi screens count.
  const questionScreens = useMemo(
    () => screens.filter((s) => s.type === 'single' || s.type === 'multi'),
    [screens]
  );
  const totalQuestions = questionScreens.length;
  const currentQuestionNo = useMemo(() => {
    if (screen.type !== 'single' && screen.type !== 'multi') return null;
    return questionScreens.indexOf(screen) + 1;
  }, [screen, questionScreens]);

  const progressPct = useMemo(() => {
    const answeredBefore = screens.slice(0, index).filter((s) => s.type === 'single' || s.type === 'multi').length;
    return Math.round((answeredBefore / totalQuestions) * 100);
  }, [index, screens, totalQuestions]);

  const goNext = () => setIndex((i) => Math.min(screens.length - 1, i + 1));
  const goBack = () => {
    setIndex((i) => {
      const next = Math.max(0, i - 1);
      const s = screens[next];
      if (s.type === 'multi') setDraft(answers[s.id] || []);
      return next;
    });
  };

  const handleSingle = (label) => {
    setAnswers((a) => ({ ...a, [screen.id]: label }));
    setTimeout(goNext, 220); // brief selected-state feedback, then advance
  };

  const handleMultiNext = () => {
    setAnswers((a) => ({ ...a, [screen.id]: draft }));
    setDraft([]);
    goNext();
  };

  const handleEmail = (email, opts = {}) => {
    setAnswers((a) => ({ ...a, _email: email }));
    track('Subscribe', { quiz: config.id });
    const p = new URLSearchParams(window.location.search);
    // All questions are answered by this point, so the result can already be
    // computed and shipped along — that is what personalises the follow-up mail.
    const r = config.computeResult(answers, config);
    subscribe(email, {
      quiz_source: `quiz-${config.id}`,
      // Trennt die Pflicht-Einwilligung (eine Ergebnismail) von der freiwilligen
      // fuer alles weitere. Segment in Klaviyo: quiz_newsletter_optin ist true.
      quiz_newsletter_optin: opts.newsletter === true,
      quiz_consent_text: config.consentText || '',
      quiz_consent_at: new Date().toISOString(),
      quiz_result_type: r.type,
      quiz_result_title: r.title,
      quiz_result_headline: r.eyebrow,
      quiz_result_summary: r.mirror,
      quiz_box_image: r.emailImage || '',
      quiz_box_price: r.emailPrice || '',
      quiz_box_items: r.emailItems || '',
      quiz_box_wert: r.emailWert || '',
      // absolute, so it also works from inside an email
      quiz_result_url: new URL(r.cta?.href || '/', window.location.origin).href,
      quiz_answers: answers,
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
      fbclid: p.get('fbclid') || '',
    });
    goNext();
  };

  const showProgress = screen.type !== 'hook' && screen.type !== 'result';
  const isFirstQuestion = index <= 1;

  const result = screen.type === 'result' ? config.computeResult(answers, config) : null;

  return (
    <div className="q-app">
      {showProgress && (
        <div className="q-progress-wrap">
          <div className="q-progress-head">
            <button className="q-back" onClick={goBack} disabled={isFirstQuestion} aria-label="Zurück">‹ Zurück</button>
            <span>{currentQuestionNo ? `Frage ${currentQuestionNo} / ${totalQuestions}` : ' '}</span>
          </div>
          <div className="q-progress-track">
            <div className="q-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      <div className="q-shell">
        {(() => {
          switch (screen.type) {
            case 'hook':
              return <HookScreen key={index} screen={screen} onStart={() => { track('QuizStart', { quiz: config.id }); goNext(); }} />;
            case 'single':
              return <SingleScreen key={index} screen={screen} value={answers[screen.id]} onSelect={handleSingle} />;
            case 'multi':
              return <MultiScreen key={index} screen={screen} value={draft} onChange={setDraft} onNext={handleMultiNext} />;
            case 'interstitial':
              return <InterstitialScreen key={index} screen={screen} onNext={goNext} />;
            case 'email':
              return <EmailScreen key={index} screen={screen} onSubmit={handleEmail} />;
            case 'loading':
              return <LoadingScreen key={index} screen={screen} onDone={goNext} />;
            case 'result':
              return <ResultScreen key={index} result={result} answers={answers} Explosion={Explosion} onCta={() => track('QuizCTAClick', { quiz: config.id, result: result.type })} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
