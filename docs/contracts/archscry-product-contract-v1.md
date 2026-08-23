# Archscry Product Contract v1

Status: Proposed normative v1 for owner review

Phase: Archscry Phase 2 — New Product Contract

Starting baseline: `e875c624d2c3463aa6af9b8ab473c7401a4d6d14`

Related card: [VM-588](../kanban/done/VM-588-archscry-phase-2-product-contract.md)

## 1. Product Promise

Archscry may let a player state what they currently think they like, independently observe their Commander decision preferences, explain how those facts relate, and offer a few useful directions to explore.

The governing rule is:

> **This is not A + B = C.**

`self_reported_prior` and `observed_gameplay_fit` are separate facts. They may agree, partially overlap, disagree, or be non-comparable. Reconciliation explains that relationship. It never creates a replacement identity, a hidden composite score, or a more authoritative “true” result.

In this document, **must**, **must not**, **may**, and **deferred** are normative.

## 2. Frozen Authority

This contract accepts and does not reopen:

- [Phase 1 current-production truth](../strategy/2026-08-23-archscry-phase-1-current-production-truth-acceptance.md);
- [VM-586 current-state evidence](../kanban/done/VM-586-archscry-current-state-evidence-red-team-reconciliation.md);
- [VM-587 Yore evidence stop](../kanban/done/VM-587-yore-behavioral-placement-remediation.md);
- the current Gate B1 questionnaire, mappings, ranking, qualification, stopping, refinement, witnesses, and result behavior;
- all 37 current dossiers and dossier-to-Maze behavior.

Yore remains a valid dossier and metaphysical identity with a behaviorally bounded placement result. Self-report must not be used to force Yore into a named behavioral result.

## 3. Reuse Map

| Phase 2 concern | Existing owner or nearest authority | Decision | Phase 2 responsibility |
| --- | --- | --- | --- |
| Behavioral observations, candidate ranking, qualification, stopping, and qualified alternatives | Current Gate B1 model and `gate-b1-placement-engine.js` | Reuse unchanged | Treat its finalized public result as `observed_gameplay_fit`; never pass prior data into its evidence, candidate, qualification, or stopping paths. |
| Public result states | Gate A presentation normalization in `archscry-presentation.js` | Reuse unchanged | Preserve `primary`, `close`, `tied`, `mixed`, `contradictory`, `insufficient`, and compatibility states. |
| Existing `IDENTITY_LENS_SELF_REPORT` | [Gate B1 identity/lens contract](../plans/vm551-gate-b1-placement-instrument/identity-lens-self-report-contract.md) and the separate `lens_ledger` | Clarify and keep separate | It is an optional post-behavior lens for an already bounded Yore/Glint frontier. It is not a pre-reading prior, cannot introduce a candidate, and cannot be repurposed as one. |
| General starter profile | Current `starter_profile` fields for format, budget, and experience | Reuse without reinterpretation | These fields are not identity or mechanic claims and must not be treated as `self_reported_prior`. |
| Player-authored starting context | No current field safely owns identity claims plus mechanic/playstyle preferences; VM-009 defers a broader saved Taste Profile | Add the smallest missing semantic concept | Define a bounded `self_reported_prior` snapshot. Reuse the existing reading/result envelope in a future implementation; do not create a parallel profile system. |
| Prior/behavior relationship | No current owner compares a starting prior to a finalized public behavioral result | Add one pure derived relationship | Define `reconciliation` as set comparison plus explanation only. It has no score, qualification, routing, or naming authority. |
| Behavioral alternatives and comparisons | Current qualified alternatives, dossier comparisons, and Gate A cardinality | Reuse | Preserve their existing evidence and public-state requirements. Raw rank two is not adjacency. |
| Commander directions | Commander Compass and its Native Fit / Weird Stretch guidance | Reuse/extend later | May supply commander-facing exploration and fit/caution language. It remains product guidance, not placement or identity authority. |
| Mechanic and playstyle discovery | Existing reviewed taxonomy, dossier paths, Maze query handoff, Loom direction, and Strategium learning links | Reuse/clarify | A preference may seed explanation or downstream exploration only when an existing approved owner can resolve the relationship. Phase 2 creates no mechanic-to-identity engine. |
| Reading persistence and saved return | Normalized `placement_result`, `VM_SESSION`, session cache, profile save/resume, and additive versioning guidance | Reuse/extend later | Clarify reading snapshot integrity. Do not create a new persistence subsystem or infer a prior from a saved placement. |
| Reading telemetry | Existing non-identifying `reading_started`, `question_answered`, and `reading_completed` events | Reuse unchanged | Phase 2 adds no telemetry. Prior values, prose, and preferences must not leak into current events. Any Phase 3 experiment schema requires separate authorization and consent review. |
| Contract fixtures and proof seams | VM-579 dev-review route, VM-586 witnesses/traces, current focused tests, and audit conventions | Reuse | Add one compact design-fixture table now. Phase 3 should extend focused current seams, not create another test platform. |

