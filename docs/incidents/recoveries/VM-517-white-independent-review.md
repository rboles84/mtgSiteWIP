# VM-517 - White Independent Review

Status: Approved exact candidate. Awaiting certification. Not certified. Not semantically_ready.

Review decision: `APPROVE EXACT SHA 89535e5f73598a5b518e31e11598b05087274a95`
Review-record SHA: `PENDING_VM517_WHITE_REVIEW_RECORD_SHA`
Reviewer: Codex independent review window
Reviewed at: `2026-07-18T08:54:00-06:00`

Program base: `272337004aa63cfd33da5f1a859c33d211c8ca74`
Original White drift preflight: `06627929eb0e048a8c0c20612970e779098a982c`
Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`
Validator approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`
Passing White drift-preflight rerun: `2bec073daa70c56a251f9086f034370e4abe22db`
White Gate 1+2 governance commit: `307b93d56b4314405011f21f7d7616ac4b7ed16f`
Superseded White candidate: `8d6014950e5ca45ef85a90855cf283d80fd18e0d`
Exact White candidate reviewed: `89535e5f73598a5b518e31e11598b05087274a95`
Candidate workflow record: `fce31bd9c5b7d89c343674037efe13c10278d38d`

This review independently inspected the exact White candidate under CRIT-001 Contract v1.1 and the drift-control template. It did not remediate, did not modify candidate semantic/generated/runtime files, did not certify White, did not mark White semantically_ready, did not advance the program base, did not start VM-518, and did not modify the external Excel tracker.

## Preflight

| Control | Result | Evidence |
|---|---|---|
| Active worktree | PASS | `C:\dev\mtgSiteWIP-crit001`. |
| Active branch | PASS | `codex/vm-517-white-semantic-recovery`. |
| Starting HEAD | PASS | `fce31bd9c5b7d89c343674037efe13c10278d38d`. |
| Required objects | PASS | Program base, original preflight, validator candidate/review, passing preflight rerun, Gate 1+2, superseded candidate, exact candidate, and workflow commit all exist. |
| Expected ancestry | PASS | Verified program base -> original preflight -> validator candidate -> validator review -> preflight rerun -> Gate 1+2 -> superseded candidate -> exact final candidate -> workflow record. |
| Exact candidate ancestry | PASS | `89535e5f73598a5b518e31e11598b05087274a95` is an ancestor of workflow commit `fce31bd9c5b7d89c343674037efe13c10278d38d`. |
| Superseded candidate preservation | PASS | `8d6014950e5ca45ef85a90855cf283d80fd18e0d` remains recorded as superseded and was not reviewed for approval. |
| Active worktree baseline | PASS | Only allowed Table Talk baseline was present: modified `docs/handoffs/HANDOFF_INDEX.md` and two untracked Table Talk handoffs. |
| Original main | PASS | Read-only status of `C:\dev\mtgSiteWIP` showed the known docs/workflow dirty baseline only; no raw/generated/semantic/runtime/data changes were observed. |
| Certified count and VM-518 | PASS | Ledgers record 15 certified identities; VM-518 remains not started. |

## Candidate Isolation

Semantic candidate diff `307b93d56b4314405011f21f7d7616ac4b7ed16f..89535e5f73598a5b518e31e11598b05087274a95` contains only:

- `data/raw-factions/white/white.claims.json`
- `data/raw-factions/white/white.profile.json`
- `data/raw-factions/white/white.placement.json`
- `data/raw-factions/white/white.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/white.semantic-fixtures.json`

Workflow diff `89535e5f73598a5b518e31e11598b05087274a95..fce31bd9c5b7d89c343674037efe13c10278d38d` contains only governance/workflow files and was excluded from semantic approval.

Superseded candidate check reproduced the exact scope failure:

- `placement_summary/calibrated_primary_read`
- `placement_summary/calibrated_false_positive_guardrail`

The exact final candidate removes both forbidden calibrated fields while preserving required White remediation.

## Contract And Source Review

Initial Gate 1+2 state verified: 8 total claims, 0 substantive, 0 discovery, 0 support, 8 unclassified.

Final candidate state verified:

- 8 total claims.
- 6 `substantive_claim`: `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006`, `white_claim_0007`.
- 2 `support_record`: `white_claim_0001`, `white_claim_0008`.
- 0 `discovery_record`.
- 0 unclassified.

Source hierarchy:

- `MONO-W-2015` and `MONO-W-2025`: substantive White philosophy authority.
- `MECH-CP-2021` and `GOV-COC-2024`: bounded mechanic/process authority only.
- `RULES-CR`, `VM-377`, and `SCRYFALL-W-2026-06-13`: support-only rules, governance, and current-card verification.

