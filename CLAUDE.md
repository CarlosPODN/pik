@AGENTS.md

# PIK

Next.js (App Router) + TypeScript + styled-components. All data is mocked; no database, auth or payments.

## Language

Everything in this repo is written in English: code, identifiers, comments, UI copy, metadata, docs (README, CLAUDE.md), commit messages, branch names and PR titles/descriptions. Don't mix languages within the repo, even when a request or a source document is in Spanish. Translate it.

## Package manager

Use pnpm (version pinned in `package.json` → `packageManager`). Never use npm or yarn, and never commit a `package-lock.json` or `yarn.lock`.

- `pnpm install`, `pnpm add <pkg>`, `pnpm add -D <pkg>`
- `pnpm dev`, `pnpm build`, `pnpm lint`
- If `pnpm install` reports ignored build scripts, decide per package in `pnpm-workspace.yaml` → `allowBuilds` (`true` to run it, `false` to skip) and leave a comment explaining why.

## Checks

- `pnpm format` / `pnpm format:check`: Prettier
- `pnpm lint`: ESLint (Next.js rules; formatting rules are turned off in favor of Prettier)
- `pnpm typecheck`: generates Next.js route types, then runs `tsc --noEmit`
- `pnpm build`: production build

lefthook (`lefthook.yml`) registers git hooks on `pnpm install`:

- pre-commit: Prettier and ESLint `--fix` on staged files; fixes are re-staged.
- pre-push: branch name format, typecheck and lint.

CI (`.github/workflows/ci.yml`) runs on every PR and push to `main`: branch name (PRs only), `format:check`, `lint`, `typecheck` and `build`. Don't bypass hooks with `--no-verify`; fix the failure instead. Run the checks before opening a PR.

## Git workflow

Every new task starts on a new branch created from an up-to-date `main`. Never commit directly to `main`.

Branch names use the format `<type>/<brief-task-explanation>`:

- `<type>` is the purpose of the change, in lowercase:
  - `feat`: a new feature or user-facing behavior
  - `fix`: a bug fix
  - `chore`: tooling, config, dependencies, housekeeping
  - `refactor`: restructuring code without changing behavior
  - `style`: visual or styling-only changes
  - `docs`: documentation only
- `<brief-task-explanation>` is a short description in kebab-case (lowercase words joined by hyphens), ideally 2–5 words.
- The separator is `/`, not `:`. Git rejects `:` in branch names.

Examples: `feat/business-signup-flow`, `fix/booked-slots-selectable`, `chore/add-claude-md`.

When the task is done, push the branch and open a pull request into `main`.

## Styling

- Colors, fonts and radii live in the theme at `src/styles/theme.ts`, provided app-wide by `ThemeProvider` in `src/components/Providers.tsx`.
- Always read colors from the theme in styled components (`${({ theme }) => theme.colors.primary}`). Don't hardcode hex values in components.
- Prefer the semantic `theme.colors.*` roles. Use `theme.palette.*` (the raw PIK brand colors) only when no role fits, and add a new role to the theme if the need repeats.
- Text on `success` (mint) or `attention` (flama) must use `onSuccess` / `onAttention`. White on those colors fails contrast.
- styled-components only works in Client Components: files that define styled components need `"use client"`. Keep pages and layouts as Server Components where possible and render styled client components from them.
- Design mobile-first: base styles target phones, and wider layouts are added with `theme.media.md` / `theme.media.lg` (`min-width` queries). Do responsive switches in CSS, not with JS media-query hooks, so server-rendered HTML is right on every screen size.
- Use `theme.space`, `theme.radii`, `theme.shadows` and `theme.layout` for spacing, corners, shadows and shell sizes instead of raw values.
- The app shell (top bar, sidebar/drawer, nav) lives in `src/components/AppShell/`; add navigation entries in `navItems.ts`.
