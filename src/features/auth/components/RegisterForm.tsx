import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/useAuth'
import { registerSchema, type RegisterFormValues } from '@/lib/schemas'
import { getErrorMessage } from '@/lib/errors'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormError } from '@/components/ui/FormError'
import { AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { CredentialsFields } from '@/features/auth/components/CredentialsFields'
import { GoogleAuthButton } from '@/features/auth/components/GoogleAuthButton'

interface RegisterFormProps {
  onToggleMode?: () => void
}

export function RegisterForm({ onToggleMode }: RegisterFormProps = {}) {
  const { register: registerUser, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(values: RegisterFormValues) {
    setError(null)
    try {
      await registerUser(values.email, values.password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(
        getErrorMessage(err, 'Unable to create account. Please try again.'),
      )
    }
  }

  async function handleGoogleSuccess(credential: string) {
    setError(null)
    setIsGoogleLoading(true)
    try {
      await loginWithGoogle(credential)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, 'Google Sign-In failed. Please try again.'))
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <AuthPageShell
      title="Create account"
      description="Get started with GitHub repository analytics in minutes."
      footer={
        <>
          Already have an account?{' '}
          {onToggleMode ? (
            <button
              type="button"
              onClick={onToggleMode}
              className="font-medium text-accent-teal transition hover:text-green-400"
            >
              Sign in
            </button>
          ) : (
            <Link
              to="/login"
              className="font-medium text-accent-teal transition hover:text-green-400"
            >
              Sign in
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
              passwordAutoComplete="new-password"
            />
            <FormError message={error} />
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingLabel="Creating account…"
              disabled={isGoogleLoading}
              className="w-full"
            >
              Create account
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
            text="Sign up with Google"
          />
        </div>
      </Card>
    </AuthPageShell>
  )
}
