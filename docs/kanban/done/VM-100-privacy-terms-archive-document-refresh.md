# VM-100 - Privacy / Terms Archive Document Refresh

ID: VM-100
Title: Privacy / Terms Archive Document Refresh
Status: done
Type: Frontend / Archive Document Refresh
Area: Privacy, Terms
Priority: high
Created: 2026-05-22
Completed: 2026-05-22

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

## Completion Notes

- Refreshed `privacy/index.html` and `terms/index.html` into matching archive-document legal pages while preserving the shared topbar shell, route compatibility, and conservative legal meaning.
- Kept the apocrypha-library background treatment and the route-local CSS/JS imports intact.
- Resolved a later merge conflict on `feature/ui-refactor-exploration` by keeping the newer VM-100 privacy-page archive-document version over the earlier remote readability pass, since the later local file already subsumed that intent with broader structure and copy coverage.

## Tests Run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- privacy/index.html`
- `rg -n "background-apocrypha-library-clean-01|legal-page|summary-card|vm-gloss|reduce-motion.js|vm-topbar.js|No sale of personal information|At a Glance" privacy/index.html`
- `npm.cmd test`

## Handoff

- `docs/handoffs/2026-05-22-0751-codex-vm100-privacy-terms-archive-document-refresh.md`
- `docs/handoffs/2026-05-22-1945-codex-vm100-privacy-merge-resolution-and-hardening-branch.md`
