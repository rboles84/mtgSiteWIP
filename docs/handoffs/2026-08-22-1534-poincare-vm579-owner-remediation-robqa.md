# VM-579 Owner-Remediation Independent RobQA Handoff

## Work identity

- Agent name: Poincare (`/root/vm579_remediation_robqa`, independent RobQA)
- Task requested: Independently review the exact VM-579 owner-remediation candidate, rerun the changed-path and protected-contract evidence, exercise the rendered desktop/mobile product, and return one governed verdict without changing implementation or lifecycle state.
- Exact reviewed candidate: `e97eeeae144e5c193594ad2b97c1e5d7d25f53ee`
- Exact parent: `07b5b3e2f44100943283cb782ae34e892f873e32`
- Branch: `main`
- Related card and gates: `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`; `docs/dev/RobDevPass.md`; `docs/qa/RobQAPass.md`; supplied Goal Mode objective.

## Disposition

**PASS — Owner Review Ready**

No correctness, architecture, persistence, placement, telemetry, routing, responsive, or rendered-product blocker was found in the exact reviewed candidate. VM-579 remains `In Progress` pending the owner's bounded recheck.

## Files reviewed

- `AGENTS.md`, the supplied Goal Mode objective, `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, `docs/reference/token-reasoning-cost-control.md`, the current Kanban board/card, handoff index, and recent relevant VM-579 handoffs.
- Exact candidate and parent metadata plus the complete `07b5b3e..e97eeea` runtime/test/governance diff.
- Changed runtime owners: `assets/js/archscry/archscry-presentation.js`, `assets/js/archscry/runtime/dev-review.js`, `assets/js/archscry/runtime/dossier-view.js`, `assets/js/maze/maze-handoff.js`, and `assets/js/maze/research-init.js`.
- Changed focused tests: `tests/archscry/archscry-dev-review-tests.js` and `tests/maze/maze-search-tests.js`.
- Existing authorities and consumers used by the changed path: `data/identity-layers.json`, `data/factions.json`, the production dossier composer/renderer, Maze handoff/path builders, production questionnaire/placement exports, persistent state helpers, telemetry tests, and the Jund certified witness.
- VM-580 through VM-583 backlog cards and exact candidate file scope.

## Files changed

- `docs/handoffs/2026-08-22-1534-poincare-vm579-owner-remediation-robqa.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No runtime, test, card, board, follow-up card, source data, or implementation handoff was modified during independent review.

## Architecture and contract verification

- Direct-review links reuse `buildArchscryMazeContext(...)` and `withArchscryMazeContext(...)`, adding only explicit `contextMode=dossier-review` and `reviewIdentity` fields to the existing URL context.
- Maze validates the review identity through the existing dossier-key resolver, starts review launches without the saved handoff, and stores the review handoff only in the route module's transient memory. It does not serialize a review handoff or manufacture a placement-shaped result.
- Review search paths reuse `buildDossierMazePathEntries(...)` through the shared dossier-path adapter. Normal production paths continue to derive from the real placement result.
- Normal launches conditionally omit review-only fields, retain the production `placementResult`, and use the existing persistent handoff behavior.
- The selector remains derived from loaded active expressions and faction records. `expression.kind` owns grouping; mono order is W/U/B/R/G and other groups use stable current labels. There is no duplicate identity registry.
- Exact candidate inspection found no second renderer, second placement engine, forced winner, score/result editor, persistent-schema change, new dependency, generic QA framework, broad architecture pass, generated-data edit, or VM-580 through VM-583 product implementation.

## Change classification

- QA tier: QA-3, with targeted QA-2/QA-1 rendered interaction and responsive checks.
- Changed behavior: direct-review Archscry-to-Maze transient context and deterministic development-selector taxonomy order.
- Protected behavior intentionally untouched: saved placement/profile bytes, persistent Maze handoff bytes, normal production Jund handoff and placement meaning, placement scoring/ranking/qualification/stopping, telemetry, local/flag gating, mode isolation, provider routing, generated identity meaning, transforms, and VM-580 through VM-583 owners.

## Tests selected and results

- `npm run test:dev-review` — **PASS**. Independently covered the 37-entry authority, taxonomy kinds/counts `5/10/5/5/5/5/1/1`, W/U/B/R/G and Colorless/WUBRG endpoints, Dimir/Jund/Colorless/WUBRG/Silverquill review launches, exact saved placement/profile/persistent handoff/owner-state bytes, Reading Finds source context, normal Jund persistent handoff, telemetry/gating/isolation, and a real Jund engine journey.
- `npm run lint:js` — **PASS**, 31 frontend files.
- `npm run lint:html` — **PASS**.
- `npm run test:gate-b1-runtime` — **PASS**.
- `npm run test:telemetry` — **PASS**.
- `npm run test:frontend-smoke` — **PASS**.
- `npm run test:archscry-transform` — **PASS**.
- `npm run test:maze-finds` — **PASS**.
- `git diff --check 07b5b3e e97eeea` — **PASS**.
- `npm run test:placement` — exits 1 with exactly the Esper visible-copy assertion and Quandrix starter-whitelist-count assertion. An isolated `git archive` of exact parent `07b5b3e` produced the same two failures at the same assertions; these are inherited baselines, not candidate regressions.
- `node tests/maze/maze-search-tests.js` — exits 1 with actual `c:r` versus expected `c:r f:commander`. An isolated `git archive` of exact parent `07b5b3e` produced the same assertion at the corresponding parent line; this is inherited, not candidate-caused. The new launch-resolver assertions execute before that inherited failure, and the changed contract is green in the focused browser-backed suite.

