import { useEffect, useRef, useState } from 'react';
import { track, saveSubmission } from './tracking.js';
import { PRIVACY_URL } from './klaviyo.js';

const BASE = import.meta.env.BASE_URL;
const img = (name) => `${BASE}quiz-img/${name}.png`;

function Check({ radio }) {
  return (
    <span className={`q-check${radio ? ' q-radio' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

/* ---------------- Hook ---------------- */
export function HookScreen({ screen, onStart }) {
  return (
    <div className="q-screen q-hook">
      {screen.badge && <span className="q-hook-badge">{screen.badge}</span>}
      {screen.hero && (
        <div className="q-hook-hero"><img src={`${BASE}${screen.hero}`} alt="" /></div>
      )}
      <h1 className="q-hook-title">{screen.title}</h1>
      {screen.sub && <p className="q-hook-sub">{screen.sub}</p>}
      <div className="q-foot">
        <button className="q-cta" onClick={onStart}>{screen.cta || 'Jetzt starten'}</button>
        {screen.trust && <p className="q-trust">{screen.trust}</p>}
      </div>
    </div>
  );
}

/* ---------------- Single select ---------------- */
export function SingleScreen({ screen, value, onSelect }) {
  const hasImg = screen.options.some((o) => o.img);
  return (
    <div className="q-screen">
      {screen.eyebrow && <p className="q-eyebrow">{screen.eyebrow}</p>}
      <h2 className="q-question">{screen.question}</h2>
      {screen.sub && <p className="q-sub">{screen.sub}</p>}
      <div className={`q-options${hasImg ? ' has-img' : ''}`}>
        {screen.options.map((o) => {
          const sel = value === o.label;
          return (
            <button key={o.label} className={`q-opt${sel ? ' sel' : ''}`} onClick={() => onSelect(o.label)}>
              {o.img && <img className="q-opt-img" src={img(o.img)} alt="" loading="lazy" />}
              <span className="q-opt-body">
                <span className="q-opt-label">{o.label}</span>
                {o.help && <span className="q-opt-help">{o.help}</span>}
              </span>
              <Check radio />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Multi select ---------------- */
export function MultiScreen({ screen, value = [], onChange, onNext }) {
  const hasImg = screen.options.some((o) => o.img);
  const toggle = (o) => {
    const excl = o.exclusive;
    let next;
    if (value.includes(o.label)) {
      next = value.filter((v) => v !== o.label);
    } else if (excl) {
      next = [o.label];
    } else {
      next = [...value.filter((v) => !screen.options.find((x) => x.label === v)?.exclusive), o.label];
    }
    onChange(next);
  };
  return (
    <div className="q-screen">
      {screen.eyebrow && <p className="q-eyebrow">{screen.eyebrow}</p>}
      <h2 className="q-question">{screen.question}</h2>
      {screen.sub && <p className="q-sub">{screen.sub}</p>}
      <div className={`q-options${hasImg ? ' has-img' : ''}`}>
        {screen.options.map((o) => {
          const sel = value.includes(o.label);
          return (
            <button key={o.label} className={`q-opt${sel ? ' sel' : ''}`} onClick={() => toggle(o)}>
              {o.img && <img className="q-opt-img" src={img(o.img)} alt="" loading="lazy" />}
              <span className="q-opt-body">
                <span className="q-opt-label">{o.label}</span>
                {o.help && <span className="q-opt-help">{o.help}</span>}
              </span>
              <Check />
            </button>
          );
        })}
      </div>
      <div className="q-foot">
        <button className="q-cta" disabled={value.length === 0} onClick={onNext}>Weiter</button>
      </div>
    </div>
  );
}

/* ---------------- Interstitial ---------------- */
export function InterstitialScreen({ screen, onNext }) {
  const trust = screen.variant === 'social';
  return (
    <div className="q-screen">
      {screen.eyebrow && (
        <span className={`q-inter-eyebrow${trust ? ' trust' : ''}`}>{screen.eyebrow}</span>
      )}
      <h2 className="q-inter-title">{screen.title}</h2>
      {screen.image && (
        <div className="q-inter-image"><img src={`${BASE}${screen.image}`} alt="" /></div>
      )}
      <div className="q-inter-body">
        {screen.body.map((b, i) =>
          b.type === 'good' ? (
            <div key={i} className="q-inter-good">{b.text}</div>
          ) : b.type === 'stars' ? (
            <div key={i} className="q-stars">{b.text}</div>
          ) : (
            <p key={i} className={b.muted ? 'muted' : ''}>{b.text}</p>
          )
        )}
        {screen.stats && (
          <div className="q-stat-row">
            {screen.stats.map((s, i) => (
              <div key={i} className="q-stat"><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
        )}
        {screen.note && <p className="q-note-small">{screen.note}</p>}
      </div>
      <div className="q-foot">
        <button className="q-cta" onClick={onNext}>{screen.cta || 'Weiter'}</button>
      </div>
    </div>
  );
}

/* ---------------- Email gate ---------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailScreen({ screen, onSubmit }) {
  const [email, setEmail] = useState('');
  // Zwei getrennte Einwilligungen. Die erste deckt genau die eine Mail ab, die
  // hier versprochen wird, die zweite alles darueber hinaus. Beide starten leer,
  // vorangehakt waere nach DSGVO keine Einwilligung.
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [touched, setTouched] = useState(false);
  const valid = EMAIL_RE.test(email.trim());
  const canSubmit = valid && consent;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (canSubmit) onSubmit(email.trim(), { newsletter });
  };

  return (
    <div className="q-screen">
      {screen.eyebrow && <p className="q-eyebrow">{screen.eyebrow}</p>}
      <h2 className="q-question">{screen.title}</h2>
      {screen.sub && <p className="q-sub">{screen.sub}</p>}

      <form className="q-email-form" onSubmit={submit} noValidate>
        <input
          className={`q-email-input${touched && !valid ? ' err' : ''}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          spellCheck="false"
          placeholder={screen.placeholder || 'deine@email.de'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-label="E-Mail-Adresse"
        />
        {touched && !valid && <p className="q-email-err">Bitte gib eine gültige E-Mail-Adresse ein.</p>}

        <label className="q-consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>
            {screen.consent}
            <b className="q-req"> Pflicht</b>
          </span>
        </label>

        {screen.newsletter && (
          <label className="q-consent">
            <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
            <span>
              {screen.newsletter}
              <span className="q-consent-opt"> Freiwillig</span>
            </span>
          </label>
        )}

        <div className="q-foot">
          <button type="submit" className="q-cta" disabled={!canSubmit}>{screen.cta || 'Weiter'}</button>
          <p className="q-email-legal">
            {screen.legalPre || 'Mit dem Absenden stimmst du der '}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>
            {screen.legalPost || ' zu. Du bekommst eine Bestätigungsmail (Double-Opt-in), Abmeldung jederzeit.'}
          </p>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Loading ---------------- */
export function LoadingScreen({ screen, onDone }) {
  const [pct, setPct] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const doneRef = useRef(false);
  const statuses = screen.statuses || ['Analysiere Antworten...'];

  useEffect(() => {
    const total = screen.duration || 3600;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / total);
      setPct(Math.round(p * 100));
      setStatusIdx(Math.min(statuses.length - 1, Math.floor(p * statuses.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else if (!doneRef.current) { doneRef.current = true; onDone(); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="q-screen q-loading">
      <div className="q-spinner" />
      <h2 className="q-load-title">{screen.title}</h2>
      {screen.sub && <p className="q-load-sub">{screen.sub}</p>}
      <div className="q-load-status">{statuses[statusIdx]}</div>
      <div className="q-load-bar"><div style={{ width: `${pct}%` }} /></div>
      {screen.testimonial && (
        <div className="q-testi">
          <div className="q-testi-head">
            <span className="q-stars" style={{ fontSize: '1rem' }}>★★★★★</span>
            <span className="q-testi-badge">✓ VERIFIZIERT</span>
          </div>
          <p>{screen.testimonial.text}</p>
          <cite>— {screen.testimonial.author}</cite>
        </div>
      )}
    </div>
  );
}

/* ---------------- Result ---------------- */
function AnimatedMetric({ m }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(m.value), 120); return () => clearTimeout(t); }, [m.value]);
  return (
    <div className={`tone-${m.tone}`}>
      <div className="q-metric-head">
        <span className="q-metric-label">{m.label}</span>
        <span className="q-metric-val">{m.level}</span>
      </div>
      <div className="q-metric-track"><div className="q-metric-fill" style={{ width: `${w}%` }} /></div>
    </div>
  );
}

function Gauge({ gauge }) {
  const [p, setP] = useState(0);
  useEffect(() => { const t = setTimeout(() => setP(gauge.value), 150); return () => clearTimeout(t); }, [gauge.value]);
  const R = 80, C = Math.PI * R;
  const off = C * (1 - p / 100);
  const color = gauge.tone === 'bad' ? 'var(--q-signal)' : gauge.tone === 'mid' ? '#E5A11E' : 'var(--q-accent)';
  return (
    <div className="q-gauge">
      <svg width="200" height="118" viewBox="0 0 200 118">
        <path d="M20 105 A80 80 0 0 1 180 105" fill="none" stroke="color-mix(in srgb, var(--q-text) 10%, transparent)" strokeWidth="16" strokeLinecap="round" />
        <path d="M20 105 A80 80 0 0 1 180 105" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }} />
      </svg>
      <div style={{ fontFamily: 'var(--q-font-head)', fontWeight: 800, fontSize: '1.9rem', color, marginTop: -14 }}>{gauge.level}</div>
      <div style={{ color: 'var(--q-muted)', fontSize: '0.85rem' }}>{gauge.label}</div>
    </div>
  );
}

// Die Ersparnis ist das Argument, nicht der Preis. Sie steht deshalb als
// eigene Zahl ueber der Rechnung und zaehlt hoch, statt einfach dazustehen.
function SavingsHero({ s }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out, damit die Zahl am Ende ausrollt statt hart zu stoppen
      setVal(s.amount * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [s.amount]);
  return (
    <div className="q-save">
      <p className="q-save-eyebrow">{s.eyebrow}</p>
      <div className="q-save-row">
        <span className="q-save-plus">+</span>
        <span className="q-save-num">{val.toFixed(2).replace('.', ',')}</span>
        <span className="q-save-cur">€</span>
      </div>
      <div className="q-save-badge">+{s.pct} % Warenwert</div>
      {s.foot && <p className="q-save-foot">{s.foot}</p>}
    </div>
  );
}

function AnimatedCalc({ row }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(row.pct), 150); return () => clearTimeout(t); }, [row.pct]);
  return (
    <div className="q-calc-row">
      <div className="lab"><span>{row.label}</span><b>{row.amount}</b></div>
      <div className={`q-calc-bar ${row.kind}`}><div style={{ width: `${w}%` }} /></div>
    </div>
  );
}

