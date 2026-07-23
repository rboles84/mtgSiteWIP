# VM-530 Mardu Gate 1+2 Read-Only Semantic Audit

## Agent Name

Codex

## Task Requested

Resume VM-530 Mardu from committed drift preflight `eb0b71846d1315ef9571cd3a99ec8b7a7279573e`, perform Gate 1+2 read-only semantic audit, record the remediation boundary, and update governance only before semantic remediation, candidate creation, independent review, certification, VM-531, Excel, cleanup, push, PR, or merge.

## Decision

Gate 2 disposition: READY FOR GATE 3 REMEDIATION.

Gate 3+4 remediation is authorized for `MARDU` only after this governance commit. This record is not the semantic candidate.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- `docs/handoffs/2026-07-22-2123-codex-vm529-sultai-independent-review.md`
- `docs/handoffs/2026-07-22-2144-codex-vm529-sultai-certification.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/backlog/VM-531-jeskai-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/audit-semantic-readiness.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-source-generated-guardrails.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `research/semantic-readiness-lib.mjs`
- `research/faction-context-isolation-tests.js`
- `assets/js/quick-reading-tests.js`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-source-ledger.md`
- relevant Mardu historical VM-223 through VM-299 handoff/index rows

## Files Changed

- `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

No semantic source data, generated data, fixtures, provenance candidate content, validator/test implementation, package, lockfile, CI, parser, placement implementation, faction-context implementation, runtime code, Excel, VM-531, push, PR, merge, or cleanup file changed in this Gate 1+2 governance commit.

## What Changed

Governance now records the Mardu claim-role disposition, source hierarchy, alias results, required-neighbor set, frozen placement and preview baselines, fixture/provenance contract, active consumer inventory, inherited warnings, and exact remediation obligations for Gate 3+4.

## Why It Changed

CRIT-001 requires Gate 1+2 to establish a bounded remediation contract before implementation. Mardu has enough existing repository-authorized evidence for remediation, but it is not semantically ready until roles, bounded evidence locations, fixture/provenance parity, owner IDs, generated proof chains, and support isolation are repaired.

## Starting State

- Worktree: `C:\dev\mtgSiteWIP-crit001-vm530-mardu`
- Branch: `codex/vm-530-mardu-semantic-recovery`
- Starting HEAD / drift preflight: `eb0b71846d1315ef9571cd3a99ec8b7a7279573e`
- Parent / program base: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`
- Status before governance edits: clean
- VM-531 before/after: backlog, not started, untouched
- Program base before/after: `7970c14822ce006c0d88f95cc6ed01bb3c79b81f`
- Certified count before/after: 28 of 37

## Pre-Flight Summary

Recent related work: VM-529 Sultai is certified from exact approved candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`; VM-530 drift preflight `eb0b71846d1315ef9571cd3a99ec8b7a7279573e` authorized this Gate 1+2 audit only.

Current known risks: no Mardu substantive roles, no Mardu fixture, 15 MARDU provenance entries have null canonical IDs, generated proof chains cite unclassified claims, support-only Commander/product rows must stay support-only, and aliases `RWB`, `WBR`, and `BRW` must fail closed.

Relevant decisions already made: `MARDU` is canonical. `RWB` is display/color-order metadata only. `RWB`, `WBR`, and `BRW` are unsupported validator identities unless later committed authority changes that.

What should not be touched: VM-531, DRIFT-020 implementation/tests, DRIFT-017 prototype files, original main, Table Talk baseline, historical/debug/archive exclusions, VM-542/DRIFT-019 residuals, Excel, package/lockfile/CI/parser/placement/faction-context/runtime/schema/generator implementation.

## Identity And Alias Authority

- Canonical identity key: `MARDU`.
- Raw ID: `mardu`.
- Display color order: `RWB`; display colors `R`, `W`, `B`.
- `data/identity-layers.json#/expressions/MARDU` exists with aliases `[MARDU]`, display name `Mardu Horde`, and active preview source.
- `data/raw-factions/mardu/mardu.placement.json#/color_identity` records `R`, `W`, `B` as metadata-only and says RWB/WBR/lowercase forms are not aliases, generated keys, runtime keys, fixture keys, public labels, or lookup keys.
- `RWB`, `WBR`, and `BRW`: unsupported aliases; exact candidate-scope probes must reject them as unknown identities.

## Source And Claim Audit

Current `mardu.sources.json` has 19 source records: 8 claim-bearing, 8 shaping-only, and 3 support-only. The source floor is sufficient for current claims; no new sources are required in Gate 3+4 unless implementation introduces a new exact source use.

Final intended claim roles: 11 total; 10 `substantive_claim`; 1 `support_record`; 0 discovery; 0 unclassified.

- `mardu_claim_0001` through `mardu_claim_0010`: retain as substantive claims after bounded evidence localization.
- `mardu_claim_0011`: retain as support-only Commander product/deck navigation; never authoritative Mardu semantic, profile, placement, recruiter, fixture, or provenance proof.

Evidence mapping: claims 0001-0010 use existing `MARDU-EVID` rows 001-026 plus guardrails 029, 030, and 032 where relevant. Claim 0011 uses official Commander decklist/product support only.

## Required Neighbors And Boundaries

