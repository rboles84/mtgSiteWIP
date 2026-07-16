# 2026-07-15 23:58 - Codex - VM-510 Rakdos Review Fix

## Agent

Codex

## Task requested

Respond to independent review REQUEST CHANGES for rejected Rakdos candidate `c96ceea602370fd146cdad5393d17e4cf68f8aa3` and rejected workflow record `175414aa8daba7ca6f713b93a2d3d32a9953dfd3`, fix the review findings, create a replacement candidate commit, and record workflow state without certification or next-identity work.

## Files reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-15-2252-codex-vm510-rakdos-gate3-gate4.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- Certified packet examples for `evidence_scope` and auxiliary Commander Compass support-chain conventions

## Files changed

- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.claims.json`
- `data/raw-factions/cult_of_rakdos/cult_of_rakdos.profile.json`
- `data/factions.json`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/2026-07-15-2358-codex-vm510-rakdos-review-fix.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What changed

- Added Contract v1.1 `evidence_scope` to every substantive Rakdos `evidence_locations` entry.
- Removed discovery-only story-corpus claim/source IDs from Commander Compass `source_basis` support chains.
- Added auxiliary boundary notes clarifying that Commander/card/product guidance is not authoritative Rakdos semantic proof.
- Rebuilt `data/factions.json` from the raw packet.
- Recorded the rejected candidate/workflow, review decision, blocker, medium finding, replacement candidate SHA, awaiting-review status, and not-certified state.

## Why it changed

Independent review requested changes because the rejected candidate omitted required `evidence_scope` values from all 39 substantive evidence-location entries and left discovery IDs in auxiliary Commander Compass source-basis chains.

## Decisions made

- Used established certified-packet `evidence_scope` vocabulary: `identity-wide`, `institution-specific`, `character-specific`, `mechanic-specific`, `project placement synthesis grounded in source claims`, and `required-neighbor boundary`.
- Matched the Boros pattern for Commander Compass cleanup: remove discovery-only story records from support chains and keep Commander material explicitly auxiliary.
- Judith's Commander Compass `existing_repo_claim_ids` / `existing_repo_source_ids` were emptied because only discovery-story repo evidence had been listed for that recommendation.

## Risks / uncertainties

- Commander Compass remains product/navigation guidance and is not a canonical lore proof surface.
- The replacement candidate is not certified until independent review approves the exact SHA.

## Tests run

- JSON parse checks for Rakdos raw files
- `npm.cmd run build:factions`
- Explicit check that every substantive Rakdos `evidence_locations` entry has `evidence_scope`
- Explicit check that raw/generated Commander Compass `source_basis` chains contain no discovery-only claim/source IDs
- `node research/audit-semantic-readiness.mjs --targets=BR`
- `node research/validate-semantic-readiness.mjs --targets=BR`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- Candidate-scope worktree dry-run for `30bd86bec4134cbdd136fe0c73f052f92a00bd96..worktree` and `175414aa8daba7ca6f713b93a2d3d32a9953dfd3..worktree`
- Committed candidate-scope validation for `30bd86bec4134cbdd136fe0c73f052f92a00bd96..c929a12a4f7be15cb563b2a6b050b33c32b39b7a` and `175414aa8daba7ca6f713b93a2d3d32a9953dfd3..c929a12a4f7be15cb563b2a6b050b33c32b39b7a`
- `git diff --check`

## Not touched

- No Contract v1.1 changes.
- No schema, builder, validator, runtime, scoring, confidence, calibration, scheduling, tie-order, Hall, Crucible, or global recruiter behavior changes.
- No non-Rakdos raw packet edits.
- No certification.
- No next identity started.
- Original main worktree `C:\dev\mtgSiteWIP` was not touched.

## Follow-up recommendations

- Send replacement candidate `c929a12a4f7be15cb563b2a6b050b33c32b39b7a` for independent Gate 5 review.
- Do not certify until the exact replacement candidate SHA is approved.

## Next suggested agent

Independent Gate 5 reviewer for VM-510 replacement candidate `c929a12a4f7be15cb563b2a6b050b33c32b39b7a`.

## Related Kanban card / docs

- `docs/kanban/backlog/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/recoveries/VM-510-rakdos-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
