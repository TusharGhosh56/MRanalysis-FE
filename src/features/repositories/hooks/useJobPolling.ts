import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { getJob } from '@/api/jobs'
import {
  getJobErrorMessage,
  JOB_MAX_POLL_DURATION_MS,
  JOB_POLL_INTERVAL_MS,
  shouldStopJobPolling,
} from '@/features/repositories/constants'
import { queryKeys } from '@/lib/query-keys'

export function useJobPolling(jobId: string | null) {
  const queryClient = useQueryClient()
  const pollStartedAtRef = useRef<number | null>(null)
  const [clientTimedOut, setClientTimedOut] = useState(false)

  useEffect(() => {
    if (jobId) {
      pollStartedAtRef.current = Date.now()
      setClientTimedOut(false)
      return
    }
    pollStartedAtRef.current = null
    setClientTimedOut(false)
  }, [jobId])

  const query = useQuery({
    queryKey: queryKeys.jobs.detail(jobId!),
    queryFn: () => getJob(jobId!),
    enabled: Boolean(jobId) && !clientTimedOut,
    refetchInterval: (q) => {
      if (clientTimedOut) return false
      if (pollStartedAtRef.current !== null) {
        const elapsed = Date.now() - pollStartedAtRef.current
        if (elapsed >= JOB_MAX_POLL_DURATION_MS) {
          setClientTimedOut(true)
          return false
        }
      }
      if (shouldStopJobPolling(q.state.data)) return false
      return JOB_POLL_INTERVAL_MS
    },
  })

  const job = query.data ?? null
  const isTimedOut = clientTimedOut || job?.polling_timed_out === true
  const isCompleted = job?.status === 'completed' && !isTimedOut
  const isFailed = job?.status === 'failed' || isTimedOut
  const isPolling = Boolean(
    jobId && !isTimedOut && job && !shouldStopJobPolling(job),
  )
  const errorMessage = getJobErrorMessage(job, clientTimedOut)
  const repositoryId = job?.repository_id ?? null

  useEffect(() => {
    if (isCompleted) {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    }
  }, [isCompleted, queryClient])

  return {
    query,
    job,
    repositoryId,
    isPolling,
    isFailed,
    isCompleted,
    isTimedOut,
    errorMessage,
    progress: job?.progress_pct ?? 0,
    clearJob: () => {
      if (jobId) {
        queryClient.removeQueries({ queryKey: queryKeys.jobs.detail(jobId) })
      }
      pollStartedAtRef.current = null
      setClientTimedOut(false)
    },
  }
}
