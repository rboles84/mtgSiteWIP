# VM-579 Archscry Dev Review RobDev Handoff

## Work identity

- Agent name: Codex (`/root`, RobDev implementation)
- Task requested: Expose clean local development seams into the existing production Archscry dossier renderer and placement engine, without new product machinery or broad architecture work; proceed through RobDev, independent RobQA, and owner-review readiness.
- Related Kanban card, docs, or plans: `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`; supplied `archscry-dev-review-placement-validation-goal.md`; `docs/dev/RobDevPass.md`; `docs/qa/RobQAPass.md`.
- Work identity correction: VM-578 is owned by Player Language Corpus V1 on `vm578-player-language-corpus-v1`. This Archscry work is VM-579. No VM-578 branch, card, or corpus artifact was changed.

## Files reviewed

- Mandatory handoff index and recent VM-573, VM-575, VM-576, and VM-577 handoffs/cards.
- Current Kanban board, related dossier/placement plans, `RobDevPass.md`, and `RobQAPass.md`.
- Production Archscry route boot, state, dossier composer/renderer/controls, questionnaire, Gate B1 engine exports, persistence helpers, telemetry adapter, identity registry, all-37 witness/review authority, focused tests, and package scripts.
- Current branches/worktrees, including the separate `vm578-player-language-corpus-v1` branch.

## Files changed

- `assets/css/archscry.css`
- `assets/js/archscry/dossier/reading.js`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/dev-review-gate.js`
- `assets/js/archscry/runtime/dev-review.js`
- `assets/js/archscry/runtime/dossier-controls.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-579-archscry-dev-review-placement-validation.md`
- `package.json`
- `scripts/lint-frontend-js.mjs`
- `tests/archscry/archscry-dev-review-tests.js`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-22-1353-codex-vm579-archscry-dev-review.md`

## What changed

- Added an HTTP(S), local-host, explicit-query gate and dynamically loaded route-local QA panel.
- Added a direct identity-only contract to the existing dossier composer and renderer. Review mode uses authoritative loaded identity/faction data, renders the existing identity-authored dossier surface, and suppresses placement-owned claims and side effects.
- Added an Engine Validation mode that starts the production questionnaire and presents current production evidence, candidate ranking, naming qualification, routing, stopping, refinement, and final result as read-only JSON.
- Added desktop and narrow-screen layout containment for the local panel.
- Added focused all-37, gating, persistence/telemetry, normal-reload, mode-isolation, and real-engine browser coverage.

## Why it changed

Current QA required completing a placement before inspecting any dossier identity and required separate test/replay tooling to observe live engine state. The new seams expose those existing production owners directly while avoiding a second renderer, engine, registry, questionnaire, or generic QA framework.

## Compact RobDev implementation packet

- Product outcome: an approved local URL can directly review any active identity dossier and inspect a real placement journey; normal and production-style URLs remain inert.
- Owning producer: `dossier/reading.js` and `runtime/dossier-view.js` own dossier composition/presentation; `gate-b1-placement-engine.js` and `runtime/questionnaire.js` remain the only placement decision/journey producers.
- Consumers: the local development panel is the new consumer; normal dossier, boot, persistence, account, Maze, telemetry, and transform consumers remain protected.
- Changed behavior: local development activation and identity-only dossier context.
- Protected behavior: production boot and layout, normal placement result semantics, scoring/ranking/qualification/stopping, persisted/profile/cache results, Maze handoff, telemetry events/provider behavior, generated data, identity meaning, and VM-576 interactions.
- Realistic risks addressed: fabricated answer/history language; cache/profile/Maze/telemetry writes; review identity leaking into placement; nonlocal activation; panel interception/overflow; stale inspector qualification fields.
- Smallest complete implementation: one pure gate, one dynamically imported panel, optional identity context through the existing composer/renderer, label overrides for the existing tabs, and calls to existing engine inspection exports.
- Non-goals: no model/data change, target identity, forced winner, replay/score editor, chart, second questionnaire, duplicate registry, generic QA platform, dependency addition, or broad route refactor.
- Stop condition result: no broad architectural rework was required; the existing VM-573 seams were sufficient.

## Decisions made

- Direct review never constructs a placement result. It leaves `APP_STATE.activeResult` and cached/session/profile/Maze placement state untouched.
- Placement-framed hero theses are replaced only in review mode by the same faction record's authoritative philosophy; normal results retain their current theses.
- Saved starter preference cards are omitted when the existing composer has no placement result; normal results retain them.
- Engine inspection calls production `rankCandidates`, `getNamingQualification`, `getRoutingTrace`, `evaluateStopping`, and `getRefinementPath`; it does not reimplement their logic.
- Desktop uses a sidecar lane; narrow screens place the panel in normal flow.

## Risks / uncertainties

- Raw JSON is intentionally utilitarian; whether its density is ideal is owner judgment, not a reason to add visualization machinery.
- The broad placement suite has two exact inherited failures. Untouched HEAD `b79a366` reproduced both in an isolated archive, so they are not VM-579 regressions.
- The optional dossier-integrity script has a stale post-VM-573 source-location assertion unrelated to changed behavior.

