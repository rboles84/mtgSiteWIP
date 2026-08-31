# VM-579 - Archscry Dev Review + Placement Validation

ID: VM-579
Title: Archscry Dev Review + Placement Validation
Status: Done
Type: Developer tooling / route-local QA
Area: Archscry
Priority: High
Created: 2026-08-22
Completed: 2026-08-22

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
- [x] RobDev and independent RobQA records are captured before owner handoff.
- [x] Direct-review Maze navigation carries the selected dossier identity as explicit transient context without fabricating placement state or modifying the saved placement/persistent Maze handoff.
- [x] The selector groups current identities deterministically as mono colors, guilds, colleges, shards, wedges, four-color identities, Colorless, then WUBRG, using authoritative metadata rather than a handwritten identity registry.
- [x] Focused tests cover Dimir, Jund, Colorless, WUBRG, and at least one college/four-color identity entering Maze with matching dossier context while normal placement/Maze behavior remains unchanged.
- [x] A new exact remediation candidate receives independent RobQA before the bounded owner recheck.

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
- VM-578 belongs to the Player Language Corpus V1 work preserved by `archive/historical-vm578-player-language-corpus-0204cfa` at `0204cfa2c402f647dad68585bcd96b59dd4bcd42`; that identity and corpus must not be touched or reused.
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

## Independent RobQA Outcome

- Verdict: **PASS — Owner Review Ready**.
- Exact reviewed candidate: `1c87dc2669a007d7e59e5f71a46d20add5235e3a`.
- Independent handoff: `docs/handoffs/2026-08-22-1406-codex-vm579-independent-robqa.md`.
- The reviewer independently verified the narrow production renderer/engine seams, all-37 direct-review behavior, persistence and telemetry isolation, production primary and close journeys, and desktop/mobile interactions.
- The two `npm run test:placement` failures were independently reproduced from untouched parent `b79a366` and are not VM-579 regressions.
- Status remains `In Progress` pending bounded owner acceptance. Do not merge, push, close, or move this card to Done before that acceptance.

## Owner Acceptance Findings — 2026-08-22

Core outcome accepted:

- Direct identity dossiers can be inspected without claiming a placement.
- The real questionnaire and placement engine can be exercised separately with live engine state.
- Placement rank and responsible naming qualification remain distinct and must not be changed from owner captures.

Bounded VM-579 remediation:

1. Direct-review Maze links currently carry the selected query but omit dossier context, so Maze falls back to the persistent handoff from the owner's saved dossier. Carry an explicit, URL-borne `dossier-review` context into Maze, keep it transient/in-memory, and leave placement state and `vm_archscry_maze_handoff_v1` unchanged.
2. Sort the selector by the authoritative expression `kind` taxonomy: five mono colors, ten guilds, five colleges, five shards, five wedges, five four-color identities, Colorless, then WUBRG. Use current registry/faction metadata and do not add a handwritten identity authority.

Revised RobDevPass contract:

- Product outcome: direct-review identity -> Maze -> the same transient dossier identity, plus deterministic taxonomy selector order.
- Current behavior: review links omit context and Maze reuses the saved handoff; selector uses raw object enumeration.
- Owning layers/existing machinery: `runtime/dossier-view.js` and `archscry-presentation.js` already build Maze path/context URLs; `maze-handoff.js` and Maze route initialization already resolve URL launch context; `identity-layers.json` expression `kind` owns taxonomy classification.
- Changed behavior: explicit development-review launches only, and development selector presentation only.
- Protected behavior: saved placement, persistent Maze handoff bytes, normal production Archscry-to-Maze handoff, placement semantics, Reading Finds persistence, telemetry, identity authority, and provider routing.
- Smallest complete implementation: decorate review Maze links through the existing context adapter, hold the explicit review context in Maze memory instead of localStorage, build review paths from identity context rather than a placement object, and sort registry-derived selector entries by metadata category.
- Stop condition: stop if this requires changing placement semantics, persistent handoff schema/behavior for normal production, or broad Maze/Archscry decomposition.

Revised QA classification:

- QA tier remains QA-3 because cross-route context and persistent-state isolation change.
- Required focused coverage: taxonomy ordering; Dimir, Jund, Colorless, WUBRG, and a college/four-color review launch; exact persistent handoff and saved-placement preservation; normal production handoff regression; local/flag gate and bidirectional mode isolation.
- Rendered QA: at least one ordinary, one endpoint, and one college/four-color direct-review Maze launch on desktop, plus a bounded mobile check. CPU-heavy placement certification remains `NOT REQUIRED` because placement logic/data do not change.

## Owner Remediation RobDev Evidence — 2026-08-22

Implementation result:

- Review-mode Maze links reuse `withArchscryMazeContext(...)` and the existing Maze launch resolver, carrying `contextMode=dossier-review`, the reviewed identity, authoritative faction label, and review reading metadata in the URL.
- Maze keeps that review handoff in module memory only. It neither reads the saved placement handoff as review context nor writes the review context to `vm_archscry_maze_handoff_v1`.
- Review paths reuse the existing dossier-path builder from explicit identity context without constructing a placement result. Normal production launches retain the existing persistent placement-result handoff.
- The selector remains registry-derived and sorts by the existing expression `kind` metadata. Its verified group counts are `5, 10, 5, 5, 5, 5, 1, 1`, with W/U/B/R/G mono order and label ordering inside the other groups.

