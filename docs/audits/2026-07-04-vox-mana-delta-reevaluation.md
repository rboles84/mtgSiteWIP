# Vox Mana Delta Reevaluation

Date: 2026-07-04
Related card: VM-474
Baseline: `docs/audits/2026-06-30-vox-mana-self-snapshot.md`

## 1. Baseline Reference

This reevaluation starts from the durable VM-459/VM-460 baseline:

- `docs/audits/2026-06-30-vox-mana-self-snapshot.md`
- `docs/handoffs/2026-06-30-2144-codex-vm459-self-snapshot-refresh.md`
- `docs/handoffs/2026-06-30-2155-codex-vm460-collaboration-self-snapshot-refresh.md`

It does not re-audit static product identity, the full identity model, the full source library, the full UX copy system, or monetization theory unless VM-461 through VM-473 changed the conclusion. Baseline identity remains: Vox Mana is a source-governed Commander identity and taste compass, not a deckbuilder, legality checker, recommendation engine, or account-backed deck platform.

### Pre-flight Summary

Recent related work exists. VM-461 through VM-473 are the relevant trail.

Recent related work:

- VM-461 through VM-465 added readiness evidence: account freeze, visual waiver ledger, Edge mobile-width matrix, accessibility evidence, and dossier warning triage.
- VM-466 through VM-470 turned Loom strategy into a v0/v1 decision, added a manual browser-smoke CI pilot, recorded deployed route load pass with stale metadata/social hold, blocked external reviewer proof on five real responses, and reaffirmed account freeze.
- VM-471 through VM-473 changed Maze materially by adding a generated Scryfall grounding artifact, a grounded Plain Reading compiler, semantic registry, validation/repair diagnostics, mixed-mode classifier, name-like guard, and blocking set-family ambiguity.

Current known risks:

- Visual compare suites still fail by design and remain waived pending owner acceptance in `docs/qa/visual-baseline-waivers.md`.
- Deployed `voxmana.io` route loads passed, but deployed metadata/social previews are stale in `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md`.
- VM-469 remains blocked on real outside reviewer responses.
- Account-backed deck saving remains frozen; VM-422 and VM-446 are backlog, not active release scope.
- Full `npm.cmd test` was not green after VM-472 because of an unrelated Archscry Colorless lane label assertion.
- Plain Reading is stronger but still has bounded boolean handling, incomplete semantic coverage, and no measured large corpus.

Relevant decisions already made:

- Keep active public scope static/local-first; do not restore account-backed deck links without owner approval and live RLS proof.
- Keep current Loom visual builder as Loom v0; first Loom v1 slice is text-first Explorer Mode using a reviewed concept registry and Maze query adapter.
- Keep browser smoke manual/on-demand in CI until a hosted green run is observed.
- Keep LLM fallback deferred until deterministic compiler coverage is measured.
- Keep generated Scryfall facts separate from curated semantic registry data.

Files recently changed:

- Readiness/docs: `docs/qa/*`, `docs/strategy/*`, `docs/reference/data-contracts.md`, `privacy/index.html`, `terms/index.html`.
- CI/docs: `.github/workflows/browser-smoke.yml`, `docs/qa/vox-mana-test-plan.md`.
- Maze/compiler: `research/scryfall-grounded-compiler.js`, `research/scryfall-parser.js`, `research/maze-query-core.js`, `research/research-init.js`, `research/research-ui.js`, `research/*tests.js`.
- Scryfall grounding: `scripts/build-scryfall-grounding.mjs`, `scripts/validate-scryfall-grounding.mjs`, `scripts/validate-plain-reading-semantics.mjs`, `data/scryfall/grounding/scryfall-grounding.json`, `data/scryfall/grounding/plain-reading-semantics.json`.
- Architecture/contracts: `docs/architecture/maze-plain-reading-deep-dive.md`, `docs/architecture/scryfall-data-pipeline.md`, `docs/contracts/maze-query-contract.md`.

