import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ShieldAlert, Flame, Users, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

// Deterministic mock pattern for the 24-week contribution grid
const GRID_ROWS = 7
const GRID_COLS = 22

// Generate deterministic activity matrix
const ACTIVITY_CELLS = Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
  const seed = (i * 17 + 23) % 100
  if (seed > 75) return 4 // high intensity
  if (seed > 50) return 3 // medium
  if (seed > 25) return 2 // low
  if (seed > 10) return 1 // minimal
  return 0 // none
})

export function LandingForensicComparison() {
  const shouldReduceMotion = useReducedMotion()
  const [view, setView] = useState<'surface' | 'forensic'>('surface')

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUp}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e14]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
      >
        {/* Header & Toggle Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              The Fundamental Difference
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Activity volume vs structural health.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Standard git contribution graphs reveal commit quantity. MRanalysis uncovers hidden architectural risks.
            </p>
          </div>

          {/* Perspective Switcher */}
          <div className="flex items-center gap-1 self-start sm:self-center rounded-xl border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => setView('surface')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                view === 'surface'
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard Activity
            </button>
            <button
              type="button"
              onClick={() => setView('forensic')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                view === 'forensic'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              <span>Forensic Reality</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Dynamic Display Board */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Matrix Visualization (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-white/[0.06] bg-black/30 p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 text-xs font-mono">
              <span className="text-slate-400">
                {view === 'surface' ? 'Commit Cadence (Quantity)' : 'Risk Distribution (Structural Reality)'}
              </span>
              <span className={view === 'surface' ? 'text-emerald-400' : 'text-amber-400'}>
                {view === 'surface' ? '● Active Cadence' : '⚠ 3 Vulnerability Vectors'}
              </span>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 sm:gap-2">
              {ACTIVITY_CELLS.map((level, idx) => {
                // Highlight critical churn or risk cells when in forensic view
                const isCriticalRisk = view === 'forensic' && (idx === 14 || idx === 38 || idx === 82)
                const isOrphaned = view === 'forensic' && (idx === 45 || idx === 92 || idx === 110)

                let cellBg = 'bg-white/[0.04]'
                if (level === 1) cellBg = 'bg-emerald-950/60'
                if (level === 2) cellBg = 'bg-emerald-800/70'
                if (level === 3) cellBg = 'bg-emerald-600'
                if (level === 4) cellBg = 'bg-emerald-400'

                if (isCriticalRisk) {
                  cellBg = 'bg-amber-500 ring-2 ring-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                } else if (isOrphaned) {
                  cellBg = 'bg-rose-500/80 ring-1 ring-rose-400'
                } else if (view === 'forensic' && level > 0) {
                  cellBg = 'bg-slate-800/80 opacity-40'
                }

                return (
                  <div
                    key={idx}
                    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[2px] transition-all duration-300 ${cellBg}`}
                  />
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-slate-500">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-[1px] bg-white/[0.04]" />
                <span className="h-2 w-2 rounded-[1px] bg-emerald-950/60" />
                <span className="h-2 w-2 rounded-[1px] bg-emerald-800/70" />
                <span className="h-2 w-2 rounded-[1px] bg-emerald-600" />
                <span className="h-2 w-2 rounded-[1px] bg-emerald-400" />
                {view === 'forensic' && (
                  <>
                    <span className="ml-2 h-2 w-2 rounded-[1px] bg-amber-500" />
                    <span className="text-amber-400">Risk Hotspot</span>
                  </>
                )}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Perspective Explanation Card (5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {view === 'surface' ? (
                <motion.div
                  key="surface-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4"
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                      Surface Metrics
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    Appears active and rapidly progressing.
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    1,840 commits logged across the repository over 12 months. Velocity seems steady, and pull requests are consistently closed.
                  </p>

                  <div className="border-t border-white/[0.06] pt-3 font-mono text-xs space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Commits / Month:</span>
                      <span>~153 commits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Activity Cadence:</span>
                      <span className="text-emerald-400">Consistent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vulnerabilities Detected:</span>
                      <span className="text-slate-500">0 (Blind to risk)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setView('forensic')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition pt-1"
                  >
                    <span>Inspect beneath the surface</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="forensic-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5 space-y-4"
                >
                  <div className="flex items-center gap-2 text-amber-400">
                    <ShieldAlert className="h-4 w-4" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                      Forensic Telemetry
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    Critical bottlenecks hidden beneath high volume.
                  </h3>

                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex items-start gap-2 text-slate-300">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">Bus Factor: 1</span>
                        <p className="text-[11px] text-slate-400">1 maintainer owns 82% of core engine logic.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-300">
                      <Flame className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">Hotspot Churn: 412 rewrites</span>
                        <p className="text-[11px] text-slate-400">Fragile consensus module accounts for 34% of regressions.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-300">
                      <Users className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">2 Inactive Maintainers</span>
                        <p className="text-[11px] text-slate-400">64% of subsystem knowledge is currently dormant.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.06] pt-3 font-mono text-xs flex justify-between">
                    <span className="text-slate-500">Structural Health:</span>
                    <span className="font-bold text-amber-400">Single Point of Failure</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
