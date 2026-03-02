import React from 'react';

export default function IngredientsSection() {
    return (
        <section className="py-24 px-4 bg-brand-bg relative">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                <div className="w-full lg:w-1/2 relative perspective-1000">
                    <div className="absolute inset-0 bg-brand-accent/20 blur-[100px] rounded-full" />
                    <img
                        src={`${import.meta.env.BASE_URL}einnahme.png`}
                        alt="Clinical Laboratory"
                        className="w-full h-auto aspect-[4/3] object-cover grayscale contrast-125 border border-white/10 rounded-xl relative z-10"
                    />
                    <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-brand-surface p-6 border border-brand-accent/30 z-20 shadow-2xl">
                        <div className="text-4xl font-drama text-brand-accent mb-1">100%</div>
                        <div className="text-sm font-mono uppercase text-white/60">Apotheken-<br />Qualität</div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <span className="font-mono text-brand-accent uppercase tracking-widest text-sm mb-4 block">
                        The Evidence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold uppercase leading-tight mb-8">
                        Eine Zutat. <br /> <span className="text-white/40">Keine Füllstoffe.</span>
                    </h2>

                    <div className="space-y-6">
                        <div className="pb-6 border-b border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-drama uppercase text-white">Creatin HCL</h3>
                                <span className="font-mono text-brand-accent">1000mg</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Reines Creatin-Hydrochlorid in hochdosierter Kapselform. Keine gepantschten Pulver-Mischungen. Jede BrustBizeps Kapsel liefert exakt 1000mg HCL.
                            </p>
                        </div>

                        <div className="pb-6 border-b border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-drama uppercase text-white">Vitamin B6 & B12</h3>
                                <span className="font-mono text-brand-accent">Komplex</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Bonus-Wirkstoffe zur Unterstützung der Regeneration und effektiven Verringerung von Müdigkeit.
                            </p>
                        </div>

                        <div className="pb-6 border-b border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-drama uppercase text-white/40">Künstliche Aromen</h3>
                                <span className="font-mono text-brand-accent">0%</span>
                            </div>
                        </div>

                        <div className="pb-6 border-b border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-drama uppercase text-white/40">Zucker / Kalorien</h3>
                                <span className="font-mono text-brand-accent">0%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-brand-accent/10 border border-brand-accent/30 rounded text-sm text-white/80 font-mono">
                        &gt; Frei von Magnesiumstearat. Vegan. Keine unnötigen Trennmittel.
                    </div>

                    {/* Dosing Information Block */}
                    <div className="mt-12 bg-white/5 border border-white/10 p-6 md:p-8">
                        <h3 className="text-2xl font-drama uppercase text-white mb-4">Anwendung & Dosierung</h3>
                        <p className="text-white/60 mb-8 font-medium">
                            Mit einer Dose (140 Kapseln) kommst du bei der empfohlenen Dosis von 4 Kapseln pro Tag <strong className="text-white">exakt 35 Tage</strong> aus.
                        </p>

                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-brand-bg border border-white/5 relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent" />
                                <div className="pl-2">
                                    <span className="font-mono text-brand-accent text-xs block mb-1">TRAININGSTAG</span>
                                    <span className="text-white font-bold">4 Kapseln vor dem Sport</span>
                                </div>
                                <span className="text-white/60 text-sm sm:text-right font-medium">Maximale Kraft & Fokus</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-brand-bg border border-white/5 relative">
                                <div className="pl-3">
                                    <span className="font-mono text-white/50 text-xs block mb-1">RUHETAG</span>
                                    <span className="text-white">2 Kapseln morgens / 2 abends</span>
                                </div>
                                <span className="text-white/60 text-sm sm:text-right font-medium">Konstante Nährstoffzufuhr</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
