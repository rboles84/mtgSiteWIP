# VM-524 Grixis Gate 1+2 Read-Only Semantic Audit

Agent name: Codex
Task requested: Complete VM-524 Grixis / UBR Gate 1+2 read-only semantic audit, define the Gate 3+4 remediation contract, update governance only, and commit explicit governance paths.
Program: CRIT-001 37-Identity Semantic Recovery Program
Identity: Grixis / UBR
Internal key: `GRIXIS`
Branch: `codex/vm-524-grixis-semantic-recovery`
Worktree: `C:\dev\mtgSiteWIP-crit001-vm524-grixis`
Starting HEAD: `81c1b731a7afbafda2b629e29096f8ae49bf5d1a`
Exact program base: `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`
Previous certified identity: VM-523 Esper / WUB
Decision: `PASS - GRIXIS GATE 3+4 REMEDIATION AUTHORIZED`

## Files Reviewed

- Root `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/templates/identity-semantic-recovery-template.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`
- `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
- Prior Gate 1+2 / review precedents: VM-520 Red, VM-521 Green, VM-522 Bant, VM-523 Esper
- Grixis raw packet: `data/raw-factions/grixis/grixis.claims.json`, `grixis.sources.json`, `grixis.profile.json`, `grixis.placement.json`, `grixis.changelog.json`
- Grixis research and architecture records under `docs/research/grixis/`, `docs/research/canon/`, and `docs/architecture/colors/grixis/`
- Generated and consumed surfaces: `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, `supabase/functions/guild-recruiter/faction-context.ts`, active Home/Archscry/test/CI files

## Files Changed

- `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`

No Grixis semantic, source, claim, evidence, provenance, fixture, generated, placement, scoring, preview, recruiter, runtime, test, validator, schema, package, CI, Excel, VM-525, protected worktree, DRIFT-017, VM-542/DRIFT-019 residual, historical/debug/archive, or Table Talk file was changed.

## Recent Related Work

VM-523 Esper certified at program base `0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a`. VM-524 pre-identity drift preflight created the dedicated Grixis worktree from that exact base and added setup-only commit `81c1b731a7afbafda2b629e29096f8ae49bf5d1a`. Completed shard precedents require exact identity isolation, non-circular stage ownership, support-proof-chain isolation, fixture creation, preview/source equality, candidate-scope validation, exact-tree validation, and preserved candidate/review/certification object separation.

## Current Known Risks

Grixis is readable but unremediated. All 11 claims lack `semantic_role`, evidence locators, evidence scopes, and canonical IDs. Provenance has 30 Grixis rows, 12 null canonical IDs, and 0 null hashes. The semantic fixture is missing. Candidate-scope validation fails from unclassified proof-chain contamination. Semantic-readiness provenance is stale. Some support/shaping sources appear in authoritative chains. The local Scryfall support artifact named by current records is absent. Raw/generated collision guidance is readable but incomplete for the required neighbor set.

## Relevant Decisions Already Made

