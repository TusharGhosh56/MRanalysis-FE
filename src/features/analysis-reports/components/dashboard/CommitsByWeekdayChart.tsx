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
import type { CommitsByWeekday } from '@/types/repository'

interface CommitsByWeekdayChartProps {
  data?: CommitsByWeekday[]
  className?: string
}

export function CommitsByWeekdayChart({
  data,
  className,
}: CommitsByWeekdayChartProps) {
  return (
    <DashboardPanel
      title="Active Days of the Week"
      subtitle="Which days see the most commits?"
      className={className}
      isEmpty={!data?.length}
      emptyMessage="No weekday commit distribution recorded."
    >
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={CHART_GRID_STROKE} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="weekday"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
              tickFormatter={(v) => String(v).slice(0, 3)}
            />
            <YAxis tick={CHART_AXIS_TICK} axisLine={CHART_AXIS_LINE} />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={CHART_CURSOR}
              formatter={(val) => [`${formatNumber(Number(val))} commits`, 'Volume']}
            />
            <Bar dataKey="count" fill="#00d2ff" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  )
}
