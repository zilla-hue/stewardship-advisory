# Phase 4: Animation Polish - Research

**Researched:** 2026-03-26
**Domain:** Motion (motion/react v12), AnimatePresence, React Router v7 page transitions, mobile responsive polish
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-01 | Page transition animations between routes via AnimatePresence | AnimatePresence with mode="wait" wrapping Outlet in RootLayout; key={location.pathname} triggers exit/enter cycle |
| ANIM-02 | Scroll-triggered animations adapted for multi-page (mount-triggered on short pages) | Switch whileInView → animate/initial on first section of each page; retain whileInView on subsequent sections |
| ANIM-03 | Mobile-first responsive refinement across all 5 pages | Audit heading font sizes, grid layouts, overflow-x, and horizontal padding at 375px |
</phase_requirements>

---

## Summary

This phase adds three concrete capabilities to the already-functional multi-page site: page-to-page transition animations, corrected entrance animations on short pages, and a mobile responsive pass at 375px.

The codebase already imports and uses `motion` from `"motion/react"` (installed version: 12.38.0). All components already import from `src/lib/animations.ts`. The change surface is well-contained: RootLayout wraps one Outlet, every page component uses either `whileInView` or `animate` at its top section, and Tailwind utility classes handle responsive styles.

The key technical risk is the `whileInView` trap on short pages: components like `About`, `Values`, and `VisionMission` use `whileInView` as their trigger. When these components are the first section on a short page (e.g., `ValuesPage` renders only `<Values />`), the section is immediately in the viewport on mount so `whileInView` does fire — but only if the `-100px` margin does not push the threshold below the visible area. In practice, the real failure case is `ContactPage`, which renders a single `<section>` with `animate="visible"` already — it is correctly using `animate`, not `whileInView`. Review each page-as-first-section component to verify the trigger is appropriate.

**Primary recommendation:** Wrap `<Outlet />` in RootLayout inside `AnimatePresence` with `mode="wait"` and a `motion.div` keyed to `location.pathname`. For each page's first (and possibly only) visible section, change `whileInView` to `animate` + `initial` so the animation fires on mount regardless of page length.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion (motion/react) | 12.38.0 (installed) | AnimatePresence, motion.div, exit animations | Already in project; canonical animation library |
| react-router-dom | 7.13.2 (installed) | useLocation hook for pathname-keyed transitions | Already in project |

### Supporting

No new libraries needed. Everything required is already installed.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| AnimatePresence mode="wait" | CSS transitions on RootLayout | More code, harder to time correctly, no library-level lifecycle hooks |
| Per-page motion.div wrapper in RootLayout | Each page wraps itself in motion.div | Inconsistent; each page must remember to include wrapper — error-prone |

**Installation:** No new packages needed.

---

## Architecture Patterns

### Recommended Project Structure (unchanged)

```
src/
├── lib/animations.ts        # Add pageTransition variant here
├── layouts/RootLayout.tsx   # Add AnimatePresence + motion.div wrapper here
├── pages/                   # Change first-section whileInView → animate on short pages
└── components/              # No changes expected
```

### Pattern 1: AnimatePresence in RootLayout wrapping Outlet

**What:** Wrap `<Outlet />` in a `motion.div` keyed to `location.pathname`, itself inside `AnimatePresence mode="wait"`. The key change forces Motion to unmount the old page (triggering `exit`) and mount the new one (triggering `animate`).

**When to use:** Always — this is the single source of page transitions for the entire app.

**Example:**
```tsx
// Source: motion.dev/docs/react-animate-presence + official React Router integration pattern
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#0A1628] selection:text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};
```

**Why `mode="wait"`:** The exiting page animates out completely before the entering page begins its entrance. Without `mode="wait"`, old and new pages overlap during the transition, which looks broken on this site because sections are full-width and solid-color.

**Why `motion.main` not `motion.div`:** Preserves semantic HTML — the existing `<main>` wrapper becomes the animated element, keeping the same DOM structure.

**Why short transition duration (0.25s):** A long fade (0.8s) on every navigation click feels sluggish. 0.2–0.3s is perceptible but not intrusive for a professional site.

