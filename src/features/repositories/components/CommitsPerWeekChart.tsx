import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CHART_AXIS_LINE,
  CHART_AXIS_TICK,
  CHART_CURSOR,
  CHART_GRID_STROKE,
  CHART_TOOLTIP_STYLE,
} from '@/features/analysis-reports/components/dashboard/chart-styles'
import {
  formatIsoWeek,
  formatIsoWeekShort,
  formatNumber,
} from '@/features/analysis-reports/utils/format-metrics'
import {
  GSAP_DEFAULT_DURATION,
  GSAP_DEFAULT_EASE,
  prefersReducedMotion,
} from '@/lib/motion'
import type { CommitsPerWeek } from '@/types/repository'

gsap.registerPlugin(useGSAP)

interface CommitsPerWeekChartProps {
  data: CommitsPerWeek[] | null
  className?: string
}

export function CommitsPerWeekChart({
  data,
  className = '',
}: CommitsPerWeekChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !data?.length) return
      gsap.from('.commits-chart-bar', {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: GSAP_DEFAULT_DURATION,
        ease: GSAP_DEFAULT_EASE,
        stagger: 0.02,
      })
    },
    { scope: chartRef, dependencies: [data?.length] },
  )

  const maxCommitCount = data?.length ? Math.max(...data.map((d) => d.count)) : 0

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0e14]/90 p-5 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:border-white/15 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Weekly Commits
          </h3>
          <p className="text-xs text-slate-400">
            Number of commits pushed each week over time
          </p>
        </div>

        {data && data.length > 0 && (
          <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400">
            Busiest week: <strong className="text-emerald-400">{formatNumber(maxCommitCount)}</strong> commits
          </span>
        )}
      </div>

      {data && data.length > 0 ? (
        <div ref={chartRef} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={CHART_GRID_STROKE} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tick={CHART_AXIS_TICK}
                axisLine={CHART_AXIS_LINE}
                tickFormatter={formatIsoWeekShort}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                tick={CHART_AXIS_TICK}
                axisLine={CHART_AXIS_LINE}
                tickFormatter={(v) => formatNumber(Number(v))}
              />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                cursor={CHART_CURSOR}
                labelFormatter={(week) => formatIsoWeek(String(week))}
                formatter={(val) => [`${formatNumber(Number(val))} commits`, 'Volume']}
              />
              <Bar
                dataKey="count"
                fill="url(#telemetryEmeraldGradient)"
                radius={[3, 3, 0, 0]}
                maxBarSize={48}
                className="commits-chart-bar"
              />
              <defs>
                <linearGradient id="telemetryEmeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f5a0" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-12 text-center font-mono text-xs text-slate-500">
          No commit data available for this repository.
        </p>
      )}
    </div>
  )
}
