# Generic Landing Page Mockup Brief for Codex

## Purpose
Create a polished landing page layout based on the provided mockup notes. The goal is to make the page easy for a first-time visitor to understand without adding unrelated features.

This document is intentionally generic and implementation-focused so Codex can apply it to an existing HTML/CSS/JS file or use it as the basis for a new landing page.

---

## Core User Experience Goal
The landing page should answer two questions immediately:

1. **What is this site?**
   - An interactive knowledge system for philosophy, identity, search, lore, and learning.

2. **What should I do here?**
   - Start with the quiz/placement path.
   - Explore the search/meaning path.
   - Open the lore/research library.
   - Learn the basic system through an introductory interactive section.

The navigation bar is for orientation only. The main decision point should happen in the hero and portal-card area below the hero.

---

## Page Structure Overview
Build or refactor the landing page into these major sections, in this order:

1. Sticky glass navigation bar
2. Hero / signal gate section
3. Three portal cards / primary paths
4. Desktop-only section jump rail
5. Interactive “What Is Magic?” / basics section
6. Optional back-to-top button

Do not add extra major sections unless the existing page already contains them and they are being preserved.

---

## 1. Sticky Top Navigation / Glass Bar

### Intent
The top navigation should remain visible and feel like a dark glass signal bar, not a plain website menu.

### Required Content
Include a left-side brand mark and site name:

```text
◇ Vox Mana
```

Include these navigation links:

```text
What Is This?
Magic Basics
Archscry
Implicit Maze
Library
```

### Behavior
- Navigation should be sticky at the top of the page.
- It should remain visually readable while scrolling.
- It should use a dark translucent/glass effect.
- It should not be the only place where the three main paths appear.

### Visual Direction
Use:
- Dark translucent background
- Backdrop blur where supported
- Thin border or subtle highlight
- Soft glow or signal-line accent
- Clear active/hover states

### Accessibility
- Use a semantic `<nav>` element.
- Include `aria-label="Primary navigation"`.
- Ensure all links are keyboard focusable.
- Use visible focus states.

---

## 2. Hero / Signal Gate

### Intent
The hero section is the first-time visitor explanation. It should immediately communicate what the site is and why the user is here.

### Required Text
Use this copy or close equivalent:

```text
VOX MANA

Discover the philosophy behind color, identity, lore, and play.

Vox Mana is an interactive Magic: The Gathering knowledge system that helps you explore the Color Pie, discover your placement, search symbolic card meaning, and read curated lore research.
```

### Optional Placeholder Area
Include a flexible placeholder area for future imagery, glyphs, animation, or supporting text.

Placeholder label:

```text
Placeholder: future image, animated glyph, or supporting text
```

### Design Direction
The hero should feel like a “signal gate” or entry portal:

- Centered title
- Strong visual hierarchy
- Large headline
- Short, readable supporting text
- Decorative but restrained background effect
- No clutter

### Acceptance Criteria
- A new visitor can understand the site within 5 seconds.
- The hero does not contain too many buttons.
- The hero points visually toward the path cards below.

---

## 3. Three Paths / Portal Cards

### Intent
This is the primary “choose your path” moment. The three main destinations should appear as large, beautiful cards, not just links in the nav.

### Required Cards
Create three portal cards:

#### Card 1: Archscry

```text
ARCHSCRY
Find yourself.

Take the placement quiz and discover your color identity.

Button: Begin
```

#### Card 2: Implicit Maze

```text
IMPLICIT MAZE
Search meaning.

Explore cards through symbolic color, mechanics, and intuition.

Button: Search
```

#### Card 3: Apocrypha

```text
APOCRYPHA
Read the lore.

Enter the research library of lore, factions, planes, and metaphysics.

Button: Open Library
```

### Card Requirements
Each card should include:

- Title
- Short tagline
- Short explanation
- Clear action button
- Small color or glow accent
- Hover glow
- Subtle lift on hover
- Keyboard focus state

### Layout
Desktop:
- Three cards in a single row if space allows.

Tablet:
- Two cards on first row, one card below, or a responsive grid.

Mobile:
- Stack cards vertically.

