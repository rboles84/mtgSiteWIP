# Agent Handoff: Codex - VM-480 Plain Reading Functional Tag Display Repair

## Agent Name

Codex

## Task Requested

Implement VM-480: keep functional-tag syntax executable in Operator's Hand while translating functional Oracle-tag aliases into human wording in Plain Reading.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-08-0004-codex-vm479-plain-reading-syntax-leakage.md`
- `docs/kanban/board.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `research/research-syntax-language.js`
- `research/research-syntax-language-tests.js`
- `research/research-mode-tests.js`
- `data/scryfall/grounding/plain-reading-semantics.json`

## Files Changed

- `research/research-syntax-language.js`
- `research/research-syntax-language-tests.js`
- `research/research-mode-tests.js`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-480-plain-reading-functional-tag-display-repair.md`
- `docs/handoffs/2026-07-08-0722-codex-vm480-functional-tag-display.md`
- `docs/handoffs/HANDOFF_INDEX.md`

`npm.cmd test` also refreshed the existing live gate bias audit outputs as part of the test harness behavior; those were not part of the VM-480 implementation scope.

## What Changed

- Added display-only parsing for functional Oracle-tag aliases:
  - `otag:`
  - `function:`
  - `oracletag:`
- Added a functional phrase bucket so contextual searches can read naturally, e.g. `commander candidates with counterspells and card draw commander legal`.
- Added known display labels for card draw, counterspells, ramp, board wipes, mana rock effects, treasure effects, and graveyard recursion effects.
- Added unknown tag humanization by removing the field prefix, replacing hyphens/underscores with spaces, and adding `effects` when natural.
- Preserved negation across all three aliases.
- Extended the existing VM-479 leakage helper to reject raw and display-normalized functional-tag leakage for all three aliases.
- Added tests proving Operator's Hand still preserves executable raw `otag:` syntax.

## Why It Changed

The VM-479 display translator fixed many field leaks, but `otag:draw` and `otag:counterspell` still fell through as `otag draw` / `otag counterspell` in Plain Reading. VM-480 closes that leak class while preserving the compiler's preferred executable `otag:` output.

## Decisions Made

- Keep VM-480 display-only; do not change query generation or semantic registry fragments.
- Treat `otag:`, `function:`, and `oracletag:` as equivalent only in reverse display translation.
- Do not add `art:`, `atag:`, or `arttag:` because those are illustration-tag operators and Maze does not currently emit them.
- Keep Oracle text alternatives such as `o:draw` as fallbacks/relaxations, not replacements for functional-tag output.

## Risks / Uncertainties

- The known functional-tag display label list is intentionally small and should grow only as real Maze output needs it.
- The broader Scryfall syntax display registry remains future work.
- The worktree still contains many unrelated modified/untracked files from previous VM work; this handoff only covers the files listed above.

## Tests Run

- `node --check research\research-syntax-language.js` -> passed.
- `node research\research-syntax-language-tests.js` -> passed, 22 syntax translation cases.
- `node research\research-mode-tests.js` -> passed, 9 mode cases and 12 leakage cases.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Not Touched

- Maze/Scryfall executable query generation.
- Semantic registry fragments and generated grounding artifacts.
- Art/illustration tag operators: `art:`, `atag:`, `arttag:`.
- Broader Oracle, regex, artist, flavor, watermark, price, language, date/year, rarity, numeric-stat, and syntax registry work.
- Unrelated dirty-tree files from previous VM work.

## Follow-Up Recommendations

- If future manual checks expose more raw syntax in Plain Reading, expand the display translator through scoped VM tickets rather than broad parser changes.
- If Maze begins emitting art/illustration tag operators, create a separate display ticket for `art:`, `atag:`, and `arttag:`.

## Next Suggested Agent

No specialist needed for VM-480. A future Test Strategist pass could group all syntax-display leakage helpers if the display registry expands.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-480-plain-reading-functional-tag-display-repair.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- VM-479 Plain Reading Syntax Leakage Repair
