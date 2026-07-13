# VM-504 — Silverquill Semantic Recovery

ID: VM-504
Status: Done
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: SILVERQUILL
Raw packet: `data/raw-factions/silverquill/`
Cohort: college
Contract: v1.1

Current state: certified semantically ready under CRIT-001 Contract v1.1. Approved recovery SHA `b9cd9e914c280e9c40c7a977b8f7c07204614d3e` was approved by independent Gate 5 exact-SHA review on 2026-07-12. Certification commit is `PENDING_VM504_CERTIFICATION_COMMIT_SHA`.

Gate 1 / Gate 2 report: `docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md`
Primary disposition: `Claim-extraction pass required`
Gate 2 conclusion: no targeted source discovery is required right now; Gate 3 can proceed from already-listed sources and existing local records, with source localization if official passages are not cached.

## Objective

Recover Silverquill end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

## Gates

- [x] Gate 1 — Packet audit and bounded disposition.
- [x] Gate 2 — Sufficient evidence completion.
- [x] Gate 3 — Canonical remediation.
- [x] Gate 4 — Generation and validation, including bounded wording blocker resolution.
- [x] Gate 5 — Independent certification.

## Gate 1 Summary

Gate 1 confirmed Silverquill shares the thin Strixhaven packet pattern: 18 claim records, 6 likely substantive official-source records, 10 discovery/search records, and 2 support records. Discovery records currently support authoritative profile, placement, and generated provenance chains. Recruiter guidance lacks evidence mapping. The packet is not certifiable through light role cleanup alone.

## Gate 2 Summary

Gate 2 confirmed the exact bounded evidence plan for Gate 3. Required remediation is limited to claim-role assignment, bounded evidence localization, minimal new substantive claims from existing/known sources, discovery-record replacement, support-record auxiliary isolation, recruiter evidence mappings, required-neighbor mapping, and later generated/provenance rebuild in Gate 4.

No targeted source discovery is required right now. Do not rebuild generated artifacts until Gate 4.

## Gate 3 Summary

Gate 3 remediated only Silverquill canonical raw data and VM-504 workflow records. Claims now classify as 14 substantive, 10 discovery, 2 support, 0 unclassified. Discovery rows are retained only as data-quality discovery metadata; support rows are retained only as Commander/product/card auxiliary support. Required neighbors are `WB`, `HOUSE_DIMIR`, and `PRISMARI`; `WU` remains a non-blocking guardrail. Generated artifacts and provenance remain stale until Gate 4.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md`
- Candidate recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`
- Independent reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread
- Certification commit: `PENDING_VM504_CERTIFICATION_COMMIT_SHA`

## Gate 4 Summary

Gate 4 rebuilt generated artifacts, regenerated semantic provenance, added Silverquill semantic fixtures, and passed the focused validation suite. Public display copy was narrowed in `data/factions.json`, with a Silverquill-scoped `data/identity-layers.json` display-source correction so generated identity-layer copy no longer preserves the old Radiance/Shadow public tension language.

Gate 4 is blocked from Gate 5 candidate creation by two stale raw-sourced generated strings:

- `silverquill_q2.purpose`: `Separates Radiance and Shadow readings.`
- `chatbot_guidance/how_to_recognize_match/1`: `understands performance and reputation`.

These require a bounded canonical wording correction or explicit review acceptance before candidate creation. Silverquill remains uncertified.

## Gate 4 Bounded Blocker Resolution Summary

Resolved the two stale raw-sourced generated wording blockers:

- Replaced `silverquill_q2.purpose` from `Separates Radiance and Shadow readings.` to `Tests whether public language is being used to uplift, pressure, persuade, or dominate through rhetoric and social force.`
- Replaced `understands performance and reputation` with `uses public language, praise, critique, or performance to shape how people are seen or treated` in both the chatbot match guidance and matching ideal-fit indicator so the stale phrase is absent from canonical/generated consumers.

