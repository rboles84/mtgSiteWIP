# 2026-07-15 08:07 Codex VM-509 Lateral-Inhibition Infrastructure Unblock

## Agent name
Codex

## Task requested
Implement a narrow infrastructure unblock for VM-509 so explicit canonical `lateral_inhibition: false` on collision guidance is treated as a non-inhibiting opt-out without weakening candidate-scope detection of real inhibition behavior changes.

## Files reviewed
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `research/build-faction-artifacts.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `assets/js/adaptive-placement.js`

## Files changed
- `research/build-faction-artifacts.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-15-0807-codex-vm509-lateral-inhibition-unblock.md`

## What changed
- Extracted builder lateral-inhibition target calculation into a focused exported helper for test coverage.
- Updated candidate-scope behavior checks so added `lateral_inhibition: false` can pass only when generated lateral-inhibition targets remain unchanged.
- Added guard coverage for explicit false opt-out, true inhibition behavior, and generated lateral target expansion.
- Documented the VM-509 infrastructure unblock without creating a replacement candidate or certification.

## Why it changed
The failed VM-509 candidate showed that a guard exception alone would be unsafe because generated WR lateral targets changed. The infrastructure fix preserves explicit non-inhibiting representation while continuing to reject actual generated inhibition behavior drift.

## Decisions made
- Do not modify Boros production canonical data or generated recovery artifacts in this task.
- Do not weaken the guard: generated `lateral_inhibition_targets` changes are now checked directly.
- Keep absent `lateral_inhibition` behavior unchanged in the builder.

## Risks / uncertainties
- The failed Boros candidate still fails the updated guard because it has generated lateral target churn plus scoring/native-ID findings. Replacement reconstruction must still clean those candidate-specific issues.
- `npm.cmd run test:semantic-readiness` has a pre-existing baseline stale-provenance failure at `cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5`; production provenance was intentionally not rebuilt for this infrastructure-only unblock.

## Tests run
- `node research/semantic-candidate-scope-tests.js`
- `node research/validate-semantic-candidate-scope.mjs --base=cfc9e022cc23d00ab06f5c5b9d3bfc7db8129ad5 --target=abff94b91e94b99a6b2a77b71806a9d005ecec76 --identity=WR` (expected failure; confirms generated lateral target churn is explicitly reported)
- `npm.cmd run test:placement`
- `npm.cmd run test:semantic-readiness` in baseline worktree `C:\dev\mtgSiteWIP-crit001-baseline-vm509-infra` (fails on pre-existing stale `data/semantic-readiness-provenance.json`)
- `npm.cmd run test:semantic-readiness` in infrastructure worktree (same stale-provenance failure after contract/scope/fixture checks pass)
- `git diff --check`

## Not touched
- Boros canonical production raw packet
- Production generated recovery artifacts
- Non-Boros raw packets
- Contract, schema, Hall, Crucible, scoring calibration, confidence behavior, scheduling, tie ordering, and global recruiter behavior
- Main worktree `C:\dev\mtgSiteWIP`

## Follow-up recommendations
Reconstruct the VM-509 replacement candidate from the accepted program base plus this infrastructure unblock, then remove the candidate-specific lateral target churn, scoring-hint deltas, and retained-native-ID omissions before running the formal candidate-scope guard.

## Next suggested agent
Implementation agent for VM-509 replacement candidate cleanup, after this unblock commit is accepted as the branch base.

## Related Kanban card, docs, or plans
- `docs/kanban/backlog/VM-509-boros-semantic-recovery.md`
- `docs/kanban/board.md`
- CRIT-001 Contract v1.1 candidate-scope guard