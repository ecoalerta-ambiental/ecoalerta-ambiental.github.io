export interface NavigationLink {
  readonly label: string;
  readonly href: `#${string}`;
}

export const navigation = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'EcoTienda', href: '#ecotienda' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Preguntas frecuentes', href: '#faq' },
] as const satisfies readonly NavigationLink[];
