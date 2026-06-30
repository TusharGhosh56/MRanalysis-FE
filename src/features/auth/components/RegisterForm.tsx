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

export function RegisterForm() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

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

  return (
    <AuthPageShell
      title="Create account"
      description="Get started with GitHub repository analytics in minutes."
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-accent-teal transition hover:text-green-400"
          >
            Sign in
          </Link>
        </>
      }
    >
      <Card>
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
            className="w-full"
          >
            Create account
          </Button>
        </form>
      </Card>
    </AuthPageShell>
  )
}
