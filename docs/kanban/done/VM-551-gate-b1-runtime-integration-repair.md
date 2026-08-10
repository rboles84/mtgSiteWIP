# VM-551 — Gate B1 Runtime Startup Integration Repair

Status: Complete — local candidate; owner natural-reading test next

## Objective

Repair the narrow Archscry startup compatibility defect that rejects the completed Gate B1 generated model before Question 1. Preserve the accepted instrument and placement behavior unchanged.

## Authority

- Branch: `codex/vm551-gate-b1-runtime-integration-repair`
- Worktree: `C:\dev\voxmana.io-vm551-gate-b1-runtime-repair`
- Exact base: `a8dd61dcb2175243c801db484d1a9001742a7b0c`
- Completed model: 16 constructs, 36 behavioral questions, 124 answers, 4/13/19 stages, 37 identities, 123 confusion pairs.

## Scope

1. Trace the production Archscry loader, readiness validation, engine initialization, and first-question selection.
2. Record the exact failed predicate before editing.
3. Repair only the canonical runtime compatibility contract.
4. Add positive completed-model and negative stale/incomplete-model startup coverage.
5. Verify `/archscry/` reaches and waits at the approved C01 Gate question.

## Protected Surfaces

No question or answer semantics, mappings, identity definitions, naming, ranking, routing, scoring, stopping, refinement, Yore behavior, Gate A public states, dossier, Matrix, Maze, persistence, schema, or visual design may change.

## Stop Condition

Stop after one clean local repair commit. Do not push, merge, deploy, or continue owner natural-reading testing.

## Root Cause

`assets/js/index.js` rejected the completed generated model inside `validateQuickReadingReachability()`. Its `countsMatch` predicate still required the earlier 35-question / 110-answer / 18-Crucible shape. The completed model correctly contains 36 behavioral questions, 124 behavioral answers, and 19 Crucible questions, so all three stale comparisons failed before Question 1. The model URL, generated model, schema, version fields, identity rendering keys, and engine initialization were not the failing condition.

## Resolution

- Replaced the duplicated bank-size constants with a shared, versioned runtime validator.
- Kept the exact model/instrument/mapping versions and approved C01–C04 Gate sequence as compatibility authority.
- Validate metadata counts against the loaded structure rather than freezing an intentionally versioned bank size in browser code.
- Retained the safe stale/incomplete failure and added a negative fixture that proves it still fires.
- Made source/model and engine-report checks line-ending-safe in a clean Windows worktree without rewriting generated artifacts.

## Validation

- `npm.cmd run test:gate-b1-model` — PASS: 16 constructs, 36 questions, 124 answers, 37 identities, 123 pairs, 76 directional uses.
- `npm.cmd run test:gate-b1-runtime` — PASS: completed model accepted, fixed C01–C04 sequence preserved, incomplete model rejected.
- `npm.cmd run test:gate-b1-engine` — PASS: 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, unchanged 36/37 responsible-primary boundary.
- `npm.cmd run test:placement` — PASS: 37 legacy golden paths.
- `npm.cmd run lint:js` and Node syntax checks — PASS.
- Minimal local runtime smoke — PASS: `/archscry/` entered C01, remained waiting for input, showed no stale-data state, and logged no browser errors.
- `git diff --check` — PASS.

No instrument semantics, answer contracts, mapping authority, identity definitions, naming, ranking, routing, scoring, stopping, refinement, Yore behavior, Gate A state, dossier, Matrix, Maze, persistence, schema, or generated report/model changed.
