# Hireable Frontend — Product Requirements

> **Status:** Living document · **Version:** 1.0 · **Last updated:** 2026-09-20
> **Canonical location:** `My-Brand-Portfolio/docs/PRD-FRONTEND.md`
>
> **This document complements, and never restates, the canonical product PRD.**
> The whole-product requirements — personas, roles, scope, functional requirements FR-1…FR-12,
> non-functional requirements NFR-1…NFR-8, success metrics — live in
> **`My-Brand-Backend/docs/PRD.md`**. Read that first.
>
> This document covers what only the frontend owns: surfaces, screens, journeys, per-screen
> states, interaction behaviour, accessibility, performance budgets and SEO requirements.

---

## 1. Scope of This Document

| Owned here | Owned in the backend PRD |
|---|---|
| Screen inventory and information architecture | Product goals, personas, roles |
| User journeys and flows | Functional requirements (FR-*) |
| Per-screen states (loading, empty, error, success, offline) | Non-functional requirements (NFR-*) |
| Interaction and motion behaviour | Business rules, entitlements, data model |
| Accessibility acceptance criteria | API contract |
| Performance budgets and Core Web Vitals | Success metrics |
| SEO and social-sharing requirements | Market and business analysis |
| Responsive behaviour and breakpoints | |

---

## 2. The Three Surfaces

One Next.js application serves three distinct audiences. They share a design system and a
codebase; they share almost nothing else.

| Surface | Route group | Audience | Rendering | Priority |
|---|---|---|---|---|
| **Marketing** | `(marketing)` | Prospects who have never heard of Hireable | Static / ISR | Conversion |
| **Public portfolio** | `(public)` | Recruiters, hiring managers, peers — arriving by shared link | ISR, revalidated on publish | **Speed, SEO, credibility** |
| **Dashboard** | `(dashboard)` | Authenticated portfolio owners and admins | Client-side, auth-gated | Capability and clarity |

> **The public portfolio is the product.** Every other surface exists to produce it or to sell it.
> When the three surfaces compete for a decision — bundle budget, design attention, engineering
> time — the public portfolio wins.

---

## 3. Screen Inventory

Phase annotations mark when each screen is introduced.

### 3.1 Marketing `(marketing)`

| Route | Screen | Phase |
|---|---|---|
| `/` | Landing — hero, problem, AI demo, templates, social proof, pricing teaser, FAQ, CTA | 1 |
| `/pricing` | Plan comparison with a currency toggle (USD / RWF) | 10 |
| `/templates` | Template gallery with live previews | 7 |
| `/examples` | Curated showcase of real published portfolios | 8 |
| `/features/ai` | The AI agent suite explained, with a demo | 11 |
| `/for/recruiters` | Recruiter landing | 13 |
| `/blog`, `/blog/[slug]` | Hireable's own content marketing | 8 |
| `/legal/{terms,privacy,dpa}` | Legal | 14 |
| `/changelog` | Public release notes | 8 |

### 3.2 Public portfolio `(public)`

| Route | Screen | Phase |
|---|---|---|
| `/u/[slug]` | The portfolio — all visible sections in owner-defined order | 1 |
| `/u/[slug]/projects/[projectSlug]` | Project detail with case study and gallery | 6 |
| `/u/[slug]/blog` | Post index | 6 |
| `/u/[slug]/blog/[postSlug]` | Post detail with reactions and comments | 6 |
| `/u/[slug]/unlock` | Password gate for `PASSWORD` visibility | 6 |
| `/u/[slug]/opengraph-image` | Dynamically generated OG image | 8 |
| `/u/[slug]/sitemap.xml` | Per-portfolio sitemap | 8 |
| Host-routed | `{slug}.hireable.app` and custom domains resolve to the same tree | 8 |

### 3.3 Dashboard `(dashboard)`

