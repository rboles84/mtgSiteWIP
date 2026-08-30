# Archscry Phase 3 Experienced-Player Routing Proof

Status: `OWNER ACCEPTED — RESEARCH COMPLETE / IMPLEMENTATION BLOCKED / POST-LAUNCH DEFERRED`

Card: [VM-594](../kanban/done/VM-594-archscry-phase-3-experienced-player-routing-proof.md)

Baseline: `891cf3e19ee72c19050cc0bee992ef61341e9fc3`

## Owner Summary

Experienced-player shortening could matter: the accepted 37-witness production baseline has a median of eight questions, and 27 of 37 witnesses use all eight. The current engine, however, cannot prove that two equally scored question opportunities expose equivalent evidence or preserve the same stopping and result possibilities. Three of four observed exact utility ties have different exhaustive terminal-outcome sets when the tied question is forced first.

> **NO SAFE PRIOR-ASSISTED FLOOR FOUND**

C01–C04 is not viable as the floor. A later checkpoint does not repair the missing equivalence contract. The safe current floor is the complete prior-blind route, which leaves no question-routing role for the prior.

> **BLOCKED — NO SAFE ROUTING SEAM**

This is an architecture-roadmap stop, not a launch blocker. Relative to core-path correctness, repetitive/generated-sounding placement prose, onboarding/Field Guide coverage, bounded UI improvements, and typography/brand consistency, this shortcut is a **POST-LAUNCH ENHANCEMENT**.

## 1. Current Routing And Question Counts

```text
startQuickFlow()
  -> createInitialState(model)
  -> fixed Gate: C01 -> C02 -> C03 -> C04
  -> rankCandidates() + routingCandidates()
  -> eligible Hall questions
       unanswered + unused dependency group
       utility = discrimination + qualification + 2 * qualification-completion
       highest utility; then authored order; then ID
  -> at least 2 Hall, at most 3 Hall
  -> optional Yore/Glint lens OR one eligible Crucible opportunity
  -> evaluateStopping() after every answer (minimum 6; maximum 8)
  -> finalizeReading() -> withGateAPublicState()
  -> SESSION + latest-result cache + bounded V1 telemetry
```

| Concern | Current owner |
| --- | --- |
| Fixed Gate and adaptive selection | `selectNextQuestion()`, `nextUsefulQuestion()`, `eligibleHallQuestions()`, `eligibleTargetedQuestions()` in `assets/js/archscry/gate-b1-placement-engine.js` |
| Candidate formation/order | `rankCandidates()`, `plausibleCandidates()`, `routingCandidates()` in the same engine |
| Question utility | `questionDiscriminationTrace()` combines frontier discrimination, qualification gain, and qualification-completion gain |
| Qualification | `getNamingQualification()` requires observability, a naming rule, two positive dependencies, two positive constructs, and no disqualifying contradiction |
| Stopping | `evaluateStopping()` owns responsible names and bounded uncertainty states |
| Bank/version producer | authored `docs/plans/vm551-gate-b1-placement-instrument/`; `scripts/build-gate-b1-placement-model.mjs`; generated `data/gate-b1-placement-model.json` |
| Route orchestration | `assets/js/archscry/runtime/questionnaire.js` |
| Public normalization | `normalizeGateB1PublicResult()` / `withGateAPublicState()` in `assets/js/archscry/archscry-presentation.js` |
| Reading explanation | `assets/js/archscry/dossier/reading.js` and existing dossier composers |
| Reading/session state | `assets/js/archscry/runtime/state.js`, `SESSION.interviewResult`, `vm_cachePlacementResult()` |
| Telemetry | `assets/js/shared/vox-telemetry.js` and `docs/reference/product-telemetry.md` |
| Witness/review owners | all-37 live placement witnesses plus VM-579 Dossier Review and Engine Validation |

The model contains four Gate, 13 Hall, 19 Crucible, and one separately bounded Yore/Glint lens question. The main route is four fixed Gate observations, two or three Hall observations, and at most one Crucible/lens observation. Optional post-result refinement is outside the six-to-eight-question main route and emits no additional V1 funnel events.

