# VM-504 Silverquill Replacement Candidate Record

Agent name: Codex
Task requested: Record the replacement VM-504 Silverquill recovery candidate SHA after independent review requested hygiene changes.

## Files reviewed

- docs/kanban/in-progress/VM-504-silverquill-semantic-recovery.md
- docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/kanban/board.md
- docs/handoffs/HANDOFF_INDEX.md

## Files changed

- docs/kanban/in-progress/VM-504-silverquill-semantic-recovery.md
- docs/incidents/recoveries/VM-504-silverquill-semantic-recovery.md
- docs/incidents/CRIT-001-identity-recovery-ledger.json
- docs/incidents/CRIT-001-identity-recovery-ledger.md
- docs/kanban/board.md
- docs/handoffs/HANDOFF_INDEX.md
- docs/handoffs/2026-07-12-2148-codex-vm504-silverquill-replacement-candidate-record.md

## What changed

Recorded replacement Silverquill recovery candidate `b9cd9e914c280e9c40c7a977b8f7c07204614d3e` for independent Gate 5 review. Superseded rejected candidate `078310b428d66e3f1423fb897d919040542a4593` remains preserved by archival tag `archive/rejected-vm504-silverquill-candidate-16127d0` at exact archived branch tip `16127d0fc8960ec78c57c1742bb2c264399042ef`. Silverquill remains uncertified; no certification commit exists.

## Why it changed

Independent review requested changes for candidate hygiene/workflow integrity: remove the CRIT ledger BOM and remove literal workflow placeholders from candidate-record documentation.

## Decisions made

- Replacement candidate parent/review base: `3baa8307cf1d6b23aab1564b866e6580e500cf66`.
- Replacement candidate recovery SHA: `b9cd9e914c280e9c40c7a977b8f7c07204614d3e`.
- Superseded rejected candidate: `078310b428d66e3f1423fb897d919040542a4593`.
- Safety ref: `archive/rejected-vm504-silverquill-candidate-16127d0` at exact archived branch tip `16127d0fc8960ec78c57c1742bb2c264399042ef`.
- Candidate-scope guard has no confidence/calibration findings.
- Remaining candidate-scope findings are documented Silverquill-scoped display-source exceptions: `data/identity-layers.json` and generated `data/factions.json` identity-layer content.

## Risks / uncertainties

- Silverquill is not certified until an independent Gate 5 review approves the exact replacement candidate SHA and a later certification commit records that approval.
- The display-source exception remains reviewer-facing and intentionally scoped to Silverquill public/generated display copy.

## Tests run

Recorded for replacement candidate validation:

- JSON parse check for `docs/incidents/CRIT-001-identity-recovery-ledger.json`.
- `node research/validate-semantic-readiness.mjs --targets=SILVERQUILL`.
- `npm.cmd run validate:source-generated -- --targets=SILVERQUILL`.
- `npm.cmd run test:semantic-readiness`.
- `npm.cmd run test:placement`.
- `npm.cmd run test:faction-context-isolation`.
- `node research/archscry-dossier-followup-tests.js`.
- `npm.cmd run dossier:audit`.
- candidate-scope guard.
- candidate/workflow/final-tree `git diff --check`.

## Not touched

- No Silverquill canonical, generated, fixture, contract, schema, validator, builder, Hall, Crucible, scoring, inhibition, confidence, scheduling, tie-ordering, or global recruiter files were modified in this workflow-record step.
- Prismari, Lorehold, and Quandrix certification state was not changed.
- No other identity was started.
- Original dirty main worktree was not modified.

## Follow-up recommendations

Independent reviewer should inspect exact replacement candidate SHA `b9cd9e914c280e9c40c7a977b8f7c07204614d3e` and either approve that exact SHA or request bounded changes.

## Next suggested agent

Independent Gate 5 reviewer.

## Related Kanban card, docs, or plans

- VM-504 Silverquill Semantic Recovery
- CRIT-001 Faction Semantic Readiness Integrity
- CRIT-001 Contract v1.1
