# 2026-07-17 11:06 - Codex - VM-515 Selesnya Candidate

## Agent Name

Codex

## Task Requested

Complete VM-515 Selesnya / WG Gate 3+4 remediation, generation, validation, Gate 5 candidate creation, and separate workflow-record update. Stop with Selesnya awaiting independent review.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/reference/ravnica-guild-source-readiness-matrix.md`
- `docs/incidents/recoveries/VM-515-selesnya-semantic-recovery.md`
- `docs/kanban/backlog/VM-515-selesnya-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- Selesnya raw packet under `data/raw-factions/selesnya_conclave/`
- Generated consumers and provenance for WG
- Recent Dimir, Orzhov, Gruul, Golgari, and Rakdos recovery precedents

## Files Changed

Candidate commits:

- `data/raw-factions/selesnya_conclave/selesnya_conclave.claims.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.profile.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.placement.json`
- `data/raw-factions/selesnya_conclave/selesnya_conclave.changelog.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/selesnya_conclave.semantic-fixtures.json`

Workflow-record commit:

- `docs/incidents/recoveries/VM-515-selesnya-semantic-recovery.md`
- `docs/kanban/backlog/VM-515-selesnya-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-17-1106-codex-vm515-selesnya-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md` receives only the VM-515 candidate row; unrelated Table Talk rows remain uncommitted.

## What Changed

- Remediated Selesnya from 17 unaudited claims to 33 claims: 23 `substantive_claim`, 10 `discovery_record`, 0 `support_record`, 0 `unclassified`.
- Added bounded evidence locations and `evidence_scope` for substantive claims.
- Isolated discovery/story-corpus rows from authoritative proof chains.
- Rebuilt WG generated provenance and recruiter/public consumers.
- Added WG semantic fixtures, including required-neighbor exclusions and exact provenance fixtures.
- Created superseded candidate `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7`, then replacement candidate `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`.
- Updated governance to show Selesnya awaiting independent review, not certified, and not semantically_ready.

## Why It Changed

Gate 1+2 authorized a claim-extraction pass because Selesnya had no substantive claims, no bounded evidence scopes, discovery-backed proof-chain contamination, missing WG fixtures, and null provenance IDs.

## Decisions Made

- Used only existing listed/local Selesnya sources; no online intake.
- Kept discovery/story-corpus material as metadata/history only.
- Retained the native event ID `event_selesnya_conclave_selesnya_conclave_claim_004`.
- Preserved frozen placement confidence/calibration/lateral-target behavior.
- Treated `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7` as superseded because candidate-scope rejected frozen confidence/native-ID retention and generated proof-chain contamination.
- Replacement candidate `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5` is the exact SHA awaiting independent review.

## Risks / Uncertainties

- Independent review has not happened.
- Selesnya is not certified and not semantically_ready.
- Known unrelated JESKAI/MARDU source-generated model-owned inhibitor warnings remain unchanged.
- The active Table Talk side-scan baseline remains dirty and intentionally uncommitted.

## Tests Run

- JSON parse checks for changed JSON files.
- Duplicate-ID checks on Selesnya canonical chains.
- Exact fixture/provenance chain comparison.
- Evidence-scope check.
- Discovery/support isolation check.
- Null canonical ID/hash scan.
- Stale public/recruiter-copy scan.
- Frozen placement confidence/calibration/native-ID/lateral-target checks.
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=WG`
- `node research/validate-semantic-readiness.mjs --targets=WG`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `node research/validate-semantic-candidate-scope.mjs --base=99a239dea91039a13511d155f9b652d297baab21 --target=02252cbb24ec4ce615c85e8ad07d62d3be7db7e5 --identity=WG`
- `git diff --check`

## Not Touched

- Contract v1.1, schemas, builders, validators, Hall, Crucible, scoring, confidence behavior, calibration logic, scheduling, tie-order, and global recruiter behavior.
- Non-Selesnya raw packets.
- Original main worktree `C:\dev\mtgSiteWIP`.
- External Excel tracker.
- VM-516 source data or semantic work.
- Unrelated Table Talk handoff files.

## Follow-Up Recommendations

- Run an independent review of exact candidate `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`.
- Do not certify Selesnya unless independent review approves that exact SHA.
- Preserve superseded candidate `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7` as unapproved.

## Next Suggested Agent

Independent reviewer for VM-515 Selesnya candidate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-515-selesnya-semantic-recovery.md`
- `docs/incidents/recoveries/VM-515-selesnya-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-operating-playbook.md`
