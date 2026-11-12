import { navigation, type NavigationLink } from '../content/navigation';

export interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly navigation: readonly NavigationLink[];
}

export const siteConfig = {
  name: 'EcoAlerta',
  description:
    'Reportá problemas ambientales desde tu celular y conocé las recompensas disponibles en EcoTienda.',
  navigation,
} as const satisfies SiteConfig;
