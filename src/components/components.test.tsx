import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { DownloadConfig } from '../config/download';
import { Reveal } from './motion/Reveal';
import { AccordionItem } from './ui/AccordionItem';
import { DownloadButton } from './ui/DownloadButton';
import { GlassCard } from './ui/GlassCard';
import { PhoneMockup } from './ui/PhoneMockup';

afterEach(cleanup);

beforeAll(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

const availableDownload: DownloadConfig = {
  url: 'https://downloads.example.test/ecoalerta.apk',
  version: null,
  size: null,
  requirements: null,
  updatedAt: null,
  availabilityMessage: 'Descarga pendiente',
};

describe('DownloadButton', () => {
  it('muestra la disponibilidad pendiente sin enlace cuando falta la URL', () => {
    render(<DownloadButton config={{ ...availableDownload, url: null }} />);

    expect(screen.getByText('Descarga pendiente')).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it.each(['http://example.test/app.apk', 'no-es-una-url', 'javascript:alert(1)'])(
    'no muestra enlaces para una URL no válida o insegura: %s',
    (url) => {
      render(<DownloadButton config={{ ...availableDownload, url }} />);

      expect(screen.getByText('Descarga pendiente')).toBeTruthy();
      expect(screen.queryByRole('link')).toBeNull();
    },
  );

  it('enlaza el APK HTTPS e informa la ubicación al hacer clic', async () => {
    const user = userEvent.setup();
    const onDownload = vi.fn();
    render(
      <DownloadButton
        config={availableDownload}
        location="hero"
        onDownload={onDownload}
      />,
    );
    const link = screen.getByRole('link', { name: 'Descargar APK' });

    expect(link.getAttribute('href')).toBe(availableDownload.url);
    link.addEventListener('click', (event) => event.preventDefault(), { once: true });
    await user.click(link);
    expect(onDownload).toHaveBeenCalledWith('hero');
  });
});

describe('AccordionItem', () => {
  it('se abre y cierra con teclado y mantiene asociados el botón y el panel', async () => {
    const user = userEvent.setup();
    render(
      <AccordionItem question="¿Cómo funciona?">
        <a href="#detalle">Ver detalle</a>
      </AccordionItem>,
    );
    const button = screen.getByRole('button', { name: '¿Cómo funciona?' });
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId ?? '');

    expect(panel).not.toBeNull();
    expect(panel?.getAttribute('aria-labelledby')).toBe(button.id);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel?.hasAttribute('inert')).toBe(true);

    await user.tab();
    expect(document.activeElement).toBe(button);
    await user.keyboard('{Enter}');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(panel?.hasAttribute('inert')).toBe(false);
    expect(screen.getByRole('link', { name: 'Ver detalle' })).toBeTruthy();

    await user.keyboard(' ');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel?.getAttribute('aria-hidden')).toBe('true');
    expect(panel?.hasAttribute('inert')).toBe(true);
  });
});

describe('componentes visuales', () => {
  it('identifica las imágenes ilustrativas y preserva su texto alternativo', () => {
    render(
      <PhoneMockup
        image={{
          src: '/ejemplo.webp',
          alt: 'Vista ilustrativa de un reporte',
          width: 360,
          height: 720,
          isIllustrative: true,
        }}
      />,
    );

    expect(screen.getByAltText('Vista ilustrativa de un reporte')).toBeTruthy();
    expect(screen.getByText('Ejemplo ilustrativo')).toBeTruthy();
  });

  it('permite activar el resplandor sin perder la clase base', () => {
    const { container } = render(<GlassCard glow>Contenido</GlassCard>);
    expect(container.firstElementChild?.className).toContain('glass-panel');
    expect(container.firstElementChild?.className).toContain('shadow-glass-glow');
  });

  it('renderiza contenido visible sin depender de las animaciones', () => {
    const html = renderToStaticMarkup(<Reveal>Contenido esencial</Reveal>);
    expect(html).toContain('Contenido esencial');
    expect(html).not.toContain('opacity:0');
    expect(html).not.toContain('visibility:hidden');
  });
});
