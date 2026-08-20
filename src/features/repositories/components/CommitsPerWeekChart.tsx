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
import { Card } from '@/components/ui/Card'
import {
  formatIsoWeek,
  formatIsoWeekShort,
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
        stagger: 0.04,
      })
    },
    { scope: chartRef, dependencies: [data?.length] },
  )

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-white">Weekly Commit Cadence</h2>
          <p className="text-xs text-slate-400">Total commit frequency aggregated by ISO calendar week</p>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div ref={chartRef} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickFormatter={formatIsoWeekShort}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0e17',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  color: '#fff',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '12px',
                }}
                cursor={{ fill: 'rgba(245, 158, 11, 0.08)' }}
                labelFormatter={(week) => formatIsoWeek(String(week))}
              />
              <Bar
                dataKey="count"
                fill="url(#daynightBarGradient)"
                radius={[4, 4, 0, 0]}
                className="commits-chart-bar"
              />
              <defs>
                <linearGradient id="daynightBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-slate-500">No commit data available.</p>
      )}
    </Card>
  )
}
