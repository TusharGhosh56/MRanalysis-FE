import { motion, useReducedMotion } from 'framer-motion'
import { AnalysisReportBentoGrid } from '@/features/analysis-reports/components/AnalysisReportBentoGrid'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { RepositoryMetrics } from '@/types/repository'

interface AnalysisReportDashboardProps {
  metrics: RepositoryMetrics
  repositoryLabel?: string
}

export function AnalysisReportDashboard({
  metrics,
  repositoryLabel,
}: AnalysisReportDashboardProps) {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div
  const Item = shouldReduceMotion ? 'div' : motion.div

  const containerProps = shouldReduceMotion
    ? { className: 'space-y-4' }
    : {
        className: 'space-y-4',
        variants: staggerContainer,
        initial: 'hidden' as const,
        animate: 'visible' as const,
      }

  const itemProps = shouldReduceMotion ? {} : { variants: fadeUp }

  return (
    <section>
      <Item {...itemProps}>
        <div>
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
          <AnalysisReportBentoGrid metrics={metrics} />
        </Item>
      </Container>
    </section>
  )
}
