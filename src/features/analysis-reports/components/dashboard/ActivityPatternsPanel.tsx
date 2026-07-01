import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatDate, formatIsoWeek } from '@/features/analysis-reports/utils/format-metrics'
import type { ActivityPatterns } from '@/types/repository'

interface ActivityPatternsPanelProps {
  data?: ActivityPatterns
  className?: string
}

export function ActivityPatternsPanel({
  data,
  className,
}: ActivityPatternsPanelProps) {
  if (!data) return null

  const quietPeriod =
    data.quiet_period_start && data.quiet_period_end
      ? `${formatDate(data.quiet_period_start)} – ${formatDate(data.quiet_period_end)}`
      : 'None recorded'

  return (
    <DashboardPanel title="Activity patterns" className={className}>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-github-muted">Busiest week</dt>
          <dd className="font-medium text-white">
            {formatIsoWeek(data.busiest_week.week)} ({data.busiest_week.count}{' '}
            commits)
          </dd>
        </div>
        <div>
          <dt className="text-github-muted">Avg commits / active week</dt>
          <dd className="font-medium text-white">
            {data.avg_commits_per_active_week.toFixed(1)}
          </dd>
        </div>
        <div>
          <dt className="text-github-muted">Longest quiet period</dt>
          <dd className="font-medium text-white">
            {data.longest_quiet_days} days
          </dd>
        </div>
        <div>
          <dt className="text-github-muted">Quiet period</dt>
          <dd className="text-white">{quietPeriod}</dd>
        </div>
      </dl>
    </DashboardPanel>
  )
}
