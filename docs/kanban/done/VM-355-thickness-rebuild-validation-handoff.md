# VM-355 - Thickness Rebuild Validation And Handoff

ID: VM-355
Title: Thickness Rebuild Validation And Handoff
Status: done
Type: validation / generated rebuild / handoff
Area: generated artifacts / tests / handoffs
Priority: critical
Created: 2026-06-12

## Summary

Rebuild generated surfaces only from canonical source changes, validate the full target set, update handoff documentation, and close the source-bound thickness repair bundle.

## Guardrails

- Do not hand-edit generated files as source.
- If validation exposes unsupported generated content, repair canonical source or builder logic only.
- Preserve unrelated dirty worktree changes.
- Do not stage or commit files.

## Scope

- Run approved builders after canonical source edits.
- Run target validation and full tests.
- Update board and handoff index.
- Produce a handoff covering VM-349 through VM-355.

## Acceptance Criteria

- [ ] Target source-generated validation passes or blocking failures are documented.
- [ ] Placement tests pass or source-backed changes are narrowed.
- [ ] Colorless public-surface no-op is verified.
- [ ] Handoff and board are updated.

## Test Plan

- JSON parse touched raw packets.
- `npm.cmd run build:factions`
- `npm.cmd run validate:source-generated -- --targets=BR,QUANDRIX,ESPER,GRIXIS,NAYA,ABZAN,TEMUR,SULTAI,MARDU,JESKAI,COLORLESS`
- `npm.cmd run test:placement`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
