'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  Wallet,
  Target,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Nav Item Definition ───────────────────────────────────────
interface NavItem {
  icon:  LucideIcon
  href:  string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, href: '/',          label: 'Dashboard'      },
  { icon: GraduationCap,   href: '/fees',      label: 'College Fees'   },
  { icon: Award,           href: '/certs',     label: 'Certifications' },
  { icon: Wallet,          href: '/monthly',   label: 'Monthly'        },
  { icon: Target,          href: '/goals',     label: 'Goals'          },
  { icon: BarChart3,       href: '/analytics', label: 'Analytics'      },
]

// ── Component ─────────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        // Dimensions
        'w-[72px] md:w-[220px]',
        'flex-shrink-0 h-screen',
        // Layout
        'flex flex-col',
        // Glass surface
        'border-r border-white/5',
        'bg-[rgba(7,7,15,0.85)]',
        'backdrop-blur-xl',
        // Transition
        'transition-all duration-300 ease-in-out',
      )}
    >

      {/* ── Logo / Monogram ─────────────────────────────────── */}
      <div className="flex h-14 flex-shrink-0 items-center gap-3 border-b border-white/5 px-[18px]">

        {/* PF monogram badge */}
        <div
          className={cn(
            'flex h-9 w-9 flex-shrink-0 items-center justify-center',
            'rounded-lg border border-[rgba(57,255,20,0.30)]',
            'bg-[rgba(57,255,20,0.05)]',
          )}
        >
          <span
            className="font-mono text-sm font-bold text-[#39FF14]"
            style={{
              textShadow: '0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.30)',
            }}
          >
            PF
          </span>
        </div>

        {/* Text — visible md+ */}
        <div className="hidden min-w-0 md:block">
          <p className="truncate font-mono text-xs font-bold tracking-wide text-[#E8EAF0]">
            PAYLOAD FINANCE
          </p>
          <p className="mt-0.5 font-mono text-[10px] tracking-widest text-[#2D3748] uppercase">
            MISSION CONTROL
          </p>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map(({ icon: Icon, href, label }) => {
            // Exact match for '/', prefix match for sub-routes
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    // Base layout
                    'flex items-center gap-3 rounded-r-lg',
                    'py-2.5 pl-3 pr-2 md:pr-3',
                    // Left indicator border (always rendered, transparent when inactive)
                    'border-l-2',
                    // Transition
                    'transition-all duration-300 ease-in-out',
                    // Active vs Inactive
                    isActive
                      ? [
                          'border-[#00F0FF]',
                          'bg-[rgba(0,240,255,0.06)]',
                          'text-[#00F0FF]',
                        ]
                      : [
                          'border-transparent',
                          'text-[#4A5568]',
                          'hover:bg-[rgba(255,255,255,0.03)]',
                          'hover:text-white',
                        ],
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    size={18}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="hidden truncate font-mono text-xs font-medium md:block">
                    {label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── Footer ──────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-t border-white/5 px-4 py-3">
        {/* md+: full label */}
        <p className="hidden text-center font-mono text-[10px] tracking-wider text-[#2D3748] md:block">
          BU 2026–2030
        </p>
        {/* mobile: just the abbreviation */}
        <p className="text-center font-mono text-[10px] text-[#2D3748] md:hidden">
          BU
        </p>
      </div>

    </aside>
  )
}

export default Sidebar
