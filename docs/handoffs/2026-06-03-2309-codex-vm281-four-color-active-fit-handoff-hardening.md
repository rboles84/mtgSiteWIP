# 2026-06-03 23:09 - Codex - VM-281 Four-Color Active-Fit Handoff Hardening

## Agent Name

Codex

## Task Requested

Investigate why an Archscry-origin Maze link for Glint still showed `WB` in the `sb-section sb-section-dossier` sidebar and identify at least three reasons this class of bug keeps recurring. The reported URL mixed `guild=DUNE`, `fit=GLINT`, `factionName=Glint`, executable `operatorQuery=id=ubrg ...`, and possible stale local storage.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2253-codex-vm280-four-color-maze-handoff-repair.md`
- `docs/handoffs/2026-06-03-2236-codex-vm279-dune-maze-query-archidekt-links.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-280-four-color-maze-handoff-contract-and-deck-start-fallback-repair.md`
- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `maze/index.html`

## Files Changed

- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/kanban/done/VM-281-four-color-active-fit-maze-handoff-hardening.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-03-2309-codex-vm281-four-color-active-fit-handoff-hardening.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Archscry-generated Maze contexts now put the active dossier key into legacy `guild` and preserve the source reading faction separately as `sourceFaction`.
- Maze handoff initialization now resolves active identity through a more explicit precedence chain: URL `fit`, executable operator query, URL faction label, existing fit, then legacy guild.
- Maze active handoff results no longer spread mismatched stale placement result fields into the active sidebar result.
- Added a focused regression for the exact mixed Glint URL shape with stale `WB` localStorage.

## Why It Changed

The reported bug was not a Glint-only display bug. It exposed a weak shared contract where the source reading identity, active dossier fit, executable query identity, and stale placement storage could disagree. If any fallback path trusted the wrong field, the sidebar could fall back to older color scores such as `WB`.

## Decisions Made

- Treat `fit` and executable `operatorQuery` as the active handoff authority for Archscry-origin Maze launches.
- Keep the legacy `guild` field aligned to the active dossier key for future generated links, because older Maze code still treats `guild` as an active identity field.
- Preserve source reading context as `sourceFaction` rather than overloading `guild`.
- Do not delete or clear localStorage; sanitize mismatched stored placement data when building the active result.

## Risks / Uncertainties

- Browser cache can still serve an older `research-init.js` module until the page is hard-refreshed or cache is cleared.
- The worktree already has many unrelated dirty files from prior cards, so diff review must stay scoped.
- The new `sourceFaction` field is presentation/runtime metadata only and should not be promoted into raw or generated data.

## Tests Run

- `node --check assets/js/archscry-presentation.js`
- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node research/maze-search-tests.js`

## Not Touched

- Raw four-color packets
- Four-color research and architecture docs
- Generated JSON/data outputs
- Precon source data
- Routes
- Home preview membership
- Hero behavior
- Schema files
- Reserved `INK` / `WITCH` runtime behavior

## Follow-Up Recommendations

- Hard-refresh the local Maze page after this change to ensure the browser is not using a cached pre-VM-281 `research-init.js`.
- If the issue still reproduces after hard refresh, inspect the live `vm_archscry_maze_handoff_v1`, `vm_last_result`, and `vm_placement_result` localStorage entries for unexpected fields.
- Consider adding a small debug-only handoff inspector for future active/source/query conflicts if these reports continue.

## Next Suggested Agent

Test Strategist if broader browser/manual QA is needed after this focused regression pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-281-four-color-active-fit-maze-handoff-hardening.md`
- `docs/kanban/done/VM-280-four-color-maze-handoff-contract-and-deck-start-fallback-repair.md`
- `docs/handoffs/2026-06-03-2253-codex-vm280-four-color-maze-handoff-repair.md`
