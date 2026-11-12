import { cleanup, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const motionState = vi.hoisted(() => ({
  reduced: false,
  props: [] as Record<string, unknown>[],
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: {
      children: ReactNode;
      className?: string;
    }) => {
      motionState.props.push(props);
      return <div className={className}>{children}</div>;
    },
  },
  useReducedMotion: () => motionState.reduced,
}));

import { HeroSection } from './HeroSection';

afterEach(() => {
  cleanup();
  motionState.reduced = false;
  motionState.props = [];
});

describe('HeroSection', () => {
  it('presenta el contenido, la descarga pendiente y el enlace de navegación', () => {
    render(<HeroSection />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Reportá. Sumá. Transformá.',
    );
    expect(screen.getByText('Tu ciudad. Tu impacto.')).toBeTruthy();
    expect(screen.getByText(/reportá problemas ambientales/i)).toBeTruthy();
    expect(screen.getByText(/disponible próximamente/i)).toBeTruthy();
    expect(screen.queryByRole('link', { name: /descargar apk/i })).toBeNull();
    expect(screen.getByRole('link', { name: 'Ver cómo funciona' }).getAttribute('href'))
      .toBe('#como-funciona');
    expect(screen.getByAltText(/pantalla de inicio de ecoalerta/i).getAttribute('loading'))
      .toBe('eager');
    expect(screen.getByText('Capturas de la app con datos de ejemplo')).toBeTruthy();
    expect(screen.getAllByText('Ejemplo ilustrativo')).toHaveLength(1);
    expect(screen.getByText('Ejemplo de reporte')).toBeTruthy();
    expect(screen.getByText('Tu entorno').parentElement?.className).toContain('hero-floating-card');
    expect(screen.getByText('Ejemplo ilustrativo').parentElement?.className).toContain('hero-floating-card');
  });

  it('acepta una imagen real sin presentarla como ejemplo', () => {
    render(
      <HeroSection
        image={{
          src: '/pantalla-real.webp',
          alt: 'Pantalla real de EcoAlerta',
          width: 360,
          height: 720,
          isIllustrative: false,
        }}
      />,
    );

    expect(screen.getByAltText('Pantalla real de EcoAlerta').getAttribute('src'))
      .toBe('/pantalla-real.webp');
    expect(screen.getAllByText('Ejemplo ilustrativo')).toHaveLength(1);
  });

  it('alterna las tarjetas y escalona los elementos de entrada', () => {
    render(<HeroSection />);

    const floating = motionState.props.filter((props) => props.animate);
    expect(floating).toHaveLength(2);
    expect(floating.map((props) => props.animate)).toEqual([
      { y: [0, -8, 0] },
      { y: [0, 8, 0] },
    ]);
    expect(floating.map((props) => props.transition)).toEqual([
      { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.8 },
      { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.8 },
    ]);
    const reveals = motionState.props.filter((props) => props.whileInView);
    expect(reveals.map((props) => props.transition)).toEqual(
      [0, 0.1, 0.2, 0.3, 0.4].map((delay) => ({ duration: 0.5, delay })),
    );
  });

  it('desactiva la flotación cuando se solicita movimiento reducido', () => {
    motionState.reduced = true;
    render(<HeroSection />);

    const floating = motionState.props.filter((props) => props.animate);
    expect(floating.map((props) => props.animate)).toEqual([{ y: 0 }, { y: 0 }]);
    expect(floating.map((props) => props.transition)).toEqual([
      { duration: 0 },
      { duration: 0 },
    ]);
  });

  it('mantiene el contenido esencial en el HTML inicial', () => {
    const html = renderToStaticMarkup(<HeroSection />);
    expect(html).toContain('Reportá. Sumá.');
    expect(html).toContain('Ver cómo funciona');
    expect(html).not.toContain('opacity:0');
  });
});
