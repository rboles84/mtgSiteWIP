# VM-519 - Black Semantic Recovery

ID: VM-519
Status: Independent Review Returned REQUEST CHANGES - Awaiting Replacement Candidate
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: B
Raw packet: `data/raw-factions/black/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after separate drift preflight; Gate 1+2 read-only audit complete; first Gate 5 candidate rejected by independent review

## Objective

Recover Black end to end under CRIT-001 after VM-518 Blue certification. The separate committed VM-519 drift-preflight control record has passed with no `FAIL` or `UNKNOWN` results.

Current state: Black Gate 5 candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` received independent review decision `REQUEST CHANGES`. The approval-blocking finding is stale/generic Black preview copy retained in `data/identity-layers.json#/expressions/B/preview_text` and embedded `data/factions.json#/identity_layers/expressions/B/preview_text`. Certification, external tracker update, push, PR, merge, semantically_ready transition, and VM-520 remain not started.

## Gates

- [x] Drift preflight - Passed in `docs/incidents/recoveries/VM-519-black-drift-preflight.md`; Gate 1+2 authorized but not started.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [x] Independent review of exact candidate SHA - REQUEST CHANGES.
- [ ] Replacement candidate for preview-surface finding.
- [ ] Independent review of replacement exact candidate SHA.
- [ ] Certification of exact approved candidate SHA.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- No Black semantic data may be changed before a later Gate 1+2 read-only audit authorizes remediation.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- Drift preflight record: `docs/incidents/recoveries/VM-519-black-drift-preflight.md`
- Candidate recovery SHA: `5bffc3465786c18950d32dcb6f056504b3b8e668`
- Independent reviewer: `REQUEST CHANGES` in `docs/incidents/recoveries/VM-519-black-independent-review.md`
- Certification commit: pending

## Setup Boundary

VM-519 Black / B passed drift preflight from the VM-518 Blue certification program base. Gate 1+2 has now completed in a read-only audit window, and remediation is authorized only under the Gate 1+2 constraints recorded below.

## Gate 1+2 - 2026-07-18

- Decision: `REMEDIATION AUTHORIZED`.
- Gate 1+2 governance SHA: `PENDING_VM519_GATE_1_2_SHA`.
- Source sufficiency: local listed official sources are sufficient; no online source intake is required if Gate 3+4 stays inside the recorded locators.
- Role disposition for Gate 3+4: `black_claim_0002` through `black_claim_0007` should become `substantive_claim`; `black_claim_0001` and `black_claim_0008` should become `support_record`; expected final role count is 6 substantive, 0 discovery, 2 support, 0 unclassified.
- Evidence scope requirement: all six substantive claims require bounded Contract v1.1 `evidence_locations` with `evidence_scope`; support records stay metadata/history or auxiliary support only.
- Current blockers to remediate: unclassified claims in profile/placement/recruiter/provenance proof chains, governance/rules/Scryfall Commander support leakage, mechanics/changelog over-breadth risk, 3 null B provenance canonical IDs, absent Black fixtures, no placement-summary native canonical object, and missing chatbot guidance evidence mapping.
- Frozen constraints: preserve placement/calibration fields, false-positive guardrail, lateral targets `UB`, `BR`, `BG`, `WB`, raw object-with-`pairs` collision guidance with `W` then `G`, absent explicit `GENERIC_B_OVERFIT` collision target, absent top-level confidence, absent Black-local scoring/golden-path fields, native IDs, and preview source-to-embedded equality unless a documented candidate-scope exception is required.
- Gate 3+4 may proceed; Gate 5 candidate, independent review, certification, semantically_ready transition, VM-520, original main, Excel, and Table Talk changes remain excluded.

## Gate 3+4 + Gate 5 - 2026-07-18

- Candidate SHA: `5bffc3465786c18950d32dcb6f056504b3b8e668`.
- Candidate subject: `VM-519 remediate Black semantic readiness candidate`.
- Final role counts: 8 total; 6 substantive, 0 discovery, 2 support, 0 unclassified.
- B provenance: 25 entries; 0 required null canonical IDs; 0 required null canonical content hashes; 0 unresolved pointers; 0 duplicate canonical entries.
- Exact-chain fixtures: `/core_identity` 5/5 exact; `/placement_summary` 6/6 exact; no duplicate, missing, or extra claim IDs.
- Candidate scope: `node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=5bffc3465786c18950d32dcb6f056504b3b8e668 --identity=B` passed.
- Validation: audit, semantic readiness, candidate-scope tests, placement, faction-context isolation, source-generated, full `npm.cmd test`, and `git diff --check` passed. `test:source-generated` retained known unrelated JESKAI/MARDU warnings.
- Status: awaiting independent review; not approved, not certified, not `semantically_ready`; VM-520 not started.

## Independent Review - 2026-07-18

- Exact candidate reviewed: `5bffc3465786c18950d32dcb6f056504b3b8e668`.
- Review record: `docs/incidents/recoveries/VM-519-black-independent-review.md`.
- Review-record SHA: `PENDING_VM519_BLACK_REVIEW_RECORD_SHA`.
- Decision: `REQUEST CHANGES`.
- Blocker: `data/identity-layers.json#/expressions/B/preview_text` and `data/factions.json#/identity_layers/expressions/B/preview_text` retain stale generic Black copy: `Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`
- Required next step: create a later replacement candidate that updates the source-owned B preview and regenerated embedded preview consumer without unrelated identity drift, then submit the replacement exact SHA for fresh independent review.
- Status: not approved, not certified, not `semantically_ready`; VM-520 not started.
