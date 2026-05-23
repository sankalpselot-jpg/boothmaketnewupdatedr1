# BoothMarket — B2B Exhibition Booth Rental Marketplace

A production-ready full-stack Next.js 14 + Supabase marketplace for renting exhibition booths, furniture, A/V and flooring across **Europe 🇪🇺**, **United Kingdom 🇬🇧** and **India 🇮🇳**.

---

## Tech Stack

| Layer        | Technology                                        |
|--------------|---------------------------------------------------|
| Frontend     | Next.js 14 App Router · TypeScript · Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL · Auth · Storage · Edge Fns) |
| Hosting      | Vercel **Hobby plan compatible** ✅               |
| State        | Zustand (region/currency, persisted)              |
| Fonts        | next/font/google (Syne + DM Sans)                 |
| Toasts       | react-hot-toast                                   |

---

## Project Structure

```
boothmarket/
├── src/
│   ├── app/
│   │   ├── (auth)/               # Login · Register · Forgot Password
│   │   ├── (dashboard)/          # Customer dashboard (orders · quotes · profile)
│   │   ├── admin/                # Admin panel (products · orders · quotes · users · venues)
│   │   ├── api/                  # REST API routes (products · cart · orders · quotes · venues · webhook)
│   │   ├── products/             # Listing page + [slug] detail
│   │   ├── cart/                 # Cart page
│   │   ├── checkout/             # 3-step checkout
│   │   ├── quote/                # Quote request + confirmation
│   │   ├── shows/                # Trade show calendar
│   │   ├── contact/              # Contact page
│   │   ├── how-it-works/         # How It Works
│   │   ├── privacy/              # GDPR / UK GDPR / PDPB Privacy Policy
│   │   └── tax-faqs/             # VAT & GST FAQ
│   ├── components/
│   │   ├── admin/                # ProductForm (create/edit)
│   │   ├── home/                 # Hero · Products · Venues · HowItWorks · Compliance · Trust · CTA
│   │   ├── layout/               # Header · Footer · Topbar · ShowsTicker · CookieBanner
│   │   ├── product/              # ProductCard · ProductDetail · ProductsGrid
│   │   └── region/               # RegionBar (EU/UK/IN switcher + currency toggle)
│   ├── hooks/
│   │   ├── useAuth.ts            # Supabase auth + profile
│   │   ├── useCart.ts            # Cart CRUD (Supabase real-time)
│   │   └── useRegion.ts          # Zustand region/currency (persisted)
│   ├── lib/
│   │   ├── supabase/             # client · server · admin · middleware
│   │   └── utils/                # currency · regions · helpers
│   ├── middleware.ts             # Auth guard + session refresh
│   ├── styles/globals.css        # Tailwind base + component classes
│   └── types/database.ts         # Full TypeScript schema types
├── supabase/
│   ├── config.toml
│   ├── migrations/               # 001 schema · 002 RLS · 003 storage · 004 functions
│   ├── seed/seed.sql             # Categories · venues (EU/UK/IN) · sample products
│   └── functions/                # Edge functions (order confirmation · quote notification)
├── .env.example
├── vercel.json                   # Vercel Hobby-plan compatible (no multi-region)
├── next.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create Supabase project

1. Go to [app.supabase.com](https://app.supabase.com) → New project
2. Copy **Project URL** and **API keys** from Settings → API

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
WEBHOOK_SECRET=any_random_string_32chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run database migrations

Option A — Supabase CLI:
```bash
npm install -g supabase
supabase link --project-ref <your-project-ref>
supabase db push
```

Option B — Supabase Dashboard (SQL Editor):
Run each file in order:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_rls_policies.sql`
3. `supabase/migrations/003_storage.sql`
4. `supabase/migrations/004_functions.sql`
5. `supabase/seed/seed.sql`

### 5. Create your admin account

1. Register at `http://localhost:3000/register`
2. In Supabase Dashboard → SQL Editor, run:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

3. Visit `http://localhost:3000/admin`

### 6. Run locally

```bash
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel (Free Hobby Plan)

> ✅ `vercel.json` has been configured for Hobby plan — multi-region is removed.

### Option A — Vercel Dashboard (recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add all environment variables from `.env.example`
5. Deploy

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Add environment variables in Vercel Dashboard → Project → Settings → Environment Variables.

---

## API Reference

| Method | Endpoint            | Auth         | Description                    |
|--------|---------------------|--------------|--------------------------------|
| GET    | `/api/products`     | Public       | List products (filterable)     |
| POST   | `/api/products`     | Admin        | Create product                 |
| GET    | `/api/products/:id` | Public       | Get product by ID              |
| PATCH  | `/api/products/:id` | Admin        | Update product                 |
| DELETE | `/api/products/:id` | Admin        | Soft-delete product            |
| GET    | `/api/cart`         | User         | Get cart items                 |
| POST   | `/api/cart`         | User         | Add item to cart               |
| DELETE | `/api/cart?id=`     | User         | Remove item / clear cart       |
| GET    | `/api/orders`       | User / Admin | List orders                    |
| POST   | `/api/orders`       | User         | Create order from cart         |
| GET    | `/api/orders/:id`   | User / Admin | Get order detail               |
| PATCH  | `/api/orders/:id`   | Admin        | Update order status            |
| GET    | `/api/quotes`       | User / Admin | List quotes                    |
| POST   | `/api/quotes`       | Public       | Submit quote request           |
| GET    | `/api/quotes/:id`   | User / Admin | Get quote detail               |
| PATCH  | `/api/quotes/:id`   | Admin        | Update quote status / amount   |
| GET    | `/api/venues`       | Public       | List venues (filter by region) |
| GET    | `/api/categories`   | Public       | List categories                |
| POST   | `/api/webhook`      | Secret       | Trigger edge functions         |

---

## Environment Variables

| Variable                           | Required | Description                              |
|------------------------------------|----------|------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`         | ✅       | Supabase project URL                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`    | ✅       | Supabase anon/public key                 |
| `SUPABASE_SERVICE_ROLE_KEY`        | ✅       | Supabase service role key (server only)  |
| `WEBHOOK_SECRET`                   | ✅       | Random secret for `/api/webhook`         |
| `NEXT_PUBLIC_APP_URL`              | ✅       | Full app URL (e.g. `https://yourdomain.com`) |
| `STRIPE_SECRET_KEY`                | Optional | For Stripe payment integration           |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Stripe publishable key                 |

---

## License

MIT © BoothMarket 2026
