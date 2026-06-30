import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

// ── Fonts ─────────────────────────────────────────────────────
// next/font self-hosts both fonts on Vercel, zero external
// requests, no layout shift, and injects CSS variables below.
const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
  weight:   ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-jetbrains-mono',
  display:  'swap',
  weight:   ['400', '500', '600', '700'],
})

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title:       'PAYLOAD FINANCE',
  description: 'Mission Control — Amritesh Kumar | Bennett University 2026–2030',
  keywords:    ['finance', 'budget', 'B.Tech', 'Bennett University', 'mission control'],
}

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#07070F] text-[#E8EAF0] font-sans antialiased">

        {/*
         * BACKGROUND LAYERS (z-index 0 — beneath all content)
         * Layer 2: Aurora blobs — organic colour atmosphere
         * Layer 3: Grid overlay — 40px precision grid
         * Layer 4: Scanlines — CRT texture
         */}
        <div className="aurora-blob-1" aria-hidden="true" />
        <div className="aurora-blob-2" aria-hidden="true" />
        <div className="aurora-blob-3" aria-hidden="true" />
        <div className="grid-overlay"  aria-hidden="true" />
        <div className="scanlines"     aria-hidden="true" />

        {/*
         * APP SHELL (z-index 10 — all content sits here)
         * Sidebar | TopBar + Main
         */}
        <div className="relative z-10 flex h-screen overflow-hidden">
          <Sidebar />

          <div className="flex flex-1 flex-col overflow-hidden">
            <TopBar />

            <main
              id="main-content"
              className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
            >
              {children}
            </main>
          </div>
        </div>

      </body>
    </html>
  )
}
