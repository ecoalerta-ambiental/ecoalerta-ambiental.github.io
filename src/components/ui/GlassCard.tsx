import type { ComponentPropsWithoutRef } from 'react';

export interface GlassCardProps extends ComponentPropsWithoutRef<'div'> {
  glow?: boolean;
}

export function GlassCard({
  children,
  className = '',
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={[
        'glass-panel rounded-card',
        glow ? 'shadow-glass-glow' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
