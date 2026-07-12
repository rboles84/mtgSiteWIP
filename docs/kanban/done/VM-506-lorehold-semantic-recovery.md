# VM-506 — Lorehold Semantic Recovery

ID: VM-506
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: LOREHOLD
Raw packet: `data/raw-factions/lorehold/`
Cohort: college
Contract: v1.1

## Objective

Recover Lorehold end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Current state: certified semantically ready under CRIT-001 Contract v1.1. Gate 1 audit, Gate 2 bounded evidence confirmation, Gate 3 canonical remediation, Gate 4 generation/validation, bounded candidate correction, and independent Gate 5 exact-SHA review are complete in `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`. Initial candidate `c43127858e1a8609e1aed8481c2726ab03026a61` returned REQUEST CHANGES and is preserved as audit history. Replacement candidate recovery commit `6d8d46d8df0429a105c08e656a8303474c435abd` was approved by independent review on 2026-07-12.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation.
- [x] Gate 5 — Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- Candidate recovery SHA: `6d8d46d8df0429a105c08e656a8303474c435abd`
- Independent reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread
- Certification commit: pending program acceptance record

## Gate 1 Result

- Primary disposition: Claim-role classification required.
- Gate 2 recommendation: broad evidence completion is not required before bounded remediation; reserve Gate 2 for specific unsupported statements if found.
- Blockers: unclassified claims, discovery records in authoritative proof chains, support/product records in mechanics proof chain, missing recruiter-guidance evidence mapping, and generated provenance carrying discovery-backed chains.
- Scope status: no canonical Lorehold data, generated artifacts, runtime behavior, or other identities changed.

## Gate 2 Result

- Evidence confirmation scope: limited to the exact Gate 1 blockers.
- Targeted source discovery required: no, not at this stage.
- Gate 3 input: audit-only role map for all 97 claims, discovery replacement plan, core-values repair plan, recruiter guidance evidence mapping plan, provenance repair plan, mechanics support-record plan, and bounded required-neighbor plan are recorded in the audit/recovery report.
- Scope status: no canonical Lorehold data, generated artifacts, runtime behavior, or other identities changed.

## Gate 3 Result

- Canonical remediation complete for the Gate 1/Gate 2 blockers.
- Claims by semantic role: 88 `substantive_claim`, 7 `discovery_record`, 2 `support_record`, 0 `unclassified`.
- Discovery records retained as metadata only: `claim_lorehold_unknown_0001`, `lorehold_claim_0022` through `lorehold_claim_0027`.
- Support records retained as auxiliary product/deck records: `claim_lorehold_mechanic_0013`, `claim_lorehold_mechanic_0014`.
- Required neighbors recorded: `WR`, `QUANDRIX`, `PRISMARI`, `SILVERQUILL`, `WB`, `WU`, `RG`, `WITHERBLOOM`.
- Gate 4 completed: generated rebuild, provenance regeneration, source/generated validation, semantic fixtures, and generated-diff isolation.
- Scope status: no generated artifacts, runtime behavior, Prismari records, or other identities changed.

## Gate 4 Result

- Generated artifacts rebuilt from the remediated Lorehold canonical packet.
- Semantic-readiness provenance regenerated.
- Lorehold semantic fixture file added for core inclusion, mature/pressure behavior, required-neighbor exclusion, nearest-collision ambiguity, and provenance-chain validation.
- Validation passed: semantic-readiness validation, source/generated validation, semantic-readiness tests, placement golden paths, faction-context isolation, and dossier audit.
- Known warnings unchanged: one builder-owned Lorehold inhibitor warning in source/generated validation; dossier audit reports 113 warnings and 0 failures.
- Generated-diff isolation found no non-Lorehold semantic changes in generated JSON/provenance when Lorehold is omitted.
- Gate 5 pending: exact-SHA candidate-scope validation, independent review, and certification.
- Scope status: no canonical Lorehold raw files changed during Gate 4, no runtime behavior changed, Prismari remains certified, and no other identity started.

## Gate 5 Candidate Record

- Candidate parent SHA: `51667c7d91e8530a4cd508c891179893a44a14a2`.
- Candidate recovery SHA: `c43127858e1a8609e1aed8481c2726ab03026a61`.
- Candidate commit message: `VM-506 create Lorehold semantic recovery candidate`.
- Review result: REQUEST CHANGES.
- Workflow-record status: rejected candidate preserved as audit history.
- Certification status: none; Lorehold remains uncertified.
- Known warnings unchanged: one builder-owned Lorehold inhibitor warning; dossier audit reports 113 warnings and 0 failures.
- No other identity started.

## Gate 5 Bounded Correction Candidate

- Rejected candidate SHA: `c43127858e1a8609e1aed8481c2726ab03026a61`.
- Replacement candidate parent SHA: `55ba75ef281a1e4a848e637047585bd0aa21b6b9`.
- Replacement candidate recovery SHA: `6d8d46d8df0429a105c08e656a8303474c435abd`.
- Candidate commit message: `VM-506 correct Lorehold recovery candidate`.
- Corrections:
  - Restored forbidden placement confidence-field deltas to accepted program-base values.
  - Removed support-only mechanics records from authoritative `mechanics.supporting_claim_ids` while retaining them in auxiliary `support_claim_ids`.
  - Removed discovery records from Commander Compass `identity_basis.supporting_claim_ids` and isolated them as discovery metadata.
- Validation passed: semantic-readiness validation, source/generated validation, semantic-readiness tests, placement golden paths, faction-context isolation, dossier audit, candidate-scope guard, JSON parse checks, and `git diff --check`.
- Known warnings unchanged: one builder-owned Lorehold inhibitor warning; dossier audit reports 113 warnings and 0 failures.
- Workflow-record status: replacement candidate approved by independent Gate 5 review.
- Certification status: certified semantically ready under CRIT-001 Contract v1.1; exact certification SHA pending program acceptance record.

## Certification

- Approved recovery SHA: `6d8d46d8df0429a105c08e656a8303474c435abd`.
- Review result: APPROVE EXACT SHA.
- Reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread.
- Approval date: 2026-07-12.
- Final certification state: `semantically_ready`.
- Contract version: v1.1.
- Residual non-blocking findings:
  - Runtime Hall, Crucible, scoring, inhibition, scheduling, confidence, and live recruiter calibration remain post-CRIT investigations.
  - Adjacent identities except Prismari are not yet certified, so Lorehold neighbor guidance remains Lorehold-side and neutral until those packets receive CRIT-001 recovery.
- Known warnings unchanged:
  - Dossier audit remains 113 warnings / 0 failures.
  - Existing builder-owned Lorehold inhibitor warning remains unchanged.
