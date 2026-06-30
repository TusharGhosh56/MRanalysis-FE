import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export function RegisterPage() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  return <RegisterForm />
}
