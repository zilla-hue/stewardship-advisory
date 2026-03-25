# Project Research Summary

**Project:** Stewardship Advisory — Multi-Page Website
**Domain:** Institutional advisory marketing website (React SPA to multi-page conversion)
**Researched:** 2026-03-25
**Confidence:** HIGH

## Executive Summary

Stewardship Advisory is an existing React SPA that needs to be converted into a proper multi-page marketing website befitting a high-end institutional advisory firm. The current codebase is a well-structured single-page app built on React 19 + Vite 6.2 + Tailwind CSS 4 + Motion 12 — all of which stay. The transformation requires two new dependencies (`react-router-dom` v7 and `react-helmet-async` v2) plus a Formspree account for the contact form. The total scope is a refactor and feature addition, not a rewrite.

The recommended approach is a staged extraction: pull out shared utilities and layout components first, add routing, compose dedicated pages from extracted sections, then layer on contact form, SEO metadata, and page transitions in that order. Routing is the root dependency — everything else (dedicated pages, per-page SEO, animated transitions) depends on it being in place and stable. This brownfield-refactor sequencing minimizes risk by making each step independently reversible.

The two highest-risk areas are the routing migration itself (anchor-based navigation breaks the moment React Router is introduced) and the contact form (no backend exists today; Formspree is the correct solution but must be tested end-to-end before deployment). SEO is a gap in the current site — every page shares identical metadata and there is no Open Graph image — but fixing it is straightforward once routing is in place. None of the required patterns are novel; this is well-documented territory.

## Key Findings

### Recommended Stack

The existing stack is appropriate and complete for this use case. Only two libraries need to be added. React Router v7 in declarative mode is the standard choice for this SPA-to-pages migration; TanStack Router was evaluated and rejected because its file-based conventions are too invasive for a brownfield refactor. `react-helmet-async` (the documented successor to the deprecated `react-helmet`) handles per-page SEO metadata including Open Graph tags. Motion's `AnimatePresence` (already installed) handles page transitions at zero additional cost.

For the contact form, Formspree is the correct backend-free choice. EmailJS was rejected because it exposes API keys in the browser bundle — a security concern inappropriate for a professional services firm. A self-hosted backend with Resend was rejected as engineering overkill for a contact volume that fits easily within Formspree's free tier.

**Core technologies:**
- React 19 + Vite 6.2 + Tailwind CSS 4: Existing foundation — keep as-is
- TypeScript 5.8: Type-safe development — keep as-is
- Motion 12 (`AnimatePresence`): Page transitions — already installed, zero new dependencies
- `react-router-dom` v7: Multi-page routing — standard for React SPA migrations
- `react-helmet-async` v2: Per-page SEO metadata + Open Graph tags
- Formspree (SaaS): Contact form delivery — no backend code required

See `.planning/research/STACK.md` for full rationale and rejected alternatives.

### Expected Features

The feature research draws a clear line between what a professional advisory firm must have (table stakes) and what distinguishes Stewardship Advisory specifically (differentiators). The current site is mostly built — it lacks working cross-page navigation, a functioning contact form, and per-page SEO.

**Must have (table stakes):**
- Working contact form with email delivery — currently only a `mailto:` link
- Per-page SEO metadata (title, description, Open Graph) — currently all pages share the same blank metadata
- Mobile-responsive navigation — exists but uses anchor-scroll logic that breaks with routing
- Dedicated pages for About, Services, Values, Contact — currently collapsed into one scroll

**Should have (differentiators):**
- Structured inquiry form with qualifier fields (not just name + email)
- Page transition animations — reinforces premium positioning
- I-TRUST Framework as a dedicated visual section — already built, needs a home on ServicesPage
- Substantive Values page with design-first treatment
- African institutional context in copy and metadata — SEO differentiation

**Defer to v2+:**
- Blog/CMS — no content workflow needed for launch
- Team photo bios — firm not ready to share
- Social media embeds, client logos, chatbot — all actively undermine the authoritative positioning

See `.planning/research/FEATURES.md` for full feature table and anti-feature rationale.

### Architecture Approach

The recommended pattern is a Layout-Route architecture: React Router v7 in declarative mode, a single `RootLayout` component that holds `Navbar` + `<Outlet>` + `Footer`, and five dedicated page components that compose from extracted section components. This keeps Navbar and Footer rendered once (preventing state resets on navigation) while giving each page full control over its content.

