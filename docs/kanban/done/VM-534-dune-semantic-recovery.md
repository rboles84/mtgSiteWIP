# VM-534 — Dune Semantic Recovery

ID: VM-534
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: DUNE
Raw packet: `data/raw-factions/dune/`
Cohort: four-color
Contract: Contract v1.1 certified semantically ready

## Objective

Recover Dune end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition. Recorded in `docs/handoffs/2026-07-23-2323-codex-vm534-dune-gate1-gate2.md`.
- [x] Gate 2 - Sufficient evidence completion. Bounded DUNE-only remediation authorized.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [x] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-534-dune-semantic-recovery.md`
- Candidate recovery SHA: `e6f776d4e047aaa8f22358d4ff09486ff6100cf5`
- Independent reviewer: `docs/handoffs/2026-07-24-0045-codex-vm534-dune-independent-review.md`
- Certification commit: `PENDING_VM534_CERTIFICATION_COMMIT_SHA`

## Gate 1+2 Baseline - 2026-07-23

Official branch/worktree: `codex/vm-534-dune-semantic-recovery` at `C:\dev\mtgSiteWIP-crit001-vm534-dune`, starting from program base `ab3ece2155d52c0f4283a0c0244c601a0991f970`.

Gate 1+2 authorizes DUNE-only semantic remediation. Baseline: canonical key `DUNE`; display `Dune / Aggression`; display color order `BRGW`; accepted alias `DUNE` only; BRGW and all same-color permutations metadata/query-only; 5 unclassified claims; 14 sources; no semantic fixture; 9 DUNE provenance rows with 4 null canonical IDs; stale provenance; GLINT/INK neighbor claim contamination in collision guidance; raw preview disabled while generated preview remains enabled/equal. VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched. Excel was not updated by Codex.


## Candidate Workflow - 2026-07-24

Exact semantic candidate: `e6f776d4e047aaa8f22358d4ff09486ff6100cf5`

Candidate parent: `c05b7c752748e9432a9321b6bd8f2e1b65c29ee0`

Disposition: READY FOR INDEPENDENT REVIEW EXACT SHA e6f776d4e047aaa8f22358d4ff09486ff6100cf5

DUNE-only Gate 3+4 remediation is complete and awaiting independent exact-SHA review. The candidate records 5 substantive claims, 14 sources, 30 semantic fixtures, 13 DUNE provenance rows, zero null canonical IDs, zero missing hashes, DUNE-owned GLINT/INK collision evidence, and generated DUNE parity. BRGW and all same-color permutations remain metadata/query-only and failed closed; UNKNOWN, GLINT, INK, WITCH, and JESKAI rejected the DUNE range. VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched. Excel was not updated by Codex.


## Independent Review - 2026-07-24

Review record: `docs/handoffs/2026-07-24-0045-codex-vm534-dune-independent-review.md`

Decision: APPROVE EXACT SHA e6f776d4e047aaa8f22358d4ff09486ff6100cf5

The independent review approved exact candidate `e6f776d4e047aaa8f22358d4ff09486ff6100cf5` and confirmed DUNE-only scope, governance-only workflow separation, BRGW/permutation fail-closed behavior, UNKNOWN/GLINT/INK/WITCH/JESKAI range rejection, semantic readiness, source/generated guardrails, normalized provenance parity, parser, placement, candidate-scope regression, and full npm.cmd test. No certification, program-base advancement, VM-535 through VM-538 work, or Excel update occurred.


## Certification - 2026-07-24

Certification handoff: `docs/handoffs/2026-07-24-0759-codex-vm534-dune-certification.md`

Decision: CERTIFIED EXACT SHA e6f776d4e047aaa8f22358d4ff09486ff6100cf5

VM-534 Dune is certified semantically ready from exact approved candidate `e6f776d4e047aaa8f22358d4ff09486ff6100cf5`. Certified count is now 33 of 37, and Wave 5 is now 3 of 5 certified. VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched. Excel was not updated by Codex.
