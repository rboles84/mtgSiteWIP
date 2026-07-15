# VM-509 â€” Boros Semantic Recovery

ID: VM-509
Status: Corrected replacement candidate validation complete; corrected replacement candidate SHA pending
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WR
Raw packet: `data/raw-factions/boros_legion/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Boros end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 â€” Packet audit and bounded disposition.
- [x] Gate 2 â€” Sufficient evidence completion.
- [x] Gate 3 â€” Canonical remediation.
- [x] Gate 4 ? Generation and validation.
- [ ] Gate 5 â€” Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- Candidate recovery SHA: pending
- Independent reviewer: pending
- Certification commit: pending

## Gate 1 Audit Status

- Gate 1 completed: 2026-07-14
- Audit report: `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md`
- Starting SHA: `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`
- Primary disposition: Claim-extraction pass required.
- Gate 2 required: yes; bounded evidence confirmation is required before any canonical remediation.
- Exact blockers: missing semantic roles, missing evidence locations, authoritative references with no substantive claims, discovery-contaminated key-figure/provenance chains, missing fixtures, incomplete required-neighbor boundaries, empty collision guidance, stale/high-heat generated Boros copy, and incomplete provenance content hashes/stable IDs.
- Required-neighbor set for Gate 2 confirmation: generic WR overfit, Azorius/WU, Lorehold, Selesnya/WG, Rakdos/BR, Izzet/UR, Orzhov/WB, and Mardu if Gate 2 confirms the generated inhibition target should remain required.
- Scope preservation: no canonical Boros raw data, generated files, runtime behavior, other identity packets, candidate commit, or certification commit changed during Gate 1.
## Gate 2 Evidence Confirmation Status

- Gate 2 completed: 2026-07-14
- Report section: `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md#gate-2-evidence-confirmation`
- Conclusion: claim-extraction and canonical remediation remain required before Boros can certify.
- Proposed claim-role mapping: 9 likely substantive claims after bounded locators, 12 discovery records, 0 support records, and 3 unclassified claims requiring split/narrow/demotion (`007`, `011`, `012`).
- Required-neighbor set confirmed for Gate 3 planning: generic WR overfit, Azorius/WU, Lorehold, Selesnya/WG, Rakdos/BR, Izzet/UR, Orzhov/WB, and Mardu.
- Targeted source discovery: no broad online discovery required before Gate 3; request approval only if existing listed/local sources cannot provide bounded locators or if Radiance/high-heat fury-burning-zeal wording is retained.
- Scope preservation: no canonical Boros raw data, generated files, runtime behavior, other identity packets, candidate commit, or certification commit changed during Gate 2.
## Gate 3 Canonical Remediation Status

- Gate 3 completed: 2026-07-14
- Report section: `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md#gate-3-canonical-remediation`
- Conclusion: canonical remediation complete; Gate 4 generation, provenance rebuild, semantic fixtures, and validation are required next.
- Claims after remediation: 24 substantive claims, 12 discovery records, 0 support records, 0 unclassified.
- Discovery-only retained: claims 013-024; not authoritative proof.
- Claims split/narrowed: 007, 011, 012; added minimal substantive claims 025-036.
- Required-neighbor set retained: generic WR overfit, Azorius/WU, Lorehold, Selesnya/WG, Rakdos/BR, Izzet/UR, Orzhov/WB, and Mardu.
- Scope preservation: no generated artifacts, other identity packets, runtime behavior, candidate commit, or certification commit changed during Gate 3.

## Gate 4 Generation and Validation Status

- Gate 4 completed: 2026-07-14
- Report section: `docs/incidents/recoveries/VM-509-boros-semantic-recovery.md#gate-4-generation-and-validation`
- Conclusion: generated artifacts, provenance, fixtures, source/generated validation, generated-diff isolation, and regression checks passed.
- Collision preservation blocker resolved by normalizing Boros canonical collision targets: `generic_wr_overfit` -> `WR` for the generic-overfit guardrail entry, and `rakdos_cult` -> `cult_of_rakdos` for Rakdos/BR.
- Generated WR collision guidance now preserves all 8 required-neighbor entries; all have `lateral_inhibition: false`.
- Stale Boros high-heat public copy remains absent after rebuild.
- Known warnings unchanged: builder-owned Boros inhibitor warning; dossier audit 113 warnings / 0 failures; git-ignore permission warning and LF-to-CRLF notices only.
- Scope preservation: no candidate commit, certification commit, next identity work, non-Boros raw packet change, or runtime/scoring/inhibition/confidence/scheduling/tie-order/global recruiter behavior change.
- Boros remains uncertified and is ready for Gate 5 candidate creation when explicitly authorized.

## Gate 5 Candidate Readiness

- Candidate creation authorized after Gate 4 completion.
- Candidate parent SHA: `4d351747f0634663ea8f796099057e431af8a65b`.
- Candidate recovery SHA: pending until the immutable candidate commit is created.
- Boros remains uncertified; certification requires independent Gate 5 review and separate authorization.
## Infrastructure Unblock Note

- 2026-07-15: VM-509 failed candidate `abff94b91e94b99a6b2a77b71806a9d005ecec76` exposed a candidate-scope mismatch around explicit `lateral_inhibition: false` on non-inhibiting collision guidance.
- Infrastructure unblock commit `4d351747f0634663ea8f796099057e431af8a65b` establishes explicit `false` as a non-inhibiting opt-out, checks generated lateral target churn directly, and keeps true inhibition behavior forbidden for identity candidates.
- Validation triage proved `npm.cmd run test:semantic-readiness` stale-provenance failure is pre-existing at baseline `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`, not caused by the infrastructure fix; production provenance was not rebuilt for that baseline issue.
- Replacement candidate reconstruction must preserve Gate 3/Gate 4 Boros remediation while removing generated WR lateral target churn, scoring-hint findings, and retained-native-ID omissions.
## Replacement Candidate Readiness

- Replacement candidate parent: `4d351747f0634663ea8f796099057e431af8a65b`.
- Superseded failed candidate: `abff94b91e94b99a6b2a77b71806a9d005ecec76`.
- Superseded failed workflow record: `25420bad09715645ba4af37f07cac097b3e7966d`.
- Scope cleanup complete for generated WR lateral-target churn, frozen scoring hints, and retained native IDs.
- Replacement candidate SHA remains pending until the immutable candidate commit is created.

## Corrected Replacement Candidate Readiness

- Rejected replacement candidate: `c2f5d064460a007f0dca6be95b7beabb4ca85026`.
- Rejected workflow record: `d7f2523d53cfbc6420e75c83b9ab03192158a1a1`.
- Review-requested key-figure generated-chain cleanup complete: discovery records are not emitted as source-backed WR key-figure proof and Tajic is not emitted as authoritative generated key-figure proof.
- Claim `boros_legion_claim_026` Gatecrash locator corrected to "The Boros Legion - reviewed source record".
- Corrected replacement candidate SHA remains pending until immutable candidate commit creation.
