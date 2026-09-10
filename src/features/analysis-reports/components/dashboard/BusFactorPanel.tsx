import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatPercent } from '@/features/analysis-reports/utils/format-metrics'
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'
import type { BusFactor } from '@/types/repository'

interface BusFactorPanelProps {
  data: BusFactor
  className?: string
}

export function BusFactorPanel({ data, className }: BusFactorPanelProps) {
  const isHighRisk = data.score <= 1
  const isModerateRisk = data.score === 2

  const badgeColor = isHighRisk
    ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
    : isModerateRisk
      ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'

  const RiskIcon = isHighRisk ? ShieldAlert : isModerateRisk ? AlertTriangle : CheckCircle2
  const riskLabel = isHighRisk
    ? 'High Risk: 1 Person Dependency'
    : isModerateRisk
      ? 'Medium Risk: 2 Key People'
      : 'Healthy: Shared Work'

  const topAuthorSharePct = Math.round(data.top_contributor_pct * 100)

  return (
    <DashboardPanel
      title="Bus Factor (Key Person Risk)"
      subtitle="How many developers can leave before nobody knows how this project works?"
      className={className}
    >
      <div className="space-y-4">
        {/* Score Display and Risk Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-mono text-4xl font-bold tracking-tight ${
                isHighRisk ? 'text-rose-400' : isModerateRisk ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {data.score}
            </span>
            <span className="font-sans text-xs text-slate-400">
              {data.score === 1 ? 'person holds core knowledge' : 'people hold core knowledge'}
            </span>
          </div>

          <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold shrink-0 whitespace-nowrap ${badgeColor}`}>
            <RiskIcon className="h-3.5 w-3.5 shrink-0" />
            <span>{riskLabel}</span>
          </span>
        </div>

        {/* Top Contributor Concentration Bar */}
        <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Top contributor wrote</span>
            <span className="font-mono font-bold text-white">
              {formatPercent(data.top_contributor_pct)} of all code
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isHighRisk ? 'bg-rose-500' : isModerateRisk ? 'bg-amber-500' : 'bg-emerald-400'
              }`}
              style={{ width: `${topAuthorSharePct}%` }}
            />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {isHighRisk
              ? 'Warning: 1 person made most of the commits. If they leave or get busy, nobody else knows how this code works.'
              : isModerateRisk
                ? 'Notice: Core code is maintained by only 2 people. Having others review code will help prevent future bottlenecks.'
                : 'Good news: Work is nicely shared across multiple people. No single person is a bottleneck.'}
          </p>
        </div>
      </div>
    </DashboardPanel>
  )
}
