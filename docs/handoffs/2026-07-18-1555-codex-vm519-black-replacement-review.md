# 2026-07-18 15:55 - Codex - VM-519 Black Replacement Review

## Agent Name

Codex

## Task Requested

Perform a fresh independent Contract v1.1 and drift-control review of exact Black replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`, record one governance-only review decision, and stop without modifying the candidate, remediating findings, certifying Black, marking Black `semantically_ready`, advancing the program base, starting VM-520, touching original main, or modifying Excel.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/reference/semantic-readiness-contract.md`
- `docs/incidents/recoveries/VM-519-black-drift-preflight.md`
- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/incidents/recoveries/VM-519-black-independent-review.md`
- `docs/handoffs/2026-07-18-1334-codex-vm519-black-gate1-gate2.md`
- `docs/handoffs/2026-07-18-1354-codex-vm519-black-candidate.md`
- `docs/handoffs/2026-07-18-1449-codex-vm519-black-independent-review.md`
- `docs/handoffs/2026-07-18-1515-codex-vm519-black-preview-replacement.md`
- `docs/kanban/backlog/VM-519-black-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `data/raw-factions/black/black.claims.json`
- `data/raw-factions/black/black.sources.json`
- `data/raw-factions/black/black.profile.json`
- `data/raw-factions/black/black.placement.json`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/semantic-readiness-provenance.json`
- `research/fixtures/semantic-readiness/black.semantic-fixtures.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- `docs/research/mono_upgrade/12_black.md`

## Files Changed

- `docs/incidents/recoveries/VM-519-black-replacement-independent-review.md`
- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/kanban/backlog/VM-519-black-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/handoffs/2026-07-18-1555-codex-vm519-black-replacement-review.md`
- `docs/handoffs/HANDOFF_INDEX.md` with only the VM-519 replacement-review row intended for staging

## What Changed

Recorded independent replacement review decision:

`APPROVE EXACT SHA 0bfe8b3d46d163de6e20064f5de9717075ca02c8`

## Why It Changed

The replacement candidate fixes the sole prior blocker by replacing the stale generic Black preview in the source-owned identity-layer preview and regenerated embedded faction preview. Independent review verified the accepted Black semantic packet did not regress.

## Decisions Made

- Approved only exact replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`.
- Did not approve rejected candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` or workflow SHA `02974fec8242544ceb47e0d8c6b0f776593d9e03`.
- Treated candidate-scope exit 1 as an accepted DRIFT-015 display-source exception because the diff is limited to `data/identity-layers.json#/expressions/B/preview_text` and `data/factions.json#/identity_layers/expressions/B/preview_text`.
- Did not certify Black, mark it `semantically_ready`, advance program base, start VM-520, touch original main, or modify Excel.

## Risks / Uncertainties

- Certification remains pending and must occur in a separate certification window.
- `npm.cmd run test:source-generated` retains unchanged unrelated JESKAI/MARDU model-owned inhibitor warnings.

## Tests Run

- `git status --short --branch`
- JSON parse checks for changed and Black semantic JSON.
- Read-only Node regression script for preview equality, claim roles, evidence scopes, provenance, fixture chains, frozen fields, and rejected-to-replacement file scope.
- Exact and fragment stale-preview `rg` searches.
- `npm.cmd run build:factions`
- `npm.cmd run build:factions`
- `node research/audit-semantic-readiness.mjs --targets=B`
- `node research/validate-semantic-readiness.mjs --targets=B`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=604a19696d3dfb0d43d6b96676c0c6605628eb33 --target=0bfe8b3d46d163de6e20064f5de9717075ca02c8 --identity=B`

## Not Touched

- Black replacement candidate files.
- Black raw claims/profile/placement/provenance/fixtures/recruiter/runtime/test/schema/validator/scoring/calibration files.
- Rejected candidate history.
- Certification records beyond awaiting-certification governance state.
- Program base.
- VM-520 semantic work.
- Original main worktree contents.
- External Excel tracker.
- Allowed Table Talk baseline files and Table Talk index rows.

## Follow-Up Recommendations

Run a separate certification window for exact approved candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`.

## Next Suggested Agent

VM-519 Black certification agent.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-519-black-semantic-recovery.md`
- `docs/incidents/recoveries/VM-519-black-replacement-independent-review.md`
- `docs/incidents/recoveries/VM-519-black-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
