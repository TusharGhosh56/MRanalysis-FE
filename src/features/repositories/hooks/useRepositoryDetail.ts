import { useQuery } from '@tanstack/react-query'
import {
  getRepository,
  getRepositoryAnalytics,
  getRepositoryStatus,
} from '@/api/repositories'
import {
  isAnalysisInProgress,
  STATUS_POLL_INTERVAL_MS,
} from '@/features/repositories/constants'
import { findSnapshot } from '@/features/repositories/utils'
import { queryKeys } from '@/lib/query-keys'
import type { CommitsPerWeek, TopContributor } from '@/types/repository'

export function useRepositoryDetail(repositoryId: string | undefined) {
  const isEnabled = Boolean(repositoryId)

  const repositoryQuery = useQuery({
    queryKey: queryKeys.repository.detail(repositoryId!),
    queryFn: () => getRepository(repositoryId!),
    enabled: isEnabled,
  })

  const statusQuery = useQuery({
    queryKey: queryKeys.repository.status(repositoryId!),
    queryFn: () => getRepositoryStatus(repositoryId!),
    enabled: isEnabled,
    refetchInterval: (query) => {
      const currentStatus = query.state.data?.status
      if (currentStatus && isAnalysisInProgress(currentStatus)) {
        return STATUS_POLL_INTERVAL_MS
      }
      return false
    },
  })

  const analyticsQuery = useQuery({
    queryKey: queryKeys.repository.analytics(repositoryId!),
    queryFn: () => getRepositoryAnalytics(repositoryId!),
    enabled: isEnabled && statusQuery.data?.status === 'completed',
  })

  const analytics = analyticsQuery.data ?? null
  const commitsPerWeek = analytics
    ? findSnapshot<CommitsPerWeek[]>(analytics, 'commits_per_week')
    : null
  const topContributors = analytics
    ? findSnapshot<TopContributor[]>(analytics, 'top_contributors')
    : null

  return {
    repositoryQuery,
    statusQuery,
    analyticsQuery,
    commitsPerWeek,
    topContributors,
  }
}
