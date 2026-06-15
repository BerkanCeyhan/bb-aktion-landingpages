import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../ui/Button';
import { ChevronRight, Package } from 'lucide-react';

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
            {/* Background: warm sunrise wash */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-surface2 z-0" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[130%] h-[460px] sun-rays z-0 opacity-70 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-brand-yellow/30 rounded-full blur-[120px] z-0 pointer-events-none" />
            <div className="absolute top-1/2 right-0 translate-x-1/4 w-[460px] h-[460px] bg-brand-volt/20 rounded-full blur-[110px] z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -translate-x-1/4 w-[420px] h-[420px] bg-brand-orange/20 rounded-full blur-[110px] z-0 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center lg:items-start w-full">

                {/* Promo chip — sits above hero on every breakpoint */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/15 border border-brand-orange/40 rounded-full text-dark-text font-drama text-sm mb-6">
                    <span>☀️ Summer ist back Aktion! ☀️</span>
                </div>

                {/* Headline — above the product image on every breakpoint */}
                <h1 ref={headlineRef} className="text-6xl md:text-7xl lg:text-8xl font-black text-dark-text uppercase leading-[0.9] mb-6 tracking-tighter text-center lg:text-left w-full">
                    Mehr Inhalt. <br />
                    <span className="text-brand-volt">Weniger Preis.</span><br />
                    <span className="text-brand-orange">Nur Premium.</span>
                </h1>

                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24 w-full">

                {/* Text Content */}
                <div className="order-2 lg:order-1 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

                    <p ref={subRef} className="text-xl md:text-2xl text-dark-muted font-sans max-w-2xl mb-10 leading-relaxed">
                        Die Brustbizeps Mystery Box. Keine Restposten, kein Müll. Nur verifizierte Bestseller für deinen <strong className="text-dark-text">Fitnesserfolg</strong> mit <strong className="text-dark-text">40-80% Rabatt</strong>.
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
                <div className="order-1 lg:order-2 flex-1 w-full max-w-none md:max-w-md lg:max-w-full relative h-[360px] md:h-[500px] flex items-center justify-center mb-2 lg:mb-0">

                    {/* Main Box - Using one of the variant images as a placeholder for the hero */}
                    <div ref={boxRef} className="relative z-20 w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_24px_44px_rgba(255,107,44,0.3)]">
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
            </div>
        </section>
    );
}
