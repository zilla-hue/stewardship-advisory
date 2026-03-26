---
phase: 01-routing-foundation
plan: "02"
subsystem: routing
tags: [react-router, spa, navigation, components, pages]

# Dependency graph
requires:
  - phase: 01-routing-foundation plan 01
    provides: "Extracted components (Navbar, Footer, Hero, About, VisionMission, Services, Framework, Values, CTA) and shared animation variants"
provides:
  - "src/layouts/RootLayout.tsx (shared layout with Navbar, Outlet, Footer, scroll reset)"
  - "src/App.tsx rewritten as route declarations using Routes/Route"
  - "src/main.tsx wrapping App with BrowserRouter"
  - "src/pages/HomePage.tsx (Hero + About + VisionMission + Services + Framework + Values + CTA)"
  - "src/pages/AboutPage.tsx (About + VisionMission)"
  - "src/pages/ServicesPage.tsx (Services + Framework)"
  - "src/pages/ValuesPage.tsx (Values)"
  - "src/pages/ContactPage.tsx (Get in Touch shell with email)"
  - "public/_redirects (Netlify SPA fallback)"
  - "vercel.json (Vercel SPA fallback)"
  - "5 distinct routes: /, /about, /services, /values, /contact"
affects:
  - Phase 2 Contact Form (ContactPage.tsx will receive the inquiry form component)
  - Phase 3 SEO Metadata (per-page Helmet components go inside each page file)
  - Phase 4 Animation Polish (AnimatePresence wraps RootLayout Outlet)

