# VM-388 - Apocrypha Card Spacing Repair

Status: Done
Owner: Codex
Created: 2026-06-14
Closed: 2026-06-14

## Summary

Repaired the Apocrypha card spacing regression exposed by VM-387, where grid cards inside stretched rows distributed leftover height as oversized internal gaps.

## Scope

- Edited runtime styling only in `assets/css/apocrypha.css`.
- Kept `.apoc-vault-grid` equal-height behavior intact.
- Preserved hero, Quick Guide, How Used, `.apoc-vault-overview`, padding, radius, color, border, glass tokens, HTML, JS, data, generated files, and all other route CSS.

## Acceptance

- `.apoc-library-grid` now uses content-height columns without affecting Quick Guide or Vault grids.
- Reference Library card content is top-pinned, with titles directly above `Used for:`.
- Phase 2 vault card badge and body text are top-pinned inside equal-height vault tiles.
- Apocrypha visual diff was reviewed before the local baseline refresh and contained only the targeted spacing changes.

## Testing

- `git diff --check` - PASS.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `npm.cmd run test:visual:apocrypha` - expected FAIL before baseline refresh for `references-desktop` only; diff reviewed as targeted.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` - PASS after baseline refresh.
- Manual browser QA at desktop, tablet-ish, and mobile widths confirmed the Reference Library and Phase 2 vault content are top-pinned with no horizontal overflow.

## Notes

- The short Official Lore column now shrinks to content height. If it feels too sparse, treat that as a content follow-up rather than restoring stretch behavior.
