# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Type-check only (tsc --noEmit) — no ESLint configured
npm run clean     # Remove dist/
```

No test framework is configured.

## Environment

Set `GEMINI_API_KEY` in `.env.local`. Vite exposes it at `process.env.GEMINI_API_KEY` (injected via `vite.config.ts` `define`).

## Architecture

Single-page marketing site for Stewardship Advisory Limited. The entire UI lives in **`src/App.tsx`** — one file, no routing, no state management library.

**Stack:** React 19 · TypeScript · Tailwind CSS v4 (`@tailwindcss/vite` plugin — no `tailwind.config.js`) · Motion (`motion/react`) · Lucide React

**`src/App.tsx` component order:**
- Shared animation variants (`fadeUp`, `staggerContainer`) at the top
- `Navbar` — fixed, transparent → opaque on scroll, mobile overlay
- `Hero` → `Intro` → `Difference` → `FeaturedIn` → `Stats` → `WhoWeServe` → `ServicesTransition` → `ServicesSlider` → `Comparison` → `Perspectives`
- `Footer`
- `App` (default export) — assembles everything

**Color system:** Black (`#000000`) / white (`#FFFFFF`) with Tailwind opacity modifiers (e.g. `text-[#FFFFFF]/70`). No theme customization — arbitrary values only.

**Static assets** in `public/image/`:
- `logo1.png` / `logo2.jpeg` — navbar logo (dark background)
- `stewardship-logo.png` — footer logo (white background)
- `favicon.png` — set in `index.html`

**Path alias:** `@` → project root.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Stewardship Advisory Website**

A high-end, modern multi-page website for Stewardship Advisory — an institutional communications and reputation advisory practice based in Africa. The site targets institutional leaders and corporate communications teams evaluating advisory partners, presenting the firm's services, framework, and values with authority and sophistication.

**Core Value:** Visitors must immediately understand what Stewardship Advisory does and be able to contact the firm through a working inquiry form — every other feature supports this path from understanding to engagement.

### Constraints