### Pattern 2: pageTransition variant in animations.ts

**What:** Centralize transition variants in `src/lib/animations.ts` rather than inlining them in RootLayout.

**Example:**
```ts
// src/lib/animations.ts — add alongside existing fadeUp, staggerContainer
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.25, ease: "easeInOut" },
};
```

Then in RootLayout:
```tsx
import { pageTransition } from "../lib/animations";
// ...
<motion.main key={location.pathname} {...pageTransition}>
```

### Pattern 3: Fixing whileInView on first-section components

**What:** Components that are the sole (or first visible) section on a page should use `initial`/`animate` instead of `whileInView`, because the element is already in the viewport on mount — `whileInView` fires, but with `-100px` margin it may not animate on very short pages, and it also means no animation fires if the browser pre-renders.

**Audit of current components:**

| Component | Current trigger | Used as first/only section on | Action needed |
|-----------|----------------|-------------------------------|---------------|
| `Hero` | `animate` | HomePage | No change — correct |
| `About` | `whileInView` | AboutPage (first section) | Change to `animate`/`initial` |
| `VisionMission` | `whileInView` | AboutPage (second section) | Keep `whileInView` |
| `Services` | `whileInView` | ServicesPage (first section) | Change to `animate`/`initial` |
| `Framework` | `whileInView` | ServicesPage (second section) | Keep `whileInView` |
| `Values` | `whileInView` | ValuesPage (only section) | Change to `animate`/`initial` |
| `ContactPage` (inline) | `animate` | ContactPage (only content) | Already correct — no change |
| `CTA` | `whileInView` | HomePage (last section) | Keep `whileInView` — page is long |

**Change required — example for About.tsx:**
```tsx
// Before:
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
>

// After:
<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
```

**Important:** Only change the outer `motion.div` trigger. Internal `motion.div variants={fadeUp}` children animate via stagger from the parent — no changes needed on child elements.

### Pattern 4: Mobile responsive audit approach

**What:** Test each page at 375px viewport width; fix overflows, clipped text, and broken grids.

**Known risk areas from codebase review:**

| Component | Risk | Fix pattern |
|-----------|------|-------------|
| `Hero` | `text-4xl md:text-6xl lg:text-7xl` — 4xl at 375px is fine | No change likely needed |
| `Framework` grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — 1 col at 375px | Fine |
| `Services` accordion | Service titles `text-xl md:text-2xl` — flex row with icon | Verify the flex row does not overflow; `ml-4 flex-shrink-0` on icon is correct |
| `About` grid | `grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24` — 1 col at 375px | Fine |
| `VisionMission` | `border-l-2 pl-8` with long text | Verify text does not clip at 375px |
| `ContactPage` | `px-6 md:px-12` — fine, form is `max-w-2xl` | Verify form fields don't overflow |
| `Hero` image | `h-24 md:h-32 w-auto` — fine | No change likely needed |

**The most reliable mobile audit method:** Run `npm run dev` and use Chrome DevTools Device toolbar at 375px width. Note any horizontal scrollbar (indicates overflow-x on `<body>` or a container).

**Common Tailwind fix for horizontal overflow:**
```tsx
// On the outermost container that may overflow horizontally
className="overflow-x-hidden"
```

### Anti-Patterns to Avoid

