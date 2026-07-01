import type { JobResponse } from '@/types/job'
import type { RepositoryMetrics } from '@/types/repository'

export function getMetricsFromJob(
  job: JobResponse | null | undefined,
): RepositoryMetrics | null {
  if (!job || job.status !== 'completed' || !job.result?.metrics) {
    return null
  }
  return job.result.metrics
}
