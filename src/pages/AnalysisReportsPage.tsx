import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FolderGit2, Plus, Search } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { ErrorBanner } from '@/components/feedback/ErrorBanner'
import { RepositoryListSkeleton } from '@/components/feedback/Skeleton'
import { AnalysisReportList } from '@/features/analysis-reports/components/AnalysisReportList'
import { useAnalysisReportList } from '@/features/analysis-reports/hooks/useAnalysisReportList'
import { Button } from '@/components/ui/Button'

export function AnalysisReportsPage() {
  const { listQuery, deleteMutation, repositories } = useAnalysisReportList()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'failed'>('all')

  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (statusFilter === 'completed') return repo.status === 'completed'
    if (statusFilter === 'failed') return repo.status === 'failed'
    if (statusFilter === 'in_progress') {
      return ['pending', 'cloning', 'parsing', 'analyzing'].includes(repo.status)
    }

    return true
  })

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        badge="REPORTS & ARCHIVES"
        title="Repository Intelligence Audits"
        subtitle="All repository analyses processed by the async Git engine. Open any completed report to inspect forensic charts or track active jobs."
        action={
          <Link to="/">
            <Button variant="primary" size="md" className="rounded-full px-5 py-2.5 text-xs font-semibold">
              <Plus className="h-4 w-4 mr-1" />
              New Analysis
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      {repositories.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by repository or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-2 pl-10 pr-4 text-xs font-mono text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/60 p-1 backdrop-blur-md">
            {[
              { key: 'all', label: 'All Audits' },
              { key: 'completed', label: 'Completed' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'failed', label: 'Failed' },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key as typeof statusFilter)}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition ${
                  statusFilter === key
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <section>
        {listQuery.isLoading && <RepositoryListSkeleton />}

        {listQuery.error && (
          <ErrorBanner
            message="Failed to load analysis reports."
            hint="Ensure the backend server is reachable at the configured API endpoint."
          />
        )}

        {!listQuery.isLoading && !listQuery.error && repositories.length === 0 && (
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
              <FolderGit2 className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-white">No Analysis Reports Yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Submit any public GitHub URL on the Home page to start your first asynchronous Git analysis.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/">
                <Button variant="primary" size="md" className="rounded-full px-6">
                  <span>Start First Analysis</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {filteredRepositories.length > 0 && (
          <AnalysisReportList
            repositories={filteredRepositories}
            deleteMutation={deleteMutation}
          />
        )}

        {repositories.length > 0 && filteredRepositories.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400 font-mono">
            No reports match the current filter "{searchQuery}".
          </div>
        )}
      </section>
    </div>
  )
}
