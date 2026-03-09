import React from 'react';

export default function IngredientsSection() {
    return (
        <section className="py-24 px-4 bg-brand-bg relative">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                <div className="w-full lg:w-1/2 relative perspective-1000">
                    <div className="absolute inset-0 bg-brand-accent/10 blur-[100px] rounded-full" />
                    <img
                        src={`${import.meta.env.BASE_URL}einnahme.png`}
                        alt="Clinical Laboratory"
                        className="w-full h-auto aspect-[4/3] object-cover border border-brand-text/10 rounded-xl relative z-10 shadow-lg"
                    />
                    <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white p-6 border border-brand-text/10 rounded-sm z-20 shadow-xl">
                        <div className="text-4xl font-heading font-bold text-brand-accent mb-1 leading-none">100%</div>
                        <div className="text-sm font-mono uppercase text-brand-text/70 font-bold mt-2">Apotheken-<br />Qualität</div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <span className="font-mono text-brand-accent uppercase tracking-widest text-sm mb-4 block font-bold">
                        The Evidence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold uppercase leading-tight mb-8 text-brand-text">
                        Eine Zutat. <br /> <span className="text-brand-text/40">Keine Füllstoffe.</span>
                    </h2>

                    <div className="space-y-6">
                        <div className="pb-6 border-b border-brand-text/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-heading font-bold uppercase text-brand-text">Creatin HCL</h3>
                                <span className="font-mono text-brand-accent font-bold">1000mg</span>
                            </div>
                            <p className="text-brand-text/70 text-sm leading-relaxed">
                                Reines Creatin-Hydrochlorid in hochdosierter Kapselform. Keine gepantschten Pulver-Mischungen. Jede BrustBizeps Kapsel liefert exakt 1000mg HCL.
                            </p>
                        </div>

                        <div className="pb-6 border-b border-brand-text/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-heading font-bold uppercase text-brand-text">Vitamin B6 & B12</h3>
                                <span className="font-mono text-brand-accent font-bold">Komplex</span>
                            </div>
                            <p className="text-brand-text/70 text-sm leading-relaxed">
                                Bonus-Wirkstoffe zur Unterstützung der Regeneration und effektiven Verringerung von Müdigkeit.
                            </p>
                        </div>

                        <div className="pb-6 border-b border-brand-text/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-heading font-bold uppercase text-brand-text/50">Künstliche Aromen</h3>
                                <span className="font-mono text-brand-accent font-bold">0%</span>
                            </div>
                        </div>

                        <div className="pb-6 border-b border-brand-text/10">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-xl font-heading font-bold uppercase text-brand-text/50">Zucker / Kalorien</h3>
                                <span className="font-mono text-brand-accent font-bold">0%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-brand-surface border border-brand-text/10 rounded-sm text-sm text-brand-text/80 font-mono">
                        &gt; Frei von Magnesiumstearat. Vegan. Keine unnötigen Trennmittel.
                    </div>

                    {/* Dosing Information Block */}
                    <div className="mt-12 bg-brand-surface border border-brand-text/10 rounded-md p-6 md:p-8">
                        <h3 className="text-2xl font-heading font-bold uppercase text-brand-text mb-4">Anwendung & Dosierung</h3>
                        <p className="text-brand-text/70 mb-8 font-medium">
                            Mit einer Dose (140 Kapseln) kommst du bei der empfohlenen Dosis von 4 Kapseln pro Tag <strong className="text-brand-text font-bold">exakt 35 Tage</strong> aus.
                        </p>

                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-brand-text/10 shadow-sm relative overflow-hidden group rounded-sm">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-accent" />
                                <div className="pl-3">
                                    <span className="font-mono text-brand-accent text-xs block mb-1 font-bold">TRAININGSTAG</span>
                                    <span className="text-brand-text font-bold">4 Kapseln vor dem Sport</span>
                                </div>
                                <span className="text-brand-text/60 text-sm sm:text-right font-medium">Maximale Kraft & Fokus</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-transparent border border-brand-text/10 rounded-sm relative">
                                <div className="pl-3">
                                    <span className="font-mono text-brand-text/50 text-xs block mb-1 font-bold">RUHETAG</span>
                                    <span className="text-brand-text font-medium">2 Kapseln morgens / 2 abends</span>
                                </div>
                                <span className="text-brand-text/60 text-sm sm:text-right font-medium">Konstante Nährstoffzufuhr</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
