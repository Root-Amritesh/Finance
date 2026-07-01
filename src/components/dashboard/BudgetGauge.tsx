'use client';

import { GlassCard }   from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';
import {
  BUDGET_CEILING,
  BUDGET_HEADROOM,
  THEME_HEX,
  TOTAL_COMMITTED,
} from '@/lib/constants';
import { formatINRShort } from '@/lib/utils';

export function BudgetGauge() {
  const usedPct    = (TOTAL_COMMITTED / BUDGET_CEILING) * 100;
  const gaugeColor = usedPct < 50 ? THEME_HEX.neon
                   : usedPct <= 75 ? THEME_HEX.amber
                   : THEME_HEX.red;

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Budget Gauge
        </h3>
        <span className="font-mono text-[10px] text-[var(--text-dim)]">₹39.8L CEILING</span>
      </div>

      <div className="mx-auto">
        <RadialGauge percentage={usedPct} color={gaugeColor} size={240} barSize={16}>
          <span
            className="font-mono text-2xl font-bold sm:text-3xl"
            style={{
              color:      gaugeColor,
              textShadow: `0 0 20px ${gaugeColor}66, 0 0 40px ${gaugeColor}33`,
            }}
          >
            {formatINRShort(TOTAL_COMMITTED)}
          </span>
          <span className="mt-1 text-[10px] text-[var(--text-dim)]">of ₹39.8L ceiling</span>
        </RadialGauge>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[var(--glass-border)] pt-4">
        <div className="font-mono text-xs">
          <p className="text-[var(--text-dim)]">COMMITTED</p>
          <p className="mt-0.5 text-[var(--text-primary)]">{formatINRShort(TOTAL_COMMITTED)}</p>
        </div>
        <div className="text-right font-mono text-xs">
          <p className="text-[var(--text-dim)]">HEADROOM</p>
          <p className="mt-0.5 text-[var(--accent-neon)]">{formatINRShort(BUDGET_HEADROOM)}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export default BudgetGauge;