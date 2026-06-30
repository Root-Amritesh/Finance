'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ── Colour Map ────────────────────────────────────────────────
const COLOUR_MAP = {
  neon:   { hex: '#39FF14', shadow: 'rgba(57,255,20,0.50)'  },
  cyan:   { hex: '#00F0FF', shadow: 'rgba(0,240,255,0.50)'  },
  purple: { hex: '#BF5AF2', shadow: 'rgba(191,90,242,0.50)' },
  amber:  { hex: '#FFB800', shadow: 'rgba(255,184,0,0.50)'  },
  red:    { hex: '#FF3B5C', shadow: 'rgba(255,59,92,0.50)'  },
} as const

export type ProgressColour = keyof typeof COLOUR_MAP

// ── Types ─────────────────────────────────────────────────────
export interface ProgressBarProps {
  /** 0–100 */
  value:       number
  color?:      ProgressColour
  /** Track height in px. Default: 6 */
  height?:     number
  /** Show percentage label on the right */
  showLabel?:  boolean
  /** Animate width from 0 on mount. Default: true */
  animated?:   boolean
  /** Optional text label on the left */
  label?:      string
  className?:  string
}

// ── Component ─────────────────────────────────────────────────
export function ProgressBar({
  value,
  color     = 'cyan',
  height    = 6,
  showLabel = false,
  animated  = true,
  label,
  className,
}: ProgressBarProps) {
  const clamped          = Math.max(0, Math.min(100, value))
  const { hex, shadow }  = COLOUR_MAP[color]

  return (
    <div className={cn('w-full', className)}>

      {/* Label row */}
      {(label || showLabel) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#4A5568]">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="font-mono text-[10px] text-[#4A5568]">
              {clamped}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className="w-full overflow-hidden rounded-full bg-white/5"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Animated fill */}
        <motion.div
          className="h-full rounded-full"
          initial={animated ? { width: '0%' } : { width: `${clamped}%` }}
          animate={{ width: `${clamped}%` }}
          transition={
            animated
              ? { duration: 1.2, ease: 'easeOut', delay: 0.2 }
              : { duration: 0 }
          }
          style={{
            backgroundColor: hex,
            boxShadow:       `0 0 8px ${shadow}, 0 0 16px ${shadow}`,
          }}
        />
      </div>

    </div>
  )
}

export default ProgressBar
