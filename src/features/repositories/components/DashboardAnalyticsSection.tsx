import { motion, useReducedMotion } from 'framer-motion'
import { CommitsPerWeekChart } from '@/features/repositories/components/CommitsPerWeekChart'
import { TopContributorsList } from '@/features/repositories/components/TopContributorsList'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { RepositoryMetrics } from '@/types/repository'

interface DashboardAnalyticsSectionProps {
  metrics: RepositoryMetrics
  repositoryLabel?: string
}

function SummaryCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="glass-card rounded-xl p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-github-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

export function DashboardAnalyticsSection({
  metrics,
  repositoryLabel,
}: DashboardAnalyticsSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div
  const Item = shouldReduceMotion ? 'div' : motion.div

  const containerProps = shouldReduceMotion
    ? { className: 'space-y-6' }
    : {
        className: 'space-y-6',
        variants: staggerContainer,
        initial: 'hidden' as const,
        animate: 'visible' as const,
      }

  const itemProps = shouldReduceMotion ? {} : { variants: fadeUp }
  const { summary } = metrics

  return (
    <section>
      <Item {...itemProps}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Analysis results</h2>
          {repositoryLabel && (
            <p className="mt-1 font-mono text-sm text-github-muted">
              {repositoryLabel}
            </p>
          )}
        </div>
      </Item>

      <Container {...containerProps}>
        <Item {...itemProps}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Total commits" value={summary.total_commits} />
            <SummaryCard
              label="Contributors"
              value={summary.total_contributors}
            />
            <SummaryCard
              label="Avg commits / day"
              value={summary.avg_commits_per_day.toFixed(2)}
            />
            <SummaryCard
              label="Bus factor"
              value={metrics.bus_factor.score}
            />
          </div>
        </Item>

        <Item {...itemProps}>
          <div className="grid gap-6 lg:grid-cols-2">
            <CommitsPerWeekChart data={metrics.commits_per_week} />
            <TopContributorsList contributors={metrics.top_contributors} />
          </div>
        </Item>
      </Container>
    </section>
  )
}
