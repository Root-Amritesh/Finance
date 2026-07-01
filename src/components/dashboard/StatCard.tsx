'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

export type StatGlowColor = 'neon' | 'cyan' | 'purple' | 'amber' | 'red';

const GLOW_TEXT: Record<StatGlowColor, string> = {
  neon:   'text-[var(--accent-neon)]',
  cyan:   'text-[var(--accent-cyan)]',
  purple: 'text-[var(--accent-purple)]',
  amber:  'text-[var(--accent-amber)]',
  red:    'text-[var(--accent-red)]',
};

const GLOW_SHADOW: Record<StatGlowColor, string> = {
  neon:   '0 0 20px rgba(57,255,20,0.35),  0 0 40px rgba(57,255,20,0.12)',
  cyan:   '0 0 20px rgba(0,240,255,0.35),  0 0 40px rgba(0,240,255,0.12)',
  purple: '0 0 20px rgba(191,90,242,0.35), 0 0 40px rgba(191,90,242,0.12)',
  amber:  '0 0 20px rgba(255,184,0,0.35),  0 0 40px rgba(255,184,0,0.12)',
  red:    '0 0 20px rgba(255,59,92,0.35),  0 0 40px rgba(255,59,92,0.12)',
};

export interface StatCardProps {
  label:     string;
  value:     ReactNode;
  sub?:      ReactNode;
  icon:      LucideIcon;
  glowColor: StatGlowColor;
  children?: ReactNode;
  delay?:    number;
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  glowColor,
  children,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="h-full"
    >
      <GlassCard className="flex h-full flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--text-muted)]">
            {label}
          </span>
          <Icon size={16} className={GLOW_TEXT[glowColor]} strokeWidth={2} />
        </div>

        <div
          className={cn(
            'font-mono text-2xl font-bold leading-none sm:text-3xl',
            GLOW_TEXT[glowColor]
          )}
          style={{ textShadow: GLOW_SHADOW[glowColor] }}
        >
          {value}
        </div>

        {sub && (
          <p className="text-xs text-[var(--text-dim)]">{sub}</p>
        )}

        {children}
      </GlassCard>
    </motion.div>
  );
}

export default StatCard;