Do not touch:

- Do not hand-edit generated Scryfall grounding JSON.
- Do not restore account-backed deck saving or Supabase claims.
- Do not refresh visual baselines without explicit owner acceptance.
- Do not edit generated dossiers or source-owned MTG/lore/card facts as part of this audit.
- Do not add LLM fallback, deckbuilding, legality checking, EDHREC-clone behavior, or community-platform scope.

## 2. Material Changes Since Baseline

### Readiness / QA

- VM-462 did not solve visual polish; it made the waiver state more honest and current. `docs/qa/visual-baseline-waivers.md` records all four route visual compares as failed with continued owner-decision-pending status.
- VM-463 materially improved mobile evidence within the available local browser. `docs/qa/2026-07-03-mobile-cross-browser-readiness-scorecard.md` reports 35 pass, 0 warn, 0 fail across seven routes and five widths in Microsoft Edge.
- VM-464 materially improved accessibility evidence for core flows, but only as targeted release evidence. `docs/qa/2026-07-03-accessibility-evidence-pass.md` reports no P0/P1 blocker, while explicitly excluding a full screen-reader audit.
- VM-465 converted the dossier warning mass into a classified risk model. `docs/qa/2026-07-03-dossier-warning-triage.md` records 37 primary dossiers, 76 adjacent dossiers, 113 warnings, and 0 failures.

### Account scope

- VM-461 and VM-470 strengthened the baseline conclusion that account-backed deck saving is not active. `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md` now names reactivation requirements, including owner approval, moving VM-422/VM-446 back to active status, and passing local plus live deck-link tests with owner/non-owner/service-role evidence.
- Privacy and Terms stale public claims were repaired in VM-461, which reduces accidental overclaiming but does not make Supabase/profile/deck-link behavior production-ready.

### Loom strategy

- VM-466 resolved the Loom ambiguity that VM-459 left open. `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md` says current Visual Builder is Loom v0, Loom v1 is Explorer Mode first, and the first slice is a deterministic concept registry -> query fragment -> existing Maze search adapter.
- The decision explicitly rejects graph-only implementation, custom card generation, Commander Finder, PACKAGE mode, ranking, legality, scoring, and best-card recommendations for the first slice.

### Deployment evidence

- VM-468 improved public route evidence but weakened social-preview readiness. `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md` reports route load pass across public routes and `/library/` resolving to Apocrypha, but deployed HTML is stale versus local VM-451 metadata.
- VM-467 added `.github/workflows/browser-smoke.yml` as a manual `workflow_dispatch` pilot. This is useful but not proof of hosted stability; it is explicitly not a hard gate yet.

### Maze / Plain Reading / Scryfall compiler

- VM-471 added a generated Scryfall grounding artifact and loader path. `docs/architecture/scryfall-data-pipeline.md` now defines `data/scryfall/grounding/scryfall-grounding.json` as generated Scryfall catalog/set truth and tells agents not to hand-edit it.
- VM-472 made Plain Reading a normal grounded compiler path, not only a narrow set/commander-shaped path. It added `data/scryfall/grounding/plain-reading-semantics.json` for curated player-language concepts and a validator.
- VM-472 also removed silent generic Commander filtering from Plain Reading. Commander intent must now appear as visible query syntax such as `legal:commander` or `is:commander legal:commander`.
- VM-473 fixed the mixed-mode boundary: Operator's Hand preserves pure Scryfall syntax, routes mixed English-plus-operator input through Plain Reading, and treats name-like multi-word input as named-card lookup when no recognized spans exist.
- VM-473 made blocking ambiguity part of `queryModel.ambiguous`; ambiguous set-family input such as `all heroes in the marvel set f:commander` does not call Scryfall until the user chooses a family.

### Documentation / governance

