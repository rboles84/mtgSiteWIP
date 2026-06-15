# 2026-06-14 12:16 - Codex - VM-388 Apocrypha Card Spacing Repair

## Agent Name

Codex

## Task Requested

Repair Apocrypha lower-card spacing exposed by VM-387, where grid cards inside stretched grid rows distributed leftover height as oversized internal gaps. Runtime scope was limited to `assets/css/apocrypha.css`; workflow docs were limited to Kanban, manual QA, and handoff records.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-387-apocrypha-visual-consistency-repair.md`
- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-388-apocrypha-card-spacing-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`

## What Changed

- Added `align-items: start;` to `.apoc-library-grid` only, using a separate rule so the alignment does not leak into `.apoc-guide-grid` or `.apoc-vault-grid`.
- Added `align-content: start;` to `.apoc-library-group`, `.apoc-reference-list`, `.apoc-reference-card`, and `.apoc-vault-card`.
- Extended the Apocrypha manual QA case with top-pinned reference/vault card content checks.
- Created and closed the VM-388 Kanban card after verification.

## Why It Changed

VM-387 made lower Apocrypha panels visually consistent with the route's rounded glass language, which exposed a pre-existing grid stretch issue: cards with extra row height distributed that space as large internal gaps. VM-388 keeps the new surfaces while pinning internal content to the top.

## Decisions Made

- Kept `.apoc-vault-grid` equal-height behavior intact; only the card internals were top-pinned.
- Did not alter hero, Quick Guide, How Used, `.apoc-vault-overview`, glass/radius/color tokens, HTML, JS, data, generated files, or other route CSS.
- Accepted the initial Apocrypha visual diff after review because it was limited to targeted Reference Library internal spacing and content-height column behavior.
- Refreshed only the ignored local Apocrypha visual baseline after the diff review, then reran compare to pass.

## Risks / Uncertainties

- The short Official Lore column now shrinks to content height. If it feels too sparse, that should be handled as a content follow-up, not by reintroducing stretched internal gaps.
- The Apocrypha visual suite covers hero and references views, but not the Phase 2 vault. The vault card change was verified manually in browser QA.
- VM-387 remains uncommitted in the working tree, so this handoff describes VM-388-specific deltas layered on top of that existing work.

## Tests Run

- `git diff --check` - PASS, with existing line-ending warnings.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS; generated Gate audit timestamp churn was restored afterward.
- `npm.cmd run test:visual:apocrypha` - expected FAIL before baseline refresh, with `references-desktop` mismatch only.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` - PASS after baseline refresh.
- Manual browser QA at 1366x900, 900x800, and 390x844 - PASS. Confirmed `.apoc-library-grid` uses `align-items: start`, `.apoc-guide-grid` and `.apoc-vault-grid` remain `align-items: normal`, reference card title-to-usage spacing stays tight, `.apoc-vault-card` uses `align-content: start`, and the first vault card has an 8px top-row-to-body gap.

## Not Touched

- Hero, Quick Guide, How Used, `.apoc-vault-overview`, padding, radius, color, border, and glass tokens.
- HTML, JS, data, generated artifacts, Commander data, placement files, raw packets, claim ledgers, and source ledgers.
- Other route CSS.
- Unrelated dirty/untracked research files, including `docs/research/vox-mana-decomposition-insight.html`.
- Git staging or commits.

## Follow-Up Recommendations

- If the content-height Official Lore column feels visually lonely, add a real second reference or short reviewed note as a future content card rather than changing the layout mechanics.
- Consider adding a Phase 2 vault viewport to the Apocrypha visual suite if future card-internal spacing changes continue to land there.

## Next Suggested Agent

Visual QA or Documentation Steward only if the Official Lore content follow-up is approved.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-388-apocrypha-card-spacing-repair.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/reference/manual-test-cases.md`
