# VM-530 — Mardu Semantic Recovery

ID: VM-530
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: MARDU
Raw packet: `data/raw-factions/mardu/`
Cohort: clan
Contract: pending Contract v1.1 independent exact-SHA review
Branch: `codex/vm-530-mardu-semantic-recovery`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm530-mardu`
Starting program base: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`

## Objective

Recover Mardu end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current State

- Drift preflight complete: `PENDING_VM530_DRIFT_PREFLIGHT_COMMIT_SHA`
- Gate 1+2 semantic audit: complete; `PENDING_VM530_GATE_1_2_COMMIT_SHA`
- Evidence work: complete in exact candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Remediation: complete in exact candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Candidate: ready for independent exact-SHA review
- Independent review: not performed
- Certification: not performed
- Next authorized action: independent exact-SHA review of candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a` only.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [ ] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-531 Jeskai remains backlog, not started, and untouched.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift preflight: `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- Audit/recovery report: `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- Candidate recovery SHA: `96df085ff38d03da1e37de80b1e11705b1dfa47a`
- Independent reviewer: pending
- Certification commit: pending
