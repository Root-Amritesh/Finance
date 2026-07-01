import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInCalendarDays } from 'date-fns';
import {
  BUDGET_CEILING,
  GRADUATION_DATE,
  MISSION_START_DATE,
  TOTAL_COMMITTED,
} from './constants';

// ── TAILWIND MERGE ───────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── INDIAN NUMBER FORMATTING ──────────────────────────────────────────
/**
 * Full Indian-grouped rupee string.
 * e.g. 100000 → "₹1,00,000"
 */
export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  const sign    = rounded < 0 ? '-' : '';
  return `${sign}₹${Math.abs(rounded).toLocaleString('en-IN')}`;
}

/**
 * Short form for compact display.
 * e.g. 3116614 → "₹31.2L" | 9440 → "₹9.4K"
 */
export function formatINRShort(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const abs  = Math.abs(amount);
  if (abs >= 1_00_00_000) return `${sign}₹${(abs / 1_00_00_000).toFixed(2)}Cr`;
  if (abs >= 1_00_000)    return `${sign}₹${(abs / 1_00_000).toFixed(1)}L`;
  if (abs >= 1_000)       return `${sign}₹${(abs / 1_000).toFixed(1)}K`;
  return `${sign}₹${Math.round(abs)}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ── BACKWARD COMPAT — used by TopBar.tsx from Stage 2 ────────────────
// (Stage 3 dashboard uses src/lib/calculations.ts directly)

export interface MissionDays {
  elapsed:  number;   // days since mission start (0 if not yet started)
  total:    number;   // total mission length in days
  percent:  number;   // 0–100
  started:  boolean;
}

export function getMissionDays(): MissionDays {
  const now   = new Date();
  const start = new Date(MISSION_START_DATE);
  const end   = new Date(GRADUATION_DATE);
  const total = Math.max(1, differenceInCalendarDays(end, start));
  const raw   = differenceInCalendarDays(now, start);
  const started  = raw >= 0;
  const elapsed  = Math.max(0, Math.min(raw, total));
  const percent  = Math.round((elapsed / total) * 100);
  return { elapsed, total, percent, started };
}

/** How much of ₹39.80L ceiling hasn't been committed yet (headroom). */
export function getBudgetRemaining(): number {
  return BUDGET_CEILING - TOTAL_COMMITTED;
}

export function getBudgetColour(remaining: number): 'neon' | 'amber' | 'red' {
  if (remaining < 10_00_000)  return 'red';
  if (remaining < 25_00_000)  return 'amber';
  return 'neon';
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function academicYear(yearIndex: number): string {
  const start = 2025 + yearIndex;
  return `AY${start}-${String(start + 1).slice(-2)}`;
}