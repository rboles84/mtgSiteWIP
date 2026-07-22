# VM-527 - Abzan Semantic Recovery

ID: VM-527
Status: In Progress
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
- [ ] Certification-only governance commit.

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
- Audit/recovery report: pending
- Candidate recovery SHA: `11c099b8beb9f23e23660787f00b97e89914d50b`
- Candidate workflow commit: `PENDING_VM527_CANDIDATE_WORKFLOW_SHA`
- Independent reviewer: APPROVE EXACT SHA `11c099b8beb9f23e23660787f00b97e89914d50b`
- Independent review commit: `PENDING_VM527_INDEPENDENT_REVIEW_SHA`
- Certification commit: pending
