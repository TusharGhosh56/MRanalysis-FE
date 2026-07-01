import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatPercent,
  truncatePath,
} from '@/features/analysis-reports/utils/format-metrics'
import type { CodeOwnershipEntry } from '@/types/repository'

interface CodeOwnershipPanelProps {
  data?: CodeOwnershipEntry[]
  className?: string
  limit?: number
}

export function CodeOwnershipPanel({
  data,
  className,
  limit = 10,
}: CodeOwnershipPanelProps) {
  if (!data?.length) return null
  const items = data.slice(0, limit)

  return (
    <DashboardPanel
      title="Code ownership"
      subtitle="Each % is that author's share of commits to that file—not a repo-wide split"
      className={className}
    >
      <ul className="max-h-80 space-y-3 overflow-y-auto">
        {items.map((entry) => (
          <li key={entry.path}>
            <div className="flex items-center justify-between gap-2">
              <p
                className="min-w-0 truncate font-mono text-sm text-white"
                title={entry.path}
              >
                {truncatePath(entry.path, 48)}
              </p>
              <span
                className="shrink-0 text-xs text-accent-teal"
                title={`${entry.primary_author} made ${formatPercent(entry.ownership_pct)} of commits to this file`}
              >
                {formatPercent(entry.ownership_pct)} of file
              </span>
            </div>
            <p className="mt-0.5 truncate text-xs text-github-muted">
              {entry.primary_author} · {entry.commit_count} commits
            </p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-github-border/40">
              <div
                className="h-full rounded-full bg-accent-teal/80"
                style={{ width: `${Math.min(100, entry.ownership_pct * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  )
}
