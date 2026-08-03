# VM-551 Gate B1 Placement Instrument Design Handoff

Agent name: Codex

Task requested: Design the Gate B1 replacement Archscry placement instrument from exact main without changing or implementing the live questionnaire, scoring, result, dossier, Matrix, recommendation, persistence, or downstream contracts.

## Repository authority

- Control repository: C:\dev\voxmana.io
- Required and verified base: 30bfe87171e4119a0bab1bb47318862c042977de
- Branch: codex/vm551-gate-b1-placement-instrument-design
- Worktree: C:\dev\voxmana.io-vm551-gate-b1-design
- Local main and origin/main were verified at the required base with ahead/behind 0 0 before worktree creation.

## Files reviewed

- AGENTS.md.
- docs/handoffs/HANDOFF_INDEX.md and relevant VM-551 audit, Gate A design/implementation, and Gate A closeout handoffs.
- docs/kanban/board.md and both completed VM-551 cards.
- Accepted VM-551 question, answer, signal, distinctiveness, dependency, sensitivity, scenario, architecture, requirements, repair-boundary, compatibility, and validation artifacts.
- data/placement-model.json and data/placement/gate-compression.source.json read-only.
- Exact CECOS draft.4 Git object and its observation/provenance/ambiguity/derived-instrument sections.
- Committed Commander player-language evidence for commander role, pace, interaction, variance, visible threat, theme, and beginner terminology.
- Vox Mana voice and explanation audits.
- Certified raw identity placement/source records and source-readiness matrices.

## Files changed

- docs/plans/vm551-gate-b1-placement-instrument/README.md
- docs/plans/vm551-gate-b1-placement-instrument/construct-map.tsv
- docs/plans/vm551-gate-b1-placement-instrument/question-bank-inventory.tsv
- docs/plans/vm551-gate-b1-placement-instrument/pilot-question-bank.tsv
- docs/plans/vm551-gate-b1-placement-instrument/answer-signal-contracts.tsv
- docs/plans/vm551-gate-b1-placement-instrument/identity-coverage-matrix.tsv
- docs/plans/vm551-gate-b1-placement-instrument/confusion-pair-coverage.tsv
- docs/plans/vm551-gate-b1-placement-instrument/migration-and-versioning-plan.md
- docs/plans/vm551-gate-b1-placement-instrument/player-validation-plan.md
- docs/plans/vm551-gate-b1-placement-instrument/owner-decisions.md
- docs/plans/vm551-gate-b1-placement-instrument/build-and-validate-design.mjs
- docs/plans/vm551-gate-b1-placement-instrument/validation-record.json
- docs/kanban/in-progress/VM-551-gate-b1-placement-instrument-design.md
- docs/kanban/board.md
- this handoff and docs/handoffs/HANDOFF_INDEX.md

## What changed

- Defined 15 single-construct observable Commander dimensions with examples, exclusions, evidence roles, stage placement, and dependency overlap.
- Inventoried all 113 current questions and 356 answer effects with accepted audit fields and design dispositions.
- Proposed a 34-question pool: 4 replacement Gate, 12 adaptive Hall, and 18 focused Crucible questions while preserving a 6–8-question journey.
- Added 106 stable answer contracts with question/construct IDs, plain observations, primary signals, dependency groups, exclusions, provenance, mapping confidence, scoring status, and limitations.
- Covered all 37 identities structurally and added direct targeted coverage for every high-confusion or insufficient-distinctiveness identity.
- Covered 123 unique confusion pairs, including every exact-tie composition pair, every primary/rank-two pair occurring in at least 100 authored terminal paths, same-color guild/college pairs, adjacent three- and four-color families, Colorless/Five-Color, and mono/multicolor handling.
- Specified observation-first scoring boundaries, additive versioning, legacy preservation, shadow evaluation, rollback, real-player validation, and owner decisions.

## Why it changed

The accepted audit found zero unchanged questions or answers, broad abstraction and double-barreling, missing answer provenance, forced directionality, dependent evidence stacking, unstable one-answer flips, and incomplete separation for high-risk identity families. The design replaces those conditions with bounded observations and explicit uncertainty while preserving the product experience and all live contracts.

## Decisions made

- Use 15 constructs and a 34-item adaptive pool; do not repair all 113 questions.
- Keep all proposed effects non-scoring.
- Do not retain any current score, suppression, or identity effect.
- Treat player-language evidence as vocabulary/scenario support only.
- Treat certified identity records as provisional mapping authority only, not player-response evidence.
- Require at least three independent observations plus boundary evidence for an ordinary name, and four including direct boundary evidence for high-risk/insufficient identities.
- Keep mixed/unknown/conditional/neither answers non-directional.
- Preserve Gate A public states, six-to-eight-question flow, and downstream shapes.
- Keep rank two separate from semantic adjacency.

## Risks / uncertainties

- No empirical player-response, comprehension, reliability, calibration, or prevalence evidence exists yet.
- Identity mappings remain low-confidence hypotheses.
- Structural coverage does not guarantee separation; many pairs should remain close or insufficient.
- Esper, Jeskai, Colorless, and other insufficient-evidence identities require targeted player review despite direct pilot probes.
- The proposed 108-journey minimum is a route-coverage floor, not statistical power.
- A future scoring authority, data-retention policy, consent flow, implementation, and cutover require separate owner authorization.

## Tests run

- PASS: documentation builder/validator; 15 constructs, 113 questions, 356 answers, 34 pilot questions, 106 answers, 37 identities, and 123 confusion pairs.
- PASS: 4 Gate / 12 Hall / 18 Crucible count.
- PASS: 140 unique stable IDs and stable-ID format.
- PASS: one primary construct per question.
- PASS: complete answer contracts, provenance, exclusions, confidence, non-scoring status, and limitation fields.
- PASS: no orphan question, construct, or signal references.
- PASS: no vague-mood-only observation.
- PASS: advanced-jargon explanation check.
- PASS: explicit direct coverage for all 11 high-confusion/insufficient identity keys.
- PASS: all 83 exact-tie pairs and 28 high-frequency primary/rank-two pairs represented.
- PASS: Node syntax check and required-file/count reconciliation.
- PASS: stale pilot-count scan.
- Final staged diff and whitespace checks are recorded in the completion response.

## Not touched

- Gate A plans, presentation, implementation, tests, or production state.
- Live questionnaire, question builder, placement JSON, Gate-compression source, scoring, branching, stopping, runtime, result UI, dossiers, Matrix, recommendations, persistence, schemas, routes, analytics, or downstream consumers.
- Certified identity/profile/placement/source records or source-readiness maps.
- Push, merge, deployment, production verification, migration, implementation, or certification.

## Follow-up recommendations

1. Owner decides the 12 material items in owner-decisions.md.
2. If the design is accepted, authorize player-validation preparation separately.
3. Do not authorize scoring or live implementation until real-player evidence and the observation/signal contract are reviewed.
4. Preserve close, tied, mixed, and insufficient outcomes during every later gate.

## Next suggested agent

Owner/reviewer. Stop before pilot implementation.

## Related Kanban, docs, or plans

- docs/kanban/in-progress/VM-551-gate-b1-placement-instrument-design.md
- docs/kanban/done/VM-551-full-placement-system-audit.md
- docs/kanban/done/VM-551-gate-a-trust-containment-design.md
- docs/plans/vm551-gate-b1-placement-instrument/README.md
- docs/audits/vm551-placement-system/VM-551-full-placement-system-audit.md
- docs/audits/vm551-placement-system/requirements-traceability-matrix.csv
