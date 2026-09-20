# Hireable — Design System

> **Status:** Living document · **Version:** 1.0 · **Last updated:** 2026-09-20
> **Canonical location:** `My-Brand-Portfolio/docs/DESIGN-SYSTEM.md`
>
> **The existing visual identity is preserved, not replaced.** Every colour below is taken from
> the current codebase. The work is to systematize, refine and elevate — never to redesign from
> scratch. If a change would alter the brand's felt identity, it is out of scope.

---

## 1. Design Principles

Five principles. When two conflict, the earlier wins.

1. **Evidence over decoration.** The portfolio's job is to make someone believe this person can do the job. Every visual decision either strengthens that or gets cut. Ornament that competes with content is a bug.
2. **Restraint reads as senior.** Junior design adds; senior design removes. Fewer weights, fewer sizes, fewer colours, more space. The difference between a student portfolio and a professional one is usually subtraction.
3. **Motion clarifies, never performs.** Animation exists to explain where something came from, where it went, or that it is working. An animation that only says "look, I can animate" is removed.
4. **The content is the hero.** The system is a frame. A recruiter should remember the projects, not the gradient.
5. **Accessible by construction.** Contrast, focus, keyboard and reduced-motion are part of the definition of a component — not a later audit.

---

## 2. Color

### 2.1 Brand palette — preserved exactly

These values exist in the current code and **must not change**.

| Token | Value | Origin | Use |
|---|---|---|---|
| `--brand-primary` | `#e17714` | current `--primary` | Primary actions, links, accents, focus |
| `--brand-secondary` | `#ccf8db` | current `--secondary` | Soft accent surfaces, success tints |
| `--brand-secondary-muted-dark` | `#a7cadb` | landing page dark theme | Muted accent, dark mode |
| `--brand-secondary-muted-light` | `#173558` | dashboard light theme | Muted accent, light mode |
| `--brand-destructive` | `#f33b3b` | current `--destructive` | Destructive actions, errors |

### 2.2 Semantic tokens

Components consume **semantic** tokens only. They never reference a raw hex or a brand token
directly — that is what makes theming, and the Phase 7 per-portfolio accent customization,
possible without touching a single component.

```css
:root {
  /* ── Surfaces ─────────────────────────────────────────────── */
  --surface-base:      #24221f;  /* page background (landing dark) */
  --surface-raised:    #2c2c2c;  /* cards, panels */
  --surface-overlay:   #1a1a1a;  /* modals, popovers (dashboard dark) */
  --surface-sunken:    #1c1a18;  /* wells, inset areas */
  --surface-inverse:   #060606;  /* high-contrast blocks */

  /* ── Content ──────────────────────────────────────────────── */
  --content-primary:   #f7f7f7;  /* headings, emphasis */
  --content-secondary: #dadada;  /* body copy */
  --content-tertiary:  #9a9a9a;  /* captions, metadata */
  --content-inverse:   #0d0d0d;  /* text on light surfaces */
  --content-on-accent: #1a1a1a;  /* text on --accent */

  /* ── Accent (per-portfolio customizable from Phase 7) ─────── */
  --accent:            #e17714;
  --accent-hover:      #f08a2a;
  --accent-active:     #c7660f;
  --accent-subtle:     rgb(225 119 20 / 0.12);
  --accent-border:     rgb(225 119 20 / 0.32);

  /* ── Support ──────────────────────────────────────────────── */
  --support:           #ccf8db;
  --support-muted:     #a7cadb;
  --support-subtle:    rgb(204 248 219 / 0.10);

  /* ── Status ───────────────────────────────────────────────── */
  --status-success:    #3ec98a;
  --status-warning:    #f2b53c;
  --status-danger:     #f33b3b;
  --status-info:       #5aa9e6;
  /* each has a matching -subtle at 12 % alpha */

  /* ── Lines & effects ──────────────────────────────────────── */
  --border-subtle:     rgb(255 255 255 / 0.08);
  --border-default:    rgb(255 255 255 / 0.14);
  --border-strong:     rgb(255 255 255 / 0.24);
  --focus-ring:        var(--accent);
  --skeleton:          rgb(105 105 105 / 0.30);  /* preserved from the landing page */
  --overlay-scrim:     rgb(0 0 0 / 0.60);
}

:root[data-theme="light"] {
  --surface-base:      #dde6ea;  /* landing light */
  --surface-raised:    #eaf8f5;
  --surface-overlay:   #fffdfd;  /* dashboard light */
  --surface-sunken:    #d3dee3;
  --surface-inverse:   #ffffff;

  --content-primary:   #0d0d0d;
  --content-secondary: #333234;
  --content-tertiary:  #5f5f61;
  --content-inverse:   #f7f7f7;
  --content-on-accent: #ffffff;

  --support-muted:     #173558;

  --border-subtle:     rgb(13 13 13 / 0.08);
  --border-default:    rgb(13 13 13 / 0.14);
  --border-strong:     rgb(13 13 13 / 0.24);
  --skeleton:          rgb(13 13 13 / 0.08);
  --overlay-scrim:     rgb(13 13 13 / 0.45);
}
```

