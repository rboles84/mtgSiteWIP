# 2026-07-12 12:39 - Codex - VM-506 Lorehold Bounded Candidate Correction

## Agent name

Codex

## Task requested

Apply the bounded correction requested after independent review returned REQUEST CHANGES for Lorehold candidate `c43127858e1a8609e1aed8481c2726ab03026a61`. Fix exactly three findings, rebuild, validate, create a replacement candidate commit, then create a separate workflow-record commit. Do not certify Lorehold.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-12-1219-codex-vm506-lorehold-candidate-record.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`

## Files changed

Replacement candidate commit `6d8d46d8df0429a105c08e656a8303474c435abd` changed:

- `data/factions.json`
- `data/raw-factions/lorehold/lorehold.changelog.json`
- `data/raw-factions/lorehold/lorehold.placement.json`
- `data/raw-factions/lorehold/lorehold.profile.json`
- `data/semantic-readiness-provenance.json`

Workflow-record commit files:

- `docs/handoffs/2026-07-12-1239-codex-vm506-lorehold-bounded-correction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`

## What changed

- Preserved rejected candidate `c43127858e1a8609e1aed8481c2726ab03026a61` as audit history.
- Created replacement candidate `6d8d46d8df0429a105c08e656a8303474c435abd`.
- Restored forbidden Lorehold placement confidence-field deltas to accepted program-base values.
- Removed support-only mechanics records from authoritative `mechanics.supporting_claim_ids` while retaining them as auxiliary `support_claim_ids`.
- Removed discovery records from Commander Compass `identity_basis.supporting_claim_ids`, replaced the authoritative chain with substantive claims, and retained discovery records as discovery metadata.
- Rebuilt generated artifacts and provenance.
- Recorded the replacement candidate SHA in VM-506 workflow records and CRIT-001 ledgers.

## Why it changed

Independent review found three bounded high-severity defects in the original candidate. The correction keeps CRIT-001’s exact-SHA review model intact without restarting Lorehold or broadening scope.

## Decisions made

- No source research was added.
- No Contract v1.1, shared schema, validator, builder, Hall, Crucible, scoring, inhibition, confidence behavior, scheduling, tie-ordering, or global recruiter behavior changes were made.
- Lorehold remains active and uncertified with independent review pending.

## Risks / uncertainties

- The replacement candidate still requires independent Gate 5 review before certification.
- Known warnings remain unchanged: one builder-owned Lorehold inhibitor warning; dossier audit 113 warnings / 0 failures.

## Tests run

```powershell
npm.cmd run build:factions
node research/validate-semantic-readiness.mjs --targets=LOREHOLD
npm.cmd run validate:source-generated -- --targets=LOREHOLD
npm.cmd run test:semantic-readiness
npm.cmd run test:placement
npm.cmd run test:faction-context-isolation
npm.cmd run dossier:audit
npm.cmd run validate:semantic-candidate-scope -- --base=51667c7d91e8530a4cd508c891179893a44a14a2 --target=6d8d46d --identity=LOREHOLD
git diff --check
```

Results:

- Build passed after sandbox escalation for generated-file writes.
- Semantic readiness validation passed.
- Source/generated validation passed with 1 known builder-owned inhibitor warning and 0 failures.
- Semantic readiness tests passed.
- Placement tests passed: 37 factions, 37 golden paths.
- Faction-context isolation tests passed.
- Dossier audit passed with 113 warnings and 0 failures after sandbox escalation for the ignored artifact write.
- Candidate-scope guard passed.
- `git diff --check` passed with line-ending warnings only.

## Not touched

- No certification commit.
- No other identity started.
- No Prismari edits beyond status confirmation in workflow context.
- No non-Lorehold raw packet.
- No Contract v1.1, shared schema, validators, builder scripts, Hall/Crucible banks, scoring, inhibition, confidence behavior, scheduling, tie ordering, or global recruiter behavior.
- Original dirty main worktree preserved.

## Follow-up recommendations

Send replacement candidate `6d8d46d8df0429a105c08e656a8303474c435abd` to independent Gate 5 review.

## Next suggested agent

Independent Gate 5 reviewer.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/recoveries/VM-506-lorehold-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- CRIT-001 semantic readiness recovery program
