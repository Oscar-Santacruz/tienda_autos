-- Esquema inicial de Prestige Motors.
-- Tabla `cars` con el stock de vehículos.

create extension if not exists "pgcrypto";

create table if not exists public.cars (
  id           uuid primary key default gen_random_uuid(),
  brand        text not null,
  model        text not null,
  version      text,
  year         int  not null check (year >= 1950 and year <= 2100),
  km           int  not null default 0 check (km >= 0),
  -- Precio en la moneda de `currency`. NULL = "Consultar".
  price        numeric(14, 2) check (price is null or price >= 0),
  currency     text not null default 'ARS' check (currency in ('ARS', 'USD')),
  -- Precio normalizado a pesos, para filtrar/ordenar mezclando monedas.
  -- La cotización (1300) debe coincidir con USD_TO_ARS en src/lib/format.ts.
  price_ars    numeric(16, 2) generated always as (
                 case when currency = 'USD' then price * 1300 else price end
               ) stored,
  transmission text not null check (transmission in ('Automático', 'Manual')),
  fuel         text not null check (fuel in ('Nafta', 'Diésel', 'Híbrido', 'Eléctrico')),
  category     text not null check (category in
                 ('SUV', 'Sedán', 'Pick-up', 'Hatchback',
                  'Utilitario', 'Camión', 'Moto', 'Náutica')),
  color        text,
  image_url    text,
  featured     boolean not null default false,
  status       text not null default 'disponible' check (status in ('disponible', 'reservado', 'vendido')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists cars_status_idx    on public.cars (status);
create index if not exists cars_category_idx  on public.cars (category);
create index if not exists cars_brand_idx     on public.cars (brand);
create index if not exists cars_price_ars_idx on public.cars (price_ars);
create index if not exists cars_created_idx   on public.cars (created_at desc);

-- Mantener updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cars_set_updated_at on public.cars;
create trigger cars_set_updated_at
  before update on public.cars
  for each row execute function public.set_updated_at();

-- Row Level Security: lectura pública, escritura solo autenticada.
alter table public.cars enable row level security;

drop policy if exists "cars_public_read" on public.cars;
create policy "cars_public_read"
  on public.cars for select
  using (true);

drop policy if exists "cars_auth_write" on public.cars;
create policy "cars_auth_write"
  on public.cars for all
  to authenticated
  using (true)
  with check (true);
