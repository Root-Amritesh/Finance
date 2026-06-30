'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { hoverGlow, type GlowColour } from '@/lib/motion'

// ── Trend Config ──────────────────────────────────────────────
const TREND_MAP = {
  up:      { symbol: '↑', colour: '#39FF14' },
  down:    { symbol: '↓', colour: '#FF3B5C' },
  neutral: { symbol: '→', colour: '#FFB800' },
} as const

// ── Types ─────────────────────────────────────────────────────
export interface StatCardProps {
  label:      string
  value:      string
  subValue?:  string
  icon?:      LucideIcon
  glowColor?: GlowColour
  trend?:     keyof typeof TREND_MAP
  delay?:     number
  className?: string
}

// ── Component ─────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  glowColor,
  trend,
  delay     = 0.2,
  className,
}: StatCardProps) {
  const glow      = glowColor ? hoverGlow(glowColor) : null
  const trendMeta = trend ? TREND_MAP[trend] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      whileHover={
        glow
          ? { borderColor: glow.borderColor, boxShadow: glow.boxShadow, transition: { duration: 0.3 } }
          : { borderColor: 'rgba(0,240,255,0.20)', boxShadow: '0 0 25px rgba(0,240,255,0.06)', transition: { duration: 0.3 } }
      }
      className={cn('glass-card p-5 relative overflow-hidden', className)}
    >
      {/* Faint ambient glow if colour provided */}
      {glowColor && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[16px] opacity-[0.04]"
          style={{ background: glow?.borderColor.replace('0.20', '1') }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative flex items-start justify-between gap-3">

        {/* Left: label + value + sub */}
        <div className="min-w-0 flex-1">
          {/* Label */}
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#2D3748] mb-2">
            {label}
          </p>

          {/* Main value */}
          <p className="font-mono text-3xl font-bold leading-none text-[#E8EAF0]">
            {value}
          </p>

          {/* Sub-value / trend */}
          {subValue && (
            <p
              className="mt-1.5 font-mono text-[11px]"
              style={{ color: trendMeta ? trendMeta.colour : '#4A5568' }}
            >
              {trendMeta && <span className="mr-1">{trendMeta.symbol}</span>}
              {subValue}
            </p>
          )}
        </div>

        {/* Right: icon (muted) */}
        {Icon && (
          <div className="flex-shrink-0 opacity-20 mt-0.5" aria-hidden="true">
            <Icon size={22} className="text-[#4A5568]" />
          </div>
        )}

      </div>
    </motion.div>
  )
}

export default StatCard