- The post-baseline trail strengthens governance more than polish. There are clearer docs, traceability, and test scripts, but also more proof obligations: visual owner acceptance, hosted browser smoke, external reviewers, corpus metrics, and full-suite cleanup.
- The repo remains heavy with uncommitted/untracked VM work according to `git status --short`; this audit does not normalize that state.

## 3. Prior Conclusions: Changed, Strengthened, Or Still True

| Prior conclusion | Current status | Evidence | Why it matters |
|---|---|---|---|
| Best current use is scoped public static demo and product/QA case study. | Strengthened | VM-463, VM-464, VM-467, VM-468 add more evidence, but VM-468 social hold remains. | More artifacts support a demo story, but only with caveats. |
| Most important fix was visual acceptance plus mobile/accessibility/manual demo evidence. | Changed | Mobile and accessibility evidence improved in VM-463/VM-464; visual owner acceptance and external reviewer proof remain open. | The highest-leverage fix narrows to owner visual decision, deployed metadata redeploy, and reviewer evidence. |
| Most differentiated asset was source-governed Commander identity dossiers plus QA/handoff discipline. | Strengthened and expanded | VM-471 through VM-473 add a source-grounded, inspectable Plain Reading compiler. | Maze may now become a second differentiated asset, not only a support loop. |
| Biggest risk was overclaiming polish, account safety, or deckbuilding value. | Strengthened | VM-461/VM-470 freeze account scope; VM-462 keeps visual waivers; VM-468 social no-go; VM-469 blocked. | The project is more honest, but still easy to overstate. |
| Recommended next phase was readiness proof and external comprehension testing, not feature expansion. | Unchanged | VM-469 still blocked; visual/deploy proof incomplete; browser smoke hosted status unobserved. | External clarity is still the missing public-readiness proof. |
| Account-backed deck saving should remain hidden/deferred. | Strengthened | `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`; VM-422/VM-446 in backlog. | Prevents a security/privacy claim the repo cannot prove live. |
| Visual baselines are not release proof. | Unchanged | `docs/qa/visual-baseline-waivers.md` reports all four route visual compares failing. | Screenshots/public polish claims still need owner review or repair. |
| Cold-entry Maze usefulness was unproved. | Changed | VM-471 through VM-473 make Maze more capable and inspectable, but no user/reviewer proof yet. | Product potential improved; audience comprehension still unproved. |
| Loom v0/v1 naming and first slice were undecided. | Changed | VM-466 approves current Loom v0 and Explorer Mode as first v1 slice. | Removes a strategy ambiguity and creates a narrow future implementation path. |
| Deployment readiness depended on deployed smoke/social preview proof. | Weakened for social preview, strengthened for route load | VM-468 route loads passed but metadata/social preview deployed stale. | The site can be visited, but sharing previews should not be used as evidence yet. |
| Dossier warnings needed triage. | Strengthened | VM-465 classified 113 warnings as advisory/source-intake/source-boundary with 0 failures. | Warning volume is now a known risk, not an undifferentiated blocker. |

## 4. Updated Readiness Assessment

Only affected categories are rescored here. Baseline categories not listed in the evidence remain unchanged by this delta.

