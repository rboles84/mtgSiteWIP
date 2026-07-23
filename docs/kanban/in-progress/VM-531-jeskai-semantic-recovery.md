# VM-531 — Jeskai Semantic Recovery

ID: VM-531
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: JESKAI
Raw packet: `data/raw-factions/jeskai/`
Cohort: clan
Contract: Contract v1.1 Gate 1+2 complete / remediation authorized

## Objective

Recover Jeskai end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
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
- Audit/recovery report: `docs/handoffs/2026-07-23-0825-codex-vm531-jeskai-gate1-gate2.md`
- Candidate recovery SHA: pending; Gate 3+4 remediation authorized only after Gate 1+2 governance commit
- Independent reviewer: pending
- Certification commit: pending

## Gate 1+2 Audit

Gate 1+2 read-only audit completed on 2026-07-23. Disposition: READY FOR GATE 3 REMEDIATION. Intended final roles are 10 substantive claims (`jeskai_claim_0001` through `jeskai_claim_0010`) plus 1 support record (`jeskai_claim_0011`). Required remediation: bounded evidence locations, support isolation, 14 provenance owner-ID repairs, Jeskai semantic fixtures, source-owned generated rebuild, and exact candidate-scope validation. No candidate exists yet.
