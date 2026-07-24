# VM-532 Yore Gate 1+2 Read-Only Semantic Audit

## Agent Name

Codex

## Task Requested

Resume VM-532 Yore from committed drift preflight `b9c2a40f473cc9f5c05ba32a5fa7a4027b0afd42`, perform the official Gate 1+2 read-only semantic audit, record the remediation boundary, and update governance only before any semantic remediation, generated rebuild, fixture creation, candidate creation, independent review, certification, VM-533 work, Excel, cleanup, push, PR, or merge.

## Decision

Gate 2 disposition: READY FOR GATE 3 REMEDIATION.

Gate 3+4 remediation is authorized for `YORE` only after this governance commit. This record is not the semantic candidate.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-23-1646-codex-vm532-yore-drift-preflight.md`
- `docs/handoffs/2026-07-23-0825-codex-vm531-jeskai-gate1-gate2.md`
- `docs/handoffs/2026-07-23-0937-codex-vm531-jeskai-candidate-workflow.md`
- `docs/handoffs/2026-07-23-1215-codex-vm531-jeskai-certification.md`
- `docs/handoffs/2026-06-02-1622-codex-vm243-yore-non-live-raw-packet.md`
- `docs/handoffs/2026-06-02-2049-codex-vm244-yore-review-gate.md`
- `docs/handoffs/2026-06-02-2211-codex-vm245-yore-controlled-runtime-promotion.md`
- `docs/handoffs/2026-06-09-0820-codex-vm301-yore-source-first-authoring.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-532-yore-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `research/audit-semantic-readiness.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/build-faction-artifacts.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `research/semantic-readiness-lib.mjs`
- `data/raw-factions/yore/yore.claims.json`
- `data/raw-factions/yore/yore.sources.json`
- `data/raw-factions/yore/yore.profile.json`
- `data/raw-factions/yore/yore.placement.json`
- `data/raw-factions/yore/yore.changelog.json`
- `docs/research/yore/yore-evidence-ledger.md`
- `docs/research/yore/yore-source-ledger.md`
- `docs/research/yore/yore-lore-source-packet.md`
- `docs/architecture/colors/yore/identity.md`
- `docs/architecture/colors/yore/metaphysics.md`
- `docs/research/canon/canon-inventory-four-color-reference-audit.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `assets/js/identity-layers.js`

## Files Changed

