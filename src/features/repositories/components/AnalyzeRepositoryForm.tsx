import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Clipboard, GitBranch, Sparkles } from 'lucide-react'
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
  onSelectUrl?: (url: string) => void
  selectedUrl?: string
}

export function AnalyzeRepositoryForm({
  createMutation,
  isJobPolling = false,
  variant = 'card',
  selectedUrl,
}: AnalyzeRepositoryFormProps) {
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RepositoryUrlFormValues>({
    resolver: zodResolver(repositoryUrlSchema),
    defaultValues: { url: selectedUrl || '' },
  })

  // Paste from clipboard helper
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setValue('url', text, { shouldValidate: true })
      }
    } catch {
      // Clipboard access not granted or unavailable
    }
  }

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
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div
          className={`group relative flex items-center rounded-2xl border border-white/15 bg-slate-900/80 p-1.5 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 focus-within:border-amber-400/60 focus-within:shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)] ${
            isDisabled ? 'opacity-60 pointer-events-none' : ''
          }`}
        >
          {/* GitHub / Repo Icon */}
          <div className="flex items-center pl-3.5 pr-2 text-slate-400 group-focus-within:text-amber-400 transition-colors">
            <GitBranch className="h-4 w-4" />
          </div>

          {/* URL Input */}
          <input
            type="url"
            placeholder="https://github.com/owner/repo"
            aria-label="Repository URL"
            disabled={isDisabled}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed font-mono text-xs sm:text-sm"
            {...register('url')}
          />

          {/* Quick Paste Button */}
          <button
            type="button"
            onClick={handlePaste}
            disabled={isDisabled}
            title="Paste from clipboard"
            className="hidden sm:inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition"
          >
            <Clipboard className="h-3 w-3" />
            <span>Paste</span>
          </button>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting || createMutation.isPending}
            loadingLabel="Queueing…"
            disabled={isJobPolling}
            variant="primary"
            size="sm"
            className="shrink-0 rounded-xl px-4 py-2 text-xs font-semibold shadow-none sm:text-sm"
          >
            <span>Analyze</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>

        {errors.url && (
          <p className="mt-2 text-xs font-medium text-rose-400 pl-2">
            {errors.url.message}
          </p>
        )}
      </form>

      <div className="mt-2">
        <FormError message={formError} />
      </div>
    </div>
  )

  if (variant === 'embedded') {
    return formFields
  }

  return (
    <Card hover className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex items-start gap-3 mb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
          <Sparkles className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h2 className="text-base font-bold text-white">Queue New Analysis</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Paste any public Git repository link to launch the intelligence pipeline.
          </p>
        </div>
      </div>
      {formFields}
    </Card>
  )
}
