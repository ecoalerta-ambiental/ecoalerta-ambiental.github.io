import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ id, children, className = '' }: SectionHeadingProps) {
  return (
    <h2 id={id} className={`text-3xl font-bold tracking-tight text-content-primary sm:text-4xl ${className}`.trim()}>
      {children}
    </h2>
  );
}
