import type { PhoneMockupProps } from '../components/ui/PhoneMockup';

export interface AppScreen {
  readonly id: string;
  readonly label: string;
  readonly image: PhoneMockupProps['image'];
}

export const appScreens: readonly AppScreen[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    image: {
      src: `${import.meta.env.BASE_URL}images/vista-inicio.jpeg`,
      alt: 'Pantalla de inicio de EcoAlerta con productos y reportes de ejemplo',
      width: 717,
      height: 1600,
      isIllustrative: false,
    },
  },
  {
    id: 'reporte',
    label: 'Reporte',
    image: {
      src: `${import.meta.env.BASE_URL}images/vista-reporte.jpeg`,
      alt: 'Pantalla para crear un reporte ambiental en EcoAlerta',
      width: 717,
      height: 1600,
      isIllustrative: false,
    },
  },
  {
    id: 'tienda',
    label: 'EcoTienda',
    image: {
      src: `${import.meta.env.BASE_URL}images/vista-tienda.jpeg`,
      alt: 'Pantalla de EcoTienda con productos y Ecopuntos de ejemplo',
      width: 717,
      height: 1600,
      isIllustrative: false,
    },
  },
];
