# VM-529 - Sultai Semantic Recovery

ID: VM-529
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: SULTAI
Raw packet: `data/raw-factions/sultai/`
Cohort: clan
Contract: v1.1

## Objective

Recover Sultai end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current State

- Status: certified `semantically_ready`.
- Starting program base: `8e23ef467ec7f60daec746c14493173f96d9261c`.
- Drift preflight: `74b8153c124eb03d95a28ae2aac126c29f3c5db4`.
- Gate 1+2 governance: `5c4e73360d99ed1cf5f3bae5bd9302773ae9e14e`.
- Certified semantic candidate: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.
- Candidate workflow record: `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc`.
- Independent review: `2b469a61656bd2151f4c7e560421afc7c452887b`.
- Approval decision: `APPROVE EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.
- Certification commit: `PENDING_VM529_CERTIFICATION_COMMIT_SHA` inside tracked governance; actual commit SHA is reported in final task output.
- Branch: `codex/vm-529-sultai-semantic-recovery-certification`.
- Worktree: `C:\dev\mtgSiteWIP-crit001-vm529-sultai-certification`.
- VM-530: backlog, not started, and untouched.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Independent certification.

## Certification

- Certification handoff: `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`.
- Recovery summary: `docs/incidents/recoveries/VM-529-sultai-semantic-recovery.md`.
- Certified identities after certification: 28 of 37.
- Wave 4 after certification: 8 of 10 certified, 2 backlog.
- Certification scope: governance only; no semantic, generated, fixture, provenance, profile, placement, preview, validator, runtime, package, lockfile, CI, Excel, VM-530, push, PR, or merge work occurred.

## Required Records

- Drift-preflight handoff: `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- Gate 1+2 handoff: `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- Candidate workflow handoff: `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- Independent review handoff: `docs/handoffs/2026-07-22-2123-codex-vm529-sultai-independent-review.md`
- Certification handoff: `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`
- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Candidate recovery SHA: `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`
