import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Jan K.",
        initial: "J",
        result: "Kein Blähbauch mehr",
        text: "Ich habe Mono jahrelang probiert und immer abgesetzt, weil mein Magen verrückt gespielt hat. HCL ist ein Gamechanger. 2 Kapseln morgens, volle Kraft im Training, null Probleme im Bauch. Werde nie wieder wechseln."
    },
    {
        name: "Michael R.",
        initial: "M",
        result: "Glasklarer Fokus im Schichtdienst",
        text: "Arbeite 24h-Schichten. Mono hat mich immer träge und müde gemacht. Mit HCL habe ich nicht nur mehr Leistung beim Bankdrücken, sondern bin nachts um 3 Uhr im Dienst wacher und fokussierter. Absolut den Preis wert."
    },
    {
        name: "Thomas W.",
        initial: "T",
        result: "Kein Wasser im Gesicht",
        text: "Ich bin so froh, dass ich das gefunden habe. Bei normalem Creatin sah ich nach einer Woche aus wie ein Mondgesicht. Hier? Nichts. Nur reine, harte Muskeln und Kraftsteigerung. Genau was versprochen wurde."
    }
];

export default function ProofSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.proof-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
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
        <section ref={sectionRef} className="py-24 px-4 bg-brand-bg relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="flex justify-center gap-1 text-brand-accent mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold uppercase leading-tight mb-4 text-brand-text">
                        Die einzige Lösung <br />
                        <span className="text-brand-accent">gegen Creatin-Magenprobleme</span>
                    </h2>
                    <p className="text-brand-text/70 font-body max-w-2xl mx-auto">
                        Hunderte Menschen — Hobbysportler, Wiedereinsteiger und langjährige Non-Responder — schwören auf unsere HCL-Formel. Weil sie endlich funktioniert, ohne den Körper lahmzulegen.
                    </p>
                </div>

                <div className="grid grid-cols-1 select-none md:grid-cols-3 gap-6">
                    {testimonials.map((test, index) => (
                        <div key={index} className="proof-card bg-brand-surface p-8 border border-brand-text/10 hover:border-brand-accent/50 transition-colors duration-300 relative group rounded-md">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-heading font-bold text-xl text-brand-accent border border-brand-accent/20 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                        {test.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-text uppercase font-heading text-lg tracking-wide">{test.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-brand-text/60 font-mono">
                                            <CheckCircle2 className="w-3 h-3 text-brand-accent" />
                                            <span>Verifizierter Käufer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-brand-accent font-bold mb-3">"{test.result}"</h4>
                            <p className="text-brand-text/70 italic leading-relaxed text-sm font-body">
                                "{test.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
