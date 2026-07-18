# VM-517 - White Drift Preflight Rerun

Status: Drift preflight passed. Gate 1+2 authorized but not started.

Identity: VM-517 - White / W
Contract: CRIT-001 Contract v1.1
Branch: `codex/vm-517-white-semantic-recovery`
Starting branch HEAD: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Current CRIT-001 program base: `272337004aa63cfd33da5f1a859c33d211c8ca74`
Original White preflight SHA: `06627929eb0e048a8c0c20612970e779098a982c`
Original White preflight decision: `STOP - WHITE GATE 1+2 NOT AUTHORIZED`
Approved validator candidate SHA: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Validator workflow record SHA: `7c7b1bd5e463447196ece7c7160dd5b3fb4af6a1`
Validator approval review/current expected HEAD: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Preflight rerun governance SHA: `PENDING_VM517_DRIFT_PREFLIGHT_RERUN_SHA`

This is a governance-only rerun after exact-SHA approval of the monocolor candidate-scope validator infrastructure. It preserves the original STOP record at `06627929eb0e048a8c0c20612970e779098a982c`. It does not perform White Gate 1+2 semantic adjudication, does not authorize remediation, does not create a White candidate, does not perform independent semantic review, does not certify White, does not advance the CRIT-001 program base, does not start VM-518, and does not modify the external Excel tracker.

## A. Preflight State

| Control | Result | Evidence |
|---|---|---|
| Active worktree | PASS | `C:\dev\mtgSiteWIP-crit001`. |
| Active branch | PASS | `codex/vm-517-white-semantic-recovery`. |
| Starting HEAD | PASS | `af3d8c6c563b3743f65c2dc8478519707f4785c8`. |
| Program base | PASS | `272337004aa63cfd33da5f1a859c33d211c8ca74`; this rerun commit does not become the certification/program base. |
| Required objects exist | PASS | Git object checks passed for `272337004aa63cfd33da5f1a859c33d211c8ca74`, `06627929eb0e048a8c0c20612970e779098a982c`, `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`, `7c7b1bd5e463447196ece7c7160dd5b3fb4af6a1`, and `af3d8c6c563b3743f65c2dc8478519707f4785c8`. |
| Expected ancestry | PASS | Program base -> original White preflight -> validator candidate -> validator workflow record -> validator approval review/current HEAD. |
| Approved validator candidate unchanged | PASS | Current `research/validate-semantic-candidate-scope.mjs` and `research/semantic-candidate-scope-tests.js` match exact approved candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2` with `git diff --exit-code`. |
| Certified identity count | PASS | CRIT JSON ledger records 15 certified identities. |
| Wave 2 complete | PASS | CRIT ledgers and board record 10 of 10 Ravnica guild identities certified. |
| White setup-only | PASS | White has no Gate 1+2 report, candidate, review, certification, or `semantically_ready` state. |
| VM-518 untouched | PASS | VM-518 remains backlog/not_started in the CRIT ledger. |
| Allowed dirty baseline | PASS | Preserved and excluded: modified `docs/handoffs/HANDOFF_INDEX.md`; untracked `docs/handoffs/2026-07-16-2119-codex-table-talk-link-shelf-scan.md`; untracked `docs/handoffs/2026-07-16-2128-codex-canon-table-talk-shelf-deep-scan.md`. |
| Original main | PASS | Read-only `git -C C:\dev\mtgSiteWIP status --short` showed docs/workflow-only dirt and no raw, generated, semantic, fixture, provenance, runtime, schema, validator, builder, scoring, calibration, or data changes. Git also reported user-level ignore permission warnings; these did not alter repository state. |

## B. Validator Integrity

Current approved files:

- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

Validator integrity results:

- PASS - exact tree comparison to `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.
- PASS - `node research/semantic-candidate-scope-tests.js` exited 0 with `Semantic candidate scope tests passed.`
- PASS - array `collision_guidance` support remains covered and preserved.
- PASS - object-with-`pairs` support remains covered and preserved.
- PASS - source order is preserved by normalized pointers such as `#/collision_guidance/pairs/0`.
- PASS - `collision_id` and `against` comparison semantics are preserved.
- PASS - unsupported or malformed shapes fail closed with structured diagnostics.
- PASS - no broad object metadata flattening or pair metadata promotion was introduced.
- PASS - Simic's reviewed display-source exception behavior remains unchanged; exact UG command exits 1 with only identity-layer/global generated display-source messages.

