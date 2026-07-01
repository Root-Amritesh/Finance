import {
  addMonths,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  format,
  isSameMonth,
  parseISO,
} from 'date-fns';
import {
  BUDGET_CEILING,
  COLLEGE_CERTS,
  EXPENSE_CATEGORIES,
  GRADUATION_DATE,
  MISSION_PHASES,
  MISSION_START_DATE,
  TOTAL_COMMITTED,
} from '@/lib/constants';
import type {
  CertStatusEntry,
  Contribution,
  Expense,
  ExpenseCategory,
  MissionPhase,
} from '@/types';

// ── BUDGET ────────────────────────────────────────────────────────────

export function getBudgetRemaining(): number {
  return BUDGET_CEILING - TOTAL_COMMITTED;
}

export function getBudgetUsedPercentage(): number {
  return (TOTAL_COMMITTED / BUDGET_CEILING) * 100;
}

// ── CERTIFICATIONS ────────────────────────────────────────────────────

export interface CertProgressResult {
  completed:  number;
  total:      number;
  percentage: number;
}

export function getCertProgress(certStatuses: CertStatusEntry[]): CertProgressResult {
  const total          = COLLEGE_CERTS.length;
  const collegeCertIds = new Set(COLLEGE_CERTS.map((c) => c.id));
  const completed      = certStatuses.filter(
    (e) => e.status === 'completed' && collegeCertIds.has(e.certId)
  ).length;
  return { completed, total, percentage: total === 0 ? 0 : (completed / total) * 100 };
}

// ── MISSION TIMELINE ──────────────────────────────────────────────────

export interface MissionDaysResult {
  remaining:   number;
  totalDays:   number;
  elapsedDays: number;
  percentage:  number;
}

export function getMissionDays(today: Date = new Date()): MissionDaysResult {
  const start     = parseISO(MISSION_START_DATE);
  const end       = parseISO(GRADUATION_DATE);
  const totalDays = Math.max(1, differenceInCalendarDays(end, start));
  const elapsed   = Math.min(totalDays, Math.max(0, differenceInCalendarDays(today, start)));
  const remaining = Math.max(0, differenceInCalendarDays(end, today));
  return { remaining, totalDays, elapsedDays: elapsed, percentage: (elapsed / totalDays) * 100 };
}

export function getCurrentPhase(today: Date = new Date()): MissionPhase {
  const match = MISSION_PHASES.find((phase) => {
    const s = parseISO(phase.startDate);
    const e = parseISO(phase.endDate);
    return today >= s && today <= e;
  });
  return match ?? MISSION_PHASES[MISSION_PHASES.length - 1]!;
}

// ── MONTHLY BURN ──────────────────────────────────────────────────────

export function getCurrentMonthSpent(
  expenses: Expense[],
  referenceDate: Date = new Date()
): number {
  return expenses
    .filter((e) => isSameMonth(parseISO(e.date), referenceDate))
    .reduce((sum, e) => sum + e.amount, 0);
}

export interface CategorySpend {
  category: ExpenseCategory;
  label:    string;
  color:    string;
  amount:   number;
}

export function getMonthlySpendByCategory(
  expenses: Expense[],
  referenceDate: Date = new Date()
): CategorySpend[] {
  const monthExpenses = expenses.filter((e) =>
    isSameMonth(parseISO(e.date), referenceDate)
  );
  const totals = new Map<ExpenseCategory, number>();
  for (const e of monthExpenses) {
    totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount);
  }
  return Array.from(totals.entries())
    .map(([category, amount]) => ({
      category,
      label:  EXPENSE_CATEGORIES[category].label,
      color:  EXPENSE_CATEGORIES[category].color,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
}

// ── LAPTOP SAVINGS ETA ────────────────────────────────────────────────

export function getLaptopETA(
  saved:         number,
  goal:          number,
  contributions: Contribution[]
): string {
  const remaining = goal - saved;
  if (remaining <= 0)             return 'Goal reached';
  if (contributions.length < 2)  return 'Set monthly contribution to see ETA';

  const sorted   = [...contributions].sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );
  const first        = parseISO(sorted[0]!.date);
  const now          = new Date();
  const monthsElapsed = Math.max(1, differenceInCalendarMonths(now, first));
  const totalSaved   = contributions.reduce((s, c) => s + c.amount, 0);
  const avgMonthly   = totalSaved / monthsElapsed;

  if (avgMonthly <= 0) return 'Set monthly contribution to see ETA';

  const monthsLeft = Math.ceil(remaining / avgMonthly);
  const etaDate    = addMonths(now, monthsLeft);
  return `ETA ${format(etaDate, 'MMM yyyy')} · ~${monthsLeft} mo at current pace`;
}