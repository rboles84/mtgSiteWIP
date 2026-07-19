# VM-522 Bant Pre-Identity Drift Preflight

- Agent name: Codex
- Task requested: VM-522 Bant / WUG pre-identity drift preflight only for CRIT-001; branch setup from exact base, read-only Bant inventory, governance stop record, and governance-only commit.
- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: Bant / WUG
- Exact base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e` (`VM-521 certify Green semantic readiness`)
- Branch: `codex/vm-522-bant-semantic-recovery`
- Worktree: `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`
- Contract version: v1.1
- Decision: STOP - Bant Gate 1+2 is not authorized.

## Setup Inspection

Worktrees inspected:

- `C:/dev/mtgSiteWIP` on `main`, HEAD `bbd9702a9aa429aac3c7b139fb01303898ac88d3`; inspected read-only. Existing dirty docs/audit/kanban/strategy files were observed and not touched.
- `C:/dev/mtgSiteWIP-crit001` on `codex/vm-521-green-semantic-recovery`, HEAD `542015ab4dee8158002eb96dca65ef03fa81904d`; known Table Talk baseline present: modified `docs/handoffs/HANDOFF_INDEX.md` and two untracked Table Talk handoffs.
- `C:/dev/mtgSiteWIP-crit001-baseline-vm509-infra`, detached at `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`, clean.
- `C:/dev/mtgSiteWIP-crit001-drift017` on `codex/crit001-drift017-consumed-preview-scope`, HEAD `4044d7e31a15acc630678967b6b6b2a5f8a29695`; preserved uncommitted files remain isolated and were not entered, run, staged, or modified.
- `C:/dev/mtgSiteWIP-crit001-drift017-certified-audit`, HEAD `e5a7af86fe912ff45cb8001659d310506377848c`, clean.
- `C:/dev/mtgSiteWIP-crit001-green-provenance-rereview`, originally clean at exact base `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`; selected for VM-522.
- `C:/dev/mtgSiteWIP-crit001-ndjson-provenance`, HEAD `aa62ac329c53c00016dcce749b5fea73b145d4ac`, clean.

Branch collision check found no local or remote `codex/vm-522-bant-semantic-recovery` before setup, and no worktree had that branch checked out. `git switch -c codex/vm-522-bant-semantic-recovery fa58e572b6303ba98b7e3015bcfa20e6d251ee6e` succeeded in the clean CRIT worktree. Immediate verification showed current branch exactly `codex/vm-522-bant-semantic-recovery` and HEAD exactly `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

The historically active VM-521 worktree was not used because its HEAD differs from the certified program base and `docs/handoffs/HANDOFF_INDEX.md` differs between the VM-521 stop-line branch and the base. The Table Talk baseline diff was captured before governance edits and remained unchanged in that separate worktree.

## Governing Authority Reviewed

- Root `AGENTS.md` and CRIT-001 drift-control requirement.
- `docs/incidents/CRIT-001-drift-control-template.md`.
- `docs/kanban/board.md` and `docs/kanban/backlog/VM-522-bant-semantic-recovery.md`.
- `docs/handoffs/HANDOFF_INDEX.md` and recent VM-516 through VM-521 handoff/index entries.
- `docs/incidents/CRIT-001-operating-playbook.md`.
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`.
- `docs/reference/semantic-readiness-contract.md`.
- `docs/incidents/CRIT-001-identity-recovery-ledger.json` and `.md`.
- `docs/incidents/CRIT-001-drift-register.md`, including DRIFT-015, DRIFT-016, DRIFT-017, DRIFT-018, and DRIFT-019.
- Approved candidate-scope validator at `research/validate-semantic-candidate-scope.mjs` and regression tests at `research/semantic-candidate-scope-tests.js`.
- Monocolor validator approval chain: candidate `aa1f5cd174a09c7c99e17e3ecf882bf4e03dbdb2`, review `af3d8c6c563b3743f65c2dc8478519707f4785c8`.
- VM-516 Simic, VM-517 White, VM-520 Red, VM-521 Green, VM-542/DRIFT-019 governance records relevant to preview, structural-shape, neighbor, provenance, superseded-candidate, and active-consumer controls.

## Pre-Flight Summary

Recent related work: VM-521 Green is certified semantically_ready from exact candidate `45e323cde853ee5058b71c819f080ab4025597ce` after fresh provenance re-review `ec148486ff2442ff2e3145dd9d45a6d993179766`; Wave 3 monocolors are complete and VM-522 was not started before this branch setup. VM-542/DRIFT-019 resolved stale Green copied-string classification: two inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT`, and `assets/js/newindex-color-matrix.js` plus `assets/js/color-matrix-radar.js` are `HISTORICAL_ARCHIVE` unless new dependency evidence proves otherwise.

