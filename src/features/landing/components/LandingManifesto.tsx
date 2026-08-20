import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

export function LandingManifesto() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        className="max-w-4xl"
      >
        <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-slate-400">
          <span className="text-amber-400">(01)</span>
          <span className="text-slate-300 uppercase">POSITION & METHODOLOGY</span>
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          Code that scales. Metrics that protect. Not a vanity dashboard. A platform engineered to uncover the{' '}
          <span className="font-serif italic font-normal text-amber-300">
            hidden vulnerabilities
          </span>{' '}
          — then surface the risk metrics your engineering team still guesses by hand.
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Most developer tools show surface-level commit graphs. We mine full Git revision histories, calculate author ownership concentration, detect single-point-of-failure bus factors, and quantify high-churn code hotspots in seconds.
        </p>
      </motion.div>
    </section>
  )
}
