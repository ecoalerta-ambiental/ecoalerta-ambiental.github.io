import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Leaf, MapPin, ShoppingBag } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { Reveal } from '../motion/Reveal';
import { DownloadButton } from '../ui/DownloadButton';
import { GlassCard } from '../ui/GlassCard';
import { AppPreviewCarousel } from '../ui/AppPreviewCarousel';
import { PhoneMockup, type PhoneMockupProps } from '../ui/PhoneMockup';

export interface HeroSectionProps {
  image?: PhoneMockupProps['image'];
}

function FloatingReportCards() {
  const reducedMotion = useReducedMotion();
  const floatTransition = {
    duration: 5,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    delay: 0.8,
  };

  return (
    <>
      <motion.div
        className="pointer-events-none absolute left-0 top-[22%] z-10 w-[46%] max-w-48"
        initial={false}
        animate={reducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
        transition={reducedMotion ? { duration: 0 } : floatTransition}
      >
        <GlassCard className="hero-floating-card p-3 sm:p-4">
          <MapPin aria-hidden="true" className="mb-2 text-emerald" size={20} />
          <p className="text-sm font-semibold text-content-primary">Tu entorno</p>
          <p className="mt-1 text-xs text-content-secondary">Ejemplo de reporte</p>
        </GlassCard>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[18%] right-0 z-10 w-[46%] max-w-48"
        initial={false}
        animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
        transition={reducedMotion ? { duration: 0 } : floatTransition}
      >
        <GlassCard className="hero-floating-card p-3 sm:p-4">
          <ShoppingBag aria-hidden="true" className="mb-2 text-emerald" size={20} />
          <p className="text-sm font-semibold text-content-primary">EcoTienda</p>
          <p className="mt-1 text-xs text-content-secondary">Ejemplo ilustrativo</p>
        </GlassCard>
      </motion.div>
    </>
  );
}

export function HeroSection({ image }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,var(--color-hero-glow),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(var(--color-hero-grid)_1px,transparent_1px),linear-gradient(90deg,var(--color-hero-grid)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-glass bg-surface-glass px-4 py-2 text-sm font-medium text-content-primary">
              <Leaf aria-hidden="true" className="text-emerald" size={16} />
              Tu ciudad. Tu impacto.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              id="hero-title"
              className="mt-6 max-w-xl text-5xl font-bold leading-[1.05] tracking-tight text-content-primary sm:text-6xl lg:text-7xl"
            >
              Reportá. Sumá. <span className="text-emerald">Transformá.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-content-secondary">
              {siteConfig.description}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton location="hero" />
              <a
                href="#como-funciona"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-glass px-6 py-3 font-semibold text-content-primary transition-colors hover:bg-white/10 focus-visible:bg-white/10 motion-reduce:transition-none"
              >
                Ver cómo funciona
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.4} variant="scale">
          <div className="relative mx-auto flex w-full max-w-[31rem] justify-center py-4">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[15%] rounded-full bg-surface-glass-emerald shadow-glow-strong"
            />
            {image ? (
              <PhoneMockup image={image} loading="eager" className="relative w-[65%]" />
            ) : (
              <AppPreviewCarousel />
            )}
            <FloatingReportCards />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
