# VM-520 - Red Semantic Recovery

ID: VM-520
Status: Done - Certified Semantically Ready
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: R
Raw packet: `data/raw-factions/red/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 after separate drift preflight; Gate 1+2 read-only audit complete; first Gate 5 candidate rejected by independent review

## Objective

Recover Red end to end under CRIT-001 after VM-519 Black certification. The separate committed VM-520 drift-preflight control record passed with no `FAIL` or `UNKNOWN` results.

Current state: Red / R is certified `semantically_ready` under CRIT-001 Contract v1.1 from exact approved replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`. Initial candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` remains preserved and unapproved after independent review decision `REQUEST CHANGES` in review record `7bb7b0830dffc718ec3a2546fd489d0cb9ec0359`. Certification used `PENDING_VM520_CERTIFICATION_COMMIT_SHA` inside governance; actual SHA is reported in final task output. VM-521 Green / G is setup-only with drift preflight pending.

## Gates

- [x] Drift preflight - passed in `docs/incidents/recoveries/VM-520-red-drift-preflight.md`; commit `PENDING_VM520_DRIFT_PREFLIGHT_SHA`.
- [x] Gate 1 - Packet audit and bounded disposition; completed in `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`; commit `6c2b6dfc3e9e838f9e75801517a81258b675923d`.
- [x] Gate 2 - Sufficient evidence completion; completed in `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`; commit `6c2b6dfc3e9e838f9e75801517a81258b675923d`.
- [x] Gate 3 - Canonical remediation; candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.
- [x] Gate 4 - Generation and validation; full required validation passed with documented DRIFT-015 candidate-scope exception.
- [x] Gate 5 - Candidate creation; exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` received independent review decision `REQUEST CHANGES`.
- [x] Independent review of exact candidate SHA - `REQUEST CHANGES` in `docs/incidents/recoveries/VM-520-red-independent-review.md`.
- [x] Replacement candidate for required-neighbor coverage finding - exact candidate `6aefb2090ff20a361f7f3cd80515445036323158`.
- [x] Independent review of exact replacement candidate SHA - `APPROVE EXACT SHA 6aefb2090ff20a361f7f3cd80515445036323158` in `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`.
- [x] Certification of exact approved candidate SHA.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- No Red semantic data may be changed before a later Gate 1+2 read-only audit authorizes remediation.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- Drift preflight record: `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- Rejected candidate recovery SHA: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`
- Replacement candidate recovery SHA: `6aefb2090ff20a361f7f3cd80515445036323158`
- Independent reviewer: Codex independent review record `docs/incidents/recoveries/VM-520-red-independent-review.md`
- Replacement independent reviewer: Codex independent review record `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md` at `20f18e0a0a02728f3474c9e8d2b32e36525cbfe9`
- Certification commit: `PENDING_VM520_CERTIFICATION_COMMIT_SHA`

## Setup Boundary

VM-520 Red / R passed drift preflight from the VM-519 Black certification program base. Gate 1+2 completed in a read-only audit window, remediation was authorized by the Gate 1+2 record, the first candidate was rejected for missing prompt-required `JESKAI`, `JUND`, and `NAYA` Red-local boundaries, and the exact replacement candidate added those boundaries without frozen-field, preview, provenance, fixture, lateral-target, W/U collision-order, optional-field, runtime, or unrelated-identity drift.

## Certification - 2026-07-18

- Decision: `CERTIFIED SEMANTICALLY_READY`.
- Exact approved replacement candidate certified: `6aefb2090ff20a361f7f3cd80515445036323158`.
- Rejected candidate preserved and unapproved: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.
- Replacement approval review: `20f18e0a0a02728f3474c9e8d2b32e36525cbfe9`.
- Certification commit placeholder: `PENDING_VM520_CERTIFICATION_COMMIT_SHA`.
- Final claim roles: 8 total; 6 substantive (`red_claim_0002` through `red_claim_0007`), 0 discovery, 2 support (`red_claim_0001`, `red_claim_0008`), 0 unclassified.
- R provenance: 25 entries; 0 null canonical IDs; 0 null canonical content hashes; 0 unresolved pointers; 0 duplicate canonical entries; 0 support/discovery/non-philosophical-backed authoritative chains.
- Exact-chain fixtures: `/core_identity` 5/5 exact (`red_claim_0002` through `red_claim_0006`) and `/placement_summary` 6/6 exact (`red_claim_0002` through `red_claim_0007`).
- Required neighbor coverage: `JESKAI`, `JUND`, and `NAYA` verified across raw Red placement, generated Red placement, Red semantic fixtures, and Red recruiter context; all three are backed by substantive Red claims `red_claim_0003`, `red_claim_0005`, and `red_claim_0006` with sources `MONO-R-2015` and `MONO-R-2025`.
- Preview certified: `Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.`
- Candidate-scope certification result: `PASS - approved documented R display-source exception`; command exited 1 only for `data/identity-layers.json#/expressions/R/preview_text` and `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Validation passed: Red reconciliation script, audit, semantic readiness validation, semantic candidate-scope tests, exact candidate-scope exception check, deterministic `build:factions` with no content diff, semantic-readiness tests, placement tests, faction-context isolation tests, source-generated guardrails with known unrelated JESKAI/MARDU warnings only, full `npm.cmd test`, and `git diff --check` with line-ending warnings only.
- Program status after certification: 19 certified identities; Wave 3 monocolors 4 of 5 certified; VM-521 Green / G setup-only with drift preflight pending.
