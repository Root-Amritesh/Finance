import type { Variants } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// FADE IN UP — base card/element entrance
// ═══════════════════════════════════════════════════════════════
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// STAGGER CONTAINER — wraps a grid/list of cards
// Apply to the parent div; children use staggerItem
// ═══════════════════════════════════════════════════════════════
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.05,
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// STAGGER ITEM — child of staggerContainer
// Does NOT set its own initial/animate — inherited from parent
// ═══════════════════════════════════════════════════════════════
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: 'easeOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// SLIDE IN FROM LEFT — sidebar nav items
// ═══════════════════════════════════════════════════════════════
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// SCALE IN — modals, tooltips, badges
// ═══════════════════════════════════════════════════════════════
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// PROGRESS BAR FILL — animated width from 0 to target
// ═══════════════════════════════════════════════════════════════
export const progressFill = (targetPercent: number): Variants => ({
  hidden:  { width: '0%' },
  visible: {
    width: `${targetPercent}%`,
    transition: {
      duration: 1.2,
      ease:     'easeOut',
      delay:    0.2,
    },
  },
})

// ═══════════════════════════════════════════════════════════════
// HOVER GLOW — applied via whileHover on motion elements
// Returns the correct glow object based on colour key
// ═══════════════════════════════════════════════════════════════
export type GlowColour = 'cyan' | 'neon' | 'purple' | 'amber' | 'red'

const GLOW_MAP: Record<GlowColour, { borderColor: string; boxShadow: string }> = {
  cyan:   { borderColor: 'rgba(0,240,255,0.20)',   boxShadow: '0 0 25px rgba(0,240,255,0.06)'   },
  neon:   { borderColor: 'rgba(57,255,20,0.20)',   boxShadow: '0 0 25px rgba(57,255,20,0.06)'   },
  purple: { borderColor: 'rgba(191,90,242,0.20)',  boxShadow: '0 0 25px rgba(191,90,242,0.06)'  },
  amber:  { borderColor: 'rgba(255,184,0,0.20)',   boxShadow: '0 0 25px rgba(255,184,0,0.06)'   },
  red:    { borderColor: 'rgba(255,59,92,0.20)',   boxShadow: '0 0 25px rgba(255,59,92,0.06)'   },
}

export function hoverGlow(colour: GlowColour) {
  return GLOW_MAP[colour]
}

// ═══════════════════════════════════════════════════════════════
// TAP SCALE — buttons
// ═══════════════════════════════════════════════════════════════
export const tapScale = { scale: 0.97 } as const
