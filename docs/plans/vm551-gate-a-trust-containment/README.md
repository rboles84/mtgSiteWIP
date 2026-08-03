# VM-551 Gate A — Archscry Trust Containment Design

Status: closed — owner accepted, integrated, pushed, and production verified
Design base: `ec562f268181c9feb042eef9df20777730d64f0f`
Approved design: `c6b1c9e6940b67201c8c2f999409a7103ba52b88`
Owner-approved implementation: `471567059c876368329fd7cf9c24eacfcd6d03c1`
Scope: Gate A public trust containment only; Gate B1 remains excluded

## Owner approval

On 2026-08-01, the owner approved exact design commit `c6b1c9e6940b67201c8c2f999409a7103ba52b88` and accepted recommended defaults `OD-01` through `OD-18` without deviation. On 2026-08-03, the owner accepted exact implementation SHA `471567059c876368329fd7cf9c24eacfcd6d03c1`; it was integrated into `main`, pushed, and verified on production. Gate A is closed. Gate B1 was not started or authorized by this closeout.

## Outcome

This package defines the smallest safe Gate A repair for the current Archscry experience. Gate A changes public interpretation and rendering: it names the model honestly, stops presenting softmax output as calibrated confidence, adds bounded public result states, grounds placement language in recorded answers, and treats numerical runners-up as close alternatives only when a documented presentation rule permits it.

Gate A preserves the placement model and every accepted downstream contract. It does not change the 113 questions, 356 answers, scoring deltas, suppressions, lateral inhibition, Gate/Hall/Crucible branching, adaptive stopping, identity semantics, Commander recommendation data, either Matrix numeric path, serialized field names, or stored field shapes.

## Governing authority

The integrated VM-551 audit controls this design:

- `docs/audits/vm551-placement-system/VM-551-full-placement-system-audit.md`
- `docs/audits/vm551-placement-system/bounded-mvp-repair-plan.md`
- `docs/audits/vm551-placement-system/requirements-traceability-matrix.csv`
- `docs/audits/vm551-placement-system/downstream-compatibility-contract.md`
- `docs/audits/vm551-placement-system/result-field-consumer-map.csv`
- `docs/audits/vm551-placement-system/owner-review-critical-extract.md`

Boundary precedence remains unchanged: the bounded MVP plan, requirements traceability matrix, and downstream compatibility contract govern Gate A/B1/B2. This package interprets those authorities for implementation; it does not revise them.

## Five Gate A requirements preserved

| Requirement | Design response |
|---|---|
| `REQ-A-001` | Publicly name the model **Adaptive weighted reading**; describe implementation more precisely as adaptive, additive/weighted, hand-authored, suppression-aware, lateral-inhibition-aware, and softmax-ranked. Never call it Bayesian. |
| `REQ-A-002` | Remove public numeric confidence/probability/correctness/strength claims while preserving numeric internals, serialized shapes, persistence, both Matrix paths, and every mapped downstream consumer. |
| `REQ-A-003` | Add bounded public handling for `primary`, `tied`, `close`, `mixed`, `contradictory`, `insufficient`, `unknown`, `invalid`, and `incomplete`; never invent evidence or calibrated thresholds. |
| `REQ-A-004` | Preserve `adjacent_matches` structurally, but publicly call an eligible rank-two result a **close alternative**. Hide rank three in Gate A and omit alternatives when eligibility is not established. |
| `REQ-A-005` | Render answer-grounded observation → signal → bounded interpretation copy; qualify Commander, deck-behavior, motivation, and table-perception language. |

## Package map

- [Current UI and copy inventory](current-ui-and-copy-inventory.md)
- [Gate A result-state contract](gate-a-result-state-contract.md)
- [Public confidence replacement](public-confidence-replacement.md)
- [Placement language contract](placement-language-contract.md)
- [Close-alternative contract](close-alternative-contract.md)
- [Matrix compatibility plan](matrix-compatibility-plan.md)
- [Implementation file plan](implementation-file-plan.md)
- [Gate A regression matrix](gate-a-regression-matrix.csv)
- [Owner decisions](owner-decisions.md)
- [Implementation slices](implementation-slices.md)
- [Implementation status and compatibility record](implementation-status.md)
- [Owner QA record](../../qa/2026-08-01-vm551-gate-a-owner-qa.md)

## Smallest safe implementation shape

1. Preserve the existing placement result verbatim for ranking, replay, persistence, and downstream compatibility.
2. Derive or preserve additive public-state metadata during normalization.
3. Render state-bounded language from recorded evidence without changing scores.
4. Keep an alternative view attached to the original reading; never recalculate or overwrite the primary.
5. Test all writers/readers and both Matrix paths before owner visual review.

The result-field consumer map is covered row-for-row in `implementation-file-plan.md`. No accepted row is removed, renamed, or reinterpreted.

## Explicit exclusions

Gate A does not include questionnaire refitting, scoring-authority reconstruction, stable answer-ID migration, provenance repair, dependency grouping, minimum-hit or false-positive guardrail enforcement, calibration, semantic adjacency, recommendation redesign, identity-definition changes, schema migration, Matrix redesign, or unrelated routes. Those remain Gate B1 or later.

## Review gate

The owner approved `OD-01` through `OD-18`, and the seven bounded slices have been implemented locally. The candidate now stops for owner visual and copy review. Merge, push, deployment, certification, Gate B1 work, and any broader implementation remain unauthorized.
