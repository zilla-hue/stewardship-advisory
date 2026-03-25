# Phase 1: Routing Foundation - Research

**Researched:** 2026-03-25
**Domain:** React Router v7, SPA-to-multi-page refactor, brownfield component extraction
**Confidence:** HIGH — based on direct codebase analysis + verified npm versions

---

## Summary

Phase 1 converts a 812-line monolithic `src/App.tsx` into a multi-page React application using React Router v7 declarative mode. The codebase is a single-file SPA where all components (Navbar, Hero, About, VisionMission, Services, Framework, Values, CTA, Footer) are defined inline and navigation is implemented with `document.querySelector` + `scrollIntoView`. React Router is not yet installed.

The refactor involves four parallel workstreams: (1) installing and wiring React Router v7, (2) extracting shared utilities (animation variants), (3) extracting components into dedicated files, and (4) composing those components into five page files. The most critical correctness risk is incomplete replacement of anchor-hash navigation — every `href="#section"`, `document.querySelector`, and `scrollIntoView` call must be replaced with React Router `<Link>`, `<NavLink>`, or `useNavigate`. A second risk is `html { scroll-behavior: smooth }` in `index.css`, which fights programmatic scroll resets on navigation.

The deployment target (Netlify vs Vercel vs GitHub Pages) is an open blocker for ROUT-06 (SPA fallback config). The implementation can proceed without this decision, but the SPA fallback file cannot be finalized until the host is confirmed.

**Primary recommendation:** Extract animation variants first, then wire routing, then extract components one by one (verifying the app still renders after each extraction), then compose pages.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ROUT-01 | Site has 5 distinct pages at `/`, `/about`, `/services`, `/values`, `/contact` | React Router v7 `<Routes>` + `<Route>` declarations in App.tsx |
| ROUT-02 | Shared layout with persistent Navbar and Footer across all pages | `RootLayout` component using `<Outlet>` from react-router-dom |
| ROUT-03 | Navbar links navigate between pages (route-based, not anchor-based) | Replace `handleNavClick`/`document.querySelector` with `<NavLink to="/page">` |
| ROUT-04 | Components extracted from monolithic App.tsx into proper file structure | One-by-one extraction to `src/components/` and `src/pages/` with verified render after each |
| ROUT-05 | Shared animation variants in dedicated utility file | Extract `fadeUp` + `staggerContainer` to `src/lib/animations.ts` before any component extraction |
| ROUT-06 | SPA fallback configured for production (no 404 on refresh) | Deployment target blocker — config differs by host; add `_redirects` (Netlify) or `vercel.json` or `.htaccess`; document options for all three |
| ROUT-07 | Scroll position resets to top on page navigation | `useEffect` in RootLayout listening to `location.pathname` via `useLocation`; also remove `html { scroll-behavior: smooth }` from index.css |
| PAGE-01 | Homepage displays Hero, About preview, Services preview, Framework, Values preview, CTA | Compose existing extracted components in `src/pages/HomePage.tsx` |
| PAGE-02 | About page with expanded narrative, Vision, and Mission | Compose `About` + `VisionMission` in `src/pages/AboutPage.tsx`; existing content covers this |
| PAGE-03 | Services page with What We Do accordion and I-TRUST Framework detail | Compose `Services` + `Framework` in `src/pages/ServicesPage.tsx` |
| PAGE-04 | Values page with all 7 core values in expanded format | Current `Values` component has 6 values — need to confirm if 7th is missing or "Stewardship" is implicit; compose in `src/pages/ValuesPage.tsx` |
| PAGE-05 | Contact page with inquiry form and firm contact details | `src/pages/ContactPage.tsx` — form is a Phase 2 concern; Phase 1 delivers shell with firm contact details and placeholder |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-router-dom | 7.13.2 | Client-side routing, `<Routes>`, `<Route>`, `<Link>`, `<NavLink>`, `<Outlet>`, `useLocation` | De-facto standard; declarative mode wraps existing app without file-based conventions |
| motion (already installed) | 12.23.24 | Animation via `motion/react` import; `AnimatePresence` for page transitions (Phase 4) | Already in package.json; no new install needed |
| react-helmet-async | 3.0.0 | Per-page `<title>` and `<meta>` tags (Phase 3 SEO work) | NOT needed in Phase 1 — install deferred to Phase 3 |

