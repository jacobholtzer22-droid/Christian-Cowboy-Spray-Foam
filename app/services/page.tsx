import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import Panel from '@/components/Panel'
import PromoBand from '@/components/PromoBand'
import ServiceGrid from '@/components/ServiceGrid'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { pageH1, pageIntro } from '@/lib/headings'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'services.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'services', path: '/services', description: fm.description, image: fm.image }).metadata
}

export default async function ServicesIndexPage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader display={config.pages.services} title={pageH1.services()} intro={pageIntro()} />
      <Panel>
        <article>{content}</article>
      </Panel>
      <ServiceGrid heading="What we install" />
      <PromoBand />
    </>
  )
}