- `docs/handoffs/2026-07-23-1818-codex-vm532-yore-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-532-yore-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

No semantic source data, generated data, fixtures, provenance candidate content, validator/test implementation, package, lockfile, CI, parser, placement implementation, faction-context implementation, runtime code, Excel, VM-533 work, push, PR, merge, or cleanup file changed in this Gate 1+2 governance commit.

## What Changed

Governance now records the Yore claim-role disposition, source hierarchy, alias/display authority, required-neighbor set, frozen placement and preview baselines, fixture/provenance contract, active generated consumer inventory, inherited warnings, and exact remediation obligations for Gate 3+4.

## Why It Changed

CRIT-001 requires Gate 1+2 to establish a bounded remediation contract before implementation. Yore has enough existing repository-authorized evidence for remediation, but it is not semantically ready until roles, bounded evidence locations, fixture coverage, provenance owner IDs, generated proof chains, preview handling, and support/discovery isolation are repaired.

## Starting State

- Worktree: `C:\dev\mtgSiteWIP-crit001-vm532-yore`
- Branch: `codex/vm-532-yore-semantic-recovery`
- Starting HEAD / drift preflight: `b9c2a40f473cc9f5c05ba32a5fa7a4027b0afd42`
- Parent / program base: `4529f8615785743d074e3060e13f990941c1a458`
- Status before governance edits: clean aside from Git user-ignore permission warnings emitted by status
- VM-533 before/after: backlog, not started, untouched
- Program base before/after: `4529f8615785743d074e3060e13f990941c1a458`
- Certified count before/after: 30 of 37
- Wave 5 before/after: 0 of 5 certified, VM-532 in progress

## Pre-Flight Summary

Recent related work: VM-531 Jeskai is certified from exact approved candidate `9ac575a89eca55f8bc3522083e51689f29ebd262`; VM-532 drift preflight `b9c2a40f473cc9f5c05ba32a5fa7a4027b0afd42` revalidated the old-base Yore shadow audit against current program base `4529f8615785743d074e3060e13f990941c1a458` and authorized this Gate 1+2 audit only.

Current known risks: all five Yore claims are unclassified, no Yore fixture exists, four Yore-owned profile provenance rows have null canonical IDs, generated proof chains cite unclassified claims, raw preview is disabled while identity-layer generated preview is enabled, and Glint/Witch collision references include non-Yore claim IDs that fail Yore-scope validation.

Relevant decisions already made: `YORE` is canonical; display name is `Yore / Artifice`; display color order is `WUBR`; `YORE` is the only accepted identity alias. `WUBR` and all same-color permutations remain metadata-query-only and must not become candidate aliases, route keys, fixture keys, Home preview keys, Maze keys, Supabase keys, schema keys, or public interfaces.

What should not be touched: VM-533/Glint, original main, Table Talk, DRIFT-017 prototype files, Green provenance, VM-526/VM-529 dirty worktrees, Jeskai worktrees, Excel, package/lockfile/CI/parser/placement runtime/schema/generator implementation, Hall/Crucible/scoring/inhibition/scheduling/global recruiter tuning, and route/public alias behavior.

## Identity And Alias Authority

- Canonical identity key: `YORE`.
- Raw ID: `yore`.
- Display name: `Yore / Artifice`.
- Display color order: `WUBR`; display colors `W`, `U`, `B`, `R`.
- Accepted candidate identity alias: `YORE` only.
- `data/identity-layers.json#/expressions/YORE` exists with aliases `[YORE]`, active preview source, routing color identity `WUBR`, suppressed directory links, and display colors `W`, `U`, `B`, `R`.
- `data/raw-factions/yore/yore.placement.json#/color_identity/metadata_query_only_forms` records all uppercase and lowercase WUBR permutations as metadata-query-only.
- `WUBR` and every WUBR permutation: unsupported aliases; exact candidate-scope probes must reject them as unknown identities unless later committed authority changes the rule.

## Source And Claim Audit

Current `yore.sources.json` has 13 source records: 3 claim-bearing, 3 discovery-only, 5 shaping-only, and 2 support-only.

Final intended claim roles: 5 total; 5 `substantive_claim`; 0 discovery; 0 support; 0 unclassified.

- `yore_claim_0001`: retain as substantive lifecycle/naming-boundary claim after bounded evidence localization.
- `yore_claim_0002`: retain as substantive naming guardrail after bounded evidence localization.
- `yore_claim_0003`: retain as substantive missing-Green identity claim after bounded evidence localization.
- `yore_claim_0004`: retain as substantive artifice/civilization frame after bounded evidence localization and explicit synthesis boundary.
- `yore_claim_0005`: retain as substantive Yore-Tiller anchor/boundary claim after bounded evidence localization.

Evidence mapping: claims 0001-0005 use existing `YORE-EVID` rows 001, 002, 003, 004, 005, and 010. `YORE-EVID-006` and `YORE-EVID-007` may support profile/Commander texture only where kept non-authoritative; `YORE-EVID-008` remains discovery-only and `YORE-EVID-009` remains Vox Mana synthesis, not raw-claim proof.

No new claims or sources are required for bounded remediation.

## Required Neighbors And Boundaries

Required fixture/recruiter/collision boundary set: `GLINT`, `WITCH`, certified `JESKAI`, `ESPER`, `GRIXIS`, `MARDU`, `SULTAI`, `WU`, `UB`, `BR`, `UR`, `WB`, `WR`, `GENERIC_WUBR`, `GENERIC_ARTIFACTS`, `GENERIC_RECURSION`, `GENERIC_COMMANDER`, `BREYA_ONLY`, `YORE_TILLER_AS_FACTION`, `CULT_OF_YORE`, `COMMANDER_PRODUCT`, `THRAN`, `PHYREXIA`, `COLOR_CODE_GOODSTUFF`, `SEED_FILE`, `ARCHITECTURE_ONLY`.

