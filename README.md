# WIPA Platform

The official platform for **WIPA (Wedding Industry Professionals Association)** — replacing AMO and Basecamp with a modern, bespoke solution.

## Tech Stack

- **Next.js 16** (App Router, Server Components, Server Actions)
- **TypeScript** (strict mode)
- **Supabase** (Postgres, Auth, RLS, Realtime, Storage)
- **Stripe** (subscriptions, one-time payments, Customer Portal)
- **Mux** (video hosting & streaming)
- **TailwindCSS** + **shadcn/ui** + **Lucide** icons

## Getting Started

1. Copy `.env.local.example` to `.env.local` and fill in your keys
2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Marketing site (homepage, chapters, membership, blog, contact)
│   ├── (auth)/            # Login, register, forgot-password
│   ├── (portal)/          # Member portal (dashboard, profile, directory, events, videos, payments)
│   ├── (board)/           # Board collaboration tool (Basecamp replacement)
│   ├── (chapter-admin)/   # Chapter leader dashboard
│   ├── (national-admin)/  # National admin dashboard
│   └── api/               # Webhooks (Stripe, Mux)
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── marketing/         # Header, footer
│   └── portal/            # Sidebar, portal components
├── lib/
│   ├── supabase/          # Client, server, middleware helpers
│   ├── stripe/            # Stripe config & helpers
│   └── mux/               # Mux config
├── types/                 # TypeScript types (database enums, Supabase generated)
└── hooks/                 # Custom React hooks
```

## Database

- **32 tables** with Row-Level Security (RLS)
- **25 chapters** seeded (+ 1 in formation)
- **3 membership plans** (Individual $350, Corporate $550, Emerging $275)
- **4 storage buckets** (avatars, documents, event-images, board-files)
- Granular RBAC: member → committee → chapter board → national board → staff

## Brand

- **Colors:** Black & white foundation with `#CFA744` gold accent
- **Fonts:** Roboto (body), Raleway (display), Poppins (UI)
- **Logo:** WIPA wordmark (retained from wipa.org)

## Environment Variables

See `.env.local.example` for required keys:
- Supabase URL + anon key + service role key
- Stripe publishable + secret + webhook secret
- Mux token ID + secret
