import type { RepositoryStatus } from '@/types/repository'
import { isAnalysisInProgress } from '@/features/repositories/constants'

const statusStyles: Record<RepositoryStatus, string> = {
  pending: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  cloning: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
  parsing: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
  analyzing: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
  completed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  failed: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
}

const dotColors: Record<RepositoryStatus, string> = {
  pending: 'bg-amber-400',
  cloning: 'bg-cyan-400',
  parsing: 'bg-cyan-400',
  analyzing: 'bg-cyan-400',
  completed: 'bg-emerald-400',
  failed: 'bg-rose-400',
}

interface StatusBadgeProps {
  status: RepositoryStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const inProgress = isAnalysisInProgress(status)

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium capitalize ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotColors[status]} ${inProgress ? 'animate-pulse-dot' : ''}`}
        aria-hidden
      />
      {status}
    </span>
  )
}
