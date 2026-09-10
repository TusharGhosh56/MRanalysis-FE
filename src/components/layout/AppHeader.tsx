import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GitBranch, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const navLinks = [
  { to: '/', label: 'Overview' },
  { to: '/reports', label: 'Reports' },
]

export function AppHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'MR'

  return (
    <header className="sticky top-3 sm:top-4 z-50 mx-auto w-full max-w-5xl px-4 sm:px-6 pt-3 sm:pt-4">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#07090e]/80 px-4 py-2 shadow-lg backdrop-blur-xl">
        
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition opacity-90 hover:opacity-100"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              MRanalysis
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 sm:flex">
            {navLinks.map(({ to, label }) => {
              const isActive =
                to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User / Auth */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 font-mono text-[9px] font-bold text-emerald-300">
                  {initials}
                </span>
                <span className="max-w-[130px] truncate text-slate-300 text-xs font-mono">
                  {user.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-slate-200"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Link
                to="/login"
                className="rounded-full px-3 py-1 text-xs text-slate-400 transition hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
