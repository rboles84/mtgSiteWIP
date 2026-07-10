# VM-443 - Copy Boundary Regression Guardrail

Status: Done
Owner: Codex
Created: 2026-06-30
Completed: 2026-06-30
Source audit: VM-439

## Summary

Add a lightweight copy-boundary checker so stale scope, deckbuilder drift, and high-risk AI-slop phrases do not return to live/public copy.

## Scope

- Add `scripts/check-copy-boundaries.mjs`.
- Add `npm.cmd run test:copy-boundaries`.
- Scope the checker to public/live copy sources only.
- Exclude docs/handoffs, docs/kanban, audit files, completed tickets, the checker script itself, and test fixtures unless intentionally included later.
- Report file path, line number, blocked phrase, and suggested replacement category.
- Update the QA plan to mark the checker as implemented.

## Acceptance Criteria

- The checker fails on the VM-439 blocked phrases when they appear in scoped live-copy files.
- The checker passes after VM-440 through VM-442 copy repairs.
- QA docs reference the implemented command instead of only a proposed checker.

## Validation

- `npm.cmd run test:copy-boundaries` - passed across 14 scoped live-copy files.
- `npm.cmd run lint:js` - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed with line-ending warnings only.

## Related

- `docs/audits/2026-06-30-vox-mana-voice-audit.md`
- `docs/qa/vox-mana-test-plan.md`