The only new Phase 2 concepts are the player-authored prior snapshot and the pure reconciliation relation. Existing structures cannot represent either honestly without confusing player claims with behavioral evidence, so both are necessary. They are semantic contracts, not new runtime layers.

## 4. Signal Ownership

| Fact | Owner | May establish | Must never establish |
| --- | --- | --- | --- |
| `self_reported_prior` | The player, captured as a snapshot for one reading | What the player currently says they know, identities they claim, and reviewed mechanic/playstyle preferences they select | Behavioral evidence, candidate support, qualification, naming, score, result state, or a global true identity |
| `observed_gameplay_fit` | Current governed behavior-first placement flow | The current public result state, responsible named directions, qualified alternatives, limitations, and answer-grounded explanation | What the player previously believed or which mechanic they say they love |
| `reconciliation` | A pure comparison/presentation seam after the observed result is final | Whether comparable identity sets overlap and how to explain agreement, disagreement, or uncertainty | Candidate ranking, placement correction, tie-breaking, stopping, or another result |
| Downstream exploration | Current qualified-alternative, Commander Compass, dossier, Maze, Loom, Strategium, or other separately approved exploration owner | A small direction to explore for an explicit approved reason | Placement truth, a new winner, hidden relevance score, legality/canon proof, or a claim that exploration is the player’s identity |

Gate 1 is satisfied only when an implementation preserves these four owners in its data flow and presentation.

## 5. `self_reported_prior`

### 5.1 V1 contents

A prior snapshot contains only:

- one knowledge state: `unsure`, `some_preferences`, or `identity_literate`;
- zero, one, or multiple identity claims from the authoritative identity registry;
- zero or more reviewed mechanic/playstyle preferences that an existing taxonomy or downstream owner can represent safely.

Identity claims are a set, not a ranking. Multiple claims do not create a preferred winner. Knowledge state describes the player’s comfort naming preferences; it is not confidence, expertise, accuracy, or evidence strength.

### 5.2 Capture rules

- The prior is optional. Skipping it is valid.
- No numeric self-confidence is collected.
- No identity claim receives weight from selection order, knowledge state, repetition, or agreement with a later result.
- Mechanic/playstyle preferences remain player claims. If no approved downstream owner can relate a preference to a direction, preserve it as context or omit the direction; do not improvise a mapping.
- Favorite-commanders, deck import, free-text inference, account-wide Taste Profile inference, and inferred “true identity” are deferred.
- A saved behavioral placement, current dossier, prior `starter_profile`, or existing `lens_ledger` must not be backfilled as a prior.

## 6. `observed_gameplay_fit`

`observed_gameplay_fit` is the finalized current Gate B1 result after Gate A public normalization. Its owner and behavior do not change in Phase 2.

The prior must never:

- add or remove score;
- add positive, negative, naming, or qualification evidence;
- satisfy a dependency, construct, boundary, or naming rule;
- promote, suppress, prune, or introduce a candidate;
- change the internal or public candidate order;
- convert `insufficient`, `contradictory`, `incomplete`, `unknown`, or `invalid` into a named result;
- convert `close`, `tied`, or `mixed` into `primary`;
- select a winner among multiple prior claims;
- make a raw runner-up a public adjacent direction;
- change an observed result after it has been finalized.

For reconciliation, the comparable observed identity set contains only the responsible public named directions emitted by the existing public result contract. Internal candidates, raw leader, scores, and unqualified rank order are excluded.

## 7. `reconciliation`

Reconciliation is computed only after `observed_gameplay_fit` is final. It compares the set of self-reported identity claims with the set of public named observed directions.

| Relationship | Exact meaning |
| --- | --- |
| `no_prior` | The player skipped the prior; no prior snapshot exists. |
| `exact_overlap` | Both comparable identity sets are nonempty and equal. |
| `partial_overlap` | Both sets are nonempty, their intersection is nonempty, and the sets are not equal. |
| `no_overlap` | Both sets are nonempty and disjoint. |
| `not_comparable` | A prior exists, but either the prior has no identity claims or the observed result has no public named identity set. Mechanic/playstyle preferences remain separately explainable. |

The relationship is deterministic set logic. It has no magnitude, probability, confidence, directionality, score, or winner.

Changing display order must not change reconciliation. Mechanic/playstyle preferences do not enter the identity-set comparison. They may produce a separate explanation or approved exploration reason.

