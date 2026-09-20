# Hireable — Web Application

The Next.js application for **Hireable** — a multi-tenant SaaS that turns a developer's
repositories, job history and skills into a portfolio that gets them hired, and keeps that
portfolio in sync with LinkedIn, résumés and job applications.

One application, three surfaces: the **marketing site**, the **public portfolios**, and the
**owner dashboard**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Performance Budgets](#performance-budgets)
- [Accessibility](#accessibility)
- [API Integration](#api-integration)
- [Branch Strategy](#branch-strategy)
- [Contribution Workflow](#contribution-workflow)
- [Development Standards](#development-standards)
- [Troubleshooting](#troubleshooting)
- [Documentation Index](#documentation-index)

---

## Project Overview

Developers have the evidence — repositories, shipped work, real experience — but not the artifact.
Turning code into persuasive hiring material is a writing problem, not an engineering one, and
most engineers never finish it. Hireable closes that gap with AI that reads a repository and
produces the portfolio content.

**The public portfolio is the product.** Every other surface exists to produce it or to sell it.
When surfaces compete for a decision — bundle budget, design attention, engineering time — the
public portfolio wins.

**Companion repository:** [`My-Brand-Backend`](https://github.com/Calebgisa72/My-Brand-Backend) —
the Express API.

> **These are two independent repositories, not a monorepo.** The only contract between them is
> the versioned HTTP API, documented in **`My-Brand-Backend/docs/API-REFERENCE.md`**. That
> document is canonical and lives there. This repository documents *how the client calls it*, in
> [`docs/API-INTEGRATION.md`](docs/API-INTEGRATION.md).

Product requirements: [`My-Brand-Backend/docs/PRD.md`](https://github.com/Calebgisa72/My-Brand-Backend/blob/main/docs/PRD.md) (canonical) and
[`docs/PRD-FRONTEND.md`](docs/PRD-FRONTEND.md) (screens, journeys, states).

---

## Architecture Overview

```
Browser
   │
   ├─ Edge middleware ──────── host + slug resolution, auth redirect, theme
   │
   ├─ (marketing)  ─ static / ISR ───── prospects
   ├─ (public)     ─ ISR, revalidate-on-publish ─── recruiters — SEO critical
   └─ (dashboard)  ─ client, auth-gated ─── owners
              │
              └─ RTK Query ──▶ Hireable API (/api/v1)
```

| Surface | Route group | Rendering | Priority |
|---|---|---|---|
| Marketing | `(marketing)` | Static / ISR | Conversion |
| Public portfolio | `(public)` | ISR, tag-revalidated on publish | **Speed, SEO, credibility** |
| Dashboard | `(dashboard)` | Client under a server auth boundary | Capability and clarity |

Next.js App Router was chosen because public portfolio links are the product: they need server
rendering for SEO, correct Open Graph previews on LinkedIn and X, sub-2-second mobile LCP, and
edge host routing for subdomains and custom domains. Full rationale, diagrams and the decision
record: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15, App Router** |
| Language | TypeScript 5, `strict` |
| UI | React 19 |
| Styling | Tailwind CSS 3 + CSS custom properties as tokens |
| Primitives | Radix UI |
| Icons | lucide-react |
| State | Redux Toolkit |
| Server state | RTK Query |
| Forms | react-hook-form + Zod |
| Rich text | **TipTap** |
| Motion | Framer Motion |
| Charts | Recharts |
| Drag & drop | dnd-kit |
| Toasts | sonner |
| Testing | Vitest · Testing Library · Playwright · axe-core |
| Hosting | Vercel |

**Removed during the Phase 1 rebuild:** Froala (watermark, licence), the Font Awesome CDN,
Swiper, react-hot-toast, and four CDN-loaded Google Font families — replaced by two self-hosted
families via `next/font`.

---

## Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | 20 LTS or later |
| npm | 10+ |
| Git | any recent |
| Backend API | running locally, or point at staging |

### Setup

```bash
git clone git@github.com:Calebgisa72/My-Brand-Portfolio.git
cd My-Brand-Portfolio
npm install
cp .env.example .env.local    # then fill in the values — see below
npm run dev
```

The app starts on `http://localhost:3000`.

To run against a local backend, start it first (see the backend README) and set
`NEXT_PUBLIC_API_URL=http://localhost:4300/api/v1`.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Values are validated by a Zod schema at build and boot.

| Variable | Browser | Required | Description |
|---|:--:|:--:|---|
| `NEXT_PUBLIC_API_URL` | ✓ | ✓ | API base, e.g. `http://localhost:4300/api/v1` |
| `NEXT_PUBLIC_APP_URL` | ✓ | ✓ | This app's canonical origin, for absolute URLs and OG tags |
| `NEXT_PUBLIC_SENTRY_DSN` | ✓ | | Client error reporting |
| `REVALIDATE_SECRET` | ✗ | ✓ | Verifies revalidation calls from the backend. Server-only. |
| `API_INTERNAL_URL` | ✗ | | Optional private-network API address for server-side fetches |

> **Only `NEXT_PUBLIC_*` reaches the browser.** Anything else used in a client component is a
> review-blocking defect.
>
> **Removed in Phase 2:** `VITE_UPLOAD_PRESET` and `VITE_CLOUDINARY_CLOUD_NAME`. The legacy code
> shipped an *unsigned* Cloudinary upload preset to the browser, letting anyone on the internet
> upload to the account. Uploads now use server-issued signed, single-use intents.

---

## Local Development

```bash
npm run dev            # next dev
npm run build          # next build
npm start              # next start (production build)
npm run typecheck      # tsc --noEmit
npm run analyze        # bundle analysis
npm run types:generate # regenerate src/types/api.generated.ts from the backend's openapi.json
```

### Working against a backend

| Target | `NEXT_PUBLIC_API_URL` |
|---|---|
| Local backend | `http://localhost:4300/api/v1` |
| Staging | `https://api-staging.hireable.app/api/v1` |
| Production | `https://api.hireable.app/api/v1` |

---

## Testing

```bash
npm test                 # vitest — unit + component
npm run test:watch
npm run test:coverage
npm run test:e2e         # playwright
npm run test:e2e:ui      # playwright with the UI runner
npm run test:a11y        # axe across key routes
npm run lighthouse       # Lighthouse CI against the budgets
```

| Level | Tool | Scope |
|---|---|---|
| Unit | Vitest | Formatters, gradient parsing, cursor helpers, SEO builders |
| Component | Vitest + Testing Library | Primitives and feature components with MSW |
| Accessibility | axe-core | Every primitive and screen |
| Integration | Testing Library + MSW | Full flows against a mocked API |
| E2E | Playwright | Critical journeys against staging |
| Visual | Playwright screenshots | Template rendering in both themes |

**Non-negotiable tests:** the publish flow · the auth refresh flow including concurrent 401s ·
the gradient picker producing valid structured output · the editor round-tripping TipTap JSON
without content loss · every screen rendering all five states · keyboard navigation of the
section reorderer.

Query by **role and accessible name**, not by test ID. If a test cannot find an element the way a
screen reader would, neither can a user.

---

## Linting & Formatting

```bash
npm run lint           # eslint, including jsx-a11y
npm run lint:fix
npm run format         # prettier --write
npm run format:check   # CI
```

Husky runs `lint-staged` on pre-commit and `commitlint` on commit-msg. CI fails on any lint,
format, type, test or budget failure.

---

## Project Structure

```
My-Brand-Portfolio/
├── docs/          PRD-FRONTEND · ARCHITECTURE · DESIGN-SYSTEM · API-INTEGRATION
├── public/        static assets, favicons
├── src/
│   ├── app/
│   │   ├── (marketing)/   landing · pricing · templates · examples · blog · legal
│   │   ├── (public)/      u/[slug] and everything under a portfolio
│   │   ├── (dashboard)/   the owner dashboard
│   │   ├── (auth)/        login · register · verify · reset
│   │   ├── admin/
│   │   └── api/           revalidate · og
│   ├── components/  ui · forms · editor · layout · feedback · charts · marketing
│   ├── features/    one folder per domain feature (api · slice · components · hooks · schemas)
│   ├── templates/   portfolio templates — registry, shared contract, aurora
│   ├── store/       Redux store, root reducer, typed hooks
│   ├── lib/         api · auth · motion · seo · theme · utils
│   ├── types/       api.generated.ts (GENERATED — never edit)
│   ├── middleware.ts
│   └── config/
└── tests/  e2e · setup · fixtures
```

**`components/` vs `features/`:** if it knows what a portfolio is, it belongs in a feature. If it
does not, it belongs in `components/`. Used by two features → promote. This one rule keeps
`components/` from becoming a dumping ground.

Annotated tree: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §3.

---

## Design System

[`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) is authoritative. **Read it before any UI work.**

### Brand palette — preserved, not replaced

| Token | Value |
|---|---|
| Primary | `#e17714` |
| Secondary | `#ccf8db` |
| Secondary muted | `#a7cadb` (dark) / `#173558` (light) |
| Destructive | `#f33b3b` |
| Dark surfaces | `#24221f` · `#2c2c2c` · `#1a1a1a` |
| Light surfaces | `#dde6ea` · `#eaf8f5` · `#fffdfd` |

Components consume **semantic tokens** (`bg-surface-raised`, `text-content-secondary`,
`bg-accent`), never raw hex. That is what makes dark/light theming and the per-portfolio accent
customization possible.

### Rules in brief

- Semantic tokens only — no raw hex, no arbitrary spacing
- Verify every change in **both** themes
- Four font weights maximum (400/500/600/700)
- Mobile-first; most portfolio traffic is mobile
- All five states on every data-bound screen: loading, empty, error, partial, success
- Animate `transform` and `opacity` only; `prefers-reduced-motion` is honored
- Scroll reveals fire once; one "wow" moment per page

### Motion

Durations 80–700 ms from a fixed scale, `ease-out` by default, with a 15-pattern vocabulary —
fade-and-rise, scroll reveal, capped stagger, shared-element project transition, hover lift,
skeleton crossfade, metric count-up, marquee, hero text reveal, route transition.
Full specification: [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) §7.

### Breakpoints

`exs 250` · `xsm 470` · `smd 665` · `xmd 850` · `lg 1024` · `xlg 1210` · `2xl 1400`

---

## Performance Budgets

Enforced by Lighthouse CI. A breach fails the build.

| Metric | Public portfolio | Marketing | Dashboard |
|---|---|---|---|
| LCP (p75, mobile) | **< 2.0 s** | < 2.5 s | < 2.5 s |
| INP | < 200 ms | < 200 ms | < 200 ms |
| CLS | < 0.1 | < 0.1 | < 0.1 |
| Initial JS (gzip) | **< 130 KB** | < 160 KB | < 250 KB |

Rules: server components by default (`"use client"` needs a justification) · TipTap, Recharts,
dnd-kit and the gradient picker are dynamically imported and never ship on a public route ·
`next/image` with explicit dimensions and one `priority` LCP image per page · `next/font`
self-hosting, no CDN font links.

---

## Accessibility

**Target: WCAG 2.2 Level AA on every surface**, treated as a defect class rather than an audit
item.

Keyboard-complete with a logical tab order · visible focus at ≥ 3:1 · contrast ≥ 4.5:1 body and
≥ 3:1 large/UI **in both themes** · labels associated and errors linked via `aria-describedby` ·
focus trapped and restored in modals · dynamic content announced via live regions · colour never
the only signal · touch targets ≥ 44 px · drag-and-drop always has a keyboard equivalent ·
`prefers-reduced-motion` honored.

Verified by `eslint-plugin-jsx-a11y`, axe-core in component tests, Lighthouse a11y ≥ 95 in CI,
and a manual screen-reader pass each phase.

Full criteria: [`docs/PRD-FRONTEND.md`](docs/PRD-FRONTEND.md) §6.

---

## API Integration

> **Endpoint documentation is NOT in this repository.** It lives in
> **`My-Brand-Backend/docs/API-REFERENCE.md`** and is canonical there. Duplicating it here would
> guarantee drift.

[`docs/API-INTEGRATION.md`](docs/API-INTEGRATION.md) covers what the client owns: the base query,
envelope unwrapping, the auth refresh flow, error normalization, cache tags, pagination,
server-side fetching, the signed revalidation endpoint, uploads, SSE streaming and type generation.

### Type safety across the repository boundary

```
Backend Zod schemas → openapi.json → npm run types:generate → src/types/api.generated.ts
```

A breaking API change becomes a **TypeScript compile error here**, not a production runtime
failure. `src/types/api.generated.ts` is generated and committed — **never hand-edited**.
Regenerating is part of adopting any API change, in the same PR.

### Auth

The access token lives **in memory only** (15-minute TTL). The refresh token is an httpOnly,
Secure cookie the browser cannot read. Concurrent 401s share one refresh promise — without that,
parallel refreshes present an already-rotated token and trip the backend's reuse detection,
logging the user out for doing nothing wrong.

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Always deployable. Protected. Merges only via reviewed PR. |
| `feat/phase-<n>-<slug>` | Phase feature work |
| `fix/<slug>` | Bug fixes outside a phase |
| `docs/<slug>` | Documentation-only changes |
| `chore/<slug>` | Tooling, dependencies, CI |
| `legacy/dashboard-main` | The pre-Next.js React dashboard — **preserved, never deleted** |
| `legacy/landing-page` | The plain-HTML public portfolio — **preserved, never deleted** |

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(editor): replace Froala with TipTap
feat(skills): add visual gradient picker
fix(auth): share one refresh promise across concurrent 401s
perf(public): dynamically import the chart bundle
a11y(nav): add a keyboard equivalent for section reordering
```

---

## Contribution Workflow

1. Confirm which phase is active in `roadmap.md` and read `handoff.md`.
2. Branch from `main` using the phase's branch name.
3. Read [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) before any UI work.
4. Implement, with tests alongside — not after.
5. Verify in both themes, at every breakpoint, with a keyboard.
6. Run `npm run typecheck && npm run lint && npm test`.
7. Open a PR including the checklist from `Agent.md` §15.
8. Update `handoff.md` and `roadmap.md` in **both** repositories.
9. Merge after CI passes and review is complete.

> **AI agents working in this repository must not commit or push.** They produce the commit
> message, PR title and PR description as text; the maintainer executes them.

---

## Development Standards

Full rulebook in `Guidelines.md`. The essentials:

- **No secret in the client bundle.** Only `NEXT_PUBLIC_*` reaches the browser.
- **The access token lives in memory.** Never `localStorage`.
- **Semantic tokens only.** The brand palette is preserved, not replaced.
- **All five states on every data-bound screen.**
- **Accessibility is part of a component's definition**, not a later audit.
- **Server components by default.** `"use client"` requires a justification.
- **Client validation is UX; the server is authoritative.**
- **UI gating is presentation only.** Hiding a button is not access control.
- **No `any` without an inline justification. No dead code. No `console.log`.**
- **Comments explain why**, never what.
- **Documentation updates ship in the same PR as the change.**
- **Never write API endpoint documentation in this repository.**

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Build fails on environment validation | A required variable is missing or malformed | Read the error — it names the variable. Compare `.env.local` to `.env.example`. |
| Every API call returns a CORS error | This origin is not in the backend's allowlist | Add it to the backend's `CORS_ORIGINS` and restart the API |
| Logged out on every page refresh | Session bootstrap not running, or the refresh cookie is blocked | Check that the API sets the cookie with the right domain and `SameSite`; third-party cookie blocking affects cross-origin local setups |
| Logged out while several requests are in flight | Concurrent refreshes tripped the backend's reuse detection | Ensure the shared refresh promise is in place — `docs/API-INTEGRATION.md` §4.2 |
| Flash of the wrong theme on load | The theme script is not running before paint | It must be inline in `<head>`, before any render |
| Type errors after a backend change | Generated types are stale | `npm run types:generate` and commit the result |
| Lighthouse CI fails on bundle size | A heavy library reached a public route | `npm run analyze`; make the import dynamic |
| Hydration mismatch | Server and client rendered different HTML | Usually `Date.now()`, `Math.random()` or reading `localStorage` during render. Move it into `useEffect`. |
| Published changes not appearing | Revalidation did not fire or was rejected | Check `REVALIDATE_SECRET` matches on both sides; check the backend's outbox relay |
| Images not optimizing | The remote host is not allowed | Add it to `images.remotePatterns` in `next.config.ts` |
| Animations janky on mobile | Animating a layout property, or too many simultaneous animations | Only `transform` and `opacity`; cap staggers at 6 |
| E2E tests flaky | Waiting on timeouts instead of conditions | Use Playwright's auto-waiting locators; never `waitForTimeout` |

---

## Documentation Index

| Document | Location | Purpose |
|---|---|---|
| [`docs/PRD-FRONTEND.md`](docs/PRD-FRONTEND.md) | this repo | Screens, journeys, states, a11y, budgets, SEO |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | this repo | Next.js architecture, state, data flow, ADRs |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | this repo | Tokens, typography, motion, components — **read before any UI work** |
| [`docs/API-INTEGRATION.md`](docs/API-INTEGRATION.md) | this repo | How the client consumes the API |
| `docs/PRD.md` | backend repo | **Canonical** product requirements |
| `docs/API-REFERENCE.md` | backend repo | **Canonical** API contract |
| `docs/ERD.md` | backend repo | Data model |
| `docs/FEASIBILITY.md` | backend repo | Business context and design references |
| `roadmap.md` | both (gitignored) | Phase plan, kept in lockstep |
| `handoff.md` | both (gitignored) | Session continuity |
| `Agent.md` / `Guidelines.md` | both (gitignored) | AI-agent instructions and engineering rules |

---

## License

ISC — see `package.json`.

## Maintainer

**Gisa M. Caleb Pacifique** — [GitHub](https://github.com/Calebgisa72)