## C. Former Failure Recheck

Original failed controls:

| Former failed control | Original result | Exact rerun command | Exit | Current result | Evidence | Score |
|---|---|---|---:|---|---|---|
| Monocolor pipeline support | FAIL | `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W` | 1 | No structural crash; W reaches deliberate pre-remediation proof-chain adjudication. | Output contains generated/provenance proof-chain contamination for unclassified White claims. It contains no TypeError and no collision-guidance shape error. | PASS |
| Candidate-scope validation coverage | FAIL | `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=06627929eb0e048a8c0c20612970e779098a982c --identity=W` | 1 | Coverage reaches deliberate adjudication over White generated/provenance/recruiter proof chains. | Output is the same class of unclassified-claim proof-chain findings; no unhandled crash and no structural incompatibility remains. | PASS |
| White collision-guidance structural compatibility | FAIL | Same two White commands above. | 1 / 1 | Object-with-`pairs` raw collision guidance is now normalized and checked. | Candidate-scope tests and direct White commands verify no false `collision_guidance` structural error. | PASS |

The former operational hold is superseded only for Gate 1+2 authorization. It does not authorize remediation.

## D. Monocolor Regression

| Identity / shape | Command | Exit | Result | Expected behavior | Warnings |
|---|---|---:|---|---|---|
| White / W object-with-`pairs` | `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W` | 1 | No structural crash; deliberate pre-remediation unclassified proof-chain findings. | Non-zero is acceptable only because White is not remediated and no candidate exists. | None structural. |
| Blue / U object-with-`pairs` | `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=U` | 1 | No structural crash; deliberate pre-remediation unclassified proof-chain findings. | Safe comparison for an additional monocolor without beginning Blue recovery. | Deterministic rerun passed: exit 1 both times, 47 output lines both times, identical output. |
| Selesnya / WG array | `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` | 0 | `Semantic candidate scope passed for WG`. | Existing certified array behavior remains intact. | None. |
| Simic / UG array plus display-source exception | `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG` | 1 | Preserved approved exception: `identity candidate modified non-identity path data/identity-layers.json`; `unrelated or global data/factions.json content changed`. | Simic exception remains visible and unchanged. | Documented UG display-source exception only. |

Repository-wide raw placement shape inventory found 25 array-shaped `collision_guidance` packets, 12 object-with-`pairs` packets, and no missing, primitive, null, object-without-`pairs`, non-array-`pairs`, or third live shape.

## E. White Baseline Reconciliation

Identity resolution remains unchanged:

- Target: `W`.
- Raw directory: `data/raw-factions/white/`.
- Raw files: `white.claims.json`, `white.sources.json`, `white.profile.json`, `white.placement.json`, `white.changelog.json`.
- Generated key: `data/factions.json#/factions/W`.
- Placement key: `data/placement-model.json#/factions/W`.
- Identity-layer key: `data/identity-layers.json#/expressions/W`.
- Embedded preview consumer: `data/factions.json#/identity_layers/expressions/W`.
- Provenance key: `data/semantic-readiness-provenance.json` entries with `identity_key: "W"`.
- Fixture convention: `research/fixtures/semantic-readiness/white.semantic-fixtures.json`, still absent.
- Recruiter context: `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/W`.

Claims and evidence:

- Total claims: 8.
- Substantive: 0.
- Discovery: 0.
- Support: 0.
- Unclassified: 8.
- All 8 claims still lack explicit Contract semantic roles.
- All 8 claims still lack claim-level `evidence_locations`.
- Existing evidence-scope state remains consistent with the as-is unclassified state.

Provenance:

- W provenance entries: 12.
- Required null canonical IDs: 3 (`/core_identity`, `/mechanics`, `/profile`).
- Null hashes: 0.
- Unresolved canonical file/pointer pairs observed in current provenance scan: 0.
- Duplicate canonical file/pointer entries: 0.
- Duplicate non-null canonical IDs: 0.

Fixtures:

- White fixture remains absent.
- No White fixture was created.
- Generated locator/count state remains aligned with the original preflight baseline.

Frozen placement and scope:

