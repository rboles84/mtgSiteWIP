# VM-127 - Phase 4 Archscry Index Extraction

ID: VM-127
Title: Phase 4 Archscry Index Extraction
Status: done
Type: Frontend / CSS Architecture / Visual Regression QA
Area: Archscry, Route-Local CSS, Dossier Rendering
Priority: high
Created: 2026-05-25
Completed: 2026-05-25

## Summary

Externalize the inline CSS in `archscry/index.html` into maintained route-local Archscry assets without changing behavior or visual output, and prove the extraction with deterministic landing and dossier screenshot comparison plus the repo's existing smoke and placement coverage.

## Source Evidence

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-1616-codex-vm116-css-architecture-phase-2.md`
- `docs/handoffs/2026-05-24-1936-codex-vm120-container-queries-subgrid.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
- `docs/handoffs/2026-05-24-2350-codex-vm123-archscry-local-file-boot-repair.md`
- `docs/kanban/board.md`
- `docs/architecture/project-atlas.md`
- `docs/reference/manual-test-cases.md`
- `package.json`
- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/index.js`

## Pre-Implementation State

- `archscry/index.html` contains one very large inline `<style>` block and no inline `<script>` block.
- The route already loads `assets/css/archscry.css` last in the head, after the shared token, layout, topbar, atmosphere, and components stylesheets.
- The live Archscry runtime already lives in `assets/js/index.js`, and the page keeps its existing script order through `graph.js`, `index.js`, `reduce-motion.js`, `archscry-atmosphere.js`, and `vm-topbar.js`.
- `restoreInitialView()` restores from `SESSION.profile?.placementResult`, then `vm_getCachedPlacementResult()`, then the Maze handoff payload, so a deterministic dossier harness must control session/profile restoration and not just seed cached result state.
- `assets/js/shared.js` stores cached placement state in `sessionStorage` under `vm_last_result`.
- `VM-116` and `VM-120` deliberately left the Archscry inline CSS in place while moving shared structure into layered shared assets, so this card is the next route-local extraction step rather than a shared-home consolidation pass.
- The repo exposes `npm.cmd run test:frontend-smoke`; there is no `test:smoke` script in `package.json`.

## Scope

- Create branch `refactor/archscryindex-extract` before editing runtime files.
- Move the entire inline `<style>` block from `archscry/index.html` into `assets/css/archscry.css` as a literal lift.
- Keep `assets/css/archscry.css` unlayered and last in the `archscry/index.html` head.
- Remove the inline `<style>` block from `archscry/index.html`.
- Move the current Archscry `@container` and viewport response rules into `assets/css/archscry.css` as part of the same extraction.
- Preserve the existing external JS runtime and script order; do not invent a JS extraction step where none remains.
- Add only a minimal test-only runtime hook in `assets/js/index.js` so visual-regression runs can suppress Scryfall card-art fetches without changing user behavior.
- Add a deterministic Archscry visual-regression harness that captures both landing and dossier states and verifies radar initialization before diffing.

## Acceptance Criteria

- `archscry/index.html` no longer contains inline `<style>` blocks.
- `assets/css/archscry.css` becomes the single route-local home for the extracted Archscry page CSS while staying last in the head.
- Archscry landing, quick-reading, interview, and dossier behavior remain unchanged.
- `assets/js/index.js` still restores and renders dossiers normally, and the new test-only hook affects only harness runs.
- The dossier radar still initializes before the harness hides it for screenshot diff.
- Deterministic landing and dossier screenshots match within the agreed pixel budget, with no new console/page errors beyond the saved baseline contract.
- `npm.cmd run test:frontend-smoke` passes.
- `npm.cmd run test:placement` passes.
- `npm.cmd test` passes.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` passes.

## Implementation Notes

- The card shipped as `VM-127` because `VM-126` was already occupied by the live Strategium copy pass card on the board at implementation time.
- The inline Archscry stylesheet was moved into `assets/css/archscry.css` as a literal lift, preserving unlayered cascade behavior and keeping `archscry.css` last in the head.
- `assets/js/index.js` kept its existing restore/render flow, with only a test-only `__vmVisualRegressionDisableCardArt` hook added so the screenshot harness can avoid live Scryfall art fetches.
- The new Archscry visual-regression harness captures both landing and dossier states, seeds `sessionStorage["vm_last_result"]` through the real restore path, and verifies the dossier radar canvas before masking unstable surfaces for diff.

## Verification

- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`
  - `landing-mobile`: `0` mismatched pixels
  - `landing-desktop`: `0` mismatched pixels
  - `dossier-mobile`: `0` mismatched pixels
  - `dossier-tablet`: `0` mismatched pixels
  - `dossier-desktop`: `0` mismatched pixels
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:placement`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`
- Manual Archscry QA pass succeeded; one formatting oddity was observed once but did not reproduce and is recorded as non-blocking.

## Non-Goals

- Do not move Archscry styles into `assets/css/home.css`.
- Do not move Archscry runtime into `assets/js/home.js`.
- Do not redesign the dossier, landing, or interview flow.
- Do not change route names, route targets, or placement logic.
- Do not reconcile unrelated Strategium, board, or research drift in the current worktree.
