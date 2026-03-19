# `src/app/api/`

Handlers de **API** (Route Handlers) expuestos por Next. Se usan para integrar servicios, webhooks o endpoints internos.

## Reglas

- Validar input (ver `src/lib/validations/`).
- Mantener lógica de dominio fuera del handler: delegar a `src/features/*/services` o `src/services/`.
- No acoplar respuestas a componentes; devolver JSON/Response.

