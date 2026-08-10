# VM-551 — Gate B1 Qualified Alternatives Result Contract Repair

Status: Complete

## Objective

Repair the narrow calculated-result contract defect that allowed a Gate B1 close result to claim an undefined secondary identity and prevented qualified Gate B1 observations from reaching the production explanation renderer.

## Authority

- Branch: `codex/vm551-gate-b1-qualified-alternatives-repair`
- Worktree: `C:\dev\voxmana.io-vm551-gate-b1-alternatives-repair`
- Exact base: `6e262923aebb401fc96711389673c4e1f9a5db2f`

## Scope

1. Trace `finalizeReading()` through the Gate A adapter, public match arrays, result-state presentation, dossier adjacent rendering, and evidence explanation input.
2. Record the exact incompatible field or predicate before editing.
3. Repair only the canonical adapter contract; do not duplicate alternative authority.
4. Add pure focused and large deterministic valid-journey malformed-result coverage.
5. Verify one calculated close result names its qualified secondary in local Archscry.

## Protected Surfaces

Do not change scoring, mappings, routing, questions, answers, stable IDs, naming qualification, stopping, instrument behavior, generated model/data, identity definitions, dossier section definitions, Matrix, Maze, persistence, schema, or visual design.

## Stop Condition

Stop after one clean local commit. Do not push, merge, deploy, migrate, score, recruit, shadow-test, certify, or begin another VM-551 task.

## Root Cause

- The Gate B1 engine emitted a `close` state with only its primary in `top_matches` and no qualified record in `adjacent_matches` or `alternatives`; the Gate A adapter trusted that incompatible state, and presentation interpolated a missing alternative name as `undefined`.
- Gate B1 qualification records use `identity` / `identity_name`, while production match rendering expects complete `faction` / `faction_name` objects.
- The production explanation path understood legacy `evidence_trail[].deltas`, but not Gate B1 `positive_support`, `contradiction`, `mapping_strength`, or `bounded_observation`, so qualified answer-derived evidence fell through to the missing-detail message.

## Resolution

- Added one canonical Gate B1 public-result normalization layer that resolves only independently qualified alternatives to complete production match objects and enforces state-specific public cardinality.
- Downgrades an orphan `close` to `primary`; never fabricates a runner-up.
- Permits no alternative for `primary`, one qualified secondary for `close`, qualified co-leader data for `tied`, and at most two independently qualified directions for `mixed`.
- Added a presentation-only evidence adapter from the native Gate B1 ledger into the existing production explanation contract without mutating the native ledger or inventing prose.

## Validation

- Focused contract suite passed fixed primary, close, tied, mixed, unqualified-runner-up, evidence, and 5,000 deterministic valid-journey cases.
- Full Gate B1 engine validation passed 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, and 921 mutations.
- Runtime, model, legacy placement, source/generated, syntax, lint, and whitespace checks passed.
- Local calculated close-result smoke rendered `Close result: Jund, with Red also supported`, one close-alternative card, and answer-derived Red evidence with no `undefined` or missing-evidence fallback.

## Boundaries Preserved

No scoring, mappings, routing, questions, answers, naming qualification, stopping, refinement, generated model/data, identity authority, dossier definitions, Matrix, Maze, persistence, schemas, or visual design changed. Nothing was pushed, merged, deployed, migrated, scored, certified, recruited, shadow-tested, or player-validated.
