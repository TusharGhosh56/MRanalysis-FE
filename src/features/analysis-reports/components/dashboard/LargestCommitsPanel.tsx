import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatDate,
  formatNumber,
} from '@/features/analysis-reports/utils/format-metrics'
import type { LargestCommit } from '@/types/repository'

interface LargestCommitsPanelProps {
  data: LargestCommit[]
  className?: string
  limit?: number
}

export function LargestCommitsPanel({
  data,
  className,
  limit = 8,
}: LargestCommitsPanelProps) {
  const items = data.slice(0, limit)
  if (items.length === 0) return null

  return (
    <DashboardPanel title="Largest commits" className={className}>
      <ul className="max-h-80 space-y-3 overflow-y-auto">
        {items.map((commit) => (
          <li
            key={commit.hash}
            className="rounded-lg border border-github-border/40 p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-accent-teal">
                {commit.hash}
              </span>
              <span className="text-xs text-github-muted">
                {formatDate(commit.committed_at)}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-white">
              {commit.message}
            </p>
            <p className="mt-2 text-xs text-github-muted">
              <span className="text-green-400">
                +{formatNumber(commit.insertions)}
              </span>
              {' / '}
              <span className="text-red-400">
                -{formatNumber(commit.deletions)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  )
}
