# VM-409 - Archscry Matrix Hover Interaction Repair

ID: VM-409
Title: Archscry Matrix Hover Interaction Repair
Status: done
Type: Interaction Polish / Accessibility
Area: Archscry Identity Matrix
Priority: medium
Created: 2026-06-17
Completed: 2026-06-17
Owner: Codex
Related: VM-407, VM-408

## Summary

Removed canvas-driven hover behavior from the Archscry Identity Matrix and replaced twitchy trait-row hover detail behavior with click-to-pin Strategium interaction.

VM-408 visuals, layout, data, Home behavior, `graph.js`, scoring, lore, and placement flow remain unchanged.

## What Changed

- Removed the Chart.js canvas `onHover` activation path from `assets/js/dossier-radar.js`.
- Converted trait detail activation to click, `Enter`, and `Space`.
- Kept pointer hover and focus as visual-only row affordances.
- Added explicit pinned-detail clearing for `Escape`, outside click, and focus leaving `.vm-identity-reading-panel`.
- Preserved focus movement between rows inside the panel without clearing the pinned detail.
- Scoped document-level outside-click and Escape handlers through the dossier lifecycle cleanup hook.
- Updated source-level regressions for canvas hover removal, click/key activation, clearing behavior, focus containment, and handler cleanup.

## Guardrails Preserved

- `assets/js/graph.js` was not edited.
- Home behavior, data, layout, radar options, cycle, and latch behavior were not changed.
- Scoring, lore, placement flow, registry values, axis order, and VM-408 layered fill visuals were not changed.
- Selected identity summary, Lore/Core copy, trait rows, and Strategium popover placement were not moved.
- No staging, commit, push, reset, or branch rewrite was performed.

## Tests Run

- `node --check assets/js/dossier-radar.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run lint:js`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Acceptance Notes

- Canvas hover no longer updates rows, chart active elements, or Strategium detail.
- Trait detail appears only after click, `Enter`, or `Space`.
- Clearing resets `aria-expanded`, `.is-active`, hidden detail state, and chart active elements.
- Focus movement inside the panel does not close the pinned detail.
- Document-level Escape/outside-click handlers are lifecycle-scoped and do not accumulate.

## Follow-Up

Owner manual QA should confirm the click-to-pin interaction feels better than hover-driven Strategium detail.
