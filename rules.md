# Frontend Engineering Rules

**Read this file before writing or modifying any code in this repository.**

These standards keep the codebase maintainable as features grow. When in doubt, prefer clarity and small modules over cleverness.

---

## 1. Before you code

1. Read **`rules.md`** (this file).
2. Read **`plan.md`** for product scope and backend contracts.
3. Check existing patterns in the nearest folder before inventing new ones.
4. Keep changes scoped — do not refactor unrelated files in the same PR.

---

## 2. Project structure

```
src/
├── api/              # HTTP layer only — one file per API domain
├── components/       # Shared, reusable UI (no page-specific logic)
├── features/         # Feature modules (add as app grows)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       └── utils.ts
├── hooks/            # App-wide hooks (auth, etc.)
├── lib/              # Pure utilities, constants, Zod schemas
├── pages/            # Route entry components — thin orchestration only
├── routes/           # Router configuration
└── types/            # Shared TypeScript types and API contracts
```

### Layer responsibilities

| Layer | Owns | Must NOT own |
|-------|------|--------------|
| `api/` | Fetch calls, request/response typing | UI, React hooks, JSX |
| `pages/` | Layout composition, wiring hooks to components | Raw fetch, heavy business logic |
| `components/` | Presentation, local UI state | Direct `fetch`, domain rules |
| `features/` | Feature-specific UI + hooks + helpers | Cross-feature shared code |
| `hooks/` | Reusable stateful logic | JSX markup |
| `lib/` | Pure functions, schemas, storage helpers | React, side effects |
| `types/` | Interfaces, enums, API contracts | Implementation logic |

---

## 3. File size and modularity

| Guideline | Limit |
|-----------|-------|
| **Target** | ≤ 200 lines per file |
| **Warning** | 200–400 lines — consider splitting |
| **Hard stop** | > 400 lines — must split before merging |

### When to extract

- **Page > ~150 lines** → extract sections into `features/<name>/components/` or `components/`.
- **Repeated JSX** → shared component in `components/` or feature folder.
- **Complex query/mutation logic** → custom hook in `hooks/` or `features/<name>/hooks/`.
- **Pure helpers** (parsers, formatters, snapshot lookups) → `lib/` or `features/<name>/utils.ts`.
- **Chart blocks** → dedicated `*Chart.tsx` components.
- **Form + validation** → schema in `lib/schemas.ts`, form UI in its own component.

**Never** let a single page file accumulate API calls, chart config, helpers, and markup together.

---

## 4. Naming and files

### Files

- Components: `PascalCase.tsx` — `StatusBadge.tsx`, `CommitsPerWeekChart.tsx`
- Hooks: `useCamelCase.ts` or `.tsx` — `useAuth.tsx`, `useRepositoryStatus.ts`
- API modules: `camelCase.ts` — `auth.ts`, `repositories.ts`
- Utils/schemas: `kebab-case.ts` or `camelCase.ts` — `auth-storage.ts`, `schemas.ts`
- Types: group by domain in `types/` — `api.ts`, later `repository.ts` if `api.ts` grows

### Exports

- **Named exports** for components, hooks, and utilities.
- **One primary export per component file** (small colocated helpers are fine).
- **Barrel files** (`index.ts`) only at feature boundaries — avoid a global `components/index.ts` that re-exports everything.

### Symbols

- Components / types / interfaces: `PascalCase`
- Functions / variables / hooks: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE` only for true constants
- Boolean props/state: `is*`, `has*`, `should*` prefixes

---

## 5. TypeScript

- **No `any`.** Use `unknown` and narrow, or define a proper type.
- API shapes live in `types/` and must match the backend contract.
- Prefer `interface` for object shapes; `type` for unions and utility types.
- Use `z.infer<typeof schema>` for form values — do not duplicate form types manually.
- Path alias `@/` for all `src/` imports — no deep relative paths like `../../../`.
- Enable strict patterns: handle `null`/`undefined` explicitly at API boundaries.

```ts
// Good
import { StatusBadge } from '@/components/StatusBadge'
import type { User } from '@/types/api'

