# Mentora

**1:1 mentoring platform** for Class 2–10 students, with verified IIT & NIT mentors. Free demo booking, email confirmations, Jitsi meeting links, and admin dashboard.

## Features

- Futuristic landing page with mentor showcase
- 8 seeded IIT/NIT mentor profiles
- Demo booking with slot picker (14 days ahead)
- Email confirmation via Resend (parent + admin)
- Auto-generated Jitsi Meet links
- Admin dashboard at `/admin` to view and confirm bookings

## Tech stack (100% free tier)

| Tool | Purpose |
|------|---------|
| Next.js 15 | Frontend + API |
| Tailwind CSS 4 | Styling |
| Supabase | PostgreSQL database |
| Resend | Transactional email |
| Jitsi Meet | Free video meetings |
| Vercel | Deployment |

## Quick start (local)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Without Supabase:** bookings are stored in memory (resets on server restart). Landing page and mentors work immediately.

**With Supabase:** copy `.env.example` to `.env.local` and fill in keys for persistent bookings.

## Deploy to Vercel (free, ~15 min)

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste contents of `supabase/schema.sql` → Run
3. Go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Resend (email)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key → `RESEND_API_KEY`
3. Use `onboarding@resend.dev` as `FROM_EMAIL` for testing
4. Set `ADMIN_EMAIL` to your email for booking alerts

### 3. Vercel

1. Push this folder to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables from `.env.example`
4. Deploy

Your site will be live at `https://your-project.vercel.app`

## Admin

- URL: `/admin`
- Default password: `mentora123` (set `ADMIN_PASSWORD` in env to change)
- Actions: Confirm, Complete, Cancel bookings
- Confirming sends a confirmation email to the parent

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/mentors` | All mentors |
| `/mentors/[id]` | Mentor profile |
| `/book` | Demo booking form |
| `/thank-you?id=...` | Booking confirmation |
| `/admin` | Admin dashboard |

## Environment variables

See `.env.example` for the full list.

## License

MIT