Required fixture/recruiter/collision boundary set: `WR`, `WB`, `BR`, `BOROS`, `ORZHOV`, `RAKDOS`, `ABZAN`, `JESKAI`, `SULTAI`, `TEMUR`, `NAYA`, `JUND`, `GENERIC_RWB`, `GENERIC_WBR`, `GENERIC_AGGRO`, `GENERIC_COMBAT`, `GENERIC_SACRIFICE`, `GENERIC_TOKENS`, `GENERIC_ARISTOCRATS`, `GENERIC_REANIMATOR`, `GENERIC_COMMANDER`, `KOLAGHAN_CLAN`, `DRAGONSTORM_BACKFILL`, `COMMANDER_PRODUCT`, `SEED_FILE`, `COLOR_PHILOSOPHY`.

Mardu must be distinguished from generic RWB/WBR, generic aggro/combat/sacrifice/tokens/aristocrats/reanimator/Commander goodstuff, Boros civic protection and combat, Orzhov hierarchy, Rakdos appetite/spectacle, Abzan endurance, Jeskai technique, Sultai resource conversion, Temur attunement, Naya creature/community momentum, Jund appetite/survival, Kolaghan continuity, Dragonstorm backfill, Commander products, color philosophy, seed files, and unsupported manual-fill lore.

## Frozen Baselines

- Placement identity key: `MARDU`.
- Raw slug: `mardu`.
- Display color metadata: `RWB`; aliases limited to `MARDU`.
- Runtime status: `live_pilot`; placement status: `placement_eligible`; preview eligible: `false`.
- Preview source: `data/identity-layers.json#/expressions/MARDU/preview_text`.
- Preview embedded consumer: `data/factions.json#/identity_layers/expressions/MARDU/preview_text`.
- Preview equality: source and embedded preview are equal at audit time.
- Placement calibration: `required_positive_evidence_terms`, `required_positive_min_hits: 2`, `broad_match_penalty: 0.12`, suppress/strengthen lists, collision suppressions, false-positive guardrail, and live/source-authored status recorded as frozen.
- Placement collision guidance: empty array.
- Generated lateral inhibition targets: `WR`, `WB`, `BR`, `NAYA`, `JUND`, `ABZAN`, `TEMUR`, `SULTAI`, `JESKAI`.
- Provenance baseline: 28 MARDU entries, 15 null canonical IDs, 0 null hashes.
- Fixture baseline: no `research/fixtures/semantic-readiness/mardu.semantic-fixtures.json` exists.

## Remediation Contract

Gate 3+4 must:

1. Assign roles: claims 0001-0010 substantive, claim 0011 support.
2. Add bounded evidence locations and evidence scopes with source ID parity.
3. Keep support-only Commander/product rows out of authoritative semantic, profile, placement, recruiter, fixture, and provenance proof.
4. Repair 15 null MARDU provenance owner IDs with Mardu-local native IDs.
5. Add `research/fixtures/semantic-readiness/mardu.semantic-fixtures.json`.
6. Regenerate source-owned active consumers only: expected `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and targeted `supabase/functions/guild-recruiter/faction-context.ts`; touch `data/identity-layers.json` only if preview source text is explicitly changed.
7. Preserve frozen fields: identity key, raw slug, RWB metadata, placement eligibility/live pilot flags, preview source-to-embedded equality, native IDs, calibration/scoring/confidence fields, empty collision guidance, lateral targets, and historical/debug exclusions.

## Diagnostics Run

- `node research/audit-semantic-readiness.mjs --targets=MARDU`: exit 0; 11 claims; 0 substantive, 0 discovery, 1 support, 10 unclassified; 19 sources; no missing references; 3 raw questions; no current neighbor references.
- `node research/validate-semantic-readiness.mjs --targets=MARDU`: exit 1 as expected pre-remediation.
- `node research/validate-source-generated-guardrails.mjs --targets=MARDU`: exit 0 with one non-blocking model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=7970c14822ce006c0d88f95cc6ed01bb3c79b81f --target=eb0b71846d1315ef9571cd3a99ec8b7a7279573e --identity=MARDU`: exit 1 as expected from pre-remediation unclassified proof-chain contamination.
- `node research/semantic-candidate-scope-tests.js`: exit 0.

## Decisions Made

- Gate 3+4 remediation is authorized for `MARDU` only.
- No new claims or sources are required.
- Preview may be retained if semantic validation passes; if preview changes, it must be the exact MARDU preview source field plus generated embedded duplicate only.
- Support-only Commander/product rows must stay out of authoritative proof chains.

## Risks / Uncertainties

Existing generated data remains contaminated until remediation. Candidate-scope may reject any lateral/collision/frozen-field expansion. Future Gate 3+4 must not treat expected pre-remediation failures as certification evidence.

## Tests Run

See Diagnostics Run. No remediation validation passed because no remediation occurred.

## Not Touched

No Mardu raw semantic data, generated data, provenance data, fixtures, runtime code, tests, validators, generators, schemas, package scripts, CI files, Excel files, VM-531 files, original-main files, protected worktrees, DRIFT-017 prototype files, VM-529 history, DRIFT-020 implementation, VM-542/DRIFT-019 residual files, historical/debug/archive artifacts, Table Talk files, push, PR, merge, or cleanup were touched.

## Follow-Up Recommendations

Proceed to Gate 3+4 implementation exactly from this contract, then create one exact semantic candidate only after validation passes.

## Next Suggested Agent

Mardu Gate 3+4 implementation agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`

READY FOR GATE 3 REMEDIATION