- `GRIXIS` is the exact internal key and candidate-scope target.
- `UBR` is color metadata/display/query vocabulary, not a valid validator identity; the validator rejects `UBR` with `Unknown identity UBR`.
- Gate 1+2 is read-only: it may define the remediation contract but may not edit semantic packet data.
- Gate 3+4 must repair source-role use, claim roles, bounded evidence, canonical IDs, fixtures, proof chains, generated surfaces, and validation failures before candidate creation.
- Historical/debug exclusions remain unchanged: the two MTGData inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT`; `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` are `HISTORICAL_ARCHIVE`.

## What Should Not Be Touched

Do not modify VM-523, VM-522 histories, protected worktrees, the long-running Table Talk baseline, DRIFT-017 prototype files, VM-525 records, Excel tracker, shared validators/generators/schema/package/CI, or any Grixis implementation/semantic files until a separate Gate 3+4 remediation prompt authorizes it.

## Exact Target And Inventory

Human identity: Grixis / UBR. Color identity: `U`, `B`, `R`. Internal key: `GRIXIS`. Valid display aliases in identity layers: `GRIXIS`, `grixis`. Invalid validator alias: `UBR`. Raw files are tracked and parseable: claims, sources, profile, placement, and changelog. Preflight hashes for the raw files remain the frozen locators of record.

Source inventory: 14 stored source records: 4 `claim-bearing`, 7 `shaping-only`, 3 `support-only`. Core official claim-bearing authority is `src_wotc_rosewater_grixis_looking_out_for_number_one`, with bounded support from the official Alara overview and official `All the Cairns of Jund` story. Vox Mana ledgers/architecture/manual-fill records can support shaping, audit history, and bounded packet interpretation but cannot replace direct Magic canon proof. Maestros/New Capenna is comparator/support only. Commander/Scryfall/card rows are product support only and cannot prove canon identity or biography.

Claim inventory: 11 current claims; stored roles are 0 substantive, 0 support, 0 discovery, 11 unclassified. Duplicate claim IDs: 0. Null claim IDs: 0. Evidence locations: missing. Evidence scopes: missing. Canonical IDs on claims: missing. Current claims are readable and auditable, so this is a Gate 3+4 obligation rather than a Gate 1+2 blocker.

## Claim Disposition Contract

Final intended claim count remains 11: 11 `substantive_claim`, 0 support records, 0 discovery records, 0 unclassified. No claim is removed, merged, or split. Ten claims are retained with scope correction. One claim, `grixis_claim_0007`, must be rewritten to remove process wording and support-only proof dependence.

- `grixis_claim_0001`: retain with scope correction; evidence scope `identity_fact`; Grixis is the blue-black-red Alara shard in the official local Grixis design article.
- `grixis_claim_0002`: retain with scope correction; evidence scope `identity_metadata`; UBR is metadata while `GRIXIS` remains the runtime/candidate key.
- `grixis_claim_0003`: retain with scope correction; evidence scope `core_identity_black_survival`; Black-centered survival, self-advocacy, agency, and adaptation to reality.
- `grixis_claim_0004`: retain with scope correction; evidence scope `color_contribution_blue`; Blue supplies study, planning, weakness analysis, subtle problem solving, and information leverage.
- `grixis_claim_0005`: retain with scope correction; evidence scope `color_contribution_red`; Red supplies immediacy, zeal, individual priority, action, volatility, and recklessness tension.
- `grixis_claim_0006`: retain with scope correction; evidence scope `three_color_synthesis`; Black uses Red zeal and Blue manipulation/smarts for actively conniving survival.
- `grixis_claim_0007`: rewrite; evidence scope `enemy_pressure_boundary`; White and Green are missing design pressures, but this must not claim Grixis has no intelligence, structure, or social logic.
- `grixis_claim_0008`: retain with scope correction; evidence scope `anti_generic_villainy_boundary`; Grixis/Black must not collapse to evil or villainy.
- `grixis_claim_0009`: retain with scope correction; evidence scope `bounded_story_texture`; undead-infested hellscape is official story texture, not the identity definition.
- `grixis_claim_0010`: retain with scope correction; evidence scope `bounded_story_magic`; necromancy on Jund before Conflux is narrow story/magic evidence, not full metaphysics.
- `grixis_claim_0011`: retain with scope correction; evidence scope `bounded_story_event`; post-Conflux undead assault is broad event texture only.

## Canonical Semantic Packet

Canonical thesis: Grixis is Black-centered survival under hostile reality: Black names self-advocacy and adaptation as first law, Blue turns study into weakness-mapping leverage, and Red acts with urgent zeal before the opening closes.

Operational definition: Grixis treats the world as dangerous and unreliable. It does not seek permission, public order, natural harmony, or perfected systems. It studies weakness and converts openings into self-preserving advantage. It is not evil for evil's sake, generic UBR, undead aesthetics, necromancy, deck control, or Nicol Bolas/Sedris/Maestros biography. Story texture can illustrate hostile reality but must not define the identity.

Desired outcome: survive, retain agency, and convert pressure/openings into advantage. Agency theory: the self must advocate for itself because no system, nature, or morality reliably does. Power is survival leverage and self-protection, not domination as an abstract goal. Knowledge matters when it becomes leverage. Red emotion/impulse is urgent action under survival pressure, not pure appetite or chaos.

All three colors are necessary: without Blue, Grixis collapses toward Rakdos/Jund appetite or impulsive destruction; without Black, it collapses toward Izzet/Temur/Jeskai curiosity and expression without self-preserving leverage; without Red, it collapses toward Dimir/Esper/Sultai calculated control without urgency.

Forbidden definitions: generic villainy, power at any cost, cruelty, nihilism, chaos, ambition alone, self-interest alone, UBR deck archetype, undead/reanimation/zombies/demons/dragons, Bolas/Sedris/Kess/Malfegor biography, discard/sacrifice/burn/control/reanimator/combo-control mechanics, or Alara aesthetics alone.

## Required Neighbor And Collapse Matrix

Gate 3+4 must cover Dimir/UB, Izzet/UR, Rakdos/BR, Blue/U, Black/B, Red/R, Esper/WUB, Sultai/UBG, Temur/URG, Jeskai/WUR, Jund/BRG, Mardu/WBR, Bant/WUG, Abzan/WBG, Naya/WRG, WUBRG/five-color/good-stuff, generic control, generic villainy, generic nihilism, generic cruelty, generic chaos, generic ambition, generic self-interest, and generic UBR overfit.

Core boundaries: Dimir shares information but lacks Red urgency and the explicit survival triad. Izzet shares clever volatility but lacks Black self-preserving leverage. Rakdos shares appetite/action but lacks Blue weakness analysis. Esper shares UB control but seeks designed perfectibility. Sultai shares Black-centered resource use but leans Green ecology/ancestry. Temur shares U/R action and knowledge but centers Green embodied instinct. Jeskai shares U/R discipline and action but adds White accountability. Jund shares B/R survival and appetite but lacks Blue calculation. Mardu shares B/R action but adds White formation/code. Bant, Abzan, and Naya are opposite or partial-collapse checks around public honor, kinship/endurance, and abundance/awe.

## Provenance, Fixture, Proof Chain

Current Grixis provenance rows: 30. Null canonical IDs: 12 at `/moral_and_psychological_profile`, `/canonical_flavor_text/0`, `/canonical_flavor_text/1`, `/canonical_flavor_text/2`, `/canonical_flavor_text/3`, `/core_identity`, `/data_quality`, `/great_tension`, `/site_surface`, `/structure`, `/views_on_other_factions/0`, and `/views_on_other_factions/1`. Null hashes: 0. Duplicate canonical IDs: 0.

Required canonical owner assignments include `grixis_moral_and_psychological_profile_gate3`, `grixis_core_identity_gate3`, `grixis_data_quality_gate3`, `grixis_great_tension_gate3`, `grixis_site_surface_gate3`, `grixis_structure_gate3`, `grixis_flavor_*_gate3` owners for the four flavor rows, and `rel_grixis_*_gate3` owners for existing and added relationship/collision rows.

Expected fixture path: `research/fixtures/semantic-readiness/grixis.semantic-fixtures.json`. Current state: missing. Gate 3+4 must create fixtures covering positive thesis, negative collapse, required neighbors, generic/mechanical/aesthetic exclusions, preview equality, active consumers, frozen fields, native IDs, provenance, proof-chain, and candidate-scope assertions.

Proof-chain contract: stored source -> bounded source record -> claim with role/scope/location -> canonical owner -> provenance row with hash -> fixture -> raw placement/profile -> generated placement/factions -> authoritative preview -> embedded preview -> active Home/Archscry/recruiter/test/CI consumers. Current chain is readable but fails because claim roles and evidence mapping are missing and support/shaping sources contaminate some authoritative chains.

## Frozen Fields, Collision, Preview, Consumers

Frozen fields: identity key `GRIXIS`; colors `['U','B','R']`; UBR metadata-only status; placement summary; placement quality/confidence/review flags; live-pilot status; required positive terms; min hits `3`; broad-match penalty `0.18`; suppress/strengthen lists; lateral targets; native value/signal/question/collision/timeline/figure IDs. Hall/Crucible/scoring/calibration/runtime/package/shared validators/schema/CI are not authorized in this gate.

Collision shape: raw array, generated array. Raw order: `esper`, `jund`; IDs `collision_grixis_esper_live`, `collision_grixis_jund_live`. Generated order: `ESPER`, `JUND`. Lateral targets: `BANT`, `BR`, `ESPER`, `UB`, `UR`, `JUND`, `TEMUR`, `SULTAI`. Gate 3+4 must preserve existing collision entries and either add required local boundaries where schema precedent supports it or cover required exclusions through fixtures/recruiter/preview safeguards without changing frozen lateral targets unless explicitly authorized.

Preview owner: `data/identity-layers.json#/expressions/GRIXIS/preview_text`. Embedded preview: `data/factions.json#/identity_layers/expressions/GRIXIS/preview_text`. Equality: true. SHA-256: `256bc509f3815af8ebc7387b2e5f1da118763b5b90d4bd574ad3315de6701e41`. Current text is semantically aligned with the Gate 1+2 thesis and may be retained if Gate 3+4 repairs proof chains and proves propagation.

