---
name: UI Implementation from Design
description: Guide for converting screenshots/mockups into pixel-perfect, clean, production-ready React code.
---

# UI Implementation Skill

This skill guides you through converting a visual design (defined by screenshots, mockups, or descriptions) into high-quality, project-compliant React code.

## 🚨 PRE-REQUISITE: Theming & Color System
**Strict Adherence Required**: You **MUST** refer to `.agent/rules/general.md` for the exact color palette.
1.  **NO HEX CODES**: You are forbidden from using hex codes (e.g., `#FFFFFF`, `#000000`) for project colors.
2.  **Use Semantic Variables**: Map every color in the design to one of these variables:
    *   **Backgrounds**: `bg-background`, `bg-card`, `bg-sidebar`, `bg-muted`
    *   **Text**: `text-foreground`, `text-muted-foreground`, `text-card-foreground`
    *   **Actions**: `bg-primary` (main buttons), `bg-secondary` (lesser actions), `bg-accent` (interactive list items)
    *   **Borders**: `border-border`, `border-input`
    *   **Destructive**: `bg-destructive` (Delete/Error)
3.  **OKLCH Color Space**: The project uses `oklch()` for all colors. Any custom colors (rarely allowed) must use `oklch`.

## 1. Visual Analysis (Before Coding)
**Do not write code until you have analyzed the design:**
1.  **Layout Breakdown**: Identify the main container (Grid vs Flex). Identify sections (Header, Sidebar, Content).
2.  **Component Identification**: Break the UI into reusable components.
    *   *Rule*: If a section looks reusable or complex, name it now (e.g., `OrderSummaryCard`, `UserAvatar`).
    *   *Rule*: Ensure no component will exceed 200 lines. Plan to split if necessary.
4.  **Flow Pattern Selection**:
    *   **Side Drawers**: Use for ephemeral flows (Auth, Edit Profile, Checkout, Filters) to maintain context.
    *   **Full Pages**: Use only for primary navigation destinations (Home, Dashboard, Search Results).
    *   **Modals**: Use for critical confirmations or simple inputs.
3.  **Token Matching**:
    *   **Colors**: **STOP.** Check the semantic variable list above. Find the closest match.
    *   **Typography**: Identify font sizes and weights. Map to Tailwind/CSS classes (e.g., `text-xl font-bold`).
    *   **Spacing**: Estimate using the project's spacing scale (e.g., `p-4`, `gap-6`).

## 2. Implementation Strategy (Feature-First)
1.  **Location**: Place components in `features/<feature-name>/ui/components/`.
2.  **Structure**:
    ```tsx
    // Component.tsx - Pure UI
    interface Props {
      title: string;
      isActive: boolean;
      onAction: () => void;
    }
    export const Component = ({ title, isActive, onAction }: Props) => {
      // ... rendering
    };
    ```
3.  **Logic Separation**: If the design implies complex interaction (forms, API data), create a custom hook or container. **Do not mix business logic into the UI component.**

## 3. Styling Rules (Mobile-First)
1.  **Mobile-First**: Write styles for mobile screens first (`< 768px`). Use `md:`, `lg:` modifiers for larger screens.
2.  **Tailwind/Shadcn**: Use utility classes for layout (`flex`, `grid`, `absolute`) and spacing.
    *   *Constraint*: Do not use arbitrary values (`w-[317px]`) unless absolutely necessary.
3.  **CSS Composition**: If generic utilities become messy, use `class-variance-authority` (cva).

## 4. Pixel-Perfect Verification
Check your implementation against the original design:
- [ ] **Alignment**: Are items properly centered/aligned?
- [ ] **Whitespace**: Is the padding/margin consistent with the "breathing room" in the design?
- [ ] **Contrast**: Is text legible against the background?
- [ ] **Interactive States**: Did you implement Hover (`hover:`), Focus (`focus:`), and Active states?
- [ ] **Animations**: Add subtle transitions (`transition-all duration-200`) to interactive elements.

## 5. Theme Verification (MANDATORY)
The UI must look perfect in **both** Light and Dark modes.
- [ ] **Light Mode**: Does it look crisp? Are shadows visible?
- [ ] **Dark Mode**: Toggle the `.dark` class.
    *   Is the background dark (`oklch(0.2569...)`)?
    *   Is text legible (light on dark)?
    *   Are borders visible but subtle?
    *   **Check**: If you used a hardcoded white background, it will look broken here. Use `bg-background` or `bg-card`.

## 6. Accessibility (The Invisible Design)
A pixel-perfect UI is broken if it's not accessible.
- [ ] **Semantics**: Use `<main>`, `<section>`, `<article>`, `<button>` (not `div` with click handler).
- [ ] **Focus Ring**: Ensure focus outlines are visible for keyboard users (`ring-offset-2`).
- [ ] **Alt Text**: Describe images.

---
**Goal**: The user should look at the result and say "Wow, this looks premium and exactly like the design."
