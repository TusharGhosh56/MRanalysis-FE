import { Link, useParams } from 'react-router-dom'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { AnalysisFailedBanner } from '@/features/repositories/components/AnalysisFailedBanner'
import { AnalysisProgressBanner } from '@/features/repositories/components/AnalysisProgressBanner'
import { RepositoryAnalyticsGrid } from '@/features/repositories/components/RepositoryAnalyticsGrid'
import { RepositoryDetailHeader } from '@/features/repositories/components/RepositoryDetailHeader'
import { isAnalysisInProgress } from '@/features/repositories/constants'
import { useRepositoryDetail } from '@/features/repositories/hooks/useRepositoryDetail'

export function RepositoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const {
    repositoryQuery,
    statusQuery,
    analyticsQuery,
    commitsPerWeek,
    topContributors,
  } = useRepositoryDetail(id)

  if (repositoryQuery.isLoading || !id) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!repositoryQuery.data) {
    return (
      <p className="text-red-400">
        Repository not found.{' '}
        <Link to="/" className="text-green-400 hover:underline">
          Back to dashboard
        </Link>
      </p>
    )
  }

  const repository = repositoryQuery.data
  const status = statusQuery.data
  const displayStatus = status?.status ?? repository.status

  return (
    <div className="space-y-8">
      <RepositoryDetailHeader
        repository={repository}
        status={displayStatus}
      />

      {status && isAnalysisInProgress(status.status) && (
        <AnalysisProgressBanner status={status} />
      )}

      {status?.status === 'failed' && (
        <AnalysisFailedBanner message={status.error} />
      )}

      {status?.status === 'completed' && analyticsQuery.isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {status?.status === 'completed' && analyticsQuery.data && (
        <RepositoryAnalyticsGrid
          commitsPerWeek={commitsPerWeek}
          topContributors={topContributors}
        />
      )}
    </div>
  )
}
