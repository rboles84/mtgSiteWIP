# VM-397 - Apocrypha Source Compass

Status: Done
Owner: Codex
Type: UX / Front-End Enhancement
Area: Apocrypha route (`apocrypha/index.html`, `assets/css/apocrypha.css`, `assets/js/apocrypha.js`)
Priority: Medium
Created: 2026-06-15
Closed: 2026-06-15
Depends On: VM-396 (Apocrypha Reference Shelf Progressive Disclosure)

## Summary

Ship a tight v1 Source Compass for the Apocrypha `#ledger`: a compact horizontal tome rail
that navigates to native group-level `<details>` panels. The rail adds a bookshelf-style
local navigation layer while source links remain in normal vertical document flow, printable,
linkable, and reachable without JavaScript.

## Pre-Flight Gates

- [x] Re-read `AGENTS.md`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md`.
- [x] Confirmed VM-397 was unused before creating this card.
- [x] Confirmed VM-396 is closed in `docs/kanban/done/`.
- [x] Confirmed VM-396 MaRo shelves and `39 sources` markup are present in `apocrypha/index.html`.
- [x] Confirmed `npm.cmd run test:visual:apocrypha` passes against the VM-396 baseline.
- [x] Ran `git status --short --branch`; unrelated dirty work must be preserved.
- [x] Do not stage or commit unless explicitly instructed.

## Scope

- Add one local Source Compass rail above `Public links grouped by type`.
- Convert the current five `.apoc-library-group` panels into native top-level `<details>` panels.
- Add `name="apoc-library"` as progressive enhancement while JS enforces top-level exclusivity.
- Preserve all group categories, source links, link text, hrefs, order, count chips, and VM-396 MaRo shelves.
- Keep source content out of any carousel or horizontally scrolling content container.

## Out Of Scope

- Search/filter UI.
- Carousel pagination dots or arrow controls.
- `content-visibility`.
- Placement logic, generated data, raw packets, commander facts, claim ledgers, route aliases, and non-Apocrypha pages.
- New external dependencies or new color palettes.

## Acceptance Criteria

- The Source Compass has one real anchor per current library group, currently five.
- Each tome displays at least the group/category label and source-count chip.
- Rail anchors work without JS by jumping to stable group IDs.
- With JS, rail activation opens the target top-level group, closes sibling top-level groups only, syncs `aria-current`, and respects reduced motion for scrolling.
- Official Wizards / Mark Rosewater is the only group open by default.
- Nested VM-396 MaRo `.apoc-shelf` details remain independent and are never closed by group-level JS.
- Group summaries have clear accessible names, visible focus rings, CSS-drawn chevrons, and Enter/Space toggle behavior.
- Print forces all group bodies and nested MaRo shelf bodies visible.
- No horizontal overflow on desktop or mobile.

## Verification Plan

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git diff --check`
- `npm.cmd run test:visual:apocrypha`
- If the visual diff is scoped to VM-397, refresh the Apocrypha baseline and rerun the visual test to PASS.
- Manual `/apocrypha/` desktop and mobile QA: rail overflow/peek, anchor fallback, Tab/Enter/Space, group exclusivity with JS, no-JS fallback, nested MaRo shelves, reduced motion, print-all-open, no horizontal overflow, every link reachable, and tome anchor jumps land below the sticky topbar.

## Closeout

- [x] Updated `docs/reference/manual-test-cases.md`.
- [x] Wrote a VM-397 handoff in `docs/handoffs/`.
- [x] Updated `docs/handoffs/HANDOFF_INDEX.md`.
- [x] Moved this card to `docs/kanban/done/`.
- [x] Updated `docs/kanban/board.md`.

## What Changed

- Added a five-tome Source Compass rail above the Apocrypha public reference library.
- Converted all current library groups into top-level native `<details name="apoc-library">` panels.
- Kept Official Wizards / Mark Rosewater open by default and preserved its VM-396 nested shelves.
- Added Apocrypha-local group summary/body wrappers, source-count chips, CSS-drawn chevrons, deck-tone spine accents, anchor scroll margins, reduced-motion suppression, and print-open rules.
- Added a small `assets/js/apocrypha.js` enhancement for rail/group active-state sync, top-level group exclusivity, reduced-motion-aware scroll, and hash handling.
- Added a route-local `<noscript>` reveal fallback so the no-JS anchor/details path remains visible.
- Refreshed the Apocrypha visual baseline after the expected `references-desktop` drift was reviewed as scoped.

## Closeout Verification

- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS, with existing LF/CRLF warnings only.
- `npm.cmd run test:visual:apocrypha` before baseline - expected FAIL: `references-desktop` exceeded budget; hero captures remained under budget.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` after baseline - PASS with `0 / 0 / 0` mismatched pixels.
- Manual-style browser QA - PASS: 40 checks covering desktop/mobile rail behavior, anchor offsets, Tab/Enter/Space, visible focus outline, top-level exclusivity, nested MaRo shelf independence, all 49 public links reachable, reduced motion, print-all-open, no-JS fallback, and no horizontal overflow. Chrome-launcher reported a temp-profile cleanup warning after assertions completed.

## Not Touched

- Placement logic.
- Generated data.
- Raw packets.
- Commander facts.
- Claim ledgers.
- Route aliases.
- Non-Apocrypha pages.
- Search/filter UI.
- Carousel dots/arrows.
- `content-visibility`.
- Git staging, commits, pushes, tags, merges, or main promotion.