### Accepted-witness baseline

`scripts/audit/archscry-phase-3-routing-analysis.mjs` replays the accepted all-37 authority through current selection. Its generated report is [archscry-phase-3-routing-baseline.json](archscry-phase-3-routing-baseline.json). All 37 routes match current production selection.

In that report, `terminal_stopping` describes the main-route engine state after the recorded six-to-eight-question route, while `public_result` records the accepted witness result and may reflect separately authorized refinement when the witness includes refinement questions.

| Measure | Fixed | Adaptive | Total |
| --- | ---: | ---: | ---: |
| Minimum | 4 | 2 | 6 |
| Median | 4 | 4 | 8 |
| Maximum | 4 | 4 | 8 |
| Distribution | 37 at 4 | 6 at 2; 4 at 3; 27 at 4 | 6 at 6; 4 at 7; 27 at 8 |

The public distribution is 35 `primary`, one `close` (Jund with Gruul comparison), and one `insufficient` (Yore). No `tied` or `mixed` route is in the all-37 reachability authority. Current deterministic result-contract fixtures separately preserve eight-question `tied` and `mixed` cases in `scripts/vm551-gate-b1-qualified-alternatives-tests.mjs`; those are contract examples, not prevalence evidence.

All five college and all five four-color witnesses use eight questions; Yore remains `insufficient`. Colorless and WUBRG use eight, as do four of five shards, three of five wedges, and five of ten guilds. This is one witness per identity, so it shows evidence cost, not player prevalence.

## 2. Blind Floor And Equal Opportunity

The fixed observations are C01 initiative posture, C02 resource visibility, C03 disruption posture, and C04 payoff tempo. Across the 37 witnesses, 0–4 are directional: minimum 0, median 3, maximum 4; distribution 1 at 0, 4 at 1, 12 at 2, 12 at 3, and 8 at 4. Neutral/conditional answers remain valid but add no identity direction.

Immediately after C04:

- zero witnesses has a qualified named identity;
- the routing frontier contains 2–8 candidates, median 4;
- frontier distribution is 3 at 2, 10 at 3, 8 at 4, 4 at 5, 3 at 6, 1 at 7, and 8 at 8;
- naming rules, independent positive evidence, boundaries, contradictions, and stability may remain unresolved;
- at least two Hall observations are still mandatory.

> **C01–C04 NOT VIABLE AS FLOOR CANDIDATE**

A wrong prior could choose evidence order while no identity is qualified and up to eight directions remain live. Because stopping can occur at question six, the swapped order can prevent a contradiction or boundary from ever being observed.

### Later checkpoints

Four exact same-stage scalar-utility ties occur:

| Witness state | Before question | Equal opportunities | Exhaustive public terminal sets equal? |
| --- | ---: | --- | --- |
| Golgari | 5 | C08 interaction window / C16 information-to-plan | No |
| Simic | 5 | C08 interaction window / C16 information-to-plan | No |
| Glint | 7 | C08 interaction window / C16 information-to-plan | No |
| Prismari | 7 | C10 theme / C12 sacrifice | Yes |

The Prismari match is only at public terminal-signature level; the engine still does not certify equal ledgers, qualification opportunities, candidate membership/order, or stopping exposure.

Current machinery reports eligibility, frontier, scalar utility and components, unanswered observations, dependency exclusions, and deterministic authored-order tie resolution. It cannot guarantee branch-equivalent evidence exposure, candidate membership/order, qualification/naming opportunities, stopping, unexpected-result discoverability, or order-insensitive player interpretation.

Equal utility is not safe equivalence, and a later checkpoint does not create the missing contract.

> **NO SAFE PRIOR-ASSISTED FLOOR FOUND**

## 3. Control/Assisted Proof Design

This design is retained only for a future reopening.

**Control:** current production completely prior-blind and contract-identical: same bank, floor, mappings, interpretation, candidates, scoring/order, evidence, qualification, naming, stopping, normalization, maximum, refinement, versions, and fallbacks.

