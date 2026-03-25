# Features Research: Institutional Advisory Website

**Domain:** High-end corporate advisory website
**Researched:** 2026-03-25
**Confidence:** HIGH

## Table Stakes (Must Have)

Features users expect from a professional advisory firm website. Missing these signals unprofessionalism.

| Feature | Complexity | Dependencies |
|---------|-----------|--------------|
| Homepage with hero and clear value proposition | LOW | None (exists) |
| Services overview with detail | LOW | None (exists) |
| About section (who the firm is) | LOW | None (exists) |
| Working contact form with email delivery | MEDIUM | Form backend service |
| Mobile-responsive navigation | LOW | None (exists) |
| Footer with navigation and contact | LOW | None (exists) |
| Per-page SEO metadata (title, description) | LOW | Routing, react-helmet-async |
| Consistent professional typography | LOW | None (exists) |
| Fast page loads (<3s) | LOW | None (Vite handles) |
| Privacy policy link | LOW | None |

## Differentiators (Competitive Advantage)

Features that distinguish Stewardship Advisory from generic corporate sites.

| Feature | Complexity | Dependencies |
|---------|-----------|--------------|
| I-TRUST Framework as dedicated visual section | LOW | None (exists) |
| Structured inquiry form with qualifier fields | MEDIUM | Contact page, form backend |
| Page transition animations | MEDIUM | Routing, AnimatePresence |
| Scroll-triggered entrance animations | LOW | None (exists) |
| Substantive Values page (not just a list) | LOW | Routing |
| African institutional context in copy/metadata | LOW | SEO metadata |
| Vision/Mission as design-first elements | LOW | None (exists) |
| Dedicated multi-page structure (not just SPA scroll) | MEDIUM | React Router |

## Anti-Features (Deliberately NOT Building)

| Feature | Reason |
|---------|--------|
| Blog/CMS | No content creation workflow needed for v1 |
| Client logo carousel | No client logos available; feels presumptuous |
| Social media embeds | Distracts from authoritative tone |
| Team photo bios | Not ready; can add when firm is ready to share |
| Pricing/rate cards | Advisory services are custom-scoped |
| Newsletter signup | No email marketing infrastructure |
| Multi-language | English only for now |
| Chatbot | Undermines the personal, high-touch advisory positioning |
| Dark mode toggle | Mixed dark/light is the design — not user-toggled |
| Client portal | Separate concern from marketing site |

## Feature Dependencies

```
React Router (routing)
  ├── About page
  ├── Services page
  ├── Values page
  ├── Contact page
  │     └── Form backend (Formspree)
  ├── SEO metadata (react-helmet-async)
  └── Page transitions (AnimatePresence)
```

**Routing is the root dependency.** All multi-page features depend on it.

## MVP Build Order

1. Routing setup + component extraction
2. Dedicated pages (About, Services, Values)
3. Contact page + working form
4. SEO metadata per page
5. Page transitions

---
*Features research: 2026-03-25*