The component hierarchy has five distinct layers: Router Shell (`main.tsx` + `App.tsx`), Layouts (`RootLayout`), Pages (5 route-mapped components), Section Components (8 extracted from `App.tsx`), and Shared Utilities (`src/lib/animations.ts`). The build sequence is strictly ordered: animation utilities first, then layout components, then routing, then pages, then transitions and SEO.

**Major components:**
1. `RootLayout` — persistent Navbar + `<Outlet>` + Footer; owns page transition `AnimatePresence`
2. 5 Page components (`HomePage`, `AboutPage`, `ServicesPage`, `ValuesPage`, `ContactPage`) — URL-mapped, compose section components
3. 8 Section components extracted from `App.tsx` — reusable across pages (e.g., `Services` appears on both `HomePage` and `ServicesPage`)
4. `ContactForm` — new component with idle/submitting/success/error state machine, posts to Formspree
5. `src/lib/animations.ts` — shared `fadeUp` + `staggerContainer` variants; eliminates duplication

See `.planning/research/ARCHITECTURE.md` for full component boundary map and build order.

### Critical Pitfalls

1. **Anchor navigation breaks immediately when React Router is added** — `handleNavClick` uses `document.querySelector(href)` + `scrollIntoView`. Replace all `href="#section"` with `<NavLink to="/page">` during Navbar extraction, before any routing goes live.
2. **Hard refresh 404 without SPA fallback** — no `_redirects` or `vercel.json` exists. Bookmarked `/contact` returns 404 in production. Add SPA fallback config during routing setup phase.
3. **Scroll position not reset on route change** — React Router doesn't reset scroll. Compound with `scroll-behavior: smooth` in `index.css`, new pages render mid-scroll. Add `scrollTo(0,0)` in `useEffect` in `RootLayout`; remove smooth scroll from the `html` selector.
4. **Contact form never delivers email** — no form backend exists today. Common failure: wrong Formspree endpoint ID, or emails going to spam. Test end-to-end in dev against a real inbox before deploying.
5. **Animation variants duplicated across files** — `fadeUp` and `staggerContainer` are defined in `App.tsx` and will be copy-pasted into every new page file unless extracted to `src/lib/animations.ts` first.

See `.planning/research/PITFALLS.md` for 12 pitfalls including moderate (form state machine, `whileInView` on short pages, missing OG image) and minor (FOUT, dead footer links, form accessibility).

## Implications for Roadmap

Based on the dependency graph discovered in research, a 4-phase structure is recommended. Routing is the critical path. Every other feature is blocked on it.

### Phase 1: Routing Foundation and Component Extraction

**Rationale:** Routing is the root dependency for every other phase. Navigation, SEO, page transitions, and dedicated pages all require it. Doing component extraction in the same phase means the refactor is complete before new features are added — no half-extracted state lingers.
**Delivers:** Fully functional multi-page site with correct navigation, no broken anchors, SPA fallback configured, scroll position managed, 5 dedicated page URLs working.
**Addresses:** Multi-page structure, mobile-responsive navigation, routing-dependent differentiators.
**Avoids:** Anchor navigation breakage (Pitfall 1), 404 on hard refresh (Pitfall 2), scroll position issues (Pitfall 3), animation variant duplication (Pitfall 5).
**Research flag:** Not needed — well-documented React Router v7 patterns.

**Build order within phase:**
1. Extract `src/lib/animations.ts`
2. Extract `Navbar` and `Footer` components (convert anchors to NavLinks/Links)
3. Create `RootLayout`
4. Install react-router-dom, set up `BrowserRouter` + `Routes` in `App.tsx`
5. Create 5 page components (compose from extracted section components)
6. Add SPA fallback config and scroll-reset logic

### Phase 2: Contact Form

**Rationale:** This is the only phase that requires external service setup (Formspree account creation, endpoint configuration). It must be tested end-to-end against a real inbox. Keeping it isolated makes testing clean and failures easy to diagnose.
**Delivers:** Working `ContactPage` with structured inquiry form, idle/submitting/success/error states, email delivery verified.
**Addresses:** "Working contact form with email delivery" (table stakes), "Structured inquiry form with qualifier fields" (differentiator).
**Avoids:** Form never delivers email (Pitfall 4), no loading/error state (Pitfall 7), missing accessibility labels (Pitfall 12).
**Research flag:** Not needed — Formspree is well-documented; the main work is implementation and testing.

