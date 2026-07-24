# VM-533 — Glint Semantic Recovery

ID: VM-533
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GLINT
Raw packet: `data/raw-factions/glint/`
Cohort: four-color
Contract: v1.1 Gate 1+2 complete; Gate 3+4 remediation authorized

## Objective

Recover Glint end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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

## Current State

VM-533 starts from exact VM-532 Yore certification/program base `8145b8697ed1d1500c0faecf080b55404ab8ec4e` on branch `codex/vm-533-glint-semantic-recovery` and worktree `C:\dev\mtgSiteWIP-crit001-vm533-glint`.

Gate 1+2 read-only audit is complete and authorizes GLINT-only Gate 3+4 remediation. Baseline records `GLINT` as canonical with display name `Glint / Chaos`, display color order `UBRG`, and `GLINT` as the only accepted alias while UBRG and all same-color permutations remain metadata/query-only and fail closed as candidate identities.

Current baseline defects: 5 unclassified claims, missing bounded evidence locations, missing Glint semantic fixture file, stale provenance check, 9 GLINT provenance rows with 4 null canonical IDs, recruiter mismatch strings lacking evidence mapping, and GLINT collision chains that must become GLINT-owned instead of relying on not-yet-started DUNE claim IDs or YORE-owned authority. Source/generated guardrails currently pass for GLINT.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-23-2108-codex-vm533-glint-gate1-gate2.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending
