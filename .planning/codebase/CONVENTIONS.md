# Coding Conventions

**Analysis Date:** 2026-03-25

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `App.tsx`, `Navbar.tsx`)
- Styles: camelCase with extension (e.g., `index.css`)
- Entry points: lowercase (e.g., `main.tsx`)

**Functions:**
- React functional components: PascalCase (e.g., `const Navbar = () => { }`)
- Regular functions: camelCase (e.g., `handleScroll`, `handleNavClick`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleScroll`, `handleNavClick`)
- Animation objects: camelCase (e.g., `fadeUp`, `staggerContainer`)

**Variables:**
- State variables: camelCase (e.g., `scrolled`, `mobileMenuOpen`, `openIndex`)
- Constants: camelCase (e.g., `navLinks`, `services`, `values`, `steps`)
- Object properties: camelCase (e.g., `href`, `label`, `title`, `description`)

**Types:**
- React hooks return types: Inline destructuring with camelCase
- Type unions: `number | null` (as seen in `setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>`)

## Code Style

**Formatting:**
- No official formatter configured (ESLint or Prettier not present in repo)
- Uses double quotes for strings: `"react"`, `"App.tsx"`
- Uses arrow functions for components: `const Navbar = () => { }`
- Component declarations at file scope, not nested

**Linting:**
- TypeScript type checking: `tsc --noEmit` via `npm run lint`
- No ESLint or Prettier configuration files present
- tsconfig.json configured with strict module resolution and JSX support

**TypeScript Configuration:**
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Path aliases: `@/*` maps to project root for relative imports

## Import Organization

**Order:**
1. React and external libraries (e.g., `import React, { useState, useEffect } from "react"`)
2. Icon libraries (e.g., `from "lucide-react"`)
3. Animation libraries (e.g., `from "motion/react"`)
4. Local imports (not used in current codebase)

**Path Aliases:**
- `@/*` resolves to project root, allowing imports like `@/src/App.tsx`
- AllowImportingTsExtensions enabled for TypeScript files

**Example from `src/App.tsx`:**
```typescript
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Plus,
  Minus,
  Shield,
  Eye,
  Users,
  Lightbulb,
  Anchor,
  Heart,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
```

## Error Handling

**Patterns:**
- Optional chaining for DOM queries: `document.querySelector(href)?.scrollIntoView()`
- Null coalescing for element IDs: `document.getElementById('root')!` with non-null assertion
- No try-catch blocks present; relies on React error boundaries via StrictMode in `main.tsx`
- Event handlers check for element existence: `if (el) el.scrollIntoView(...)`

**DOM Interactions:**
- Safe DOM selection: `const el = document.querySelector(href);` followed by existence check
- Direct body style manipulation with cleanup: Set style on mount, unset on cleanup in useEffect return

## Logging

**Framework:** `console` (not configured, no explicit logging calls visible)

**Patterns:**
- No logging infrastructure present in codebase
- Would use console methods if needed (not configured with middleware or wrappers)

## Comments

**When to Comment:**
- Section headers use comment markers: `// --- Animation Variants ---`, `// --- Components ---`, `// --- Main App ---`
- Comments precede logical sections for organization

**JSDoc/TSDoc:**
- Not used in current codebase
- No function or component documentation strings present

## Function Design

**Size:**
- Components are medium to large (100-300 lines), organized into logical sections
- Utility functions are small and focused (e.g., `handleNavClick`)
- Complex render logic extracted into descriptive component names

**Parameters:**
- Minimal parameters; components use closures to capture state
- Type annotations on event handlers: `onClick={() => handleNavClick(href)}`
- Event handlers receive string parameters: `handleNavClick(href: string)`

**Return Values:**
- Components return JSX fragments or single elements
- Utility functions return immediate values or void
- No explicit undefined returns; early exits via conditionals

## Module Design

**Exports:**
- Single default export per file: `export default function App() { }`
- No named exports used in current structure
- All components defined in single file (`src/App.tsx`)

**Barrel Files:**
- Not used; components are co-located in `src/App.tsx`

## Component Patterns

**React Hooks Usage:**
- `useState` for local component state (e.g., `const [scrolled, setScrolled] = useState(false)`)
- `useEffect` for side effects with dependency arrays: `useEffect(() => { ... }, [dependencies])`
- Cleanup functions in useEffect returns: `return () => { ... }`

**Event Handler Patterns:**
```typescript
// onClick handlers
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
onClick={() => handleNavClick(href)}
onClick={() => setOpenIndex(openIndex === i ? null : i)}
```

**Conditional Rendering:**
```typescript
// Ternary for simple conditions
{mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}

// Short-circuit evaluation
{step.isOutcome && <OutcomeLabel />}

// Conditional class names
className={`text-xl md:text-2xl font-serif transition-colors ${openIndex === i ? "text-[#0A1628]" : "text-[#0A1628]/60 group-hover:text-[#0A1628]"}`}
```

## Styling Approach

**Tailwind CSS:**
- Utilities applied directly to JSX elements: `className="..."`
- No CSS-in-JS library used
- Color system uses hex codes defined in theme: `#0A1628` (primary dark), `#0A1628/60` (with opacity)
- Responsive utilities: `md:` and `lg:` breakpoints

**Design Tokens:**
- Colors: `bg-white`, `text-white`, `bg-[#0A1628]`, color with opacity `text-white/70`
- Spacing: Uses standard Tailwind scale (`p-8`, `mb-16`, `gap-8`)
- Typography: Serif (`font-serif`) and sans (`font-sans`), weights from 300-600

## Data Structure Patterns

**Arrays of Objects:**
```typescript
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

const services = [
  {
    title: "Leadership Communication",
    items: ["item1", "item2", "item3"],
  },
];
```

**Mapping Over Data:**
```typescript
{navLinks.map((link) => (
  <button key={link.href} onClick={() => handleNavClick(link.href)}>
    {link.label}
  </button>
))}
```

---

*Convention analysis: 2026-03-25*
