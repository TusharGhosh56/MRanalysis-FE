import { FolderGit2 } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorBanner } from '@/components/feedback/ErrorBanner'
import { RepositoryListSkeleton } from '@/components/feedback/Skeleton'
import { AnalyzeRepositoryForm } from '@/features/repositories/components/AnalyzeRepositoryForm'
import { RepositoryList } from '@/features/repositories/components/RepositoryList'
import { useRepositories } from '@/features/repositories/hooks/useRepositories'

export function DashboardPage() {
  const { listQuery, createMutation, deleteMutation } = useRepositories()

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Dashboard"
        title="Your repositories"
        subtitle="Submit a public GitHub repository URL to start background analysis. Results appear here when processing completes."
      />

      <AnalyzeRepositoryForm createMutation={createMutation} />

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
