import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { DownloadSection } from '../components/sections/DownloadSection';
import { EcoStoreSection } from '../components/sections/EcoStoreSection';
import { FaqSection } from '../components/sections/FaqSection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { ImpactSection } from '../components/sections/ImpactSection';

export default function App() {
  return (
    <>
      <a href="#contenido" className="sr-only fixed left-4 top-4 z-[60] rounded bg-background px-4 py-2 text-content-primary focus:not-sr-only">
        Ir al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="pt-20">
        <div id="inicio">
          <HeroSection />
        </div>
        <BenefitsSection />
        <HowItWorksSection />
        <EcoStoreSection />
        <ImpactSection />
        <DownloadSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
