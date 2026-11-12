import { downloadConfig, isDownloadAvailable } from '../../config/download';
import { Reveal } from '../motion/Reveal';
import { DownloadButton } from '../ui/DownloadButton';
import { GlassCard } from '../ui/GlassCard';

export function DownloadSection() {
  const details = [
    { label: 'Versión', value: downloadConfig.version },
    { label: 'Tamaño', value: downloadConfig.size },
    { label: 'Requisitos', value: downloadConfig.requirements },
    { label: 'Actualización', value: downloadConfig.updatedAt },
  ].filter((detail) => detail.value);

  return (
    <section id="descarga" aria-labelledby="download-title" className="bg-background">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-8 sm:py-24">
        <Reveal variant="scale" repeatOnView>
          <GlassCard glow className="border-emerald p-8 sm:p-12">
            <h2 id="download-title" className="text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
              Empezá a participar con EcoAlerta.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-content-secondary">
              La aplicación para Android se distribuye mediante un archivo APK cuando esté disponible.
            </p>
            <div className="mt-8">
              <DownloadButton label="Descargar APK para Android" location="descarga" />
            </div>
            {isDownloadAvailable(downloadConfig) && details.length > 0 && (
              <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-content-secondary">
                {details.map(({ label, value }) => (
                  <div key={label} className="flex gap-1">
                    <dt>{label}:</dt><dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
