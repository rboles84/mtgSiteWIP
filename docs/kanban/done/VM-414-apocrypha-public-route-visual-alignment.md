# VM-414 - Apocrypha Public Route Visual Alignment

## Status

Done

## Type

Design / Frontend CSS

## Area

Apocrypha public route visual cohesion

## Priority

High

## Created

2026-06-20

## Summary

Align Apocrypha's visible color and surface language with the current public-route family,
using Strategium as the comparison target. The route should still read as a public reference
library, but it must not feel like a separate website.

## Pre-Flight Findings

- VM-413 changed shared typography and removed route-owned Google Fonts; Apocrypha's local
  CSS and JS were not meaningfully changed by that pass.
- VM-387 intentionally preserved Apocrypha's more blurred archive glass instead of forcing
  Maze/Strategium's sharper public-route glass onto it.
- VM-133 and VM-142 established Strategium's lighter, sharper glass recipe as the approved
  reference for public-route readability.
- The owner flagged current Apocrypha screenshots as too different in both typography feel
  and color from the wider site.

## Scope

- CSS-only visual alignment in `assets/css/apocrypha.css`.
- Match Apocrypha's route-local palette, panel glass, text contrast, and accent balance more
  closely to Strategium.
- Preserve Apocrypha markup, source links, route JS, rail behavior, disclosure behavior,
  library alias behavior, placement logic, generated data, Scryfall, Supabase, and Commander
  facts.

## Acceptance Criteria

- Apocrypha no longer reads warmer/dimmer/more ornamental than Strategium in the first
  viewport.
- Hero, rail, guide cards, source compass, library details, reference cards, and method
  cards use the same broad white/cool/gold balance as Strategium.
- No horizontal overflow, clipping, console errors, or broken disclosure/rail behavior.

## Test Plan

- `node --check assets/js/apocrypha.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd run test:visual:apocrypha`
- Browser QA `/apocrypha/` desktop and mobile against `/strategium/`.

## Implementation Result

- Retuned Apocrypha's route-local palette to Strategium's public-route balance: white
  display text, cooler background atmosphere, lighter muted copy, and flatter translucent
  glass.
- Replaced the split first viewport with a full-width hero panel and moved the supporting
  At A Glance material into the next full-width panel.
- Reduced Apocrypha-only sepia/dim overlays and removed the blurred archive-glass surface
  treatment from active major panels.
- Centered public-section headings and retuned lower library/reference surfaces so the
  Reference Library no longer falls back into the old warm archive palette.
- Preserved Apocrypha HTML, source links, JS behavior, rail/disclosure behavior, route
  aliases, placement logic, generated data, Scryfall, Supabase, and Commander facts.

## Tests Run

- PASS `node --check assets/js/apocrypha.js`
- PASS `git diff --check -- assets/css/apocrypha.css docs/kanban/board.md docs/kanban/done/VM-414-apocrypha-public-route-visual-alignment.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-06-20-2131-codex-vm414-apocrypha-visual-alignment.md`
- PASS scoped legacy-font `rg` check over `apocrypha/index.html`, `assets/css/apocrypha.css`, and `assets/js/apocrypha.js` returned no hits.
- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run lint:js`
- PASS `npm.cmd run test:frontend-smoke`
- EXPECTED FAIL before baseline refresh: `npm.cmd run test:visual:apocrypha` reported large intentional diffs against the old Apocrypha look.
- PASS `npm.cmd run test:visual:apocrypha:baseline` after reviewing the current hero desktop, hero mobile, and references desktop captures.
- PASS `npm.cmd run test:visual:apocrypha` after baseline refresh with `0` mismatched pixels for all captures.
- PASS `npm.cmd test`

## Notes

- The reviewed visual current captures recorded no console errors or page errors.
- `npm.cmd test` rewrote the already-dirty live Gate bias audit outputs as part of the
  existing test behavior; no data/source changes were intentionally made by VM-414.
