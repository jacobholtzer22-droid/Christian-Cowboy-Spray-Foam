import type { Metadata } from 'next'
import { StepIcon } from '@/components/icons'
import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import Panel from '@/components/Panel'
import PromoBand from '@/components/PromoBand'
import { config } from '@/lib/config'
import { loadContent, readFrontmatter } from '@/lib/content'
import { pageH1, pageIntro } from '@/lib/headings'
import { breadcrumbList } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

const CONTENT = 'how-it-works.mdx'
const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'How It Works', path: '/how-it-works' },
]

export function generateMetadata(): Metadata {
  const fm = readFrontmatter(CONTENT)
  return buildMetadata({ kind: 'how', path: '/how-it-works', description: fm.description, image: fm.image }).metadata
}

export default async function HowItWorksPage() {
  const { content } = await loadContent(CONTENT)
  const steps = config.processSteps
  return (
    <>
      <JsonLd data={breadcrumbList(CRUMBS)} />
      <PageHeader display={config.pages.howItWorks} title={pageH1.how()} intro={pageIntro()} />
      <Panel>
        <article>{content}</article>
        {steps.length > 0 && (
          <ol className="mt-12 space-y-10">
            {steps.map((step) => (
              <li key={step.title} className="flex gap-6">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-accent-ink"
                >
                  <StepIcon name={step.icon} />
                </span>
                <div className="min-w-0">
                  <h2 className="font-heading text-step-2 font-bold text-ink">{step.title}</h2>
                  <p className="mt-2 text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Panel>
      <PromoBand />
    </>
  )
}
