import Link from 'next/link'
import type { ReactNode } from 'react'
import { config } from '@/lib/config'
import { getImage, hasImage } from '@/lib/images'
import { QUOTE_CTA } from '@/lib/navigation'
import { darkVars } from '@/lib/theme-vars'
import { btnPrimary } from '@/lib/ui'
import CompareStage, { type CompareTab } from './CompareStage'
import Eyebrow from './Eyebrow'
import Highlight from './Highlight'

/**
 * Server wrapper for the insulation comparison. Renders nothing when
 * config.comparison is null.
 *
 * The stage is photography edge to edge where photographs exist, so the section
 * keeps the dark palette on the light page: its copy, buttons and panel read
 * the tokens darkVars redefines, so none of them need a dark variant.
 */
export default function ComparisonSection() {
  const c = config.comparison
  if (!c) return null
  const copy = config.home.comparison

  const heading: ReactNode = (
    <>
      {copy.eyebrow && <Eyebrow>{copy.eyebrow}</Eyebrow>}
      <h2 id="comparison-heading" className="mt-4 font-heading text-section font-bold text-ink lg:text-step-6">
        <Highlight text={copy.heading.text} highlight={copy.heading.highlight} />
      </h2>
      {copy.body && <p className="mt-4 max-w-measure text-step-1 text-ink-soft">{copy.body}</p>}
      <Link href={QUOTE_CTA.href} className={`${btnPrimary} mt-6 rounded-site px-6 py-3.5`}>
        {QUOTE_CTA.label}
      </Link>
    </>
  )

  const tabs: CompareTab[] = c.tabs.map((t) => {
    const img = t.image && hasImage(t.image) ? getImage(t.image) : null
    return {
      key: t.key,
      name: t.name,
      description: t.description,
      body: t.body,
      bestFor: [...t.bestFor],
      image: img ? { src: img.src, srcSet: img.srcSet, width: img.width, height: img.height, alt: img.alt } : null,
    }
  })

  return (
    <section aria-labelledby="comparison-heading" style={darkVars} className="relative bg-bg text-ink-soft">
      <div aria-hidden="true" className="strip-spectrum absolute inset-x-0 top-0 z-30" />
      <CompareStage tabs={tabs} defaultTab={c.defaultTab} hint={copy.hint}>
        {heading}
      </CompareStage>
    </section>
  )
}
