# 2026-05-26 23:34 - Codex - VM-148 Canonical Homepage Cutover

## Agent name

Codex

## Task requested

Implement the canonical homepage cutover plan: delete the old Three Doors root, promote the Identity Signal homepage to `index.html`, update route links and harnesses, document the state change, and create the identity-registry follow-up without changing identity expansion infrastructure.

## Files reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2312-codex-vm143-route-ownership-matrix.md`
- `docs/handoffs/2026-05-26-2308-codex-vm142-maze-strategium-glass.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- Public route HTML files
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/lighthouse-newindex2.mjs`

## Files changed

- `index.html`
- `newIndex2.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `apocrypha/index.html`
- `privacy/index.html`
- `terms/index.html`
- `assets/css/home.css`
- `assets/css/atmosphere.css`
- `assets/js/home.js`
- `assets/js/atmosphere.js`
- `assets/js/newindex2.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`
- `scripts/lighthouse-newindex2.mjs`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/data-flow-map.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/method-reference.md`
- `docs/diagrams/route-map.mmd`
- `docs/diagrams/route-map.svg`
- `docs/diagrams/project-architecture.mmd`
- `docs/diagrams/project-architecture.svg`
- `docs/audits/lighthouse-newindex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/backlog/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`

## What changed

- Promoted the Identity Signal homepage from `newIndex2.html` to `index.html`.
- Removed the old Three Doors-only root assets: `home.css`, `home.js`, and `atmosphere.js`.
- Updated public route Home links from `../newIndex2.html` to `../index.html`.
- Updated the new root brand/Home links from `#top` to `./index.html`; Back to top links still use `#top`.
- Retargeted validators, smoke tests, visual regression, and Lighthouse to the root route.
- Updated living route ownership, atlas, data-flow, method, diagram, and manual QA docs to match the canonical route.
- Created VM-149 for identity preview registry canonicalization.
- Retargeted VM-088 to the canonical Home route and warned that it should re-check VM-149 before deepening the private Mana Lens data island.
- Marked VM-017 as a historical Three Doors prompt that needs re-triage before implementation.

## Why it changed

The canonical domain root served the stale Three Doors page while all subroutes called `newIndex2.html` Home. This made `/` and the product-facing Home route disagree. The cutover makes the de-facto homepage the canonical root while keeping identity expansion and registry migration isolated for a later, safer branch.

## Decisions made

- Kept the route-local asset names `newindex2.css` and `newindex2.js` to avoid an unnecessary rename blast radius.
- Left `/library/` as a redirect alias to `/apocrypha/`; it does not currently have a topbar Home link to update.
- Kept historical completed-card references to `newIndex2.html` intact.
- Kept VM-149 separate from this branch so routing cleanup does not become identity architecture work.

## Risks / uncertainties

- `assets/js/newindex2.js` still owns a private identity preview data island; VM-149 should fix that before expansion.
- The visual and Lighthouse npm script names still include `newindex2` for continuity even though they now target `/index.html`.
- Lighthouse still fails with the known `NO_FCP` behavior and Edge cleanup returned `taskkill` access denied during this run.
- The worktree also contains pre-existing VM-142 and VM-143 changes, including `assets/css/maze.css`, route ownership docs, and follow-up cards, which were preserved.

## Tests run

- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `npm.cmd test`
- `npm.cmd run test:visual:newindex2`
- `npm.cmd run test:lighthouse:newindex2` (failed with known `NO_FCP`; stopped hung Node process after Edge cleanup access denied)
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- Identity registry canonicalization and expansion infrastructure
- `data/identity-layers.json`
- `data/identity-layers.schema.json`
- `assets/js/quick-reading-tests.js`
- `assets/js/commander-dossier.js`
- `research/build-faction-artifacts.mjs`
- Maze parser/search behavior
- Strategium token behavior
- Precon source data, generated precon catalog, schemas, and ranking logic
- Supabase schema, edge function behavior, and saved-profile contracts
- Unrelated stale preview assets covered by VM-144

## Follow-up recommendations

- Implement VM-149 before any shard, wedge, four-color, or further Mana Lens data expansion.
- Re-run or repair the Lighthouse harness separately if performance/accessibility scores need to be actionable rather than blocked by `NO_FCP`.
- Re-triage VM-017 before spending design effort on the old Three Doors gateway direction.

## Next suggested agent

Documentation Steward for review, then Data/JSON Cartographer for VM-149.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/backlog/VM-149-identity-preview-registry-canonicalization.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/in-progress/VM-088-newindex2-auto-cycling-mana-lens-showcase.md`
