# VM-520 Red Independent Review

Status: REQUEST CHANGES

Review-record SHA: `PENDING_VM520_RED_REVIEW_RECORD_SHA`

## Scope

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Identity: VM-520 - Red / R.
- Cohort: Wave 3 monocolors.
- Worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-520-red-semantic-recovery`.
- Starting HEAD / workflow record: `70358e1bbb65add714239b0d8621eda0a51e0ed4`.
- Program base: `1116786785dc4c5c8c1447dcad79c89e527657eb`.
- Approved monocolor validator candidate: `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`.
- Validator approval review: `af3d8c6c563b3743f65c2dc8478519707f4785c8`.
- Red drift preflight: `94a33b70fdac83b350195a3eed7f34118f999e31`.
- Gate 1+2 governance commit: `6c2b6dfc3e9e838f9e75801517a81258b675923d`.
- Exact candidate reviewed: `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.

No superseded Red candidate was found. The Gate 1+2 and workflow-record SHAs were not treated as approvable semantic candidates.

## Preflight

Preflight passed for exact review:

- Worktree root: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-520-red-semantic-recovery`.
- HEAD: `70358e1bbb65add714239b0d8621eda0a51e0ed4`.
- Required objects exist.
- Expected ancestry is valid through program base, validator/preflight lineage, Gate 1+2, candidate, and workflow record.
- Candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` is an ancestor of the workflow record.
- Active worktree had only the allowed Table Talk baseline: modified `docs/handoffs/HANDOFF_INDEX.md` and the two untracked Table Talk handoffs.
- Original main `C:\dev\mtgSiteWIP` was inspected read-only with `-c safe.directory=C:/dev/mtgSiteWIP`; only the known docs/workflow dirty baseline was present.
- Certified count remains 18, Wave 3 remains 3 of 5 certified, and VM-521 is not started.

## Candidate Isolation

Candidate diff reviewed:

`6c2b6dfc3e9e838f9e75801517a81258b675923d..deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`

Candidate files:

- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.profile.json`
- `data/raw-factions/red/red.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Candidate scope is otherwise justified for VM-520: no non-Red raw packet changes, no Hall, Crucible, scheduler, schema, shared validator, builder, global scoring, global calibration, unrelated runtime logic, governance content, or Table Talk content entered the candidate.

Workflow diff reviewed:

`deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870..70358e1bbb65add714239b0d8621eda0a51e0ed4`

This diff is governance/workflow-only and was excluded from semantic approval. The workflow-record SHA was not approved.

## Contract And Source Review

Initial claim state at Gate 1+2 base:

- 8 total.
- 0 substantive.
- 0 discovery.
- 0 support.
- 8 unclassified.

Final claim state in the exact candidate:

- 8 total.
- 6 `substantive_claim`: `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007`.
- 2 `support_record`: `red_claim_0001`, `red_claim_0008`.
- 0 discovery.
- 0 unclassified.

Source hierarchy:

- `MONO-R-2015`: philosophy backbone, claim-bearing for Red's goal, means, emotional/lived concerns, relationship boundaries, and pressure behavior.
- `MONO-R-2025`: current voice update, claim-bearing but bounded to current first-person/rhetorical framing and not a replacement for the philosophy backbone.
- `MECH-CP-2021`: mechanic-specific authority only.
- `GOV-COC-2024`: governance/process-specific authority only for dated Commander-era red card-draw/gap process context.
- `RULES-CR`: Commander rules boundary only.
- `VM-377`: project governance/source-intake boundary only.
- `SCRYFALL-R-2026-06-13`: current card legality verification/support only.

Contract checks:

- Every substantive claim has bounded `evidence_locations`.
- Every substantive evidence location has `evidence_scope`.
- Support claims do not appear in authoritative profile, placement, fixture, or semantic provenance proof chains.
- `red_claim_0008` appears only as auxiliary Commander Compass support.
- Mechanical and governance/process sources do not prove broad Red philosophy.
- Rules, project, and Scryfall legality records do not prove Red identity or placement.

## Red Semantic And Preview Review

The candidate's main Red semantic thesis is source-bounded: Red seeks freedom through feeling, action, lived experience, attachment/loyalty, and consequence pressure. It is guarded against generic emotion, authenticity, passion, anger, chaos, speed, fire, rebellion, mechanics, or Commander cards as sufficient proof.

The DRIFT-015 preview was reviewed independently:

- Source path: `data/identity-layers.json#/expressions/R/preview_text`.
- Embedded path: `data/factions.json#/identity_layers/expressions/R/preview_text`.
- Exact text: `Red turns feeling into action before life hardens into regret. Its freedom stays vivid, loyal, and answerable for the sparks it throws.`
- Source-to-embedded equality: true.

Preview clause review:

