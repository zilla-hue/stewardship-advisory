---
phase: 04-animation-polish
plan: 01
subsystem: ui
tags: [motion, react-router, animation, mobile, responsive]

# Dependency graph
requires:
  - phase: 01-routing-foundation
    provides: RootLayout with Outlet, animations.ts with fadeUp/staggerContainer, React Router v7 routing
  - phase: 03-seo-metadata
    provides: All 5 page components with SEO metadata
provides:
  - AnimatePresence page transitions (fade in/out, 0.25s) between all routes
  - pageTransition variant in animations.ts for route-level animation
  - Mount-triggered entrance animations on About, Services, and Values pages
  - Mobile-verified layout at 375px viewport width across all 5 pages
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "AnimatePresence mode=wait wrapping motion.main keyed to location.pathname in RootLayout for page transitions"
    - "pageTransition variant pattern: initial/animate/exit/transition fields spread onto motion.main"
    - "Use animate='visible' (not whileInView) on first-section components so entrance fires on mount"

key-files:
  created: []
  modified:
    - src/lib/animations.ts
    - src/layouts/RootLayout.tsx
    - src/components/About.tsx
    - src/components/Services.tsx
    - src/components/Values.tsx

key-decisions:
  - "pageTransition uses opacity-only fade (not slide) at 0.25s easeInOut to avoid layout jank during route changes"
  - "whileInView changed to animate on first-section components: accepted trade-off that these animate on mount even when used mid-page on HomePage, since stagger completes before user scrolls"
  - "Navbar and Footer kept outside AnimatePresence — they are persistent layout elements that must not fade on navigation"

patterns-established:
  - "Page transitions: AnimatePresence mode=wait in RootLayout, motion.main key=location.pathname, spread pageTransition"
  - "Short-page animations: use animate='visible' not whileInView when component is first visible section"

requirements-completed: [ANIM-01, ANIM-02, ANIM-03]

# Metrics
duration: ~20min
completed: 2026-03-27
---

# Phase 4 Plan 01: Animation Polish Summary

**AnimatePresence fade transitions between all 5 routes via RootLayout, mount-triggered entrance animations on About/Services/Values, and mobile-verified layouts at 375px**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-27
- **Completed:** 2026-03-27
- **Tasks:** 2 (1 auto + 1 human-verify)
- **Files modified:** 5

## Accomplishments
- Added `pageTransition` variant to `animations.ts` and wrapped `Outlet` in `AnimatePresence mode="wait"` with `motion.main` keyed to `location.pathname` — navigating between any page now plays a 0.25s fade transition
- Fixed scroll-triggered animation issue on short pages: About, Services, and Values outer `motion.div` containers now use `animate="visible"` instead of `whileInView="visible"` so content animates in on mount without requiring scroll
- Verified all 5 pages render correctly at 375px viewport width with no horizontal overflow, stacked grids, and readable text

## Task Commits

Each task was committed atomically:

1. **Task 1: Add AnimatePresence page transitions and fix mount animations** - `0676db5` (feat)
2. **Task 2: Verify page transitions, animations, and mobile responsiveness** - human-verified, approved

**Plan metadata:** (docs commit — this summary)

## Files Created/Modified
- `src/lib/animations.ts` - Added `pageTransition` export with initial/animate/exit/transition fields
- `src/layouts/RootLayout.tsx` - Added AnimatePresence with motion.main keyed to location.pathname wrapping Outlet
- `src/components/About.tsx` - Changed outer motion.div from whileInView to animate="visible"
- `src/components/Services.tsx` - Changed both outer motion.div containers from whileInView to animate="visible"
- `src/components/Values.tsx` - Changed both outer motion.div containers from whileInView to animate="visible"

## Decisions Made
- Opacity-only fade (not slide/transform) for page transitions to avoid layout jank — the page content changes position during transition if y-transform is applied
- Accepted trade-off: About/Services/Values components use `animate` not `whileInView`, meaning they animate on mount even when rendered mid-page on HomePage. Stagger animations complete quickly so this is not noticeable by the time a user scrolls past
- Navbar and Footer deliberately kept outside AnimatePresence — they are persistent and must not participate in route transitions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 4 is the final planned phase. The site now has:
- Multi-page routing with 5 dedicated URLs (Phase 1)
- Working contact form via Formspree (Phase 2)
- Per-page SEO metadata with branded OG image (Phase 3)
- Smooth page transitions and entrance animations (Phase 4)

The site is ready for deployment. Remaining pre-launch items:
- Confirm deployment target (Netlify vs Vercel vs GitHub Pages) to configure the correct SPA fallback (_redirects vs vercel.json vs 404.html)
- Verify Formspree endpoint xkopnqrj is active in production environment

---
*Phase: 04-animation-polish*
*Completed: 2026-03-27*
