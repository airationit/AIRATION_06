# Hirance social sharing fix

## Cause and evidence

The old `public/og.png` visibly contained a TCS / Tata Consultancy Services logo in
a phone mockup. `src/config/site.ts`, the homepage, and numerous page overrides
selected that artwork for social previews. This was an image-content problem,
not merely an assumed LinkedIn cache problem.

On October 29, 2026, direct production HTTP requests with `User-Agent: LinkedInBot/1.0`
confirmed that `https://hirance.com`, `https://hirance.com/`, and
`https://www.hirance.com/` all returned the old `https://hirance.com/og.png`
Open Graph and Twitter image references. Each resolved to the www homepage with
HTTP 200. The old image and `/images/icon.png` returned HTTP 200 with `image/png`.
The homepage metadata was present in the returned HTML without JavaScript.
These observations describe production **before deployment of this fix**.

## Implementation

- `scripts/generate-social-image.mjs` now composes a clean 1200 × 630 PNG from
  `public/images/icon.png` and Hirance text. It no longer uses the old generated
  artwork. Run `node scripts/generate-social-image.mjs` to regenerate it.
- `public/images/hirance-social.png` is the new preview. `public/og.png` contains
  identical corrected artwork to protect existing references to the old URL.
- `src/config/site.ts` owns the absolute preview URL, official logo URL, default
  social title, and social description.
- `src/app/layout.tsx` and `src/app/page.tsx` use these defaults for Open Graph and
  Twitter. `metadataBase` remains `https://hirance.com`; locale is `en_IN`.
- Page overrides use the same preview URL, with explicit Twitter images where a
  page replaces the root Twitter object. Existing page SEO titles, descriptions,
  and canonical destinations remain intact.
- `src/lib/seo/page-metadata.ts` supplies complete metadata for simple public pages
  and shared defaults for jobs, blog categories, and company fallbacks.
- Organization/publisher structured data now uses the official icon instead of
  the old promotional artwork.
- `src/app/robots.ts` serves explicit public crawler access and the sitemap URL.
  Production previously returned 404 for `/robots.txt`; this alone did not establish
  that any social crawler was blocked.

Public preview URL after deployment:
`https://hirance.com/images/hirance-social.png`

Official logo URL:
`https://hirance.com/images/icon.png`

Page files updated under `src/app/`:

```text
about-us/page.tsx
blog/page.tsx
blog/[slug]/page.tsx
blog/category/[category]/page.tsx
company/[id]/page.tsx
contact/page.tsx
cookies/page.tsx
delete-account/page.tsx
download-app/page.tsx
feedback/page.tsx
fraud-alert/page.tsx
free-job-alerts/page.tsx
gallery/page.tsx
grievances/page.tsx
jobs/page.tsx
jobs/[slug]/page.tsx
jobs-by-city/page.tsx
jobs-by-department/page.tsx
mobile-privacy-policy/page.tsx
privacy/page.tsx
qr-marketing/page.tsx
request-demo/page.tsx
terms/page.tsx
trust-and-safety/page.tsx
vulnerability-disclosure/page.tsx
```

## Dynamic previews and crawler audit

Blog articles retain their own cover images, SEO canonical override, title, and
description; articles without covers use the corrected Hirance preview. Company
profiles intentionally retain the relevant employer logo on that company's URL,
with matching Twitter metadata. Employer logos do not become homepage metadata.
Job details retain their existing job-specific image generator at
`src/app/jobs/view/[id]/opengraph-image.tsx` and clean job canonical URL.

There is no root file-based Open Graph or Twitter image overriding page metadata,
and no nested layout, middleware, or proxy was found. The existing redirect rule
permits `/images`, `/og`, `/jobs`, `/blog`, `/robots`, and `/sitemap` paths.
The existing headers configuration does not alter PNG response content types.
The installed Next.js bot list already includes LinkedInBot, Twitterbot,
facebookexternalhit, and WhatsApp, so no bot-list override is required to make
metadata available in the head for these crawlers.

## Validation

- `node --test scripts/social-metadata.test.mjs`: **8 tests pass**. Tests execute
  actual metadata exports with API fixtures and cover homepage defaults, public
  pages, absolute image URLs, blog cover/fallback behavior, company previews,
  job-specific previews, blog categories, canonical consistency, PNG dimensions,
  the official icon pixels, legacy image equivalence, and crawler rules.
- `npx tsc --noEmit --incremental false`: **passes**.
- ESLint on the shared configuration, homepage, layout, robots, metadata helper,
  image generator, and test script: **passes**.
- Broader ESLint over `src/app`: **11 existing errors** remain in blog detail,
  company content, and job detail content (explicit `any`, internal anchor links,
  and conditional hooks), plus existing warnings. These unrelated content issues
  were not changed.
- The corrected PNG was visually inspected. No browser or production build was
  run, as requested. Tests exercise metadata exports, not a newly built HTTP
  server. Post-deployment HTML and image responses still require verification.

## Deployment and LinkedIn refresh

1. Deploy this checkout using the project's existing deployment process, including
   both public PNG files. No environment variables or new dependencies are needed.
2. Confirm the new image URL returns HTTP 200 and `Content-Type: image/png` without
   authentication. Confirm the homepage source has exactly the intended
   `og:image` and `twitter:image`, and check a real blog article, job detail,
   company profile, and public informational page.
3. Open https://www.linkedin.com/post-inspector/ and inspect
   `https://hirance.com/`. Inspect `https://www.hirance.com/` too if it has been
   shared. Use Inspect again to request another fetch after deployment.
4. If the live HTML still points at `/og.png`, the metadata deployment is stale.
   If live HTML points at the new image and that image is correct, but a platform
   shows the old artwork, refresh that platform's cached preview. Old LinkedIn
   posts/comments may retain their original previews; verify with a new share.
   Do not change production canonical URLs or add cache-busting query parameters.

Production currently redirects the apex domain to www, while metadata declares
the apex canonical. Align the primary domain and redirect direction in the
hosting dashboard with the intended `https://hirance.com` canonical. This
hosting setting was observed but not changed from the repository. Cloudflare,
hosting security policies, social platform caches, and actual post-deployment
dynamic-page HTTP responses cannot be validated by local metadata tests.
