# VM-519 Black Independent Review

Status: REQUEST CHANGES

Review-record SHA: `PENDING_VM519_BLACK_REVIEW_RECORD_SHA`

## Scope

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Identity: VM-519 - Black / B.
- Worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-519-black-semantic-recovery`.
- Starting HEAD: `4eff477fdc47190dcb9b8df451329475ff47f7d0`.
- Program base: `04547ecfc52d1c96537b6375e9d5c4b8f3690a32`.
- Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.
- Validator approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`.
- Black drift preflight: `741ed6a81edb567d51a2699cbe7d0ec70e9b5e61`.
- Gate 1+2 governance commit: `604a19696d3dfb0d43d6b96676c0c6605628eb33`.
- Exact candidate reviewed: `5bffc3465786c18950d32dcb6f056504b3b8e668`.
- Primary workflow record: `72106e50b8aca3ec1ef8d0e8b8d5973809d2efc6`.
- Hold correction/current starting HEAD: `4eff477fdc47190dcb9b8df451329475ff47f7d0`.

No superseded Black candidate was found. The workflow-record and hold-correction SHAs were not treated as approvable semantic candidates.

## Preflight

Preflight passed for exact review:

- Worktree root: `C:/dev/mtgSiteWIP-crit001`.
- Branch: `codex/vm-519-black-semantic-recovery`.
- HEAD: `4eff477fdc47190dcb9b8df451329475ff47f7d0`.
- Required objects exist.
- Expected ancestry is valid through program base, drift preflight, Gate 1+2, candidate, workflow record, and hold correction.
- Workflow and hold-correction SHAs were not used as approvable semantic candidates; exact semantic review target was `5bffc3465786c18950d32dcb6f056504b3b8e668`.
- Candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` is an ancestor of both workflow governance commits.
- Active worktree had only the allowed Table Talk baseline: modified `docs/handoffs/HANDOFF_INDEX.md` and untracked Table Talk handoffs.
- Original main `C:\dev\mtgSiteWIP` was inspected read-only with `-c safe.directory=C:/dev/mtgSiteWIP`; only the known docs/workflow dirty baseline was present.

## Candidate Isolation

Candidate diff reviewed:

`604a19696d3dfb0d43d6b96676c0c6605628eb33..5bffc3465786c18950d32dcb6f056504b3b8e668`

Candidate files:

- `data/raw-factions/black/black.claims.json`
- `data/raw-factions/black/black.profile.json`
- `data/raw-factions/black/black.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/black.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Candidate stat: 8 files changed, 986 insertions, 81 deletions. Candidate scope is otherwise justified for VM-519: no non-Black raw packet changes, no Hall, Crucible, scheduler, schema, shared validator, builder, global scoring, global calibration, or unrelated runtime logic changes.

Workflow diff:

`5bffc3465786c18950d32dcb6f056504b3b8e668..72106e50b8aca3ec1ef8d0e8b8d5973809d2efc6`

This diff is governance/workflow-only.

Hold-correction diff:

`72106e50b8aca3ec1ef8d0e8b8d5973809d2efc6..4eff477fdc47190dcb9b8df451329475ff47f7d0`

This diff is governance-only and updates `program.drift_control.current_identity_hold` from stale Gate 1+2/remediation-authorized language to candidate-awaiting-review status. No candidate semantic file changed.

## Contract And Source Review

Initial claim state at Gate 1+2 base:

- 8 total.
- 0 substantive.
- 0 discovery.
- 0 support.
- 8 unclassified.

Final claim state in the exact candidate:

- 8 total.
- 6 `substantive_claim`: `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006`, `black_claim_0007`.
- 2 `support_record`: `black_claim_0001`, `black_claim_0008`.
- 0 discovery.
- 0 unclassified.

Source hierarchy:

- `MONO-B-2015`: philosophy backbone, claim-bearing for Black identity, methods, themes, allies/enemies, and pressure behavior.
- `MONO-B-2025`: current voice update, claim-bearing but bounded to Black's first-person/current voice and not a replacement for the philosophy backbone.
- `MECH-CP-2021`: mechanic-specific authority only.
- `MECH-CP-2021-CHG`: mechanic-specific changelog only.
- `RULES-CR`: Commander rules boundary only.
- `VM-377`: project governance/source-intake boundary only.
- `SCRYFALL-B-2026-06-13`: current card legality verification/support only.

Contract checks:

- Every substantive claim has bounded `evidence_locations`.
- Every substantive evidence location has `evidence_scope`.
- Support claims do not appear in authoritative profile, placement, fixture, or semantic provenance proof chains.
- `black_claim_0008` appears only as `auxiliary_support` at `data/raw-factions/black/black.profile.json#/commander_compass/identity_basis`.
- Mechanical/changelog sources support only `black_claim_0007` mechanic texture and are not used as complete philosophy proof.
- Governance, rules, project, and legality rows do not prove Black identity or placement.