All substantive claims have bounded `evidence_locations`, `evidence_scope`, and source IDs matching evidence-location source IDs. Support records are explicitly restricted from identity, placement, public, recruiter, fixture, readiness, or canonical provenance proof. No discovery records exist. Mechanics/process records remain bounded to mechanic-specific guidance and do not independently prove White philosophy. Rules/governance/legality support is isolated to auxiliary Commander Compass metadata.

## Semantic Review

The candidate's White core is source-supported as peace/reduced suffering through group-first structure, law, duty, defense, protection, organization, and care, with rigidity/prescription risk preserved. Public and recruiter language avoids treating White as generic goodness, moral superiority, heroism, religion, military identity, authoritarian certainty, or mechanics.

Required-neighbor distinctions are testable and covered for `GENERIC_W_OVERFIT`, `WU`, `WR`, `WB`, `WG`, `SILVERQUILL`, `LOREHOLD`, `BANT`, `ESPER`, `MARDU`, `NAYA`, `ABZAN`, `U`, `B`, `R`, and `G`. The guidance distinguishes mono-White group-duty structure from Azorius procedure, Boros militarized action, Orzhov debt/hierarchy, Selesnya harmony, Silverquill rhetoric/status, Lorehold history/tradition, broader three-color shells, and mono-color neighbors.

## Public And Consumed Surfaces

Inspected White raw profile/placement, generated `data/factions.json`, `data/placement-model.json`, W provenance, fixture, identity-layer preview, and recruiter context.

- Public profile and placement copy align with substantive claims.
- Recruiter/chatbot guidance has provenance coverage and uses substantive claims for semantic rows.
- Commander Compass support remains auxiliary with `evidence_use: auxiliary_support`.
- W-scoped stale scans found no unsupported public/recruiter assertion; broad hits were negative guardrails or unchanged non-W content.
- Preview source `data/identity-layers.json#/expressions/W/preview_text` exactly equals embedded `data/factions.json#/identity_layers/expressions/W/preview_text`.
- Preview text is unchanged from Gate 1+2 and semantically aligned with the final White claim set; it is not stale despite being concise.

## Fixture And Provenance

Reviewed W provenance count: 25.

Provenance checks:

- Null canonical IDs: 0.
- Null canonical content hashes: 0.
- Unresolved canonical pointers: 0.
- Duplicate canonical pointers: 0.
- Support-backed authoritative chains: 0.
- Auxiliary support chains: one permitted Commander Compass row using `white_claim_0008`.

Exact-chain checks:

| Locator | Generated ordered IDs | Fixture ordered IDs | Count | Exact equality | Duplicates | Missing | Extra |
|---|---|---|---:|---|---|---|---|
| `data/raw-factions/white/white.profile.json#/core_identity` | `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006` | same | 5 | PASS | none | none | none |
| `data/raw-factions/white/white.placement.json#/placement_summary` | `white_claim_0002`, `white_claim_0003`, `white_claim_0004`, `white_claim_0005`, `white_claim_0006`, `white_claim_0007` | same | 6 | PASS | none | none | none |

Fixture coverage includes core inclusion, pressure behavior, nearest ambiguity, all required-neighbor exclusions, and both provenance fixtures.

## Frozen, Collision, And Scope Review

PASS for all frozen controls:

