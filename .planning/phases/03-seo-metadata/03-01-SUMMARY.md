---
phase: 03-seo-metadata
plan: "01"
subsystem: seo
tags: [seo, metadata, open-graph, react-helmet-async]
status: complete
dependency_graph:
  requires:
    - 01-02 (routing and page components)
  provides:
    - Per-page SEO metadata (title, description, OG tags)
    - Branded 1200x630 OG image
  affects:
    - All 5 page components
    - src/main.tsx (HelmetProvider)
    - index.html (fallback meta tags)
tech_stack:
  added:
    - react-helmet-async ^2.0.5
    - sharp (devDependency, OG image generation)
  patterns:
    - HelmetProvider wrapping BrowserRouter in main.tsx
    - PageSEO component renders Helmet per page
    - SVG-to-PNG via sharp for OG image generation
key_files:
  created:
    - src/lib/seo.tsx
    - public/image/og-default.png
    - scripts/generate-og-image.cjs
  modified:
    - src/main.tsx
    - index.html
    - src/pages/HomePage.tsx
    - src/pages/AboutPage.tsx
    - src/pages/ServicesPage.tsx
    - src/pages/ValuesPage.tsx
    - src/pages/ContactPage.tsx
decisions:
  - Used sharp+SVG approach for OG image (more reliable than canvas on macOS — no native bindings required)
  - PageSEO is a named default export component, not a hook, keeping it consistent with project component patterns
  - ContactPage required seo variable pattern (not inline JSX) to satisfy both success and form return paths
metrics:
  duration: ~10min
  completed_date: "2026-03-26"
  tasks_completed: 3
  tasks_total: 3
  files_created: 3
  files_modified: 7
---

# Phase 03 Plan 01: SEO Metadata Summary

**One-liner:** Per-page SEO metadata via react-helmet-async with a branded 1200x630 OG image generated using sharp+SVG.

## Status

All 3 tasks complete. Task 3 (human-verify checkpoint) approved by user — browser tab titles correct on all 5 pages, OG meta tags visible in DevTools, and OG image visually professional.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Install react-helmet-async, create PageSEO, generate OG image | 4bdfb75 | src/lib/seo.tsx, src/main.tsx, index.html, public/image/og-default.png, scripts/generate-og-image.cjs, package.json |
| 2 | Add PageSEO to all 5 page components | 29039b0 | HomePage.tsx, AboutPage.tsx, ServicesPage.tsx, ValuesPage.tsx, ContactPage.tsx |
| 3 | Verify SEO metadata and OG image in browser | human-verified | approved by user |

## What Was Built

### Task 1: Foundation

**`src/lib/seo.tsx`** — Reusable `PageSEO` component:
- Accepts `title`, `description`, `path`, `ogImage?`, `isHome?` props
- Renders `<Helmet>` with title, meta description, og:title, og:description, og:image, og:url, og:type, og:site_name, and canonical link
- SITE_URL = `https://stewardshipadvisory.com`, title composed as `{title} | Stewardship Advisory` unless `isHome={true}`

**`src/main.tsx`** — HelmetProvider wraps BrowserRouter:
```tsx
<StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
</StrictMode>
```

**`index.html`** — Fallback OG meta tags added to `<head>` for non-JS crawlers (description, og:title, og:description, og:image, og:type, og:site_name).

**`public/image/og-default.png`** — 1200x630px PNG:
- Navy `#0A1628` background
- Decorative ambient circles (white, low opacity)
- "STEWARDSHIP" in bold white 68px, "ADVISORY" in light white 68px with letter spacing
- Thin horizontal divider line
- Tagline: "Institutional Communications & Reputation Advisory" in muted white 20px
- Generated via `scripts/generate-og-image.cjs` (SVG buffer → sharp → PNG)

### Task 2: Per-Page Metadata

All 5 pages import and render `PageSEO` as first child in their fragment:

| Page | Tab Title | Path |
|------|-----------|------|
| Home | "Stewardship Advisory \| Institutional Communications & Reputation Advisory" | / |
| About | "About \| Stewardship Advisory" | /about |
| Services | "Services \| Stewardship Advisory" | /services |
| Values | "Values \| Stewardship Advisory" | /values |
| Contact | "Contact \| Stewardship Advisory" | /contact |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ContactPage had two return paths requiring SEO in both**
- **Found during:** Task 2 — IDE reported `PageSEO` declared but never read after import
- **Issue:** ContactPage returns early (success state) before the main form return; a simple `<PageSEO>` at the top of JSX would not appear in the success-state return path
- **Fix:** Extracted PageSEO JSX into a `seo` variable and included `{seo}` as first element in both return fragments
- **Files modified:** src/pages/ContactPage.tsx
- **Commit:** 29039b0

**2. [Rule 1 - Bug] Missing closing `</>` fragment tag in ContactPage**
- **Found during:** Task 2 — IDE reported fragment had no closing tag after wrapping both return paths
- **Fix:** Added `</>` before `)` of the main form return
- **Files modified:** src/pages/ContactPage.tsx
- **Commit:** 29039b0

## Known Stubs

None. All pages have real metadata wired to the PageSEO component. OG image is a real 1200x630 PNG, not a placeholder.

## Self-Check: PASSED

Files exist:
- src/lib/seo.tsx — FOUND
- public/image/og-default.png — FOUND (PNG 1200x630, 12.7 KB)
- scripts/generate-og-image.cjs — FOUND

Commits:
- 4bdfb75 — FOUND
- 29039b0 — FOUND

Build: PASSED (npm run build succeeds, npm run lint passes)
