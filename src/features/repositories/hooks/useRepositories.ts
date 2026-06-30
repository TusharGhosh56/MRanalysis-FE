import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createRepository,
  deleteRepository,
  listRepositories,
} from '@/api/repositories'
import { queryKeys } from '@/lib/query-keys'

export function useRepositories() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: queryKeys.repositories.all,
    queryFn: listRepositories,
  })

  const createMutation = useMutation({
    mutationFn: (url: string) => createRepository(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRepository(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all })
    },
  })

  return { listQuery, createMutation, deleteMutation }
}
