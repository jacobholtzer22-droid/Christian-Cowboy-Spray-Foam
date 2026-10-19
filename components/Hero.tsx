import Link from 'next/link'
import { config } from '@/lib/config'
import { pageH1, pageIntro } from '@/lib/headings'
import {
  HERO_EYEBROW_OPACITY,
  HERO_TAGLINE_OPACITY,
  heroScrimCss,
  heroSideScrimCss,
} from '@/lib/hero-scrim'
import { QUOTE_CTA } from '@/lib/navigation'
import { darkVars } from '@/lib/theme-vars'
import { btnOutline, btnPrimary } from '@/lib/ui'
import Highlight from './Highlight'
import { PhoneIcon, TrustIcon } from './icons'
import Img from './Img'

/**
 * Homepage hero. The brand line keeps the display treatment as a styled <p>;
 * the page's single <h1> is the service-plus-city line directly under it.
 * Overlays are divs, never images.
 *
 * The hero sits on a photograph, so it keeps the dark palette on a light page:
 * darkVars redefines every token for this subtree, which is why the buttons and
 * the trust dots need no dark variant. Both overlay layers come from
 * lib/hero-scrim.ts, which is also what verify check 19 measures.
 */
export default function Hero() {
  const copy = config.home.hero
  const hero = config.images.hero

  return (
    <section
      style={darkVars}
      className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-bg text-ink-soft"
    >
      {hero && <Img name={hero} priority sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: heroScrimCss() }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: heroSideScrimCss() }} />

      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-24 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="max-w-3xl">
          <p className="font-heading text-display font-bold text-ink">
            <Highlight text={copy.brandLine.text} highlight={copy.brandLine.highlight} />
          </p>
          <h1 className="mt-6 font-body text-step-1 font-semibold text-ink md:text-step-2">{pageH1.home()}</h1>
          <p className="mt-4 max-w-measure text-step-1 text-ink-soft" style={{ opacity: HERO_TAGLINE_OPACITY }}>
            {pageIntro()}
            {copy.lead && ` ${copy.lead}`}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href={QUOTE_CTA.href} className={`${btnPrimary} px-8 py-4 text-step-1`}>
              {QUOTE_CTA.label}
            </Link>
            <a href={`tel:${config.phone}`} className={`${btnOutline} px-8 py-4 text-step-1`}>
              <PhoneIcon className="h-5 w-5 text-accent-ink" />
              {config.phoneDisplay}
            </a>
          </div>

          {copy.trust.length > 0 && (
            <ul
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-step--1 font-medium text-ink"
              style={{ opacity: HERO_EYEBROW_OPACITY }}
            >
              {copy.trust.map((item) => (
                <li key={item.text} className="flex items-center gap-2">
                  <TrustIcon name={item.icon} className="h-4 w-4 text-accent-ink" />
                  {item.href ? (
                    <Link href={item.href} className="underline-offset-4 hover:underline">
                      {item.text}
                    </Link>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
