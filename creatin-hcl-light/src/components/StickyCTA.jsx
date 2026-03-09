import React, { useEffect, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const hero = document.querySelector('section:first-of-type');
            const checkout = document.getElementById('checkout-section');

            if (!hero || !checkout) return;

            const heroBottom = hero.getBoundingClientRect().bottom;
            const checkoutTop = checkout.getBoundingClientRect().top;
            const checkoutBottom = checkout.getBoundingClientRect().bottom;

            // Show when passed hero, hide when checkout section is clearly in view
            if (heroBottom < 0 && (checkoutTop > window.innerHeight || checkoutBottom < 0)) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCheckout = () => {
        document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className={`fixed bottom-0 left-0 w-full bg-white border-t border-brand-text/10 z-50 transform transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]' : 'translate-y-full shadow-none'}`}
        >
            <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 pb-safe flex items-center justify-between gap-3 md:gap-4">

                {/* Product Image + Text Group */}
                <div className="flex items-center gap-3">
                    <img
                        src={`${import.meta.env.BASE_URL}produkt-bild.png`}
                        alt="Creatin HCL 1000mg"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-sm shrink-0 bg-brand-surface border border-brand-text/10 p-1"
                    />

                    {/* Desktop Text */}
                    <div className="hidden md:flex flex-col">
                        <div className="font-heading font-extrabold uppercase text-brand-text tracking-wide text-lg leading-none mb-1">
                            Creatin HCL (1000mg)
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex text-brand-accent">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                            </div>
                            <span className="text-[10px] font-mono font-bold text-brand-text/50 uppercase">Apothekenqualität</span>
                        </div>
                    </div>

                    {/* Mobile Text */}
                    <div className="flex md:hidden flex-col justify-center">
                        <div className="flex text-brand-accent mb-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                        </div>
                        <span className="text-brand-text font-heading font-bold uppercase text-xs leading-none">HCL 1000mg</span>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={scrollToCheckout}
                    className="bg-brand-accent text-white px-3 sm:px-4 md:px-6 py-2.5 md:py-3 font-heading font-bold uppercase tracking-wider hover:bg-brand-text transition-colors flex items-center justify-center gap-1.5 md:gap-2 text-[11px] sm:text-[13px] md:text-base group whitespace-nowrap shrink-0 shadow-md rounded-sm"
                >
                    JETZT BESTELLEN
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </button>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .pb-safe { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }
      `}} />
        </div>
    );
}
