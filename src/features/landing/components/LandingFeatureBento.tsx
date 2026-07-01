import { LandingSection } from '@/features/landing/components/LandingSection'
import { LANDING_FEATURES } from '@/features/landing/landing-content'

const SPAN_CLASS = {
  1: 'md:col-span-1 xl:col-span-1',
  2: 'md:col-span-2 xl:col-span-2',
} as const

const MINI_BARS = [35, 55, 42, 68, 50, 78, 62, 90]

export function LandingFeatureBento() {
  return (
    <LandingSection
      eyebrow="Capabilities"
      title="What you get"
      subtitle="Every analysis produces a detailed report with metrics teams use for reviews, onboarding, and risk assessment."
    >
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        {LANDING_FEATURES.map(
          ({ icon: Icon, title, description, size, span = 1 }) => (
            <article
              key={title}
              className={`landing-surface rounded-xl p-5 ${SPAN_CLASS[span]} ${size === 'large' ? 'xl:p-6' : ''}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-github-accent/15 text-accent-teal">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-github-muted">
                {description}
              </p>

              {size === 'large' && (
                <div className="mt-5 rounded-lg border border-github-border/30 bg-surface/40 p-3">
                  <div className="flex h-16 items-end gap-1">
                    {MINI_BARS.map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t bg-gradient-to-t from-github-accent/80 to-accent-teal/60"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </article>
          ),
        )}
      </div>
    </LandingSection>
  )
}
