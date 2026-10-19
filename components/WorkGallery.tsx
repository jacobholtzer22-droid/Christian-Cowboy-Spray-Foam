import { config } from '@/lib/config'
import Img from './Img'
import Section, { type SectionTone } from './Section'

/**
 * Finished jobs from config.images.gallery. Renders nothing when the list is
 * empty, so a client with no photographs of their own never gets an empty band.
 *
 * This band is only ever the client's own photographs. Licensed stock belongs
 * on a service page explaining a material, never in a grid that a visitor will
 * read as "work this company did".
 *
 * The frames are a fixed 4:3 so a mixed set of phone photographs, some tall and
 * some wide, lines up instead of stepping up and down the grid.
 */
export default function WorkGallery({
  tone = 'base',
  heading = 'Recent work',
  intro,
}: {
  tone?: SectionTone
  heading?: string
  intro?: string
} = {}) {
  const images = config.images.gallery
  if (images.length === 0) return null
  return (
    <Section tone={tone} labelledBy="work-heading">
      <div className="max-w-measure">
        <h2 id="work-heading" className="font-heading text-section font-bold text-ink">
          {heading}
        </h2>
        {intro && <p className="mt-3 text-step-1 text-ink-soft">{intro}</p>}
      </div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((name) => (
          <li key={name} className="overflow-hidden rounded-card border border-line bg-surface">
            <Img
              name={name}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
