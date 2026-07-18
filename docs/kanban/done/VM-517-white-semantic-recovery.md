# VM-517 - White Semantic Recovery

ID: VM-517
Status: Done - Certified
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: W
Raw packet: `data/raw-factions/white/`
Cohort: mono
Contract: CRIT-001 Contract v1.1

## Objective

Recover White end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [x] Independent review.
- [x] Certification.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-517-white-semantic-recovery.md`
- Independent review record: `docs/incidents/recoveries/VM-517-white-independent-review.md`
- Approved candidate SHA: `89535e5f73598a5b518e31e11598b05087274a95`
- Superseded candidate SHA: `8d6014950e5ca45ef85a90855cf283d80fd18e0d`
- Certification commit: `PENDING_VM517_CERTIFICATION_COMMIT_SHA`

## Certification State

White / W is certified `semantically_ready` from exact independently approved candidate `89535e5f73598a5b518e31e11598b05087274a95`.

Independent review decision: `APPROVE EXACT SHA 89535e5f73598a5b518e31e11598b05087274a95`.

Certification guard summary:

- Current branch and HEAD before certification matched the required VM-517 review state: `codex/vm-517-white-semantic-recovery` at `42bbb32e005bd2fbfd8ce9c2c86d2bb4709b9085`.
- Required object and ancestry checks passed from program base `272337004aa63cfd33da5f1a859c33d211c8ca74` through review/current HEAD.
- Exact candidate-scope validation passed for `307b93d56b4314405011f21f7d7616ac4b7ed16f..89535e5f73598a5b518e31e11598b05087274a95`.
- White claim counts remain 8 total, 6 `substantive_claim`, 0 `discovery_record`, 2 `support_record`, 0 `unclassified`.
- W provenance remains 25 entries with 0 null canonical IDs, 0 null hashes, 0 unresolved pointers, 0 duplicate canonical pointers, and 0 support-backed authoritative chains.
- Exact fixture/provenance parity passed for `/core_identity` and `/placement_summary`.
- Frozen placement summary text, required terms, minimum hits, broad penalty, strengthen/suppress lists, lateral targets `WU`, `WB`, `WG`, `WR`, collision targets `B`, `R`, native IDs, calibration, absent generic collision target, preview equality, and object-with-`pairs` raw collision guidance are preserved.
- Commander Compass retains one permitted auxiliary support row for `white_claim_0008`; support rows remain excluded from authoritative generated/recruiter proof chains.

## VM-518 Setup Boundary

VM-518 Blue / U may proceed only as setup after this certification. Blue drift preflight, Gate 1+2 semantic audit, remediation, generated rebuilds, candidate creation, review, certification, external tracker update, push, PR, and merge are not started by this card.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stayed in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning remain excluded.
