'use client'

import { cn } from '@/lib/utils'

// ── Variant Config ────────────────────────────────────────────
const VARIANT_STYLES = {
  neon:   { border: '#39FF14', text: '#39FF14' },
  cyan:   { border: '#00F0FF', text: '#00F0FF' },
  purple: { border: '#BF5AF2', text: '#BF5AF2' },
  amber:  { border: '#FFB800', text: '#FFB800' },
  red:    { border: '#FF3B5C', text: '#FF3B5C' },
  dim:    { border: '#2D3748', text: '#4A5568' },
} as const

export type BadgeVariant = keyof typeof VARIANT_STYLES

// ── Types ─────────────────────────────────────────────────────
export interface BadgeProps {
  children:   React.ReactNode
  variant?:   BadgeVariant
  className?: string
}

// ── Component ─────────────────────────────────────────────────
export function Badge({
  children,
  variant   = 'dim',
  className,
}: BadgeProps) {
  const { border, text } = VARIANT_STYLES[variant]

  return (
    <span
      className={cn(
        'inline-block rounded-full border',
        'px-2 py-0.5',
        'font-mono text-[10px] uppercase tracking-wider',
        'bg-transparent',
        'leading-none',
        className,
      )}
      style={{
        borderColor: border,
        color:       text,
      }}
    >
      {children}
    </span>
  )
}

export default Badge
