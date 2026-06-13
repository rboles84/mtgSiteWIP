# VM-345 - Ravnica Guild Generated Rebuild And Review Gate

ID: VM-345
Title: Ravnica Guild Generated Rebuild And Review Gate
Status: in-progress
Type: generated rebuild / validation / closeout
Area: raw-factions / generated artifacts / validation
Priority: critical
Created: 2026-06-12
Completed: 2026-06-12

## Summary

Rebuild generated guild artifacts through approved scripts, accept only deterministic guild-scoped drift, run validation, and close the VM-343 through VM-345 package with Kanban and handoff documentation.

## Source

User-requested Ravnica Guild Source Normalization goal, governed by VM-300 and VM-325.

## Acceptance Criteria

- [x] Rebuild generated artifacts only through `npm.cmd run build:factions`.
- [x] Run the requested guild-scoped context rebuild.
- [x] Accept only deterministic guild-scoped generated drift from source-role normalization and Rakdos/Golgari calibration.
- [x] Run required validation/tests or document known unrelated failures.
- [x] Close VM-343, VM-344, and VM-345 in Kanban.
- [x] Create the final handoff and update `docs/handoffs/HANDOFF_INDEX.md`.

## Files Likely Impacted

- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-12-*-codex-ravnica-guild-source-normalization.md`

## Risks

- The worktree begins with broad unrelated dirty generated and runtime drift.
- Full rebuilds may surface unrelated generated drift; non-guild drift should be documented and not manually patched as source.
- Some full-suite failures may already exist and must be classified rather than repaired out of scope.

## Implementation Prompt

Run the requested checks in the goal brief. Keep generated output script-produced, compare drift carefully, and record any known unrelated failures in the final handoff.

## Notes

This card ties together the continuous VM-343 through VM-345 Ravnica guild source-normalization goal.

## Outcome

- Ran the full faction builder and the requested targeted context rebuild for `WU,WR,UB,BG,RG,UR,WB,BR,WG,UG`.
- Compared generated artifacts to a prebuild snapshot.
- Final generated drift was limited to `BR` and `BG` in `data/placement-model.json` and `supabase/functions/guild-recruiter/faction-context.ts`.
- `data/factions.json`, `data/archscry-flavor-snippets.json`, and `data/placement-model.schema.json` remained unchanged from the prebuild snapshot.

## Tests

- `node --check research\build-faction-artifacts.mjs`
- `npm.cmd run test:faction-context-isolation`
- Guild raw JSON parse for 50 files
- Generated JSON parse for `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, and `data/archscry-flavor-snippets.json`
- `npm.cmd run build:factions`
- `npm.cmd run build:factions -- --context-targets=WU,WR,UB,BG,RG,UR,WB,BR,WG,UG`
- `npm.cmd run validate:source-generated -- --targets=WU,WR,UB,BG,RG,UR,WB,BR,WG,UG` - passed with 10 accepted model-owned inhibitor warnings
- `npm.cmd run test:source-generated` - passed with 2 accepted model-owned inhibitor warnings
- `node research\archscry-dossier-followup-tests.js`
- `node research\maze-search-tests.js`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `npm.cmd run test:parser`
