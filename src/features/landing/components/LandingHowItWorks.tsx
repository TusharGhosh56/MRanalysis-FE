import { LandingSection } from '@/features/landing/components/LandingSection'
import { LANDING_STEPS } from '@/features/landing/landing-content'

export function LandingHowItWorks() {
  return (
    <LandingSection
      eyebrow="Workflow"
      title="How it works"
      subtitle="Three steps from URL to a full repository analytics dashboard."
    >
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        <div
          className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-5 hidden h-px bg-gradient-to-r from-transparent via-accent-teal/50 to-transparent md:block"
          aria-hidden
        />

        {LANDING_STEPS.map(({ step, title, description }) => (
          <li
            key={step}
            className="relative border-l-2 border-github-accent/40 pl-5 md:border-l-0 md:pl-0 md:text-center"
          >
            <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-github-accent/40 bg-surface-elevated font-mono text-sm font-bold text-accent-teal md:mx-auto">
              {step}
            </span>
            <h3 className="mt-4 font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-github-muted">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </LandingSection>
  )
}
