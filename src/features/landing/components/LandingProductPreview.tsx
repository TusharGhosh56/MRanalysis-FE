import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

const CHART_BARS = [28, 42, 35, 58, 48, 72, 65, 88, 76, 95, 82, 70]

const CONTRIBUTORS = [
  { initials: 'AC', name: 'alex.chen', commits: 842 },
  { initials: 'JM', name: 'jordan.miller', commits: 516 },
  { initials: 'SR', name: 'sam.rivera', commits: 389 },
]

export function LandingProductPreview() {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div

  return (
    <Container
      className="landing-surface relative overflow-hidden rounded-2xl p-5 lg:p-6"
      {...(shouldReduceMotion
        ? {}
        : { variants: fadeUp, initial: 'hidden', animate: 'visible' })}
    >
      <div
        className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-github-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="relative space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Commits', value: '2,847' },
            { label: 'Contributors', value: '24' },
            { label: 'Bus factor', value: '3' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-github-border/40 bg-surface/50 px-3 py-2"
            >
              <p className="text-[10px] uppercase tracking-wide text-github-muted">
                {stat.label}
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-github-border/40 bg-surface/40 p-3">
          <p className="mb-3 text-xs text-github-muted">Commits per week</p>
          <div className="flex h-24 items-end gap-1">
            {CHART_BARS.map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t bg-gradient-to-t from-github-accent to-accent-teal opacity-80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-github-border/40 bg-surface/40 p-3">
          <p className="mb-2 text-xs text-github-muted">Top contributors</p>
          <ul className="space-y-2">
            {CONTRIBUTORS.map((contributor) => (
              <li
                key={contributor.name}
                className="flex items-center gap-2 text-xs"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-github-accent/20 text-[10px] font-semibold text-accent-teal">
                  {contributor.initials}
                </span>
                <span className="min-w-0 flex-1 truncate text-gray-300">
                  {contributor.name}
                </span>
                <span className="font-mono text-github-muted">
                  {contributor.commits}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
