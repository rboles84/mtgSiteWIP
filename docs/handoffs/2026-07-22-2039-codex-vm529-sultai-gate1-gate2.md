# VM-529 Sultai Gate 1+2 Read-Only Semantic Audit

## Agent Name

Codex

## Task Requested

Resume VM-529 Sultai from committed drift preflight `74b8153c124eb03d95a28ae2aac126c29f3c5db4`, perform Gate 1+2 read-only semantic audit, record the remediation boundary, and update governance only before any semantic remediation, candidate creation, independent review, certification, VM-530, Excel, push, PR, or merge.

## Decision

Gate 2 disposition: READY FOR GATE 3 REMEDIATION.

Gate 3+4 remediation is authorized for `SULTAI` only after this governance commit. This record is not the semantic candidate.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/handoffs/2026-07-22-1549-codex-vm528-temur-gate1-gate2.md`
- `docs/handoffs/2026-07-22-1758-codex-vm528-temur-candidate-workflow.md`
- `docs/handoffs/2026-07-22-1911-codex-vm528-temur-independent-review.md`
- `docs/handoffs/2026-07-22-1930-codex-vm528-temur-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/backlog/VM-530-mardu-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/workflow.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/audit-semantic-readiness.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-source-ledger.md`
- `docs/research/sultai/sultai-research-dossier.md`
- `docs/research/sultai/sultai-reliability-audit.md`

## Files Changed

- `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

No semantic source data, generated data, fixtures, provenance candidate content, validator/test implementation, package, lockfile, CI, parser, placement implementation, faction-context implementation, runtime code, Excel, VM-530, push, PR, or merge file changed in this Gate 1+2 governance commit.

## What Changed

Governance now records the Sultai claim-role disposition, source hierarchy, alias results, required-neighbor set, frozen placement and preview baselines, fixture/provenance contract, active consumer inventory, and exact remediation obligations for Gate 3+4.

## Why It Changed

CRIT-001 requires Gate 1+2 to establish a bounded remediation contract before implementation. Sultai has enough existing repository-authorized evidence for remediation, but it is not semantically ready until roles, evidence locations, recruiter evidence mappings, fixtures, provenance owner IDs, generated consumers, and support isolation are repaired.

## Starting State

- Worktree: `C:\dev\mtgSiteWIP-crit001-vm529-sultai`
- Branch: `codex/vm-529-sultai-semantic-recovery`
- Starting HEAD / drift preflight: `74b8153c124eb03d95a28ae2aac126c29f3c5db4`
- Parent / program base: `8e23ef467ec7f60daec746c14493173f96d9261c`
- Status before governance edits: clean
- VM-530 before/after: backlog, not started, untouched
- Program base before/after: `8e23ef467ec7f60daec746c14493173f96d9261c`
- Certified count before/after: 27 of 37

## Pre-Flight Summary

Recent related work: VM-528 Temur is certified from exact approved candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`; VM-529 drift preflight `74b8153c124eb03d95a28ae2aac126c29f3c5db4` authorized this Gate 1+2 audit only.

Current known risks: no Sultai semantic roles, no Sultai fixture, recruiter guidance lacks evidence mapping, 15 SULTAI provenance entries have null canonical IDs, generated proof chains cite unclassified claims, and Commander/product rows must remain support-only.

Relevant decisions already made: `SULTAI` is canonical. `BGU` is display/color-order metadata only. `BGU`, `GUB`, and `UBG` fail closed as unknown validator identities.

What should not be touched: VM-528, VM-530, DRIFT-020 implementation/tests, DRIFT-017 prototype files, original main, Table Talk baseline, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Excel, package/lockfile/CI/parser/placement/faction-context/runtime/schema/generator implementation.

## Identity And Alias Authority

- Canonical identity key: `SULTAI`.
- Raw ID: `sultai`.
- Display color order: `BGU`.
- Color identity: `B/G/U`.
- `data/identity-layers.json#/expressions/SULTAI` exists with aliases `[SULTAI]`, routing color identity `BGU`, display code `SULTAI`, and active preview source.
- `data/raw-factions/sultai/sultai.placement.json#/color_identity` records `B`, `G`, `U` as metadata-only.
- `BGU`: rejected as `Unknown identity BGU`.
- `GUB`: rejected as `Unknown identity GUB`.
- `UBG`: rejected as `Unknown identity UBG`.

## Source And Claim Audit

Current `sultai.sources.json` has 18 source records: 7 claim-bearing, 7 shaping-only, and 4 support-only. The source floor is sufficient for current claims; no new sources are required in Gate 3+4 unless implementation introduces a new exact source use.

Final intended claim roles: 11 total; 10 `substantive_claim`; 1 `support_record`; 0 discovery; 0 unclassified.

- `sultai_claim_0001` through `sultai_claim_0010`: retain as substantive claims after bounded evidence localization.
- `sultai_claim_0011`: retain as support-only Commander product/deck navigation; never authoritative Sultai semantic, profile, placement, recruiter, or provenance proof.

Evidence mapping: claims 0001-0010 use existing `SULTAI-EVID` rows 001-030 plus guardrails 033, 034, and 036 where relevant. Claim 0011 uses official Commander decklist/product support only.

## Required Neighbors And Boundaries