Yore must be distinguished from generic WUBR, generic artifacts, generic recursion, Breya-only Commander support, Yore-Tiller-as-faction/civilization, Cult of Yore phrase matches, Thran/Phyrexia artifice, Esper artifact perfection, Grixis recursion, certified Jeskai technique/study/action without Black refusal, Mardu sacrifice without Blue optimization, Sultai Green-centered resource conversion, Glint UBRG/non-White volatility, Witch GWUB/non-Red cultivated inevitability, two-color artifact/recursion overlaps, Commander products, seed files, architecture prose, and universal official-name claims.

## Frozen Baselines

- Placement identity key: `YORE`.
- Raw slug: `yore`.
- Display name: `Yore / Artifice`.
- Display color metadata: `WUBR`; aliases limited to `YORE`.
- Runtime status: live/generated key already active from VM-245; placement status and calibration are not changed by this audit.
- Raw preview state: raw `preview_eligible` remains `false`.
- Preview source: `data/identity-layers.json#/expressions/YORE/preview_text`.
- Preview embedded consumer: `data/factions.json#/identity_layers/expressions/YORE/preview_text`.
- Preview equality: source and embedded preview are equal at audit time.
- Generated preview state: `preview_eligible: true`, `preview_order: 30`, preview label `Yore / Artifice`.
- Placement calibration: required positive evidence terms, `required_positive_min_hits: 2`, `broad_match_penalty: 0.12`, suppress/strengthen lists, false-positive guardrail, discriminator question IDs, and live/source-authored status recorded as frozen.
- Generated lateral inhibition targets: `WU`, `UB`, `BR`, `UR`, `WB`, `WR`, `ESPER`, `GRIXIS`, `JESKAI`, `MARDU`, `SULTAI`.
- Collision guidance pairs: `collision_yore_glint_four_color_ring` and `collision_yore_witch_four_color_ring`; both have `lateral_inhibition: false`.
- Provenance baseline: 9 Yore-owned entries, 11 Yore-related entries, 4 Yore-owned null canonical IDs, 0 Yore-owned missing canonical content hashes.
- Fixture baseline: no `research/fixtures/semantic-readiness/yore.semantic-fixtures.json` exists.

## Remediation Contract

Gate 3+4 must:

1. Assign all five Yore claims to `substantive_claim`.
2. Add bounded evidence locations and evidence scopes with source ID parity for every substantive claim.
3. Keep discovery-only, shaping-only, architecture-only, Commander support, Breya support, seed, manual-fill, and Vox Mana synthesis rows out of authoritative semantic, placement, recruiter, fixture, and provenance proof unless explicitly allowed as non-authoritative support metadata by Contract v1.1.
4. Repair 4 null Yore provenance owner IDs with Yore-local native IDs.
5. Add `research/fixtures/semantic-readiness/yore.semantic-fixtures.json`.
6. Regenerate source-owned active consumers expected to include `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and targeted `supabase/functions/guild-recruiter/faction-context.ts`; touch `data/identity-layers.json` only if the source preview text is explicitly changed under the DRIFT-020 preview-source exception.
7. Resolve generated proof-chain contamination from unclassified Yore claims by role/evidence repair, not by weakening validators.
8. Preserve frozen fields: identity key, raw slug, WUBR metadata, aliases, preview source-to-embedded equality, native IDs, calibration/scoring/confidence fields, collision guidance IDs, lateral targets, `lateral_inhibition: false`, suppressed directory links, and historical/debug exclusions.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=YORE`: exit 0; 5 claims; 0 substantive, 0 discovery, 0 support, 5 unclassified; 13 sources; 9 reference sites; missing collision references `glint_claim_0003`, `glint_claim_0005`, `witch_claim_0003`, and `witch_claim_0005`; 3 raw questions; neighbor references GLINT and WITCH.
- `node research/validate-semantic-readiness.mjs --targets=YORE`: exit 1 as expected pre-remediation; semantic roles required, recruiter guidance lacks evidence mapping, authoritative profile/placement references have no substantive claim, Glint/Witch collision claims are missing in Yore scope, and Yore fixtures are absent.
- `node research/validate-source-generated-guardrails.mjs --targets=YORE`: exit 0; PASS YORE with 0 warnings.

