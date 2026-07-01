import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GitBranch } from 'lucide-react'
import type { UseMutationResult } from '@tanstack/react-query'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormError } from '@/components/ui/FormError'
import { getErrorMessage } from '@/lib/errors'
import {
  repositoryUrlSchema,
  type RepositoryUrlFormValues,
} from '@/lib/schemas'
import type { CreateRepositoryResponse } from '@/types/job'

interface AnalyzeRepositoryFormProps {
  createMutation: UseMutationResult<CreateRepositoryResponse, Error, string>
  isJobPolling?: boolean
  variant?: 'card' | 'embedded'
}

export function AnalyzeRepositoryForm({
  createMutation,
  isJobPolling = false,
  variant = 'card',
}: AnalyzeRepositoryFormProps) {
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RepositoryUrlFormValues>({
    resolver: zodResolver(repositoryUrlSchema),
    defaultValues: { url: '' },
  })

  const isDisabled = isSubmitting || createMutation.isPending || isJobPolling

  async function onSubmit(values: RepositoryUrlFormValues) {
    setFormError(null)
    try {
      await createMutation.mutateAsync(values.url)
      reset()
    } catch (err) {
      setFormError(getErrorMessage(err, 'Failed to start analysis.'))
    }
  }

  const formFields = (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          variant === 'embedded'
            ? 'flex flex-col gap-3'
            : 'relative mt-5 flex flex-col gap-3 sm:flex-row sm:items-start'
        }
      >
        <div className="flex-1">
          <div
            className={`flex overflow-hidden rounded-xl border border-github-border/80 bg-surface/80 transition focus-within:border-accent-teal/60 focus-within:shadow-[0_0_0_3px_var(--color-accent-glow)] ${isDisabled ? 'opacity-60' : ''}`}
          >
            <input
              type="url"
              placeholder="https://github.com/owner/repo"
              aria-label="Repository URL"
              disabled={isDisabled}
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-white outline-none placeholder:text-github-muted/70 disabled:cursor-not-allowed"
              {...register('url')}
            />
            <Button
              type="submit"
              isLoading={isSubmitting || createMutation.isPending}
              loadingLabel="Starting…"
              disabled={isJobPolling}
              className="m-1.5 shrink-0 rounded-lg px-5"
            >
              Analyze
            </Button>
          </div>
          {errors.url && (
            <p className="mt-1.5 text-sm text-red-400">{errors.url.message}</p>
          )}
        </div>
      </form>
      <div className={variant === 'embedded' ? 'mt-2' : 'mt-2'}>
        <FormError message={formError} />
      </div>
    </>
  )

  if (variant === 'embedded') {
    return formFields
  }

  return (
    <Card hover className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-github-accent/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-github-accent/20 text-accent-teal">
          <GitBranch className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">Analyze repository</h2>
          <p className="mt-1 text-sm text-github-muted">
            Paste a public GitHub URL to start background analysis.
          </p>
        </div>
      </div>
      {formFields}
    </Card>
  )
}
