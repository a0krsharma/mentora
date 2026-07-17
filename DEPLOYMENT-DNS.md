# GoDaddy DNS setup for mentoraonline.guru

Your app is **already deployed** on Vercel and both domains are linked:

- `mentoraonline.guru` → Mentora project
- `www.mentoraonline.guru` → Mentora project

The **Invalid Configuration** error is because GoDaddy DNS is not pointing to Vercel yet.

## Current status (auto-checked)

Run this anytime:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-dns.ps1
```

---

## Step-by-step: GoDaddy DNS

1. Log in to [GoDaddy](https://www.godaddy.com) → **My Products** → **Domains**
2. Click **mentoraonline.guru** → **DNS** (Manage DNS)
3. **Turn OFF** Domain Forwarding if enabled (Domain Settings → Forwarding)

### Delete conflicting records

Remove any existing records for `@` or `www` that point elsewhere:

- Old **A** records for `@` (parking page, Website Builder, etc.)
- Duplicate **A** or **CNAME** for `www`

### Add these two records

| Type  | Name | Value                  | TTL    |
|-------|------|------------------------|--------|
| **A** | `@`  | `216.198.79.1`         | 1 Hour |
| **CNAME** | `www` | `cname.vercel-dns.com` | 1 Hour |

**GoDaddy tips:**

- Name `@` = root domain (do not type `mentoraonline.guru` in Name)
- Name `www` = www subdomain only
- CNAME value: `cname.vercel-dns.com` (no `https://`)

> If Vercel dashboard shows `76.76.21.21` instead of `216.198.79.1`, use the IP shown in **your** Vercel Domains page. Both work.

4. **Save** all changes
5. Wait **15–30 minutes** (up to 48 hours max)
6. In **Vercel → Project → Settings → Domains**, click **Refresh**

---

## Verify success

Expected `nslookup` results:

```
mentoraonline.guru     → 216.198.79.1
www.mentoraonline.guru → cname.vercel-dns.com
```

Then open:

- https://mentoraonline.guru
- https://www.mentoraonline.guru (redirects to apex)

---

## Vercel environment variables

Set these in **Vercel → mentora → Settings → Environment Variables**, then **Redeploy**:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Database URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side bookings |
| `RESEND_API_KEY` | Email sending |
| `FROM_EMAIL` | Sender (e.g. `onboarding@resend.dev`) |
| `ADMIN_EMAIL` | Your email for booking alerts |
| `ADMIN_PASSWORD` | Change from default `mentora123` |

Without Supabase, bookings do not persist in production.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| NXDOMAIN / domain not found | DNS not set at GoDaddy — add A + CNAME above |
| Invalid Configuration after 1h | Remove duplicate/conflicting DNS records |
| SSL pending | Wait until DNS shows Valid Configuration |
| www works, root doesn't | Add A record `@` → Vercel IP |
| Root works, www doesn't | Add CNAME `www` → `cname.vercel-dns.com` |
