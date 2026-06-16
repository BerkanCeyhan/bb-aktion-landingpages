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
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            });
            gsap.from('.mech-title', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
            });
            gsap.from('.mech-bar > span', {
                scrollTrigger: { trigger: '.mech-chart', start: 'top 80%' },
                scaleX: 0, transformOrigin: 'left', duration: 1, stagger: 0.2, ease: 'power3.inOut',
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        // The contrast moment: a dark ink slab between the bone sections.
        <section ref={sectionRef} className="relative bg-brand-slab text-brand-surface py-24 md:py-32 px-4 overflow-hidden">
            <div className="absolute inset-0 tex-grain tex-grain-dark pointer-events-none" />
            <div className="absolute -bottom-24 -left-10 text-brand-surface/[0.03] font-heading text-[28vw] leading-none pointer-events-none select-none">01</div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row gap-8 justify-between border-b border-brand-surface/15 pb-10">
                    <div className="max-w-3xl">
                        <span className="font-mono text-brand-accent uppercase tracking-[0.25em] text-xs mb-5 block">
                            01 — Der Mechanismus
                        </span>
                        <h2 className="mech-title font-heading uppercase text-4xl md:text-6xl leading-[0.9]">
                            Warum HCL wirkt — und <span className="text-brand-accent">Monohydrat</span> bei vielen scheitert.
                        </h2>
                    </div>
                    <p className="mech-title text-brand-surface/60 font-medium max-w-sm text-lg md:text-xl md:text-right md:self-end leading-relaxed">
                        Das Geheimnis liegt nicht in der Menge, sondern darin, was dein Körper wirklich aufnimmt.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-surface/10 border border-brand-surface/10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="mech-card bg-brand-slab p-8 relative group transition-colors hover:bg-brand-surface/[0.03]">
                            <div className="mb-6 inline-flex p-4 border border-brand-surface/15 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-slab transition-colors">
                                <feature.icon className="w-7 h-7" strokeWidth={1.6} />
                            </div>
                            <h3 className="text-xl font-drama font-extrabold uppercase tracking-wide mb-1 text-brand-surface">
                                {feature.title}
                            </h3>
                            {feature.subtitle
                                ? <p className="text-brand-accent font-mono text-xs uppercase mb-4 tracking-wider">{feature.subtitle}</p>
                                : <div className="mb-4" />}
                            <p className="text-brand-surface/60 leading-relaxed font-body text-sm">
                                {feature.description}
                            </p>
                            <span className="absolute top-4 right-4 font-mono text-[10px] text-brand-surface/25">0{idx + 1}</span>
                        </div>
                    ))}
                </div>

                {/* Bioavailability chart — clinical data block */}
                <div className="mech-card mech-chart mt-12 bg-brand-surface/[0.04] border border-brand-surface/10 p-8 md:p-10 flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                        <h4 className="font-heading uppercase text-2xl md:text-3xl mb-8 text-brand-surface">Bioverfügbarkeits-Vergleich</h4>
                        <div className="flex flex-col gap-6 font-mono text-xs max-w-md">
                            <div>
                                <div className="flex justify-between mb-2 text-brand-surface/50 uppercase tracking-wider">
                                    <span>Mono (5000 mg)</span><span>Verlust im Magen</span>
                                </div>
                                <div className="mech-bar w-full h-3 bg-brand-surface/10 relative overflow-hidden">
                                    <span className="absolute top-0 left-0 h-full bg-brand-surface/30 w-[30%] block" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2 text-brand-accent uppercase tracking-wider">
                                    <span>HCL (1000 mg)</span><span>Direkte Zell-Aufnahme</span>
                                </div>
                                <div className="mech-bar w-full h-3 bg-brand-surface/10 relative overflow-hidden">
                                    <span className="absolute top-0 left-0 h-full bg-brand-accent w-[95%] block" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 text-brand-surface/45 text-xs font-mono border-t md:border-t-0 md:border-l border-brand-surface/10 pt-6 md:pt-0 md:pl-8 leading-relaxed">
                        &gt; RECOVERY_RATE: OPTIMIZED<br />
                        &gt; BLOAT: AVOIDED<br />
                        &gt; ABSORPTION: DIRECT_TO_MUSCLE<br />
                    </div>
                </div>
            </div>
        </section>
    );
}
