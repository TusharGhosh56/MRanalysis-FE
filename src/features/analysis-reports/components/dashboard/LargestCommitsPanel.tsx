import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatDate,
  formatNumber,
} from '@/features/analysis-reports/utils/format-metrics'
import { GitCommit } from 'lucide-react'
import type { LargestCommit } from '@/types/repository'

interface LargestCommitsPanelProps {
  data: LargestCommit[]
  className?: string
  limit?: number
}

export function LargestCommitsPanel({
  data,
  className,
  limit = 8,
}: LargestCommitsPanelProps) {
  const items = (data || []).slice(0, limit)

  return (
    <DashboardPanel
      title="Largest Commits"
      subtitle="Commits with the biggest code additions and deletions"
      className={className}
      isEmpty={items.length === 0}
      emptyMessage="No unusually large commits detected."
    >
      <ul className="max-h-80 space-y-2.5 overflow-y-auto pr-1 font-mono text-xs">
        {items.map((commit) => (
          <li
            key={commit.hash}
            className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <GitCommit className="h-3.5 w-3.5" />
                <span className="font-bold">{commit.hash}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {formatDate(commit.committed_at)}
              </span>
            </div>

            <p className="mt-1.5 line-clamp-2 text-xs font-normal text-slate-300">
              {commit.message}
            </p>

            <div className="mt-2 flex items-center gap-3 text-[11px]">
              <span className="text-emerald-400 font-semibold">
                +{formatNumber(commit.insertions)} lines
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-rose-400 font-semibold">
                -{formatNumber(commit.deletions)} lines
              </span>
            </div>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  )
}
