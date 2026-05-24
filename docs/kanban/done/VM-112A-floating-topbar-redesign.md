# VM-112A - Floating Topbar Redesign

ID: VM-112A
Title: Floating Topbar Redesign
Status: done
Type: Frontend / Shared Chrome / Visual Refresh
Area: Shared Topbar, Home, Routes, Maze
Priority: high
Created: 2026-05-24
Completed: 2026-05-24

## Summary

Redesign the shared Vox Mana topbar into a floating premium navigation system across all public pages, including Maze, while preserving existing route names, targets, and shared topbar behavior.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-23-0029-codex-vm111-shared-non-maze-logo-topbar-rollout.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-111-shared-non-maze-logo-topbar-rollout.md`
- `newIndex2.html`
- `maze/index.html`
- `assets/css/topbar.css`
- `assets/js/vm-topbar.js`

## Scope

- Apply the floating topbar redesign across `newIndex2.html`, `index.html`, `archscry/index.html`, `maze/index.html`, `apocrypha/index.html`, `basics/index.html`, `privacy/index.html`, and `terms/index.html`.
- Keep the existing shared header contract and JS behavior as the implementation base.
- Bring Maze onto the same five-link shared nav set and visual shell.

## Non-Goals

- Do not rename `Basics`.
- Do not move the `basics/` folder.
- Do not introduce `/strategium/`.
- Do not change route targets.
- Do not change route-facing labels beyond visual styling.

## Acceptance Criteria

- The topbar reads as floating premium chrome instead of a full-width black slab.
- All public pages, including Maze, share the same visual topbar system.
- Mobile menu behavior, active-page highlighting, and reduce-motion behavior remain intact.
- All links still target current routes, including `/basics/`.

## Completion Notes

- Rebuilt the shared topbar styling into a floating three-part shell with a brand pill, centered nav capsule, and utility orb.
- Extended the five-link shared nav to every public page, including Maze.
- Normalized Maze onto the same shared contract by wiring in the real logo mark and mirrored mobile-nav host.
- Removed the old full-width backing overrides from the route atmosphere/home overrides so the floating chrome remains visible.
- Left all route names, route targets, and live `Basics` labeling intact.

## Tests

- `node --check assets/js/vm-topbar.js`
- `node --check assets/js/reduce-motion.js`
- `npm.cmd test`
- `git diff --check`
- Static route/header verification across all public pages, including Maze
- Manual QA coverage updated in `docs/reference/manual-test-cases.md`

## Handoff

- `docs/handoffs/2026-05-24-1333-codex-vm112a-floating-topbar-redesign.md`
