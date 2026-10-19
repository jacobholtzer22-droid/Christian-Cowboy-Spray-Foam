/**
 * Primary navigation. No "Quote" text link: the estimate button in the header
 * covers it. Home is first and explicit; the wordmark also links to /, but a
 * wordmark is a convention rather than a label.
 */
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/why-cowboy-spray-foam', label: 'Why Cowboy Spray Foam' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/faq', label: 'FAQ' },
] as const

/** Footer quick links: the primary pages plus the contact page. */
export const FOOTER_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/why-cowboy-spray-foam', label: 'Why Cowboy Spray Foam' },
  { href: '/faq', label: 'FAQ' },
  { href: '/services', label: 'Services' },
  { href: '/quote', label: 'Request a Free Insulation Estimate' },
  { href: '/contact', label: 'Contact' },
] as const

/** Every estimate button on the site. */
export const QUOTE_CTA = { href: '/quote', label: 'Get a Free Estimate' } as const

/** The promo band's button, which points at the same page with the offer's words. */
export const OFFER_CTA = { href: '/quote', label: 'Book My Free Inspection' } as const
