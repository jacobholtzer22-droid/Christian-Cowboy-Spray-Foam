# BUILD-REPORT: site_update, cowboysprayfoam-1792516209271

**Status: DONE. Gate green, 19/19.** Two changes, both from INSTRUCTIONS.md: (1) canonical host moved to `https://www.cowboysprayfoamllc.com`, (2) Google tag added (loader, form conversion, call conversion), with its ids and labels kept in `site.config.ts`.

Files changed: `site.config.ts`, `app/layout.tsx` (one import, one element), plus new files `lib/tracking.ts`, `components/GoogleTagLoader.tsx`, `components/GoogleTag.tsx`. Not touched: `components/ContactForm.tsx`, `scripts/contact-form.sha256`, `lib/config-schema.ts`, `lib/config.ts`, `lib/content.ts`, `next.config.mjs`, `app/robots.ts`, the robots block in the layout, `launch`/`prelaunch`, `.github/`, the verify scripts, content, design, images.

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

What I checked in `./out` by hand:
- Domain: no file in `out/` contains `www.cowboysprayfoam.com`. The canonicals, `og:url`, every `sitemap.xml` entry, and the robots.txt `Host:`/`Sitemap:` lines all use `https://www.cowboysprayfoamllc.com`.
- Loader: every page has `gtag/js?id=AW-18527362419` and the inline `gtag('js', …); gtag('config','AW-18527362419')` snippet, both through `next/script` `afterInteractive`.
- Both conversion labels (`…/ZLcxCKHI2bAdEPO6xIJF` form, `…/0s00CP2x7bUdEPO6xIJF` call) are in the client bundle. They come from config, not from code.
- The robots meta is unchanged (`index, follow`, driven by `prelaunch: false`).

## 2. site.config.ts

