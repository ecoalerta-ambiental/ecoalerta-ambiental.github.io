import { Download } from 'lucide-react';
import {
  downloadConfig,
  isDownloadAvailable,
  type DownloadConfig,
} from '../../config/download';

export interface DownloadButtonProps {
  config?: DownloadConfig;
  label?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  location?: string;
  onDownload?: (location: string | undefined) => void;
}

const variantClasses = {
  primary:
    'bg-emerald text-background shadow-glow hover:brightness-110 focus-visible:brightness-110',
  secondary:
    'border border-glass bg-surface-glass text-content-primary hover:bg-white/10 focus-visible:bg-white/10',
} as const;

export function DownloadButton({
  config = downloadConfig,
  label = 'Descargar APK',
  variant = 'primary',
  className = '',
  location,
  onDownload,
}: DownloadButtonProps) {
  if (!isDownloadAvailable(config)) {
    return (
      <p className={['text-sm text-content-secondary', className].filter(Boolean).join(' ')}>
        {config.availabilityMessage}
      </p>
    );
  }

  return (
    <a
      href={config.url}
      onClick={onDownload ? () => onDownload(location) : undefined}
      className={[
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-[filter,background-color] duration-200 motion-reduce:transition-none',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Download aria-hidden="true" size={20} />
      {label}
    </a>
  );
}