export function ResultScreen({ result, answers, extra, preview, onCta, Explosion }) {
  useEffect(() => {
    if (preview) return; // Vorschau ueber ?s=, keine echte Teilnahme
    track('Lead', { content_name: result.quiz }, true);
    saveSubmission(result.quiz, result.type, result.title, answers, extra || {});
  }, []);
  return (
    <div className="q-screen q-result">
      <p className="q-eyebrow q-result-eyebrow">{result.eyebrow}</p>
      <h2 className="q-result-type" style={result.gauge ? { color: result.gauge.tone === 'good' ? 'var(--q-accent)' : result.gauge.tone === 'mid' ? '#E5A11E' : 'var(--q-signal)' } : undefined}>{result.title}</h2>

      {answers?._email && (
        // Ohne den Bestaetigungsklick verlaesst die Mail Klaviyo nie. Der
        // Schritt bekommt deshalb eigenes Gewicht statt einer Randnotiz:
        // Absender benennen, Spam-Ordner nennen, ein einziger Auftrag.
        <div className="q-confirm">
          <b className="q-confirm-head">Ein Schritt fehlt noch</b>
          <p>
            Wir haben dir eine Mail an <b>{answers._email}</b> geschickt. Öffne sie und tippe auf
            den Bestätigungslink, sonst dürfen wir dir deine Empfehlung nicht zusenden.
          </p>
          <p className="q-confirm-hint">
            Absender ist <b>BrustBizeps</b>. Nichts da? Schau kurz im Spam-Ordner nach.
          </p>
        </div>
      )}
      {result.explosion && Explosion && <Explosion {...result.explosion} />}
      {result.gauge && <Gauge gauge={result.gauge} />}
      {result.product && (
        <div className="q-productcard">
          <img src={result.product.img} alt="" />
          <div className="q-pc-body"><b>{result.product.name}</b><span>{result.product.tag}</span></div>
        </div>
      )}
      {result.savings && <SavingsHero s={result.savings} />}
      {result.calc && (
        <div className="q-calc">
          {result.calc.map((r, i) => <AnimatedCalc key={i} row={r} />)}
          {result.calcDelta && <div className="q-calc-delta"><span>{result.calcDelta}</span></div>}
        </div>
      )}
      {result.metrics && <div className="q-metrics">{result.metrics.map((m, i) => <AnimatedMetric key={i} m={m} />)}</div>}

      {result.mirror && (
        <div className="q-mirror">
          <h3>{result.mirrorTitle || '🔍 Was das bedeutet:'}</h3>
          <p>{result.mirror}</p>
        </div>
      )}
      {result.reassure && (
        <div className="q-reassure">
          <b>{result.reassure.title}</b>
          <p>{result.reassure.text}</p>
        </div>
      )}
      {result.note && (
        <div className="q-note"><b>{result.note.title}</b><p>{result.note.text}</p></div>
      )}
      <div className="q-foot">
        <a className="q-cta" href={result.cta.href} onClick={onCta} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          {result.cta.label}
        </a>
      </div>
    </div>
  );
}
