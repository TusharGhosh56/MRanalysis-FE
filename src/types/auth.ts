export interface RegisterRequest {
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface GoogleAuthRequest {
  credential?: string
  token?: string
  id_token?: string
}

export interface User {
  id: string
  email: string
  created_at: string
}

export interface TokenResponse {
  access_token: string
  token_type: 'bearer'
}

export interface ApiErrorResponse {
  detail: string | ValidationErrorItem[]
}

export interface ValidationErrorItem {
  type: string
  loc: (string | number)[]
  msg: string
  input?: unknown
}
