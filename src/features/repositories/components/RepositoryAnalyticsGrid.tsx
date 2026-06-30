import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { CommitsPerWeekChart } from '@/features/repositories/components/CommitsPerWeekChart'
import { TopContributorsList } from '@/features/repositories/components/TopContributorsList'
import type { CommitsPerWeek, TopContributor } from '@/types/repository'

interface RepositoryAnalyticsGridProps {
  commitsPerWeek: CommitsPerWeek[] | null
  topContributors: TopContributor[] | null
}

export function RepositoryAnalyticsGrid({
  commitsPerWeek,
  topContributors,
}: RepositoryAnalyticsGridProps) {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div

  const containerProps = shouldReduceMotion
    ? { className: 'grid gap-6 lg:grid-cols-2' }
    : {
        className: 'grid gap-6 lg:grid-cols-2',
        variants: staggerContainer,
        initial: 'hidden' as const,
        animate: 'visible' as const,
      }

  const Item = shouldReduceMotion ? 'div' : motion.div
  const itemProps = shouldReduceMotion ? {} : { variants: fadeUp }

  return (
    <Container {...containerProps}>
      <Item {...itemProps}>
        <CommitsPerWeekChart data={commitsPerWeek} />
      </Item>
      <Item {...itemProps}>
        <TopContributorsList contributors={topContributors} />
      </Item>
    </Container>
  )
}
