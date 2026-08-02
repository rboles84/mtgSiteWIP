# Gate A Result-State Contract

## Purpose and additive shape

Gate A adds a public interpretation layer without replacing the placement result. Existing numeric/serialized fields remain ranking, replay, and compatibility authority. New fields are additive descriptions, not probabilities or calibrated bands.

Candidate later-implementation shape (names require owner approval):

```json
{
  "result_state": "primary",
  "public_confidence_state": "current-best-fit",
  "alternative_state": "none",
  "confidence_display_mode": "bounded-state",
  "model_kind": "adaptive-weighted-scoring",
  "legacy_result": false,
  "limitations": [],
  "compatibility_version": "gate-a-v1"
}
```

No selected name may remove or rename `confidence`, `confidence_gap`, scores, matches, versions, trails, or existing identity fields.

## Resolution precedence

A future pure resolver applies: `invalid` → `incomplete` → `unknown` → explicit compatible state → `tied` → owner-approved `close` → owner-approved/explicit `mixed`, `contradictory`, or `insufficient` → `primary`.

It must be deterministic and unable to modify rank, score, stopping, identity, or evidence.

## State behavior

| State | Available trigger / determination | What is not established | Public behavior | Downstream, saved/legacy, mobile behavior |
|---|---|---|---|---|
| `primary` | Valid completed adaptive result, known faction, usable structural fields, no higher state. Rank one is the current best fit. | Accuracy, calibrated clarity, and minimum evidence. | Heading **Current best fit: {Identity}**; named primary shown; no alternative unless separately close; qualified recommendations; full dossier and Matrix. | Interpretive-reading notice; additive state persists; mobile heading precedes tabs. |
| `tied` | Exact equality of raw stored top-two `score` values after completion; both identities known. Do not use rounded percent text. | Meaningful adjacency or semantic tie-break. | Heading **This reading ended tied: {A} and {B}**; two co-leaders; other leader is not adjacency; hide rank three; explain shared/distinguishing recorded observations. | Preserve serialized primary internally; tie overview and both identity views retain tie banner; Matrix follows active authored identity; stacked mobile controls. |
| `close` | Completed result, known top two, direct positive rank-two evidence, and owner-approved relative-gap heuristic. Recommended candidate: final gap at/below existing `crucible_probability_gap` after Crucible/terminal stop. | Calibration, correctness, and semantic adjacency. | Heading **Close result: {A}, with {B} also supported**; show named primary and rank two as Close alternative only; hide rank three; qualified recommendations. | Full dossier; alternative view preserves original; Matrix follows active authored identity; required relative-not-confidence notice; stacked mobile card. |
| `mixed` | Explicit compatible `result_state: mixed`, or an owner-approved deterministic evidence-only heuristic. | Current scores do not supply a validated threshold-free mixed test. | Heading **Mixed reading**; recommended no definitive primary, optionally stored leader as “current numerical leader”; only explicitly named alternatives; generic exploration. | Limited comparison dossier; Matrix only after deliberate identity selection; persist without downgrading; one-column mobile choices. |
| `contradictory` | Explicit state, or owner-approved rule that separates actual contradictory observations from routine suppression/inhibition. | Positive/negative deltas alone are normal mechanics and do not prove contradiction. | Heading **This reading contains conflicting signals**; name literal answers in tension; recommended no public primary/alternative; generic exploration only. | Limited dossier, optional selected-identity Matrix; conflict notice/retake; persistence may not collapse to primary. |
| `insufficient` | Explicit state, or an owner-approved structural rule that does not enforce generated min-hit/guardrail metadata. | The 2,901 strong-hit-proxy paths are not a Gate A trigger; minimum evidence is Gate B1. | Heading **Not enough evidence to distinguish a fit**; no named primary/alternative; hide identity recommendations; optional generic browsing. | No full identity dossier by default; Matrix hidden until deliberate exploration; never fabricate confidence. |
| `unknown` | Known stored primary but legacy/source payload lacks evidence/stage/version detail needed for a bounded state, or explicit unknown. | Missing answers/strength cannot be reconstructed. | Heading **Legacy reading — evidence detail unavailable**; show identity only as historical saved placement; no synthesized alternative; identity exploration qualified. | Limited dossier allowed; authored Matrix remains an identity shape, not evidence; missing confidence null/unknown, existing numeric stored but hidden; compact legacy notice. |
| `invalid` | Missing/unknown primary, malformed match/result shape, impossible type, or unsupported version that cannot safely normalize. | No safe placement can be rendered. | Heading **This reading could not be opened safely**; no identity, alternatives, recommendations, dossier, or Matrix; restart/retry. | Do not overwrite saved data; keyboard/mobile action required. |
| `incomplete` | Current quick state still has a next question, completion rule not met, partial trail, interrupted direct state, or explicit incomplete. | Gate A cannot make a result from partial answers. | Heading **Reading incomplete**; no identity, alternatives, recommendations, dossier, or Matrix; continue/restart. | Preserve partial state only where current behavior already does; focus returns to question heading on mobile/desktop. |

## Bounded `close` rule

Recommended owner choice:

- exact raw score equality safely emits `tied`;
- rank three is never public in Gate A;
- `close` requires direct positive rank-two evidence plus the existing final Crucible comparison rule; no new numeric threshold is introduced;
- no absolute softmax share is rendered or described as meaningful;
- if the owner rejects this heuristic, Gate A omits automatic close alternatives and still preserves `adjacent_matches` internally.

This is a presentation rule, not a new stopping, ranking, minimum-hit, guardrail, or calibration rule. Extremely small shares cannot look meaningful because the value and band are never shown; without the approved eligibility rule, the alternative is omitted.

## Mixed, contradictory, and insufficient limit

These states must be renderable so explicit compatible states do not collapse into `primary`. Current implementation does not contain validated rules to infer them reliably. Gate A may preserve/render explicit states and handle structural invalid/incomplete/unknown cases. It must not treat routine suppressions, correlated answers, low shares, or the strong-hit proxy as sufficient triggers.

If the owner wants automatic emission, the implementation plan must first document one deterministic read-only heuristic per state and its false-positive/false-negative examples. Without approval, these states are supported but not auto-inferred from quick-path scores.

## Invariants

- State derivation never writes scores, confidence, gap, matches, primary faction, `mana_scores`, stage history, or evidence trail.
- Missing additive fields normalize safely; malformed/incomplete/legacy data never silently becomes `primary`.
- Numeric internals remain available for replay, ranking, stopping, reading IDs, persistence, and regression.
- No state is displayed with a percentage, calibrated band, or scientific-strength claim.