### 2.3 Rules

1. **Dark is the default theme.** The current landing page already defaults to dark on narrow viewports; make it the default everywhere and respect `prefers-color-scheme` on first visit.
2. **Theme is applied via `data-theme` on `<html>`**, set by an inline script before paint. A theme flash on load is a defect.
3. **Never use a raw hex in a component.** Semantic tokens only.
4. **Every colour pair is contrast-verified in both themes.** Body text ≥ 4.5:1, large text and UI components ≥ 3:1.
5. **The accent is customizable per portfolio (Phase 7)** within a validated palette. The server rejects arbitrary values — see `My-Brand-Backend/docs/API-REFERENCE.md` §6.2.
6. **Colour is never the sole signal.** Status always pairs with an icon or text.

### 2.4 Skill gradients

Skills carry a two-stop gradient. Today it is a free-text field where the user types raw CSS —
which is both a poor experience and a CSS-injection vector. From Phase 1 it becomes a structured
value chosen with a visual picker.

```ts
type SkillGradient = {
  from: string;   // #RRGGBB, validated
  to: string;     // #RRGGBB, validated
  angle: number;  // 0–360
};
// rendered as: linear-gradient(${angle}deg, ${from}, ${to})
```

**Picker requirements (Phase 1)**
- Two colour stops, each with a swatch, a native colour input and a validated hex field
- Angle control: a dial or slider, plus eight preset angles
- Live preview on a realistic skill card, not an abstract rectangle
- A curated preset palette of 12 brand-harmonious gradients — most users should never need the custom path
- An "extract from icon" action that samples the uploaded skill icon's dominant colours
- Contrast warning when the chosen gradient leaves overlaid text below 4.5:1
- Fully keyboard operable; hex fields are the accessible equivalent of the visual controls

---

## 3. Layout & Spacing

### 3.1 Spacing scale

A 4 px base. **Use the scale. Never an arbitrary pixel value.**

| Token | px | Typical use |
|---|---|---|
| `space-0` | 0 | |
| `space-1` | 4 | Icon-to-label |
| `space-2` | 8 | Tight internal padding |
| `space-3` | 12 | Compact stacks |
| `space-4` | 16 | Default gap |
| `space-5` | 20 | |
| `space-6` | 24 | Card padding |
| `space-8` | 32 | Group separation |
| `space-10` | 40 | |
| `space-12` | 48 | Sub-section separation |
| `space-16` | 64 | Section padding (mobile) |
| `space-20` | 80 | |
| `space-24` | 96 | Section padding (desktop) |
| `space-32` | 128 | Hero breathing room |

> **The single highest-leverage visual upgrade to the current design is more space.** Sections
> currently run close together. Doubling vertical section rhythm, on its own, moves the design
> from "student project" to "professional product" — before a single other change.

### 3.2 Breakpoints — preserved

```js
screens: {
  exs:  '250px',
  xsm:  '470px',
  smd:  '665px',
  xmd:  '850px',
  lg:   '1024px',
  xlg:  '1210px',
  '2xl':'1400px',
}
```

### 3.3 Containers

| Token | Max width | Use |
|---|---|---|
| `container-prose` | 680 px | Blog posts, long-form reading |
| `container-content` | 1120 px | Portfolio sections (preserved from the current `slide-container`) |
| `container-wide` | 1400 px | Dashboard, galleries |
| `container-full` | 100 % | Hero backdrops, full-bleed media |

Gutters: 16 px below `xsm`, 24 px to `xmd`, 32 px to `xlg`, 48 px above.

### 3.4 Radii & elevation

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 6 px | Inputs, chips, small buttons |
| `radius-md` | 10 px | Buttons, cards |
| `radius-lg` | 16 px | Panels, modals |
| `radius-xl` | 24 px | Feature cards, hero media |
| `radius-full` | 9999 px | Avatars, pills |

