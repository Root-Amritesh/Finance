'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type GlowButtonVariant = 'neon' | 'cyan' | 'purple' | 'amber' | 'red';

export interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlowButtonVariant;
  size?:    'sm' | 'md';
}

const VARIANT_STYLES: Record<GlowButtonVariant, string> = {
  neon:   'border-[var(--accent-neon)]   text-[var(--accent-neon)]   hover:bg-[rgba(57,255,20,0.06)]  hover:shadow-[0_0_18px_rgba(57,255,20,0.35)]',
  cyan:   'border-[var(--accent-cyan)]   text-[var(--accent-cyan)]   hover:bg-[rgba(0,240,255,0.06)]  hover:shadow-[0_0_18px_rgba(0,240,255,0.35)]',
  purple: 'border-[var(--accent-purple)] text-[var(--accent-purple)] hover:bg-[rgba(191,90,242,0.06)] hover:shadow-[0_0_18px_rgba(191,90,242,0.35)]',
  amber:  'border-[var(--accent-amber)]  text-[var(--accent-amber)]  hover:bg-[rgba(255,184,0,0.06)]  hover:shadow-[0_0_18px_rgba(255,184,0,0.35)]',
  red:    'border-[var(--accent-red)]    text-[var(--accent-red)]    hover:bg-[rgba(255,59,92,0.06)]  hover:shadow-[0_0_18px_rgba(255,59,92,0.35)]',
};

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = 'cyan', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border bg-transparent',
        'font-mono font-medium tracking-wide transition-all duration-300',
        'disabled:cursor-not-allowed disabled:opacity-40',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

GlowButton.displayName = 'GlowButton';
export default GlowButton;