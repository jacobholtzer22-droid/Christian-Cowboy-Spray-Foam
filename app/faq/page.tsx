import type { Metadata } from 'next'
import FaqAccordion from '@/components/FaqAccordion'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import Panel from '@/components/Panel'
import PromoBand from '@/components/PromoBand'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { pageH1, pageIntro } from '@/lib/headings'
import { breadcrumbList, faqPage } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'faq.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'faq', path: '/faq', description: fm.description, image: fm.image }).metadata
}

export default async function FaqPage() {
  const { content } = await loadContent(CONTENT)
  const faqs = [...config.faqs, ...config.services.flatMap((s) => s.faqs)]
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader display={config.pages.faq} title={pageH1.faq()} intro={pageIntro()} />
      <Panel>
        <article>{content}</article>
      </Panel>
      <FaqAccordion faqs={faqs} heading={null} />
      <PromoBand />
    </>
  )
}
