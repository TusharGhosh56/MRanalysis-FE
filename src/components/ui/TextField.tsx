import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: ReactNode
}

export function TextField({
  label,
  error,
  icon,
  id,
  className = '',
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-github-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border border-github-border/80 bg-surface/80 py-2.5 text-white transition placeholder:text-github-muted/70 focus:border-accent-teal/60 focus:shadow-[0_0_0_3px_var(--color-accent-glow)] focus:outline-none ${icon ? 'pl-10 pr-3' : 'px-3'} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
}
