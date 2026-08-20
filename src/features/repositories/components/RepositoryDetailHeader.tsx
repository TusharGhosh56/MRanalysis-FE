import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { StatusBadge } from '@/components/StatusBadge'
import { fadeUp } from '@/lib/motion'
import type { Repository, RepositoryStatus } from '@/types/repository'

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

interface RepositoryDetailHeaderProps {
  repository: Repository
  status: RepositoryStatus
  backTo?: string
  backLabel?: string
}

export function RepositoryDetailHeader({
  repository,
  status,
  backTo = '/reports',
  backLabel = 'Back to Analysis Reports',
}: RepositoryDetailHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white w-fit"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{backLabel}</span>
        </Link>

        <a
          href={repository.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/20 w-fit"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>View on GitHub</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <GitBranch className="h-5 w-5" />
        </div>
        <h1 className="font-mono text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {repository.owner}
          <span className="text-slate-500 mx-1">/</span>
          <span className="text-amber-300">{repository.name}</span>
        </h1>
        <StatusBadge status={status} />
      </div>

      <p className="mt-2.5 font-mono text-xs text-slate-400">
        Repository URL: <span className="text-slate-300">{repository.url}</span>
      </p>
    </motion.div>
  )
}
