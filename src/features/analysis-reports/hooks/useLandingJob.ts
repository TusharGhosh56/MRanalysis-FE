import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRepository } from '@/api/repositories'
import { useJobPolling } from '@/features/repositories/hooks/useJobPolling'
import { queryKeys } from '@/lib/query-keys'

export function useLandingJob() {
  const queryClient = useQueryClient()
  const [activeJobId, setActiveJobId] = useState<string | null>(null)

  const jobPolling = useJobPolling(activeJobId)

  const createMutation = useMutation({
    mutationFn: (url: string) => createRepository(url),
    onSuccess: (data) => {
      setActiveJobId(data.job_id)
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    },
  })

  function resetJob() {
    jobPolling.clearJob()
    setActiveJobId(null)
  }

  const repositoryId =
    jobPolling.repositoryId ?? createMutation.data?.repository_id ?? null

  return {
    createMutation,
    activeJobId,
    repositoryId,
    resetJob,
    isJobPolling: jobPolling.isPolling,
    job: jobPolling.job,
    isCompleted: jobPolling.isCompleted,
    isFailed: jobPolling.isFailed,
    isTimedOut: jobPolling.isTimedOut,
    errorMessage: jobPolling.errorMessage,
  }
}
