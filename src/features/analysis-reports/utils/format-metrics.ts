export function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, {
    notation: value >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 10_000 ? 1 : 0,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** Parse ISO week strings like `2026-W24` into Mon–Sun date range (UTC). */
export function parseIsoWeek(
  isoWeek: string,
): { start: Date; end: Date } | null {
  const match = /^(\d{4})-W(\d{1,2})$/.exec(isoWeek.trim())
  if (!match) return null

  const year = Number(match[1])
  const week = Number(match[2])
  if (week < 1 || week > 53) return null

  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = jan4.getUTCDay() || 7
  const week1Monday = new Date(jan4)
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1)

  const monday = new Date(week1Monday)
  monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7)

  const sunday = new Date(monday)
  sunday.setUTCDate(monday.getUTCDate() + 6)

  return { start: monday, end: sunday }
}

function formatUtcDate(date: Date, options: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(undefined, { ...options, timeZone: 'UTC' })
}

/** e.g. `2026-W24` → `Jun 9 – 15, 2026` */
export function formatIsoWeek(isoWeek: string): string {
  const range = parseIsoWeek(isoWeek)
  if (!range) return isoWeek

  const { start, end } = range
  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear()

  if (sameMonth) {
    const month = formatUtcDate(start, { month: 'short' })
    return `${month} ${start.getUTCDate()} – ${end.getUTCDate()}, ${end.getUTCFullYear()}`
  }

  const startLabel = formatUtcDate(start, { month: 'short', day: 'numeric' })
  const endLabel = formatUtcDate(end, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${startLabel} – ${endLabel}`
}

/** Compact label for chart axes, e.g. `Jun 9, '26` */
export function formatIsoWeekShort(isoWeek: string): string {
  const range = parseIsoWeek(isoWeek)
  if (!range) return isoWeek

  return formatUtcDate(range.start, {
    month: 'short',
    day: 'numeric',
    year: '2-digit',
  })
}

export function truncatePath(path: string, max = 48): string {
  if (path.length <= max) return path
  const half = Math.floor((max - 1) / 2)
  return `${path.slice(0, half)}…${path.slice(-half)}`
}
