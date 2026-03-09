import React from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { InterestSection } from './components/sections/InterestSection';
import { DesireSection } from './components/sections/DesireSection';
import { ProductSelectorSection } from './components/sections/ProductSelectorSection';
import { ObjectionCrusherSection, GuaranteeFooter } from './components/sections/ObjectionCrusherSection';
import { StickyBar } from './components/ui/StickyBar';

function App() {
  return (
    <div className="bg-brand-bg min-h-screen font-sans selection:bg-brand-volt selection:text-white pb-24">
      <main>
        <HeroSection />
        <InterestSection />
        <DesireSection />
        <ProductSelectorSection />
        <ObjectionCrusherSection />
      </main>
      <GuaranteeFooter />
      <StickyBar />
    </div>
  );
}

export default App;
