import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { differenceInDays } from 'date-fns'
import { MISSION_START, MISSION_END, TOTAL_BUDGET, SEM1 } from './constants'

// ═══════════════════════════════════════════════════════════════
// TAILWIND CLASS MERGE UTILITY
// ═══════════════════════════════════════════════════════════════
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ═══════════════════════════════════════════════════════════════
// INDIAN NUMBER FORMATTING
// ═══════════════════════════════════════════════════════════════

/**
 * Formats a whole-rupee integer using Indian number system.
 * e.g. 3980000 → ₹39,80,000
 * e.g. 407500  → ₹4,07,500
 * e.g. -38000  → -₹38,000
 */
export function formatINR(amount: number): string {
  const isNegative = amount < 0
  const absAmount  = Math.abs(Math.round(amount))
  const str        = absAmount.toString()

  let formatted: string
  if (str.length <= 3) {
    formatted = str
  } else {
    const lastThree = str.slice(-3)
    let remaining   = str.slice(0, -3)
    const groups: string[] = []

    while (remaining.length > 0) {
      groups.unshift(remaining.slice(-2))
      remaining = remaining.slice(0, -2)
    }

    formatted = groups.filter(Boolean).join(',') + ',' + lastThree
  }

  return (isNegative ? '-₹' : '₹') + formatted
}

/**
 * Short format for compact display (TopBar, pills).
 * e.g. 3572500  → ₹35.73L
 * e.g. 25000    → ₹25.0K
 * e.g. 500      → ₹500
 */
export function formatINRShort(amount: number): string {
  const abs = Math.abs(Math.round(amount))
  const sign = amount < 0 ? '-' : ''

  if (abs >= 1_00_00_000) {
    return `${sign}₹${(abs / 1_00_00_000).toFixed(2)}Cr`
  }
  if (abs >= 1_00_000) {
    return `${sign}₹${(abs / 1_00_000).toFixed(2)}L`
  }
  if (abs >= 1_000) {
    return `${sign}₹${(abs / 1_000).toFixed(1)}K`
  }
  return `${sign}₹${abs}`
}

/**
 * Formats a percentage with one decimal place.
 * e.g. 78.23 → "78.2%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// ═══════════════════════════════════════════════════════════════
// MISSION TIMER
// ═══════════════════════════════════════════════════════════════

export interface MissionDays {
  elapsed:  number   // days since mission start (0 if not yet started)
  total:    number   // total mission length in days
  percent:  number   // 0-100, rounded to nearest integer
  started:  boolean  // true if today >= MISSION_START
}

/**
 * Calculates elapsed/total days and completion percentage for the B.Tech mission.
 * Mission: 2026-08-01 → 2030-05-31
 */
export function getMissionDays(): MissionDays {
  const now   = new Date()
  const total = differenceInDays(MISSION_END, MISSION_START)

  const rawElapsed = differenceInDays(now, MISSION_START)
  const started    = rawElapsed >= 0
  const elapsed    = Math.max(0, Math.min(rawElapsed, total))
  const percent    = Math.round((elapsed / total) * 100)

  return { elapsed, total, percent, started }
}

// ═══════════════════════════════════════════════════════════════
// BUDGET UTILITIES
// ═══════════════════════════════════════════════════════════════

/**
 * Returns the remaining ₹39.80L budget after confirmed payments.
 * Reads from Zustand store in pages; falls back to constants baseline here
 * so TopBar and server-side renders have a safe initial value.
 */
export function getBudgetRemaining(): number {
  return TOTAL_BUDGET - SEM1.totalPaid
}

/**
 * Returns what percentage of the total budget has been spent.
 */
export function getBudgetSpentPercent(spent: number): number {
  return Math.min(100, Math.round((spent / TOTAL_BUDGET) * 100 * 10) / 10)
}

/**
 * Returns a colour key based on remaining budget thresholds.
 * Used for dynamic colouring in TopBar pill and dashboards.
 */
export function getBudgetColour(remaining: number): 'neon' | 'amber' | 'red' {
  if (remaining < 10_00_000)  return 'red'
  if (remaining < 25_00_000)  return 'amber'
  return 'neon'
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

/**
 * Clamps a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Returns a string like "AY2026-27" from a year index (1 = first year).
 */
export function academicYear(yearIndex: number): string {
  const start = 2025 + yearIndex
  return `AY${start}-${String(start + 1).slice(-2)}`
}
