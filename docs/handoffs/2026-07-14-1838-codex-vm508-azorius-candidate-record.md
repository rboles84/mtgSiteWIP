# VM-508 Azorius Recovery Candidate Record

Agent name: Codex

Task requested: Create the immutable VM-508 Azorius recovery candidate commit and then record its exact SHA in a separate workflow-record commit, without certification, independent review, or another identity start.

Files reviewed:

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-14-1738-codex-vm508-azorius-pre-candidate-cleanup.md`
- `docs/handoffs/2026-07-14-1616-codex-vm508-azorius-gate4-validation.md`
- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

Files changed:

Candidate commit `221a19b690cad02fb9aba2c91ae506b6d4fcc205` changed:

- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/raw-factions/azorius_senate/azorius_senate.changelog.json`
- `data/raw-factions/azorius_senate/azorius_senate.claims.json`
- `data/raw-factions/azorius_senate/azorius_senate.placement.json`
- `data/raw-factions/azorius_senate/azorius_senate.profile.json`
- `data/raw-factions/azorius_senate/azorius_senate.sources.json`
- `data/semantic-readiness-provenance.json`
- `docs/handoffs/2026-07-14-0705-codex-vm508-azorius-gate1-audit.md`
- `docs/handoffs/2026-07-14-0803-codex-vm508-azorius-gate2-evidence.md`
- `docs/handoffs/2026-07-14-1317-codex-vm508-azorius-gate3-remediation.md`
- `docs/handoffs/2026-07-14-1616-codex-vm508-azorius-gate4-validation.md`
- `docs/handoffs/2026-07-14-1738-codex-vm508-azorius-pre-candidate-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `research/fixtures/semantic-readiness/azorius_senate.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

This workflow-record commit changes only VM-508 documentation, ledger, board, card, and handoff/index records.

What changed:

- Created immutable recovery candidate commit `221a19b690cad02fb9aba2c91ae506b6d4fcc205`.
- Recorded candidate parent `ad6322d4cb2120e83788a4af0dca7ef21cad4cc2`.
- Recorded candidate SHA in the VM-508 card, recovery report, CRIT-001 JSON ledger, Markdown ledger, board, and handoff records.
- Marked Azorius as pending independent Gate 5 review, not certified.

Why it changed:

- Gate 5 candidate creation was explicitly authorized after Gate 3 canonical remediation, Gate 4 generation/validation, and the pre-candidate scope cleanup completed.

Decisions made:

- Classified the `data/factions.json` and `data/identity-layers.json` findings as the documented WU/Azorius display-source exception.
- Preserved Lavinia as discovery metadata under `data_quality.corpus_upgrade.retained_native_ids`; it was not promoted into `key_figures`.
- Did not certify Azorius or start independent review.

Risks / uncertainties:

- Azorius remains uncertified until an independent reviewer approves exact SHA `221a19b690cad02fb9aba2c91ae506b6d4fcc205` and a separate certification commit is authorized.
- Formal candidate-scope validation should be rerun by the reviewer or during any correction cycle on the exact candidate boundary.

Tests run:

- Pre-candidate worktree candidate-scope dry-run.
- `git diff --check` before candidate creation.
- Post-commit boundary checks and formal candidate-scope guard are recorded in the final response for this task.

Not touched:

- No certification commit.
- No independent review started.
- No next identity started.
- No non-Azorius raw packet.
- No builder code, Contract v1.1, schema, validators, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter behavior.
- Original main worktree `C:\dev\mtgSiteWIP` was not modified.

Follow-up recommendations:

- Send exact candidate SHA `221a19b690cad02fb9aba2c91ae506b6d4fcc205` to independent Gate 5 review.

Next suggested agent: Independent review agent, if explicitly authorized by the user.

Related Kanban card, docs, or plans:

- `docs/kanban/backlog/VM-508-azorius-semantic-recovery.md`
- `docs/incidents/recoveries/VM-508-azorius-semantic-recovery.md`
- CRIT-001 Contract v1.1