**Version verification (confirmed 2026-03-25 against npm registry):**
- `react-router-dom`: 7.13.2
- `react-helmet-async`: 3.0.0 (deferred)

### Supporting (already installed, no new installs needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.546.0 | Icons (Shield, Eye, etc.) in Values, Services components | Already imported in App.tsx |
| tailwindcss v4 | 4.1.14 | All styling via `@tailwindcss/vite` plugin | No `tailwind.config.js` — uses CSS `@theme` in `index.css` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-router-dom v7 | TanStack Router | TanStack requires file-based conventions — too invasive for brownfield single-file app |
| react-router-dom v7 | Next.js | Requires full migration to Next.js conventions — overkill for client-side marketing site |

**Installation (Phase 1 only):**
```bash
npm install react-router-dom
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── lib/
│   └── animations.ts        # fadeUp, staggerContainer — extracted FIRST
├── layouts/
│   └── RootLayout.tsx       # Navbar + <Outlet> + Footer + scroll reset
├── components/
│   ├── Navbar.tsx            # NavLink-based navigation (replaces handleNavClick)
│   ├── Footer.tsx            # <Link>-based navigation (replaces href="#section")
│   ├── Hero.tsx              # Homepage hero section
│   ├── About.tsx             # About section (used on Home + About pages)
│   ├── VisionMission.tsx     # Vision/Mission (used on Home + About pages)
│   ├── Services.tsx          # Services accordion (used on Home + Services pages)
│   ├── Framework.tsx         # I-TRUST Framework (used on Home + Services pages)
│   ├── Values.tsx            # Values grid (used on Home + Values pages)
│   └── CTA.tsx               # CTA section (Home only)
├── pages/
│   ├── HomePage.tsx          # /
│   ├── AboutPage.tsx         # /about
│   ├── ServicesPage.tsx      # /services
│   ├── ValuesPage.tsx        # /values
│   └── ContactPage.tsx       # /contact
├── App.tsx                   # Route declarations only (thin shell)
├── main.tsx                  # BrowserRouter wrapper + React root
└── index.css                 # Global styles (remove html scroll-behavior: smooth)
```

### Pattern 1: BrowserRouter in main.tsx

**What:** Wrap the React root with `<BrowserRouter>` in `main.tsx` so routing context is available to all components.

**When to use:** Always — wrap at the very top level.

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Pattern 2: Route Declarations in App.tsx

**What:** App.tsx becomes a thin shell declaring all `<Route>` elements. The `RootLayout` route wraps all page routes so Navbar and Footer are persistent.

**When to use:** Declarative mode — simpler than data router for brownfield refactor.

```tsx
// src/App.tsx
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ValuesPage from "./pages/ValuesPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/values" element={<ValuesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
```

### Pattern 3: RootLayout with Scroll Reset

**What:** `RootLayout` renders Navbar, the `<Outlet>` (where page content appears), and Footer. It also resets scroll to top on every route change via `useLocation`.

**When to use:** The scroll reset addresses ROUT-07 and the `html { scroll-behavior: smooth }` pitfall.

```tsx
// src/layouts/RootLayout.tsx
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
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
```

### Pattern 4: NavLink-Based Navbar

**What:** Replace `handleNavClick` (which uses `document.querySelector` + `scrollIntoView`) with React Router `<NavLink>` components pointing to page routes.

**Critical:** The current `navLinks` array uses `href: "#about"` — these must become `to: "/about"`.

```tsx
// src/components/Navbar.tsx — navLinks replacement
const navLinks = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Values", to: "/values" },
  { label: "Contact", to: "/contact" },
];

// Replace all <button onClick={() => handleNavClick(href)}> with:
<NavLink
  to={link.to}
  className={({ isActive }) =>
    `hover:text-white transition-colors ${isActive ? "text-white" : ""}`
  }
>
  {link.label}
</NavLink>
```

**Note:** The current Navbar has a "Get in Touch" button pointing to `handleNavClick("#contact")` — replace with `<NavLink to="/contact">`.

**Note:** The mobile menu closes on link click. Replace `setMobileMenuOpen(false)` logic via `useEffect` watching `location.pathname` instead of inline button handler.

### Pattern 5: Footer Link Conversion

**What:** All `href="#section"` anchors in Footer must become React Router `<Link>` components.