| Category | Prior score | Updated score | Evidence | Highest-leverage fix |
|---|---:|---:|---|---|
| First-visit clarity | 4 | 4 | No new Home positioning work; VM-463 confirms `Not a deckbuilder` boundary present in available mobile pass. | Run VM-469 external two-minute clarity test. |
| Product boundary clarity | 4 | 4 | VM-461/VM-470 removed/reaffirmed account-deck-saving boundaries; copy-boundary checks passed in VM-466/470. | Keep account/deckbuilder scans in release checks and gather external reviewer proof. |
| Visual polish | 2 | 2 | VM-462 updated waiver evidence, but all four route visual compares still fail. | Owner reviews current/diff PNGs and chooses repair, accepted waiver, or baseline refresh card. |
| Accessibility | 3 | 4 | VM-464 found no P0/P1 blocker across keyboard, reduced motion, modal, tabs, details shelves, and fallbacks. | Add screen-reader or axe pass before claiming polished accessibility. |
| Mobile usability | 3 | 4 | VM-463 records 35/35 pass across seven routes at 320/375/390/412/768 in Edge. | Run Safari/iOS/Android/Firefox or explicitly keep the browser-family caveat. |
| Data/source traceability | 4 | 4 | VM-471/472 add generated Scryfall grounding and semantic registry separation, but registry breadth and grounding refresh governance are new responsibilities. | Add corpus-driven compiler coverage metrics and grounding refresh checklist. |
| Maze usefulness | 3 | 4 | VM-471/472/473 turn Plain Reading into a grounded, inspectable compiler with blocking ambiguity and response-based repair diagnostics. | Prove with real user/corpus queries and a polished Query Inspector UX. |
| Maintainability | 3 | 3 | Contract/docs/tests improved, but parser/compiler complexity increased and full suite still has an unrelated failure. | Fix full-suite failure and add tiered parser corpus before adding more grammar surface. |
| Deployment readiness | 3 | 3 | VM-468 route load pass helps; stale deployed metadata/social preview keeps release proof incomplete. | Redeploy current local metadata, recheck public routes, and record hosted browser-smoke status. |
| Portfolio/demo readiness | 4 | 4 | Readiness evidence is stronger, but social preview, visual owner acceptance, and VM-469 remain open. | Curate a caveated demo packet after redeploy and reviewer test. |
| Monetization readiness | 1 | 1 | No new audience, retention, payment, or repeated-use evidence. | Run free external/repeated-use experiments before business scope. |

## 5. Maze And Plain Reading Strategic Assessment

### Is Maze now a differentiated product asset, or still a support loop?

Repo-backed assessment: Maze is no longer only a light support loop. VM-471 through VM-473 make it a credible differentiated asset candidate because it now has:

- a generated grounding artifact from Scryfall catalogs and `/sets`;
- a curated semantic registry for player-language concepts;
- a single normal Plain Reading path when grounding is loaded;
- visible diagnostics for recognized, ignored, applied default, alternative, validation, and ambiguity states;
- response-based repair suggestions after real zero-result searches;
- deterministic mixed-mode routing and blocking ambiguity.

Inference: It is not yet a proven standalone product pillar. The compiler is architecturally meaningful, but the user value is not externally validated and the Query Inspector/ambiguity UI is still more engineering-transparent than polished. Treat Maze as a strategic asset in validation, not as a public claim of "natural language Magic search solved."

### Does deterministic Plain Reading strengthen the Commander taste-compass positioning?

Yes, with limits. It strengthens the taste-compass promise when it helps users translate taste and table-language concepts into explorable Scryfall queries without pretending to generate decklists. The strongest alignment is "I know I want sacrifice, aristocrats, recursion, tokens, goad, blink, board wipes, or Commander-legal candidates; help me explore." That supports Vox Mana as a pre-browsing compass.

The limit: Scryfall syntax translation is still card search. If the UI centers Maze too aggressively, users may misread Vox Mana as a search engine or recommender instead of a Commander identity guide. The safest product framing is: Archscry names the reading; Maze lets the user inspect the card-space around that reading.

### What new complexity or maintenance risks were introduced?

- The generated grounding artifact depends on current Scryfall metadata and must be regenerated when catalog, keyword, or set-family expectations change.
- The semantic registry is curated product data and can drift into unsupported claims if entries are added without source/fragment review.
- Boolean support is intentionally bounded; mixed-field OR/nesting and more advanced Scryfall fields remain future work.
- The classifier has conservative name-like routing, but card names containing recognized terms can still route through Plain Reading.
- The compiler has more tests, but still needs a measured corpus to prevent confidence-by-anecdote.
- The full test suite still has an unrelated Archscry Colorless lane label failure, so "all green" cannot be claimed.

