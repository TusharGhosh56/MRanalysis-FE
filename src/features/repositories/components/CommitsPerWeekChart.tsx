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
  GSAP_DEFAULT_DURATION,
  GSAP_DEFAULT_EASE,
  prefersReducedMotion,
} from '@/lib/motion'
import type { CommitsPerWeek } from '@/types/repository'

gsap.registerPlugin(useGSAP)

interface CommitsPerWeekChartProps {
  data: CommitsPerWeek[] | null
}

export function CommitsPerWeekChart({ data }: CommitsPerWeekChartProps) {
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
    <Card hover>
      <h2 className="mb-4 text-lg font-semibold text-white">Commits per week</h2>
      {data && data.length > 0 ? (
        <div ref={chartRef} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#30363d" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                tick={{ fill: '#8b949e', fontSize: 11 }}
                axisLine={{ stroke: '#30363d' }}
              />
              <YAxis
                tick={{ fill: '#8b949e', fontSize: 11 }}
                axisLine={{ stroke: '#30363d' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '8px',
                }}
                cursor={{ fill: 'rgba(63, 185, 80, 0.08)' }}
              />
              <Bar
                dataKey="count"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                className="commits-chart-bar"
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3fb950" />
                  <stop offset="100%" stopColor="#238636" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-github-muted">No commit data yet.</p>
      )}
    </Card>
  )
}