Known risks: shared dirty Table Talk hunk risk, original-main pre-existing dirt, isolated DRIFT-017 prototype contamination risk, candidate/review/certification SHA confusion, missing Bant semantic roles, missing Bant fixture, null BANT provenance canonical IDs, and generated proof chains using role-null claims.

Decisions already made: BANT is the internal live expression key; WUG is color-direction metadata only. `bant` is the raw packet ID and candidate-scope raw target accepted by the approved validator. The unapproved DRIFT-017 prototype is not governing authority. Copied text alone does not prove active-consumer status.

Files recently changed by prior work but not touched here: the VM-521 stop-line branch, the Green provenance re-review worktree history, the DRIFT-017 prototype worktree, original main dirt, and the Table Talk handoff/index baseline.

## Exact Identity Target

- Human identity: Bant.
- Color identity: WUG / White, Blue, Green.
- Raw packet ID: `bant`.
- Exact internal key: `BANT`.
- Validator mapping: `RAW_TO_KEY` maps `bant: "BANT"` in `research/build-semantic-readiness-provenance.mjs`; `--identity=bant` and `--identity=BANT` both normalize to BANT. `--identity=WUG` fails with `Unknown identity WUG`.
- Candidate-scope target: `BANT`, raw ID `bant`.
- Key locations: `data/raw-factions/bant/`, `data/factions.json#/factions/BANT`, `data/placement-model.json#/factions/BANT`, `data/identity-layers.json#/expressions/BANT`, `data/factions.json#/identity_layers/expressions/BANT`, `data/semantic-readiness-provenance.json` entries with `identity_key: BANT`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/BANT`.
- Alias state: profile metadata includes `Bant`, `GWU`, `green-white-blue`, `white-blue-green`, `Alara Bant`, and `Bant shard`. Current raw note says WUG must not become an alias, generated top-level key, placement result key, raw-to-key target, or `identity.expression_key`. Current generated key searches found `BANT` only, no `WUG` generated identity key.

## Raw Bant Inventory

Tracked raw packet files:

- `data/raw-factions/bant/bant.claims.json`, authoritative raw claims, sha256 `572a4dfe5510d440d941131e45930883ee104014caec32afd36c3f188d1c7499`.
- `data/raw-factions/bant/bant.sources.json`, authoritative source inventory, sha256 `7f9e58500d994b524dce6d714bf9da0da278e28425f0d73f6bc94359490f22ac`.
- `data/raw-factions/bant/bant.profile.json`, authoritative raw profile/preview-adjacent identity material, sha256 `4c30cee6ece983b6fee55b7a916d38bb20d170fe091c0c3619552820d34b5e3a`.
- `data/raw-factions/bant/bant.placement.json`, authoritative raw placement/collision/scoring material, sha256 `ccbfc1cccfdbbe2c27298789f6706f352503d5af5b4f50bca10ef5c521742521`.
- `data/raw-factions/bant/bant.changelog.json`, supporting governance/source-history log, sha256 `0e5f1c061c55237e61e20b7948229f8609d54debb1a30613fb06522968039e38`.

Other Bant-specific surfaces inventoried: `data/lore/factions/bant.json`, `assets/img/identity-hero/bant.webp`, `docs/research/bant/`, `docs/architecture/colors/bant/identity.md`, `docs/architecture/colors/bant/metaphysics.md`, and `docs/research/archive/bant-pre-push-cleanup/`.

No untracked VM-522 or Bant implementation work was found in the selected worktree before governance edits.

## Source Inventory

Stored Bant sources: 21. Source-role counts: `claim-bearing` 3, `support-only` 10, `shaping-only` 7, `discovery-only` 1. Duplicate source IDs: none. Null source IDs: 0. Local repository locators that mechanically exist include the Bant ledgers/dossier/audit, Rosewater local capture, architecture docs, manual fill, workbook, lore reference docx, and lore source packet. URL locators were not fetched. Locator strings of the form `Referenced by ...` are not mechanically resolvable files by themselves and require source-chain inspection later. `src_wotc_alara_plane_page` is `discovery-only` yet referenced by existing claims, which remains an inventory finding only here.

## Stored Claim-Role Counts

Bant claims: 21 declared and 21 actual.

Stored roles by current fields (`semantic_role`, `claim_role`, `role`, or `evidence_role`): substantive 0, support 0, discovery 0, unclassified/null role 21, unknown non-null values 0.

Claim type counts: identity 2, design_identity 2, mechanics 1, mechanics_interpretation 1, structure 1, figure 1, geography 2, location_symbol 1, figures 1, asha_boundary 1, elspeth_boundary 1, timeline 1, timeline_boundary 1, commander_expression 1, commander_suppression 1, placement_separator 1, runtime_boundary 1, mubin_sequence 1.

Duplicate claim IDs: none. Null claim IDs: 0. Claims with no source link: 0. Claims with multiple source links: 21. Claims with `evidence_locations`: 0. Claims with malformed evidence pointers: all 21 lack evidence-location objects and bounded evidence pointers under Contract v1.1 expectations.

## Evidence-Scope State

Every claim currently has `claim_id` and `source_ids`, but no stored semantic role, no `evidence_locations`, no `evidence_scope`, no bounded excerpt/locator chain at the claim level, and no fixture reference. Generated and provenance consumers reference Bant claim IDs as semantic proof while the raw claim-role map returns null/unclassified for all 21 claims.

Generated proof reference sites counted during parsed inspection: `data/factions.json#/factions/BANT` 29 sites, `data/placement-model.json#/factions/BANT` 8 sites, and BANT provenance 49 evidence-claim reference sites.

