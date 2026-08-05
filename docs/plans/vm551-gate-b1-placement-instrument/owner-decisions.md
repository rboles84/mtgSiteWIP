# VM-551 Gate B1 Owner Decisions

Status: all twelve architecture decisions and six answer-signal decisions answered by owner on 2026-08-04. Gate B1 semantic design is owner approved after the directed corrections. Player-validation preparation requires separate authorization. Pilot implementation is not authorized.

These decisions approve the architecture, remediated question wording, construct presentation, and corrected answer semantics. They do not validate identity mappings, authorize scoring, begin player-validation preparation or execution, or authorize implementation, migration, shadow collection, cutover, deployment, or certification.

## OD-B1-01 — Construct scope

Owner decision: approve the 15-construct map. Do not reduce or expand it during this pass.

Original recommendation: approve 15 because it is the smallest current set that avoids silent construct conflation.

Impact: construct scope is fixed for this remediation. A later change requires a new owner decision and coverage review.

## OD-B1-02 — Pilot-bank size

Owner decision: approve the 34-question pool: 4 Gate, 12 Hall, and 18 Crucible. One reading remains exactly 4 Gate, 2 or 3 Hall, 0 or 1 Crucible, and 6 to 8 questions total.

Original recommendation: approve the coverage-derived adaptive pool.

Boundary: add no question unless an existing item cannot measure its construct. Any replacement must preserve the 34-item count and the item's stable pool role.

## OD-B1-03 — Personal philosophy

Owner decision: retain official Magic color, guild, college, shard, wedge, and related philosophy as a source-backed interpretive and explanatory layer only.

Original recommendation: keep philosophy outside B1 identity support and collect any future reflection separately.

Approved uses: post-result explanation, why an identity may resonate with observed play, optional reflection, exploration and discovery context, and future recommendation explanation.

Prohibited uses: philosophy cannot create an observation, award identity support, replace missing deck behavior, determine routing or stopping, break a tie, convert thematic affinity into gameplay preference, or strengthen a behaviorally unsupported result. Official philosophy remains part of the wider Archscry product concept.

## OD-B1-04 — Minimum evidence

Owner decision: approve the proposed independent-evidence requirements inside the existing route, with a hard maximum of eight questions.

- Ordinary named exploratory result: at least 3 reasonably independent observations across at least 2 stages, including 1 relevant boundary observation.
- High-confusion or insufficient-evidence identity: at least 4 reasonably independent observations, including a direct boundary observation.
- Otherwise return close, tied, mixed, contradictory, or insufficient.

Original recommendation: use those same minimums to prevent one-answer or dependency-only winners.

Boundary: relevant independent Gate observations count. The rule does not require four special follow-ups. Never extend the route to force a name; if the threshold is unmet by question eight, preserve uncertainty.

## OD-B1-05 — Mixed and uncertain answers

Owner decision: mixed, conditional, neither, unknown, and representational-failure responses are evidence-bearing but non-directional.

Original recommendation: keep such responses non-directional and add them only where conditionality or representational failure is genuine.

They may show unstable or deck-dependent preference, option-set failure, justification for another Hall observation, lack of support for a strong name, or need for item revision. They must not give half support to both sides, manufacture midpoint identity evidence, be averaged into directional support, or weakly support every candidate.

## OD-B1-06 — Theme-first players

Owner decision: approve C10 as a theme-versus-efficiency deckbuilding tradeoff and explanation layer.

Original recommendation: capture the tradeoff without treating theme as behavior.

Boundary: theme cannot independently name or exclude an identity. Explanations should distinguish observed deck behavior from thematic attachment.

## OD-B1-07 — Terminology and player experience

Owner decision: approve one layered instrument. Do not create beginner, intermediate, and advanced quizzes.

Original recommendation: use concrete scenarios, concise atmosphere, plain explanations, inline definitions, and genuine uncertainty handling.

Boundary: experience level is not an identity signal. Every adaptively reachable question must be self-contained and use accurate terminology.

## OD-B1-08 — Shadow-test duration

Owner decision: approve a future minimum of 14 days, the documented cohort and route-coverage floors, and at least 108 eligible completed journeys so every Crucible item receives at least six eligible exposures. Continue while a required cohort, item, or high-risk identity lacks coverage.