| Route | Screen | Phase |
|---|---|---|
| `/login`, `/register`, `/verify-email`, `/forgot-password`, `/reset-password` | Auth | 5 |
| `/onboarding` | Three-question setup → template suggestion → optional GitHub import | 5 |
| `/dashboard` | Overview: completeness score, views, leads, quick actions | 1 → 9 |
| `/dashboard/editor` | Section manager — reorder, toggle visibility, live preview | 6 |
| `/dashboard/profile` | Hero and about editor | 1 |
| `/dashboard/experience`, `/education`, `/certifications` | Career blocks | 6 |
| `/dashboard/projects`, `/projects/new`, `/projects/[id]` | Projects with media and case study | 1 |
| `/dashboard/skills`, `/skills/new`, `/skills/[id]` | Skills with the **visual gradient picker** | 1 |
| `/dashboard/blog`, `/blog/new`, `/blog/[id]` | Posts with the **TipTap editor** | 1 |
| `/dashboard/testimonials`, `/services`, `/achievements`, `/speaking`, `/faq`, `/metrics` | Remaining blocks | 6 |
| `/dashboard/media` | Asset library | 6 |
| `/dashboard/leads` | Contact inbox | 1 → 6 |
| `/dashboard/comments` | Moderation queue | 6 |
| `/dashboard/template` | Template picker and theme customizer | 7 |
| `/dashboard/domains` | Slug, subdomain, custom domain wizard | 8 |
| `/dashboard/analytics` | Views, referrers, geography, content performance | 9 |
| `/dashboard/ai` | Agent console, run history, credit balance | 11 |
| `/dashboard/ai/workflows` | Workflow runner with approval steps | 11 |
| `/dashboard/integrations` | GitHub, LinkedIn, Cal.com, Résumé Builder | 12 |
| `/dashboard/billing` | Subscription, invoices, plan change | 10 |
| `/dashboard/settings/{account,organization,members,sessions,notifications}` | Settings | 5 |
| `/dashboard/jobs`, `/talent` | Recruiter surfaces | 13 |
| `/admin/*` | Platform administration | 5 → 14 |

---

## 4. User Journeys

### J1 — Visitor → published portfolio *(the activation journey)*

```
Landing → "Start free" → Register → Verify OTP → Onboarding (3 questions)
   → optional GitHub connect → pick up to 3 repos → AI drafts run in background
   → Editor with drafts ready → edit → choose slug → Publish → Share sheet
```

**Target: under 15 minutes, median.** Every screen in this path is measured. Anything that adds
friction here is a defect, regardless of how well it is built.

Requirements:
- Registration asks for the minimum: email, password, name. Nothing else.
- Onboarding is three questions, skippable, and never blocks progress.
- AI drafts generate in the background with visible progress — the user keeps working.
- The publish button is reachable from every editor screen, not buried in settings.
- Publishing opens a share sheet immediately. The moment of pride is the moment to ask for a share.

### J2 — Recruiter views a shared portfolio *(the credibility journey)*

```
LinkedIn post → link preview card → tap → portfolio renders → scroll
   → project detail → resume download / contact
```

Requirements:
- The link preview card renders correctly on LinkedIn, X and WhatsApp. **100 % of the time.**
- First contentful paint on a mid-range Android over 4G: under 2 seconds.
- Nothing shifts after load. No layout jump, no late-loading font swap.
- The résumé download and contact CTA are reachable without scrolling to the bottom.
- The page is fully usable with JavaScript disabled — it is server-rendered content.

### J3 — Owner updates a project with AI *(the differentiator journey)*

```
Dashboard → Projects → New → "Generate from repository" → pick repo
   → streaming progress → proposal with diff → edit → accept → publish
```

Requirements:
- Generation streams. A spinner with no progress for 30 seconds reads as broken.
- The result arrives as a **proposal with a visible diff**, never as a silent overwrite.
- Accept, edit and reject are all one click from the proposal.
- AI-generated content is visibly labelled until the user edits or confirms it.
- Credit cost is shown **before** the run starts, and the remaining balance after.

