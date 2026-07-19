# 2026-07-18 17:56 - Codex - VM-520 Red Independent Review

## Agent Name

Codex

## Task Requested

Perform an independent Contract v1.1 and drift-control review of exact Red candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`, record one governance-only review decision, and stop without remediation, replacement candidate creation, certification, program-base advancement, VM-521 work, original-main modification, or Excel update.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-520-red-drift-preflight.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/handoffs/2026-07-18-1640-codex-vm520-red-drift-preflight.md`
- `docs/handoffs/2026-07-18-1705-codex-vm520-red-gate1-gate2.md`
- `docs/handoffs/2026-07-18-1727-codex-vm520-red-candidate.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/red/red.claims.json`
- `data/raw-factions/red/red.sources.json`
- `data/raw-factions/red/red.profile.json`
- `data/raw-factions/red/red.placement.json`
- `data/factions.json`
- `data/identity-layers.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/red.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/research/mono_upgrade/13_red.md`
- `docs/research/mono_upgrade/20_mechanical_color_pie_2021.md`
- `docs/research/mono_upgrade/22_council_of_colors.md`
- `docs/research/mono_upgrade/30_commander_and_rules.md`

## Files Changed

- `docs/incidents/recoveries/VM-520-red-independent-review.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-18-1756-codex-vm520-red-independent-review.md`
- `docs/handoffs/HANDOFF_INDEX.md` with only the VM-520 review row intended for staging

## What Changed

Recorded independent review decision `REQUEST CHANGES` for exact candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870`.

## Why It Changed

The exact candidate passed Contract v1.1 role/evidence/source isolation, provenance, exact fixture parity, frozen-field, preview, public/recruiter, deterministic-generation, and validation checks. Approval is blocked because the candidate does not provide Red-local testable boundaries for prompt-required Red-adjacent neighbors:

- `JESKAI`
- `JUND`
- `NAYA`

The fixtures and Red-local collision/recruiter surfaces cover other required neighbors, but the prompt-required tri-color checks are missing from the target-scoped Red guidance.

## Decisions Made

- Final review decision: `REQUEST CHANGES`.
- Do not approve the exact candidate.
- Do not remediate in this review window.
- Do not certify Red or mark it `semantically_ready`.
- Do not start VM-521.
- Preserve the allowed Table Talk baseline and original-main dirty docs/workflow baseline.

## Risks / Uncertainties

- Automated validators pass; the blocker is a manual required-neighbor/drift-control failure from the independent review prompt's stricter Red-adjacent set.
- A replacement candidate should add only source-bounded Red-local `JESKAI`, `JUND`, and `NAYA` neighbor guidance while preserving the passing Contract/provenance/preview/frozen-field state.

## Tests Run

- `git status --short --branch`
- Git object and ancestry checks.
- Candidate and workflow diff inspection.
- JSON parse checks.
- Explicit role/evidence/provenance/fixture/frozen/preview script.
- Exact stale preview and semantic-risk searches.
- Red-local `JESKAI`/`JUND`/`NAYA` fixture/collision search.
- `npm.cmd run build:factions`
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=R`
- `node research/validate-semantic-readiness.mjs --targets=R`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=6c2b6dfc3e9e838f9e75801517a81258b675923d --target=deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870 --identity=R`

## Not Touched

- Red candidate semantic/raw/generated/fixture/provenance/recruiter/runtime files.
- Candidate history.
- Replacement candidate creation.
- Certification records.
- Program base.
- VM-521.
- Original main worktree contents.
- External Excel tracker.
- Allowed Table Talk baseline files.

## Follow-Up Recommendations

Create a later VM-520 replacement candidate that remediates only the missing prompt-required `JESKAI`, `JUND`, and `NAYA` Red neighbor guidance, then submit that replacement exact SHA for fresh independent review.

## Next Suggested Agent

VM-520 Red review-fix implementation agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-520-red-semantic-recovery.md`
- `docs/incidents/recoveries/VM-520-red-independent-review.md`
- `docs/incidents/recoveries/VM-520-red-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-register.md`
