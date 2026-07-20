# VM-522 Bant Gate 3+4 Semantic Remediation

Agent name: Codex
Task requested: Implement the VM-522 Bant Gate 3+4 remediation contract from Gate 1+2, validate the remediated state, and decide whether Gate 5 candidate creation is authorized.

## Program And Identity

- Program: CRIT-001 - 37-Identity Semantic Recovery Program
- Identity: VM-522 - Bant / BANT / WUG
- Branch: `codex/vm-522-bant-semantic-recovery`
- Worktree: `C:\dev\mtgSiteWIP-crit001-green-provenance-rereview`
- Program base: `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`
- Starting HEAD: `d135a7b233e38097857f466f71b1a9fae234553e`
- Gate 1+2 authority handoff: `docs/handoffs/2026-07-19-1944-codex-vm522-bant-gate1-gate2.md`
- Final remediation HEAD: `b466cddb4618b1e2d7c897c15f7513a6d2db08b0`
- Decision: `PASS — BANT GATE 5 CANDIDATE CREATION AUTHORIZED`

## Safety Verification

- Current branch remained `codex/vm-522-bant-semantic-recovery`.
- Starting HEAD was `d135a7b233e38097857f466f71b1a9fae234553e`.
- Implementation commits descend from `d135a7b233e38097857f466f71b1a9fae234553e`, which descends through preserved VM-522 governance records to program base `fa58e572b6303ba98b7e3015bcfa20e6d251ee6e`.
- Original main `C:\dev\mtgSiteWIP` was inspected only by `git -C ... status`; it was not entered or modified.
- DRIFT-017 prototype `C:\dev\mtgSiteWIP-crit001-drift017` was inspected only by `git -C ... status`; it was not entered or modified.
- Table Talk baseline in `C:\dev\mtgSiteWIP-crit001` was rechecked and preserved.
- Excel tracker was not opened, edited, staged, or committed.
- VM-523 was untouched.
- No Gate 5 candidate was created. No candidate workflow, independent review, certification, or program-base advancement occurred.

## Pre-Remediation Snapshot

