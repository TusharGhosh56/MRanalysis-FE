import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronRight, GitBranch, Trash2 } from 'lucide-react'
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
              className={`group relative flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#0b0e14]/90 p-4 sm:flex-row sm:items-center backdrop-blur-xl shadow-sm transition-all duration-200 ${
                isOpenable
                  ? 'hover:border-white/20 hover:bg-[#10151f]'
                  : 'opacity-85'
              }`}
            >
              {/* Top highlight line on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-emerald-500/30"
                aria-hidden
              />

              {isOpenable ? (
                <Link
                  to={`/reports/${repo.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 group-hover:border-emerald-500/40 transition">
                    <GitBranch className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1 font-mono">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold text-white transition group-hover:text-emerald-300">
                        <span className="text-slate-400">{repo.owner}</span>
                        <span className="text-slate-600 mx-1">/</span>
                        <span>{repo.name}</span>
                      </p>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-slate-500">
                      {repo.url}
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-400" />
                </Link>
              ) : (
                <div
                  className="flex min-w-0 flex-1 cursor-default items-center gap-3.5"
                  title={
                    inProgress
                      ? 'Report available when background analysis completes'
                      : undefined
                  }
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-500">
                    <GitBranch className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1 font-mono">
                    <p className="truncate text-sm font-bold text-slate-300">
                      {repo.owner}/{repo.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-slate-500">
                      {repo.url}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5 sm:shrink-0">
                <StatusBadge status={repo.status} />

                {isOpenable && (
                  <Link to={`/reports/${repo.id}`}>
                    <Button variant="secondary" size="sm" className="rounded-lg px-3 py-1.5 text-xs font-mono">
                      <span>View</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                )}

                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => deleteMutation.mutate(repo.id)}
                  disabled={deleteMutation.isPending}
                  className="rounded-lg px-2.5 py-1.5"
                  title="Delete analysis report"
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
