# CRIT-001 VM-501 Prerequisite Correction

Status: Corrected replacement candidate independently approved
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

## Correction of review blockers

1. Non-semantic `evidence_use` markers are now restricted to allowlisted, explicitly non-authoritative profile containers. An adversarial `core_identity` support-only bypass is rejected.
2. Identity candidate scope now freezes all research/runtime/builder code except the identity fixture and generated recruiter context; rejects non-identity data paths; compares every unrelated/global faction, placement-model, recruiter-context, and provenance value; and freezes every placement key matching inhibition, calibration, scoring, confidence, tie-order, scheduling, Hall, or Crucible surfaces.
3. Native-ID retention now covers every `id` or `*_id` in claims, sources, profile, and placement, and evidence-bearing native IDs must also survive into generated provenance.
4. Substantive claim `source_ids` and `evidence_locations[].source_id` sets must match exactly, every locator source must resolve, fixtures use the complete union, and provenance preserves the same complete chain.

The corrected negative suite directly covers the four independent-review examples: authoritative evidence-use bypass, global builder/runtime file changes, unrelated/global generated drift, claim/source ID loss, Brodd provenance ID loss, and missing or mismatched evidence-location sources.

The corrected replacement is one commit directly on accepted base `5165434`; rejected prerequisite commits are not part of its ancestry.

- Replacement candidate parent: `5165434`
- Replacement candidate SHA: `6e53acd5691c85caf3328d3bd301ac18d07879e1`
- Replacement review result: `approved`
- Replacement reviewer: `/root/vm501_prerequisite_review`
- Replacement review scope: exact candidate `6e53acd5691c85caf3328d3bd301ac18d07879e1` against parent `5165434`
- Certification/acceptance: none.

## Independent review result for `6e53acd`

The non-authoring VM-501 prerequisite review approved exact candidate `6e53acd5691c85caf3328d3bd301ac18d07879e1`.

Approved findings:

- Contract v1.1 allowlists non-semantic `evidence_use` only in explicitly non-authoritative containers.
- Identity candidate scope guards freeze shared contract/schema/tooling, builder/runtime, forbidden runtime-calibration fields, and unrelated generated semantic outputs.
- Native canonical IDs are retained across claims, sources, profile, placement, and generated provenance.
- Provenance fixtures validate the complete declared evidence claim/source chain.
- Ledger regeneration is stable after the v1.1 normalization pass.
- No Prismari certification, identity remediation acceptance, public behavior change, recruiter behavior change, Hall/Crucible change, scoring change, inhibition change, confidence change, tie-ordering change, or scheduling change is included.

Candidate `6e53acd5691c85caf3328d3bd301ac18d07879e1` may be accepted into the CRIT-001 program base as VM-501 prerequisite infrastructure. Fresh VM-502 Prismari replacement work may begin only from the accepted program base.