Required fixture/recruiter/collision boundary set: `ABZAN`, `TEMUR`, `JESKAI`, `MARDU`, `BANT`, `JUND`, `GRIXIS`, `ESPER`, `DIMIR`, `GOLGARI`, `SIMIC`, `GENERIC_BGU`, `GENERIC_GRAVEYARD_VALUE`, `GENERIC_RAMP`, `GENERIC_CARD_ADVANTAGE`, `GENERIC_SACRIFICE`, `GENERIC_CONTROL`, `GENERIC_RECURSION`, `GENERIC_COMMANDER`, `SILUMGAR_CLAN`, `DRAGONSTORM_BACKFILL`, `COMMANDER_PRODUCT`, `SEED_FILE`, `COLOR_PHILOSOPHY`.

Sultai must be distinguished from generic BGU, generic graveyard/theft/mill/morph/mutate/Commander value, Dimir hidden-information control, Golgari life/death ecology, Simic adaptation, Abzan family continuity, Temur living-world attunement, Jeskai discipline, Mardu speed, Bant honor/community hierarchy, Jund appetite, Grixis survival leverage, Esper artifact/order ambition, Silumgar continuity, Dragonstorm backfill, Commander products, color philosophy, seed files, and unsupported manual-fill lore.

## Frozen Baselines

- Placement identity key: `SULTAI`.
- Raw slug: `sultai`.
- Routing/display color metadata: `BGU`; aliases limited to `SULTAI`.
- Runtime status: `live_pilot`; placement status: `placement_eligible`.
- Preview source: `data/identity-layers.json#/expressions/SULTAI/preview_text`.
- Preview embedded consumer: `data/factions.json#/identity_layers/expressions/SULTAI/preview_text`.
- Preview equality: source and embedded preview are equal at audit time.
- Placement calibration: `required_positive_evidence_terms` list, `required_positive_min_hits: null`, `broad_match_penalty: null`, suppress/strengthen lists, collision suppressions, and false-positive guardrail recorded as frozen.
- Placement collision guidance: three existing SULTAI-owned rows for `abzan`, `temur`, and `jeskai`.
- Provenance baseline: 30 SULTAI entries, 15 null canonical IDs, 0 null hashes.
- Fixture baseline: no `research/fixtures/semantic-readiness/sultai.semantic-fixtures.json` exists.

## Remediation Contract

Gate 3+4 must:

1. Assign roles: claims 0001-0010 substantive, claim 0011 support.
2. Add bounded evidence locations and evidence scopes with source ID parity.
3. Add semantic guidance evidence for recruiter guidance.
4. Isolate support-only Commander/product rows so they do not prove authoritative Sultai semantics.
5. Repair 15 null SULTAI provenance owner IDs with Sultai-local IDs.
6. Add `research/fixtures/semantic-readiness/sultai.semantic-fixtures.json`.
7. Regenerate source-owned active consumers only: expected `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and targeted `supabase/functions/guild-recruiter/faction-context.ts`; touch `data/identity-layers.json` only if preview source text is explicitly changed.
8. Preserve frozen fields: identity key, raw slug, BGU metadata, placement eligibility/live pilot flags, preview source-to-embedded equality, native IDs, calibration/scoring/confidence fields, collision order, lateral targets, and historical/debug exclusions.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=SULTAI`: exit 0; 11 claims; 0 substantive, 0 discovery, 1 support, 10 unclassified; 18 sources; no missing references; 3 raw questions; neighbor references `abzan`, `jeskai`, `temur`.
- `node research/validate-semantic-readiness.mjs --targets=SULTAI`: exit 1 as expected pre-remediation.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=SULTAI`: exit 1 as expected pre-remediation.
- `node research/validate-source-generated-guardrails.mjs --targets=SULTAI`: exit 0 with one non-blocking model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=8e23ef467ec7f60daec746c14493173f96d9261c --target=74b8153c124eb03d95a28ae2aac126c29f3c5db4 --identity=SULTAI`: exit 1 as expected from pre-remediation unclassified proof-chain contamination.
- Same exact range with `--identity=BGU`, `GUB`, and `UBG`: each exited 1 with `Unknown identity ...`.

## Decisions Made

- Gate 3+4 remediation is authorized for `SULTAI` only.
- No new claims or sources are required.
- Preview may be retained if semantic validation passes; if preview changes, it must be the exact SULTAI preview source field plus generated embedded duplicate only.
- Support-only Commander/product rows must stay out of authoritative proof chains.

## Risks / Uncertainties

Existing generated data remains contaminated until remediation. Candidate-scope may reject any lateral/collision/frozen-field expansion. Future Gate 3+4 must not treat expected pre-remediation failures as certification evidence.

## Tests Run

See Diagnostics Run. No remediation validation passed because no remediation occurred.

## Not Touched

No Sultai raw semantic data, generated data, provenance data, fixtures, runtime code, tests, validators, generators, schemas, package scripts, CI files, Excel files, VM-530 files, original-main files, protected worktrees, DRIFT-017 prototype files, VM-528 history, DRIFT-020 implementation, VM-542/DRIFT-019 residual files, historical/debug/archive artifacts, Table Talk files, push, PR, or merge were touched.

## Follow-Up Recommendations

Proceed to Gate 3+4 implementation exactly from this contract, then create one exact semantic candidate only after validation passes.

## Next Suggested Agent

Sultai Gate 3+4 implementation agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`

READY FOR GATE 3 REMEDIATION