Original recommendation: stop by time plus coverage, not raw count alone.

Boundary: this is a future validation requirement. This task does not implement shadow testing or recruit participants.

## OD-B1-09 — Migration threshold

Owner decision: approve the documented future visible-cutover threshold.

The threshold requires question and journey checks, all-37 structural tests, preserved close and insufficient outcomes for weak evidence, dependency/order/perturbation tests, no one-answer strong-to-strong flips, legacy and downstream compatibility, rollback proof, and separate approval of an exact implementation candidate.

Original recommendation: require the same evidence and compatibility protections.

Boundary: no migration work is authorized in this task.

## OD-B1-10 — Colorless and Five-Color parity

Owner decision: Colorless and Five-Color must be as genuinely placeable as every other identity. They are eligible for ordinary named results, need positive behavioral and boundary evidence, receive full explanations and player-validation representation, and are not fallback, novelty, error, or special-channel categories.

Original recommendation: keep C15 as boundary evidence rather than a direct assignment channel.

Boundary: C15 cannot assign Colorless, Five-Color, mono-color, or multicolor by itself. Colorless/Five-Color needs prior independent behavior plus its direct boundary. Mono/multicolor also needs prior behavior and cannot cause a one-answer flip. Route parity does not require identical paths.

## OD-B1-11 — Scoring boundary

Owner decision: approve the non-scoring separation of observation → signal → reviewed identity support → exclusions and contradictions → stopping and stability → Gate A public result state.

Original recommendation: keep every answer non-scoring until a separately authorized evidence-backed design.

Boundary: do not assign weights, points, probabilities, likelihoods, or score adjustments.

## OD-B1-12 — Public result states

Owner decision: reuse Gate A public result states and explanation tone. A future additive implementation may add version provenance.

Original recommendation: reuse Gate A rather than create a separate B1 presentation.

Boundary: do not reopen Gate A or create a B1 result presentation.

## Answer-semantic decisions

Owner decision: approve the remediated 34-question bank subject to the following corrections, now incorporated:

- `b1.hall.interaction-window.v1.pressure`: rejected preventive-pressure wording and C08 mapping. The replacement asks about interacting when the opponent commits the decisive mana, card, or attack and maps to `SIG_C08_COMMIT_WINDOW` within C08.
- `b1.crucible.ug.v1.adapt`: rejected creature-centered adaptation as evidence of modular concentration. The revised UG/Quandrix item directly contrasts overlapping engines with one central engine; this option maps to `SIG_C06_MODULAR`.
- `b1.crucible.ug.v1.scale`: rejected abstract scaling as evidence of a central engine. The revised option explicitly observes one concentrated central engine and maps to `SIG_C06_CENTRAL`.
- `b1.crucible.wb.v1.influence`: approved after rewording as an influence-centered agreement that changes the current table situation without binding later choices; retains `SIG_C13_REVISABLE`.
- `b1.crucible.witch-yore.v1.compound`: approved after correction to one central engine that compounds value over time; maps to `SIG_C06_CENTRAL`.
- `b1.crucible.witch-yore.v1.convert`: approved after correction to several interchangeable conversion pieces rather than one indispensable engine; maps to `SIG_C06_REDUNDANT`.

The five corrected directional Crucible answers remain identity-association hypotheses. They join the 32 previously `EVIDENCE_REQUIRED` rows and must remain non-scoring until eligible player evidence supports, revises, or rejects them. Retention does not establish that their identity mappings are true.

Approval scope: wording and construct presentation only. It does not authorize weights, scoring, implementation, player recruitment, player-validation preparation or execution, shadow testing, migration, deployment, production use, or certification.

## Current disposition

The architecture, 15-construct scope, remediated 34-item pool, and corrected answer semantics are owner approved. All six signal decisions are resolved, zero rows remain `SIGNAL_REVIEW_REQUIRED`, and 37 directional Crucible mappings remain `EVIDENCE_REQUIRED`. No answer is scoring-authorized.

Gate B1 semantic design may advance only to a separately authorized player-validation preparation phase. That phase has not been authorized. Pilot implementation remains unauthorized.
