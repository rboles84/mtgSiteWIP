# VM-518 Blue Independent Review

Status: Approved exact candidate. Awaiting certification.

Identity: Blue / U

Program base: `9d250a7a76d219fdb961915cbf989a10a575c757`

Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`

Validator approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`

Blue drift preflight: `d1375ef71fe5740453e698596ef772890ac0aa0f`

Gate 1+2 governance commit: `428128505a194293feb915c929072e23dc9f0ace`

Exact candidate reviewed: `ac774e2eac207cc7fe2d744beac1f11788908159`

Candidate workflow-record commit: `0e8663e77017c1b21b1d65caa1cf963e3d956dc6`

Review decision: `APPROVE EXACT SHA ac774e2eac207cc7fe2d744beac1f11788908159`

Review-record commit: `PENDING_VM518_BLUE_REVIEW_RECORD_SHA`

Reviewed at: 2026-07-18 12:18 Mountain

Reviewer: Codex independent review window

Certification: not performed

VM-519: not started

## 1. Preflight

| Control | Result | Evidence |
|---|---|---|
| Worktree | PASS | Active root was `C:\dev\mtgSiteWIP-crit001`. |
| Branch | PASS | `codex/vm-518-blue-semantic-recovery`. |
| Starting HEAD | PASS | `0e8663e77017c1b21b1d65caa1cf963e3d956dc6`. |
| Required objects | PASS | Program base, monocolor validator candidate/review, Blue drift preflight, Gate 1+2, exact candidate, and workflow record all existed. |
| Ancestry | PASS | Candidate `ac774e2eac207cc7fe2d744beac1f11788908159` is an ancestor of workflow record `0e8663e77017c1b21b1d65caa1cf963e3d956dc6`. |
| Active dirty baseline | PASS | Only the allowed Table Talk baseline was dirty: modified `docs/handoffs/HANDOFF_INDEX.md` and two untracked Table Talk handoffs. |
| Original main | PASS | Read-only check of `C:\dev\mtgSiteWIP` showed known docs/workflow dirt only; no raw/generated/semantic/runtime/test/schema changes were observed. |

## 2. Candidate Isolation

Semantic candidate range reviewed:

`428128505a194293feb915c929072e23dc9f0ace..ac774e2eac207cc7fe2d744beac1f11788908159`

Candidate files:

- `data/raw-factions/blue/blue.claims.json`
- `data/raw-factions/blue/blue.profile.json`
- `data/raw-factions/blue/blue.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/blue.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

The workflow range `ac774e2eac207cc7fe2d744beac1f11788908159..0e8663e77017c1b21b1d65caa1cf963e3d956dc6` contained governance/workflow records only and was excluded from semantic approval.

No superseded Blue candidate was found in the branch history or governance record.

## 3. Contract and Source Review

Initial Gate 1+2 claim-role state was independently checked as 8 total claims, 0 substantive, 0 discovery, 0 support, and 8 unclassified.

Final candidate claim-role state was independently checked as 8 total claims, 6 substantive, 0 discovery, 2 support, and 0 unclassified.

Source hierarchy:

- `MONO-U-2015`: claim-bearing philosophy backbone.
- `MONO-U-2025`: claim-bearing current voice update.
- `MECH-CP-2021`: mechanic-specific authority only.
- `GOV-COC-2024`: color-pie process/governance support for mechanic-bound claims only.
- `RULES-CR`, `VM-377`, and `SCRYFALL-U-2026-06-13`: support-only boundary sources.

All six substantive claims have bounded `evidence_locations` with Contract v1.1-compatible `evidence_scope`. Support records remain outside authoritative profile, placement, public, recruiter, fixture, and provenance proof chains except the Commander Compass auxiliary support field that is explicitly labeled as support.

The material Blue semantics are source-bounded: becoming, improvement, knowledge, tools, deliberate choice, planning, and the pressure risk of passivity/perfect-information delay. The candidate avoids treating intelligence, control, spell mechanics, card draw, countermagic, tempo, or generic "smart Blue" as standalone identity proof.

Required-neighbor boundaries are present and testable for `GENERIC_U_OVERFIT`, `WU`, `UR`, `UB`, `UG`, `PRISMARI`, `QUANDRIX`, `ESPER`, `BANT`, `GRIXIS`, `TEMUR`, `SULTAI`, `W`, `B`, `R`, and `G`.

## 4. Fixture and Provenance

Final U provenance has 25 entries, 0 required null canonical IDs, 0 null canonical content hashes, 0 unresolved pointers, 0 duplicate canonical entries, and 0 support/discovery-backed authoritative chains.

Exact-chain review:

| Locator | Generated count | Fixture count | Exact ordered equality | Duplicates | Missing | Extra |
|---|---:|---:|---|---|---|---|
| `data/raw-factions/blue/blue.profile.json#/core_identity` | 5 | 5 | true | none | none | none |
| `data/raw-factions/blue/blue.placement.json#/placement_summary` | 6 | 6 | true | none | none | none |

Fixture coverage includes core inclusion, mature/pressure behavior, required-neighbor exclusions, nearest-collision ambiguity, and provenance fixtures for both required locators.

## 5. Generated and Public Surfaces

Generated Blue public copy in `data/factions.json`, placement copy in `data/placement-model.json`, semantic provenance, and recruiter context are internally consistent with the corrected raw Blue profile and placement records.

The Commander Compass row is retained as auxiliary support and no longer acts as semantic proof. `blue_disc_004` now uses the mechanic-specific claim only for texture and excludes support-only Commander proof.

