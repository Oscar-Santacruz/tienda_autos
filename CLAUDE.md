@AGENTS.md

# Tienda Autos — guía para Claude

Tienda de autos premium (estilo soteautomotores.com) con stock filtrable.
Objetivo: sitio de dealership con landing + sección de stock, listo para Vercel.

## Stack

- Next.js 16 (App Router, Server Components, Turbopack) + TypeScript
- Tailwind CSS v4 — la config vive en `src/app/globals.css` (NO hay
  `tailwind.config.js`). Los colores del tema son variables CSS en `:root`
  y se exponen a Tailwind vía `@theme inline`.
- Supabase (Postgres) para el stock.

## Convenciones importantes de esta versión de Next

- `params` y `searchParams` son **Promises**: hay que hacerles `await`.
- `cookies()` (next/headers) es **async**: por eso el cliente Supabase server
  (`src/lib/supabase/server.ts`) es una función async.
- Ante dudas de API, leer los docs incluidos en `node_modules/next/dist/docs/`.

## Arquitectura de datos

- `src/lib/cars.ts` es la única capa de acceso al stock.
  - Si hay credenciales de Supabase (`isSupabaseConfigured`), consulta la tabla
    `cars` empujando los filtros a SQL.
  - Si no, cae a `src/lib/seed-data.ts` y filtra en memoria.
  - Mantener ambas ramas en sync al agregar filtros nuevos.
- Los filtros se leen de la URL en `src/app/page.tsx` (`parseFilters`) y se
  escriben desde `src/components/StockFilters.tsx` (client, `router.replace`).
- Tipos del dominio en `src/lib/types.ts`.

## Marca / contenido

- Nombre, tagline, contacto y nav: `src/lib/site.ts`. Cambiar ahí re-brandea todo.

## Base de datos

- Esquema: `supabase/migrations/0001_init.sql` (tabla `cars`, RLS: lectura
  pública, escritura autenticada).
- Seed: `supabase/seed.sql`.
- Al cambiar el esquema, actualizar también el tipo `Car` en `src/lib/types.ts`.

## Comandos

- `npm run dev` — desarrollo
- `npm run build` — build de producción (correr antes de dar algo por terminado)
- `npm run lint` — ESLint

## Notas de entorno

- Google Fonts está deshabilitado a propósito (se usa un stack de fuentes del
  sistema) para que el build funcione sin salida a internet. No re-agregar
  `next/font/google` salvo que haga falta.
- Fotos de ejemplo desde Unsplash (dominio permitido en `next.config.ts`).
  Para producción, subir las fotos a Supabase Storage.
