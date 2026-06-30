'use client'

import { StatCard }    from '@/components/ui/StatCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge }       from '@/components/ui/Badge'
import { GlowButton }  from '@/components/ui/GlowButton'
import { Card }        from '@/components/ui/Card'
import {
  IndianRupee,
  Shield,
  Target,
  TrendingUp,
} from 'lucide-react'

/**
 * Temporary scaffold page — replaced in Stage 3 with the real Dashboard.
 * Exercises every Stage 2 component so the design system can be
 * verified at a glance before the data layer is wired up.
 */
export default function HomePage() {
  return (
    <div className="space-y-8">

      {/* ── Header ──────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#2D3748] mb-1">
          Bennett University · B.Tech CSE (Cybersecurity)
        </p>
        <h1 className="font-mono text-2xl font-bold text-[#E8EAF0]">
          Mission{' '}
          <span className="neon-text">PAYLOAD</span>
        </h1>
        <p className="mt-1 font-mono text-xs text-[#4A5568]">
          Aug 2026 → May 2030 · ₹39,80,000 ceiling
        </p>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Budget"
          value="₹39.80L"
          subValue="4-year ceiling"
          icon={IndianRupee}
          glowColor="neon"
          delay={0.1}
        />
        <StatCard
          label="Sem 1 Paid"
          value="₹4.08L"
          subValue="3 receipts ✓"
          icon={TrendingUp}
          glowColor="cyan"
          trend="up"
          delay={0.2}
        />
        <StatCard
          label="Cyber Budget"
          value="₹4.86L"
          subValue="9 certs + platforms"
          icon={Shield}
          glowColor="purple"
          delay={0.3}
        />
        <StatCard
          label="Laptop Goal"
          value="₹2.50L"
          subValue="Saving separately"
          icon={Target}
          glowColor="amber"
          delay={0.4}
        />
      </div>

      {/* ── Progress Bars ───────────────────────────────────── */}
      <Card title="Budget Utilisation" subtitle="₹39,80,000 total ceiling" glowColor="cyan">
        <div className="space-y-4">
          <ProgressBar label="Sem 1 Paid"       value={10.2}  color="neon"   showLabel />
          <ProgressBar label="Committed Total"  value={78.3}  color="cyan"   showLabel />
          <ProgressBar label="Cyber Budget"     value={12.2}  color="purple" showLabel />
          <ProgressBar label="Laptop A Goal"    value={0}     color="amber"  showLabel />
        </div>
      </Card>

      {/* ── Badges + Button Demo ─────────────────────────────── */}
      <Card title="Certification Status — Sem 1" glowColor="purple">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="neon">AZ-900 · Queued</Badge>
          <Badge variant="cyan">CLF-C02 · Sem 1</Badge>
          <Badge variant="purple">Security+ · Sem 2</Badge>
          <Badge variant="amber">₹9,440</Badge>
          <Badge variant="dim">DECORATION</Badge>
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          <GlowButton variant="cyan"   size="sm">Mark Passed</GlowButton>
          <GlowButton variant="purple" size="sm">View Roadmap</GlowButton>
          <GlowButton variant="neon"   size="sm" disabled>Log Expense</GlowButton>
        </div>
      </Card>

      {/* ── Stage Notice ────────────────────────────────────── */}
      <Card glowColor="amber">
        <p className="font-mono text-[11px] text-[#FFB800]">
          ⚡ STAGE 2 COMPLETE — Design system verified. Dashboard data
          layer and all 6 pages build in Stage 3+.
        </p>
      </Card>

    </div>
  )
}
