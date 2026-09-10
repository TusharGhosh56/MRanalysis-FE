import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatPercent,
  truncatePath,
} from '@/features/analysis-reports/utils/format-metrics'
import type { CodeOwnershipEntry } from '@/types/repository'

interface CodeOwnershipPanelProps {
  data?: CodeOwnershipEntry[]
  className?: string
  limit?: number
}

export function CodeOwnershipPanel({
  data,
  className,
  limit = 10,
}: CodeOwnershipPanelProps) {
  const items = (data || []).slice(0, limit)

  return (
    <DashboardPanel
      title="Who Owns What Code"
      subtitle="The primary author responsible for each key file"
      className={className}
      isEmpty={items.length === 0}
      emptyMessage="No file ownership concentration recorded for this repository."
    >
      <ul className="max-h-80 space-y-2.5 overflow-y-auto pr-1 font-mono text-xs">
        {items.map((entry) => {
          const pct = Math.min(100, Math.round(entry.ownership_pct * 100))
          const isDominant = pct >= 80

          return (
            <li
              key={entry.path}
              className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p
                  className="min-w-0 truncate font-semibold text-white"
                  title={entry.path}
                >
                  {truncatePath(entry.path, 44)}
                </p>

                <span
                  className={`rounded border px-2 py-0.5 text-[11px] font-bold ${
                    isDominant
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  }`}
                  title={`${entry.primary_author} made ${formatPercent(entry.ownership_pct)} of commits to this file`}
                >
                  {formatPercent(entry.ownership_pct)} share
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>{entry.primary_author}</span>
                <span className="text-slate-500">{entry.commit_count} commits</span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isDominant ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </DashboardPanel>
  )
}
