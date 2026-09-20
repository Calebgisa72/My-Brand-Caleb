# Hireable Frontend — Architecture

> **Status:** Living document · **Version:** 1.0 · **Last updated:** 2026-09-20
> **Canonical location:** `My-Brand-Portfolio/docs/ARCHITECTURE.md`
> **Companion:** `My-Brand-Backend/docs/ARCHITECTURE.md` (backend). Neither restates the other.

---

## 1. Architecture Style

### 1.1 Pattern: one Next.js App Router application, three route groups

```
Browser
   │
   ├─ Edge middleware ──────── host + slug resolution, auth redirect, theme cookie
   │
   ├─ (marketing)  ─ static / ISR ───── prospects
   ├─ (public)     ─ ISR, revalidate-on-publish ─── recruiters — SEO critical
   └─ (dashboard)  ─ client, auth-gated ─── owners
              │
              └─ RTK Query ──▶ Hireable API (/api/v1)
```

### 1.2 Why Next.js App Router

Public portfolio links **are** the product. They are shared on LinkedIn, indexed by Google and
previewed by recruiters — three things a client-rendered SPA does badly or not at all. The
decision is not about developer preference; it is about whether a shared portfolio link works.

| Need | What the App Router provides |
|---|---|
| SEO on thousands of portfolio pages | Server rendering with real HTML content |
| Correct link previews on LinkedIn/X/WhatsApp | Server-generated metadata and dynamic OG images |
| Sub-2-second LCP on mobile over 4G | ISR: a cached HTML response, not a JS bundle that then fetches |
| Custom domains and subdomains | Edge middleware host routing, wildcard-domain support |
| Minimal JavaScript on public pages | React Server Components — most of a portfolio page ships zero JS |
| Publish-to-live in seconds | Tag-based revalidation |

The alternative — a Vite SPA — was considered and rejected: it would have required a separate
prerendering service to achieve any of the above, which is more moving parts for a worse result.

### 1.3 Why one app rather than two

The dashboard and the public portfolio share the design system, the section components, the
theme engine and the type definitions. A project card rendered in the editor preview must be
*the same component* as the one on the published page, or previews lie. Splitting them into two
apps would mean either duplicating that surface or building a shared package — and this is
deliberately not a monorepo. Route groups give the separation without the duplication.

### 1.4 Rendering strategy per route

| Route group | Strategy | Revalidation |
|---|---|---|
| `(marketing)/` | Static, built at deploy | On deploy |
| `(marketing)/blog/*` | ISR | 1 hour |
| `(marketing)/pricing` | ISR | 1 hour (plans come from the API) |
| `(public)/u/[slug]` | **ISR with cache tags** | On publish, by tag |
| `(public)/u/[slug]/projects/[p]` | ISR with tags | On publish |
| `(public)/u/[slug]/blog/*` | ISR with tags | On publish |
| `(public)/u/[slug]/unlock` | Dynamic | n/a |
| `(dashboard)/*` | Client components under a server auth boundary | RTK Query cache |
| `/admin/*` | Client, role-gated | RTK Query cache |

> **`"use client"` is a decision, not a default.** Adding it to a public-route component ships
> JavaScript to every recruiter who opens a portfolio. It requires a justification in review.

---

## 2. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15, App Router** | SSR/ISR, edge middleware, image and font optimization |
| Language | **TypeScript 5**, `strict` | |
| UI | **React 19** | |
| Styling | **Tailwind CSS 3** + CSS custom properties | Already in use. Tokens as CSS variables enable runtime theming. |
| Primitives | **Radix UI** | Accessibility behaviour we should not re-implement |
| Icons | **lucide-react** | Already a dependency; replaces the Font Awesome CDN |
| State | **Redux Toolkit** | User requirement; already in use; excellent devtools |
| Server state | **RTK Query** | Caching, invalidation, polling, optimistic updates — with the Redux store the user wants |
| Forms | **react-hook-form** + `zodResolver` | Already in use; minimal re-renders |
| Validation | **Zod**, schemas generated from the API's OpenAPI | Client and server validate the same shapes |
| Rich text | **TipTap** | MIT, headless, no watermark. Replaces Froala. |
| Motion | **Framer Motion** | Orchestration, shared elements, gestures |
| Charts | **Recharts** | Composable, themeable, reasonable bundle |
| Drag & drop | **dnd-kit** | Accessible, keyboard-operable — unlike most DnD libraries |
| Dates | **date-fns** | Already in use; tree-shakeable |
| Toasts | **sonner** | Better a11y and stacking than react-hot-toast |
| Colour | **react-colorful** | 2.8 KB, no dependencies — for the gradient picker |
| Testing | **Vitest** + Testing Library + **Playwright** | |
| Quality | ESLint · Prettier · `eslint-plugin-jsx-a11y` · Husky · lint-staged · commitlint | |
| Analytics | Vercel Analytics + Web Vitals reporting | |
| Errors | Sentry with source maps | |
| Hosting | **Vercel** | ISR, edge middleware, wildcard domains, per-PR previews |

