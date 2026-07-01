'use client';

import { motion } from 'framer-motion';
import { Banknote, CalendarClock, CheckCircle2, Wallet } from 'lucide-react';
import { FeeBreakdownTable } from '@/components/fees/FeeBreakdownTable';
import { FeeTimeline } from '@/components/fees/FeeTimeline';
import { PaymentReceipt } from '@/components/fees/PaymentReceipt';
import { StatCard } from '@/components/dashboard/StatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  FEE_MILESTONES,
  SEM1_PAYMENTS,
  SEM1_TOTAL,
  TOTAL_REMAINING_FEES,
} from '@/lib/constants';
import { formatINR } from '@/lib/utils';

const BUDGET_ALLOCATION = SEM1_TOTAL + TOTAL_REMAINING_FEES; // ₹23,13,500

export default function FeesPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-5 p-4 sm:gap-6 sm:p-6 lg:p-8">

      {/* ── PAGE HEADER ───────────────────────────────────── */}
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
          <h1 className="font-mono text-lg font-bold tracking-[0.08em] text-[var(--text-primary)] sm:text-2xl">
            COLLEGE FEES
          </h1>
          <p className="mt-2 text-xs text-[var(--text-muted)] sm:text-sm">
            Bennett University &nbsp;·&nbsp; 4-Year Cost Breakdown
          </p>
        </GlassCard>
      </motion.div>

      {/* ── 3 STAT CARDS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Paid"
          value={formatINR(SEM1_TOTAL)}
          sub="Sem 1 cleared 24 Jun 2026"
          icon={CheckCircle2}
          glowColor="neon"
          delay={0.05}
        />
        <StatCard
          label="Total Remaining"
          value={formatINR(TOTAL_REMAINING_FEES)}
          sub="across Sems 2–8"
          icon={CalendarClock}
          glowColor="amber"
          delay={0.1}
        />
        <StatCard
          label="Budget Allocation"
          value={formatINR(BUDGET_ALLOCATION)}
          sub="of ₹39.8L ceiling"
          icon={Wallet}
          glowColor="cyan"
          delay={0.15}
        />
      </div>

      {/* ── FEE TIMELINE (60%) + BREAKDOWN TABLE (40%) ───── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <FeeTimeline milestones={FEE_MILESTONES} />
        </div>
        <div className="lg:col-span-2">
          <FeeBreakdownTable delay={0.2} />
        </div>
      </div>

      {/* ── SEM 1 PAYMENT RECEIPTS ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
      >
        <GlassCard className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Banknote size={16} className="text-[var(--accent-neon)]" strokeWidth={2} />
            <h3 className="font-mono text-sm font-bold tracking-wide text-[var(--text-primary)]">
              SEM 1 PAYMENT RECEIPTS
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {SEM1_PAYMENTS.map((payment, index) => (
              <PaymentReceipt
                key={payment.id}
                id={payment.id}
                amount={payment.amount}
                date={payment.date}
                delay={0.3 + index * 0.05}
              />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-[var(--glass-border)] pt-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-sm">
              Receipt Total
            </span>
            <span
              className="font-mono text-xl font-bold text-[var(--accent-neon)] sm:text-2xl"
              style={{ textShadow: '0 0 20px rgba(57,255,20,0.35), 0 0 40px rgba(57,255,20,0.12)' }}
            >
              {formatINR(SEM1_PAYMENTS.reduce((sum, p) => sum + p.amount, 0))}
            </span>
          </div>
        </GlassCard>
      </motion.div>

    </div>
  );
}