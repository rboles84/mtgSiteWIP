# VM-579 - Archscry Dev Review + Placement Validation

ID: VM-579
Title: Archscry Dev Review + Placement Validation
Status: In Progress
Type: Developer tooling / route-local QA
Area: Archscry
Priority: High
Created: 2026-08-22

## Summary

Add a local-only, explicit-flag Archscry QA panel with two isolated modes: direct identity dossier review through the current production renderer, and inspection of the current production placement journey. The work must expose narrow development seams only; it must not create another renderer, another placement engine, a duplicate registry, a generic QA platform, or a broad Archscry refactor.

## Source

- Owner request: expose clean development seams into the existing production dossier renderer and placement engine; stop instead of expanding into broad architectural rework.
- Supplied goal context: `C:\Users\obake\Downloads\archscry-dev-review-placement-validation-goal.md`.
- Governing implementation and QA gates: `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`.

## RobDev Preflight

1. The current dossier renderer receives identity through `runtime/dossier-view.js::renderResult`, which derives an allowed view key from the active placement result and passes it to `dossier/reading.js::buildCommanderDossier` as `targetFactionKey`.
2. DOM rendering is moderately coupled to placement state: `renderResult` reads `APP_STATE.activeResult`, derives Gate A state and alternatives, caches the result, writes the Maze handoff, and renders journey-only summary/fit/refinement/save controls. The underlying dossier composer already treats many placement inputs as optional, but currently rejects a missing `placementResult` at its public entry.
3. Journey-derived sections are the result-state banner/summary strip, Why This Fit observations, adjacent/co-leader comparison state, refinement controls, save/retake/history language, account-placement context, and reading-specific Maze handoff/reflection.
4. Identity-authored sections already render from faction/catalog data: hero/thesis, Start Here, Test the Fit, How This Plays, Sound, Play, Commander starts, Card Signals, Mana Notes, approved media/details/tooltips, precons, and general Maze discovery paths.
5. Placement persistence occurs through shared `vm_cachePlacementResult`, profile save helpers, restore boot logic, and the `vm_archscry_maze_handoff_v1` localStorage handoff.
6. Placement telemetry occurs only at questionnaire lifecycle seams in `runtime/questionnaire.js` through the isolated `vox-telemetry.js` adapter.
7. Reusable engine inspection already exists in `gate-b1-placement-engine.js`: adaptive state, evidence ledger, ranking, routing trace, stopping, refinement, and finalization exports. Existing all-37 witnesses and live replay tooling remain certification/reachability evidence and will not be used to force validator outcomes.
8. `data/identity-layers.json` is the authoritative active identity registry; the loaded `APP_STATE.identityLayers.expressions` surface currently aligns with 37 generated faction/model records.
9. The current Placement Manual equivalent is the generated all-37 witness/review collection under `docs/audits/vm551-all-37-dossier-closeout/`, produced by `scripts/build-vm551-all-37-live-witnesses.mjs` and related visual-review tooling from the production engine.
10. The smallest direct-render seam is to let the existing dossier composer and existing route renderer accept an explicit identity-review context with no placement result, branch only at journey-owned side effects/presentation, and keep the selected identity in the dev module rather than placement state.

Preflight conclusion: The implementation reuses the existing production dossier renderer and production placement engine. It does not create a second renderer, a second placement engine, a duplicate identity registry, a generic QA framework, or a broad Archscry refactor.

## RobDevPass Contract

