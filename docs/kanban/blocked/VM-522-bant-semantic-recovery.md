# VM-522 - Bant Semantic Recovery

ID: VM-522
Status: Blocked
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: BANT
Raw packet: `data/raw-factions/bant/`
Cohort: shard
Contract: CRIT-001 Contract v1.1
Branch: `codex/vm-522-bant-semantic-recovery`
Setup base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`

## Objective

Recover Bant end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Current Stop

Mandatory drift preflight completed setup-only and returned:

`STOP - BANT GATE 1+2 NOT AUTHORIZED`

Gate 1+2 may not begin until a separate governance unblock addresses or explicitly resolves the preflight blockers under the CRIT-001 drift-control template.

## Blocking Evidence

- DRIFT-015: FAIL for authorization. Preview ownership/equality was identified, but semantic alignment is not proven and remains blocked by null roles plus incomplete active-consumer proof-chain confidence.
- DRIFT-016: FAIL for authorization. Bant raw collision guidance shape is accepted, but candidate-scope validation exits 1 for active-consumer proof-chain contamination from unclassified `bant_claim_*` references.
- DRIFT-017: UNKNOWN/FAIL for authorization. Active-consumer provenance and generated truth cannot be approved from the current state.
- Fixtures: `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` is missing.
- Collision guidance: raw order/targets do not match generated placement guidance; raw Naya/Jund entries are absent from generated collisions and generated lateral targets add ABZAN/TEMUR/SULTAI.
- Role classification: all 21 Bant claims have no stored semantic role fields.

## Gates

- [x] Gate 0 - Branch/setup-only drift preflight.
- [ ] Gate 1 - Packet audit and bounded disposition. Blocked.
- [ ] Gate 2 - Sufficient evidence completion. Blocked.
- [ ] Gate 3 - Canonical remediation. Not authorized.
- [ ] Gate 4 - Generation and validation. Not authorized.
- [ ] Gate 5 - Independent certification. Not authorized.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-523 and later identities may remain setup-only before Bant certification, but may not receive semantic work.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
- Preflight stop report: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Candidate recovery SHA: not authorized
- Independent reviewer: not authorized
- Certification commit: not authorized
