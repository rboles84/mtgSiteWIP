# 2026-07-20 23:58 - Codex - VM-524 Grixis Gate 3+4 Semantic Remediation

## Agent Name
Codex

## Task Requested
Complete VM-524 Grixis Gate 3+4 semantic remediation only from exact Gate 1+2 HEAD `9d7ada7a34b52c317708a97009ded2d58b4511e1`, without creating a Gate 5 candidate, independent review, certification, semantically_ready transition, Excel update, VM-525 work, original-main edit, or protected-worktree edit.

## Files Reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`
- `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
- `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.sources.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `research/semantic-readiness-lib.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/build-faction-artifacts.mjs`
- `research/fixtures/semantic-readiness/esper.semantic-fixtures.json`

## Files Changed
Implementation commits:
- `a6115285e859fbd46f0cd0726429b7e5ddd28e0a` - `VM-524: remediate Grixis semantic readiness`
- `64a5bfffd646b292c7481f91c9ccb6def42fb552` - `VM-524: align Grixis collision scope`

Implementation files changed:
- `data/raw-factions/grixis/grixis.claims.json`
- `data/raw-factions/grixis/grixis.profile.json`
- `data/raw-factions/grixis/grixis.placement.json`
- `research/fixtures/semantic-readiness/grixis.semantic-fixtures.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Governance files changed by this handoff commit:
- `docs/handoffs/2026-07-20-2358-codex-vm524-grixis-gate3-gate4.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`

## What Changed
- Converted all 11 Grixis claims to `substantive_claim` with bounded evidence locations and exact `source_ids`/`evidence_locations.source_id` parity.
- Rewrote the Grixis semantic thesis around Black-centered survival under hostile reality, Blue weakness-mapping leverage, and Red urgent action before the opening closes.
- Added stable native IDs for claim-bearing profile surfaces, including `core_identity`, `great_tension`, `structure`, `site_surface`, `data_quality`, canonical flavor rows, and relationship rows.
- Removed proof-chain reliance from support-only key-figure card rows and marked support-only flavor rows as `auxiliary_support`.
- Added relationship/boundary coverage for required neighboring identities and generic false-positive families without turning comparator text into story-world diplomacy.
- Added placement recognizer/mismatch guidance with `semantic_guidance_evidence` hashes for every visible match/mismatch guidance string.
- Added non-inhibiting collision entries for supported identity neighbors while preserving existing Esper/Jund collision order.
- Added `research/fixtures/semantic-readiness/grixis.semantic-fixtures.json` with required core, pressure, nearest-collision, provenance, neighbor-exclusion, generic false-positive, mechanics/aesthetic, and generated-consumer assertions.
- Regenerated Grixis generated consumers and semantic readiness provenance through approved builders.

## Why It Changed
Gate 1+2 authorized Gate 3+4 remediation after finding unclassified claims, missing fixture coverage, null provenance canonical IDs, stale generated provenance, support-material contamination risk, and insufficient generic/neighbor safeguards. The remediation repairs those defects while preserving the Contract v1.1 ban on unsupported lore invention and on generic UBR/villain/mechanics/aesthetic collapse.

## Decisions Made
- Kept `GRIXIS` as the exact identity key and retained `UBR` only as metadata/query vocabulary.
- Treated Scryfall/card/Commander/named figure/mechanics/aesthetic material as support-only, not authoritative identity proof.
- Did not update the CRIT ledger because the Gate 3+4 prompt authorized governance handoff/card/board/index surfaces only; the ledger remains stale for current VM-524 progress until a later authorized governance/certification step.
- Did not include `confidence` on newly added non-inhibiting collision entries because candidate-scope treats those placement fields as forbidden frozen-field churn.
- Did not designate `64a5bfffd646b292c7481f91c9ccb6def42fb552` as a Gate 5 candidate; it is only the exact implementation HEAD validated for candidate-scope readiness.

## Risks / Uncertainties
- `npm.cmd install` was required because the dedicated worktree lacked declared dependency `xlsx`; npm reported 19 existing audit findings. No package files were committed, and the lockfile side effect was restored.
- `npm.cmd test` required local ignored Scryfall data at `data/scryfall/raw/oracle-cards.json`; copied the existing local corpus from `C:\dev\mtgSiteWIP-crit001` into this dedicated worktree only.
- `npm.cmd run validate:source-generated -- --targets=GRIXIS` still reports the known model-owned biological-prior warning for one inhibitor trap; this is an accepted warning, not a failure.
- Gate 5 candidate creation, independent review, and certification remain future work.

## Tests Run
- `node research/semantic-readiness-tests.js` - PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --target=GRIXIS` - PASS.
- `npm.cmd run build:semantic-provenance` - PASS, wrote 1963 entries before implementation commit.
- `npm.cmd run build:factions -- --context-targets=GRIXIS` - PASS, context-only build was insufficient for generated placement and followed by full build.
- `npm.cmd run build:factions` - PASS; generated `data/placement-model.json`, `supabase/functions/guild-recruiter/faction-context.ts`, and `data/semantic-readiness-provenance.json`.
- `npm.cmd run validate:source-generated -- --targets=GRIXIS` - PASS with 1 known model-owned inhibitor warning.
- `node research/build-semantic-readiness-provenance.mjs --check` - PASS, verified 1963 entries.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `npm.cmd run test:semantic-readiness` - PASS.
- `npm.cmd run validate:semantic-candidate-scope -- --base=9d7ada7a34b52c317708a97009ded2d58b4511e1 --target=64a5bff --identity=GRIXIS` - PASS for `9d7ada7..64a5bff`.
- `npm.cmd test` - PASS after installing declared dependencies and copying the local ignored Scryfall corpus into the dedicated worktree.
- `npm.cmd run test:parser` - PASS, 226 parser cases.
- Final `npm.cmd run build:factions` - PASS as exact implementation-tree export/build check.

## Not Touched
- No Gate 5 candidate workflow or candidate designation.
- No independent review.
- No certification or semantically_ready transition.
- No program-base advancement, certified-count update, Wave-count update, or Excel tracker edit.
- No VM-525 semantic work.
- No CRIT ledger mutation.
- No original-main or protected worktree edits.
- No DRIFT-017 prototype changes.
- No historical/debug/archive exclusions changed.
- No Table Talk baseline changes.

## Follow-up Recommendations
- Next authorized identity should be a Gate 5 candidate-creation-only agent for Grixis, using exact implementation HEAD `64a5bfffd646b292c7481f91c9ccb6def42fb552` if no later implementation changes occur.
- Candidate workflow must keep semantic candidate SHA and governance workflow commit distinct.
- Independent review must rerun candidate-scope, semantic readiness, generated/consumer checks, fixture/provenance checks, and full exact-tree tests rather than trusting this handoff.
- Certification remains separate and must not occur until an exact candidate SHA is independently approved.

## Next Suggested Agent
Gate 5 Candidate Workflow Agent for VM-524 Grixis.

## Related Kanban Card, Docs, Or Plans
- `docs/kanban/in-progress/VM-524-grixis-semantic-recovery.md`
- `docs/handoffs/2026-07-20-2155-codex-vm524-grixis-drift-preflight.md`
- `docs/handoffs/2026-07-20-2239-codex-vm524-grixis-gate1-gate2.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`

PASS — GRIXIS GATE 5 CANDIDATE CREATION AUTHORIZED
