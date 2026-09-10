import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatDate,
  formatNumber,
} from '@/features/analysis-reports/utils/format-metrics'
import { CheckCircle2, UserX } from 'lucide-react'
import type { InactiveContributor } from '@/types/repository'

interface InactiveContributorsPanelProps {
  data?: InactiveContributor[]
  className?: string
  limit?: number
}

export function InactiveContributorsPanel({
  data,
  className = '',
  limit = 10,
}: InactiveContributorsPanelProps) {
  const items = (data || []).slice(0, limit)

  return (
    <DashboardPanel
      title="Inactive Contributors"
      subtitle="Past contributors who haven't committed lately"
      badge={
        items.length === 0 ? (
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
            0 Inactive
          </span>
        ) : (
          <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
            {items.length} Inactive
          </span>
        )
      }
      className={className}
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-2.5">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="text-xs font-semibold text-slate-200">
            All Contributors Are Active
          </p>
          <p className="mt-1 text-xs text-slate-400 max-w-xs leading-relaxed">
            Everyone who contributed has pushed code recently. Zero inactive contributors.
          </p>
        </div>
      ) : (
        <ul className="max-h-80 space-y-2 overflow-y-auto pr-1 font-mono text-xs">
          {items.map((contributor) => (
            <li
              key={`${contributor.name}-${contributor.last_commit_at}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 transition hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-300">
                  <UserX className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {contributor.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Last active: {formatDate(contributor.last_commit_at)}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-bold text-amber-300">
                {formatNumber(contributor.days_inactive)}d dormant
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardPanel>
  )
}
