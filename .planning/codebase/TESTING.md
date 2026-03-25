# Testing Patterns

**Analysis Date:** 2026-03-25

## Test Framework

**Runner:**
- Not configured
- No test framework dependencies in `package.json`
- No `jest.config.*`, `vitest.config.*`, or similar configuration files

**Assertion Library:**
- Not configured

**Run Commands:**
- No test commands configured in `package.json`
- Available commands:
  ```bash
  npm run dev       # Run development server (port 3000)
  npm run build     # Build for production
  npm run preview   # Preview production build
  npm run clean     # Remove dist directory
  npm run lint      # Type checking with tsc --noEmit
  ```

## Test File Organization

**Location:**
- No test files present in codebase
- Standard location would be `src/**/*.test.ts` or `src/**/*.spec.ts` (not yet implemented)

**Naming:**
- Not applicable (no tests exist)

**Structure:**
- Not applicable (no tests exist)

## Test Coverage

**Requirements:**
- Not enforced
- No coverage reporting tools configured

**View Coverage:**
- Not applicable (no testing infrastructure)

## Testing Infrastructure Status

**What's Not Configured:**
- No Jest, Vitest, Mocha, or other test runners
- No assertion libraries (Chai, Jest matchers, etc.)
- No test utilities or testing libraries for React components
- No code coverage tools
- No E2E testing frameworks

**Linting/Type Checking:**
- TypeScript type checking is the only validation tool: `npm run lint`
- Runs `tsc --noEmit` to check types without emitting code
- This serves as a form of static analysis but is not a runtime test

## Recommended Testing Approach

**For This Codebase:**

**Unit Testing Framework:**
- Consider Vitest: Fast, ESM-native, requires less configuration
- Or Jest with React preset for broader ecosystem compatibility

**React Component Testing:**
- Use React Testing Library for component behavior tests
- Test user interactions (clicks, scrolls) rather than implementation
- Example structure for `Navbar.test.tsx`:
  ```typescript
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { Navbar } from './App';

  describe('Navbar', () => {
    it('should toggle mobile menu on button click', async () => {
      render(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle Menu');
      await userEvent.click(menuButton);
      expect(document.body).toHaveStyle('overflow: hidden');
    });
  });
  ```

**Animation Testing:**
- Motion library integrates with testing libraries
- Test animation triggers, not duration or exact values
- Mock animation completion for faster tests

## Current Development Quality

**Type Safety:**
- TypeScript provides compile-time type checking
- `tsc --noEmit` validates all types before runtime
- React.StrictMode enabled in `src/main.tsx` for additional development warnings

**Manual Testing Approach:**
- Visual browser testing via `npm run dev`
- HMR (Hot Module Reload) enabled for immediate feedback
- DISABLE_HMR environment variable available for AI Studio environments

## Test Configuration Gaps

**Missing Test Infrastructure:**
1. No test runner configured
2. No DOM testing utilities
3. No mock/stub tools
4. No test data factories or fixtures
5. No integration test setup
6. No E2E test framework

**Setup Steps for Adding Tests:**

1. Install testing dependencies:
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```

2. Create `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';
   import path from 'path';

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, '.'),
       },
     },
   });
   ```

3. Add test script to `package.json`:
   ```json
   "test": "vitest",
   "test:ui": "vitest --ui",
   "test:coverage": "vitest --coverage"
   ```

4. Create test file alongside component:
   - `src/App.test.tsx` for App component tests
   - Separate concerns: unit tests for logic, integration tests for component interactions

## Testing Patterns (Once Implemented)

**Recommended Pattern for Components:**
```typescript
// src/App.test.tsx
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders navbar', () => {
    render(<App />);
    expect(screen.getByAltText('Stewardship Advisory')).toBeInTheDocument();
  });

  it('scrolls to section on nav click', async () => {
    render(<App />);
    const aboutLink = screen.getByRole('button', { name: 'About' });
    await userEvent.click(aboutLink);
    // Verify scroll behavior or section visibility
  });
});
```

**Mocking Pattern:**
- Mock Motion library animations for deterministic tests
- Mock browser scroll events for scroll handler tests
- Do NOT mock Lucide React icons - test them as-is

**What to Mock:**
- Window/document APIs (scroll events, querySelector)
- External API calls (not present in current codebase)
- Timers (for animation testing)

**What NOT to Mock:**
- React components (test real component tree)
- Tailwind CSS classes (test rendered DOM, not styles)
- Icon libraries (use rendered components directly)

---

*Testing analysis: 2026-03-25*
