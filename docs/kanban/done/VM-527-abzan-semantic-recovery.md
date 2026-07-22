# VM-527 - Abzan Semantic Recovery

ID: VM-527
Status: Done - certified semantically_ready from exact approved candidate
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: ABZAN
Display color order: WBG
Raw packet: `data/raw-factions/abzan/`
Cohort: clan
Contract: Contract v1.1
Branch: `codex/vm-527-abzan-semantic-recovery`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm527-abzan`
Program base: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
Prior program base: `80b34dcda7db51d08f77f862f4eafb5cf3cabeaa`
Independent review branch: `codex/vm-527-abzan-semantic-recovery-independent-review`
Independent review worktree: `C:\dev\mtgSiteWIP-crit001-vm527-abzan-independent-review`
Certification branch: `codex/vm-527-abzan-semantic-recovery-certification`
Certification worktree: `C:\dev\mtgSiteWIP-crit001-vm527-abzan-certification`

## Objective

Recover Abzan end to end under CRIT-001 Contract v1.1: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Drift preflight - PASS; Gate 1+2 authorized only.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate workflow record for independent review.
- [x] Independent exact-SHA review.
- [x] Certification-only governance commit; exact approved candidate `11c099b8beb9f23e23660787f00b97e89914d50b` certified `semantically_ready`; certified count advanced to 26 of 37 and Wave 4 advanced to 6 of 10.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-528 Temur remains untouched until Abzan certification or explicit governance handoff.
- `ABZAN` is the only candidate-scope identity key; `WBG`, `BGW`, and `GWB` are display/color-order metadata only and must fail closed as aliases.

## Required Records

- Drift preflight: `docs/handoffs/2026-07-22-1014-codex-vm527-abzan-drift-preflight.md`
- Gate 1+2 audit: `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- Gate 3+4 remediation: `docs/handoffs/2026-07-22-1110-codex-vm527-abzan-gate3-gate4.md`
- Gate 5 candidate workflow: `docs/handoffs/2026-07-22-1125-codex-vm527-abzan-candidate-workflow.md`
- Independent exact-SHA review: `docs/handoffs/2026-07-22-1242-codex-vm527-abzan-independent-review.md`
- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-22-1035-codex-vm527-abzan-gate1-gate2.md`
- Recovery summary: `docs/incidents/recoveries/VM-527-abzan-semantic-recovery.md`
- Candidate recovery SHA: `11c099b8beb9f23e23660787f00b97e89914d50b`
- Candidate workflow commit: `71bf962c653a7b03b48bb05fca8661cdc3af2daa`
- Independent reviewer: APPROVE EXACT SHA `11c099b8beb9f23e23660787f00b97e89914d50b`
- Independent review commit: `70193840cf8ef55d98ef63552bcf0cf56d736d07`
- Certification handoff: `docs/handoffs/2026-07-22-1433-codex-vm527-abzan-certification.md`
- Certification commit: `PENDING_VM527_CERTIFICATION_COMMIT_SHA`

## Current Note

Exact Abzan candidate `11c099b8beb9f23e23660787f00b97e89914d50b` is certified `semantically_ready`. `ABZAN` is the canonical internal key; `WBG` is display order and `WBG`, `BGW`, and `GWB` are invalid validation aliases only. The candidate records 11 claims with 10 substantive claims and 1 support record, 20 source records, 43 ABZAN provenance rows, 17 semantic fixtures, exact candidate-scope PASS, and invalid alias rejection. Certification was governance-only; no Abzan source/generated/fixture/provenance/preview/runtime content changed during certification. The compacted-note candidate-SHA typo is preserved only as a corrected external-note typo, not as an alternate Git candidate object. VM-528 / Temur remains backlog, not started, and untouched.