- Product outcome: on approved local hosts, `?vm-dev-review=1` exposes direct dossier review and real-engine inspection; normal and nonlocal Archscry remain unchanged and inert.
- Current behavior: dossiers require a stored/current placement result, and engine internals are visible only through test/replay tooling.
- Locked decisions: direct review never fabricates journey state; engine validation never accepts a target identity; both modes are isolated; production, persistence, telemetry, and placement semantics remain protected.
- Owning layer: route-local development activation belongs in `assets/js/archscry/index.js` and a small `runtime/dev-review.js`; dossier presentation seams belong in `runtime/dossier-view.js` and DOM-free composition in `dossier/reading.js`; the existing Gate B1 engine remains the sole decision owner.
- Changed behavior: explicit local development review only.
- Protected behavior: production boot, placement scoring/ranking/qualification/stopping, identity meaning, generated data, telemetry schemas/provider behavior, saved/profile/cache state, Maze handoff, normal dossier rendering, and VM-576 transform behavior.
- Consumers/blast radius: normal result rendering and all current dossier-builder consumers must retain their existing required-result contract unless explicitly invoking direct-review mode.
- Relevant states: missing/invalid identity, switching modes in both directions, saved result before/after review, no flag, nonlocal host, desktop/mobile containment, keyboard-operable controls, and a normal plus boundary/refinement engine journey.
- Smallest complete implementation: one early local/flag gate, one route-local panel, one direct-review option through the production dossier builder/renderer, and read-only inspection around the real questionnaire state.
- Non-goals: no model/data changes, replay editor, score editor, charts, second questionnaire, forced winner, framework, dependency, deployment change, or architecture pass.
- Stop condition: if the production renderer cannot accept a no-placement review context without broad decomposition or if current telemetry/runtime work overlaps these owners in flight, stop and report.

## QA Classification

- QA tier: QA-3 for route gating, mode transitions, persistence isolation, and visible state; placement decision logic itself remains unchanged.
- CPU-heavy validation: NOT REQUIRED beyond the task-mandated existing placement regression command. Exhaustive journey, mutation, bias, recovery, and all-37 certification suites do not protect a changed placement contract because none is changing.
- Required focused and existing checks: dev-review focused suite, JS/HTML lint, placement, Gate B1 runtime, telemetry, frontend smoke, and `git diff --check`.
- Rendered QA: representative dossier identities on desktop/mobile plus one normal and one boundary/refinement real-engine journey.

## Acceptance Criteria

- [x] Panel initializes only for `localhost`, `127.0.0.1`, or `::1` with `vm-dev-review=1`.
- [x] Production/nonlocal hosts and unflagged local URLs remain inert.
- [x] Selector derives all active identities from the authoritative loaded registry and currently exposes 37.
- [x] Direct review calls the existing production dossier renderer with an identity and no placement result.
- [x] Direct review shows `REVIEW MODE — direct identity render` and no fabricated journey/history claims.
- [x] Direct review does not mutate/cache/save/restore a placement result or emit placement telemetry.
- [x] Existing identity-authored dossier content and interactions remain available where applicable.
- [x] Engine Validation uses the production questionnaire and engine state, exposes current evidence/ranking/qualification/stopping/refinement/final output, and has no target-identity input.
- [x] Both mode-isolation directions pass focused tests.
- [x] VM-579 targeted automation, protected regressions, and desktop/mobile rendered QA pass. The mandated broad placement command retains two exact baseline failures reproduced from untouched `b79a366`; VM-579 adds no placement-suite failure.
- [ ] RobDev and independent RobQA records are captured before owner handoff.

## Files Likely Impacted

- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/dev-review.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/dossier/reading.js`
- `assets/css/archscry.css`
- `tests/archscry/archscry-dev-review-tests.js`
- `package.json`
- Current architecture/manual QA documentation and handoff records

## Risks

- Accidental writes to `vm_last_result`, profile placement, or the Archscry-to-Maze handoff.
- Journey-derived language appearing in a direct identity review.
- Review selection leaking into `APP_STATE` placement outcome inputs.
- Dev activation on a production-style host.
- A harness listener changing normal route behavior or telemetry.

## Implementation Prompt

Reuse the existing production dossier renderer and placement engine. Add only the smallest local/flag-gated seams needed for direct identity review and read-only engine inspection. Stop if this requires broad architectural rework.

## Notes

- Baseline: `main` at `b79a366`, one registered worktree.
- VM-578 belongs to the Player Language Corpus V1 work on `vm578-player-language-corpus-v1`; that identity, branch, and corpus must not be touched or reused.
- Existing unrelated untracked `docs/research/maze-player-language/corpus/` content is owner work and must not be touched.
- VM-573, VM-575, VM-576, and VM-577 are closed; no in-flight overlap was found on the intended runtime owners.

## RobDev Implementation Outcome

- Added a pure host/query gate and dynamically imports the QA panel only on approved local URLs with `vm-dev-review=1`.
- Extended the existing dossier composer with a no-placement `identityKey` contract and the existing dossier renderer with `renderIdentityDossier(identityKey)`; no placement result is fabricated, cached, restored, or written.
- Direct review omits placement summaries, answer observations, alternatives, refinement, saved-profile context, reading-specific Maze handoff/finds, account actions, and placement footer actions. It uses the authoritative faction philosophy where the normal production hero thesis is answer-framed.
- The identity selector is generated from loaded active `identity-layers.json` expressions that have loaded faction records; it currently exposes all 37.
- Engine Validation starts `startQuickFlow()` and observes the existing `APP_STATE.adaptiveState` through production ranking, naming qualification, routing, stopping, and refinement exports. It has no target identity, score editor, replay editor, or outcome override.
- The desktop panel reserves a right-side development lane. At narrow widths it enters normal document flow above Archscry, preventing overlap and intercepted product controls.
- Reconciled the initial ID collision: VM-578 remains exclusively assigned to Player Language Corpus V1; this work is VM-579.

## RobDev / RobQAPass Evidence

Change classification:

- QA tier: QA-3.
- Changed behavior: explicit local development review only.
- Protected behavior intentionally untouched: production/nonlocal boot, normal placement dossier semantics, engine scoring/ranking/qualification/stopping, persistence, profile data, Maze handoff, telemetry, generated data, and VM-576 transform behavior.
- CPU-heavy validation: `NOT REQUIRED`; placement semantics and authorities are unchanged.

Passing tests:

- `npm run test:dev-review` — all-37 direct composition/rendering, local/nonlocal gating, valid saved-placement preservation and normal reload, telemetry/persistence isolation, real Jund close journey, production qualification inspector, and both mode-switch directions.
- `npm run lint:js` — 31 frontend files.
- `npm run lint:html`.
- `npm run test:gate-b1-runtime`.
- `npm run test:telemetry`.
- `npm run test:frontend-smoke`.
- `npm run test:archscry-transform`.
- `git diff --check`.

Executed inherited baselines:

- `npm run test:placement` — two failures: Esper visible-copy ban and Quandrix starter-legendary whitelist count. An isolated `git archive` of untouched HEAD `b79a366` reproduced the exact same two failures at the same assertions; VM-579 adds no failure.
- `npm run test:vm551-dossier-integrity` — optional script retains its stale post-VM-573 source-location assertion for `educationalTermAllocation`; unrelated to VM-579 runtime behavior.

Rendered self-QA:

- 1440x1000: White, Dimir, Colorless, WUBRG, Grixis, and Witch direct dossiers; exact review label, zero journey claims/language, identity-authored panels present, tabs clicked, no panel overlap, no horizontal overflow.
- 1440x1000: production Abzan primary journey and Jund close journey; six real answers each, live evidence/ranking/qualification/stopping/final output, Jund refinement state `no_approved_discriminator`, no target input, no panel overlap/overflow.
- 390x844: WUBRG direct dossier and a live first production answer; mobile panel in normal flow, no overlap, no page overflow, production evidence advances.
- Browser console: zero errors.

Manual findings converted to invariants:

- Answer-framed hero and default starter preferences appeared in direct review. Regression: focused all-37 visible-text and composer checks reject answer/history claims and saved starter preferences in identity-only mode while asserting normal placement retains them.
- Fixed panel intercepted production answer controls. Regression: focused real pointer journey must reach the Jund final result, and rendered geometry verifies no desktop overlap.
- `100vw` panel sizing caused seven-pixel mobile overflow with a scrollbar. Regression: rendered 390x844 check requires `scrollWidth === clientWidth` and non-overlapping flow geometry.

Remaining owner judgment after independent RobQA:

- Whether the local desktop sidecar and narrow-screen flow placement feel comfortable for repeated QA use.
- Whether raw JSON is the preferred density for the engine inspector; no alternate visualization was added.
