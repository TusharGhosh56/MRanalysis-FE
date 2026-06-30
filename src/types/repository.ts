export type RepositoryStatus =
  | 'pending'
  | 'cloning'
  | 'parsing'
  | 'analyzing'
  | 'completed'
  | 'failed'

export interface Repository {
  id: string
  owner: string
  name: string
  url: string
  status: RepositoryStatus
  analyzed_at: string | null
  created_at: string
}

export interface RepositorySummary extends Repository {
  summary?: AnalyticsSummary
}

export interface AnalysisStatus {
  status: RepositoryStatus
  stage: string | null
  progress_pct: number
  error: string | null
}

export interface AnalyticsSummary {
  total_commits: number
  total_contributors: number
  first_commit: string | null
  last_commit: string | null
  avg_commits_per_day: number
}

export interface CommitsPerWeek {
  week: string
  count: number
}

export interface TopContributor {
  name: string
  email: string
  commits: number
  lines_changed: number
}

export interface TopModifiedFile {
  path: string
  change_count: number
  churn_score: number
}

export interface InactiveContributor {
  name: string
  last_commit_at: string
  days_inactive: number
}

export interface BusFactor {
  score: number
  top_contributor_pct: number
}

export interface AnalyticsSnapshot {
  metric_key: string
  payload: unknown
  computed_at: string
}
