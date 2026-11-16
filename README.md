# ShopNest

A responsive Next.js storefront with product discovery, cart management, customer authentication, and Cash on Delivery checkout.

## Stack
- Next.js 14 App Router, React 18, TypeScript
- Supabase Auth and PostgreSQL for persistent accounts and orders
- CSS Modules and Lucide icons

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
``

The storefront runs in demo mode without Supabase credentials. Demo accounts and demo orders are stored only in the browser and are not real customer records.

## Enable the backend
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
4. Enable Email authentication in Supabase.
5. Restart the Next.js server.

The service-role key is server-only and must never use a `NEXT_PUBLIC_` prefix. The order endpoint validates the customer's Supabase access token, looks up product prices from the server-side catalog, and writes order and line-item records. Checkout currently supports Cash on Delivery; no card payments are processed.

## Notes
- Demo catalog prices have been converted to approximate INR values for the India storefront.
- Shipping is ₹49 below ₹499 and free above that threshold.
- GST is treated as included in the displayed prices in this demo. Configure tax rules for your actual products and business before launch.
- The Supabase schema stores monetary values as integer paise to avoid floating-point rounding.
- Product inventory and catalog administration are not yet connected to a live database. The SQL schema is ready for that next step.

## Commands
- `npm run dev`: local development
- `npm run typecheck`: TypeScript validation
- `npm run build`: production build
