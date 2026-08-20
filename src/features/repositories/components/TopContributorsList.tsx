import { Card } from '@/components/ui/Card'
import type { TopContributor } from '@/types/repository'

interface TopContributorsListProps {
  contributors: TopContributor[] | null
  limit?: number
  className?: string
}

const GRADIENTS = [
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-500',
  'from-indigo-400 to-violet-500',
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function getAvatarGradient(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % GRADIENTS.length
  return GRADIENTS[index]
}

export function TopContributorsList({
  contributors,
  limit = 10,
  className = '',
}: TopContributorsListProps) {
  const items = contributors?.slice(0, limit) ?? []

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-white">Top Code Authors</h2>
          <p className="text-xs text-slate-400">Ranked by historical commit volume</p>
        </div>
        <span className="font-mono text-xs text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
          {items.length} Authors
        </span>
      </div>

      {items.length > 0 ? (
        <ul className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
          {items.map((contributor, index) => {
            const gradient = getAvatarGradient(contributor.name)
            return (
              <li
                key={contributor.email}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-2.5 transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                <span className="w-5 shrink-0 text-center font-mono text-xs font-bold text-amber-400/80">
                  #{index + 1}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${gradient} font-mono text-[11px] font-extrabold text-slate-950 shadow-sm`}
                >
                  {getInitials(contributor.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-semibold text-white">
                    {contributor.name}
                  </p>
                  <p className="truncate font-mono text-[11px] text-slate-500">
                    {contributor.email}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs font-bold text-amber-300">
                    {contributor.commits} <span className="text-[10px] text-slate-400 font-normal">commits</span>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">No contributor data available.</p>
      )}
    </Card>
  )
}
