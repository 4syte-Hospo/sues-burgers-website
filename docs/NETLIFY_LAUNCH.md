# Netlify launch checklist (Option B — site + forms)

## 1. Postmark

1. Sign up at [postmarkapp.com](https://postmarkapp.com)
2. Create a **Server**
3. Verify domain `suesburgers.com.au` (or sender address)
4. Add Postmark DNS records in **GoDaddy** (DKIM, Return-Path) — do not remove MX records for existing email
5. Copy the **Server API token**

## 2. Netlify environment variables

**Site configuration → Environment variables → Production:**

```
POSTMARK_API_TOKEN=
POSTMARK_FROM_EMAIL=noreply@suesburgers.com.au
POSTMARK_CONTACT_TO_EMAIL=
POSTMARK_CAREERS_TO_EMAIL=
```

Redeploy after saving (Deploys → Trigger deploy).

## 3. Verify API on production

After deploy:

```
https://suesburgers.com.au/api/health
```

Expect: `"postmarkConfigured": true`

## 4. Test forms (before DNS cutover)

On your Netlify URL or custom domain:

- Submit **Contact** form
- Submit **Careers** form with a PDF resume
- Confirm emails arrive

## 5. Connect custom domain

1. Netlify → **Domain management** → Add `suesburgers.com.au` and `www.suesburgers.com.au`
2. Set primary domain to `suesburgers.com.au`

## 6. GoDaddy DNS cutover

1. Screenshot existing DNS records (especially **MX**)
2. Point `@` A record to Netlify’s load balancer IP
3. Point `www` CNAME to your `*.netlify.app` hostname
4. Wait for HTTPS certificate (automatic)
5. WordPress hosting can stay on GoDaddy unused until you cancel

## 7. Post-launch checks

- Homepage, menu, locations, FAQ, allergen search
- `/contact-us` → `/contact` redirect
- `/menu` → `/our-menu` redirect
- Order Now → Redcat
- Forms on live domain
