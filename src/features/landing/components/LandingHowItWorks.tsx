import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { LANDING_STEPS } from '@/features/landing/landing-content'
import { fadeUp } from '@/lib/motion'

export function LandingHowItWorks() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        
        {/* Left Editorial Narrative matching DayNight */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-slate-400">
            <span className="text-amber-400">(03)</span>
            <span className="text-slate-300 uppercase">PROCESSING PIPELINE</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            Evidence first.{' '}
            <span className="font-serif italic font-normal text-amber-300">
              Then
            </span>{' '}
            actionable intelligence.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-slate-400">
            We don't rely on shallow GitHub API counters. Our engine clones the bare Git tree in isolated sandboxes, traverses every commit hash, and builds a comprehensive architectural blueprint in under 30 seconds.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-mono text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              100% Automated Workflow
            </span>
          </div>
        </motion.div>

        {/* Right Stepped Pipeline Rows */}
        <div className="lg:col-span-7 space-y-6">
          {LANDING_STEPS.map((stepItem) => (
            <motion.div
              key={stepItem.step}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(245,158,11,0.15)]"
            >
              {/* Top highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-amber-400/40"
                aria-hidden
              />

              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <span className="font-mono text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {stepItem.step}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-100 transition-colors">
                    {stepItem.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {stepItem.description}
                  </p>

                  <p className="mt-3 font-mono text-xs text-slate-500">
                    → {stepItem.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
