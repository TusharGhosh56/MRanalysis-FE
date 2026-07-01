import type { JobResponse } from '@/types/job'
import type { RepositoryStatus } from '@/types/repository'

export const IN_PROGRESS_STATUSES = new Set<RepositoryStatus>([
  'pending',
  'cloning',
  'parsing',
  'analyzing',
])

export const STATUS_POLL_INTERVAL_MS = 3000
export const JOB_POLL_INTERVAL_MS = 2500
export const JOB_MAX_POLL_DURATION_MS = 240_000
export const REPORT_LIST_REFRESH_MS = 10_000
export const REPORT_DETAIL_POLL_MS = 7_000

export const JOB_POLL_TIMEOUT_MESSAGE =
  'Analysis is taking longer than expected. The process is continuing in the background. View its status on the Analysis Reports page.'

export function isAnalysisInProgress(status: RepositoryStatus): boolean {
  return IN_PROGRESS_STATUSES.has(status)
}

export function isReportTerminal(status: RepositoryStatus): boolean {
  return status === 'completed' || status === 'failed'
}

export function isJobTerminal(status: RepositoryStatus): boolean {
  return isReportTerminal(status)
}

export function shouldStopJobPolling(
  job: JobResponse | undefined,
  clientTimedOut = false,
): boolean {
  if (!job) return clientTimedOut
  if (clientTimedOut) return true
  if (job.polling_timed_out) return true
  return isJobTerminal(job.status)
}

export function getJobErrorMessage(
  job: JobResponse | null | undefined,
  clientTimedOut = false,
): string | null {
  if (clientTimedOut) {
    return JOB_POLL_TIMEOUT_MESSAGE
  }
  if (!job) return null
  if (job.polling_timed_out) {
    return job.error_message ?? JOB_POLL_TIMEOUT_MESSAGE
  }
  if (job.status === 'failed') {
    return job.error_message
  }
  return null
}