### J4 — Free user hits a limit *(the monetization journey)*

```
Attempts a gated action → inline upgrade prompt naming the exact limit
   → pricing comparison → checkout (MoMo prompt or card redirect) → unlocked
```

Requirements:
- The prompt states the specific limit reached, not a generic "upgrade".
- It shows what unlocking costs and what else the plan includes.
- The user's work in progress is **never lost** to an upgrade interruption.
- MoMo checkout explains the phone-prompt flow before it starts — an unexplained USSD prompt gets dismissed.
- Post-payment, the user returns to exactly where they were, unlocked.

---

## 5. Per-Screen State Requirements

Every data-bound screen implements **all five** states. A screen missing one is incomplete, not
"mostly done".

| State | Requirement |
|---|---|
| **Loading** | Skeletons matching the real content's shape and dimensions. Never a centred spinner on a full page. Skeletons appear only after 200 ms to avoid a flash on fast connections. |
| **Empty** | Explains what goes here, why it matters for getting hired, and offers the primary action. Illustrated. **Never a bare "No data".** |
| **Error** | Human-readable message, a retry action, and the request ID for support. Never a raw error code or stack. |
| **Partial** | When one section fails, the rest of the page still renders. A failed analytics widget must not blank the dashboard. |
| **Success** | Optimistic where safe, confirmed by a toast. Destructive actions confirm before, not after. |

**Additional required states**

- **Offline** — a persistent banner; queued mutations retry on reconnect.
- **Unauthenticated** — redirect to login preserving the intended destination.
- **Unauthorized** — explain which role or plan is required, not just "forbidden".
- **Rate-limited** — show when the user may retry.
- **Stale** — when data is served from cache during revalidation, indicate it subtly rather than blocking.

---

## 6. Accessibility Requirements

**Target: WCAG 2.2 Level AA on every surface.** Non-negotiable, and treated as a defect class
rather than a nice-to-have.

| # | Requirement |
|---|---|
| A11Y-1 | Every interactive element reachable and operable by keyboard, in a logical order |
| A11Y-2 | Visible focus indicator on every focusable element — 3:1 contrast against its background |
| A11Y-3 | Text contrast ≥ 4.5:1; large text and UI components ≥ 3:1. **Verified in both themes.** |
| A11Y-4 | One `h1` per page; heading levels never skip |
| A11Y-5 | Every image has meaningful `alt`, or `alt=""` when decorative. User-uploaded images require alt text at upload. |
| A11Y-6 | Form inputs have associated labels; errors are programmatically linked via `aria-describedby` |
| A11Y-7 | Modals trap focus, close on Escape, and restore focus to the trigger |
| A11Y-8 | Dynamic content announces via live regions (toasts, AI progress, validation summaries) |
| A11Y-9 | `prefers-reduced-motion: reduce` disables transforms and parallax; opacity-only transitions remain |
| A11Y-10 | Colour is never the only carrier of meaning — pair with text, icon or pattern |
| A11Y-11 | Touch targets ≥ 44×44 px |
| A11Y-12 | Page zoom to 200 % without loss of content or function |
| A11Y-13 | Skip-to-content link on every page |
| A11Y-14 | Drag-and-drop reordering has a keyboard-accessible equivalent (move up/down buttons) |
| A11Y-15 | The rich text editor is screen-reader operable; every toolbar action has a keyboard shortcut |

**Verification:** `eslint-plugin-jsx-a11y` in CI · axe-core in component tests · Lighthouse a11y
≥ 95 in CI · manual NVDA/VoiceOver pass each phase · keyboard-only pass on every new flow.

---

## 7. Performance Budgets

Enforced by Lighthouse CI. A budget breach fails the build.

### 7.1 Core Web Vitals (p75, mobile, 4G)

