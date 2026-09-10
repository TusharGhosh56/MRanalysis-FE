import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { motion, useReducedMotion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import { TextField } from '@/components/ui/TextField'
import { staggerContainer, fadeUp } from '@/lib/motion'
import type { CredentialsFormValues } from '@/lib/schemas'

interface CredentialsFieldsProps {
  register: UseFormRegister<CredentialsFormValues>
  errors: FieldErrors<CredentialsFormValues>
  passwordAutoComplete: 'current-password' | 'new-password'
}

export function CredentialsFields({
  register,
  errors,
  passwordAutoComplete,
}: CredentialsFieldsProps) {
  const shouldReduceMotion = useReducedMotion()
  const Container = shouldReduceMotion ? 'div' : motion.div
  const Item = shouldReduceMotion ? 'div' : motion.div

  const containerProps = shouldReduceMotion
    ? { className: 'space-y-4' }
    : {
        className: 'space-y-4',
        variants: staggerContainer,
        initial: 'hidden' as const,
        animate: 'visible' as const,
      }

  const itemProps = shouldReduceMotion ? {} : { variants: fadeUp }

  return (
    <Container {...containerProps}>
      <Item {...itemProps}>
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          icon={<Mail className="h-4 w-4" strokeWidth={2} />}
          error={errors.email?.message}
          {...register('email')}
        />
      </Item>
      <Item {...itemProps}>
        <TextField
          label="Password"
          type="password"
          autoComplete={passwordAutoComplete}
          icon={<Lock className="h-4 w-4" strokeWidth={2} />}
          error={errors.password?.message}
          {...register('password')}
        />
      </Item>
    </Container>
  )
}
