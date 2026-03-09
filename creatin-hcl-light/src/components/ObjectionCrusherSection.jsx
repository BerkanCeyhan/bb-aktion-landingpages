import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const OBJECTIONS = [
    {
        question: "Ist das wirklich besser verträglich als herkömmliches Creatin?",
        answer: "Ja. Das Kernproblem bei Monohydrat ist die schlechte Löslichkeit — es bleibt im Magen liegen und zieht dort Wasser an. Das verursacht Blähungen, Völlegefühl und manchmal Durchfall. Creatin HCL löst sich komplett auf und wird aufgenommen, bevor es im Magen für Probleme sorgen kann. Der Unterschied ist für viele Menschen von Tag eins spürbar."
    },
    {
        question: "Warum nur 1000mg pro Kapsel, wenn ich sonst 5g Mono brauche?",
        answer: "Weil HCL deutlich besser vom Körper aufgenommen wird. Du brauchst weniger, weil mehr davon tatsächlich in der Muskulatur ankommt — ohne den Umweg über den Verdauungstrakt. Das bedeutet weniger Belastung für den Magen und trotzdem die volle Wirkung."
    },
    {
        question: "Lohnt sich der höhere Preis gegenüber billigem Mono wirklich?",
        answer: "Wenn du Mono problemlos verträgst und bereits gute Ergebnisse siehst — bleib dabei. Wenn nicht: Ja, absolut. HCL ist für Menschen gemacht, die mit Monohydrat schlechte Erfahrungen gemacht haben oder nie wirklich eine Wirkung gespürt haben. Rechnet man die benötigte Menge pro Dosis gegen, relativiert sich der Preisunterschied erheblich."
    }
];

export default function ObjectionCrusherSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 px-4 bg-brand-surface border-y border-brand-text/5 relative overflow-hidden">

            {/* Background Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-heading font-bold text-brand-text/[0.02] leading-none whitespace-nowrap pointer-events-none select-none">
                NO BULLSHIT
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold uppercase mb-12 text-center text-brand-text">
                    Die Wahrheit über <span className="text-brand-accent">HCL</span>
                </h2>

                <div className="flex flex-col gap-4">
                    {OBJECTIONS.map((obj, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`border rounded bg-white transition-all duration-300 ${isOpen ? 'border-brand-accent shadow-md' : 'border-brand-text/10 shadow-sm hover:border-brand-text/20'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 font-heading font-bold uppercase text-lg md:text-xl tracking-wide text-brand-text hover:text-brand-accent transition-colors"
                                >
                                    <span>{obj.question}</span>
                                    <div className={`p-2 rounded transition-colors ${isOpen ? 'bg-brand-accent text-white' : 'bg-brand-surface text-brand-text/50'}`}>
                                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="p-6 md:p-8 pt-0 text-brand-text/70 leading-relaxed font-body">
                                        {obj.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
