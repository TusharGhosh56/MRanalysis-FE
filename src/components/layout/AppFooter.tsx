import { GitBranch, ShieldCheck, Terminal, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AppFooter() {
  return (
    <footer className="mt-28 border-t border-white/[0.08] bg-[#07090e] pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Mission Statement (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 transition opacity-90 hover:opacity-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <GitBranch className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-white font-display">
                MRanalysis
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Surgical Git forensics and contributor resilience intelligence. Uncover single-maintainer bottlenecks, temporal velocity rhythms, and code churn across public repositories.
            </p>

            {/* Privacy Architecture Guarantee */}
            <div className="inline-flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-semibold text-white text-[11px]">Zero Code Persistence</span>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Trees are cloned ephemerally in-memory and parsed into telemetry matrices without storing source files.
                </p>
              </div>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-300 text-[11px]">
              Platform
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition">
                  Overview & Sandbox
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-emerald-300 transition">
                  Public Audit Reports
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-300 transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-emerald-300 transition">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Dimensions */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-300 text-[11px]">
              Forensics
            </span>
            <ul className="space-y-2 text-slate-400">
              <li className="text-slate-400 hover:text-slate-200 transition cursor-default">
                Bus Factor Algorithm
              </li>
              <li className="text-slate-400 hover:text-slate-200 transition cursor-default">
                Commit Punchcard Heatmap
              </li>
              <li className="text-slate-400 hover:text-slate-200 transition cursor-default">
                File Churn Treemaps
              </li>
              <li className="text-slate-400 hover:text-slate-200 transition cursor-default">
                Dormant Maintainer Alert
              </li>
              <li className="text-slate-400 hover:text-slate-200 transition cursor-default">
                Ownership Concentration
              </li>
            </ul>
          </div>

          {/* Column 3: Stack */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-300 text-[11px]">
              Architecture
            </span>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span>FastAPI Telemetry Worker</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span>Celery Async Tasks</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span>PostgreSQL Snapshots</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span>Vite + React 19 Frontend</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-slate-500">
          
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} MRanalysis.</span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span className="text-slate-400">Engineered for engineering leaders.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Command Bar Shortcut */}
            <div className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <Terminal className="h-3 w-3 text-slate-400" />
              <span>Press</span>
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 text-[10px] text-slate-300 font-mono">
                /
              </kbd>
              <span>to analyze</span>
            </div>

            {/* Live Operational Status Beacon */}
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400/90">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Telemetry Systems Operational</span>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3 text-slate-500" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}