| Metric | Public portfolio | Marketing | Dashboard |
|---|---|---|---|
| LCP | **< 2.0 s** | < 2.5 s | < 2.5 s |
| INP | **< 200 ms** | < 200 ms | < 200 ms |
| CLS | **< 0.1** | < 0.1 | < 0.1 |
| TTFB (ISR hit) | **< 400 ms** | < 400 ms | n/a |
| FCP | < 1.5 s | < 1.8 s | < 2.0 s |

### 7.2 Bundle budgets (gzipped)

| Route group | Initial JS | Initial CSS |
|---|---|---|
| Public portfolio | **< 130 KB** | < 25 KB |
| Marketing | < 160 KB | < 25 KB |
| Dashboard shell | < 250 KB | < 35 KB |
| Editor route (with TipTap) | < 380 KB | < 40 KB |

### 7.3 Rules

- **The public portfolio ships the minimum JavaScript possible.** Server components by default; `"use client"` requires a justification in review.
- TipTap, chart libraries and the gradient picker are **dynamically imported** and never appear in the public bundle.
- Images use `next/image` with explicit dimensions, AVIF/WebP, blur placeholders and correct `priority` on the LCP element.
- Fonts are self-hosted via `next/font` with `display: swap` and preloaded subsets. No render-blocking Google Fonts links — the current landing page loads four separate font families from a CDN and that alone costs several hundred milliseconds.
- Third-party scripts are deferred and budgeted. Analytics never blocks rendering.
- Animation uses `transform` and `opacity` only. No animated `width`, `height`, `top` or `left`.
- Lists over 50 items virtualize.
- Route-level code splitting by default; heavy components split further.

---

## 8. SEO & Social Sharing Requirements

Public portfolios are the growth engine. These requirements are product requirements, not
technical niceties.

