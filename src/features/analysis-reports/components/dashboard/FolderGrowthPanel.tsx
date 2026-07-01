import { DashboardPanel } from '@/features/analysis-reports/components/dashboard/DashboardPanel'
import {
  formatNumber,
  truncatePath,
} from '@/features/analysis-reports/utils/format-metrics'
import type { FolderGrowth } from '@/types/repository'

interface FolderGrowthPanelProps {
  data: FolderGrowth[]
  className?: string
  limit?: number
}

export function FolderGrowthPanel({
  data,
  className,
  limit = 10,
}: FolderGrowthPanelProps) {
  const items = [...data]
    .sort((a, b) => b.growth_rate - a.growth_rate)
    .slice(0, limit)
  if (items.length === 0) return null

  return (
    <DashboardPanel
      title="Folder growth"
      subtitle="Commits first vs second half of history"
      className={className}
    >
      <div className="max-h-80 overflow-x-auto overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-github-muted">
              <th className="pb-2 pr-3 font-medium">Path</th>
              <th className="pb-2 pr-3 font-medium">1st half</th>
              <th className="pb-2 pr-3 font-medium">2nd half</th>
              <th className="pb-2 font-medium">Growth</th>
            </tr>
          </thead>
          <tbody>
            {items.map((folder) => (
              <tr
                key={folder.path}
                className="border-t border-github-border/30"
              >
                <td
                  className="max-w-[12rem] truncate py-2 pr-3 font-mono text-white"
                  title={folder.path}
                >
                  {truncatePath(folder.path, 32)}
                </td>
                <td className="py-2 pr-3 text-github-muted">
                  {formatNumber(folder.commits_first_half)}
                </td>
                <td className="py-2 pr-3 text-github-muted">
                  {formatNumber(folder.commits_second_half)}
                </td>
                <td className="py-2 font-medium text-accent-teal">
                  {folder.growth_rate.toFixed(2)}×
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  )
}
