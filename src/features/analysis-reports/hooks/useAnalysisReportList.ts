import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteRepository, listRepositories } from '@/api/repositories'
import {
  isAnalysisInProgress,
  REPORT_LIST_REFRESH_MS,
} from '@/features/repositories/constants'
import { queryKeys } from '@/lib/query-keys'

export function useAnalysisReportList() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: queryKeys.repositories.all,
    queryFn: listRepositories,
    refetchInterval: (query) => {
      const repos = query.state.data
      if (!Array.isArray(repos)) return false
      const hasInProgress = repos.some((repo) =>
        isAnalysisInProgress(repo.status),
      )
      return hasInProgress ? REPORT_LIST_REFRESH_MS : false
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRepository(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    },
  })

  const repositories = (listQuery.data ?? []).filter(
    (repo) => repo.status !== 'failed',
  )

  return { listQuery, deleteMutation, repositories }
}
