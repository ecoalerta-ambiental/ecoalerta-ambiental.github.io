import { MapPin, ShoppingBag, Users, type LucideIcon } from 'lucide-react';
import { benefits } from '../../content/benefits';
import { Reveal } from '../motion/Reveal';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

const icons: Record<string, LucideIcon> = {
  'map-pin': MapPin,
  users: Users,
  'shopping-bag': ShoppingBag,
};

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-title" className="bg-background">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading id="benefits-title">Tu entorno importa</SectionHeading>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map(({ id, title, description, icon }, index) => {
            const Icon = icons[icon];
            return (
            <Reveal key={id} delay={index * 0.1} className="h-full" repeatOnView>
              <GlassCard className="h-full p-6">
                <Icon aria-hidden="true" className="text-emerald" size={28} />
                <h3 className="mt-5 text-xl font-semibold text-content-primary">{title}</h3>
                <p className="mt-3 leading-relaxed text-content-secondary">{description}</p>
              </GlassCard>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
