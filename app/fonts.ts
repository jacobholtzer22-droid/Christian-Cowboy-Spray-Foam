import { Fraunces, Hanken_Grotesk } from 'next/font/google'

/**
 * The two typefaces for this site, loaded through next/font so they are
 * self-hosted and subset at build time. This is the ONE file to edit to change
 * fonts: swap the imports and the two exports, keep the `variable` names, and
 * list only weights the family actually ships.
 *
 * Families and weights are carried over unchanged from the build this design
 * was ported from: a serif display face with real character against a clean
 * grotesque for body text.
 */
export const headingFont = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const bodyFont = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})
