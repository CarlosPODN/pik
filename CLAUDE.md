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

## Project structure

```
src/
├── app/                    Routes only: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
│   ├── <route>/
│   │   ├── page.tsx
│   │   └── _components/    Components used only by this route (private folder, ignored by the router)
│   └── api/                Route Handlers that return mock data
├── components/             Shared UI used by more than one route, grouped by kind:
│   ├── buttons/            Button/ (Button + Button.styles), ButtonLink (renders ButtonWrapper), BackLink
│   ├── fields/             Form controls: TextField, SelectField (both use the shared Field.styles.ts)
│   ├── modals/             Dialog
│   ├── layout/             AppShell, PageLayout, CardGrid, Panel, PagePlaceholder
│   ├── feedback/           Empty, loading and status states: EmptyState, PageSkeleton
│   └── Icon/               Icon and its icons/
├── hooks/                  Shared client hooks
├── lib/
│   └── data/               Data access: the only code that reads src/mocks
├── mocks/                  Mock data as typed TypeScript modules
├── types/                  Domain types (Business, StaffMember, Appointment, Session, ...)
├── schemas/                zod schemas by domain (business.ts, staff.ts): validation rules and messages
└── styles/                 Theme and global styles
```

- `src/app/` holds routing files only. A component used by a single route goes in that route's `_components/` folder (e.g. `app/register/_components/BusinessCard/BusinessCard.tsx`). Folders starting with `_` are private: Next.js never turns them into routes.
- Move a component up to `src/components/<group>/` as soon as a second route needs it, in the group that matches what it is (a new kind of component gets a new group). Never import from another route's `_components/`.
- App-wide providers (styled-components registry, `ThemeProvider`, global styles) live in `src/app/_components/Providers.tsx`, used only by the root layout.
- A component with its own sub-components gets a folder, as described under Styling (`AppShell/AppShell.tsx` + `AppShell/components/`).
- Pages and layouts are Server Components when they read server data (the session, `params`, `src/lib/data/`), and pass it as props to client components. A page whose content is all client-side (like `/register`, which reads localStorage) can be the client component itself instead of wrapping one; since only Server Components can export `metadata`, its title then goes in the segment's `layout.tsx` (see `app/register/`). When a page needs server data, it stays a Server Component and renders one client component as a single file in `_components/` (`app/register/[id]/_components/BusinessSettings.tsx`), not a folder of its own.
- Mock data lives in `src/mocks/` and is typed with `src/types/`. Only `src/lib/data/` imports from `src/mocks/`, so replacing the mocks with a real API later changes one folder.
- Use Route Handlers (`src/app/api/.../route.ts`) when the client has to fetch or send data after the page loads (e.g. free time slots for a chosen date, confirming a booking). They also read through `src/lib/data/`.
- Types shared across features go in `src/types/`. Props types stay next to their component.
- The "logged" state is the role the person picked (`client` or `business`, `src/types/session.ts`). The UI names the person by `ROLE_LABELS` in `src/lib/constants.ts`: "Cliente" and "Profesional" (never "Negocio", which names the businesses). The role is kept in the `pik-session` cookie (`SESSION_COOKIE`), so the server knows it before rendering. Server Components read it with `getSession()` (`src/lib/session.ts`), inside a Suspense boundary since it's request-time data; client components get the role as a prop. Only the server actions in `src/lib/sessionActions.ts` write it: starting a flow from the landing calls `startSession(role)`, which saves the role and redirects to its `ROLE_HOME`; "Cambiar de perfil" in the sidebar calls `endSession()`, which clears it and redirects to `/`. Both are form actions. The root layout renders `SessionAppShell` inside Suspense, with the logged-out shell as the fallback.
- Browser-saved data uses `createLocalStore` (`src/lib/localStore.ts`) and is read with `useStoredValue` (`src/hooks/useStoredValue.ts`). The businesses and the booked appointments (`pik:appointments`, `useAppointments()`) work this way. When a page must not render a wrong first guess before localStorage is read, wait for `useHydrated()` and show a loading state (as `app/register/page.tsx` does).
- The home page (`app/page.tsx`) reads the session on the server and follows the role: the landing while logged out, and once a role is picked, a welcome plus the client's appointments, or the upcoming appointments across the business's businesses. List pages use `PageLayout` and `CardGrid` from `src/components/`.
- Businesses (`pik:businesses`, `useBusinesses()`, `src/lib/businesses.ts`) are listed and added at `/register` as placeholders ("Negocio 2") and edited at `/register/[id]`: name, category and phone, plus location (address, city) and weekly opening hours, all saved together. Businesses saved before a field existed get its default when read (`normalizeBusiness`), so add new fields the same way. Staff is part of the settings form (`staff` in `businessFormSchema`) and saves with everything else on "Guardar cambios": `StaffCard` edits it through the form's `control` (add "Empleado N" with `newStaffMember`, edit name and role in `StaffMemberDialog`, remove), and nothing is stored before that. Staff members have their own `touched` with the same rule as businesses: while the newest one is unedited, "Agregar empleado" opens a dialog instead of adding (`findUntouched` works for both). A staff member's role is picked from the roles for the category currently picked in the form, saved or not (`roleOptions`), stored as a key (`StaffRole`); the form won't save while an added staff member is still unedited or a role doesn't fit the picked category, and the error shows under that person's row. `StaffCard` and the save buttons sit outside the page `<form>` (the staff dialog has its own form, and forms can't nest), so the save buttons submit through `form={formId}`. With unsaved changes in the settings form, `useLeaveGuard` (`src/hooks/useLeaveGuard.ts`) holds any in-app link click behind a "Tienes cambios sin guardar" dialog and arms the browser's reload/close warning; reuse it for other forms. Saving the settings once sets `touched`; while the newest business is untouched, "Agregar negocio" opens a dialog instead of adding another. The "Eliminar negocio" row in the settings deletes a business after a confirmation dialog, unless it has pending appointments (`businessId` matches and `startsAt` is in the future), which opens a dialog explaining why instead; placeholder numbers never repeat after a delete.
- Dynamic routes: with Cache Components, a param that's only known at request time must be read inside `<Suspense>`: the page awaits `params` and passes the value to its client component as a prop, and the route's `loading.tsx` is the boundary (see `app/register/[id]/`), and so must `usePathname()` in the layout (see `NavItem`), or prerendering fails.
- Navigation follows the role: a nav item with `role` in `navItems.ts` only shows for that role; items without one (Inicio) always show.
- Routes follow the role too: every route except `/` belongs to one role, set by `ROLE_HOME` in `src/lib/constants.ts` (the role owns that path and everything under it). `src/proxy.ts` (Next.js's renamed middleware) redirects anyone logged out or in the other role to `/` before the route renders. When adding a role route, update `ROLE_HOME` and the proxy's `matcher` together.
- Server state vs. client state: the session lives on the server (cookie) and is read by Server Components; client components handle interaction (forms, dialogs, the drawer, tabs) and the data still kept in the browser (businesses, appointments, see below).
- Forms use React Hook Form, with the rules in a zod schema in `src/schemas/`, one file per domain (`business.ts`, `staff.ts`), not next to the form wired through `zodResolver`. Don't put rules in `register()` options. The schema's input is what the fields hold and its output is what gets saved (trimmed text, the phone's digits), so type the form `useForm<z.input<…>, unknown, z.output<…>>`. Each field shows its first failing rule, so list the "empty" check first; messages are Spanish. `TextField` and `SelectField` take `{...register("field")}` (ref included, so the first invalid field gets focus); a custom input like `HoursEditor` goes through `Controller` and forwards `field.ref`. The defaults (validate on submit, then on change) are the intended behavior. Unsaved changes come from `formState.isDirty` (feed it to `useLeaveGuard`); after saving, `reset()` to the saved values.

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

- Colors, fonts and radii live in the theme at `src/styles/theme.ts`, provided app-wide by `ThemeProvider` in `src/app/_components/Providers.tsx`.
- Always read colors from the theme in styled components (`${({ theme }) => theme.colors.primary}`). Don't hardcode hex values in components.
- Prefer the semantic `theme.colors.*` roles. Use `theme.palette.*` (the raw PIK brand colors) only when no role fits, and add a new role to the theme if the need repeats.
- Text on `success` (mint) or `attention` (flama) must use `onSuccess` / `onAttention`. White on those colors fails contrast. Exception, by request: the "Sin editar" tags use white text on flama.
- styled-components only works in Client Components: files that define styled components need `"use client"`. Keep pages and layouts as Server Components where possible and render styled client components from them.
- Design mobile-first: base styles target phones, and wider layouts are added with `theme.media.md` / `theme.media.lg` (`min-width` queries). Do responsive switches in CSS, not with JS media-query hooks, so server-rendered HTML is right on every screen size.
- Use `theme.space`, `theme.radii`, `theme.shadows` and `theme.layout` for spacing, corners, shadows and shell sizes instead of raw values.
- The app shell (top bar, sidebar/drawer, nav) lives in `src/components/layout/AppShell/`; add navigation entries in `navItems.ts`.
- The shell's content area is the page frame for every route: it renders the `<main>` landmark, the page padding (`theme.layout.pagePadding`) and the overflow rules. The window scrolls vertically; horizontal overflow is clipped with `overflow-x: clip`. Pages render only their content: no `<main>`, no outer padding, no `overflow` or `100vw`/`100vh` sizing. Give scrollable widgets (tables, carousels) their own `overflow-x: auto`, and use `min-width: 0` on flex/grid children that hold long content.
- Icons: always render them through `<Icon name="calendar" />` from `src/components/Icon/Icon.tsx`. Never draw an inline `<svg>` in a component. To add an icon, create `src/components/Icon/icons/<Name>.tsx` with only its shapes (20×20 grid, strokes, no `<svg>` wrapper) and register it in the `ICONS` list in `Icon.tsx` under a kebab-case name. Icons are decorative (hidden from screen readers) unless you pass a Spanish `label`.
- A component with its own sub-components gets a folder: the entry component and its config/data at the folder root (`AppShell/AppShell.tsx`, `AppShell/navItems.ts`), and the sub-components only it uses in a nested `components/` folder (`AppShell/components/Sidebar/Sidebar.tsx`). Import the entry file from outside; don't import from another component's `components/` folder. If a sub-component is needed elsewhere, move it up to `src/components/`.

### One styled wrapper per component (BEM)

Each component has at most one styled component: `<ComponentName>Wrapper`, on the component's root element (`ButtonWrapper`, `SidebarWrapper`, `BusinessCardWrapper`). It lives in a `<ComponentName>.styles.ts` file, with `"use client"`, and the component imports it; the component file keeps only markup and logic. A component with a styles file gets its own folder holding both (`DeleteRow/DeleteRow.tsx` + `DeleteRow/DeleteRow.styles.ts`); a component without styles of its own stays a single file (`DeleteBusiness.tsx`). Import it by its full path (`@/components/buttons/Button/Button`). Everything inside it is plain HTML with BEM class names, styled from the wrapper with nested selectors. Group the element rules under the block's class and write them with `&__element` / `&__element--modifier`, as in Sass. Inside a styled component a bare `&` is the generated class (`.sc-x1y2`), so `&__label` only produces `.delete-row__label` from inside `.delete-row { }`; the rules end up as `.sc-x1y2 .delete-row__label`. Don't declare styled components for inner parts, and don't extend other components with `styled(Component)`; give them a BEM class instead.

```tsx
// DeleteRow.styles.ts
export const DeleteRowWrapper = styled.div`
  display: flex;

  .delete-row {
    &__label {
      font-weight: 600;
    }

    &__action--confirm {
      background: ${({ theme }) => theme.colors.danger};
    }
  }
`;

// DeleteRow.tsx
import { DeleteRowWrapper } from "./DeleteRow.styles";

export default function DeleteRow(...) {
  return (
    <DeleteRowWrapper className="delete-row">
      <p className="delete-row__label">{label}</p>
      <button className={clsx("delete-row__action", { "delete-row__action--confirm": armed })} />
    </DeleteRowWrapper>
  );
}
```

- Block: the component, in kebab-case (`sidebar`, `nav-item`, `delete-row`), set on the wrapper. One block per component file.
- Element: a part of the block, joined with `__` (`sidebar__nav`, `nav-item__label`), as a plain `className`.
- Modifier: a state or variant, joined with `--` (`sidebar--open`, `nav-item--active`). Build it with `clsx` and style it from the wrapper: `&.sidebar--open .sidebar__panel { ... }` (at the wrapper's top level) for a modifier on the block, `&__action--confirm { ... }` (inside `.delete-row { }`) for one on an element. Don't pass `$` props to drive styles.
- Shared components take plain props for their variants (`<Button variant="secondary" size="sm">`) and turn them into modifier classes. They accept a `className`, merged with `clsx`, so a parent can name and position them.
- To style a child component in a specific place, give it a BEM element class of the parent (`<ButtonLink className="flow-panel__cta">`) and style that class in the parent's wrapper. Never style another component's own classes.
- Components that share a look share the wrapper instead of a `css` helper: `TextField` and `SelectField` both use `FieldWrapper` from `Field.styles.ts`, and `ButtonLink` renders `ButtonWrapper` as a Next.js link with styled-components' `as` prop (`<ButtonWrapper as={Link}>`). Use a `css` fragment only when a look is reused outside its block, like `controlStyles` for the opening-hours time inputs.
- Order a component's body the same way every time, without divider comments: hooks (React, Next.js, React Hook Form, the app's own), then state (`useState`), then data requests, then derived values and helpers, then handlers, then `useEffect`s, then JSX pieces kept in variables, then the return (early returns included). Skip a group the component doesn't have. A value a hook needs goes in a module-level helper (like `startingValues` in `StaffMemberDialog`) so it doesn't break the order.
- Document every component with a JSDoc comment (`/** … */`) right above it, so hovering its name in the editor shows the docs: what it is, a short ` ```tsx ` usage example, then bold-labeled notes where they apply (**Accessibility**, **Suspense**, **Styling** with its BEM block and modifiers). Put the props in an exported `<Name>Props` interface with a `/** … */` line per prop. Markdown works in both (see `BackLink`).
- Always write the full class name (`"sidebar--open"`, not a string built from parts), so every class can be found with a search. The one exception is a modifier that mirrors a typed value, like `` `icon--${name}` `` in `Icon`, where `name` is an `IconName`.
- Don't nest elements in names (`sidebar__nav__item` is wrong). A reusable part becomes its own block (`nav-item`).
- A wrapper that must not affect layout (because its children belong to a parent's flex or grid) uses `display: contents`, like `SidebarWrapper`.
