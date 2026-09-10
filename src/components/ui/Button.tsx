import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'capsule' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingLabel?: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#00f5a0] text-slate-950 font-semibold shadow-[0_2px_12px_rgba(0,245,160,0.25)] hover:bg-[#00e092] hover:shadow-[0_4px_20px_rgba(0,245,160,0.35)] active:scale-[0.98]',
  secondary:
    'border border-white/10 bg-white/[0.04] text-slate-200 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 hover:text-white active:scale-[0.98]',
  ghost:
    'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100 active:bg-white/[0.08]',
  danger:
    'border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-200 active:scale-[0.98]',
  capsule:
    'rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/50',
  outline:
    'border border-white/15 bg-transparent text-slate-300 hover:border-emerald-400/40 hover:text-emerald-300 hover:bg-emerald-400/[0.03]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5 font-semibold',
}

export function Button({
  children,
  isLoading = false,
  loadingLabel,
  disabled,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className={`relative inline-flex items-center justify-center whitespace-nowrap shrink-0 font-medium transition-all duration-200 select-none disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...(props as object)}
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-current shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        {isLoading && loadingLabel ? loadingLabel : children}
      </span>
    </motion.button>
  )
}
