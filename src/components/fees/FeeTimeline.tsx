'use client';

import { motion } from 'framer-motion';
import { SemesterCard } from '@/components/fees/SemesterCard';
import { TOTAL_REMAINING_FEES } from '@/lib/constants';
import { cn, formatINR } from '@/lib/utils';
import type { FeeMilestone } from '@/types';

export interface FeeTimelineProps {
  milestones: FeeMilestone[];
}

const PHASE_LABELS: Record<string, string> = {
  sem1:  'PHASE 1',
  sem2:  'PHASE 1',
  year2: 'PHASE 2',
  year3: 'PHASE 3',
  year4: 'PHASE 4',
};

export function FeeTimeline({ milestones }: FeeTimelineProps) {
  const firstUpcomingIndex = milestones.findIndex((m) => m.status === 'upcoming');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        {milestones.map((milestone, index) => {
          const isNext         = index === firstUpcomingIndex;
          const isLast         = index === milestones.length - 1;
          const isPaid         = milestone.status === 'paid';
          const nextIsUnlocked = milestones[index + 1]?.status === 'paid' || (index + 1) === firstUpcomingIndex;
          const lineIsNeon     = isPaid && nextIsUnlocked;

          return (
            <div key={milestone.id} className="flex gap-4">
              {/* ── Left rail: phase label + connector node/line ── */}
              <div className="flex w-14 shrink-0 flex-col items-center sm:w-16">
                <span className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-dim)]">
                  {PHASE_LABELS[milestone.id] ?? ''}
                </span>
                <span
                  className={cn(
                    'h-3 w-3 shrink-0 rounded-full border-2',
                    isPaid
                      ? 'border-[var(--accent-neon)] bg-[var(--accent-neon)]'
                      : isNext
                      ? 'border-[var(--accent-amber)] bg-[var(--accent-amber)]'
                      : 'border-[var(--text-dim)] bg-transparent'
                  )}
                  style={
                    isPaid
                      ? { boxShadow: '0 0 10px rgba(57,255,20,0.5)' }
                      : isNext
                      ? { boxShadow: '0 0 10px rgba(255,184,0,0.5)' }
                      : undefined
                  }
                />
                {!isLast && (
                  <div
                    className={cn(
                      'w-px flex-1 min-h-[2.5rem]',
                      lineIsNeon ? 'bg-[var(--accent-neon)]' : 'bg-[var(--text-dim)]'
                    )}
                    style={
                      lineIsNeon
                        ? { boxShadow: '0 0 6px rgba(57,255,20,0.4)' }
                        : undefined
                    }
                  />
                )}
              </div>

              {/* ── Right: semester card ── */}
              <div className="flex-1 pb-4">
                <SemesterCard milestone={milestone} isNext={isNext} delay={index * 0.06} />
              </div>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: milestones.length * 0.06 + 0.1, ease: 'easeOut' }}
        className="flex items-center justify-between rounded-xl border border-[rgba(255,184,0,0.20)] bg-[rgba(255,184,0,0.04)] px-5 py-4"
      >
        <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Total Remaining Fees
        </span>
        <span
          className="font-mono text-xl font-bold text-[var(--accent-amber)] sm:text-2xl"
          style={{ textShadow: '0 0 20px rgba(255,184,0,0.35), 0 0 40px rgba(255,184,0,0.12)' }}
        >
          {formatINR(TOTAL_REMAINING_FEES)}
        </span>
      </motion.div>
    </div>
  );
}

export default FeeTimeline;