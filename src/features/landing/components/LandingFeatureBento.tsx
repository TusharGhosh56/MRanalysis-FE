import { motion, useReducedMotion } from 'framer-motion'
import { LANDING_FEATURES } from '@/features/landing/landing-content'
import { fadeUp } from '@/lib/motion'

const SPAN_CLASS = {
  1: 'lg:col-span-4',
  2: 'lg:col-span-8',
} as const

const MINI_BARS = [35, 55, 42, 68, 50, 78, 62, 90, 75, 95, 82, 88]

export function LandingFeatureBento() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Section Header with DayNight (02) numbering */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-slate-400">
          <span className="text-amber-400">(02)</span>
          <span className="text-slate-300 uppercase">CAPABILITIES & ARCHITECTURE</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Surgical Git intelligence.{' '}
          <span className="font-serif italic font-normal text-amber-300">
            Every dimension covered.
          </span>
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-400">
          Every repository analysis generates a multi-dimensional forensic report used for engineering reviews, onboarding, architectural planning, and risk mitigation.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
        {LANDING_FEATURES.map((feature) => {
          const Icon = feature.icon
          const spanClass = SPAN_CLASS[feature.span || 1]

          return (
            <motion.article
              key={feature.title}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(245,158,11,0.15)] ${spanClass}`}
            >
              {/* Top rim highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-amber-400/40"
                aria-hidden
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-amber-400/80">
                    {feature.number}
                  </span>
                  {feature.tag && (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                      {feature.tag}
                    </span>
                  )}
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-amber-300 shadow-inner group-hover:border-amber-400/30 group-hover:bg-amber-400/10 group-hover:text-amber-200 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>

              {/* Special interactive visuals for Large Cards */}
              {feature.size === 'large' && feature.number === '01' && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-300 font-semibold">Weekly Commit Velocity Cadence</span>
                    <span className="font-mono text-amber-400 text-[11px]">+38% Peak Q3</span>
                  </div>
                  <div className="flex h-20 items-end gap-1.5 pt-2">
                    {MINI_BARS.map((height, barIdx) => (
                      <div
                        key={barIdx}
                        className="flex-1 rounded-t bg-gradient-to-t from-amber-500/60 to-yellow-300/90 transition-all duration-300 hover:brightness-125"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {feature.size === 'large' && feature.number === '06' && (
                <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Celery Workers</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>Real-time SSE</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Zero Storage</span>
                  </div>
                </div>
              )}

              {feature.highlight && (
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-amber-400/90">
                  <span>✦ {feature.highlight}</span>
                </div>
              )}
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
