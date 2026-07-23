# VM-530 Mardu Exact Candidate Workflow

## Agent Name

Codex

## Task Requested

Continue VM-530 Mardu after committed drift preflight and Gate 1+2 governance, perform MARDU-only Gate 3+4 remediation, create an exact semantic candidate commit if validations pass, run exact-candidate controls, and record the candidate workflow. Do not perform independent review, certification, VM-531, Excel, cleanup, push, PR, or merge work.

## Decision

READY FOR INDEPENDENT REVIEW OF EXACT SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`.

The semantic candidate is commit `96df085ff38d03da1e37de80b1e11705b1dfa47a`.

This workflow record is governance only and is not an independent review or certification.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- `docs/handoffs/2026-07-22-2054-codex-vm529-sultai-candidate-workflow.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `research/semantic-readiness-lib.mjs`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `research/validate-source-generated-guardrails.mjs`
- `research/build-semantic-readiness-provenance.mjs`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/sultai.semantic-fixtures.json`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-source-ledger.md`

## Files Changed

Semantic candidate commit `96df085ff38d03da1e37de80b1e11705b1dfa47a` changed:

- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/mardu.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

This workflow governance commit changes:

- `docs/handoffs/2026-07-22-2235-codex-vm530-mardu-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

- Assigned `mardu_claim_0001` through `mardu_claim_0010` to `substantive_claim`.
- Assigned `mardu_claim_0011` to `support_record`.
- Added bounded evidence locations with exact `source_ids` parity for every substantive Mardu claim.
- Added stable Mardu-local native IDs for profile and placement provenance owner sites.
- Added 30 Mardu semantic fixtures covering core inclusion, pressure behavior, nearest ambiguity, provenance, and all 26 required neighbor/generic/Kolaghan/Dragonstorm/Commander/seed/color-philosophy exclusions.
- Regenerated source-owned Mardu generated consumers and semantic provenance.

## Why It Changed

Gate 1+2 authorized a bounded MARDU-only remediation. The candidate repairs role debt, evidence localization, fixture coverage, generated proof-chain scope, and provenance owner IDs without changing frozen placement/preview authority or touching VM-531.

## Decisions Made

- `MARDU` remains the only candidate identity key.
- `RWB` remains display/color metadata only; `RWB`, `WBR`, and `BRW` remain invalid candidate-scope identities.
- Commander/product material remains support-only and cannot prove Mardu semantics.
- Kolaghan clan remains a Dragons-era boundary, not Khans-era Mardu Horde continuity.
- Modern Dragonstorm Mardu remains timeline-labeled and cannot backfill Khans-era Mardu Horde.
- The source-generated inhibitor warning is inherited, exit-0, and non-blocking.

## Risks / Uncertainties

- `npm.cmd ci` reports inherited audit vulnerabilities: 17 moderate and 2 high. Package and lockfile were not changed.
- The disposable exact-test worktree initially failed byte-strict `build-semantic-readiness-provenance.mjs --check` after checkout because CRLF-normalized working-tree bytes differed from the generated LF output; normalized JSON content matched, generated provenance had no Git diff, and `--check` passed after local LF rewrite inside the disposable validation worktree.
- Exact-test worktree `C:\Users\obake\AppData\Local\Temp\vm530-mardu-exact-96df085-20260723` has generated audit report modifications after the full test run; those files are not part of the candidate.

## Tests Run

- `npm.cmd ci` - PASS in primary worktree; installed locked dependencies only.
- `npm.cmd test` - PASS in primary worktree after ignored Scryfall corpus hardlink.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=MARDU` - PASS.
- `node research/build-semantic-readiness-provenance.mjs --check` - PASS in primary worktree.
- `node research/validate-source-generated-guardrails.mjs --targets=MARDU` - PASS with one inherited non-blocking model-owned inhibitor warning.
- `node research/validate-semantic-candidate-scope.mjs --base=7970c14822ce006c0d88f95cc6ed01bb3c79b81f --target=96df085ff38d03da1e37de80b1e11705b1dfa47a --identity=MARDU` - PASS.
- Invalid alias checks for `RWB`, `WBR`, and `BRW` - expected FAIL with `Unknown identity`.
- Unknown identity check for `NOT_A_REAL_IDENTITY` - expected FAIL with `Unknown identity`.
- Neighbor negative check for `JESKAI` - expected FAIL because the range modifies Mardu paths and Jeskai remains unremediated.
- Detached exact-candidate worktree `C:\Users\obake\AppData\Local\Temp\vm530-mardu-exact-96df085-20260723`: `npm.cmd ci` - PASS.
- Detached exact-candidate worktree: hardlinked ignored Scryfall corpus from `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`.
- Detached exact-candidate worktree: `npm.cmd test` - PASS.
- Detached exact-candidate worktree: `node research\validate-semantic-readiness.mjs --fixtures --targets=MARDU` - PASS.
- Detached exact-candidate worktree: `node research\validate-source-generated-guardrails.mjs --targets=MARDU` - PASS with one inherited non-blocking model-owned inhibitor warning.
- Detached exact-candidate worktree: exact candidate-scope for MARDU from program base to candidate - PASS.
- Detached exact-candidate worktree: `node research\build-semantic-readiness-provenance.mjs --check` - PASS after confirming the first miss was CRLF-only and rewriting generated LF bytes locally inside the disposable tree.

## Not Touched

- No independent review.
- No certification.
- No `semantically_ready` transition.
- No certified-count change.
- No program-base change.
- No VM-531 work.
- No Excel work.
- No original-main edit.
- No DRIFT-017, DRIFT-020 implementation, historical/debug/archive, Table Talk, package, lockfile, CI, schema, validator, parser, placement runtime, or global recruiter tuning change.
- No push, PR, merge, rebase, reset, stash, amend, force operation, or permanent worktree cleanup.

## Follow-Up Recommendations

- Start a separate independent review task against exact SHA `96df085ff38d03da1e37de80b1e11705b1dfa47a`.
- The reviewer should rerun exact candidate-scope from program base `7970c14822ce006c0d88f95cc6ed01bb3c79b81f` to the candidate and should not trust this workflow summary alone.
- Certification may only proceed after a separate independent review returns an exact approval line for this candidate SHA.

## Next Suggested Agent

Independent Review Agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-530-mardu-semantic-recovery.md`
- `docs/handoffs/2026-07-22-2157-codex-vm530-mardu-drift-preflight.md`
- `docs/handoffs/2026-07-22-2213-codex-vm530-mardu-gate1-gate2.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`

READY FOR INDEPENDENT REVIEW OF EXACT SHA 96df085ff38d03da1e37de80b1e11705b1dfa47a