- Placement summary unchanged: `White is a strong fit when a user wants safety, peace, and group flourishing made repeatable through structure, duty, law, defense, and shared standards.`
- Required terms unchanged: `group needs`, `shared rules`, `duty`, `peace`, `protection`, `law`, `community`.
- Minimum hits unchanged: `2`.
- Broad penalty unchanged: `0.13`.
- Strengthen list unchanged: `reducing suffering through structure`, `fair process and accountability`, `coordinated small pieces`, `personal sacrifice for group safety`.
- Suppress list unchanged: `self-interest above duty`, `impulse above restraint`, `knowledge optimization without group floor`, `natural destiny over taught moral order`.
- Lateral targets unchanged: `WU`, `WB`, `WG`, `WR`.
- Collision targets unchanged: `B`, `R`.
- No explicit `GENERIC_W_OVERFIT` collision target exists.
- Native IDs unchanged: `white`, `axis_group_order`, `axis_care_as_infrastructure`, `axis_rigidity_risk`, `white_disc_001`, `white_disc_002`, `white_disc_003`, `white_disc_004`, `white_vs_black`, `white_vs_red`.

Preview:

- Source owner: `data/identity-layers.json#/expressions/W/preview_text`.
- Embedded consumer: `data/factions.json#/identity_layers/expressions/W/preview_text`.
- Text unchanged and equal: `White values structure, protection, community, duty, and shared stability. It asks how life can be made safer through order.`
- Future preview changes still require the established DRIFT-015 target-scoped display-source process.

No discrepancy from the original preflight was found.

## F. Inventory Confirmation

Read-only inventory reconfirmed:

- Raw files and currently stored source roles.
- Profile and placement files.
- Changelog.
- Generated faction, placement, identity-layer, preview, and recruiter consumers.
- W provenance rows.
- Missing fixture state.
- Governance records, including VM-517 card, board, CRIT ledgers, drift register, original preflight, validator workflow, and validator review.
- Relevant builders and validators by locator only; no builder, validator, schema, test, scoring, calibration, runtime, or generated semantic file was modified.

No source role or claim was semantically adjudicated.

## G. Required Neighbors And Risks

Required comparison set remains declared:

- `GENERIC_W_OVERFIT`
- Azorius / `WU`
- Boros / `WR`
- Orzhov / `WB`
- Selesnya / `WG`
- Silverquill
- Lorehold
- Bant
- Esper
- Mardu
- Naya
- Abzan
- Mono-Blue / `U`
- Mono-Black / `B`
- Mono-Red / `R`
- Mono-Green / `G`
- Any locally relevant White-adjacent identity found during Gate 1+2.

Semantic-risk declaration remains complete for generic morality/goodness, order/law/duty/justice/peace/protection/community/civilization/cooperation, faith/religion/purity/angels/soldiers/knights/governments/churches/institutions, mechanics-as-identity, universal benevolence or authoritarianism, collapse into guild/college/three-color White-adjacent identities, discovery/support proof leakage, null IDs or hashes, fixture mismatch, stale preview/recruiter/public copy, and frozen-field drift.

## H. Workflow Regression

| Comparison | Result | Evidence | Difference | Explained and allowed |
|---|---|---|---|---|
| VM-514 Orzhov | PASS | Orzhov kept Gate 1+2 read-only, preserved superseded candidate, exact candidate approval, and certification separation. | No reduction. | Yes. |
| VM-515 Selesnya | PASS | Selesnya preserved exact-SHA candidate/review/certification and reconciled generated truth in review/certification. | No reduction. | Yes. |
| VM-516 Simic | PASS | Simic enforced drift preflight, Gate 1+2 separation, replacement review, DRIFT-015 preview controls, and certification-only governance. | No reduction. | Yes. |
| Gruul exact-chain precedent | PASS | Fixture/provenance exact-chain control remains recorded and required for later candidate/review. | No reduction. | Yes. |
| Dimir/Orzhov frozen-field precedent | PASS | Frozen placement, native IDs, lateral targets, collision targets, and calibration remain captured before Gate 1+2. | No reduction. | Yes. |
| DRIFT-015 preview precedent | PASS | Preview ownership, embedded equality, exact stale search, and display-source exception rules remain mandatory. | No reduction. | Yes. |
| DRIFT-016 structural-shape precedent | PASS | New monocolor object-with-`pairs` shape is inventory-checked and covered by tests and direct probes. | New coverage added; no reduction. | Yes. |
| Gate separation | PASS | This rerun stops before Gate 1+2 and remediation. | No reduction. | Yes. |
| Exact-SHA discipline | PASS | Original preflight, validator candidate, workflow record, and approval review SHAs are all recorded exactly. | No reduction. | Yes. |
| Dirty-worktree isolation | PASS | Table Talk baseline remains preserved and excluded. | No reduction. | Yes. |

