import type { RepositoryStatus } from '@/types/repository'

export const IN_PROGRESS_STATUSES = new Set<RepositoryStatus>([
  'pending',
  'cloning',
  'parsing',
  'analyzing',
])

export const STATUS_POLL_INTERVAL_MS = 3000

export function isAnalysisInProgress(status: RepositoryStatus): boolean {
  return IN_PROGRESS_STATUSES.has(status)
}
