create table products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,

  title text not null,
  platform text not null,
  product_url text,
  current_price integer not null,

  alert_enabled boolean default true,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table price_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,

  price integer not null,
  recorded_at timestamp with time zone default now()
);

create table alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,

  type text not null,
  title text not null,
  message text not null,

  metadata jsonb,
  read boolean default false,

  created_at timestamp with time zone default now()
);

alter table products enable row level security;
alter table price_history enable row level security;
alter table alerts enable row level security;

create policy "Users manage own products"
on products
for all
using (auth.uid() = user_id);

create policy "Users manage own price history"
on price_history
for all
using (
  product_id in (
    select id from products where user_id = auth.uid()
  )
);

create policy "Users manage own alerts"
on alerts
for all
using (auth.uid() = user_id);

