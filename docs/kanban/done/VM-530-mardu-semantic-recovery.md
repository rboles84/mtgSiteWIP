# VM-530 - Mardu Semantic Recovery

ID: VM-530
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: MARDU
Raw packet: `data/raw-factions/mardu/`
Cohort: clan
Contract: CRIT-001 Contract v1.1 certified
Branch: `codex/vm-530-mardu-semantic-recovery-certification`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm530-mardu-certification`
Starting program base: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`
Certification placeholder: `PENDING_VM530_CERTIFICATION_COMMIT_SHA`

## Objective

Recover Mardu end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Final State

- Drift preflight: eb0b71846d1315ef9571cd3a99ec8b7a7279573e
- Gate 1+2 semantic audit: 43a9e1aafaea445c39b6d8402101e86b05e0edef
- Candidate: certified exact SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Candidate workflow: `ab961e384ef72bd4c56dae07f60863016511adb0`
- Independent review: `f3b360ec0d9df569f585299480db1f34ba72a01b`
- Approval decision: `APPROVE EXACT SHA 96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Certification commit: `PENDING_VM530_CERTIFICATION_COMMIT_SHA` inside tracked governance; actual SHA reported in final task output.
- Final status: `semantically_ready`
- Certified count: 29 of 37
- Wave 4 shards: 9 of 10 certified, 1 backlog
- Next authorized action: completed-worktree cleanup before VM-531 Jeskai drift preflight.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Independent exact-SHA review.
- [x] Certification - Governance-only certification of exact approved candidate.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stayed in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning were excluded.
- VM-531 Jeskai remains backlog, not started, and untouched.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight: `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- Gate 1+2 audit: `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- Candidate workflow: `docs/handoffs/2026-07-22-2235-codex-vm530-mardu-candidate-workflow.md`
- Independent review: `docs/handoffs/2026-07-22-2258-codex-vm530-mardu-independent-review.md`
- Certification handoff: `docs/handoffs/2026-07-23-0614-codex-vm530-mardu-certification.md`
