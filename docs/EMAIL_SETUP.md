# Email setup (Postmark)

The Contact and Careers forms submit to `/api/contact` and `/api/careers`. Email delivery is handled server-side via a provider abstraction — forms never call Postmark directly.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `POSTMARK_API_TOKEN` | Postmark Server API token |
| `POSTMARK_FROM_EMAIL` | Verified sender address (e.g. `noreply@suesburgers.com.au`) |
| `POSTMARK_CONTACT_TO_EMAIL` | Inbox for contact form submissions |
| `POSTMARK_CAREERS_TO_EMAIL` | Inbox for careers applications |

Copy `.env.example` to `.env` and fill in these values.

**Development:** If any variable is missing, the app uses a **mock email provider** — submissions succeed, and the email payload is logged to the server console. No crash, no credentials required.

**Production:** All four variables must be set for live delivery.

## Local development

```bash
npm install
npm run dev
```

- Vite: `http://localhost:5173`
- API server: `http://localhost:3001`
- Vite proxies `/api/*` to the API server

Test a form submission and check the API terminal for `[MockEmailProvider]` output.

Health check: `GET /api/health`

## Postmark setup

1. Create a [Postmark](https://postmarkapp.com) account and server.
2. **Sender signature** — verify `POSTMARK_FROM_EMAIL` (single address or domain).
3. **Domain verification** (recommended) — add DNS records Postmark provides:
   - **DKIM** — TXT record(s) for email authentication
   - **Return-Path** — CNAME for bounce handling
4. Copy the **Server API token** → `POSTMARK_API_TOKEN`.
5. Set inbox addresses for contact and careers forms.

### SPF / DNS

If sending from your own domain (`@suesburgers.com.au`):

- Complete Postmark domain verification (DKIM + Return-Path).
- Ensure your domain SPF record includes Postmark if you use a custom SPF policy. Postmark’s docs list the exact values for your server.

Without verified DNS, messages may land in spam or fail sender checks.

## Netlify production (recommended)

Forms run as **Netlify Functions** in `netlify/functions/`, sharing the same Postmark email layer as local dev.

```bash
npm run build   # builds SPA to dist/ — Netlify also bundles functions automatically
```

### Netlify environment variables

In **Site configuration → Environment variables → Production**, add:

| Variable | Value |
|----------|--------|
| `POSTMARK_API_TOKEN` | From Postmark server settings |
| `POSTMARK_FROM_EMAIL` | e.g. `noreply@suesburgers.com.au` |
| `POSTMARK_CONTACT_TO_EMAIL` | Inbox for contact form |
| `POSTMARK_CAREERS_TO_EMAIL` | Inbox for careers form |

Deploy previews keep `VITE_STAGING=true` (forms show a staging message). **Production** on `main` uses live forms.

### Production checklist

- [ ] All four Postmark env vars set in Netlify **Production** scope
- [ ] `POSTMARK_FROM_EMAIL` verified in Postmark
- [ ] Domain DKIM + Return-Path DNS records live in GoDaddy
- [ ] Custom domain `suesburgers.com.au` connected in Netlify
- [ ] `GET https://suesburgers.com.au/api/health` returns `"postmarkConfigured": true`
- [ ] Test contact form on live domain
- [ ] Test careers form with resume attachment on live domain

Health check: `GET /api/health`

## Local development (Express)

For local dev, the Express API in `server/` still runs alongside Vite:

```bash
npm run dev
```

- Vite: `http://localhost:5173`
- API server: `http://localhost:3001`
- Vite proxies `/api/*` to the API server

## Alternative: Node server hosting

You can also deploy with `npm run build && npm start` on Railway, Render, Fly.io, or a VPS instead of Netlify Functions.

## Architecture

```
Forms (React)
  → POST /api/contact | /api/careers
  → Netlify Functions (production) or Express routes (local dev)
  → server/handlers/*
  → server/email/emailService.ts
  → MockEmailProvider | PostmarkEmailProvider
```

Attachments are sent as Postmark-compatible base64 attachments (resume required for careers; optional for contact).
