import Link from 'next/link'
import { config } from '@/lib/config'
import { focusable } from '@/lib/ui'

/**
 * Service area cities as cards. Every city in config.serviceAreas has a page of
 * its own, so every card is a link; the county under the name comes from the
 * same config entry, so a card never shows a slot the config did not fill.
 */
export default function AreaList({ heading, exclude }: { heading?: string; exclude?: string } = {}) {
  const areas = config.serviceAreas.filter((a) => a.slug !== exclude)
  if (areas.length === 0) return null
  const list = (
    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {areas.map((a) => (
        <li key={a.slug} className="rounded-card border border-line bg-bg text-step-1 text-ink">
          <Link
            href={`/areas/${a.slug}`}
            className={`flex h-full min-h-[44px] flex-col gap-1 px-4 py-4 transition-colors hover:text-accent-ink ${focusable}`}
          >
            <span className="font-semibold">{a.name}</span>
            {a.county && <span className="text-step--1 text-muted">{a.county} County</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
  if (!heading) return list
  return (
    <section className="mx-auto max-w-page px-4 py-16 md:py-24 lg:px-8">
      <h2 className="font-heading text-section font-bold text-ink">{heading}</h2>
      <div className="mt-10">{list}</div>
    </section>
  )
}
