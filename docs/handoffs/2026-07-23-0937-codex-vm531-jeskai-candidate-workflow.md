# VM-531 Jeskai Exact Candidate Workflow

## Agent Name

Codex

## Task Requested

Continue VM-531 Jeskai after committed drift preflight and Gate 1+2 governance, perform JESKAI-only Gate 3+4 remediation, create an exact semantic candidate commit if validations pass, run exact-candidate controls, and record the candidate workflow. Do not perform independent review, certification, Wave 5 implementation, Excel, cleanup beyond the disposable exact-test worktree, push, PR, or merge work.

## Decision

READY FOR INDEPENDENT REVIEW OF EXACT SHA `9ac575a89eca55f8bc3522083e51689f29ebd262`.

The semantic candidate is commit `9ac575a89eca55f8bc3522083e51689f29ebd262`.

This workflow record is governance only and is not an independent review or certification.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-23-0800-codex-vm531-jeskai-drift-preflight.md`
- `docs/handoffs/2026-07-23-0825-codex-vm531-jeskai-gate1-gate2.md`
- `docs/handoffs/2026-07-22-2235-codex-vm530-mardu-candidate-workflow.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-531-jeskai-semantic-recovery.md`
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
- `research/build-faction-artifacts.mjs`
- `data/raw-factions/jeskai/jeskai.claims.json`
- `data/raw-factions/jeskai/jeskai.sources.json`
- `data/raw-factions/jeskai/jeskai.profile.json`
- `data/raw-factions/jeskai/jeskai.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/research/jeskai/jeskai-evidence-ledger.md`
- `docs/research/jeskai/jeskai-source-ledger.md`

## Files Changed

Semantic candidate commit `9ac575a89eca55f8bc3522083e51689f29ebd262` changed:

- `data/raw-factions/jeskai/jeskai.claims.json`
- `data/raw-factions/jeskai/jeskai.profile.json`
- `data/raw-factions/jeskai/jeskai.placement.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/jeskai.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

This workflow governance commit changes:

- `docs/handoffs/2026-07-23-0937-codex-vm531-jeskai-candidate-workflow.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-531-jeskai-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## What Changed

- Assigned `jeskai_claim_0001` through `jeskai_claim_0010` to `substantive_claim`.
- Assigned `jeskai_claim_0011` to `support_record`.
- Added bounded evidence locations with exact `source_ids` parity for every substantive Jeskai claim.
- Added stable Jeskai-local native IDs for profile and placement provenance owner sites.
- Added 30 Jeskai semantic fixtures covering core inclusion, pressure behavior, nearest ambiguity, provenance, and all 26 required neighbor/generic/Ojutai/Dragonstorm/Commander/seed/color-philosophy exclusions.
- Regenerated source-owned Jeskai generated consumers and semantic provenance.

## Why It Changed

Gate 1+2 authorized a bounded JESKAI-only remediation. The candidate repairs role debt, evidence localization, fixture coverage, generated proof-chain scope, and provenance owner IDs without changing frozen placement/preview authority or touching Wave 5.

## Decisions Made

- `JESKAI` remains the only candidate identity key.
- `URW` remains display/color metadata only; `URW`, `WUR`, `RWU`, `UWR`, `RUW`, and `WRU` remain invalid candidate-scope identities.
- Commander/product material remains support-only and cannot prove Jeskai semantics.
- Ojutai clan remains a Dragons-era boundary, not Khans-era Jeskai Way continuity.
- Modern Dragonstorm Jeskai remains timeline-labeled and cannot backfill Khans-era Jeskai Way.
- The source-generated inhibitor warning is inherited, exit-0, and non-blocking.

## Risks / Uncertainties

- `npm.cmd ci` reports inherited audit vulnerabilities: 17 moderate and 2 high. Package and lockfile were not changed.
- Primary worktree `npm.cmd test` initially failed before dependency install because `xlsx` was missing, then passed after `npm.cmd ci` and ignored Scryfall corpus hardlink.
- Exact disposable worktree byte-strict `build-semantic-readiness-provenance.mjs --check` initially failed from Windows checkout bytes; CRLF-insensitive generated content showed no delta, and `--check` passed after local LF rewrite inside the disposable validation worktree.

## Tests Run

- `node research/audit-semantic-readiness.mjs --targets=JESKAI` - PASS; 11 claims, 10 substantive, 1 support, 21 sources.
- `node research/validate-semantic-readiness.mjs --fixtures --targets=JESKAI` - PASS.
- `node research/build-semantic-readiness-provenance.mjs --check` - PASS in primary worktree; 2043 entries.
- `node research/validate-source-generated-guardrails.mjs --targets=JESKAI` - PASS with one inherited non-blocking model-owned inhibitor warning.
- `node research/semantic-candidate-scope-tests.js` - PASS.
- `node research/validate-semantic-candidate-scope.mjs --base=9b91bbe0631ecdb45f38823ecc0fdc70bd7c12a2 --target=9ac575a89eca55f8bc3522083e51689f29ebd262 --identity=JESKAI` - PASS.
- Invalid alias checks for `URW`, `WUR`, `RWU`, `UWR`, `RUW`, and `WRU` - expected FAIL with `Unknown identity`.
- Neighbor negative check for `MARDU` - expected FAIL because the range modifies Jeskai paths and generated Jeskai consumers.
- `npm.cmd run test:faction-context-isolation` - PASS.
- `npm.cmd run test:parser` - PASS; 226 parser cases.
- `npm.cmd run test:placement` - PASS; 37 factions, 37 golden paths.
- Primary worktree `npm.cmd ci` - PASS from committed lockfile; 19 inherited audit vulnerabilities reported.
- Primary worktree ignored Scryfall corpus hardlink from `C:\dev\mtgSiteWIP-crit001\data\scryfall\raw\oracle-cards.json`.
- Primary worktree `npm.cmd test` - PASS after dependency install and ignored corpus hardlink.
- Detached exact-candidate worktree `C:\tmp\vm531-jeskai-exact-9ac575a-20260723-0835`: `npm.cmd ci` - PASS.
- Detached exact-candidate worktree: ignored Scryfall corpus hardlink created.
- Detached exact-candidate worktree: `npm.cmd test` - PASS.
- Detached exact-candidate worktree: `node research\validate-semantic-readiness.mjs --fixtures --targets=JESKAI` - PASS.
- Detached exact-candidate worktree: `node research\validate-source-generated-guardrails.mjs --targets=JESKAI` - PASS with one inherited non-blocking warning.
- Detached exact-candidate worktree: exact JESKAI candidate-scope from program base to candidate - PASS.
- Detached exact-candidate worktree: `npm.cmd run test:semantic-readiness` - PASS after disposable provenance byte normalization.
- Detached exact-candidate worktree removed and worktree metadata pruned after evidence collection.

## Not Touched

- No independent review.
- No certification.
- No `semantically_ready` transition.
- No certified-count change.
- No program-base change.
- No Wave 5/Yore implementation.
- No Excel work.
- No original-main edit.
- No DRIFT-017, DRIFT-020 implementation, historical/debug/archive, Table Talk, package, lockfile, CI, schema, validator, parser, placement runtime, or global recruiter tuning change.
- No push, PR, merge, rebase, reset, stash, amend, force operation, or permanent worktree cleanup.

## Follow-Up Recommendations

- Start a separate independent review task against exact SHA `9ac575a89eca55f8bc3522083e51689f29ebd262`.
- The reviewer should rerun exact candidate-scope from program base `9b91bbe0631ecdb45f38823ecc0fdc70bd7c12a2` to the candidate and should not trust this workflow summary alone.
- Certification may only proceed after a separate independent review returns an exact approval line for this candidate SHA.

## Next Suggested Agent

Independent Review Agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-531-jeskai-semantic-recovery.md`
- `docs/handoffs/2026-07-23-0800-codex-vm531-jeskai-drift-preflight.md`
- `docs/handoffs/2026-07-23-0825-codex-vm531-jeskai-gate1-gate2.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-contract-v1.1-amendment.md`

READY FOR INDEPENDENT REVIEW OF EXACT SHA 9ac575a89eca55f8bc3522083e51689f29ebd262
