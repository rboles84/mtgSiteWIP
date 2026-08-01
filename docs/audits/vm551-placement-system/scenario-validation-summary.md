# VM-551 Profile and Adversarial Scenario Validation

## All-37 profile probes

`profile-scenario-matrix.csv` and `profile-scenario-details.json` contain one synthetic, profile-derived probe for each certified identity. Each probe uses exact current answers selected from the live model and records branch path, primary/ranks two and three, displayed softmax share, strong authored hits, explanation, numeric adjacent results, and Commander recommendations.

Results: 37 `EXACT-PRIMARY`, zero other dispositions.

This proves only that the target-seeking algorithm can find a valid answer path that makes each identity win. It does not prove:

- ordinary players can recognize or select those answers;
- questions distinguish neighboring identities;
- answer wording measures the certified construct;
- false-positive guardrails pass;
- displayed confidence is calibrated;
- recommendations fit the selected player evidence.

All 37 probes satisfy the generated minimum-hit count under the explicit remediation proxy of selected answers with authored likelihood at least `0.75`. Guardrail satisfaction remains unresolved because guardrails are free-text metadata, not executable predicates.

## Nine adversarial scenarios

All nine receive `QUESTIONNAIRE-CANNOT-REPRESENT`:

| Scenario | Current result |
|---|---|
| Gameplay preference conflicts with philosophy | Forced exact answers produce WB; mixed/unknown cannot be expressed. |
| Theme preference without low-power preference | Forced exact answers produce Black; the requested separation is absent. |
| Tutor use without competitive assumption | No exact current construct; not run rather than inventing an answer. |
| Combo interest without psychographic inference | No exact current construct; not run. |
| Color preference without faction preference | No exact current construct; not run. |
| Social discomfort without stable identity inference | Forced exact answers produce UB; context limitation is not preserved. |
| New-player uncertainty | No non-directional answer; not run. |
| “I do not know” / no directional answer | No exact answer; not run. |
| Deck behavior differs from personal preference | Forced exact answers produce Yore; the system has no layer separation. |

The `NOT-RUN` cases are required evidence of representational failure. Inventing neutral answers or choosing the “least wrong” directional answer would hide the defect.

## Scenario conclusion

Golden-path reachability passes; adversarial representation fails. The first controlled pilot needs explicit unknown, mixed, “not enough information,” and deck-behavior-versus-personal-preference boundaries before its result can be interpreted as more than a forced exploration prompt.
