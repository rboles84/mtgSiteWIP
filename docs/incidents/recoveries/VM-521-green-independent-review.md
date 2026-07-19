# VM-521 Green Independent Review

Status: REQUEST CHANGES

Review-record SHA: `PENDING_VM521_GREEN_REVIEW_RECORD_SHA`

Drift register entry: `DRIFT-019`

## Scope

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Identity: VM-521 - Green / G.
- Cohort: Wave 3 monocolors.
- Worktree: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-521-green-semantic-recovery`.
- Starting HEAD / workflow record: `e86f011063b2434f49d1e447f87d7087532142cd`.
- Program base: `9f0a076a369cba23dc9bc19231b0efcddd21afe5`.
- Green drift preflight: `76fd0eb8bf702bf889857537c636b3404c4bdba4`.
- Gate 1+2 governance commit: `332ab81ffcfa461df1109e89709d47907e7c0032`.
- Superseded candidate: `83123037f619472a4d2834e124311df691281a53`.
- Exact final candidate reviewed: `45e323cde853ee5058b71c819f080ab4025597ce`.

The workflow-record SHA was not treated as an approvable semantic candidate.

## Preflight

Preflight passed for exact review:

- Worktree root: `C:\dev\mtgSiteWIP-crit001`.
- Branch: `codex/vm-521-green-semantic-recovery`.
- HEAD: `e86f011063b2434f49d1e447f87d7087532142cd`.
- Required objects exist.
- Expected ancestry is valid through program base, Green drift preflight, Gate 1+2, superseded candidate, final candidate, and workflow record.
- Final candidate `45e323cde853ee5058b71c819f080ab4025597ce` is an ancestor of the workflow record.
- Superseded candidate `83123037f619472a4d2834e124311df691281a53` remains preserved and unapproved.
- Active worktree had only the allowed Table Talk baseline: modified `docs/handoffs/HANDOFF_INDEX.md` and the two untracked Table Talk handoffs.
- Original main `C:\dev\mtgSiteWIP` was inspected read-only with `-c safe.directory=C:/dev/mtgSiteWIP`; only the known docs/workflow dirty baseline was present.
- Certified count remains 19, Wave 3 remains 4 of 5 certified, and VM-522 is not started.

## Candidate Isolation

Gate 1+2 to superseded candidate:

`332ab81ffcfa461df1109e89709d47907e7c0032..83123037f619472a4d2834e124311df691281a53`

The superseded candidate changed the Green semantic/generated candidate files and incorrectly changed `data/raw-factions/green/green.placement.json#/calibration_tuning/calibration_note` from the frozen Gate 1+2 value:

`Green should rise only when nature, instinct, role, interdependence, or natural growth drive the answer.`

to:

`Green should rise only when nature, instinct, role, interdependence, natural growth, tradition, or web-of-life responsibility drive the answer.`

This was correctly candidate-blocking frozen calibration drift.

Superseded candidate to final candidate:

`83123037f619472a4d2834e124311df691281a53..45e323cde853ee5058b71c819f080ab4025597ce`

The final candidate restores the frozen calibration note in raw placement, generated placement, and recruiter context. No neighboring calibration field changed in that correction.

Gate 1+2 to final candidate:

`332ab81ffcfa461df1109e89709d47907e7c0032..45e323cde853ee5058b71c819f080ab4025597ce`

Candidate files:

