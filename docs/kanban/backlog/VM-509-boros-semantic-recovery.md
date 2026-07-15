# VM-509 — Boros Semantic Recovery

ID: VM-509
Status: Infrastructure unblock complete; replacement candidate reconstruction pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WR
Raw packet: `data/raw-factions/boros_legion/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Boros end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [ ] Gate 1 — Packet audit and bounded disposition.
- [ ] Gate 2 — Sufficient evidence completion.
- [ ] Gate 3 — Canonical remediation.
- [ ] Gate 4 — Generation and validation.
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
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending
## Infrastructure Unblock Note

- 2026-07-15: VM-509 failed candidate `abff94b91e94b99a6b2a77b71806a9d005ecec76` exposed a candidate-scope mismatch around explicit `lateral_inhibition: false` on non-inhibiting collision guidance.
- Approved fix is infrastructure-only: explicit `false` remains a non-inhibiting opt-out, generated lateral target churn is checked directly, and true inhibition behavior remains forbidden for identity candidates.
- No Boros canonical remediation, generated recovery artifact, replacement candidate, independent review, or certification is included in this unblock commit.
- Safety refs preserved: `backup/vm-509-boros-failed-candidate-abff94b`, `backup/vm-509-boros-failed-workflow-25420ba`.
- Validation triage proved `npm.cmd run test:semantic-readiness` stale-provenance failure is pre-existing at baseline `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`, not caused by the infrastructure fix; production provenance was not rebuilt in this infrastructure-only task.