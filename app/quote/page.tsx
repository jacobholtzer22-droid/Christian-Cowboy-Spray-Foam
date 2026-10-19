import type { Metadata } from 'next'
import ContactDetails from '@/components/ContactDetails'
import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import PromoBand from '@/components/PromoBand'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { pageH1, pageIntro } from '@/lib/headings'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'quote.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Get a Free Estimate', path: '/quote' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'quote', path: '/quote', description: fm.description, image: fm.image }).metadata
}

/** Dedicated lead page. Every estimate button on the site points here. */
export default async function QuotePage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader display={config.pages.quote} title={pageH1.quote()} intro={pageIntro()} />
      <PromoBand showCta={false} />
      <div className="mx-auto grid max-w-page gap-10 px-4 pb-16 pt-16 md:pb-24 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <article className="mb-8">{content}</article>
          <ContactForm />
        </div>
        <aside>
          <ContactDetails />
        </aside>
      </div>
    </>
  )
}