- `data/raw-factions/green/green.claims.json`
- `data/raw-factions/green/green.sources.json`
- `data/raw-factions/green/green.profile.json`
- `data/raw-factions/green/green.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/green.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Candidate-to-workflow diff:

`45e323cde853ee5058b71c819f080ab4025597ce..e86f011063b2434f49d1e447f87d7087532142cd`

This diff is governance/workflow-only and was excluded from semantic review.

## Contract And Source Review

Gate 1+2 starting state was verified from the report and final candidate tree:

- Starting claims: 8 total; 0 substantive, 0 discovery, 0 support, 8 unclassified.
- Final claims: 8 total; 6 substantive, 0 discovery, 2 support, 0 unclassified.
- Substantive IDs: `green_claim_0002`, `green_claim_0003`, `green_claim_0004`, `green_claim_0005`, `green_claim_0006`, `green_claim_0007`.
- Support IDs: `green_claim_0001`, `green_claim_0008`.

Source hierarchy:

- `MONO-G-2015`: official philosophy backbone for Green acceptance, natural order, role, web of life, method, cares/threats, allies/enemies, and pressure.
- `MONO-G-2025`: official current-voice corroboration, bounded by first-person/rhetorical framing.
- `MECH-CP-2021` and `MECH-CP-2021-CHG`: mechanic-specific Green texture only.
- `RULES-CR`, `VM-377`, and `SCRYFALL-G-2026-06-13`: auxiliary support only.

Contract checks completed before the stop-line:

- Every substantive claim has bounded `evidence_locations`.
- Every substantive `evidence_locations` entry has `evidence_scope`.
- `source_ids` match substantive evidence-location source IDs.
- Support records are not used in authoritative profile, placement, fixture, or semantic provenance proof chains.
- Final Green provenance count is 25.
- Required null canonical IDs: 0.
- Null hashes: 0.
- Unresolved pointers found in reviewed Green provenance: 0.
- Duplicate canonical keys: 0.

## Fixture, Provenance, And Proof Chains

Fixture path: `research/fixtures/semantic-readiness/green.semantic-fixtures.json`.

The fixture schema exists and includes core inclusion, mature/pressure behavior, nearest-collision ambiguity, required-neighbor exclusions, and two provenance fixtures.

Explicit provenance fixture equality:

- `data/raw-factions/green/green.profile.json#/core_identity`: generated and fixture IDs match exactly: `green_claim_0002`, `green_claim_0003`, `green_claim_0004`, `green_claim_0005`, `green_claim_0006`.
- `data/raw-factions/green/green.placement.json#/placement_summary`: generated and fixture IDs match exactly: `green_claim_0002`, `green_claim_0003`, `green_claim_0004`, `green_claim_0005`, `green_claim_0006`, `green_claim_0007`.

The 12 Gate 1+2 proof-chain locators were independently checked against final generated provenance. All generated chains use eligible substantive claims, preserve order, have no duplicates, and match the raw canonical chain fields. The other 10 preflight locators do not have dedicated provenance fixture objects in the current fixture schema; they were verified against generated provenance and raw canonical claim arrays rather than fixture equality.

## Frozen, Collision, And Candidate Scope

The final candidate restores the Gate 1+2 calibration note exactly:

`Green should rise only when nature, instinct, role, interdependence, or natural growth drive the answer.`

Preserved frozen controls:

- Top-level confidence remains absent.
- Required terms remain `nature`, `acceptance`, `instinct`, `growth`, `interdependence`, `role`, `tradition`, `land`.
- Minimum hits remain `2`.
- Broad penalty remains `0.13`.
- Lateral targets remain `WG`, `UG`, `BG`, `RG`.
- Raw collision structure remains object-with-`pairs`.
- Raw and generated collision order remains `U`, then `B`.
- Explicit `GENERIC_G_OVERFIT` collision target remains absent.

Exact candidate-scope command:

`node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=45e323cde853ee5058b71c819f080ab4025597ce --identity=G`

Exit: 1.

Output:

- `identity candidate modified non-identity path data/identity-layers.json`
- `unrelated or global data/factions.json content changed`

Manual inspection confirms no third path, no calibration-note diagnostic, no frozen-field diagnostic, and no validator crash. The candidate-scope output itself is limited to the documented Green display-source exception paths.

## Preview And Consumed-Surface Finding

The remediated preview source and embedded generated consumer are equal:

- `data/identity-layers.json#/expressions/G/preview_text`
- `data/factions.json#/identity_layers/expressions/G/preview_text`

Final text:

`Green accepts a role within the web of life and lets inherent nature unfold. Its growth is patient, purposeful, and wary of mistaking every change for wisdom.`

However, exact stale Gate 1+2 preview text remains in active consumed surfaces:

- `assets/js/newindex-color-matrix.js`
- `assets/js/color-matrix-radar.js`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`

Stale text:

`Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.`

This violates DRIFT-015 and DRIFT-017 because source-to-embedded equality in JSON is not enough; active preview consumers must not retain the old generic Green preview. The candidate therefore cannot be approved.

The open recurrence is recorded as `DRIFT-019` in `docs/incidents/CRIT-001-drift-register.md`.

## Validation

Read-only validation and inspection run before the stop-line:

- `git status --short --branch` - exit 0; branch correct; only allowed Table Talk baseline dirty.
- Git object and ancestry checks - exit 0; required objects exist and ancestry is valid.
- Candidate and workflow diff inspection - completed.
- JSON/source/claim/provenance/fixture inspection scripts - completed.
- Exact old-preview stale search - exit 0 with stale active consumed-surface matches listed above.
- Exact candidate-scope command - exit 1 limited to the documented two JSON preview paths.
- Original main read-only status check - exit 0 with known docs/workflow dirty baseline only.

The full write-producing validation suite (`npm.cmd run build:factions`, second build, audit/validate, semantic-readiness tests, placement tests, recruiter isolation, source-generated tests, full `npm.cmd test`, `git diff --check`) was not run after the approval-blocking consumed-surface defect was confirmed. The stop rule required recording the defect and requesting changes rather than continuing toward approval.

## Drift Scorecard

| Control | Result |
|---|---|
| Correct branch and HEAD | PASS |
| Correct program base | PASS |
| Exact final candidate isolated | PASS |
| Superseded candidate preserved | PASS |
| Supersession reason independently verified | PASS |
| Final candidate corrects the frozen calibration-note defect | PASS |
| Candidate and workflow commits separated | PASS |
| Candidate file scope justified | PASS |
| Source hierarchy verified | PASS |
| Final claim roles independently verified | PASS |
| Evidence scopes complete | PASS |
| Non-authoritative proof isolated | PASS |
| IDs, hashes, and pointers valid | PASS |
| Final provenance count independently established | PASS |
| Fixture exists and uses valid schema | PASS |
| All 12 proof chains independently checked against generated truth | PASS |
| Frozen placement unchanged | PASS |
| Calibration note restored exactly | PASS |
| Raw U/B collision structure and order preserved | PASS |
| Generated U/B collision order preserved | PASS |
| Candidate-scope output limited to exact two JSON preview paths | PASS |
| Preview source and embedded JSON consumer equal | PASS |
| Active consumed preview surfaces aligned | FAIL |
| No stale active preview | FAIL |
| Generation deterministic | N/A - not run after blocker |
| Table Talk excluded | PASS |
| Green remains uncertified | PASS |
| VM-522 untouched | PASS |

Any FAIL blocks approval.

## Findings

### Blocker

- File/locator: `assets/js/newindex-color-matrix.js`, Green preview entry; `assets/js/color-matrix-radar.js`, Green preview entry; `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`; `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`.
- Behavior: active consumed surfaces retain the old Gate 1+2 Green preview text: `Green values nature, instinct, tradition, interdependence, and belonging. It asks what you already are beneath the noise.`
- Evidence: exact stale-copy search found the four active consumed-surface matches above; final candidate diff contains no `assets/` or `outputs/` updates.
- Rule impact: violates DRIFT-015 preview ownership/consumer propagation and DRIFT-017 consumed-surface semantic alignment. Equality between `data/identity-layers.json` and `data/factions.json` is insufficient when other active consumers remain stale.
- Required action: create a later replacement candidate that updates or regenerates every active Green preview consumer, or records a repository-supported reason why a stale copy is not active. Preserve the rejected candidate unchanged.
- Approval impact: blocks approval.

No high findings.

No medium findings.

No low findings.

## Decision

REQUEST CHANGES

## Not Performed

- No candidate remediation.
- No replacement candidate.
- No certification.
- No Green `semantically_ready` transition.
- No program-base advancement.
- No VM-522 or Wave 4 work.
- No original-main modification.
- No Excel update.
- No candidate semantic/generated/runtime file modification.
