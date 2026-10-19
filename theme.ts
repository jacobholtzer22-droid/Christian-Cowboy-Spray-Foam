/**
 * Visual theme. With app/fonts.ts, the only place design decisions live. No
 * business facts belong here.
 *
 * This is a LIGHT site with dark bands. `palette` is the light ground used
 * everywhere; `dark` overrides the same tokens inside a section that opts in,
 * which today is the hero. Structure, type scale, spacing, radii and motion are
 * carried over unchanged from the build this design was ported from; only the
 * palette is this client's.
 *
 * Palette: warm and heavy. Deep espresso brown, one burnt rust accent, warm
 * off-white ground. Solid colors only, no gradients.
 *
 * Token notes:
 * - components/ContactForm.tsx is sealed: it uses text-primary-dark for its
 *   success heading, text-primary for phone links, focus:border-primary,
 *   bg-accent / hover:bg-accent-dark with text-on-accent for its button, and
 *   text-accent-dark for error text. So `primary` is the emphasis color that
 *   must read as text, `primaryDark` is the strongest text color, and
 *   `accentDark` has to stay a fill that light text sits on (the button hover).
 * - `accent` is the rust and is only ever a fill or a border. `accentInk` is
 *   the accent color for TEXT. Both clear 4.5:1 where they are used: white on
 *   accent 4.93:1, accent as text on surface 4.93:1, on bg 4.61:1.
 * - The hero scrim is NOT here. It lives in lib/hero-scrim.ts, which is the one
 *   place it is defined, so the CSS the hero renders and the model verify
 *   check 19 measures cannot drift apart.
 */
export type HeroVariant = 'full-bleed' | 'split'

export interface Palette {
  /** Emphasis color: links, focus borders. Must read as text on `surface`. */
  primary: string
  /** Strongest text color. */
  primaryDark: string
  /** Focus ring tint. */
  primarySoft: string
  /** Burnt rust. Fills and borders only, never text. */
  accent: string
  /** Hover fill for accent buttons. Light text sits on it. */
  accentDark: string
  /** Accent color for text and icons. */
  accentInk: string
  /** Page ground. */
  bg: string
  /** Alternate section ground, one step from bg, for section rhythm. */
  bgAlt: string
  /** Cards, panels, form card. */
  surface: string
  /** Raised items on a surface. */
  surfaceRaised: string
  /** Headings and primary text. */
  ink: string
  /** Body text. */
  inkSoft: string
  /** Labels, secondary text. */
  muted: string
  line: string
  onPrimary: string
  onAccent: string
  /** Warm highlight. */
  warm: string
}

export interface Theme {
  palette: Palette
  /** Overrides applied inside a dark section. */
  dark: Palette
  /**
   * The 2px rule across the top of every section. A flat accent rather than a
   * gradient: this brand is solid colors only, and the mechanism is kept so the
   * section rhythm is identical to the build this was ported from.
   */
  spectrum: string
  darkSpectrum: string
  /** Soft tint behind interior page headers. */
  pageGlow: string
  darkPageGlow: string
  /** Overlay on the comparison stage. Not the hero: see lib/hero-scrim.ts. */
  stageScrim: string
  heroVariant: HeroVariant
  /** Inputs, form card, and compact buttons, in rem. Read by the sealed form as var(--radius). */
  radius: number
  /** Cards and images, in rem. */
  radiusCard: number
  /** Large panels, in rem. */
  radiusPanel: number
  shadow: string
  darkShadow: string
  /** Lift under primary calls to action. */
  shadowGlow: string
  darkShadowGlow: string
  /**
   * Header mark. null renders the wordmark from config.displayName. Set src and
   * alt to swap in a logo file under /public with no component change.
   */
  logo: { src: string; alt: string } | null
}

const theme: Theme = {
  palette: {
    primary: '#2A1F17',
    primaryDark: '#1A130E',
    primarySoft: '#F3ECE3',
    accent: '#B3561A',
    accentDark: '#8C4213',
    accentInk: '#B3561A',
    bg: '#FAF7F2',
    bgAlt: '#F3EDE4',
    surface: '#FFFFFF',
    surfaceRaised: '#F0E8DD',
    ink: '#1E1A17',
    inkSoft: '#4A423B',
    muted: '#6B6259',
    line: '#E6DED3',
    onPrimary: '#F7F3EE',
    onAccent: '#FFFFFF',
    warm: '#7A4A1C',
  },
  dark: {
    primary: '#E08A47',
    primaryDark: '#F7F3EE',
    primarySoft: '#3A2B20',
    accent: '#B3561A',
    accentDark: '#8C4213',
    accentInk: '#E08A47',
    bg: '#1A130E',
    bgAlt: '#221910',
    surface: '#2A1F17',
    surfaceRaised: '#3A2B20',
    ink: '#F7F3EE',
    inkSoft: '#DCD2C6',
    muted: '#A79A8C',
    line: 'rgba(247, 243, 238, 0.14)',
    onPrimary: '#1A130E',
    onAccent: '#FFFFFF',
    warm: '#E8B98A',
  },
  spectrum: 'linear-gradient(90deg, #B3561A 0%, #B3561A 100%)',
  // The lighter rust, not the light-mode accent: this one paints highlighted
  // words and section rules inside dark bands, where #B3561A is too dark to read.
  darkSpectrum: 'linear-gradient(90deg, #E08A47 0%, #E08A47 100%)',
  pageGlow: 'radial-gradient(ellipse at top, rgba(179, 86, 26, 0.07), transparent 60%)',
  darkPageGlow: 'radial-gradient(ellipse at top, rgba(179, 86, 26, 0.12), transparent 60%)',
  stageScrim:
    'linear-gradient(90deg, rgba(26, 19, 14, 0.9) 0%, rgba(26, 19, 14, 0.5) 34%, rgba(26, 19, 14, 0) 62%), linear-gradient(0deg, rgba(26, 19, 14, 0.75) 0%, rgba(26, 19, 14, 0) 42%)',
  heroVariant: 'full-bleed',
  radius: 0.75,
  radiusCard: 1,
  radiusPanel: 1.5,
  shadow: '0 10px 30px -12px rgb(30 26 23 / 0.18)',
  darkShadow: '0 10px 30px -10px rgb(0 0 0 / 0.5)',
  shadowGlow: '0 10px 24px -12px rgb(30 26 23 / 0.28)',
  darkShadowGlow: '0 10px 30px -12px rgb(0 0 0 / 0.55)',
  logo: null,
}

export default theme
