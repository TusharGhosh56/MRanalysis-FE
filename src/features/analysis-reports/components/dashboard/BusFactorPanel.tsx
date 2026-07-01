import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatPercent } from '@/features/analysis-reports/utils/format-metrics'
import type { BusFactor } from '@/types/repository'

interface BusFactorPanelProps {
  data: BusFactor
  className?: string
}

function riskLabel(score: number): string {
  if (score <= 1) return 'High risk — knowledge concentrated'
  if (score <= 2) return 'Moderate risk — limited bus factor'
  return 'Healthy distribution'
}

export function BusFactorPanel({ data, className }: BusFactorPanelProps) {
  return (
    <DashboardPanel title="Bus factor" className={className}>
      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{data.score}</span>
          <span className="text-sm text-github-muted">score</span>
        </div>
        <p className="text-sm text-white">
          Top contributor: {formatPercent(data.top_contributor_pct)}
        </p>
        <p className="text-xs text-github-muted">{riskLabel(data.score)}</p>
      </div>
    </DashboardPanel>
  )
}
