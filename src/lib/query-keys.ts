export const queryKeys = {
  repositories: {
    all: ['repositories'] as const,
  },
  repository: {
    detail: (id: string) => ['repository', id] as const,
    status: (id: string) => ['repository-status', id] as const,
    analytics: (id: string) => ['repository-analytics', id] as const,
  },
  jobs: {
    detail: (jobId: string) => ['job', jobId] as const,
  },
} as const
