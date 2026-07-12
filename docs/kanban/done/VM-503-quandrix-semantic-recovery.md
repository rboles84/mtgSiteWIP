# VM-503 — Quandrix Semantic Recovery

ID: VM-503
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: QUANDRIX
Raw packet: `data/raw-factions/quandrix/`
Cohort: college
Contract: v1.1

## Objective

Recover Quandrix end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Current state: certified semantically ready under CRIT-001 Contract v1.1. Approved recovery SHA `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe` was approved by independent Gate 5 review on 2026-07-12. Certification commit is `PENDING_VM503_CERTIFICATION_COMMIT_SHA`.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 � Canonical remediation.
- [x] Gate 4 ? Generation and validation. Complete after bounded unsupported Esix/generated-display blocker resolution.
- [x] Gate 5 ? Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-503-quandrix-semantic-recovery.md`
- Candidate recovery SHA: `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`
- Independent reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread
- Certification commit: `PENDING_VM503_CERTIFICATION_COMMIT_SHA`


## Certification

- Identity: Quandrix.
- VM: VM-503.
- Contract version: v1.1.
- Approved recovery SHA: `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`.
- Candidate workflow-record SHA: `8b979070397dd8ef0b0d9e316875dc416a31a912`.
- Independent review result: APPROVE EXACT SHA.
- Reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread.
- Approval date: 2026-07-12.
- Final certification state: `semantically_ready`.
- Recovery commit: `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`.
- Certification commit: `PENDING_VM503_CERTIFICATION_COMMIT_SHA`.
- Residual non-blocking findings:
  - Runtime Hall, Crucible, scoring, inhibition, scheduling, confidence, and live recruiter calibration remain post-CRIT investigations.
  - Unchanged global Prismari/Quandrix Crucible wording remains outside CRIT-001 identity certification scope.
  - Candidate-scope guard has two documented display-source exceptions: `data/identity-layers.json` and preserved Quandrix display fields in `data/factions.json`.
- Known unchanged warnings:
  - Dossier audit remains 113 warnings / 0 failures.
  - Existing builder-owned Quandrix inhibitor warning remains unchanged.
