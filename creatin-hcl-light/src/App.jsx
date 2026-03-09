import React from 'react';
import HeroSection from './components/HeroSection';
import MechanismSection from './components/MechanismSection';
import ProofSection from './components/ProofSection';
import ProductSelectorSection from './components/ProductSelectorSection';
import ObjectionCrusherSection from './components/ObjectionCrusherSection';
import IngredientsSection from './components/IngredientsSection';
import AboutSection from './components/AboutSection';
import GuaranteeSection from './components/GuaranteeSection';
import StickyCTA from './components/StickyCTA';

export default function App() {
  return (
    <div className="font-body text-brand-text bg-brand-bg min-h-screen overflow-x-hidden selection:bg-brand-accent selection:text-white">
      <main>
        <HeroSection />
        <MechanismSection />
        <ProofSection />
        <ProductSelectorSection />
        <ObjectionCrusherSection />
        <IngredientsSection />
        <AboutSection />
        <GuaranteeSection />
      </main>

      {/* The Footer */}
      <footer className="pt-8 pb-32 text-center text-brand-text/50 text-xs font-mono border-t border-brand-text/10 bg-brand-bg relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
          <p>© {new Date().getFullYear()} BrustBizeps. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a href="https://brustbizeps.de/policies/legal-notice" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text transition-colors">Impressum</a>
            <a href="https://brustbizeps.de/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text transition-colors">Datenschutz</a>
            <a href="https://brustbizeps.de/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text transition-colors">AGB</a>
          </div>
        </div>
      </footer>

      <StickyCTA />
    </div>
  );
}
