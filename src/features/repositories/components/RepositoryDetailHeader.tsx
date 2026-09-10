import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, GitBranch, Terminal } from 'lucide-react'
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
  backLabel = 'Back to Audit Reports',
}: RepositoryDetailHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
      className="rounded-2xl border border-white/[0.08] bg-[#0b0e14]/90 p-6 backdrop-blur-xl shadow-[0_12px_32px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{backLabel}</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={repository.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>GitHub Repository</span>
            <ExternalLink className="h-3 w-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Main Title & Metadata */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_-5px_rgba(0,245,160,0.3)]">
            <GitBranch className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                <span className="text-slate-400">{repository.owner}</span>
                <span className="text-slate-600 mx-1.5">/</span>
                <span className="text-white">{repository.name}</span>
              </h1>
              <StatusBadge status={status} />
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-400">
                <Terminal className="h-3 w-3 text-emerald-400" />
                <span>{repository.url}</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">ID: #{repository.id}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
