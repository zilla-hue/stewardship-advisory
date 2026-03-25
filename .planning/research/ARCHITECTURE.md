# Architecture Research: Multi-Page React Corporate Website

**Domain:** Institutional advisory multi-page marketing website
**Researched:** 2026-03-25
**Confidence:** HIGH

## Recommended Architecture

### Layout-Route Pattern with Feature-Sliced Components

React Router v7 in declarative mode. Single `RootLayout` holds Navbar + Footer, renders `<Outlet>`. Each URL maps to a dedicated page component.

```
Browser URL → React Router matches route → RootLayout renders
                                              ├── Navbar (persistent)
                                              ├── <Outlet> → Page Component
                                              │     └── Section components
                                              └── Footer (persistent)
```

## Component Boundaries

### Layer 1: Router Shell
- `BrowserRouter` in `src/main.tsx` — enables client-side routing
- `App` in `src/App.tsx` — declares all `<Route>` definitions

### Layer 2: Layouts
- `RootLayout` in `src/layouts/RootLayout.tsx` — Navbar + `<Outlet>` + Footer
- `Navbar` in `src/components/Navbar.tsx` — route-aware NavLink navigation
- `Footer` in `src/components/Footer.tsx` — route-aware Link navigation

### Layer 3: Pages
| Page | File | URL |
|------|------|-----|
| HomePage | `src/pages/HomePage.tsx` | `/` |
| AboutPage | `src/pages/AboutPage.tsx` | `/about` |
| ServicesPage | `src/pages/ServicesPage.tsx` | `/services` |
| ValuesPage | `src/pages/ValuesPage.tsx` | `/values` |
| ContactPage | `src/pages/ContactPage.tsx` | `/contact` |

### Layer 4: Section Components (extracted from App.tsx)
| Component | File | Used On |
|-----------|------|---------|
| Hero | `src/components/Hero.tsx` | HomePage |
| About | `src/components/About.tsx` | HomePage, AboutPage |
| VisionMission | `src/components/VisionMission.tsx` | HomePage, AboutPage |
| Services | `src/components/Services.tsx` | HomePage, ServicesPage |
| Framework | `src/components/Framework.tsx` | HomePage, ServicesPage |
| Values | `src/components/Values.tsx` | HomePage, ValuesPage |
| CTA | `src/components/CTA.tsx` | HomePage |
| ContactForm | `src/components/ContactForm.tsx` | ContactPage (new) |

### Layer 5: Shared Utilities
- `src/lib/animations.ts` — shared `fadeUp`, `staggerContainer` variants

## Suggested Build Order

```
Step 1: Extract shared animation variants → src/lib/animations.ts
Step 2: Extract Navbar and Footer → src/components/
Step 3: Create RootLayout → src/layouts/RootLayout.tsx
Step 4: Install React Router, set up BrowserRouter + Routes
Step 5: Extract section components one at a time
Step 6: Compose page components (HomePage, About, Services, Values, Contact)
Step 7: Add AnimatePresence to RootLayout for page transitions
Step 8: SEO metadata per page via react-helmet-async
```

**Why this order:** Steps 1-2 are pure refactors (zero risk). Routing (Step 4) must precede pages (Step 6). AnimatePresence (Step 7) comes after routing is stable.

## Anti-Patterns to Avoid

1. **Keeping anchor-href navigation after adding routing** — `href="#about"` doesn't work across pages
2. **Rendering Navbar/Footer inside every page** — causes state reset on route change
3. **AnimatePresence without key** — exit animations never fire without `key={location.pathname}`
4. **Adding global state manager** — no shared mutable state needed
5. **Over-decomposing section components** — extract at section boundaries only

---
*Architecture research: 2026-03-25*
