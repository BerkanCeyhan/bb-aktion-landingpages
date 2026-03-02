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
                stagger: 0.15,
                ease: 'power3.out',
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
            className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-6 pb-12 md:pt-12 md:pb-24"
        >
            {/* Background Graphic Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-brand-bg">
                <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-accent/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent" />
            </div>

            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center mt-6 md:mt-12">
                {/* Trust Badge */}
                <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface border border-white/10 mb-5 md:mb-8 backdrop-blur-sm">
                    <div className="flex text-brand-accent">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-sm font-mono text-white/80 uppercase tracking-widest mt-0.5">
                        Über 1.200+ 5-Sterne Bewertungen
                    </span>
                </div>

                {/* Headline (Attention Hook) */}
                <h1 className="hero-element text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold uppercase leading-[0.85] tracking-tight mb-5 mt-2 md:mb-6 md:mt-8">
                    <span className="block text-white/50 text-2xl md:text-3xl mb-3 md:mb-4 font-drama tracking-normal normal-case">Creatin ausprobiert... und wieder aufgehört?</span>
                    Verträglichstes<br />
                    <span className="text-brand-accent">Creatin</span> auf dem Markt.
                </h1>

                {/* 3er Versprechen (Icons/Bullets) */}
                <div className="hero-element flex flex-col md:flex-row gap-3 md:gap-8 justify-center items-center my-6 md:my-8">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/10 rounded-sm">
                        <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                        <span className="font-heading font-bold uppercase tracking-wide">Mehr Kraft.</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/10 rounded-sm">
                        <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <span className="font-heading font-bold uppercase tracking-wide">Prallere Muskeln.</span>
                    </div>
                    <div className="flex items-center gap-2 bg-brand-accent/10 px-4 py-2 border border-brand-accent/30 rounded-sm text-brand-accent">
                        <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <span className="font-heading font-bold uppercase tracking-wide">Keine Magenprobleme.</span>
                    </div>
                </div>

                {/* Subheadline (Body Text) */}
                <p className="hero-element text-lg md:text-xl text-white/70 max-w-2xl mb-10 font-medium leading-relaxed">
                    Das Problem ist nicht dein Körper. Es ist das falsche Creatin.<br /><br />
                    BrustBizeps <strong className="text-white font-bold">Creatin HCL (1000mg)</strong> liefert dir die volle Wirkung — ohne Blähbauch, ohne aufgedunsenes Gesicht, ohne Wassereinlagerungen unter der Haut.
                </p>

                {/* CTA */}
                <div className="hero-element flex flex-col items-center w-full max-w-md">
                    <button
                        onClick={scrollToCheckout}
                        className="group relative w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-bg px-8 py-5 text-xl font-drama uppercase tracking-wide hover:bg-white transition-colors duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Jetzt bestellen
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-x-0 -bottom-px h-px bg-white/50" />
                        <div className="absolute inset-x-0 -top-px h-px bg-white/50" />
                    </button>

                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 text-brand-accent/80 font-mono text-sm uppercase tracking-wider text-center">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span className="whitespace-nowrap">Hohe Ausverkaufsrate</span>
                        </div>
                        <span className="hidden sm:inline">–</span>
                        <span className="whitespace-nowrap">Sichere dir deinen Vorrat</span>
                    </div>
                </div>

                {/* Product Mockup (Floating) */}
                <div className="hero-element mt-10 md:mt-16 relative w-full max-w-sm mx-auto perspective-1000">
                    <div className="absolute inset-0 bg-brand-accent blur-[100px] opacity-20 rounded-full" />
                    <img
                        src={`${import.meta.env.BASE_URL}produkt-bild.png`}
                        alt="Creatin HCL Kapseln"
                        className="relative z-10 w-full h-auto object-cover aspect-[3/4] rounded-2xl border border-white/5 shadow-2xl mix-blend-luminosity brightness-75 contrast-125"
                    />
                    {/* Aesthetic brutalist tape/label */}
                    <div className="absolute top-4 -right-4 bg-brand-bg text-brand-accent font-mono text-xs p-2 border border-brand-accent/30 rotate-12 z-20 shadow-xl uppercase">
                        HCL 1000mg Focus
                    </div>
                </div>
            </div>
        </section>
    );
}
