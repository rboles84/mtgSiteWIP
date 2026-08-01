# VM-551 Sensitivity, Dependency, and Collision Analysis

Machine evidence: `sensitivity-dependency-collision-analysis.json`.

## Count boundaries

- Combinatorial terminal-path frequency counts valid branches in the current deterministic model.
- Answer opportunity counts authored/visited effects, not player exposure.
- Stage opportunity counts model reachability, not how often players enter a stage.
- Normalized sensitivity is a matched-model comparison, not an accuracy rate.
- Scenario success is a synthetic probe, not empirical player success.
- Empirical player prevalence is unknown.

Terminal-path winner shares must never be presented as population prevalence.

## One-answer sensitivity

The audit matched terminal paths that contain the same question set and identical answers except for one selected answer.

| Measure | Result |
|---|---:|
| Matched one-answer terminal pairs | 44,005 |
| Primary flips | 14,424 |
| Normalized primary-flip sensitivity | 32.7781% |
| Primary-to-rank-two flips | Recorded in JSON |
| Different-family primary flips | Recorded in JSON |

This does not prove that 32.7781% of players will flip. It proves that the current authored model has substantial local decision sensitivity and displays no stability qualification.

Paths with at least three matched one-answer neighbors and no primary flip are also recorded. These insensitive regions matter because both excessive volatility and excessive deadness can hide decision defects.

## Corrected affirmative-evidence analysis

The rejected audit’s `countPositiveEvidence` function inspected `entry.faction`, but evidence-trail entries store identity deltas inside `entry.deltas`. The withdrawn historical conclusion that all 37 identities could win with zero direct positive evidence was therefore invalid.

Corrected definitions:

- Positive score hit: one selected answer has a positive applied delta for the eventual primary.
- Strong authored hit proxy: the selected answer’s authored likelihood for the eventual primary is at least `0.75`.
- Negative-only winner: both counts are zero.

Corrected results:

- Negative-only winners: 0.
- Primary paths below the generated `required_positive_min_hits` under the strong authored-hit proxy: 2,901 of 26,891.
- The proxy is not the final contract. It is explicit and reproducible; the free-text required terms and guardrails are not executable.

`VM551-D004` is therefore revised from Critical to High. The original negative-only claim is withdrawn; the material defect that runtime ignores its own minimum-hit metadata remains.

## Dead coverage and collisions

Dead questions:

- `crucible_PRISMARI_SILVERQUILL`
- `crucible_LOREHOLD_QUANDRIX`
- `crucible_TEMUR_MARDU`

All six answers under those questions are dead across exhaustive valid paths. They are not evidence that those pair distinctions are covered.

All 37 profile probes are golden-path-derived, have unique expected primaries, and have no exact selection-signature collisions. All 37 remain incomplete because the runtime target helper supplied their answers and no independently selected neighboring or mixed/uncertain challenge was introduced. They establish target reachability only, not semantic collision resistance. The all-path primary/rank-two and primary/rank-three pair tables in the JSON show the combinatorial collision surface.

## Non-monotonic and branch behavior

The generator records 28 answer/identity support rows where an authored strong positive effect is observed in at least one context with worsened probability or rank after the answer. This can arise because one answer affects many identities and lateral inhibition/suppression changes the full score vector. Each row includes observations and worsened counts; it is not generalized beyond the enumerated contexts.

Branch analysis flags identities whose current discriminators are absent or weakly reachable. Colorless has no generated positive evidence terms to connect lexically to its questions. Three committed Crucible pair rules are never reached.

## Required interpretation

The first pilot needs predeclared thresholds for:

- acceptable local primary stability;
- acceptable same-family versus different-family flips;
- minimum independent evidence;
- when instability produces close/unknown instead of primary certainty;
- active-question/answer reachability;
- non-monotonic support behavior.

No threshold may be chosen after pilot results are seen.
