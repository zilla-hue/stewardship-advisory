# Requirements: Stewardship Advisory Website

**Defined:** 2026-03-25
**Core Value:** Visitors must immediately understand what Stewardship Advisory does and be able to contact the firm through a working inquiry form.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Routing & Structure

- [ ] **ROUT-01**: Site has 5 distinct pages at `/`, `/about`, `/services`, `/values`, `/contact`
- [ ] **ROUT-02**: Shared layout with persistent Navbar and Footer across all pages
- [ ] **ROUT-03**: Navbar links navigate between pages (route-based, not anchor-based)
- [x] **ROUT-04**: Components extracted from monolithic App.tsx into proper file structure
- [x] **ROUT-05**: Shared animation variants in dedicated utility file
- [ ] **ROUT-06**: SPA fallback configured for production (no 404 on refresh)
- [ ] **ROUT-07**: Scroll position resets to top on page navigation

### Pages

- [ ] **PAGE-01**: Homepage displays Hero, About preview, Services preview, Framework, Values preview, CTA
- [ ] **PAGE-02**: About page with expanded narrative, Vision, and Mission
- [ ] **PAGE-03**: Services page with What We Do accordion and I-TRUST Framework detail
- [ ] **PAGE-04**: Values page with all 7 core values in expanded format
- [ ] **PAGE-05**: Contact page with inquiry form and firm contact details

### Contact Form

- [ ] **CONT-01**: Contact form with name, email, organization, inquiry topic, and message fields
- [ ] **CONT-02**: Form validation (required fields, email format)
- [ ] **CONT-03**: Form submits to Formspree and delivers email
- [ ] **CONT-04**: Form shows loading, success, and error states

### SEO & Metadata

- [x] **SEO-01**: Each page has unique title and meta description
- [x] **SEO-02**: Open Graph tags (og:title, og:description, og:image) per page
- [x] **SEO-03**: Branded OG image (1200x630px) for social previews

### Animation & Polish

- [x] **ANIM-01**: Page transition animations between routes via AnimatePresence
- [x] **ANIM-02**: Scroll-triggered animations adapted for multi-page (mount-triggered on short pages)
- [x] **ANIM-03**: Mobile-first responsive refinement across all 5 pages

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content & Engagement

- **BLOG-01**: Blog/perspectives section with articles
- **BLOG-02**: Content management system for publishing
- **TEAM-01**: Team member profiles with photos and bios

### Analytics & Tracking

- **ANLY-01**: Google Analytics or privacy-friendly analytics integration
- **ANLY-02**: Form submission tracking and conversion metrics

## Out of Scope

| Feature | Reason |
|---------|--------|
| Client login/portal | Separate concern from marketing site |
| Multi-language support | English only for v1 |
| CMS integration | Static content from provided copy text |
| Social media embeds | Distracts from authoritative tone |
| Newsletter signup | No email marketing infrastructure |
| Chatbot | Undermines personal advisory positioning |
| Pricing/rate cards | Advisory services are custom-scoped |
| Dark mode toggle | Mixed dark/light is the design, not user-toggled |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ROUT-01 | Phase 1 | Pending |
| ROUT-02 | Phase 1 | Pending |
| ROUT-03 | Phase 1 | Pending |
| ROUT-04 | Phase 1 | Complete |
| ROUT-05 | Phase 1 | Complete |
| ROUT-06 | Phase 1 | Pending |
| ROUT-07 | Phase 1 | Pending |
| PAGE-01 | Phase 1 | Pending |
| PAGE-02 | Phase 1 | Pending |
| PAGE-03 | Phase 1 | Pending |
| PAGE-04 | Phase 1 | Pending |
| PAGE-05 | Phase 1 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| SEO-01 | Phase 3 | Complete |
| SEO-02 | Phase 3 | Complete |
| SEO-03 | Phase 3 | Complete |
| ANIM-01 | Phase 4 | Complete |
| ANIM-02 | Phase 4 | Complete |
| ANIM-03 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-25*
*Last updated: 2026-03-25 after roadmap creation*
