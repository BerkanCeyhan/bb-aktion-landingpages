import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, TrendingUp, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function InterestSection() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: "power3.out"
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToCards = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    const features = [
        {
            icon: <ShieldAlert size={40} className="text-brand-volt mb-4" />,
            title: "Keine Restposten. Kein Risiko.",
            desc: "Viele denken bei Mystery Boxen an alte Lagerware oder Ladenhüter – genau das bekommst du hier nicht. Keine abgelaufenen Artikel, keine beschädigte Ware."
        },
        {
            icon: <TrendingUp size={40} className="text-brand-orange mb-4" />,
            title: "Mehr Wert als dein Kaufpreis.",
            desc: "Der Warenwert deiner Mystery Box liegt nachweislich bei +40-80% über dem Verkaufspreis. Egal ob XS, S, M oder XL – du gewinnst immer."
        },
        {
            icon: <RefreshCw size={40} className="text-brand-volt mb-4" />,
            title: "Perfekt auf dich abgestimmt.",
            desc: "Hochwertige, verifizierte Bestseller aus unserem Sortiment. Die perfekte Mischung aus Full-Size Produkten, Snacks und Tools für deinen Muskelaufbau."
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-dark-bg border-y border-dark-surface2 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading text-dark-text mb-6">
                        DAS GEHEIMNIS DER <span className="text-brand-volt">BRUSTBIZEPS BOX</span>
                    </h2>
                    <p className="text-dark-muted text-lg font-sans">
                        Warum wir das machen? Weil wir wollen, dass du neue Premium-Produkte testen kannst,
                        ohne volles Risiko einzugehen – und im besten Fall Dinge entdeckst, die du dir sonst nie bestellt hättest.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            className="bg-dark-surface p-8 border border-dark-surface2 hover:border-brand-volt/50 transition-colors duration-300 group"
                        >
                            <div className="transform group-hover:scale-110 transition-transform duration-300 origin-left">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-drama text-dark-text mb-3 tracking-wide">{feature.title}</h3>
                            <p className="text-dark-muted font-sans leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