## Canonical IDs, Hashes, Pointers, Duplicate And Null-Key State

BANT provenance entries: 49. Unique non-null canonical IDs: 32. Duplicate non-null canonical IDs within Bant: none. Null canonical IDs: 17 entries at provenance indexes `70`, `76`, `77`, `78`, `79`, `80`, `92`, `93`, `94`, `95`, `96`, `97`, `98`, `99`, `100`, `101`, and `102`.

Generated consumers declared by BANT provenance: `data/factions.json#/factions/BANT`, `data/placement-model.json#/factions/BANT`, and `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/BANT`.

Generated key search found BANT only in generated identity maps. No generated `WUG`, lowercase `bant`, empty, or null identity key was found in the BANT key slots inspected. Cross-identity duplication is permitted only where schema and source authority allow it; no cross-identity claim-ID duplication was adjudicated in this preflight.

## Fixture And Proof-Chain Locator State

Expected fixture path: `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`. Current fixture state: missing. No fixture refs are declared in BANT provenance. This is a required structure under Contract v1.1 and is a blocking failure for authorization.

Current proof-chain examples include `signal_bant_0001`, `signal_bant_0002`, `signal_bant_0003`, `collision_bant_azorius_draft`, and `collision_bant_selesnya_draft` in `data/raw-factions/bant/bant.placement.json`, each with content hashes and generated consumers in `data/factions.json`, `data/placement-model.json`, and recruiter context. Because the fixture is missing and all stored claim roles are null, exact-chain equality cannot be established. This is FAIL, not N/A.

## Frozen Placement And Scoring Values

Current frozen raw placement values to preserve in any later remediation/candidate:

