'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { tapScale } from '@/lib/motion'

// ── Variant Config ────────────────────────────────────────────
const VARIANT_STYLES = {
  cyan: {
    border:      '#00F0FF',
    text:        '#00F0FF',
    glowHover:   '0 0 15px rgba(0,240,255,0.35), 0 0 30px rgba(0,240,255,0.15)',
    glowActive:  '0 0 8px  rgba(0,240,255,0.25)',
  },
  neon: {
    border:      '#39FF14',
    text:        '#39FF14',
    glowHover:   '0 0 15px rgba(57,255,20,0.35), 0 0 30px rgba(57,255,20,0.15)',
    glowActive:  '0 0 8px  rgba(57,255,20,0.25)',
  },
  purple: {
    border:      '#BF5AF2',
    text:        '#BF5AF2',
    glowHover:   '0 0 15px rgba(191,90,242,0.35), 0 0 30px rgba(191,90,242,0.15)',
    glowActive:  '0 0 8px  rgba(191,90,242,0.25)',
  },
} as const

// ── Size Config ───────────────────────────────────────────────
const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-[10px]',
  md: 'px-5 py-2   text-xs',
  lg: 'px-7 py-3   text-sm',
} as const

export type GlowButtonVariant = keyof typeof VARIANT_STYLES
export type GlowButtonSize    = keyof typeof SIZE_STYLES

// ── Types ─────────────────────────────────────────────────────
export interface GlowButtonProps {
  children:   React.ReactNode
  onClick?:   () => void
  variant?:   GlowButtonVariant
  size?:      GlowButtonSize
  disabled?:  boolean
  type?:      'button' | 'submit' | 'reset'
  className?: string
  ariaLabel?: string
}

// ── Component ─────────────────────────────────────────────────
export function GlowButton({
  children,
  onClick,
  variant   = 'cyan',
  size      = 'md',
  disabled  = false,
  type      = 'button',
  className,
  ariaLabel,
}: GlowButtonProps) {
  const { border, text, glowHover, glowActive } = VARIANT_STYLES[variant]

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? tapScale : undefined}
      whileHover={
        !disabled
          ? { boxShadow: glowHover, transition: { duration: 0.25 } }
          : undefined
      }
      initial={{ boxShadow: glowActive }}
      aria-label={ariaLabel}
      className={cn(
        // Layout
        'inline-flex items-center justify-center gap-2',
        // Shape
        'rounded-lg border',
        // Typography
        'font-mono uppercase tracking-wider',
        // No fill — border + text only
        'bg-transparent',
        // Transition for non-Motion properties
        'transition-opacity duration-300',
        // Size
        SIZE_STYLES[size],
        // Disabled state
        disabled
          ? 'cursor-not-allowed opacity-30'
          : 'cursor-pointer',
        className,
      )}
      style={{
        borderColor: border,
        color:       text,
      }}
    >
      {children}
    </motion.button>
  )
}

export default GlowButton
