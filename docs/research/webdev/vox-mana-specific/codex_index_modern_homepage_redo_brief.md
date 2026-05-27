# Codex Brief: Rework `index.html` into a Modern Vox Mana Homepage

## Repo Context

Repository:

`rboles84/mtgSiteWIP`

Target page:

`index.html`

Primary UI research folder to scan before editing:

`docs/research/ui_research/`

Specific mockup reference to scan:

`docs/research/ui_research/ui_layout_mock.txt`

Important inspiration file to scan:

`docs/research/ui_research/KEEP THIS_archscry-interactive-premo.html`

Also scan any other `.html` files in:

`docs/research/ui_research/`

## Purpose of This Task

Rework the Vox Mana landing page into a modern, functional homepage that preserves the best atmospheric identity of the current site, but moves away from the overly literal “Three doors / Three ways in” concept.

The homepage should still guide users into the major Vox Mana areas, but it should not feel like three isolated portal cards are the entire product. It should feel like a real modern site: clear purpose, strong hero, helpful navigation, atmospheric identity, and functional content sections.

## Design Direction

Use the current Vox Mana visual language, but modernize the layout.

The desired feel:

- Modern dark fantasy / research interface
- Glassy but readable panels
- Strong painted background presence
- Subtle glowing motion
- SVG sigils as identity anchors
- Canvas aura / rising glowing snow / starfield effect
- Tailwind-inspired utility-like spacing and layout clarity, even if the repo uses plain CSS
- Clean HTML, CSS, and JS separation where possible
- Functional homepage, not just a visual splash page

## What I Like from `KEEP THIS_archscry-interactive-premo.html`

Codex should scan this file and identify reusable patterns, especially:

1. The background treatment
   - Painted Vox Mana background remains visible and central.
   - It should not be hidden behind too many opaque panels.
   - It should feel like part of the brand, not just decoration.

2. Rising glowing snow / aura motion
   - Preserve or adapt the atmospheric canvas particle effect.
   - The effect should feel magical, signal-like, subtle, and alive.
   - It must respect reduced motion settings.

3. SVG sigils
   - Use SVG sigils as visual identity markers.
   - Prefer inline SVG for key symbols where it improves control and styling.
   - Sigils should support glow, hover, and subtle motion where appropriate.

4. Modern interface feel
   - Use clean layout sections.
   - Avoid clutter.
   - Preserve the “ritual interface / magical research terminal” feeling.

## What to Keep from Current `index.html`

Before editing, scan the current `index.html` and preserve valuable existing architecture:

- Shared CSS imports:
  - `/assets/css/tokens.css`
  - `/assets/css/fonts.css`
  - `/assets/css/topbar.css`
  - `/assets/css/atmosphere.css`
  - `/assets/css/components.css`
  - `/assets/css/home.css`

- Existing background container pattern:
  - `.vm-bg`
  - `.vm-bg__picture`
  - `.vm-bg__nebula`
  - star canvas appended by `atmosphere.js`

- Existing scripts:
  - `/assets/js/reduce-motion.js`
  - `/assets/js/vm-topbar.js`
  - `/assets/js/atmosphere.js`
  - `/assets/js/site-flags.js`
  - `/assets/js/home.js`

- Existing nav destinations:
  - `/archscry/`
  - `/maze.html`
  - `/library/`

- Existing unofficial fan project / privacy / terms footer language.

Do not remove the core atmosphere system unless replacing it with a better version that is still shared, accessible, and reduced-motion aware.

## What to Change from Current `index.html`

The current homepage is too locked into:

- “Three doors. Three ways in.”
- A three-card-only portal concept
- Maze as oversized centerpiece
- Archscry and Apocrypha as side cards
- “03 Gates” framing

This should be softened or replaced.

The new homepage should say, visually and structurally:

> Vox Mana is a Magic: The Gathering knowledge system for exploring color philosophy, identity placement, symbolic card meaning, and curated lore research.

The site can still have entry points, but they should feel like product features or modules inside a modern homepage, not the entire organizing metaphor.

## Required Homepage Structure

### 1. Sticky Glass Top Nav

Keep a sticky / fixed top navigation bar.

It should feel like a dark glass signal bar, not a plain website menu.

Suggested nav items:

- Vox Mana / Home
- What Is This?
- Magic Basics
- Archscry
- Implicit Maze
- Library / Apocrypha

Requirements:

