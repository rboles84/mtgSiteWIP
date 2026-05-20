# Handoff - VM-063 Homepage Preview + Portable Identity Radar

Agent name: Codex

Task requested: Build a non-destructive homepage redesign preview at `newIndex.html`, create a portable shared identity radar component in `assets/js/color-matrix-radar.js`, adapt it from `assets/js/home-preview.js`, scan the UI research folder before implementation, and preserve live homepage files.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`
- `docs/handoffs/2026-05-15-2113-codex-lightweight-mock-home-sandbox.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/design/asset-manifest.md`
- `docs/design/visual-style-guide.md`
- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/index.js`
- `assets/css/tokens.css`
- `assets/css/topbar.css`
- `assets/css/atmosphere.css`
- `assets/css/components.css`
- `assets/js/atmosphere.js`
- `assets/js/reduce-motion.js`
- `assets/js/vm-topbar.js`
- `assets/`
- `assets/img/backgrounds/background-vox-gateway-clean-13.webp`
- `assets/img/vox-mana-logo.png`
- `assets/img/vox-mana-logo-flame-orb-final.html`
- `assets/img/logo.html`
- `docs/research/ui_research/2026-feature-learning-page.html`
- `docs/research/ui_research/apocrypha-lore-capenna-fixed.html`
- `docs/research/ui_research/combined_Advanced.html`
- `docs/research/ui_research/cool_psychological_matrix_placementPage.html`
- `docs/research/ui_research/copilot_skeleton.html`
- `docs/research/ui_research/index - Copy.html`
- `docs/research/ui_research/KEEP THIS_archscry-interactive-premo.html`
- `docs/research/ui_research/KEEP THIS_placement-dossier-advanced.html`
- `docs/research/ui_research/KEEP THIS_placement-dossier-example.html`
- `docs/research/ui_research/logo2.html`
- `docs/research/ui_research/newDemoCopilot9.html`
- `docs/research/ui_research/possible_vox-mana-landing.html`
- `docs/research/ui_research/potential.html`
- `docs/research/ui_research/prototype_copy.html`
- `docs/research/ui_research/prototype1.html`
- `docs/research/ui_research/siteUpgradeInfo_Good.html`
- `docs/research/ui_research/ui_layout_mock.txt`
- `docs/research/ui_research/voxmana_index_skeleton_landing.html`
- `docs/research/ui_research/vox-mana-landing-index-reimagined.html`
- `docs/research/ui_research/vox-mana-landing-interactive-premo.html`

## Files Changed

- `newIndex.html`
- `assets/css/home-preview.css`
- `assets/js/color-matrix-radar.js`
- `assets/js/home-preview.js`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-1848-codex-vm063-homepage-preview-portable-radar.md`

## What Changed

- Added `newIndex.html` as an isolated homepage preview using the existing shared topbar/atmosphere stack and the repo's current gateway background asset.
- Built `assets/css/home-preview.css` for a preview-only landing surface with a three-door threshold, Color Matrix section, dossier/deckways preview cards, sticky section rail, and reduced-motion-safe reveal behavior.
- Built `assets/js/color-matrix-radar.js` as the page-agnostic shared radar home for Chart.js creation, plugin registration, gradient/glow styling, profile normalization, and render/update/destroy lifecycle.
- Exposed the shared radar API as `renderIdentityRadar(options)`, `updateIdentityRadar(target, options)`, `destroyIdentityRadar(target)`, and `buildIdentityRadarSeries(input)`.
- Built `assets/js/home-preview.js` as the homepage-only adapter that supplies target elements, baseline profiles, signal profiles, summary copy, button state, reduced-motion updates, and a second radar mount.
- Included a second arbitrary radar target on the preview page to validate the portability rule from day one.
- Fixed a lifecycle bug found during testing where re-rendering a container target could leave a chart attached to a detached managed canvas instead of the active mount point.
- Kept the live homepage shell untouched by avoiding edits to `index.html`, `assets/css/home.css`, `assets/js/home.js`, and `assets/js/index.js`.

## Why It Changed

The requested work needed to prove two things at once: Vox Mana can explore a stronger homepage direction without destabilizing the current live entry point, and the Color Matrix radar can be written once as a shared component that later moves into Archscry result or dossier surfaces with only wiring work left.

## Decisions Made

- Used `background-vox-gateway-clean-13.webp` as the hero atmosphere because it already matches the live Vox Mana identity and preserves continuity.
- Avoided `assets/img/vox-mana-logo.png` after user feedback because the white background breaks the darker gateway treatment.
- Reused the shared `vm-brand-mark` topbar treatment and inline sigil language instead of introducing a new logo asset dependency.
- Used Chart.js from the CDN for this proof of concept and added the required TODO to replace it later with `./vendor/chart.umd.min.js`.
- Kept all Chart.js-specific implementation inside `assets/js/color-matrix-radar.js`.
- Kept the radar helper free of homepage selectors, `localStorage`, Archscry DOM knowledge, and Magic Basics tab assumptions.
- Used a target-keyed `WeakMap` registry so multiple radar instances can coexist without a single global chart singleton.
- Reused research inspiration as pattern input only, not as runtime dependency or direct page import.

## Risks / Uncertainties

- Browser-level visual verification was not available in this session because the Browser skill's required Node REPL execution tool was not exposed, so testing stayed at syntax, static contract, and Node-harness lifecycle checks.
- The preview currently depends on the Chart.js CDN when opened normally; the vendor handoff note is present, but the local bundled replacement is not yet wired.
- The later Archscry integration still needs a small mount-and-data pass inside `#result-inner`, even though the component design and API now support that move.

## Tests Run

- `node --check assets/js/color-matrix-radar.js`
- `node --check assets/js/home-preview.js`
- Temporary Node harness for `assets/js/color-matrix-radar.js` verifying shared API exposure, keyed-object and ordered-array series input handling, managed canvas creation for container targets, second simultaneous mount on a direct canvas target, update reuse without duplicate instances, destroy and re-render cleanup behavior, and one-time plugin registration behavior. The temporary harness file was deleted after the run.
- Static scans confirming the required CDN TODO note is present in `newIndex.html`, the preview references the existing gateway background asset, the preview includes both container and canvas radar targets, the preview files do not reference `vox-mana-logo.png`, the shared radar helper does not read `localStorage`, and the shared radar helper does not contain homepage-only DOM references.

## Not Touched

- `index.html`
- `assets/css/home.css`
- `assets/js/home.js`
- `assets/js/index.js`
- Runtime Archscry dossier/result rendering
- `docs/research/ui_research/` source files
- Existing image assets and background assets
- Maze, Apocrypha, Scryfall, parser, and placement logic

## Follow-Up Recommendations

- Replace the Chart.js CDN include with `./vendor/chart.umd.min.js` once the local vendor copy is ready.
- Add the first live Archscry integration by injecting a radar container into `#result-inner` and calling `renderIdentityRadar(...)` after result markup renders.
- If the preview direction advances, consider extracting the inline doorway sigils into shared SVG assets or a small reusable partial.
- If future visual QA matters before integration, run a browser-backed pass once the Browser Node REPL execution tool is available in-session.

## Next Suggested Agent

Planning Architect or Frontend implementation follow-up for the Archscry result-view radar mount.

## Related Kanban Card / Docs / Plans

- `docs/kanban/done/VM-063-homepage-preview-portable-identity-radar.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/handoffs/2026-05-15-2016-codex-vm017-main-index-gateway-mockup-set.md`
- `docs/handoffs/2026-05-16-1053-codex-route-architecture-normalization.md`
- `docs/handoffs/HANDOFF_INDEX.md`
