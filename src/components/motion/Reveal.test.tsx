import { act, cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const motionState = vi.hoisted(() => ({
  reduced: false,
  props: {} as Record<string, unknown>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode }) => {
      motionState.props = props;
      return <div>{children}</div>;
    },
  },
  useReducedMotion: () => motionState.reduced,
}));

import { Reveal } from './Reveal';

afterEach(() => {
  cleanup();
  motionState.reduced = false;
  motionState.props = {};
});

describe('Reveal', () => {
  it('anima una vez al entrar sin ocultar el contenido inicialmente', () => {
    render(<Reveal delay={0.2}>Contenido</Reveal>);

    expect(screen.getByText('Contenido')).toBeTruthy();
    expect(motionState.props.initial).toBe(false);
    expect(motionState.props.viewport).toEqual({ once: true });
    expect(motionState.props.whileInView).toEqual({
      opacity: [1, 0.9, 1],
      y: [0, 12, 0],
    });
    expect(motionState.props.transition).toEqual({ duration: 0.5, delay: 0.2 });
  });

  it('elimina el desplazamiento y la espera con movimiento reducido', () => {
    motionState.reduced = true;
    render(<Reveal variant="scale" delay={1} repeatOnView>Contenido</Reveal>);

    act(() => (motionState.props.onViewportEnter as () => void)());
    expect(motionState.props.animate).toEqual({ opacity: 1 });
    expect(motionState.props.transition).toEqual({ duration: 0, delay: 0 });
    expect(motionState.props.viewport).toEqual({ once: false });
  });

  it('permite repetir la animación al volver a entrar en pantalla', () => {
    render(<Reveal repeatOnView>Contenido</Reveal>);

    expect(motionState.props.viewport).toEqual({ once: false });
    expect(motionState.props.initial).toBe(false);
    expect(motionState.props.animate).toEqual({ opacity: 1, y: 0, scale: 1 });
    act(() => (motionState.props.onViewportEnter as () => void)());
    expect(motionState.props.animate).toEqual({
      opacity: [1, 0.9, 1],
      y: [0, 12, 0],
    });
    act(() => (motionState.props.onViewportLeave as () => void)());
    expect(motionState.props.animate).toEqual({ opacity: 1, y: 0, scale: 1 });
    act(() => (motionState.props.onViewportEnter as () => void)());
    expect(motionState.props.animate).toEqual({ opacity: [1, 0.9, 1], y: [0, 12, 0] });
  });
});
