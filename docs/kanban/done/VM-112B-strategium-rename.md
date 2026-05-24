# VM-112B - Strategium Rename

ID: VM-112B
Title: Strategium Rename
Status: done
Type: Frontend / Route Rename / Docs Sweep
Area: Strategium Route, Shared Nav, Home, Docs
Priority: high
Created: 2026-05-24
Blocked By: VM-112A
Completed: 2026-05-24

## Summary

Rename the live `Basics` route/page to `Strategium`, move `basics/` to `strategium/`, and update all live internal links, labels, and living docs with no `/basics/` compatibility retained.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1333-codex-vm112a-floating-topbar-redesign.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-112A-floating-topbar-redesign.md`
- `newIndex2.html`
- `strategium/index.html`
- `assets/js/vm-topbar.js`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/project-atlas.md`

## Scope

- Move `basics/` to `strategium/`.
- Replace live user-facing `Basics` labels with `Strategium`.
- Update live internal links, nav state keys, homepage cards, footer links, and living docs.

## Non-Goals

- Do not preserve `/basics/` via redirect, alias, or compatibility shell.
- Do not rewrite historical done cards or archived handoffs that mention `Basics`.
- Do not redesign the page concept or tools beyond the rename and route move.

## Acceptance Criteria

- There is no active `basics/index.html`.
- There are no active internal links targeting `/basics/`.
- There is no compatibility shell from `/basics/` to `/strategium/`.
- Local-file links resolve to the renamed route.

## Completion Notes

- Moved the live route folder from `basics/` to `strategium/` with no compatibility shell left behind.
- Updated the shared nav labels and route targets across all live public pages, including Maze, so the active route now reads `Strategium`.
- Renamed the homepage Strategium card and footer links, and rewired route-facing page identity state on the moved page.
- Updated living docs for current route architecture and manual QA, while preserving historical done cards and archived handoffs unchanged.
- Hardened the shared mobile-menu focus timing path in `assets/js/vm-topbar.js` during the rename verification pass.

## Tests

- `node --check assets/js/vm-topbar.js`
- `node --check assets/js/reduce-motion.js`
- `npm.cmd test`
- `git diff --check`
- Static verification that active runtime files and living route docs no longer target `/basics/`
- Localhost browser smoke on `newIndex2.html` confirming Strategium nav/card/footer links and shared mobile-menu routing
- Local-file compatibility verified via live href/path inspection because the in-app browser blocks direct `file://` navigation

## Handoff

- `docs/handoffs/2026-05-24-1405-codex-vm112b-strategium-rename.md`
