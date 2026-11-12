import type { ImpactItem } from '../types/content';

export type ImpactCards =
  | readonly []
  | readonly [ImpactItem]
  | readonly [ImpactItem, ImpactItem]
  | readonly [ImpactItem, ImpactItem, ImpactItem];

export const impact: ImpactCards = [
  {
    kind: 'objective',
    id: 'visibilizar',
    label: 'Visibilizar',
    description: 'Dar visibilidad a las situaciones ambientales del entorno.',
  },
  {
    kind: 'objective',
    id: 'participar',
    label: 'Participar',
    description: 'Invitar a la comunidad a observar y cuidar su entorno.',
  },
  {
    kind: 'objective',
    id: 'conectar',
    label: 'Conectar',
    description: 'Acercar a las personas a las iniciativas de su comunidad.',
  },
];
