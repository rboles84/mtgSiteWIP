# VM-551 Profile and Adversarial Scenario Validation

## All-37 profile probes

`profile-scenario-matrix.csv` and `profile-scenario-details.json` contain one target-seeking runtime probe for each certified identity. Each probe uses exact current answers and records branch path, primary/ranks two and three, displayed softmax share, strong authored hits, explanation, numeric adjacent results, and Commander recommendations.

Origin and completeness reconciliation:

- `GOLDEN-PATH-DERIVED`: 37.
- `PROFILE-DERIVED-INDEPENDENT`: 0.
- `PROFILE-DERIVED-WITH-GOLDEN-PATH-ASSISTANCE`: 0.
- scoring outcome `EXACT-PRIMARY`: 37.
- final review disposition `INCOMPLETE`: 37, because none introduces an independently selected neighboring challenge or mixed/uncertain answer state.

The remediation generator calls `runAdaptiveGoldenPath` with the expected identity as `targetFaction`; answers were not selected independently. This proves only that the runtime target-seeking helper can find a valid answer path that makes each identity win. It does not prove:

- ordinary players can recognize or select those answers;
- questions distinguish neighboring identities;
- answer wording measures the certified construct;
- false-positive guardrails pass;
- displayed confidence is calibrated;
- recommendations fit the selected player evidence.

All 37 probes satisfy the generated minimum-hit count under the documented remediation proxy of selected answers with authored likelihood at least `0.75`. Guardrail satisfaction remains unresolved because guardrails are free-text metadata, not executable predicates. No probe contains the required material neighboring or mixed/uncertain challenge; an exact-primary scoring outcome is therefore not a complete scenario disposition.

Terminology:

- Golden path: runtime helper output optimized for a requested target identity.
- Target-seeking profile probe: a synthetic scenario whose selections intentionally favor a target; the current 37 are golden-path-derived.
- Independently derived synthetic profile: selections established from a profile definition before consulting the target’s golden path, with a neighboring and mixed/uncertain challenge.
- Adversarial representational test: a bounded test of whether the current answer vocabulary and branching can preserve a specified distinction.
- Empirical player validation: observed participant data under a declared protocol; VM-551 has none.

## Nine adversarial scenarios

The nine dispositions now distinguish literal absence, partial/conflated representation, and unsupported inference:

| Scenario | Reconciled disposition |
|---|---|
| Gameplay preference conflicts with philosophy | `PARTIALLY-REPRESENTABLE-BUT-CONFLATED`: answers express fragments, but the model treats the two dimensions as interchangeable identity evidence. |
| Theme preference without low-power preference | `REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE`: theme can be expressed, but power/identity implications are not separately observed. |
| Tutor use without competitive assumption | `QUESTIONNAIRE-CANNOT-REPRESENT`: literally no tutor-use answer exists. |
| Combo interest without psychographic inference | `QUESTIONNAIRE-CANNOT-REPRESENT`: literally no combo-interest answer preserves the requested boundary. |
| Color preference without faction preference | `QUESTIONNAIRE-CANNOT-REPRESENT`: literally no bare-color-preference answer prohibits faction inference. |
| Social discomfort without stable identity inference | `REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE`: situational pressure can be expressed, but runtime turns it into stable identity evidence. |
| New-player uncertainty | `QUESTIONNAIRE-CANNOT-REPRESENT`: literally no inexperience/uncertainty answer exists. |
| “I do not know” / no directional answer | `QUESTIONNAIRE-CANNOT-REPRESENT`: no unsure, neutral, mixed, skip, or no-direction answer exists. |
| Deck behavior differs from personal preference | `PARTIALLY-REPRESENTABLE-BUT-CONFLATED`: both layers appear in answer wording, but the instrument does not preserve their distinction. |

Totals: 5 `QUESTIONNAIRE-CANNOT-REPRESENT`, 2 `PARTIALLY-REPRESENTABLE-BUT-CONFLATED`, and 2 `REPRESENTABLE-WITH-UNSUPPORTED-INFERENCE`. The five `NOT-RUN` cases are literal answer-vocabulary failures. Inventing neutral answers or choosing the “least wrong” directional answer would hide the defect.

## Scenario conclusion

Golden-path target reachability passes, but all 37 profile probes remain incomplete and the adversarial inventory exposes both literal and conflated representation failures. Gate B1 needs independently derived profiles plus explicit unknown, mixed, “not enough information,” and deck-behavior-versus-personal-preference boundaries before controlled-pilot results can support more than a bounded exploration prompt.
