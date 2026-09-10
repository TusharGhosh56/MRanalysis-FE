import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  hint?: string
}

export function TextField({
  label,
  error,
  icon,
  hint,
  id,
  className = '',
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            {label}
          </label>
          {hint && <span className="text-xs text-slate-500">{hint}</span>}
        </div>
      )}
      <div className="relative group">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors duration-200 group-focus-within:text-emerald-400 z-10">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl border border-white/10 bg-[#0d1117]/90 py-2.5 text-sm text-white backdrop-blur-md transition-all duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-emerald-400 focus:bg-[#0f141d] focus:shadow-[0_0_20px_-3px_rgba(0,245,160,0.3)] focus:outline-none ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${error ? 'border-rose-500/60 focus:border-rose-500 focus:shadow-[0_0_20px_-3px_rgba(244,63,94,0.3)]' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-rose-400">{error}</p>}
    </div>
  )
}
