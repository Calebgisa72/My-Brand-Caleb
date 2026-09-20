# Hireable Frontend — API Integration

> **Status:** Living document · **Version:** 1.0 · **Last updated:** 2026-09-20
> **Canonical location:** `My-Brand-Portfolio/docs/API-INTEGRATION.md`
>
> ## ⚠️ This is NOT an API reference
>
> **The canonical API reference lives in the backend repository:
> `My-Brand-Backend/docs/API-REFERENCE.md`.** Endpoints, payloads, query parameters, validation
> rules, status codes and error catalogues are documented **there and only there**.
>
> Duplicating them here would guarantee drift — two documents describing one contract, diverging
> the first time someone updates only one. **Never add endpoint documentation to this repository.**
>
> This document covers what the *client* owns: how it calls the API, how it handles auth, how it
> caches, how it normalizes errors, and how its types stay in sync.

---

## 1. Integration Boundary

```
This repository (Next.js)                  Backend repository (Express API)
─────────────────────────                  ────────────────────────────────
 RTK Query endpoints        ──HTTP──▶       /api/v1/*
 Server components          ──HTTP──▶       /api/v1/public/*
 /api/revalidate route      ◀──HTTP──       outbox relay (on publish)

 src/types/api.generated.ts  ◀──generated── openapi.json
```

**No shared package. No imports across the boundary.** The only artifacts crossing are HTTP
requests and the generated type file.

| Topic | Where it is documented |
|---|---|
| Endpoint paths, payloads, query parameters | `My-Brand-Backend/docs/API-REFERENCE.md` |
| Error codes and their meanings | `My-Brand-Backend/docs/API-REFERENCE.md` §1.4 |
| Pagination and filtering conventions | `My-Brand-Backend/docs/API-REFERENCE.md` §1.5–1.6 |
| Auth token model and JWT claims | `My-Brand-Backend/docs/API-REFERENCE.md` §1.7 |
| Rate limits | `My-Brand-Backend/docs/API-REFERENCE.md` §1.9 |
| **How this client calls all of the above** | **This document** |

---

## 2. Configuration

```ts
// src/config/env.ts — validated at build and boot
import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

const serverEnvSchema = clientEnvSchema.extend({
  REVALIDATE_SECRET: z.string().min(32),   // server-only — never NEXT_PUBLIC_
  API_INTERNAL_URL: z.string().url().optional(),
});
```

| Variable | Exposed to the browser | Purpose |
|---|:--:|---|
| `NEXT_PUBLIC_API_URL` | ✓ | API base, e.g. `https://api.hireable.app/api/v1` |
| `NEXT_PUBLIC_APP_URL` | ✓ | This app's canonical origin, for absolute URLs and OG tags |
| `NEXT_PUBLIC_SENTRY_DSN` | ✓ | Client error reporting |
| `REVALIDATE_SECRET` | ✗ | Verifies revalidation calls from the backend |
| `API_INTERNAL_URL` | ✗ | Optional private network address for server-side fetches |

> **Only `NEXT_PUBLIC_*` reaches the browser.** Anything else in a client component is a build-time
> error by convention and a review-blocking defect.
>
> **Removed in Phase 2:** `VITE_UPLOAD_PRESET` and `VITE_CLOUDINARY_CLOUD_NAME`. The current code
> ships an *unsigned* Cloudinary upload preset to the browser, which lets anyone on the internet
> upload to the account. Uploads move to server-issued signed intents.

---

## 3. The API Client

### 3.1 Base query

```ts
// src/lib/api/baseQuery.ts
const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',           // sends the httpOnly refresh cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getAccessToken();                  // in-memory, never localStorage
    if (token) headers.set('authorization', `Bearer ${token}`);

    const orgId = selectActiveOrganizationId(getState() as RootState);
    if (orgId) headers.set('x-organization-id', orgId);

    return headers;
  },
});
```

### 3.2 Response unwrapping

The API wraps every response in an envelope
(`{ success, data, meta }` — see the backend reference §1.2). The client unwraps once, centrally,
so no component ever writes `response.data.data`.

```ts
transformResponse: <T>(envelope: ApiEnvelope<T>) => envelope.data,
transformErrorResponse: (response) => normalizeApiError(response),
```

`meta.pagination` is preserved separately for list endpoints, and `meta.requestId` is attached to
every normalized error so it can be surfaced in error UI and sent to Sentry.

---

## 4. Authentication Flow

### 4.1 Token handling

| Token | Storage | Lifetime |
|---|---|---|
| Access token | **Module-level variable (memory)** | 15 minutes |
| Refresh token | **httpOnly, Secure, SameSite cookie** — set and read only by the server | 30 days |

```ts
// src/lib/auth/tokenStore.ts
let accessToken: string | null = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (t: string | null) => { accessToken = t; };
```

> **Never `localStorage`.** The current implementation stores the token there with a client-side
> expiry check. Any XSS payload, browser extension or injected third-party script can read it. An
> httpOnly cookie is unreadable by JavaScript, and an in-memory access token dies with the tab.