Proven active consumers: Home via `index.html` -> `assets/js/home.js` fetching identity/faction JSON; Archscry via `archscry/index.html` -> `assets/js/index.js`; recruiter via `supabase/functions/guild-recruiter/index.ts` importing `FACTION_CONTEXT`; tests/CI via quick-reading tests/bias, semantic-readiness scripts, candidate-scope scripts, source-generated guardrails, package scripts, and `.github/workflows/validation.yml`. Exclusions remain the two debug inspection NDJSON files and two historical archive JS files.

## DRIFT Controls

DRIFT-015: PASS for ownership/equality inventory; Gate 3+4 must prove semantic alignment and propagation after remediation.
DRIFT-016: PASS for readable raw/generated structural shapes and approved validator compatibility; Gate 3+4 must repair exact proof-chain and fixture failures.
DRIFT-017: PASS for active-consumer and exclusion classification; Gate 3+4 must verify all active consumed surfaces after generation.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=GRIXIS` -> exit 0; 11 claims, 11 unclassified, 14 sources, 30 reference-site rows, low-volume/support-heavy risk.
- `node research/validate-semantic-readiness.mjs --targets=GRIXIS` -> exit 1; expected pre-remediation failures: semantic roles required, recruiter guidance lacks evidence mapping, no fixtures.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=GRIXIS` -> exit 1; expected missing fixture and same readiness findings.
- `node research/semantic-candidate-scope-tests.js` -> exit 0.
- `node research/validate-semantic-candidate-scope.mjs --identity=GRIXIS --base=0a2d22e2ba0b16c15e30fa6ba2f3ce7d83313c0a --target=81c1b731a7afbafda2b629e29096f8ae49bf5d1a` -> exit 1; expected unclassified proof-chain contamination.
- `node research/validate-semantic-candidate-scope.mjs --identity=UBR --base=... --target=81c1...` -> exit 1; expected `Unknown identity UBR`.
- `node research/build-semantic-readiness-provenance.mjs --check` -> exit 1; expected stale provenance before Gate 3+4 rebuild.
- `node research/validate-source-generated-guardrails.mjs --targets=GRIXIS` -> exit 0; PASS with one model-owned inhibitor warning.
- `git diff --quiet aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2 -- research/validate-semantic-candidate-scope.mjs research/semantic-candidate-scope-tests.js` -> exit 0; approved validator unchanged.
- JSON parse check over eight target JSON files -> exit 0.
- `Test-Path research/fixtures/semantic-readiness/grixis.semantic-fixtures.json` -> false.
- Active-consumer dependency `rg` -> exit 0.

