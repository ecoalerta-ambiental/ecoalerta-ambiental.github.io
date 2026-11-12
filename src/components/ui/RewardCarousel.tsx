import { useRef, type CSSProperties, type FocusEvent } from 'react';
import type { Reward } from '../../types/content';
import { RewardCard } from './RewardCard';

interface RewardCarouselProps {
  rewards: readonly Reward[];
}

export function RewardCarousel({ rewards }: RewardCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  if (rewards.length === 0) {
    return <p className="p-4 text-content-secondary">Las recompensas se consultan en la app.</p>;
  }

  const animated = rewards.length >= 6;
  const duration = {
    '--reward-count': rewards.length,
  } as CSSProperties;

  function showFocusedReward(event: FocusEvent<HTMLLIElement>) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const viewport = carousel.getBoundingClientRect();
    const item = event.currentTarget.getBoundingClientRect();
    if (item.left < viewport.left) {
      carousel.scrollLeft -= viewport.left - item.left;
    } else if (item.right > viewport.right) {
      carousel.scrollLeft += item.right - viewport.right;
    }
  }

  function renderRewards(isCopy = false) {
    return rewards.map((reward) => (
      <li
        key={reward.id}
        tabIndex={isCopy ? undefined : 0}
        onFocus={isCopy ? undefined : showFocusedReward}
        aria-label={isCopy ? undefined : [
          reward.name,
          reward.costPoints !== undefined ? `${reward.costPoints} Ecopuntos` : null,
          reward.isIllustrative ? 'Ejemplo ilustrativo' : null,
        ].filter(Boolean).join(', ')}
        className="w-44 shrink-0 rounded-card sm:w-56"
      >
        <RewardCard reward={reward} />
      </li>
    ));
  }

  return (
    <div
      ref={carouselRef}
      role="group"
      aria-label="Productos de EcoTienda. Usá Tab para recorrer los productos."
      tabIndex={0}
      className="reward-carousel scrollbar-none overflow-x-auto py-2"
    >
      <div
        className={animated ? 'reward-carousel-track reward-carousel-animated' : 'reward-carousel-track'}
        style={duration}
      >
        <ul className="reward-carousel-list">{renderRewards()}</ul>
        {animated && (
          <ul className="reward-carousel-list reward-carousel-copy" aria-hidden="true" inert>
            {renderRewards(true)}
          </ul>
        )}
      </div>
    </div>
  );
}
