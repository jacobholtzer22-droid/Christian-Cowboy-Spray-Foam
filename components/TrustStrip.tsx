import Link from 'next/link'
import type { ReactNode } from 'react'
import { config } from '@/lib/config'
import { PhoneIcon, TrustIcon } from './icons'
import Phone from './Phone'

/**
 * Trust strip under the hero. The phone is always first and comes from config;
 * every other item is config.home.hero.trust, so nothing here is typed copy and
 * a claim can only appear on the page by being added to site.config.ts.
 */
export default function TrustStrip() {
  const items: { icon: ReactNode; content: ReactNode; key: string }[] = [
    { key: 'phone', icon: <PhoneIcon className="h-5 w-5" />, content: <Phone className="text-ink" /> },
    ...config.home.hero.trust.map((item) => ({
      key: item.text,
      icon: <TrustIcon name={item.icon} className="h-5 w-5" />,
      content: item.href ? (
        <Link href={item.href} className="underline-offset-4 hover:underline">
          {item.text}
        </Link>
      ) : (
        item.text
      ),
    })),
  ]
  return (
    <section aria-label="At a glance" className="border-y border-line bg-bg-alt">
      <ul className="mx-auto grid max-w-page grid-cols-2 gap-x-4 gap-y-4 px-4 py-6 md:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <li key={item.key} className="flex items-center gap-3 text-step-0 font-semibold text-ink">
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-site border border-line text-accent-ink"
            >
              {item.icon}
            </span>
            <span className="min-w-0">{item.content}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
