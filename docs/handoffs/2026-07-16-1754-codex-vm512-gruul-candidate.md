# 2026-07-16 17:54 - Codex - VM-512 Gruul Candidate

## Agent Name

Codex

## Task Requested

Complete VM-512 Gruul / RG under CRIT-001 from Gate 1+2 through Gate 5 candidate creation, then stop with Gruul awaiting independent review.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- Gruul raw packet, generated consumers, provenance, and fixture surfaces.

## Files Changed

Candidate commit `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`:

- `data/raw-factions/gruul_clans/gruul_clans.claims.json`
- `data/raw-factions/gruul_clans/gruul_clans.profile.json`
- `data/raw-factions/gruul_clans/gruul_clans.placement.json`
- `data/raw-factions/gruul_clans/gruul_clans.changelog.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/fixtures/semantic-readiness/gruul_clans.semantic-fixtures.json`

Workflow-record commit will include this handoff plus VM-512 governance/report files only.

## What Changed

- Reclassified Gruul claims under Contract v1.1: 89 substantive, 6 discovery, 1 support, 0 unclassified.
- Added bounded evidence locations with `evidence_scope` to substantive claims.
- Isolated discovery-only story-corpus records as metadata/history, including restored frozen placement rows using `retained_discovery_claim_ids`.
- Added required-neighbor collision guidance and RG semantic fixtures.
- Regenerated generated consumers and semantic provenance.
- Created candidate commit `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`.
- Updated governance state to awaiting independent review, not certified.

## Why It Changed

Gate 1+2 found Gruul had no certifying substantive claims, no bounded evidence locations, discovery-backed authoritative chains, incomplete collision guidance, missing fixtures, and null generated provenance canonical IDs.

## Decisions Made

- No online source intake was needed.
- `data/identity-layers.json` was changed as a target-scoped display-source exception because the standard generator preserves RG preview copy from that file into `data/factions.json`.
- Existing confidence/scoring/calibration/lateral behavior was preserved.
- Explicit `lateral_inhibition: false` collision guidance remained non-inhibiting and did not expand generated lateral targets.

## Risks / Uncertainties

- Candidate-scope dry-run reported only documented target-scoped display-source exceptions: `data/identity-layers.json` and embedded RG preview copy in `data/factions.json`.
- Independent review has not been performed.
- Gruul is not certified and `semantically_ready` has not been set.

## Tests Run

- `npm.cmd run build:factions`
- JSON parse checks for Gruul raw/generated/provenance/fixture files
- Explicit substantive `evidence_scope` check
- Explicit discovery-ID isolation check
- Targeted stale public-copy scan
- `node research/audit-semantic-readiness.mjs --targets=RG`
- `node research/validate-semantic-readiness.mjs --targets=RG`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- Candidate-scope dry-run against temporary commit `b599d1dc314134f66f8e60ee5216293deb25943e`

## Not Touched

- No Contract v1.1 changes.
- No schema changes.
- No builder/validator changes.
- No Hall, Crucible, scoring, confidence, calibration, scheduling, tie-order, or global recruiter behavior changes.
- No VM-513 remediation.
- Original main worktree `C:\dev\mtgSiteWIP` was not touched.
- External Excel tracker was not modified.

## Follow-Up Recommendations

Independent reviewer should review exact candidate SHA `73f4f5103b0ce9605260aa6ee6ae44b03ccc4d33`.

## Next Suggested Agent

Independent reviewer for VM-512 Gruul candidate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/recoveries/VM-512-gruul-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
