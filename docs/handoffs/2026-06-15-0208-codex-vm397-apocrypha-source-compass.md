# 2026-06-15 02:08 - Codex - VM-397 Apocrypha Source Compass

## Agent Name

Codex

## Task Requested

Implement VM-397 by adding a no-search Source Compass rail above the Apocrypha public reference library, converting all current library groups into native group-level disclosure panels, preserving VM-396 MaRo shelves and every public source link, refreshing the scoped Apocrypha visual baseline, updating docs/Kanban, and avoiding staging or committing.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/handoffs/2026-06-14-2255-codex-vm396-apocrypha-reference-shelves.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `docs/reference/manual-test-cases.md`
- `scripts/visual-regression-apocrypha.mjs`

## Files Changed

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-0208-codex-vm397-apocrypha-source-compass.md`
- Ignored local visual baseline artifacts under `artifacts/visual-regression/apocrypha/baseline/`

## What Changed

- Added a five-tome Source Compass rail above `Public links grouped by type`.
- Converted all current Apocrypha public library groups into top-level native `<details name="apoc-library">` panels.
- Preserved all source links, link text, hrefs, order, source counts, and VM-396 nested MaRo shelves.
- Kept Official Wizards / Mark Rosewater open by default, with the four MaRo shelves nested and unnamed.
- Added Apocrypha-local summary/body wrappers, CSS-drawn group chevrons, count chips, deck-tone spine accents, scroll-margin targets, reduced-motion suppression, and print-open rules.
- Added a small `assets/js/apocrypha.js` Source Compass enhancement for top-level group exclusivity, rail `aria-current` sync, hash handling, and reduced-motion-aware scrolling.
- Added an Apocrypha route-local `<noscript>` reveal fallback so the no-JS anchor/details path remains visible.
- Updated manual QA docs, moved VM-397 to done, updated the board, and refreshed the reviewed Apocrypha visual baseline.

## Why It Changed

VM-396 fixed the very tall MaRo group, but the broader `Public links grouped by type` section still read as a long reference wall. VM-397 adds a tactile bookshelf-like local navigator while keeping the source links in normal document flow, avoiding search friction and carousel accessibility risk.

## Decisions Made

- Used the rail as navigation only; source links remain in vertical details panels.
- Did not add search/filter UI, dots, arrows, carousel pagination, or `content-visibility`.
- Used native `<details>` plus `name="apoc-library"` as progressive enhancement, with JS enforcing exclusivity only among top-level `.apoc-library-group` panels.
- Used styled summary text spans rather than headings inside `<summary>` to avoid relying on inconsistent heading-in-summary semantics.
- Reused the existing `data-deck-tone` palette for rail/group accents and introduced no new color system.
- Added `<noscript>` reveal fallback because the existing route reveal animation otherwise makes no-JS content transparent.

## Risks / Uncertainties

- The visual baseline command refreshed all Apocrypha captures; the intentional large drift was only `references-desktop`, while hero captures were under budget before refresh and 0 after refresh.
- Direct NVDA/VoiceOver testing was not performed. Summary title semantics were reviewed, and the implementation uses styled spans with clear summary names rather than relying on nested heading roles.
- Chrome-launcher reported a temp-profile cleanup permission warning after manual QA assertions completed; product checks passed before that cleanup warning.
- The repo remains intentionally dirty from earlier release-train work. This task preserved unrelated dirty files and did not stage or commit.

## Tests Run

- Pre-flight `npm.cmd run test:visual:apocrypha` against the VM-396 baseline - PASS.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS, with existing LF/CRLF warnings only.
- `npm.cmd run test:visual:apocrypha` before baseline - expected FAIL: `references-desktop` exceeded budget; hero captures remained under budget.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` after baseline - PASS with `hero-desktop: 0`, `hero-mobile: 0`, `references-desktop: 0`.
- Manual-style browser QA - PASS: 40 checks for desktop/mobile rail behavior, anchor offsets, Tab/Enter/Space, visible focus outline, top-level exclusivity, nested MaRo shelf independence, all 49 public links reachable, reduced motion, print-all-open, no-JS fallback, and no horizontal overflow.

## Not Touched

- Placement logic
- Generated data
- Raw packets
- Commander facts
- Claim ledgers
- Route aliases
- Non-Apocrypha pages
- Search/filter UI
- Carousel dots/arrows or pagination
- `content-visibility`
- Git staging, commits, pushes, tags, merges, or main promotion

## Follow-Up Recommendations

- If the public library grows materially, consider a future optional "Find a source" search enhancement behind a low-noise affordance.
- If screen-reader hardware/software is available later, perform direct NVDA and VoiceOver checks on the group summaries and document the exact announcement.

## Next Suggested Agent

No immediate follow-up agent required. Use a frontend accessibility specialist only if direct assistive-technology testing becomes available.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-397-apocrypha-source-compass.md`
- `docs/kanban/done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/reference/manual-test-cases.md`