// Bad
import { StatusBadge } from '../../components/StatusBadge'
```

---

## 6. React

- **Functional components only.** No class components.
- **Pages are thin.** A page composes layout + feature components + hooks.
- **Server state** → TanStack Query (`useQuery`, `useMutation`). Do not store API data in `useState`.
- **Auth session** → `AuthProvider` / `useAuth` only. Do not duplicate token logic in pages.
- **Side effects** → `useEffect` sparingly; prefer query `enabled` / `refetchInterval` for data sync.
- **Keys** → stable unique keys in lists (`id`, `email`), never array index for dynamic data.

### Component structure (consistent order)

1. Imports (external → internal → types)
2. Types / constants
3. Component function
4. Hooks (router, auth, queries)
5. Derived values / handlers
6. Early returns (loading, error, not found)
7. JSX return

---

## 7. API layer

- All HTTP goes through `api/client.ts` (`apiRequest`, `apiFetch`).
- One file per domain: `api/auth.ts`, `api/repositories.ts`, etc.
- API functions return typed promises — no parsing in components.
- Token read/write only in `lib/auth-storage.ts` and `api/auth.ts` (login).
- Map FastAPI errors via `ApiClientError` / `formatApiError` — do not parse errors in pages.

```ts
// api/repositories.ts — good
export async function listRepositories(): Promise<Repository[]> {
  return apiRequest<Repository[]>('/repositories')
}

// page — bad
const res = await fetch(`${API_BASE_URL}/repositories`)
```

---

## 8. Forms and validation

- Schemas in `lib/schemas.ts` (Zod).
- Forms use React Hook Form + `zodResolver`.
- Client validation must mirror backend rules (see auth password rules).
- Submit handlers stay thin: validate → call API/mutation → handle error.

---

## 9. Styling (Tailwind)

- Use Tailwind utility classes in JSX.
- Shared visual patterns → small components, not copy-pasted class strings.
- Theme tokens in `src/index.css` (`@theme`) — prefer tokens over hard-coded hex in components.
- No CSS modules or separate `.css` per component unless there is a strong reason.

---

## 10. State and data fetching

| Concern | Tool |
|---------|------|
| Server data | TanStack Query |
| Auth user | `useAuth` context |
| Form state | React Hook Form |
| URL state | React Router (`useParams`, `useSearchParams`) |
| Local UI only | `useState` (modals, toggles) |

Query key convention: `['domain', ...params]` — e.g. `['repositories']`, `['repository', id]`.

---

## 11. Error and loading UI

- Every async view handles **loading**, **error**, and **empty** states.
- Use shared `LoadingSpinner` — do not invent new spinners per page.
- User-facing errors: short, actionable message from `ApiClientError.message`.
- Do not expose raw stack traces or JSON error bodies in the UI.

---

## 12. Imports

Order (blank line between groups):

1. React / external libraries
2. `@/api`, `@/hooks`, `@/lib`
3. `@/components`, `@/features`
4. `@/types`
5. Relative imports (avoid when `@/` works)

---

## 13. What to avoid

- God components or 800+ line files
- Business logic inside JSX (`{data.filter(...).map(...)}` with complex inline logic)
- Fetching in `useEffect` when TanStack Query fits
- Duplicating types between `types/` and components
- `console.log` left in committed code
- Commented-out dead code
- Premature abstractions (helpers used once)
- Over-engineering: no Redux, no DI framework, no unnecessary wrappers

---

## 14. Adding a new feature (checklist)

1. Add types to `types/` (or extend existing contract section).
2. Add API functions to `api/<domain>.ts`.
3. Add Zod schema to `lib/schemas.ts` if there is a form.
4. Create `features/<name>/` if the feature has multiple components/hooks.
5. Add a thin page in `pages/` and route in `routes/router.tsx`.
6. Verify file sizes stay under limits — split early.

---

## 15. Quality gate before merge

- `npm run build` passes (TypeScript + Vite).
- `npm run lint` passes.
- No file exceeds 400 lines.
- New code follows folder ownership in section 2.
- API changes reflected in `types/` and match backend contract.

---

## 16. References

- Product & architecture: `plan.md`
- Backend auth contract: documented in chat / backend repo OpenAPI
- Environment: `.env.example`
