'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Laptop, Plus, Server }    from 'lucide-react';
import { GlassCard }   from '@/components/ui/GlassCard';
import { GlowButton }  from '@/components/ui/GlowButton';
import { RadialGauge } from '@/components/ui/RadialGauge';
import { useMounted }  from '@/hooks/useMounted';
import { getLaptopETA }from '@/lib/calculations';
import { LAPTOP_COLLEGE_GOAL, LAPTOP_LAB, THEME_HEX } from '@/lib/constants';
import { cn, formatINR, formatINRShort } from '@/lib/utils';
import { useFinanceStore } from '@/store/useFinanceStore';

function AddInput({
  variant,
  onAdd,
  onClose,
}: {
  variant: 'neon' | 'purple';
  onAdd:   (amount: number) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState('');
  const border = variant === 'neon' ? 'var(--accent-neon)' : 'var(--accent-purple)';

  const submit = () => {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return;
    onAdd(Math.round(n));
    setValue('');
    onClose();
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="mt-3 flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          autoFocus
          placeholder="Amount in ₹"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter')  submit();
            if (e.key === 'Escape') onClose();
          }}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 font-mono text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-dim)]"
        />
        <button
          onClick={submit}
          className="shrink-0 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors"
          style={{ borderColor: border, color: border }}
        >
          Save
        </button>
      </div>
    </motion.div>
  );
}

export function LaptopGoalWidget() {
  const mounted               = useMounted();
  const collegeSavings        = useFinanceStore((s) => s.laptopCollegeSavings);
  const labSavings            = useFinanceStore((s) => s.laptopLabSavings);
  const addCollegeContrib     = useFinanceStore((s) => s.addLaptopCollegeContribution);
  const addLabContrib         = useFinanceStore((s) => s.addLaptopLabContribution);
  const setLabTarget          = useFinanceStore((s) => s.setLaptopLabTarget);
  const [collegeOpen, setCollegeOpen] = useState(false);
  const [labOpen,     setLabOpen]     = useState(false);

  const collegeSaved = mounted ? collegeSavings.saved : 0;
  const labSaved     = mounted ? labSavings.saved     : 0;
  const labTarget    = mounted ? labSavings.selectedTarget : LAPTOP_LAB.PLAN;
  const collegePct   = Math.min(100, (collegeSaved / LAPTOP_COLLEGE_GOAL) * 100);
  const labPct       = Math.min(100, (labSaved / labTarget) * 100);
  const collegeEta   = mounted
    ? getLaptopETA(collegeSaved, LAPTOP_COLLEGE_GOAL, collegeSavings.contributions)
    : 'Syncing…';

  const chips = [
    { label: '₹6L', value: LAPTOP_LAB.MIN  },
    { label: '₹7L', value: LAPTOP_LAB.PLAN },
    { label: '₹8L', value: LAPTOP_LAB.MAX  },
  ];

  return (
    <GlassCard className="flex h-full flex-col p-6">
      {/* ── SECTION A — COLLEGE LAPTOP ─────────────────────── */}
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          College Laptop
        </h3>
        <Laptop size={16} className="text-[var(--accent-neon)]" />
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
        {!mounted ? (
          <div className="h-[140px] w-[140px] shrink-0 animate-pulse rounded-full bg-[rgba(255,255,255,0.04)]" />
        ) : (
          <RadialGauge percentage={collegePct} color={THEME_HEX.neon} size={140} barSize={12}>
            <span className="font-mono text-base font-bold text-[var(--accent-neon)]">
              {formatINRShort(collegeSaved)}
            </span>
            <span className="text-[9px] text-[var(--text-dim)]">saved</span>
          </RadialGauge>
        )}

        <div className="flex-1 text-center sm:text-left">
          <p className="font-mono text-sm text-[var(--text-primary)]">
            {formatINR(collegeSaved)}{' '}
            <span className="text-[var(--text-dim)]">/ {formatINR(LAPTOP_COLLEGE_GOAL)} goal</span>
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{collegeEta}</p>
          <p className="mt-2 text-[10px] text-[var(--text-dim)]">
            Tracked separately — outside ₹39.8L budget
          </p>
          <div className="mt-3 flex justify-center sm:justify-start">
            <GlowButton
              variant="neon"
              size="sm"
              disabled={!mounted}
              onClick={() => setCollegeOpen((o) => !o)}
            >
              <Plus size={13} /> Add Savings
            </GlowButton>
          </div>
          <AnimatePresence>
            {collegeOpen && (
              <AddInput
                variant="neon"
                onAdd={(n) => addCollegeContrib(n)}
                onClose={() => setCollegeOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── DIVIDER ───────────────────────────────────────── */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
        <span className="px-3 font-mono text-[10px] tracking-[0.15em] text-[var(--text-dim)]">
          LAB MACHINE GOAL
        </span>
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.06)]" />
      </div>

      {/* ── SECTION B — LAB MACHINE ──────────────────────── */}
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Lab Machine
        </h3>
        <Server size={16} className="text-[var(--accent-purple)]" />
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
        {!mounted ? (
          <div className="h-[110px] w-[110px] shrink-0 animate-pulse rounded-full bg-[rgba(255,255,255,0.04)]" />
        ) : (
          <RadialGauge percentage={labPct} color={THEME_HEX.purple} size={110} barSize={10}>
            <span className="font-mono text-sm font-bold text-[var(--accent-purple)]">
              {formatINRShort(labSaved)}
            </span>
            <span className="text-[9px] text-[var(--text-dim)]">saved</span>
          </RadialGauge>
        )}

        <div className="flex-1 text-center sm:text-left">
          <p className="font-mono text-sm text-[var(--text-primary)]">
            {formatINR(labSaved)}{' '}
            <span className="text-[var(--text-dim)]">/ {formatINRShort(labTarget)} goal</span>
          </p>
          <span className="mt-2 inline-block rounded-full border border-[var(--glass-border)] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--text-muted)]">
            Self-funded · Outside ₹39.80L
          </span>
          <p className="mt-2 text-[10px] text-[var(--text-dim)]">
            Fund via internship/freelance — not ₹6K pocket money
          </p>

          <div className="mt-3 flex justify-center gap-1.5 sm:justify-start">
            {chips.map((chip) => (
              <button
                key={chip.value}
                disabled={!mounted}
                onClick={() => setLabTarget(chip.value)}
                className={cn(
                  'rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors disabled:cursor-not-allowed',
                  labTarget === chip.value
                    ? 'border-[var(--accent-purple)] text-[var(--accent-purple)]'
                    : 'border-[var(--glass-border)] text-[var(--text-dim)] hover:text-[var(--text-muted)]'
                )}
              >
                {chip.label}{labTarget === chip.value && ' ●'}
              </button>
            ))}
          </div>

          <div className="mt-3 flex justify-center sm:justify-start">
            <GlowButton
              variant="purple"
              size="sm"
              disabled={!mounted}
              onClick={() => setLabOpen((o) => !o)}
            >
              <Plus size={13} /> Add Savings
            </GlowButton>
          </div>
          <AnimatePresence>
            {labOpen && (
              <AddInput
                variant="purple"
                onAdd={(n) => addLabContrib(n)}
                onClose={() => setLabOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
}

export default LaptopGoalWidget;