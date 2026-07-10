# Agent Handoff: Codex - VM-479 Plain Reading Syntax Leakage Repair

## Agent Name

Codex

## Task Requested

Implement VM-479: repair the Operator's Hand -> Plain Reading display translator so raw Scryfall/control syntax and display-normalized field tokens do not leak into Plain Reading, while preserving executable Operator's Hand query generation.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-07-2309-codex-vm477-maze-manual-checklist-repair.md`
- `docs/handoffs/2026-07-07-2330-codex-vm478-colorless-catalog-lane-test-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-479-plain-reading-syntax-leakage-repair.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `research/research-syntax-language.js`
- `research/research-syntax-language-tests.js`
- `research/research-mode-tests.js`
- `research/research-mode.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `data/scryfall/grounding/scryfall-grounding.json`

## Files Changed

- `research/research-syntax-language.js`
- `research/research-mode-tests.js`
- `research/research-syntax-language-tests.js`
- `research/research-init.js`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-479-plain-reading-syntax-leakage-repair.md`
- `docs/handoffs/2026-07-08-0004-codex-vm479-plain-reading-syntax-leakage.md`
- `docs/handoffs/HANDOFF_INDEX.md`

`npm.cmd test` also refreshed the existing live gate bias audit outputs as part of the pre-existing test harness behavior; those were not part of the VM-479 implementation scope.

## What Changed

- Added a limited Plain Reading syntax display layer for current Maze/Operator's Hand fields: type, color, identity, set/family, Commander/legal/format, display-control fields, and basic negation for those fields.
- Added set display lookup seeding from the checked-in Scryfall grounding artifact, with small deterministic defaults for Bloomburrow and Final Fantasy families.
- Collapsed known set-family OR groups into friendly labels such as `from the Bloomburrow product family`.
- Rendered known single set codes as `from the <Set Name> set`.
- Preserved unknown set fallback as `from set <code>` only when the code is not known by the display lookup.
- Preserved identity operator meaning:
  - `id=br` -> `Rakdos color identity`
  - `id<=br` -> `within Rakdos color identity`
  - `id>=br` -> `including Rakdos colors`
- Omitted noisy display controls such as `prefer:*`, `game:*`, `order:*`, and `unique:*` from Plain Reading.
- Added leakage assertions and exact repro coverage for the Bloomburrow Commander phrase.
- Added a non-regression check proving Operator's Hand output still contains executable raw Scryfall syntax where expected.
- Closed VM-479 Kanban and documented the architecture boundary.

## Why It Changed

Manual Maze testing showed that a valid Operator's Hand query translated back into Plain Reading as display-normalized syntax such as `set blb`, `prefer best`, `game paper`, `type legendary`, and raw set-family codes. VM-479 repairs that display layer without weakening the actual Scryfall query sent to Scryfall.

## Decisions Made

- Treat VM-479 as display translation only; executable query generation was not changed.
- Use the existing Scryfall grounding artifact for known set and set-family display labels rather than creating a new registry.
- Keep a tiny built-in fallback for Bloomburrow and Final Fantasy so focused translator tests remain deterministic before browser grounding loads.
- Translate in-scope field leakage only; do not expand into a full Scryfall syntax registry.
- Keep `game:paper` omitted by default because it is usually noisy in Plain Reading.

## Risks / Uncertainties

- `research/research-syntax-language.js` is still a bounded translator, not a complete syntax display registry.
- Some older reverse-translation phrasing changed intentionally, such as `creature cards` -> `creature` and `black and red commander identity` -> `within Rakdos color identity`.
- The worktree already contains many unrelated modified and untracked files from prior VM work; this handoff only accounts for the VM-479 files listed above.

## Tests Run

- `node research\research-syntax-language-tests.js` -> passed, 18 syntax translation cases.
- `node research\research-mode-tests.js` -> passed, 7 mode cases and 9 leakage cases.
- `node --check research\research-syntax-language.js` -> passed.
- `node --check research\research-init.js` -> passed.
- `node research\maze-search-tests.js` -> passed.
- `npm.cmd test` -> passed.
- `git diff --check` -> passed with existing line-ending warnings only.

## Not Touched

- Maze/Scryfall executable query generation and compiler semantics beyond display seeding.
- Generated Scryfall grounding artifacts.
- Oracle, regex, artist, flavor, watermark, price, language, date/year, rarity, numeric-stat, and broader syntax registry work outside existing translator behavior.
- Unrelated dirty-tree files from previous VM work.

## Follow-Up Recommendations

- Future VM: expand Plain Reading into a broader Scryfall syntax display registry if more raw Operator syntax needs friendly reverse translation.
- Keep future set-family display changes sourced from `data/scryfall/grounding/scryfall-grounding.json` or its canonical generator, not ad hoc generated artifact edits.
- If more display controls are surfaced intentionally, add human copy and tests rather than letting raw fields fall through.

## Next Suggested Agent

Test Strategist or Planning Architect if the next step is broadening Plain Reading syntax-display coverage; otherwise no specialist handoff is required for VM-479.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-479-plain-reading-syntax-leakage-repair.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- VM-477 manual checklist repair
- VM-478 Colorless catalog lane test repair
