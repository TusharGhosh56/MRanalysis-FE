import { MARQUEE_ITEMS } from '@/features/landing/landing-content'

export function LandingMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-slate-950/60 py-4.5 backdrop-blur-md">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#05070c] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#05070c] to-transparent" />

      <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-8 whitespace-nowrap">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <span className="text-amber-400 font-serif italic text-lg select-none">✦</span>
            <span className={idx % 2 === 0 ? 'font-serif italic text-white text-base tracking-wide' : 'font-sans font-semibold text-slate-300 uppercase tracking-widest text-xs'}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
