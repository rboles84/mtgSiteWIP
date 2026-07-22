# VM-526 Naya Pre-Identity Drift Preflight

Agent name: Codex
Task requested: Perform the mandatory VM-526 Naya pre-identity drift preflight only, create the dedicated exact-base Naya worktree if setup was safe, inventory current Naya state read-only, and decide whether Gate 1+2 read-only semantic audit may begin in this same authorized goal window.

## Program And Setup

- Program: CRIT-001 - 37-Identity Semantic Recovery Program.
- Ticket: VM-526.
- Identity: Naya / WRG display ordering.
- Exact internal key: `NAYA`.
- Candidate-scope target: `NAYA`.
- Invalid alias checked: `WRG` exits 1 as `Unknown identity WRG`.
- Current certified count: 24 of 37.
- Wave 4 status: 4 of 10 certified.
- Exact program base: `7964b93f531017e579f069e6941463f53eab4bd9`.
- Program-base subject: `VM-525: certify Jund semantic recovery`.
- Prior certified identity: VM-525 Jund / JUND.
- Exact approved Jund semantic candidate: `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`.
- Jund candidate workflow: `461ff5c389a93c6c5e5fc7317bbc5413d214a960`.
- Jund approval review: `dee26b0246713a9b7d687c9fd2dfb96db2cfd9d2`.
- DRIFT-020 certified infrastructure candidate: `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`.
- Naya branch created: `codex/vm-526-naya-semantic-recovery`.
- Naya worktree created: `C:\dev\mtgSiteWIP-crit001-vm526-naya`.
- Naya worktree HEAD after creation: `7964b93f531017e579f069e6941463f53eab4bd9`.
- Naya worktree status after creation: clean before governance edits.
- Excel tracker was not opened or modified.

## Setup Inspection

- `git worktree list --porcelain` before setup showed no existing VM-526/Naya worktree and no VM-526 branch.
- Local branch `codex/vm-526-naya-semantic-recovery`: absent before creation.
- Remote-tracking branch collision for VM-526/Naya/WRG names: absent from current remote refs.
- Preferred path `C:\dev\mtgSiteWIP-crit001-vm526-naya`: absent before creation.
- Existing VM-526 repository state before setup: backlog card and ledger not-started entry only; no preflight, Gate 1+2, remediation, candidate, workflow, review, or certification record.
- Branch/worktree creation command: `git worktree add -b codex/vm-526-naya-semantic-recovery C:\dev\mtgSiteWIP-crit001-vm526-naya 7964b93f531017e579f069e6941463f53eab4bd9`.
- Exact ancestry chain proved direct: `665d2b128f3aab8daf5d48d4fdab244a9fb33c2e` -> `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04` -> `461ff5c389a93c6c5e5fc7317bbc5413d214a960` -> `dee26b0246713a9b7d687c9fd2dfb96db2cfd9d2` -> `7964b93f531017e579f069e6941463f53eab4bd9`.
- Original main `C:\dev\mtgSiteWIP`: inspected read-only and left untouched.
- Long-running CRIT worktree `C:\dev\mtgSiteWIP-crit001`: known Table Talk baseline present and preserved.
- DRIFT-017 prototype worktree `C:\dev\mtgSiteWIP-crit001-drift017`: preserved with modified prototype files; those uncommitted files were not read or used.
- VM-522, VM-523, VM-524, VM-525, DRIFT-020, and temp exact-candidate worktrees were inspected from outside and left untouched.
- Historical/debug/archive exclusions remain untouched: `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson`, `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson`, `assets/js/newindex-color-matrix.js`, and `assets/js/color-matrix-radar.js`.

## Governing Authority Reviewed

