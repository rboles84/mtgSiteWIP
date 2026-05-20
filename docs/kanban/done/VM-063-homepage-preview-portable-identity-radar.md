# VM-063 - Homepage Preview + Portable Identity Radar

ID: VM-063
Title: Homepage Preview + Portable Identity Radar
Status: done
Type: Design / Frontend
Area: Home, Archscry, Shared UI
Priority: high
Created: 2026-05-19
Completed: 2026-05-19

## Summary

Build a non-destructive homepage redesign preview at `newIndex.html` and ship a reusable identity radar helper that can move from the homepage preview into Archscry dossier/result surfaces with minimal wiring.

## Source Evidence

- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`
- `docs/handoffs/2026-05-15-2113-codex-lightweight-mock-home-sandbox.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `index.html`
- `assets/js/index.js`
- `docs/research/ui_research/`

## Problem

The live home shell should remain untouched while Vox Mana explores a stronger landing-page direction and a portable identity radar component. Previous homepage prototype work was either too disposable or too page-coupled to be a clean next step.

## Proposed Outcome

- Add `newIndex.html` as an isolated homepage preview.
- Add `assets/css/home-preview.css`.
- Add `assets/js/home-preview.js`.
- Add `assets/js/color-matrix-radar.js`.
- Keep the radar helper page-agnostic and target-driven.
- Use existing Vox Mana assets and route structure.

## Acceptance Criteria

- `newIndex.html` works as a standalone preview without modifying the live homepage.
- The radar helper exposes a stable API for render, update, destroy, and shared series normalization.
- `home-preview.js` contains homepage-specific state only, not chart internals.
- A second arbitrary radar target on the page can mount from the same shared API without duplicate Chart.js instances.
- The preview uses real repo assets and avoids broken local paths, placeholder AI image URLs, or research-folder runtime dependencies.

## Non-Goals

- No live Archscry integration in this pass.
- No changes to the existing `index.html`, `assets/css/home.css`, or `assets/js/home.js` shell unless a blocker appears.
- No direct dependency on the UI research folder at runtime.

## Dependencies / Related Work

- `VM-017` Main Index Gateway Mockup Set
- Future Archscry dossier/result follow-up work that mounts into `#result-inner`

## Testing Notes

- `node --check assets/js/color-matrix-radar.js`
- `node --check assets/js/home-preview.js`
- Verify the homepage preview can mount, update, destroy, and re-render the radar cleanly.
- Confirm the radar accepts both keyed-object and ordered-array input.
- Confirm a second arbitrary page target can mount through the shared helper without duplicate instances.

## Human Review

Yes - this is a product-shaping homepage and shared-component pass.

## Notes

This work should preserve the current gateway identity while making the radar component portable enough for later dossier integration.
