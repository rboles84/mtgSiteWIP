# VM-522 - Bant Semantic Recovery

ID: VM-522
Status: Ready
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

## Current Governance State

Mandatory drift preflight completed setup-only and returned:

`STOP - BANT GATE 1+2 NOT AUTHORIZED`

The 2026-07-19 stop-line resolution rerun also returned:

`STOP - BANT GATE 1+2 NOT AUTHORIZED`

Read-only dependency tracing resolved active-consumer classification for Home, Archscry, recruiter, tests, and CI, and retained DRIFT-019 historical/debug exclusions.

The 2026-07-19 stage-ownership adjudication returned:

`PASS - BANT GATE 1+2 AUTHORIZED`

This superseded only the authorization conclusion of the two preserved STOP records and authorized only the later Gate 1+2 read-only audit.

The 2026-07-19 Gate 1+2 read-only semantic audit returned:

`PASS - BANT GATE 3+4 REMEDIATION AUTHORIZED`

Gate 1+2 is complete. Gate 3+4 remediation is authorized under the exact bounded contract in `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`.

No Bant remediation has occurred. No candidate exists. Independent review and certification remain unauthorized.

## Gate 1+2 Audit Disposition

- Current raw state: 21 Bant claims, all unclassified, 0 evidence locations.
- Intended final claim-role counts for Gate 3+4: 21 total; 16 `substantive_claim`, 5 `support_record`, 0 `discovery_record`, 0 unclassified.
- Gate 3+4 must rewrite/narrow `bant_claim_0002`, `bant_claim_0010`, and `bant_claim_0019`.
- Gate 3+4 must reclassify `bant_claim_0012`, `bant_claim_0017`, `bant_claim_0018`, `bant_claim_0020`, and `bant_claim_0021` as support records.
- Gate 3+4 must add evidence scopes, evidence locations, fixture locators, provenance canonical IDs/pointers/hashes, generated consumers, and raw/generated collision reconciliation.
- Gate 3+4 must cover the full required neighbor/collapse-risk set: Selesnya/WG, Simic/UG, Azorius/WU, Green/G, White/W, Blue/U, Naya, Esper, Temur, Abzan, Jeskai, Grixis, Jund, Sultai, Five-color/WUBRG, generic good-stuff, generic balance, and generic overfit.
- Gate 3+4 must not use support-only or discovery-only sources as authoritative semantic proof.

## Gates

- [x] Gate 0 - Branch/setup-only drift preflight.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [ ] Gate 3 - Canonical remediation. Authorized, not started.
- [ ] Gate 4 - Generation and validation. Authorized after bounded canonical remediation, not started.
- [ ] Gate 5 - Independent certification. Not authorized.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.
- VM-523 and later identities may remain setup-only before Bant certification, but may not receive semantic work.
- Gate 3+4 may not perform source acquisition, shared infrastructure changes, shared governance changes, independent review, certification, program-base advancement, Excel tracker edits, or VM-523 semantic work.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Drift-control template: `docs/incidents/CRIT-001-drift-control-template.md`
- Preflight stop report: `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`
- Preflight rerun stop report: `docs/handoffs/2026-07-19-1118-codex-vm522-bant-preflight-rerun-stop.md`
- Stage-ownership adjudication report: `docs/handoffs/2026-07-19-1426-codex-vm522-bant-stage-ownership-adjudication.md`
- Gate 1+2 audit report: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- Candidate recovery SHA: not created
- Independent reviewer: not authorized
- Certification commit: not authorized
