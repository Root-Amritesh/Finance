'use client';

import { motion }                from 'framer-motion';
import { AlertTriangle, Banknote, CalendarClock, CheckCircle2, Clock, ShieldCheck, Wallet } from 'lucide-react';
import { AlertCard }             from '@/components/dashboard/AlertCard';
import { BudgetGauge }           from '@/components/dashboard/BudgetGauge';
import { CertProgressWidget }    from '@/components/dashboard/CertProgressWidget';
import { LaptopGoalWidget }      from '@/components/dashboard/LaptopGoalWidget';
import { MonthlyBurnWidget }     from '@/components/dashboard/MonthlyBurnWidget';
import { StatCard, type StatGlowColor } from '@/components/dashboard/StatCard';
import { GlassCard }             from '@/components/ui/GlassCard';
import { ProgressBar }           from '@/components/ui/ProgressBar';
import { useMounted }            from '@/hooks/useMounted';
import {
  getBudgetRemaining,
  getCertProgress,
  getCurrentMonthSpent,
  getCurrentPhase,
  getMissionDays,
} from '@/lib/calculations';
import {
  COLLEGE_CERTS,
  FEE_MILESTONES,
  MONTHLY_POCKET_MONEY,
  THEME_HEX,
  YEAR3_CERT_SPIKE_TOTAL,
} from '@/lib/constants';
import { formatINR, formatINRShort } from '@/lib/utils';
import { useFinanceStore }       from '@/store/useFinanceStore';

function budgetGlow(remaining: number): StatGlowColor {
  if (remaining > 25_00_000)  return 'neon';
  if (remaining >= 10_00_000) return 'amber';
  return 'red';
}

export default function DashboardPage() {
  const mounted      = useMounted();
  const certStatuses = useFinanceStore((s) => s.certStatuses);
  const expenses     = useFinanceStore((s) => s.expenses);

  const phase          = getCurrentPhase();
  const missionDays    = getMissionDays();
  const budgetLeft     = getBudgetRemaining();

  const certProgress = mounted
    ? getCertProgress(certStatuses)
    : { completed: 0, total: COLLEGE_CERTS.length, percentage: 0 };

  const monthSpent   = mounted ? getCurrentMonthSpent(expenses) : 0;

  const sem1 = FEE_MILESTONES.find((f) => f.id === 'sem1')!;
  const sem2 = FEE_MILESTONES.find((f) => f.id === 'sem2')!;

  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-5 p-4 sm:gap-6 sm:p-6 lg:p-8">

      {/* ── MISSION HEADER ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <GlassCard
          className="relative overflow-hidden p-6 sm:p-8"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(107,33,168,0.18) 0%, rgba(107,33,168,0.05) 45%, transparent 75%)',
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-mono text-lg font-bold tracking-[0.08em] text-[var(--text-primary)] sm:text-2xl">
                MISSION: CLOUD SECURITY ARCHITECT
              </h1>
              <p className="mt-2 text-xs text-[var(--text-muted)] sm:text-sm">
                INDIA → GERMANY 2032 &nbsp;·&nbsp; Bennett University &nbsp;·&nbsp;
                CSE Cybersecurity &nbsp;·&nbsp; 2026–2030
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-[var(--accent-cyan)] px-4 py-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]"
                style={{ boxShadow: '0 0 8px var(--accent-cyan)' }}
              />
              <span className="font-mono text-xs font-semibold tracking-wide text-[var(--accent-cyan)]">
                {phase.code} · {phase.name}
              </span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ── 4 STAT CARDS ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Budget Remaining"
          value={formatINRShort(budgetLeft)}
          sub="of ₹39.8L ceiling"
          icon={Wallet}
          glowColor={budgetGlow(budgetLeft)}
          delay={0.05}
        />
        <StatCard
          label="Certs Unlocked"
          value={`${certProgress.completed} / ${certProgress.total}`}
          icon={ShieldCheck}
          glowColor="purple"
          delay={0.1}
        >
          <ProgressBar value={certProgress.percentage} color={THEME_HEX.purple} className="mt-1" />
        </StatCard>
        <StatCard
          label="Monthly Budget"
          value={`${formatINR(MONTHLY_POCKET_MONEY)} / mo`}
          sub={mounted ? `${formatINR(monthSpent)} spent this month` : 'Syncing…'}
          icon={Banknote}
          glowColor="cyan"
          delay={0.15}
        />
        <StatCard
          label="Mission Days Left"
          value={missionDays.remaining.toLocaleString('en-IN')}
          sub="days until May 2030"
          icon={CalendarClock}
          glowColor="amber"
          delay={0.2}
        />
      </div>

      {/* ── BUDGET GAUGE (60%) + CERT TRACK (40%) ────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3"><BudgetGauge /></div>
        <div className="lg:col-span-2"><CertProgressWidget /></div>
      </div>

      {/* ── MONTHLY BURN (50%) + LAPTOP GOALS (50%) ──────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MonthlyBurnWidget />
        <LaptopGoalWidget />
      </div>

      {/* ── 3-COLUMN ALERT ROW ───────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AlertCard
          icon={CheckCircle2}
          tone="neon"
          title="SEM 1 CLEARED ✓"
          subtitle={`${formatINR(sem1.amount)} · ${sem1.dueDateLabel}`}
        />
        <AlertCard
          icon={Clock}
          tone="amber"
          pulse
          title="NEXT: SEMESTER 2"
          subtitle={`${formatINR(sem2.amount)} · ${sem2.dueDateLabel}`}
        />
        <AlertCard
          icon={AlertTriangle}
          tone="red"
          pulse
          title="YEAR 3 ALERT"
          subtitle={`GCP+SCS+CKA+CKS = ${formatINR(YEAR3_CERT_SPIKE_TOTAL)} in Sems 5–6`}
        />
      </div>

    </div>
  );
}