- Clear active state
- Readable over background
- Mobile menu support
- Reduced motion toggle remains available
- Do not duplicate the whole site experience in the nav; the nav is orientation, not the main user journey

### 2. Modern Hero / Signal Gate

Replace the “Three doors” hero with a clearer homepage introduction.

Hero should include:

- Large title: `VOX MANA`
- Short subtitle:
  - `Explore color, identity, lore, and play through the philosophy of Magic.`
- Clear description:
  - `Vox Mana is an interactive Magic: The Gathering knowledge system for learning the Color Pie, discovering your placement, searching symbolic card meaning, and reading curated lore research.`
- Primary CTA:
  - `Start Archscry`
- Secondary CTA:
  - `Explore the Library` or `Search the Maze`

Visual requirements:

- Use background image strongly.
- Add a central or side SVG sigil element.
- Use a glass panel or soft text container only where readability needs it.
- Do not bury the background under flat black blocks.
- Keep the page atmospheric.

### 3. Functional Feature Modules Instead of Literal “Three Doors”

Do not use the old “three doors” language as the main concept.

Instead, create a modern section like:

`What can you do here?`

Feature modules:

1. `Find Your Color Identity`
   - Links to Archscry
   - Explains the placement quiz / reading

2. `Search Symbolic Card Meaning`
   - Links to Implicit Maze
   - Explains card search, meaning, mechanics, color, and intuition

3. `Read Curated Lore Research`
   - Links to Apocrypha / Library
   - Explains factions, planes, metaphysics, and curated lore dossiers

4. Optional fourth module:
   - `Learn Magic Basics`
   - Links or scrolls to the Magic Basics section

These should be modern cards, tiles, or horizontal modules. They may preserve hover glow, lift, accent lines, and sigils, but should not feel like three giant isolated doors.

### 4. “What Is Magic?” / Magic Basics Section

Use the intent from `ui_layout_mock.txt`.

Create an approachable section for new users:

Intro copy:

`New to Magic? Start here. Magic is a strategy card game built around five colors of mana. Each color represents a philosophy, a way of solving problems, and a style of play.`

Include interactive topic chips or tabs:

- Color Pie
- Mana
- Decks
- Lore
- Gameplay

When a user clicks a topic, show an expanding info panel / drawer.

Default selected topic should be `Color Pie`.

Color Pie copy should explain:

- White seeks order
- Blue seeks knowledge
- Black seeks power
- Red seeks freedom
- Green seeks growth

Include a button or link:

- `Show the five colors`
- `Open Color Matrix`

If a current Metaphysics Lab / Color Matrix component exists in the repo, Codex should identify whether it can be lifted into this section. If it can, relabel it as `Color Matrix` and integrate it here. If not, Codex should stub the section cleanly and leave a TODO comment that identifies the missing source component.

### 5. Optional Section Jump Rail

Add a desktop-only floating section rail if it fits the final design.

Possible items:

- Vox Mana
- Start
- Features
- Magic Basics
- Library

Requirements:

- Desktop only
- Does not clutter mobile
- Appears after hero / on scroll
- Includes a small glowing back-to-top button after scrolling
- Respects reduced motion

If this feels too heavy after implementation, Codex may omit it, but the final page should still have clear section navigation.

## Atmosphere Requirements

Use the existing atmosphere system as the baseline.

Current repo already has:

- `.vm-bg`
- `.vm-bg__picture`
- `.vm-bg__nebula`
- `.vm-bg__stars`
- `atmosphere.js`
- background image preload
- `data-bg="light"` mask treatment
- reduced-motion support

Codex should not rewrite this from scratch unless necessary.

Enhance or tune it if needed to better match the “rising glowing snow / aura” feel from `KEEP THIS_archscry-interactive-premo.html`.

If adding particles:

- Keep them subtle.
- Keep performance safe.
- Pause when hidden.
- Respect `prefers-reduced-motion` and existing `data-reduce-motion` toggle.
- Avoid full-screen blur animations.

## CSS / Implementation Style

The repo appears to use plain HTML/CSS/JS, not a Tailwind build step.

So: do not add Tailwind as a dependency unless the repo already has it configured.

Instead, use Tailwind-inspired design principles in normal CSS:

- Clear spacing scale
- Modern grid layouts
- Responsive columns
- Utility-like class consistency
- CSS variables from existing tokens
- Glass panels
- Soft borders
- Glow accents
- `clamp()` for fluid type
- `@media` queries for responsive behavior
- `prefers-reduced-motion` guardrails