### What must be proven before this can be claimed publicly?

- A tiered Plain Reading corpus with pass/fail metrics by category.
- Real browser/manual QA for blocking ambiguity, disabled Copy/Open states, and Query Inspector choice behavior.
- A clear public explanation that Plain Reading translates to Scryfall syntax, not rules adjudication, recommendations, or deckbuilding.
- Hosted browser-smoke stability if browser smoke becomes a public release proof point.
- Full-suite cleanup or explicit documented waiver for the unrelated Colorless label failure.

## 6. Current Risk Ledger

| Risk | Severity | Evidence | Next action |
|---|---|---|---|
| Visual baseline waiver state | High for polished release, medium for caveated static beta | `docs/qa/visual-baseline-waivers.md` shows all four route compares failing. | Owner reviews artifacts; create repair/refresh/waiver card. |
| Deployed metadata/social preview drift | High for public sharing | VM-468 deployed route load passed but metadata/social tags are stale or missing. | Redeploy current local files and rerun deployed metadata check. |
| External reviewer evidence gap | High for portfolio/demo claims | VM-469 blocked; reviewer log is TBD for all five reviewers. | Run the five-reviewer test and record pass/fail themes. |
| Account/RLS/deck-link frozen scope | High if revived, low if kept frozen | VM-422/VM-446 in backlog; live RLS proof absent; freeze reaffirmed in VM-470. | Keep frozen; only reactivate with owner approval and live proof. |
| Full-suite test gap | Medium | VM-472 reports `npm.cmd test` failing on unrelated `research/archscry-dossier-followup-tests.js` Colorless label expectation. | Investigate/fix or document a narrow waiver before claiming full green. |
| Plain Reading corpus/coverage limits | Medium-High | VM-472 handoff recommends tiered golden/invariant corpus and metrics. | Add corpus buckets and measurable category pass rates. |
| Semantic registry governance | Medium | `plain-reading-semantics.json` is curated, not generated; breadth is useful but incomplete. | Add review rules for new registry entries and tests per concept. |
| Mixed-mode classifier false positives/edge cases | Medium | VM-473 notes name-like guard can miss card names containing recognized spans. | Expand classifier corpus with real raw syntax and card-name false positives. |
| Scryfall set-family taxonomy drift | Medium | Spider-Man override is manual because Scryfall lacks a marketing-family field. | Revisit overrides on new Universes Beyond releases; regenerate artifact through script only. |
| Query Inspector polish gap | Medium | VM-473 renders ambiguity choices, but manual/browser polish remains follow-up. | Add a focused UI pass for ambiguity chips, did-you-mean, and disabled action states. |
| Browser-smoke hosted stability | Medium | VM-467 added manual workflow but no hosted green run observed. | Dispatch hosted run after push/deploy and record outcome. |
| Dossier warning volume | Low-Medium | VM-465 reports 113 warnings and 0 failures. | Keep advisory unless source-intake or source-boundary work is prioritized. |

## 7. Updated Next 10 Tickets

### VM-XXX - Resolve Full Test Suite Colorless Label Failure

Why it matters now: VM-472 left `npm.cmd test` failing on an unrelated Archscry Colorless assertion, so full-suite health cannot be claimed.

Scope: Investigate `research/archscry-dossier-followup-tests.js` versus current Colorless Big Mana copy/labels; fix the test or code only if repo evidence supports the expected behavior.

Files likely touched: `research/archscry-dossier-followup-tests.js`, possibly `assets/js/commander-dossier.js` or source docs if the assertion is stale.

Acceptance criteria: `npm.cmd test` passes or a narrow documented waiver explains why it cannot yet pass.

Validation: `npm.cmd test`, `npm.cmd run test:parser`, `npm.cmd run lint:js`.

Risk if skipped: Future reports will keep over-explaining focused-pass versus full-suite status.

