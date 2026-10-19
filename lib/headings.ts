import { config } from './config'
import type { Service, ServiceArea } from './config-schema'

/**
 * One H1 per page, containing the service and, where natural, the city. Brand
 * and display lines stay visible as styled non-heading text.
 *
 * Every phrase here is composed from config. Nothing in this file is typed
 * copy: change the business, the city or the service list in site.config.ts
 * and every H1 follows.
 */
const where = () => `${config.primaryCity} and ${config.secondaryCity}, ${config.primaryState}`
const category = () => config.categoryPhrase

export const pageH1 = {
  home: () => `${category()} in ${where()}`,
  services: () => `${category()} Services in ${where()}`,
  service: (s: Service) => `${s.name} in ${where()}`,
  how: () => `How ${category()} Works in ${where()}`,
  why: () => `Why ${config.displayName} for ${category()} in ${where()}`,
  serviceAreas: () => `${category()} Service Areas Around ${config.primaryCity} and ${config.secondaryCity}`,
  faq: () => `${category()} Questions in ${where()}`,
  contact: () => `Contact ${config.displayName} for ${category()} in ${where()}`,
  quote: () => `Request a Free ${category()} Estimate in ${where()}`,
  area: (area: ServiceArea) => `${category()} in ${area.name}, ${config.primaryState}`,
}

/** The first paragraph under every H1: who, what service, where. */
export function pageIntro(): string {
  return `${config.displayName} installs ${category().toLowerCase()} for homes and commercial properties in ${where()} and across ${config.homeCounty} County.`
}

/** Same sentence for an area page, naming that city. */
export function areaIntro(area: ServiceArea): string {
  return `${config.displayName} installs ${category().toLowerCase()} for homes and commercial properties in ${area.name}, ${config.primaryState}.`
}
