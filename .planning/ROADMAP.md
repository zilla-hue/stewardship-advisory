# Roadmap: Stewardship Advisory Website

## Overview

An existing React SPA is transformed into a proper multi-page marketing website for a high-end institutional advisory firm. The path runs from routing foundation (everything depends on it) through a working contact form (the primary conversion action), then SEO metadata (credibility for institutional clients), and finally animation polish (premium positioning). Each phase delivers a coherent, independently verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Routing Foundation** - Multi-page structure with correct navigation, 5 dedicated URLs, and all content pages composed from extracted components
- [x] **Phase 2: Contact Form** - Working inquiry form with email delivery verified end-to-end via Formspree
- [x] **Phase 3: SEO Metadata** - Per-page titles, descriptions, and Open Graph tags with branded OG image (completed 2026-03-26)
- [ ] **Phase 4: Animation Polish** - Page transition animations and scroll-triggered entrance corrections across all pages

## Phase Details

### Phase 1: Routing Foundation
**Goal**: Visitors can navigate between 5 distinct pages at stable URLs — Home, About, Services, Values, and Contact — with all existing content correctly distributed across pages
**Depends on**: Nothing (first phase)
**Requirements**: ROUT-01, ROUT-02, ROUT-03, ROUT-04, ROUT-05, ROUT-06, ROUT-07, PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05
**Success Criteria** (what must be TRUE):
  1. Clicking Navbar links navigates to `/about`, `/services`, `/values`, and `/contact` without full page reload
  2. Each of the 5 pages displays the correct, complete content for that route (no missing sections)
  3. Hard-refreshing any page URL in the browser shows that page, not a 404
  4. Navigating to a new page scrolls to the top rather than inheriting the previous scroll position
  5. All existing content from the single-page app is visible — nothing has been lost during extraction
**Plans**: 2 plans

Plans:
- [x] 01-01: Extract shared utilities and layout components (animations.ts, Navbar, Footer, RootLayout)
- [x] 01-02: Install react-router-dom, wire up routing, compose 5 page components, configure SPA fallback

### Phase 2: Contact Form
**Goal**: A visitor can submit a structured inquiry through the Contact page and the firm receives the email
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. The Contact page form has fields for name, email, organization, inquiry topic, and message
  2. Submitting with missing required fields or an invalid email shows inline validation errors before sending
  3. A successful submission delivers an email to the firm's inbox (verified end-to-end in a real browser)
  4. The form shows a loading indicator while submitting, a success confirmation after delivery, and a clear error message if the service fails
**Plans**: 1 plan

Plans:
- [x] 02-01: Install @formspree/react, build ContactPage form with validation, Formspree submission, and loading/success/error states

### Phase 3: SEO Metadata
**Goal**: Each page presents unique, professional metadata to search engines and social platforms
**Depends on**: Phase 1
**Requirements**: SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. Each of the 5 pages has a distinct browser tab title that identifies both the page and the firm
  2. Sharing any page URL on LinkedIn or WhatsApp shows a branded preview card with the firm's name, a relevant description, and the OG image
  3. The OG image is a professionally composed 1200x630px graphic using existing brand assets and colors
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md — Install react-helmet-async, create PageSEO component, generate branded OG image, add per-page metadata to all 5 pages

### Phase 4: Animation Polish
**Goal**: Navigation between pages feels smooth and professional; content entrance animations work correctly on all pages regardless of page height
**Depends on**: Phase 3
**Requirements**: ANIM-01, ANIM-02, ANIM-03
**Success Criteria** (what must be TRUE):
  1. Navigating between any two pages plays a visible transition animation (e.g., fade or slide) rather than an instant cut
  2. Content sections on short pages (like Contact) animate in on mount, not requiring a scroll trigger that never fires
  3. All 5 pages render correctly at 375px viewport width with no content overflow, clipped text, or broken layouts
**Plans**: 1 plan

Plans:
- [ ] 04-01-PLAN.md — Add AnimatePresence page transitions in RootLayout, fix mount animations on short pages, mobile responsive audit at 375px

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Routing Foundation | 2/2 | Complete | 2026-03-26 |
| 2. Contact Form | 1/1 | Complete | 2026-03-26 |
| 3. SEO Metadata | 1/1 | Complete   | 2026-03-26 |
| 4. Animation Polish | 0/1 | Not started | - |
