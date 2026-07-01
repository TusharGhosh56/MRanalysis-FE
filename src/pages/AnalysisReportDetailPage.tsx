import { Link, useParams } from 'react-router-dom'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { AnalysisReportDashboard } from '@/features/analysis-reports/components/AnalysisReportDashboard'
import { useAnalysisReportDetail } from '@/features/analysis-reports/hooks/useAnalysisReportDetail'
import { AnalysisFailedBanner } from '@/features/repositories/components/AnalysisFailedBanner'
import { AnalysisProgressBanner } from '@/features/repositories/components/AnalysisProgressBanner'
import { RepositoryDetailHeader } from '@/features/repositories/components/RepositoryDetailHeader'

export function AnalysisReportDetailPage() {
  const { id } = useParams<{ id: string }>()
  const {
    reportQuery,
    repository,
    metrics,
    isInProgress,
    isCompleted,
    isFailed,
    errorMessage,
    progressStatus,
  } = useAnalysisReportDetail(id)

  if (reportQuery.isLoading || !id) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner label="Loading report…" />
      </div>
    )
  }

  if (reportQuery.isError || !repository) {
    return (
      <p className="text-red-400">
        Report not found.{' '}
        <Link to="/reports" className="text-green-400 hover:underline">
          Back to Analysis Reports
        </Link>
      </p>
    )
  }

  const repositoryLabel = `${repository.owner}/${repository.name}`

  return (
    <div className="space-y-8">
      <RepositoryDetailHeader
        repository={repository}
        status={repository.status}
        backTo="/reports"
        backLabel="Back to Analysis Reports"
      />

      {isInProgress && progressStatus && (
        <AnalysisProgressBanner status={progressStatus} />
      )}

      {isFailed && <AnalysisFailedBanner message={errorMessage} />}

      {isCompleted && reportQuery.isFetching && !metrics && (
        <div className="flex justify-center py-12">
          <LoadingSpinner label="Loading metrics…" />
        </div>
      )}

      {isCompleted && metrics && (
        <AnalysisReportDashboard
          metrics={metrics}
          repositoryLabel={repositoryLabel}
        />
      )}
    </div>
  )
}
