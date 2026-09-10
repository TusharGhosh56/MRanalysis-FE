import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, GitBranch, Sparkles } from 'lucide-react'
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

function parseGitHubUrl(val: string): { owner: string; name: string } | null {
  if (!val) return null
  const trimmed = val.trim()
  const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git|\/)?$/)
  if (match && match[1] && match[2]) {
    return { owner: match[1], name: match[2] }
  }
  return null
}

export function AnalyzeRepositoryForm({
  createMutation,
  isJobPolling = false,
  variant = 'card',
  selectedUrl,
}: AnalyzeRepositoryFormProps) {
  const [formError, setFormError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RepositoryUrlFormValues>({
    resolver: zodResolver(repositoryUrlSchema),
    defaultValues: { url: selectedUrl || '' },
  })

  const currentUrl = watch('url')
  const parsedRepo = parseGitHubUrl(currentUrl || '')

  // Global '/' keyboard shortcut to focus the input bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement
      const isInputActive = activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)
      if (e.key === '/' && !isInputActive) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])


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

  const { ref: formRegisterRef, onBlur: formOnBlur, ...registerRest } = register('url')

  const formFields = (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="relative">
        <div
          className={`group relative flex items-center rounded-xl border border-white/15 bg-[#0b0e14]/90 p-1.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-200 focus-within:border-emerald-500/60 focus-within:shadow-[0_0_25px_-5px_rgba(0,245,160,0.25)] ${
            isDisabled ? 'opacity-60 pointer-events-none' : ''
          }`}
        >
          {/* GitHub / Repo Icon or Detected Avatar */}
          <div className="flex items-center pl-3 pr-2 text-slate-400 group-focus-within:text-emerald-400 transition-colors shrink-0">
            {parsedRepo ? (
              <img
                src={`https://github.com/${parsedRepo.owner}.png?size=40`}
                alt={parsedRepo.owner}
                className="h-4 w-4 rounded-full border border-emerald-500/40 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <GitBranch className="h-4 w-4" />
            )}
          </div>

          {/* URL Input */}
          <input
            type="url"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="https://github.com/owner/repository"
            aria-label="Repository URL"
            disabled={isDisabled}
            ref={(e) => {
              formRegisterRef(e)
              inputRef.current = e
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false)
              formOnBlur(e)
            }}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none disabled:cursor-not-allowed font-mono caret-emerald-400"
            {...registerRest}
          />

          {/* Quick '/' hotkey hint when empty and unfocused */}
          {!currentUrl && !isFocused && (
            <span className="hidden sm:inline-flex items-center mr-1.5 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-400" title="Press / to focus">
              /
            </span>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting || createMutation.isPending}
            loadingLabel="Queueing…"
            disabled={isJobPolling}
            variant="primary"
            className="h-9 px-4 rounded-lg text-xs sm:text-sm font-semibold shrink-0"
          >
            <span>Analyze</span>
            <ArrowRight className="h-3.5 w-3.5" />
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
