export interface Benefit {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface Reward {
  readonly id: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly costPoints?: number;
  readonly isIllustrative: boolean;
}

export interface ProcessStep {
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly icon: 'report' | 'tracking' | 'store';
  readonly illustrationAlt?: string;
}

export interface Faq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export type ImpactItem =
  | {
      readonly kind: 'metric';
      readonly id: string;
      readonly value: string;
      readonly label: string;
      readonly period: string;
      readonly source: string;
    }
  | {
      readonly kind: 'objective';
      readonly id: string;
      readonly label: string;
      readonly description: string;
    };
