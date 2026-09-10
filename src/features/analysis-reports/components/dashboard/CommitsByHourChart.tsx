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
import type { CommitsByHour } from '@/types/repository'

interface CommitsByHourChartProps {
  data?: CommitsByHour[]
  className?: string
}

export function CommitsByHourChart({
  data,
  className,
}: CommitsByHourChartProps) {
  return (
    <DashboardPanel
      title="Active Hours of the Day"
      subtitle="When do people commit code? (24-hour UTC)"
      className={className}
      isEmpty={!data?.length}
      emptyMessage="No hourly commit timestamps recorded."
    >
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={CHART_GRID_STROKE} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
              tickFormatter={(h) => `${h}h`}
            />
            <YAxis tick={CHART_AXIS_TICK} axisLine={CHART_AXIS_LINE} />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={CHART_CURSOR}
              formatter={(val) => [`${formatNumber(Number(val))} commits`, 'Volume']}
              labelFormatter={(hour) => `${hour}:00 - ${hour}:59 UTC`}
            />
            <Bar dataKey="count" fill="#00f5a0" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  )
}
