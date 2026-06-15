import React, { useEffect } from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { InterestSection } from './components/sections/InterestSection';
import { DesireSection } from './components/sections/DesireSection';
import { ProductSelectorSection } from './components/sections/ProductSelectorSection';
import { BoxContentsSection } from './components/sections/BoxContentsSection';
import { ObjectionCrusherSection, GuaranteeFooter } from './components/sections/ObjectionCrusherSection';
import { StickyBar } from './components/ui/StickyBar';

function App() {
  // Deep-link support: scroll to #section after mount (sections render async).
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-dark-bg min-h-screen font-sans selection:bg-brand-volt selection:text-dark-bg pb-24">
      <main>
        <HeroSection />
        <InterestSection />
        <DesireSection />
        <ProductSelectorSection />
        <BoxContentsSection />
        <ObjectionCrusherSection />
      </main>
      <GuaranteeFooter />
      <StickyBar />
    </div>
  );
}

export default App;
