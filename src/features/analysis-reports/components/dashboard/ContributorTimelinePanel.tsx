import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatDate, formatNumber } from '@/features/analysis-reports/utils/format-metrics'
import type { ContributorTimelineEntry } from '@/types/repository'

interface ContributorTimelinePanelProps {
  data?: ContributorTimelineEntry[]
  className?: string
  limit?: number
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function ContributorTimelinePanel({
  data,
  className,
  limit = 12,
}: ContributorTimelinePanelProps) {
  const items = [...(data || [])]
    .sort((a, b) => b.total_commits - a.total_commits)
    .slice(0, limit)

  return (
    <DashboardPanel
      title="Contributor Timelines"
      subtitle="First and most recent commit dates for each contributor"
      className={className}
      isEmpty={items.length === 0}
      emptyMessage="No contributor timeline recorded."
    >
      <div className="max-h-80 overflow-x-auto overflow-y-auto font-mono text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.08] text-xs text-slate-400 font-sans">
              <th className="pb-2 pr-3 font-medium">Contributor</th>
              <th className="pb-2 pr-3 font-medium">First Commit</th>
              <th className="pb-2 pr-3 font-medium">Latest Commit</th>
              <th className="pb-2 font-medium text-right">Total Commits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {items.map((entry) => (
              <tr
                key={`${entry.email}-${entry.first_commit_at}`}
                className="transition hover:bg-white/[0.02]"
              >
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#161e2c] text-[10px] font-bold text-slate-300">
                      {getInitials(entry.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">{entry.name}</p>
                      <p className="truncate text-[10px] text-slate-500">
                        {entry.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-slate-400">
                  {formatDate(entry.first_commit_at)}
                </td>
                <td className="py-2.5 pr-3 text-slate-400">
                  {formatDate(entry.last_commit_at)}
                </td>
                <td className="py-2.5 text-right">
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-bold text-emerald-300">
                    {formatNumber(entry.total_commits)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  )
}