- `Red turns feeling into action` is supported by `MONO-R-2015` and `MONO-R-2025` anchors around listening to the heart/body/emotions and acting before inaction forecloses experience.
- `before life hardens into regret` is supported by the finite-life/no-regrets and inaction-fruitless source passages; it is poetic but bounded.
- `vivid, loyal` is supported by source passages around vivid/full life, bonds, loyalty, camaraderie, and Red's contrast with Black.
- `answerable for the sparks it throws` is acceptable as consequence-pressure language tied to short-sightedness risk; it does not import White/Boros duty when read with the surrounding packet.

No preview, public-copy, recruiter-copy, source-authority, evidence-scope, provenance, fixture, frozen-field, or candidate-scope finding independently blocks approval.

## Fixture And Provenance Review

Reviewed R provenance count: 25 entries.

Provenance checks:

- Required null canonical IDs: 0.
- Null canonical content hashes: 0.
- Unresolved pointers: 0.
- Duplicate canonical entries: 0.
- Duplicate null-key states: 0.
- Support/discovery-backed authoritative chains: 0.
- Non-philosophical-source-backed broad authoritative philosophy chains: 0.

Exact-chain checks:

| Locator | Generated ordered IDs | Fixture ordered IDs | Generated count | Fixture count | Exact equality | Duplicates | Missing | Extra |
|---|---|---|---:|---:|---|---|---|---|
| `data/raw-factions/red/red.profile.json#/core_identity` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006` | same | 5 | 5 | PASS | none | none | none |
| `data/raw-factions/red/red.placement.json#/placement_summary` | `red_claim_0002`, `red_claim_0003`, `red_claim_0004`, `red_claim_0005`, `red_claim_0006`, `red_claim_0007` | same | 6 | 6 | PASS | none | none | none |

## Frozen, Collision, And Scope Review

Frozen controls passed:

- Placement summary text unchanged.
- Top-level confidence remains absent.
- Required terms unchanged: `freedom`, `emotion`, `action`, `passion`, `impulse`, `experience`, `speed`.
- Minimum hits unchanged: 2.
- Broad penalty unchanged: 0.13.
- Strengthen/suppress lists unchanged.
- False-positive guardrail unchanged.
- Lateral targets unchanged: `WR`, `UR`, `BR`, `RG`.
- Raw collision object keys preserved: `rule`, `review_triggers`, `pairs`.
- Raw pair order preserved: `red_vs_white:W`, `red_vs_blue:U`.
- Generated collision order and semantics preserve W then U.
- Explicit `GENERIC_R_OVERFIT` raw collision target remains absent.
- Red-local scoring and golden-path fields remain absent.
- Native IDs and calibration remain unchanged.

Exact candidate-scope command:

`node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870 --identity=R`

Exit code: 1.

Independent inspection confirms the diagnostics are limited to the documented DRIFT-015 display-source exception:

- `data/identity-layers.json#/expressions/R/preview_text`
- `data/factions.json#/identity_layers/expressions/R/preview_text`

There was no validator crash, no third path, no frozen-field drift, no optional-field addition, no unrelated identity semantic change, and source/embedded preview values are equal.

## Finding

### Blocker - Missing Prompt-Required Red Neighbor Boundaries

Files and locators:

- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `data/raw-factions/red/red.placement.json#/collision_guidance`
- `data/placement-model.json#/factions/R/collision_guidance`
- `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT.R`

Evidence:

- Red semantic fixtures include `GENERIC_R_OVERFIT`, `W`, `U`, `WR`, `BR`, `RG`, `UR`, `PRISMARI`, `LOREHOLD`, `QUANDRIX`, `SILVERQUILL`, `WITHERBLOOM`, `GRIXIS`, `MARDU`, `TEMUR`, and `WUBRG`, but do not include `JESKAI`, `JUND`, or `NAYA`.
- Red raw and generated collision guidance contains only `W` and `U` pairs, with lateral targets `WR`, `UR`, `BR`, and `RG`.
- Repository-wide searches find `JESKAI`, `JUND`, and `NAYA` as other identities/global model data, but not as Red-local fixture or Red-local collision guidance proving a testable Red boundary against those prompt-required neighbors.

Rule impact:

- The VM-520 review prompt requires meaningful, source-supported Red distinctions against at least `JESKAI`, `JUND`, and `NAYA` in addition to generic R, red guilds, Prismari, Lorehold, Mardu, Grixis, and Temur.
- The drift scorecard requires PASS for required-neighbor discrimination and no FAIL/UNKNOWN controls before approval.

Required action:

- Create a later replacement candidate that adds source-bounded, Red-local neighbor discrimination for `JESKAI`, `JUND`, and `NAYA` without changing frozen placement/scoring/calibration fields or weakening the already-valid Contract, provenance, fixture, preview, public, and recruiter surfaces.

Approval impact:

- Blocks approval of exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.

No high, medium, or low findings were recorded.

## Validation

Commands and checks run:

