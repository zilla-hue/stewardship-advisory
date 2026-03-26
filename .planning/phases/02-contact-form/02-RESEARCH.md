# Phase 2: Contact Form - Research

**Researched:** 2026-03-26
**Domain:** React form submission with Formspree, client-side validation, loading/success/error UI states
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Contact form with name, email, organization, inquiry topic, and message fields | useForm hook + controlled inputs in ContactPage.tsx |
| CONT-02 | Form validation: required fields + email format, inline errors before sending | Client-side guard before submit + ValidationError component for server-side errors |
| CONT-03 | Form submits to Formspree and delivers email to the firm | @formspree/react useForm("FORM_ID") — POST to https://formspree.io/f/{ID} |
| CONT-04 | Loading indicator while submitting, success confirmation, clear error on service failure | state.submitting / state.succeeded / state.errors from useForm return tuple |
</phase_requirements>

---

## Summary

Phase 2 adds a working inquiry form to the existing `ContactPage.tsx` shell. The form must collect five fields (name, email, organization, inquiry topic, message), validate them client-side before submitting, POST to Formspree for email delivery, and display loading/success/error states throughout the lifecycle.

The locked decision from Phase 1 planning is **Formspree** for the form backend (EmailJS was rejected because it exposes API keys in the browser bundle). Formspree's `@formspree/react` library provides a `useForm` hook that handles all submission mechanics, state management, and field-level error reporting. No custom fetch logic is needed.

The one human prerequisite blocking finalization: the Formspree form endpoint ID, which requires creating a free account and registering a form at formspree.io. This yields a short hash ID (e.g., `xpwrggkj`) that becomes the argument to `useForm()`. The placeholder `"YOUR_FORM_ID"` must be replaced before the form can deliver mail end-to-end.

**Primary recommendation:** Install `@formspree/react@3.0.0`, build a `ContactForm` component inside `ContactPage.tsx` using `useForm`, implement client-side required-field and email-format validation before calling the submit handler, and render state-conditional UI (loading spinner, success block, error message) based on the hook's returned state object.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@formspree/react` | 3.0.0 | `useForm` hook for Formspree submission + `ValidationError` component | Official Formspree React client; handles CORS, session, error normalization; no API key exposure |
| `@formspree/core` | 4.0.0 | Peer dep pulled in automatically with `@formspree/react` | Internal HTTP transport layer |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lucide-react` | 0.546.0 (already installed) | Loading spinner / status icons | Use `Loader2` with `animate-spin` for submission loading indicator |
| `motion/react` | 12.23.24 (already installed) | Animate success/error state transitions | Wrap state-conditional blocks in `motion.div` with `fadeUp` variant |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@formspree/react` | Raw `fetch` to `https://formspree.io/f/{ID}` | Works, but you hand-roll state management, error parsing, and session headers. Not worth it when the library is 18 kB and handles all edge cases. |
| `@formspree/react` | EmailJS | Rejected (STATE.md) — exposes API key in browser bundle |
| Client-side-only validation | `react-hook-form` | Overkill for 5 fields; adds 25 kB. Native controlled-input validation fits within the project's component pattern. |

**Installation:**
```bash
npm install @formspree/react
```

**Version verification:** Confirmed `@formspree/react@3.0.0` published 2025-03-17 on npm registry. Peer dependencies: `react ^16.8 || ^17.0 || ^18.0 || ^19.0` — compatible with the project's React 19.0.0.

---

## Architecture Patterns

### Recommended Project Structure

The form lives entirely within `ContactPage.tsx` — Phase 1 established that page components compose content directly. There is no need for a separate `src/components/ContactForm.tsx` file unless the component exceeds ~150 lines, at which point extraction is the clean call.

```
src/
├── pages/
│   └── ContactPage.tsx    # Add useForm, ContactForm JSX, and state UI here
└── lib/
    └── animations.ts      # Already has fadeUp, staggerContainer — reuse as-is
```

### Pattern 1: useForm Hook

**What:** `@formspree/react` exports `useForm(formId)` which returns a 3-tuple: `[state, handleSubmit, reset]`.

**State shape (verified from source dist):**
```typescript
state.submitting  // boolean — true while POST is in flight
state.succeeded   // boolean — true after successful delivery
state.errors      // SubmissionError | null — server-side field and form errors
```

**When to use:** Always. The hook owns all submission lifecycle; components only drive the form's display.

