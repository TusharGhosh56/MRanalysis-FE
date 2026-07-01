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
import type { CommitsByWeekday } from '@/types/repository'

interface CommitsByWeekdayChartProps {
  data?: CommitsByWeekday[]
  className?: string
}

export function CommitsByWeekdayChart({
  data,
  className,
}: CommitsByWeekdayChartProps) {
  if (!data?.length) return null

  return (
    <DashboardPanel title="Commits by weekday" className={className}>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              stroke="#30363d"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="weekday"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
              tickFormatter={(v) => String(v).slice(0, 3)}
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
