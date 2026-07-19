# VM-520 Red Replacement Independent Review

Status: APPROVE EXACT SHA `6aefb2090ff20a361f7f3cd80515445036323158`

Review-record SHA: `PENDING_VM520_RED_REPLACEMENT_REVIEW_RECORD_SHA`

## Scope

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Identity: VM-520 - Red / R.
- Cohort: Wave 3 monocolors.
- Worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-520-red-semantic-recovery`.
- Starting HEAD / replacement workflow record: `bf3285b77b27e696625c45d073160882ffacdd75`.
- Program base: `1116786785dc4c5c8c1447dcad79c89e527657eb`.
- Red drift preflight: `94a33b70fdac83b350195a3eed7f34118f999e31`.
- Gate 1+2 governance commit: `6c2b6dfc3e9e838f9e75801517a81258b675923d`.
- Rejected candidate: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.
- Rejected workflow record: `70358e1bbb65add714239b0d8621eda0a51e0ed4`.
- Rejection review record: `7bb7b0830dffc718ec3a2546fd489d0cb9ec0359`.
- Exact replacement candidate reviewed: `6aefb2090ff20a361f7f3cd80515445036323158`.

The workflow-record SHA `bf3285b77b27e696625c45d073160882ffacdd75` was checked but was not approved as a semantic candidate.

## Preflight

Preflight passed:

- Active worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-520-red-semantic-recovery`.
- Starting HEAD: `bf3285b77b27e696625c45d073160882ffacdd75`.
- Required objects exist for program base, validator, Red preflight, Gate 1+2, rejected candidate, rejected workflow, rejected review, replacement candidate, and replacement workflow.
- Expected ancestry is valid through the replacement workflow record.
- Exact replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158` is an ancestor of current HEAD.
- No superseded Red replacement candidate was found.
- Active worktree contained only the allowed Table Talk baseline: modified `docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs.
- Original main `C:\dev\mtgSiteWIP` was inspected read-only; only the known docs/workflow dirty baseline was present.
- Certified count remains 18, Wave 3 remains 3 of 5 certified, and VM-521 is not started.

## Candidate Isolation

Replacement-only diff reviewed:

`7bb7b0830dffc718ec3a2546fd489d0cb9ec0359..6aefb2090ff20a361f7f3cd80515445036323158`

Replacement candidate files:

- `data/raw-factions/red/red.placement.json`
- `data/placement-model.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

The replacement changes only Red-local placement guidance, generated placement/recruiter consumers, and Red fixtures. It does not touch Red claims, Red profile, identity-layer preview source, `data/factions.json`, semantic-readiness provenance, schemas, builders, validators, Hall, Crucible, scheduler, scoring, calibration, global recruiter logic, unrelated identities, Table Talk, certification, or VM-521.

Replacement candidate to workflow diff:

`6aefb2090ff20a361f7f3cd80515445036323158..bf3285b77b27e696625c45d073160882ffacdd75`

This later diff is governance/workflow-only and was excluded from semantic approval.

## Original Finding Recheck

The rejected candidate was blocked because Red-local required-neighbor surfaces did not cover prompt-required `JESKAI`, `JUND`, and `NAYA`.

The replacement fixes that exact gap:

- Raw placement now adds Jeskai, Jund, and Naya review triggers under `data/raw-factions/red/red.placement.json#/collision_guidance/review_triggers`.
- Raw and generated poor-fit/inhibitor guidance distinguish Jeskai technique/discipline/principle-bound action, Jund survival/appetite/strength, and Naya communal vitality/nature/creature reverence from mono-Red feeling-to-action.
- Generated placement and recruiter context preserve the same Red-local boundaries.
- Fixtures now include `red_exclude_jeskai`, `red_exclude_jund`, and `red_exclude_naya`.
- Each new fixture is backed by substantive Red claims `red_claim_0003`, `red_claim_0005`, and `red_claim_0006`, with sources `MONO-R-2015` and `MONO-R-2025`.

The replacement does not add new frozen collision pairs or lateral targets. Raw and generated collision order remains W then U.

## Contract And Source Review

Final Red claim state remains unchanged:

- 8 total claims.
- 6 `substantive_claim`: `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007`.
- 2 `support_record`: `red_claim_0001`, `red_claim_0008`.
- 0 discovery.
- 0 unclassified.

Source hierarchy remains valid:

- `MONO-R-2015`: philosophy backbone.
- `MONO-R-2025`: current voice update.
- `MECH-CP-2021`: mechanic-specific authority only.
- `GOV-COC-2024`: governance/process-specific mechanical context only.
- `RULES-CR`, `VM-377`, and `SCRYFALL-R-2026-06-13`: auxiliary support/governance/navigation only.

