# VM-503 Quandrix Candidate Scope-Policy Cleanup

Agent name: Codex

Task requested: Resolve or classify VM-503 candidate-scope guard failures before independent review, without certification or unrelated changes.

## Files reviewed

- docs/handoffs/HANDOFF_INDEX.md
- docs/kanban/board.md
- docs/kanban/in-progress/VM-503-quandrix-semantic-recovery.md
- docs/incidents/recoveries/VM-503-quandrix-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- data/raw-factions/quandrix/quandrix.placement.json
- data/identity-layers.json
- data/factions.json
- research/validate-semantic-candidate-scope.mjs

## Files changed

Workflow-record commit only:

- docs/kanban/in-progress/VM-503-quandrix-semantic-recovery.md
- docs/incidents/recoveries/VM-503-quandrix-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/kanban/board.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/handoffs/2026-07-12-1708-codex-vm503-quandrix-scope-policy-cleanup.md

Candidate commit changed the VM-503 canonical/generated/fixture/report files listed in the final response.

## What changed

Created new candidate `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe` after removing confidence-field deltas from the candidate-scope guard. Recorded the remaining candidate-scope findings as authorized display-source exceptions.

## Why it changed

Candidate `805ede66670485e35689a56368e242984a8e17f3` still failed scope validation on confidence-field deltas. Confidence/calibration fields are frozen, so those deltas had to be removed or explicitly blocked before independent review.

## Decisions made

- Removed added confidence fields from rewritten behavioral and inhibitor entries where the base had no confidence field.
- Preserved source-backed repaired core-value semantics while keeping confidence-bearing core-value slots, avoiding removed-confidence-path deltas.
- Treated `data/identity-layers.json` and preserved `data/factions.json` as documented authorized VM-503 display-source exceptions for the Esix blocker.
- Did not modify candidate-scope guard rules.
- Did not certify Quandrix.

## Risks / uncertainties

- Candidate-scope guard still exits non-zero because it has no approved-exception mechanism for the authorized display-source paths.
- Known builder-owned Quandrix inhibitor warning remains unchanged.
- Dossier audit remains 113 warnings / 0 failures.

## Tests run

- npm.cmd run validate:semantic-candidate-scope -- --base=41e27da9b9fe324eec5f63f26e9dd8d08a06edf9 --target=af3c2439f9c96fb4b199b4c47eea1f7c735dfebe --identity=QUANDRIX: FAILS only on `data/identity-layers.json` and `data/factions.json` display-source findings; no confidence-field deltas remain
- git diff --check on candidate boundary: PASS
- git diff --check on final tree: PASS
- node research/validate-semantic-readiness.mjs --targets=QUANDRIX: PASS
- npm.cmd run validate:source-generated -- --targets=QUANDRIX: PASS with known warning
- npm.cmd run test:semantic-readiness: PASS
- npm.cmd run test:placement: PASS
- npm.cmd run test:faction-context-isolation: PASS
- node research/archscry-dossier-followup-tests.js: PASS
- npm.cmd run dossier:audit: PASS, 113 warnings / 0 failures
- Display/generated key isolation: PASS, Quandrix-only
- Unsupported Esix scan: PASS, no generated/public matches
- Shared-infra diff check: PASS

## Not touched

- No certification commit.
- No Prismari or Lorehold semantic changes.
- No other identity started.
- No Contract v1.1, schema, validator, builder, Hall, Crucible, scoring, inhibition, confidence behavior, scheduling, tie-ordering, or global recruiter behavior changes.
- Original dirty main worktree preserved.

## Follow-up recommendations

Owner/independent review should decide whether the two documented display-source exceptions are acceptable for reviewing exact candidate SHA `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`, or whether a VM-501 guard exception mechanism is needed later. Do not certify Quandrix until an exact SHA is approved.

## Next suggested agent

Independent reviewer or owner-directed reviewer for VM-503 exact candidate `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`.

## Related Kanban card, docs, or plans

- docs/kanban/in-progress/VM-503-quandrix-semantic-recovery.md
- docs/incidents/recoveries/VM-503-quandrix-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- CRIT-001 Contract v1.1
