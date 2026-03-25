# External Integrations

**Analysis Date:** 2026-03-25

## APIs & External Services

**Google AI:**
- Google Generative AI (Gemini) - Powers AI-assisted features
  - SDK/Client: `@google/genai` 1.29.0
  - Auth: Environment variable `GEMINI_API_KEY`
  - Purpose: Likely used for content generation or analysis features (setup configured but not active in current component tree)

**Typography & Fonts:**
- Google Fonts - Web font delivery
  - Service: googleapis.com
  - Fonts loaded: "Inter" (weights 300-600), "Playfair Display" (weights 400-600, italic variants)
  - Location: `src/index.css` via `@import` from googleapis.com

## Data Storage

**Databases:**
- Not detected - Application is static/frontend-only

**File Storage:**
- Local filesystem only - Static assets in `public/image/` directory
  - Favicon, logo, branding images served from `/image/` path

**Caching:**
- Not explicitly configured - Relies on browser default caching

## Authentication & Identity

**Auth Provider:**
- None detected - Application is unauthenticated

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Not explicitly configured - Standard browser console logging

## CI/CD & Deployment

**Hosting:**
- Google Cloud Run - AI Studio deployment platform
  - Automatic injection of runtime environment variables
  - Service URL available via `APP_URL` environment variable

**CI Pipeline:**
- Not detected in codebase - Managed by AI Studio platform

**Build Output:**
- Vite production build to `dist/` directory
- Build command: `npm run build`
- Preview command: `npm run preview`

## Environment Configuration

**Required env vars:**
- `GEMINI_API_KEY` - Google Generative AI API key for Gemini SDK
  - Defined in: `vite.config.ts` via `process.env.GEMINI_API_KEY`
  - Injected by AI Studio from user secrets panel

**Optional env vars:**
- `APP_URL` - Base URL of hosted application
  - Used for self-referential links and API callbacks
  - Injected by AI Studio with Cloud Run service URL

**Development:**
- `.env.local` - Local environment file for development
- `.env.example` - Template showing available configuration options

**Secrets location:**
- AI Studio Secrets panel - User manages secrets in cloud dashboard
- Runtime injection - Secrets injected at application startup

## Webhooks & Callbacks

**Incoming:**
- Not detected

**Outgoing:**
- `mailto:info@stewardship-advisory.com` - Email contact endpoint in CTA section
  - Used for "Start a Conversation" button and footer contact link
  - Not an API webhook, but user-initiated email contact

## Configuration Details

**Vite Environment Loading:**
- Location: `vite.config.ts`
- Approach: `loadEnv()` function loads variables based on `mode`
- `GEMINI_API_KEY` explicitly passed to frontend via `define` option for build-time injection

**Module Type:**
- `"type": "module"` in `package.json` - ES modules enabled

---

*Integration audit: 2026-03-25*
