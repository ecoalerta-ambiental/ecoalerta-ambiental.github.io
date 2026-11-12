import { cleanup, render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const motionState = vi.hoisted(() => ({
  reduced: false,
  lines: [] as Record<string, unknown>[],
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children?: ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    span: (props: Record<string, unknown>) => {
      motionState.lines.push(props);
      return <span aria-hidden="true" />;
    },
  },
  useReducedMotion: () => motionState.reduced,
}));

import { HowItWorksSection } from './HowItWorksSection';
import { FaqSection } from './FaqSection';

afterEach(() => {
  cleanup();
  motionState.reduced = false;
  motionState.lines = [];
});

describe('contenido de la aplicación', () => {
  it('presenta los tres pasos ordenados y sus datos sin prometer puntos automáticos', () => {
    render(<HowItWorksSection />);
    const steps = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(steps).toHaveLength(3);
    expect(steps.map((step) => within(step).getByRole('heading').textContent)).toEqual([
      'Registrá un reporte', 'Seguí su estado', 'Explorá EcoTienda',
    ]);
    expect(within(steps[0]).getByText(/adjuntá una foto/i)).toBeTruthy();
    expect(within(steps[0]).getByText(/título y una descripción/i)).toBeTruthy();
    expect(within(steps[1]).getByText(/en revisión, aprobado o rechazado/i)).toBeTruthy();
    expect(within(steps[1]).getByText(/tras la validación en campo se asignan Ecopuntos/i)).toBeTruthy();
    expect(within(steps[2]).getByText(/código recibido para retirar los productos/i)).toBeTruthy();
    expect(screen.queryByText(/puntos automáticos/i)).toBeNull();
    expect(motionState.lines).toHaveLength(2);
    expect(motionState.lines.every((line) => (line.viewport as { once: boolean }).once)).toBe(true);
  });

  it('muestra las líneas sin animación cuando se prefiere movimiento reducido', () => {
    motionState.reduced = true;
    render(<HowItWorksSection />);
    expect(motionState.lines).toHaveLength(2);
    for (const line of motionState.lines) {
      expect(line.initial).toBe(false);
      expect(line.transition).toEqual({ duration: 0 });
    }
  });

  it('explica el reporte, la revisión, el canje y la conservación confirmados', () => {
    render(<FaqSection />);
    expect(screen.getByText(/microbasural, foco de dengue, terreno baldío y otro/i)).toBeTruthy();
    expect(screen.getByText(/agente de campo valida que un reporte es real/i)).toBeTruthy();
    expect(screen.getByText(/código para retirar los productos/i)).toBeTruthy();
    expect(screen.getByText(/vigencia de 30 días desde la compra/i)).toBeTruthy();
    expect(screen.getByText(/título, descripción, categoría, dirección y una foto obligatoria/i)).toBeTruthy();
    expect(screen.getByText(/quien lo creó puede consultarlo, pero no modificarlo una vez enviado/i)).toBeTruthy();
    expect(screen.getByText(/administrador revisa la foto/i)).toBeTruthy();
    expect(screen.getByText(/reportes se conservan indefinidamente/i)).toBeTruthy();
    const instructions = screen.getByText(/desde tu teléfono Android, descargá el APK/i);
    expect(instructions.textContent).toMatch(/carpeta Descargas/i);
    expect(instructions.textContent).toMatch(/permiso para instalar aplicaciones desde esa fuente/i);
    expect(instructions.textContent).toMatch(/podés desactivar ese permiso después/i);
    expect(instructions.textContent).toMatch(/no desactives las protecciones de seguridad/i);
  });
});
