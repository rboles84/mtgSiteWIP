# VM-507 Izzet recovery candidate record

- Agent name: Codex
- Task requested: Create the immutable VM-507 Izzet recovery candidate commit and then record its exact SHA in a separate workflow-record commit.
- Related Kanban card: `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- Related report: `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`

## Files reviewed

- `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Files changed

Candidate commit `d5bca29f3c55d0d69fe8567a69c8326dcc83d770` changed:

- `data/factions.json`
- `data/placement-model.json`
- `data/raw-factions/izzet_league/izzet_league.changelog.json`
- `data/raw-factions/izzet_league/izzet_league.claims.json`
- `data/raw-factions/izzet_league/izzet_league.placement.json`
- `data/raw-factions/izzet_league/izzet_league.profile.json`
- `data/semantic-readiness-provenance.json`
- `docs/handoffs/2026-07-13-1658-codex-vm507-izzet-gate1-audit.md`
- `docs/handoffs/2026-07-13-1807-codex-vm507-izzet-gate2-evidence.md`
- `docs/handoffs/2026-07-13-2046-codex-vm507-izzet-gate3-remediation.md`
- `docs/handoffs/2026-07-13-2226-codex-vm507-izzet-gate4-validation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/recoveries/VM-507-izzet-semantic-recovery.md`
- `docs/kanban/backlog/VM-507-izzet-semantic-recovery.md`
- `research/fixtures/semantic-readiness/izzet_league.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

This workflow-record commit changes only VM-507 documentation, ledger, board, card, and handoff/index records.

## What changed

- Created immutable recovery candidate commit `d5bca29f3c55d0d69fe8567a69c8326dcc83d770`.
- Recorded candidate parent `5bc25af194d2c7e14c4350d58c9b791775253734`.
- Recorded candidate SHA in the VM-507 card, recovery report, CRIT-001 JSON ledger, generated Markdown ledger, board, and handoff records.
- Marked Izzet as pending independent Gate 5 review, not certified.

## Why it changed

Gate 5 candidate creation was explicitly authorized after Gate 3 canonical remediation, Gate 4 generation/validation, and the bounded wording-blocker resolution completed.

## Decisions made

- Preserved `data/identity-layers.json` unchanged.
- Classified the `data/factions.json` display-source cleanup as the documented Izzet-scoped exception for stale preserved public copy.
- Did not certify Izzet or start independent review.

## Risks / uncertainties

- Izzet remains uncertified until an independent reviewer approves exact SHA `d5bca29f3c55d0d69fe8567a69c8326dcc83d770` and a separate certification commit is authorized.
- Formal candidate-scope validation should be rerun by the reviewer or during any correction cycle on the exact candidate boundary.

## Tests run

- Pre-candidate worktree candidate-scope dry-run.
- `git diff --check` before candidate creation.
- Post-commit boundary checks and formal candidate-scope guard are recorded in the final response for this task.

## Not touched

- No certification commit.
- No independent review started.
- No next identity started.
- No non-Izzet raw packet.
- No builder code, Contract v1.1, schema, validators, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter behavior.
- Original main worktree `C:\dev\mtgSiteWIP` was not modified.

## Follow-up recommendations

- Send exact candidate SHA `d5bca29f3c55d0d69fe8567a69c8326dcc83d770` to independent Gate 5 review.

## Next suggested agent

Independent review agent, if explicitly authorized by the user.
