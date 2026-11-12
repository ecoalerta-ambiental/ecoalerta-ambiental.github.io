import { Gift } from 'lucide-react';
import type { Reward } from '../../types/content';
import { InteractiveCard } from '../motion/InteractiveCard';

export interface RewardCardProps {
  reward: Reward;
}

export function RewardCard({ reward }: RewardCardProps) {
  return (
    <InteractiveCard className="overflow-hidden p-4">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-surface-glass-emerald">
        {reward.imageUrl ? (
          <img
            src={reward.imageUrl}
            alt=""
            width={320}
            height={240}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <Gift aria-hidden="true" size={48} className="text-emerald" />
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-content-primary">{reward.name}</h3>
      {reward.costPoints !== undefined && (
        <p className="mt-1 text-sm text-content-secondary">
          {reward.costPoints} Ecopuntos
        </p>
      )}
      {reward.isIllustrative && (
        <p className="mt-2 text-xs text-content-secondary">Ejemplo ilustrativo</p>
      )}
    </InteractiveCard>
  );
}
