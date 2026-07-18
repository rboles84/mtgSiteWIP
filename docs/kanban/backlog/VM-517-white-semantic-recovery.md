# VM-517 — White Semantic Recovery

ID: VM-517
Status: Governance Hold - Infrastructure Candidate Awaiting Review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: W
Raw packet: `data/raw-factions/white/`
Cohort: mono
Contract: CRIT-001 Contract v1.1

## Objective

Recover White end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [ ] Gate 1 — Packet audit and bounded disposition.
- [ ] Gate 2 — Sufficient evidence completion.
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

## Drift Preflight State

VM-517 White / W is setup only after VM-516 Simic certification.

Starting branch: `codex/vm-517-white-semantic-recovery`.

Program base after Simic certification: `272337004aa63cfd33da5f1a859c33d211c8ca74`.

Drift preflight record: `docs/incidents/recoveries/VM-517-white-drift-preflight.md`.

Preflight decision: `STOP - WHITE GATE 1+2 NOT AUTHORIZED`.

Reason: Wave 3 monocolor compatibility is not process-ready. The exact candidate-scope probe `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W` exits 1 with a TypeError because the validator assumes raw `collision_guidance` is an array while White stores `collision_guidance` as an object with `pairs`.

White Gate 1+2, source inspection, semantic audit, remediation, generation, candidate creation, review, certification, and VM-518 work remain not started and unauthorized.

## Infrastructure Candidate State

Shared infrastructure candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.

Workflow record: `docs/incidents/recoveries/VM-517-monocolor-validator-candidate-workflow.md`.

Drift register entry: `DRIFT-016`.

Candidate status: awaiting independent exact-SHA review.

Scope: validator/test infrastructure only. The candidate normalizes documented array and object-with-`pairs` collision-guidance shapes for candidate-scope validation and fails closed on unsupported shapes with explicit diagnostics.

White status remains blocked. The infrastructure candidate does not authorize White Gate 1+2, source inspection, semantic audit, remediation, generated rebuild, candidate creation, independent review, certification, VM-518 work, program-base advancement, or external tracker updates. After exact infrastructure approval, the VM-517 drift preflight must be rerun in a separate authorized window before Gate 1+2 can be reconsidered.