## Change classification

- QA tier: QA-3.
- Changed behavior: explicit local development review activation, direct identity-only rendering, and live production engine inspection.
- Protected behavior intentionally untouched: production/nonlocal route behavior and all placement/persistence/telemetry/generated authorities.

## Tests selected

- Test: `npm run test:dev-review`; reason: changed gate, all-37 identity-only rendering, persistence/telemetry isolation, mode transitions, and real engine observation; result: PASS.
- Test: `npm run lint:js`; reason: changed/new frontend modules; result: PASS, 31 files.
- Test: `npm run lint:html`; reason: route integration and accessibility/structure protection; result: PASS.
- Test: `npm run test:gate-b1-runtime`; reason: protected runtime model contract; result: PASS.
- Test: `npm run test:telemetry`; reason: review must remain telemetry-silent while real questionnaire telemetry stays owned; result: PASS.
- Test: `npm run test:frontend-smoke`; reason: route/static integration; result: PASS.
- Test: `npm run test:archscry-transform`; reason: protected VM-576 interactions on a changed dossier renderer; result: PASS.
- Test: `git diff --check`; reason: patch hygiene; result: PASS.
- Test: `npm run test:placement`; reason: task-mandated broad placement regression; result: two inherited failures, exactly reproduced from untouched HEAD `b79a366`; no VM-579 delta.

## Tests intentionally skipped

- Suite: exhaustive bias, random journey, mutation, recovery, and all-37 placement certification suites.
- Why not required: the placement model, engine, evidence, scoring, qualification, stopping, generated data, and public result contracts are unchanged; focused real-engine and existing Gate B1 runtime checks cover the new observer consumer.
- Last valid baseline/certification: current VM-551 all-37 witness/review authority under `docs/audits/vm551-all-37-dossier-closeout/`.

## CPU-heavy validation

- `NOT REQUIRED`.

## Self-QA rendered evidence

- Deterministic case: direct White, Dimir, Colorless, WUBRG, Grixis, and Witch; viewport: 1440x1000; actual: exact review label, no journey claims/language, authored panels and tab navigation present; interaction: identity selection plus Identity & Play and Card Signals tabs; verdict: PASS, no overlap/overflow.
- Deterministic case: production Abzan primary and Jund close journeys; viewport: 1440x1000; actual: six real answers each, expected final states, live evidence/ranking/qualification/stopping/refinement; interaction: production answer/transition controls; verdict: PASS.
- Deterministic case: WUBRG review plus first production answer; viewport: 390x844; actual: panel in normal flow, dossier below, evidence advances to one; interaction: identity selection, mode switch, start, answer; verdict: PASS, no overlap/page overflow.
- Browser console: zero errors.

## Manual findings converted to invariants

- Finding: answer-framed hero and default starter profile copy appeared in review mode; defect class: fabricated journey/history context; invariant: all-37 focused browser/composer checks reject journey and saved-preference copy while normal placement asserts retained context.
- Finding: desktop panel intercepted answer cards; defect class: development overlay blocks protected production interaction; invariant: focused pointer journey reaches real final result and desktop geometry shows no overlap.
- Finding: narrow panel exceeded scrollbar-reduced content width by seven pixels; defect class: responsive horizontal overflow; invariant: 390x844 rendered geometry has equal document scroll/client width.

## Remaining owner judgment

- Visual comfort of the desktop sidecar and narrow-screen flow placement.
- Whether the raw JSON inspector density is acceptable for repeated development use.

## Owner review commands / routes

- `npm run test:dev-review`
- Serve the repository locally and open `/archscry/?vm-dev-review=1` on `localhost` or `127.0.0.1`.
- Spot-check one ordinary identity and one boundary identity; run one real Engine Validation journey. Machine-verifiable all-37, persistence, telemetry, gate, and mode-isolation facts do not need owner repetition.

## Tests run

See the selected-test and rendered-evidence sections above. `npm ci` restored only lockfile-declared ignored workspace dependencies; no dependency manifest or lockfile was changed.

## Not touched

- Placement model/engine semantics, generated data, factions/identity layers, telemetry adapter/events, auth/profile schema, shared persistence helpers, Maze runtime, Scryfall data/media, VM-576 transform code, and production deployment behavior.
- `vm578-player-language-corpus-v1` and all Player Language Corpus V1 artifacts.
- Pre-existing unrelated `docs/research/maze-player-language/corpus/vm578.zip` owner file.

## Follow-up recommendations

- Independent RobQA should review the exact candidate SHA, rerun the focused/gate/lint checks, inspect local/nonlocal activation, and repeat a bounded desktop/mobile product pass.
- Do not broaden into inspector visualization, replay tooling, or placement remediation during review.

## Next suggested agent

- Independent RobQA reviewer with no reliance on this implementation summary beyond locating the candidate and protected contracts.
