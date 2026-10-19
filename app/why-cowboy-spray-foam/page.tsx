import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import Panel from '@/components/Panel'
import PromoBand from '@/components/PromoBand'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { pageH1, pageIntro } from '@/lib/headings'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'why-cowboy-spray-foam.mdx'
const PATH = '/why-cowboy-spray-foam'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Why Cowboy Spray Foam', path: PATH },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'why', path: PATH, description: fm.description, image: fm.image }).metadata
}

export default async function WhyPage() {
  const { content } = await loadContent(CONTENT)
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader display={config.pages.why} title={pageH1.why()} intro={pageIntro()} />
      <Panel>
        <article>{content}</article>
      </Panel>
      <PromoBand />
    </>
  )
}
