'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, hoverGlow, type GlowColour } from '@/lib/motion'

// ── Types ─────────────────────────────────────────────────────
export interface CardProps {
  children:    React.ReactNode
  className?:  string
  title?:      string
  subtitle?:   string
  glowColor?:  GlowColour
  /** Pass delay (seconds) for staggered page-level animations */
  delay?:      number
  /** Remove default padding for full-bleed content */
  noPadding?:  boolean
}

// ── Component ─────────────────────────────────────────────────
export function Card({
  children,
  className,
  title,
  subtitle,
  glowColor,
  delay   = 0,
  noPadding = false,
}: CardProps) {
  const glow = glowColor ? hoverGlow(glowColor) : null

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      whileHover={
        glow
          ? { borderColor: glow.borderColor, boxShadow: glow.boxShadow, transition: { duration: 0.3 } }
          : { borderColor: 'rgba(0,240,255,0.20)', boxShadow: '0 0 25px rgba(0,240,255,0.06)', transition: { duration: 0.3 } }
      }
      className={cn(
        'glass-card',
        !noPadding && 'p-5',
        className,
      )}
    >
      {/* Optional header */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#2D3748]">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="mt-0.5 text-[10px] text-[#2D3748]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </motion.div>
  )
}

export default Card
