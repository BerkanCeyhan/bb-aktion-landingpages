import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-element', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-brand-bg relative border-t border-white/5 overflow-hidden">
            {/* Aesthetic Backgrounds */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

                {/* Image Side */}
                <div className="w-full md:w-5/12 relative">
                    <div className="about-element relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
                        <div className="absolute inset-0 bg-brand-accent/20 translate-x-4 translate-y-4 border border-brand-accent/30" />
                        <img
                            src={`${import.meta.env.BASE_URL}fatmir.webp`}
                            alt="Fatmir Adzaj - Gründer BrustBizeps"
                            className="relative z-10 w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute -bottom-6 -left-6 z-20 bg-brand-surface border border-white/10 p-4 shadow-2xl backdrop-blur-md">
                            <span className="font-mono text-brand-accent uppercase text-xs tracking-widest block mb-1">
                                STATUS: GEPRÜFT
                            </span>
                            <span className="font-heading uppercase text-white tracking-wide">
                                Fatmir Adzaj
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-7/12 mt-8 md:mt-0">
                    <span className="about-element font-mono text-brand-accent uppercase tracking-widest text-sm mb-4 block">
                        ÜBER BRUSTBIZEPS
                    </span>

                    <h2 className="about-element text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold uppercase leading-tight mb-6 mt-2 text-white">
                        Wer steckt hinter <span className="text-brand-accent">BrustBizeps?</span>
                    </h2>

                    <p className="about-element text-xl md:text-2xl font-drama text-white/50 mb-8 leading-snug">
                        Kein Konzern. Kein anonymes Labor. Ein Gründer, der selbst weiß, wie es ist, wenn Creatin nicht funktioniert.
                    </p>

                    <div className="about-element space-y-6 text-white/70 font-body text-base md:text-lg leading-relaxed">
                        <p>
                            <strong>Ich bin Fatmir — Gründer von BrustBizeps.</strong><br />
                            Seit über 15 Jahren beschäftige ich mich mit Training, Ernährung und Supplements. Ich habe in dieser Zeit fast alles ausprobiert, was der Markt anbietet. Und ich habe dabei eine Sache immer wieder beobachtet: Die meisten Produkte sind nicht schlecht — sie sind einfach nicht ehrlich.
                        </p>
                        <p>
                            Creatin ist das am besten erforschte Supplement, das es gibt. Es funktioniert. Aber die billige Standardform, die in neun von zehn Produkten steckt, verursacht bei vielen Menschen Probleme — und wird trotzdem weiterverkauft, weil sie günstig in der Herstellung ist.
                        </p>
                        <p>
                            BrustBizeps ist aus der Überzeugung entstanden, dass es besser geht. Keine Füllstoffe, keine Kompromisse — nur das, was wirklich wirkt.
                        </p>
                        <p className="pl-4 border-l-2 border-brand-accent text-white italic">
                            Creatin HCL war eins unserer ersten Produkte. Nicht zufällig.<br />
                            <span className="text-sm font-mono uppercase not-italic text-brand-accent mt-2 block">— Fatmir Adzaj, Gründer BrustBizeps</span>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
