# 2026-05-27 08:37 - Codex - VM-012 Maze Cache Boot Repair

## Agent Name

Codex

## Task Requested

Investigate and repair the post-VM-012 Maze regression where opening `maze/index.html` showed missing Discovery Paths, Helper Searches, By Color shortcuts, and inert Operator's Hand / Loom controls until a hard refresh.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-0814-codex-vm012-parser-diagnostics-closeout.md`
- `docs/kanban/board.md`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `research/scryfall-dictionary.js`
- `maze/index.html`
- `scripts/frontend-smoke.mjs`

## Files Changed

- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-27-0837-codex-vm012-maze-cache-boot-repair.md`

## What Changed

- Removed Maze runtime's static dependency on the newly added `getScryfallDictionaryVocabulary` export so an older cached `scryfall-dictionary.js` module cannot abort `research-init.js` during module linking.
- Kept Loom autocomplete dictionary-backed by deriving keyword suggestions locally from the loaded parser dictionary and merging the legacy keyword fallback list.
- Added a Maze DOM boot regression path that dispatches the `load` handler and verifies Discovery Paths, Helper Searches, By Color, type chips, rarity chips, and default Plain Reading mode are initialized.
- Adjusted Maze metadata test expectations to account for the real initialized Commander sidebar default when quick searches run.

## Why It Changed

The user's Ctrl+Shift+R result strongly indicated a browser module-cache mismatch: the fresh `research-init.js` could request a named export from a stale cached dictionary module, preventing Maze's load handler from building sidebars and binding controls. The fix keeps the VM-012 vocabulary behavior while making Maze boot tolerant of that cache state.

## Decisions Made

- Did not revert VM-012 parser/data/diagnostics work.
- Did not add cache-busting query strings, network validation, build downloads, new routes, panels, or UI redesign.
- Left the exported dictionary vocabulary helper in `research/scryfall-dictionary.js` for parser/data tests and future non-runtime consumers.
- Strengthened the existing Maze test harness instead of adding a separate browser-only test.

## Risks / Uncertainties

- In-app Browser QA was previously blocked by the browser runtime setup failure, so this repair relies on the user-observed hard refresh recovery plus automated DOM boot coverage and smoke tests.
- The working tree still contains unrelated VM-088 and VM-149 changes; this handoff only covers the VM-012 Maze boot repair.

## Tests Run

- `node --check research/research-init.js` - passed.
- `node --check research/maze-search-tests.js` - passed.
- `node --check research/scryfall-dictionary.js` - passed.
- `node research/maze-search-tests.js` - passed.
- `npm.cmd run test:parser` - passed, 115 parser cases.
- `npm.cmd test` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.

## Not Touched

- No VM-022 work.
- No Maze visual redesign or CSS edits.
- No stash/modal/Archscry handoff contract changes.
- No Scryfall bulk download logic, network-backed parsing, or generated remote cache files.
- No unrelated VM-088 or VM-149 changes were reverted.

## Follow-Up Recommendations

- If this class of issue recurs, consider a project-wide static module cache policy for public routes, but keep it separate from VM-012.
- Keep the Maze boot assertions in `research/maze-search-tests.js` as a guard for future route initialization changes.

## Next Suggested Agent

Human review

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/handoffs/2026-05-27-0814-codex-vm012-parser-diagnostics-closeout.md`