Elevation is **layered soft shadows**, never a single hard drop shadow. In dark mode, elevation
reads primarily through surface lightness; shadow is a secondary cue.

```css
--shadow-sm: 0 1px 2px rgb(0 0 0 / 0.10), 0 1px 3px rgb(0 0 0 / 0.08);
--shadow-md: 0 2px 4px rgb(0 0 0 / 0.10), 0 4px 12px rgb(0 0 0 / 0.10);
--shadow-lg: 0 4px 8px rgb(0 0 0 / 0.12), 0 12px 28px rgb(0 0 0 / 0.14);
--shadow-xl: 0 8px 16px rgb(0 0 0 / 0.14), 0 24px 56px rgb(0 0 0 / 0.18);
--shadow-accent: 0 8px 24px rgb(225 119 20 / 0.24);  /* primary CTA hover only */
```

---

## 4. Typography

### 4.1 Families

The current code loads **four** font families from a CDN — Inter, Work Sans, Nokora and Wendy One
— across separate render-blocking requests, plus Poppins in the dashboard. That is a measurable
performance cost and visually inconsistent.

**Consolidate to two, self-hosted via `next/font`:**

| Role | Family | Rationale |
|---|---|---|
| Display & headings | **Work Sans** | Already the landing page's body face. Geometric, confident, distinctive at large sizes. Promoting it to display preserves the brand's existing feel. |
| Body & UI | **Inter** | Already present. The best-tuned UI face available: real optical sizing, excellent small-size legibility, comprehensive coverage. |
| Code | **JetBrains Mono** | Developer-audience appropriate; used for code blocks and technology chips. |

Drop Nokora, Wendy One and Poppins. Self-host, subset to Latin + Latin Extended, `display: swap`,
preload the two weights used above the fold.

### 4.2 Type scale

A 1.25 (major third) ratio, fluid via `clamp()` between `xsm` and `xlg`.

| Token | Min → Max | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | 40 → 72 px | 700 | 1.05 | −0.03em | Hero name |
| `display-lg` | 32 → 56 px | 700 | 1.10 | −0.02em | Section heroes |
| `heading-xl` | 28 → 40 px | 600 | 1.15 | −0.02em | Section titles |
| `heading-lg` | 24 → 32 px | 600 | 1.20 | −0.01em | Card titles, h3 |
| `heading-md` | 20 → 24 px | 600 | 1.30 | −0.01em | Sub-headings |
| `heading-sm` | 17 → 18 px | 600 | 1.40 | 0 | Small headings |
| `body-lg` | 17 → 18 px | 400 | 1.65 | 0 | Lead paragraphs |
| `body-md` | 15 → 16 px | 400 | 1.65 | 0 | Default body |
| `body-sm` | 14 px | 400 | 1.55 | 0 | Secondary text |
| `caption` | 12 → 13 px | 500 | 1.45 | 0.01em | Metadata, labels |
| `overline` | 11 → 12 px | 600 | 1.30 | 0.10em | Eyebrow labels, uppercase |
| `code` | 13 → 14 px | 400 | 1.60 | 0 | Inline and block code |

### 4.3 Rules

1. **Four weights maximum:** 400, 500, 600, 700. More weights make a design look unresolved.
2. **Negative tracking on large text**, neutral on body. Default tracking at display sizes is the most common amateur typography tell.
3. **Body line height 1.6–1.7.** The current design runs tighter; loosening it measurably improves readability.
4. **Measure 60–75 characters** for prose. `container-prose` enforces it.
5. **Never centre more than three lines** of body text.
6. **Headings never use pure `--content-primary` at every level.** Vary weight and size, not just colour.
7. **Numbers use tabular figures** in tables, metrics and analytics so columns align.

---

## 5. Iconography

- **`lucide-react` exclusively.** Already a dependency. Replace the current Font Awesome CDN link and the loose SVGs in `Images/` — a full icon-font stylesheet for a handful of glyphs is pure waste.
- Sizes: 16 px (inline), 20 px (buttons, default), 24 px (section headers), 32 px (feature).
- Stroke width 1.75 for UI, 2 for emphasis. Consistent across the product.
- Icons are decorative unless they carry the only meaning — then they need an accessible label.
- Brand logos (GitHub, LinkedIn, X) use `simple-icons` paths, not Font Awesome.
- Icons inherit `currentColor`. Never hardcode a fill.

---

## 6. Component Inventory

### 6.1 Primitives *(Phase 1)*

