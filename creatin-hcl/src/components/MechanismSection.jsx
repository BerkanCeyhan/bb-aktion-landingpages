import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Droplets, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: Droplets,
        title: "59x Bessere Löslichkeit",
        subtitle: "Kein Magen-Chaos",
        description: "Normale Creatin-Kristalle lösen sich schlecht auf. Sie bleiben im Magen liegen, ziehen Wasser an — und das verursacht Blähungen und Durchfall. HCL bietet eine 59x bessere Löslichkeit und löst sich vollständig auf. Dein Körper nimmt es auf, noch bevor dein Magen reagiert."
    },
    {
        icon: Zap,
        title: "Mikro-Dosierung, Makro-Wirkung",
        subtitle: "",
        description: "Keine 5g Ladephase mehr. 1000mg reines HCL wirken direkt und gehen sofort in die Muskulatur — ohne den Umweg über Wassereinlagerungen unter der Haut. Weniger Menge, weil mehr davon wirklich ankommt."
    },
    {
        icon: Brain,
        title: "Endlich spürbar",
        subtitle: "auch für Non-Responder",
        description: "Manche Menschen nehmen Monohydrat wochenlang und spüren schlicht nichts. Das liegt oft an der schlechten Aufnahme im Verdauungstrakt — nicht daran, dass Creatin bei ihnen nicht funktioniert. HCL passiert diese Hürde. Viele erleben zum ersten Mal, was Creatin wirklich leisten kann."
    }
];

export default function MechanismSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.mech-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });

            gsap.from('.mech-title', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-brand-surface relative border-y border-white/5">
            <div className="max-w-6xl mx-auto">

                <div className="mb-16 md:mb-24 flex flex-col md:flex-row gap-8 justify-between border-b border-white/10 pb-12">
                    <div className="max-w-3xl">
                        <span className="font-mono text-brand-accent uppercase tracking-widest text-sm mb-4 block">
                            01 // The Mechanism
                        </span>
                        <h2 className="mech-title text-4xl md:text-5xl font-heading font-bold uppercase leading-tight">
                            Warum HCL wirkt — und <span className="text-brand-accent">Monohydrat</span> bei vielen scheitert.
                        </h2>
                    </div>
                    <p className="text-white/60 font-medium max-w-sm mech-title text-xl md:text-right md:self-end">
                        Das Geheimnis liegt nicht in der Menge, sondern darin, was dein Körper wirklich aufnimmt.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="mech-card bg-brand-bg p-8 border border-white/5 relative group hover:border-brand-accent/30 transition-colors">
                            <div className="mb-6 inline-flex p-4 bg-brand-surface rounded-none border border-white/10 group-hover:bg-brand-accent group-hover:text-brand-bg transition-colors">
                                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-drama uppercase tracking-wide mb-1 text-white">
                                {feature.title}
                            </h3>
                            {feature.subtitle && (
                                <p className="text-brand-accent font-mono text-sm uppercase mb-4 tracking-wider">
                                    {feature.subtitle}
                                </p>
                            )}
                            {(!feature.subtitle) && <div className="mb-4" />}
                            <p className="text-white/60 leading-relaxed font-body">
                                {feature.description}
                            </p>

                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-start justify-end p-2 opacity-20 bg-gradient-to-bl from-white/10 to-transparent">
                                <div className="w-1 h-1 bg-white" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Data Chart Visual Placeholder */}
                <div className="mt-16 bg-brand-bg border border-white/10 p-8 mech-card flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full flex-1">
                        <h4 className="font-heading uppercase text-2xl mb-2 text-white/90">Bioverfügbarkeits-Vergleich</h4>
                        <div className="flex flex-col gap-4 mt-8 font-mono text-sm max-w-md">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-white/50">Mono (5000mg)</span>
                                    <span className="text-white/50">&gt; Verlust im Magen</span>
                                </div>
                                <div className="w-full h-2 bg-brand-surface relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-white/20 w-[30%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-brand-accent">HCL (1000mg)</span>
                                    <span className="text-brand-accent">&gt; Direkte Zell-Aufnahme</span>
                                </div>
                                <div className="w-full h-2 bg-brand-surface relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-brand-accent w-[95%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 text-white/50 text-sm font-mono border-l border-white/10 pl-8">
                        <p>
                            &gt; SYSTEM_DATA: RECOVERY_RATE_OPTIMIZED<br />
                            &gt; STATUS: BLOAT_AVOIDED<br />
                            &gt; ABSORPTION: DIRECT_TO_MUSCLE<br />
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
