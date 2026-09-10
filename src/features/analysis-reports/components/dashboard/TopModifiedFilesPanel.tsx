import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatNumber,
  truncatePath,
} from '@/features/analysis-reports/utils/format-metrics'
import { Flame } from 'lucide-react'
import type { TopModifiedFile } from '@/types/repository'

interface TopModifiedFilesPanelProps {
  data: TopModifiedFile[]
  className?: string
  limit?: number
}

export function TopModifiedFilesPanel({
  data,
  className,
  limit = 10,
}: TopModifiedFilesPanelProps) {
  const items = (data || []).slice(0, limit)

  return (
    <DashboardPanel
      title="Most Edited Files"
      subtitle="Files changed most often (where bugs and conflicts are most likely)"
      className={className}
      isEmpty={items.length === 0}
      emptyMessage="No frequently edited files recorded."
    >
      <ul className="max-h-80 space-y-2 overflow-y-auto pr-1 font-mono text-xs">
        {items.map((file, index) => (
          <li
            key={file.path}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 transition hover:border-white/15 hover:bg-white/[0.04]"
          >
            <span className="w-5 shrink-0 text-center font-bold text-slate-500 group-hover:text-emerald-400">
              #{index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p
                className="truncate font-semibold text-white"
                title={file.path}
              >
                {truncatePath(file.path, 52)}
              </p>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-amber-400">
                  <Flame className="h-3 w-3" />
                  Churn Score: {formatNumber(file.churn_score)}
                </span>
              </div>
            </div>

            <span className="shrink-0 rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-slate-200">
              {formatNumber(file.change_count)}{' '}
              <span className="text-[10px] text-slate-500 font-normal">revisions</span>
            </span>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  )
}
