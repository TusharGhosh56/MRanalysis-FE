import type { RepositoryStatus } from '@/types/repository'
import { isAnalysisInProgress } from '@/features/repositories/constants'

const statusStyles: Record<RepositoryStatus, string> = {
  pending: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
  cloning: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  parsing: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  analyzing: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  completed: 'bg-green-500/15 text-green-300 border-green-500/30',
  failed: 'bg-red-500/15 text-red-300 border-red-500/30',
}

const dotColors: Record<RepositoryStatus, string> = {
  pending: 'bg-yellow-400',
  cloning: 'bg-blue-400',
  parsing: 'bg-blue-400',
  analyzing: 'bg-purple-400',
  completed: 'bg-green-400',
  failed: 'bg-red-400',
}

interface StatusBadgeProps {
  status: RepositoryStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const inProgress = isAnalysisInProgress(status)

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotColors[status]} ${inProgress ? 'animate-pulse-dot' : ''}`}
        aria-hidden
      />
      {status}
    </span>
  )
}
