import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import { formatNumber, formatPercent } from '@/features/analysis-reports/utils/format-metrics'
import type { MergeVsRegular } from '@/types/repository'

interface MergeVsRegularPanelProps {
  data?: MergeVsRegular
  className?: string
}

export function MergeVsRegularPanel({
  data,
  className,
}: MergeVsRegularPanelProps) {
  if (!data) return null

  const mergePct = Math.round(data.merge_pct * 100)
  const regularPct = 100 - mergePct

  return (
    <DashboardPanel
      title="Pull Requests vs Direct Pushes"
      subtitle="How code gets merged into this repository"
      className={className}
    >
      <div className="space-y-4 font-mono">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
            <span className="text-[10px] uppercase text-slate-400">PR Merges</span>
            <p className="mt-1 text-base font-bold text-cyan-400">
              {formatNumber(data.merge_commits)}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
            <span className="text-[10px] uppercase text-slate-400">Direct Pushes</span>
            <p className="mt-1 text-base font-bold text-emerald-400">
              {formatNumber(data.regular_commits)}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5">
            <span className="text-[10px] uppercase text-slate-400">PR Ratio</span>
            <p className="mt-1 text-base font-bold text-white">
              {formatPercent(data.merge_pct)}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-sans">
            <span className="text-cyan-400">{mergePct}% through Pull Requests</span>
            <span className="text-emerald-400">{regularPct}% Direct Pushes</span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-cyan-400" style={{ width: `${mergePct}%` }} />
            <div className="h-full bg-emerald-400" style={{ width: `${regularPct}%` }} />
          </div>
        </div>
      </div>
    </DashboardPanel>
  )
}
