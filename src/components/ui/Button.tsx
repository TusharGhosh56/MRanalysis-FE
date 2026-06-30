import type { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

type ButtonVariant = 'primary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingLabel?: string
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-github-accent to-accent-teal text-white shadow-lg shadow-github-accent/20 hover:shadow-github-accent/30 hover:brightness-110',
  ghost:
    'border border-github-border/80 bg-transparent text-gray-300 hover:border-gray-500 hover:bg-white/5 hover:text-white',
  danger:
    'border border-red-500/40 bg-red-500/10 text-red-300 hover:border-red-400/60 hover:bg-red-500/20 hover:text-red-200',
}

export function Button({
  children,
  isLoading = false,
  loadingLabel,
  disabled,
  variant = 'primary',
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${className}`}
      {...(props as object)}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {isLoading && loadingLabel ? loadingLabel : children}
    </motion.button>
  )
}
