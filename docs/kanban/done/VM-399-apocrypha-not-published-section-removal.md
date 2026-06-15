# VM-399 - Apocrypha Not Published Section Removal

Status: Done
Owner: Codex
Type: UX / Front-End Cleanup
Area: Apocrypha route (`apocrypha/index.html`, `assets/css/apocrypha.css`)
Priority: Low
Created: 2026-06-15
Closed: 2026-06-15
Depends On: VM-398 (Apocrypha Research Vault Backlog Preservation)

## Summary

Remove the final `What Is Not Published` section from `/apocrypha/` because it reads like internal governance rather than reader value. Keep one calm source-boundary sentence inside `How These References Are Used`.

## Pre-Flight Gates

- [x] Re-read `AGENTS.md`, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md`.
- [x] Reviewed VM-398 handoff and current Apocrypha markup.
- [x] Ran `git status --short --branch`; unrelated dirty work must be preserved.
- [x] Confirmed VM-399 is unused before creating this card.
- [x] Do not stage or commit unless explicitly instructed.

## Scope

- Remove the page-rail `Not Published` link.
- Remove the full `#notice` section and redaction panel.
- Keep `How These References Are Used`.
- Replace the current internal-note sentence with reader-facing source-boundary copy.
- Remove only orphaned `apoc-redaction-*` selectors/rules while preserving still-used grouped selectors.
- Preserve Source Compass behavior, public reference links, `/library/` alias behavior, and VM-398 backlog preservation.

## Out Of Scope

- Placement logic.
- Generated data.
- Raw packets.
- Commander facts.
- Source claim ledgers.
- Route aliases.
- Non-Apocrypha pages.
- VM-398 backlog content.
- Source Compass group/tome behavior.

## Verification Plan

- Runtime static scan confirms removed private-system disclosure strings and `apoc-redaction` selectors are gone from public runtime files.
- Route-shape assertion confirms five Source Compass tomes/groups, unchanged public reference links, and the `How These References Are Used` section.
- Manual `/apocrypha/` QA confirms no `Not Published` rail item, footer follows the `How These References Are Used` section, Source Compass still works, `/library/` still renders Apocrypha, and no horizontal overflow appears.
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `git diff --check`
- `npm.cmd run test:visual:apocrypha`
- If visual diffs are scoped to this removal, refresh Apocrypha baseline and rerun visual compare to PASS.

## Closeout

- [x] Update `docs/reference/manual-test-cases.md`.
- [x] Write a VM-399 handoff in `docs/handoffs/`.
- [x] Update `docs/handoffs/HANDOFF_INDEX.md`.
- [x] Move this card to `docs/kanban/done/`.
- [x] Update `docs/kanban/board.md`.

## Closeout Verification

- Runtime static scan passed for the removed `#notice`, `Not Published`, private-system disclosure strings, and `apoc-redaction` selectors across public Apocrypha runtime files.
- Route-shape assertion passed with five Source Compass tomes, five library groups, 49 public reference links, `How These References Are Used`, no `#notice`, and `/library/` still targeting Apocrypha.
- Visual baseline was refreshed after confirming diffs were limited to intentional Apocrypha copy/rail/section removal; rerun passed with 0 mismatched pixels.
- Manual QA by screenshot/static shape confirmed the page rail no longer includes `Not Published`, Source Compass remains visible, and the footer follows `How These References Are Used`.
