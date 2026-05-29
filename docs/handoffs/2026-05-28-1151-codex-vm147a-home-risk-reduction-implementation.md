# 2026-05-28 11:51 - Codex - VM-147A Home Risk Reduction Implementation

## Agent Name

Codex

## Task Requested

Implement VM-147A as a narrow Home-route CSS/JS risk-reduction slice, preserving the historical `newindex2` asset names, avoiding Chart.js/loading changes, adding Home manual QA coverage, and closing the Kanban/handoff trail.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
- `docs/handoffs/2026-05-24-2315-codex-vm121-precommit-hardening.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`
- `docs/handoffs/2026-05-27-0730-codex-vm088-home-mana-lens-closeout.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/ready/VM-147A-home-route-css-js-risk-reduction.md`
- `docs/kanban/board.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `index.html`
- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `assets/js/graph.js`
- `assets/js/index.js`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`

## Files Changed

- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/done/VM-147A-home-route-css-js-risk-reduction.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-1151-codex-vm147a-home-risk-reduction-implementation.md`

## What Changed

- Added route-local section markers to `assets/css/newindex2.css` for Home shell, Hero, Identity signal, Cards / panels, Responsive behavior, Legacy glyph compatibility, and Animation / reduced motion.
- Removed verified stale or duplicate Home-only CSS: the dormant `#void-canvas` rule and one identical duplicate `.vm-radar-glow` declaration block.
- Added route-local section markers to `assets/js/newindex2.js` for SVG boot, Hero Mana Lens / Chart helpers, Home atmosphere, and reveal/page bootstrap.
- Removed verified dormant Home-only JavaScript: the unused `<vm-dossier-card>` custom element, the unused `.hero-card` observer path, the unused `[data-vm-placeholder-link]` guard, and an unused reduced-motion variable.
- Added VM-147A Home manual QA coverage to `docs/reference/manual-test-cases.md`.
- Moved VM-147A from ready to done, updated the VM-147 umbrella card, and updated the handoff index.

## Why It Changed

VM-147A is a maintainability and QA-protection slice. The changes make the Home route-local CSS/JS easier to reason about while preserving product behavior, the historical `newindex2` asset names, Chart.js loading, and the route's existing ownership boundaries.

## Decisions Made

- Preserved `assets/css/newindex2.css` and `assets/js/newindex2.js` names because they remain the live historical Home assets after VM-148.
- Left `assets/js/graph.js` and Chart.js configuration/loading unchanged because the identity signal already has smoke and visual coverage and the card explicitly treats this runtime as protected behavior.
- Left `assets/js/index.js` untouched because it is Archscry-owned and not loaded by Home.
- Removed only stale code verified against current Home markup and route-local JS references.
- Did not keep a horizontal-overflow containment change in VM-147A. The only complete containment approach changed `html`/`body` overflow and reduced the measured 800px viewport scroll width from `921px` to `800px`, but it produced tablet visual-regression drift of `473` pixels, above the `300`-pixel budget. Selector-level attempts against `.vm-radar-card.vm-hero-radar-card .vm-radar-glow` and `.vm-chart-wrap.vm-hero-chart-wrap` did not remove the actual horizontal scroll under a stricter probe, so they were reverted.

## Risks / Uncertainties

- A pre-existing Home horizontal-overflow defect remains a follow-up candidate. The strict probe measured `documentElement.scrollWidth` at `921px` on an 800px viewport, with `#heroManaGlow` and nearby decorative SVG geometry implicated. Fixing this cleanly may require a deliberate visual decision about the intended hero glow or a fresh visual baseline.
- `assets/js/newindex2.js` still contains historical Archscry naming in the atmosphere initializer. This was left alone to avoid rename-only churn.
- The Home visual harness masks animated canvas layers, so final human review should still watch the atmosphere and motion behavior in a browser.

## Tests Run

- `node --check assets/js/newindex2.js` - pass.
- `npm.cmd run lint:html` - pass.
- `npm.cmd run lint:js` - pass.
- `npm.cmd run test:frontend-smoke` - pass.
- `npm.cmd test` - pass.
- `npm.cmd run test:visual:newindex2` - pass; final result was mobile `0`, tablet `1`, desktop `21` mismatched pixels, all within the `300`-pixel budget.
- `npm.cmd run test:visual:newindex2:baseline` - pass before implementation to confirm the starting Home visual baseline.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check` - no whitespace errors; Git reported LF-to-CRLF working-copy normalization warnings only.
- Temporary Puppeteer manual QA probe - Home loaded at `/` and `/index.html`, the topbar marked Home active, the mobile menu toggled open, the identity chart rendered, reduced motion reported `Still`, and no route-script errors were found. The probe also produced the horizontal-overflow follow-up evidence above and was not kept in the final diff.

## Not Touched

- `assets/js/graph.js`
- `assets/js/index.js`
- Chart.js loading or configuration
- Shared CSS/JS extraction or registry changes
- Maze parser/search behavior
- Scryfall parser behavior
- Placement scoring
- Precon data/ranking
- Supabase/session contracts
- Archscry templates and dossier runtime

## Follow-Up Recommendations

- Open a separate Home route defect card for horizontal overflow if product wants that addressed. Treat it as a visual decision because the full containment fix exceeded the visual-regression budget.
- Keep the next VM-147 slice route-specific, likely Archscry or Maze only after a new planning pass and route-specific QA inventory.

## Next Suggested Agent

Kanban Steward or Planning Architect for any follow-up VM-147B slice; Test Strategist if the horizontal-overflow defect is promoted.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-147A-home-route-css-js-risk-reduction.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/reference/manual-test-cases.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/design/asset-manifest.md`
