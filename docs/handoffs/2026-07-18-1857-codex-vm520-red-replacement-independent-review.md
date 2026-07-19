# 2026-07-18 18:57 - Codex - VM-520 Red Replacement Independent Review

## Agent name

Codex

## Task requested

Perform an independent Contract v1.1 and drift-control review of exact Red replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`, record exactly one decision, and commit a governance-only review record. Do not remediate, certify Red, mark `semantically_ready`, start VM-521, touch original main, or modify the external Excel tracker.

## Files reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-independent-review.md`
- `docs/handoffs/2026-07-18-1824-codex-vm520-red-replacement-candidate.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.sources.json`
- `data/raw-factions/red/red.profile.json`
- `data/raw-factions/red/red.placement.json`
- `docs/research/mono_upgrade/13_red.md`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`

## Files changed

- `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-18-1857-codex-vm520-red-replacement-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md` with only the VM-520 replacement-review row intended for staging.

## What changed

- Recorded independent review decision `APPROVE EXACT SHA 6aefb2090ff20a361f7f3cd80515445036323158`.
- Documented replacement-only file scope, candidate-to-workflow isolation, source/Contract checks, Red semantic and required-neighbor review, preview equality, fixture/provenance parity, frozen-field checks, validation results, drift scorecard, and final safety constraints.
- Updated VM-520 governance state to approved awaiting certification, without certifying Red or advancing program base.
- Updated DRIFT-018 from open/request-changes to remediated and independently approved, certification pending.

## Why it changed

The replacement candidate remediated the sole blocker from the rejected Red candidate by adding Red-local `JESKAI`, `JUND`, and `NAYA` boundaries while preserving the accepted Contract, provenance, fixture, preview, public/recruiter, frozen-field, and validation state.

## Decisions made

- Approve only exact replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`.
- Preserve rejected candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` and rejection review `7bb7b0830dffc718ec3a2546fd489d0cb9ec0359`.
- Treat exact candidate-scope exit 1 as the already documented R display-source exception only because diagnostics remain limited to `data/identity-layers.json` and `data/factions.json` preview paths.
- Leave certification, `semantically_ready`, program-base advancement, external tracker update, and VM-521 out of scope.

## Risks / uncertainties

- Certification still must be performed as a separate exact-approved-candidate task.
- `npm.cmd run test:source-generated` retains known unrelated JESKAI/MARDU model-owned inhibitor warnings.
- `git diff --check` reports only the known handoff-index line-ending warning from the preserved Table Talk baseline.

## Tests run

- JSON parse checks for changed/generated Red JSON.
- Explicit Red invariant script for claim roles, evidence scopes, provenance, fixture parity, preview equality, required neighbors, replacement boundary surfaces, and frozen fields.
- `npm.cmd run build:factions`
- second `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/validate-semantic-readiness.mjs --targets=R`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=6aefb2090ff20a361f7f3cd80515445036323158 --identity=R`

## Not touched

- Candidate semantic/raw/generated/fixture/provenance/recruiter/runtime/test/validator/schema/scoring files.
- Original main `C:\dev\mtgSiteWIP`.
- External Excel tracker.
- VM-521.
- Certification or program-base records.
- Allowed Table Talk baseline files were preserved and excluded.

## Follow-up recommendations

Run the separate certification task only for exact approved replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`. Do not start VM-521 until Red certification is complete and recorded.

## Next suggested agent

Certification agent for exact approved Red replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`.

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-replacement-independent-review.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-register.md`
