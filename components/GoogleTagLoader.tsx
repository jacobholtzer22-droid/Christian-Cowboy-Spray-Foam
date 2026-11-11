import Script from 'next/script'
import { tracking } from '@/lib/tracking'
import GoogleTagEvents from './GoogleTag'

/**
 * Google tag loader (gtag.js) for tracking.googleAdsId, plus ga4 when set, and
 * the client-side conversion listeners. Renders nothing when tracking is null.
 */
export default function GoogleTagLoader() {
  if (!tracking) return null
  const ids = [tracking.googleAdsId, ...(tracking.ga4 ? [tracking.ga4] : [])]
  const inline = [
    'window.dataLayer=window.dataLayer||[];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js',new Date());",
    ...ids.map((id) => `gtag('config',${JSON.stringify(id)});`),
  ].join('')

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.googleAdsId)}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {inline}
      </Script>
      <GoogleTagEvents />
    </>
  )
}
