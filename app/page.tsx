import type { Metadata } from 'next'
import ComparisonSection from '@/components/ComparisonSection'
import FeatureCards from '@/components/FeatureCards'
import Hero from '@/components/Hero'
import JsonLd from '@/components/JsonLd'
import Panel from '@/components/Panel'
import ProcessSteps from '@/components/ProcessSteps'
import PromoBand from '@/components/PromoBand'
import QuoteSection from '@/components/QuoteSection'
import ServiceAreaStrip from '@/components/ServiceAreaStrip'
import TrustStrip from '@/components/TrustStrip'
import WorkGallery from '@/components/WorkGallery'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { faqPage, localBusiness, organization, website } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'home.mdx'

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'home', path: '/', description: fm.description, image: fm.image }).metadata
}

/**
 * Section order mirrors the build this design was ported from, minus the crew
 * photo strip, and plus the offer band. The work gallery sits where that build
 * put its gallery; it was held back while the only images were licensed stock
 * and came back once the client sent photographs of their own. The MDX panel
 * sits where that build put its prose panel, between the steps and the form.
 *
 * Section grounds alternate base / alt for rhythm.
 */
export default async function HomePage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={localBusiness()} />
      <JsonLd data={organization()} />
      <JsonLd data={website()} />
      <JsonLd data={faqPage(config.faqs)} />

      <Hero />
      <TrustStrip />
      <ComparisonSection />
      <PromoBand tone="alt" />
      <ServiceAreaStrip tone="base" />
      <FeatureCards tone="alt" />
      <WorkGallery
        tone="base"
        intro="A few jobs from around Fort Worth, Dallas and Wise County: houses, shops, barns and metal buildings."
      />
      <ProcessSteps tone="alt" />
      <Panel>
        <article>{content}</article>
      </Panel>
      <QuoteSection tone="base" />
    </>
  )
}
