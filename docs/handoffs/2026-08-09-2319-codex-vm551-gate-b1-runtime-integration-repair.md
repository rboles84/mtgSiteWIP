# VM-551 Gate B1 Runtime Startup Integration Repair Handoff

## Agent name

Codex

## Task requested

Repair the narrow runtime integration defect that rejected the completed Gate B1 generated model before real Archscry could render Question 1. Preserve the accepted instrument candidate at `a8dd61dcb2175243c801db484d1a9001742a7b0c`, add focused positive and negative startup coverage, verify the real local route, and stop after one unpushed commit.

## Files reviewed

- `archscry/index.html`
- `assets/js/index.js`
- `assets/js/gate-b1-placement-engine.js`
- `assets/js/quick-reading-tests.js`
- `data/gate-b1-placement-model.json`
- `data/factions.json`
- `data/identity-layers.json`
- `scripts/build-gate-b1-placement-model.mjs`
- `scripts/validate-gate-b1-placement-engine.mjs`
- `scripts/lint-frontend-js.mjs`
- Relevant VM-551 completion handoff, plan, Kanban, and board records

## Files changed

- `assets/js/gate-b1-runtime-contract.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `scripts/vm551-gate-b1-runtime-integration-tests.mjs`
- `scripts/build-gate-b1-placement-model.mjs`
- `scripts/validate-gate-b1-placement-engine.mjs`
- `scripts/lint-frontend-js.mjs`
- `package.json`
- `docs/kanban/done/VM-551-gate-b1-runtime-integration-repair.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-08-09-2319-codex-vm551-gate-b1-runtime-integration-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Moved Gate B1 runtime readiness into a shared, directly testable validator used by `assets/js/index.js`.
- Preserved exact model, instrument, and mapping versions; exact fixed C01–C04 Gate IDs/order; ID uniqueness; required engine fields; identity rendering coverage; journey limits; source provenance; and safe failure behavior.
- Removed independently frozen total-question, answer, and stage-bank counts from browser startup. Generated metadata counts must instead agree with the model structure actually loaded.
- Added a focused test that accepts the completed 16/36/124/37/123, 4/13/19 model, proves the engine selects C01–C04 first, and rejects a genuinely incomplete clone with the same public error.
- Updated the legacy placement assertion to locate the public error in its new canonical module.
- Normalized line endings only during generated-model/report comparisons so clean Windows checkouts validate the accepted artifacts without rewriting them.

## Why it changed

The exact failed startup predicate was `countsMatch` in `validateQuickReadingReachability()`. It still required 35 behavioral questions, 110 behavioral answers, and 18 Crucible questions. The completed model correctly contains 36, 124, and 19, so the predicate failed immediately after data loading and before engine initialization. This is a stale runtime count contract, not a wrong path, stale generated model, schema mismatch, or placement-model defect.

## Decisions made

- Bank size is versioned model metadata, not a separately frozen browser constant.
- Runtime compatibility remains strict through versions, fixed Gate authority, structural/schema invariants, canonical references, source provenance, journey bounds, and renderable identities.
- A model whose metadata no longer matches its structure still fails closed with the existing public message.
- The accepted generated model and machine-readable engine reports remain byte-for-byte untouched.

## Risks / uncertainties

- This task proves startup and existing deterministic behavior, not natural-reading quality.
- The next authorized action is owner natural-reading testing. No placement result was completed during the smoke check.
- The model checker continues to accept historical source hashes created from either LF-normalized or raw checkout bytes, but only when the source differs solely by line-ending representation; semantic model comparison remains exact.

## Tests run

- `npm.cmd run test:gate-b1-model` — PASS; 16 constructs, 36 questions, 124 answers, 37 identities, 123 pairs, 76 directional uses.
- `npm.cmd run test:gate-b1-runtime` — PASS; completed model accepted, fixed Gate preserved, incomplete clone rejected.
- `npm.cmd run test:gate-b1-engine` — PASS; 5,000 journeys, 37 identities, 123 pairs, 6,660 synthetic runs, 921 mutations, 36/37 responsible primaries.
- `npm.cmd run test:placement` — PASS; 37 factions and 37 legacy golden paths.
- `npm.cmd run lint:js` — PASS for nine frontend files.
- Node syntax checks for all changed JavaScript/MJS files — PASS.
- `git diff --check` — PASS.
- Local static-server smoke at `http://127.0.0.1:4174/archscry/` — PASS; Quick Reading reaches approved C01, remains waiting after three seconds, shows no stale/incomplete error, and logs no console errors. Port 4174 was used because an unrelated existing owner server already occupied 4173; the route and static files were otherwise identical.

## Not touched

- The 36-question instrument semantics and all player-facing wording
- The 124 answer contracts
- The 36 completion mappings and historical 40 mappings
- Naming qualification, ranking, routing, scoring, stopping, refinement, and Yore behavior
- Identity definitions and certified authority
- Gate A public states, dossier, Matrix, Maze, persistence, schemas, and visual presentation
- `data/gate-b1-placement-model.json` and all generated engine reports
- Deployment, migration, player validation, recruitment, shadow testing, certification, push, and merge

## Follow-up recommendations

Owner should launch this repair worktree and take the actual calculated Archscry reading naturally several times. Any placement-quality finding should be handled as a separate authorized task rather than folded into this startup repair.

## Next suggested agent

Owner natural-reading test; no agent task is authorized beyond this handoff.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-551-gate-b1-runtime-integration-repair.md`
- `docs/kanban/done/VM-551-gate-b1-instrument-completion.md`
- `docs/handoffs/2026-08-09-2248-codex-vm551-gate-b1-instrument-completion.md`
- Exact base: `a8dd61dcb2175243c801db484d1a9001742a7b0c`
- Final repair commit: the commit containing this handoff; exact SHA returned to the owner.