**Removed in Phase 1:** `froala-editor`, `react-froala-wysiwyg` (watermark, licence, heavy) ·
Font Awesome CDN (replaced by lucide) · Swiper (replaced by a CSS scroll-snap carousel plus
Framer Motion) · `react-hot-toast` (replaced by sonner) · the four extra Google Font families.

---

## 3. Folder Structure

```
My-Brand-Portfolio/
├── docs/                      PRD-FRONTEND · ARCHITECTURE · DESIGN-SYSTEM · API-INTEGRATION
├── public/                    static assets, favicons, fonts
├── src/
│   ├── app/
│   │   ├── layout.tsx                 root: html, theme script, providers
│   │   ├── globals.css                token definitions, Tailwind layers
│   │   ├── not-found.tsx · error.tsx · global-error.tsx
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx             marketing nav + footer
│   │   │   ├── page.tsx               landing
│   │   │   ├── pricing/ · templates/ · examples/ · blog/ · legal/
│   │   ├── (public)/
│   │   │   ├── layout.tsx             minimal shell — no dashboard chrome
│   │   │   └── u/[slug]/
│   │   │       ├── page.tsx                   the portfolio
│   │   │       ├── opengraph-image.tsx        dynamic OG image
│   │   │       ├── sitemap.ts
│   │   │       ├── projects/[projectSlug]/
│   │   │       ├── blog/ · blog/[postSlug]/
│   │   │       └── unlock/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx             auth boundary + sidebar + topbar
│   │   │   └── dashboard/…            one folder per screen
│   │   ├── (auth)/                    login · register · verify · reset
│   │   ├── admin/
│   │   └── api/
│   │       ├── revalidate/route.ts    called by the backend on publish
│   │       └── og/route.tsx           OG image generation
│   │
│   ├── components/
│   │   ├── ui/                        primitives (Button, Input, Dialog, GradientPicker…)
│   │   ├── forms/                     composed form fields and form shells
│   │   ├── editor/                    TipTap editor, toolbar, extensions
│   │   ├── layout/                    Sidebar, Topbar, PageHeader, MobileNav
│   │   ├── feedback/                  EmptyState, ErrorState, Skeleton, Toast
│   │   ├── charts/                    analytics visualizations
│   │   └── marketing/                 landing-page sections
│   │
│   ├── features/                      one folder per domain feature
│   │   └── <feature>/
│   │       ├── api.ts                 RTK Query endpoint injection
│   │       ├── slice.ts               local UI state (only if needed)
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── schemas.ts             Zod form schemas
│   │       ├── types.ts
│   │       └── utils.ts
│   │
│   ├── templates/                     portfolio templates (Phase 7)
│   │   ├── registry.ts
│   │   ├── types.ts                   the shared data contract every template implements
│   │   └── aurora/                    the current design, extracted
│   │       ├── index.tsx
│   │       └── sections/
│   │
│   ├── store/
│   │   ├── index.ts                   configureStore
│   │   ├── rootReducer.ts
│   │   ├── hooks.ts                   typed useAppDispatch / useAppSelector
│   │   └── middleware/
│   │
│   ├── lib/
│   │   ├── api/                       baseQuery, auth refresh, error normalization
│   │   ├── auth/                      token memory store, session helpers
│   │   ├── motion/                    variants.ts, transitions.ts
│   │   ├── seo/                       metadata builders, JSON-LD builders
│   │   ├── theme/                     theme script, theme provider
│   │   ├── utils/                     cn, format, slug, gradient — pure functions
│   │   └── constants/
│   │
│   ├── types/
│   │   ├── api.generated.ts           GENERATED from the backend's openapi.json — never edited
│   │   └── *.ts
│   │
│   ├── hooks/                         cross-feature hooks
│   ├── middleware.ts                  host routing, auth redirect, theme
│   └── config/                        env.ts (validated), site.ts, nav.ts
│
├── tests/  e2e/ (Playwright) · setup/ · fixtures/
├── .github/workflows/
└── Agent.md · Guidelines.md · roadmap.md · handoff.md      ← gitignored
```

