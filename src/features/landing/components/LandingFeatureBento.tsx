import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldAlert, LineChart, FileCode2 } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

// Deterministic punchcard data for Card 2: 7 days x 12 2-hour blocks
const PUNCHCARD_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const PUNCHCARD_HOURS = ['00', '04', '08', '12', '16', '20']
// Intensity 0..4 for each (day * 12 + hour)
const PUNCHCARD_DATA = [
  // Mon
  [0, 0, 1, 3, 3, 2],
  // Tue (Peak sprint crunch)
  [0, 0, 2, 4, 4, 3],
  // Wed
  [0, 0, 2, 3, 4, 2],
  // Thu
  [0, 0, 1, 3, 3, 2],
  // Fri
  [0, 0, 1, 2, 2, 1],
  // Sat (Quiet)
  [0, 0, 0, 1, 0, 0],
  // Sun (Low)
  [0, 0, 0, 1, 1, 0],
]

export function LandingFeatureBento() {
  const shouldReduceMotion = useReducedMotion()
  const [hoveredFile, setHoveredFile] = useState<string | null>(null)

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Essential repository health metrics.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Surface structural risks and development patterns that standard git graphs miss.
        </p>
      </div>

      {/* 3 Rich Visual Bento Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Card 1: Bus Factor & Knowledge Silos */}
        <motion.article
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0e14]/80 p-6 backdrop-blur-xl transition duration-200 hover:border-white/20 hover:bg-[#0e121a]"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <span className="font-mono text-[11px] font-semibold text-amber-400">
                SCORE: 1 (CRITICAL)
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
              Bus factor & knowledge silos
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Spot critical modules maintained by only one or two contributors before departures or reassignments create bottlenecks.
            </p>

            {/* Visual Micro-Chart: Knowledge Concentration Breakdown */}
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/30 p-3.5 space-y-2.5 font-mono text-[11px]">
              <div>
                <div className="flex justify-between text-slate-300">
                  <span>consensus / core</span>
                  <span className="text-amber-400 font-semibold">84% · 1 Author</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: '84%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300">
                  <span>storage / wal</span>
                  <span className="text-slate-400">62% · 2 Authors</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: '62%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300">
                  <span>network / p2p</span>
                  <span className="text-emerald-400">38% · 4 Authors</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: '38%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Redundancy Risk:</span>
            <span className="text-amber-400 font-medium">Single Point of Failure</span>
          </div>
        </motion.article>


        {/* Card 2: 24h × 7d Commit Punchcard Heatmap */}
        <motion.article
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0e14]/80 p-6 backdrop-blur-xl transition duration-200 hover:border-white/20 hover:bg-[#0e121a]"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <LineChart className="h-4 w-4" />
              </div>
              <span className="font-mono text-[11px] font-semibold text-emerald-400">
                TEMPORAL MATRIX
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
              Commit velocity & rhythm
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Map hourly cadence and weekday distributions to understand true engineering tempo across quarterly releases.
            </p>

            {/* Visual Micro-Chart: 24h x 7d Punchcard Matrix */}
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/30 p-3.5 font-mono text-[10px]">
              <div className="flex justify-between text-slate-500 pb-2 text-[9px]">
                <span>DAY</span>
                <div className="flex gap-3 pr-1">
                  {PUNCHCARD_HOURS.map((hr) => (
                    <span key={hr}>{hr}h</span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                {PUNCHCARD_DAYS.map((day, dIdx) => (
                  <div key={`${day}-${dIdx}`} className="flex items-center justify-between">
                    <span className="text-slate-400 w-3 font-semibold">{day}</span>
                    <div className="flex gap-3">
                      {PUNCHCARD_DATA[dIdx].map((level, hIdx) => {
                        let bg = 'bg-white/[0.04]'
                        if (level === 1) bg = 'bg-emerald-950/70'
                        if (level === 2) bg = 'bg-emerald-700/70'
                        if (level === 3) bg = 'bg-emerald-500'
                        if (level === 4) bg = 'bg-emerald-400 shadow-[0_0_6px_rgba(0,245,160,0.4)]'
                        return (
                          <div
                            key={`cell-${dIdx}-${hIdx}`}
                            className={`h-2.5 w-2.5 rounded-[2px] transition ${bg}`}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Peak Window:</span>
            <span className="text-emerald-400 font-medium">Tue 16:00 – 20:00 UTC</span>
          </div>
        </motion.article>


        {/* Card 3: Code Churn & Hotspot Treemap */}
        <motion.article
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0b0e14]/80 p-6 backdrop-blur-xl transition duration-200 hover:border-white/20 hover:bg-[#0e121a]"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <FileCode2 className="h-4 w-4" />
              </div>
              <span className="font-mono text-[11px] font-semibold text-cyan-400">
                HOTSPOT MAP
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
              Code churn & hotspot detection
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Pinpoint fragile files modified in dozens of pull requests, highlighting where future regressions are most likely.
            </p>

            {/* Visual Micro-Chart: Proportional Churn Treemap Blocks */}
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/30 p-3.5 font-mono text-[11px]">
              <div className="grid grid-cols-3 gap-1.5 h-28">
                {/* Block 1 (Large, High Churn) */}
                <div
                  onMouseEnter={() => setHoveredFile('election.go: 412 changes')}
                  onMouseLeave={() => setHoveredFile(null)}
                  className="col-span-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2 flex flex-col justify-between cursor-pointer transition hover:bg-cyan-500/20"
                >
                  <span className="text-cyan-300 font-bold truncate">election.go</span>
                  <div className="flex justify-between text-[9px] text-cyan-400/80">
                    <span>412 rewrites</span>
                    <span>Churn: 94%</span>
                  </div>
                </div>

                {/* Right Column with smaller files */}
                <div className="col-span-1 flex flex-col gap-1.5">
                  <div
                    onMouseEnter={() => setHoveredFile('state_machine.go: 280 changes')}
                    onMouseLeave={() => setHoveredFile(null)}
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] p-1.5 flex flex-col justify-between cursor-pointer transition hover:bg-white/[0.08]"
                  >
                    <span className="text-slate-200 text-[10px] font-medium truncate">state.go</span>
                    <span className="text-[9px] text-slate-500">280 chg</span>
                  </div>
                  <div
                    onMouseEnter={() => setHoveredFile('peer_pool.go: 195 changes')}
                    onMouseLeave={() => setHoveredFile(null)}
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] p-1.5 flex flex-col justify-between cursor-pointer transition hover:bg-white/[0.08]"
                  >
                    <span className="text-slate-200 text-[10px] font-medium truncate">peer_pool.go</span>
                    <span className="text-[9px] text-slate-500">195 chg</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[10px] text-slate-400 truncate h-4">
                {hoveredFile ? hoveredFile : 'Hover block to inspect churn intensity'}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-3 text-[11px] font-mono text-slate-500 flex justify-between">
            <span>Primary Fragility:</span>
            <span className="text-cyan-400 font-medium">94% Rewrite Frequency</span>
          </div>
        </motion.article>

      </div>
    </section>
  )
}
