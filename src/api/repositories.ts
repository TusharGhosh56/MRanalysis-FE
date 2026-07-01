import { apiRequest } from '@/api/client'
import type { CreateRepositoryResponse } from '@/types/job'
import type {
  AnalysisStatus,
  AnalyticsSnapshot,
  Repository,
  RepositorySummary,
} from '@/types/repository'

export async function listRepositories(): Promise<Repository[]> {
  return apiRequest<Repository[]>('/repositories')
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
