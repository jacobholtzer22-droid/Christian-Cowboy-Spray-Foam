# BUILD-REPORT: site_update (tracking install), cowboysprayfoam-1792516209271

**Status: NO CHANGE MADE, needs a template decision. The gate is green, 19/19. The Google tag is already live with exactly the values requested.**

**This is a repeat dispatch (2026-11-11).** INSTRUCTIONS.md is identical to the one PR #4 answered, and the repo has not changed since: `lib/config-schema.ts` still has no `tracking` key, and `scripts/verify.ts` still stops at check 19. I tried the literal edit again. `npx tsc --noEmit` failed with the same error (now at `site.config.ts(518,3)`), so I reverted it. Sending this instruction again will give the same result until a human syncs the template files listed under item 8. Check 22 cannot pass in a repo that has no check 22.

INSTRUCTIONS.md asked for the tracking block to be written into `site.config.ts` as the `tracking` key on the config object, and for check 22 to pass. I could not do that literally in this repo, so I changed nothing. Two reasons:

1. **The schema here has no `tracking` key.** `lib/config-schema.ts` is `.strict()` and does not define `tracking`. I tried adding the block exactly as given, and `npx tsc --noEmit` failed: `site.config.ts(519,3): error TS2353: Object literal may only specify known properties, and 'tracking' does not exist in type ...`. Check 1 (config parses against schema) would fail the same way. In CI I may not edit `lib/config-schema.ts`, so I reverted the edit.
2. **This repo has no check 22.** `scripts/verify.ts` runs checks 1 to 19 and never mentions tracking. This repo predates the template version that added `config.tracking`, the template's `components/GoogleTag.tsx` and check 22.

**What is live right now.** PR #3 put the same block into `site.config.ts` as a named export (`export const tracking = {...}`) next to the default config. It is validated by `lib/tracking.ts` and rendered by `components/GoogleTagLoader.tsx` and `components/GoogleTag.tsx`. The ids and labels match INSTRUCTIONS.md character for character:

- googleAdsId `AW-18527362419`
- conversions.form `AW-18527362419/ZLcxCKHI2bAdEPO6xIJF`
- conversions.call `AW-18527362419/0s00CP2x7bUdEPO6xIJF`

I confirmed the built `out/index.html` contains `googletagmanager.com/gtag/js?id=AW-18527362419`.

Files changed by this run: `BUILD-REPORT.md` only.

## 1. npm run verify

```
#   check                                                                   result  detail
--- ----------------------------------------------------------------------  ------  ------
1   site.config.ts parses against schema                                    PASS    
2   businessSlug and identity are filled in (not the template sample)       PASS    slug "cowboysprayfoam-1792516209271"
3   businessSlug exists in the live platform database                       PASS    platform confirmed slug "cowboysprayfoam-1792516209271"
4   components/ContactForm.tsx matches sealed checksum                      PASS    10499ee5c991
5   built HTML posts to the www contact endpoint, never the bare apex       PASS    endpoint on /contact, /, /quote
6   honeypot hp_7d3a_ref inside hidden wrapper, no "company" field          PASS    
7   content/ contains no bare phone, address, email, or price               PASS    
8   no placeholder tokens in content/ or site.config.ts                     PASS    
9   every JSON-LD block parses, has @context/@type, all types on allowlist  PASS    
10  Review/aggregateRating only with real, visible reviews                  PASS    
11  every image has a 15+ char alt; no two images share an alt              PASS    
12  exactly one <h1> per page                                               PASS    
13  titles unique, 30 to 60 chars as rendered                               PASS    
14  meta descriptions present, unique, 140 to 160 chars                     PASS    
15  canonical present on every page and matches config.domain               PASS    
16  sitemap lists every built route and nothing else                        PASS    
17  every internal link resolves to a built route                           PASS    
18  no blank MDX interpolation in rendered text                             PASS    
19  text over the hero photo meets WCAG AA (4.5:1)                          PASS    desktop H1 and CTA (onPrimary) 7.41:1; desktop tagline (onPrimary @ 0.9) 6.77:1; desktop eyebrow (onPrimary @ 0.85) 6.44:1; mobile H1 and CTA (onPrimary) 6.80:1; mobile tagline (onPrimary @ 0.9) 6.22:1; mobile eyebrow (onPrimary @ 0.85) 5.93:1

19/19 checks passed across 23 pages.
All checks passed.
```

## 2. site.config.ts

Unchanged by this run. See `site.config.ts` at HEAD. Its `tracking` named export is at the bottom of the file and holds the values listed above.

## 3. Alt-text spot checks

Not applicable. No images were touched.

## 4. Design direction

Unchanged. Not applicable to a tracking install.

## 5. Templated-looking things

Not applicable. No design, content or components were touched.

## 6. UNRESOLVED

Nothing new. The business-fact unknowns from the original build report still stand.

## 7. INVENTED

None. No values were invented or reformatted.

## 8. Template issues and decision for the human

- **This repo is behind the template on tracking.** The template's tracking-install path expects `tracking` as a key on `config`, a matching schema entry in `lib/config-schema.ts`, and check 22 in `scripts/verify.ts`. All three are files a CI run may not edit. To match the template:
  1. Pull the template's `lib/config-schema.ts`, `components/GoogleTag.tsx`, layout wiring and `scripts/verify.ts` (check 22) into this repo.
  2. Move the block from `export const tracking` into `config.tracking`.
  3. Delete the PR #3 stopgap: `lib/tracking.ts`, `components/GoogleTagLoader.tsx` and the named export.

  Until then, the PR #3 implementation is doing the job.
- **The form conversion depends on the ContactForm's markup.** It fires on the DOM swap from `form[data-endpoint]` to `[role="status"]`. If the sealed ContactForm changes that markup, the conversion stops firing silently, and nothing in checks 1 to 19 would notice.
