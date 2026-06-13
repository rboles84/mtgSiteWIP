# 2026-06-04 07:14 - Codex - VM-284 Quandrix Golden-Path Calibration

## Agent Name

Codex

## Task Requested

Implement VM-284 to repair the known unrelated placement-suite failure where the QUANDRIX adaptive golden path resolved to mono-Blue `U`, while preserving unrelated dirty four-color, hero, docs, Maze, raw, research, architecture, generated, Home preview, route, schema, and public-alias work.

## Pre-Flight Summary

- Recent related work in VM-257, VM-280, VM-281, and VM-283 repeatedly recorded the same QUANDRIX golden-path failure as unrelated follow-up work.
- VM-283 explicitly recommended splitting the QUANDRIX failure into a separate repair card if the full quick-reading suite needed to become green.
- VM-284 was free at pre-flight; VM-282 and VM-283 were already complete and were not reused.
- The worktree was already broadly dirty with recent four-color, Dune hero, generated, docs, and Maze work.
- The target risk was placement calibration drift, not lore/source authority, Maze behavior, route behavior, Home preview, hero rollout, or public key exposure.
- The initial plan's `0.55` estimate was treated as a hypothesis requiring verification after regeneration, not proof.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2137-codex-vm257-dune-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-03-2253-codex-vm280-four-color-maze-handoff-repair.md`
- `docs/handoffs/2026-06-04-0012-codex-vm283-four-color-handoff-field-consistency.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-283-four-color-handoff-field-consistency-contract.md`
- `research/build-faction-artifacts.mjs`
- `data/placement-model.json`
- `data/factions.json`
- `assets/js/quick-reading-tests.js`
- `research/presentation-snapshot-cases.json`
- `research/presentation-snapshot-runner.mjs`
- `research/presentation-snapshot-tests.js`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files Changed

- `research/build-faction-artifacts.mjs`
- `data/placement-model.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-284-quandrix-golden-path-calibration-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0714-codex-vm284-quandrix-golden-path-calibration.md`

## What Changed

- Created VM-284 as the scoped active repair card, then moved it to Done after implementation.
- Updated `QUESTION_BANK.gate[id="gate_pressure_trust"].answers[title="Information advantage"].likelihoods.QUANDRIX` from `0.25` to `0.35`.
- Regenerated builder-derived placement/runtime artifacts through `npm.cmd run build:factions`.
- Confirmed `data/placement-model.json` carries `"QUANDRIX": 0.35` for the target answer.
- Confirmed the generated schema write from the builder was a tracked no-op.
- Updated the board and handoff index.

## Why It Changed

The QUANDRIX golden path chose `Information advantage` early because the copy says hidden structure is visible, but the old `QUANDRIX: 0.25` calibration was too weak and let mono-Blue `U` win the target path. Raising the value to `0.35` gives Quandrix enough recognition for hidden structure without stealing the existing mono-Blue boundary presentation fixture.

## Decisions Made

- Did not use the initially proposed `0.55` value after execution-time verification showed it fixed QUANDRIX but changed the `mono-blue-boundary` presentation fixture result from `U` to `QUANDRIX`.
- Chose `0.35` because the execution-time sweep showed `0.28` through `0.35` fixed all golden paths while preserving the mono-Blue fixture, and `0.35` was the strongest stable value in that band.
- Treated the remaining Temur Maze query-ordering assertion as separate work rather than widening VM-284.
- Did not edit raw packets, research docs, architecture docs, Maze source, Home preview, hero assets/mappings, routes, aliases, schemas, public APIs, or unrelated dirty files.

## Risks / Uncertainties

- The broad quick-reading suite is still red after the QUANDRIX repair because a separate Temur Maze query-ordering assertion fails: expected `/^id=urg is:commander f:commander /`, actual `id=gur is:commander f:commander (o:combat OR o:"attack matters" OR o:equipment OR o:weapons OR o:tokens OR o:"token army" OR o:voltron OR o:"suit up")`.
- The worktree remains broadly dirty with preserved unrelated changes.
- `data/factions.json` was already dirty before VM-284 and was not intentionally modified by this repair.

## Tests Run

- `node --check research/build-faction-artifacts.mjs` - passed.
- `npm.cmd run build:factions` - passed; built 33 placement records and wrote builder outputs.
- Focused regenerated golden-path sweep - passed; 33/33 golden paths, QUANDRIX resolved to `QUANDRIX` with confidence `0.599`.
- Execution-time threshold sweep - confirmed `0.55` steals the mono-Blue boundary fixture and `0.35` preserves it.
- `npm.cmd run test:presentation-snapshots` - passed; 16 fixed cases.
- `node research/archscry-dossier-followup-tests.js` - passed.
- `npm.cmd run audit:factions` - passed.
- `git diff --check` - passed with existing CRLF warnings only.
- `npm.cmd run test:placement` - failed on unrelated Temur Maze query-ordering assertion.
- `node assets/js/quick-reading-tests.js` - failed on the same Temur assertion.
- `npm.cmd test` - failed on the same Temur assertion through `research/run-tests.js`.

## Not Touched

- `data/raw-factions/**`
- `docs/research/**`
- `docs/architecture/colors/**`
- Maze source files
- Home preview logic or membership
- identity-hero assets or mappings
- route files
- alias contracts
- schema contracts
- public API behavior
- unrelated dirty files

## Follow-Up Recommendations

- Open a separate scoped repair for the Temur Maze query-ordering assertion if the broad quick-reading suite needs to go fully green.
- Keep the QUANDRIX calibration at `0.35` unless a future placement calibration pass updates presentation fixtures and adjacent boundary expectations together.

## Next Suggested Agent

Codex main agent or Test Strategist for a separate Temur Maze query-ordering repair card.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-284-quandrix-golden-path-calibration-repair.md`
- `docs/kanban/done/VM-283-four-color-handoff-field-consistency-contract.md`
- `docs/handoffs/2026-06-04-0012-codex-vm283-four-color-handoff-field-consistency.md`
