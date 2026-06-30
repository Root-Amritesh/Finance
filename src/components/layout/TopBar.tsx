'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { format } from 'date-fns'
import {
  getMissionDays,
  getBudgetRemaining,
  getBudgetColour,
  formatINRShort,
  type MissionDays,
} from '@/lib/utils'

// ── Page title lookup ─────────────────────────────────────────
const PAGE_TITLES: Record<string, string> = {
  '/':          'Dashboard',
  '/fees':      'College Fees',
  '/certs':     'Certifications',
  '/monthly':   'Monthly Budget',
  '/goals':     'Savings Goals',
  '/analytics': 'Analytics',
}

// ── Accent hex map for the budget pill ───────────────────────
const BUDGET_COLOUR_HEX: Record<ReturnType<typeof getBudgetColour>, string> = {
  neon:  '#39FF14',
  amber: '#FFB800',
  red:   '#FF3B5C',
}

// ── Component ─────────────────────────────────────────────────
export function TopBar() {
  const pathname = usePathname()

  const [mission,     setMission]     = useState<MissionDays>({ elapsed: 0, total: 1399, percent: 0, started: false })
  const [dateString,  setDateString]  = useState<string>('')
  const [hasMounted,  setHasMounted]  = useState(false)

  useEffect(() => {
    setMission(getMissionDays())
    setDateString(format(new Date(), 'dd MMM yyyy').toUpperCase())
    setHasMounted(true)
  }, [])

  const remaining   = getBudgetRemaining()
  const colourKey   = getBudgetColour(remaining)
  const colourHex   = BUDGET_COLOUR_HEX[colourKey]
  const pageTitle   = PAGE_TITLES[pathname] ?? 'PAYLOAD FINANCE'

  return (
    <header
      className="flex h-14 flex-shrink-0 items-center gap-4 border-b border-white/5 px-4 backdrop-blur-xl md:px-6"
      style={{ background: 'rgba(7,7,15,0.60)' }}
    >

      {/* ── Left: Page Title ────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <span className="truncate font-mono text-sm font-semibold uppercase tracking-wide text-[#E8EAF0]">
          {pageTitle}
        </span>
      </div>

      {/* ── Center: Mission Timer ────────────────────────────── */}
      {hasMounted && (
        <div
          className="hidden items-center gap-1 font-mono text-[10px] tracking-wider md:flex"
          aria-label={`Mission day ${mission.elapsed} of ${mission.total}, ${mission.percent}% complete`}
        >
          <span className="text-[#2D3748]">DAY</span>
          <span className="text-[#4A5568]">{mission.elapsed}</span>
          <span className="text-[#2D3748]">/</span>
          <span className="text-[#4A5568]">{mission.total}</span>
          <span className="mx-1 text-[#2D3748]">|</span>
          <span className="text-[#4A5568]">{mission.percent}% COMPLETE</span>
        </div>
      )}

      {/* ── Right: Date + Budget Pill ────────────────────────── */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* Date */}
        {hasMounted && dateString && (
          <span className="hidden font-mono text-[10px] tracking-widest text-[#2D3748] sm:block">
            {dateString}
          </span>
        )}

        {/* Budget remaining pill */}
        <div
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1"
          style={{ background: 'rgba(255,255,255,0.02)' }}
          aria-label={`Budget remaining: ${formatINRShort(remaining)}`}
        >
          {/* Coloured dot */}
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{
              backgroundColor: colourHex,
              boxShadow:       `0 0 6px ${colourHex}`,
            }}
            aria-hidden="true"
          />
          {/* Amount */}
          <span
            className="font-mono text-[11px] font-medium"
            style={{ color: colourHex }}
          >
            {formatINRShort(remaining)} LEFT
          </span>
        </div>

      </div>
    </header>
  )
}

export default TopBar
