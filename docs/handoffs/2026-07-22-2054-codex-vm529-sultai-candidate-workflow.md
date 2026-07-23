# VM-529 Sultai Exact Candidate Workflow

## Agent Name

Codex

## Task Requested

Continue VM-529 Sultai after committed drift preflight and Gate 1+2 governance, perform SULTAI-only Gate 3+4 remediation, create an exact semantic candidate commit if validations pass, run exact-candidate controls, and record the candidate workflow. Do not perform independent review, certification, VM-530, Excel, push, PR, or merge work.

## Decision

READY FOR INDEPENDENT REVIEW OF EXACT SHA `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.

The semantic candidate is commit `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.

This workflow record is governance only and is not an independent review or certification.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/workflow.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `research/semantic-readiness-lib.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/validate-source-generated-guardrails.mjs`
- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.sources.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/temur.semantic-fixtures.json`
- `research/fixtures/semantic-readiness/abzan.semantic-fixtures.json`
- `docs/research/sultai/sultai-evidence-ledger.md`
- `docs/research/sultai/sultai-source-ledger.md`

## Files Changed

Semantic candidate commit `a92fb3f8a0ec4235d5148b20c4040bd717332ad6` changed:

- `data/raw-factions/sultai/sultai.claims.json`
- `data/raw-factions/sultai/sultai.profile.json`
- `data/raw-factions/sultai/sultai.placement.json`
- `data/factions.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/sultai.semantic-fixtures.json`

This workflow governance commit changes:

- `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

- Assigned `sultai_claim_0001` through `sultai_claim_0010` to `substantive_claim`.
- Assigned `sultai_claim_0011` to `support_record`.
- Added bounded evidence locations with exact `source_ids` parity for every substantive Sultai claim.
- Added stable Sultai-local native IDs for profile and placement provenance owner sites.
- Marked Commander source-basis records as `auxiliary_support` so support-only Commander/product rows cannot prove Sultai semantics.
- Added recruiter `semantic_guidance_evidence` for each non-empty canonical guidance row.
- Added 28 Sultai semantic fixtures covering core inclusion, pressure behavior, nearest ambiguity, provenance, and every required neighbor/generic/Silumgar/Dragonstorm/Commander/seed/color-philosophy exclusion.
- Regenerated source-owned Sultai generated consumers and semantic provenance.

## Why It Changed

Gate 1+2 authorized a bounded SULTAI-only remediation. The candidate repairs role debt, evidence localization, proof-chain support isolation, recruiter evidence mapping, fixture coverage, and provenance owner IDs without changing frozen placement/preview authority or touching VM-530.

## Decisions Made

- `SULTAI` remains the only candidate identity key.
- `BGU` remains display/color metadata only; `BGU`, `GUB`, and `UBG` remain invalid candidate-scope identities.
- Commander/product material remains support-only and auxiliary.
- Modern Dragonstorm Sultai remains timeline-labeled and cannot backfill Khans-era Sultai Brood.
- Silumgar clan remains boundary/contrast material, not Sultai Brood continuity.
- The source-generated inhibitor warning is inherited, exit-0, and non-blocking.

## Risks / Uncertainties

- The primary worktree `npm.cmd test` initially failed because this worktree's local `node_modules` was missing declared dependency `xlsx`; a detached exact-candidate worktree with `npm.cmd ci` passed the full suite.
- `npm.cmd ci` reports inherited audit vulnerabilities: 17 moderate and 2 high. Package and lockfile were not changed.
- Exact-test worktree `C:\dev\mtgSiteWIP-crit001-vm529-sultai-exact-test` has generated audit report modifications after the full test run; those files are not part of the candidate.

## Tests Run

- `node research\validate-semantic-readiness.mjs --targets=SULTAI` - PASS
- `node research\validate-semantic-readiness.mjs --fixtures --targets=SULTAI` - PASS
- `node research\audit-semantic-readiness.mjs --targets=SULTAI` - PASS; 10 substantive, 1 support, 0 unclassified, 44 SULTAI provenance entries after regeneration
- `node research\validate-source-generated-guardrails.mjs --targets=SULTAI` - PASS with one inherited non-blocking model-owned inhibitor warning
- `node research\semantic-candidate-scope-tests.js` - PASS
- `npm.cmd run test:parser` - PASS; 226 parser cases
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths
- `npm.cmd run test:faction-context-isolation` - PASS
- `npm.cmd run test:source-generated` - PASS for JESKAI and MARDU with inherited non-blocking warnings
- `npm.cmd test` in primary worktree - PARTIAL; stopped after earlier PASS suites because local `node_modules` lacked declared dependency `xlsx`
- `node research\validate-semantic-candidate-scope.mjs --base=8e23ef467ec7f60daec746c14493173f96d9261c --target=a92fb3f8a0ec4235d5148b20c4040bd717332ad6 --identity=SULTAI` - PASS
- Invalid alias checks for `BGU`, `GUB`, and `UBG` - expected FAIL with `Unknown identity`
- Neighbor negative check for `TEMUR` - expected FAIL because range modifies Sultai paths
- Detached exact-candidate worktree `C:\dev\mtgSiteWIP-crit001-vm529-sultai-exact-test`: `npm.cmd ci` - PASS
- Detached exact-candidate worktree: hardlinked ignored Scryfall corpus from `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`
- Detached exact-candidate worktree: `npm.cmd test` - PASS
- Detached exact-candidate worktree: `node research\validate-semantic-readiness.mjs --fixtures --targets=SULTAI` - PASS
- Detached exact-candidate worktree: `node research\validate-source-generated-guardrails.mjs --targets=SULTAI` - PASS with one inherited non-blocking model-owned inhibitor warning
- Detached exact-candidate worktree: exact candidate-scope for SULTAI from program base to candidate - PASS

## Not Touched

- No independent review.
- No certification.
- No `semantically_ready` transition.
- No certified-count change.
- No program-base change.
- No VM-530 work.
- No Excel work.
- No original-main edit.
- No DRIFT-017, DRIFT-020 implementation, historical/debug/archive, Table Talk, package, lockfile, CI, schema, validator, parser, placement runtime, or global recruiter tuning change.
- No push, PR, merge, rebase, reset, stash, amend, or force operation.

## Follow-Up Recommendations

- Start a separate independent review task against exact SHA `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`.
- The reviewer should rerun exact candidate-scope from program base `8e23ef467ec7f60daec746c14493173f96d9261c` to the candidate and should not trust this workflow summary alone.
- Certification may only proceed after a separate independent review returns an exact approval line for this candidate SHA.

## Next Suggested Agent

Independent Review Agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-529-sultai-semantic-recovery.md`
- `docs/handoffs/2026-07-22-1950-codex-vm529-sultai-drift-preflight.md`
- `docs/handoffs/2026-07-22-2039-codex-vm529-sultai-gate1-gate2.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`

READY FOR INDEPENDENT REVIEW OF EXACT SHA a92fb3f8a0ec4235d5148b20c4040bd717332ad6
