# VM-508 Ã¢â‚¬â€ Azorius Semantic Recovery

ID: VM-508
Status: Gate 5 recovery candidate created; pending independent review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: WU
Raw packet: `data/raw-factions/azorius_senate/`
Cohort: guild
Contract: CRIT-001 Contract v1.1

## Objective

Recover Azorius end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 Ã¢â‚¬â€ Packet audit and bounded disposition.
- [x] Gate 2 Ã¢â‚¬â€ Sufficient evidence completion.
- [x] Gate 3 Ã¢â‚¬â€ Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [ ] Gate 5 Ã¢â‚¬â€ Independent certification.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- Candidate recovery SHA: `221a19b690cad02fb9aba2c91ae506b6d4fcc205`
- Independent reviewer: pending
- Certification commit: pending

## Gate 1 Audit Status

- Completed: 2026-07-14
- Primary disposition: Claim-extraction pass required.
- Gate 2 evidence confirmation: Required.
- Gate 1 blockers: missing certifying semantic roles; discovery/search records used as profile, placement, generated, and provenance proof; missing recruiter evidence mappings; incomplete required-neighbor boundaries; missing semantic fixtures.
- Scope preservation: no canonical Azorius raw data, generated files, runtime behavior, other identity packets, candidate commits, or certification commits changed during Gate 1.

## Gate 2 Evidence Confirmation Status

- Completed: 2026-07-14
- Conclusion: Existing listed official sources, local canon guides, and current Azorius records are sufficient to plan bounded Gate 3 remediation.
- Targeted source discovery: Not required right now; Gate 3 should stop for bounded source-localization approval only if exact locators for already-listed official URLs cannot be established locally.
- Proposed required neighbors: generic WU overfit, Orzhov, Boros, Selesnya, Izzet / UR, House Dimir, Simic Combine.
- Scope preservation: no canonical Azorius raw data, generated files, runtime behavior, other identity packets, candidate commits, or certification commits changed during Gate 2.

## Gate 3 Canonical Remediation Status

- Completed: 2026-07-14
- Claims after remediation: 16 substantive, 10 discovery, 0 support, 0 unclassified.
- New substantive claims added: `azorius_senate_claim_0018` through `azorius_senate_claim_0026`.
- Required neighbors selected: generic WU overfit, Orzhov, Boros, Selesnya, Izzet / UR, House Dimir, Simic Combine.
- Canonical proof chains repaired: profile, placement summary, core values, behavioral signal, inhibitor trait, Addendum mechanics, recruiter guidance, collision guidance, and required-neighbor evidence.
- Discovery records retained only as discovery metadata; Commander/card/product and Dragon's Maze support material isolated as auxiliary.
- Generated artifacts, provenance, semantic fixtures, source/generated parity, and regression checks are deferred to Gate 4.
- Scope preservation: no generated files, runtime behavior, other identity packets, candidate commits, or certification commits changed during Gate 3.


## Gate 4 Generation and Validation Status

- Completed: 2026-07-14
- Generated artifacts rebuilt from Azorius canonical remediation.
- Semantic-readiness provenance regenerated and content hashes refreshed.
- Azorius semantic fixtures added and validated.
- Display-source cleanup performed only for WU/Azorius stale public copy in `data/factions.json` and `data/identity-layers.json`.
- Validation passed: build, semantic readiness, source/generated guardrails, fixtures, semantic readiness tests, placement tests, faction-context isolation, dossier follow-up tests, dossier audit, audit-semantic-readiness, generated-diff isolation, and frozen-field checks.
- Known warning unchanged: builder-owned Azorius inhibitor warning.
- Dossier audit remains 113 warnings / 0 failures.
- Azorius remains uncertified; no recovery candidate or certification commit has been created.

## Pre-Candidate Scope Cleanup Status

- Completed: 2026-07-14
- Removed the forbidden added confidence field at `data/raw-factions/azorius_senate/azorius_senate.placement.json#/discriminator_questions/2/confidence`, restoring the accepted parent shape for that question.
- Restored `character_id:char_lavinia` as discovery metadata under `data_quality.corpus_upgrade.retained_native_ids`; the parent `key_figures/3` location was not reused because `key_figures` is an authoritative semantic reference site and the retained Lavinia record has discovery-only evidence.
- Rebuilt generated artifacts and semantic provenance after the canonical cleanup.
- Candidate-scope dry-run has no confidence, calibration, lateral-inhibition, native-ID, provenance, non-Azorius raw, or generated-consumer coverage blockers.
- Remaining dry-run generated-scope findings are the documented WU/Azorius display-source exceptions: `data/factions.json` WU/Azorius display cleanup and `data/identity-layers.json#/expressions/WU/preview_text`.
- Azorius remains uncertified; no recovery candidate, workflow-record, independent review, or certification commit has been created.

## Gate 5 Candidate Status

- Candidate created: 2026-07-14
- Candidate parent SHA: `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`
- Candidate recovery SHA: `221a19b690cad02fb9aba2c91ae506b6d4fcc205`
- Workflow-record commit: pending until this record commit is finalized.
- Review state: pending independent review of the exact candidate SHA.
- Certification state: Azorius remains uncertified.
- Candidate-scope result: no confidence, calibration, lateral-inhibition, missing-native-ID, missing-provenance-native-ID, generated-consumer coverage, non-Azorius semantic, or non-Azorius raw findings remain.
- Documented display-source exception: `data/factions.json` WU/Azorius display cleanup and `data/identity-layers.json#/expressions/WU/preview_text`.