### VM-XXX - Plain Reading Corpus And Metrics V1

Why it matters now: VM-471 through VM-473 are strategically meaningful only if coverage is measured, not asserted.

Scope: Add a tiered fixture set for catalog terms, semantic concepts, colors, boolean/negation, exact names, raw syntax, mixed mode, set families, and known failures.

Files likely touched: `research/scryfall-parser-tests.js`, `research/maze-query-contract-tests.js`, `docs/architecture/maze-plain-reading-deep-dive.md`.

Acceptance criteria: Parser output reports category counts and pass rates; fixtures include current VM-471/472/473 probes plus false-positive cases.

Validation: `npm.cmd run test:parser`, `node research\maze-query-contract-tests.js`.

Risk if skipped: The compiler becomes impressive anecdote instead of governed capability.

### VM-XXX - Query Inspector Ambiguity UX Polish

Why it matters now: VM-473 made blocking ambiguity safe, but the user-facing choice flow still needs browser polish.

Scope: Review blocked set-family states, disabled Copy/Open actions, choice buttons, zero-result repair suggestions, and copy tone in Maze.

Files likely touched: `research/research-ui.js`, `research/research-init.js`, `maze/index.html`, `docs/contracts/maze-query-contract.md`.

Acceptance criteria: A user can understand why a search is blocked, choose a family, and continue without copying/opening partial Scryfall syntax.

Validation: `node research\maze-search-tests.js`, manual browser check for Marvel ambiguity and zero-result suggestions.

Risk if skipped: The safer compiler path still feels like an internal diagnostic surface.

### VM-XXX - Redeploy Metadata And Social Preview Recheck

Why it matters now: VM-468 says deployed social metadata is no-go until current local VM-451 metadata reaches `voxmana.io`.

Scope: After normal deployment, recheck Home, Archscry, Maze, Strategium, Apocrypha, `/library/`, Privacy, and Terms for canonical/description/OG/Twitter tags.

Files likely touched: `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md`, new handoff/card docs.

Acceptance criteria: All public routes expose expected metadata on deployed HTML; `/library/` continues resolving/canonicalizing to Apocrypha.

Validation: `npm.cmd run test:route-metadata` locally plus deployed browser/HTML metadata check.

Risk if skipped: Public links and portfolio shares use stale or missing preview evidence.

### VM-XXX - Hosted Browser Smoke Observation

Why it matters now: VM-467 added a manual workflow but no hosted green run exists.

Scope: Dispatch `.github/workflows/browser-smoke.yml`, record run URL/status/duration/SHA, and decide whether to keep manual or promote later.

Files likely touched: `docs/qa/2026-07-03-browser-smoke-ci-pilot.md`, possibly `.github/workflows/browser-smoke.yml` only if runner issues appear.

Acceptance criteria: Hosted result is recorded; any failure cause is actionable or the manual-hosted caveat remains explicit.

Validation: GitHub Actions workflow dispatch plus `npm.cmd run test:browser-smoke` locally if needed.

Risk if skipped: Browser smoke exists as local confidence but not CI evidence.

### VM-XXX - External Reviewer Evidence Run

Why it matters now: VM-469 is the missing proof that outsiders understand Vox Mana.

Scope: Collect five reviewer responses using the existing protocol and summarize pass/fail against product-boundary and proof-point criteria.

Files likely touched: `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`, `docs/kanban/blocked/VM-469-external-reviewer-two-week-test.md`, board/handoff docs.

Acceptance criteria: At least five responses recorded; decision says keep, revise, or pause case-study positioning.

Validation: Manual review of completed table and decision summary.

Risk if skipped: The project can look internally coherent but externally illegible.

### VM-XXX - Owner Visual Decision Packet Closure

Why it matters now: VM-462 documents compare failures but does not resolve owner acceptance.

Scope: Owner reviews current/diff PNGs for Home, Archscry, Strategium, and Apocrypha, then chooses repair, continued waiver, or dedicated baseline refresh per route.