```ts
import type { SiteConfigInput } from './lib/config-schema'

/**
 * Every fact about this business, in one file, validated by lib/config-schema.ts.
 * A field the client has not supplied is null or an empty array, never a guess.
 * Prose lives in content/*.mdx; design lives in theme.ts and app/fonts.ts.
 */
const config: SiteConfigInput = {
  // The live Business.slug from the platform. Every lead from this site posts
  // with this value, and a slug that matches no Business row loses all of them,
  // so it is never an env var and never edited without checking Neon.
  businessSlug: 'cowboysprayfoam-1792516209271',

  legalName: 'Cowboy Spray Foam LLC',
  displayName: 'Cowboy Spray Foam',
  tagline: 'Spray foam, blown-in, and batt insulation for homes and commercial properties.',

  schemaType: 'HomeAndConstructionBusiness',

  phone: '+19726740667',
  email: 'CowboySprayFoam@outlook.com',

  address: {
    street: '864 County Road 4460',
    city: 'Decatur',
    state: 'TX',
    // ZIP was not supplied. 76234 is the Decatur, TX ZIP; confirm before launch.
    zip: '76234',
    // Decatur city center, not a surveyed point for the address itself.
    lat: 33.2343,
    lng: -97.5861,
  },

  primaryCity: 'Fort Worth',
  secondaryCity: 'Dallas',
  homeCounty: 'Wise',
  categoryPhrase: 'Spray Foam Insulation',
  primaryState: 'TX',

  serviceAreas: [
    { slug: 'fort-worth', name: 'Fort Worth', county: 'Tarrant' },
    { slug: 'dallas', name: 'Dallas', county: 'Dallas' },
    { slug: 'decatur', name: 'Decatur', county: 'Wise' },
    { slug: 'arlington', name: 'Arlington', county: 'Tarrant' },
    { slug: 'keller', name: 'Keller', county: 'Tarrant' },
    { slug: 'southlake', name: 'Southlake', county: 'Tarrant' },
    { slug: 'weatherford', name: 'Weatherford', county: 'Parker' },
    { slug: 'plano', name: 'Plano', county: 'Collin' },
    { slug: 'frisco', name: 'Frisco', county: 'Collin' },
  ],

  services: [
    {
      slug: 'open-cell-spray-foam',
      name: 'Open Cell Spray Foam',
      shortDescription:
        'Light, expanding foam that air seals and insulates in one pass. Common in attics, interior walls, and ceilings.',
      priceFrom: null,
      priceNote: 'quoted after a free inspection',
      image: 'installer-trimming-foam-wall.jpg',
      faqs: [
        {
          q: 'Should I use open cell or closed cell in my attic?',
          a: 'It depends on the space, the depth you have to work with, and what the attic is doing now. We look at it during the free inspection and tell you which one fits, rather than selling you the more expensive one by default.',
        },
        {
          q: 'Does open cell spray foam help with noise?',
          a: 'Yes. Open cell foam is soft and absorbs sound well, which is why it is often used in interior walls and ceilings between rooms as well as on the roof deck.',
        },
        {
          q: 'Is open cell foam a vapor barrier?',
          a: 'No. Open cell foam is vapor permeable, so it lets moisture pass through. Closed cell foam is the one that acts as a vapor retarder. Which one suits your assembly is something the inspection settles.',
        },
        {
          q: 'What R-value does open cell spray foam give?',
          a: 'Open cell foam is typically about R-3.5 to R-3.8 per inch. Because it expands so much, it fills the cavity and seals air leaks at the same time, which is a large part of what it does for comfort.',
        },
        {
          q: 'Is there a warranty on open cell spray foam?',
          a: 'Yes. Cowboy Spray Foam offers a lifetime warranty on open cell and closed cell spray foam. Ask for the details in writing when you get your estimate.',
        },
        {
          q: 'Do you do commercial open cell work as well as homes?',
          a: 'Yes. We take residential and commercial jobs, and no job is too big or too small. Tell us what the building is and we will come look at it.',
        },
      ],
    },
    {
      slug: 'closed-cell-spray-foam',
      name: 'Closed Cell Spray Foam',
      shortDescription:
        'Dense, rigid foam that resists moisture and stiffens the assembly. Common on metal buildings, crawlspaces, and rim joists.',
      priceFrom: null,
      priceNote: 'quoted after a free inspection',
      image: 'finished-foam-shop-ceiling.jpg',
      faqs: [
        {
          q: 'Why would I pick closed cell over open cell?',
          a: 'Closed cell is dense and rigid, it acts as a vapor retarder and resists water, and it adds stiffness to what it is sprayed on. It also gives more insulation per inch, which matters when the cavity is shallow.',
        },
        {
          q: 'Can closed cell foam go in a metal building or pole barn?',
          a: 'Metal buildings and pole barns are one of the common uses for closed cell foam, because it sticks to the panel, seals the gaps, and does not mind the moisture that steel sweats. Tell us about the building and we will come look.',
        },
        {
          q: 'Is closed cell foam right for a crawlspace?',
          a: 'Crawlspaces, rim joists, and basement walls are all common closed cell applications, for the same reason: they are damp spaces where a vapor retarder matters as much as the insulation value.',
        },
        {
          q: 'What R-value does closed cell spray foam give?',
          a: 'Closed cell foam is typically about R-6 to R-7 per inch, roughly double open cell. That is why it is the usual answer when there is not much depth to work with.',
        },
        {
          q: 'Is there a warranty on closed cell spray foam?',
          a: 'Yes. Cowboy Spray Foam offers a lifetime warranty on open cell and closed cell spray foam. Ask for the details in writing when you get your estimate.',
        },
      ],
    },
    {
      slug: 'blown-in-insulation',
      name: 'Blown-In Insulation',
      shortDescription:
        'Loose-fill insulation blown into an attic with a hose, filling in around framing, ducts, and wiring.',
      priceFrom: null,
      priceNote: 'quoted after a free inspection',
      image: 'attic-blown-in-fiberglass.jpg',
      faqs: [
        {
          q: 'Can you add blown-in insulation on top of what I already have?',
          a: 'Topping up a thin or settled attic is one of the most common reasons to blow in insulation. Whether yours is worth adding to or worth removing first is what the free inspection is for.',
        },
        {
          q: 'How do I know if I have enough attic insulation?',
          a: 'If you can see the tops of the ceiling joists, there is usually not much there. Rather than guess from the ground, we come out, measure what is in the attic, and tell you where you stand. That visit is free.',
        },
        {
          q: 'Do you blow in cellulose or fiberglass?',
          a: 'Both materials exist and both are used in attics. Cellulose is typically about R-3.2 to R-3.8 per inch and fiberglass about R-2.2 to R-2.7 per inch. Which one fits your attic is decided at the inspection.',
        },
        {
          q: 'Is blown-in less expensive than spray foam?',
          a: 'Blown-in is generally the lower cost way to raise an attic R-value, while foam also air seals. We price the job after looking at it, so you can see both options against your own attic.',
        },
      ],
    },
    {
      slug: 'batt-insulation',
      name: 'Batt Insulation',
      shortDescription:
        'Pre-cut blankets fitted between studs, joists, and rafters. Common in new construction and open-wall remodels.',
      priceFrom: null,
      priceNote: 'quoted after a free inspection',
      image: 'stock-fiberglass-batts-wall-studs.jpg',
      faqs: [
        {
          q: 'Should I use batts or foam in a new build?',
          a: 'It comes down to budget and how the assembly is built. Batts are the budget-friendly option when the walls are open and the cavity is standard. Foam costs more and also air seals. We walk the job and give you both numbers.',
        },
        {
          q: 'Faced or unfaced batts?',
          a: 'The facing acts as a vapor retarder, and which side it belongs on depends on the climate and the assembly. It is not a choice to make from a catalogue, so we settle it at the inspection.',
        },
        {
          q: 'Why do batts sometimes underperform?',
          a: 'Batt insulation only reaches its rated value with a tight fit. Gaps around wiring and boxes, or a batt squashed into too small a space, cost you performance. Fitting them properly is most of the job.',
        },
        {
          q: 'Do you install batts in commercial buildings?',
          a: 'Yes. We take residential and commercial work, any size. Tell us about the building and we will come out and look at it.',
        },
      ],
    },
    {
      slug: 'insulation-removal',
      name: 'Insulation Removal',
      shortDescription:
        'Taking out old insulation that is wet, compressed, contaminated, or simply in the way of the new install.',
      priceFrom: null,
      priceNote: 'quoted after a free inspection',
      image: 'stock-spray-foam-ceiling-joists.jpg',
      faqs: [
        {
          q: 'Do I have to remove the old insulation first?',
          a: 'Not always. Old insulation usually comes out when it is wet, moldy, compressed, contaminated by rodents or pests, or in the way of the new install. If yours is fine, we will tell you so and leave it.',
        },
        {
          q: 'Can you remove the old insulation and install the new one in the same job?',
          a: 'Yes. Removal and installation are both services we offer, so the old material comes out and the new foam, blown-in, or batts go in without handing the job to someone else.',
        },
        {
          q: 'Why does removal matter before spray foam?',
          a: 'Foam needs to bond to the surface it is sprayed on. Clearing the cavity first gives the new insulation a clean surface to work against, which is why removal is often the first step on an older attic.',
        },
        {
          q: 'How do I know whether my insulation needs to come out?',
          a: 'That is what the free inspection answers. We look at the condition of what is up there and tell you whether it is worth keeping, worth topping up, or worth removing.',
        },
      ],
    },
  ],

  hours: [
    { day: 'Monday', open: '09:00', close: '17:00' },
    { day: 'Tuesday', open: '09:00', close: '17:00' },
    { day: 'Wednesday', open: '09:00', close: '17:00' },
    { day: 'Thursday', open: '09:00', close: '17:00' },
    { day: 'Friday', open: '09:00', close: '17:00' },
  ],

  yearsInBusiness: 5,
  // No license or certificate was supplied, and none is claimed.
  licenseNumber: null,
  // Insurance was never asked about, so nothing is claimed either way.
  insured: null,

  // No reachable reviews. Leaving this empty is what keeps Review and
  // aggregateRating schema off the site.
  reviews: [],

  profiles: {
    gbp: null,
    facebook: null,
    instagram: null,
    yelp: null,
  },

  faqs: [
    {
      q: 'What kinds of insulation do you install?',
      a: 'Open cell spray foam, closed cell spray foam, blown-in insulation, batt insulation, and insulation removal, for homes and commercial properties.',
    },
    {
      q: 'Is the estimate really free?',
      a: 'Yes. The inspection and the estimate are both free. We come out, look at the attic, walls, or crawlspace, and tell you what you actually need before any money is discussed.',
    },
    {
      q: 'Open cell or closed cell, which do I need?',
      a: 'Open cell is lighter, expands more, and quiets a house. Closed cell is dense, resists moisture, and gives more insulation per inch. Which one fits depends on the space, and the free inspection is where that gets decided.',
    },
    {
      q: 'How much does insulation cost?',
      a: 'It depends on the square footage, the material, the depth, and whether old insulation has to come out first. That is why we price the job after seeing it rather than quoting a number over the phone.',
    },
    {
      q: 'Where do you work?',
      a: 'Within about thirty miles of Fort Worth and about thirty miles of Dallas, plus all of Wise County around our base in Decatur. That covers Arlington, Keller, Southlake, Weatherford, Plano, Frisco and the towns in between.',
    },
    {
      q: 'Do you take commercial work as well as houses?',
      a: 'Yes. Residential and commercial, and no job is too big or too small.',
    },
    {
      q: 'Is there a warranty?',
      a: 'There is a lifetime warranty on open cell and closed cell spray foam. It does not cover blown-in, batts, or removal. Ask for the details in writing when you get your estimate.',
    },
    {
      q: 'Do you remove old insulation?',
      a: 'Yes, insulation removal is one of our services. Old material comes out when it is wet, compressed, contaminated, or in the way, and the new insulation goes in after.',
    },
    {
      q: 'How long does an insulation job take?',
      a: 'It depends on the size of the space and whether anything has to come out first. You get a timeline with your estimate, once we have seen the job.',
    },
    {
      q: 'What are your hours, and can you work outside them?',
      a: 'Monday through Friday, 9am to 5pm. The owner answers the phone during business hours, and after-hours work is available when the job calls for it.',
    },
    {
      q: 'How do I get started?',
      a: 'Call, or send the form with a few details about the space. We will set a time to come out, look at it, and give you a free estimate.',
    },
  ],

  prelaunch: false,

  offer: {
    headline: 'Free Insulation Inspection',
    detail:
      'We come out, look at your attic, walls, or crawlspace, and tell you what you actually need. No charge, no obligation. Mention this offer when you call or send the form.',
    finePrint: null,
  },

  coverage: [
    { county: 'Wise', towns: ['Decatur', 'Bridgeport', 'Rhome', 'Boyd', 'Paradise', 'Alvord', 'Chico', 'Newark', 'Aurora'] },
    {
      county: 'Tarrant',
      towns: [
        'Fort Worth',
        'Arlington',
        'Keller',
        'Southlake',
        'Grapevine',
        'Colleyville',
        'North Richland Hills',
        'Haltom City',
        'Hurst',
        'Euless',
        'Bedford',
        'Mansfield',
        'Saginaw',
        'Haslet',
        'Azle',
        'Benbrook',
        'Crowley',
      ],
    },
    { county: 'Parker', towns: ['Weatherford', 'Aledo', 'Willow Park', 'Hudson Oaks', 'Springtown'] },
    { county: 'Johnson', towns: ['Burleson', 'Joshua'] },
    {
      county: 'Denton',
      towns: [
        'Lewisville',
        'Flower Mound',
        'Highland Village',
        'The Colony',
        'Little Elm',
        'Roanoke',
        'Trophy Club',
        'Justin',
        'Argyle',
        'Northlake',
      ],
    },
    {
      county: 'Dallas',
      towns: [
        'Dallas',
        'Irving',
        'Garland',
        'Mesquite',
        'Richardson',
        'Carrollton',
        'Grand Prairie',
        'Duncanville',
        'DeSoto',
        'Cedar Hill',
        'Lancaster',
        'Rowlett',
        'Farmers Branch',
        'Coppell',
        'Addison',
        'University Park',
        'Highland Park',
      ],
    },
    { county: 'Collin', towns: ['Plano', 'Frisco', 'Allen'] },
    { county: 'Rockwall', towns: ['Rockwall'] },
    { county: 'Kaufman', towns: ['Forney'] },
  ],

  pages: {
    services: { text: 'Services', highlight: null },
    howItWorks: { text: 'How It Works', highlight: null },
    why: { text: 'Why Cowboy Spray Foam', highlight: 'Cowboy Spray Foam' },
    serviceAreas: { text: 'Service Areas', highlight: null },
    faq: { text: 'Questions', highlight: null },
    quote: { text: 'Free Estimate', highlight: 'Free' },
    contact: { text: 'Contact', highlight: null },
  },

  footerBlurb: 'Family owned, five years in business, based in Decatur.',

  home: {
    hero: {
      brandLine: { text: 'Seal it once. Feel it every month.', highlight: 'Seal it once.' },
      lead: 'Family owned, five years in, and no job is too big or too small.',
      trust: [
        { icon: 'pin', text: 'Serving Fort Worth, Dallas and Wise County', href: '/service-areas' },
        { icon: 'family', text: 'Family owned', href: null },
        { icon: 'warranty', text: 'Lifetime warranty on spray foam', href: null },
      ],
    },
    serviceAreas: { eyebrow: 'Serving Fort Worth, Dallas and Wise County' },
    comparison: {
      eyebrow: 'Compare insulation types',
      heading: { text: 'Not sure which one your place needs?', highlight: 'which one' },
      body: 'Open cell, closed cell, and blown-in all do different jobs. Here is the short version of each, and what it is usually the right answer for.',
      hint: 'Pick a type',
    },
    benefits: {
      eyebrow: 'Why spray foam',
      heading: 'Insulation that seals',
      headingSecondLine: 'as well as it insulates',
      cards: [
        {
          icon: 'seal',
          title: 'Seals and insulates in one pass',
          body: 'Foam expands into the gaps that batts leave open, so the air leaks and the insulation get handled at the same time.',
        },
        {
          icon: 'bill',
          title: 'Can cut heating and cooling bills',
          body: 'Most of what a house loses, it loses through air leakage. Closing that off is what usually shows up on the bill.',
        },
        {
          icon: 'moisture',
          title: 'Closed cell handles moisture',
          body: 'Closed cell foam acts as a vapor retarder, resists water, and stiffens the walls and roof deck it is sprayed on.',
        },
        {
          icon: 'quiet',
          title: 'Open cell quiets a house',
          body: 'Open cell foam is soft and absorbs sound, which is why it turns up in interior walls and ceilings as well as attics.',
        },
        {
          icon: 'heat',
          title: 'Built for Texas attics',
          body: 'Keeping conditioned air in and attic heat out is most of the comfort problem in this part of the state.',
        },
        {
          icon: 'warranty',
          title: 'Lifetime warranty on spray foam',
          body: 'Open cell and closed cell spray foam carry a lifetime warranty. Ask for the details in writing with your estimate.',
        },
      ],
    },
    process: { heading: 'From your call to the walkthrough' },
    quote: {
      heading: { text: 'Ready to stop paying to heat and cool the outdoors?', highlight: 'heat and cool the outdoors' },
      subheading: 'Tell us about the space and we will set a time to come out and look at it. The inspection and the estimate are free.',
      note: 'We answer the phone during business hours, and after-hours work is available when the job calls for it.',
    },
  },

  processSteps: [
    {
      icon: 'call',
      title: 'Call or send the form',
      body: 'Tell us about the space: attic, walls, crawlspace, metal building, or new build. Rough square footage helps, but we can work without it.',
    },
    {
      icon: 'inspect',
      title: 'Free inspection and estimate',
      body: 'We come out, look at what you have, and price the job. No charge for the visit and no obligation at the end of it.',
    },
    {
      icon: 'install',
      title: 'Install',
      body: 'Old insulation comes out first if you booked removal, then the foam, blown-in, or batts go in.',
    },
    {
      icon: 'walkthrough',
      title: 'Walkthrough',
      body: 'We look over the finished work with you and answer your questions before we leave.',
    },
  ],

  comparison: {
    defaultTab: 'open-cell',
    tabs: [
      {
        key: 'open-cell',
        name: 'Open Cell',
        description: 'Light, expanding, quiet',
        body: 'Open cell foam expands a long way, so it reaches into the gaps and seals them as it insulates. It is lighter and more flexible than closed cell, and it is the better of the two at quieting a house.',
        bestFor: ['Attics', 'Interior walls', 'Ceilings', 'Sound control between rooms'],
        image: 'installer-spraying-foam-garage-wall.jpg',
      },
      {
        key: 'closed-cell',
        name: 'Closed Cell',
        description: 'Dense, rigid, moisture resistant',
        body: 'Closed cell foam is dense and rigid. It resists moisture, acts as a vapor retarder, and gives roughly twice the insulation per inch, which is what makes it the answer where depth is limited.',
        bestFor: ['Metal buildings', 'Crawlspaces', 'Rim joists', 'Basement walls', 'Exterior walls'],
        image: 'closed-cell-metal-building-roof.jpg',
      },
      {
        key: 'blown-in',
        name: 'Blown-In',
        description: 'Loose fill, blown through a hose',
        body: 'Blown-in insulation is loose fill laid over and around the framing in an attic with a hose. It gets into the irregular spaces and is the usual way to bring a thin or settled attic back up to depth.',
        bestFor: ['Topping up an attic', 'Filling irregular spaces', 'Budget attic upgrades'],
        // The wide crop, so the full-bleed stage has a sharp source. The
        // service page uses the taller frame, which keeps the rafters in shot.
        image: 'attic-blown-in-loose-fill.jpg',
      },
    ],
  },

  images: {
    hero: 'hero-foam-shop-ceiling.jpg',
    about: 'cowboy-spray-foam-truck-wrap.jpg',
    /**
     * Finished jobs, shown on the homepage. These are the client's own
     * photographs; nothing from a stock library goes in here.
     */
    gallery: [
      'closed-cell-warehouse-wall.jpg',
      'finished-foam-barn-interior.jpg',
      'installer-scaffold-barn-roof.jpg',
      'foam-carport-metal-roof.jpg',
      'installer-on-stilts-spraying-ceiling.jpg',
      'foam-ceiling-metal-walls-stairs.jpg',
    ],
    heroVideo: null,
  },

  contactForm: {
    splitName: false,
    address: 'off',
    // The service area is two thirty-mile radii, so the ZIP is the fastest way
    // to tell whether a lead is in range. Optional: never a reason to give up.
    zip: 'optional',
    timeframe: {
      label: 'When do you need it done?',
      options: ['As soon as possible', 'Within a month', 'Just getting prices'],
      required: false,
    },
    serviceDropdown: true,
    emailRequired: false,
    messageLabel: 'Tell us about the project',
    messagePlaceholder:
      'Attic, walls, crawlspace, metal building, or new build. Rough square footage if you know it, and whether old insulation needs to come out.',
    submitLabel: 'Request My Free Estimate',
  },

  domain: 'https://www.cowboysprayfoamllc.com',
}

export default config

/**
 * Google tag (Google Ads). Validated by lib/tracking.ts and rendered by
 * components/GoogleTag.tsx: the gtag loader in the layout, a conversion on a
 * successful contact form submit, and a conversion on every tel: link click.
 *
 * A named export rather than a key on `config`, because lib/config-schema.ts is
 * strict and is not edited per client; scripts/verify.ts parses the default
 * export only. Set to null to take the tag off the site.
 */
export const tracking = {
  googleAdsId: 'AW-18527362419',
  conversions: { form: 'AW-18527362419/ZLcxCKHI2bAdEPO6xIJF', call: 'AW-18527362419/0s00CP2x7bUdEPO6xIJF' },
}
```

