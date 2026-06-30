import { Link, useNavigate } from 'react-router-dom'
import { BarChart3, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function AppHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : '?'

  return (
    <header className="sticky top-0 z-50 border-b border-github-border/60 bg-surface-elevated/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-github-accent/20 text-accent-teal">
            <BarChart3 className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold text-white sm:text-lg">
            GitHub Analytics
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-github-border/80 bg-surface/60 px-3 py-1.5 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-github-accent/30 text-xs font-medium text-accent-teal">
                {initials}
              </span>
              <span className="max-w-[180px] truncate text-sm text-github-muted">
                {user.email}
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-github-border/80 px-3 py-1.5 text-sm text-gray-300 transition hover:border-gray-500 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
