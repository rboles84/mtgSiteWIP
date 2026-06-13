# VM-341 - Colorless Controlled Dossier UX Polish

## Status

Done

## Summary

Polish the existing controlled Colorless dossier surface using the VM-339/VM-340 Layer 2 gold authority floor without changing Layer 1 product boundaries, raw Colorless JSON, generated artifacts by hand, public routes, aliases, Home preview, Commander Compass, or `colorless.webp`.

## Scope

- Reduce repeated Colorless copy by giving hero/summary, Start Here, Layered Identity, How This Plays, Signals, and Mana Base sections distinct jobs.
- Fill the previously blank Commander starting-points area with strict Colorless orientation examples only.
- Repair Colorless card-example tag leakage so curated examples do not inherit broad `Artifacts` / `Aggro` tags incorrectly.
- Expand practical mana-base primer copy with Wastes, true `{C}`, mana rocks, utility-land caution, Command Tower, Reflecting Pool-style effects, and generic-vs-colorless separation.
- Tighten deck-start lanes so Colorless does not show broad `Midrange Commander shells`.

## Acceptance Gates

- [x] Layer 1 contract unchanged: controlled placeable, `preview_eligible: false`, no Home preview, public route, public aliases, directory links, or Commander Compass.
- [x] No raw Colorless JSON edited.
- [x] No generated artifacts hand-edited.
- [x] `assets/img/identity-hero/colorless.webp` not edited, regenerated, replaced, or recropped.
- [x] Colorless Start Here no longer renders a blank `Commander starting points` heading.
- [x] Colorless signal cards no longer repeat the same fallback sentence.
- [x] `All Is Dust` and `Bane of Bala Ged` are not presented with `Artifacts` or `Aggro` tags.
- [x] Mana-base copy includes the requested practical cautions and stays non-buy-list, non-price, and non-metagame.
- [x] `Midrange Commander shells` removed from Colorless deck-start output.
- [x] `Ulalek` and `Eldrazi Incursion` do not become native Colorless support.

## Files Changed

- `assets/js/archscry-presentation.js`
- `assets/js/commander-dossier.js`
- `assets/js/index.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-341-colorless-controlled-dossier-ux-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-11-2332-codex-vm341-colorless-dossier-ux-polish.md`

## Tests

- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run validate:source-generated -- --targets=COLORLESS` with the known accepted model-owned inhibitor warning.
- `node research\maze-search-tests.js`
- `node assets\js\quick-reading-tests.js`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- Focused desktop/mobile headless browser spot-check for hero, Commander orientation, card tags, deck lanes, mana-base copy, and Colorless boundary preservation.
- Scoped `git diff --check` on touched tracked files.