- Color identity: `W`, `U`, `G`.
- Placement axes and positions: `axis_communal_order_vs_private_excellence` 82 Medium; `axis_champion_focus_vs_go_wide_belonging` 78 Medium; `axis_refined_order_vs_instinctive_growth` 74 Medium; `axis_protection_vs_prison` 70 Medium; `axis_living_community_vs_artificial_perfection` 76 Medium.
- Required positive evidence terms: Bant, exalted, champion, sigil, honor, Rafiq, Valeron, Akrasa, Great Conduit, community, protection, refinement.
- Required positive min hits: 3.
- Broad match penalty: 0.18.
- Suppress list: hard-lock stax, prison enchantments, generic three-color value, Simic ramp, Selesnya tokens, Naya big creatures, Esper mill-control, mass reanimation.
- Strengthen list: supported champion, public honor, exalted combat, sigil-ranked worth, creature-forward value, community protection, Bant-specific card or lore anchors.
- Collision suppressions: azorius_prison_without_creature_community_frame, selesnya_go_wide_without_blue_refinement, simic_growth_without_white_order, naya_big_creature_aggression, esper_artifact_mill_control, grixis_private_extraction, jund_predatory_force.
- False-positive guardrail: require champion-order evidence cluster; do not score highly from color identity or generic value alone.
- Placement quality: overall confidence Medium source-confidence with live pilot runtime calibration from VM-160; `calibration_tuning_status` live_pilot; `last_placement_ready_pass` VM-160.

Generated placement model currently stores generated calibration axes as an object-shaped generated model section, not the same array shape as raw `placement_axes`. This is an inventory fact, not a remediation action.

## Collision Guidance And Native IDs

Raw collision guidance shape: array. Approved validator supports arrays and object-with-`pairs`; Bant raw shape is compatible with the approved validator's documented shapes.

Raw collision order: Azorius, Selesnya, Simic, Naya, Esper, Grixis, Jund. Generated collision order: Azorius/WU, Selesnya/WG, Simic/UG, Esper/ESPER, Grixis/GRIXIS. Generated lateral inhibition targets: `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `ABZAN`, `TEMUR`, `SULTAI`.

Ordering/equality result: raw and generated collision ordering are not equal. Raw has Naya and Jund entries not present in generated collision guidance; generated lateral targets include ABZAN, TEMUR, and SULTAI not present as raw collision entries. This was not changed.

Native IDs inventoried include raw `event_bant_0001` through `event_bant_0004`, `char_bant_*`, `axis_*`, `signal_bant_0001` through `signal_bant_0003`, `value_bant_0001` through `value_bant_0003`, `q_bant_0001` through `q_bant_0003`, and collision IDs above. No native IDs were created or replaced.

## Preview Source And Active Consumers

Authoritative preview source: `data/identity-layers.json#/expressions/BANT/preview_text`, hash `421a262a9213317d559fc0bcd85e3ec04f2f5e78990a73d558209d5415ba188c`.

Embedded generated preview: `data/factions.json#/identity_layers/expressions/BANT/preview_text`, hash `421a262a9213317d559fc0bcd85e3ec04f2f5e78990a73d558209d5415ba188c`.

Preview source and embedded global copy are structurally equal. There is no local `data/factions.json#/factions/BANT/preview_text` field in the parsed object. Equality alone is not enough for semantic approval under DRIFT-015/DRIFT-017.

Preview text currently stored: `Bant treats excellence as honorable when it remains answerable to the whole. Its order is not merely procedure; it is public trust, refined discipline, and a living community choosing which champion can carry its hope.`

Proven active generated/provenance consumers at this preflight stage: `data/factions.json#/factions/BANT`, `data/placement-model.json#/factions/BANT`, `supabase/functions/guild-recruiter/faction-context.ts#FACTION_CONTEXT/BANT`, and the source/embedded preview path pair above. Later Gate 1+2 must prove any runtime HTML/JS, build, package, test, deployment, or export dependency before classifying copied Bant text as active.

The Green-era debug/inspection/archive classifications remain unchanged: the two workbook inspect NDJSON files are `DEBUG_INSPECTION_ARTIFACT`; `assets/js/newindex-color-matrix.js` and `assets/js/color-matrix-radar.js` are `HISTORICAL_ARCHIVE`; none were edited or reclassified.

