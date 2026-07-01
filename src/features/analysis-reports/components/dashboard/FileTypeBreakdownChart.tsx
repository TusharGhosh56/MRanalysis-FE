import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
import { formatNumber } from '@/features/analysis-reports/utils/format-metrics'
import type { FileTypeBreakdown } from '@/types/repository'

interface FileTypeBreakdownChartProps {
  data?: FileTypeBreakdown[]
  className?: string
}

export function FileTypeBreakdownChart({
  data,
  className,
}: FileTypeBreakdownChartProps) {
  if (!data?.length) return null

  const chartData = [...data]
    .sort((a, b) => b.lines_changed - a.lines_changed)
    .slice(0, 8)
    .map((item) => ({
      ...item,
      label: item.extension || '(none)',
    }))

  return (
    <DashboardPanel
      title="File types"
      subtitle="Lines changed by extension"
      className={className}
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid
              stroke="#30363d"
              strokeDasharray="3 3"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
              tickFormatter={(v) => formatNumber(Number(v))}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={72}
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={CHART_CURSOR}
              formatter={(value) => [formatNumber(Number(value)), 'Lines']}
            />
            <Bar dataKey="lines_changed" radius={[0, 4, 4, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={`hsl(142, 50%, ${38 + index * 4}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  )
}
