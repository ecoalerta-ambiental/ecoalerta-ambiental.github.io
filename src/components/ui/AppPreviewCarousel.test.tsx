import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const motionState = vi.hoisted(() => ({ reduced: false }));
vi.mock('framer-motion', () => ({
  useReducedMotion: () => motionState.reduced,
}));

import { AppPreviewCarousel } from './AppPreviewCarousel';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  motionState.reduced = false;
});

describe('AppPreviewCarousel', () => {
  it('avanza por las tres capturas y vuelve al inicio sin mostrar botones', () => {
    vi.useFakeTimers();
    const { container } = render(<AppPreviewCarousel />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-inicio.jpeg');
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-reporte.jpeg');
    expect(screen.getByRole('img').className).toContain('phone-screen-transition');
    expect(container.querySelector('img[aria-hidden="true"]')?.getAttribute('src'))
      .toBe('/images/vista-inicio.jpeg');
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-tienda.jpeg');
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-inicio.jpeg');
  });

  it('se detiene con foco, permite navegar con teclado y reanuda al salir', () => {
    vi.useFakeTimers();
    render(<AppPreviewCarousel />);
    const carousel = screen.getByRole('group', { name: 'Pantallas de EcoAlerta' });
    expect(carousel.tabIndex).toBe(0);
    fireEvent.focus(carousel);
    act(() => vi.advanceTimersByTime(14000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-inicio.jpeg');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-tienda.jpeg');
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-inicio.jpeg');
    fireEvent.blur(carousel);
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-reporte.jpeg');
  });

  it('se detiene durante hover y reanuda al retirar el puntero', () => {
    vi.useFakeTimers();
    render(<AppPreviewCarousel />);
    const carousel = screen.getByRole('group', { name: 'Pantallas de EcoAlerta' });
    fireEvent.mouseEnter(carousel);
    act(() => vi.advanceTimersByTime(14000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-inicio.jpeg');
    fireEvent.mouseLeave(carousel);
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-reporte.jpeg');
  });

  it('no rota con movimiento reducido y permite cambiar de pantalla con teclado', () => {
    vi.useFakeTimers();
    motionState.reduced = true;
    render(<AppPreviewCarousel />);
    const carousel = screen.getByRole('group', { name: 'Pantallas de EcoAlerta' });
    act(() => vi.advanceTimersByTime(14000));
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-inicio.jpeg');
    fireEvent.focus(carousel);
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(screen.getByRole('img').getAttribute('src')).toBe('/images/vista-reporte.jpeg');
  });
});
