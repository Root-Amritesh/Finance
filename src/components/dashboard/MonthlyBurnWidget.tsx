'use client';

import {
  Bar, BarChart, CartesianGrid, Cell,
  ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { Wallet } from 'lucide-react';
import { GlassCard }              from '@/components/ui/GlassCard';
import { useMounted }             from '@/hooks/useMounted';
import {
  getCurrentMonthSpent,
  getMonthlySpendByCategory,
} from '@/lib/calculations';
import { MONTHLY_POCKET_MONEY }   from '@/lib/constants';
import { formatINR, formatINRShort } from '@/lib/utils';
import { useFinanceStore }         from '@/store/useFinanceStore';

interface TooltipItem {
  payload: { label: string; amount: number; color: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipItem[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]!.payload;
  return (
    <div className="rounded-lg border border-[var(--glass-border)] bg-[#0D0D1AE6] px-3 py-2 backdrop-blur-md">
      <p className="font-mono text-[11px] text-[var(--text-muted)]">{item.label}</p>
      <p className="font-mono text-sm font-bold" style={{ color: item.color }}>
        {formatINR(item.amount)}
      </p>
    </div>
  );
}

export function MonthlyBurnWidget() {
  const mounted  = useMounted();
  const expenses = useFinanceStore((s) => s.expenses);

  const data       = mounted ? getMonthlySpendByCategory(expenses) : [];
  const totalSpent = mounted ? getCurrentMonthSpent(expenses) : 0;

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Monthly Burn
        </h3>
        <span className="font-mono text-[10px] text-[var(--text-dim)]">
          {mounted
            ? `${formatINR(totalSpent)} / ${formatINR(MONTHLY_POCKET_MONEY)}`
            : 'Syncing…'}
        </span>
      </div>

      {!mounted ? (
        <div className="mt-4 h-[220px] w-full animate-pulse rounded-xl bg-[rgba(255,255,255,0.04)]" />
      ) : data.length === 0 ? (
        <div className="flex h-[220px] flex-col items-center justify-center gap-2 text-center">
          <Wallet size={28} className="text-[var(--text-dim)]" strokeWidth={1.5} />
          <p className="text-xs text-[var(--text-dim)]">
            No expenses logged yet — tap Monthly to add
          </p>
        </div>
      ) : (
        <div className="mt-2 h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: '#4A5568', fontSize: 10 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                tickLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={40}
              />
              <YAxis
                tick={{ fill: '#4A5568', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => formatINRShort(v)}
                width={48}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              />
              <ReferenceLine
                y={MONTHLY_POCKET_MONEY}
                stroke="#FFB800"
                strokeDasharray="4 4"
                label={{
                  value: 'BUDGET',
                  position: 'insideTopRight',
                  fill: '#FFB800',
                  fontSize: 10,
                }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={42}>
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlassCard>
  );
}

export default MonthlyBurnWidget;