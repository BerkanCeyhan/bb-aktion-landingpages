import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export function ObjectionCrusherSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            q: "Da sind eh nur Müllprodukte drin, oder?",
            a: "Nein. Genau das Gegenteil. Wir packen ausschließlich verifizierte Bestseller und aktuelle, verkaufsfähige Ware in die Boxen. Kein abgelaufener Ramsch. Keine Ladenhüter. Wir nutzen die Box, damit du neue Premium-Produkte testen kannst – ohne das volle finanzielle Risiko. Dein Gewinn, unser Marketing."
        },
        {
            q: "Das kann ja nicht wahr sein. Wo ist der Haken?",
            a: "Es gibt keinen. Der garantierte Warenwert liegt immer 40-80% über deinem Kaufpreis. Du bekommst ein massives Upgrade für dein Training. Wenn du jedoch zwingend vorher wissen willst, was im Paket ist, kauf die Produkte einzeln im Shop zum regulären Preis. Wer das Risiko der Überraschung eingeht, wird belohnt."
        },
        {
            q: "Es sind nur kleine Probepackungen drin, bekomme ich das was ich möchte?",
            a: "Abhängig von der Box-Größe (S, M, XL) erhältst du garantiert Full-Size Produkte (wie z.B. Whey oder Creatin-Dosen), gepaart mit hochwertigen Snacks und Tools (z.B. Shaker). Die Mystery Box ist so konzipiert, dass du eine vollwertige Supplement-Grundausstattung zu einem Bruchteil des Preises aufbaust."
        }
    ];

    return (
        <section className="py-24 bg-dark-bg border-t border-dark-surface2 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading text-dark-text tracking-tight">EHRLICH GEFRAGT. <br /><span className="text-brand-orange">EHRLICH GEANTWORTET.</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`border transition-colors duration-300 ${openIndex === idx ? 'border-brand-volt bg-dark-surface' : 'border-dark-surface2 bg-dark-bg hover:border-dark-muted'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                            >
                                <span className={`font-drama text-lg md:text-xl pr-8 ${openIndex === idx ? 'text-brand-volt' : 'text-dark-text'}`}>
                                    {faq.q}
                                </span>
                                <ChevronDown
                                    className={`text-brand-volt transition-transform duration-300 transform shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                                    size={24}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-6 pt-2 border-t border-dark-surface2 mt-2">
                                    <p className="text-dark-muted font-sans text-lg leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export function GuaranteeFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-dark-surface py-20 border-t-4 border-brand-orange relative overflow-hidden">
            {/* Glow behind shield */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <ShieldCheck className="w-24 h-24 mx-auto text-brand-orange mb-8 drop-shadow-[0_0_15px_rgba(255,117,40,0.4)]" />

                <h2 className="text-3xl md:text-5xl font-drama text-dark-text uppercase tracking-tighter mb-6">
                    MEHR WERT ALS DEIN KAUFPREIS.<br /> GARANTIERT.
                </h2>

                <p className="text-xl text-dark-muted font-sans mb-12 max-w-2xl mx-auto">
                    Du gehst null Risiko ein. Der Warenwert deiner Box übersteigt immer den Preis, den du heute zahlst. Die einzige Überraschung ist, wie sehr es sich für dich gelohnt hat.
                </p>

                <Button size="lg" variant="accent" className="w-full sm:w-auto" onClick={() => document.getElementById('product-selector')?.scrollIntoView({ behavior: 'smooth' })}>
                    JETZT BOX SICHERN
                </Button>

                <div className="mt-16 pt-8 border-t border-dark-surface2 text-sm font-mono text-dark-muted flex flex-col items-center gap-4">
                    <p>© {new Date().getFullYear()} BrustBizeps. Alle Rechte vorbehalten.</p>
                    <div className="flex gap-4">
                        <a href="https://brustbizeps.de/policies/legal-notice" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Impressum</a>
                        <a href="https://brustbizeps.de/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Datenschutz</a>
                        <a href="https://brustbizeps.de/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">AGB</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
