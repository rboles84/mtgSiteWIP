# 2026-07-17 20:36 - Codex - VM-516 Simic Preview Remediation

## Agent Name

Codex

## Task Requested

Remediate the single approval-blocking independent-review finding for VM-516 Simic / UG, create a replacement candidate commit, and record a separate governance-only workflow commit without approval, certification, semantically_ready transition, program-base advancement, VM-517 work, original-main changes, or Excel updates.

## Files Reviewed

- `AGENTS.md`
- `docs/incidents/CRIT-001-operating-playbook.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/recoveries/VM-516-simic-drift-preflight.md`
- `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- `docs/handoffs/2026-07-17-1835-codex-vm516-simic-candidate.md`
- `docs/handoffs/2026-07-17-1931-codex-vm516-simic-independent-review.md`
- `data/identity-layers.json`
- `data/factions.json`
- `research/build-faction-artifacts.mjs`
- `research/validate-semantic-candidate-scope.mjs`
- `research/validate-source-generated-guardrails.mjs`

## Files Changed

Replacement candidate:

- `data/identity-layers.json`
- `data/factions.json`

Workflow/governance:

- `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- `docs/kanban/backlog/VM-516-simic-semantic-recovery.md`
- `docs/kanban/board.md`
- `docs/incidents/CRIT-001-identity-recovery-ledger.json`
- `docs/incidents/CRIT-001-identity-recovery-ledger.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
- `docs/handoffs/2026-07-17-2036-codex-vm516-simic-preview-remediation.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

Replacement candidate `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e` replaces the stale UG preview text:

`Simic blends Green growth with Blue knowledge. It values mutation, research, guided evolution, optimization, and becoming.`

with:

`Simic studies life as living systems to heal, adapt, and improve through biology, clades, and public health.`

The source preview in `data/identity-layers.json` was changed first, then `npm.cmd run build:factions` regenerated the embedded `data/factions.json` preview.

## Why It Changed

Independent review rejected candidate `cbca9f596a090e924d532e7cb657c27c79ccb9de` because the identity-layer preview source and embedded generated preview remained generic UG public copy. The replacement preview is bounded to approved Simic claims about living systems, medicine/public health, clades, biological adaptation, and generic-UG exclusion.

## Decisions Made

- Treated `data/identity-layers.json` as the authoritative runtime/display preview source and `data/factions.json` as the generated embedded consumer.
- Did not modify shared validators/tests because `research/validate-semantic-candidate-scope.mjs` freezes shared `research/` and code/test files for identity candidates; changing a validator to admit this candidate would be scope drift.
- Recorded permanent manual drift controls for preview ownership, source-to-embedded equality, exact stale-copy search, semantic-equivalent preview review, and embedded preview consumer inspection.
- Preserved candidate-scope output as a documented target-scoped display-source exception rather than weakening the validator.

## Risks / Uncertainties

- Exact candidate-scope validation reports the known display-source exception:
  - `identity candidate modified non-identity path data/identity-layers.json`
  - `unrelated or global data/factions.json content changed`
- A fresh independent review must decide whether this documented exception is acceptable for approval.

## Tests Run

- `git status --short --branch`
- Required object and ancestry checks for VM-516 branch history.
- JSON parse checks for `data/identity-layers.json`, `data/factions.json`, and the CRIT JSON ledger.
- Source-to-embedded preview equality check.
- Exact rejected-text scan across consumed `data`, `supabase`, and `research` surfaces.
- Semantic-equivalent preview shortcut scan.
- Explicit claim-role count check: 33 total, 23 substantive, 10 discovery, 0 support, 0 unclassified.
- Explicit substantive `evidence_scope` check.
- Discovery/support isolation check.
- UG provenance scan: 72 entries, 0 null canonical IDs, 0 null canonical content hashes, 0 unresolved pointers, 0 duplicate canonical entries.
- Exact fixture/provenance checks for `/core_identity` and `/placement_summary`.
- Frozen confidence/native-ID/term/threshold/penalty/strengthen/suppress/lateral-target/generic-collision/calibration comparisons.
- `npm.cmd run build:factions` before commit and twice after commit.
- `node research/audit-semantic-readiness.mjs --targets=UG`
- `node research/validate-semantic-readiness.mjs --targets=UG`
- `node research/semantic-candidate-scope-tests.js`
- `npm.cmd run test:semantic-readiness`
- `npm.cmd run test:placement`
- `npm.cmd run test:faction-context-isolation`
- `npm.cmd run test:source-generated`
- `npm.cmd test`
- `git diff --check`
- `node research/validate-semantic-candidate-scope.mjs --base=06f140a1e78a24d6c549943d6beb471f4e714302 --target=bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e --identity=UG`

## Not Touched

- Rejected candidate history was not amended or rewritten.
- Simic raw claims/profile/placement, fixtures, provenance, recruiter context, runtime logic, schemas, builders, validators, tests, scoring, Hall, Crucible, scheduling, and calibration were not changed in the replacement candidate.
- Original main worktree `C:\dev\mtgSiteWIP` was not modified.
- External Excel tracker was not modified.
- VM-517 was not started.
- Certification was not performed.
- Simic was not marked `semantically_ready`.
- Allowed Table Talk baseline in `docs/handoffs/HANDOFF_INDEX.md` plus two untracked Table Talk handoffs was preserved and excluded.

## Follow-Up Recommendations

Run a fresh independent review of exact replacement candidate `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`. The review should explicitly inspect the identity-layer preview source, embedded `data/factions.json` preview, and documented display-source candidate-scope exception.

## Next Suggested Agent

Independent reviewer for VM-516 replacement candidate.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/backlog/VM-516-simic-semantic-recovery.md`
- `docs/incidents/recoveries/VM-516-simic-semantic-recovery.md`
- `docs/incidents/CRIT-001-drift-register.md`
- `docs/incidents/CRIT-001-drift-control-template.md`
