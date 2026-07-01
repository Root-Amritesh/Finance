'use client';

import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { CheckCircle2, Clock, Lock } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { SEM1_PAYMENTS } from '@/lib/constants';
import { cn, formatINR } from '@/lib/utils';
import type { FeeMilestone } from '@/types';

export interface SemesterCardProps {
  milestone: FeeMilestone;
  isNext:    boolean;
  delay?:    number;
}

function formatReceiptDate(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy');
}

export function SemesterCard({ milestone, isNext, delay = 0 }: SemesterCardProps) {
  const isPaid       = milestone.status === 'paid';
  const isSem1       = milestone.id === 'sem1';
  const showReceipts = isPaid && isSem1;

  const statusBadge = isPaid ? (
    <Badge variant="neon">CLEARED ✓</Badge>
  ) : isNext ? (
    <motion.span
      animate={{
        boxShadow: [
          '0 0 0px rgba(255,184,0,0)',
          '0 0 14px rgba(255,184,0,0.35)',
          '0 0 0px rgba(255,184,0,0)',
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      className="inline-block rounded-full"
    >
      <Badge variant="amber">NEXT DUE</Badge>
    </motion.span>
  ) : (
    <Badge variant="dim">UPCOMING</Badge>
  );

  const StatusIcon = isPaid ? CheckCircle2 : isNext ? Clock : Lock;
  const iconColor  = isPaid
    ? 'text-[var(--accent-neon)]'
    : isNext
    ? 'text-[var(--accent-amber)]'
    : 'text-[var(--text-dim)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      <GlassCard
        hoverGlow={!isPaid && !isNext ? false : true}
        className={cn(
          'flex flex-col gap-4 p-5',
          isPaid && 'border-[rgba(57,255,20,0.18)]',
          isNext && 'border-[rgba(255,184,0,0.22)]'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <StatusIcon size={18} className={cn('mt-0.5 shrink-0', iconColor)} strokeWidth={2} />
            <div>
              <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--text-primary)]">
                {milestone.label}
              </h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{milestone.dueDateLabel}</p>
            </div>
          </div>
          {statusBadge}
        </div>

        <div
          className={cn(
            'font-mono text-2xl font-bold leading-none sm:text-3xl',
            isPaid
              ? 'text-[var(--accent-neon)]'
              : isNext
              ? 'text-[var(--accent-amber)]'
              : 'text-[var(--text-muted)]'
          )}
          style={{
            textShadow: isPaid
              ? '0 0 20px rgba(57,255,20,0.35), 0 0 40px rgba(57,255,20,0.12)'
              : isNext
              ? '0 0 20px rgba(255,184,0,0.35), 0 0 40px rgba(255,184,0,0.12)'
              : undefined,
          }}
        >
          {formatINR(milestone.amount)}
        </div>

        {isSem1 && (
          <p className="text-[11px] text-[var(--text-dim)]">
            Includes ₹30,000 security deposit — REFUNDABLE AT GRADUATION (May 2030)
          </p>
        )}

        {showReceipts && (
          <div className="flex flex-wrap gap-2 border-t border-[var(--glass-border)] pt-3">
            {SEM1_PAYMENTS.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center gap-2 rounded-lg border border-[rgba(57,255,20,0.20)] bg-[rgba(57,255,20,0.04)] px-2.5 py-1.5"
              >
                <span className="font-mono text-[10px] font-bold text-[var(--accent-neon)]">
                  {payment.id}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  {formatReceiptDate(payment.date)}
                </span>
                <span className="font-mono text-[10px] font-bold text-[var(--text-primary)]">
                  {formatINR(payment.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}

export default SemesterCard;