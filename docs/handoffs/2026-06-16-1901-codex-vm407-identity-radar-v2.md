# 2026-06-16 19:01 - Codex - VM-407 Identity Radar v2 Implementation

Agent name: Codex

Task requested: Create a new branch and implement VM-407 replacement card details: shared radar score authority, Archscry full Identity Matrix v2 panel from the locked mock, Home visual-only radar upgrades, required regressions, docs, and handoff.

Related Kanban card, docs, or plans:
- VM-407 - Identity Radar v2.0 Visual And Informational Upgrade
- VM-364 - Archscry Identity Matrix Data Map
- `docs/handoffs/2026-06-15-2049-claude-vm407-identity-radar-v2-plan.md`
- `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html`

Files reviewed:
- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-15-2049-claude-vm407-identity-radar-v2-plan.md`
- `docs/handoffs/2026-06-15-2313-codex-vm404-ui-polish-repair.md`
- `docs/kanban/board.md`
- `docs/kanban/ready/VM-407-identity-radar-v2-visual-info-upgrade.md`
- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/research/ui_research/vox-mana-identity-matrix-v2-mock.html`
- `C:/Users/obake/Downloads/vox-mana-identity-matrix-v2-mock_Final.html`
- `assets/js/dossier-radar.js`
- `assets/js/home.js`
- `assets/js/index.js`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `index.html`
- `archscry/index.html`
- `assets/css/home.css`
- `assets/css/archscry.css`
- `data/identity-layers.json`
- `data/factions.json`
- `data/archscry-flavor-snippets.json`

Files changed:
- `assets/js/vm-radar.js`
- `assets/js/dossier-radar.js`
- `assets/js/home.js`
- `assets/js/index.js`
- `index.html`
- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/css/home.css`
- `assets/js/quick-reading-tests.js`
- `research/archscry-dossier-followup-tests.js`
- `docs/reference/archscry-identity-matrix-data-map.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-407-identity-radar-v2-visual-info-upgrade.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-16-1901-codex-vm407-identity-radar-v2.md`

What changed:
- Added `assets/js/vm-radar.js` as a classic-safe shared global `globalThis.VMRadar`.
- Moved radar axis constants, strength tiers, pip counts, component display colors, color helpers, shared dataset builder, glow/halo/tier plugins, and pure synchronous `resolveRadarProfile()` into the shared module.
- Refactored Archscry `dossier-radar.js` away from hardcoded `DOSSIER_RADAR_PROFILES` / `DOSSIER_COLOR_PROFILES` score authority.
- Archscry now resolves scores from `identityLayers.expressions[key].preview_scores`, using component averaging only as a missing-score fallback.
- Rebuilt the Archscry Mana Alignment Matrix into a v2 two-column layout: chart left, Identity Reading panel right, `Cards That Sound Like This` below.
- Preserved `Selected Synthesis` for multi-color identities, `Selected Profile` for mono/colorless identities, registry-backed title/text, component dots, lore/core tension, Strategium detail slot, five trait rows, pips, strength words, raw scores, and the matrix note.
- Preserved the Colorless Matrix Boundary panel instead of forcing Colorless card voices.
- Updated Home to load and consume the shared radar module for visual-only radar upgrades while preserving its compact caption, 9000ms cycle, pause, reduced-motion, and Hold signal behavior.
- Added Home Chart-missing fallback UI.
- Loaded `vm-radar.js` after `graph.js` and before `home.js` / `index.js`.
- Added registry parity regressions, TEMUR exact score regression `[45, 60, 44, 63, 71]`, `Selected Synthesis` rendering check, card voice rendering check, and Colorless boundary preservation coverage.
- Updated the VM-364 map to document the new shared `identity-layers.json` score authority.
- Moved VM-407 to done with owner manual visual QA called out as post-build review.
- Post-QA layout adjustment: moved the Archscry Identity Reading summary block (`Identity Reading`, `Selected Synthesis/Profile`, registry title/text, component dots, Lore, and Core Tension) into the chart column directly below `#dossierManaRadar`, leaving the right column as the Strategium detail / trait row / matrix-note rail.
- Owner spacing follow-up: removed the permanent Strategium detail block from the top of the right rail. It now starts hidden and appears as an absolute popover near the hovered/focused trait row, with `aria-expanded` state on the rows.
- Owner visual follow-up: reduced the Archscry-specific ambient glow wash and dossier chart glow intensity, shortened the chart wrap toward the locked mock proportions, and tightened the summary/right-rail spacing. The shared score resolver and Home radar behavior were not changed.
- Owner layout follow-up: moved `Lore` and `Core Tension` out of the under-chart selected summary and into a right-column copy card above the `vm-identity-reading-panel` trait row surface.