The DRIFT-015 preview check passed: `data/identity-layers.json#/expressions/U/preview_text` and `data/factions.json#/identity_layers/expressions/U/preview_text` are equal, unchanged from baseline, and semantically aligned with the approved Blue claims. No stale exact or semantic-equivalent Blue public/recruiter blocker was found.

## 6. Frozen and Scope Review

Frozen controls passed: placement summary, required terms, minimum hits `2`, broad penalty `0.1`, strengthen/suppress lists, lateral targets `WU`, `UB`, `UR`, `UG`, raw object-with-`pairs` collision guidance, R/G pair order, generated collision order, absent generic collision target, native IDs, calibration, and scoring behavior.

Exact candidate-scope validation passed:

`node research/validate-semantic-candidate-scope.mjs --base=428128505a194293feb915c929072e23dc9f0ace --target=ac774e2eac207cc7fe2d744beac1f11788908159 --identity=U`

## 7. Validation

| Command | Result | Notes |
|---|---|---|
| `git status --short --branch` | PASS | Only allowed Table Talk baseline present before review. |
| JSON parse checks for changed JSON files | PASS | Blue raw files, generated JSON, and fixture parsed successfully. |
| Explicit claim-role/evidence-scope/support-isolation checks | PASS | Final 8 total, 6 substantive, 0 discovery, 2 support, 0 unclassified; all substantive claims scoped; support isolated. |
| Null ID/hash, unresolved-pointer, duplicate canonical-entry scan | PASS | 25 U provenance entries; no null IDs/hashes, unresolved pointers, or duplicate canonical entries. |
| Fixture/provenance exact-chain comparison | PASS | `/core_identity` and `/placement_summary` exact ordered equality. |
| Stale Blue public/recruiter/preview scan | PASS | No approval-blocking stale Blue surface found. |
| Frozen-field comparison | PASS | Placement, collision, preview, and calibration controls preserved. |
| `npm.cmd run build:factions` | PASS | Wrote generated artifacts; no unexplained worktree diff. |
| `npm.cmd run build:factions` second run | PASS | Deterministic; no generated diff. |
| `node research/audit-semantic-readiness.mjs --targets=U` | PASS | Claim count 8; semantic role counts 6/0/2/0; missing references empty. |
| `node research/validate-semantic-readiness.mjs --targets=U` | PASS | Semantic readiness validation passed for U. |
| `node research/semantic-candidate-scope-tests.js` | PASS | Semantic candidate scope tests passed. |
| `npm.cmd run test:semantic-readiness` | PASS | Contract, scope, fixture validation passed; 1813 provenance entries verified. |
| `npm.cmd run test:placement` | PASS | 37 factions, 37 golden paths. |
| `npm.cmd run test:faction-context-isolation` | PASS | Context isolation passed. |
| `npm.cmd run test:source-generated` | PASS | Known unrelated JESKAI/MARDU model-owned inhibitor warnings unchanged. |
| `npm.cmd test` | PASS | Full suite passed. |
| `git diff --check` | PASS | Only non-blocking line-ending warning for dirty Table Talk `HANDOFF_INDEX.md`. |
| Exact candidate-scope command | PASS | Candidate scope passed for U exact SHA. |

An ad hoc reviewer regex using unsupported negative lookahead failed under `rg`; it had no approval impact because exact Git file enumeration and candidate-scope validation provided the authoritative scope check.

## 8. Drift Scorecard

All applicable review controls passed: correct branch and HEAD, exact candidate isolation, workflow exclusion, candidate file-scope justification, source hierarchy verification, claim-role and evidence-scope verification, support isolation, canonical ID/hash validation, exact fixture/provenance equality, frozen field preservation, public/recruiter alignment, required-neighbor distinctions, deterministic generation, exact candidate-scope validation, no unrelated identity drift, Table Talk exclusion, and no VM-519 work.

No scorecard control was `FAIL` or `UNKNOWN`.

## 9. Findings

No blocker findings.

No high findings.

No medium findings.

No low findings.

Non-blocking observations:

- `npm.cmd run test:source-generated` still reports known unrelated JESKAI/MARDU model-owned inhibitor warnings. The candidate does not modify Jeskai or Mardu files, and the warning content did not worsen.
- `git diff --check` emitted a line-ending warning for the pre-existing dirty `docs/handoffs/HANDOFF_INDEX.md` Table Talk baseline. This is outside the Blue candidate and review scope.
- Unchanged non-preview identity-layer display/navigation fields still include legacy Blue mechanic/Commander texture, but they are not used as authoritative candidate proof chains; the DRIFT-015 preview source and embedded preview are equal and aligned.

## 10. Decision

`APPROVE EXACT SHA ac774e2eac207cc7fe2d744beac1f11788908159`

## 11. Review Record

This governance-only review record updates the VM-518 report, card, board, CRIT ledgers, handoff, and handoff index. It does not modify Blue candidate semantic, generated, fixture, provenance, recruiter, runtime, test, schema, validator, builder, scoring, or calibration files.

Review-record commit: `PENDING_VM518_BLUE_REVIEW_RECORD_SHA`

## 12. Final State

Blue is approved for certification review but is not certified and is not `semantically_ready`.

No certification commit was created. No program-base advancement occurred. VM-519 was not started. The external Excel tracker was not modified. The original main worktree was not modified. The allowed Table Talk baseline remains preserved and excluded.
