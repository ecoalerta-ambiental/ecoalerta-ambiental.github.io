import type { ProcessStep } from '../types/content';

export const process: readonly ProcessStep[] = [
  {
    number: 1,
    icon: 'report',
    title: 'Registrá un reporte',
    description:
      'Agregá un título y una descripción, elegí una categoría, indicá la dirección y adjuntá una foto. También podés agregar ubicación.',
  },
  {
    number: 2,
    icon: 'tracking',
    title: 'Seguí su estado',
    description:
      'Consultá si está en revisión, aprobado o rechazado. Tras la validación en campo se asignan Ecopuntos.',
  },
  {
    number: 3,
    icon: 'store',
    title: 'Explorá EcoTienda',
    description:
      'Canjeá tus Ecopuntos y usá el código recibido para retirar los productos en un punto de entrega municipal.',
  },
];