## 8. Influence Boundaries

| Prior information | Allowed now | Allowed only after Phase 3 proof and separate authorization | Prohibited |
| --- | --- | --- | --- |
| Knowledge state | Journey framing and explanation tone | Cohort selection or choosing between otherwise equally legitimate discriminator opportunities after the blind floor | Scoring, pruning, qualification, stopping, or treating expertise as truth |
| Identity claims | Reconciliation, “your current read” explanation, and bounded self-reported exploration | Choosing between otherwise equally legitimate discriminator opportunities after the blind floor | Any placement evidence or confirmation-biased route, result, or early stop |
| Mechanic/playstyle preferences | Context and approved downstream exploration with `why this appeared` | The same narrow equal-opportunity question-efficiency use if Phase 3 separately proves it | Identity mapping, placement support, candidate pruning, or a new combined result |
| Reconciliation state | Explanation and journey handoff | Nothing more is implied | Any engine, routing, qualification, or recommendation weight |

Behavioral evidence needs always outrank prior convenience. Gate 2 fails if a prior can change placement truth through either a direct field or an indirect routing/stopping shortcut.

## 9. Bounded Multi-Direction Exploration

### 9.1 Allowed reason classes

Every surfaced direction must have at least one of these reasons:

- `behavioral_primary` — the current responsible named behavioral direction;
- `behavioral_close_or_adjacent` — an existing public supported alternative under the current result contract;
- `self_reported_identity` — an identity the player explicitly claimed;
- `self_reported_mechanic_playstyle` — an approved downstream owner related a stated preference to this exploration direction;
- `existing_downstream_output` — an existing Commander Compass, dossier, Maze, Loom, Strategium, or separately approved exploration owner produced it.

### 9.2 Required explanation

Each direction must answer, in plain language:

> **Why this appeared**

The explanation must name the fact class without overstating it, for example: behavior supported it; it remained close; the player named it; a stated mechanic opened this search path; or an existing downstream guide produced it.

Audit/internal state may retain the reason class and source locator. Normal player copy must not expose raw scores, raw qualification mechanics, dependency groups, mapping strength, or internal model versions.

### 9.3 Prioritization without a master score

Composition uses categorical precedence, not a relevance score:

1. preserve the observed behavioral primary when one exists;
2. preserve current public close/adjacent directions when they add a real supported comparison;
3. add a distinct self-reported identity or approved mechanic/playstyle path only when it adds useful exploration;
4. use existing downstream outputs for the remaining useful continuation.

Duplicate directions are merged while their distinct reasons remain visible. No reason points are added together. A direction with three reasons is not a stronger placement than one with one reason.

The final set must remain small. Exact display count is a future UI decision, but every additional direction must add a distinct player benefit and a defensible reason. Do not show every plausible identity or fill empty space.

Gate 3 fails if a direction lacks `why this appeared`, depends only on raw rank, or implies a new placement result.

## 10. Question-Efficiency Boundary

### 10.1 Safe Phase 2 default

The current full behavioral journey remains prior-independent. Phase 2 authorizes no shortened path and no questionnaire change.

### 10.2 Blind observation floor

Self-report must be unavailable to question selection until a versioned, prior-independent evidence floor has been completed.

The current instrument’s fixed four Gate observations are the earliest repository-grounded checkpoint Phase 3 may test because the current route already collects them before adaptive Hall selection. Phase 2 does **not** declare four questions sufficient. If Phase 3 cannot prove that checkpoint safe, the floor remains the complete prior-blind route required by the current instrument.

### 10.3 After the floor

Phase 3 may test whether a prior can choose between question opportunities that are already equally legitimate under current behavioral evidence. It must not:

- choose a less useful question to confirm the prior;
- remove or hide an identity or boundary;
- change scoring, mapping, qualification, naming, or stopping;
- satisfy an evidence obligation;
- stop because prior and behavior agree;
- suppress an unexpected direction;
- exceed the current instrument’s question limit.

Any time behavioral evidence distinguishes the opportunities, the behavioral need wins. The current engine alone decides when its evidence and stopping obligations are satisfied.

## 11. Reading-State Integrity

A completed reading semantically owns one immutable bundle:

```text
prior snapshot used for this reading (or none)
+ finalized observed gameplay fit
+ reconciliation derived from those two snapshots
```

This bundle extends the meaning of the existing normalized result envelope; it does not create a new persistence subsystem.

Rules:

