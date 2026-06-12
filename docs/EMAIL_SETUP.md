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

## Production deployment

The production server serves the built SPA (`dist/`) and API routes on one port.

```bash
npm run build
NODE_ENV=production npm start
```

### Checklist

- [ ] All four Postmark env vars set on the host
- [ ] `POSTMARK_FROM_EMAIL` verified in Postmark
- [ ] Domain DKIM + Return-Path DNS records live
- [ ] `NODE_ENV=production`
- [ ] HTTPS enabled (forms POST to `/api/*` on same origin)
- [ ] Test contact form → arrives at contact inbox with fields, timestamp, IP, user agent
- [ ] Test careers form → arrives with resume attachment (PDF/DOC/DOCX, max 5 MB)
- [ ] `GET /api/health` returns `"postmarkConfigured": true`

### Hosting note

Pure static hosts (upload-only `dist/` with SPA redirects) **cannot** run the API. Deploy the Node server (`npm start`) on a platform that runs Node (Railway, Render, Fly.io, VPS, etc.), or add serverless functions that import the same email service layer.

## Architecture

```
Forms (React)
  → POST /api/contact | /api/careers
  → server/routes/*
  → server/email/emailService.ts
  → MockEmailProvider | PostmarkEmailProvider
```

Attachments are sent as Postmark-compatible base64 attachments (resume required for careers; optional for contact).