Reviewed root `AGENTS.md`; `docs/kanban/board.md`; VM-526 card; `docs/handoffs/HANDOFF_INDEX.md`; CRIT-001 operating playbook; Contract v1.1 amendment; semantic-readiness contract references; drift-control template; drift register including DRIFT-015, DRIFT-016, DRIFT-017, DRIFT-019, and DRIFT-020; approved candidate-scope validator and tests; VM-522 through VM-525 drift, Gate, candidate, review, and certification precedents; and historical Naya records VM-181 through VM-188, VM-196, and VM-323 by index discovery for later Gate 1+2 review.

No unresolved material governance conflict blocks Gate 1+2. The governing rule is non-circular stage ownership: preflight proves safe inspectability and inventory scope; Gate 1+2 adjudicates semantics and remediation boundaries.

## Exact Naya Target

- Human name: Naya.
- Color identity: White, Red, Green.
- Display ordering requested: WRG.
- Stored color-direction metadata in current raw claims: RGW.
- Internal key: `NAYA`.
- Raw ID: `naya`.
- Candidate-scope target isolation: PASS. `NAYA` reaches expected unremediated proof-chain diagnostics; `WRG` fails as an invalid identity rather than aliasing into the target.
- Key locations: `data/raw-factions/naya/`, `data/factions.json#/factions/NAYA`, `data/placement-model.json#/factions/NAYA`, `data/identity-layers.json#/expressions/NAYA`, `data/factions.json#/identity_layers/expressions/NAYA`, `data/semantic-readiness-provenance.json` entries with `identity_key: NAYA`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/NAYA`.

## Raw Inventory

All Naya raw files are tracked and readable:

| Path | Git blob | SHA-256 | Classification |
| --- | --- | --- | --- |
| `data/raw-factions/naya/naya.changelog.json` | `22147eedae6b1b9c51f1a5dc3d88f29a2cb67c3f` | `2814d5b99bf20b1229e6e07b572733f278af5bce32809c1dd926e85e3cbff30e` | raw changelog / authoritative history support |
| `data/raw-factions/naya/naya.claims.json` | `de8a0634f6e9440ce1f8c4b3a9b2d069e63f5fb8` | `6e9c6bcd37be37354cf494dff8b88d517dc1d7ff63b7d2c132e9693a76a37bee` | raw claims |
| `data/raw-factions/naya/naya.placement.json` | `afd3350d3db0232c3caead25a5d615b6094effe9` | `8c5e7882b7cb7e04738fca4a0d47be6c2f874ddb026845654de646943a702fb8` | raw placement/collision |
| `data/raw-factions/naya/naya.profile.json` | `5ff0c2c4d74a126103550fddffc1d965b16c79cf` | `dccce0aed37cc1443693dd76f9dc3553cc61fe792ab986ca802b9fc0afd9c6d1` | raw profile |
| `data/raw-factions/naya/naya.sources.json` | `0d436fbdb0c250d4c6b445d2ed727e7fb9c9bcff` | `779a405ed0c65e1b2e9075474c18b34ed22fc8410bd9fa0606bb6a0592f30f2b` | stored source inventory |

## Source, Claim, Provenance, And Fixture Inventory

- Stored sources: 16.
- Source role counts: `claim-bearing` 3, `shaping-only` 6, `support-only` 7.
- Claim-bearing source count: 3.
- Current claims: 10.
- Stored role counts: 0 substantive, 0 support, 0 discovery, 10 unclassified/null.
- Claim IDs: `naya_claim_0001` through `naya_claim_0010`; no duplicate/null IDs found in preflight inventory.
- Claim-level `evidence_locations`: 0.
- Legacy evidence rows exist and must be adjudicated in Gate 1+2.
- Existing Naya provenance entries: 20.
- Existing fixture: absent.
- Expected fixture path: `research/fixtures/semantic-readiness/naya.semantic-fixtures.json`.
- Current proof chains are readable but not candidate-ready: candidate-scope output reports generated and provenance proof-chain contamination because generated semantic consumers reference unclassified Naya claims. This is expected pre-remediation behavior and a later gate obligation.

## Frozen Placement And Scope Baseline

- Placement summary: `Naya is a VM-188 live-pilot placement packet for the NAYA shard expression. Its strongest source-bound signals are Green-centered life, nature, growth, ecosystem belonging, White larger-picture care, Red feral instinct and loyalty, Blue/Black absence, and anti-flattening boundaries.`
- Calibration status: `vm188_live_pilot`.
- Required positive terms: `Naya`, `Alara`, `RGW`, `Green-centered`, `life`, `nature`, `growth`, `ecosystem belonging`, `larger natural whole`, `White care`, `Red instinct`.
- Required positive min hits: null.
- Broad match penalty: null.
- Suppress list includes generic RGW, generic big creatures, generic tokens, casual battlecruiser, Cabaretti social glamour, Selesnya community without Red instinct, Gruul impulse without White care, Boros action without Green abundance, Bant hierarchy, Jund consumption, and manual-fill lore as proof.
- Strengthen list includes Green-centered life, nature and growth, ecosystem belonging, role and place in a living whole, White larger-picture care, Red feral instinct and loyalty, Blue and Black absence at design scope, and anti-flattening boundary.
- Collision suppressions include Jund, Bant, Selesnya, Gruul, Boros, Cabaretti style, generic big creatures, and generic tokens.
- False-positive guardrail: `Do not treat support-only mechanics, Commander/operator rows, manual-fill lore, comparator factions, or color composition alone as Naya evidence.`
- Raw collision guidance shape: array.
- Raw collision targets: `jund`, `bant`.
- No Hall, Crucible, global scoring, scheduling, package, validator, generator, schema, parser, placement implementation, runtime behavior, or CI change is authorized.

## Preview Ownership And Consumers

- Authoritative preview source: `data/identity-layers.json#/expressions/NAYA/preview_text`.
- Embedded preview: `data/factions.json#/identity_layers/expressions/NAYA/preview_text`.
- Source/embedded equality: true.
- Current preview text: `Naya treats life as belonging in a larger natural whole. Green supplies growth and place, White turns that life toward care for the whole, and Red makes the bond immediate, loyal, and instinctive.`
- Active consumers requiring later proof: Home identity layers, Archscry data, recruiter context, placement tests, semantic-readiness scripts, candidate-scope scripts, source/generated guardrails, package scripts, and CI validation.
- Established exclusions retained: VM-542/DRIFT-019 debug inspection artifacts and historical archive JS files remain non-active exclusions unless dependency proof later says otherwise.

