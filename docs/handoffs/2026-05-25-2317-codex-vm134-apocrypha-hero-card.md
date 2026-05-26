# 2026-05-25 23:17 - Codex - VM-134 Apocrypha Hero Card

## Agent Name

Codex

## Task Requested

Create the ready Kanban card for `VM-134 - Apocrypha Hero Unification Pass` using the approved Apocrypha-first plan, avoid the existing `VM-133` collision, preserve `/library/` as a compatibility alias, and record the planning handoff without implementing route changes.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`
- `docs/handoffs/2026-05-25-1858-codex-vm129c-maze-atmosphere-convergence.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-133-strategium-glass-readability-polish.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `library/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`

## Files Changed

- `docs/kanban/ready/VM-134-apocrypha-hero-unification-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-25-2317-codex-vm134-apocrypha-hero-card.md`

## What Changed

- Created the `VM-134` ready card for an Apocrypha-only hero unification pass.
- Added `VM-134` to the board under `Ready`.
- Recorded the benchmark rule that current committed `newIndex2.html` is the reference frame, while `VM-088` must be re-reviewed if it expands into broader Home hero layout changes.
- Preserved `/library/` as an explicit compatibility alias and called out alias retirement as a separate product decision.
- Updated the handoff index with this planning/card creation handoff.

## Why It Changed

The user identified that Apocrypha's hero feels visually disconnected from `newIndex2.html`, Archscry, Maze, and Strategium. The project needed a scoped ready card that captures the desired cosmetic unification without colliding with `VM-133`, without implying clean isolation from active `VM-088` Home work, and without accidentally retiring the documented `/library/` compatibility route.

## Decisions Made

- Assigned the card to `VM-134` because `VM-133` already belongs to Strategium Glass Readability Polish.
- Kept the card status as `Ready`.
- Kept the card Apocrypha-first rather than family-wide.
- Kept `/library/` untouched in this card.
- Chose current committed `newIndex2.html` as the benchmark and documented the `VM-088` re-review condition.
- Required Apocrypha visual regression coverage as part of the eventual implementation.

## Risks / Uncertainties

- `VM-088` is still in progress and may change the Home hero reference frame if its scope expands.
- The worktree already contained unrelated in-flight route, board, and handoff changes before this planning task; this task only added the VM-134 planning artifacts.
- The eventual implementation may need to tune Apocrypha's route-local CSS carefully so it aligns with the family without losing its warm archive/library identity.

## Tests Run

- `rg -n "VM-134|VM-133|Apocrypha Hero Unification" docs/kanban docs/handoffs`
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short`

## Not Touched

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `library/index.html`
- `newIndex2.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- Placement logic, lore/source data, canonical `/data/` files, and runtime behavior

## Follow-Up Recommendations

- Implement `VM-134` after confirming whether `VM-088` has stayed within its documented auto-cycling Mana Lens scope.
- Keep any `/library/` retirement discussion in a separate route-retirement card.
- Add the Apocrypha visual regression harness before closing the implementation card.

## Next Suggested Agent

Frontend implementer or Test Strategist

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/ready/VM-134-apocrypha-hero-unification-pass.md`
- `docs/kanban/ready/VM-133-strategium-glass-readability-polish.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
