import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  FileCode2,
  LineChart,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const WEEKLY_DATA = [
  { week: 'W1', count: 42 },
  { week: 'W2', count: 68 },
  { week: 'W3', count: 54 },
  { week: 'W4', count: 91 },
  { week: 'W5', count: 76 },
  { week: 'W6', count: 112 },
  { week: 'W7', count: 88 },
  { week: 'W8', count: 134 },
  { week: 'W9', count: 120 },
  { week: 'W10', count: 145 },
  { week: 'W11', count: 128 },
  { week: 'W12', count: 104 },
]

const OWNERSHIP_FILES = [
  { path: 'packages/engine/src/scheduler.ts', author: 'alex.chen', share: 78, commits: 342 },
  { path: 'packages/state/src/reconciler.ts', author: 'marcus.v', share: 64, commits: 219 },
  { path: 'packages/storage/src/wal.ts', author: 'sarah.k', share: 89, commits: 184 },
  { path: 'packages/network/src/transport.ts', author: 'elena.r', share: 52, commits: 142 },
]

export function LandingInteractivePreview() {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState<'velocity' | 'risk' | 'ownership'>('velocity')
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null)

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      className="relative mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e14]/90 shadow-2xl backdrop-blur-xl"
    >
      {/* Window Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-6">
        
        {/* Repo identifier */}
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-xs text-slate-300">
            distributed-runtime / core
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-black/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('velocity')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition ${
              activeTab === 'velocity'
                ? 'bg-white/10 text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LineChart className="h-3.5 w-3.5" />
            <span>Velocity</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('risk')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition ${
              activeTab === 'risk'
                ? 'bg-white/10 text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Bus Factor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ownership')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition ${
              activeTab === 'ownership'
                ? 'bg-white/10 text-white font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Ownership</span>
          </button>
        </div>

      </div>

      {/* Main Interactive Screen */}
      <div className="p-4 sm:p-6">

        {/* Tab 1: Weekly Commit Cadence */}
        {activeTab === 'velocity' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-white">Weekly Commit Cadence</h3>
                <p className="text-xs text-slate-400">12-week commit activity</p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-slate-400">Peak: <strong className="text-emerald-400">145 commits</strong></span>
              </div>
            </div>

            {/* Sparkline Visualizer */}
            <div className="relative rounded-xl border border-white/[0.06] bg-black/20 p-4 pt-6">
              <div className="flex h-36 items-end gap-2 sm:gap-3">
                {WEEKLY_DATA.map((item, idx) => {
                  const pct = Math.round((item.count / 150) * 100)
                  const isHovered = hoveredWeek === idx
                  return (
                    <div
                      key={item.week}
                      onMouseEnter={() => setHoveredWeek(idx)}
                      onMouseLeave={() => setHoveredWeek(null)}
                      className="group relative flex flex-1 flex-col items-center h-full justify-end cursor-pointer"
                    >
                      {isHovered && (
                        <div className="absolute -top-7 rounded border border-white/20 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-emerald-300 shadow-lg whitespace-nowrap z-10">
                          {item.count} commits
                        </div>
                      )}
                      <div
                        className={`w-full rounded-t transition-all duration-150 ${
                          isHovered
                            ? 'bg-emerald-400'
                            : 'bg-emerald-500/50 group-hover:bg-emerald-400/80'
                        }`}
                        style={{ height: `${pct}%` }}
                      />
                      <span className="mt-2 font-mono text-[10px] text-slate-500">
                        {item.week}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Telemetry vitals bar */}
            <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4 font-mono text-xs">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="text-[10px] uppercase text-slate-500">Total Commits</span>
                <p className="mt-1 text-base font-bold text-white">184,290</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="text-[10px] uppercase text-slate-500">Contributors</span>
                <p className="mt-1 text-base font-bold text-white">1,642</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="text-[10px] uppercase text-slate-500">Avg Commits / Day</span>
                <p className="mt-1 text-base font-bold text-white">14.8</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                <span className="text-[10px] uppercase text-emerald-400">Bus Factor</span>
                <p className="mt-1 text-base font-bold text-emerald-300">6 (Healthy)</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bus Factor Risk Breakdown */}
        {activeTab === 'risk' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Bus Factor Score: 6 (Healthy Distribution)</h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    At least 6 core engineers maintain active commit knowledge across core packages. 
                    Top contributor accounts for 18.4% of lifetime commits.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3.5 space-y-2 font-mono text-xs">
                <span className="text-slate-400 font-semibold">Knowledge Concentration</span>
                <div className="space-y-2 pt-1">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>consensus / raft-state</span>
                      <span className="text-emerald-400">4 Maintainers (Low Risk)</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>storage / wal-engine</span>
                      <span className="text-emerald-400">3 Maintainers (Low Risk)</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>network / p2p-transport</span>
                      <span className="text-amber-400">1 Maintainer (Critical Risk)</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-amber-400" style={{ width: '35%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3.5 space-y-2 font-mono text-xs">
                <span className="text-slate-400 font-semibold">Inactive Key Maintainers</span>
                <p className="text-[11px] text-slate-400">
                  Authors with &gt;50 commits who haven't committed in &gt;180 days:
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between rounded bg-white/[0.02] px-2 py-1 text-[11px]">
                    <span className="text-slate-300">dev.marcus</span>
                    <span className="text-slate-500">240d inactive · 812 commits</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-white/[0.02] px-2 py-1 text-[11px]">
                    <span className="text-slate-300">core.lead</span>
                    <span className="text-slate-500">410d inactive · 490 commits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Code Ownership */}
        {activeTab === 'ownership' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 pb-1">
              <span>File Path</span>
              <span>Primary Author Ownership</span>
            </div>

            <div className="space-y-2">
              {OWNERSHIP_FILES.map((file) => (
                <div
                  key={file.path}
                  className="rounded-xl border border-white/[0.06] bg-black/20 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-slate-200">
                      <FileCode2 className="h-3.5 w-3.5 text-slate-500" />
                      <span className="font-semibold">{file.path}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{file.author}</span>
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-bold text-emerald-400 border border-emerald-500/20">
                        {file.share}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${file.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </motion.div>
  )
}
