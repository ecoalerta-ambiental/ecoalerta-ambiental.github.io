import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import App from './App';
import { downloadConfig } from '../config/download';

afterEach(cleanup);

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('App', () => {
  it('ensambla las secciones en orden y proporciona todos los destinos de navegación', () => {
    const { container } = render(<App />);
    const main = screen.getByRole('main');
    const sections = within(main).getAllByRole('region');

    expect(sections.map((section) => section.getAttribute('aria-labelledby'))).toEqual([
      'hero-title', 'benefits-title', 'how-title', 'ecotienda-title',
      'impacto-title', 'download-title', 'faq-title',
    ]);
    expect(within(main).getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const id of ['inicio', 'contenido', 'como-funciona', 'ecotienda', 'impacto', 'faq']) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
    expect(screen.getAllByRole('link', { name: 'Preguntas frecuentes' }).map((link) => link.getAttribute('href')))
      .toEqual(['#faq', '#faq']);
    const logos = screen.getAllByRole('link', { name: 'EcoAlerta' });
    expect(logos).toHaveLength(2);
    for (const logo of logos) {
      expect(logo.getAttribute('href')).toBe('#inicio');
      expect(logo.querySelector('img')?.getAttribute('src')).toBe('/images/logo-ecoalerta-128.png');
      expect(logo.querySelector('img')?.getAttribute('alt')).toBe('');
    }
    const downloads = screen.getAllByRole('link', { name: /descargar/i });
    expect(downloads).toHaveLength(4);
    for (const link of downloads) {
      expect(link.getAttribute('href')).toBe(downloadConfig.url);
    }
    expect(screen.queryByText(/versión de la app:/i)).toBeNull();
  });

  it('permite abrir y cerrar el menú móvil con teclado, Escape y navegación', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Abrir menú' });
    const panel = document.getElementById(toggle.getAttribute('aria-controls') ?? '');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel?.hasAttribute('inert')).toBe(true);

    toggle.focus();
    await user.keyboard('{Enter}');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(panel?.hasAttribute('inert')).toBe(false);
    const mobileNav = screen.getByRole('navigation', { name: 'Navegación móvil' });
    await user.tab();
    expect(document.activeElement).toBe(within(mobileNav).getByRole('link', { name: 'Cómo funciona' }));
    await user.keyboard('{Escape}');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);

    await user.keyboard('{Enter}');
    await user.click(within(screen.getByRole('navigation', { name: 'Navegación móvil' })).getByRole('link', { name: 'Impacto' }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel?.hasAttribute('inert')).toBe(true);
  });
});
