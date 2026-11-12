import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { GlassCard } from '../ui/GlassCard';

export interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
}

export function InteractiveCard({ children, className = '' }: InteractiveCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      initial={false}
      animate="rest"
      whileHover="active"
      whileFocus="active"
      variants={{
        rest: { y: 0 },
        active: { y: reducedMotion ? 0 : -5 },
      }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    >
      <GlassCard className={`relative h-full ${className}`}>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-card shadow-glass-glow"
          variants={{ rest: { opacity: 0 }, active: { opacity: 1 } }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        />
        {children}
      </GlassCard>
    </motion.div>
  );
}
