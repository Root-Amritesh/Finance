// ─── PAYLOAD FINANCE — Utilities ─────────────────────────────────────────────
// Pure functions. No side effects. No store imports.

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  format,
  parseISO,
  addMonths,
  differenceInDays,
  isBefore,
  isAfter,
  isWithinInterval,
} from 'date-fns';

import { COLLEGE_START, COLLEGE_END } from './constants';

// ─── Class Merging ────────────────────────────────────────────────────────────

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * cn('p-4', condition && 'bg-red-500', 'p-2') → 'bg-red-500 p-2'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── ID Generation ────────────────────────────────────────────────────────────

/**
 * Generate a lightweight unique ID for expense entries and contributions.
 * Not cryptographically secure — purely for local state management.
 */
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Indian Rupee Formatting ──────────────────────────────────────────────────

/**
 * Full Indian number formatting.
 * Groups last 3 digits, then pairs of 2 from the right.
 *
 * formatINR(3980000)  → "₹39,80,000"
 * formatINR(407500)   → "₹4,07,500"
 * formatINR(54656)    → "₹54,656"
 * formatINR(6000)     → "₹6,000"
 * formatINR(-38000)   → "-₹38,000"
 * formatINR(0)        → "₹0"
 */
export function formatINR(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const prefix = isNegative ? '-' : '';

  if (abs === 0) return '₹0';

  const str = abs.toString();

  // Three digits or fewer: no grouping needed
  if (str.length <= 3) {
    return `${prefix}₹${str}`;
  }

  // Split into last-3 and the rest
  const last3 = str.slice(-3);
  const rest  = str.slice(0, -3);

  // Group `rest` in pairs of 2 from the right
  let grouped = '';
  for (let i = rest.length; i > 0; i -= 2) {
    if (i - 2 >= 0) {
      grouped = `,${rest.slice(i - 2, i)}${grouped}`;
    } else {
      // Odd leading digit(s)
      grouped = `${rest.slice(0, i)}${grouped}`;
    }
  }

  // Remove any accidental leading comma (only occurs when rest was grouped entirely
  // via the i-2 >= 0 branch on every iteration — defensive guard)
  grouped = grouped.replace(/^,/, '');

  return `${prefix}₹${grouped},${last3}`;
}

/**
 * Short lakh/crore format for gauges and cards (1 decimal place).
 *
 * formatINRShort(3980000) → "₹39.8L"
 * formatINRShort(863386)  → "₹8.6L"
 * formatINRShort(54656)   → "₹54.7K"
 * formatINRShort(4800)    → "₹4.8K"
 * formatINRShort(500)     → "₹500"
 */
export function formatINRShort(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const prefix = isNegative ? '-' : '';

  if (abs >= 100_000) {
    return `${prefix}₹${(abs / 100_000).toFixed(1)}L`;
  }
  if (abs >= 1_000) {
    return `${prefix}₹${(abs / 1_000).toFixed(1)}K`;
  }
  return `${prefix}₹${Math.round(abs)}`;
}

/**
 * Compact format for analytics chart axes and tooltips.
 *
 * formatINRCompact(3116614) → "₹31.2L"
 * formatINRCompact(863386)  → "₹8.6L"
 * formatINRCompact(50000)   → "₹50.0K"
 */
export function formatINRCompact(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  const prefix = isNegative ? '-' : '';

  if (abs >= 100_000) {
    return `${prefix}₹${(abs / 100_000).toFixed(1)}L`;
  }
  if (abs >= 1_000) {
    return `${prefix}₹${(abs / 1_000).toFixed(1)}K`;
  }
  return `${prefix}₹${Math.round(abs)}`;
}

// ─── Date Utilities ───────────────────────────────────────────────────────────

/**
 * Human-readable month label from an ISO string.
 * Accepts full date "2026-08-01" or year-month "2026-08" (day defaults to 01).
 *
 * getMonthLabel("2026-08-01") → "Aug 2026"
 * getMonthLabel("2026-08")    → "Aug 2026"
 */
export function getMonthLabel(iso: string): string {
  const dateStr = iso.length === 7 ? `${iso}-01` : iso;
  return format(parseISO(dateStr), 'MMM yyyy');
}