- Claims: 21 total; 21 unclassified, 0 substantive, 0 support, 0 discovery.
- Evidence locations: 0 stored claim evidence locations.
- Fixture: `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` absent.
- Candidate-scope diagnostic: failing from unclassified Bant claim references and proof-chain contamination.
- Semantic-readiness diagnostic: failing from missing semantic roles, missing guidance evidence, stale provenance, and missing fixture.
- Provenance freshness: stale before remediation.
- Raw collision order: `azorius_senate`, `selesnya_conclave`, `simic_combine`, `naya`, `esper`, `grixis`, `jund`.
- Generated lateral targets: `WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `ABZAN`, `TEMUR`, `SULTAI`.

## Execution Checklist

| Area | Gate 1+2 required final state | Implementation result | Validation result |
| --- | --- | --- | --- |
| Claim roles | 16 substantive, 5 support, 0 unclassified | Implemented in `bant.claims.json` | PASS |
| Claim text | Narrow/rewrite `0002`, `0010`, `0019`; preserve scoped retained claims | Implemented without new source acquisition | PASS |
| Support isolation | `0012`, `0017`, `0018`, `0020`, `0021` support only | Removed from semantic proof chains and recorded as auxiliary support | PASS |
| Evidence locations | Bounded evidence for each substantive claim | Added evidence locations and source chains | PASS |
| Source use | Discovery/support-only sources excluded from authoritative proof | `src_wotc_alara_plane_page` remains excluded; support records isolated | PASS |
| Profile packet | Bant semantic packet avoids generic overfit and support contamination | Profile summaries, views, mechanics, key figures cleaned | PASS |
| Placement packet | Guidance, discriminator questions, and proof chains use substantive claims only | Placement claim chains and semantic guidance evidence repaired | PASS |
| Collision guidance | Preserve existing rows, add required boundaries, keep lateral target set stable | Existing draft IDs retained; active Gate 3 rows added for Naya/Jund and required neighbors | PASS |
| Native IDs | Existing native IDs retained | Existing draft collision IDs retained as dormant native-ID rows; generated active rows use new IDs | PASS |
| Fixture | Create Bant fixture with required neighbor/collapse-risk coverage | `research/fixtures/semantic-readiness/bant.semantic-fixtures.json` created | PASS |
| Generated outputs | Regenerate derived surfaces from raw Bant inputs | `data/factions.json`, `data/placement-model.json`, recruiter context, provenance refreshed | PASS |
| Candidate scope | Approved validator must pass against remediation HEAD | `node research/validate-semantic-candidate-scope.mjs ... --target=HEAD` passes at `b466cdd` | PASS |
| DRIFT-015 | Authoritative preview/embedded copies remain aligned | No identity-layer source edit needed; generated embedded copies remain source-aligned | PASS |
| DRIFT-016 | Structural shape compatible with current validators | Candidate-scope tests and readiness validator pass | PASS |
| DRIFT-017 | Active consumed surfaces regenerated or proven aligned | Home/Archscry generated data and recruiter context refreshed; tests/CI pass | PASS |

## Final Claim Disposition

Final claim count: 21 total.

- `substantive_claim`: 16
- `support_record`: 5
- `discovery_record`: 0
- `unclassified`: 0

Substantive: `bant_claim_0001`, `0002`, `0003`, `0004`, `0005`, `0006`, `0007`, `0008`, `0009`, `0010`, `0011`, `0013`, `0014`, `0015`, `0016`, `0019`.

Support only: `bant_claim_0012`, `0017`, `0018`, `0020`, `0021`.

## Final Bant Semantic Thesis

Bant is a White-centered Bant shard identity where excellence is legitimate only when it remains public, honorable, refined, and accountable to the living community that raises a supported champion. White contributes moral order, public trust, and group-before-self accountability. Blue contributes refinement, planning, and disciplined potential. Green contributes living community, interdependence, and embodied support. All three are required: without White it collapses into growth or optimization, without Blue into generic communal/nature belonging, and without Green into procedure, prison, or perfected control.

Operational definition: select Bant only when the prompt centers public champion support, sigil-ranked recognition, refined communal protection, and Bant shard anchors; suppress Bant for color identity, good-stuff value, peace, harmony, order, growth, protection, knowledge, creature mechanics, exalted, angels, knights, beasts, shard aesthetics, or "best of White, Blue, and Green" by themselves.

## Required Neighbor Result

Implemented in profile views, placement guidance, collision guidance where targetable, and fixtures:

Selesnya/WG, Simic/UG, Azorius/WU, Green/G, White/W, Blue/U, Naya, Esper, Temur, Abzan, Jeskai, Grixis, Jund, Sultai, Five-color/WUBRG, generic good-stuff, generic balance, and generic overfit.

## Collision Result

Raw collision order after remediation:

1. `collision_bant_azorius_draft` -> `azorius_senate`, non-lateral
2. `collision_bant_selesnya_draft` -> `selesnya_conclave`, non-lateral
3. `collision_bant_simic_draft` -> `simic_combine`, non-lateral
4. `collision_bant_naya_draft` -> `naya`, dormant native-ID retention
5. `collision_bant_esper_draft` -> `esper`, non-lateral
6. `collision_bant_grixis_draft` -> `grixis`, non-lateral
7. `collision_bant_jund_draft` -> `jund`, dormant native-ID retention
8. `collision_bant_naya_gate3` -> `naya`, non-lateral active generated row
9. `collision_bant_jund_gate3` -> `jund`, non-lateral active generated row
10. `collision_bant_abzan_gate3` -> `abzan`, non-lateral
11. `collision_bant_temur_gate3` -> `temur`, non-lateral
12. `collision_bant_sultai_gate3` -> `sultai`, non-lateral
13. `collision_bant_jeskai_gate3` -> `jeskai`, non-lateral
14. `collision_bant_white_gate3` -> `white`, non-lateral
15. `collision_bant_blue_gate3` -> `blue`, non-lateral
16. `collision_bant_green_gate3` -> `green`, non-lateral
17. `collision_bant_wubrg_gate3` -> `wubrg`, non-lateral

Generated collision order after remediation:

`WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `NAYA`, `JUND`, `ABZAN`, `TEMUR`, `SULTAI`, `JESKAI`, `W`, `U`, `G`, `WUBRG`.

