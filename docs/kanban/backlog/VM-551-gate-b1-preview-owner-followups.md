# VM-551 — Gate B1 Preview Owner Follow-ups

Status: Backlog — separately gated

## Source

Owner production-fidelity re-review after commit `bd5cc61a415703e690ce58577e6760972fabb048`.

## Recorded findings

- Card-signal references and Mana Notes can present blank or placeholder-looking content while preview Scryfall decoration and persistence are disabled.
- Preview Maze Discovery actions did not navigate during owner review.
- The Commander Lanes hover treatment can be clipped by its containing card.
- An insufficient result currently offers restart rather than a continue, revise, or targeted-question recovery path.

## Boundary

These observations are not part of the authored review-route truthfulness remediation. Before any repair, independently reproduce each preview finding and decide whether it is an intentional isolation limitation, a preview-fidelity defect, or a broader product question.

The insufficient-result continuation question requires a separate owner experience decision. Do not infer authority to change stopping, routing, result states, questions, scoring, or the production questionnaire.

## Not authorized

No implementation, result-recovery redesign, production change, player validation, scoring, migration, deployment, or certification.
