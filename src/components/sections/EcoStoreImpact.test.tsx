import { cleanup, render, screen, within } from '@testing-library/react';
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
      children?: ReactNode;
      className?: string;
    }) => {
      motionState.props.push(props);
      return <div className={className}>{children}</div>;
    },
  },
  useReducedMotion: () => motionState.reduced,
}));

import { EcoStoreSection } from './EcoStoreSection';
import { ImpactSection } from './ImpactSection';

afterEach(() => {
  cleanup();
  motionState.reduced = false;
  motionState.props = [];
  vi.useRealTimers();
});

describe('EcoStoreSection', () => {
  it('muestra los productos y Ecopuntos proporcionados como ejemplos y explica las condiciones', () => {
    render(<EcoStoreSection />);

    expect(screen.getByRole('region', { name: 'Explorá EcoTienda' }).id).toBe('ecotienda');
    const products = [
      ['Lavandina', 280, 'lavandina.jpg'],
      ['Esponja vegetal', 250, 'esponja-vegetal.webp'],
      ['Lámpara LED de bajo consumo', 300, 'lampara-led.webp'],
      ['Semillas para huerta', 150, 'semillas-huerta.jpeg'],
      ['Kit de cuidado personal sólido', 750, 'kit-cuidado-personal.webp'],
      ['Kit de cubiertos', 850, 'kit-cubiertos.jpg'],
      ['Cepillo de bambú', 100, 'cepillo-bambu.webp'],
      ['Botella térmica', 1000, 'botella-termica.jpg'],
      ['Compostera domiciliaria 20 L', 700, 'compostera-domiciliaria.webp'],
      ['Gorra oficial EcoAlerta', 500, 'gorra-ecoalerta.jpg'],
      ['Bolsa de tela reutilizable', 300, 'bolsa-tela.jpg'],
    ] as const;
    const carousel = screen.getByRole('group', { name: /productos de ecotienda/i });
    const list = within(carousel).getByRole('list');
    expect(within(list).getAllByText('Ejemplo ilustrativo')).toHaveLength(11);
    for (const [name, cost, image] of products) {
      const card = screen.getByRole('heading', { name }).parentElement;
      if (!card) throw new Error(`No se encontró la tarjeta de ${name}`);
      expect(within(card).getByText(`${cost} Ecopuntos`)).toBeTruthy();
      expect(card.querySelector('img')?.getAttribute('src')).toBe(`/images/rewards/${image}`);
    }
    expect(screen.getByText(/canje de puntos por productos con retiro presencial/i)).toBeTruthy();
    expect(screen.getByText('La disponibilidad y las condiciones se consultan en la app.')).toBeTruthy();
    expect(screen.getByText(/disponible próximamente/i)).toBeTruthy();
    expect(screen.queryByRole('link', { name: /descargar/i })).toBeNull();
  });

  it('muestra el coste confirmado, incluso si es cero, y la imagen sin etiqueta de ejemplo', () => {
    render(
      <EcoStoreSection
        rewards={[{
          id: 'real',
          name: 'Producto confirmado',
          imageUrl: '/producto.webp',
          costPoints: 0,
          isIllustrative: false,
        }]}
      />,
    );

    expect(screen.getByText('0 Ecopuntos')).toBeTruthy();
    expect(screen.queryByText('Ejemplo ilustrativo')).toBeNull();
    const image = document.querySelector('img');
    expect(image?.getAttribute('src')).toBe('/producto.webp');
    expect(image?.getAttribute('alt')).toBe('');
    expect(image?.getAttribute('loading')).toBe('lazy');
  });

  it('presenta un mensaje claro cuando no hay tarjetas', () => {
    render(<EcoStoreSection rewards={[]} />);
    expect(screen.getByText('Las recompensas se consultan en la app.')).toBeTruthy();
  });
});

describe('ImpactSection', () => {
  it('muestra objetivos cualitativos en vez de cifras no confirmadas', () => {
    render(<ImpactSection />);

    const section = screen.getByRole('region', { name: /cuidar el entorno/i });
    expect(section.id).toBe('impacto');
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(within(section).queryByText(/fuente:/i)).toBeNull();
    expect(within(section).queryByText(/período:/i)).toBeNull();
  });

  it('incluye la fuente y el período de las métricas suministradas', () => {
    render(
      <ImpactSection
        items={[{
          kind: 'metric',
          id: 'metric',
          value: '12',
          label: 'Reportes',
          period: '2025',
          source: 'Informe de ejemplo',
        }]}
      />,
    );

    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('Período: 2025')).toBeTruthy();
    expect(screen.getByText('Fuente: Informe de ejemplo')).toBeTruthy();
  });
});

describe('interacción de las tarjetas', () => {
  it('eleva y revela el glow en hover o foco durante 0,2 segundos', () => {
    render(<EcoStoreSection />);
    const cards = motionState.props.filter((props) => props.whileHover === 'active');
    const glows = motionState.props.filter((props) =>
      JSON.stringify(props.variants) === JSON.stringify({
        rest: { opacity: 0 },
        active: { opacity: 1 },
      }),
    );

    expect(cards).toHaveLength(22);
    expect(glows).toHaveLength(22);
    for (const card of cards) {
      expect(card.whileFocus).toBe('active');
      expect(card.variants).toEqual({ rest: { y: 0 }, active: { y: -5 } });
      expect(card.transition).toEqual({ duration: 0.2 });
    }
    for (const glow of glows) {
      expect(glow.transition).toEqual({ duration: 0.2 });
    }
  });

  it('elimina el desplazamiento y la duración para movimiento reducido', () => {
    motionState.reduced = true;
    render(<ImpactSection />);
    const cards = motionState.props.filter((props) => props.whileHover === 'active');

    expect(cards).toHaveLength(3);
    for (const card of cards) {
      expect(card.variants).toEqual({ rest: { y: 0 }, active: { y: 0 } });
      expect(card.transition).toEqual({ duration: 0 });
    }
  });
});
