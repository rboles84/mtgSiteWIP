# Handoff: VM-521 Green Candidate

## Agent Name

Codex

## Task Requested

Complete VM-521 Green / G CRIT-001 Gate 3+4 remediation through Gate 5 candidate creation and a separate workflow-record commit only. Do not run independent review, approve, certify, mark semantically_ready, advance the program base, start VM-522/Wave 4, touch original main, touch Excel, or stage Table Talk baseline files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/recoveries/VM-521-green-drift-preflight.md`
- `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `data/raw-factions/green/green.claims.json`
- `data/raw-factions/green/green.sources.json`
- `data/raw-factions/green/green.profile.json`
- `data/raw-factions/green/green.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `research/validate-semantic-candidate-scope.mjs`
- `research/semantic-candidate-scope-tests.js`

## Files Changed

Candidate commits:

- `data/raw-factions/green/green.claims.json`
- `data/raw-factions/green/green.sources.json`
- `data/raw-factions/green/green.profile.json`
- `data/raw-factions/green/green.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/green.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

Workflow-record commit:

- `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`
- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/handoffs/2026-07-18-2147-codex-vm521-green-candidate.md`
- `docs/handoffs/HANDOFF_INDEX.md` VM-521 row only

## What Changed

- Created final Green candidate `45e323cde853ee5058b71c819f080ab4025597ce`.
- Preserved superseded candidate `83123037f619472a4d2834e124311df691281a53` after candidate-scope flagged a forbidden calibration-note change.
- Classified Green claims as 6 substantive and 2 support records.
- Added bounded evidence locations and source scopes for substantive claims.
- Isolated governance, rules, Scryfall, Commander support, mechanics, and changelog material from philosophical proof chains.
- Repaired the stale VM-377 source locator.
- Added Green semantic fixtures with required neighbor exclusions and provenance fixtures.
- Regenerated placement model, semantic provenance, factions, and recruiter context.
- Remediated Green preview source and generated embedded consumer under a documented display-source exception.
- Updated VM-521 governance docs to candidate-awaiting-review state only.

## Why It Changed

Gate 1+2 authorized scoped remediation because Green had sufficient source evidence but failed Contract v1.1 readiness: unclassified claims, missing evidence locations, support/provenance leakage, stale VM-377 locator, missing fixtures, generic preview risk, and insufficient required-neighbor coverage.

## Decisions Made

- Only final candidate `45e323cde853ee5058b71c819f080ab4025597ce` may proceed to independent review.
- Candidate-scope exit 1 is accepted only as the documented Green display-source exception for `data/identity-layers.json#/expressions/G/preview_text` and generated `data/factions.json#/identity_layers/expressions/G/preview_text`.
- Green remains not approved, not certified, and not semantically_ready.
- VM-522 remains untouched.

## Risks / Uncertainties

- Independent review has not started.
- Candidate-scope exits 1 because the guard does not permit identity-layer preview source edits even when required for DRIFT-015/017 remediation; this is documented and target-scoped.
- Existing `npm.cmd run test:source-generated` warnings for JESKAI and MARDU model-owned inhibitor traps remain unchanged.
- Table Talk handoff/index baseline remains dirty and intentionally unstaged.

## Tests Run

- `npm.cmd run build:factions`
- Build idempotence file-hash check
- Green drift invariant script
- `node research/audit-semantic-readiness.mjs --targets=G`
- `node research/validate-semantic-readiness.mjs --targets=G`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=332ab81ffcfa461df1109e89709d47907e7c0032 --target=HEAD --identity=G`

## Not Touched

- No independent review.
- No approval.
- No certification.
- No semantically_ready status.
- No program-base advancement.
- No VM-522 or Wave 4 semantic work.
- No original-main edits.
- No Excel update.
- No push, PR, merge, or deployment.
- No Table Talk files staged or committed.

## Follow-up Recommendations

- Run independent review against exact candidate SHA `45e323cde853ee5058b71c819f080ab4025597ce`.
- Treat candidate `83123037f619472a4d2834e124311df691281a53` as superseded and unapproved.
- If review approves, certify only the exact approved candidate SHA in a separate certification workflow.

## Next Suggested Agent

Independent Reviewer

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-521-green-semantic-recovery.md`
- `docs/incidents/recoveries/VM-521-green-semantic-recovery.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
