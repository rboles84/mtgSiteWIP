# VM-528 Temur Gate 1+2 Read-Only Semantic Audit

Agent name: Codex

Task requested: Resume VM-528 Temur from drift-preflight commit `20c9413f39273bf76a11c4fdddb2163dd61c8037`, complete Gate 1+2 read-only semantic audit, and update only governance records. Do not perform semantic remediation, candidate creation, review, certification, VM-529, Excel, push, PR, or merge.

## Decision

Gate 2 disposition: READY FOR GATE 3 REMEDIATION.

Gate 3+4 remediation is authorized for `TEMUR` only after this governance commit. This record is not the semantic candidate.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- DRIFT-015, DRIFT-016, DRIFT-017, DRIFT-019, and DRIFT-020 authority records
- VM-522 through VM-527 precedent handoffs and recovery reports
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/semantic-readiness-lib.mjs`
- `research/audit-semantic-readiness.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `research/build-faction-artifacts.mjs`
- `data/raw-factions/temur/temur.claims.json`
- `data/raw-factions/temur/temur.sources.json`
- `data/raw-factions/temur/temur.profile.json`
- `data/raw-factions/temur/temur.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `docs/research/temur/temur-evidence-ledger.md`
- `docs/research/temur/temur-source-ledger.md`
- `docs/research/temur/temur-research-dossier.md`
- `docs/research/temur/temur-reliability-audit.md`
- `docs/research/temur/temur-lore-source-packet.md`

## Files Changed

- `docs/handoffs/2026-07-22-1549-codex-vm528-temur-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

No semantic, generated, fixture, provenance candidate content, validator/test implementation, package, lockfile, CI, parser, placement, faction-context, runtime, Excel, VM-529, push, PR, or merge file changed in this Gate 1+2 governance commit.

## What Changed

Governance now records the Temur claim-role disposition, source bounds, required-neighbor set, fixture/provenance contract, preview and active-consumer controls, invalid-alias results, and exact remediation obligations for Gate 3+4.

## Why It Changed

CRIT-001 requires Gate 1+2 to fix the remediation contract before implementation. Temur has enough existing source support for bounded remediation, but it is not semantically ready until roles, evidence locations, fixtures, provenance, generated consumers, and recruiter evidence mappings are repaired.

## Starting State

- Worktree: `C:\dev\mtgSiteWIP-crit001-vm528-temur`
- Branch: `codex/vm-528-temur-semantic-recovery`
- Starting HEAD: `20c9413f39273bf76a11c4fdddb2163dd61c8037`
- Parent / program base: `a1632337ebc91950b37d835ac404fba414f770c7`
- Status before governance edits: clean
- VM-529 before/after: backlog, not started, untouched
- Program base before/after: `a1632337ebc91950b37d835ac404fba414f770c7`
- Certified count before/after: 26 of 37

## Pre-Flight Summary

Recent related work: VM-527 Abzan is certified from exact candidate `11c099b8beb9f23e23660787f00b97e89914d50b`; VM-528 drift preflight `20c9413f39273bf76a11c4fdddb2163dd61c8037` authorized Gate 1+2 only.

Current known risks: no explicit Temur semantic roles, no fixture, no recruiter evidence mapping, generated/provenance proof chains cite unclassified claims, 15 null TEMUR provenance canonical IDs, and Commander product rows must be support-only.

Relevant decisions already made: `TEMUR` is canonical. `GUR` is display/color-order metadata only. `GUR`, `URG`, and `RGU` fail closed as unknown identities.

What should not be touched: VM-527, DRIFT-020 implementation/tests, DRIFT-017 prototype files, VM-529, original main, Table Talk dirt, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Excel, package/lockfile/CI/parser/placement/faction-context/runtime/schema/generator implementation.

## Identity And Alias Authority

- Canonical identity key: `TEMUR`.
- Raw ID: `temur`.
- Display color order: `GUR`.
- Color identity: `G/U/R`.
- `data/identity-layers.json#/expressions/TEMUR` exists with aliases `[TEMUR]` and routing/display color metadata `GUR`.
- `research/build-semantic-readiness-provenance.mjs` maps `temur -> TEMUR`.
- `GUR`: rejected as `Unknown identity GUR`.
- `URG`: rejected as `Unknown identity URG`.
- `RGU`: rejected as `Unknown identity RGU`.

## Source And Claim Audit

Current `temur.sources.json` has 21 source records: 9 claim-bearing, 8 shaping-only, and 4 support-only. The source floor is sufficient for current claims; no new sources are required in Gate 3+4 unless implementation introduces a new exact source use.

Final intended claim roles: 11 total; 10 `substantive_claim`; 1 `support_record`; 0 discovery; 0 unclassified.