## Stage-Ownership Matrix Summary

| Control ID | Area | Finding | Result | Owner | Blocking |
|---|---|---|---|---|---|
| G12-001 | Worktree safety | Dedicated Grixis worktree clean at starting HEAD | PASS | PREFLIGHT | No |
| G12-002 | Program base | Exact Esper certification base verified | PASS | PREFLIGHT | No |
| G12-003 | Identity key | `GRIXIS` isolated; `UBR` invalid as validator identity | PASS | GATE_1_2 | No |
| G12-004 | Raw inventory | Five raw files tracked, readable, parseable | PASS | GATE_1_2 | No |
| G12-005 | Source inventory | 14 sources classified; support/shaping limits known | PASS | GATE_1_2 | No |
| G12-006 | Claim inventory | 11 claims fully inventoried; all unclassified | PASS | GATE_1_2 | No |
| G12-007 | Claim disposition | 11 final substantive claims specified | PASS | GATE_1_2 | No |
| G12-008 | Evidence contract | Bounded source/evidence scopes specified | PASS | GATE_1_2 | No |
| G12-009 | Semantic thesis | Canonical thesis and forbidden collapses specified | PASS | GATE_1_2 | No |
| G12-010 | Required neighbors | Pair, mono, three-color, generic risks specified | PASS | GATE_1_2 | No |
| G12-011 | Provenance | 30 rows; 12 null owner IDs; 0 null hashes | PASS | GATE_1_2 | No |
| G12-012 | Fixture | Missing fixture assigned to Gate 3+4 | PASS | GATE_3_4 | No |
| G12-013 | Collision | Raw/generated arrays readable; required expansions assigned | PASS | GATE_3_4 | No |
| G12-014 | Preview | Source/embedded equality and hash proved | PASS | GATE_3_4 | No |
| G12-015 | Active consumers | Home, Archscry, recruiter, tests, CI proven | PASS | GATE_3_4 | No |
| G12-016 | Historical/debug | Exclusions retained | PASS | GATE_3_4 | No |
| G12-017 | Frozen fields | Protected placement/scoring/native fields identified | PASS | GATE_3_4 | No |
| G12-018 | Candidate scope | Expected failure assigned to remediation | PASS | GATE_5 | No |
| G12-019 | Shared infra | Approved validator unchanged; no infra edit needed | PASS | SHARED_INFRASTRUCTURE | No |
| G12-020 | Governance | No unresolved authority conflict | PASS | PROGRAM_GOVERNANCE | No |

