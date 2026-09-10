import { useEffect, useRef, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { GOOGLE_CLIENT_ID } from '@/lib/config'
import { progressManager } from '@/lib/progress'

interface GoogleGlobal {
  accounts?: {
    id?: {
      initialize: (options: {
        client_id: string
        callback: (response: { credential?: string }) => void
        cancel_on_tap_outside?: boolean
      }) => void
      renderButton: (
        parent: HTMLElement,
        options: {
          type?: string
          theme?: string
          size?: string
          text?: string
          shape?: string
          width?: number
          logo_alignment?: string
        },
      ) => void
      prompt: () => void
    }
  }
}

interface GoogleAuthButtonProps {
  onSuccess: (credential: string) => Promise<void> | void
  onError?: (err: Error) => void
  text?: string
  disabled?: boolean
  isLoading?: boolean
}

export function GoogleAuthButton({
  onSuccess,
  onError,
  text = 'Sign in with Google',
  disabled = false,
  isLoading = false,
}: GoogleAuthButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const handleCredential = useCallback(
    async (response: { credential?: string }) => {
      if (!response.credential) {
        setIsAuthenticating(false)
        onError?.(new Error('No credentials returned from Google'))
        return
      }

      progressManager.start()
      try {
        setIsAuthenticating(true)
        await onSuccess(response.credential)
      } catch (err) {
        onError?.(err instanceof Error ? err : new Error('Google Sign-In failed'))
      } finally {
        setIsAuthenticating(false)
        progressManager.done()
      }
    },
    [onSuccess, onError],
  )

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return

    let isMounted = true

    function initGsi() {
      const google = (window as unknown as { google?: GoogleGlobal }).google
      if (!google?.accounts?.id || !containerRef.current) return false

      try {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredential,
          cancel_on_tap_outside: true,
        })

        // Render Google's native button inside our container
        containerRef.current.innerHTML = ''
        google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 384,
          logo_alignment: 'left',
        })

        if (isMounted) setIsReady(true)
        return true
      } catch (err) {
        console.error('Failed to init Google Sign-In:', err)
        return false
      }
    }

    if (!initGsi()) {
      const interval = setInterval(() => {
        if (initGsi()) {
          clearInterval(interval)
        }
      }, 200)

      const timeout = setTimeout(() => {
        clearInterval(interval)
      }, 5000)

      return () => {
        isMounted = false
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }

    return () => {
      isMounted = false
    }
  }, [handleCredential])

  const busy = isAuthenticating || isLoading

  return (
    <div className="relative w-full">
      {/* 1. Custom High-Fidelity UI Button that is always visible and matches MRanalysis design */}
      <div
        className={`group relative flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#0d1117] px-4 text-xs font-semibold text-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-[#131822] hover:text-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${
          disabled || busy ? 'pointer-events-none opacity-70' : 'cursor-pointer'
        }`}
      >
        {/* Subtle hover gradient sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/[0.04] via-transparent to-cyan-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {busy ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-emerald-400" />
        ) : (
          /* Crisp Vector Google "G" Icon */
          <svg
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
            />
          </svg>
        )}

        <span className="font-medium tracking-tight text-slate-200 group-hover:text-white">
          {busy ? 'Authenticating with Google…' : text}
        </span>
      </div>

      {/* 2. Transparent Google Native Overlay sitting exactly on top */}
      {/* Any user click physically hits Google's native iframe button with direct user activation */}
      <div
        ref={containerRef}
        aria-label="Google Sign In"
        className={`absolute inset-0 z-20 overflow-hidden rounded-xl opacity-0.01 transition-opacity ${
          disabled || busy || !isReady ? 'pointer-events-none' : 'cursor-pointer'
        } [&_iframe]:!h-full [&_iframe]:!w-full [&>div]:!h-full [&>div]:!w-full`}
        style={{ opacity: 0.001 }}
      />
    </div>
  )
}
