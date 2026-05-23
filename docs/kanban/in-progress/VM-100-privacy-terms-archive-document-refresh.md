# VM-100 - Privacy / Terms Archive Document Refresh

ID: VM-100
Title: Privacy / Terms Archive Document Refresh
Status: in-progress
Type: Frontend / Archive Document Refresh
Area: Privacy, Terms
Priority: high
Created: 2026-05-22

## Summary

Refresh `privacy/index.html` and `terms/index.html` into stronger, more legible archive-document pages that match the newer Vox Mana shell direction while preserving the current route shell, legal meaning, and static compatibility.

## Source Evidence

- `docs/handoffs/2026-05-20-2000-codex-archscry-shell-modernization.md`
- `docs/kanban/done/VM-089-local-file-route-compatibility-sweep.md`
- `docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- `docs/handoffs/2026-05-21-2104-codex-vm098-safe-backup-push-ui-refactor-exploration-2.md`
- `privacy/index.html`
- `terms/index.html`

## Scope

- Update only `privacy/index.html` and `terms/index.html` plus the required Kanban and handoff trail.
- Keep the topbar shell, background shell markup, shared imports, shared scripts, and route destinations unchanged.
- Replace the narrow single-column document bodies with a wider archive-document layout using page-local styles only.
- Improve readability and scanability without adding new legal claims, promises, or guarantees.

## Acceptance Criteria

- Both pages use `../assets/img/backgrounds/background-apocrypha-library-clean-01.webp` in the existing background shell markup.
- Both pages keep the exact required shared CSS/JS imports, `body` attributes, and topbar routes.
- Both pages render a consistent archive-document layout with hero, metadata pills, summary card, and section cards.
- Privacy preserves all listed data-use and fan-project coverage without policy expansion.
- Terms preserves all listed service-use and disclaimer coverage without policy expansion.
- Static checks, browser verification, and `npm.cmd test` pass.
