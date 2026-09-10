import { formatNumber } from '@/features/analysis-reports/utils/format-metrics'
import type { TopContributor } from '@/types/repository'

interface TopContributorsListProps {
  contributors: TopContributor[] | null
  limit?: number
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function TopContributorsList({
  contributors,
  limit = 10,
  className = '',
}: TopContributorsListProps) {
  const items = contributors?.slice(0, limit) ?? []
  const maxCommits = items.length > 0 ? items[0].commits : 1

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0e14]/90 p-5 backdrop-blur-xl shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-200 hover:border-white/15 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Top Contributors
          </h3>
          <p className="text-xs text-slate-400">
            Ranked by total commits contributed
          </p>
        </div>
        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
          {items.length} {items.length === 1 ? 'Contributor' : 'Contributors'}
        </span>
      </div>

      {items.length > 0 ? (
        <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {items.map((contributor, index) => {
            const pct = Math.round((contributor.commits / maxCommits) * 100)
            return (
              <li
                key={contributor.email}
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5 transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 shrink-0 text-center font-mono text-xs font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                    #{index + 1}
                  </span>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#161e2c] font-mono text-[10px] font-bold text-slate-200">
                    {getInitials(contributor.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs font-semibold text-white">
                      {contributor.name}
                    </p>
                    <p className="truncate font-mono text-[10px] text-slate-500">
                      {contributor.email}
                    </p>
                  </div>

                  <div className="shrink-0 text-right font-mono">
                    <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-bold text-emerald-300">
                      {formatNumber(contributor.commits)}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">commits</span>
                    </span>
                  </div>
                </div>

                {/* Relative commit weight progress bar */}
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-emerald-400/70 transition-all duration-300 group-hover:bg-emerald-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="py-12 text-center font-mono text-xs text-slate-500">
          No contributor records found.
        </p>
      )}
    </div>
  )
}
