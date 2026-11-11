import { z } from 'zod'
import { tracking as rawTracking } from '@/site.config'

/**
 * The Google tag block from site.config.ts (`export const tracking`).
 * Ids and labels are checked for shape and never reformatted: a conversion
 * label must belong to the same AW- account as the loader.
 */
const AW_ID = /^AW-\d+$/
const SEND_TO = /^AW-\d+\/[A-Za-z0-9_-]+$/

export const trackingSchema = z
  .object({
    googleAdsId: z.string().regex(AW_ID, 'googleAdsId must look like AW-123456789'),
    conversions: z
      .object({
        form: z.string().regex(SEND_TO, 'conversions.form must look like AW-123456789/label').nullable().default(null),
        call: z.string().regex(SEND_TO, 'conversions.call must look like AW-123456789/label').nullable().default(null),
      })
      .strict(),
    ga4: z.string().regex(/^G-[A-Z0-9]+$/).nullable().optional(),
  })
  .strict()
  .superRefine((t, ctx) => {
    for (const key of ['form', 'call'] as const) {
      const v = t.conversions[key]
      if (v && !v.startsWith(`${t.googleAdsId}/`)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['conversions', key], message: `must start with ${t.googleAdsId}/` })
      }
    }
  })

export type Tracking = z.output<typeof trackingSchema>

function parseOrThrow(): Tracking | null {
  if (rawTracking == null) return null
  const result = trackingSchema.safeParse(rawTracking)
  if (!result.success) {
    const lines = result.error.issues.map((i) => `  - tracking.${i.path.join('.')}: ${i.message}`)
    throw new Error(`site.config.ts tracking block failed validation:\n${lines.join('\n')}`)
  }
  return result.data
}

/** Parsed once at module load; an invalid block fails `next build`. */
export const tracking: Tracking | null = parseOrThrow()
