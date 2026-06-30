import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface FormErrorProps {
  message: string | null
}

export function FormError({ message }: FormErrorProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-red-400"
          role="alert"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
