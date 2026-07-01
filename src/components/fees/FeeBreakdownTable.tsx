'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { SEM1_LINE_ITEMS, SEM1_TOTAL } from '@/lib/constants';
import { cn, formatINR } from '@/lib/utils';

export interface FeeBreakdownTableProps {
  delay?: number;
}

export function FeeBreakdownTable({ delay = 0 }: FeeBreakdownTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="h-full"
    >
      <GlassCard className="flex h-full flex-col gap-4 p-5">
        <div>
          <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--text-primary)]">
            SEM 1 LINE-ITEM BREAKDOWN
          </h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Bennett University · AY2026-27 · confirmed on portal
          </p>
        </div>

        <div className="flex flex-col divide-y divide-[var(--glass-border)]">
          {SEM1_LINE_ITEMS.map((item) => {
            const isNegative = item.amount < 0;
            const isDeposit  = item.label.startsWith('Security Deposit');

            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 py-2.5 font-mono text-xs sm:text-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-[var(--text-muted)]">
                    {item.label.replace(' (refundable)', '')}
                  </span>
                  {isDeposit && <Badge variant="amber">REFUNDABLE</Badge>}
                </div>
                <span
                  className={cn(
                    'shrink-0 font-bold',
                    isNegative ? 'text-[var(--accent-neon)]' : 'text-[var(--text-primary)]'
                  )}
                >
                  {formatINR(item.amount)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--glass-border)] pt-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-sm">
            Total Paid
          </span>
          <span
            className="font-mono text-xl font-bold text-[var(--accent-neon)] sm:text-2xl"
            style={{ textShadow: '0 0 20px rgba(57,255,20,0.35), 0 0 40px rgba(57,255,20,0.12)' }}
          >
            {formatINR(SEM1_TOTAL)}
          </span>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default FeeBreakdownTable;