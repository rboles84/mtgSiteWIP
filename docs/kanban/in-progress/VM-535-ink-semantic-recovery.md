# VM-535 - Ink Semantic Recovery

ID: VM-535
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: INK
Raw packet: `data/raw-factions/ink/`
Cohort: four-color
Contract: Contract v1.1 candidate workflow recorded

## Objective

Recover Ink end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-535-ink-semantic-recovery.md`
- Candidate recovery SHA: `9cefe57611552e563ab7601f2f32fc2c9eeac566`
- Independent reviewer: pending
- Certification commit: pending

## Gate 1+2 Baseline - 2026-07-24

Official branch/worktree: `codex/vm-535-ink-semantic-recovery` at `C:\dev\mtgSiteWIP-crit001-vm535-ink`, starting from program base `8a4f273e75842f97debbcdbc70009da7845e41d4`.

Gate 1+2 authorizes INK-only semantic remediation. Baseline: canonical key `INK`; display `Ink / Altruism`; display color order `RGWU`; accepted alias `INK` only; RGWU/WURG and all same-color permutations metadata-query-only; 5 unclassified claims; 13 sources; no semantic fixture; 3 INK provenance rows with zero null canonical IDs and zero missing hashes; stale provenance byte-check diagnostic; DUNE/WITCH neighbor claim contamination in collision guidance; raw preview disabled while generated preview remains retained. VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain backlog/not started and untouched. Excel was not updated by Codex.

## Candidate Workflow - 2026-07-24

Exact semantic candidate: `9cefe57611552e563ab7601f2f32fc2c9eeac566`.

Candidate parent proof: `9cefe57611552e563ab7601f2f32fc2c9eeac566^ = 4305482967f21be4a5c58c2f97fda2a848fc60c2`.

The candidate records 5 substantive claims, 13 INK provenance rows with zero null canonical IDs, 30 fixtures, INK-only aliasing, RGWU/WURG/permutation metadata-query-only behavior, required neighbor rejection probes, and preview invariant preservation. `npm.cmd ci`, full `npm.cmd test`, INK semantic readiness, provenance check with 2063 entries, source/generated guardrails, faction-context isolation, parser, placement, semantic-readiness regression bundle, and audit target passed.

No independent review or certification has occurred. Program base remains `8a4f273e75842f97debbcdbc70009da7845e41d4`; VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG remain untouched; Excel was not updated by Codex.

READY FOR INDEPENDENT REVIEW EXACT SHA `9cefe57611552e563ab7601f2f32fc2c9eeac566`
