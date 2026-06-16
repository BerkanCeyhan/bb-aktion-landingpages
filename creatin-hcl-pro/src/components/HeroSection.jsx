import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-element', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
            });
            gsap.from('.hero-frame', {
                clipPath: 'inset(0 0 100% 0)',
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power4.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const scrollToCheckout = () => {
        document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-brand-bg pt-8 pb-16 md:pt-14 md:pb-24"
        >
            {/* Material layers: brushed-steel slab bleeding from the right + paper grain */}
            <div className="absolute top-0 right-0 h-full w-1/2 tex-metal opacity-40 hidden lg:block [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
            <div className="absolute inset-0 tex-grain pointer-events-none" />
            <div className="absolute -top-10 right-[6%] text-brand-text/[0.04] font-heading text-[34vw] leading-none pointer-events-none select-none hidden md:block">HCL</div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
                {/* Top meta row — deconstructed: badge left, spec ticker right */}
                <div className="hero-element flex flex-wrap items-center justify-center sm:justify-between gap-3 border-b border-brand-text/15 pb-4 mb-8 md:mb-14">
                    <div className="inline-flex items-center gap-2">
                        <div className="flex text-brand-accent">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-0.5">
                            1.200+ 5-Sterne Bewertungen
                        </span>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-brand-muted hidden sm:block">
                        59× Löslichkeit · 1000 mg · 0 Blähbauch
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-8 items-start">
                    {/* A — kicker + headline (centered on mobile, left on desktop) */}
                    <div className="text-center lg:text-left lg:col-span-7 lg:col-start-1 lg:row-start-1">
                        <span className="hero-element block font-mono text-brand-accent uppercase tracking-[0.25em] text-xs md:text-sm mb-5">
                            Creatin ausprobiert … und wieder aufgehört?
                        </span>

                        <h1 className="hero-element font-heading uppercase text-[3.4rem] leading-[0.98] sm:text-7xl sm:leading-[0.92] lg:text-[6.5rem] tracking-tight">
                            Verträglichstes
                            <span className="block text-brand-accent">Creatin</span>
                            auf dem Markt.
                        </h1>
                    </div>

                    {/* B — product as a framed print (above chips on mobile, right column on desktop) */}
                    <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 flex justify-center lg:block">
                        <div className="hero-frame relative max-w-[16rem] sm:max-w-sm w-full lg:mx-0 lg:ml-auto">
                            <div className="relative bg-brand-surface p-3 border border-brand-text/15 edge-emboss">
                                <img
                                    src={`${import.meta.env.BASE_URL}produkt-bild.png`}
                                    alt="Creatin HCL 1000mg Kapseln"
                                    className="w-full h-auto object-cover aspect-[4/5] contrast-110"
                                />
                                {/* corner registration marks */}
                                <span className="absolute top-1 left-1 w-3 h-3 border-l border-t border-brand-text/40" />
                                <span className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-brand-text/40" />
                            </div>
                            <div className="absolute -top-3 -right-3 bg-brand-text text-brand-surface font-mono text-[11px] px-2.5 py-1.5 uppercase tracking-wider rotate-3 shadow-lg">
                                HCL 1000&nbsp;mg
                            </div>
                            <div className="absolute -bottom-4 -left-4 foil px-4 py-3 hidden sm:block">
                                <div className="font-heading text-3xl text-brand-accent leading-none">59×</div>
                                <div className="font-mono text-[10px] uppercase tracking-wider text-brand-muted mt-1">bessere<br />Löslichkeit</div>
                            </div>
                        </div>
                    </div>

                    {/* C — chips + description + CTA (centered on mobile except description) */}
                    <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* 3 promise chips — material foil, last one cobalt */}
                        <div className="hero-element flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                            <span className="foil px-4 py-2 font-drama font-bold uppercase tracking-wide text-sm text-brand-text">Mehr Kraft</span>
                            <span className="foil px-4 py-2 font-drama font-bold uppercase tracking-wide text-sm text-brand-text">Prallere Muskeln</span>
                            <span className="px-4 py-2 font-drama font-bold uppercase tracking-wide text-sm text-brand-surface bg-brand-accent">Keine Magenprobleme</span>
                        </div>

                        <p className="hero-element text-left text-lg md:text-xl text-brand-muted w-full max-w-xl mb-9 leading-relaxed">
                            Das Problem ist nicht dein Körper. Es ist das falsche Creatin.
                            BrustBizeps <strong className="text-brand-text font-bold">Creatin HCL (1000&nbsp;mg)</strong> liefert dir die volle Wirkung — ohne Blähbauch, ohne aufgedunsenes Gesicht, ohne Wassereinlagerungen unter der Haut.
                        </p>

                        <div className="hero-element flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4 w-full max-w-xl">
                            <button
                                onClick={scrollToCheckout}
                                className="group relative flex-1 inline-flex items-center justify-center gap-3 bg-brand-signal text-brand-surface px-8 py-5 text-lg md:text-xl font-drama font-extrabold uppercase tracking-wide hover:bg-brand-text transition-colors duration-300"
                            >
                                Jetzt bestellen
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex items-center gap-2 text-brand-muted font-mono text-xs uppercase tracking-wider">
                                <ShieldCheck className="w-4 h-4 shrink-0 text-brand-accent" />
                                <span>Hohe Ausverkaufsrate — sichere dir deinen Vorrat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
