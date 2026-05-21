# Handoff - Archscry Shell Modernization

Agent name: Codex

Task requested: Modernize `/archscry/`, the placement flow, and the dossier shell so they match the newer Vox Mana visual world, and keep `archscry/index2.html` aligned while preserving its alternate atlas composition.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1210-codex-archscry-placement-atlas-preview.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-082-archscry-placement-atlas-preview.md`
- `docs/kanban/done/VM-086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `archscry/index.html`
- `archscry/index2.html`
- `assets/css/components.css`
- `assets/css/atmosphere.css`
- `assets/css/topbar.css`
- `assets/css/tokens.css`
- `assets/js/index.js`
- `assets/js/dossier-radar.js`
- `assets/js/archscry-index2.js`

## Files changed

- `archscry/index.html`
- `archscry/index2.html`
- `assets/css/archscry.css`
- `assets/css/archscry-atlas.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-087-archscry-shell-modernization.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`

## What changed

- Added `assets/css/archscry.css` as the shared Archscry shell layer for the live and preview routes.
- Shifted both Archscry pages into the newer Vox Mana visual language with chamber atmosphere, glass-panel surfaces, updated button treatment, refreshed landing/question/interview shells, and a more cohesive dossier container system.
- Kept the live `Mana Alignment Matrix`, adjacent fits, saved-result restore, retake flow, and Maze links untouched at the runtime level.
- Added `assets/css/archscry-atlas.css` and moved the `index2` atlas-only layout rules out of duplicated inline CSS so the preview composition stays isolated from the live route shell.
- Added `vm-archscry-route` to both page bodies and kept `vm-archscry-atlas-preview` on the preview route for safe CSS scoping.
- Updated the manual QA checklist to cover shell continuity on `/archscry/` and shell parity on `/archscry/index2.html`.

## Why it changed

The home and preview surfaces had already moved into a richer Vox Mana shell, but Archscry still looked like an older product generation. This pass brings the placement route, quiz flow, decree screen, and dossier into the same world without destabilizing the result behavior that recent Archscry passes had intentionally locked down.

## Decisions made

- Kept the runtime engine intact and solved the mismatch primarily with shared CSS and minimal HTML wiring.
- Preserved the Archscry chamber image and `data-bg="medium"` treatment instead of copying the home page directly.
- Left `assets/js/index.js`, `assets/js/dossier-radar.js`, and `assets/js/archscry-index2.js` behavior unchanged except for continuing to rely on the same DOM hooks.
- Isolated preview-only atlas composition styles into `assets/css/archscry-atlas.css` instead of letting `index2` drift further away inside its inline stylesheet.

## Risks / uncertainties

- Browser-backed visual QA was not available in-session, so the new shell was validated through code inspection and test suites rather than live screenshots.
- The large Archscry inline stylesheet still exists as legacy coverage beneath the new shared CSS layer. A later cleanup pass could remove more duplication once the new shell is visually approved.
- The worktree contains unrelated modified and untracked files outside this pass; nothing unrelated was reverted.

## Tests run

- `node --check assets/js/index.js`
- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/archscry-index2.js`
- `npm.cmd test`
- `npm.cmd run test:placement`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
  - Reported existing LF/CRLF normalization warnings only.

## Not touched

- Placement scoring logic
- `data/factions.json`
- `data/placement-model.json`
- `assets/js/index.js` runtime contracts
- `assets/js/dossier-radar.js` behavior
- `assets/js/archscry-index2.js` atlas rearrangement logic
- Maze route internals
- Apocrypha route internals
- Root home route structure and `newIndex2.html`

## Follow-up recommendations

- Run a browser-backed pass on `/archscry/` and `/archscry/index2.html` at desktop and mobile widths to tune any spacing or contrast mismatches in the new shared shell.
- If the new shell is approved, consider a smaller cleanup card to remove now-redundant legacy inline Archscry styles instead of maintaining both layers long term.
- If Archscry keeps growing, consider a later extraction of more dossier/result sub-styles into CSS assets so the route pages stop carrying such large inline blocks.

## Next suggested agent

Frontend QA or browser verification focused on live-versus-preview visual polish and responsive spacing.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-087-archscry-shell-modernization.md`
- `docs/kanban/done/VM-082-archscry-placement-atlas-preview.md`
- `docs/handoffs/2026-05-20-1210-codex-archscry-placement-atlas-preview.md`
- `docs/handoffs/2026-05-20-1033-codex-archscry-dossier-identity-matrix-radar.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