## Tests intentionally skipped

- Exhaustive random journeys, mutation, bias, recovery, and all-37 placement recertification.
- Reason: placement logic, mappings, model data, qualification, stopping, and identity authority are unchanged. The focused real-engine witness, Gate B1 integration, task-mandated placement command, and exact-parent failure reproduction provide proportionate coverage for this QA-3 routing/state change.

## CPU-heavy validation

`NOT REQUIRED`

The existing placement regression command was run because the card explicitly protects placement semantics. No additional heavy decision-engine certification was justified.

## Independent rendered evidence

- Desktop `1440x1000`, taxonomy selector: visually and structurally confirmed 37 entries in mono colors, ten guilds, five colleges, five shards, five wedges, five four-color identities, Colorless, then WUBRG. Mono entries were W/U/B/R/G and the endpoint order was Colorless/WUBRG.
- Desktop `1440x1000`, normal production Jund: completed the six-answer certified real-engine journey through the visible controls, rendered a normal Jund close dossier with placement language, and entered Maze through the real Maze Discovery tab/link. The URL omitted review-only fields; Maze displayed Jund, used BRG paths, and had no horizontal overflow.
- Desktop `1440x1000`, House Dimir: direct URL selection restored UB automatically, rendered the exact review label with zero placement panels/journey claims, and entered Maze with explicit dossier-review/UB context. Maze displayed House Dimir, used UB paths, did not show stale Jund, and had no overflow.
- Desktop `1440x1000`, WUBRG endpoint: direct review entered Maze with `reviewIdentity=WUBRG`, exact WUBRG paths, and the authoritative Five-Color faction and reading labels. No placement claims or overflow appeared.
- Mobile `390x844`, Silverquill College: direct review auto-selected Silverquill, rendered without placement claims, placed the development panel before the app with an eight-pixel flow gap, and had no horizontal overflow. Maze displayed Silverquill College, used WB paths, kept its banner inside the viewport, and showed no overlap/overflow.
- Mobile return journey: `Return to Dossier with Finds` returned to flagged Archscry with `reviewIdentity=SILVERQUILL`; the same direct-review dossier and selector value were restored with zero journey claims and no overflow.
- Browser console: **0 errors** across the independent rendered pass.

## Manual findings converted to invariants

- Finding: a direct review can coexist with a previously produced/saved Jund reading only if Maze follows the reviewed identity.
  - Defect class: cross-route stale-state contamination.
  - Regression invariant: focused cases require explicit reviewed identity/faction/query in the Maze URL and rendered Maze, reject nonmatching saved-Jund copy, and require byte-identical protected storage.
- Finding: review context must not impersonate placement or alter normal handoff semantics.
  - Defect class: semantic/persistence contamination.
  - Regression invariant: review handoff has no placement result and is never persisted; normal Jund retains its placement result and has no review-only fields.
- Finding: systematic review requires authority-derived taxonomy order.
  - Defect class: development-selector ordering drift.
  - Regression invariant: active metadata kinds must produce exact counts `5/10/5/5/5/5/1/1`, W/U/B/R/G mono order, and Colorless/WUBRG endpoints without a handwritten identity list.

## Decisions made

- Classified the two placement failures and one broad Maze failure as inherited only after independent exact-parent reproduction.
- Accepted the narrow module-memory state as a development-review seam because it is route-local, nonserialized, validated, and built on the existing handoff/path machinery.
- Accepted VM-580 through VM-583 as correctly routed follow-ups only; exact candidate inspection confirmed their product owners were not implemented here.

## Risks / uncertainties

- The persistent/transient boundary is cross-route and therefore remains worth keeping in focused regression coverage.
- Existing broad-suite baseline failures remain repository debt, but none contradicts the changed VM-579 contract or differs from exact parent `07b5b3e`.
- No known candidate-specific correctness uncertainty remains.

## Remaining owner judgment

- Confirm the corrected direct-review identity shown by Maze matches the selected dossier in the owner's usual saved-state environment.
- Confirm the selector taxonomy sequence is the desired review workflow.

## Owner review routes

- Ordinary context: `/archscry/?vm-dev-review=1&reviewIdentity=UB`, then `Maze Discovery` -> first link.
- Endpoint/order check: inspect the selector endpoints and use `/archscry/?vm-dev-review=1&reviewIdentity=WUBRG`, then enter Maze.

## What changed and why

This independent review added only its governed evidence record and handoff-index entry so the exact candidate can move to the owner's bounded recheck. No product behavior changed during RobQA.

## Not touched

- Runtime, CSS, tests, package metadata, card/board lifecycle state, source/generated data, persistent schemas, VM-580 through VM-583 implementation, VM-578 identity/branch/card/corpus, merge, push, deployment, closure, or Done transition.

## Follow-up recommendations

- Update only the VM-579 remediation evidence/checklist as needed to reference this exact PASS, keep the card `In Progress`, and ask the owner to perform only the two bounded judgments above.
- Do not merge, push, close, or move VM-579 to Done until owner reacceptance.

## Next suggested agent

Main Goal Mode orchestrator for governance-only PASS recording, followed by the owner for bounded reacceptance.
