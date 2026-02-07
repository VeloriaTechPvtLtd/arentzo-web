---
name: Code Review (React Frontend)
description: Validates code against the project's strict Clean Code, Feature Rules, and React Best Practices. Use this for all frontend reviews.
---

# Code Review Skill – React Frontend

This skill enforces high-quality React development standards, integrating standard best practices with the project's **non-negotiable** engineering laws.

## 🚨 CRITICAL: Hard Fail Conditions
**Reject** immediately if:
1.  **Violation of `.agent/rules/general.md`**: Any usage of hex codes or deviation from the Oklch theme.
2.  **Component > 200 lines**.
3.  **Function > 20 lines**.
4.  **File > 300 lines**.
5.  **Cross-feature imports** (Feature A imports Feature B).
6.  **Direct API calls in UI components** (Must use Application layer).

---

## 1. Theme & Design System Compliance (Strict)
**Refer to `.agent/rules/general.md` for the source of truth.**
- [ ] **NO HEX CODES**: Are there any `#ffffff` or `#000`? **Reject**. Must use semantic variables (`bg-primary`, `text-muted`).
- [ ] **Oklch Color Space**: Does custom CSS use `oklch()`?
- [ ] **Light/Dark Compatibility**: Is the component verified to work in both modes (e.g., using `bg-background` instead of `bg-white`)?
- [ ] **Shadcn Usage**: Are Shadcn components used where applicable instead of custom HTML?

## 2. Component Design & Structure
- [ ] **Single Responsibility**: Does the component do one thing? Split if handling both complex UI and complex logic.
- [ ] **Size Limit**: STRICTLY < 200 lines. Split into smaller sub-components if larger.
- [ ] **Container/Presentation**: Are API calls/logic separated from rendering?
    -   *Presentation*: Receives props, renders UI.
    -   *Container*: Fetches data, handles handlers, passes props.
- [ ] **Feature Architecture**:
    -   UI lives in `features/<name>/ui/`.
    -   UI *never* imports `infrastructure`.
    -   UI *never* interacts directly with `domain` entities (use ViewModels if needed).

## 3. React Hooks & State Management
- [ ] **Rules of Hooks**: Called at top level? No conditional hooks?
- [ ] **Dependencies**: `useEffect` and `useCallback` dependency arrays MUST be exhaustive.
- [ ] **Custom Hooks**:
    -   Logic reuse > 20 lines -> Extract to specific hook (`use<Intent>.ts`).
    -   Hooks return objects, not arrays (unless order-independent).
- [ ] **State Location**:
    -   Local UI state -> `useState`.
    -   Complex form state -> `useReducer` or Form library.
    -   Global Business State -> Application Layer (Context/Store), NOT prop drilled > 2 levels.

## 4. Performance Optimization
- [ ] **Memoization**:
    -   Are expensive calculations wrapped in `useMemo`?
    -   Are object/function props to memoized children wrapped in `useMemo`/`useCallback`?
- [ ] **Render Control**: Check for unnecessary re-renders. Use `React.memo` for list items or expensive components.
- [ ] **Keys**: Lists use stable, unique IDs as keys. NEVER usage index as key unless list is static.
- [ ] **Code Splitting**: Route-based code splitting using `React.lazy` and `Suspense` for main pages.

## 5. Code Quality & Readability
- [ ] **Function Size**: STRICTLY < 20 lines. Helper functions must be extracted.
- [ ] **Naming**:
    -   Components: `PascalCase`.
    -   Functions: `camelCase` (verbs: `handleSubmit`, `fetchUser`).
    -   Booleans: `is...`, `has...`, `should...`.
- [ ] **JSX Clarity**:
    -   No nested ternaries.
    -   Map functions extracted if complex.
    -   No anonymous inline functions for event handlers if they are large.

## 6. Styling & UI Consistency
- [ ] **Methodology**: Strict adherence to project styling (CSS Modules / Tailwind).
- [ ] **Consistency**: Uses design system tokens (colors, spacing) variables, no magic numbers.
- [ ] **Responsiveness**: Mobile-first approach? Checked at standard breakpoints?
- [ ] **No Inline Styles**: Move to CSS classes.

## 7. Accessibility (a11y)
- [ ] **Semantic HTML**: Use `<button>`, `<nav>`, `<header>` instead of `<div>`.
- [ ] **Interactive Elements**: All clickable elements must have keyboard focus and `Enter`/`Space` handlers.
- [ ] **Images**: `alt` text provided? (Or `alt=""` for decorative).
- [ ] **ARIA**: Used only when necessary? Correct attributes (`aria-label`, `aria-expanded`).

## 8. API Integration & Data Handling
- [ ] **Layer Separation**: UI Component -> Custom Hook -> Application Service -> Infrastructure API.
- [ ] **States**: Handles `loading`, `error`, `success` states explicitly.
- [ ] **Transformations**: Data shaping happens in *Application* layer (Mappers), not in JSX.
- [ ] **Cleanup**: Async operations canceled on unmount.

## 9. Error Handling & Edge Cases
- [ ] **Boundaries**: Error Boundaries used for feature sections?
- [ ] **Null Checks**: Safe access for optional data (`user?.address?.city`).
- [ ] **Fallbacks**: Empty states handled? Loading skeletons shown?
- [ ] **User Feedback**: Errors displayed to user (Toasts/Alerts), not just console.

## 10. Security Best Practices
- [ ] **Sanitization**: No `dangerouslySetInnerHTML` unless absolutely necessary and sanitized.
- [ ] **Input**: All inputs validated?
- [ ] **Environment**: Secrets accessed via `import.meta.env`, never hardcoded.
- [ ] **Dependencies**: No new npm packages added without explicit approval.

## 11. Testing & Testability
- [ ] **Unit Tests**: Domain logic (100% coverage).
- [ ] **Component Tests**: Critical UI interactions tested (React Testing Library).
- [ ] **Test Attributes**: Use `data-testid` only if accessibility selectors fail.
- [ ] **Mocking**: Infrastructure mocked at boundaries.

## 12. Linting & Formatting
- [ ] **Compliance**: No eslint warnings ignored.
- [ ] **Types**: No `any`. Strict TS types defined in `domain` or `application`.
- [ ] **Imports**: Absolute imports preferred (`@/features/...`).

## 13. Collaboration & Review Communication
- [ ] **Tone**: Constructive, not commanding. ("Consider extracting..." vs "Extract this.")
- [ ] **Clarity**: Explain *why* a change is requested (link to rule).
- [ ] **Blockers**: Distinguish between "Nit" (non-blocking) and "Issue" (blocking).

## 14. Production Readiness
- [ ] **Logging**: No `console.log` in production code. Use logger service.
- [ ] **Feature Flags**: New major features behind flags?
- [ ] **Regressions**: Does this verify old bug fixes?

---

**FINAL CHECK**: If you can't explain the component's purpose in one sentence, **SPLIT IT**.