### Phase 3: SEO Metadata

**Rationale:** SEO requires stable routes to be meaningful. Installing `react-helmet-async` and adding per-page metadata is low-complexity but high-value — it's the difference between professional and unprofessional for an advisory firm seeking institutional clients.
**Delivers:** Unique `<title>`, `<meta description>`, and Open Graph tags on every page; branded OG image (1200x630px) for social previews.
**Addresses:** "Per-page SEO metadata" (table stakes), "African institutional context in copy/metadata" (differentiator).
**Avoids:** All pages sharing identical metadata (Pitfall 3), missing OG image producing blank social previews (Pitfall 9).
**Research flag:** Not needed — react-helmet-async is straightforward; OG image creation is a design task.

### Phase 4: Page Transitions and Animation Polish

**Rationale:** Comes last because it depends on routing being fully stable. `AnimatePresence` keyed on `location.pathname` wraps the `<Outlet>` in `RootLayout`. This is also where `whileInView` vs. mount-triggered animation decisions are made per-page.
**Delivers:** Smooth cross-page transitions reinforcing premium brand positioning; corrected animation strategy for short pages.
**Addresses:** "Page transition animations" (differentiator), scroll-triggered entrance animations.
**Avoids:** Exit animations never firing due to missing key (ARCHITECTURE anti-pattern 3), `whileInView` firing immediately on short pages (Pitfall 8).
**Research flag:** Not needed — Motion `AnimatePresence` patterns are well-documented and Motion is already installed.

### Phase Ordering Rationale

- Phase 1 must come first because routing unblocks all other phases.
- Phase 2 is isolated early because it has an external dependency (Formspree account) that needs lead time and real-world testing.
- Phase 3 follows routing because per-page metadata is meaningless without stable per-page URLs.
- Phase 4 is last because `AnimatePresence` should wrap a stable, fully-composed routing tree — adding it before pages are finalized creates unnecessary churn.
- This order avoids the most dangerous pitfall pattern: introducing routing before clearing anchor-based navigation logic.

### Research Flags

Phases with standard patterns (no per-phase research needed):
- **Phase 1:** React Router v7 declarative mode is well-documented; component extraction is pure refactoring.
- **Phase 2:** Formspree integration is well-documented; the risk is operational (testing), not technical.
- **Phase 3:** `react-helmet-async` API is simple and well-documented.
- **Phase 4:** `AnimatePresence` with routing is a standard Motion pattern with official examples.

No phases require a `/gsd:research-phase` call. All patterns are established.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Codebase directly analyzed; library choices verified against official docs and current versions |
| Features | HIGH | Based on institutional advisory website conventions and direct review of current site content |
| Architecture | HIGH | Component boundaries derived from actual `App.tsx` structure; React Router patterns well-established |
| Pitfalls | HIGH | Pitfalls 1-3 and 5-6 identified from direct codebase inspection, not speculation |

**Overall confidence:** HIGH

### Gaps to Address

- **OG image creation:** Research recommends a branded 1200x630px image. This is a design task, not a development task — needs to be scoped and created separately. Can be added as a Phase 3 prerequisite.
- **Formspree endpoint ID:** Must be created via Formspree account during Phase 2. No code can be finalized without it, but setup is trivial (2 minutes to create account and get endpoint ID).
- **Deployment target:** SPA fallback config (Phase 1) differs between Netlify (`_redirects`), Vercel (`vercel.json`), and GitHub Pages. The correct config depends on where the site is hosted. This should be confirmed before Phase 1 ships.
- **Qualifier fields for contact form:** Research recommends a "structured inquiry form with qualifier fields" but does not specify which fields. These should be defined during Phase 2 planning based on the firm's intake process.

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis — component structure, `App.tsx`, `index.html`, `index.css`, `package.json`
- React Router v7 official docs — declarative mode, `BrowserRouter`, `<Outlet>`, `<NavLink>`
- Motion (Framer Motion) docs — `AnimatePresence`, `mode="wait"`, `key` prop behavior
- `react-helmet-async` v2 docs — `HelmetProvider`, `<Helmet>` usage with React 19
- Formspree docs — form endpoint setup, submission handling, free tier limits

### Secondary (MEDIUM confidence)
- Institutional advisory website conventions — feature expectations derived from professional services site patterns
- Open Graph protocol spec — og:image 1200x630px recommendation

---
*Research completed: 2026-03-25*
*Ready for roadmap: yes*