- **Keying AnimatePresence on something other than pathname:** Using `location.key` instead of `location.pathname` causes a new animation on every navigation including back/forward to the same page. Use `location.pathname`.
- **Putting AnimatePresence outside BrowserRouter:** It must be inside BrowserRouter so `useLocation` works. Current architecture is correct — `BrowserRouter` is in `main.tsx`.
- **Animating Navbar and Footer inside AnimatePresence:** These are persistent layout elements and must remain outside the animated wrapper. Current RootLayout structure wraps only `<Outlet />`, not the entire page.
- **Setting `initial={false}` on AnimatePresence:** This suppresses the entrance animation on first page load. For this site, the first page entrance animation is desirable — do not set `initial={false}`.
- **Using mode="sync" for page transitions:** Old and new pages render simultaneously and overlap. Always use `mode="wait"` for full-page transitions.
- **Forgetting `exit` prop on the motion.div:** AnimatePresence only plays exit animations on motion components that have an `exit` prop defined. Without `exit`, the page disappears instantly.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Detecting route change | Custom event listeners, history API polling | `useLocation()` from react-router-dom | React Router already tracks this; keying on pathname is the standard pattern |
| Sequencing exit/enter | setTimeout delays, CSS animation classes, state flags | `AnimatePresence mode="wait"` | Motion handles lifecycle precisely; hand-rolled timing is brittle |
| Per-component transition state | `isTransitioning` booleans threaded down as props | AnimatePresence + motion.div key | Motion propagates exit context automatically via React context |

**Key insight:** The entire animation system needed here already exists in the installed libraries. This phase is configuration and code wiring, not new infrastructure.

---

## Common Pitfalls

### Pitfall 1: Exit animation does not play

**What goes wrong:** Page changes instantly with no animation, or only entrance animates.
**Why it happens:** The motion component either lacks an `exit` prop, is not a direct child of `AnimatePresence`, or the key did not change between renders (e.g., navigating to the same route).
**How to avoid:** Verify three things — (1) `<AnimatePresence>` wraps the conditional/changing element, (2) the `motion.div` has `exit={{ opacity: 0 }}` (or variant-based equivalent), (3) the `key` prop equals `location.pathname` and changes on navigation.
**Warning signs:** Animation plays on mount but not on navigation away; no console errors.

### Pitfall 2: scroll-to-top fires before exit animation finishes

**What goes wrong:** `window.scrollTo(0,0)` in the `useEffect` fires immediately on navigation, snapping scroll position before the exit animation completes, causing a jarring jump.
**Why it happens:** The useEffect with `[location.pathname]` dependency fires synchronously after the location changes, before Motion begins the exit animation.
**How to avoid:** Two options — (a) Accept this and use a short exit duration (0.2s) so the scroll snap is less noticeable; or (b) Move scroll reset into `onExitComplete` callback on AnimatePresence. Option (a) is simpler and sufficient for this site.
**Warning signs:** Visible scroll position jump during page transitions on pages taller than the viewport.

### Pitfall 3: whileInView never fires on a short page after route change

**What goes wrong:** Navigating to a short page (e.g., ValuesPage with only the Values component), content is already visible but entrance animations never play.
**Why it happens:** `whileInView` uses an IntersectionObserver. With `viewport={{ once: true, margin: "-100px" }}`, an element that starts in the viewport may or may not trigger depending on exact layout timing and the IntersectionObserver threshold. After AnimatePresence fades the page in, the component is already visible — but if the observer fires before the element is in final layout position, it may miss the threshold.
**How to avoid:** For any component that is the first (or only) section on a short page, change `whileInView` to `animate` + `initial`. This guarantees the animation fires on mount regardless of viewport state.
**Warning signs:** Page loads with animated fade-in but section content remains invisible/hidden (stuck at `opacity: 0, y: 40`).

### Pitfall 4: AnimatePresence placed in wrong component

**What goes wrong:** `AnimatePresence` placed inside each page component (wrapping self) rather than in RootLayout. Each page adds its own wrapper, or the transition only works for some pages.
**Why it happens:** Misunderstanding of where AnimatePresence needs to live — it needs to be the parent that conditionally renders the changing child.
**How to avoid:** One AnimatePresence in RootLayout wrapping the Outlet. Zero AnimatePresence calls in individual page components.

### Pitfall 5: Mobile overflow from fixed-width elements

**What goes wrong:** At 375px viewport, horizontal scrollbar appears or content is clipped.
**Why it happens:** Elements with fixed pixel widths, large negative margins, or absolute positioning that assumes wider viewport.
**How to avoid:** Audit for any explicit `w-[Xpx]` values larger than 375, any absolute-positioned elements with `right-[negative]` or `left-[negative]`. The background blur circles in Hero (`w-[500px]`) should be fine since they use `pointer-events-none` and blur, but the parent section uses `overflow-hidden` — verify this.
**Warning signs:** `document.body.scrollWidth > window.innerWidth` in DevTools console, or visible horizontal scrollbar.

