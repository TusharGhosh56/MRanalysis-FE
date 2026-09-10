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
  return (
    <DashboardPanel
      title="Fastest Growing Folders"
      subtitle="Where new code and features are being added most"
      className={className}
      isEmpty={items.length === 0}
      emptyMessage="Single folder project — No multiple directories to compare."
    >
      <div className="max-h-80 overflow-x-auto overflow-y-auto font-mono text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.08] text-xs text-slate-400 font-sans">
              <th className="pb-2 pr-3 font-medium">Folder</th>
              <th className="pb-2 pr-3 font-medium text-right">Earlier Commits</th>
              <th className="pb-2 pr-3 font-medium text-right">Recent Commits</th>
              <th className="pb-2 font-medium text-right">Growth Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {items.map((folder) => (
              <tr
                key={folder.path}
                className="transition hover:bg-white/[0.02]"
              >
                <td
                  className="max-w-[14rem] truncate py-2.5 pr-3 font-semibold text-white"
                  title={folder.path}
                >
                  {truncatePath(folder.path, 34)}
                </td>
                <td className="py-2.5 pr-3 text-right text-slate-400">
                  {formatNumber(folder.commits_first_half)}
                </td>
                <td className="py-2.5 pr-3 text-right text-slate-400">
                  {formatNumber(folder.commits_second_half)}
                </td>
                <td className="py-2.5 text-right font-bold">
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-300">
                    {folder.growth_rate.toFixed(2)}×
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  )
}
