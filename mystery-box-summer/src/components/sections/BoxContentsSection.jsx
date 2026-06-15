import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Real product shots scraped from brustbizeps.de — a representative slice of
// what can land in a box. Each box is randomised, so this is "kann", not "wird".
const PRODUCTS = [
    { file: 'whey.png', name: 'Premium Whey Protein' },
    { file: 'oatbar.png', name: 'Oat Bar Haferriegel' },
    { file: 'creatin.png', name: 'Creatin' },
    { file: 'chips.png', name: 'Protein Chips' },
    { file: 'shaker.png', name: 'Shaker' },
    { file: 'waffel.png', name: 'Protein Waffel' },
    { file: 'proteinpulver.png', name: 'Proteinpulver' },
    { file: 'crunchy.png', name: 'Crunchy Protein Riegel' },
    { file: 'proteinwater.png', name: 'Protein Water Clear Beef Isolate' },
    { file: 'proteinbar.png', name: 'Premium Protein Bar Riegel' },
    { file: 'clearwhey.png', name: 'Clear Whey Beef Protein Isolate' },
    { file: 'pudding.png', name: 'Protein Pudding' },
    { file: 'riegelblock.png', name: 'Protein Riegel Block' },
    { file: 'proteinsnack.png', name: 'Nutrend Protein Snack' },
];

// Deterministic small tilts so the spread feels hand-scattered, not gridded.
const TILTS = [-5, 4, -3, 6, -4, 3, -6, 5, -2, 4, -5, 3, -4, 6];

export function BoxContentsSection() {
    const sectionRef = useRef(null);
    const tilesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(tilesRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 30,
                scale: 0.85,
                duration: 0.5,
                ease: 'back.out(1.6)',
                stagger: { each: 0.05, from: 'random' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const addTile = (el) => {
        if (el && !tilesRef.current.includes(el)) tilesRef.current.push(el);
    };

    return (
        <section id="box-contents" ref={sectionRef} className="py-24 bg-dark-surface2 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-brand-yellow/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-brand-volt/15 border border-brand-volt/40 text-dark-text font-drama text-sm">
                        <Sparkles size={16} className="text-brand-volt" /> Mystery Box Inhalt
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading text-dark-text mb-4">
                        DAS KANN ALLES <span className="text-brand-orange">DRIN SEIN:</span>
                    </h2>
                    <p className="text-dark-muted font-sans text-lg">
                        Ein Auszug aus unserem Sortiment. Jede Box wird neu zusammengestellt – die Überraschung gehört dazu.
                    </p>
                </div>

                {/* The "open box": a flap-labelled panel the products spill into */}
                <div className="relative rounded-[2rem] border-2 border-dashed border-brand-orange/40 bg-dark-surface/70 p-5 sm:p-8 shadow-[0_30px_60px_-30px_rgba(42,26,11,0.45)]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                        {PRODUCTS.map((p, i) => (
                            <div key={p.file} ref={addTile}>
                                <figure
                                    style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
                                    className="group bg-dark-bg rounded-2xl border border-dark-surface2 p-3 sm:p-4 aspect-square flex items-center justify-center shadow-[0_10px_24px_-16px_rgba(42,26,11,0.5)] rotate-[var(--tilt)] hover:rotate-0 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_18px_34px_-18px_rgba(255,107,44,0.5)] transition-transform duration-300 ease-out"
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}collage/${p.file}`}
                                        alt={p.name}
                                        loading="lazy"
                                        className="max-h-full max-w-full object-contain drop-shadow-[0_8px_14px_rgba(42,26,11,0.2)] transition-transform duration-300 group-hover:scale-105"
                                    />
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-center text-dark-muted font-sans text-sm mt-6">
                    Abbildungen exemplarisch. Der konkrete Inhalt variiert je nach Box und Verfügbarkeit.
                </p>
            </div>
        </section>
    );
}
