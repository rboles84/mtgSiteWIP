# 2026-07-12 12:19 - Codex - VM-506 Lorehold Candidate Record

## Agent name

Codex

## Task requested

Create the immutable VM-506 Lorehold semantic recovery candidate commit from completed Gate 3 and Gate 4 work, then create a separate workflow-record commit recording the exact candidate SHA. Do not certify Lorehold and do not begin independent review.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-1211-codex-vm506-lorehold-gate4-validation.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`

## Files changed

Candidate commit `c43127858e1a8609e1aed8481c2726ab03026a61` changed:

- `data/raw-factions/lorehold/lorehold.changelog.json`
- `data/raw-factions/lorehold/lorehold.claims.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/semantic-readiness-provenance.json`
- `docs/handoffs/2026-07-12-1126-codex-vm506-lorehold-gate1-audit.md`
- `docs/handoffs/2026-07-12-1142-codex-vm506-lorehold-gate2-evidence.md`
- `docs/handoffs/2026-07-12-1154-codex-vm506-lorehold-gate3-remediation.md`
- `docs/handoffs/2026-07-12-1211-codex-vm506-lorehold-gate4-validation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `research/fixtures/semantic-readiness/lorehold.semantic-fixtures.json`

Workflow-record commit files:

- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-1219-codex-vm506-lorehold-candidate-record.md`

## What changed

- Created immutable candidate recovery commit `c43127858e1a8609e1aed8481c2726ab03026a61` with parent `51667c7d91e8530a4cd508c891179893a44a14a2`.
- Recorded the exact candidate SHA in VM-506 workflow records and both CRIT-001 ledgers.
- Left Lorehold active and uncertified with independent review pending.

## Why it changed

CRIT-001 requires independent review to approve an immutable candidate SHA. This handoff records that candidate boundary without mixing in certification or new remediation.

## Decisions made

- Candidate-scope validation, full `npm.cmd test`, and `npm.cmd run test:parser` remain available for independent review / certification but were not run after candidate creation because this task was candidate creation only.
- The workflow-record commit is documentation/ledger/card/handoff only and does not alter canonical data, generated artifacts, fixtures, contract files, or shared tooling.

## Risks / uncertainties

- Lorehold is not certified until an independent reviewer approves the exact candidate SHA and a later certification commit records that approval.
- Known warnings remain unchanged: one builder-owned Lorehold inhibitor warning; dossier audit 113 warnings / 0 failures.

## Tests run

Pre-candidate inherited Gate 4 validation:

- `npm.cmd run build:factions`
- `node research/validate-semantic-readiness.mjs --targets=LOREHOLD`
- `npm.cmd run validate:source-generated -- --targets=LOREHOLD`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run dossier:audit`
- JSON parse checks
- `git diff --check`

Post-candidate workflow-record checks:

- Candidate boundary file inspection.
- Workflow-record boundary file inspection.
- `git diff --check` on candidate/workflow boundaries.
- Final `git status --short --branch`.

## Not touched

- No certification commit.
- No independent review started by this agent.
- No other identity started.
- No Prismari edits beyond status confirmation in workflow context.
- No Hall, Crucible, scoring, inhibition, confidence, tie-ordering, scheduling, or global recruiter behavior changes.
- Original dirty main worktree preserved.

## Follow-up recommendations

Send candidate `c43127858e1a8609e1aed8481c2726ab03026a61` to independent Gate 5 review.

## Next suggested agent

Independent Gate 5 reviewer.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- CRIT-001 semantic readiness recovery program
