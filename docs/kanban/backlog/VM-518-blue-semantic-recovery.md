# VM-518 — Blue Semantic Recovery

ID: VM-518
Status: Drift Preflight Passed - Gate 1+2 Authorized Not Started
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: U
Raw packet: `data/raw-factions/blue/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 drift preflight passed; Gate 1+2 read-only audit authorized but not started

## Objective

Recover Blue end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Current state: drift preflight passed after VM-517 White certification. Branch `codex/vm-518-blue-semantic-recovery` is authorized for the next Gate 1+2 read-only audit only. Blue remediation, generated rebuilds, fixture creation, candidate, review, certification, and VM-519 remain unauthorized and not started.

## Gates

- [x] Drift preflight - Passed; Gate 1+2 authorized but not started.
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
- Drift preflight record: `docs/incidents/recoveries/VM-518-blue-drift-preflight.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Drift Preflight - 2026-07-18

- Decision: `PASS - BLUE GATE 1+2 AUTHORIZED`.
- Preflight governance SHA: `PENDING_VM518_DRIFT_PREFLIGHT_SHA`.
- Starting/program base: `9d250a7a76d219fdb961915cbf989a10a575c757`.
- Approved monocolor validator candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` remains unchanged in the current tree; `node research/semantic-candidate-scope-tests.js` passed.
- Blue same-SHA candidate-scope control exits `1` with deliberate unclassified proof-chain diagnostics and no validator crash. WG same-SHA array-shape control exits `0`.
- As-is Blue baseline: 8 claims, 0 substantive, 0 discovery, 0 support, 8 unclassified; all 8 lack bounded `evidence_locations`; U provenance has 12 entries, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers, and 2 duplicate null canonical-entry keys; Blue fixture is absent.
- Frozen baseline recorded for native IDs, placement terms, thresholds, broad penalty, strengthen/suppress lists, lateral targets, object-with-`pairs` collision guidance, generated collision array, calibration, absent generic collision target, and identity-layer preview ownership/equality.
- Gate 1+2 may begin in a later window as read-only audit only. Remediation is not authorized by this preflight.
