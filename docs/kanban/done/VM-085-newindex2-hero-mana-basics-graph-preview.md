# VM-085 - newIndex2 Hero Mana Basics Graph Preview

ID: VM-085
Title: newIndex2 Hero Mana Basics Graph Preview
Status: done
Type: Frontend / Focused Enhancement
Area: Home Preview, Hero Centerpiece
Priority: high
Created: 2026-05-20
Completed: 2026-05-20

## Summary

Replace the VM-084 amoeba signal in `newIndex2.html` with a compact Mana Basics graph preview that uses existing color, guild, and Strixhaven college identity data.

## Source Evidence

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1224-codex-vm084-newindex2-amoeba-identity-signal-morph.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-084-newindex2-amoeba-identity-signal-morph.md`
- `newIndex2.html`
- `assets/js/graph.js`

## Scope

- Replace the hero-center signal with a simplified Mana Lens radar preview.
- Switch `newIndex2.html` from the Chart.js CDN to local `assets/js/graph.js`.
- Keep the lower Magic Basics and Color Matrix section intact.
- Reuse existing mono color, Ravnica guild, and Strixhaven college identity data only.
- Add isolated hero preview behavior that does not call or mutate the lower `vmRadar` state.

## Acceptance Criteria

- The hero contains one `canvas#vmHeroManaChart` and compact color/guild/college pills.
- Clicking hero pills updates only the hero chart, active pill, caption, and glow.
- The lower `vmRadar`, Magic Basics tabs, Color Matrix toggles, and identity selector still work.
- `newIndex2.html` references `assets/js/graph.js` and no longer references the Chart.js CDN.
- No amoeba/random/shape signal UI or script remains.
- Local route checks and `npm.cmd test` pass.

## Completion Notes

- Replaced the VM-084 hero amoeba signal with a compact Mana Lens preview using `canvas#vmHeroManaChart`.
- Generated hero pill groups from the existing identity dataset: mono colors, Ravnica guilds, and Strixhaven colleges.
- Added isolated hero preview JavaScript that updates only the hero chart, caption, active pill, and glow.
- Switched `newIndex2.html` from the Chart.js CDN to local `assets/js/graph.js`.
- Removed the old `vmIdentitySignalChart` HTML, CSS, and animation/morphing script.

## Tests Run

- Static scan: `newIndex2.html` references `assets/js/graph.js` and no longer references the Chart.js CDN.
- Static scan: no duplicate runtime IDs after stripping comments and scripts.
- Static scan: required IDs remain present: `vmHeroManaChart`, `vmRadar`, `basicsReveal`, `colorMatrixWrap`, `identityGrid`, `lensTabs`, `guildSubtabs`.
- Static scan: old signal terms are removed: `vmIdentitySignal`, `vm-signal`, `shapeIntervalMs`, `axisCounts`, `randomizeVmIdentity`.
- Inline script compile check passed.
- Local HTTP checks returned `200` for `/newIndex2.html`, `/archscry/`, `/maze/`, and `/apocrypha/`.
- Browser smoke: hero generated 20 pills, guild/college pill clicks updated hero state, Magic Basics and Color Matrix still worked, lower `vmRadar` updated independently, and no console errors were reported.
- `npm.cmd test` passed.
