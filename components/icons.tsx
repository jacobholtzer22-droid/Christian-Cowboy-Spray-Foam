/** Inline SVG icons. Decorative: every icon is aria-hidden and never an <img>. */
type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function PhoneIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function MapPinIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export type TrustIconName = 'pin' | 'family' | 'warranty' | 'clock'

/** Trust strip icons, under the hero. */
export function TrustIcon({ name, className = 'h-5 w-5' }: IconProps & { name: TrustIconName }) {
  switch (name) {
    case 'pin':
      return <MapPinIcon className={className} />
    case 'family':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      )
    case 'warranty':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
  }
}

export type BenefitIconName = 'seal' | 'bill' | 'moisture' | 'quiet' | 'heat' | 'warranty' | 'family'

/** Benefit card icons. */
export function BenefitIcon({ name, className = 'h-6 w-6' }: IconProps & { name: BenefitIconName }) {
  switch (name) {
    case 'seal':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M4 5h16v14H4z" />
          <path d="M4 12h16" />
          <path d="M8 5v7M12 5v7M16 5v7" strokeDasharray="1.5 2" />
        </svg>
      )
    case 'bill':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M3 17l6-6 4 4 7-8" />
          <path d="M20 7h-4M20 7v4" />
          <path d="M3 21h18" />
        </svg>
      )
    case 'moisture':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z" />
          <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
        </svg>
      )
    case 'quiet':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M11 5L6 9H3v6h3l5 4z" />
          <path d="M16 9.5l4 5M20 9.5l-4 5" />
        </svg>
      )
    case 'heat':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <circle cx="17" cy="7" r="3" />
          <path d="M3 13h10M3 17h8M3 9h6" />
        </svg>
      )
    case 'warranty':
      return <TrustIcon name="warranty" className={className} />
    case 'family':
      return <TrustIcon name="family" className={className} />
  }
}

export type StepIconName = 'call' | 'inspect' | 'install' | 'walkthrough'

/** Process step icons (homepage band and /how-it-works). */
export function StepIcon({ name, className = 'h-6 w-6' }: IconProps & { name: StepIconName }) {
  switch (name) {
    case 'call':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      )
    case 'inspect':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4.5-4.5" />
        </svg>
      )
    case 'install':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M3 10l9-7 9 7" />
          <path d="M5 9v12h14V9" />
          <path d="M6 12h12" strokeDasharray="1.5 2" />
        </svg>
      )
    case 'walkthrough':
      return (
        <svg viewBox="0 0 24 24" className={className} {...base}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )
  }
}
