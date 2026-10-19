import { config } from '@/lib/config'

/**
 * Every town served, grouped by county, as plain text. Deliberately not links:
 * the service-area pages are the links, and a page per town would be a doorway
 * pattern. Renders nothing when config.coverage is empty.
 */
export default function CoverageList() {
  const coverage = config.coverage
  if (coverage.length === 0) return null
  return (
    <section aria-labelledby="coverage-heading" className="mx-auto max-w-page px-4 py-16 md:py-24 lg:px-8">
      <h2 id="coverage-heading" className="font-heading text-section font-bold text-ink">
        Where We Work
      </h2>
      <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {coverage.map((group) => (
          <div key={group.county}>
            <dt className="font-heading text-step-1 font-semibold text-ink">{group.county} County</dt>
            <dd className="mt-2 max-w-measure text-ink-soft">{group.towns.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
