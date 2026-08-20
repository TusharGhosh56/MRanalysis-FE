import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, FolderGit2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'

export function LandingReportsCta() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-center"
      >
        {/* Ambient Backlight Spotlights */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,160,0.12),transparent_70%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            Instant Public Repository Audits
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Start uncovering the risks in your codebase{' '}
            <span className="font-serif italic font-normal text-amber-300">
              today.
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            No software installation or complex webhook setup required. Paste a GitHub URL and get an instant forensic breakdown.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              onClick={scrollToHero}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-bold shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
            >
              Analyze a Repository Now
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>

            <Link to="/reports" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-semibold"
              >
                <FolderGit2 className="h-4 w-4 mr-1.5" />
                View Analysis Reports
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
