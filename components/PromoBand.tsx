import Link from 'next/link'
import { config } from '@/lib/config'
import { OFFER_CTA } from '@/lib/navigation'
import { btnPrimary } from '@/lib/ui'
import Section, { type SectionTone } from './Section'

/**
 * The standing offer. Renders nothing when config.offer is null, so a client
 * with no offer has no empty band. No icons, no gradient: a heading, a
 * paragraph, optional fine print, and one button.
 */
export default function PromoBand({
  tone = 'alt',
  showCta = true,
}: { tone?: SectionTone; showCta?: boolean } = {}) {
  const offer = config.offer
  if (!offer) return null
  return (
    <Section tone={tone} tight labelledBy="offer-heading">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 id="offer-heading" className="font-heading text-section font-bold text-ink">
            {offer.headline}
          </h2>
          <p className="mt-3 max-w-measure text-step-1 text-ink-soft">{offer.detail}</p>
          {offer.finePrint && <p className="mt-2 max-w-measure text-step--1 text-muted">{offer.finePrint}</p>}
        </div>
        {/* showCta={false} on the page the button points at, so the band never
            offers a link to the page the visitor is already reading. */}
        {showCta && (
          <Link href={OFFER_CTA.href} className={`${btnPrimary} shrink-0 px-6 py-3.5`}>
            {OFFER_CTA.label}
          </Link>
        )}
      </div>
    </Section>
  )
}
