import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function DesireSection() {
    const sectionRef = useRef(null);
    const elementsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            elementsRef.current.forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "power2.out"
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    const testimonials = [
        {
            name: "Leon S.",
            initial: "L",
            text: "Dachte erst da ist nur abgelaufener Kram drin wie bei anderen. Wurde komplett überrascht. Full-Size Whey, fettes Creatin und Snacks. Warenwert easy 120€ für die XL Box.",
            rating: 5
        },
        {
            name: "Kim M.",
            initial: "K",
            text: "Die Snacks Mystery Box ist krass. Hab neue Riegel entdeckt, die ich so nie gekauft hätte. 1A Qualität, Versand am nächsten Tag da. Bestelle nächsten Monat wieder.",
            rating: 5
        },
        {
            name: "Markus T.",
            initial: "M",
            text: "Preis-Leistung ist unschlagbar. Man spart sich echt 50-60%. Hab die M-Box genommen und bin mehr als zufrieden, geile Mischung aus Pre-Workout und Protein.",
            rating: 5
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-brand-surface2 relative overflow-hidden">
            {/* Decorative background blur removed */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div ref={addToRefs} className="text-center mb-16">
                    <div className="flex justify-center items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-brand-volt fill-brand-volt" size={24} />
                        ))}
                    </div>
                    <p className="text-brand-volt font-mono text-sm tracking-widest uppercase mb-4">4.8/5 · 1,247 Bewertungen</p>
                    <h2 className="text-3xl md:text-5xl font-heading text-brand-orange">GEPRÜFTE QUALITÄT. BEGEISTERTE ATHLETEN.</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testi, idx) => (
                        <div
                            key={idx}
                            ref={addToRefs}
                            className="bg-brand-bg p-8 border-l-2 border-brand-volt relative hover:bg-brand-surface transition-colors duration-300"
                        >
                            <QuoteIcon className="absolute top-6 right-6 text-brand-surface2 w-12 h-12" />
                            <div className="flex items-center gap-1 mb-4 relative z-10">
                                {[...Array(testi.rating)].map((_, i) => (
                                    <Star key={i} className="text-brand-orange fill-brand-orange" size={16} />
                                ))}
                            </div>
                            <p className="text-brand-text font-sans mb-8 relative z-10 italic">"{testi.text}"</p>
                            <div className="flex items-center gap-4 border-t border-brand-surface2 pt-4 relative z-10">
                                <div className="w-10 h-10 bg-brand-surface2 rounded-full flex items-center justify-center font-drama text-brand-volt">
                                    {testi.initial}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-text tracking-wide">{testi.name}</p>
                                    <p className="text-xs text-brand-volt flex items-center gap-1 mt-0.5">
                                        <CheckCircle2 size={12} /> Verifizierter Käufer
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edeka / Rewe Trust Bar */}
                <div ref={addToRefs} className="mt-20 pt-10 border-t border-brand-bg text-center">
                    <p className="text-brand-muted font-mono text-sm mb-6 uppercase tracking-widest">Qualität, der du vertraust. Bekannt aus:</p>
                    <div className="flex justify-center items-center gap-12 sm:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simulated Edeka/Rewe Text Logos for now, since actual logos weren't provided in the directory. */}
                        <span className="font-drama text-2xl tracking-tighter text-brand-text">EDEKA</span>
                        <span className="font-drama text-2xl tracking-tighter text-brand-text text-red-600">REWE</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

function QuoteIcon(props) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
    );
}