**Assisted shadow:** identical except that, after an accepted floor, a separate proof certificate supplies branch-equivalent next-question IDs. With multiple certified IDs and reviewed prior relevance, the prior may choose which certified question comes first. The prior is absent from utility, frontier, ledger, qualification, result, and stopping inputs. One best question, unclear relevance, no prior, stale prior, version mismatch, or certificate failure uses Control.

The engine does not produce that certificate, so Assisted cannot currently be constructed faithfully.

Each paired run must capture prior/version, answer witness, routes, fixed/adaptive/total counts, ledger/obligations, candidate membership/order, qualification, stopping, internal final state, normalized result/cardinality, reconciliation, unexpected-direction survival, and an audit proving question order was the only prior influence.

Minimum future prior input: `knowledge_state` (`unsure`, `some_preferences`, `identity_literate`), unordered reviewed identity claims, optional reviewed mechanic/playstyle terms, and compatible snapshot/version. No confidence, deck import, free text, Commander ingestion, account personality, or optimization input.

### Required paired matrix

| Case | Prior / observed shape | Required invariant |
| --- | --- | --- |
| Matching | Orzhov / Orzhov | Same independent result/language; no agreement stop |
| Wrong/unexpected | Orzhov / Jund | Jund equally discoverable, qualified, ordered, explained |
| Partial | Orzhov / Jund + Orzhov close | No promotion/cardinality change |
| Multiple | Orzhov + Golgari / Golgari | Unordered; no hidden winner |
| Mechanic-only | reviewed term / Orzhov | Never identity evidence or utility |
| No prior/unsure | none / any | Exact current route; all outcomes remain available |
| Close | disjoint prior / close fixture | Membership, order, qualification, cardinality, state unchanged |
| Tied | prior names co-leader / tied fixture | Prior never breaks result tie |
| Mixed | any / mixed fixture | No collapse or hidden promotion |
| Insufficient | any / insufficient | Identical insufficiency and obligations |
| Yore insufficient | Yore / current Yore witness | No named Yore placement |
| Yore disjoint | Yore / Glint or other | Observed identity survives unsuppressed |
| Stale/mismatch | another reading/version | Exact Control fallback; no cross-attribution |
| No tie/irrelevant | any | Exact Control route/count |

The proof must catch skipped contradictory constructs, changed naming/qualification opportunity, asymmetric positive/negative exposure, confirmation-only shortening, dependency-order eligibility changes, changed refinement/frontier, hidden internal divergence behind equal cardinality, order effects, Yore routing leakage, and stale attribution. Any candidate, ranking, evidence, qualification, stopping, naming, cardinality, reconciliation, or public-state divergence fails.

## 4. Savings And Owner Decision

At the measured median, one saved question is 12.5%; two are 25%.

| Definition | Value / justification |
| --- | --- |
| Median one-question reduction among certified eligible cases | Small friction reduction; likely too little for certificate, versioning, prior capture, and maintenance complexity |
| Median two-question reduction with zero divergence | Removes half the adaptive median and 25% of the total median; potentially meaningful if eligibility is not rare |
| At least 50% of eligible cases save 2+, no slower disjoint-prior cases, zero divergence | Demonstrates repeatable value sufficient to justify strict production machinery |

No threshold is recommended because the safety precondition fails. If a future equivalence seam exists, the owner must predeclare one before paired collection.

## 5. Decision And Protected Boundaries

> **BLOCKED — NO SAFE ROUTING SEAM**

No next implementation story is proposed. The blocker is current scalar utility and deterministic tie order, which do not establish branch-equivalent behavioral opportunities.

If separately authorized future work creates that certificate, the smallest probable change is a version-bound route-local prior adapter receiving only certified equivalent IDs and returning one ID or Control fallback. The engine remains sole owner of frontier, utility, evidence, qualification, stopping, and results. This estimate is not authorization.

For `self_reported_prior = none / unsure`, the full route remains available with no narrowing, assumption, changed stopping, or lost uncertainty; all responsible identities remain possible.

Untouched: runtime/UI/CSS/questionnaire behavior; placement sources/model/mappings/scoring/ranking/qualification/stopping; result normalization, dossiers, refinement, persistence, telemetry; VM-593; VM-578; Phase 4; real-player validation.
