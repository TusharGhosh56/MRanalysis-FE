import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, Trash2 } from 'lucide-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/Button'
import { isAnalysisInProgress } from '@/features/repositories/constants'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { Repository } from '@/types/repository'

interface AnalysisReportListProps {
  repositories: Repository[]
  deleteMutation: UseMutationResult<void, Error, string>
}

function ReportRowContent({ repo }: { repo: Repository }) {
  const isOpenable = repo.status === 'completed'

  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-github-border/40 font-mono text-sm font-medium text-accent-teal">
        {repo.owner[0]?.toUpperCase()}
      </span>
      <div className="min-w-0">
        <p
          className={`truncate font-mono font-medium text-white ${isOpenable ? 'transition group-hover:text-accent-teal' : ''}`}
        >
          {repo.owner}/{repo.name}
        </p>
        <p className="mt-0.5 truncate text-xs text-github-muted">{repo.url}</p>
      </div>
      {isOpenable && (
        <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-github-muted opacity-0 transition group-hover:opacity-100 sm:ml-2" />
      )}
    </>
  )
}

export function AnalysisReportList({
  repositories,
  deleteMutation,
}: AnalysisReportListProps) {
  const shouldReduceMotion = useReducedMotion()
  const List = shouldReduceMotion ? 'ul' : motion.ul
  const Item = shouldReduceMotion ? 'li' : motion.li

  const listProps = shouldReduceMotion
    ? { className: 'space-y-3' }
    : {
        className: 'space-y-3',
        variants: staggerContainer,
        initial: 'hidden' as const,
        animate: 'visible' as const,
      }

  const itemProps = shouldReduceMotion ? {} : { variants: fadeUp }

  return (
    <List {...listProps}>
      {repositories.map((repo) => {
        const isOpenable = repo.status === 'completed'
        const inProgress = isAnalysisInProgress(repo.status)

        return (
          <Item key={repo.id} {...itemProps}>
            <div
              className={`glass-card flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between ${isOpenable ? 'group transition hover:border-accent-teal/30' : ''}`}
            >
              {isOpenable ? (
                <Link
                  to={`/reports/${repo.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <ReportRowContent repo={repo} />
                </Link>
              ) : (
                <div
                  className="flex min-w-0 flex-1 cursor-default items-center gap-3"
                  title={
                    inProgress
                      ? 'Report available when analysis completes'
                      : undefined
                  }
                >
                  <ReportRowContent repo={repo} />
                </div>
              )}
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
          </Item>
        )
      })}
    </List>
  )
}
