# VM-404 - Contained UI Polish Repair

## Status

Done

## Summary

Created a normal repair branch from `origin/main`, applied contained visible UI polish, and captured larger design concerns as backlog-only cards.

## Pre-Flight

- `origin/main` confirmed at `8d896b0`.
- `origin/feature/ui-refactor-exploration` confirmed at `8d896b0`.
- VM-404, VM-405, and VM-406 were unused before this card set.
- Reviewed `AGENTS.md`, `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`, and recent related handoffs.

## Changes

- Raised the shared topbar active diamond from `bottom: -10px` to `bottom: -3px`.
- Slowed the Home Identity Signal cycle from `4800ms` to `9000ms`.
- Updated the related frontend smoke assertion, Home visual-regression timer shim, and manual QA reference.
- Added SVG favicon metadata using `assets/img/vox-mana-header-logo.svg` to the eight public HTML entrypoints.
- Started the Apocrypha Official Wizards / Mark Rosewater library group collapsed on normal load with its initial tome `aria-current="false"`.
- Preserved hash and tome opening behavior for the Apocrypha source library.

## Out Of Scope Preserved

- Maze scratchpad UI redesign.
- Archscry-to-Strategium linking.
- Schema changes.
- Generated data changes.
- Lore, Commander facts, route aliases, placement model, source ledgers, or Maze stash storage contracts.
- History rewrites or direct pushes to `main`.

## Verification

- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `git diff --check` - passed with existing LF/CRLF working-copy warnings only.
- `node --check assets/js/home.js` - passed.
- `node --check assets/js/apocrypha.js` - passed.
- `node --check assets/js/vm-topbar.js` - passed.
- Browser QA on a fresh local port confirmed Home and Archscry active diamonds compute to `bottom: -3px`.
- Browser QA confirmed Home signal stayed on one visible profile through a 5-second read window, consistent with the new 9-second cycle.
- Browser QA confirmed the Home hold control changes to `Release signal`, sets `aria-pressed="true"`, and reports `Held`.
- Browser QA confirmed `/apocrypha/` starts `#apoc-library-official-wizards` collapsed with its tome `aria-current="false"`.
- Browser QA confirmed clicking the Official Wizards / Mark Rosewater tome opens the group, sets the hash, and marks the tome current.
- Browser QA confirmed `/apocrypha/#apoc-library-official-wizards` opens the group and marks the tome current.
- Local HTTP favicon sweep confirmed all eight public routes include the SVG favicon link and the SVG asset returns `200`.

## Notes

- The Apocrypha reference-section visual compare may show an expected difference because the default open state changed from expanded to collapsed. No visual baselines were refreshed in VM-404.