## DRIFT Controls

- DRIFT-015 preview ownership/propagation: FAIL for authorization. Ownership and equality are identified, but semantic alignment cannot be approved at preflight because proof-chain roles are null and active-consumer semantic alignment still requires later audit.
- DRIFT-016 structural-shape compatibility: PARTIAL PASS / BLOCKING FAIL overall. Raw Bant collision shape is an array supported by the approved validator, and WUG is rejected as an unknown identity. However the exact no-change candidate-scope run for BANT fails due proof-chain role contamination.
- DRIFT-017 active consumed-surface alignment: UNKNOWN/FAIL for authorization. Generated/provenance consumers are known, but semantic alignment cannot be established from copied/equal text, and proof-chain null roles block the validator.
- DRIFT-019 stale non-active copies: PASS as an exclusion control. No new direct dependency evidence contradicted the Green-era classifications; excluded historical/debug files were not cleaned or updated.

## Required Neighbor Set

Gate 1+2, if later authorized by a separate prompt after blockers are addressed, must test at least: Selesnya / WG, Simic / UG, Azorius / WU, Green / G, White / W, Blue / U, Naya, Esper, Temur, Abzan, Jeskai, Five-color / WUBRG, generic good-stuff, and generic balance. Direct repository evidence adds Grixis and Jund from current raw collision guidance, and ABZAN/TEMUR/SULTAI from generated lateral targets. Existing Bant raw boundary state is present for Azorius, Selesnya, Simic, Naya, Esper, Grixis, and Jund; absent or unresolved for mono W/U/G, Jeskai, WUBRG, generic good-stuff, generic balance, Abzan, Temur, and Sultai unless generated lateral targets are later treated as sufficient boundary evidence.

## Bant Semantic-Risk Declaration

Future Gate 1+2 must test whether Bant collapses into Selesnya/WG, Simic/UG, Azorius/WU, Green, White, Blue, Naya, Esper, Temur, Abzan, Jeskai, five-color good-stuff, generic balance, generic order, generic community, generic nature, generic knowledge, generic growth, generic harmony, generic hierarchy, generic civilization, generic perfection, generic protection, generic wisdom, generic peace, and generic cooperation. It must not accept Bant merely as harmony, community, nature, order, civilization, hierarchy, protection, wisdom, growth, peace, cooperation, the best of White/Blue/Green, creature mechanics, exalted mechanics, angels, knights, beasts, or shard aesthetics.

Current affected fields: `bant_claim_0002`, `bant_claim_0003`, `bant_claim_0004`, `bant_claim_0005`, `bant_claim_0006`, `bant_claim_0017`, `bant_claim_0018`, `bant_claim_0019`, raw placement axes, raw/generated collision guidance, preview text, and generated/recruiter consumers. Current state: unresolved because stored roles and evidence scopes are absent.

## Workflow Comparison

- VM-516 Simic precedent: preflight can pass with missing fixture only when no FAIL/UNKNOWN control remains and future exact-chain state is clearly bounded; Bant differs because approved validator currently fails on null-role proof chains.
- VM-517 White precedent: structural-shape validator transition requires no-crash compatibility with the approved shared validator; Bant raw array shape is supported, but full BANT candidate-scope check still fails.
- VM-520 Red precedent: prompt-required neighbor coverage can block approval even when other controls pass; Bant has required-neighbor gaps beyond existing raw/generated guidance.
- VM-521 Green precedent: provenance/review/certification must reconcile active-consumer classification, exact candidate scope, preview exceptions, superseded candidate preservation, and fixture equality; Bant lacks fixture and substantive role baseline.
- Three-color/shard precedent: historical Bant VM-157 through VM-194 records exist, but no completed CRIT-001 three-color drift preflight was found before VM-522. N/A - no completed three-color preflight found; supported by search results over VM-522/Wave 4 records and current ledger state.

## Validation Matrix And Scorecard