- Placement-summary text unchanged.
- Required positive terms unchanged: `group needs`, `shared rules`, `duty`, `peace`, `protection`, `law`, `community`.
- Minimum hits unchanged: 2.
- Broad penalty unchanged: 0.13.
- Strengthen/suppress lists unchanged.
- Lateral targets unchanged: `WU`, `WB`, `WG`, `WR`.
- Collision targets unchanged: `B`, `R`.
- Explicit `GENERIC_W_OVERFIT` collision target remains absent.
- Native IDs preserved: `white`, `axis_group_order`, `axis_care_as_infrastructure`, `axis_rigidity_risk`, `white_disc_001`, `white_disc_002`, `white_disc_003`, `white_disc_004`, `white_vs_black`, `white_vs_red`.
- Raw collision guidance remains object-with-`pairs`.
- Candidate-scope validation passes and no target-scoped exception is required.
- Approved monocolor validator files remain unchanged from `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.
- No unrelated identity raw files changed.

## Validation

Commands run:

- `git status --short --branch`: PASS; only Table Talk baseline present.
- Required `git cat-file` and `git merge-base --is-ancestor` checks: PASS.
- `git -C C:\dev\mtgSiteWIP -c safe.directory=C:/dev/mtgSiteWIP status --short`: PASS for known docs/workflow baseline.
- `git diff --name-status 307b93d56b4314405011f21f7d7616ac4b7ed16f 89535e5f73598a5b518e31e11598b05087274a95`: PASS; expected candidate file scope.
- `git diff --name-status 89535e5f73598a5b518e31e11598b05087274a95 fce31bd9c5b7d89c343674037efe13c10278d38d`: PASS; governance/workflow only.
- `node` JSON parse checks for changed JSON files: PASS, 8 files.
- Explicit role/evidence/provenance/fixture/frozen/preview script: PASS.
- `npm.cmd run build:factions`: PASS; generated files already deterministic.
- Second `npm.cmd run build:factions`: PASS; no generated diff.
- `node research/audit-semantic-readiness.mjs --targets=W`: PASS; 8 claims, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=W`: PASS.
- `node research/semantic-candidate-scope-tests.js`: PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=89535e5f73598a5b518e31e11598b05087274a95 --identity=W`: PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=307b93d56b4314405011f21f7d7616ac4b7ed16f --target=8d6014950e5ca45ef85a90855cf283d80fd18e0d --identity=W`: expected FAIL for superseded candidate; reproduced two forbidden calibrated fields.
- `npm.cmd run test:semantic-readiness`: PASS; verified 1800 semantic provenance entries.
- `npm.cmd run test:placement`: PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation`: PASS.
- `npm.cmd run test:source-generated`: PASS with unchanged non-W JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test`: PASS; test runner wrote/verified deterministic gate-bias audit output with no dirty diff.
- `git diff --check`: PASS with line-ending warnings only.

Known warnings:

- JESKAI/MARDU model-owned inhibitor warnings are unrelated and unchanged; no Jeskai or Mardu raw candidate files changed, and no Jeskai/Mardu diff appeared in the generated-file diff.
- Git line-ending warnings did not correspond to candidate corruption or dirty generated output.

## Drift Scorecard

| Control | Review result |
|---|---|
| Correct branch and HEAD | PASS |
| Correct program base | PASS |
| Exact candidate isolated | PASS |
| Superseded candidate excluded | PASS |
| Candidate and workflow commits separated | PASS |
| Candidate file scope justified | PASS |
| No unrelated identity changes | PASS |
| Source hierarchy verified | PASS |
| Six substantive claims verified | PASS |
| Two support claims verified | PASS |
| Every substantive claim has bounded evidence | PASS |
| Required evidence_scope present | PASS |
| Support proof leakage eliminated | PASS |
| Mechanics/process records bounded | PASS |
| Rules/governance/legality records isolated | PASS |
| Canonical IDs and hashes valid | PASS |
| Pointers resolve | PASS |
| Exact fixture/provenance equality | PASS |
| Reviewed provenance count established | PASS |
| No support claim in authoritative fixture chains | PASS |
| Frozen placement summary unchanged | PASS |
| Terms and thresholds unchanged | PASS |
| Penalty unchanged | PASS |
| Strengthen/suppress unchanged | PASS |
| Lateral targets unchanged | PASS |
| Collision targets unchanged | PASS |
| Native IDs unchanged | PASS |
| Calibration unchanged | PASS |
| Superseded calibrated-field drift removed | PASS |
| Object-with-pairs shape preserved | PASS |
| Candidate-scope validator does not crash | PASS |
| Candidate-scope command passes | PASS |
| Public copy aligned | PASS |
| Recruiter/chatbot guidance aligned | PASS |
| Chatbot evidence mapping complete | PASS |
| Preview equality verified | PASS |
| Preview semantic alignment verified | PASS |
| Generic White overfit rejected | PASS |
| Required neighbors distinguished | PASS |
| Generation deterministic | PASS |
| Known warnings independently classified | PASS |
| Table Talk excluded | PASS |
| White remains not certified | PASS |
| VM-518 untouched | PASS |

No `FAIL` or `UNKNOWN` controls remain. N/A: certification and external tracker update are outside this review window.

## Findings

No blocker findings.
No high findings.
No medium findings.
No low findings.

Non-blocking observations:

- `git diff --check` prints line-ending warnings for generated files and the shared handoff index; it exits 0 and leaves no generated diff.
- `npm.cmd run test:source-generated` reports the known non-W JESKAI/MARDU model-owned inhibitor warnings; the White candidate did not introduce or worsen them.

## Decision

APPROVE EXACT SHA 89535e5f73598a5b518e31e11598b05087274a95

White remains not certified and not semantically_ready. Certification, program-base advancement, VM-518 work, and external Excel updates remain unauthorized until a separate certification window.