### Acceptance Criteria
- The cards should be the main visual decision point on the page.
- Do not hide these actions only in the nav.
- Do not add extra cards.

---

## 4. Section Jump Rail / Desktop Only

### Intent
Add a small floating section navigation rail after the hero area. This is for orientation on larger screens only.

### Required Rail Items
Use these items:

```text
Vox Mana
Start
Paths
Magic Basics
```

### Behavior
- Hidden on mobile.
- Appears only after the hero or after the user begins scrolling.
- Can float left or right.
- Clicking a rail item scrolls smoothly to the relevant section.
- Current section may be highlighted if that logic already exists or is easy to add.

### Design Direction
- Small circular markers or dots.
- Minimal text labels.
- Soft glow on active/hover.
- Should not distract from main content.

### Acceptance Criteria
- Rail does not cover important content.
- Rail is not visible on small screens.
- Rail improves navigation without becoming a second full nav bar.

---

## 5. Back-to-Top Button

### Intent
Provide a small glowing back-to-top control after the user scrolls down.

### Behavior
- Hidden at page top.
- Appears after scrolling past the hero or a reasonable threshold.
- On click, smoothly scrolls to the top.

### Visual Direction
Use:

```text
↑
```

The button should be small, glowing, and unobtrusive.

### Accessibility
- Use a `<button>` element.
- Include an accessible label such as `aria-label="Back to top"`.

---

## 6. Interactive “What Is Magic?” / Magic Basics Section

### Intent
Create an introductory learning area for new users. This section should explain the core concepts and include an interactive tab/drawer pattern.

### Section Intro Copy
Use this copy or close equivalent:

```text
New to Magic? Start here. Magic is a strategy card game built around five colors of mana. Each color represents a philosophy, a way of solving problems, and a style of play.
```

### Required Topic Buttons
Create five topic buttons/cards:

```text
Color Pie
Mana
Decks
Lore
Gameplay
```

### Interaction Pattern
When the user clicks a topic, show an expanding information panel or drawer below the topic buttons.

Default recommendation:
- Default active topic: `Color Pie`
- Use accessible tab behavior if possible.

### Color Pie Panel Content
Use this content for the Color Pie panel:

```text
COLOR PIE

The Color Pie is Magic’s philosophical engine. White seeks order, Blue seeks knowledge, Black seeks power, Red seeks freedom, and Green seeks growth.
```

Add two actions in the panel:

```text
Show the five colors
Color Matrix
```

### Color Matrix Requirement
Move the existing “Metaphysics Lab” content into this section and relabel it as:

```text
Color Matrix
```

The Color Matrix can be displayed in one of two acceptable ways:

1. Inline within the Color Pie panel after the user clicks “Color Matrix”.
2. As a jump target lower in the same section.

Do not keep the label “Metaphysics Lab” in this user-facing section unless it already appears elsewhere as a deeper/internal concept.

### Accessibility
If implementing as tabs:

- Use `role="tablist"` on the topic container.
- Use `role="tab"` on each topic button.
- Use `aria-selected` to identify the active tab.
- Use `aria-controls` to point to the active panel.
- Use `role="tabpanel"` on panels.
- Hide inactive panels with `hidden`.

### Acceptance Criteria
- Clicking each topic changes the visible panel content.
- Color Pie is available and working.
- Color Matrix is clearly connected to Color Pie.
- The old Metaphysics Lab is not presented as a random detached section.

---

## Suggested HTML Section IDs
Use predictable IDs so links, rail navigation, and JS are easy to wire.

```text
#top
#hero
#paths
#magic-basics
#color-matrix
```

Suggested tab IDs:

```text
#tab-color-pie
#tab-mana
#tab-decks
#tab-lore
#tab-gameplay
```

Suggested panel IDs:

```text
#panel-color-pie
#panel-mana
#panel-decks
#panel-lore
#panel-gameplay
```

---

## Suggested Component/Class Names
Use these names or map them to existing project conventions.

```text
.vm-shell
.vm-nav
.vm-nav__brand
.vm-nav__links
.vm-hero
.vm-hero__title
.vm-hero__subtitle
.vm-hero__description
.vm-hero__placeholder
.vm-paths
.vm-path-card
.vm-path-card__title
.vm-path-card__tagline
.vm-path-card__body
.vm-path-card__button
.vm-jump-rail
.vm-back-to-top
.vm-basics
.vm-basics__tabs
.vm-basics__tab
.vm-basics__panel
.vm-color-matrix
```