Every substantive claim has bounded evidence locations with `evidence_scope`. The support-only Commander Compass row remains auxiliary and is not used as authoritative profile, placement, public-copy, recruiter, fixture, or canonical provenance proof.

## Semantic And Neighbor Review

The replacement keeps Red bounded as feeling, freedom, action, lived experience, loyalty/attachment, and consequence pressure. It does not reduce Red to generic emotion, authenticity, passion, anger, chaos, speed, fire, rebellion, mechanics, Commander cards, or "freedom at any cost."

Required-neighbor coverage is now present and testable for:

`GENERIC_R_OVERFIT`, `W`, `U`, `B`, `G`, `WR`, `UR`, `BR`, `RG`, `PRISMARI`, `LOREHOLD`, `MARDU`, `JESKAI`, `GRIXIS`, `JUND`, `TEMUR`, `NAYA`, `WUBRG`, and `COLORLESS`.

The new Red-local distinctions are source-bounded:

- Jeskai: action/expression becomes a false positive when technique, discipline, deliberation, or principle-bound method leads more than Red feeling-to-action.
- Jund: instinct/action becomes a false positive when survival, appetite, predatory hierarchy, strength, or appetite-pressure leads more than Red freedom, loyalty, and consequence-aware lived feeling.
- Naya: vitality/joy/attachment becomes a false positive when communal vitality, natural grandeur, creature reverence, or larger living-whole care leads more than Red immediate felt action.

These boundaries are falsifiable and do not overclaim new lore.

## Preview And Consumed Surfaces

The accepted DRIFT-015 Red preview is unchanged:

`Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.`

- Source path: `data/identity-layers.json#/expressions/R/preview_text`.
- Embedded path: `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Source-to-embedded equality: true.

The replacement candidate does not modify preview/public faction copy. Public and recruiter surfaces agree with the accepted Red packet. Stale-copy scans found only active guardrails and `never_claim_as_canon` prohibitions such as `Red is only anger`, not active stale Red claims.

## Fixture And Provenance Review

Reviewed R provenance count: 25 entries.

Provenance checks:

- Required null canonical IDs: 0.
- Null content hashes: 0.
- Unresolved pointers: 0.
- Duplicate canonical entries: 0.
- Duplicate null keys: 0.
- Support/discovery-backed authoritative chains: 0.

Exact-chain checks:

| Locator | Generated ordered IDs | Fixture ordered IDs | Generated count | Fixture count | Exact equality | Duplicates | Missing | Extra |
|---|---|---|---:|---:|---|---|---|---|
| `data/raw-factions/red/red.profile.json#/core_identity` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006` | same | 5 | 5 | PASS | none | none | none |
| `data/raw-factions/red/red.placement.json#/placement_summary` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007` | same | 6 | 6 | PASS | none | none | none |

## Frozen, Collision, And Scope Review

Replacement-vs-rejected frozen controls are unchanged:

- Placement summary text unchanged.
- Top-level confidence remains absent.
- Required terms unchanged: `freedom`, `emotion`, `action`, `passion`, `impulse`, `experience`, `speed`.
- Minimum hits unchanged: 2.
- Broad penalty unchanged: 0.13.
- Strengthen/suppress lists unchanged.
- False-positive guardrail unchanged.
- Lateral targets unchanged: `WR`, `UR`, `BR`, `RG`.
- Raw collision pair order unchanged: `W`, then `U`.
- Generated collision order unchanged: `W`, then `U`.
- Explicit `GENERIC_R_OVERFIT` collision target remains absent.
- Red-local scoring and golden-path fields remain absent.
- Native IDs remain unchanged.

Exact candidate-scope command:

`node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R`

Exit code: 1.

Independent inspection confirms the diagnostics are limited to the already documented DRIFT-015 display-source exception inherited from the rejected candidate range:

- `data/identity-layers.json#/expressions/R/preview_text`
- `data/factions.json#/identity_layers/expressions/R/preview_text`

There is no third diagnostic, validator crash, frozen-field drift, optional-field addition, unrelated identity semantic change, or replacement-only preview drift.

## Validation

Commands and checks run:

| Command | Exit | Result |
|---|---:|---|
| `git status --short --branch` | 0 | Correct branch; only allowed Table Talk baseline visible. |
| Git object and ancestry checks | 0 | Required objects exist; expected ancestry valid through replacement workflow. |
| `git diff --name-status 7bb7b0830dffc718ec3a2546fd489d0cb9ec0359 6aefb2090ff20a361f7f3cd80515445036323158` | 0 | Replacement files are the four expected Red implementation/generated/fixture/recruiter files. |
| `git diff --name-status 6aefb2090ff20a361f7f3cd80515445036323158 bf3285b77b27e696625c45d073160882ffacdd75` | 0 | Workflow-only. |
| JSON parse checks for Red changed/generated JSON | 0 | All parsed. |
| Explicit Red invariant script | 0 | Role counts, evidence scopes, preview equality, 25 provenance rows, exact-chain parity, required neighbors, and frozen fields verified. |
| `npm.cmd run build:factions` | 0 | Built 37 faction placement records; no content diff. |
| second `npm.cmd run build:factions` | 0 | Deterministic; no content diff. |
| `node research/audit-semantic-readiness.mjs --targets=R` | 0 | 8 claims; 6 substantive, 0 discovery, 2 support, 0 unclassified; recruiter context size 8103. |
| `node research/validate-semantic-readiness.mjs --targets=R` | 0 | Semantic readiness validation passed for R. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Semantic candidate scope tests passed. |
| `npm.cmd run test:semantic-readiness` | 0 | Semantic readiness contract, candidate-scope, fixture, and provenance checks passed; 1839 semantic provenance entries verified. |
| `npm.cmd run test:placement` | 0 | PASS adaptive placement tests: 37 factions, 37 golden paths. |
| `npm.cmd run test:faction-context-isolation` | 0 | Faction context isolation helper tests passed. |
| `npm.cmd run test:source-generated` | 0 | Passed with unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings. |
| `npm.cmd test` | 0 | Full suite passed; 226 parser cases, 6 builder cases, semantic readiness, Maze contracts, and presentation snapshots passed. |
| `git diff --check` | 0 | No whitespace errors; line-ending warning only for preserved handoff-index baseline. |
| Exact candidate-scope command | 1 | Accepted as documented R display-source exception only; diagnostics limited to `data/identity-layers.json` and `data/factions.json`. |

Known JESKAI/MARDU source-generated warnings were independently classified as unrelated: the replacement candidate does not modify Jeskai or Mardu raw packets, and the warning content matches the existing model-owned inhibitor notes.

## Drift Scorecard

| Control | Result |
|---|---|
| Correct branch and HEAD | PASS |
| Correct program base | PASS |
| Exact replacement candidate isolated | PASS |
| Rejected candidate preserved and not approved | PASS |
| Candidate and workflow separated | PASS |
| Replacement file scope justified | PASS |
| Source hierarchy verified | PASS |
| Six substantive claims verified | PASS |
| Two support claims isolated | PASS |
| Evidence scopes complete | PASS |
| IDs, hashes, and pointers valid | PASS |
| R provenance count established | PASS |
| Fixture chains exactly equal | PASS |
| Required Jeskai/Jund/Naya boundaries remediated | PASS |
| Frozen fields unchanged from rejected candidate | PASS |
| Collision order and generic-target absence preserved | PASS |
| Candidate-scope output limited to documented preview exception | PASS |
| Preview source/consumer equality | PASS |
| Preview semantic alignment preserved | PASS |
| Public/recruiter copy aligned | PASS |
| Generation deterministic | PASS |
| Known warnings classified | PASS |
| Table Talk excluded | PASS |
| Red remains uncertified | PASS |
| VM-521 untouched | PASS |

No FAIL or UNKNOWN controls remain.

## Findings

No blocker findings.

No high findings.

No medium findings.

No low findings.

Non-blocking observations:

- Exact candidate-scope exits 1 for the inherited documented R display-source exception from Gate 1+2 to replacement; manual review confirms it is limited to the two preview paths and is not replacement-only drift.
- `git diff --check` reports only the known handoff-index line-ending warning from the preserved Table Talk baseline.
- `test:source-generated` retains unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings.

## Decision

APPROVE EXACT SHA `6aefb2090ff20a361f7f3cd80515445036323158`

## Not Performed

- No candidate semantic/raw/generated/fixture/provenance/recruiter/runtime/test/validator/schema/scoring files were modified.
- No remediation or additional replacement candidate was created.
- No certification occurred.
- Red was not marked `semantically_ready`.
- Program base was not advanced.
- Certified count remains 18.
- Wave 3 remains 3 of 5 certified.
- VM-521 did not start.
- Original main worktree was not modified.
- External Excel tracker was not modified.
- Allowed Table Talk baseline was preserved and excluded.