Scorecard: Total controls 20; PASS 20; FAIL 0; UNKNOWN 0; N/A 0. Genuine preflight blockers: 0. Gate 1+2 obligations: completed by this handoff. Gate 3+4 obligations: claim roles/evidence, source-use correction, canonical owners, fixtures, provenance rebuild, generated propagation, collision/neighbor safeguards, preview/consumer validation. Gate 5 obligations: exact candidate creation only after Gate 3+4 passes. Shared-infrastructure findings: none requiring change. Program-governance conflicts: none.

## Gate 3+4 Remediation Contract

1. Assign semantic roles, canonical IDs, bounded evidence locations, and evidence scopes to all 11 claims.
2. Rewrite only `grixis_claim_0007`; retain and scope-correct all other claims.
3. Restrict support/shaping sources to auxiliary, comparator, data-quality, or support-only use; remove them from authoritative proof chains unless a contract-permitted support container owns them.
4. Resolve the missing Scryfall/card support artifact by isolating/removing support-only figure/flavor proof or by separately authorized source/data work.
5. Assign the 12 null provenance canonical owner IDs and preserve zero null hashes.
6. Create `research/fixtures/semantic-readiness/grixis.semantic-fixtures.json` with positive, negative, neighbor, generic, mechanical, aesthetic, preview, consumer, frozen-field, and proof-chain coverage.
7. Preserve frozen placement/scoring/native fields and existing collision IDs/order unless explicitly authorized.
8. Expand required neighbor/generic safeguards through collision guidance or fixture/recruiter/preview tests according to schema precedent.
9. Rebuild generated factions, placement model, recruiter context, identity layers, and semantic-readiness provenance from source.
10. Prove preview source/embedded equality after generation and verify active consumers.
11. Re-run semantic-readiness, fixture, source/generated guardrail, candidate-scope, provenance, JSON parse, and appropriate package tests.
12. Do not create a candidate in Gate 3+4; Gate 5 remains a later distinct object.

## Risks / Uncertainties

No Gate 1+2 blocker remains. The highest remediation risks are support-proof-chain contamination, missing card/support artifact handling, and ensuring required-neighbor coverage is broad enough without mutating frozen lateral targets or shared scoring/runtime infrastructure.

## Tests Run

Read-only diagnostics listed above. No write-producing tests, generators, source acquisition, candidate creation, review, certification, or Excel operations were run.

## Not Touched

No source/claim/evidence/provenance/fixture/generated/placement/scoring/collision/preview/recruiter/runtime/test/validator/schema/package/CI file changed. No Gate 3+4 remediation occurred. No Gate 5 candidate exists. No candidate workflow, independent review, certification, semantically-ready transition, or program-base advancement occurred. VM-525, VM-522 history, VM-523 history, original main, long-running CRIT/Table Talk baseline, DRIFT-017 prototype, VM-542/DRIFT-019 residuals, historical/debug/archive exclusions, and the Excel tracker were untouched.

## Follow-Up Recommendations

Next prompt should be a separate Gate 3+4 Grixis remediation prompt using this handoff as the exact remediation contract. The next suggested agent is Codex implementation under the CRIT-001 Gate 3+4 controls.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`
- `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`

PASS — GRIXIS GATE 3+4 REMEDIATION AUTHORIZED