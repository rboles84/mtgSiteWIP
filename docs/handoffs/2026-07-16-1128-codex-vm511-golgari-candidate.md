# VM-511 Golgari Gate 3+4 And Gate 5 Candidate Handoff

- Agent name: Codex
- Task requested: Complete VM-511 Golgari implementation side through Gate 5 candidate creation only; do not perform independent review, certify, or start another identity.
- Related Kanban card: `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- Related report: `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- Branch: `codex/vm-511-golgari-semantic-recovery`
- Starting SHA: `5c221f342ae4f95920ece35261dd7f34afeaa667`
- Gate 1+2 report commit: `da25a3aa43e88fa46e37ca82b76e066631ae53d5`
- Candidate commit: `a649c306f19d0be3c9f09f549163200761ce9e15`

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- Golgari raw packet files under `data/raw-factions/golgari_swarm/`
- Generated BG consumers in `data/factions.json`, `data/placement-model.json`, `data/semantic-readiness-provenance.json`, and `supabase/functions/guild-recruiter/faction-context.ts`
- `research/validate-semantic-readiness.mjs`
- `research/validate-semantic-candidate-scope.mjs`

## Files Changed

- `data/raw-factions/golgari_swarm/golgari_swarm.claims.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.profile.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.placement.json`
- `data/raw-factions/golgari_swarm/golgari_swarm.changelog.json`
- `research/fixtures/semantic-readiness/golgari_swarm.semantic-fixtures.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/incidents/recoveries/VM-511-golgari-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/kanban/backlog/VM-511-golgari-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-16-1128-codex-vm511-golgari-candidate.md`

## What Changed

- Added Golgari semantic roles, bounded evidence locations, source-bounded placement claims, and required-neighbor boundary claims.
- Fenced discovery-only story-corpus rows as discovery metadata only.
- Rebound Golgari profile, placement, recruiter guidance, collision guidance, generated consumers, fixtures, and provenance to substantive claims.
- Added BG semantic fixtures for core inclusion, pressure behavior, required-neighbor exclusions, ambiguity, and provenance.
- Repaired target-scoped BG `data/factions.json` raw-enrichment display chains because the builder preserves existing BG display raw-enrichment rather than rebuilding it from raw profile.
- Created Gate 5 candidate commit `a649c306f19d0be3c9f09f549163200761ce9e15`.

## Why It Changed

Gate 1+2 found Golgari uncertifiable under CRIT-001 Contract v1.1: no certifying semantic roles, no bounded evidence locations, discovery-chain contamination, missing fixtures, missing collision guidance, and stale generated provenance. Gate 3+4 remediated those blockers within local/listed evidence and generated the candidate artifacts.

## Decisions Made

- Did not add new online sources.
- Did not change schemas, builders, validators, contract, scoring, confidence, calibration, Hall, Crucible, scheduling, tie-order, or true lateral-inhibition behavior.
- Kept `src_wotc_dragons_maze_mechanics_2013` support-only.
- Kept story-corpus rows as discovery records only.
- Retained `char_izoni` only as discovery metadata.
- Used non-inhibiting collision guidance for all required neighbors.

## Risks / Uncertainties

- Independent review has not been performed.
- Golgari is not certified.
- The BG display raw-enrichment repair is a documented target-scoped display-source exception caused by existing builder behavior.
- Source localization uses reviewed source-record locators rather than line-numbered excerpts, matching the recent accepted Rakdos pattern.

## Tests Run

- `npm.cmd run build:factions` - passed.
- `node research/validate-semantic-readiness.mjs --targets=BG` - passed.
- `npm.cmd run test:semantic-readiness` - passed.
- `npm.cmd run test:placement` - passed.
- `npm.cmd run test:faction-context-isolation` - passed.
- `npm.cmd run test:source-generated` - passed with unchanged JESKAI/MARDU warnings.
- `npm.cmd test` - passed.
- `node research/validate-semantic-candidate-scope.mjs --base=da25a3aa43e88fa46e37ca82b76e066631ae53d5 --target=HEAD --identity=BG` - passed.
- `git diff --check` - passed.

## Not Touched

- No independent review performed.
- No certification performed.
- No VM-512 / Gruul or other identity started.
- No original main worktree edits.
- No non-Golgari raw packet edits.
- No schema, builder, validator, runtime scoring, calibration, confidence, Hall, Crucible, scheduling, tie-order, or global recruiter behavior changes.

## Follow-Up Recommendations

- Next suggested agent: independent reviewer for exact SHA `a649c306f19d0be3c9f09f549163200761ce9e15`.
- If approved, use a separate governance-only certification pass.
- If changes are requested, create a replacement candidate path rather than mutating the rejected candidate.