---

## Styling Requirements

### Overall Look
The page should feel:

- Dark
- Glassy
- Polished
- Mysterious but readable
- Interactive without being noisy
- More like an experience than a basic information page

### Use These Effects Carefully
Allowed:

- Glassmorphism
- Subtle glow
- Soft gradients
- Hover lift
- Thin luminous borders
- Background radial gradients
- Minimal animation

Avoid:

- Large distracting animations
- Too many buttons in the hero
- Extra feature sections not requested
- Overly bright neon everywhere
- Cluttered panels
- Tiny low-contrast text

### Motion Guardrail
Respect reduced-motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## JavaScript Behavior Requirements

Implement only the necessary behavior:

1. Topic tab/panel switching in the Magic Basics section.
2. Back-to-top show/hide and scroll behavior.
3. Optional section rail active-state tracking.
4. Optional Color Matrix reveal/jump behavior.

Do not add unrelated quiz logic, search logic, routing, authentication, data fetching, or card database behavior.

---

## Responsive Requirements

### Desktop
- Sticky nav visible.
- Hero centered.
- Three path cards in a row.
- Jump rail visible after hero.

### Tablet
- Path cards wrap cleanly.
- Jump rail may be hidden if it crowds content.

### Mobile
- Nav becomes compact or wraps cleanly.
- Path cards stack vertically.
- Jump rail hidden.
- Tabs can scroll horizontally or stack.
- Back-to-top button remains accessible.

---

## Content Preservation Rules

When applying this to an existing file:

1. Preserve existing branding unless it conflicts with this brief.
2. Preserve existing links where possible.
3. Move existing Metaphysics Lab content into the Magic Basics section and relabel it Color Matrix.
4. Do not delete existing working code unless replacing it with equivalent behavior.
5. Do not add new major destinations beyond Archscry, Implicit Maze, and Apocrypha.

---

## Codex Task Prompt

Use the following prompt directly with Codex:

```text
You are modifying an existing landing page.

Goal:
Refactor the page into a polished generic landing page using the structure in this mockup brief. The result should help a first-time visitor understand what the site is and choose one of three main paths.

Required sections, in order:
1. Sticky dark glass top navigation
2. Hero / signal gate
3. Three large portal cards
4. Desktop-only section jump rail
5. Interactive Magic Basics section
6. Back-to-top button

Important rules:
- Do not invent unrelated new features.
- Do not add extra major sections.
- The top nav is for orientation only; the main choice must happen in the three portal cards.
- The portal cards must be large, visually strong, and interactive.
- Move the existing Metaphysics Lab content into the Magic Basics section and relabel it Color Matrix.
- The Color Matrix should be tied to the Color Pie topic, either as an inline reveal or a same-section jump target.
- Keep the design dark, glassy, polished, and readable.
- Respect mobile responsiveness and prefers-reduced-motion.
- Preserve existing working links and code where possible.

Implementation expectations:
- Use semantic HTML.
- Use accessible tab/panel behavior for the Magic Basics topic buttons if possible.
- Use predictable IDs: top, hero, paths, magic-basics, color-matrix.
- Add only minimal JavaScript needed for tabs, back-to-top behavior, and optional rail active state.
- Keep the final file self-contained unless the project already uses separate CSS/JS files.

After editing, verify:
- The nav remains sticky.
- The hero explains the site clearly.
- The three portal cards are visible and usable.
- The Magic Basics tabs/panels work.
- Color Matrix appears under or connected to Color Pie.
- Mobile layout stacks cleanly.
- No console errors are introduced.
```

---

## Done Definition
The implementation is complete when:

- The page visually follows the mockup structure.
- First-time users can identify the purpose of the site quickly.
- The three main paths are clear and prominent.
- The Magic Basics section has working interactive topics.
- The old Metaphysics Lab is relocated and renamed Color Matrix.
- The layout works on desktop, tablet, and mobile.
- No unrelated features were added.
