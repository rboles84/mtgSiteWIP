# VM-535 — Ink Semantic Recovery

ID: VM-535
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: INK
Raw packet: `data/raw-factions/ink/`
Cohort: four-color
Contract: Contract v1.1 Gate 1+2 recorded

## Objective

Recover Ink end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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
- Audit/recovery report: pending
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending


## Gate 1+2 Baseline - 2026-07-24

Official branch/worktree: `codex/vm-535-ink-semantic-recovery` at `C:\\dev\\mtgSiteWIP-crit001-vm535-ink`, starting from program base `8a4f273e75842f97debbcdbc70009da7845e41d4`.

Gate 1+2 authorizes INK-only semantic remediation. Baseline: canonical key `INK`; display `Ink / Altruism`; display color order `RGWU`; accepted alias `INK` only; RGWU/WURG and all same-color permutations metadata/query-only; 5 unclassified claims; 13 sources; no semantic fixture; 3 INK provenance rows with zero null canonical IDs and zero missing hashes; stale provenance byte-check diagnostic; DUNE/WITCH neighbor claim contamination in collision guidance; raw preview disabled while generated preview remains retained. VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched. Excel was not updated by Codex.