# Tech tracking
tech-stack:
  added:
    - react-router-dom (v7 declarative mode — BrowserRouter, Routes, Route, NavLink, Link, Outlet, useLocation)
  patterns:
    - BrowserRouter at main.tsx entry point, Routes/Route in App.tsx, RootLayout as layout route wrapper
    - NavLink with isActive callback for active-state styling in Navbar
    - useLocation + useEffect scroll reset in RootLayout (fires on pathname change)
    - Page components in src/pages/ compose existing src/components/* directly
    - SPA fallback provided for both Netlify (_redirects) and Vercel (vercel.json)

key-files:
  created:
    - src/layouts/RootLayout.tsx
    - src/pages/HomePage.tsx
    - src/pages/AboutPage.tsx
    - src/pages/ServicesPage.tsx
    - src/pages/ValuesPage.tsx
    - src/pages/ContactPage.tsx
    - public/_redirects
    - vercel.json
  modified:
    - src/App.tsx
    - src/main.tsx
    - src/components/Navbar.tsx
    - src/components/Footer.tsx
    - src/components/Hero.tsx
    - src/index.css
    - package.json
    - package-lock.json

key-decisions:
  - "NavLink (not Link) used in Navbar — provides isActive callback for active route highlighting without extra state"
  - "scroll-behavior: smooth removed from index.css — conflicts with programmatic window.scrollTo(0,0) causing visible scroll-back animation on navigation"
  - "SPA fallback configured for both Netlify and Vercel — deployment target unconfirmed, both configs cost nothing and ensure it works regardless of host"
  - "ContactPage uses animate=visible (mount-triggered) not whileInView — short page where all content is above the fold, scroll trigger would never fire"
  - "Framework nav link dropped from Navbar — Framework content lives on /services page, no dedicated route"

patterns-established:
  - "Page components in src/pages/ are thin composition layers — they import and assemble src/components/* without adding their own state or logic"
  - "RootLayout owns shared chrome (Navbar, Footer) and cross-cutting concerns (scroll reset) — page components stay focused on content"
  - "Mobile menu close-on-navigate handled in Navbar via useEffect watching location.pathname"

requirements-completed: [ROUT-01, ROUT-02, ROUT-03, ROUT-06, ROUT-07, PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05]

# Metrics
duration: ~15min
completed: 2026-03-25
---

# Phase 01 Plan 02: React Router Multi-Page Routing Summary

**react-router-dom v7 installed with BrowserRouter entry, RootLayout scroll reset, 5 page components composing existing sections, NavLink active states, and SPA fallback configs for Netlify and Vercel**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-25T20:30:00Z
- **Completed:** 2026-03-25T21:00:00Z
- **Tasks:** 3 (2 auto + 1 human-verify)
- **Files modified:** 16

## Accomplishments

- Installed react-router-dom and wired BrowserRouter at the application entry point (main.tsx)
- Created RootLayout with scroll-to-top on every route change and Navbar/Footer as persistent chrome
- Composed 5 page components from existing extracted components — all content from the original SPA is preserved across the 5 routes
- Converted all anchor-based navigation (Navbar, Footer, Hero) to NavLink/Link components — no scrollIntoView or href="#" navigation remains (except Footer Privacy/Terms placeholders)
- Added SPA fallback configs for Netlify (public/_redirects) and Vercel (vercel.json)
- Removed scroll-behavior: smooth from index.css to prevent visual scroll-back on navigation
- Human verified all 12 checks: 5 routes correct, scroll reset, mobile menu close, hard-refresh, logo link, Footer links, Hero Learn More

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-router-dom, create RootLayout and 5 page components** - `52636e0` (feat)
2. **Task 2: Wire routing in App/main, convert all nav links to router Links, add SPA fallback** - `5f417dc` (feat)
3. **Task 3: Verify multi-page navigation works correctly** - human-verify checkpoint, approved by user

## Files Created/Modified

**Created:**
- `src/layouts/RootLayout.tsx` — shared layout: Navbar + Outlet + Footer + scroll reset on pathname change
- `src/pages/HomePage.tsx` — composes Hero, About, VisionMission, Services, Framework, Values, CTA
- `src/pages/AboutPage.tsx` — composes About + VisionMission
- `src/pages/ServicesPage.tsx` — composes Services + Framework
- `src/pages/ValuesPage.tsx` — wraps Values component
- `src/pages/ContactPage.tsx` — contact shell with "Get in Touch" heading and info@stewardshipadvisory.com
- `public/_redirects` — Netlify SPA fallback (`/* /index.html 200`)
- `vercel.json` — Vercel SPA fallback (rewrites all paths to /index.html)

**Modified:**
- `src/App.tsx` — rewritten as route declarations using Routes, Route, and RootLayout as layout route
- `src/main.tsx` — wraps App with BrowserRouter
- `src/components/Navbar.tsx` — converted to NavLink with isActive, added useEffect close-on-navigate, logo linked to /
- `src/components/Footer.tsx` — navigation links converted to Link components, logo linked to /
- `src/components/Hero.tsx` — Learn More button converted to Link to="/about"
- `src/index.css` — removed scroll-behavior: smooth block
- `package.json` — react-router-dom added to dependencies
- `package-lock.json` — lockfile updated

## Decisions Made

- **NavLink over Link in Navbar:** NavLink's isActive callback enables active route highlighting without maintaining separate state. Link used in Footer and Hero where active-state styling is not needed.
- **scroll-behavior: smooth removed:** The CSS property conflicts with `window.scrollTo(0, 0)` in RootLayout — it causes a visible animated scroll-back to the top on every navigation instead of an instant reset.
- **Dual SPA fallback:** Both `public/_redirects` (Netlify) and `vercel.json` (Vercel) are present because the deployment target is not yet confirmed. Both files are harmless if the wrong host is used.
- **ContactPage uses animate="visible":** Content is above the fold on a short page. Using `whileInView` would produce no animation since the viewport trigger never fires. Mount-triggered animation chosen per RESEARCH.md Pitfall 4.
- **Framework dropped from Navbar:** Framework is a section within the Services page. It has no dedicated route and adding one is out of scope. Footer still links to /services as "I-TRUST Framework."

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

`ContactPage.tsx` is a content shell — it shows firm contact details but has no inquiry form. This is intentional per plan scope. The form component will be added in Phase 2 (Plan 02-01).

## Next Phase Readiness

Phase 1 (Routing Foundation) is now complete. All 5 routes are working with correct content distribution, scroll reset, and mobile navigation.

**Ready for Phase 2 (Contact Form):**
- `src/pages/ContactPage.tsx` is the target file for the Formspree form component
- Blocker still active: Formspree endpoint ID requires account creation before Phase 2 can finalize

**Ready for Phase 3 (SEO Metadata):**
- react-helmet-async Helmet components will be added inside each src/pages/*.tsx file
- Blocker: OG image (1200x630px) must be created as a design prerequisite

**Ready for Phase 4 (Animation Polish):**
- AnimatePresence page transition wrapper goes in `src/layouts/RootLayout.tsx` around the Outlet

---
*Phase: 01-routing-foundation*
*Completed: 2026-03-25*
