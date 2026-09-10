import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

export function LandingReportsCta() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUp}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Explore existing repository audits
        </h2>

        <p className="mx-auto max-w-lg text-sm text-slate-400">
          Inspect commit cadences, bus factor scores, and file ownership breakdown across analyzed repositories.
        </p>

        <div className="pt-2">
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/[0.08] hover:border-emerald-500/30"
          >
            <span>Browse All Reports</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
