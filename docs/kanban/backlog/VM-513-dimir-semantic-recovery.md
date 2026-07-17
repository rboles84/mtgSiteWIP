# VM-513 — Dimir Semantic Recovery

ID: VM-513
Status: Candidate Approved - Awaiting Certification
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UB
Raw packet: `data/raw-factions/house_dimir/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Dimir end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-513-dimir-semantic-recovery.md`
- Gate 1+2 governance/report SHA: `646ea02aa12959441eba6e0844b902cf32bab914`
- Candidate recovery SHA: `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee`
- Independent reviewer: Codex independent review window
- Certification commit: pending

## Gate 1+2 Finding

Read-only audit found 16 Dimir claims, with 0 substantive claims, 10 discovery records, 0 support records, and 6 unclassified claims. All claims lack explicit Contract v1.1 semantic roles; substantive evidence locations and `evidence_scope` are missing because no claims are yet remediated as substantive. Existing profile, placement, generated public copy, recruiter copy, and provenance chains rely on non-certifying discovery/unclassified records. UB fixtures are missing.

Gate 3+4 remediation is authorized using existing local/listed sources only. Discovery-only story-corpus records must be isolated from authoritative proof chains, generated copy must stop presenting generic UB mechanics or stale spy-thriller language as Dimir identity, and fixture/provenance parity must be proven before candidate creation.

## Gate 3+4 / Gate 5 Candidate Record

Candidate `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee` has been independently reviewed and approved with decision `APPROVE EXACT SHA 6e6c079d19ee152016212f01f8c2ffd81f0ca0ee`. Dimir is awaiting certification; it is not certified and not semantically_ready. VM-514 has not started.

Final remediation produced 32 Dimir claims: 22 substantive, 10 discovery, 0 support, and 0 unclassified. Substantive evidence locations have Contract v1.1 `evidence_scope`; discovery-only story-corpus rows are retained as metadata/history only and do not prove profile, placement, key figures, recruiter guidance, public copy, fixtures, or provenance chains.

Validation passed, including `npm.cmd run build:factions`, UB audit/validation, semantic-readiness tests, placement tests, faction-context isolation, source/generated guardrails, full `npm.cmd test`, `git diff --check`, and exact candidate-scope validation for `646ea02aa12959441eba6e0844b902cf32bab914..6e6c079d19ee152016212f01f8c2ffd81f0ca0ee`.

## Independent Review Record

Independent review approved exact candidate SHA `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee` with no blocker, high, medium, or low findings. Review verified exact candidate isolation, superseded-candidate frozen-field remediation, Contract v1.1 claim roles, source-bounded evidence, discovery isolation, canonical IDs and content hashes, fixture/provenance exact-chain parity, generated public/recruiter surfaces, required-neighbor boundaries, deterministic generation, and required validations.

Known non-blocking observations: `npm.cmd run test:source-generated` retains unrelated JESKAI/MARDU model-owned inhibitor warnings; `git diff --check` reports line-ending warnings only. The Table Talk side-scan baseline remained preserved and excluded from the review record.
