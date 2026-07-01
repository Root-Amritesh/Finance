'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverGlow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverGlow = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)]',
        'backdrop-blur-[20px] backdrop-saturate-[150%] transition-all duration-300',
        hoverGlow && 'hover:border-[rgba(0,240,255,0.20)] hover:shadow-[0_0_25px_rgba(0,240,255,0.06)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

GlassCard.displayName = 'GlassCard';
export default GlassCard;