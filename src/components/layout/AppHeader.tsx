import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Activity, FolderGit2, LogOut, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const navLinks = [
  { to: '/', label: 'Overview', icon: Sparkles },
  { to: '/reports', label: 'Analysis Reports', icon: FolderGit2 },
]

export function AppHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [timeString, setTimeString] = useState<string>('')

  // Live GMT/UTC clock matching DayNight Studio
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeString(
        now.toTimeString().split(' ')[0] + ' UTC'
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'MR'

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/75 px-4 py-2.5 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-300">
        
        {/* Brand Logo with Glowing Sun / Radar */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
<<<<<<< Updated upstream
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-github-accent/20 text-accent-teal">
              <BarChart3 className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold text-white sm:text-lg">
              GitHub Analytics
            </span>
=======
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-300 p-0.5 shadow-[0_0_18px_rgba(245,158,11,0.5)]">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-black/40 text-white">
                <Activity className="h-3.5 w-3.5 text-amber-200" />
              </span>
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/20 opacity-75" />
            </div>
            
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                MRanalysis
              </span>
              <span className="font-serif text-sm font-semibold italic text-amber-400">
                Studio
              </span>
            </div>
>>>>>>> Stashed changes
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ to, label }) => {
              const isActive =
                to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] font-semibold'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side: Clock, User Pill, and Actions */}
        <div className="flex items-center gap-3">
          {/* Live UTC Clock from DayNight */}
          {timeString && (
            <div className="hidden font-mono text-[11px] tracking-wider text-slate-400 lg:block">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
              {timeString}
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-[10px] font-bold text-slate-950">
                  {initials}
                </span>
                <span className="max-w-[130px] truncate text-slate-300">
                  {user.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full px-3.5 py-1 text-xs font-medium text-slate-300 transition hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)] transition hover:bg-amber-400/20 hover:text-amber-200"
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