## Semantic And Neighbor Review

The candidate's main Black semantic thesis is source-bounded: Black seeks power and opportunity as self-advocacy in a harsh world, accepts cost/resource conversion when it serves a concrete goal, and is guarded against generic villainy, objective evil, mechanics-first identity, or "power at any cost" slogans.

Required-neighbor coverage is present in fixtures and generated guidance for:

`GENERIC_B_OVERFIT`, `WB`, `UB`, `BR`, `BG`, `SILVERQUILL`, `WITHERBLOOM`, `ESPER`, `GRIXIS`, `JUND`, `MARDU`, `SULTAI`, `ABZAN`, `W`, `U`, `R`, `G`, `WUBRG`, and `COLORLESS`.

The neighbor discriminators are testable: they distinguish mono-Black cost/self-advocacy from Orzhov obligation/debt, Dimir hidden information, Rakdos spectacle/impulse, Golgari ecology/decay cycle, Silverquill rhetoric/status, Witherbloom life/death craft, and broader shard/wedge identities. This portion did not produce a blocking finding.

## Public And Consumed Surfaces

Main public/generated surfaces are aligned except for the preview finding below:

- `data/factions.json#/factions/B` uses source-bounded power, agency, cost, leverage, resource conversion, and non-villain framing.
- `data/placement-model.json#/factions/B` removes support leakage from `black_disc_004` and keeps mechanics bounded.
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/B` maps recruiter guidance to substantive evidence, with the Commander row retained only as auxiliary support.
- Exact high-risk scans found villain/evil/cruelty/death/mechanics language primarily in negative guardrails, source-bounded fixture exclusions, or mechanic texture.

Approval-blocking preview issue:

- `data/identity-layers.json#/expressions/B/preview_text`
- `data/factions.json#/identity_layers/expressions/B/preview_text`

Both retain this unchanged pre-remediation text:

`Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`

Source-to-embedded equality is true, but equality is insufficient under DRIFT-015. The line remains stale and semantically under-bounded because it still presents transferable generic Black concepts - ambition, self-definition, pragmatism, survival, and agency - without the candidate's required cost, leverage, opportunity, consequence, resource-conversion, and internal-tension boundaries. It is not villain-coded, but it is a positive autonomy slogan that does not match the narrowed candidate semantics.

## Fixture And Provenance Review

Independently reviewed B provenance count: 25 entries.

Provenance checks:

- Required null canonical IDs: 0.
- Null canonical content hashes: 0.
- Unresolved pointers: 0.
- Duplicate canonical entries: 0.
- Duplicate null canonical-entry keys: 0.
- Support-backed authoritative chains: 0.
- Non-philosophical-source-backed broad authoritative philosophy chains: 0.

Exact-chain checks:

| Locator | Generated ordered IDs | Fixture ordered IDs | Generated count | Fixture count | Exact equality | Duplicates | Missing | Extra |
|---|---|---|---:|---:|---|---|---|---|
| `data/raw-factions/black/black.profile.json#/core_identity` | `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006` | same | 5 | 5 | PASS | none | none | none |
| `data/raw-factions/black/black.placement.json#/placement_summary` | `black_claim_0002`, `black_claim_0003`, `black_claim_0004`, `black_claim_0005`, `black_claim_0006`, `black_claim_0007` | same | 6 | 6 | PASS | none | none | none |

## Frozen, Collision, And Scope Review

Frozen controls passed:

- Placement summary text unchanged.
- Top-level confidence remains absent.
- Required terms unchanged: `power`, `opportunity`, `self-interest`, `agency`, `cost`, `sacrifice`, `leverage`.
- Minimum hits unchanged: 2.
- Broad penalty unchanged: 0.13.
- Strengthen/suppress lists unchanged.
- False-positive guardrail unchanged.
- Lateral targets unchanged: `UB`, `BR`, `BG`, `WB`.
- Raw collision object keys preserved: `rule`, `review_triggers`, `pairs`.
- Raw pair order preserved: `black_vs_white:W`, `black_vs_green:G`.
- Generated collision order and semantics preserve W then G.
- Explicit `GENERIC_B_OVERFIT` raw collision target remains absent.
- Black-local scoring and golden-path fields remain absent.
- Native IDs and calibration remain unchanged.

Exact candidate-scope command passed:

`node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=5bffc3465786c18950d32dcb6f056504b3b8e668 --identity=B`

## Validation

Commands run:

