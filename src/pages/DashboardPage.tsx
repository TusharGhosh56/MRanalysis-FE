import { FolderGit2 } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorBanner } from '@/components/feedback/ErrorBanner'
import { RepositoryListSkeleton } from '@/components/feedback/Skeleton'
import { AnalyzeRepositoryForm } from '@/features/repositories/components/AnalyzeRepositoryForm'
import { DashboardAnalyticsSection } from '@/features/repositories/components/DashboardAnalyticsSection'
import { JobProgressPanel } from '@/features/repositories/components/JobProgressPanel'
import { RepositoryList } from '@/features/repositories/components/RepositoryList'
import { useDashboardAnalysis } from '@/features/repositories/hooks/useDashboardAnalysis'

export function DashboardPage() {
  const {
    listQuery,
    createMutation,
    deleteMutation,
    job,
    metrics,
    isPolling,
    isFailed,
    isCompleted,
    errorMessage,
    clearJob,
  } = useDashboardAnalysis()

  const repositoryLabel =
    job?.result?.repository != null
      ? `${job.result.repository.owner}/${job.result.repository.name}`
      : createMutation.data != null
        ? `${createMutation.data.owner}/${createMutation.data.name}`
        : undefined

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Dashboard"
        title="Your repositories"
        subtitle="Submit a public GitHub repository URL to start background analysis. Results appear here when processing completes."
      />

      <AnalyzeRepositoryForm
        createMutation={createMutation}
        isJobPolling={isPolling}
      />

      {isPolling && job && (
        <JobProgressPanel job={job} repositoryLabel={repositoryLabel} />
      )}

      {isFailed && errorMessage && (
        <div className="space-y-3">
          <ErrorBanner message={errorMessage} />
          <Button variant="ghost" onClick={clearJob} className="text-sm">
            Dismiss and try again
          </Button>
        </div>
      )}

      {isCompleted && metrics && (
        <DashboardAnalyticsSection
          metrics={metrics}
          repositoryLabel={repositoryLabel}
        />
      )}

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-github-muted">
          Recent analyses
        </h2>

        {listQuery.isLoading && <RepositoryListSkeleton />}

        {listQuery.error && (
          <ErrorBanner
            message="Failed to load repositories."
            hint="Is the backend running at the configured API URL?"
          />
        )}

        {!listQuery.isLoading &&
          !listQuery.error &&
          listQuery.data?.length === 0 && (
            <EmptyState
              icon={FolderGit2}
              title="No repositories yet"
              description="Add a GitHub URL above to start your first analysis."
            />
          )}

        {listQuery.data && listQuery.data.length > 0 && (
          <RepositoryList
            repositories={listQuery.data}
            deleteMutation={deleteMutation}
          />
        )}
      </section>
    </div>
  )
}