Files likely touched: `docs/qa/visual-baseline-waivers.md`, route-specific visual card/handoff docs; baseline artifacts only if owner approves refresh.

Acceptance criteria: Each route has an owner decision; no baseline-refresh command runs without explicit approval.

Validation: `npm.cmd run test:visual:home`, `npm.cmd run test:visual:archscry`, `npm.cmd run test:visual:strategium`, `npm.cmd run test:visual:apocrypha`.

Risk if skipped: Visual regression signal remains noisy and public polish claims remain weak.

### VM-XXX - Scryfall Grounding Refresh Governance

Why it matters now: VM-471 added a generated grounding artifact with manual family override policy.

Scope: Document when and how to rerun `scryfall:grounding`, how to review diffs, and how to handle new product families without hand-editing generated JSON.

Files likely touched: `docs/architecture/scryfall-data-pipeline.md`, `scripts/build-scryfall-grounding.mjs`, `docs/contracts/maze-query-contract.md`.

Acceptance criteria: Refresh checklist exists; generated artifact changes are validated; manual overrides are documented in generator/source, not artifact edits.

Validation: `npm.cmd run test:scryfall-grounding`, `git diff -- data/scryfall/grounding/scryfall-grounding.json`.

Risk if skipped: Plain Reading degrades as Scryfall releases new sets/types or product-family expectations change.

### VM-XXX - Semantic Registry Review Rules

Why it matters now: VM-472 made curated semantic data a new source of product meaning.

Scope: Define allowed fragment types, confidence guidance, required tests, and review notes for adding concepts to `plain-reading-semantics.json`.

Files likely touched: `data/scryfall/grounding/plain-reading-semantics.json`, `scripts/validate-plain-reading-semantics.mjs`, `docs/architecture/scryfall-data-pipeline.md`.

Acceptance criteria: Registry additions require tests and notes; validator catches missing ids/triggers/fragments/confidence.

Validation: `npm.cmd run test:plain-reading-semantics`, `npm.cmd run test:parser`.

Risk if skipped: The registry becomes untraceable folk knowledge or unsupported search behavior.

### VM-XXX - Loom Explorer Mode Implementation Plan

Why it matters now: VM-466 resolved Loom v0/v1 direction, but no runtime implementation card exists.

Scope: Plan a narrow text-first Explorer Mode: reviewed concept registry, query preview, explanatory copy, handoff into existing Maze contract, no graph, no scoring, no deckbuilding.

Files likely touched: `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`, `docs/contracts/maze-query-contract.md`, future Maze/Loom docs.

Acceptance criteria: Decision-complete plan with data shape, UI states, validation checks, and anti-scope list.

Validation: Plan review against VM-466 no-go list.

Risk if skipped: Loom v1 may drift back into graph spectacle, Commander Finder, or deckbuilder-adjacent scope.

## 8. Cut / Defer / Do Not Touch

- Keep account-backed deck saving deferred unless the owner explicitly reactivates VM-422 and VM-446 and live RLS proof passes.
- Do not claim Supabase/profile/deck-link privacy guarantees without live owner/non-owner/service-role evidence.
- Do not refresh visual baselines without explicit owner acceptance of current route visuals.
- Do not add LLM fallback before deterministic compiler coverage and failure categories are measured.
- Do not expand into broad deckbuilder, legality-checker, EDHREC-clone, ranking, scoring, best-card recommendation, or community-platform behavior.
- Do not hand-edit `data/scryfall/grounding/scryfall-grounding.json`; update generator/overrides and rerun the grounding command.
- Do not patch generated dossier snapshots or generated JSON to hide warning volume.
- Do not treat Loom v1 as approved graph UI, PACKAGE mode, Commander Finder, custom-card generation, or placement-personalized advice.

## 9. Executive Summary