## How the tracking works

- **Where the config lives:** `export const tracking = { googleAdsId, conversions: { form, call } }` is a named export in `site.config.ts`, holding the exact values from the instructions. It is not a key on the default `config` object. The reason: `lib/config-schema.ts` is `.strict()`, and so is the parse `scripts/verify.ts` runs on the default export. A `tracking` key there fails check 1, and AGENT.md forbids editing either file in CI. `lib/tracking.ts` checks the block with its own strict zod schema. `googleAdsId` must match `AW-<digits>`, each label must match `AW-<digits>/<label>` and belong to the same AW id, and `ga4` (`G-…`) is optional. A bad block fails `next build`. Values are never reformatted.
- **Loader:** `components/GoogleTagLoader.tsx` (server component, rendered once in `app/layout.tsx`).
- **Call conversion:** `components/GoogleTag.tsx` adds one document-level click listener in the capture phase. Every click on an `a[href^="tel:"]` fires `gtag('event','conversion',{send_to: conversions.call})`. That covers the header, hero, mobile call bar, `<Phone />`, and the tel: links inside the form's thank-you and error states.
- **Form conversion:** done without touching the sealed form. `ContactForm` swaps its `<form data-endpoint>` for a `role="status"` thank-you only on `status === 'done'`, which only happens after a 2xx from the platform. A `MutationObserver` watches for that swap and then fires `gtag('event','conversion',{send_to: conversions.form})`. Validation failures, non-2xx responses, and network errors keep the `<form>` on the page, so they never fire. This works on all three form placements (`/contact`, `/quote`, homepage `QuoteSection`).

