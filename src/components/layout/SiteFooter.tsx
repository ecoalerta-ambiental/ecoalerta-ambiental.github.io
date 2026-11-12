import { downloadConfig } from '../../config/download';
import { siteConfig } from '../../config/site';
import { SiteLogo } from './SiteLogo';

export function SiteFooter() {
  return (
    <footer className="border-t border-glass bg-background">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-6 py-12 sm:px-8 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <SiteLogo />
          <p className="mt-4 text-sm leading-relaxed text-content-secondary">{siteConfig.description}</p>
          {downloadConfig.version && (
            <p className="mt-4 text-sm text-content-secondary">Versión de la app: {downloadConfig.version}</p>
          )}
        </div>
        <nav aria-label="Navegación del pie de página" className="flex flex-col gap-3 text-sm text-content-secondary">
          {siteConfig.navigation.map((link) => (
            <a key={link.href} href={link.href} className="rounded hover:text-content-primary focus-visible:text-content-primary">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