## Required Neighbor Set

Gate 1+2 must test at least:

- Pair identities: Selesnya / WG, Gruul / RG, Boros / WR.
- Monocolors: White / W, Red / R, Green / G.
- Three-color identities sharing two colors or close topology: Bant / WUG, Jund / BRG, Abzan / WBG, Temur / URG, Mardu / WBR, Jeskai / WUR.
- Other local risks: Cabaretti style, generic RGW, generic big creatures, generic tokens, generic battlecruiser, good-stuff, color composition, support-only Commander mechanics, and manual-fill lore as proof.

Current raw collision coverage directly includes Jund and Bant. Missing or generic boundaries are Gate 1+2 audit subjects and Gate 3+4 fixture/collision obligations if remediation is later authorized.

## DRIFT Controls

| Control | Result | Evidence | Later obligation |
| --- | --- | --- | --- |
| DRIFT-015 | PASS for preflight | Preview owner and embedded copy identified; equality true. | Gate 1+2 must review semantic alignment; Gate 3+4 may repair only if authorized. |
| DRIFT-016 | PASS for preflight | Approved validator unchanged; Naya raw/generated target is readable; `NAYA` target recognized; `WRG` rejected. | Gate 5 candidate-scope must pass or document an approved exact exception after remediation. |
| DRIFT-017 | PASS for preflight | Active-consumer and historical/debug/archive classifications from VM-542/DRIFT-019 precedent retained. | Gate 1+2 must determine semantic alignment scope; Gate 3+4 must propagate generated truth if remediation is authorized. |
| DRIFT-019 | PASS for exclusion | Historical/debug/archive paths remain untouched and not promoted by copied-text presence alone. | Continue dependency-proof standard. |
| DRIFT-020 | PASS for preflight | Certified validator/test files match exact infrastructure candidate; target-local preview-source exception exists in committed tooling. | Gate 5 must use exact candidate-scope validation for the Naya candidate range. |