## 3–5. Alt-text spot checks, design direction, templated-look fixes

Not applicable. This was a `site_update` run limited to domain and tracking. No images, alt text, design, or content changed, so Phases 2–5 did not run again.

## 6. UNRESOLVED

Nothing new from this run. The earlier build's unresolved items still apply: `licenseNumber: null`, `insured: null`, `reviews: []`, all `profiles` null, `offer.finePrint: null`, `priceFrom: null` on every service. The ZIP 76234 note in config still needs the client to confirm it.

## 7. INVENTED

Nothing. Every id and label was copied exactly from INSTRUCTIONS.md, and no business facts were added.

## 8. Problems with the template and things for the human to decide

1. **Privacy policy is now wrong.** `app/privacy-policy/page.tsx` ("Cookies and analytics") says: "This site does not set tracking cookies of its own. If analytics or advertising tags are added in the future, this policy will be updated to describe them." With the Google tag live, that is no longer true: Google Ads sets cookies (for example `_gcl_au`). I left the page alone because the instructions said "two changes, nothing else", and the policy wording is a client and legal call. It needs updating before or together with this deploy. Better still, the template should render that paragraph from `tracking`.
2. **The template has no tracking support.** AGENT.md mentions a `tracking` config key, `components/GoogleTag.tsx`, and a check 22, but this repo's `lib/config-schema.ts` has no `tracking` field and `scripts/verify.ts` stops at check 19. So check 22 does not exist here and the built tag is not gate-checked. The proper fix belongs in AA-Template: add `tracking` to `siteConfigSchema`, then move the block in this site from the named export onto `config.tracking`. INSTRUCTIONS.md asked for the schema to be extended, but AGENT.md forbids editing `lib/config-schema.ts` in CI, so I did it without touching that file.
3. **Consent:** the tag loads for every visitor without a consent banner and without Consent Mode defaults. That is normal for US-only sites, but it is a choice someone should make on purpose.
4. **Domain move housekeeping (outside the repo):** `www.cowboysprayfoamllc.com` needs to be attached to the Vercel project. `www.cowboysprayfoam.com` should 301 to the new host (if it is still owned), and Search Console needs the new property and sitemap. `vercel.json` has no domain references and I did not change it.
