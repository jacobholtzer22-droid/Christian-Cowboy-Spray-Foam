import { config } from '@/lib/config'
import Eyebrow from './Eyebrow'
import { BenefitIcon } from './icons'
import Section, { type SectionTone } from './Section'

/**
 * The benefits cards. A card with no title does not render.
 *
 * Three fixed columns at desktop rather than an auto-fit track: auto-fit packed
 * six cards as five across plus one orphan on a second row at 1440px.
 */
export default function FeatureCards({ tone = 'base' }: { tone?: SectionTone } = {}) {
  const copy = config.home.benefits
  const cards = copy.cards.filter((c): c is typeof c & { title: string } => c.title !== null)
  if (!copy.heading && cards.length === 0) return null
  return (
    <Section
      tone={tone}
      labelledBy={copy.heading ? 'features-heading' : undefined}
      label={copy.heading ? undefined : 'Why spray foam'}
    >
      <div className="mx-auto max-w-measure text-center">
        {copy.eyebrow && <Eyebrow>{copy.eyebrow}</Eyebrow>}
        {copy.heading && (
          <h2 id="features-heading" className="mt-4 font-heading text-section font-bold text-ink">
            {copy.heading}
            {copy.headingSecondLine && (
              <>
                <br />
                <span className="text-ink-soft">{copy.headingSecondLine}</span>
              </>
            )}
          </h2>
        )}
      </div>
      {cards.length > 0 && (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title} className="relative rounded-card border border-line bg-surface p-8">
              <div aria-hidden="true" className="strip-spectrum absolute inset-x-4 top-0" />
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-site border border-line text-accent-ink"
              >
                <BenefitIcon name={card.icon} />
              </span>
              <h3 className="mt-6 font-heading text-step-1 font-bold text-ink">{card.title}</h3>
              {card.body && <p className="mt-2 text-ink-soft">{card.body}</p>}
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
