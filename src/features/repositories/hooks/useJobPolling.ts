import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getJob } from '@/api/jobs'
import {
  isJobTerminal,
  JOB_POLL_INTERVAL_MS,
} from '@/features/repositories/constants'
import { getMetricsFromJob } from '@/features/repositories/utils/job-metrics'
import { queryKeys } from '@/lib/query-keys'

export function useJobPolling(jobId: string | null) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: queryKeys.jobs.detail(jobId!),
    queryFn: () => getJob(jobId!),
    enabled: Boolean(jobId),
    refetchInterval: (q) => {
      const status = q.state.data?.status
      if (status && isJobTerminal(status)) return false
      return JOB_POLL_INTERVAL_MS
    },
  })

  const job = query.data ?? null
  const metrics = getMetricsFromJob(job)
  const isPolling = Boolean(
    jobId && job && !isJobTerminal(job.status),
  )
  const isFailed = job?.status === 'failed'
  const isCompleted = job?.status === 'completed'
  const errorMessage = job?.error_message ?? null

  useEffect(() => {
    if (isCompleted) {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    }
  }, [isCompleted, queryClient])

  return {
    query,
    job,
    metrics,
    isPolling,
    isFailed,
    isCompleted,
    errorMessage,
    progress: job?.progress_pct ?? 0,
  }
}
