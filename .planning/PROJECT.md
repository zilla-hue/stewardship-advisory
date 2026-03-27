# Stewardship Advisory Website

## What This Is

A high-end, modern multi-page website for Stewardship Advisory — an institutional communications and reputation advisory practice based in Africa. The site targets institutional leaders and corporate communications teams evaluating advisory partners, presenting the firm's services, framework, and values with authority and sophistication.

## Core Value

Visitors must immediately understand what Stewardship Advisory does and be able to contact the firm through a working inquiry form — every other feature supports this path from understanding to engagement.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Homepage hero section with branding and messaging — existing
- ✓ About Us section with company description — existing
- ✓ Vision & Mission section — existing
- ✓ Services accordion (4 service areas) — existing
- ✓ I-TRUST Framework section (6 steps) — existing
- ✓ Core Values section (7 values) — existing
- ✓ CTA section — existing
- ✓ Responsive navbar with mobile menu — existing
- ✓ Footer with navigation and contact — existing
- ✓ Scroll-triggered animations via Motion — existing
- ✓ Tailwind CSS styling with dark/light mixed sections — existing
- ✓ Multi-page routing (Home, About, Services, Values, Contact) — Validated in Phase 1
- ✓ Dedicated About page (vision, mission, expanded narrative) — Validated in Phase 1
- ✓ Dedicated Services page (What We Do + I-TRUST Framework detail) — Validated in Phase 1
- ✓ Dedicated Values page (core values with expanded content) — Validated in Phase 1
- ✓ Dedicated Contact page with working inquiry form — Validated in Phase 2
- ✓ Email service integration for form submissions — Validated in Phase 2 (Formspree)
- ✓ SEO metadata (title, description, Open Graph tags per page) — Validated in Phase 3
- ✓ Page transition animations between routes — Validated in Phase 4
- ✓ Mobile-first responsive refinement across all pages — Validated in Phase 4

### Active

<!-- Current scope. Building toward these. -->

- No active requirements — all v1 requirements validated

### Out of Scope

- Blog/perspectives section — no content management needed for v1
- Client login/portal — not part of public-facing marketing site
- CMS integration — static content from provided copy text
- Multi-language support — English only
- Analytics dashboard — can be added later with a simple script tag

## Context

- Brownfield project: existing single-page React + Vite + Tailwind site with all copy content already implemented
- All brand copy text has been provided and is already in use across components
- Four logo variants available in `public/image/` (favicon, logo1, logo2, stewardship-logo)
- Design: mixed tone — dark navy hero/framework sections, white content sections, amber accents
- Typography: Inter (sans-serif body) + Playfair Display (serif headings) via Google Fonts
- Animation: Motion library (framer-motion compatible) for scroll-triggered and entrance animations
- Current architecture: monolithic App.tsx with all components — needs decomposition for multi-page

## Constraints

- **Tech stack**: React 19 + Vite + Tailwind CSS 4 + Motion — already in place, extend don't replace
- **Routing**: Client-side routing (React Router or similar) — no SSR needed
- **Form backend**: Needs working email delivery — Formspree, EmailJS, or similar service
- **No build-breaking changes**: Site must remain functional throughout refactoring
- **Brand assets**: Use existing logos and color palette, don't introduce new brand elements

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Multi-page with client-side routing | User wants distinct pages for About, Services, Values, Contact | — Pending |
| Mixed dark/light visual tone | Matches institutional authority while keeping content readable | — Pending |
| Working contact form with email service | Primary conversion action — must actually deliver inquiries | — Pending |
| Mobile-first approach | Both leadership and comms teams browse on mobile | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-27 after Phase 4 (Animation Polish) completion — all v1 phases complete*
