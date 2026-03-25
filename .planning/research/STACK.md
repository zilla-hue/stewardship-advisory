# Stack Research: Multi-Page Advisory Website

**Domain:** Institutional advisory multi-page website
**Researched:** 2026-03-25
**Confidence:** HIGH

## Current Stack (Keep)

- React 19 + Vite 6.2 + Tailwind CSS 4 + Motion 12 — already installed, working
- TypeScript 5.8 — type-safe development
- Lucide React — icon library
- Inter + Playfair Display — Google Fonts

## New Dependencies Needed

### Routing: `react-router-dom` v7

- **Why:** Standard for React SPA-to-multi-page migration. Declarative mode wraps existing app.
- **Why not TanStack Router:** File-based conventions are more invasive for this monolith-to-pages refactor.
- **Install:** `npm install react-router-dom`
- **Confidence:** HIGH

### SEO: `react-helmet-async` v2

- **Why:** The `-async` variant is the documented successor to deprecated `react-helmet`. Works with React 19.
- **Why not plain document.title:** Need Open Graph tags (og:title, og:description, og:image) for social sharing.
- **Install:** `npm install react-helmet-async`
- **Confidence:** HIGH

### Contact Form: Formspree (SaaS, no npm package)

- **Why:** Zero backend code. Form POSTs to Formspree endpoint, delivered to email.
- **Why not EmailJS:** API key ships in browser bundle — security risk for professional firm.
- **Why not Resend:** Needs backend route + rate limiting — overkill for occasional advisory inquiries.
- **Free tier:** 50 submissions/month, appropriate for use case.
- **Confidence:** HIGH

### Page Transitions: Motion `AnimatePresence` (already installed)

- **Why:** Zero new dependencies. `AnimatePresence` with `mode="wait"` wrapping `<Outlet>`, keyed on `location.pathname`.
- **Confidence:** HIGH

## Install Command

```bash
npm install react-router-dom react-helmet-async
```

## What NOT to Use

| Library | Reason |
|---------|--------|
| Next.js | Overkill for client-side marketing site, would require full migration |
| TanStack Router | File-based conventions too invasive for brownfield refactor |
| EmailJS | API key in browser bundle — security concern |
| Redux/Zustand | No shared mutable state between pages |
| CSS Modules | Tailwind already handles all styling |

---
*Stack research: 2026-03-25*
