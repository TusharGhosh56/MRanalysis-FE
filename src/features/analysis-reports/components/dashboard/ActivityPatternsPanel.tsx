import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatDate, formatIsoWeek, formatNumber } from '@/features/analysis-reports/utils/format-metrics'
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
    <DashboardPanel
      title="Busiest & Quiet Periods"
      subtitle="Peak sprint weeks and longest breaks without commits"
      className={className}
    >
      <dl className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5 font-mono">
          <dt className="text-slate-400 font-sans">Busiest Week</dt>
          <dd className="font-semibold text-white">
            {formatIsoWeek(data.busiest_week.week)}{' '}
            <span className="text-emerald-400">({formatNumber(data.busiest_week.count)} commits)</span>
          </dd>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5 font-mono">
          <dt className="text-slate-400 font-sans">Average On Active Weeks</dt>
          <dd className="font-semibold text-white">
            {data.avg_commits_per_active_week.toFixed(1)} commits
          </dd>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5 font-mono">
          <dt className="text-slate-400 font-sans">Longest Inactivity Gap</dt>
          <dd className="font-semibold text-amber-300">
            {data.longest_quiet_days} days
          </dd>
        </div>

        <div className="flex flex-col gap-1 rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
          <dt className="text-slate-400 font-sans">Longest Quiet Period</dt>
          <dd className="font-medium text-slate-300 font-mono text-[11px]">{quietPeriod}</dd>
        </div>
      </dl>
    </DashboardPanel>
  )
}
