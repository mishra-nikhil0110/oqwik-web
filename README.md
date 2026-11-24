# oqwik-web

Marketing site for OQwik: QR ordering and billing for restaurants.
Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, same stack and brand tokens as `oqwik-dine`.

## Run

```bash
npm install
npm run dev        # http://localhost:3002
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| All page copy (edit here, not in components) | `lib/content.ts` |
| Brand tokens (Indigo, Marigold, Ink, Mist), type scale, Outfit @font-face | `app/globals.css` |
| Sections, in page order | `components/sections/*` composed in `app/page.tsx` |
| Trial form handler | `app/api/trial/route.ts` |
| Official logo files | `public/brand/` (copied from `oqwik-admin/assets/svg`) |
| Outfit font files (self-hosted, no build-time network) | `app/fonts/` |

## Environment (`.env.local`, see `.env.example`)

- `NEXT_PUBLIC_SITE_URL`: the live domain, e.g. `https://oqwik.com`. Canonical URLs, the sitemap, robots.txt and structured data are built from it. **Set it before deploying.**
- `NEXT_PUBLIC_NOINDEX=true`: keeps a staging deployment out of search results. Vercel preview deployments are blocked automatically.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`: verification codes from Google Search Console and Bing Webmaster Tools.
- `LEAD_WEBHOOK_URL`: trial requests are POSTed here as JSON (Slack, Zapier, Google Apps Script…). Without it, leads only go to the server log.

## SEO

| What | File |
| --- | --- |
| Domain, default title/description, indexing switch | `lib/seo/config.ts` |
| Page registry (path, lastModified, priority, images) | `lib/seo/routes.ts` |
| Sitemap generator (add blog/feature sources here) | `lib/seo/sitemap.ts` -> `/sitemap.xml` |
| robots.txt | `app/robots.ts` |
| Per-page title, canonical, Open Graph, Twitter | `lib/seo/metadata.ts` (`pageMetadata()`) |
| JSON-LD: Organization, WebSite, SoftwareApplication, FAQPage, WebPage, BreadcrumbList | `lib/seo/schema.ts` |
| Social share image (1200x630) | `public/og/oqwik-og.png` |
| Legal pages | `lib/legal/*` rendered by `components/legal/LegalPage.tsx` |

Adding a page: create it under `app/`, add it to `routes` in `lib/seo/routes.ts`, and export `metadata = pageMetadata(routes.yourPage, {...})`. It then appears in the sitemap with the right canonical.

Update `lastModified` in `routes.ts` only when the page content really changes.

## Before launch

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
2. Fill the `CONFIRM` values in `lib/legal/config.ts` (legal entity, address, email, Grievance Officer) and have a lawyer review `lib/legal/privacy.ts` and `lib/legal/terms.ts`.
3. Get the launch partner's approval on the testimonial wording in `lib/content.ts`.
4. Check the other lines marked `CONFIRM` in `lib/content.ts` (trial terms, plan inclusions).
5. Set `LEAD_WEBHOOK_URL` so no lead lives only in a log.
6. After deploying: verify the domain in Google Search Console, submit `/sitemap.xml`, and test the home page in the Rich Results Test.
