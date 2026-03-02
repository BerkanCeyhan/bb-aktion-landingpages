import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../ui/Button';
import { ChevronRight, Package, Zap } from 'lucide-react';

export function HeroSection() {
    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    const boxRef = useRef(null);
    const productRefs = useRef([]);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(headlineRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power4.out',
            })
                .from(subRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }, "-=0.4")
                .from(boxRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    rotation: -5,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, "-=0.2")
                .from(ctaRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                }, "-=0.4");

            // Floating animation for products around the box
            productRefs.current.forEach((el, index) => {
                if (!el) return;
                gsap.to(el, {
                    y: -15,
                    x: index % 2 === 0 ? 10 : -10,
                    rotation: index % 2 === 0 ? 5 : -5,
                    duration: 2 + Math.random(),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: Math.random() * 0.5
                });
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const addToProductRefs = (el) => {
        if (el && !productRefs.current.includes(el)) {
            productRefs.current.push(el);
        }
    };

    const scrollToSelector = () => {
        document.getElementById('product-selector')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={heroRef} className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4 md:px-8">
            {/* Background elements */}
            <div className="absolute inset-0 bg-dark-bg z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-volt/10 rounded-full blur-[120px] z-0 opacity-50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/3 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] z-0 opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 w-full">

                {/* Text Content */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

                    {/* Logo Removed as per request */}

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-dark-surface border border-brand-orange/30 rounded-full text-brand-orange font-mono text-sm mb-6 shadow-lg">
                        <Zap size={16} className="text-brand-orange animate-pulse" />
                        <span>Limitiert: Nur noch 47 Boxen verfügbar</span>
                    </div>

                    <h1 ref={headlineRef} className="text-6xl md:text-7xl lg:text-8xl font-black text-dark-text uppercase leading-[0.9] mb-6 tracking-tighter">
                        Mehr Inhalt. <br />
                        <span className="text-brand-volt drop-shadow-[0_0_15px_rgba(200,255,0,0.3)]">Weniger Preis.</span><br />
                        <span className="text-brand-orange drop-shadow-[0_0_15px_rgba(255,117,40,0.3)] text-shadow-neon">Nur Premium.</span>
                    </h1>

                    <p ref={subRef} className="text-xl md:text-2xl text-dark-muted font-sans max-w-2xl mb-10 leading-relaxed">
                        Die Brustbizeps Mystery Box. Keine Restposten, kein Müll. Nur verifizierte Bestseller für deinen Muskelaufbau mit <strong className="text-dark-text">50-80% Rabatt</strong>.
                    </p>

                    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" onClick={scrollToSelector} className="group w-full sm:w-auto text-sm sm:text-lg">
                            Jetzt Box sichern
                            <ChevronRight className="ml-2 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <div className="flex items-center justify-center sm:justify-start gap-2 text-dark-muted font-mono text-sm mt-2 sm:mt-0">
                            <Package size={16} /> Gratis Versand ab 60€
                        </div>
                    </div>
                </div>

                {/* Visual / Animation Container */}
                <div className="flex-1 w-full max-w-none md:max-w-md lg:max-w-full relative h-[400px] md:h-[500px] flex items-center justify-center mt-10 lg:mt-0">

                    {/* Main Box - Using one of the variant images as a placeholder for the hero */}
                    <div ref={boxRef} className="relative z-20 w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_40px_rgba(200,255,0,0.2)]">
                        <img
                            src={`${import.meta.env.BASE_URL}XL_Variante.png`}
                            alt="Mystery Box XL"
                            className="w-full h-full object-contain filter saturate-150 contrast-125"
                        />
                    </div>

                    {/* Floating Products (Simulated surprise burst) */}
                    <img ref={addToProductRefs} src={`${import.meta.env.BASE_URL}Proteinpulver.webp`} alt="Protein Produkt" className="absolute top-10 right-0 md:right-10 w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg z-10  rotate-12" />
                    <img ref={addToProductRefs} src={`${import.meta.env.BASE_URL}Creatin.webp`} alt="Creatin" className="absolute bottom-10 left-0 md:left-10 w-28 h-28 md:w-40 md:h-40 object-contain rounded-lg  z-30 -rotate-12" />
                    <img ref={addToProductRefs} src={`${import.meta.env.BASE_URL}Shaker.png`} alt="Shaker" className="absolute -top-5 left-10 md:left-20 w-20 h-20 md:w-24 md:h-24 object-contain rounded-lg z-10 -rotate-6" />
                    <img ref={addToProductRefs} src={`${import.meta.env.BASE_URL}Snacks.png`} alt="Snacks" className="absolute bottom-0 right-10 md:right-20 w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg z-30 rotate-6" />
                </div>
            </div>
        </section>
    );
}