Best current use: Scoped static demo and product/QA case study, now with stronger readiness evidence and a newly credible Maze compiler story.

Most important changed conclusion: Maze/Plain Reading has moved from "support loop with parser risk" to "strategic asset candidate with coverage/governance debt."

Most differentiated new asset: The generated Scryfall grounding plus curated semantic registry plus inspectable Plain Reading compiler path.

Biggest remaining risk: Overclaiming readiness before visual owner acceptance, deployed metadata/social proof, external reviewer evidence, full-suite health, and compiler corpus metrics exist.

Recommended next phase: Proof and measurement, not broad feature expansion: full-suite cleanup, compiler corpus, Query Inspector polish, redeploy/social recheck, hosted browser-smoke observation, and VM-469 reviewers.

Guiding sentence: Make the grounded Maze compiler measurable and understandable while keeping Vox Mana publicly framed as a Commander taste compass, not a deckbuilder, account platform, or authority engine.

## Appendix

### Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/audits/2026-06-30-vox-mana-self-snapshot.md`
- `docs/handoffs/2026-06-30-2144-codex-vm459-self-snapshot-refresh.md`
- `docs/handoffs/2026-06-30-2155-codex-vm460-collaboration-self-snapshot-refresh.md`
- `docs/handoffs/2026-07-03-0951-codex-vm461-465-readiness-pass.md`
- `docs/handoffs/2026-07-03-2041-codex-vm466-470-decision-qa-pass.md`
- `docs/handoffs/2026-07-04-0045-codex-vm471-scryfall-grounding.md`
- `docs/handoffs/2026-07-04-0912-codex-vm472-robust-implicit-maze-compiler.md`
- `docs/handoffs/2026-07-04-0958-codex-vm473-mixed-mode-ambiguity-blocking.md`
- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/strategy/2026-07-03-loom-v0-v1-naming-concept-seed-decision.md`
- `docs/strategy/2026-07-03-external-reviewer-two-week-test.md`
- `docs/qa/2026-07-03-deployed-static-smoke-social-preview-check.md`
- `docs/qa/2026-07-03-browser-smoke-ci-pilot.md`
- `docs/qa/visual-baseline-waivers.md`
- `docs/qa/2026-07-03-mobile-cross-browser-readiness-scorecard.md`
- `docs/qa/2026-07-03-accessibility-evidence-pass.md`
- `docs/qa/2026-07-03-dossier-warning-triage.md`
- `docs/contracts/maze-query-contract.md`
- `docs/architecture/maze-plain-reading-deep-dive.md`
- `docs/architecture/scryfall-data-pipeline.md`
- `package.json`

### Files changed

- `docs/audits/2026-07-04-vox-mana-delta-reevaluation.md`
- `docs/kanban/done/VM-474-vox-mana-delta-reevaluation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-04-1237-codex-vm474-delta-reevaluation.md`

### Tests run

- `rg -n "VM-474|2026-07-04-vox-mana-delta-reevaluation|2026-07-04-1237-codex-vm474-delta-reevaluation|Vox Mana Delta Reevaluation" ...` across the report, card, board, handoff index, and handoff - passed.
- `git diff --check -- docs\audits\2026-07-04-vox-mana-delta-reevaluation.md docs\kanban\done\VM-474-vox-mana-delta-reevaluation.md docs\kanban\board.md docs\handoffs\HANDOFF_INDEX.md docs\handoffs\2026-07-04-1237-codex-vm474-delta-reevaluation.md` - passed with existing LF/CRLF warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.

### Known limitations of this reevaluation

- It is based on repo evidence and handoffs, not fresh live browser, hosted Actions, Supabase, or external reviewer runs.
- It does not inspect the full runtime implementation beyond the relevant docs/contracts/handoffs.
- It does not re-run visual comparisons, dossier audit, parser tests, or full `npm.cmd test`.
- It does not validate current deployed metadata after a new deploy; VM-468 remains the latest deployed evidence.
