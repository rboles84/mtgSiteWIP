# VM-088 - Home Auto-Cycling Mana Lens Showcase

ID: VM-088
Title: Home Auto-Cycling Mana Lens Showcase
Status: done
Type: Frontend / Focused Enhancement
Area: Home, Hero Mana Lens
Priority: high
Created: 2026-05-20
Completed: 2026-05-27

## Summary

Closed the Home Mana Lens showcase against the canonical identity preview registry. The canonical `/index.html` hero now depends on `data/identity-layers.json` for its 20 preview identities, keeps the tuned 4800ms cycle timing, and preserves the component-plus-synthesis radar behavior from VM-086 / VM-093.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1938-codex-vm086-newindex2-hero-mana-lens-composite-flow-cleanup.md`
- `docs/handoffs/2026-05-20-2320-codex-vm093-identity-signal-three-layer-repair.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`
- `docs/kanban/board.md`
- `index.html`
- `assets/js/newindex2.js`
- `data/identity-layers.json`

## Scope

- Keep the Home hero Mana Lens passive and registry-backed.
- Preserve the 20 current preview identities: mono colors, Ravnica guilds, and Strixhaven colleges.
- Preserve component overlays plus synthesized identity dataset rendering.
- Preserve random initial identity, hover/focus pause, hidden-tab pause, reduced-motion still state, and held signal details.
- Strengthen smoke and visual harness coverage for the registry-backed contract.

## Acceptance Criteria

- Mana Lens cycles through all 20 preview-eligible identities in curated `preview_order`.
- The default cycle timing is the tuned `4800ms`, documented inline for easy adjustment.
- Hover/focus pauses cycling; leaving/resolving focus resumes it.
- Hidden tab pauses cycling; visible tab resumes it.
- Reduced motion renders once, reports `Still`, and does not start the interval.
- Forced `boros` visual-regression identity resolves through registry aliases and renders White + Red + Boros.
- Static checks, browser smoke, route checks, visual regression, and `npm.cmd test` pass.

## Verification

- `node --check assets/js/newindex2.js`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:visual:newindex2`

## Notes

- VM-148 retargeted this card from `newIndex2.html` to canonical `index.html`.
- VM-149 removed the private Home preview data island and made the canonical registry the source of truth before this closeout.
- This closeout intentionally does not add shard, wedge, four-color, five-color, colorless, or family-style runtime expansion.