## Decisions Made

- Gate 3+4 remediation is authorized for `YORE` only.
- No new claims or sources are required.
- All five existing Yore claims should become substantive after Contract v1.1 evidence localization.
- Generated identity-layer preview may be retained only if semantic validation and source-to-embedded equality pass; if preview changes, it must be the exact YORE preview source field plus generated embedded duplicate only.
- Support-only Commander/Breya/product rows must stay out of authoritative proof chains.
- WUBR/permutations remain invalid candidate-scope identities and metadata-query-only forms.

## Risks / Uncertainties

Existing generated data remains contaminated until remediation. The four-color ring uses shared collision references to Glint and Witch, both later identities; final Yore candidate-scope must prove those references remain acceptable without beginning VM-533 or Witch. Candidate-scope may reject any lateral/collision/frozen-field expansion. Future Gate 3+4 must not treat expected pre-remediation failures as certification evidence.

## Drift Scorecard

| Control | Gate 1+2 |
|---|---|
| Correct branch and program base | PASS |
| One identity active | PASS |
| Source hierarchy explicit | PASS |
| Generic color-pair overfit checked | PASS |
| Required neighbors checked | PASS |
| Claim roles complete | PASS - final intended roles recorded; remediation required before candidate |
| Evidence scopes complete | PASS - missing scopes recorded as remediation obligation |
| Discovery/support isolated | PASS - source hierarchy and isolation obligations recorded |
| Canonical IDs/hashes valid | PASS - four null IDs recorded as remediation obligation; hashes present |
| Exact fixture/provenance parity | PASS - missing fixture recorded as remediation obligation |
| Frozen confidence/calibration intact | PASS |
| Native IDs intact | PASS - null native IDs recorded for repair |
| Lateral/collision targets intact | PASS |
| Public/recruiter copy aligned | PASS - active generated/recruiter consumers inventoried; proof-chain repair required |
| No unrelated identity drift | PASS |
| Deterministic generation | N/A - no generation run in Gate 1+2 |
| Candidate scope passes exact SHA | N/A - no candidate exists |
| Superseded candidates recorded | N/A - no VM-532 candidate exists |
| Review uses exact candidate SHA | N/A |
| Certification uses exact approved SHA | N/A |
| Governance-only workflow/review/certification commits | PASS |
| Dirty-worktree baseline excluded | PASS |
| External tracker matches repository | N/A - Excel/external tracker explicitly untouched |

## Tests Run

See Diagnostics Run. No remediation validation passed because no remediation occurred.

## Not Touched

No Yore raw semantic data, generated data, provenance data, fixtures, runtime code, tests, validators, generators, schemas, package scripts, CI files, Excel files, VM-533/Glint files, original-main files, protected worktrees, DRIFT-017 prototype files, Green provenance files, VM-526/VM-529 dirty worktrees, Jeskai worktrees, historical/debug/archive artifacts, Table Talk files, push, PR, merge, or cleanup were touched.

## Follow-Up Recommendations

Proceed to Gate 3+4 implementation exactly from this contract, then create one exact semantic candidate only after validation passes.

## Next Suggested Agent

Yore Gate 3+4 implementation agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-532-yore-semantic-recovery.md`
- `docs/handoffs/2026-07-23-1646-codex-vm532-yore-drift-preflight.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`

READY FOR GATE 3 REMEDIATION
