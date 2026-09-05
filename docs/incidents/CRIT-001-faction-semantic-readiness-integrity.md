# CRIT-001 — Faction Semantic Readiness Integrity

ID: CRIT-001
Severity: P0 / SHOWSTOPPER
Status: Closed — 37/37 semantic recovery complete
Opened: 2026-07-11
Closed: 2026-09-05
Owner: Robert
Program: VM-501 through VM-538

## Defect

The current readiness process can certify structurally complete faction packets whose cited records do not semantically support the profile, placement, question, or recruiter guidance that consumes them.

Prismari established the failure mode: discovery/search-match records and support metadata can be counted as claims and referenced by authoritative fields even though those records do not extract or prove the asserted meaning. Existing reference and source-generated checks validate identifiers and propagation more strongly than entailment or conceptual sufficiency.

## Verified Initial Evidence

- Prismari has 18 claim records, but ten are `story_corpus_evidence` discovery records and two are auxiliary support records.
- Prismari's source ledger explicitly classifies ten sources as `discovery-only`, two as `support-only`, and three as `claim-bearing`.
- Structurally valid claim references can therefore overstate semantic backing.
- Quandrix, Silverquill, and Witherbloom share the same suspicious 18-claim / 15-source / 3-claim-bearing-source / 4-question packet shape.
- Lorehold demonstrates that a Strixhaven college is not inherently limited to that packet depth.
- Izzet is a useful extraction-process comparison, but its larger totals include history, characters, locations, mechanics, and overlap; it is not a numerical target.
- The faction builder consumes profile and placement packets and preserves existing reference arrays, but it does not prove that cited claims entail their consumers.

## Semantic Freeze

Frozen outside CRIT-001:

- faction foundation authoring;
- readiness approvals and unqualified `ready` declarations;
- canonical profile, placement, discriminator, or recruiter-guidance changes;
- Hall and Crucible content;
- scoring, confidence, inhibition, tie-ordering, and scheduling changes;
- automated question generation and claims-derived features.

Unrelated UI, accessibility, build, testing, and tooling work may proceed only when demonstrably independent of faction semantics.

## Recovery Model

VM-501 builds the shared contract, structural inventory, provenance, validator, ledger, fixtures, and templates. VM-502 through VM-538 each recover one identity end to end:

`audit -> bounded evidence -> canonical repair -> generation -> validation -> immutable candidate -> independent review -> certification`

Only one identity may be active, with one named next identity.

## Certification States

- `semantically_ready`
- `evidence_limited_blocked`

CRIT-001 normally closes only when all 37 identities are `semantically_ready`. An exception requires owner approval, unavailable-evidence documentation, actual technical containment, accepted residual risk, and an expiration or review condition. A label is not containment.

## Explicit Exclusions

CRIT-001 does not certify or modify Hall scheduling, Crucible reachability, pair scoring, lateral inhibition, the existing `-2.40` suppression stack, confidence calibration, global recruiter behavior, live LLM outcomes, or exhaustive lore completeness.

## Operational Records

- [Semantic Readiness Contract](../reference/semantic-readiness-contract.md)
- [Operating Playbook v2](CRIT-001-operating-playbook.md)
- [Recovery ledger — JSON](CRIT-001-identity-recovery-ledger.json)
- [Recovery ledger — Markdown](CRIT-001-identity-recovery-ledger.md)
- [Permanent learning](../strategy/2026-07-11-semantic-readiness-integrity-learning.md)
- [VM-501 umbrella](../kanban/done/VM-501-faction-semantic-readiness-recovery.md)

## Closure Decision

- Owner decision: **CLOSE + NEW FOLLOW-UP**.
- CRIT-001 achieved its objective: VM-501 established the shared recovery controls and VM-502 through VM-538 completed all 37 identity recoveries with exact-candidate review and certification evidence.
- All original identity-recovery gate categories have completion evidence, and the recovery ledger records 37 of 37 identities as `semantically_ready`.
- Later SIRF validation covered the subsequently rendered semantic state, including accepted WUBRG, Temur, and Lorehold goldens, without reopening CRIT-001.
- Remaining `PENDING_*` occurrences are not collectively unresolved semantic certifications. They include stale live summary pointers, truthful historical event-time values, and documentation/lifecycle debt.
- Historical event records are not rewritten to falsely imply that future SHAs were known when those records were authored.
- Bounded normalization of authoritative live provenance pointers is transferred to [VM-630 — CRIT-001 Live Provenance Pointer Normalization](../kanban/backlog/VM-630-crit001-live-provenance-pointer-normalization.md).
- Closing the recovery incident does not itself unfreeze semantic-foundation, Hall/Crucible, Placement-calibration, or other authority-sensitive work; any such change requires separate post-CRIT governance.

## Closure Gates — Complete

- [x] All 37 packets have reviewed semantic roles and bounded evidence.
- [x] Authoritative statements trace to claims that genuinely support them.
- [x] Required conceptual dimensions and bounded neighbor distinctions are sufficient.
- [x] Canonical questions and guidance retain evidence provenance.
- [x] Generated artifacts are rebuilt and provenance-validated.
- [x] Semantic fixtures and existing regressions pass.
- [x] An independent reviewer approved each exact candidate recovery SHA.
- [x] Separate certification evidence records each approved candidate and contract version.