| # | Requirement |
|---|---|
| SEO-1 | Every public page is server-rendered with complete HTML content. No client-only content. |
| SEO-2 | Unique `<title>` and `<meta name="description">` per page, derived from real content |
| SEO-3 | Complete Open Graph and Twitter Card tags with a **dynamically generated** OG image per portfolio and per post |
| SEO-4 | JSON-LD: `Person` (portfolio), `CreativeWork` (project), `BlogPosting` (post), `FAQPage` (FAQ), `BreadcrumbList` |
| SEO-5 | One canonical URL per page. Path, subdomain and custom domain resolve to one canonical; the others 301. |
| SEO-6 | `sitemap.xml` per portfolio plus a platform index sitemap |
| SEO-7 | `robots.txt` with correct allow/deny; `UNLISTED` and `PRIVATE` emit `noindex, nofollow` |
| SEO-8 | Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<time datetime>` |
| SEO-9 | Descriptive link text. Never "click here" or a bare URL. |
| SEO-10 | `hreflang` reserved for the i18n phase; structure prepared now |
| SEO-11 | Portfolio content is indexable within 24 hours of publish |
| SEO-12 | Share sheet offers: copy link, QR code, prefilled LinkedIn/X intents, downloadable OG card |

**Acceptance test:** paste a published portfolio URL into LinkedIn, X, WhatsApp, Slack and
Discord. All five must render a correct card with image, title and description. This is checked
manually each phase that touches public rendering.

---

## 9. Responsive Requirements

Breakpoints preserve the existing custom scale. See `docs/DESIGN-SYSTEM.md` §3.

| Token | Width | Target |
|---|---|---|
| `exs` | 250 px | Smallest supported |
| `xsm` | 470 px | Small phones |
| `smd` | 665 px | Large phones |
| `xmd` | 850 px | Tablets |
| `lg` | 1024 px | Small laptops |
| `xlg` | 1210 px | Desktops |
| `2xl` | 1400 px | Large desktops (container max) |

Rules:
- **Mobile-first.** Base styles target the smallest width; breakpoints add, never subtract.
- **Most portfolio traffic is mobile** — recruiters open links from LinkedIn on a phone. Design the mobile view first and treat desktop as the enhancement.
- The dashboard is usable on mobile for reviewing and light editing. Heavy editing (rich text, drag-reordering, analytics) is desktop-optimized with a graceful mobile fallback, never a dead end.
- No horizontal scroll at any width. Long unbroken strings wrap or truncate with a tooltip.
- Tables become cards below `smd`.
- Touch and pointer are both first-class: hover states must have a non-hover equivalent.

---

## 10. Internationalization Readiness

Not translated at launch, but structured so translation is a data task rather than a refactor.

- All user-facing copy lives in a message catalogue, never inline in JSX.
- Dates, numbers and currencies format via `Intl`, never by string concatenation.
- Layouts tolerate 30 % text expansion without breaking.
- No text baked into images.
- Locale is stored on the user and respected in the dashboard.
- First target languages: Kinyarwanda, French.

---

## 11. Frontend-Specific Non-Functional Requirements

| # | Requirement |
|---|---|
| FNF-1 | Works in the last two versions of Chrome, Firefox, Safari and Edge, plus iOS Safari and Chrome Android |
| FNF-2 | Public portfolios degrade gracefully with JavaScript disabled — content is fully readable |
| FNF-3 | No layout shift from late-loading fonts, images or ads |
| FNF-4 | Every network mutation is idempotent-safe from the client (double-click never double-creates) |
| FNF-5 | Auth state survives a page refresh without a visible flash of the logged-out state |
| FNF-6 | Draft content is preserved locally against accidental navigation or a crash |
| FNF-7 | Error boundaries at the route and widget level — one broken widget never blanks a page |
| FNF-8 | All client errors report to Sentry with the request ID and user context |
| FNF-9 | No secret, API key or upload preset ever ships in the client bundle |
| FNF-10 | The access token is held in memory only. **Never `localStorage`.** |

---

## 12. Out of Scope for the Frontend

Business logic · authorization decisions (the UI mirrors server entitlements, it never enforces
them) · data validation as the only line of defence (client validation is UX; the server
validates authoritatively) · direct third-party API calls from the browser · any computation
that belongs on the server.

---

## 13. Acceptance Criteria per Phase

Frontend-specific criteria. The full phase definitions are in `roadmap.md`.

| Phase | Frontend acceptance |
|---|---|
| 1 | One Next.js app serves all three surfaces · visual parity or better against both legacy branches · no Froala, no watermark · visual gradient picker working · Lighthouse ≥ 95 public, a11y ≥ 95 everywhere · motion system in place with `prefers-reduced-motion` honored |
| 2 | Client consumes `/api/v1` · types generated from `openapi.json` · refresh-token flow working · access token out of `localStorage` · no visual regression |
| 3 | **No frontend work.** Verification only: nothing parses the 24-character Mongo ObjectId format. |
| 4 | Preview deploy per PR · Lighthouse CI budgets enforced in CI · Sentry with source maps · Web Vitals reporting |
| 5 | Full auth flows · onboarding under 15 min to publish · role-aware navigation · `/u/[slug]` renders another tenant's portfolio |
| 6 | All 20 section types editable · drag-reorder with a keyboard equivalent · draft/publish with version history · all five states on every screen |
| 7 | Template switching preserves content · theme customizer constrained to valid tokens · live preview |
| 8 | Link previews render on all five platforms · dynamic OG images · sitemap and JSON-LD · custom-domain wizard |
| 9 | Analytics dashboard under 300 ms for a 12-month chart · consent-aware tracking |
| 10 | Pricing page · both checkout flows · entitlement-aware UI with specific upgrade prompts · no work lost to an upgrade |
| 11 | Streaming AI UI · diff-based accept/edit/reject · credit display · AI labelling |
| 12 | Integration management · GitHub repo picker · LinkedIn import wizard |
| 13 | Recruiter dashboard · talent directory · apply flow · messaging |
| 14 | Full a11y audit with a screen reader · cross-browser matrix · bundle reduction · final design QA |