- `git status --short --branch` - PASS; branch correct, only allowed Table Talk baseline visible.
- Git object and ancestry checks for program base, validator, Red preflight, Gate 1+2, candidate, and workflow record - PASS.
- `git diff --name-status 6c2b6dfc3e9e838f9e75801517a81258b675923d..deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` - PASS; candidate files enumerated.
- `git diff --name-status deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870..70358e1bbb65add714239b0d8621eda0a51e0ed4` - PASS; workflow-only.
- JSON parse checks for Red raw files, generated JSON, fixture JSON, and ledger JSON - PASS.
- Explicit role/evidence/provenance/fixture/frozen/preview script - PASS for Contract/provenance/frozen/preview controls.
- Exact stale preview and semantic-risk searches - PASS; only historical/governance or guardrail hits, no active stale Red preview.
- `npm.cmd run build:factions` - PASS; no generated content diff.
- second `npm.cmd run build:factions` - PASS; deterministic, no generated content diff.
- `node research/audit-semantic-readiness.mjs --targets=R` - PASS; 8 claims, 6 substantive, 0 discovery, 2 support, 0 unclassified.
- `node research/validate-semantic-readiness.mjs --targets=R` - PASS.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `npm.cmd run test:semantic-readiness` - PASS.
- `npm.cmd run test:placement` - PASS.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `npm.cmd run test:source-generated` - PASS with unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings.
- `npm.cmd test` - PASS; no content diff after deterministic report rewrite.
- `git diff --check` - PASS with line-ending warnings only.
- Exact candidate-scope command - exit 1, accepted only as the documented two-path DRIFT-015 display-source exception.
- Red-local neighbor search for `JESKAI`, `JUND`, and `NAYA` - FAIL for required-neighbor coverage; approval-blocking.

## Drift Scorecard

| Control | Result | Evidence |
|---|---|---|
| Correct branch and HEAD | PASS | Branch `codex/vm-520-red-semantic-recovery`, HEAD `70358e1bbb65add714239b0d8621eda0a51e0ed4`. |
| Correct program base | PASS | Program base `1116786785dc4c5c8c1447dcad79c89e527657eb`. |
| Exact candidate isolated | PASS | Candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` reviewed. |
| Candidate and workflow separated | PASS | Candidate-to-workflow diff is governance-only. |
| Candidate file scope justified | PASS | Only Red raw, Red fixture, generated Red consumers/provenance, recruiter content, and R preview source/embedded consumer changed. |
| No unrelated identity changes | PASS | No non-Red raw packets or unrelated runtime/scoring files changed. |
| Source hierarchy verified | PASS | Philosophy/mechanics/governance/support source uses independently checked. |
| Six substantive claims verified | PASS | `red_claim_0002` through `red_claim_0007`. |
| Two support claims verified | PASS | `red_claim_0001`, `red_claim_0008`. |
| Evidence scopes complete | PASS | All substantive evidence locations include `evidence_scope`. |
| Non-authoritative proof isolated | PASS | Support/mechanics/governance/rules/Scryfall rows are bounded. |
| IDs, hashes, and pointers valid | PASS | R provenance has no required null IDs/hashes or unresolved pointers. |
| R provenance count established | PASS | 25 entries. |
| Fixture chains exactly equal | PASS | `/core_identity` and `/placement_summary` match generated provenance. |
| Frozen fields unchanged | PASS | Summary, confidence absence, terms, threshold, penalty, lists, guardrail, native IDs, collision order, and calibration preserved. |
| Candidate-scope output limited to two preview paths | PASS | Manual review confirmed documented DRIFT-015 exception only. |
| Preview source/consumer equality | PASS | Source and embedded R preview are equal. |
| Preview semantic alignment | PASS | Preview is source-bounded and not approval-blocking. |
| Generic Red overfit rejected | PASS | Public/recruiter/fixture guardrails reject generic emotion/chaos/mechanics overfit. |
| Required neighbors distinguished | FAIL | `JESKAI`, `JUND`, and `NAYA` are not covered by Red-local fixture/collision guidance despite prompt requirement. |
| Public/recruiter copy aligned | PASS | Recruiter context maps to approved claims and auxiliary support boundaries. |
| No stale active copy remains | PASS | Exact stale Red preview absent from active surfaces. |
| Generation deterministic | PASS | Two `build:factions` runs produced no content diff. |
| Known warnings classified | PASS | JESKAI/MARDU warnings predate and are unrelated to Red candidate. |
| Table Talk excluded | PASS | Allowed Table Talk baseline preserved and unstaged. |
| Red remains uncertified | PASS | No certification or `semantically_ready` transition occurred. |
| VM-521 untouched | PASS | No VM-521 files or work started. |

## Decision

REQUEST CHANGES

The exact candidate is not approved because the required-neighbor/collision control failed for prompt-required Red-adjacent identities `JESKAI`, `JUND`, and `NAYA`.

## Not Performed

- No Red candidate semantic/raw/generated/fixture/provenance/recruiter/runtime files were modified.
- No remediation or replacement candidate was created.
- No certification occurred.
- Red was not marked `semantically_ready`.
- Program base was not advanced.
- Certified count remains 18.
- Wave 3 remains 3 of 5 certified.
- VM-521 did not start.
- Original main worktree was not modified.
- External Excel tracker was not modified.
- Allowed Table Talk baseline was preserved.