- JSON parse checks for changed JSON plus `data/identity-layers.json` - PASS.
- Explicit role/evidence/provenance/fixture/frozen/preview script - PASS for Contract/provenance/frozen controls; found the preview blocker.
- Exact rejected-preview search - PASS as a command; found two retained copies at `data/identity-layers.json:4565` and `data/factions.json:24425`.
- `npm.cmd run build:factions` - PASS.
- `npm.cmd run build:factions` - PASS on second run; no generated diff.
- `node research/audit-semantic-readiness.mjs --targets=B` - PASS, reporting 8 claims with 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=B` - PASS.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `npm.cmd run test:semantic-readiness` - PASS; verified 1826 semantic provenance entries.
- `npm.cmd run test:placement` - PASS; 37 factions and 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `npm.cmd run test:source-generated` - PASS with two known unrelated warnings: JESKAI and MARDU model-owned inhibitor traps.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS with line-ending warnings only.
- `git -c safe.directory=C:/dev/mtgSiteWIP -C C:\dev\mtgSiteWIP status --short` - PASS as read-only original-main check; known docs/workflow baseline only.

The JESKAI/MARDU warnings are unrelated: the Black candidate did not change Jeskai or Mardu source files, generated warning text, or model-owned inhibitor warnings.

## Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch and HEAD matched prompt. |
| Correct program base | PASS | Program base exists and is ancestor. |
| Exact candidate isolated | PASS | Candidate SHA exists and is ancestor of workflow records. |
| Candidate/workflow/correction separated | PASS | Semantic candidate diff and governance diffs are separate. |
| Workflow hold correction verified | PASS | Hold correction is governance-only and accurate. |
| Candidate file scope justified | PASS | Only eight VM-519 semantic/generated/fixture/runtime content files changed. |
| No unrelated identity changes | PASS | No non-Black raw or unrelated generated semantic drift found. |
| Source hierarchy verified | PASS | Philosophy, mechanics, changelog, rules, project, and legality roles separated. |
| Claim roles verified | PASS | 6 substantive, 2 support, 0 discovery, 0 unclassified. |
| Evidence scopes verified | PASS | All substantive evidence locations have `evidence_scope`. |
| Support and non-philosophical isolation | PASS | Support row only auxiliary; mechanics/changelog bounded. |
| Canonical IDs and hashes valid | PASS | B provenance has no null IDs or hashes. |
| Fixture/provenance equality | PASS | Core and placement exact chains match. |
| Null-ID repair verified | PASS | Three prior null IDs repaired by native IDs and hashes. |
| Frozen placement/calibration | PASS | Required frozen fields preserved. |
| Raw/generated collision structure | PASS | Object-with-pairs raw shape and W/G order preserved. |
| Candidate-scope validation | PASS | Exact command exit 0. |
| Public/recruiter alignment | PASS | Main public and recruiter content aligns with substantive claims. |
| Preview equality | PASS | Source and embedded preview are equal. |
| Preview semantic alignment | FAIL | Preview remains stale/generic and omits required cost/leverage/opportunity/consequence boundaries. |
| Generic Black/villain overfit | PASS | Main candidate rejects villain/mechanics overfit; preview genericity is separately captured above. |
| Required neighbors distinguished | PASS | Fixture and guidance boundaries are testable. |
| Deterministic generation | PASS | Two builds left no generated diff. |
| Known warnings classified | PASS | JESKAI/MARDU warnings unchanged/unrelated. |
| Table Talk excluded | PASS | Baseline preserved and excluded from staging. |
| Black remains not certified | PASS | No certification performed. |
| VM-520 untouched | PASS | VM-520 not started. |

Because one mandatory drift-control item is FAIL, approval is blocked.

## Finding

### Blocker - stale generic Black preview remains in consumed public surfaces

- Files:
  - `data/identity-layers.json#/expressions/B/preview_text` at line 4565.
  - `data/factions.json#/identity_layers/expressions/B/preview_text` at line 24425.
- Behavior: Both surfaces retain the unchanged pre-remediation preview text: `Black values ambition, self-definition, pragmatism, and survival. It asks what you are willing to do to claim agency.`
- Evidence: Exact search found both retained copies. The candidate's authoritative Black semantics require power/opportunity/cost accounting/resource conversion/leverage/consequence boundaries, while this preview preserves transferable generic ambition/self-definition/pragmatism/survival/agency language.
- Rule impact: Violates DRIFT-015 consumed preview review and the prompt's requirement that preview equality alone is insufficient. Public/generated copy must align with narrowed Contract v1.1 source-backed Black semantics.
- Required action: Create a replacement candidate that updates the source-owned B preview and regenerated embedded consumer to a source-bounded Black preview, with no unrelated identity drift.
- Approval impact: Blocks approval of exact candidate `5bffc3465786c18950d32dcb6f056504b3b8e668`.

No high, medium, or low findings were identified beyond this blocker.

## Decision

REQUEST CHANGES

Black is not certified, not `semantically_ready`, and VM-520 was not started.