### 4.2 Silent refresh with a shared promise

```ts
// src/lib/api/baseQueryWithReauth.ts
let refreshPromise: Promise<boolean> | null = null;

export const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && getErrorCode(result.error) === 'TOKEN_EXPIRED') {
    // Every concurrent 401 awaits ONE refresh. Ten parallel refreshes would present an
    // already-rotated token nine times and trip the backend's reuse detection, logging the
    // user out for doing nothing wrong.
    refreshPromise ??= performRefresh(api);

    const refreshed = await refreshPromise;
    refreshPromise = null;

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(sessionExpired());
      redirectToLogin();
    }
  }

  return result;
};
```

### 4.3 Session bootstrap

On first load the access token is absent from memory. A server component in the dashboard layout
attempts a refresh using the incoming cookie **before first paint**, so an authenticated user
never sees a flash of the logged-out state.

### 4.4 Error code handling

| Code | Client behaviour |
|---|---|
| `TOKEN_EXPIRED` | Silent refresh, retry once |
| `TOKEN_INVALID` | Clear session, redirect to login |
| `TOKEN_REUSE_DETECTED` | Clear session, redirect with a security notice — this may indicate theft |
| `UNAUTHENTICATED` | Redirect to login, preserving the destination |
| `FORBIDDEN` | Show what role is required. Do not redirect — the user is signed in. |
| `ENTITLEMENT_REQUIRED` | Inline upgrade prompt naming the exact feature from `error.details.feature` |
| `EMAIL_NOT_VERIFIED` | Route to verification with a resend action |

---

## 5. Error Normalization

Every API error becomes one client-side shape, so no component parses raw HTTP errors.

```ts
export interface NormalizedApiError {
  code: string;           // 'VALIDATION_ERROR', 'ENTITLEMENT_REQUIRED', …
  message: string;        // safe to display
  status: number;
  requestId?: string;     // from meta.requestId — show it in error UI
  fieldErrors?: Record<string, string>;   // from error.details, keyed by field
  retryAfter?: number;    // from the Retry-After header on 429
}
```

Rules:
1. **Never display a raw error code to a user.** Map it to human copy.
2. **Always surface the `requestId`** in error states, in small muted text. A support message that quotes it maps to an exact backend log line.
3. **Field errors map onto the form.** A `VALIDATION_ERROR` that produces only a toast is a defect — the user cannot see which field failed.
4. **429 shows when to retry**, from `retryAfter`.
5. **Network failure is distinguished from server failure.** "You appear to be offline" is not "Something went wrong".

---

## 6. Caching & Invalidation

### 6.1 Tag types

```ts
tagTypes: [
  'Portfolio', 'Section', 'Profile', 'Project', 'Skill', 'Experience', 'Education',
  'Certification', 'Testimonial', 'Service', 'Achievement', 'Post', 'Comment',
  'Lead', 'Asset', 'Template', 'Domain', 'Analytics', 'Subscription', 'Entitlement',
  'AiRun', 'AiCredits', 'Integration', 'Member', 'Session',
]
```

### 6.2 Rules

1. **Provide point tags and a list tag.** A query provides `{ type, id: 'LIST' }` plus one tag per returned item.
2. **Invalidate the narrowest correct tag.** Editing one project's title invalidates that project, not the list. Creating, deleting or reordering invalidates the list too, because membership or order changed.
3. **Cross-entity invalidation is explicit.** Publishing invalidates `Portfolio` and `Section`. Accepting an AI run invalidates the target entity and `AiCredits`.
4. **`keepUnusedDataFor`** — 60 s default, 300 s for slow-changing data (templates, plans), 0 for analytics which must be fresh.
5. **Optimistic updates** for reorder, toggle visibility and reactions — instantaneous actions where a round-trip delay feels broken. Every optimistic update has a rollback path.
6. **No optimistic updates** for publish, payment or AI acceptance. Those must reflect confirmed server state.

---

## 7. Pagination

Cursor-based. See the backend reference §1.5 for the parameters.

```ts
const { data, isFetching } = useListProjectsQuery({ portfolioId, cursor, limit: 20 });
// data.items      — the page
// data.pagination — { nextCursor, hasMore, limit, total? }
```

Rules:
- **Cursors are opaque.** Never construct, parse or persist one beyond the current session.
- Infinite lists use RTK Query's `merge` with `serializeQueryArgs` excluding the cursor, so pages accumulate into one cache entry.
- Filters and sort live in the URL so a filtered view is shareable and survives the back button. **Changing a filter resets the cursor** — carrying it over returns a page from a different result set.
- Every paginated list has an explicit end state. "Loading…" forever when there is no more data is a bug.

---

## 8. Server-Side Fetching

Server components fetch directly with `fetch`, not RTK Query (which is client-only).

