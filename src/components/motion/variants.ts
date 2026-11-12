export type RevealVariant = 'up' | 'scale' | 'fade';

export const revealMovement: Record<RevealVariant, Record<string, number[]>> = {
  up: { y: [0, 12, 0] },
  scale: { scale: [1, 0.98, 1] },
  fade: {},
};
