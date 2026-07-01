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

/** GET /repositories — wrapped list (not a bare array) */
export interface RepositoryListResponse {
  repositories: Repository[]
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
  total_lines_added?: number
  total_lines_deleted?: number
  total_lines_changed?: number
  merge_commits?: number
  regular_commits?: number
}

export interface CommitsPerWeek {
  week: string
  count: number
}

export interface CommitsByWeekday {
  weekday: string
  count: number
}

export interface CommitsByHour {
  hour: number
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

export interface FolderGrowth {
  path: string
  commits_first_half: number
  commits_second_half: number
  growth_rate: number
}

export interface LargestCommit {
  hash: string
  message: string
  insertions: number
  deletions: number
  committed_at: string
}

export interface CommitMessagePattern {
  category: string
  count: number
}

export interface MergeVsRegular {
  merge_commits: number
  regular_commits: number
  merge_pct: number
}

export interface FileTypeBreakdown {
  extension: string
  change_count: number
  lines_changed: number
}

export interface ContributorTimelineEntry {
  name: string
  email: string
  first_commit_at: string
  last_commit_at: string
  total_commits: number
}

export interface CodeOwnershipEntry {
  path: string
  primary_author: string
  primary_author_email: string
  commit_count: number
  ownership_pct: number
}

export interface ActivityPatterns {
  longest_quiet_days: number
  quiet_period_start: string | null
  quiet_period_end: string | null
  busiest_week: { week: string; count: number }
  avg_commits_per_active_week: number
}

export interface RepositoryMetrics {
  summary: AnalyticsSummary
  commits_per_week: CommitsPerWeek[]
  top_contributors: TopContributor[]
  top_modified_files: TopModifiedFile[]
  inactive_contributors: InactiveContributor[]
  folder_growth: FolderGrowth[]
  bus_factor: BusFactor
  largest_commits: LargestCommit[]
  commits_by_weekday?: CommitsByWeekday[]
  commits_by_hour?: CommitsByHour[]
  commit_message_patterns?: CommitMessagePattern[]
  merge_vs_regular?: MergeVsRegular
  file_type_breakdown?: FileTypeBreakdown[]
  contributor_timeline?: ContributorTimelineEntry[]
  code_ownership?: CodeOwnershipEntry[]
  activity_patterns?: ActivityPatterns
}

export interface AnalyticsSnapshot {
  metric_key: string
  payload: unknown
  computed_at: string
}
