# VM-533 — Glint Semantic Recovery

ID: VM-533
Status: Approved Pending Certification
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: GLINT
Raw packet: `data/raw-factions/glint/`
Cohort: four-color
Contract: v1.1 exact candidate approved; awaiting separate certification

## Objective

Recover Glint end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

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

## Current State

VM-533 starts from exact VM-532 Yore certification/program base `8145b8697ed1d1500c0faecf080b55404ab8ec4e` on branch `codex/vm-533-glint-semantic-recovery` and worktree `C:\dev\mtgSiteWIP-crit001-vm533-glint`.

Gate 1+2 read-only audit is complete. Gate 3+4 GLINT-only remediation produced exact semantic candidate `ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6` from Gate 1+2 governance `65772b612cff924b683c0c1bf9e13e30f4951d5a`. The candidate keeps `GLINT` canonical, preserves display name `Glint / Chaos`, display color order `UBRG`, and `GLINT` as the only accepted alias while UBRG and all same-color permutations remain metadata/query-only and fail closed as candidate identities.

Candidate state: 5 substantive claims, 15 sources (3 claim-bearing, 3 discovery-only, 5 shaping-only, 4 support-only), 13 GLINT provenance rows with 0 null canonical IDs and 0 missing hashes, 30 fixtures, raw preview disabled, generated identity-layer preview enabled and unchanged, Yore/Dune collision chains GLINT-owned, exact candidate-scope PASS, full validation PASS, and disposable exact-tree npm.cmd test PASS. VM-533 received independent exact-SHA review decision `APPROVE EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6` in `docs/handoffs/2026-07-23-2157-codex-vm533-glint-independent-review.md`; review governance commit is `PENDING_VM533_INDEPENDENT_REVIEW_SHA`. VM-533 is approved but not certified.

VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-23-2108-codex-vm533-glint-gate1-gate2.md`
- Candidate recovery SHA: ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6
- Independent reviewer: Codex independent exact-SHA review; decision `APPROVE EXACT SHA ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`; review handoff `docs/handoffs/2026-07-23-2157-codex-vm533-glint-independent-review.md`; review governance commit `PENDING_VM533_INDEPENDENT_REVIEW_SHA`
- Certification commit: pending