```tsx
// src/components/Footer.tsx — Navigation section
import { Link } from "react-router-dom";

// Replace:
// <a href="#about" className="hover:text-white transition-colors">About Us</a>
// With:
<Link to="/about" className="hover:text-white transition-colors">About Us</Link>
```

**Dead links to handle:** Footer has two placeholder `href="#"` links (Privacy Policy, Terms of Use). Keep as `href="#"` or convert to non-linking text — do not break them into 404 routes.

### Pattern 6: Hero "Learn More" Button

**What:** The Hero component has a button that calls `document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })`. On the multi-page site, clicking this should navigate to `/about`.

```tsx
// src/components/Hero.tsx
import { Link } from "react-router-dom";

// Replace button with:
<Link
  to="/about"
  className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-[#0A1628] transition-colors"
>
  Learn More
  <ChevronDown className="ml-2 w-4 h-4" />
</Link>
```

### Pattern 7: Animation Variants Extraction

**What:** `fadeUp` and `staggerContainer` are defined at the top of App.tsx. Extract them to a shared module before any component extraction so imports resolve correctly.

```ts
// src/lib/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};
```

Then in each extracted component:
```tsx
import { fadeUp, staggerContainer } from "../lib/animations";
```

### Pattern 8: SPA Fallback Options (ROUT-06)

Deployment target unknown — implement the correct config when host is confirmed:

**Netlify:** Create `public/_redirects`:
```
/* /index.html 200
```

**Vercel:** Create `vercel.json` at project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**GitHub Pages:** Requires `404.html` trick (copy `index.html` to `404.html`) — not standard and fragile. Recommend choosing Netlify or Vercel instead.

**Vite dev server:** SPA fallback works automatically in dev mode — no config needed.

### Anti-Patterns to Avoid

