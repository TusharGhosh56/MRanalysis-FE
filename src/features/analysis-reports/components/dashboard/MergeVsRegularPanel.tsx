import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatNumber, formatPercent } from '@/features/analysis-reports/utils/format-metrics'
import type { MergeVsRegular } from '@/types/repository'

interface MergeVsRegularPanelProps {
  data?: MergeVsRegular
  className?: string
}

export function MergeVsRegularPanel({
  data,
  className,
}: MergeVsRegularPanelProps) {
  if (!data) return null

  const mergePct = Math.round(data.merge_pct * 100)

  return (
    <DashboardPanel title="Merge vs regular" className={className}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-white">
              {formatNumber(data.merge_commits)}
            </p>
            <p className="text-xs text-github-muted">Merge</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              {formatNumber(data.regular_commits)}
            </p>
            <p className="text-xs text-github-muted">Regular</p>
          </div>
          <div>
            <p className="text-lg font-bold text-accent-teal">
              {formatPercent(data.merge_pct)}
            </p>
            <p className="text-xs text-github-muted">Merge %</p>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-github-border/40">
          <div
            className="h-full rounded-full bg-accent-teal"
            style={{ width: `${mergePct}%` }}
          />
        </div>
      </div>
    </DashboardPanel>
  )
}
