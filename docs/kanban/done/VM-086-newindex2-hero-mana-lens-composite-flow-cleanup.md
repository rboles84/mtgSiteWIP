# VM-086 - newIndex2 Hero Mana Lens Composite + Flow Cleanup

ID: VM-086
Title: newIndex2 Hero Mana Lens Composite + Flow Cleanup
Status: done
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Mana Lens
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Fix the `newIndex2.html` hero Mana Lens so composite identities show component color datasets plus the synthesized identity, then reduce hero clutter by hiding the long selector behind a click menu and moving the intent panel below the hero row.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1846-codex-vm085-newindex2-hero-mana-basics-graph-preview.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-085-newindex2-hero-mana-basics-graph-preview.md`
- `newIndex2.html`

## Scope

- Update only the hero Mana Lens preview and hero layout in `newIndex2.html`.
- Keep lower Magic Basics, Color Matrix, `vmRadar`, `buildDatasets()`, and `updateRadar()` untouched.
- Keep local `assets/js/graph.js` usage.
- Preserve existing routes and shared files.

## Acceptance Criteria

- Selesnya hero selection shows Green + White + Selesnya.
- Rakdos hero selection shows Black + Red + Rakdos.
- The hero identity picker is hidden by default and opens from a click-safe toggle.
- Picker closes on identity selection, Escape, and outside click.
- The intent selector is below the hero row instead of a third side-by-side hero panel.
- Static checks, browser smoke, route checks, and `npm.cmd test` pass.

## Completion Notes

- Updated the hero Mana Lens dataset builder so composite identities render dashed component datasets plus the synthesized identity dataset.
- Replaced the always-visible hero identity pill list with a click-to-open picker.
- Added a compact hero dataset cue under the caption for profile/overlay visibility.
- Moved the intent selector below the hero row as a full-width responsive band.
- Preserved the lower Color Matrix chart/data/functions and local `assets/js/graph.js` runtime.

## Tests Run

- Static scan: no duplicate runtime IDs after stripping comments and scripts.
- Static scan: required IDs remain present: `vmHeroManaChart`, `heroManaPills`, `heroManaPickerToggle`, `heroManaPickerPanel`, `heroManaDatasetPills`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Static scan: `assets/js/graph.js` remains referenced and the Chart.js CDN was not restored.
- Inline script compile check passed.
- Local HTTP checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Browser smoke: Selesnya showed `Green + White -> Selesnya`; Rakdos showed `Black + Red -> Rakdos`; picker opened and closed on selection, Escape, and outside click.
- Browser smoke: lower Magic Basics tabs, Color Matrix toggle, and lower `vmRadar` selection remained independent.
- Browser narrow viewport smoke at `390px`: hero and intent grids collapsed to one column, picker stayed hidden by default, and the hero canvas remained sized.
- `npm.cmd test` passed.