### 3.1 `components/` vs `features/`

- **`components/`** — presentational and reusable. Knows nothing about the domain. A `Button` does not know what a portfolio is.
- **`features/`** — domain-aware. Owns its API endpoints, its forms, its local state, its screens.

If a component is used by two features, it moves to `components/`. If it is used once and knows
the domain, it stays in its feature. This single rule prevents `components/` from becoming a
dumping ground.

---

## 4. State Management

Four kinds of state, four homes. Putting the wrong kind in the wrong place is the most common
source of frontend complexity.

| Kind | Home | Examples |
|---|---|---|
| **Server state** | RTK Query | Portfolios, projects, skills, analytics, billing |
| **Global client state** | Redux slices | Auth session, active organization, theme, feature flags |
| **Local UI state** | `useState` / `useReducer` | Open/closed, hover, current tab, form step |
| **URL state** | `searchParams` | Filters, sort, page cursor, active tab **when shareable** |

### 4.1 Rules

1. **Server data never goes in a Redux slice.** RTK Query owns it — caching, invalidation, loading and error states come free. Manually mirroring fetched data into a slice creates two sources of truth that will diverge.
2. **A slice exists only when state is genuinely global.** Three components sharing state is prop drilling or context, not Redux.
3. **URL state for anything shareable or back-button-relevant.** A filtered list the user cannot link to is a broken list.
4. **`useState` is the default.** Reach upward only when you must.

### 4.2 RTK Query structure

One `baseApi` with a shared `baseQuery`; each feature injects its endpoints. This keeps the store
configuration stable while features stay self-contained.

```ts
// lib/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Portfolio', 'Project', 'Skill', 'Post', 'Lead', 'Analytics', 'Billing', 'AiRun'],
  endpoints: () => ({}),
});

// features/projects/api.ts
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listProjects: build.query<Paginated<Project>, ListProjectsArgs>({
      query: ({ portfolioId, cursor, limit = 20 }) => ({
        url: `/portfolios/${portfolioId}/projects`,
        params: { cursor, limit, include: 'technologies,media' },
      }),
      providesTags: (result) => [
        { type: 'Project', id: 'LIST' },
        ...(result?.data ?? []).map((p) => ({ type: 'Project' as const, id: p.id })),
      ],
    }),
  }),
});
```

**Tag discipline:** a mutation invalidates the narrowest correct tag. Invalidating `'LIST'` on
every edit refetches the whole collection for a one-field change — correct but wasteful. Point
tags are preferred; list tags are used when ordering or membership could change.

### 4.3 Auth token handling

```
Login → accessToken returned in the response body → held in a module-level variable (memory only)
      → refreshToken set by the server as an httpOnly cookie (JS cannot read it)

Every request  → baseQuery attaches the in-memory access token
401 TOKEN_EXPIRED → a single shared refresh promise → retry the original request
Refresh fails  → clear auth state → redirect to /login preserving the destination
```

**The access token never touches `localStorage`.** The current implementation stores it there
with a client-side expiry check — readable by any XSS payload or injected third-party script.
On a full page reload the token is gone from memory, and a silent refresh against the httpOnly
cookie restores the session before first paint.

Concurrent 401s share **one** refresh promise. Without that, ten parallel queries trigger ten
refresh calls, nine of which present an already-rotated token and trip the backend's reuse
detection — logging the user out for doing nothing wrong.

---

## 5. Data Flow

### 5.1 Public portfolio (server-rendered)

```
Request → middleware resolves host → slug
       → server component fetches GET /api/v1/public/portfolios/{slug}
         (one aggregated call, one backend query, cached with tag portfolio:{slug})
       → template renders sections in owner-defined order
       → HTML cached by ISR
       → a tiny client island hydrates only the interactive parts
         (theme toggle, reaction button, comment form, contact form)
```

Interactive islands are deliberately minimal. A portfolio page should ship well under 130 KB of
JavaScript, and most of the page should ship none.

### 5.2 Dashboard (client)

```
Route → server layout verifies the session → client component
      → RTK Query hook → cached? serve → stale? revalidate in the background
      → mutation → optimistic update → server confirms or rolls back → invalidate tags
```

### 5.3 Publish → live