- **Tech stack**: React 19 + Vite + Tailwind CSS 4 + Motion — already in place, extend don't replace
- **Routing**: Client-side routing (React Router or similar) — no SSR needed
- **Form backend**: Needs working email delivery — Formspree, EmailJS, or similar service
- **No build-breaking changes**: Site must remain functional throughout refactoring
- **Brand assets**: Use existing logos and color palette, don't introduce new brand elements
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.8 - Full application codebase (`.tsx` and `.ts` files)
- CSS - Styling via Tailwind and theme configuration
- JavaScript - Build configuration and tooling
## Runtime
- Node.js (latest stable) - Required for development and build process
- npm 10+ - Dependency management
- Lockfile: `package-lock.json` present and maintained
## Frameworks
- React 19.0.0 - UI framework for component-based interface
- Vite 6.2.0 - Build tool and dev server
- Express 4.21.2 - Backend HTTP server framework
- Tailwind CSS 4.1.14 - Utility-first CSS framework
- Motion (Framer Motion compatible) 12.23.24 - Animation library
- Lucide React 0.546.0 - SVG icon library
- Not detected
- TypeScript Compiler - Type checking via `tsc --noEmit`
- tsx 4.21.0 - TypeScript executor for Node scripts
## Key Dependencies
- `@google/genai` 1.29.0 - Google Generative AI SDK integration
- `express` 4.21.2 - HTTP server for backend routes
- `react` 19.0.0 - UI rendering
- `react-dom` 19.0.0 - React DOM bindings
- `dotenv` 17.2.3 - Environment variable loading from `.env` files
- `@types/node` 22.14.0 - TypeScript definitions for Node.js APIs
- `@types/express` 4.17.21 - TypeScript definitions for Express
- `autoprefixer` 10.4.21 - PostCSS plugin for vendor prefixes
- `typescript` 5.8.2 - TypeScript compiler
## Configuration
- `.env.example` - Template for required environment variables
- `GEMINI_API_KEY` - Google Generative AI API key (injected by AI Studio)
- `APP_URL` - Base URL for hosted application (injected by AI Studio)
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `tsconfig.json` - TypeScript compiler options (ES2022 target, JSX support)
- Path alias: `@/*` resolves to root directory
- `src/index.css` - Global styles with Tailwind import and theme definitions
- Google Fonts integration for "Inter" and "Playfair Display"
## Platform Requirements
- Node.js 18+ (for ES2022 features)
- npm or equivalent package manager
- Optional: Code editor with TypeScript support
- Cloud Run deployment (AI Studio integration)
- Environment variables injected at runtime: `GEMINI_API_KEY`, `APP_URL`
- Vite build artifact (`dist/` directory)
- Frontend: `src/main.tsx` - React DOM mount point
- App component: `src/App.tsx` - Main React application
- Browser: `index.html` - HTML entry point
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React components: PascalCase (e.g., `App.tsx`, `Navbar.tsx`)
- Styles: camelCase with extension (e.g., `index.css`)
- Entry points: lowercase (e.g., `main.tsx`)
- React functional components: PascalCase (e.g., `const Navbar = () => { }`)
- Regular functions: camelCase (e.g., `handleScroll`, `handleNavClick`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleScroll`, `handleNavClick`)
- Animation objects: camelCase (e.g., `fadeUp`, `staggerContainer`)
- State variables: camelCase (e.g., `scrolled`, `mobileMenuOpen`, `openIndex`)
- Constants: camelCase (e.g., `navLinks`, `services`, `values`, `steps`)
- Object properties: camelCase (e.g., `href`, `label`, `title`, `description`)
- React hooks return types: Inline destructuring with camelCase
- Type unions: `number | null` (as seen in `setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>`)
## Code Style
- No official formatter configured (ESLint or Prettier not present in repo)
- Uses double quotes for strings: `"react"`, `"App.tsx"`
- Uses arrow functions for components: `const Navbar = () => { }`
- Component declarations at file scope, not nested
- TypeScript type checking: `tsc --noEmit` via `npm run lint`
- No ESLint or Prettier configuration files present
- tsconfig.json configured with strict module resolution and JSX support
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Path aliases: `@/*` maps to project root for relative imports
## Import Organization
- `@/*` resolves to project root, allowing imports like `@/src/App.tsx`
- AllowImportingTsExtensions enabled for TypeScript files
## Error Handling
- Optional chaining for DOM queries: `document.querySelector(href)?.scrollIntoView()`
- Null coalescing for element IDs: `document.getElementById('root')!` with non-null assertion
- No try-catch blocks present; relies on React error boundaries via StrictMode in `main.tsx`
- Event handlers check for element existence: `if (el) el.scrollIntoView(...)`
- Safe DOM selection: `const el = document.querySelector(href);` followed by existence check
- Direct body style manipulation with cleanup: Set style on mount, unset on cleanup in useEffect return
## Logging
- No logging infrastructure present in codebase
- Would use console methods if needed (not configured with middleware or wrappers)
## Comments
- Section headers use comment markers: `// --- Animation Variants ---`, `// --- Components ---`, `// --- Main App ---`
- Comments precede logical sections for organization
- Not used in current codebase
- No function or component documentation strings present
## Function Design
- Components are medium to large (100-300 lines), organized into logical sections
- Utility functions are small and focused (e.g., `handleNavClick`)
- Complex render logic extracted into descriptive component names
- Minimal parameters; components use closures to capture state
- Type annotations on event handlers: `onClick={() => handleNavClick(href)}`
- Event handlers receive string parameters: `handleNavClick(href: string)`
- Components return JSX fragments or single elements
- Utility functions return immediate values or void
- No explicit undefined returns; early exits via conditionals
## Module Design
- Single default export per file: `export default function App() { }`
- No named exports used in current structure
- All components defined in single file (`src/App.tsx`)
- Not used; components are co-located in `src/App.tsx`
## Component Patterns
- `useState` for local component state (e.g., `const [scrolled, setScrolled] = useState(false)`)
- `useEffect` for side effects with dependency arrays: `useEffect(() => { ... }, [dependencies])`
- Cleanup functions in useEffect returns: `return () => { ... }`
## Styling Approach
- Utilities applied directly to JSX elements: `className="..."`
- No CSS-in-JS library used
- Color system uses hex codes defined in theme: `#0A1628` (primary dark), `#0A1628/60` (with opacity)
- Responsive utilities: `md:` and `lg:` breakpoints
- Colors: `bg-white`, `text-white`, `bg-[#0A1628]`, color with opacity `text-white/70`
- Spacing: Uses standard Tailwind scale (`p-8`, `mb-16`, `gap-8`)
- Typography: Serif (`font-serif`) and sans (`font-sans`), weights from 300-600
## Data Structure Patterns
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- React 19 frontend with TypeScript for type safety
- Vite build tooling for fast development and optimized production builds
- Tailwind CSS + Motion animations for responsive, animated UI
- Monolithic single-file component structure (all components in `App.tsx`)
- No separate API backend — marketing website with static content
- Client-side rendering with smooth scroll navigation
- Motion-based animations for entrance and interaction effects
## Layers
- Purpose: Render UI components and handle user interactions
- Location: `src/App.tsx`, `src/main.tsx`
- Contains: React components (Navbar, Hero, About, Services, Framework, Values, CTA, Footer), animation variants, state management for interactive sections
- Depends on: React, motion/react, lucide-react for icons, Tailwind CSS for styling
- Used by: Browser via `src/main.tsx` entry point
- Purpose: Unified visual appearance, theming, responsive design
- Location: `src/index.css`
- Contains: Font definitions (Inter sans-serif, Playfair Display serif), Tailwind configuration, global styles
- Depends on: Tailwind CSS, Google Fonts
- Used by: All components via Tailwind utility classes
- Purpose: Configure development server, production builds, module resolution
- Location: `vite.config.ts`, `tsconfig.json`
- Contains: Vite configuration (React plugin, Tailwind plugin, environment variables, path aliases), TypeScript compiler options
- Depends on: Vite, React plugin, Tailwind Vite plugin, TypeScript
- Used by: npm scripts (dev, build, preview)
- Purpose: Store images, logos, and favicon
- Location: `public/image/`
- Contains: `favicon.png`, `logo1.png`, `logo2.jpeg`, `stewardship-logo.png`
- Used by: HTML and component image tags
- Purpose: Provide DOM root element for React and load main script
- Location: `index.html`
- Contains: Basic HTML structure with `<div id="root">` and module script reference
- Used by: Browser when loading the application
## Data Flow
- Local component state: `useState` hooks in Navbar (scrolled, mobileMenuOpen), Services (openIndex)
- No global state management (Redux, Zustand, etc.)
- Animations controlled by Motion's `initial`, `animate`, `whileInView` variants
## Key Abstractions
- Purpose: Reusable animation definitions for consistent motion across components
- Examples: `fadeUp` (opacity + Y-axis), `staggerContainer` (staggered child animations)
- Pattern: Motion variant objects with `hidden` and `visible` states, defined in `src/App.tsx`
- Purpose: Logical groupings of UI representing different page sections
- Examples: `Navbar`, `Hero`, `About`, `Services`, `Framework`, `Values`, `CTA`, `Footer`
- Pattern: Functional React components returning JSX with motion wrappers, self-contained state and data
- Purpose: Expandable/collapsible service details
- Implementation: `openIndex` state in Services component controls which item renders expanded
- Pattern: onClick toggles `openIndex`, conditional CSS classes control max-height and opacity for smooth transitions
- Purpose: Centralize navigation links for reuse across Navbar and mobile menu
- Pattern: Array of objects (label, href) within Navbar component
- Purpose: Define service offerings with expandable details
- Pattern: Array of objects with title and items array in Services component
- Purpose: Define I-TRUST framework model steps with descriptions
- Pattern: Array of objects with letter, title, description, detail, isOutcome flag in Framework component
- Purpose: Define core organizational values with icons
- Pattern: Array of objects with icon component, title, description in Values component
## Entry Points
- Location: `index.html`
- Triggers: User navigates to application URL
- Responsibilities: Provides root DOM element, loads main React script
- Location: `src/main.tsx`
- Triggers: Script loaded from index.html
- Responsibilities: Creates React root, mounts App component, enables StrictMode for development checks
- Location: `src/App.tsx` (default export function App)
- Triggers: Rendered by React in main.tsx
- Responsibilities: Orchestrates all page sections, manages global layout structure
## Error Handling
- Relies on browser default error handling
- No try-catch blocks or error boundaries
- Assumes all external resources (fonts, images, APIs) load successfully
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
