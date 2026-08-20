import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const CHART_BARS = [35, 48, 42, 68, 55, 84, 72, 96, 88, 100, 92, 78]

const CONTRIBUTORS = [
  { initials: 'AC', name: 'alex.chen', commits: 942, pct: '38%', color: 'from-amber-400 to-orange-500' },
  { initials: 'JM', name: 'jordan.miller', commits: 618, pct: '25%', color: 'from-emerald-400 to-teal-500' },
  { initials: 'SR', name: 'sam.rivera', commits: 421, pct: '17%', color: 'from-cyan-400 to-blue-500' },
]

export function LandingProductPreview() {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div
  const [activeTab, setActiveTab] = useState<'velocity' | 'risk' | 'telemetry'>('velocity')
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <Container
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950/80 p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl transition-all duration-300 hover:border-amber-400/30"
      {...(shouldReduceMotion
        ? {}
        : { variants: fadeUp, initial: 'hidden', animate: 'visible' })}
    >
      {/* Celestial Orb Background Ambient Light (DayNight reference) */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/15 to-purple-600/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-500/15 to-cyan-500/10 blur-3xl"
        aria-hidden
      />

      {/* Header bar with Live Status Pill & Tab Switches */}
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-amber-400" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-200 uppercase">
            facebook/react
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center rounded-full bg-white/[0.04] p-1 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('velocity')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
              activeTab === 'velocity'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Velocity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('risk')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
              activeTab === 'risk'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bus Factor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
              activeTab === 'telemetry'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Telemetry
          </button>
        </div>
      </div>

      {/* Live Metric Stats Grid */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            TOTAL COMMITS
          </p>
          <p className="mt-0.5 font-mono text-base font-bold text-white">
            184,290
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            AUTHORS
          </p>
          <p className="mt-0.5 font-mono text-base font-bold text-slate-200">
            1,642
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
            BUS FACTOR
          </p>
          <p className="mt-0.5 font-mono text-base font-bold text-emerald-300 flex items-center gap-1">
            <span>6</span>
            <span className="text-[10px] text-emerald-400/70 font-normal">/ Healthy</span>
          </p>
        </div>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'velocity' && (
        <div className="mt-4 space-y-4">
          {/* Commit Sparkline Bar Chart */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300">
                Weekly Commit Cadence
              </span>
              <span className="font-mono text-[11px] text-amber-300 font-semibold">
                +24.6% vs prev month
              </span>
            </div>

            <div className="flex h-24 items-end gap-1.5 pt-2">
              {CHART_BARS.map((height, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="group relative flex-1 cursor-pointer"
                >
                  {hoveredBar === idx && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] text-amber-300 shadow border border-white/20 z-20 whitespace-nowrap">
                      {Math.round(height * 2.4)} commits
                    </div>
                  )}
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      hoveredBar === idx
                        ? 'bg-gradient-to-t from-amber-500 to-yellow-300 brightness-125'
                        : 'bg-gradient-to-t from-amber-500/70 via-orange-400/60 to-amber-300/80 group-hover:brightness-110'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors list */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                Top Code Authors
              </span>
              <span className="text-[10px] font-mono text-slate-500">SHARE</span>
            </div>

            <ul className="space-y-2">
              {CONTRIBUTORS.map((c) => (
                <li key={c.name} className="flex items-center gap-2.5 text-xs">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${c.color} text-[10px] font-bold text-slate-950 shadow-sm`}>
                    {c.initials}
                  </div>
                  <span className="flex-1 font-mono text-slate-300 truncate">
                    {c.name}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    {c.commits} commits
                  </span>
                  <span className="font-mono text-xs font-semibold text-amber-300 w-9 text-right">
                    {c.pct}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3.5">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-300">
                  Low Risk Concentration Detected
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  Key packages <code className="font-mono text-amber-200/90">packages/react-reconciler</code> have balanced maintainer distribution across 4 core committers.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Reconciler Core</span>
              <span className="font-mono text-emerald-400 font-semibold">4 Authors</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400" style={{ width: '82%' }} />
            </div>

            <div className="flex justify-between text-xs pt-1">
              <span className="text-slate-300 font-medium">Server Components</span>
              <span className="font-mono text-amber-300 font-semibold">3 Authors</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: '64%' }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'telemetry' && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/70 p-3.5 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/10 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Celery Worker Execution Log</span>
          </div>
          <div className="mt-2 space-y-1.5 text-slate-300">
            <p className="text-emerald-400">✓ git clone --bare (shallow=false)</p>
            <p className="text-slate-400">→ parsed 184,290 commit revisions</p>
            <p className="text-slate-400">→ aggregated 1,642 author aliases</p>
            <p className="text-slate-400">→ computed AST churn for 4,812 files</p>
            <p className="text-amber-300">✓ report generated in 24.8s</p>
          </div>
        </div>
      )}

      {/* Bottom Footer Callout */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/5 px-3 py-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          Interactive Telemetry Sandbox
        </span>
        <span className="font-mono text-emerald-400 font-semibold">
          LIVE DEMO
        </span>
      </div>

    </Container>
  )
}