`Button` (primary · secondary · ghost · destructive · link × sm/md/lg, loading, disabled,
icon-only) · `IconButton` · `Input` · `Textarea` · `Select` · `Combobox` · `Checkbox` · `Radio` ·
`Switch` · `Slider` · `DatePicker` · `ColorPicker` · **`GradientPicker`** · `FileUpload` (drag,
preview, progress) · `Label` · `FormField` (label + control + hint + error) · `Badge` · `Chip` ·
`Avatar` · `Tooltip` · `Popover` · `DropdownMenu` · `Dialog` · `Sheet` · `Tabs` · `Accordion` ·
`Card` · `Separator` · `Skeleton` · `Spinner` · `ProgressBar` · `Toast` · `Alert` · `EmptyState` ·
`ErrorState` · `Pagination` · `Breadcrumb` · `ScrollArea` · `Kbd` · `CopyButton`

Built on **Radix UI primitives** for accessibility behaviour (focus trapping, keyboard
navigation, ARIA), styled with our own tokens. We do not re-implement a focus trap.

### 6.2 Composites *(Phase 1)*

`RichTextEditor` (TipTap) · `MediaLibraryPicker` · `SortableList` (drag + keyboard) ·
`ConfirmDialog` · `DataTable` · `FilterBar` · `SearchInput` · `ThemeToggle` · `LanguageSwitch` ·
`UserMenu` · `NavSidebar` · `MobileNav` · `PageHeader` · `StatCard` · `Timeline` ·
`SectionWrapper`

### 6.3 Public portfolio sections *(Phases 1, 6)*

`HeroSection` · `AboutSection` · `MetricsStrip` · `ExperienceTimeline` · `EducationList` ·
`SkillsGrid` · `TechStackGrid` · `ProjectsGrid` · `ProjectCard` · `ProjectDetail` ·
`CaseStudyBlock` · `CertificationsGrid` · `TestimonialsCarousel` · `ServicesList` ·
`AchievementsList` · `OpenSourceStats` · `SpeakingList` · `BlogGrid` · `PostCard` ·
`PostDetail` · `CommentThread` · `ReactionButton` · `NowBlock` · `SocialProofBar` · `FaqAccordion` ·
`ResumeDownload` · `ContactSection` · `SocialLinks` · `PortfolioFooter` (carries the badge)

Every section accepts the same contract shape so templates are interchangeable.

### 6.4 Component rules

1. **Composition over configuration.** A component with more than ~8 props is usually two components.
2. **Controlled by default.** Uncontrolled only where React requires it.
3. **Forward `ref` and spread the rest.** Primitives must be composable.
4. **Every state styled:** default, hover, focus-visible, active, disabled, loading, error.
5. **No component fetches its own data.** Data comes from a server component or an RTK Query hook at the route level.
6. **`className` accepted and merged** (`cn` / `tailwind-merge`) so callers can adjust without forking.
7. **Every primitive gets a Storybook-equivalent usage example** in its folder.

---

## 7. Motion System

The current site has almost no motion. Adding it well is the single most visible "senior" upgrade
available — and adding it badly is the fastest way to look amateur. These constraints are the
difference.

### 7.1 Duration scale

| Token | ms | Use |
|---|---|---|
| `duration-instant` | 80 | Colour and opacity on press |
| `duration-fast` | 140 | Hover, focus, small toggles |
| `duration-normal` | 220 | Standard transitions, dropdowns |
| `duration-slow` | 320 | Modals, drawers, layout shifts |
| `duration-slower` | 480 | Page transitions, hero reveals |
| `duration-deliberate` | 700 | Once-per-page moments only |

**Anything over 700 ms is a defect** unless it is a deliberate, once-per-session hero moment.
Users perceive slow interfaces as broken interfaces.

### 7.2 Easing

```css
--ease-out:       cubic-bezier(0.16, 1, 0.30, 1);    /* default — things arriving */
--ease-in:        cubic-bezier(0.70, 0, 0.84, 0);    /* things leaving */
--ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);    /* things moving in place */
--ease-emphasis:  cubic-bezier(0.32, 0.72, 0, 1);    /* confident, product-grade */
--ease-spring:    spring(1, 90, 14, 0);              /* Framer Motion: interactive/draggable */
```

**`--ease-out` is the default.** Elements arrive fast and settle gently. `linear` is used only for
continuous motion (spinners, marquees).

### 7.3 The motion vocabulary

A small set, used consistently. Consistency is what makes motion feel designed rather than
decorated.

