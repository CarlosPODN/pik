# PIK

Next.js (App Router) + TypeScript + styled-components, managed with pnpm.

## Cómo correr el proyecto

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000.

## Scripts

| Comando             | Qué hace                                         |
| ------------------- | ------------------------------------------------ |
| `pnpm dev`          | Servidor de desarrollo                           |
| `pnpm build`        | Build de producción                              |
| `pnpm lint`         | ESLint                                           |
| `pnpm typecheck`    | Genera los tipos de rutas de Next.js y corre tsc |
| `pnpm format`       | Formatea con Prettier                            |
| `pnpm format:check` | Verifica el formato sin modificar archivos       |

`pnpm install` instala los git hooks de lefthook: formato y lint antes de cada commit; nombre de rama, tipos y lint antes de cada push. CI corre las mismas validaciones en cada PR.
