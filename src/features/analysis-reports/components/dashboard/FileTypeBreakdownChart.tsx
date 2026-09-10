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
  CHART_GRID_STROKE,
  CHART_TOOLTIP_STYLE,
} from '@/features/analysis-reports/components/dashboard/chart-styles'
import { formatNumber } from '@/features/analysis-reports/utils/format-metrics'
import type { FileTypeBreakdown } from '@/types/repository'

interface FileTypeBreakdownChartProps {
  data?: FileTypeBreakdown[]
  className?: string
}

const EXTENSION_COLORS = [
  '#00f5a0',
  '#00e3a5',
  '#00d0aa',
  '#00beb0',
  '#00abb5',
  '#0098ba',
  '#0086bf',
  '#0073c4',
]

export function FileTypeBreakdownChart({
  data,
  className,
}: FileTypeBreakdownChartProps) {
  const chartData = [...(data || [])]
    .sort((a, b) => b.lines_changed - a.lines_changed)
    .slice(0, 8)
    .map((item) => ({
      ...item,
      label: item.extension || '(no ext)',
    }))

  return (
    <DashboardPanel
      title="Languages & File Types"
      subtitle="Lines of code changed by file extension"
      className={className}
      isEmpty={chartData.length === 0}
      emptyMessage="No file type extension data recorded."
    >
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10, top: 0, bottom: 0 }}>
            <CartesianGrid stroke={CHART_GRID_STROKE} strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
              tickFormatter={(v) => formatNumber(Number(v))}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={64}
              tick={CHART_AXIS_TICK}
              axisLine={CHART_AXIS_LINE}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={CHART_CURSOR}
              formatter={(value) => [`${formatNumber(Number(value))} lines`, 'Lines Modified']}
            />
            <Bar dataKey="lines_changed" radius={[0, 3, 3, 0]}>
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={EXTENSION_COLORS[index % EXTENSION_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  )
}
