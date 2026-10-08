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

Every new task starts on a new branch created from an up-to-date `main`, and every branch is checked out in its own git worktree. Never commit directly to `main`, and don't switch branches in the main checkout. This lets several branches be open and running at the same time.

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

### Worktrees

- The main checkout (`pik/`) must always be on `main`. Never check out a feature branch there; use it only to update `main` and to create worktrees.
- If the main checkout is found on a feature branch, move that branch into its own worktree. Make sure the working tree is clean, then switch to `main` first (a branch can only be checked out in one worktree at a time). From the folder that contains `pik/`: `git -C pik switch main && git -C pik worktree add ../pik.worktrees/feat-app-shell-layout feat/app-shell-layout`
- Worktrees live in a sibling folder outside the repo: `../pik.worktrees/<type>-<brief-task-explanation>` (the `/` becomes `-` in the folder name).
- Keep worktrees outside the repo. A nested worktree would be picked up by ESLint, Prettier, TypeScript and Next.js file scanning, and would need its own `.gitignore` handling.
- A branch can only be checked out in one worktree at a time.

Commands, run from the main checkout unless noted:

- Create: `git fetch origin && git worktree add -b feat/business-signup-flow ../pik.worktrees/feat-business-signup-flow origin/main`
- Set up: `cd ../pik.worktrees/feat-business-signup-flow && pnpm install`. Each worktree has its own `node_modules`; pnpm's shared store keeps this fast. lefthook hooks are shared across worktrees through the common `.git` dir.
- Run several at once: give each dev server its own port, e.g. `pnpm dev --port 3001`.
- List: `git worktree list`
- Clean up after the PR is merged: `git worktree remove ../pik.worktrees/<folder>`, then `git branch -d <branch>`. `git worktree prune` clears stale entries.

When the task is done, push the branch and open a pull request into `main`.

## Styling

- Colors, fonts and radii live in the theme at `src/styles/theme.ts`, provided app-wide by `ThemeProvider` in `src/components/Providers.tsx`.
- Always read colors from the theme in styled components (`${({ theme }) => theme.colors.primary}`). Don't hardcode hex values in components.
- Prefer the semantic `theme.colors.*` roles. Use `theme.palette.*` (the raw PIK brand colors) only when no role fits, and add a new role to the theme if the need repeats.
- Text on `success` (mint) or `attention` (flama) must use `onSuccess` / `onAttention`. White on those colors fails contrast.
- styled-components only works in Client Components: files that define styled components need `"use client"`. Keep pages and layouts as Server Components where possible and render styled client components from them.
- Design mobile-first: base styles target phones, and wider layouts are added with `min-width` media queries.
