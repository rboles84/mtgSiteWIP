# VM-099 - Basics Page Field Guide Cleanup

ID: VM-099
Title: Basics Page Field Guide Cleanup
Status: done
Type: Frontend / Content Polish / Learning Console
Area: Basics, Color Matrix
Priority: high
Created: 2026-05-22
Completed: 2026-05-22

## Summary

Refine `/basics/index.html` into a compact Vox Mana field guide that teaches the color system more clearly while preserving the existing interactive Basics tabs, Color Matrix, radar chart, and route behavior.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-2130-codex-vm090-split-homepage-and-basics-experience.md`
- `docs/handoffs/2026-05-20-2354-codex-vm096-black-component-glow-repair.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-090-split-homepage-and-basics-experience.md`
- `basics/index.html`

## Scope Completed

- Update only `/basics/index.html` for runtime behavior and presentation.
- Keep the existing nav, footer, atmosphere, anchor structure, and local `../assets/js/graph.js` reference.
- Preserve the current interactive IDs and tab/Color Matrix behavior.
- Add coordination documentation for VM-099 and complete the usual handoff trail.

## Non-Goals

- Do not modify `/archscry/`, `/maze/`, `/apocrypha/`, `newIndex2.html`, root `index.html`, or `newIndex.html`.
- Do not change shared CSS/JS or route internals.
- Do not change Color Matrix identity data semantics.
- Do not reconcile unrelated worktree drift from other in-flight files.

## Acceptance Criteria

- The Basics page reads as a compact field guide rather than a second homepage.
- The hero, Start Here panel, tab-card grid, Color Philosophy Bridge, and tighter next-step panel all appear on `/basics/`.
- `basicsReveal`, `colorMatrixWrap`, `vmRadar`, `identityGrid`, `lensTabs`, `guildSubtabs`, `componentToggle`, and `compositeToggle` remain present and functional.
- `../assets/js/graph.js` stays referenced and no Chart.js CDN is added.
- Static scans, route checks, browser smoke, and `npm.cmd test` pass.

## Completion Notes

- Reworked `/basics/index.html` into a tighter field-guide layout with a compact hero, Start Here panel, card-style Basics chooser, Color Philosophy Bridge, and a smaller next-step CTA.
- Preserved all existing Basics/Color Matrix tooling IDs, the local `../assets/js/graph.js` runtime, and the current tab / selector / toggle behavior.
- Updated the educational copy inside the `basics` object without changing the tab logic.
- Tightened the page-scoped mobile nav treatment so the Basics route wraps cleanly without horizontal overflow.

## Handoff

- `docs/handoffs/2026-05-22-0051-codex-vm099-basics-field-guide-cleanup.md`
