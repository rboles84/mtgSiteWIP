# 2026-05-25 18:58 - Codex - VM-129C Maze Atmosphere Convergence

## Agent Name

Codex

## Task Requested

Implement VM-129C: finish Maze convergence with the `newIndex2.html` / Strategium rich atmosphere family, patch the shared atmosphere canvas reuse bug, and minimally unbreak Archscry's hidden stars/orbs layer without changing Maze parser/search/stash/modal behavior or route compatibility.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-1100-codex-vm129-maze-search-console-redesign.md`
- `docs/handoffs/2026-05-25-1618-codex-vm129b-maze-visual-alignment.md`
- `docs/handoffs/2026-05-25-1719-codex-archscry-dossier-console.md`
- `docs/handoffs/2026-05-25-1838-codex-archscry-dossier-onboarding-trust-pass.md`
- `docs/kanban/board.md`
- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/atmosphere.js`
- `assets/js/archscry-atmosphere.js`
- `assets/js/newindex2.js`
- `assets/js/strategium.js`
- `archscry/index.html`
- `assets/css/archscry.css`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/vm-rich-atmosphere.js`
- `assets/js/atmosphere.js`
- `archscry/index.html`
- `assets/css/archscry.css`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-129C-finish-maze-convergence-atmosphere-fault-lines.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-1858-codex-vm129c-maze-atmosphere-convergence.md`

## What Changed

- Added `assets/js/vm-rich-atmosphere.js`, a reusable rich star/orb runtime that initializes only for routes with `data-vm-atmosphere="rich"`.
- Updated `/maze/` to opt into the rich runtime, preserving the existing `.vm-bg__stars` canvas and all protected Maze hooks.
- Updated `/archscry/` to opt into the rich runtime and removed `data-bg-clean="true"` so the atmosphere canvas is no longer hidden by shared CSS.
- Patched `assets/js/atmosphere.js` so existing `.vm-bg__stars` canvases are reused, sized, DPR-scaled, and painted instead of causing a silent early return.
- Retuned Maze route styling away from teal-forward opaque panels and toward the Home/Strategium black-glass, gold-accent, Cinzel-led shell.
- Added Archscry route-local compensation so removing clean mode does not restyle the route into Home/Strategium: the nebula stays suppressed, image masking is neutralized, and the darker route feel is preserved.
- Updated Kanban, manual test notes, and the handoff index for VM-129C closeout.

## Why It Changed

The VM-129 and VM-129B Maze work corrected much of the shell, but the route still did not actually share the live Home/Strategium atmosphere behavior. The root issues were split across duplicated atmosphere implementations, a broken shared canvas guard, and Archscry hiding its own canvas through `data-bg-clean`. VM-129C converges the route behavior with the smallest safe runtime extraction and leaves the Scryfall tool behavior alone.

## Decisions Made

- Used an explicit `data-vm-atmosphere="rich"` opt-in instead of route class guards.
- Extracted from the Archscry atmosphere implementation because its parameters match the Home/Strategium rich family closely enough for this pass.
- Left `newIndex2.html` and Strategium on their current local atmosphere runtimes to avoid introducing a second renderer or widening scope.
- Kept Archscry visually darker than Home/Strategium; only the hidden stars/orbs layer was unblocked.
- Kept `/maze/` as the only active Maze route and did not recreate `maze.html`.
- Preserved the existing Maze scratchpad layout fix from VM-129B.

## Risks / Uncertainties

- There are still multiple rich atmosphere runtimes in the repo. VM-129C introduces a shared opt-in path for Maze and Archscry, but it intentionally does not retire the Home/Strategium local renderers.
- The worktree already contained VM-130/VM-131 Archscry changes before this pass; this task worked with those files without reverting unrelated edits.
- Full live Scryfall result behavior depends on network availability; automated checks covered parser/frontend smoke behavior and browser layout/runtime state.

## Tests Run

- `node --check research\research-init.js`
- `node --check research\research-ui.js`
- `node --check assets/js/vm-rich-atmosphere.js`
- `node --check assets/js/atmosphere.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:parser`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Browser/Puppeteer checks for `/maze/` desktop and mobile, `/archscry/` desktop, reduced-motion static canvas rendering, canvas sizing, nonblank pixels, and scratchpad overlap.

## Not Touched

- Maze parser/search/stash/modal logic in `research/*`.
- Protected Maze IDs, `ARCHSCRY_MAZE_HANDOFF_KEY`, `STASH_KEY`, helper searches, recent searches, pagination, modal hooks, and `/maze/?q=...`.
- `newIndex2.html` and Strategium local atmosphere runtimes.
- Apocrypha visual normalization.
- Site-wide font policy beyond the Maze route shell.

## Follow-Up Recommendations

- Consolidate Home and Strategium onto `vm-rich-atmosphere.js` in a later dedicated atmosphere cleanup once screenshots confirm exact parity.
- Add a dedicated Maze visual regression harness similar to Archscry and Strategium.
- Keep Apocrypha normalization separate so this convergence pass does not blur the archive route's distinct branch.

## Next Suggested Agent

Test Strategist for a dedicated Maze visual regression harness, or Planning Architect for a narrow route-family atmosphere consolidation card.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-129C-finish-maze-convergence-atmosphere-fault-lines.md`
- `docs/handoffs/2026-05-25-1100-codex-vm129-maze-search-console-redesign.md`
- `docs/handoffs/2026-05-25-1618-codex-vm129b-maze-visual-alignment.md`
