-- ShopNest production starter schema (Supabase / PostgreSQL)
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  price_paise integer not null check (price_paise >= 0),
  compare_at_price_paise integer check (compare_at_price_paise is null or compare_at_price_paise >= price_paise),
  image_urls text[] not null default '{}',
  category text not null,
  inventory integer not null default 0 check (inventory >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  subtotal_paise integer not null check (subtotal_paise >= 0),
  shipping_paise integer not null default 0 check (shipping_paise >= 0),
  tax_paise integer not null default 0 check (tax_paise >= 0),
  total_paise integer not null check (total_paise >= 0),
  shipping_address jsonb not null,
  payment_reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price_paise integer not null check (unit_price_paise >= 0),
  quantity integer not null check (quantity between 1 and 10)
);

create index if not exists products_category_active_idx on public.products(category, active);
create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Anyone can read active products" on public.products for select using (active = true);
create policy "Customers can read their own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Customers can read items in their own orders" on public.order_items for select
  using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

-- Product writes are intentionally restricted to service-role/admin tooling.
