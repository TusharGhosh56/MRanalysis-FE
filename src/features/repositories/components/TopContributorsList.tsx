import { Card } from '@/components/ui/Card'
import type { TopContributor } from '@/types/repository'

interface TopContributorsListProps {
  contributors: TopContributor[] | null
  limit?: number
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
}: TopContributorsListProps) {
  const items = contributors?.slice(0, limit) ?? []

  return (
    <Card hover>
      <h2 className="mb-4 text-lg font-semibold text-white">Top contributors</h2>
      {items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((contributor, index) => (
            <li
              key={contributor.email}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-white/5"
            >
              <span className="w-5 shrink-0 text-center text-xs font-medium text-github-muted">
                {index + 1}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-github-accent/20 text-xs font-semibold text-accent-teal">
                {getInitials(contributor.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{contributor.name}</p>
                <p className="truncate text-xs text-github-muted">
                  {contributor.email}
                </p>
              </div>
              <span className="shrink-0 rounded-md bg-github-border/40 px-2 py-0.5 font-mono text-xs text-gray-300">
                {contributor.commits}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-github-muted">No contributor data yet.</p>
      )}
    </Card>
  )
}