---

## Code Examples

Verified patterns from official sources:

### Complete RootLayout with AnimatePresence (final target state)

```tsx
// src/layouts/RootLayout.tsx
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#0A1628] selection:text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default RootLayout;
```

### animations.ts additions

```ts
// src/lib/animations.ts — additions only
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.25, ease: "easeInOut" },
};
```

### Fix for About.tsx first-section animation

```tsx
// Change whileInView to animate for the outer stagger container
// Before:
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
  className="max-w-7xl mx-auto px-6 md:px-12"
>

// After:
<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
  className="max-w-7xl mx-auto px-6 md:px-12"
>
```

### AnimatePresence import path (Motion v12)

```tsx
// Source: motion.dev/docs/react-animate-presence — confirmed for motion v12.38
import { AnimatePresence } from "motion/react";
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import { AnimatePresence } from "framer-motion"` | `import { AnimatePresence } from "motion/react"` | Motion v11 (2024) | Import path changed; this project already uses the new path |
| `<AnimatePresence exitBeforeEnter>` | `<AnimatePresence mode="wait">` | Framer Motion v7 (2022) | Old prop is removed; must use `mode="wait"` |
| `<Switch>` in React Router v5 | `<Outlet>` in React Router v6/v7 | React Router v6 (2021) | AnimatePresence wraps Outlet, not Switch |

**Deprecated/outdated:**
- `exitBeforeEnter` prop on AnimatePresence: Removed in Framer Motion v7. Use `mode="wait"` instead.
- `<Routes location={displayLocation}>` DIY pattern: Works but is unnecessary complexity when AnimatePresence with `mode="wait"` and `key` is available.

---

## Open Questions

1. **Scroll-to-top timing with exit animation**
   - What we know: `useEffect` fires immediately on `location.pathname` change, before exit animation runs
   - What's unclear: Whether the scroll snap at 0.25s duration is noticeable enough to require `onExitComplete` callback
   - Recommendation: Implement with the current `useEffect` approach. Test manually. If scroll snap is visible, move `window.scrollTo(0,0)` into `onExitComplete` on AnimatePresence.

2. **ServicesPage height at 375px**
   - What we know: ServicesPage renders `<Services />` (accordion) + `<Framework />` (6-card grid). This is the tallest page.
   - What's unclear: Whether the accordion item `pl-16` (64px) on bullet lists causes overflow at 375px (375 - 2*24px padding - 64px = 263px for text — should be fine but must verify)
   - Recommendation: Test specifically at 375px with all accordion items expanded.

---

## Sources

### Primary (HIGH confidence)
- `motion.dev/docs/react-animate-presence` — AnimatePresence props, mode="wait", import path confirmed for Motion v12
- `node_modules/motion/package.json` — Confirmed installed version 12.38.0
- `node_modules/react-router-dom/package.json` — Confirmed installed version 7.13.2
- Codebase audit of all component files — Current `whileInView`/`animate` usage per component confirmed by direct file reads

### Secondary (MEDIUM confidence)
- WebSearch: "motion/react AnimatePresence page transitions React Router 2025 2026" — confirmed `mode="wait"` pattern, `key={location.pathname}` approach, direct-child requirement
- WebSearch: "motion/react version 12 AnimatePresence mode wait page transitions" — confirmed `mode="wait"` is current API, not `exitBeforeEnter`

### Tertiary (LOW confidence)
- None — all critical claims verified against installed packages or official docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against installed node_modules
- Architecture (AnimatePresence pattern): HIGH — confirmed against official motion.dev docs
- Pitfalls: HIGH — derived from direct codebase audit combined with verified API behavior
- Mobile responsive audit: MEDIUM — pattern well-known; specific component issues require manual browser testing to confirm

**Research date:** 2026-03-26
**Valid until:** 2026-06-26 (Motion API is stable; React Router v7 routing model is stable)
