import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FolderGit2, Plus, Search, X } from 'lucide-react'
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

  const counts = {
    all: repositories.length,
    completed: repositories.filter((r) => r.status === 'completed').length,
    in_progress: repositories.filter((r) =>
      ['pending', 'cloning', 'parsing', 'analyzing'].includes(r.status)
    ).length,
    failed: repositories.filter((r) => r.status === 'failed').length,
  }

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
        badge="AUDIT ARCHIVES"
        title="Repository Intelligence Audits"
        subtitle="All repository analyses processed by the async Git engine. Open any completed report to inspect forensic charts or track active jobs."
        action={
          <Link to="/">
            <Button variant="primary" size="md" className="rounded-xl px-4 py-2 text-xs font-semibold">
              <Plus className="h-4 w-4 mr-1" />
              New Analysis
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      {repositories.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by repository or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0b0e14]/90 py-2 pl-9 pr-8 text-xs font-mono text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none focus:shadow-[0_0_20px_rgba(0,245,160,0.15)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Tabs with Counts */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/[0.08] bg-[#0b0e14] p-1 font-mono text-xs">
            {[
              { key: 'all', label: 'All', count: counts.all },
              { key: 'completed', label: 'Completed', count: counts.completed },
              { key: 'in_progress', label: 'In Progress', count: counts.in_progress },
              { key: 'failed', label: 'Failed', count: counts.failed },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatusFilter(key as typeof statusFilter)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${
                  statusFilter === key
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{label}</span>
                <span className="rounded bg-white/[0.05] px-1.5 py-0.2 text-[10px] text-slate-400 font-normal">
                  {count}
                </span>
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
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0e14]/80 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_-5px_rgba(0,245,160,0.3)]">
              <FolderGit2 className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">No Analysis Reports Recorded</h3>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-400 font-mono">
              Submit any public GitHub URL on the Home page to start your first asynchronous Git telemetry audit.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/">
                <Button variant="primary" size="md" className="rounded-xl px-5 text-xs font-semibold">
                  <span>Start First Analysis</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
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
          <div className="py-16 text-center text-xs text-slate-500 font-mono">
            No analysis reports match the filter "{searchQuery}".
          </div>
        )}
      </section>
    </div>
  )
}
