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
  CHART_TOOLTIP_STYLE,
} from '@/features/analysis-reports/components/dashboard/chart-styles'
import type { CommitMessagePattern } from '@/types/repository'

interface CommitMessagePatternsChartProps {
  data?: CommitMessagePattern[]
  className?: string
}

export function CommitMessagePatternsChart({
  data,
  className,
}: CommitMessagePatternsChartProps) {
  if (!data?.length) return null

  const chartData = [...data].sort((a, b) => b.count - a.count)

  return (
    <DashboardPanel
      title="Commit message patterns"
      subtitle="By category"
      className={className}
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              stroke="#30363d"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
            />
            <YAxis tick={CHART_AXIS_TICK} axisLine={CHART_AXIS_LINE} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} cursor={CHART_CURSOR} />
            <Bar dataKey="count" fill="#3fb950" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  )
}
