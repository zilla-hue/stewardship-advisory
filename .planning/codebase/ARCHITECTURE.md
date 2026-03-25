# Architecture

**Analysis Date:** 2026-03-25

## Pattern Overview

**Overall:** Single-Page Application (SPA) with Component-Based Architecture

**Key Characteristics:**
- React 19 frontend with TypeScript for type safety
- Vite build tooling for fast development and optimized production builds
- Tailwind CSS + Motion animations for responsive, animated UI
- Monolithic single-file component structure (all components in `App.tsx`)
- No separate API backend — marketing website with static content
- Client-side rendering with smooth scroll navigation
- Motion-based animations for entrance and interaction effects

## Layers

**Presentation Layer:**
- Purpose: Render UI components and handle user interactions
- Location: `src/App.tsx`, `src/main.tsx`
- Contains: React components (Navbar, Hero, About, Services, Framework, Values, CTA, Footer), animation variants, state management for interactive sections
- Depends on: React, motion/react, lucide-react for icons, Tailwind CSS for styling
- Used by: Browser via `src/main.tsx` entry point

**Styling & Design System:**
- Purpose: Unified visual appearance, theming, responsive design
- Location: `src/index.css`
- Contains: Font definitions (Inter sans-serif, Playfair Display serif), Tailwind configuration, global styles
- Depends on: Tailwind CSS, Google Fonts
- Used by: All components via Tailwind utility classes

**Build & Dev Environment:**
- Purpose: Configure development server, production builds, module resolution
- Location: `vite.config.ts`, `tsconfig.json`
- Contains: Vite configuration (React plugin, Tailwind plugin, environment variables, path aliases), TypeScript compiler options
- Depends on: Vite, React plugin, Tailwind Vite plugin, TypeScript
- Used by: npm scripts (dev, build, preview)

**Static Assets:**
- Purpose: Store images, logos, and favicon
- Location: `public/image/`
- Contains: `favicon.png`, `logo1.png`, `logo2.jpeg`, `stewardship-logo.png`
- Used by: HTML and component image tags

**HTML Entry Point:**
- Purpose: Provide DOM root element for React and load main script
- Location: `index.html`
- Contains: Basic HTML structure with `<div id="root">` and module script reference
- Used by: Browser when loading the application

## Data Flow

**Page Load Flow:**

1. Browser loads `index.html`
2. Script tag loads `src/main.tsx`
3. React renders `App` component into `#root` element
4. App renders all section components in sequence (Navbar, Hero, About, VisionMission, Services, Framework, Values, CTA, Footer)
5. Motion animations initialize and trigger on scroll/mount
6. User interactions (scroll, button clicks) update local component state

**Navigation Flow:**

1. User clicks navigation link or button with href (e.g., `#about`)
2. Click handler calls `document.scrollIntoView({ behavior: "smooth" })`
3. Browser smooth-scrolls to target element
4. Motion animations trigger as sections come into viewport via `whileInView` variant

**State Management:**

- Local component state: `useState` hooks in Navbar (scrolled, mobileMenuOpen), Services (openIndex)
- No global state management (Redux, Zustand, etc.)
- Animations controlled by Motion's `initial`, `animate`, `whileInView` variants

## Key Abstractions

**Animation Variants:**
- Purpose: Reusable animation definitions for consistent motion across components
- Examples: `fadeUp` (opacity + Y-axis), `staggerContainer` (staggered child animations)
- Pattern: Motion variant objects with `hidden` and `visible` states, defined in `src/App.tsx`

**Section Components:**
- Purpose: Logical groupings of UI representing different page sections
- Examples: `Navbar`, `Hero`, `About`, `Services`, `Framework`, `Values`, `CTA`, `Footer`
- Pattern: Functional React components returning JSX with motion wrappers, self-contained state and data

**Accordion Pattern (Services Section):**
- Purpose: Expandable/collapsible service details
- Implementation: `openIndex` state in Services component controls which item renders expanded
- Pattern: onClick toggles `openIndex`, conditional CSS classes control max-height and opacity for smooth transitions

**Navigation Data:**
- Purpose: Centralize navigation links for reuse across Navbar and mobile menu
- Pattern: Array of objects (label, href) within Navbar component

**Service Data Structure:**
- Purpose: Define service offerings with expandable details
- Pattern: Array of objects with title and items array in Services component

**Framework Steps Data:**
- Purpose: Define I-TRUST framework model steps with descriptions
- Pattern: Array of objects with letter, title, description, detail, isOutcome flag in Framework component

**Values List Data:**
- Purpose: Define core organizational values with icons
- Pattern: Array of objects with icon component, title, description in Values component

## Entry Points

**Browser Entry:**
- Location: `index.html`
- Triggers: User navigates to application URL
- Responsibilities: Provides root DOM element, loads main React script

**React Application Entry:**
- Location: `src/main.tsx`
- Triggers: Script loaded from index.html
- Responsibilities: Creates React root, mounts App component, enables StrictMode for development checks

**Application Root:**
- Location: `src/App.tsx` (default export function App)
- Triggers: Rendered by React in main.tsx
- Responsibilities: Orchestrates all page sections, manages global layout structure

## Error Handling

**Strategy:** No explicit error handling implemented

**Current Approach:**
- Relies on browser default error handling
- No try-catch blocks or error boundaries
- Assumes all external resources (fonts, images, APIs) load successfully

## Cross-Cutting Concerns

**Scrolling & Navigation:** Handled via `document.scrollIntoView()` with smooth behavior in button click handlers across Navbar, Hero, Services, and CTA sections

**Responsive Design:** Achieved via Tailwind responsive prefixes (md:, lg:) applied to all components; no media query logic in component code

**Animations:** Motion library applies animations declaratively to components; animation logic separated from business logic via variant objects

**Styling:** Tailwind utility classes for all styling; no CSS modules or styled-components; custom fonts defined in index.css

**Mobile Menu:** Managed in Navbar component; controls body overflow and menu visibility state; closes on navigation link click

**Dynamic Year in Footer:** Uses `new Date().getFullYear()` for copyright date
