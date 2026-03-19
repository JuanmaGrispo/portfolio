# `src/`

Este directorio contiene **todo el código fuente** de la aplicación.

## Reglas

- Usar imports con alias `@/*` (mapeado a `src/*`) para evitar rutas relativas largas.
- Separar **routing** (`app/`) de **dominio/negocio** (`features/`).
- Evitar lógica de negocio en componentes compartidos; esa lógica vive en `features/`.

