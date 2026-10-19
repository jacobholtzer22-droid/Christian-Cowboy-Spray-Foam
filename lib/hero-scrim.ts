/**
 * The hero scrim, as data. This is the ONE place the overlay over the hero
 * photograph is defined.
 *
 *   components/Hero.tsx        renders it with heroScrimCss() and heroSideScrimCss()
 *   scripts/contrast-check.ts  rebuilds it pixel by pixel with heroScrimAlpha()
 *
 * Both read these stops, so the CSS a visitor sees and the model the contrast
 * gate measures cannot drift apart. Tune the scrim here and only here; a
 * gradient typed into a component is a gradient the gate does not know about.
 *
 * Positions run 0 (top of the hero) to 1 (bottom). Alpha is the darkness
 * applied at that position. Between stops the alpha is linear, which is also
 * what CSS linear-gradient does, so the two agree exactly.
 *
 * TWO LAYERS RENDER, ONE IS MEASURED. The vertical ramp below is the layer the
 * gate models. A second, horizontal layer (heroSideScrimCss) darkens the left
 * edge further, which is exactly where the copy sits. It is deliberately left
 * out of the model: a horizontal term cannot be expressed in heroScrimAlpha(y),
 * and omitting darkness can only make the measured ratio LOWER than what
 * renders. The gate is therefore conservative, never optimistic. If the side
 * layer is ever removed, nothing here needs to change.
 */

export type ScrimStop = readonly [position: number, alpha: number]

/** The scrim color, as the deep espresso the dark palette uses. */
export const HERO_SCRIM_RGB = [26, 19, 14] as const

/**
 * The hero copy is vertically centered, so the scrim is already strong by the
 * top quarter and stays strong all the way down, rather than ramping late the
 * way a bottom-aligned hero can afford to.
 */
export const HERO_SCRIM_STOPS: readonly ScrimStop[] = [
  [0, 0.2],
  [0.18, 0.66],
  [1, 0.88],
]

/** Opacity of the small uppercase eyebrow line above the H1. */
export const HERO_EYEBROW_OPACITY = 0.85
/** Opacity of the tagline under the H1. */
export const HERO_TAGLINE_OPACITY = 0.9

/**
 * Where the copy sits, as fractions of the hero box [x0, y0, x1, y1]. Mirrors
 * the full-bleed layout in components/Hero.tsx: a max-w-page container with a
 * max-w-3xl copy block, left aligned and vertically centered in a min-h-[90vh]
 * section. If that layout moves, move these.
 */
export const HERO_COPY_BOX = {
  desktop: [0.03, 0.2, 0.62, 0.84],
  mobile: [0.04, 0.16, 0.96, 0.9],
} as const satisfies Record<string, readonly [number, number, number, number]>

/** CSS for the vertical scrim layer, built from the stops. */
export function heroScrimCss(): string {
  const [r, g, b] = HERO_SCRIM_RGB
  const stops = HERO_SCRIM_STOPS.map(([p, a]) => `rgb(${r} ${g} ${b} / ${a}) ${Math.round(p * 100)}%`)
  return `linear-gradient(180deg, ${stops.join(', ')})`
}

/**
 * CSS for the horizontal layer that anchors the copy to the left edge. Not
 * modelled by the contrast gate; see the note at the top of this file.
 */
export function heroSideScrimCss(): string {
  const [r, g, b] = HERO_SCRIM_RGB
  return `linear-gradient(90deg, rgb(${r} ${g} ${b} / 0.55) 0%, rgb(${r} ${g} ${b} / 0.25) 50%, rgb(${r} ${g} ${b} / 0) 100%)`
}

/** Scrim alpha at vertical position y (0 top .. 1 bottom), linear between stops. */
export function heroScrimAlpha(y: number): number {
  const stops = HERO_SCRIM_STOPS
  const first = stops[0]
  const last = stops[stops.length - 1]
  if (!first || !last) return 0
  if (y <= first[0]) return first[1]
  if (y >= last[0]) return last[1]
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]
    const b = stops[i]
    if (!a || !b) continue
    if (y <= b[0]) {
      const t = (y - a[0]) / (b[0] - a[0] || 1)
      return a[1] + (b[1] - a[1]) * t
    }
  }
  return last[1]
}
