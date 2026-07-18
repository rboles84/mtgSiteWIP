# VM-518 — Blue Semantic Recovery

ID: VM-518
Status: Candidate Created - Awaiting Independent Review
Type: Canonical Identity Semantic Recovery
Priority: CRIT-001
Identity key: U
Raw packet: `data/raw-factions/blue/`
Cohort: mono
Contract: CRIT-001 Contract v1.1 drift preflight passed; Gate 1+2 read-only audit complete; remediation authorized; Gate 3+4 remediation and Gate 5 candidate created

## Objective

Recover Blue end to end under CRIT-001: audit the existing packet, bound readiness blockers, gather only sufficient evidence, repair canonical data, rebuild generated artifacts, validate semantic fixtures and regressions, obtain independent review of an immutable candidate SHA, and certify that exact recovery.

Current state: drift preflight passed after VM-517 White certification, Gate 1+2 read-only audit completed with `REMEDIATION AUTHORIZED`, and Gate 3+4 remediation/generated validation produced exact candidate `ac774e2eac207cc7fe2d744beac1f11788908159`. Blue is awaiting independent review. Certification, semantically_ready transition, VM-519, external tracker update, push, PR, and merge remain not started.

## Gates

- [x] Drift preflight - Passed; Gate 1+2 authorized.
- [x] Gate 1 - Packet audit and bounded disposition.
- [x] Gate 2 - Sufficient evidence completion.
- [x] Gate 3 - Canonical remediation.
- [x] Gate 4 - Generation and validation.
- [x] Gate 5 - Candidate creation.
- [ ] Independent review of exact candidate SHA.
- [ ] Certification of exact approved candidate SHA.

## Scope Rules

- One card owns the complete identity lifecycle.
- Reviewer corrections stay in this card.
- Non-blocking enrichment is recorded, not ticketed.
- Runtime scoring, Hall/Crucible behavior, inhibition, scheduling, and global recruiter tuning are excluded.

## Required Records

- Canonical ledger: `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Shared contract: `docs/reference/semantic-readiness-contract.md`
- Shared template: `docs/incidents/templates/identity-semantic-recovery-template.md`
- Audit/recovery report: `docs/incidents/recoveries/VM-518-blue-semantic-recovery.md`
- Drift preflight record: `docs/incidents/recoveries/VM-518-blue-drift-preflight.md`
- Candidate recovery SHA: `ac774e2eac207cc7fe2d744beac1f11788908159`
- Independent reviewer: pending
- Certification commit: pending

## Drift Preflight - 2026-07-18

- Decision: `PASS - BLUE GATE 1+2 AUTHORIZED`.
- Preflight governance SHA: `d1375ef71fe5740453e698596ef772890ac0aa0f`.
- Starting/program base: `9d250a7a76d219fdb961915cbf989a10a575c757`.
- Approved monocolor validator candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` remains unchanged in the current tree; `node research/semantic-candidate-scope-tests.js` passed.
- Blue same-SHA candidate-scope control exits `1` with deliberate unclassified proof-chain diagnostics and no validator crash. WG same-SHA array-shape control exits `0`.
- As-is Blue baseline: 8 claims, 0 substantive, 0 discovery, 0 support, 8 unclassified; all 8 lack bounded `evidence_locations`; U provenance has 12 entries, 3 null canonical IDs, 0 null hashes, 0 unresolved pointers, and 2 duplicate null canonical-entry keys; Blue fixture is absent.
- Frozen baseline recorded for native IDs, placement terms, thresholds, broad penalty, strengthen/suppress lists, lateral targets, object-with-`pairs` collision guidance, generated collision array, calibration, absent generic collision target, and identity-layer preview ownership/equality.
- Gate 1+2 is now complete in `docs/incidents/recoveries/VM-518-blue-semantic-recovery.md`.

## Gate 1+2 - 2026-07-18

- Decision: `REMEDIATION AUTHORIZED`.
- Gate 1+2 governance SHA: `428128505a194293feb915c929072e23dc9f0ace`.
- Source sufficiency: local listed official sources are sufficient; no online source intake is required if Gate 3+4 stays inside the recorded locators.
- Role disposition for Gate 3+4: `blue_claim_0002` through `blue_claim_0007` should become `substantive_claim`; `blue_claim_0001` and `blue_claim_0008` should become `support_record`; expected final role count is 6 substantive, 0 discovery, 2 support, 0 unclassified.
- Evidence scope requirement: all six substantive claims require bounded Contract v1.1 `evidence_locations` with `evidence_scope`; support records stay metadata/history or auxiliary support only.
- Current blockers to remediate: unclassified claims in profile/placement/recruiter/provenance proof chains, support/governance/rules/Scryfall leakage, 3 null U provenance canonical IDs, 2 duplicate null canonical-entry keys, absent Blue fixtures, no placement-summary native canonical object, and missing chatbot guidance evidence mapping.
- Frozen constraints: preserve placement/calibration fields, lateral targets `WU`, `UB`, `UR`, `UG`, raw object-with-`pairs` collision guidance with `R` then `G`, absent explicit `GENERIC_U_OVERFIT` collision target, native IDs, and preview source-to-embedded equality unless a documented candidate-scope exception is required.
- Gate 3+4 may proceed; Gate 5 candidate, independent review, certification, semantically_ready transition, VM-519, original main, Excel, and Table Talk changes remain excluded.

## Gate 3+4 / Gate 5 Candidate - 2026-07-18

- Candidate SHA: `ac774e2eac207cc7fe2d744beac1f11788908159`.
- Candidate subject: `VM-518 remediate Blue semantic readiness candidate`.
- Final role count: 8 total claims; 6 substantive, 0 discovery, 2 support, 0 unclassified.
- Final U provenance: 25 entries; 0 required null canonical IDs; 0 null content hashes; 0 unresolved pointers; 0 duplicate canonical entries.
- Exact-chain parity: `/core_identity` generated/fixture 5 entries; `/placement_summary` generated/fixture 6 entries; both exact ordered equality, no duplicates, missing, or extra IDs.
- Frozen scope: placement summary text, required terms, minimum hits, broad penalty, strengthen/suppress lists, lateral targets `WU`, `UB`, `UR`, `UG`, raw object-with-`pairs` collision guidance, pair order `R`, `G`, and absent generic collision target preserved.
- Validation: build, audit, semantic readiness validation, candidate-scope tests, fixture/provenance exact-chain checks, stale Blue surface scan, npm semantic/placement/context/source-generated/full suites, candidate-scope validation, and diff checks passed. Source-generated warnings remain known unrelated JESKAI/MARDU model-owned inhibitor warnings.
- Status: awaiting independent review. Not approved, not certified, not semantically_ready. VM-519 not started.
