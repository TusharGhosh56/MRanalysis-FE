import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronRight, Trash2 } from 'lucide-react'
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

const GRADIENTS = [
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-pink-500',
  'from-indigo-400 to-violet-500',
]

function getAvatarGradient(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % GRADIENTS.length
  return GRADIENTS[index]
}

export function AnalysisReportList({
  repositories,
  deleteMutation,
}: AnalysisReportListProps) {
  const shouldReduceMotion = useReducedMotion()
  const List = shouldReduceMotion ? 'ul' : motion.ul
  const Item = shouldReduceMotion ? 'li' : motion.li

  const listProps = shouldReduceMotion
    ? { className: 'space-y-4' }
    : {
        className: 'space-y-4',
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
        const gradient = getAvatarGradient(repo.owner + repo.name)

        return (
          <Item key={repo.id} {...itemProps}>
            <div
              className={`group relative flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 sm:flex-row sm:items-center backdrop-blur-xl transition-all duration-300 ${
                isOpenable
                  ? 'hover:border-amber-400/40 hover:bg-slate-900/80 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(245,158,11,0.15)]'
                  : ''
              }`}
            >
              {/* Top highlight line on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-amber-400/40"
                aria-hidden
              />

              {isOpenable ? (
                <Link
                  to={`/reports/${repo.id}`}
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${gradient} font-mono text-sm font-extrabold text-slate-950 shadow-md`}
                  >
                    {repo.owner[0]?.toUpperCase() || 'R'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-mono text-base font-bold text-white transition group-hover:text-amber-300">
                        {repo.owner}/{repo.name}
                      </p>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-xs text-slate-400">
                      {repo.url}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-amber-300" />
                </Link>
              ) : (
                <div
                  className="flex min-w-0 flex-1 cursor-default items-center gap-4"
                  title={
                    inProgress
                      ? 'Report available when background analysis completes'
                      : undefined
                  }
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${gradient} font-mono text-sm font-extrabold text-slate-950 shadow-md opacity-75`}
                  >
                    {repo.owner[0]?.toUpperCase() || 'R'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-base font-bold text-slate-300">
                      {repo.owner}/{repo.name}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-xs text-slate-500">
                      {repo.url}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 sm:shrink-0">
                <StatusBadge status={repo.status} />

                {isOpenable && (
                  <Link to={`/reports/${repo.id}`}>
                    <Button variant="secondary" size="sm" className="rounded-xl px-3 py-1.5 text-xs">
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
                  className="rounded-xl px-2.5 py-1.5"
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
