'use client'

import { useEffect } from 'react'
import { tracking } from '@/lib/tracking'

type Gtag = (...args: unknown[]) => void

function fire(sendTo: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', 'conversion', { send_to: sendTo })
}

/**
 * The Google tag, driven entirely by the tracking block in site.config.ts.
 *
 * - Loader: rendered server-side by components/GoogleTagLoader.tsx so the
 *   gtag.js tag and its config call are in the static HTML.
 * - Call conversion: any click on a tel: link anywhere on the page.
 * - Form conversion: the sealed ContactForm is not touched. It replaces its
 *   <form data-endpoint> with a role="status" thank-you only after a 2xx from
 *   the platform, so that swap, observed from outside, is the success signal.
 *   Validation errors and the error state leave the form in place and do not fire.
 */
export default function GoogleTagEvents() {
  const formLabel = tracking?.conversions.form ?? null
  const callLabel = tracking?.conversions.call ?? null

  useEffect(() => {
    if (!callLabel) return
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]')
      if (link) fire(callLabel)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [callLabel])

  useEffect(() => {
    if (!formLabel) return
    const isForm = (n: Node) =>
      n instanceof Element && (n.matches('form[data-endpoint]') || n.querySelector('form[data-endpoint]') !== null)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (!Array.from(m.removedNodes).some(isForm)) continue
        const parent = m.target instanceof Element ? m.target : null
        if (parent?.querySelector(':scope > [role="status"]')) fire(formLabel)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [formLabel])

  return null
}