**Example (verified from @formspree/react dist/index.js source):**
```typescript
// Source: @formspree/react@3.0.0 dist/index.js (extracted 2026-03-26)
import { useForm, ValidationError } from "@formspree/react";

const [state, handleSubmit] = useForm("YOUR_FORM_ID");

// state.submitting — show spinner
// state.succeeded — show thank-you message
// state.errors    — ValidationError uses this for field-level feedback
```

The `handleSubmit` function accepts a React `FormEvent<HTMLFormElement>` directly as `onSubmit`. It calls `event.preventDefault()` internally.

### Pattern 2: Client-Side Validation Guard

**What:** Because Formspree's server-side errors are returned async, add a synchronous validation pass before calling `handleSubmit`. This is the pattern for CONT-02's "inline validation errors before sending" requirement — server errors appear after the round trip, client-side errors appear immediately.

**When to use:** Required fields check and email regex run on submit click, before the Formspree call.

**Example:**
```typescript
// Source: Standard React pattern, aligned with project's error handling conventions
const [errors, setErrors] = useState<Record<string, string>>({});

const validateAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newErrors: Record<string, string> = {};
  if (!name.trim()) newErrors.name = "Name is required";
  if (!email.trim()) newErrors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    newErrors.email = "Please enter a valid email address";
  if (!message.trim()) newErrors.message = "Message is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  setErrors({});
  handleSubmit(e);  // delegate to Formspree
};
```

### Pattern 3: Three-State UI (Loading / Success / Error)

**What:** Conditional rendering based on `state.submitting`, `state.succeeded`, and `state.errors`.

**When to use:** Required by CONT-04.

**Example:**
```typescript
// Source: Standard Formspree pattern, confirmed against source test file
if (state.succeeded) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      <p>Thank you — your message has been received.</p>
    </motion.div>
  );
}

// Inside the form:
<button type="submit" disabled={state.submitting}>
  {state.submitting ? (
    <Loader2 className="w-5 h-5 animate-spin" />
  ) : (
    "Send Message"
  )}
</button>

// Service-level error (non-field Formspree error):
<ValidationError errors={state.errors} className="text-red-500 text-sm" />
```

### Pattern 4: Field-Level Server Error Display

**What:** `ValidationError` component filters `state.errors` by field name to show field-specific messages after a server-side rejection.

**Example:**
```typescript
// Source: @formspree/react@3.0.0 dist/index.js ValidationError component
<ValidationError
  field="email"
  errors={state.errors}
  className="text-red-500 text-sm mt-1"
/>
```

When no `field` prop is passed, `ValidationError` renders form-level errors (e.g., "FORM_NOT_FOUND", "INACTIVE").

### Anti-Patterns to Avoid