```
Dashboard publish → POST /api/v1/portfolios/:id/publish
                 → backend writes a version snapshot and queues an outbox event
                 → outbox relay calls POST /api/revalidate on this app (shared-secret signed)
                 → revalidateTag(`portfolio:${slug}`)
                 → next request renders fresh, everyone else keeps the cached page until then
```

`/api/revalidate` verifies a shared secret. An unauthenticated revalidation endpoint is a cheap
cache-invalidation denial-of-service.

---

## 6. Routing & Middleware

`src/middleware.ts` runs at the edge on every request:

1. **Host resolution** — `hireable.app` → marketing and dashboard · `{slug}.hireable.app` → rewrite to `/u/{slug}` · a custom domain → look up the slug via `GET /public/resolve-host` (cached at the edge, 5 min) → rewrite.
2. **Auth redirect** — `(dashboard)` routes without a refresh cookie redirect to `/login?next=…`. This is a UX shortcut only; the server still authorizes every API call.
3. **Theme** — reads the theme cookie and sets a request header so the server can render the correct theme on first paint, avoiding a flash.
4. **Locale** — reserved for the i18n phase.

Middleware stays small and allocation-light. It runs on every request including static assets;
heavy work there taxes the whole site.

---

## 7. Forms & Validation

```
Zod schema (derived from the API's generated types)
   ├─▶ react-hook-form resolver  → inline, per-field client validation (UX)
   └─▶ TypeScript types          → typed handlers

Submit → RTK Query mutation → server validates authoritatively
       → 400 VALIDATION_ERROR → map error.details[].field onto form fields
```

Rules:
- **Client validation is UX, never security.** The server is authoritative. Always.
- Validate on blur, revalidate on change **after** the first error — validating on every keystroke from the start is hostile.
- Server field errors map back onto the exact inputs. A generic "something went wrong" toast for a field error is a defect.
- Long forms autosave drafts to `sessionStorage` and warn on navigation with unsaved changes.
- Submit buttons disable during submission and show a loading state; double-submit is impossible.
- The first invalid field receives focus on failed submit.

---

## 8. Error Handling

| Level | Mechanism | Behaviour |
|---|---|---|
| Route | `error.tsx` per route group | Friendly message, retry, request ID |
| Root | `global-error.tsx` | Last resort; still branded |
| Component | `<ErrorBoundary>` around widgets | One broken widget never blanks a page |
| Query | RTK Query `isError` | Inline error state with retry, in place |
| Mutation | Try/catch at the call site | Toast + field-level mapping |
| Network | Offline detection | Persistent banner; queued retries |

Every error surfaced to the user carries the `requestId` from `meta.requestId`, so a support
message maps to an exact backend log line. All errors report to Sentry with user and route
context. Raw error codes and stack traces are never shown.

---

## 9. Performance Architecture

1. **Server components by default.** `"use client"` is pushed as far down the tree as possible — an interactive button does not make its whole page a client component.
2. **Dynamic imports** for TipTap, Recharts, dnd-kit and the gradient picker. None appear in a public bundle.
3. **`next/image`** everywhere, with explicit dimensions, AVIF/WebP, blur placeholders and `priority` on exactly one LCP image per page.
4. **`next/font`** self-hosting with subsetting and preload. No CDN font links.
5. **Route-level code splitting** by default; parallel routes for independently-loading dashboard panels.
6. **Streaming SSR** with `<Suspense>` so the hero renders before slower sections resolve.
7. **Virtualize** lists over 50 items.
8. **Bundle analysis in CI**; Lighthouse CI budgets fail the build on regression.
9. **Prefetch on intent** — `next/link` prefetch on hover or focus for likely navigations.
10. **No render-blocking third-party scripts.**

---

## 10. Testing Architecture

| Level | Tool | Scope |
|---|---|---|
| Unit | Vitest | Pure functions: formatters, gradient parsing, cursor helpers, SEO builders |
| Component | Vitest + Testing Library | Primitives and feature components with a mocked API (MSW) |
| Accessibility | axe-core in component tests | Every primitive and every screen |
| Integration | Testing Library + MSW | Full flows against a mocked API: login, create project, publish |
| E2E | Playwright | Critical journeys against a real staging backend |
| Visual | Playwright screenshots | Template rendering in both themes |

**Non-negotiable tests:** the publish flow · the auth refresh flow including concurrent 401s ·
the gradient picker producing valid structured output · the editor round-tripping TipTap JSON
without content loss · every screen rendering all five states · keyboard navigation of the
section reorderer.

Test **behaviour**, not implementation. Query by role and accessible name, not by test ID —
if a test cannot find an element the way a screen reader would, neither can a user.