Scorecard: 20 controls total; PASS 10; FAIL 8; UNKNOWN 2; N/A 0. Blocking controls: stored claim roles, evidence scopes, null canonical IDs, missing fixture, generated proof-chain contamination, raw/generated collision mismatch, preview semantic alignment, active-consumer proof, and required-neighbor gaps. Non-blocking observations: branch setup succeeded; BANT key target proven; raw collision shape is validator-supported; preview source and embedded global copy are equal; WUG is not accepted as an identity key.

Key control results:

- PASS: exact base exists, branch collision absent, branch from exact base, original main untouched, Table Talk preserved, BANT target proven, source inventory complete, provenance count recorded, collision shape supported, preview ownership/equality recorded, governance scope clean.
- FAIL: 21 stored null claim roles; no claim evidence locations/evidence scopes; 17 null BANT provenance canonical IDs; missing Bant fixture; approved validator fails proof-chain contamination; raw/generated collision ordering mismatch; unresolved/absent required-neighbor coverage.
- UNKNOWN: preview semantic alignment and runtime active-consumer dependency proof.

## Commands Run

- `git worktree list --porcelain`: exit 0.
- `git status --short --branch` in selected VM-522 worktree before branch setup: exit 0, clean at base.
- `git branch --list codex/vm-522-bant-semantic-recovery`: exit 0, no output before setup.
- `git branch -r --list origin/codex/vm-522-bant-semantic-recovery`: exit 0, no output before setup.
- `git show --no-patch --format=%H%n%P%n%s fa58e572...`: exit 0.
- `git switch -c codex/vm-522-bant-semantic-recovery fa58e572...`: exit 0.
- `git rev-parse HEAD`: exit 0, exact `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.
- `node research/validate-semantic-candidate-scope.mjs --identity=bant --base=fa58e572... --target=HEAD`: exit 1; proof-chain role contamination failures.
- `node research/validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572... --target=HEAD`: exit 1; same proof-chain role contamination failures.
- `node research/validate-semantic-candidate-scope.mjs --identity=WUG --base=fa58e572... --target=HEAD`: exit 1; `Unknown identity WUG`.
- Parsed JSON inventory via Node stdin: exit 0 after shape-aware rerun.
- Failed inventory attempt: exit 1 because generated `placement_axes` shape was object, not array; rerun handled this shape.

## Files Changed

Governance-only files changed by this stop record:

- `docs/kanban/board.md`.
- `docs/kanban/blocked/VM-522-bant-semantic-recovery.md` moved from backlog and updated.
- `docs/handoffs/HANDOFF_INDEX.md`.
- `docs/handoffs/2026-07-19-1034-codex-vm522-bant-drift-preflight-stop.md`.

No Bant semantic, raw, generated, fixture, provenance, preview, runtime, recruiter, source, test, schema, validator, builder, scoring, calibration, candidate, review, or certification file was edited. No fixture was created. No candidate was created. No Gate 1+2 adjudication occurred. No remediation occurred. No review or certification occurred. VM-523 was untouched. Original main was untouched. The external Excel tracker was untouched. The program base was not advanced and remains `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.

## Follow-Up Recommendations

Next suggested agent: Planning Architect or Kanban Steward only after ChatGPT supplies a follow-up prompt. The next prompt should not authorize Bant Gate 1+2 until the campaign owner decides whether the preflight blocker should be handled by a separate governance/infrastructure authorization or by a new VM-522 setup rerun. Any later semantic work must begin from the exact recorded branch/head and must not use the isolated DRIFT-017 prototype as authority.

## Not Touched

- `C:\dev\mtgSiteWIP` original main worktree.
- `C:\dev\mtgSiteWIP-crit001` VM-521 stop-line/Table Talk worktree dirt.
- `C:\dev\mtgSiteWIP-crit001-drift017` prototype worktree and its uncommitted files.
- External Excel tracker.
- VM-523 and all later Wave 4 identities.
- Bant semantic/data/generated/runtime/fixture/provenance files.

STOP — BANT GATE 1+2 NOT AUTHORIZED
