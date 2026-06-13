# 2026-06-04 00:12 - Codex - VM-283 Four-Color Handoff Field Consistency

## Agent Name

Codex

## Task Requested

Implement the requested four-color handoff field consistency pass as a focused runtime and test hardening task. The requested `VM-282` ID became occupied by a parallel in-progress card during execution, so this pass was moved to the next free ID, `VM-283`, without renumbering the existing card.

Normalize live `YORE`, `GLINT`, and `DUNE` handoffs to the `Key + Label` contract while keeping `INK`, `WITCH`, `RGWU`, and `GWUB` guarded and non-live.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2309-codex-vm281-four-color-active-fit-handoff-hardening.md`
- `docs/handoffs/2026-06-03-2253-codex-vm280-four-color-maze-handoff-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-281-four-color-active-fit-maze-handoff-hardening.md`
- `docs/kanban/done/VM-280-four-color-maze-handoff-contract-and-deck-start-fallback-repair.md`
- `docs/kanban/backlog/VM-263-ink-controlled-runtime-promotion.md`
- `docs/kanban/backlog/VM-269-witch-controlled-runtime-promotion.md`
- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `assets/js/quick-reading-tests.js`

## Files Changed

- `assets/js/archscry-presentation.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `assets/js/quick-reading-tests.js`
- `docs/kanban/done/VM-283-four-color-handoff-field-consistency-contract.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-04-0012-codex-vm283-four-color-handoff-field-consistency.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- `buildArchscryMazeContext()` now emits `sourceFaction` only for live four-color handoffs whose source reading differs from the active dossier key.
- `withArchscryMazeContext()` now carries non-empty `sourceFaction` into generated Maze URLs.
- Maze restore now treats live four-color `fit` as the active authority and normalizes stale `guild` and `factionName` back to `YORE` / `Yore`, `GLINT` / `Glint`, or `DUNE` / `Dune`.
- Live four-color active display labels now prefer the approved display name over stale handoff or placement-result labels.
- Non-live raw four-color codes are blocked from creating sidebar paths through generic four-letter mana-code fallback.
- Added focused tests for generated context shape, generated URL params, stale restore normalization, stale public label suppression, and reserved `INK` / `WITCH` / `RGWU` / `GWUB` non-live behavior.

## Why It Changed

VM-281 made active `fit` authoritative, but this pass tightened the field contract so every live four-color handoff consistently separates active public identity from source reading metadata. This prevents recurring mixed-field bugs where stale `guild`, `factionName`, localStorage, or color-code values become public active labels.

## Decisions Made

- Kept the user-approved `Key + Label` contract: `guild` and `fit` are active uppercase keys, while `factionName` is the display label.
- Kept `sourceFaction` as runtime metadata only and only when source differs.
- Kept `INK`, `WITCH`, `RGWU`, and `GWUB` guarded and non-live.
- Blocked non-live four-letter raw color codes from generic sidebar fallback without changing live color-code permutation resolution for `YORE`, `GLINT`, or `DUNE`.
- Moved this pass to `VM-283` after a parallel in-progress `VM-282` appeared in `docs/kanban/board.md`.

## Risks / Uncertainties

- The full `node assets/js/quick-reading-tests.js` suite still fails on the known unrelated QUANDRIX golden-path assertion before the full file can complete.
- Browser cache may still require a hard refresh before local UI reflects the latest `research-init.js`.
- The broader worktree contains unrelated dirty files from previous cards and parallel card work; this pass stayed scoped to the VM-283 files listed above.

## Tests Run

- `node --check assets/js/archscry-presentation.js`
- `node --check research/research-init.js`
- `node --check research/maze-search-tests.js`
- `node --check assets/js/quick-reading-tests.js`
- `node research/maze-search-tests.js`
- focused `node --input-type=module -e "...buildArchscryMazeContext / withArchscryMazeContext checks..."`
- `node assets/js/quick-reading-tests.js` - fails on known unrelated QUANDRIX golden-path assertion: expected `QUANDRIX`, got `U`.

## Not Touched

- Raw packets
- Research packets
- Generated data
- Routes
- Home preview
- Hero content
- Schemas
- Precon-source contracts
- Deck-start ownership
- Ink or Witch live activation
- Unrelated dirty worktree changes

## Follow-Up Recommendations

- Split the existing QUANDRIX golden-path failure into a separate repair card if the full quick-reading suite needs to be green.
- Hard-refresh the local Maze page before browser retesting to avoid cached module behavior.

## Next Suggested Agent

Test Strategist for any browser/manual QA pass, or Codex main agent for a separate QUANDRIX quick-reading repair card.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-283-four-color-handoff-field-consistency-contract.md`
- `docs/kanban/done/VM-281-four-color-active-fit-maze-handoff-hardening.md`
- `docs/kanban/done/VM-280-four-color-maze-handoff-contract-and-deck-start-fallback-repair.md`
