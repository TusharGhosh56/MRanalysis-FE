import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

const STATS = [
  {
    number: '500k',
    symbol: '+',
    label: 'COMMITS PARSED & ANALYZED',
    subtext: 'High-throughput bare Git mining',
  },
  {
    number: '3.8',
    symbol: 'x',
    label: 'FASTER CODEBASE ONBOARDING',
    subtext: 'Instant ownership & risk clarity',
  },
  {
    number: '99.9',
    symbol: '%',
    label: 'AST METRIC ACCURACY',
    subtext: 'Deterministic statistical engine',
  },
  {
    number: '4',
    symbol: '★',
    label: 'INTELLIGENCE PILLARS',
    subtext: 'Velocity, Risk, Churn, People',
  },
]

export function LandingStatsCounter() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative border-y border-white/10 bg-slate-950/40 py-16 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className={`flex flex-col justify-center px-6 py-6 ${
                index % 2 === 0 ? 'pr-4' : 'pl-4'
              } md:px-8`}
            >
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {stat.number}
                </span>
                <span className="font-serif text-2xl font-semibold italic text-amber-400 sm:text-3xl">
                  {stat.symbol}
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
