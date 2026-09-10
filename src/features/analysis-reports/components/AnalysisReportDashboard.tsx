import { motion, useReducedMotion } from 'framer-motion'
import { AnalysisReportBentoGrid } from '@/features/analysis-reports/components/AnalysisReportBentoGrid'
import { fadeUp } from '@/lib/motion'
import type { RepositoryMetrics } from '@/types/repository'

interface AnalysisReportDashboardProps {
  metrics: RepositoryMetrics
  repositoryLabel?: string
}

export function AnalysisReportDashboard({
  metrics,
}: AnalysisReportDashboardProps) {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div

  return (
    <Container
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="space-y-6"
    >
      <AnalysisReportBentoGrid metrics={metrics} />
    </Container>
  )
}
