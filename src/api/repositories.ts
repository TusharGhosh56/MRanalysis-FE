import { apiRequest } from '@/api/client'
import type { CreateRepositoryResponse } from '@/types/job'
import type {
  AnalysisStatus,
  AnalyticsSnapshot,
  Repository,
  RepositorySummary,
} from '@/types/repository'

function parseRepositoryList(data: unknown): Repository[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    for (const key of ['repositories', 'items', 'data']) {
      const value = record[key]
      if (Array.isArray(value)) return value as Repository[]
    }
  }
  return []
}

export async function listRepositories(): Promise<Repository[]> {
  const data = await apiRequest<unknown>('/repositories')
  return parseRepositoryList(data)
}

export async function getRepository(id: string): Promise<RepositorySummary> {
  return apiRequest<RepositorySummary>(`/repositories/${id}`)
}

export async function createRepository(
  url: string,
): Promise<CreateRepositoryResponse> {
  return apiRequest<CreateRepositoryResponse>('/repositories', {
    method: 'POST',
    body: { url },
  })
}

export async function deleteRepository(id: string): Promise<void> {
  return apiRequest<void>(`/repositories/${id}`, { method: 'DELETE' })
}

export async function reanalyzeRepository(id: string): Promise<void> {
  return apiRequest<void>(`/repositories/${id}/reanalyze`, {
    method: 'POST',
  })
}

export async function getRepositoryStatus(
  id: string,
): Promise<AnalysisStatus> {
  return apiRequest<AnalysisStatus>(`/repositories/${id}/status`)
}

export async function getRepositoryAnalytics(
  id: string,
): Promise<AnalyticsSnapshot[]> {
  return apiRequest<AnalyticsSnapshot[]>(`/repositories/${id}/analytics`)
}

export async function getRepositoryMetric<T>(
  id: string,
  metric: string,
): Promise<AnalyticsSnapshot & { payload: T }> {
  return apiRequest<AnalyticsSnapshot & { payload: T }>(
    `/repositories/${id}/analytics/${metric}`,
  )
}
