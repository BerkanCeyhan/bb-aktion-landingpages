import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export function StickyBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky bar after scrolling past hero (approx 600px)
            const heroPassed = window.scrollY > 600;

            // Hide sticky bar when main variant selector in view
            const selector = document.getElementById('product-selector');
            let selectorInView = false;
            if (selector) {
                const rect = selector.getBoundingClientRect();
                // If top of selector is in viewport or above, AND bottom is below viewport top
                selectorInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            }

            setIsVisible(heroPassed && !selectorInView);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check immediately
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSelector = () => {
        document.getElementById('product-selector')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className={`
        fixed bottom-0 left-0 w-full z-40 transform transition-transform duration-500 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
      `}
        >
            {/* Visual separation border */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-volt/50 via-brand-orange/50 to-brand-volt/50" />

            <div className="bg-dark-surface border-t border-dark-surface2 py-4 px-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="hidden sm:flex items-center gap-4">
                        <div className="bg-dark-bg p-2 border border-dark-surface2">
                            <img src={`${import.meta.env.BASE_URL}XL_Variante.png`} alt="Box" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <p className="font-drama text-dark-text tracking-wide truncate w-48 lg:w-64">Brustbizeps Mystery Box</p>
                            <div className="flex items-center gap-1">
                                <span className="text-brand-orange text-xs">★★★★★</span>
                                <span className="text-dark-muted font-mono text-xs">4.8/5</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-4 animate-bounce">
                        <span className="font-mono text-xs text-brand-orange drop-shadow-md hidden md:block uppercase font-bold tracking-widest">
                            Nur noch 47 Boxen
                        </span>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-4">

                        <div className="text-right hidden sm:block">
                            <p className="font-bold text-dark-text line-through opacity-50 text-sm">Ab 89,90€</p>
                            <p className="font-drama text-brand-volt text-xl">Ab 24,90€</p>
                        </div>

                        <Button size="sm" variant="primary" className="w-full sm:w-auto" onClick={scrollToSelector}>
                            Jetzt Auswählen
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
