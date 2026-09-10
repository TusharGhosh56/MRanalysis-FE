import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  CHART_AXIS_LINE,
  CHART_AXIS_TICK,
  CHART_CURSOR,
  CHART_GRID_STROKE,
  CHART_TOOLTIP_STYLE,
} from '@/features/analysis-reports/components/dashboard/chart-styles'
import { formatNumber } from '@/features/analysis-reports/utils/format-metrics'
import type { CommitMessagePattern } from '@/types/repository'

interface CommitMessagePatternsChartProps {
  data?: CommitMessagePattern[]
  className?: string
}

export function CommitMessagePatternsChart({
  data,
  className,
}: CommitMessagePatternsChartProps) {
  const chartData = [...(data || [])].sort((a, b) => b.count - a.count)

  return (
    <DashboardPanel
      title="Commit Message Types"
      subtitle="Breakdown by commit prefix (feat, fix, refactor, chore)"
      className={className}
      isEmpty={chartData.length === 0}
      emptyMessage="No conventional commit prefixes detected (like feat, fix, or docs)."
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={CHART_GRID_STROKE} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="category"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
            />
            <YAxis tick={CHART_AXIS_TICK} axisLine={CHART_AXIS_LINE} />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={CHART_CURSOR}
              formatter={(val) => [`${formatNumber(Number(val))} commits`, 'Frequency']}
            />
            <Bar dataKey="count" fill="#00f5a0" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  )
}
