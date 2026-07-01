import type {
  AnalyticsSummary,
  BusFactor,
  CommitsPerWeek,
  FolderGrowth,
  InactiveContributor,
  LargestCommit,
  Repository,
  RepositoryMetrics,
  RepositoryStatus,
  TopContributor,
  TopModifiedFile,
} from '@/types/repository'

export interface CreateRepositoryResponse {
  job_id: string
  repository_id: string
  owner: string
  name: string
  url: string
  status: RepositoryStatus
  created_at: string
}

export interface JobResponse {
  job_id: string
  repository_id: string
  status: RepositoryStatus
  stage: string | null
  progress_pct: number
  error_message: string | null
  result: JobResult | null
}

export interface JobResult {
  repository: Repository
  computed_at: string
  metrics: RepositoryMetrics
}

export type {
  AnalyticsSummary,
  BusFactor,
  CommitsPerWeek,
  FolderGrowth,
  InactiveContributor,
  LargestCommit,
  RepositoryMetrics,
  TopContributor,
  TopModifiedFile,
}
