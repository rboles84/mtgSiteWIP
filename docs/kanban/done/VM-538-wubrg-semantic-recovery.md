# VM-538 - WUBRG Semantic Recovery

ID: VM-538
Status: Complete
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WUBRG
Raw packet: `data/raw-factions/wubrg/`
Cohort: endpoint
Contract: CRIT-001 Contract v1.1

## Objective

Recover WUBRG end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-538-wubrg-semantic-recovery.md`
- Gate 1+2 record: `docs/handoffs/2026-07-24-2224-codex-vm538-wubrg-gate1-gate2.md`
- Candidate workflow: `docs/handoffs/2026-07-24-2245-codex-vm538-wubrg-candidate-workflow.md`
- Candidate recovery SHA: `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`
- Independent reviewer: `docs/handoffs/2026-07-24-2300-codex-vm538-wubrg-independent-review.md`
- Certification commit: `PENDING_VM538_CERTIFICATION_COMMIT_SHA`

## Certification

Certified semantically ready from exact approved candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`.

Independent review decision: `APPROVE EXACT SHA c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`.

Gate 1+2 governance commit: `a5e678bea5d92a2addc184e3564d37b7e098140d`.

Candidate workflow commit: `54a9f54e13d425e96a5f7a56e40c5b6719438208`.

Independent review commit: `6eed742627d67ba9f36ffabe102c76b0b0c1f0fa`.

The candidate contains exactly nine WUBRG semantic files, records 8 substantive claims, 20 complete sources, 21 provenance rows with zero null canonical IDs/hashes, 41 fixtures, eight complete guidance mappings, all 37 required neighbor/generic/endpoint/alias/permutation rejection boundaries, unchanged enabled Home preview at order 36, suppressed public route/directory expansion, and WUBRG-owned Colorless collision proof.

Certified count: 37 of 37.

VM-538 WUBRG was the final uncertified identity. Excel was not updated by Codex. No remediation was performed. CRIT-001 37-Identity Semantic Recovery Program is complete after program-base advancement.
