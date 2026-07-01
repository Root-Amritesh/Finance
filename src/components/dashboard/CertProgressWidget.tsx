'use client';

import { motion, type Variants } from 'framer-motion';
import { GlassCard }   from '@/components/ui/GlassCard';
import { useMounted }  from '@/hooks/useMounted';
import { COLLEGE_CERTS, THEME_HEX } from '@/lib/constants';
import { cn, formatINRShort }        from '@/lib/utils';
import { useFinanceStore }           from '@/store/useFinanceStore';
import type { CertStatusValue }      from '@/types';

const STATUS_COLOR: Record<CertStatusValue, string> = {
  completed:   THEME_HEX.neon,
  'in-progress': THEME_HEX.cyan,
  upcoming:    THEME_HEX.amber,
  locked:      THEME_HEX.textMuted,
};

const container: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

const cell: Variants = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function CertProgressWidget() {
  const mounted      = useMounted();
  const certStatuses = useFinanceStore((s) => s.certStatuses);

  const statusFor = (id: string): CertStatusValue =>
    certStatuses.find((e) => e.certId === id)?.status ?? 'locked';

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Certification Track
        </h3>
        <span className="font-mono text-[10px] text-[var(--text-dim)]">9 COLLEGE-PHASE CERTS</span>
      </div>

      {!mounted ? (
        <div className="flex gap-4 overflow-hidden">
          {COLLEGE_CERTS.map((c) => (
            <div
              key={c.id}
              className="h-[100px] min-w-[100px] shrink-0 animate-pulse rounded-xl bg-[rgba(255,255,255,0.04)]"
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 items-center gap-0 overflow-x-auto pb-2"
        >
          {COLLEGE_CERTS.map((cert, i) => {
            const status   = statusFor(cert.id);
            const color    = STATUS_COLOR[status];
            const nextCert = COLLEGE_CERTS[i + 1];
            const nextStatus = nextCert ? statusFor(nextCert.id) : null;
            const lineSolid  = status === 'completed' && nextStatus === 'completed';

            return (
              <motion.div key={cert.id} variants={cell} className="flex shrink-0 items-center">
                <div className="flex min-w-[100px] flex-col items-center gap-1.5 text-center">
                  <span className="font-mono text-[13px] font-bold" style={{ color }}>
                    {cert.code}
                  </span>
                  <span className="text-[10px] text-[var(--text-dim)]">{cert.phaseLabel}</span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {formatINRShort(cert.cost)}
                  </span>
                  <span
                    className="mt-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                  />
                </div>

                {nextCert && (
                  <div
                    className={cn('h-px w-6 shrink-0 sm:w-10', !lineSolid && 'border-t border-dashed')}
                    style={
                      lineSolid
                        ? { backgroundColor: THEME_HEX.neon, boxShadow: `0 0 6px ${THEME_HEX.neon}` }
                        : { borderColor: 'rgba(255,255,255,0.12)' }
                    }
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </GlassCard>
  );
}

export default CertProgressWidget;