- **Keep any `href="#section"` after routing is added:** Hash anchor navigation fails on sub-routes (e.g., clicking "About" from `/services` does nothing because `#about` doesn't exist on that page).
- **Put Navbar/Footer inside page components:** Causes re-mount and state reset on every route change. They belong in `RootLayout` only.
- **Leave `html { scroll-behavior: smooth }` in index.css:** The `window.scrollTo(0, 0)` in RootLayout executes but the browser then animates the scroll to top, creating a visible "scroll-back" effect. Remove it from `html` — Vite will still work fine without it.
- **Extract components in wrong order:** Extract `animations.ts` first. If you extract `About.tsx` before `animations.ts`, the import `"../lib/animations"` won't resolve and the build breaks.
- **Delete the old App.tsx component definitions before pages are composed:** Remove a component from App.tsx only after the corresponding page file imports it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Client-side routing | Custom history management, `window.location` manipulation | `react-router-dom` `<Routes>/<Route>` | React Router handles history, back/forward, deep links, nested routes correctly |
| Active link styling | Manual `window.location.pathname === link.to` checks | `<NavLink>` `isActive` prop | NavLink handles exact match, trailing slashes, search params correctly |
| Scroll reset on navigation | `document.addEventListener("popstate")` | `useLocation` + `useEffect` in RootLayout | React Router's location object is sync-safe with React rendering cycle |
| Mobile menu close on navigate | `onClick` on every NavLink | `useEffect` watching `location.pathname` | Single effect handles all navigation sources (link click, back button, programmatic navigate) |

**Key insight:** Every custom routing primitive has edge cases that react-router-dom already handles. The existing codebase spent 50+ lines on navigation behavior (`handleNavClick`, scroll tracking) that React Router replaces with standard components.

---

## Common Pitfalls

### Pitfall 1: Anchor Navigation Survives the Refactor (Critical)

**What goes wrong:** After routing is added, a developer leaves some `href="#services"` or `handleNavClick("#contact")` calls in place. These work fine on the homepage (the page still has those section IDs) but silently fail on sub-routes.

**Why it happens:** The extraction is incremental — easy to miss one button or footer link.

**How to avoid:** After all extractions, run a grep for `"#` and `scrollIntoView` in the entire `src/` directory. Every occurrence should be eliminated or intentional (e.g., in-page jump links within a long page).

**Warning signs:** Navbar "Contact" button does nothing when clicked from `/about`.

### Pitfall 2: Hard Refresh Returns 404 in Production

**What goes wrong:** Vite dev server handles SPA routing automatically. The deployed site does not. `/services` returns 404 from the host's file server because no `services/index.html` file exists.

**Why it happens:** The SPA fallback config is deployment-target specific and commonly forgotten.

**How to avoid:** For Netlify, add `public/_redirects` with `/* /index.html 200`. Confirm deployment target before Phase 1 ships.

**Warning signs:** Works locally (`npm run dev`), breaks after deploy (`npm run build && npm run preview` also works because Vite preview has its own fallback).

### Pitfall 3: Scroll Position Not Resetting

**What goes wrong:** User clicks "Values" from within a scrolled-down `/services` page. The Values page renders but the viewport is still mid-page.

**Why it happens:** React Router does not reset scroll by default. React renders new content at the existing scroll position.

**How to avoid:** `useEffect(() => { window.scrollTo(0, 0); }, [location.pathname])` in `RootLayout`. Also remove `html { scroll-behavior: smooth }` from `index.css` — this CSS property causes the browser to animate the scroll-to-top, creating a visible "scroll back" effect on every navigation.

**Warning signs:** Navigating from a scrolled page always shows content partway down.

### Pitfall 4: `whileInView` on Short Pages Fires Everything at Once

**What goes wrong:** Dedicated pages (e.g., `/values`) may have limited content. All `whileInView` animated elements are visible in the initial viewport, so all animations trigger simultaneously at page mount instead of as the user scrolls.

**Why it happens:** `whileInView` fires when the element enters the viewport — if everything is already in the viewport at mount, all animations fire immediately.

**How to avoid:** For pages where content is likely above the fold, use `initial="hidden"` + `animate="visible"` (mount-triggered) instead of `whileInView`. The existing `About`, `VisionMission`, `Services`, `Framework`, `Values` components all use `whileInView` — this works fine on the homepage (long page, scroll-triggered) but needs review on dedicated short pages.

**Warning signs:** All section animations fire at once when navigating to a page.

### Pitfall 5: Mobile Menu Stays Open After Navigation

**What goes wrong:** User opens mobile menu, clicks a nav link — menu stays open on the new page.

**Why it happens:** Current `handleNavClick` calls `setMobileMenuOpen(false)` directly. After router migration, if `NavLink` is used instead of `<button onClick>`, the `setMobileMenuOpen(false)` call is removed but the menu state persists.

**How to avoid:** Add `useEffect(() => { setMobileMenuOpen(false); }, [location.pathname])` in the Navbar component. This handles link clicks, back button, and programmatic navigation uniformly.

### Pitfall 6: Footer "Framework" Link Has No Route

**What goes wrong:** The current Footer links to `#framework` (a section on the homepage). In the multi-page structure, the Framework section lives on `/services`. The footer navigation link should point to `/services` (or to a dedicated `/framework` route, but none is planned for Phase 1).

**Why it happens:** The footer was written for single-page anchor navigation — its links map to sections, not pages. The page structure doesn't have a 1:1 match.

**How to avoid:** Map footer navigation to page routes: "I-TRUST Framework" → `/services`. Document this mapping decision explicitly so PAGE-03 (Services page) ensures the Framework section is visible.

---

## Code Examples

### Verified patterns from direct codebase analysis:

### Current Navbar navLinks (to be replaced)
```tsx
// Current: src/App.tsx lines 59-64 — anchor-based, must be replaced
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Framework", href: "#framework" },
  { label: "Values", href: "#values" },
];
```

### Replacement navLinks (route-based)
```tsx
// Replacement: route-based navigation
const navLinks = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Values", to: "/values" },
  { label: "Contact", to: "/contact" },
];
```

Note: "Framework" is dropped from primary nav (no dedicated route in Phase 1 — it lives on the Services page).

### Current Footer anchor links (to be replaced)
```tsx
// Current: src/App.tsx lines 724-744 — all href="#section" must become <Link to="/page">
<a href="#about">About Us</a>
<a href="#services">What We Do</a>
<a href="#framework">I-TRUST Framework</a>
<a href="#values">Our Values</a>
```

### ContactPage shell (Phase 1 — form is Phase 2)
```tsx
// src/pages/ContactPage.tsx
const ContactPage = () => {
  return (
    <section className="bg-white text-[#0A1628] py-24 md:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-8">Get in Touch</h1>
        <p className="text-lg text-[#0A1628]/70 font-light mb-12">
          Contact information and inquiry form coming in Phase 2.
        </p>
        <p className="text-sm text-[#0A1628]/50">
          Email: <a href="mailto:info@stewardshipadvisory.com" className="hover:text-[#0A1628] transition-colors">
            info@stewardshipadvisory.com
          </a>
        </p>
      </div>
    </section>
  );
};
export default ContactPage;
```

### Tailwind v4 import note (no config file)
```css
/* src/index.css — current structure */
@import "tailwindcss";  /* No tailwind.config.js — uses @theme directive */

/* REMOVE this line for ROUT-07 (scroll reset): */
html {
  scroll-behavior: smooth;  /* DELETE — conflicts with window.scrollTo(0,0) in RootLayout */
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` import | `motion/react` import (Motion library) | v11+ | App.tsx already uses correct import; no change needed |
| React Router v5 `<Switch>` | React Router v6+ `<Routes>` | v6 (2021) | Use `<Routes>` not `<Switch>` |
| React Router `<BrowserRouter>` wrapping `<App>` | Same pattern still valid in v7 declarative mode | — | Confirmed — declarative mode is the right choice for brownfield |
| `react-helmet` | `react-helmet-async` | 2019+ | `react-helmet` deprecated; use `-async` variant (Phase 3) |

**Deprecated/outdated:**
- `react-helmet` (non-async): Deprecated, not maintained. Use `react-helmet-async` v3 in Phase 3.
- React Router v5 `component={}` prop: Replaced by `element={}` in v6+.
- Hash router (`#/about`): Not applicable — using `BrowserRouter` with SPA fallback config instead.

---

## Open Questions

1. **Deployment target for SPA fallback (ROUT-06)**
   - What we know: SPA fallback config differs between Netlify (`_redirects`), Vercel (`vercel.json`), and GitHub Pages (`404.html` trick).
   - What's unclear: Which host will be used. STATE.md documents this as a known blocker.
   - Recommendation: Implement code for all three options during Phase 1; activate the correct one when host is confirmed. Do not block routing implementation on this decision.

2. **"7 core values" vs 6 in current code (PAGE-04)**
   - What we know: REQUIREMENTS.md PAGE-04 says "all 7 core values in expanded format." The current `Values` component in App.tsx (lines 578-665) defines exactly 6: Responsibility, Integrity, Independence, Clarity, Discretion, Stewardship.
   - What's unclear: Whether "Stewardship" is the 7th value that was meant to be listed separately, or if a 7th value is missing from the current code.
   - Recommendation: Flag this during VALUES page composition. If the content is correct at 6, update REQUIREMENTS.md. If a 7th value is needed, get copy from the client before composing ValuesPage.

3. **"About preview" vs "full About" distinction (PAGE-01 vs PAGE-02)**
   - What we know: PAGE-01 calls for "About preview" on Homepage; PAGE-02 calls for "expanded narrative" on the About page. The current `About` component is one section (About + 3 paragraphs).
   - What's unclear: Whether the homepage should show a truncated version of the About section or the full current section.
   - Recommendation: Use the full current `About` component on both pages for Phase 1. PAGE-02 "expanded narrative" can mean adding the `VisionMission` section below the `About` section on the About page — which matches the requirement without any new content.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis — `src/App.tsx`, `src/main.tsx`, `src/index.css`, `package.json`, `vite.config.ts` read in full
- `.planning/research/ARCHITECTURE.md` — architecture patterns pre-researched
- `.planning/research/PITFALLS.md` — pitfalls pre-researched from codebase analysis
- `.planning/research/STACK.md` — stack decisions documented

### Secondary (MEDIUM confidence)
- npm registry (2026-03-25): `react-router-dom` 7.13.2, `react-helmet-async` 3.0.0 — confirmed current versions

### Tertiary (LOW confidence — not needed for this phase)
- React Router v7 docs: Declarative mode `<Routes>`/`<Route>` API is stable and consistent with v6 API patterns; confidence is HIGH from cross-referencing with existing project research

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — react-router-dom version verified against npm registry 2026-03-25; motion already installed
- Architecture: HIGH — based on direct codebase analysis of every component; all anchor navigation calls documented
- Pitfalls: HIGH — pitfalls identified from actual code in App.tsx (not hypothetical); three prior pitfalls docs cross-referenced

**Research date:** 2026-03-25
**Valid until:** 2026-06-25 (stable ecosystem — react-router-dom v7 API unlikely to change in 90 days)
