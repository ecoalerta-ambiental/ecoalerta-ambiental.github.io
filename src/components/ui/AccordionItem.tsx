import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';

export interface AccordionItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
  className = '',
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className={['glass-panel rounded-card', className].filter(Boolean).join(' ')}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-4 rounded-card px-6 py-5 text-left font-semibold text-content-primary"
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
            size={20}
          />
        </button>
      </h3>
      <motion.div
        id={panelId}
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-content-secondary">{children}</div>
      </motion.div>
    </div>
  );
}
