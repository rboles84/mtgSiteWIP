# VM-516 — Simic Semantic Recovery

ID: VM-516
Status: Replacement Candidate Approved - Awaiting Certification
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: UG
Raw packet: `data/raw-factions/simic_combine/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Simic end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 candidate - Candidate created for independent review.
- [x] Gate 5 review - Independent review returned REQUEST CHANGES.
- [x] Review remediation - Replacement candidate created.
- [x] Fresh independent review - Replacement candidate.
- [ ] Gate 5 certification - Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- Rejected candidate SHA: `cbca9f596a090e924d532e7cb657c27c79ccb9de`
- Candidate workflow record: `04510577b7f3e1c4bacc5f2a88018b461760a80a`
- Independent reviewer: Codex independent review returned `REQUEST CHANGES`
- Independent review record: `4da00dc997162ad609e84a77f6817c2ad0726dbc`
- Replacement candidate SHA: `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`
- Replacement workflow record: `4db93dcf9d957ad89e5b5e3bfeedcbd6f564aa46`
- Fresh replacement review record: `PENDING_VM516_REPLACEMENT_REVIEW_RECORD_COMMIT_SHA`
- Certification commit: pending

## Setup State

VM-516 is the next CRIT-001 identity after Selesnya certification.

Branch setup only was authorized from the VM-515 certification commit. The drift preflight performed read-only inventory only. Gate 1+2 audit authorized Gate 3+4 remediation, the final candidate was independently reviewed, and a replacement candidate now remediates the preview-surface blocker. Certification, semantically_ready transition, and VM-517 work have not started.

Program base: `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`.

The CRIT-001 drift-control baseline is installed. VM-516 drift preflight passed with no `FAIL` or `UNKNOWN` controls.

## Drift Preflight

Record: `docs/incidents/recoveries/VM-516-simic-drift-preflight.md`

Decision: `PASS — SIMIC GATE 1+2 AUTHORIZED`

Scope of authorization: Gate 1+2 read-only audit only. Remediation, generation, candidate creation, independent review, certification, semantically_ready transition, and VM-517 work remain unauthorized and not started.

Program base remains `fbb81530b5932fd7913ba5f9e9d35d4f8e9ad6e3`; this drift-preflight governance commit is not the CRIT-001 program base.

## Gate 1+2 Audit

Record: `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`

Decision: `REMEDIATION AUTHORIZED`

Gate 1+2 found sufficient listed/local source authority to proceed, but Simic is not semantically ready: 17 claims, raw explicit roles absent, ledger-derived 10 discovery records, 0 support records, 7 unclassified records, no Contract v1.1 evidence scopes, missing fixtures, 31 null UG provenance canonical IDs, and discovery/unclassified proof-chain contamination.

Scope of authorization: final candidate `cbca9f596a090e924d532e7cb657c27c79ccb9de` received independent review decision `REQUEST CHANGES`. Superseded candidates `f4afb9d5d769c72e1c86df189729423a380629af` and `204cf9e6be15f2c3ac59a36c3977efea9a9945ce` remain recorded as candidate-scope failures. Certification, semantically_ready transition, program-base advancement, and VM-517 work remain unauthorized and not started.

## Independent Review - 2026-07-17

Decision: `REQUEST CHANGES`.

Approval-blocking finding:

- `data/identity-layers.json#/expressions/UG/preview_text` and embedded `data/factions.json#/identity_layers/expressions/UG/preview_text` still contain stale preview-eligible Simic public copy: `Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.`
- The copy remains generic UG/mutation/research/optimization language without the source-bounded living-system, clade, medicine, public-health, or adaptation context used by the corrected raw profile, placement model, and recruiter context.

Required remediation:

- Narrow or replace the UG identity-layer preview copy in the display source.
- Regenerate or align the embedded `data/factions.json` identity-layer preview.
- Record any target-scoped display-source exception if candidate-scope requires it.
- Create a replacement candidate and separate workflow-record commit.

## Replacement Candidate - 2026-07-17

Replacement candidate `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e` remediates the single independent-review blocker by replacing stale UG identity-layer preview copy in `data/identity-layers.json` and regenerating the embedded preview in `data/factions.json`.

The replacement preserves the previously passing Simic semantic state: 33 claims, 23 substantive, 10 discovery, 0 support, 0 unclassified; 72 UG provenance entries; exact fixture/provenance equality for `/core_identity` and `/placement_summary`; unchanged frozen confidence, terms, thresholds, penalty, strengthen/suppress lists, lateral targets, absent generic collision target, and calibration.

Exact candidate-scope command returned only the documented target-scoped display-source exception for `data/identity-layers.json` and embedded `data/factions.json` identity-layer content. Full validation otherwise passed.

Fresh independent review approved exact replacement candidate `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e` with decision `APPROVE EXACT SHA bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`. The review adjudicated the candidate-scope non-zero result as the documented UG-limited display-source exception permitted by the operating playbook. No blocker, high, medium, or low findings remain.

Simic is approved but not certified, not `semantically_ready`, and VM-517 has not started. Certification remains a separate governance-only gate.
