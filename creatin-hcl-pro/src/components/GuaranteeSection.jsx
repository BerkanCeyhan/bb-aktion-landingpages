import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function GuaranteeSection() {
    return (
        <section className="py-32 px-4 bg-brand-bg relative overflow-hidden flex justify-center">
            {/* Brutalist Warning Tapes */}

            {/* TOP BAR: Kein Risiko */}
            <div className="absolute top-12 left-1/2 w-[110vw] -translate-x-1/2 h-14 bg-brand-accent text-brand-surface font-drama font-extrabold text-2xl uppercase tracking-widest flex items-center -rotate-2 z-10 overflow-hidden shadow-xl">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                    {[...Array(20)].map((_, i) => (
                        <span key={`accent-${i}`} className="mx-4">KEIN RISIKO. KEIN BULLSHIT.</span>
                    ))}
                </div>
            </div>

            {/* BOTTOM BAR: Quality/Lab Tested */}
            <div className="absolute bottom-12 left-1/2 w-[110vw] -translate-x-1/2 h-14 bg-brand-text text-brand-surface font-drama font-extrabold text-2xl uppercase tracking-widest flex items-center rotate-2 z-10 overflow-hidden shadow-xl">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite_reverse]">
                    {[...Array(20)].map((_, i) => (
                        <span key={`white-${i}`} className="mx-4">100% REINHEIT. LABOR-GEPRÜFT.</span>
                    ))}
                </div>
            </div>

            <div className="relative z-30 max-w-4xl w-full mx-auto bg-brand-surface border border-brand-text/15 edge-emboss p-8 md:p-16 text-center">

                <div className="w-24 h-24 mx-auto mb-8 bg-brand-bg border-2 border-brand-accent rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full" />
                    <ShieldCheck className="w-12 h-12 text-brand-accent relative z-10" strokeWidth={1.5} />
                </div>

                <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase mb-6 text-brand-text tracking-tight">
                    100% Reinheit. <br /><span className="text-brand-accent">Keine Kompromisse.</span><br />Kein Bullshit.
                </h2>

                <p className="text-brand-text/70 text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed mb-8">
                    Wir wissen, dass du vielleicht schon enttäuschende Erfahrungen mit Creatin gemacht hast. Deshalb setzen wir auf reine Qualität ohne Kompromisse. <br /><br />
                    BrustBizeps HCL wird <strong className="text-brand-text font-bold">streng kontrolliert</strong> und liefert dir exakt das, was dein Körper braucht. Keine versteckten Füllstoffe, keine Magenprobleme, nur pure Leistung. Du bekommst ein Supplement, das von Tag eins an für dich arbeitet.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-brand-signal text-brand-surface px-8 py-4 font-drama font-extrabold uppercase tracking-wider text-lg hover:bg-brand-text transition-colors duration-300 transform hover:scale-[1.02] mb-8"
                >
                    JETZT VORRAT SICHERN
                </button>

                <br />

                <div className="inline-block p-4 bg-brand-bg border border-brand-text/5 font-mono text-xs text-brand-text/50 uppercase tracking-widest">
                    STATUS: PREMIUM_QUALITÄT / LABOR_ZERTIFIZIERT
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
        </section>
    );
}
