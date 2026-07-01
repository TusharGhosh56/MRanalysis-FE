import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatDate } from '@/features/analysis-reports/utils/format-metrics'
import type { ContributorTimelineEntry } from '@/types/repository'

interface ContributorTimelinePanelProps {
  data?: ContributorTimelineEntry[]
  className?: string
  limit?: number
}

export function ContributorTimelinePanel({
  data,
  className,
  limit = 12,
}: ContributorTimelinePanelProps) {
  if (!data?.length) return null

  const items = [...data]
    .sort((a, b) => b.total_commits - a.total_commits)
    .slice(0, limit)

  return (
    <DashboardPanel
      title="Contributor timeline"
      subtitle="First and last commit per identity"
      className={className}
    >
      <div className="max-h-80 overflow-x-auto overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-github-muted">
              <th className="pb-2 pr-3 font-medium">Contributor</th>
              <th className="pb-2 pr-3 font-medium">First</th>
              <th className="pb-2 pr-3 font-medium">Last</th>
              <th className="pb-2 font-medium">Commits</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <tr
                key={`${entry.email}-${entry.first_commit_at}`}
                className="border-t border-github-border/30"
              >
                <td className="py-2 pr-3">
                  <p className="font-medium text-white">{entry.name}</p>
                  <p className="truncate text-xs text-github-muted">
                    {entry.email}
                  </p>
                </td>
                <td className="py-2 pr-3 text-xs text-github-muted">
                  {formatDate(entry.first_commit_at)}
                </td>
                <td className="py-2 pr-3 text-xs text-github-muted">
                  {formatDate(entry.last_commit_at)}
                </td>
                <td className="py-2 font-mono text-white">
                  {entry.total_commits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  )
}
