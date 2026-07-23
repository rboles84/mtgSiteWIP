# VM-531 — Jeskai Semantic Recovery

ID: VM-531
Status: In Progress
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: JESKAI
Raw packet: `data/raw-factions/jeskai/`
Cohort: clan
Contract: Contract v1.1 independent review approved / certification-ready

## Objective

Recover Jeskai end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [x] Gate 5 - Independent exact-SHA review approved.
- [ ] Certification - governance-only exact approved candidate certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/handoffs/2026-07-23-0825-codex-vm531-jeskai-gate1-gate2.md`
- Candidate recovery SHA: `9ac575a89eca55f8bc3522083e51689f29ebd262` - independently approved, certification-ready
- Independent reviewer: Codex independent exact-SHA review
- Independent review handoff: `docs/handoffs/2026-07-23-1123-codex-vm531-jeskai-independent-review.md`
- Certification commit: pending

## Gate 1+2 Audit

Gate 1+2 read-only audit completed on 2026-07-23. Disposition: READY FOR GATE 3 REMEDIATION. Intended final roles are 10 substantive claims (`jeskai_claim_0001` through `jeskai_claim_0010`) plus 1 support record (`jeskai_claim_0011`). Required remediation: bounded evidence locations, support isolation, 14 provenance owner-ID repairs, Jeskai semantic fixtures, source-owned generated rebuild, and exact candidate-scope validation. At Gate 1+2 close, no candidate existed yet.

## Candidate Workflow

Exact semantic candidate `9ac575a89eca55f8bc3522083e51689f29ebd262` was created from Gate 1+2 parent `2ffccb4ff2de65d9adb86321eca442db4edfea24` and received independent exact-SHA review decision `APPROVE EXACT SHA 9ac575a89eca55f8bc3522083e51689f29ebd262`. Candidate-scope passed from program base `9b91bbe0631ecdb45f38823ecc0fdc70bd7c12a2`; invalid URW/WUR/RWU/UWR/RUW/WRU aliases fail closed; no certification or program-base advancement has occurred.

## Independent Review

Independent exact-SHA review completed on 2026-07-23 in dedicated branch `codex/vm-531-jeskai-semantic-recovery-independent-review` and worktree `C:\dev\mtgSiteWIP-crit001-vm531-jeskai-independent-review`. Decision: `APPROVE EXACT SHA 9ac575a89eca55f8bc3522083e51689f29ebd262`. VM-531 is certification-ready only; certified count remains 29 of 37, Wave 4 remains 9 of 10 certified, program base remains `9b91bbe0631ecdb45f38823ecc0fdc70bd7c12a2`, and VM-532/Yore remains backlog and officially untouched.