| Pattern | Behaviour | Where |
|---|---|---|
| **Fade + rise** | `opacity 0→1`, `y 12px→0`, `duration-normal`, `ease-out` | The default entrance for everything |
| **Scroll reveal** | Fade + rise triggered at 15 % viewport intersection, **once** | Portfolio sections |
| **Stagger** | 50 ms between siblings, capped at 6 — then the rest appear together | Grids, lists, skill cards |
| **Shared element** | `layoutId` morph from card to detail | Project card → project detail |
| **Hover lift** | `y −2px`, shadow `md → lg`, `duration-fast` | Cards, buttons |
| **Magnetic CTA** | Subtle cursor-follow translate, max 6 px, desktop pointer only | The single primary hero CTA |
| **Press** | `scale 0.98`, `duration-instant` | All buttons |
| **Skeleton → content** | Crossfade, `duration-normal`. **Never a jump.** | Every data load |
| **Count-up** | Numbers animate 0 → value over 900 ms, `ease-out`, once | Metrics strip |
| **Marquee** | Continuous linear scroll, pauses on hover and focus | Tech stack, social proof |
| **Text reveal** | Word-by-word or line-by-line mask reveal, 30 ms stagger | Hero headline **only** |
| **Route transition** | 180 ms crossfade with a top progress bar | Dashboard navigation |
| **Modal** | Scrim fades; panel `scale 0.96→1` + `y 8px→0`, `duration-slow`, `ease-emphasis` | Dialogs, sheets |
| **Toast** | Slides in from the edge with a spring; auto-dismiss with a progress indicator | Notifications |
| **Gradient drift** | Very slow (20 s+) hue/position drift on hero backdrop | Hero only, desktop only |
| **Cursor spotlight** | Radial accent glow following the pointer at low opacity | Hero backdrop, desktop only |

### 7.4 Rules

1. **`prefers-reduced-motion: reduce` disables every transform, parallax, marquee and auto-play.** Opacity transitions remain — they convey state without vestibular risk. This is a hard requirement, not an option.
2. **Animate `transform` and `opacity` only.** Never `width`, `height`, `top`, `left`, `margin` — they force layout on every frame.
3. **Scroll reveals fire once.** Re-animating on every scroll pass is the most common amateur mistake and it makes long pages exhausting.
4. **Never delay content on animation.** Content is present in the DOM and readable; motion is a presentation layer over it.
5. **No animation on the LCP element.** It delays the metric that matters most.
6. **Stagger caps at 6 items.** A 30-item staggered grid takes 1.5 seconds to become usable.
7. **One "wow" moment per page, maximum.** Usually the hero. Everything else is quiet.
8. **Motion must survive interruption.** A user scrolling past mid-animation must land in a valid state, never mid-transform.
9. **Test on a mid-range Android.** Motion that is smooth on a MacBook and janky on a Tecno is broken — and that is what a large share of the target market uses.

### 7.5 Implementation

**Framer Motion** for orchestration, shared-element transitions and gestures. **CSS transitions**
for simple hover and focus states — do not load a JavaScript animation library to change a
background colour. Motion variants live in `lib/motion/variants.ts` so they are reused, not
redefined per component.

---

## 8. Dark & Light Mode

- Dark is the default. `prefers-color-scheme` respected on first visit; the user's explicit choice persists and wins.
- An inline script sets `data-theme` on `<html>` **before first paint**. A flash of the wrong theme is a defect.
- Every component is verified in both themes. "It looks fine in dark" is half a review.
- Images and illustrations either work in both themes or ship in two variants.
- Shadows soften in dark mode; elevation reads mainly through surface lightness.
- Screenshots inside marketing content need a subtle border in light mode so they do not float.

---

## 9. Content & Voice

Copy is part of the design system. Inconsistent microcopy undermines a consistent interface.

| Context | Voice |
|---|---|
| Marketing | Direct, confident, specific. "Point it at your repo." Never "revolutionize your career journey". |
| Dashboard | Clear and instructive. Sentence case. No exclamation marks. |
| Empty states | Explain what goes here, why it matters for getting hired, and offer the action. |
| Errors | What happened, what to do next, and the request ID. Never blame the user. |
| Buttons | Verb + object: "Publish portfolio", not "Submit". Never "OK". |
| Confirmations | Name the consequence: "Delete 3 projects permanently?" |
| AI labels | Always explicit: "Drafted by AI — review before publishing." |

Sentence case everywhere except proper nouns. No `ALL CAPS` except the `overline` token. Never
"Oops!". Dates: `12 Mar 2026` (absolute) or `3 days ago` (relative, within 30 days).

---

