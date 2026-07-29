import { useMemo } from 'react';

const BASE = import.meta.env.BASE_URL;

// 10 slots arranged in an arc above the box. left/top in %, scale for 3D depth
// (bigger = nearer), rot in deg, ix/iy = start offset (px) pointing back toward
// the box mouth so each product reads as bursting OUT of the box, del = stagger.
const LAYOUT = [
  { left: 50, top: 6, scale: 1.15, rot: -3, ix: 0, iy: 150, del: 0.32 },   // top center, biggest
  { left: 22, top: 15, scale: 0.86, rot: -12, ix: 90, iy: 120, del: 0.14 },
  { left: 78, top: 15, scale: 0.9, rot: 11, ix: -90, iy: 120, del: 0.2 },
  { left: 13, top: 34, scale: 0.72, rot: -16, ix: 120, iy: 80, del: 0.06 },
  { left: 87, top: 34, scale: 0.76, rot: 15, ix: -120, iy: 80, del: 0.1 },
  { left: 33, top: 30, scale: 1.0, rot: -6, ix: 60, iy: 110, del: 0.26 },
  { left: 67, top: 30, scale: 1.05, rot: 7, ix: -60, iy: 110, del: 0.3 },
  { left: 18, top: 52, scale: 0.64, rot: -9, ix: 90, iy: 50, del: 0.0 },
  { left: 82, top: 52, scale: 0.66, rot: 10, ix: -90, iy: 50, del: 0.03 },
  { left: 50, top: 44, scale: 0.82, rot: 2, ix: 0, iy: 90, del: 0.22 },
];

const CONFETTI_COLORS = ['#FF6B2C', '#FF2E7E', '#FFC23C', '#FFFDF7', '#FF6B2C', '#FF2E7E'];

export default function BoxExplosion({ products, box, caption }) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const angle = -90 + (Math.random() * 150 - 75); // upward cone
        const dist = 90 + Math.random() * 150;
        const rad = (angle * Math.PI) / 180;
        return {
          tx: Math.cos(rad) * dist,
          ty: Math.sin(rad) * dist,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          size: 5 + Math.random() * 7,
          del: 0.15 + Math.random() * 0.5,
          rot: Math.random() * 360,
          round: Math.random() > 0.5,
        };
      }),
    []
  );

  return (
    <div className="q-explosion" aria-hidden="true">
      <div className="q-expl-stage">
        <div className="q-expl-glow" />

        {confetti.map((c, i) => (
          <span
            key={`c${i}`}
            className={`q-confetti${c.round ? ' round' : ''}`}
            style={{
              '--tx': `${c.tx}px`,
              '--ty': `${c.ty}px`,
              '--del': `${c.del}s`,
              '--rot': `${c.rot}deg`,
              width: `${c.size}px`,
              height: `${c.size * (c.round ? 1 : 1.6)}px`,
              background: c.color,
            }}
          />
        ))}

        {products.slice(0, LAYOUT.length).map((p, i) => {
          const s = LAYOUT[i];
          return (
            <figure
              key={p.img}
              className="q-expl-item"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                '--s': s.scale,
                '--rot': `${s.rot}deg`,
                '--ix': `${s.ix}px`,
                '--iy': `${s.iy}px`,
                '--del': `${s.del}s`,
                zIndex: Math.round(s.scale * 10),
              }}
            >
              <img src={`${BASE}products/${p.img}.png`} alt="" loading="lazy" />
              <figcaption>{p.name}</figcaption>
            </figure>
          );
        })}

        <img className="q-expl-box" src={`${BASE}${box}`} alt="" />
      </div>
      {caption && <p className="q-expl-caption">{caption}</p>}
    </div>
  );
}
