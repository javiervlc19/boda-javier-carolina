# Javier & Carol — Web de boda

Web de invitación de boda construida con Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, Supabase y React Hook Form + Zod.

## 1. Requisitos

- Node.js 18.18 o superior (se ha desarrollado con Node 24).
- Una cuenta gratuita en [Supabase](https://supabase.com).
- Una cuenta en [Vercel](https://vercel.com) para el despliegue.

## 2. Instalación local

```bash
npm install
```

## 3. Configurar Supabase

1. Crea un proyecto nuevo en https://supabase.com/dashboard.
2. Ve a **SQL Editor > New query**, pega el contenido de `supabase/schema.sql`
   y ejecútalo. Esto crea la tabla `wedding_guests` con Row Level Security
   activada y una política que solo permite `INSERT` a usuarios anónimos
   (nadie puede leer las respuestas de otros invitados desde el navegador).
3. Ve a **Project Settings > API** y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (¡mantenla secreta!)

## 4. Variables de entorno

Copia el archivo de ejemplo y rellena los valores:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
ADMIN_PASSWORD=elige-una-contraseña-segura
```

`.env.local` nunca se sube a git (ya está en `.gitignore`).

## 5. Desarrollo

```bash
npm run dev
```

Abre http://localhost:3000. La web principal está en `/` y el panel de
administración en `/admin` (protegido con `ADMIN_PASSWORD`).

## 6. Compilar para producción

```bash
npm run build
npm run start
```

## 7. Personalizar el contenido

Todo el contenido editable (nombres, fechas, direcciones, horarios de
autobús, hoteles, WhatsApp, IBAN, etc.) está centralizado en
`data/wedding.ts`. Edita ese archivo para actualizar la web sin tocar los
componentes.

Las imágenes de `public/images/` son placeholders generados con el script
`scripts/generate-images.mjs` (usa la librería `sharp`). Para usar fotos
reales, sustituye los archivos `hero.jpg`, `venue.jpg`, `story-1.jpg`,
`story-2.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg` y
`og-image.jpg` por tus propias fotografías manteniendo el mismo nombre de
archivo (o actualiza las referencias en los componentes de `components/`).

## 8. Panel de administración

- URL: `/admin`
- Se accede con la contraseña definida en `ADMIN_PASSWORD`.
- La autenticación se valida en el servidor (nunca en el navegador) y crea
  una cookie de sesión `httpOnly` firmada con HMAC.
- Lee todas las confirmaciones usando `SUPABASE_SERVICE_ROLE_KEY` desde el
  servidor (esta clave nunca llega al navegador).
- Incluye KPIs, búsqueda por nombre, filtros por asistencia/autobús y
  exportación a CSV.

## 9. Desplegar en Vercel

### Opción A: con la CLI de Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Sigue las preguntas del asistente (vincula el proyecto, confirma el
directorio raíz). Cuando el proyecto esté creado, añade las variables de
entorno:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add ADMIN_PASSWORD production
```

(Repite con `preview` y `development` si quieres los mismos valores en esos
entornos, o usa valores distintos.)

Despliega a producción:

```bash
vercel --prod
```

### Opción B: desde el dashboard de Vercel

1. Sube este proyecto a un repositorio de GitHub/GitLab/Bitbucket.
2. Entra en https://vercel.com/new e importa el repositorio.
3. En **Environment Variables**, añade las 4 variables de `.env.example`
   con sus valores reales.
4. Pulsa **Deploy**.

## 10. Conectar un dominio propio

1. En el dashboard de Vercel, entra en el proyecto → **Settings > Domains**.
2. Añade tu dominio (por ejemplo `javierycarol.com`).
3. Vercel te mostrará los registros DNS que debes crear en tu proveedor de
   dominios (normalmente un registro `A` apuntando a `76.76.21.21` o un
   `CNAME` a `cname.vercel-dns.com`, según el subdominio).
4. Espera a que se verifique (puede tardar hasta unas horas) — Vercel emite
   el certificado SSL automáticamente.

## Estructura del proyecto

```
app/                    Rutas de Next.js (App Router)
  page.tsx              Página principal (compone todas las secciones)
  layout.tsx            Layout raíz, fuentes y metadatos SEO
  icon.tsx              Favicon generado dinámicamente (J | C)
  admin/page.tsx         Panel de administración (protegido)
  api/admin/login/       Ruta API de login (verifica ADMIN_PASSWORD)
  api/admin/logout/      Ruta API de logout
components/             Componentes de UI, uno por sección
  admin/                 Componentes del panel de administración
data/wedding.ts         Configuración editable de toda la boda
lib/
  supabase.ts            Cliente Supabase público (solo INSERT)
  supabase-admin.ts       Cliente Supabase con service role (solo servidor)
  admin-session.ts        Cookies de sesión firmadas para /admin
  rsvp-schema.ts          Validación Zod del formulario de asistencia
  useInView.ts            Hook para animaciones fade-up al hacer scroll
public/images/          Imágenes (placeholders generados con sharp)
scripts/generate-images.mjs  Script para regenerar los placeholders
supabase/schema.sql     SQL para crear la tabla wedding_guests con RLS
```
