import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { VARIANTS, SNACK_BOX_VARIANTS, buildCheckoutUrl } from '../../utils';
import { PackagePlus, Check, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProductSelectorSection() {
    const [selectedVariant, setSelectedVariant] = useState(Object.keys(VARIANTS)[0]); // Default XL Box
    const [includeSnackBox, setIncludeSnackBox] = useState(false);
    const [snackSize, setSnackSize] = useState(Object.keys(SNACK_BOX_VARIANTS)[0]); // Default S Box Snacks
    const [qty, setQty] = useState(1);

    const images = {
        "XL-Box (19-25 Artikel)": `${import.meta.env.BASE_URL}XL_Variante.png`,
        "M-Box (13-18 Artikel)": `${import.meta.env.BASE_URL}M_Variante.png`,
        "S-Box (8-12 Artikel)": `${import.meta.env.BASE_URL}S_Variante.png`,
        "XS-Box (5-8 Artikel)": `${import.meta.env.BASE_URL}XS_Variante.png`,
    };

    const bundleImages = {
        "XL-Box (19-25 Artikel)": `${import.meta.env.BASE_URL}xl_snack_bundle_bg.png`,
        "M-Box (13-18 Artikel)": `${import.meta.env.BASE_URL}m_snack_bundle_bg.png`,
        "S-Box (8-12 Artikel)": `${import.meta.env.BASE_URL}s_snack_bundle_bg.png`,
        "XS-Box (5-8 Artikel)": `${import.meta.env.BASE_URL}xs_snack_bundle_bg.png`,
    };

    const displayImage = includeSnackBox ? bundleImages[selectedVariant] : images[selectedVariant];


    const variantPrices = {
        "XL-Box (19-25 Artikel)": "84,90€",
        "M-Box (13-18 Artikel)": "59,90€",
        "S-Box (8-12 Artikel)": "39,90€",
        "XS-Box (5-8 Artikel)": "24,90€",
    };

    const snackBoxPrices = {
        "S-Box (6-8 Snacks)": { original: "19,95€", discounted: "18,76€" },
        "M-Box (10-14 Snacks)": { original: "29,55€", discounted: "22,46€" },
        "L-Box (18-20 Snacks)": { original: "45,95€", discounted: "38,14€" }
    };


    const handleCheckout = () => {
        const mainId = VARIANTS[selectedVariant];
        const upsellId = includeSnackBox ? SNACK_BOX_VARIANTS[snackSize] : null;
        const url = buildCheckoutUrl(mainId, qty, upsellId);
        window.location.href = url;
    };

    useEffect(() => {
        // Safe and simple trigger so it doesn't get stuck at opacity 0
        gsap.fromTo("#product-selector-content",
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: "#product-selector",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }
        );
    }, []);

    return (
        <section id="product-selector" className="py-24 bg-brand-surface2 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" id="product-selector-content">

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Left: Product Image & Value Prop */}
                    <div className="w-full lg:w-1/2 relative lg:sticky lg:top-24">
                        <div className="bg-brand-surface p-8 rounded-2xl border border-brand-surface2 relative overflow-hidden group">
                            {/* Highlight effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-volt/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="aspect-square flex items-center justify-center relative">
                                {selectedVariant === "XL-Box (19-25 Artikel)" && (
                                    <div className="absolute top-4 left-4 bg-brand-orange text-brand-bg font-drama px-3 py-1 text-sm tracking-wider z-10 rotate-[-5deg]">
                                        Bester Deal
                                    </div>
                                )}
                                <img
                                    src={displayImage}
                                    alt={selectedVariant}
                                    className="w-4/5 h-4/5 object-contain filter transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-8 pt-8 border-t border-brand-surface2">
                                <h3 className="text-xl font-heading text-brand-orange mb-4">Was du sicher bekommst:</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-brand-muted font-sans">
                                        <Check className="text-brand-volt" size={20} />
                                        <span>Nur aktuelle, verifizierte Bestseller</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-brand-muted font-sans">
                                        <Check className="text-brand-volt" size={20} />
                                        <span>Immer <strong>mehr Warenwert</strong> als der Kaufpreis</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-brand-muted font-sans">
                                        <Check className="text-brand-volt" size={20} />
                                        <span>Keine abgelaufenen Produkte oder Restposten</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: Selection Configuration */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">

                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading text-brand-orange mb-2">WÄHLE DEINE BOX</h2>
                            <p className="text-brand-muted font-sans">Je größer die Box, desto mehr Full-Size Produkte und höher die Ersparnis.</p>
                        </div>

                        {/* Main Variant Selector */}
                        <div className="space-y-4">
                            <label className="text-sm font-mono text-brand-volt tracking-widest uppercase block">1. Mystery Box Größe</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Object.keys(VARIANTS).map((variant) => {
                                    const isSelected = selectedVariant === variant;
                                    return (
                                        <button
                                            key={variant}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`
                        relative p-4 border text-left transition-all duration-200
                        ${isSelected
                                                    ? 'border-brand-volt bg-brand-surface2 shadow-[0_4px_15px_rgba(27,79,216,0.1)]'
                                                    : 'border-brand-surface2 hover:border-brand-muted bg-brand-bg'}
                      `}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`font-drama text-lg ${isSelected ? 'text-brand-volt' : 'text-brand-text'}`}>
                                                    {variant.split(' ')[0]} {/* XS-Box etc. */}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-mono text-sm ${isSelected ? 'text-brand-volt font-bold' : 'text-brand-text'}`}>
                                                        {variantPrices[variant]}
                                                    </span>
                                                    {isSelected && <Check size={18} className="text-brand-volt" />}
                                                </div>
                                            </div>
                                            <span className="text-sm text-brand-muted font-sans block">
                                                {variant.split(' ').slice(1).join(' ').replace(/[()]/g, '')} {/* e.g., 19-25 Artikel */}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Upsell: Snack Mystery Box */}
                        <div className="bg-brand-surface2 p-6 border border-brand-orange/30 relative">
                            <div className="absolute -top-3 right-4 bg-brand-orange text-brand-bg text-xs font-drama px-2 py-1 tracking-wider uppercase">
                                Oft zusammen gekauft
                            </div>

                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-brand-surface rounded-full shrink-0">
                                    <PackagePlus className="text-brand-orange" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-drama text-brand-text mb-1">Snack Mystery Box hinzufügen?</h4>
                                    <p className="text-sm text-brand-muted font-sans hidden sm:block">Der perfekte Boost für zwischendurch. Mindestens +30% mehr Warenwert.</p>
                                    <div className="mt-4 sm:hidden flex justify-center w-full">
                                        <img src={`${import.meta.env.BASE_URL}Snack Mystery Box.jpg`} alt="Snack Mystery Box" className="w-1/2 object-contain rounded drop-shadow-md" />
                                    </div>
                                    <div className="mt-4 hidden sm:block">
                                        <img src={`${import.meta.env.BASE_URL}Snack Mystery Box.jpg`} alt="Snack Mystery Box" className="w-48 object-contain rounded drop-shadow-md" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <button
                                    onClick={() => setIncludeSnackBox(!includeSnackBox)}
                                    className={`
                    w-full px-6 py-3 border-2 font-drama uppercase tracking-wider transition-colors
                    ${includeSnackBox ? 'bg-brand-orange text-brand-bg border-brand-orange' : 'border-brand-muted text-brand-text hover:border-brand-orange'}
                  `}
                                >
                                    {includeSnackBox ? 'Hinzugefügt' : '+ Hinzufügen'}
                                </button>

                                {includeSnackBox && (
                                    <div className="space-y-2">
                                        <select
                                            value={snackSize}
                                            onChange={(e) => setSnackSize(e.target.value)}
                                            className="w-full bg-brand-bg border border-brand-orange text-brand-text p-3 font-sans outline-none focus:ring-1 focus:ring-brand-orange"
                                        >
                                            {Object.keys(SNACK_BOX_VARIANTS).map(size => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                        <div className="flex items-center justify-between px-1 text-sm">
                                            <span className="text-brand-muted font-sans">Preis:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-brand-volt font-mono font-bold">+{snackBoxPrices[snackSize].discounted}</span>
                                                <span className="text-brand-muted font-mono line-through text-xs">{snackBoxPrices[snackSize].original}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quantity & Checkout */}
                        <div className="border-t border-brand-surface2 pt-8 mt-4 space-y-6">

                            <div className="flex items-center gap-4">
                                <label className="text-sm font-mono text-brand-muted uppercase">Menge:</label>
                                <div className="flex items-center border border-brand-surface2 bg-brand-surface">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-brand-text hover:text-brand-volt transition-colors">−</button>
                                    <span className="px-4 py-2 text-brand-text font-mono w-12 text-center">{qty}</span>
                                    <button onClick={() => setQty(Math.min(10, qty + 1))} className="px-4 py-2 text-brand-text hover:text-brand-volt transition-colors">+</button>
                                </div>
                            </div>

                            <div className="bg-brand-volt/5 border border-brand-volt/20 p-4 flex gap-3 items-start">
                                <Info className="text-brand-volt shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-brand-muted font-sans leading-relaxed">
                                    <strong className="text-brand-text">Bestpreisgarantie von Brustbizeps</strong>
                                </p>
                            </div>

                            <Button size="lg" className="w-full text-lg sm:text-xl py-6 sm:py-8 tracking-tighter" onClick={handleCheckout}>
                                JETZT ZUR KASSE GEHEN
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
