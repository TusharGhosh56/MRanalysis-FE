import { FolderGit2 } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorBanner } from '@/components/feedback/ErrorBanner'
import { RepositoryListSkeleton } from '@/components/feedback/Skeleton'
import { AnalysisReportList } from '@/features/analysis-reports/components/AnalysisReportList'
import { useAnalysisReportList } from '@/features/analysis-reports/hooks/useAnalysisReportList'

export function AnalysisReportsPage() {
  const { listQuery, deleteMutation, repositories } = useAnalysisReportList()

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Reports"
        title="Analysis Reports"
        subtitle="All repository analyses you've started. Open a report to view the full dashboard or track in-progress jobs."
      />

      <section>
        {listQuery.isLoading && <RepositoryListSkeleton />}

        {listQuery.error && (
          <ErrorBanner
            message="Failed to load analysis reports."
            hint="Is the backend running at the configured API URL?"
          />
        )}

        {!listQuery.isLoading &&
          !listQuery.error &&
          repositories.length === 0 && (
            <EmptyState
              icon={FolderGit2}
              title="No reports yet"
              description="Submit a GitHub URL from the Home page to start your first analysis."
            />
          )}

        {repositories.length > 0 && (
          <AnalysisReportList
            repositories={repositories}
            deleteMutation={deleteMutation}
          />
        )}
      </section>
    </div>
  )
}
