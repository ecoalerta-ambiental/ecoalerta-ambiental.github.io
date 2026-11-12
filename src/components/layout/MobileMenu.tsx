import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { siteConfig } from '../../config/site';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <div className="lg:hidden" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-glass text-content-primary"
      >
        {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
      </button>
      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25 }}
        aria-hidden={!open}
        inert={!open}
        className="absolute left-0 right-0 top-full overflow-hidden border-b border-glass bg-background shadow-glass"
      >
        <nav aria-label="Navegación móvil" className="mx-auto flex max-w-content flex-col gap-1 px-6 py-4">
          {siteConfig.navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-content-primary hover:bg-white/10 focus-visible:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );
}
