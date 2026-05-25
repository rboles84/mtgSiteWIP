# Agent Handoff

## Agent name

Codex

## Task requested

Implement `VM-123` to repair the Archscry quick-reading local-file boot path so `archscry/index.html` no longer depends on root-relative `/data/...` fetches, then update the Kanban and documentation trail.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1430-codex-vm113-topbar-sigil-local-route-archscry-quick-flow-repair.md`
- `docs/handoffs/2026-05-24-1744-codex-vm118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-113-topbar-sigil-local-route-archscry-quick-flow-repair.md`
- `docs/kanban/done/VM-118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `assets/js/index.js`
- `scripts/frontend-smoke.mjs`
- `package.json`

## Files changed

- `assets/js/index.js`
- `scripts/frontend-smoke.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-123-archscry-quick-reading-local-file-boot-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2350-codex-vm123-archscry-local-file-boot-repair.md`

## What changed

- Added a single module-local data URL resolver in `assets/js/index.js` using `import.meta.url`.
- Switched Archscry required data loads for `factions`, `placement-model`, `deck-tags_expanded`, and `identity-layers` to module-resolved URLs instead of root-relative `/data/...` paths.
- Switched Archscry optional discovery index loads to the same module-resolved data path so file-safe and subpath-safe boot behavior stays consistent.
- Added a regression guard in `scripts/frontend-smoke.mjs` that fails if `assets/js/index.js` regains root-relative `/data/...` references.
- Tightened the local-file manual QA checklist to explicitly verify that `file://.../archscry/index.html` avoids the `Placement data missing.` fallback and that `Start the Quick Reading` opens Gate 1.
- Updated the Archscry architecture note and created/completed the `VM-123` Kanban card plus this handoff/index trail.

## Why it changed

The Archscry quick-reading runtime still loaded its JSON through site-root URLs. That worked when the repo was served from the root of a local server, but it broke the intended local-file compatibility path and any hosted subpath deployment. The repair stays narrowly scoped to URL resolution so the placement engine and dossier behavior remain unchanged.

## Decisions made

- Kept the fix confined to `assets/js/index.js` rather than reopening placement logic, dossier presenters, or canonical data.
- Used one shared resolver rooted from `../../data/` relative to the runtime module so hosted and local-file behavior use the same path policy.
- Added the regression guard to the existing frontend smoke script instead of creating a separate Archscry-only checker.
- Promoted the card directly to `done` after verification while preserving the board's unrelated `VM-122` and other current edits.

## Risks / uncertainties

- Plain headless Edge still blocks the Archscry ES module itself on raw `file://` without `--allow-file-access-from-files`, so the automated local-file proof had to use that flag to isolate the data-path repair specifically.
- Because of that browser policy, one normal desktop-browser smoke in the user's actual browser is still recommended if they continue to reproduce a local-file-only failure after pulling this fix.
- The worktree already contained unrelated `docs/architecture/project-atlas.md`, `docs/kanban/board.md`, `docs/reference/manual-test-cases.md`, and `strategium/index.html` edits tied to other work; this pass merged around them and did not normalize or revert them.

## Tests run

- `node --check assets/js/index.js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Headless localhost smoke on `/archscry/index.html` confirming:
  - landing renders
  - no `Placement data missing.` fallback appears
  - `Start the Quick Reading` opens Gate 1
- Headless local-file smoke with `--allow-file-access-from-files` confirming:
  - direct `file://.../archscry/index.html` stays on the landing state without the placement-data fallback
  - `Start the Quick Reading` opens Gate 1

## Not touched

- `assets/js/adaptive-placement.js`
- `data/factions.json`
- `data/placement-model.json`
- `data/identity-layers.json`
- Maze runtime files
- Adjacent-fit presenter logic such as `assets/js/dossier-radar.js`
- `docs/architecture/project-atlas.md`
- `strategium/index.html`

## Follow-up recommendations

- If the user still sees a local-file-only failure in their everyday browser, verify whether that browser blocks ES modules on `file://` before reopening Archscry placement logic.
- If Archscry grows further, consider a future route-local extraction pass similar to `VM-121` so the route carries less inline/runtime coupling and is easier to smoke-test across file and hosted modes.

## Next suggested agent

Frontend QA agent

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-123-archscry-quick-reading-local-file-boot-repair.md`
- `docs/kanban/done/VM-113-topbar-sigil-local-route-archscry-quick-flow-repair.md`
- `docs/kanban/done/VM-118-archscry-adjacent-identity-matrix-sync-repair.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/core-logic-and-algorithms.md`