## Commands Run

| Command | Exit | Classification |
| --- | ---: | --- |
| `git worktree list --porcelain` | 0 | Setup inspection. |
| `git branch --list '*vm-526*' '*naya*' '*wrg*'` | 0, empty | Local collision inspection before setup. |
| `git branch -r --list '*vm-526*' '*naya*' '*wrg*'` | 0, empty | Remote-tracking collision inspection before setup. |
| `Test-Path C:\dev\mtgSiteWIP-crit001-vm526-naya` | 0, false | Worktree path absent before setup. |
| `git rev-list --parents -n 1` for required chain commits | 0 | Exact direct parent chain proved. |
| `git worktree add -b codex/vm-526-naya-semantic-recovery C:\dev\mtgSiteWIP-crit001-vm526-naya 7964b93f531017e579f069e6941463f53eab4bd9` | 0 | Branch/worktree creation. |
| `git status --short --branch` in Naya worktree | 0 | Clean before governance edits. |
| `git rev-parse HEAD` in Naya worktree | 0 | Exact starting HEAD verified. |
| `node research/audit-semantic-readiness.mjs --targets=NAYA` | 0 | Readable target inventory; 10 claims, all unclassified. |
| `node research/validate-semantic-readiness.mjs --targets=NAYA` | 1 | Expected unremediated role/evidence/recruiter/fixture findings. |
| `node research/validate-semantic-readiness.mjs --fixtures --targets=NAYA` | 1 | Expected unremediated fixture/role findings. |
| `node research/semantic-candidate-scope-tests.js` | 0 | Approved validator tests pass. |
| `git diff --quiet 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` | 0 | DRIFT-020 validator integrity. |
| `node research/validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=7964b93f531017e579f069e6941463f53eab4bd9 --identity=NAYA` | 1 | Expected unremediated proof-chain diagnostics; target recognized. |
| `node research/validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=7964b93f531017e579f069e6941463f53eab4bd9 --identity=WRG` | 1 | Expected invalid alias result: unknown identity. |
| `node research/validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=7964b93f531017e579f069e6941463f53eab4bd9 --identity=NOT_A_REAL_IDENTITY` | 1 | Unknown-identity rejection checked. |
| `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` | 0 | Certified array-shape regression control passed. |
| `node research/build-semantic-readiness-provenance.mjs --check` | 1 | Stale provenance baseline; later Gate 3+4 obligation. |
| `node research/validate-source-generated-guardrails.mjs --targets=NAYA` | 0 | PASS with one model-owned inhibitor warning. |

## Stage-Ownership Matrix

- Setup/base/branch/worktree/protected worktrees: PASS; PREFLIGHT.
- Governance authority and prompt/playbook reconciliation: PASS; PROGRAM_GOVERNANCE.
- Exact internal key, invalid WRG alias, raw files, source corpus, claim inventory, provenance inventory, fixture locator, frozen fields, collision shape, preview ownership, required neighbor set, approved diagnostics, and no semantic data change: PASS.
- Later defects are stage-owned as follows: source/claim/evidence roles, source locator support, preview alignment, required-neighbor coverage, and semantic-risk adjudication to GATE_1_2; provenance IDs, fixture creation, collision/consumer propagation, and provenance freshness to GATE_3_4; exact candidate-scope and exact-chain validation to GATE_5.

Scorecard:

- Total controls: 24.
- PASS: 24.
- FAIL: 0.
- UNKNOWN: 0.
- N/A: 0.
- Genuine preflight blockers: 0.

## What Changed

