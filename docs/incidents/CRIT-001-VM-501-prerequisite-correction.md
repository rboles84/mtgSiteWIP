# CRIT-001 VM-501 Prerequisite Correction

Status: Changes requested; replacement prerequisite candidate in progress
Accepted program base: `5165434`
Rejected identity candidate used for audit reference only: `85d3c79daa5081b6af4376506f51d33fe51e1225`

## Objective

Correct the minimum shared semantic-readiness infrastructure defects proven by the first VM-502 review. This work is isolated from Prismari canonical and generated semantic changes and requires its own non-authoring review before program-base acceptance.

## Included

- Contract v1.1 evidence-use amendment and impact record.
- Generated provenance coverage for `data/factions.json`.
- Complete fixture claim/source-chain validation.
- Frozen shared-file identity-scope guard.
- Forbidden runtime/calibration-field guard.
- Native canonical-ID retention guard.
- Stable ledger regeneration and template-cohort change explanation.
- Tests proving each guard accepts valid paths and rejects invalid paths.

## Excluded

- Prismari claims, sources, profile, placement, changelog, and fixtures.
- Generated Prismari semantic changes.
- Global recruiter behavior.
- Hall, Crucible, scoring, inhibition, confidence, tie ordering, and scheduling.

## Review gate

The immutable prerequisite candidate must be reviewed by a non-authoring reviewer. Acceptance into `codex/crit001-semantic-readiness` is prohibited until that review approves the exact candidate SHA.

## Validation evidence

- PASS — semantic-readiness contract tests.
- PASS — semantic candidate-scope tests.
- PASS — invalid/valid contract fixtures and provenance freshness.
- PASS — rejected-candidate regression: `85d3c79` is rejected for frozen shared files, prohibited lateral-inhibition/calibration changes, lost native provenance IDs, and missing `data/factions.json` provenance.
- PASS — full faction rebuild changed no public faction, placement-model, placement-schema, or recruiter-context content.
- PASS — provenance contains 1,297 entries; every entry declares `data/factions.json`, placement model, recruiter context, and Contract v1.1.
- PASS — exact provenance diff isolation: entry count, canonical locators, content hashes, claim chains, and source chains are unchanged; only Contract v1.1, the added public consumer, and recovered native IDs differ.
- PASS — all-37 source/generated validation; the same 30 builder-owned inhibitor warnings remain.
- PASS — 37/37 placement golden paths.
- PASS — faction-context isolation and dossier follow-up tests.
- PASS with unchanged warnings — dossier audit: 113 warnings, zero failures.
- PASS — full `npm.cmd test`.
- PASS — 226 parser cases.
- PASS — two consecutive real ledger regenerations are byte-identical after the first v1.1 normalization pass.
- PASS — `git diff --check`.

## Candidate boundaries

- No identity packet or identity fixture changes.
- No public generated semantic changes; provenance metadata only.
- No global recruiter, Hall, Crucible, scoring, inhibition, confidence, tie-ordering, or scheduling changes.
- Candidate parent SHA: `5165434`
- Candidate SHA: `b5d1c8db4758cab740392a6417c16019d778cc4c`
- Independent review result: `changes_requested`
- Certification/acceptance: none.

## Independent review findings for `b5d1c8d`

1. `evidence_use` was trusted without canonical-path restrictions, allowing an authoritative identity field to relabel support-only evidence as auxiliary and bypass the substantive-evidence rule.
2. The identity-scope guard used a narrow blocklist, left global builder/runtime files mutable, and did not compare unrelated identity or global generated content.
3. Native-ID retention inspected only profile and placement, omitted claims/sources and several native ID forms, and therefore did not comprehensively protect canonical IDs.
4. Evidence-chain validation used `claim.source_ids` without requiring `evidence_locations[].source_id` to resolve, match the claim source chain, and propagate through fixtures/provenance.

Candidate `b5d1c8db4758cab740392a6417c16019d778cc4c` remains immutable rejected audit history. It must not be accepted into the program base. A replacement candidate requires correction of all four blockers and a new independent review.
