# Prestige Motors

Sitio de la concesionaria **Prestige Motors** (Formosa, Argentina): landing +
stock filtrable de vehículos 0km y usados, con contacto directo por WhatsApp.
Inspirado en el diseño de
[soteautomotores.com](https://www.soteautomotores.com/#stock). Construido con
**Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase**, listo para
desplegar en **Vercel**.

## Stack

- **Next.js 16** (App Router, Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (config en `src/app/globals.css`, tema dark + dorado)
- **Supabase** (Postgres) para el stock de vehículos
- **Vercel** para el deploy

## Arranque rápido

```bash
npm install
npm run dev
# http://localhost:3000
```

> Sin credenciales de Supabase la app arranca igual: usa el stock real cargado
> en `src/lib/seed-data.ts` (Planilla Junio 2026) como fallback en memoria. Así
> el sitio funciona en Vercel sin configurar base de datos.

## Stock

El stock (43 unidades) se generó desde la planilla de Prestige Motors y vive en
`src/lib/seed-data.ts`. Los precios se muestran en su moneda real: la mayoría en
**pesos (ARS)** y algunas unidades en **USD**. Para ordenar y filtrar por precio
mezclando monedas, los USD se normalizan a pesos con una cotización aproximada
(`USD_TO_ARS` en `src/lib/format.ts`; ajustar ahí cuando cambie).

## Deploy en Vercel

El sitio funciona en Vercel **sin variables de entorno** (usa el stock del
fallback). Pasos:

1. Importar el repo en [vercel.com/new](https://vercel.com/new).
2. Vercel detecta Next.js automáticamente (build `next build`). Deploy.
3. (Opcional) Para administrar el stock desde una base, configurar Supabase
   (ver abajo) y cargar las dos variables de entorno.

## Configurar Supabase (opcional)

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor**, correr `supabase/migrations/0001_init.sql` (crea la
   tabla `cars` con RLS) y luego `supabase/seed.sql` (carga las 43 unidades).
3. Copiar `.env.example` a `.env.local` y completar con **Project Settings → API**:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```

4. Reiniciar el dev server (o cargar esas variables en Vercel). La app ahora lee
   el stock desde Supabase. La cotización USD→ARS también está en la columna
   generada `price_ars` de la migración: mantenerla en sync con `USD_TO_ARS`.

## Estructura

```
src/
  app/
    layout.tsx        # layout raíz (Header, Footer, botón WhatsApp)
    page.tsx          # landing: lee filtros de la URL y consulta el stock
    globals.css       # tema dark + dorado (Tailwind v4)
  components/         # Header, Hero, StockSection, CarCard, StockFilters, ...
  lib/
    types.ts          # tipos del dominio (Car, CarFilters, Currency)
    site.ts           # marca y datos de contacto (editar acá para re-brandear)
    cars.ts           # capa de datos (Supabase o fallback seed)
    seed-data.ts      # stock real (43 unidades)
    format.ts         # formato de precio ARS/USD, km y cotización USD_TO_ARS
    supabase/         # clientes browser/server + config
supabase/
  migrations/0001_init.sql
  seed.sql
```

## Funcionalidades

- **Stock filtrable** por marca, categoría, combustible, transmisión,
  kilómetros y precio; con orden (recientes, precio, km) y búsqueda por texto.
  Los filtros viven en la URL (`/?category=SUV&brand=Toyota&maxPrice=40000000`),
  así son compartibles y funcionan con Server Components.
- **Precios ARS/USD** mostrados en su moneda real; "Consultar" cuando no hay precio.
- **Contacto por WhatsApp** general y por unidad (mensaje pre-armado con el
  vehículo).
- Secciones **Nosotros / Consignar / Reseñas / Contacto** y botón flotante de WhatsApp.

## Cómo personalizar

- **Marca y contacto:** `src/lib/site.ts` (nombre, WhatsApp, dirección, redes).
- **Colores:** variables CSS en `src/app/globals.css` (`--accent`, etc.).
- **Stock:** editar `src/lib/seed-data.ts`, o cargar la tabla `cars` en Supabase.
  Para las fotos reales, subirlas a Supabase Storage y usar esas URLs en
  `image_url` (el dominio `*.supabase.co` ya está permitido en `next.config.ts`).

## Notas

- Las fotos actuales son placeholders de Unsplash por categoría; requieren red
  para cargar. Reemplazar por fotos reales de cada unidad para producción.
