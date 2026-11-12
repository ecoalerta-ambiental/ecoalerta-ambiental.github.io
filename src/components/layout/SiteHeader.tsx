import { downloadConfig } from '../../config/download';
import { siteConfig } from '../../config/site';
import { DownloadButton } from '../ui/DownloadButton';
import { MobileMenu } from './MobileMenu';
import { SiteLogo } from './SiteLogo';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-glass bg-[var(--color-header-background)] backdrop-blur-glass">
      <div className="relative mx-auto flex min-h-20 max-w-content items-center justify-between gap-3 px-4 sm:px-8">
        <SiteLogo />
        <nav aria-label="Navegación principal" className="hidden items-center gap-5 lg:flex">
          {siteConfig.navigation.map((link) => (
            <a key={link.href} href={link.href} className="rounded text-sm text-content-secondary hover:text-content-primary focus-visible:text-content-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DownloadButton
            config={{ ...downloadConfig, availabilityMessage: 'APK pendiente' }}
            location="header"
            label="Descargar"
            className="px-4 text-xs sm:text-sm"
          />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
