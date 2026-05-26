# 2026-05-25 23:40 - Codex - VM-134 Apocrypha Hero Unification

## Agent Name

Codex

## Task Requested

Implement `VM-134 - Apocrypha Hero Unification Pass` by aligning the Apocrypha hero with the current Vox Mana route-family opening language while preserving content, section contracts, public source links, and the `/library/` compatibility alias.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2317-codex-vm134-apocrypha-hero-card.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`
- `docs/design/visual-style-guide.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-134-apocrypha-hero-unification-pass.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `library/index.html`
- `package.json`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/visual-regression-strategium.mjs`

## Files Changed

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `scripts/visual-regression-apocrypha.mjs`
- `package.json`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-134-apocrypha-hero-unification-pass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2340-codex-vm134-apocrypha-hero-unification.md`

## What Changed

- Reworked the Apocrypha hero so the primary explanation, subtitle, lede, note, CTA row, and compact commitment strip live together in the left hero panel.
- Reworked the `At A Glance` area into a right-side support panel with three retained commitments presented as route-family signal rows instead of nested summary cards.
- Tuned Apocrypha hero spacing, panel proportions, heading scale, CTA rhythm, chip/status treatment, glass treatment, and mobile stacking in route-local CSS.
- Added `scripts/visual-regression-apocrypha.mjs` with deterministic hero desktop, hero mobile, and reference-library captures.
- Added visual regression checks for `/library/` forwarding and horizontal overflow to the Apocrypha harness.
- Added `test:visual:apocrypha:baseline` and `test:visual:apocrypha` package scripts.
- Updated Project Atlas, manual QA docs, Kanban, and the handoff index.

## Why It Changed

Apocrypha had the right public-reference content after `VM-011`, but its opening section still felt more separate from the current Home, Strategium, Maze, and Archscry route family than intended. This pass keeps the library/archive identity intact while making the first viewport feel closer to the current Vox Mana visual rhythm.

## Decisions Made

- Kept `/apocrypha/` canonical and `/library/` as a compatibility alias.
- Kept the pass Apocrypha-only; `newIndex2.html`, Archscry, Maze, and Strategium were not edited.
- Kept all 10 public source URLs intact.
- Kept section ids and rail hooks stable.
- Did not touch `assets/js/apocrypha.js` because the DOM changes did not require rail, reveal, or return-dock runtime changes.
- Established the Apocrypha visual baseline after the approved hero change, then compared against that baseline to prove deterministic stability.

## Risks / Uncertainties

- `VM-088` remains in progress on `newIndex2.html`; if it expands into a larger Home hero frame change, Apocrypha may need a later alignment review.
- The worktree already contained unrelated dirty Archscry, Maze, Strategium, and documentation changes before this implementation. This task avoided reverting or normalizing those changes.
- The new Apocrypha visual artifacts are generated under `artifacts/visual-regression/apocrypha/` and appear to be ignored like the existing visual artifact folders.

## Tests Run

- `node --check assets/js/apocrypha.js`
- `node --check scripts/visual-regression-apocrypha.mjs`
- `npm.cmd run test:visual:apocrypha:baseline`
- `npm.cmd run test:visual:apocrypha`
- `hero-desktop`: `0` mismatched pixels
- `hero-mobile`: `0` mismatched pixels
- `references-desktop`: `0` mismatched pixels
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Passed with existing LF/CRLF warnings only.

## Not Touched

- `assets/js/apocrypha.js`
- `library/index.html`
- `newIndex2.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- Placement logic
- Lore/source data
- Canonical `/data/` files
- Existing public source URLs
- Unrelated dirty worktree changes outside VM-134

## Follow-Up Recommendations

- Re-review Apocrypha hero proportions if `VM-088` changes the Home hero beyond the documented Mana Lens auto-cycling scope.
- Keep any `/library/` retirement as a separate route-retirement card.
- Consider a later cleanup card to remove dead Apocrypha CSS selectors from earlier archive-browser iterations.

## Next Suggested Agent

Frontend QA reviewer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-134-apocrypha-hero-unification-pass.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `docs/handoffs/2026-05-25-2317-codex-vm134-apocrypha-hero-card.md`
