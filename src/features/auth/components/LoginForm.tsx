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
import { GoogleAuthButton } from '@/features/auth/components/GoogleAuthButton'

interface LoginFormProps {
  onToggleMode?: () => void
}

export function LoginForm({ onToggleMode }: LoginFormProps = {}) {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? '/'

  async function onSubmit(values: LoginFormValues) {
    setError(null)
    try {
      await login(values.email, values.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to sign in. Please try again.'))
    }
  }

  async function handleGoogleSuccess(credential: string) {
    setError(null)
    setIsGoogleLoading(true)
    try {
      await loginWithGoogle(credential)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Google Sign-In failed. Please try again.'))
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <AuthPageShell
      title="Sign in"
      description="Welcome back. Enter your credentials to continue."
      footer={
        <>
          No account?{' '}
          {onToggleMode ? (
            <button
              type="button"
              onClick={onToggleMode}
              className="font-medium text-accent-teal transition hover:text-green-400"
            >
              Create one
            </button>
          ) : (
            <Link
              to="/register"
              className="font-medium text-accent-teal transition hover:text-green-400"
            >
              Create one
            </Link>
          )}
        </>
      }
    >
      <Card>
        <div className="space-y-5">
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
              disabled={isGoogleLoading}
              className="w-full"
            >
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="w-full border-t border-white/[0.08]" />
            <span className="absolute bg-[#0b0e14] px-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              or continue with
            </span>
          </div>

          {/* Google Sign-in */}
          <GoogleAuthButton
            onSuccess={handleGoogleSuccess}
            onError={(err) => setError(err.message)}
            disabled={isSubmitting}
            isLoading={isGoogleLoading}
            text="Sign in with Google"
          />
        </div>
      </Card>
    </AuthPageShell>
  )
}