## I. Planned Validation Matrix

Later White Goal mode and independent review must run or record repository equivalents of:

- JSON parse checks.
- Claim-role counts.
- Evidence-scope checks.
- Discovery/support isolation.
- Null ID/hash scans.
- Unresolved-pointer checks.
- Duplicate canonical-entry checks.
- Fixture/provenance exact-chain comparisons.
- Frozen confidence and calibration comparisons.
- Native-ID comparison.
- Terms/threshold/penalty comparisons.
- Strengthen/suppress comparisons.
- Lateral/collision-target comparisons.
- Authoritative proof-chain inspection.
- Public/recruiter stale-copy scan.
- Preview ownership and equality.
- Exact and semantic-equivalent preview searches.
- `npm.cmd run build:factions`.
- `node research/audit-semantic-readiness.mjs --targets=W`.
- `node research/validate-semantic-readiness.mjs --targets=W`.
- `node research/semantic-candidate-scope-tests.js`.
- `npm.cmd run test:semantic-readiness`.
- `npm.cmd run test:placement`.
- `npm.cmd run test:faction-context-isolation`.
- `npm.cmd run test:source-generated`.
- `npm.cmd test`.
- `git diff --check`.
- Exact candidate-scope command: `node research/validate-semantic-candidate-scope.mjs --base=<VM517_GATE_1_2_SHA> --target=<VM517_CANDIDATE_SHA> --identity=W`.

Candidate-only validation requiring a White candidate was not run, because no White candidate exists and Gate 1+2 has not started.

## J. Full Rerun Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-517-white-semantic-recovery`; starting HEAD `af3d8c6c563b3743f65c2dc8478519707f4785c8`. |
| Correct program base | PASS | `272337004aa63cfd33da5f1a859c33d211c8ca74`. |
| Approved validator candidate present | PASS | Object exists and is recorded. |
| Validator candidate unchanged after approval | PASS | Current validator/test files match approved candidate tree exactly. |
| One identity active | PASS | Ledger active identity is `W`; WIP limit is 1. |
| Prior identity certified | PASS | Simic / UG certified. |
| Wave 2 complete | PASS | 10 of 10 Ravnica guild identities certified. |
| White setup-only | PASS | No Gate 1+2, candidate, review, certification, or `semantically_ready`. |
| Allowed dirty baseline enumerated | PASS | Table Talk baseline listed and excluded. |
| Target W resolved | PASS | Raw, generated, placement, identity-layer, provenance, recruiter, and validator target resolve. |
| Monocolor pipeline supported | PASS | White and Blue object-with-`pairs` commands no longer structurally crash. |
| Candidate-scope validator no longer crashes | PASS | Former White commands reach deliberate proof-chain findings. |
| Candidate-scope coverage restored | PASS | W generated/provenance/recruiter surfaces are checked. |
| Object-with-pairs handling verified | PASS | W and U direct probes plus tests. |
| Array regression verified | PASS | WG command exits 0; UG exception behavior preserved. |
| White file/source inventory complete | PASS | Raw, generated, provenance, fixture, recruiter, governance, builder, and validator locators recorded. |
| Claim-role baseline unchanged | PASS | 8 total; 0 substantive; 0 discovery; 0 support; 8 unclassified. |
| ID/hash/pointer baseline unchanged | PASS | 3 null canonical IDs; 0 null hashes; 0 unresolved pointers; 0 duplicate canonical pointers. |
| Fixture/provenance baseline unchanged | PASS | 12 W provenance rows; fixture absent. |
| Frozen fields unchanged | PASS | Placement summary, terms, threshold, penalty, lists, lateral targets, collision targets, and native IDs unchanged. |
| Native IDs unchanged | PASS | White native ID set matches original preflight. |
| Collision-guidance baseline unchanged | PASS | Object-with-`pairs`; `white_vs_black` against `B`, `white_vs_red` against `R`. |
| Preview ownership and equality unchanged | PASS | Source and embedded preview are equal and unchanged. |
| Required neighbors declared | PASS | Required comparison set recorded. |
| Semantic risks declared | PASS | White semantic-risk list remains complete. |
| Validation matrix not reduced | PASS | Later matrix preserved and this rerun adds monocolor direct checks. |
| Gate boundaries unchanged | PASS | Gate 1+2 did not start; remediation not authorized. |
| Exact-SHA discipline unchanged | PASS | Exact original, candidate, workflow, review, base, and starting HEAD SHAs recorded. |
| Commit separation unchanged | PASS | This is a governance-only preflight rerun. |
| Superseded-candidate controls retained | PASS | Candidate rules preserved for future Gate 5; no White candidate exists. |
| Reviewed/generated truth reconciliation retained | PASS | Later review/certification matrix preserved. |
| No White semantic edit | PASS | White semantic/raw/generated/provenance/fixture/recruiter surfaces unchanged from program base. |
| Gate 1+2 did not start | PASS | No Gate 1+2 report or semantic adjudication. |
| No remediation authorized | PASS | Explicitly unauthorized. |
| No VM-518 work | PASS | VM-518 remains backlog/not_started. |
| External tracker untouched | PASS | No Excel interaction occurred. |
| Candidate-only scope validation | N/A - no White candidate exists and candidate-only validation belongs after Gate 5 candidate creation. | Future exact command is recorded. |
| Generation determinism | N/A - generation was not run in this governance-only rerun because it can rewrite generated artifacts; later authorized Gate 4 must prove generation determinism. | This rerun verified generated files were not changed. |