Rebuilt generated artifacts and provenance. Validation passed. Silverquill is ready for Gate 5 candidate creation when authorized, but remains uncertified.

## Gate 5 Pre-Candidate Scope-Policy Cleanup Summary

Pre-candidate scope verification found frozen confidence/calibration deltas. Cleanup restored:

- `/core_values/7/confidence`, `/core_values/8/confidence`, and `/core_values/9/confidence` to `Medium` on substantive Silverquill core-value rows.
- `/placement_summary/calibrated_false_positive_guardrail` exactly to the accepted program-base value.
- `/placement_summary/calibrated_primary_read` exactly to the accepted program-base value.

Validation passed. Candidate-scope guard now has no confidence/calibration findings; only the documented Silverquill-scoped display-source exception remains for `data/identity-layers.json` / generated `data/factions.json` identity-layer content. Silverquill is ready for Gate 5 candidate creation when authorized.

## Gate 5 Replacement Candidate Preparation

Candidate parent SHA: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Replacement candidate recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`
Workflow state: replacement candidate is being prepared after rejected candidate `078310b428d66e3f1423fb897d919040542a4593`. Silverquill remains uncertified; no certification commit exists.

Candidate content includes Gate 3 canonical remediation, Gate 4 generated artifacts and provenance, bounded wording-blocker resolution, scope-policy cleanup, Silverquill semantic fixtures, and VM-504 workflow/report records through candidate readiness.

Validation summary recorded for review:

- Gate 4 validation passed.
- Candidate-scope guard has no confidence/calibration findings.
- Remaining candidate-scope findings are only the documented Silverquill display-source exception: data/identity-layers.json and generated data/factions.json identity-layer content.
- Known builder-owned Silverquill inhibitor warning remains unchanged.
- Dossier audit remains 113 warnings / 0 failures.

Superseded rejected candidate SHA: `078310b428d66e3f1423fb897d919040542a4593`
Replacement candidate SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`.


## Gate 5 Replacement Candidate Record

Replacement candidate parent SHA: `3baa8307cf1d6b23aab1564b866e6580e500cf66`
Replacement candidate recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`
Superseded rejected candidate SHA: `078310b428d66e3f1423fb897d919040542a4593`
Safety ref: `backup/vm-504-rejected-silverquill-candidate-078310b`
Workflow state: awaiting independent Gate 5 review. Silverquill remains uncertified; no certification commit exists.


## Certification

- Identity: Silverquill.
- VM: VM-504.
- Contract version: v1.1.
- Approved recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`.
- Superseded rejected candidate SHA: `078310b428d66e3f1423fb897d919040542a4593`.
- Candidate workflow-record SHA: `d5239942f806deb4d580d1a64b16d0ebaade7236`.
- Independent review result: APPROVE EXACT SHA.
- Reviewer: Robert / user-supplied independent Gate 5 review in this Codex thread.
- Approval date: 2026-07-12.
- Final certification state: `semantically_ready`.
- Recovery commit: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`.
- Certification commit: `PENDING_VM504_CERTIFICATION_COMMIT_SHA`.
- Residual non-blocking findings:
  - LOW: literal `Silverquill?s` apostrophe artifacts remain in canonical text at `data/raw-factions/silverquill/silverquill.claims.json` and `data/raw-factions/silverquill/silverquill.placement.json`. This is readability hygiene only, does not change semantic evidence chains, and is deferred to post-certification non-blocking cleanup.
  - Runtime Hall, Crucible, scoring, inhibition, scheduling, confidence, and live recruiter calibration remain post-CRIT investigations.
  - Candidate-scope guard has the documented Silverquill display-source exception: `data/identity-layers.json` and generated `data/factions.json` identity-layer content.
- Known unchanged warnings:
  - Builder-owned Silverquill inhibitor warning remains unchanged.
  - Dossier audit logic verified 37 primary dossiers, 76 adjacent dossiers, 113 warnings, and 0 failures; direct `npm.cmd run dossier:audit` may require artifact-write permissions.
