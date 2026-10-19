import { config, formatTime } from '@/lib/config'

export const dynamic = 'force-static'

/** Plain-text summary for LLM crawlers, generated from config. */
export function GET() {
  const c = config
  const url = (path: string) => new URL(path, c.domain).toString()
  const lines: string[] = [
    `# ${c.displayName}`,
    '',
    `> ${c.tagline}`,
    '',
    `${c.displayName} provides ${c.services.map((s) => s.name.toLowerCase()).join(', ')} for homes and commercial properties in ${c.primaryCity} and ${c.secondaryCity}, ${c.primaryState}, and across ${c.homeCounty} County.`,
    '',
    '## Contact',
    `- Phone: ${c.phoneDisplay}`,
    ...(c.email ? [`- Email: ${c.email}`] : []),
    ...(c.address ? [`- Address: ${c.address.street}, ${c.address.city}, ${c.address.state} ${c.address.zip}`] : []),
    `- Website: ${c.domain}`,
    `- Request a free estimate: ${url('/quote')}`,
    `- Contact page: ${url('/contact')}`,
    '',
    '## Services',
    ...c.services.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)}): ${s.shortDescription}`),
    `- All services: ${url('/services')}`,
    '',
    '## Common questions',
    ...[...c.services.flatMap((s) => s.faqs), ...c.faqs].map((f) => `- ${f.q} ${f.a}`),
    `- More: ${url('/faq')}`,
    '',
    '## Service areas',
    ...c.serviceAreas.map((a) => `- [${a.name}](${url(`/areas/${a.slug}`)})`),
    `- All areas: ${url('/service-areas')}`,
  ]
  if (c.hours) {
    lines.push('', '## Hours', ...c.hours.map((h) => `- ${h.day}: ${formatTime(h.open)} to ${formatTime(h.close)}`))
  }
  const facts: string[] = []
  if (c.yearsInBusiness !== null) facts.push(`- Years in business: ${c.yearsInBusiness}`)
  if (c.insured === true) facts.push('- Insured: yes')
  if (c.licenseNumber) facts.push(`- License: ${c.licenseNumber}`)
  if (facts.length) lines.push('', '## Credentials', ...facts)
  lines.push(
    '',
    '## Pages',
    `- [How It Works](${url('/how-it-works')})`,
    `- [Request a Free Estimate](${url('/quote')})`,
    `- [Service Areas](${url('/service-areas')})`,
    `- [Why ${c.displayName}](${url('/why-cowboy-spray-foam')})`,
    `- [FAQ](${url('/faq')})`,
    `- [Privacy Policy](${url('/privacy-policy')})`,
    `- [Sitemap](${url('/sitemap.xml')})`,
  )

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
