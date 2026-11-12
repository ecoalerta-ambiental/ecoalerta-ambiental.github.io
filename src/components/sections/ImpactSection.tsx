import { Leaf } from 'lucide-react';
import { impact as defaultImpact, type ImpactCards } from '../../content/impact';
import { InteractiveCard } from '../motion/InteractiveCard';
import { Reveal } from '../motion/Reveal';

export interface ImpactSectionProps {
  items?: ImpactCards;
}

export function ImpactSection({ items = defaultImpact }: ImpactSectionProps) {
  return (
    <section
      id="impacto"
      aria-labelledby="impacto-title"
      className="relative isolate overflow-hidden bg-background"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-emerald opacity-10"
      >
        <path
          d="M-50 150 L1250 360 M-50 340 L1250 70 M150 -50 L500 530 M700 -50 L950 530 M-50 50 L1250 260"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
        />
        <path
          d="M-50 150 L1250 360 M-50 340 L1250 70 M150 -50 L500 530 M700 -50 L950 530 M-50 50 L1250 260"
          fill="none"
          stroke="var(--color-background)"
          strokeWidth="3"
        />
      </svg>
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-content-secondary">
            <Leaf aria-hidden="true" className="text-emerald" size={18} />
            Impacto
          </p>
          <h2 id="impacto-title" className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
            Cuidar el entorno empieza por mirar alrededor.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-content-secondary">
            Cada reporte puede ayudar a visibilizar lo que necesita atención.
          </p>
        </Reveal>
        {items.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.1} className="h-full" repeatOnView>
                <InteractiveCard className="p-6">
                  {item.kind === 'metric' ? (
                    <>
                      <p className="text-3xl font-bold text-content-primary">{item.value}</p>
                      <h3 className="mt-2 font-semibold text-content-primary">{item.label}</h3>
                      <p className="mt-3 text-sm text-content-secondary">Período: {item.period}</p>
                      <p className="mt-1 text-sm text-content-secondary">Fuente: {item.source}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-content-primary">{item.label}</h3>
                      <p className="mt-3 leading-relaxed text-content-secondary">{item.description}</p>
                    </>
                  )}
                </InteractiveCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
