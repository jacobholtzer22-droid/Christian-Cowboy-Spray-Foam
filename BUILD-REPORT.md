# BUILD-REPORT: site_update (tracking install), cowboysprayfoam-1792516209271

**Status: STOPPED. Tracking block NOT installed. No changes made to site.config.ts.**

## 1. npm run verify (unchanged site)

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

There is no check 22 in this repo's `scripts/verify.ts` (checks run 1 to 19), so "check 22 must pass" cannot be met here.

## 2. site.config.ts

Unchanged from `main` (235176b). No diff.

## 3. Alt-text spot checks

Not applicable. This was a tracking-install run and no images were touched.

## 4. Design direction

Not applicable. This was a tracking-install run and the design was not touched.

## 5. Templated-looking fixes

Not applicable. This was a tracking-install run.

## 6. UNRESOLVED

- `tracking` (googleAdsId `AW-18527362419`, form and call conversion labels from INSTRUCTIONS.md) is **not installed**. See item 8.

## 7. INVENTED

Nothing. Empty.

## 8. What is wrong with the template

This client repo was built from an older template that has no Google tag support:

- `lib/config-schema.ts` has no `tracking` key and the config object is `.strict()`. I added the block exactly as given and `npx tsc --noEmit` failed:
  `site.config.ts(519,3): error TS2353: Object literal may only specify known properties, and 'tracking' does not exist in type ...`
- `components/GoogleTag.tsx` does not exist, so nothing would render the tag or the form/call conversions even if the key were accepted.
- `scripts/verify.ts` has no check 22.

Installing the block would mean editing `lib/config-schema.ts`, which CI mode forbids, and adding a component and a verify check that should come from the template repo. So I reverted the edit and stopped.

**Fix:** sync this repo with the current template (`lib/config-schema.ts` tracking schema, `components/GoogleTag.tsx` and its layout wiring, verify check 22). Then re-dispatch this same tracking install. The IDs in INSTRUCTIONS.md look well-formed (`AW-<digits>` and `AW-<digits>/<label>`). I did not reformat them.