- `temur_claim_0001` through `temur_claim_0010`: retain as substantive claims after bounded evidence localization.
- `temur_claim_0011`: retain as support-only Commander product/deck navigation; never authoritative Temur semantic or placement proof.

Evidence mapping: claims 0001-0010 use existing TEMUR-EVID rows 001-026 plus guardrails 029 and 031 where relevant. Claim 0011 uses TEMUR-EVID-032 and `src_wotc_tarkir_dragonstorm_commander_decklists_20250325` as support only.

## Required Neighbors And Boundaries

Required fixture/recruiter/collision boundary set: `SULTAI`, `MARDU`, `JESKAI`, `NAYA`, `BANT`, `GRIXIS`, `JUND`, `ABZAN`, `RG`, `UG`, `UR`, `GENERIC_GUR`, `GENERIC_RAMP`, `GENERIC_LARGE_CREATURES`, `GENERIC_COMBAT`, `GENERIC_SPELLS`, `GENERIC_COMMANDER`, `ATARKA_CLAN`, `DRAGONSTORM_BACKFILL`, `COMMANDER_PRODUCT`.

Temur must be distinguished from generic GUR value piles, generic ramp/large-creature/combat/spell/copy patterns, Simic adaptation, Izzet spells, Gruul ferocity, Naya abundance, Jund appetite, Sultai exploitation, Mardu war-speed, Jeskai discipline, Bant honor, Abzan house-duty endurance, Atarka Clan continuity, Dragonstorm-era backfill, Commander products, seed files, and unsupported manual-fill lore.

## Remediation Contract

Gate 3+4 must:

1. Assign roles: claims 0001-0010 substantive, claim 0011 support.
2. Add bounded evidence locations and evidence scopes with source ID parity.
3. Add semantic guidance evidence for recruiter guidance.
4. Repair 15 null TEMUR provenance owner IDs with Temur-local IDs.
5. Add `research/fixtures/semantic-readiness/temur.semantic-fixtures.json`.
6. Regenerate source-owned active consumers only: expected `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and targeted `supabase/functions/guild-recruiter/faction-context.ts`; touch `data/identity-layers.json` only if preview source text is explicitly changed.
7. Preserve frozen fields: identity key, raw slug, GUR metadata, placement eligibility/live pilot flags, preview equality, native IDs, calibration/scoring/confidence fields, collision order, lateral targets, and historical/debug exclusions.
8. Validate semantic readiness, fixtures, provenance, source/generated guardrails, placement, parser, faction-context isolation, candidate-scope, aliases, unknown identity, neighbor-target rejection, exact-tree tests, and idempotence before candidate workflow.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=TEMUR`: exit 0; 11 claims; 0 substantive, 0 discovery, 1 support, 10 unclassified; 21 sources; no missing references; 3 raw questions; neighbor references `jeskai`, `mardu`, `sultai`.
- `node research/validate-semantic-readiness.mjs --targets=TEMUR`: exit 1 as expected pre-remediation.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=TEMUR`: exit 1 as expected pre-remediation.
- `node research/validate-source-generated-guardrails.mjs --targets=TEMUR`: exit 0 with one non-blocking model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=a1632337ebc91950b37d835ac404fba414f770c7 --target=20c9413f39273bf76a11c4fdddb2163dd61c8037 --identity=TEMUR`: exit 1 as expected from pre-remediation unclassified proof-chain contamination.
- Same exact range with `--identity=GUR`, `URG`, and `RGU`: each exited 1 with `Unknown identity ...`.

## Decisions Made

- Gate 3+4 remediation is authorized for `TEMUR` only.
- No new claims or sources are required.
- Preview may be retained if semantic validation passes.
- Support-only Commander/product and generic GUR/operator rows must stay out of authoritative proof chains.

## Risks / Uncertainties

Existing generated data remains contaminated until remediation. Candidate-scope may reject any lateral/collision expansion. Future Gate 3+4 must not treat expected pre-remediation failures as certification evidence.

## Tests Run

See Diagnostics Run. No remediation validation passed because no remediation occurred.

## Not Touched

No Temur raw semantic data, generated data, provenance data, fixtures, runtime code, tests, validators, generators, schemas, package scripts, CI files, Excel files, VM-529 files, original-main files, protected worktrees, DRIFT-017 prototype files, VM-527 history, DRIFT-020 implementation, VM-542/DRIFT-019 residual files, historical/debug/archive artifacts, Table Talk files, push, PR, or merge were touched.

## Follow-Up Recommendations

Proceed to Gate 3+4 implementation exactly from this contract, then create one exact semantic candidate only after validation passes.

## Next Suggested Agent

Temur Gate 3+4 implementation agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-528-temur-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1529-codex-vm528-temur-drift-preflight.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`

READY FOR GATE 3 REMEDIATION
