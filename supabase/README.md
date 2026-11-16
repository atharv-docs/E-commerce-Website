# Supabase setup

1. Create a Supabase project.
2. Run `schema.sql` in the SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
4. Enable Email auth in Authentication → Providers.
5. Add product rows through the Supabase dashboard or a trusted server-side seed script. Store prices in paise to avoid floating-point currency errors.

The storefront can run in demo mode without these variables. Supabase authentication is enabled when both values are present. Never expose the service-role key in a browser bundle.