- **Nesting `handleSubmit` in a wrapper that calls `preventDefault` twice:** `useForm`'s submit handler calls `event.preventDefault()` internally. If you call it again in a wrapper, there is no double-trigger issue, but the pattern above (passing `e` to `handleSubmit` after manual validation) works correctly.
- **Using `whileInView` on the success or error state blocks:** These blocks mount above the fold on the Contact page. Phase 1 established that `animate="visible"` (mount-triggered) is the correct pattern for this page — confirmed in the SUMMARY.md `key-decisions`.
- **Storing the form ID in a `.env` variable:** The Formspree form ID is not a secret — it's the same as the public endpoint URL visible in the browser's network tab. Hardcoding it in the component is conventional and correct.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTTP POST to Formspree with CORS headers | Custom `fetch` with manual headers | `@formspree/react useForm` | Formspree requires `Accept: application/json` and session headers; the library handles this internally |
| Error normalization (field vs form errors) | Custom error parsing of Formspree JSON | `ValidationError` component + `state.errors` SubmissionError methods | `.getFieldErrors(field)` and `.getFormErrors()` handle the error taxonomy correctly |
| Submission state machine | `isLoading / isSuccess / isError` useState | `state.submitting / state.succeeded / state.errors` from hook | The hook owns the state machine — duplicating it creates race conditions |
| Email regex validation | Custom pattern | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` regex with standard `input type="email"` as secondary | Standard regex is sufficient; `type="email"` provides browser-level validation as a fallback |

**Key insight:** The Formspree library is a thin, focused wrapper around a single HTTP interaction. The only custom code needed is: (a) the controlled input state, (b) the client-side validation guard, and (c) the conditional rendering for three states.

---

## Common Pitfalls

### Pitfall 1: Missing Formspree endpoint ID at development time

**What goes wrong:** `useForm("YOUR_FORM_ID")` throws `"You must provide a form key or hashid"` and the component crashes.
**Why it happens:** The hook validates the form ID argument and throws synchronously if it's falsy.
**How to avoid:** Use a placeholder string that is at least non-empty (e.g., `"placeholder"`) during development so the component renders. The form will get a 404 response from Formspree, which surfaces as `state.errors` — the component stays functional. Replace with the real ID before end-to-end testing.
**Warning signs:** Console error: `"You must provide a form key or hashid"` — component is fully broken, not just failing silently.

### Pitfall 2: Success state not rendering because it uses whileInView

**What goes wrong:** After a successful submission, the component replaces the form with a success message — but if `whileInView` is used, the message may never animate in because the scroll trigger never fires on a short page.
**Why it happens:** Contact page is short; the success block mounts at the top of the viewport. `whileInView` checks visibility at mount time only if the element is already in view when using `once: true`.
**How to avoid:** Use `animate="visible"` (mount-triggered) for the success/error blocks, matching the established pattern from Phase 1 SUMMARY.md.
**Warning signs:** Success message appears invisible or stuck in `opacity: 0` after submission.

### Pitfall 3: Form re-enables after successful submission

**What goes wrong:** User can re-submit the form after it has already succeeded, sending duplicate messages.
**Why it happens:** The form is still mounted and `state.submitting` returns to `false` after the POST completes.
**How to avoid:** Conditionally render the success UI *instead of* the form when `state.succeeded` is `true`. Replace the entire form element with the thank-you block.
**Warning signs:** Form is still visible and interactive after the success banner appears.

### Pitfall 4: Client-side validation errors not cleared on re-submit after correction

**What goes wrong:** User sees stale inline errors even after fixing the fields.
**Why it happens:** Local `errors` state is only reset in `validateAndSubmit` when validation passes. If you reset on input change, errors flicker on every keystroke.
**How to avoid:** Clear errors for a specific field `onBlur` (when the user leaves the field), not `onChange`. Or clear all errors at the top of `validateAndSubmit` before running the new pass.
**Warning signs:** Error messages persist after the user corrects the input and re-submits.

### Pitfall 5: Tailwind dark background vs white form background mismatch

**What goes wrong:** Input fields appear invisible — white text on white background, or dark text on dark background.
**Why it happens:** `body` in `index.css` has `background-color: #0A1628` and `color: #ffffff`. `ContactPage.tsx` overrides to `bg-white text-[#0A1628]` at the section level. Input fields inherit from the nearest ancestor, but browser default `input` appearance may not inherit `color` correctly.
**How to avoid:** Explicitly set `text-[#0A1628] bg-white border border-[#0A1628]/20` on every `<input>` and `<textarea>`. Do not rely on inheritance.
**Warning signs:** Input fields show white-on-white text at runtime even though the section background is correct.

---

## Code Examples

Verified patterns from source inspection and project conventions:

### Full ContactForm Pattern (within ContactPage.tsx)

```typescript
// Source: @formspree/react@3.0.0 (source-verified 2026-03-26) + project conventions
import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/animations";

const INQUIRY_TOPICS = [
  "Institutional Communications Strategy",
  "Reputation Advisory",
  "Stakeholder Engagement",
  "Crisis Communications",
  "I-TRUST Framework",
  "General Inquiry",
];

const ContactPage = () => {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const validateAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address";
    if (!message.trim()) errs.message = "Message is required";
    if (Object.keys(errs).length > 0) { setClientErrors(errs); return; }
    setClientErrors({});
    handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <section className="bg-white text-[#0A1628] py-24 md:py-32 min-h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-serif mb-6">
            Message received
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#0A1628]/70 font-light">
            Thank you for reaching out. We will be in touch shortly.
          </motion.p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-white text-[#0A1628] py-24 md:py-32 min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* ... heading / intro from existing ContactPage shell ... */}
        <motion.form
          variants={fadeUp}
          onSubmit={validateAndSubmit}
          noValidate
          className="max-w-2xl space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            />
            {clientErrors.name && (
              <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            />
            {clientErrors.email && (
              <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>
            )}
            <ValidationError field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>

          {/* Organization */}
          <div>
            <label htmlFor="organization" className="block text-sm font-medium mb-1">
              Organisation
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            />
          </div>

          {/* Inquiry Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-1">
              Inquiry Topic
            </label>
            <select
              id="topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628]"
            >
              <option value="">Select a topic</option>
              {INQUIRY_TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#0A1628]/20 rounded px-4 py-3 text-[#0A1628] bg-white focus:outline-none focus:border-[#0A1628] resize-none"
            />
            {clientErrors.message && (
              <p className="text-red-500 text-sm mt-1">{clientErrors.message}</p>
            )}
          </div>

          {/* Form-level Formspree error */}
          <ValidationError errors={state.errors} className="text-red-500 text-sm" />

          {/* Submit */}
          <button
            type="submit"
            disabled={state.submitting}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0A1628] text-white font-medium hover:bg-[#0A1628]/90 transition-colors disabled:opacity-60"
          >
            {state.submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};
```

