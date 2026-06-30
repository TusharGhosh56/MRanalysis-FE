import { clearToken, getToken } from '@/lib/auth-storage'
import { API_BASE_URL } from '@/lib/config'
import type { ApiErrorResponse } from '@/types/auth'

export { API_BASE_URL }

export class ApiClientError extends Error {
  status: number
  body: ApiErrorResponse | null

  constructor(message: string, status: number, body: ApiErrorResponse | null = null) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.body = body
  }
}

export function formatApiError(body: ApiErrorResponse): string {
  if (typeof body.detail === 'string') return body.detail
  return body.detail.map((item) => item.msg).join(', ')
}

async function parseErrorResponse(
  response: Response,
): Promise<{ message: string; body: ApiErrorResponse | null }> {
  try {
    const body = (await response.json()) as ApiErrorResponse
    return { message: formatApiError(body), body }
  } catch {
    return { message: response.statusText || 'Request failed', body: null }
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  auth?: boolean
}

export async function apiFetch(
  path: string,
  init: RequestInit & { auth?: boolean } = {},
): Promise<Response> {
  const { auth = true, headers, ...rest } = init
  const token = auth ? getToken() : null

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...(rest.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  if (response.status === 401) {
    clearToken()
  }

  return response
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, auth = true, headers, ...rest } = options

  const response = await apiFetch(path, {
    ...rest,
    auth,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const { message, body: errorBody } = await parseErrorResponse(response)
    throw new ApiClientError(message, response.status, errorBody)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
