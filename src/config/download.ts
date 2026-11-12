export interface DownloadConfig {
  readonly url: string | null;
  readonly version: string | null;
  readonly size: string | null;
  readonly requirements: string | null;
  readonly updatedAt: string | null;
  readonly availabilityMessage: string;
}

export const downloadConfig = {
  url: 'https://expo.dev/artifacts/eas/quNI4KEVwx3RwkrVa1lO9D4dfVjMervfXmOXndAD7fg.apk',
  version: null,
  size: null,
  requirements: null,
  updatedAt: null,
  availabilityMessage:
    'La descarga de EcoAlerta para Android estará disponible próximamente.',
} as const satisfies DownloadConfig;

export function isDownloadAvailable(
  config: DownloadConfig = downloadConfig,
): config is DownloadConfig & { readonly url: string } {
  if (!config.url) {
    return false;
  }

  try {
    return new URL(config.url).protocol === 'https:';
  } catch {
    return false;
  }
}