Generated lateral targets remain unchanged:

`WU`, `WG`, `UG`, `ESPER`, `GRIXIS`, `ABZAN`, `TEMUR`, `SULTAI`.

## Frozen Fields

Preserved placement/scoring fields:

- `faction_id`: `bant`
- `faction_name`: `Bant`
- `color_identity`: `["W","U","G"]`
- `required_positive_evidence_terms`: `Bant`, `exalted`, `champion`, `sigil`, `honor`, `Rafiq`, `Valeron`, `Akrasa`, `Great Conduit`, `community`, `protection`, `refinement`
- `required_positive_min_hits`: `3`
- `broad_match_penalty`: `0.18`
- `overselection_reason`, suppression/strengthen lists, collision suppressions, false-positive guardrail, and smoke-test note preserved.
- Axis IDs and confidence retained: `axis_communal_order_vs_private_excellence`, `axis_champion_focus_vs_go_wide_belonging`, `axis_refined_order_vs_instinctive_growth`, `axis_protection_vs_prison`, `axis_living_community_vs_artificial_perfection`.

## Implementation Commits

1. `765f0a9c154e3c49a9d973e75994a0867eb18652` - `VM-522: remediate Bant semantic claims`
   - `data/factions.json`
   - `data/placement-model.json`
   - `data/raw-factions/bant/bant.claims.json`
   - `data/raw-factions/bant/bant.placement.json`
   - `data/raw-factions/bant/bant.profile.json`
   - `data/semantic-readiness-provenance.json`
   - `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`
   - `supabase/functions/guild-recruiter/faction-context.ts`
2. `799627ec0d1ebbc927b84f63ce5634c633125e24` - `VM-522: preserve Bant candidate-scope invariants`
   - `data/placement-model.json`
   - `data/raw-factions/bant/bant.claims.json`
   - `data/raw-factions/bant/bant.placement.json`
   - `data/semantic-readiness-provenance.json`
3. `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` - `VM-522: normalize added Bant collision rows`
   - `data/placement-model.json`
   - `data/raw-factions/bant/bant.placement.json`

No implementation commit is a Gate 5 candidate.

## Generated Outputs

Generator command:

- `node research\build-faction-artifacts.mjs` -> exit 0; wrote `data\placement-model.json`, `data\placement-model.schema.json`, `supabase\functions\guild-recruiter\faction-context.ts`, and `data\semantic-readiness-provenance.json`. The schema file had no content change and was not staged.

Modified generated/consumer outputs:

- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Active consumer classifications remain:

- Home: `assets/js/home.js` fetches generated identity/faction data.
- Archscry: `assets/js/index.js` loads generated faction and placement data.
- Recruiter: `supabase/functions/guild-recruiter/index.ts` imports generated `FACTION_CONTEXT`.
- Tests/CI: repository tests import generated data and candidate-scope/readiness validators.

Historical/debug/inspection/archive exclusions were not modified:

- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced_identity_fix.xlsx.inspect.ndjson` - `DEBUG_INSPECTION_ARTIFACT`
- `outputs/mtgdata-v3-enhanced/MTGDataV3_Enhanced.xlsx.inspect.ndjson` - `DEBUG_INSPECTION_ARTIFACT`
- `assets/js/newindex-color-matrix.js` - `HISTORICAL_ARCHIVE`
- `assets/js/color-matrix-radar.js` - `HISTORICAL_ARCHIVE`

## Validation Commands

- `node research\validate-semantic-candidate-scope.mjs --identity=BANT --base=fa58e572b6303ba98b7e3015bcfa20e6d251ee6e --target=HEAD` -> exit 0; `Semantic candidate scope passed for BANT: fa58e572b6303ba98b7e3015bcfa20e6d251ee6e..HEAD`
- `node research\validate-semantic-readiness.mjs --targets=BANT` -> exit 0; `Semantic readiness validation passed for BANT.`
- `node research\build-semantic-readiness-provenance.mjs --check` -> exit 0; `Verified 1890 semantic provenance entries.`
- `node research\audit-semantic-readiness.mjs --targets=BANT` -> exit 0; BANT audit reports 21 claims, 16 substantive, 5 support, 0 unclassified, 76 reference sites, 0 missing references, 0 invalid support links.
- `node research\semantic-candidate-scope-tests.js` -> exit 0; semantic candidate scope tests passed.
- `npm.cmd test` -> exit 0; full repository suite passed, including adaptive placement, live Gate bias, semantic readiness contract, Maze query, parser, builder, translation, metadata, precon, dossier, and presentation snapshot tests.
- `npm.cmd run test:parser` -> exit 0; 226 parser cases passed.

Initial expected diagnostics before remediation:

- `node research\validate-semantic-candidate-scope.mjs ... --target=HEAD` -> exit 1 before implementation; failed on unclassified Bant proof-chain contamination.
- `node research\validate-semantic-readiness.mjs --targets=BANT` -> exit 1 before implementation; failed on missing roles, missing fixture, stale provenance, and missing guidance evidence.
- `node research\build-semantic-readiness-provenance.mjs --check` -> exit 1 before implementation; stale provenance.

## Gate 3+4 Scorecard

| Control | Result |
| --- | --- |
| Starting-state safety | PASS |
| Gate 1+2 contract followed without re-adjudication | PASS |
| Claim roles implemented | PASS |
| Evidence scopes implemented | PASS |
| Support/discovery isolation | PASS |
| Source acquisition avoided | PASS |
| Canonical/native IDs retained | PASS |
| Fixture created and validated | PASS |
| Collision guidance reconciled | PASS |
| Generated lateral targets stable | PASS |
| Generated outputs refreshed | PASS |
| Semantic provenance fresh | PASS |
| Candidate-scope validator passed | PASS |
| Semantic-readiness validator passed | PASS |
| DRIFT-015 | PASS |
| DRIFT-016 | PASS |
| DRIFT-017 | PASS |
| Frozen placement/scoring fields preserved | PASS |
| Non-Bant generated isolation | PASS |
| Historical/debug/archive exclusions untouched | PASS |
| Original main untouched | PASS |
| DRIFT-017 prototype untouched | PASS |
| Table Talk baseline preserved | PASS |
| Excel/VM-523 untouched | PASS |

Scorecard total: 24. PASS: 24. FAIL: 0. UNKNOWN: 0. N/A: 0.

## Remaining Gate 5 Obligations

Gate 5 candidate creation is now authorized but not performed. The next authorized step is a separate Gate 5 candidate creation workflow that must create an exact candidate SHA, record candidate workflow evidence, and await independent exact-SHA review. Certification remains unauthorized until an independently approved exact candidate is certified in a later prompt.

## Files Changed

Implementation files changed by the remediation commits:

- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/bant/bant.claims.json`
- `data/raw-factions/bant/bant.placement.json`
- `data/raw-factions/bant/bant.profile.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/bant.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Governance files changed by this handoff commit:

- `docs/handoffs/2026-07-19-2048-codex-vm522-bant-gate3-gate4.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-522-bant-semantic-recovery.md`

## Not Touched

- No Gate 5 candidate created.
- No candidate workflow record created.
- No independent review performed.
- No certification performed.
- No program-base advancement.
- No VM-523 work.
- No Excel tracker work.
- No original-main edits.
- No DRIFT-017 prototype edits.
- No Table Talk baseline edits.
- No historical/debug/inspection/archive cleanup.

## Final Decision

PASS — BANT GATE 5 CANDIDATE CREATION AUTHORIZED
