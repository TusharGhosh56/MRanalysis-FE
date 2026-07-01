import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { StatusBadge } from '@/components/StatusBadge'
import { fadeUp } from '@/lib/motion'
import type { Repository, RepositoryStatus } from '@/types/repository'

interface RepositoryDetailHeaderProps {
  repository: Repository
  status: RepositoryStatus
  backTo?: string
  backLabel?: string
}

export function RepositoryDetailHeader({
  repository,
  status,
  backTo = '/',
  backLabel = 'Back to dashboard',
}: RepositoryDetailHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeUp}
    >
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 text-sm text-github-muted transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {backLabel}
      </Link>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {repository.owner}
          <span className="text-github-muted">/</span>
          {repository.name}
        </h1>
        <StatusBadge status={status} />
      </div>
      <p className="mt-2 truncate text-sm text-github-muted">{repository.url}</p>
    </motion.div>
  )
}
