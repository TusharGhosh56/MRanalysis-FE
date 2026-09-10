import { apiRequest } from '@/api/client'
import { setToken } from '@/lib/auth-storage'
import type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  User,
} from '@/types/auth'

export async function register(body: RegisterRequest): Promise<User> {
  return apiRequest<User>('/auth/register', {
    method: 'POST',
    body,
    auth: false,
  })
}

export async function login(body: LoginRequest): Promise<TokenResponse> {
  const data = await apiRequest<TokenResponse>('/auth/login', {
    method: 'POST',
    body,
    auth: false,
  })
  setToken(data.access_token)
  return data
}

export async function loginWithGoogle(credential: string): Promise<TokenResponse> {
  const data = await apiRequest<TokenResponse>('/auth/google', {
    method: 'POST',
    body: { credential, token: credential, id_token: credential },
    auth: false,
  })
  setToken(data.access_token)
  return data
}

export async function getMe(): Promise<User> {
  return apiRequest<User>('/auth/me')
}
