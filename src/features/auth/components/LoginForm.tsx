import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginFormValues } from '@/lib/schemas'
import { getErrorMessage } from '@/lib/errors'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormError } from '@/components/ui/FormError'
import { AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { CredentialsFields } from '@/features/auth/components/CredentialsFields'

export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(values: LoginFormValues) {
    setError(null)
    try {
      await login(values.email, values.password)
      const redirectTo =
        (location.state as { from?: string } | null)?.from ?? '/'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to sign in. Please try again.'))
    }
  }

  return (
    <AuthPageShell
      title="Sign in"
      description="Welcome back. Enter your credentials to continue."
      footer={
        <>
          No account?{' '}
          <Link
            to="/register"
            className="font-medium text-accent-teal transition hover:text-green-400"
          >
            Create one
          </Link>
        </>
      }
    >
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <CredentialsFields
            register={register}
            errors={errors}
            passwordAutoComplete="current-password"
          />
          <FormError message={error} />
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingLabel="Signing in…"
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </Card>
    </AuthPageShell>
  )
}
