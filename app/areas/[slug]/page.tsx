import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AreaList from '@/components/AreaList'
import CoverageList from '@/components/CoverageList'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import Panel from '@/components/Panel'
import PromoBand from '@/components/PromoBand'
import ServiceGrid from '@/components/ServiceGrid'
import { config, getArea } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { areaIntro, pageH1 } from '@/lib/headings'
import { breadcrumbList, localBusiness } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

/**
 * One page per service area, listing every service, with content specific to
 * that area. Deliberately NOT a service-by-area matrix: five services times
 * nine towns is a doorway-page pattern that gets sites demoted.
 */
export function generateStaticParams() {
  return config.serviceAreas.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const area = getArea(params.slug)
  if (!area) return {}
  const fm = readFrontmatter(`areas/${area.slug}.mdx`)
  return buildMetadata({
    kind: 'area',
    area,
    path: `/areas/${area.slug}`,
    description: fm.description,
    image: fm.image,
  }).metadata
}

export default async function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug)
  if (!area) notFound()
  const { content } = await loadContent(`areas/${area.slug}.mdx`, { area })
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: `${area.name}, ${config.primaryState}`, path: `/areas/${area.slug}` },
  ]

  return (
    <>
      <JsonLd data={localBusiness([area])} />
      <JsonLd data={breadcrumbList(crumbs)} />

      <PageHeader display={{ text: area.name, highlight: null }} title={pageH1.area(area)} intro={areaIntro(area)} />
      <Panel>
        <article>{content}</article>
      </Panel>
      <PromoBand />
      <ServiceGrid heading={`Insulation services in ${area.name}`} />
      <AreaList heading="Nearby Areas" exclude={area.slug} />
      <CoverageList />
    </>
  )
}
