@AGENTS.md

# PIK

Next.js (App Router) + TypeScript + styled-components. All data is mocked; no database, auth or payments.

## Language

- **English** for everything developers read: code, identifiers, route folder names, comments, docs (README, CLAUDE.md), commit messages, branch names and PR titles/descriptions.
- **Spanish** for everything users see or hear: UI text, buttons, labels, validation and empty/error/success messages, `aria-label`s, `alt` text, page titles and metadata. The root layout sets `<html lang="es">`.
- Write UI copy in neutral Latin American Spanish and address the user as "tú".
- Don't mix languages within each group. Translate English UI copy into Spanish, and Spanish requests or source documents into English for code and docs.

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
- A component with its own sub-components gets a folder: the entry component and its config/data at the folder root (`AppShell/AppShell.tsx`, `AppShell/navItems.ts`), and the sub-components only it uses in a nested `components/` folder (`AppShell/components/Sidebar.tsx`). Import the entry file from outside; don't import from another component's `components/` folder. If a sub-component is needed elsewhere, move it up to `src/components/`.

### Class names (BEM)

Every styled component and every styled element also gets a BEM class name, built with the `bem()` helper from `src/styles/bem.ts`. styled-components still scopes the styles; the BEM classes make the DOM readable in DevTools and give tests stable selectors.

- Block: the component, in kebab-case (`sidebar`, `nav-item`, `page-placeholder`). One block per component file: `const b = bem("sidebar");`.
- Element: a part of the block, joined with `__` (`sidebar__nav`, `nav-item__label`) → `b("nav")`.
- Modifier: a state or variant, joined with `--` and driven by props (`sidebar--open`, `nav-item--active`) → `b(undefined, { open: $open })`.
- Attach them with `.attrs`: `styled.nav.attrs({ className: b("nav") })` for static classes; `styled.aside.attrs<{ $open: boolean }>(({ $open }) => ({ className: b(undefined, { open: $open }) }))` for modifiers. For plain elements, pass `className={b("label")}`.
- Style with styled-components only. Never target BEM classes in CSS, and never use them to style another component; they are names, not styling hooks.
- Don't nest elements in names (`sidebar__nav__item` is wrong). A reusable part becomes its own block (`nav-item`).
