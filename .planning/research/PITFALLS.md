# Pitfalls Research: SPA to Multi-Page Conversion

**Domain:** React SPA → multi-page advisory website
**Researched:** 2026-03-25
**Confidence:** HIGH — based on direct codebase analysis

## Critical Pitfalls

### 1. Hash-anchor navigation breaks after adding React Router
**Evidence:** Navbar `handleNavClick` uses `document.querySelector(href)` and `scrollIntoView`. On sub-routes like `/services`, clicking "About" does nothing because `#about` doesn't exist on that page.
**Prevention:** Replace all `href="#section"` with `<NavLink to="/page">` during Navbar extraction.
**Phase:** Routing setup (Phase 1)

### 2. Hard refresh returns 404 without SPA fallback
**Evidence:** No `_redirects`, `vercel.json`, or `historyApiFallback` config. Bookmarked `/contact` URL returns 404 after deployment.
**Prevention:** Add SPA fallback to deployment config. For Vite dev server, it works by default. For production, add appropriate redirect rules.
**Phase:** Routing setup (Phase 1)

### 3. All pages share same SEO metadata
**Evidence:** `index.html` has only `<title>Stewardship Advisory Limited</title>` — no description, og:title, og:description, og:image. Every page looks identical to Google.
**Prevention:** Install `react-helmet-async`, add unique metadata per page component.
**Phase:** SEO phase

### 4. Contact form submits but emails never delivered
**Evidence:** No form backend exists. Common failures: wrong Formspree endpoint ID, emails going to spam.
**Prevention:** Test form submission end-to-end in dev before deploying. Verify email delivery to actual inbox.
**Phase:** Contact form phase

### 5. Page transitions fight scroll position
**Evidence:** React Router doesn't reset scroll position. `html { scroll-behavior: smooth }` in `index.css` compounds the problem. New pages render mid-scroll.
**Prevention:** Add `scrollTo(0, 0)` on route change via `useEffect` in RootLayout. Remove `scroll-behavior: smooth` from html (keep on specific elements only).
**Phase:** Routing setup (Phase 1)

## Moderate Pitfalls

### 6. Animation variants duplicated across files
**Evidence:** `fadeUp` and `staggerContainer` defined in App.tsx will be copy-pasted into every page file during decomposition.
**Prevention:** Extract to `src/lib/animations.ts` FIRST, before any component extraction.
**Phase:** Component extraction (Phase 1)

### 7. Contact form has no loading/error state
**Evidence:** Current CTA is just a `mailto:` link. Form needs idle/submitting/success/error states.
**Prevention:** Implement form state machine from the start. Disable submit button during submission.
**Phase:** Contact form phase

### 8. `whileInView` animations fire immediately on short pages
**Evidence:** Dedicated pages (About, Values) may have limited content, putting all elements in viewport at load. Scroll-triggered animations all fire at once.
**Prevention:** Use `initial` + `animate` (mount-triggered) instead of `whileInView` on pages where content is above the fold.
**Phase:** Page composition (Phase 1)

### 9. Open Graph image missing
**Evidence:** No `og:image` in index.html. LinkedIn/WhatsApp previews show blank — unprofessional for advisory firm.
**Prevention:** Create a branded OG image (1200x630px) and add to all page metadata.
**Phase:** SEO phase

## Minor Pitfalls

### 10. Google Fonts flash of unstyled text (FOUT)
**Prevention:** Add `font-display: swap` (Google Fonts does this by default with `&display=swap`).

### 11. Footer links are dead (`href="#"`)
**Prevention:** Convert to React Router `<Link>` components during Footer extraction.

### 12. Contact form inputs need explicit labels for accessibility
**Prevention:** Use `<label htmlFor>` on all form inputs, not just placeholders.

---
*Pitfalls research: 2026-03-25*
