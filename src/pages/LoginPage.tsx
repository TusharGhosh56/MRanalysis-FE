import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  return <LoginForm />
}
