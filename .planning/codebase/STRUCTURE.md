# Codebase Structure

**Analysis Date:** 2026-03-25

## Directory Layout

```
stewardship-advisory/
├── src/                    # Source code
│   ├── App.tsx            # Main application component with all sections
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles and font definitions
├── public/                # Static assets
│   └── image/             # Image files (logos, favicon)
├── dist/                  # Production build output (generated)
├── node_modules/          # Dependencies (generated)
├── index.html             # HTML entry point
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript compiler configuration
├── package.json           # Project metadata and scripts
├── package-lock.json      # Dependency lock file (generated)
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## Directory Purposes

**src/**
- Purpose: All TypeScript and React source code
- Contains: React components, styles, entry point
- Key files: `App.tsx` (all UI components), `main.tsx` (React bootstrap), `index.css` (global styles)

**public/image/**
- Purpose: Static image assets served directly
- Contains: Brand logos, favicon
- Key files: `logo2.jpeg` (navbar/footer logo), `stewardship-logo.png` (hero section), `favicon.png` (browser tab icon)

**dist/**
- Purpose: Production-ready compiled output
- Contains: Bundled JavaScript, CSS, static assets
- Generated: Yes (via `npm run build`)
- Committed: No (in .gitignore)

**node_modules/**
- Purpose: Installed npm dependencies
- Generated: Yes (via `npm install`)
- Committed: No (in .gitignore)

## Key File Locations

**Entry Points:**
- `index.html`: Initial HTML document loaded by browser; contains root div and script tag
- `src/main.tsx`: React entry point; creates root and mounts App component
- `src/App.tsx`: Main application component; renders all page sections

**Configuration:**
- `vite.config.ts`: Build tool configuration; defines plugins, aliases, environment variable handling
- `tsconfig.json`: TypeScript compiler options; target ES2022, JSX react-jsx, path aliases
- `package.json`: Project metadata, scripts, dependencies; defines npm run commands (dev, build, preview, lint)
- `.env.example`: Documentation of required environment variables (GEMINI_API_KEY, APP_URL)

**Core Logic:**
- `src/App.tsx`: Contains all business logic — component definitions, state management, animation variants, data structures for services/framework/values
- `src/index.css`: Styling logic via Tailwind; font definitions; smooth scroll behavior

**Styling:**
- `src/index.css`: Global styles, font imports (Inter, Playfair Display), Tailwind directives

## Naming Conventions

**Files:**
- React components: PascalCase (`App.tsx`, `main.tsx`)
- CSS: kebab-case (`index.css`)
- Config files: descriptive lowercase with dots (`vite.config.ts`, `tsconfig.json`)

**Directories:**
- src/: lowercase
- public/: lowercase
- image/: lowercase subdirectory within public

**Components (within App.tsx):**
- PascalCase: Navbar, Hero, About, VisionMission, Services, Framework, Values, CTA, Footer
- All components are functions with const declaration pattern

**Functions:**
- camelCase: handleScroll, handleNavClick, createRoot
- State setter functions: setScrolled, setMobileMenuOpen, setOpenIndex (conventional React naming)

**Variables:**
- camelCase: scrolled, mobileMenuOpen, openIndex, navLinks, services, steps, values
- CSS class strings: kebab-case with Tailwind utilities (bg-white, text-[#0A1628], etc.)

**Types:**
- inline: used where needed (e.g., `const [openIndex, setOpenIndex] = useState<number | null>(0)`)
- no separate type definitions file

## Where to Add New Code

**New Feature (Component Section):**
- Implementation: Add new component function in `src/App.tsx` following existing pattern (accept no props, return JSX with motion wrapper)
- Add export in App function's return JSX in correct order
- Location: Insert between existing components in App.tsx (maintain logical flow)
- Styling: Use Tailwind utility classes inline; follow existing color scheme (#0A1628 dark, white, #0A1628/60 for gray text)
- Animations: Define motion variants at top of file if reusable, use motion.div/motion.h2 etc. wrappers

**New Animation Variant:**
- Location: Top of `src/App.tsx` with other variant definitions (fadeUp, staggerContainer)
- Pattern: Object with hidden and visible states, include transition configuration

**New Navigation Link or Data:**
- Services: Edit services array in Services component
- Framework steps: Edit steps array in Framework component
- Values: Edit values array in Values component
- Navigation: Edit navLinks array in Navbar component

**New Static Asset:**
- Location: `public/image/` directory
- Usage: Reference via `/image/filename` in img src attributes

**Global Style Addition:**
- Location: `src/index.css`
- Pattern: Use Tailwind @apply or direct CSS; import new fonts if needed

**Configuration Changes:**
- Environment variables: Update `.env.example` and reference via `process.env.VARIABLE_NAME` or Vite's import.meta.env
- Vite config: Edit `vite.config.ts` for plugin, alias, or server changes
- TypeScript config: Edit `tsconfig.json` for compiler options

**New Utility or Helper Function:**
- Location: Define at top of `src/App.tsx` before components (near animation variants) or as separate component if complex logic
- Pattern: Functional approach, use TypeScript types

## Special Directories

**dist/**
- Purpose: Build artifacts for production deployment
- Generated: Yes — created by `vite build` command
- Committed: No — excluded via .gitignore; regenerated on deploy

**public/**
- Purpose: Static files served as-is (not processed by build tool)
- Committed: Yes — images are committed to repository
- Usage: Absolute paths in HTML/JSX (e.g., `/image/logo2.jpeg`)

**.planning/**
- Purpose: GSD (Get Stuff Done) planning documents
- Contains: Architecture analysis documents
- Committed: Yes

## Build & Deployment Workflow

**Development:**
```bash
npm run dev          # Start Vite dev server on :3000
```
- Watches src/ files for changes
- Hot Module Reloading (HMR) disabled if DISABLE_HMR=true
- Rebuilds and reloads in browser

**Production Build:**
```bash
npm run build        # Compile and bundle to dist/
npm run preview      # Test production build locally
npm run clean        # Remove dist/ directory
```

**Linting:**
```bash
npm run lint         # Run TypeScript compiler check (no emit)
```

**Environment Configuration:**
- GEMINI_API_KEY: API key for Google Gemini; loaded via Vite's loadEnv and injected into bundle
- APP_URL: Application URL; injected at runtime via AI Studio
- Files: `.env.local` (local development), `.env.example` (documentation)
