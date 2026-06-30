import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .regex(/[A-Za-z]/, 'Must contain at least one letter')
    .regex(/\d/, 'Must contain at least one digit'),
})

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export const repositoryUrlSchema = z.object({
  url: z
    .string()
    .min(1, 'Repository URL is required')
    .url('Enter a valid URL')
    .refine(
      (value) => /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(value),
      'Must be a public GitHub repository URL (https://github.com/owner/repo)',
    ),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type CredentialsFormValues = Pick<LoginFormValues, 'email' | 'password'>
export type RepositoryUrlFormValues = z.infer<typeof repositoryUrlSchema>
