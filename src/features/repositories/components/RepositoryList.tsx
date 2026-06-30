import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronRight, Trash2 } from 'lucide-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/Button'
import {
  GSAP_DEFAULT_DURATION,
  GSAP_DEFAULT_EASE,
  GSAP_STAGGER,
  prefersReducedMotion,
} from '@/lib/motion'
import type { Repository } from '@/types/repository'

gsap.registerPlugin(useGSAP)

interface RepositoryListProps {
  repositories: Repository[]
  deleteMutation: UseMutationResult<void, Error, string>
}

export function RepositoryList({
  repositories,
  deleteMutation,
}: RepositoryListProps) {
  const listRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.repo-list-item', {
        opacity: 0,
        y: 12,
        duration: GSAP_DEFAULT_DURATION,
        ease: GSAP_DEFAULT_EASE,
        stagger: GSAP_STAGGER,
      })
    },
    { scope: listRef, dependencies: [repositories.length] },
  )

  return (
    <ul ref={listRef} className="space-y-3">
      {repositories.map((repo) => (
        <li key={repo.id}>
          <div className="repo-list-item glass-card group flex flex-col gap-3 rounded-xl p-4 transition hover:border-accent-teal/30 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to={`/repositories/${repo.id}`}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-github-border/40 font-mono text-sm font-medium text-accent-teal">
                {repo.owner[0]?.toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono font-medium text-white transition group-hover:text-accent-teal">
                  {repo.owner}/{repo.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-github-muted">
                  {repo.url}
                </p>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-github-muted opacity-0 transition group-hover:opacity-100 sm:ml-2" />
            </Link>
            <div className="flex items-center gap-2 sm:shrink-0">
              <StatusBadge status={repo.status} />
              <Button
                type="button"
                variant="danger"
                onClick={() => deleteMutation.mutate(repo.id)}
                disabled={deleteMutation.isPending}
                className="px-3 py-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
