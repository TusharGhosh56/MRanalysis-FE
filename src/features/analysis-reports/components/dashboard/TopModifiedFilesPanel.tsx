import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatNumber,
  truncatePath,
} from '@/features/analysis-reports/utils/format-metrics'
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
  const items = data.slice(0, limit)
  if (items.length === 0) return null

  return (
    <DashboardPanel
      title="Top modified files"
      subtitle="By change count and churn"
      className={className}
    >
      <ul className="max-h-80 space-y-2 overflow-y-auto">
        {items.map((file, index) => (
          <li
            key={file.path}
            className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5"
          >
            <span className="w-5 shrink-0 text-center text-xs text-github-muted">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="truncate font-mono text-sm text-white"
                title={file.path}
              >
                {truncatePath(file.path, 56)}
              </p>
              <p className="text-xs text-github-muted">
                Churn {formatNumber(file.churn_score)}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs text-gray-300">
              {formatNumber(file.change_count)}
            </span>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  )
}
