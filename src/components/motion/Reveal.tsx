import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { revealMovement, type RevealVariant } from './variants';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  repeatOnView?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
  repeatOnView = false,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const movement = revealMovement[variant];
  const active = reducedMotion ? { opacity: 1 } : { opacity: [1, 0.9, 1], ...movement };

  return (
    <motion.div
      className={className}
      initial={false}
      animate={repeatOnView ? (inView ? active : { opacity: 1, y: 0, scale: 1 }) : undefined}
      whileInView={repeatOnView ? undefined : active}
      onViewportEnter={repeatOnView ? () => setInView(true) : undefined}
      onViewportLeave={repeatOnView ? () => setInView(false) : undefined}
      viewport={{ once: !repeatOnView }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
