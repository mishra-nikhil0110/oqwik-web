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

- `LEAD_WEBHOOK_URL`: trial requests are POSTed here as JSON (Slack, Zapier, Google Apps Script…). Without it, leads only go to the server log.
- `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_EMAIL`: shown as "Prefer to talk now?" next to the form. Hidden when empty.

## Before launch

1. Replace the testimonial in `lib/content.ts` with the launch partner's real words and set `isPlaceholder: false`. Until then the page shows a visible "Draft quote" label.
2. Check the lines marked `CONFIRM` in `lib/content.ts` (trial terms, plan inclusions).
3. Set `LEAD_WEBHOOK_URL` so no lead lives only in a log.
