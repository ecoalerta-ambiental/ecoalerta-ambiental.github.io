import { ShoppingBag } from 'lucide-react';
import { rewards as defaultRewards } from '../../content/rewards';
import type { Reward } from '../../types/content';
import { Reveal } from '../motion/Reveal';
import { DownloadButton } from '../ui/DownloadButton';
import { GlassCard } from '../ui/GlassCard';
import { RewardCarousel } from '../ui/RewardCarousel';

export interface EcoStoreSectionProps {
  rewards?: readonly Reward[];
}

export function EcoStoreSection({ rewards = defaultRewards }: EcoStoreSectionProps) {
  return (
    <section id="ecotienda" aria-labelledby="ecotienda-title" className="bg-background">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-content-secondary">
            <ShoppingBag aria-hidden="true" className="text-emerald" size={18} />
            EcoTienda
          </p>
          <h2 id="ecotienda-title" className="mt-4 text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
            Explorá EcoTienda
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-content-secondary">
            Explorá el catálogo municipal. EcoTienda contempla el canje de puntos por productos con retiro presencial.
          </p>
          <p className="mt-4 text-sm text-content-secondary">
            La disponibilidad y las condiciones se consultan en la app.
          </p>
          <div className="mt-8">
            <DownloadButton variant="secondary" location="ecotienda" />
          </div>
        </Reveal>
        <Reveal delay={0.1} variant="scale" className="min-w-0" repeatOnView>
          <GlassCard className="p-4 sm:p-6">
            <RewardCarousel rewards={rewards} />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