// Semester date ranges — used by getSemesterProgress().
// Generous windows that cover the full academic period incl. exams and breaks.
const SEM_DATE_RANGES = [
  { sem: 1, from: '2026-08-01', to: '2027-01-31' },
  { sem: 2, from: '2027-02-01', to: '2027-07-31' },
  { sem: 3, from: '2027-08-01', to: '2028-01-31' },
  { sem: 4, from: '2028-02-01', to: '2028-07-31' },
  { sem: 5, from: '2028-08-01', to: '2029-01-31' },
  { sem: 6, from: '2029-02-01', to: '2029-07-31' },
  { sem: 7, from: '2029-08-01', to: '2030-01-31' },
  { sem: 8, from: '2030-02-01', to: '2030-05-31' },
] as const;

/**
 * Current B.Tech semester based on today's date.
 *
 * Returns:
 *   current = 0            before Aug 2026
 *   current = 1–8          inside that semester's window
 *   current = last completed sem   during a break between semesters
 *   current = 8, percent = 100    after graduation May 2030
 */
export function getSemesterProgress(): {
  current: number;
  total: number;
  percent: number;
} {
  const now          = new Date();
  const collegeStart = parseISO(COLLEGE_START); // 2026-08-01
  const collegeEnd   = parseISO(COLLEGE_END);   // 2030-05-31

  if (isBefore(now, collegeStart)) {
    return { current: 0, total: 8, percent: 0 };
  }

  if (isAfter(now, collegeEnd)) {
    return { current: 8, total: 8, percent: 100 };
  }

  // Check if we fall inside a known semester window
  for (const range of SEM_DATE_RANGES) {
    const start = parseISO(range.from);
    const end   = parseISO(range.to);
    if (isWithinInterval(now, { start, end })) {
      return {
        current: range.sem,
        total:   8,
        percent: (range.sem / 8) * 100,
      };
    }
  }

  // We're in a break between semesters — return the most recently completed one
  for (let i = SEM_DATE_RANGES.length - 1; i >= 0; i--) {
    if (isAfter(now, parseISO(SEM_DATE_RANGES[i].to))) {
      const sem = SEM_DATE_RANGES[i].sem;
      return { current: sem, total: 8, percent: (sem / 8) * 100 };
    }
  }

  return { current: 0, total: 8, percent: 0 };
}

/**
 * Total B.Tech journey progress measured in calendar days.
 *
 * Before Aug 2026: elapsed = 0
 * After May 2030:  elapsed = total
 */
export function getMissionDays(): {
  elapsed:   number;
  remaining: number;
  total:     number;
  percent:   number;
} {
  const start = parseISO(COLLEGE_START);
  const end   = parseISO(COLLEGE_END);
  const now   = new Date();

  const total      = differenceInDays(end, start);          // ~1399 days
  const rawElapsed = differenceInDays(now, start);
  const elapsed    = Math.max(0, Math.min(total, rawElapsed));
  const remaining  = total - elapsed;

  return {
    elapsed,
    remaining,
    total,
    percent: total > 0 ? (elapsed / total) * 100 : 0,
  };
}

/**
 * Estimate the month in which a savings goal will be reached.
 *
 * Returns null if:
 *   - monthly contribution is 0 or negative
 *   - goal is already met (saved >= goal)
 *
 * getETA(250000, 50000, 5000) → "Mar 2027" (40 months from now)
 */
export function getETA(
  goal:    number,
  saved:   number,
  monthly: number,
): string | null {
  if (monthly <= 0 || saved >= goal) return null;
  const remaining = goal - saved;
  const months    = Math.ceil(remaining / monthly);
  const eta       = addMonths(new Date(), months);
  return format(eta, 'MMM yyyy');
}

// ─── Percentage Helpers ───────────────────────────────────────────────────────

/**
 * Clamp a percentage between 0 and 100 (inclusive).
 * Safe to pass to CSS width or progress bar props.
 */
export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * Round to a given number of decimal places.
 * roundTo(12.3456, 1) → 12.3
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}