## Accessibility Requirements

- Use semantic sections with headings.
- All interactive controls must be buttons or links, not divs.
- Tabs/chips should use appropriate ARIA where practical.
- Maintain visible focus states.
- Preserve readable color contrast.
- Respect reduced motion.
- Background/canvas/SVG decorations should use `aria-hidden="true"`.

## Content Guardrails

Do not invent a bunch of new product areas.

Do not add quiz logic, database search logic, account features, or fake data unless already present.

Do not overbuild.

This task is a homepage redesign / integration pass, not a full app rewrite.

Do not remove existing working routes.

Do not remove existing shared CSS/JS unless there is a clear replacement.

## Deliverables

Codex should produce:

1. Updated `index.html`
2. Updated `/assets/css/home.css` if needed
3. Updated `/assets/js/home.js` if needed
4. No unrelated file changes
5. A short summary of:
   - Files scanned
   - Files changed
   - What visual patterns were reused
   - What behavior was added or preserved
   - Any TODOs or missing source files

## Acceptance Criteria

The final homepage should:

- No longer be centered on “Three doors. Three ways in.”
- Clearly explain what Vox Mana is.
- Preserve and improve the atmospheric background identity.
- Use the painted background, glowing aura/star/snow feel, and SVG sigil language.
- Keep navigation practical and modern.
- Present Archscry, Maze, and Apocrypha as functional site modules, not only as three doors.
- Include a beginner-friendly Magic Basics / Color Pie section.
- Be responsive.
- Be accessible.
- Respect reduced motion.
- Avoid adding unnecessary features.

## Suggested Codex Prompt

Paste this into Codex:

```text
You are working in the repo rboles84/mtgSiteWIP.

Task: Redesign index.html into a modern functional Vox Mana homepage.

Before editing, scan:
- docs/research/ui_research/ui_layout_mock.txt
- docs/research/ui_research/KEEP THIS_archscry-interactive-premo.html
- every .html file in docs/research/ui_research/
- current index.html
- assets/css/atmosphere.css
- assets/js/atmosphere.js
- assets/css/home.css
- assets/js/home.js

Goal:
Move away from the literal “Three doors / Three ways in” landing page and create a modern homepage that clearly explains Vox Mana as an interactive Magic: The Gathering knowledge system for color philosophy, identity placement, symbolic card meaning, and curated lore research.

Preserve and reuse the strongest atmospheric patterns: painted Vox Mana background, dark glass UI, glowing rising snow/star/canvas aura, SVG sigils, subtle glow, hover lift, and reduced-motion support.

Do not add Tailwind unless the repo already has a Tailwind build step. Use Tailwind-inspired layout principles in plain CSS: clean grid, spacing scale, glass panels, CSS variables, clamp(), responsive sections, and utility-like class consistency.

Required sections:
1. Sticky glass top nav with practical orientation links.
2. Hero / Signal Gate with VOX MANA title, clear explanation, primary CTA to Archscry, and secondary CTA to Library or Maze.
3. Functional feature modules for Archscry, Implicit Maze, Apocrypha, and optionally Magic Basics. Do not frame them as giant “three doors.”
4. Magic Basics / What Is Magic section with interactive chips/tabs for Color Pie, Mana, Decks, Lore, Gameplay.
5. Default Color Pie panel explaining W/U/B/R/G philosophies.
6. If a Metaphysics Lab / Color Matrix component exists, lift it into Magic Basics and relabel it Color Matrix. If not found, stub cleanly with a TODO.

Keep existing shared CSS/JS imports where possible:
- tokens.css
- fonts.css
- topbar.css
- atmosphere.css
- components.css
- home.css
- reduce-motion.js
- vm-topbar.js
- atmosphere.js
- site-flags.js
- home.js

Deliver only focused changes to index.html, assets/css/home.css, and assets/js/home.js unless another file is absolutely necessary.

Acceptance criteria:
- Homepage no longer says “Three doors. Three ways in” as its central concept.
- Page clearly answers: What is Vox Mana? What can I do here?
- Painted background and atmosphere remain visible.
- SVG sigil language is preserved or improved.
- Rising glow/star/snow/canvas aura is preserved or adapted from the research file.
- Feature modules are modern and functional.
- Magic Basics section is beginner-friendly.
- Responsive, accessible, and reduced-motion safe.
- No unrelated new features.
- Provide a final summary of files scanned, files changed, patterns reused, and TODOs.
```