- The observed result is immutable after finalization.
- The original prior snapshot and reconciliation for that reading are immutable.
- Editing a current/global prior later must not rewrite a historical reading.
- If the product compares an older observed result with an updated prior, it creates a clearly labeled new comparison and leaves the original reading intact.
- A retake is a new reading with a new prior snapshot, observed result, and reconciliation.
- Cached, account-saved, and in-memory state must never combine the prior from one reading with the observed result from another.
- A latest-only store may replace the latest whole reading atomically; it must not merge fields across readings or imply retained history it does not have.
- Missing additive prior fields in a legacy saved result mean `no_prior`; they do not authorize inference from the saved faction, `starter_profile`, or `lens_ledger`.
- Future storage changes must follow the existing additive versioning, legacy-read, and rollback rules.

## 12. Public Explanation Contract

These are language obligations, not final UI copy.

### Your current read

State exactly what the player supplied. Multiple identity claims remain multiple. If the player skipped, omit the section or say that no prior was supplied. Never infer one.

### What your gameplay answers suggested

State the independent current public result and its existing uncertainty. Use behavior-first result language. Do not imply that prior agreement strengthened it.

### Where they line up

Use only for `exact_overlap` or `partial_overlap`, and name the actual overlap. Agreement is descriptive, not confirmation evidence.

### Where another direction appeared / What remains unclear

Use for `no_overlap`, `not_comparable`, close/mixed/tied outcomes, mechanic-based exploration, or insufficiency. Explain the source of each direction without telling the player they were wrong or that Archscry discovered a truer identity.

Normal player copy must avoid:

- raw scores or score gaps;
- raw leader or internal candidate order;
- qualification rules and dependency groups;
- mapping strength or model versions;
- “actually,” “corrected,” “real identity,” “true identity,” or equivalent winner language.

Exact versions, provenance, source locators, reason classes, and audit evidence remain internal unless a later public provenance design is separately approved.

## 13. Journey Contracts

### Experienced or returning player

1. The player may supply or skip a bounded prior.
2. The current behavior-first journey runs without prior influence.
3. A future reduced path may start only after Phase 3 proves the blind floor and influence boundary.
4. The result presents the prior, observed fit, and relationship separately.
5. A few reason-bearing exploration directions may continue into existing Commander Compass, dossier, Maze, Loom, or Strategium owners.
6. A legacy saved result with no prior remains valid as `no_prior`; the product does not fabricate history.

### New or unsure player

1. `unsure` with no identity claims is a complete valid prior snapshot.
2. Identity literacy is not required to receive the normal behavior-first journey.
3. The product must not disguise identity names as required knowledge or punish “not sure.”
4. Mechanic/playstyle preferences may be recorded only through reviewed terms and remain non-placement context.
5. The result explains what answers supported, what remains unclear, and useful next steps without demanding a self-label.

## 14. Contract Fixtures

The normative design suite is [Archscry Phase 2 Contract Fixtures](archscry-phase-2-contract-fixtures.md). The 12 cases cover agreement, disagreement, partial overlap, no prior, ambiguity, Yore, mechanic crossover, prior edits, and retakes.

If implementation requires a fixture-specific exception to signal ownership, relationship logic, influence boundaries, or reading integrity, simplify or reject the implementation. Do not add another state merely to make one fixture pass.

## 15. Five Exit Gates

| Gate | Material action | Product value | Unlock |
| --- | --- | --- | --- |
| 1 — Signal ownership | Approve the owners in Sections 3–4 | Prevents silent mixing of player claims and placement evidence | Safe reconciliation design |
| 2 — Influence boundaries | Approve Sections 5–10 | Prevents confirmation bias, hidden pruning, and prior-driven stopping | Phase 3 reduced-path experiment |
| 3 — Bounded exploration | Approve Section 9 reason classes, categorical precedence, and `why this appeared` | Enables useful adjacent/mechanic exploration without an identity cloud or master score | Future result/exploration design |
| 4 — Fixtures coherent | Walk the 12 fixtures without exceptions | Proves the contract handles agreement, disagreement, Yore, mechanics, multiple priors, and state history | Contract acceptance |
| 5 — Phase 3 proof plan | Approve the [Phase 3 Proof Handoff](../handoffs/2026-08-23-1344-codex-archscry-phase-3-proof-handoff.md) | Turns this contract into a measurable next product improvement | Phase 3 planning only |

No extra exit gate is implied.

## 16. Explicit Deferrals

Phase 2 does not authorize:

- UI or final copy;
- questionnaire, mapping, scoring, engine, qualification, or stopping changes;
- a recommendation or mechanic-to-identity engine;
- an exact exploration display count;
- favorite-commander, deck-import, or free-text inference;
- account-wide Taste Profile persistence;
- a telemetry or database schema;
- Phase 3 experiment execution, recruitment, shadow collection, or production cutover.

Any implementation that needs one of these is outside this contract and must stop for separate authorization.