### Formspree Account Setup (Human Step)

```
1. Go to https://formspree.io
2. Create a free account (or log in)
3. Click "New Form" — enter a name (e.g., "Stewardship Advisory Inquiry")
4. Copy the form's hash ID (8-character string, e.g., "xpwrggkj")
5. Replace "YOUR_FORM_ID" in useForm("YOUR_FORM_ID") with the real ID
6. Verify the notification email is set to info@stewardshipadvisory.com
```

Free plan: 50 submissions/month, email notifications enabled, no custom domain required.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@formspree/react` wrapped Stripe separately | Stripe support merged into `@formspree/react` v3 | 2025 | Package brings `@stripe/react-stripe-js` as dep — irrelevant to this phase, but explains the peer deps |
| Manual `fetch` to `https://formspree.io/f/{ID}` | `useForm` hook handles all transport | 2019+ | No custom fetch code needed |

**Deprecated/outdated:**
- `formspree.io/YOUR@EMAIL.COM` endpoint syntax: Old Formspree docs showed email-based endpoints. Current accounts use hash IDs only (`/f/{HASH_ID}`). The core library confirms `https://formspree.io/f/${r}` as the sole non-project endpoint format.

---

## Open Questions

1. **Formspree endpoint ID**
   - What we know: The endpoint URL is `https://formspree.io/f/{HASH_ID}`. The hash ID is generated at account creation.
   - What's unclear: Whether the firm already has a Formspree account, and what email address should receive submissions.
   - Recommendation: This is a 2-minute human action. The plan should include a Task 0 or prerequisite step that gates the end-to-end test on the human obtaining the ID. Development can proceed with a placeholder string — the form renders correctly and shows a Formspree "form not found" error, which the code handles gracefully via `state.errors`.

2. **Inquiry topic field: select vs text input**
   - What we know: CONT-01 specifies "inquiry topic" as a field name without specifying input type.
   - What's unclear: Whether the firm prefers free-text or a dropdown with pre-defined categories.
   - Recommendation: Use a `<select>` with 5-6 pre-defined topics based on the firm's service areas. This constrains the input to valid categories and reduces noise in the inbox. Topics can be derived from the Services/Framework sections already present in the codebase.

3. **Organisation field: required or optional**
   - What we know: CONT-01 lists organisation as a field but does not specify if it's required. CONT-02 says "required fields" must validate, without listing which ones are required.
   - What's unclear: Whether all five fields are required or only name/email/message.
   - Recommendation: Make name, email, and message required (the minimum needed to respond). Organisation and topic are optional — many meaningful inquiries come from individuals, not institutions.

---

## Sources

### Primary (HIGH confidence)
- `@formspree/react@3.0.0` dist/index.js — source-inspected via `npm pack`, all state shape, hook signature, and ValidationError behavior verified directly from compiled source
- `@formspree/core@4.0.0` dist/index.js — endpoint URL pattern `https://formspree.io/f/${r}` confirmed from `submitForm` implementation
- `/Users/mac/Downloads/stewardship-advisory/.planning/phases/01-routing-foundation/01-02-SUMMARY.md` — ContactPage.tsx current state, animation pattern decisions, Phase 1 established conventions

### Secondary (MEDIUM confidence)
- npm registry metadata: `@formspree/react@3.0.0` published 2025-03-17, peer deps `react ^16.8 || ^17.0 || ^18.0 || ^19.0` confirmed compatible with React 19
- formspree-js GitHub test file analysis — useForm destructuring pattern `[state, submit, reset]` and state property names confirmed

### Tertiary (LOW confidence)
- Free plan submission limits (50/month) — referenced in multiple community sources but not directly verified against current Formspree pricing page (web access blocked during research). Treat as directionally correct; confirm at formspree.io/pricing.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions confirmed from npm registry and package source
- Architecture: HIGH — ContactPage.tsx state verified, hook API extracted from dist source
- Pitfalls: HIGH for items 1-3 (derived from source behavior), MEDIUM for items 4-5 (derived from project conventions and Tailwind CSS behavior)

**Research date:** 2026-03-26
**Valid until:** 2026-09-26 (stable API — @formspree/react has not had a major version bump since 3.0.0)
