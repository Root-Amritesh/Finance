'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

export type AlertTone = 'neon' | 'amber' | 'red';

const TONE: Record<AlertTone, { text: string; border: string; rgb: string }> = {
  neon:  { text: 'text-[var(--accent-neon)]',   border: 'border-[rgba(57,255,20,0.25)]',  rgb: '57,255,20'  },
  amber: { text: 'text-[var(--accent-amber)]',  border: 'border-[rgba(255,184,0,0.30)]',  rgb: '255,184,0'  },
  red:   { text: 'text-[var(--accent-red)]',    border: 'border-[rgba(255,59,92,0.30)]',  rgb: '255,59,92'  },
};

export interface AlertCardProps {
  icon:     LucideIcon;
  title:    string;
  subtitle: ReactNode;
  tone:     AlertTone;
  pulse?:   boolean;
}

export function AlertCard({ icon: Icon, title, subtitle, tone, pulse = false }: AlertCardProps) {
  const styles = TONE[tone];

  const card = (
    <GlassCard
      hoverGlow={false}
      className={cn('flex h-full items-center gap-3 p-5', styles.border)}
    >
      <Icon className={cn('shrink-0', styles.text)} size={20} />
      <div className="min-w-0">
        <p className={cn('font-mono text-xs font-bold tracking-wide', styles.text)}>{title}</p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">{subtitle}</p>
      </div>
    </GlassCard>
  );

  if (!pulse) return card;

  return (
    <motion.div
      className="h-full rounded-2xl"
      animate={{
        boxShadow: [
          `0 0 0px  rgba(${styles.rgb},0)`,
          `0 0 18px rgba(${styles.rgb},0.3)`,
          `0 0 0px  rgba(${styles.rgb},0)`,
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {card}
    </motion.div>
  );
}

export default AlertCard;