```ts
// app/(public)/u/[slug]/page.tsx
async function getPortfolio(slug: string) {
  const res = await fetch(`${apiUrl}/public/portfolios/${slug}`, {
    next: { tags: [`portfolio:${slug}`], revalidate: 60 },
  });

  if (res.status === 404) notFound();
  if (res.status === 401) redirect(`/u/${slug}/unlock`);   // PASSWORD visibility
  if (!res.ok) throw new Error(`Portfolio fetch failed: ${res.status}`);

  const envelope = await res.json();
  return envelope.data;
}
```

Rules:
- **One aggregated call per public page.** The backend exposes a single endpoint returning the whole portfolio precisely so the page is not assembled from eight round trips.
- **Tag every fetch** so publish-triggered revalidation can target it.
- **`notFound()` for both 404 and `PRIVATE`.** The backend deliberately returns 404 for private portfolios; the client must not leak the distinction either.
- **Never send an access token from a server component** for public data. Public endpoints are public.

---

## 9. Revalidation Endpoint

```ts
// app/api/revalidate/route.ts
export async function POST(req: Request) {
  const signature = req.headers.get('x-revalidate-signature');
  const body = await req.text();

  if (!verifyHmac(body, signature, env.REVALIDATE_SECRET)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const { tags } = JSON.parse(body) as { tags: string[] };
  tags.forEach(revalidateTag);

  return Response.json({ ok: true, revalidated: tags });
}
```

The signature check is not optional: an unauthenticated revalidation endpoint is a cheap
cache-invalidation denial-of-service against every portfolio on the platform.

---

## 10. File Uploads

**From Phase 2** uploads use server-issued signed intents. The browser never holds a reusable
upload credential.

```
1. POST /assets/upload-intent            → { signature, timestamp, folder, publicId, apiKey }
2. Browser uploads directly to Cloudinary using that single-use signature
3. POST /assets { providerPublicId, … }  → registers the asset, returns an Asset record
4. The asset ID is attached to the content entity
```

Client requirements: drag-and-drop with a click fallback · client-side type and size check before
upload (UX only; the server re-validates) · real progress from the XHR upload event · image
preview before confirm · **alt text required at upload** (accessibility, and it becomes the OG
image alt) · cancellable · clear, specific errors on rejection.

---

## 11. Real-Time & Streaming *(Phase 11)*

AI runs stream over Server-Sent Events.

```ts
const es = new EventSource(`${apiUrl}/ai/runs/${runId}/stream`, { withCredentials: true });
es.addEventListener('progress', (e) => setProgress(JSON.parse(e.data)));
es.addEventListener('token',    (e) => appendToken(JSON.parse(e.data)));
es.addEventListener('complete', (e) => { setResult(JSON.parse(e.data)); es.close(); });
es.addEventListener('error',    () => { es.close(); fallbackToPolling(runId); });
```

Requirements: always close on unmount · fall back to polling when SSE fails (proxies and
corporate networks break it) · render partial output as it arrives — a 30-second spinner reads as
broken · the run remains cancellable throughout · reconnect resumes from the persisted run state,
never restarts the run.

---

## 12. Type Generation

```bash
npm run types:generate   # openapi-typescript against the backend's openapi.json
```

Output: `src/types/api.generated.ts` — **committed, never hand-edited.**

```
Backend Zod schemas → openapi.json → api.generated.ts → RTK Query + Zod form schemas
```

A breaking API change becomes a TypeScript compile error in this repository rather than a runtime
failure in production. This is the only mechanism keeping two independent repositories honest
about one contract.

**Process for any API change:** the backend regenerates and commits `openapi.json` → this repo
runs `types:generate` → fix the resulting compile errors → commit the regenerated file in the
same PR. CI fails if the committed types are stale relative to the pinned spec version.

---

## 13. Environment Endpoints

| Environment | API base |
|---|---|
| Local | `http://localhost:4300/api/v1` |
| Preview | The Railway preview URL for the matching PR, when one exists; otherwise staging |
| Staging | `https://api-staging.hireable.app/api/v1` |
| Production | `https://api.hireable.app/api/v1` |

> **Current state:** the app calls `https://my-brand-backend-iyxk.onrender.com/api` — hardcoded in
> four places in `javascript/fetchData.js` on the `fix-landing-page` branch, and read from
> `VITE_APP_API_URL` on `main`. Phase 1 consolidates this to one validated environment variable
> with no hardcoded URLs anywhere.

---

## 14. Integration Checklist

Before merging any change that touches the API layer:

- [ ] Types regenerated from the current `openapi.json`
- [ ] Response envelope unwrapped centrally, not per component
- [ ] Errors normalized; field errors mapped onto the form
- [ ] `requestId` surfaced in every error state
- [ ] Correct tags provided and invalidated at the right granularity
- [ ] Loading, empty, error, partial and success states all implemented
- [ ] Pagination handled with an explicit end state
- [ ] No secret, key or preset in the client bundle
- [ ] Access token in memory only
- [ ] Server-side fetches tagged for revalidation
- [ ] Endpoint documentation **not** added to this repository — it belongs in `My-Brand-Backend/docs/API-REFERENCE.md`
