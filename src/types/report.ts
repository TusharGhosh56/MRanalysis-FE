import type {
  AnalyticsSummary,
  Repository,
  RepositoryMetrics,
  RepositoryStatus,
} from '@/types/repository'

/** Flat shape returned by GET /repositories/{id}/report */
export interface RepositoryReportResponse {
  id: string
  owner: string
  name: string
  url: string
  status: RepositoryStatus
  created_at: string
  analyzed_at: string | null
  stage: string | null
  progress_pct: number
  error_message: string | null
  summary: AnalyticsSummary | null
  computed_at: string | null
  metrics: RepositoryMetrics | null
}

export function toRepository(report: RepositoryReportResponse): Repository {
  return {
    id: report.id,
    owner: report.owner,
    name: report.name,
    url: report.url,
    status: report.status,
    analyzed_at: report.analyzed_at,
    created_at: report.created_at,
  }
}
