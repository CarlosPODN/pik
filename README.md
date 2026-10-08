# PIK

Next.js (App Router) + TypeScript + styled-components, managed with pnpm.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Development server                           |
| `pnpm build`        | Production build                             |
| `pnpm lint`         | ESLint                                       |
| `pnpm typecheck`    | Generates Next.js route types, then runs tsc |
| `pnpm format`       | Formats with Prettier                        |
| `pnpm format:check` | Checks formatting without changing files     |

`pnpm install` registers the lefthook git hooks: formatting and lint before every commit; branch name, types and lint before every push. CI runs the same checks on every PR.
