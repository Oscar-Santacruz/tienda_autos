# Tienda Autos

Tienda de autos premium (compra, venta y consignación) inspirada en el diseño de
[soteautomotores.com](https://www.soteautomotores.com/#stock). Construida con
**Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase**, lista para
desplegar en **Vercel**.

## Stack

- **Next.js 16** (App Router, Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (config en `src/app/globals.css`, tema dark premium)
- **Supabase** (Postgres) para el stock de vehículos
- **Vercel** para el deploy

## Arranque rápido

```bash
npm install
npm run dev
# http://localhost:3000
```

> Sin credenciales de Supabase la app arranca igual: usa datos de ejemplo
> (`src/lib/seed-data.ts`) como fallback. Ideal para desarrollar la UI sin base.

## Configurar Supabase

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor**, correr `supabase/migrations/0001_init.sql` (crea la
   tabla `cars` con RLS) y luego `supabase/seed.sql` (carga 12 autos de ejemplo).
3. Copiar `.env.example` a `.env.local` y completar con los valores de
   **Project Settings → API**:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```

4. Reiniciar el dev server. La app ahora lee el stock desde Supabase.

## Deploy en Vercel

1. Importar el repo en [vercel.com/new](https://vercel.com/new).
2. Cargar las mismas dos variables de entorno
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
3. Deploy. Vercel detecta Next.js automáticamente (build `next build`).

## Estructura

```
src/
  app/
    layout.tsx        # layout raíz (Header, Footer, botón WhatsApp)
    page.tsx          # landing: lee filtros de la URL y consulta el stock
    globals.css       # tema dark premium (Tailwind v4)
  components/         # Header, Hero, StockSection, CarCard, StockFilters, ...
  lib/
    types.ts          # tipos del dominio (Car, CarFilters)
    site.ts           # marca y datos de contacto (editar acá para re-brandear)
    cars.ts           # capa de datos (Supabase o fallback seed)
    seed-data.ts      # 12 autos de ejemplo
    format.ts         # formato de precio y km
    supabase/         # clientes browser/server + config
supabase/
  migrations/0001_init.sql
  seed.sql
```

## Cómo personalizar

- **Marca y contacto:** `src/lib/site.ts` (nombre, WhatsApp, dirección, redes).
- **Colores:** variables CSS en `src/app/globals.css` (`--accent`, etc.).
- **Stock real:** cargar autos en la tabla `cars` de Supabase. Para las fotos,
  subirlas a Supabase Storage y usar esas URLs en `image_url` (el dominio
  `*.supabase.co` ya está permitido en `next.config.ts`).

## Notas

- Las fotos de ejemplo son de Unsplash; requieren red para cargar (no se ven en
  entornos sin salida a internet, sí en Vercel).
- Los filtros de stock viven en la URL (`/?category=SUV&maxPrice=50000`), así son
  compartibles y funcionan con Server Components.
