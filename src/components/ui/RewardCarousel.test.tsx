import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Reward } from '../../types/content';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children?: ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
  useReducedMotion: () => false,
}));

import { RewardCarousel } from './RewardCarousel';

const rewards: Reward[] = Array.from({ length: 6 }, (_, index) => ({
  id: String(index),
  name: `Producto ${index + 1}`,
  costPoints: index,
  isIllustrative: true,
}));

afterEach(cleanup);

describe('RewardCarousel', () => {
  it('muestra la lista accesible y una copia oculta para el movimiento continuo', () => {
    const { container } = render(<RewardCarousel rewards={rewards} />);
    const carousel = screen.getByRole('group', { name: /productos de ecotienda/i });
    expect(carousel.tabIndex).toBe(0);
    const list = within(carousel).getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(6);
    const copy = container.querySelector('.reward-carousel-copy');
    expect(copy?.getAttribute('aria-hidden')).toBe('true');
    expect(copy?.hasAttribute('inert')).toBe(true);
    expect(container.querySelector('.reward-carousel-animated')?.getAttribute('style'))
      .toContain('--reward-count: 6');
    expect(within(carousel).queryByRole('button')).toBeNull();
  });

  it('mantiene una lista estática cuando hay pocos productos', () => {
    const { container } = render(<RewardCarousel rewards={rewards.slice(0, 5)} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(container.querySelector('.reward-carousel-animated')).toBeNull();
    expect(container.querySelector('.reward-carousel-copy')).toBeNull();
  });

  it('permite recorrer productos por teclado y anuncia nombre, costo y ejemplo', async () => {
    const user = userEvent.setup();
    const { container } = render(<RewardCarousel rewards={rewards} />);
    const carousel = screen.getByRole('group', { name: /productos de ecotienda/i });
    const items = within(carousel).getAllByRole('listitem');
    await user.tab();
    expect(document.activeElement).toBe(carousel);
    for (const [index, item] of items.entries()) {
      await user.tab();
      expect(document.activeElement).toBe(item);
      expect(item.getAttribute('aria-label'))
        .toBe(`Producto ${index + 1}, ${index} Ecopuntos, Ejemplo ilustrativo`);
    }
    const copy = container.querySelector('.reward-carousel-copy');
    expect(copy?.querySelectorAll('[tabindex]')).toHaveLength(0);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(items[items.length - 2]);
  });

  it('no anuncia un costo o una etiqueta que no correspondan', () => {
    render(<RewardCarousel rewards={[{
      id: 'sin-costo',
      name: 'Producto',
      isIllustrative: false,
    }]} />);
    expect(screen.getByRole('listitem').getAttribute('aria-label')).toBe('Producto');
  });

  it('presenta un mensaje claro cuando no hay productos', () => {
    render(<RewardCarousel rewards={[]} />);
    expect(screen.getByText('Las recompensas se consultan en la app.')).toBeTruthy();
  });
});
