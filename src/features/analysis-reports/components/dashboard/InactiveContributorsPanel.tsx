import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatDate,
  formatNumber,
} from '@/features/analysis-reports/utils/format-metrics'
import type { InactiveContributor } from '@/types/repository'

interface InactiveContributorsPanelProps {
  data: InactiveContributor[]
  className?: string
  limit?: number
}

export function InactiveContributorsPanel({
  data,
  className,
  limit = 10,
}: InactiveContributorsPanelProps) {
  const items = data.slice(0, limit)
  if (items.length === 0) return null

  return (
    <DashboardPanel
      title="Inactive contributors"
      subtitle="No recent commits"
      className={className}
    >
      <ul className="max-h-80 space-y-2 overflow-y-auto">
        {items.map((contributor) => (
          <li
            key={`${contributor.name}-${contributor.last_commit_at}`}
            className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-white/5"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-white">
                {contributor.name}
              </p>
              <p className="text-xs text-github-muted">
                Last commit {formatDate(contributor.last_commit_at)}
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-red-500/15 px-2 py-0.5 text-xs text-red-300">
              {formatNumber(contributor.days_inactive)}d
            </span>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  )
}