## 10. Design References

Study these; do not copy them. Rationale for each is in `My-Brand-Backend/docs/FEASIBILITY.md` §10.

**Product UI craft** — Linear (density and keyboard) · Vercel (restraint, dark mode) · Stripe
(documentation and clarity) · Raycast (motion) · Framer · Arc · Clerk (auth UX) · Resend
**Portfolio craft** — Read.cv · Bento.me · brittanychiang.com · rauno.me · paco.me ·
emilkowal.ski · jhey.dev
**Galleries** — Dribbble · Behance · Awwwards · Godly · Land-book · SiteInspire · SaaS Landing Page ·
Refero · **Mobbin** (real product flows, the most useful of these)
**Motion** — motion.dev · animations.dev · Josh Comeau on animation principles · Apple HIG motion ·
Material Design motion
**Systems** — shadcn/ui · Radix Primitives · Vercel Geist · Atlassian Design System · Polaris ·
Inclusive Components

> **On Dribbble:** it optimizes for a still image, not for a product that must survive real data,
> empty states, 200-character titles and error conditions. Take visual direction from it; take
> interaction patterns from Mobbin and from shipped products.

---

## 11. Token Implementation

Tokens are defined once as CSS custom properties and consumed through Tailwind so both utility
classes and raw CSS stay in sync.

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      surface: {
        base: 'var(--surface-base)',
        raised: 'var(--surface-raised)',
        overlay: 'var(--surface-overlay)',
        sunken: 'var(--surface-sunken)',
        inverse: 'var(--surface-inverse)',
      },
      content: {
        primary: 'var(--content-primary)',
        secondary: 'var(--content-secondary)',
        tertiary: 'var(--content-tertiary)',
        inverse: 'var(--content-inverse)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        hover: 'var(--accent-hover)',
        active: 'var(--accent-active)',
        subtle: 'var(--accent-subtle)',
      },
      support: { DEFAULT: 'var(--support)', muted: 'var(--support-muted)' },
      status: {
        success: 'var(--status-success)',
        warning: 'var(--status-warning)',
        danger:  'var(--status-danger)',
        info:    'var(--status-info)',
      },
    },
    borderColor: {
      subtle: 'var(--border-subtle)',
      DEFAULT: 'var(--border-default)',
      strong: 'var(--border-strong)',
    },
    transitionTimingFunction: {
      out: 'var(--ease-out)',
      emphasis: 'var(--ease-emphasis)',
    },
  },
}
```

**Migration note.** The current `tailwind.config.js` defines literal hex values
(`primary: '#e17714'`, `background: '#fffdfd'`) that are hardcoded to the light theme, which is
why the dashboard cannot theme properly today. Phase 1 replaces every literal with a CSS variable
reference. The rendered colours stay identical; the theming capability is gained.

---

## 12. Design Review Checklist

Applied to every PR that changes UI.

**Visual**
- [ ] Only semantic tokens used — no raw hex, no arbitrary pixel spacing
- [ ] Verified in both dark and light themes
- [ ] Spacing follows the scale; vertical rhythm is consistent with neighbouring sections
- [ ] Typography uses scale tokens; no ad-hoc sizes or weights
- [ ] Icons are lucide-react at a standard size and stroke width

**Responsive**
- [ ] Checked at 250 px, 470 px, 665 px, 850 px, 1210 px and 1400 px
- [ ] No horizontal scroll at any width
- [ ] Touch targets ≥ 44 px
- [ ] Long strings wrap or truncate gracefully

**States**
- [ ] Loading skeleton matches the real content's shape
- [ ] Empty state explains and offers an action
- [ ] Error state has a retry and the request ID
- [ ] Hover, focus-visible, active, disabled and loading all styled

**Motion**
- [ ] Duration from the scale; `ease-out` unless there is a reason
- [ ] Only `transform` and `opacity` animated
- [ ] `prefers-reduced-motion` honored
- [ ] Scroll reveals fire once
- [ ] Nothing on the LCP element
- [ ] Tested on a throttled mid-range device profile

**Accessibility**
- [ ] Keyboard-complete, logical tab order
- [ ] Visible focus ring at ≥ 3:1
- [ ] Contrast verified in both themes
- [ ] Labels associated; errors linked with `aria-describedby`
- [ ] Dynamic content announced
- [ ] axe-core clean

**Performance**
- [ ] Bundle budget for the route respected
- [ ] Images via `next/image` with explicit dimensions
- [ ] Heavy components dynamically imported
- [ ] No layout shift after load