All required controls are PASS or explained N/A. No FAIL or UNKNOWN remains.

## K. Decision

PASS - WHITE GATE 1+2 AUTHORIZED

This authorization permits only a later Gate 1+2 read-only audit. It does not authorize remediation.

## L. Governance Commit Scope

Expected governance files:

- `docs/incidents/recoveries/VM-517-white-drift-preflight-rerun.md`
- `docs/kanban/backlog/VM-517-white-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-18-0137-codex-vm517-white-drift-preflight-rerun.md`
- isolated VM-517 rerun row in `docs/handoffs/HANDOFF_INDEX.md`

Forbidden files were not modified: White raw, generated, fixture, provenance, preview, recruiter, source, test, schema, validator, builder, scoring, calibration, or runtime files.

## M. Validation Run

Commands and checks actually run:

- `git status --short --branch`: confirmed branch and allowed Table Talk baseline.
- `git rev-parse HEAD`: confirmed starting HEAD `af3d8c6c563b3743f65c2dc8478519707f4785c8`.
- `git cat-file -t` for all required objects: PASS.
- `git merge-base --is-ancestor` across required chain: PASS.
- `git diff --exit-code aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research\validate-semantic-candidate-scope.mjs research\semantic-candidate-scope-tests.js`: PASS.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short`: PASS for docs/workflow-only original-main baseline.
- `node research/semantic-candidate-scope-tests.js`: PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=W`: exit 1; PASS as deliberate pre-remediation proof-chain findings, no structural crash.
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=06627929eb0e048a8c0c20612970e779098a982c --identity=W`: exit 1; PASS as deliberate pre-remediation proof-chain findings, no structural crash.
- `node research/validate-semantic-candidate-scope.mjs --base=272337004aa63cfd33da5f1a859c33d211c8ca74 --target=272337004aa63cfd33da5f1a859c33d211c8ca74 --identity=U`: exit 1; PASS as additional object-with-`pairs` no-crash control.
- Blue deterministic rerun check: PASS, identical exit/output.
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`: PASS exit 0.
- `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG`: exit 1; PASS as preserved documented display-source exception behavior.
- `node research/audit-semantic-readiness.mjs --targets=W`: PASS; W recognized, 8 unclassified claims.
- `node research/validate-semantic-readiness.mjs --targets=W`: expected exit 1 for pre-remediation blockers, no infrastructure crash.
- `npm.cmd run test:placement`: PASS, 37 factions and 37 golden paths.
- `npm.cmd run test:source-generated`: PASS with unchanged JESKAI/MARDU model-owned inhibitor warnings.
- Governance JSON parse for CRIT ledger: PASS.
- Read-only White implementation diff from program base: PASS; no White semantic/generated/provenance/recruiter/fixture file changed.

Post-edit validation and staged-scope checks are recorded in the final response after commit.

## N. Not Performed

- No White Gate 1+2 semantic adjudication occurred.
- No White remediation was authorized.
- No White raw, generated, fixture, provenance, recruiter, preview, source, test, schema, validator, builder, scoring, calibration, or runtime file was modified.
- No fixture was created.
- No candidate was created.
- No independent White semantic review was performed.
- No White certification occurred.
- VM-518 was not started.
- The CRIT-001 program base was not advanced.
- Original main was not modified.
- External Excel tracker was not modified.
- Table Talk baseline remained excluded.
