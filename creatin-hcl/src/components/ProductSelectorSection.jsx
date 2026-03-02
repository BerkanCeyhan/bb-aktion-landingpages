import React, { useState } from 'react';
import { ArrowRight, Box, Zap, Shield, Sparkles } from 'lucide-react';

const SHOP = "brustbizeps.myshopify.com";
const BASE_VARIANT = "39678652350547";

const BUNDLES = [
    {
        id: '1x',
        name: '1 Dose HCL',
        subtitle: 'Der Einstieg',
        qty: 1,
        price: '35,90€',
        pricePerPortion: '1,02€ / Tagesdosis',
        discountCode: '',
        popular: false,
        image: `${import.meta.env.BASE_URL}produkt-bild.png`,
        discountBadge: null,
    },
    {
        id: '2x',
        name: '2 Dosen HCL',
        subtitle: 'Voller Fokus',
        qty: 2,
        price: '58,16€',
        pricePerPortion: '0,83€ / Tagesdosis',
        discountCode: 'HCL-BUNDLE-2',
        popular: true,
        image: `${import.meta.env.BASE_URL}bundle-2.png`,
        discountBadge: '20% SPAREN',
    },
    {
        id: '3x',
        name: '3 Dosen HCL',
        subtitle: 'Maximaler Vorrat',
        qty: 3,
        price: '81,87€',
        pricePerPortion: '0,77€ / Tagesdosis',
        discountCode: 'HCL-BUNDLE-3',
        popular: false,
        image: `${import.meta.env.BASE_URL}bundle-3.png`,
        discountBadge: '25% SPAREN',
    }
];

export default function ProductSelectorSection() {
    const [selectedBundle, setSelectedBundle] = useState(BUNDLES[1]);

    const handleCheckout = () => {
        let url = `https://${SHOP}/cart/${BASE_VARIANT}:${selectedBundle.qty}`;
        if (selectedBundle.discountCode) {
            url += `?discount=${selectedBundle.discountCode}`;
        }
        window.location.href = url;
    };

    return (
        <section id="checkout-section" className="py-24 px-4 bg-brand-bg relative border-t border-brand-accent/20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center bg-brand-surface border border-white/5 p-4 md:p-12 relative overflow-hidden">

                {/* Aesthetic Backgrounds inside the card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="w-full lg:w-5/12 relative z-10 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
                    <div className="w-full max-w-md mb-8 relative">
                        <div className="absolute inset-0 bg-brand-accent opacity-10 blur-[50px] rounded-full" />
                        <img
                            src={selectedBundle.image}
                            alt="Creatin HCL 1000mg"
                            className="w-full h-auto object-contain aspect-[4/5] md:aspect-square border border-white/10 rounded-xl mix-blend-luminosity brightness-90 relative z-10 shadow-2xl transition-all duration-500"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-7/12 relative z-10">
                    <h2 className="text-3xl font-heading font-extrabold uppercase mb-2">Creatin HCL 1000mg</h2>
                    <div className="flex gap-4 mb-4 text-white/50 text-xs font-mono uppercase border-b border-white/10 pb-4">
                        <div className="flex items-center gap-1"><Shield className="w-4 h-4 text-brand-accent" /> Laborgeprüft</div>
                        <div className="flex items-center gap-1"><Zap className="w-4 h-4 text-brand-accent" /> Hochdosiert</div>
                    </div>
                    <p className="text-white/60 mb-8 font-medium">Wähle deinen Vorrat. Bündel-Käufe sichern dir den besten Preis pro Tagesdosis.</p>

                    <div className="flex flex-col gap-4 mb-8">
                        {BUNDLES.map((bundle) => {
                            const isSelected = selectedBundle.id === bundle.id;
                            return (
                                <button
                                    key={bundle.id}
                                    onClick={() => setSelectedBundle(bundle)}
                                    className={`relative w-full p-4 border text-left transition-all duration-300 flex items-center justify-between group ${isSelected
                                        ? 'border-brand-accent bg-brand-accent/5'
                                        : 'border-white/10 hover:border-white/30 bg-brand-bg'
                                        }`}
                                >
                                    {bundle.popular && (
                                        <div className="absolute -top-3 right-4 bg-brand-accent text-brand-bg text-[10px] font-drama uppercase px-2 py-1 tracking-wider shadow-[0_0_10px_rgba(200,255,0,0.5)]">
                                            Beliebteste Wahl
                                        </div>
                                    )}
                                    <div>
                                        <h3 className={`font-heading uppercase text-xl font-bold ${isSelected ? 'text-brand-accent' : 'text-white'}`}>
                                            {bundle.name}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                                            <p className="text-xs text-white/50 font-mono">{bundle.subtitle}</p>
                                            {bundle.discountBadge && (
                                                <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider border border-brand-accent/30 whitespace-nowrap self-start sm:self-auto">
                                                    {bundle.discountBadge}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-white/80'}`}>
                                            {bundle.price}
                                        </div>
                                        <div className="text-[10px] text-brand-accent/70 font-mono mt-1">
                                            {bundle.pricePerPortion}
                                        </div>
                                    </div>

                                    {/* Aesthetic Checkmark */}
                                    {isSelected && (
                                        <div className="absolute left-0 top-0 h-full w-1 bg-brand-accent" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-brand-accent text-brand-bg py-5 px-6 font-drama uppercase text-lg hover:bg-white transition-colors flex items-center justify-center gap-2 group relative overflow-hidden"
                    >
                        <span className="relative z-10">In den Warenkorb</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Trust bar small */}
                    <div className="flex items-center justify-center gap-6 mt-6 text-[10px] font-mono uppercase text-white/40">
                        <span className="flex items-center gap-1"><Box className="w-3 h-3 text-white/30" /> Kostenloser Versand ab 60€</span>
                        <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-white/30" /> Sichere Bezahlung</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
