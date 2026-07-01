import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function LandingReportsCta() {
  return (
    <section className="relative -mx-4 mt-8 border-y border-github-border/40 sm:-mx-6 lg:-mx-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(35,134,54,0.12),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-teal">
            Your reports
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Already started an analysis?
          </h2>
          <p className="mt-2 text-base text-github-muted">
            View all your reports, track in-progress jobs, and open full
            dashboards from the Analysis Reports page.
          </p>
        </div>

        <Link
          to="/reports"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-github-accent to-accent-teal px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-github-accent/20 transition hover:brightness-110"
        >
          View Analysis Reports
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
