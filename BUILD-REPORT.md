# BUILD-REPORT: site_update (cowboysprayfoam-1792516209271)

Instruction: set `domain` in `site.config.ts` to `https://www.cowboysprayfoamllc.com`. Change nothing else.

Diff (only change in `site.config.ts`):

```diff
-  domain: 'https://www.cowboysprayfoam.com',
+  domain: 'https://www.cowboysprayfoamllc.com',
```

The built `out/sitemap.xml` (23 URLs) and `out/robots.txt` (Sitemap line) now use the new host. Check 15 confirms every canonical matches it. `launch.indexable` was not touched.

## 1. npm run verify

```
#   check                                                                   result  detail
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
19  text over the hero photo meets WCAG AA (4.5:1)                          PASS

19/19 checks passed across 23 pages.
```

## 2. site.config.ts

The only change is the `domain` line shown above. Every other field is the same as on `main`.

## 3 to 5. Alt spot checks, design direction, templated-look fixes

Not applicable. This site_update made no image, design or content changes.

## 6. UNRESOLVED

Nothing new. This update leaves no field unknown.

## 7. INVENTED

Empty. Nothing was invented.

## 8. Notes for the human

- `CLIENT-TODO.md` line 17 still asks "Do you want to register cowboysprayfoam.com, or a different domain?" The domain now appears to be `cowboysprayfoamllc.com`, so that question is probably outdated. I left it unchanged because the instructions said to change nothing else.
- `BRIEF.md` still records `https://www.cowboysprayfoam.com` as the domain. It is an input file, so I did not edit it.
- Make sure both `www.cowboysprayfoamllc.com` and the apex are attached in Vercel, with the apex redirecting to www, before go_live.