- Added this VM-526 preflight handoff.
- Moved the VM-526 Kanban card to in-progress state with preflight-complete/Gate 1+2-authorized status.
- Updated `docs/kanban/board.md` for VM-526 active preflight completion.
- Updated `docs/handoffs/HANDOFF_INDEX.md`.

## Why It Changed

CRIT-001 drift-control rules require a separate committed pre-identity drift-preflight control record before any new identity receives Gate 1+2 semantic work. Naya passed because the exact target, raw/source/claim/provenance/fixture state, frozen fields, collision shape, preview owner, consumer scope, and required future audit scope are identifiable without semantic edits, unapproved tooling, shared infrastructure changes, tracker edits, or protected-worktree changes.

## Decisions Made

- Decision: `PASS - NAYA GATE 1+2 AUTHORIZED`.
- Authorization scope: Gate 1+2 read-only semantic audit may begin after this governance-only preflight commit.
- Remediation, generation, fixture creation, semantic candidate creation, workflow recording, independent review, certification, program-base advancement, VM-527 work, original-main edits, Excel edits, and shared-infrastructure changes remain unauthorized until later gates explicitly allow their own scopes.
- Treat `NAYA` as canonical internal key.
- Treat `WRG` as display ordering/color notation only and invalid as a candidate-scope alias.

## Risks / Uncertainties

- Naya may still fail Gate 1+2 if its evidence locators cannot support its current claims, if source roles are too support-heavy, if preview language proves generic or unsupported, or if neighbor boundaries cannot be made source-bound.
- Current same-SHA candidate-scope failure is expected for the unremediated packet but must not be accepted for a future candidate.
- Stale provenance and missing fixture are known later-stage obligations, not remediated state.

## Tests Run

- `node research/audit-semantic-readiness.mjs --targets=NAYA` - exit 0.
- `node research/validate-semantic-readiness.mjs --targets=NAYA` - exit 1, expected unremediated findings.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=NAYA` - exit 1, expected unremediated fixture/role findings.
- `node research/semantic-candidate-scope-tests.js` - exit 0.
- `git diff --quiet 399ba34243f5b421da4d3a0c251a37bcbc4bd5fa -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` - exit 0.
- `node research/validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=7964b93f531017e579f069e6941463f53eab4bd9 --identity=NAYA` - exit 1, expected unclassified proof-chain diagnostics.
- `node research/validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=7964b93f531017e579f069e6941463f53eab4bd9 --identity=WRG` - exit 1, unknown identity.
- `node research/validate-semantic-candidate-scope.mjs --base=7964b93f531017e579f069e6941463f53eab4bd9 --target=7964b93f531017e579f069e6941463f53eab4bd9 --identity=NOT_A_REAL_IDENTITY` - exit 1, unknown identity.
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG` - exit 0.
- `node research/build-semantic-readiness-provenance.mjs --check` - exit 1, stale provenance baseline.
- `node research/validate-source-generated-guardrails.mjs --targets=NAYA` - exit 0 with one model-owned inhibitor warning.

## Not Touched

No Gate 1+2 semantic audit occurred before this preflight. No Naya semantic adjudication occurred. No Naya semantic or implementation data changed. No source, claim, evidence, provenance, fixture, generated, collision, placement, scoring, preview, recruiter, runtime, test, validator, generator, schema, package, lockfile, CI, parser, placement implementation, shared infrastructure, candidate workflow, independent review, certification, Excel tracker, VM-527, VM-525 history, original main, DRIFT-017 prototype, DRIFT-020 implementation, VM-542/DRIFT-019 residual, historical/debug/archive exclusion, or Table Talk file was modified.

## Follow-Up Recommendations

Next suggested agent: VM-526 Gate 1+2 read-only semantic audit agent.

Gate 1+2 read-only audit may begin after this preflight commit. Remediation, candidate creation, independent review, certification, source acquisition, and program-base advancement remain unauthorized until their gates explicitly authorize them.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-526-naya-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`

PASS - NAYA GATE 1+2 AUTHORIZED