Focused and protected automation on the final working-tree state:

- `npm run test:dev-review` — PASS after the final review-title adjustment; covers Dimir, Jund, Colorless, WUBRG, Silverquill, taxonomy order, exact saved-state bytes, transient Maze context, Reading Finds source context, normal persistent handoff, gating, isolation, telemetry, and real-engine behavior.
- Relevant `node --check` commands — PASS.
- `npm run lint:js` — PASS for 31 files.
- `npm run lint:html` — PASS.
- `npm run test:gate-b1-runtime` — PASS.
- `npm run test:telemetry` — PASS.
- `npm run test:frontend-smoke` — PASS.
- `npm run test:archscry-transform` — PASS.
- `npm run test:maze-finds` — PASS.
- `git diff --check` — PASS.

Inherited baselines, reproduced from an isolated archive of untouched remediation parent `07b5b3e`:

- `npm run test:placement` retains the same two Esper visible-copy and Quandrix starter-whitelist failures.
- `node tests/maze/maze-search-tests.js` retains the same `c:r` versus `c:r f:commander` expectation failure.
- The remediation adds no new failure to either broad command; focused coverage for the changed Maze launch contract passes.

Rendered self-QA on the final implementation:

- Desktop 1440x1000: verified exact taxonomy order; Dimir direct review enters Maze as House Dimir with UB paths and no saved Jund leakage; WUBRG uses the authoritative Five-Color label consistently.
- Mobile 390x844: Silverquill enters Maze as Silverquill College with WB paths, no overflow or overlap, and Return to Dossier restores the same direct-review identity.
- Persistent placement/profile/handoff state remained byte-identical through review journeys; a normal Jund production handoff retained its placement result and omitted review-only fields.
- Browser console reported no errors.

RobQAPass readiness: QA-3 candidate is ready for fresh independent exact-SHA review. Remaining owner judgment is intentionally bounded to the corrected direct-review Maze context and desired selector ordering.

Separately routed findings, not part of VM-579 remediation:

- VM-580: transform hover-preview affordance and pointer-interaction contract. The owner is `runtime/card-media.js`/existing transform styles, which VM-579 did not change.
- VM-581: Strixhaven college player-facing Commander Browsing labels versus valid external guild/color-pair routing. The existing routing/presenter lines were not changed by VM-579.
- VM-582: mobile provider controls stretching across Precon Starting Points and Commander Browsing Starts. The responsible pre-existing `.service-chip` narrow-width rule was not introduced or modified by VM-579.
- VM-583: mobile Maze search-input/control vertical gap. Maze CSS/runtime were not changed by VM-579.

## Owner Remediation Independent RobQA Outcome — 2026-08-22

- Verdict: **PASS — Owner Review Ready**.
- Exact reviewed remediation candidate: `e97eeeae144e5c193594ad2b97c1e5d7d25f53ee`.
- Exact parent: `07b5b3e2f44100943283cb782ae34e892f873e32`.
- Independent handoff: `docs/handoffs/2026-08-22-1534-poincare-vm579-owner-remediation-robqa.md`.
- Independent automation confirmed the taxonomy counts/order, all required identity launches, byte-exact persistence isolation, normal Jund production handoff, telemetry/gating/isolation, and focused real-engine behavior.
- Independent desktop/mobile product QA confirmed Dimir, WUBRG, and Silverquill direct-review Maze context, normal Jund behavior, Silverquill return navigation, zero overlap/overflow, and zero console errors.
- The two placement failures and one shared Maze metadata failure were independently reproduced from the exact parent and remain inherited baselines.
- No parallel renderer/engine, fabricated placement, persistent-schema change, architectural expansion, or VM-580–VM-583 implementation was found.

Bounded owner recheck only:

1. Confirm a directly reviewed dossier enters Maze with that same identity context in the owner's saved-state environment.
2. Confirm the selector sequence is the desired mono, guild, college, shard, wedge, four-color, Colorless, WUBRG review order.

## Final Owner Acceptance And Closeout — 2026-08-22

- Owner acceptance: **PASS**.
- The owner approved direct-review identity -> matching transient Maze dossier context in the owner's saved-state environment.
- The owner approved the selector taxonomy sequence: mono colors, guilds, colleges, shards, wedges, four-color identities, Colorless, then WUBRG.
- Accepted product candidate: `e97eeeae144e5c193594ad2b97c1e5d7d25f53ee`.
- Independent PASS governance state before owner acceptance: `0d7d8032ac6dc5c69de8f44de037c0c895257a67`.
- VM-579 is complete and archived to Done. The accepted chain is already on `main`, so no merge is required.
- VM-580 through VM-583 remain separate Backlog work and received no implementation during closeout.
