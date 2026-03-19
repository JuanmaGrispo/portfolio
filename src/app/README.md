# `src/app/`

Carpeta de **routing** (App Router). Define rutas, layouts, páginas, loading/error boundaries y endpoints en `api/`.

## Qué va acá

- `layout.tsx`, `page.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`, `template.tsx`, etc.
- Route Groups (ej. `(marketing)`, `(dashboard)`) para agrupar sin afectar la URL.
- `api/` para handlers de API.

## Qué NO va acá

- Lógica de negocio y dominio: va en `src/features/`.
- UI compartida “dumb”: va en `src/components/`.