---

## 11. Security

| Concern | Control |
|---|---|
| Token storage | Access token in memory only; refresh in an httpOnly cookie. **Never `localStorage`.** |
| Secrets in the bundle | Only `NEXT_PUBLIC_*` reaches the client. **No upload presets, no API keys.** The current unsigned Cloudinary preset is removed in Phase 2. |
| XSS | React escapes by default. `dangerouslySetInnerHTML` only for server-sanitized rich text, and each use is justified in review. |
| CSP | Strict Content-Security-Policy with nonces; `frame-ancestors 'none'` on the dashboard |
| Uploads | Signed, single-use upload intents from the API. The browser never holds a generic upload credential. |
| Links | External links get `rel="noopener noreferrer"`. User-supplied URLs are scheme-checked. |
| Authorization | The UI mirrors server entitlements for presentation. **It never enforces them.** Hiding a button is not access control. |
| Dependencies | Dependabot, `npm audit` in CI, lockfile committed |
| Public pages | No user-identifying data beyond what the owner chose to publish |

---

## 12. Type Safety Across the Repository Boundary

```
Backend Zod schemas
   → openapi.json (generated, committed in the backend repo)
   → `npm run types:generate` in this repo
   → src/types/api.generated.ts  (committed here, NEVER hand-edited)
   → RTK Query endpoints and Zod form schemas derive from it
```

A breaking API change becomes a **TypeScript compile error in this repository** rather than a
runtime failure in production. Regenerating types is part of adopting any API change, and CI
fails if the committed generated types are stale relative to the pinned spec version.

This is the only mechanism connecting the two repositories. There is no shared package and no
import across the boundary.

---

## 13. Template Architecture *(Phase 7)*

Every template implements one contract:

```ts
// templates/types.ts
export interface TemplateProps {
  portfolio: PublicPortfolio;   // identical shape for every template
  theme: ThemeConfig;
  sections: SectionConfig[];    // owner-defined order and visibility
}

export interface TemplateDefinition {
  key: string;
  name: string;
  version: number;
  supportedSections: SectionType[];
  component: React.ComponentType<TemplateProps>;
  preview: string;
  minTier: PlanTier;
}
```

Rules:
- **The data contract is identical across templates.** Switching never loses content — that is the entire design constraint.
- A template may *style* a section differently or decline to support one, but it may never require data another template does not receive.
- Templates are registered in `templates/registry.ts` and dynamically imported — only the active template ships to the browser.
- A published portfolio pins `templateVersion`; a template update never silently changes a live page.
- `aurora` — the existing design, extracted in Phase 1 — is the reference implementation and the default.

---

## 14. Architecture Decision Record

| # | Decision | Rationale | Rejected |
|---|---|---|---|
| F-1 | Next.js App Router | SEO, OG previews, ISR, edge host routing — public links are the product | Vite SPA; Remix; Astro |
| F-2 | One app, three route groups | Shared design system and section components; previews must render the real components | Two separate apps; a monorepo (explicitly not a monorepo) |
| F-3 | Redux Toolkit + RTK Query | User requirement; already in use; RTK Query removes hand-rolled caching | TanStack Query; SWR; Zustand |
| F-4 | TipTap | MIT, headless, no watermark, styles with our tokens, clean output | Froala (watermark); Lexical; Plate; Editor.js |
| F-5 | Radix primitives | Accessibility behaviour we should not re-implement | Headless UI; hand-rolled |
| F-6 | Tokens as CSS variables consumed by Tailwind | Enables runtime theming and per-portfolio accents without touching components | Literal hex in the Tailwind config (the current approach, which is why theming is broken today) |
| F-7 | Access token in memory, refresh in an httpOnly cookie | `localStorage` tokens are readable by any XSS | Token in `localStorage` (current) |
| F-8 | Types generated from OpenAPI | Breaking API changes become compile errors, across two repos with no shared package | Hand-written types; a shared package |
| F-9 | Framer Motion for orchestration, CSS for simple transitions | Do not load a JS animation library to change a background colour | Framer Motion everywhere; CSS only; GSAP |
| F-10 | dnd-kit for reordering | The only mainstream DnD library with genuine keyboard support | react-beautiful-dnd (unmaintained); HTML5 DnD |
| F-11 | Templates share one data contract | Switching templates must never lose content | Per-template data shapes |
| F-12 | sonner over react-hot-toast | Better stacking, better a11y, smaller | Keeping react-hot-toast |
