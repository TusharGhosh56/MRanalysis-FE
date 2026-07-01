import { apiRequest } from '@/api/client'
import type { JobResponse } from '@/types/job'

export async function getJob(jobId: string): Promise<JobResponse> {
  return apiRequest<JobResponse>(`/jobs/${jobId}`)
}