Why it changed:
- The final mock is the VM-407 visual/content authority for Archscry.
- The owner clarified that Archscry gets the full Identity Reading panel and Home gets visual-only radar upgrades.
- VM-364 documented a drift risk where Home and Archscry could resolve different shapes. VM-407 closes that by making `identity-layers.json preview_scores` the single runtime score authority.

Decisions made:
- Kept `assets/js/graph.js` untouched.
- Used classic-safe `globalThis.VMRadar` instead of converting Home's classic script pipeline to modules.
- Kept `VMRadar.resolveRadarProfile(key, identityLayers, fallbackFaction)` pure and synchronous.
- Kept generic Strategium axis copy in code as stable shared copy, with the lookup shaped for future identity-specific overrides.
- Used local boxed glyph letters instead of adding Tabler CDN/webfont.
- Did not author or change MTG lore, commander facts, card facts, placement scoring, generated runtime JSON, Maze behavior, or `graph.js`.

Risks / uncertainties:
- Owner manual visual QA remains to confirm the final in-browser look against the locked mock.
- Manual QA should specifically confirm the hover/focus Strategium popover placement, the new right-column Lore/Core position above the trait panel, and whether the reduced Archscry glow now matches the locked mock closely enough.
- The v2 Archscry panel is taller than the prior matrix; manual QA should check the preferred scroll rhythm and mobile stacking.
- Some identities that previously used hardcoded or fallback Archscry shapes now intentionally use registry `preview_scores`, matching Home.
- Pre-existing dirty worktree item `assets/css/topbar.css` was present before VM-407 implementation and was not touched.

Tests run:
- `node --check assets/js/vm-radar.js`
- `node --check assets/js/dossier-radar.js`
- `node --check assets/js/home.js`
- `node --check assets/js/index.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `npm.cmd run test:placement`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run lint:js`
- `npm.cmd run lint:html`
- `npm.cmd test`
- `npm.cmd run test:parser`
- Post-QA layout adjustment checks:
  - `node --check assets/js/dossier-radar.js`
  - `node --check research/archscry-dossier-followup-tests.js`
  - `node research/archscry-dossier-followup-tests.js`
  - `npm.cmd run lint:js`
- Owner spacing/glow follow-up checks:
  - `node --check assets/js/dossier-radar.js`
  - `node --check research/archscry-dossier-followup-tests.js`
  - `node research/archscry-dossier-followup-tests.js`
  - `npm.cmd run lint:js`
- Owner right-panel/popover follow-up checks:
  - `node --check assets/js/dossier-radar.js`
  - `node --check research/archscry-dossier-followup-tests.js`
  - `node research/archscry-dossier-followup-tests.js`
  - `npm.cmd run lint:js`

Not touched:
- `assets/js/graph.js`
- `assets/js/adaptive-placement.js`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- Maze handoff behavior
- MTG lore/card/commander facts
- Existing `assets/css/topbar.css` dirty change

Follow-up recommendations:
- Owner manual visual QA on Home, Archscry desktop, and Archscry mobile.
- If the Archscry panel still feels too tall after manual QA, tune spacing and row density in `assets/css/archscry.css` without changing the resolver.
- If the hover/focus Strategium popover feels too jumpy, keep it hidden at rest and tune the absolute rail overlay position rather than returning it to a permanent top slot.
- Future VM-406/Strategium work can replace generic axis strategium copy with identity-specific copy through the existing `strategiumReading(axis, key)` shape.

Next suggested agent: Visual QA / Product owner review, then Codex for any post-QA polish.
