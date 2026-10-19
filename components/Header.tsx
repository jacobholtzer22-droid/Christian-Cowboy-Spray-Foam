import Link from 'next/link'
import { config } from '@/lib/config'
import { NAV, QUOTE_CTA } from '@/lib/navigation'
import theme from '@/theme'
import { btnPrimary, focusable } from '@/lib/ui'
import { PhoneIcon } from './icons'
import MobileMenu from './MobileMenu'
import NavLink from './NavLink'
import Phone from './Phone'

/**
 * Sticky header. It sits outside every dark band, so it keeps the light ground
 * the whole way down the page and never changes color under the hero. The
 * background stays fully opaque: a transparent bar would put dark nav text over
 * a photograph as soon as it crossed one.
 *
 * The brand mark is theme.logo when one is set and the wordmark from
 * config.displayName otherwise. No business name is typed into this file.
 */
export default function Header() {
  const logo = theme.logo
  return (
    <header className="sticky top-0 z-40 bg-bg">
      <div className="relative mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-4 lg:px-8">
        {/* The brand is a home link too. min-h-[44px] so it is a comfortable tap target on a phone. */}
        <Link
          href="/"
          className={`inline-flex min-h-[44px] items-center font-body text-step-0 font-bold uppercase tracking-[0.16em] text-ink sm:text-step-1 sm:tracking-[0.25em] ${focusable}`}
        >
          {logo ? <img src={logo.src} alt={logo.alt} className="h-10 w-auto" /> : config.displayName}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href} className="text-step--1 font-medium">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-5 xl:flex">
          <span className="flex items-center gap-2 text-step--1">
            <PhoneIcon className="h-4 w-4 text-accent-ink" />
            <Phone className="text-ink" />
          </span>
          <Link href={QUOTE_CTA.href} className={`${btnPrimary} px-5 py-2 text-step--1`}>
            {QUOTE_CTA.label}
          </Link>
        </div>
        <MobileMenu />
      </div>
      <div aria-hidden="true" className="strip-spectrum" />
    </header>
  )
}
