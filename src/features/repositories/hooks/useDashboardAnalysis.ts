import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createRepository,
  deleteRepository,
  listRepositories,
} from '@/api/repositories'
import { useJobPolling } from '@/features/repositories/hooks/useJobPolling'
import { queryKeys } from '@/lib/query-keys'

export function useDashboardAnalysis() {
  const queryClient = useQueryClient()
  const [activeJobId, setActiveJobId] = useState<string | null>(null)

  const listQuery = useQuery({
    queryKey: queryKeys.repositories.all,
    queryFn: listRepositories,
  })

  const jobPolling = useJobPolling(activeJobId)

  const createMutation = useMutation({
    mutationFn: (url: string) => createRepository(url),
    onSuccess: (data) => {
      setActiveJobId(data.job_id)
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRepository(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    },
  })

  function clearJob() {
    setActiveJobId(null)
    if (activeJobId) {
      queryClient.removeQueries({ queryKey: queryKeys.jobs.detail(activeJobId) })
    }
  }

  return {
    listQuery,
    createMutation,
    deleteMutation,
    activeJobId,
    clearJob,
    ...jobPolling,
  }
}
