import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, Search, ShoppingBag } from 'lucide-react';
import { process } from '../../content/process';
import type { ProcessStep } from '../../types/content';
import { Reveal } from '../motion/Reveal';
import { GlassCard } from '../ui/GlassCard';

const stepIcons = {
  report: ClipboardList,
  tracking: Search,
  store: ShoppingBag,
} satisfies Record<ProcessStep['icon'], typeof ClipboardList>;

export function HowItWorksSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="como-funciona" aria-labelledby="how-title" className="bg-background">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <h2 id="how-title" className="text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">Cómo funciona</h2>
          <p className="mt-4 max-w-2xl text-content-secondary">Un recorrido para participar desde tu celular.</p>
        </Reveal>
        <div className="relative mt-10">
          <motion.span
            aria-hidden="true"
            className="absolute bottom-8 left-2 top-8 w-px origin-top bg-emerald md:hidden"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute left-8 right-8 top-2 hidden h-px origin-left bg-emerald md:block"
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          />
          <ol className="relative grid gap-4 pl-6 md:grid-cols-3 md:pl-0 md:pt-6">
          {process.map(({ number, title, description, icon }, index) => {
            const Icon = stepIcons[icon];
            return (
              <li key={number}>
                <Reveal delay={index * 0.1} className="h-full" repeatOnView>
                  <GlassCard className="h-full p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-content-secondary">{String(number).padStart(2, '0')}</span>
                      <div aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-glass bg-surface-glass-emerald">
                        <Icon className="text-emerald" size={28} />
                      </div>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-content-primary">{title}</h3>
                    <p className="mt-3 leading-relaxed text-content-secondary">{description}</p>
                  </GlassCard>
                </Reveal>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
