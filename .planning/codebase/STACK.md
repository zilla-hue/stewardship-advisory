# Technology Stack

**Analysis Date:** 2026-03-25

## Languages

**Primary:**
- TypeScript 5.8 - Full application codebase (`.tsx` and `.ts` files)
- CSS - Styling via Tailwind and theme configuration

**Secondary:**
- JavaScript - Build configuration and tooling

## Runtime

**Environment:**
- Node.js (latest stable) - Required for development and build process

**Package Manager:**
- npm 10+ - Dependency management
- Lockfile: `package-lock.json` present and maintained

## Frameworks

**Core:**
- React 19.0.0 - UI framework for component-based interface
- Vite 6.2.0 - Build tool and dev server
  - React plugin: `@vitejs/plugin-react` 5.0.4
  - Tailwind plugin: `@tailwindcss/vite` 4.1.14
- Express 4.21.2 - Backend HTTP server framework

**UI & Animation:**
- Tailwind CSS 4.1.14 - Utility-first CSS framework
- Motion (Framer Motion compatible) 12.23.24 - Animation library
- Lucide React 0.546.0 - SVG icon library

**Testing:**
- Not detected

**Build/Dev:**
- TypeScript Compiler - Type checking via `tsc --noEmit`
- tsx 4.21.0 - TypeScript executor for Node scripts

## Key Dependencies

**Critical:**
- `@google/genai` 1.29.0 - Google Generative AI SDK integration
  - Provides client for Gemini API calls
  - Environment variable: `GEMINI_API_KEY`
- `express` 4.21.2 - HTTP server for backend routes
- `react` 19.0.0 - UI rendering
- `react-dom` 19.0.0 - React DOM bindings

**Infrastructure:**
- `dotenv` 17.2.3 - Environment variable loading from `.env` files
- `@types/node` 22.14.0 - TypeScript definitions for Node.js APIs
- `@types/express` 4.17.21 - TypeScript definitions for Express

**Development:**
- `autoprefixer` 10.4.21 - PostCSS plugin for vendor prefixes
- `typescript` 5.8.2 - TypeScript compiler

## Configuration

**Environment:**
- `.env.example` - Template for required environment variables
- `GEMINI_API_KEY` - Google Generative AI API key (injected by AI Studio)
- `APP_URL` - Base URL for hosted application (injected by AI Studio)

**Build:**
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `tsconfig.json` - TypeScript compiler options (ES2022 target, JSX support)
- Path alias: `@/*` resolves to root directory

**CSS:**
- `src/index.css` - Global styles with Tailwind import and theme definitions
- Google Fonts integration for "Inter" and "Playfair Display"

## Platform Requirements

**Development:**
- Node.js 18+ (for ES2022 features)
- npm or equivalent package manager
- Optional: Code editor with TypeScript support

**Production:**
- Cloud Run deployment (AI Studio integration)
- Environment variables injected at runtime: `GEMINI_API_KEY`, `APP_URL`
- Vite build artifact (`dist/` directory)

**Entry Points:**
- Frontend: `src/main.tsx` - React DOM mount point
- App component: `src/App.tsx` - Main React application
- Browser: `index.html` - HTML entry point

---

*Stack analysis: 2026-03-25*
