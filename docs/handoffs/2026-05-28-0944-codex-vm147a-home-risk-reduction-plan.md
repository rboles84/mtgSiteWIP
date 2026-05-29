# 2026-05-28 09:44 - Codex - VM-147A Home Risk Reduction Plan

## Agent name

Codex as Planning Architect

## Task requested

Use the AGENTS workflow to review the current VM-147 context, reshape the work into a narrow Home-route slice, update the Kanban planning artifacts, and avoid runtime implementation.

## Files reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-24-2023-codex-vm121-newindex2-extraction-card.md`
- `docs/handoffs/2026-05-24-2226-codex-vm121-newindex2-extraction-implementation.md`
- `docs/handoffs/2026-05-24-2315-codex-vm121-precommit-hardening.md`
- `docs/handoffs/2026-05-26-2312-codex-vm143-route-ownership-matrix.md`
- `docs/handoffs/2026-05-26-2334-codex-vm148-canonical-homepage-cutover.md`
- `docs/handoffs/2026-05-27-0706-codex-vm149-identity-preview-registry.md`
- `docs/handoffs/2026-05-27-0730-codex-vm088-home-mana-lens-closeout.md`
- `docs/handoffs/2026-05-27-2205-codex-vm144-preview-archive-audit.md`
- `docs/handoffs/2026-05-27-2208-codex-vm146-cdn-font-review.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/done/VM-143-frontend-route-ownership-matrix.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/done/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-088-home-auto-cycling-mana-lens-showcase.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
- `docs/design/asset-manifest.md`
- `index.html`
- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `assets/js/index.js`
- `assets/js/graph.js`
- `scripts/frontend-smoke.mjs`
- `scripts/visual-regression-newindex2.mjs`

## Files changed

- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/ready/VM-147A-home-route-css-js-risk-reduction.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-28-0944-codex-vm147a-home-risk-reduction-plan.md`

## What changed

- Reframed VM-147 as a route-by-route risk-reduction spike instead of a broad cleanup card.
- Added `VM-147A - Home Route CSS JS Risk Reduction` as a ready execution slice for the canonical Home route only.
- Updated the Kanban board so VM-147 stays in backlog as the umbrella and VM-147A appears under `Ready`.
- Captured the actual Home route contract in the new ready card, including the live CSS/JS load order, Home data dependencies, and the protected Chart.js runtime boundary.
- Corrected the Home slice scope so `assets/js/index.js` is explicitly excluded because `index.html` does not load it.

## Why it changed

The existing VM-147 card was too broad and too likely to drift into shared-system churn. The repo's recent Home work shows a safer first slice: the canonical `index.html` route now has bounded route-local assets, explicit visual/smoke coverage, and fewer product-logic couplings than Maze or Archscry.

## Decisions made

- Kept VM-147 as the umbrella spike card so future Archscry or Maze slices can still hang off the same planning thread.
- Created VM-147A as the first implementation slice because the Home route is the lowest-risk proving ground for this work.
- Preserved the historical `assets/css/newindex2.css` and `assets/js/newindex2.js` names as explicit constraints.
- Treated `assets/js/graph.js` as protected runtime behavior and QA inventory only for the Home slice.
- Excluded `assets/js/index.js` from VM-147A because it is loaded by `archscry/index.html`, not `index.html`.
- Kept the plan focused on route-local organization, verified dead-code removal, and QA protection rather than redesign or shared extraction.

## Risks / uncertainties

- Some dormant-looking Home runtime may still be kept for historical or near-future markup experiments, so the implementation pass must verify each removal candidate before deleting it.
- The Home visual harness masks animated canvas layers, so browser/manual review remains necessary for atmosphere and motion behavior.
- Historical `newindex2` naming remains intentional even though the canonical route is now `index.html`.

## Tests run

- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check`

## Not touched

- `index.html`
- `assets/css/newindex2.css`
- `assets/js/newindex2.js`
- `assets/js/graph.js`
- `assets/js/index.js`
- Shared CSS/JS systems
- Data contracts, generated artifacts, placement logic, precon logic, Supabase/session behavior
- Maze, Archscry, Strategium, Apocrypha, Privacy, and Terms runtime behavior

## Follow-up recommendations

- Execute VM-147A as a route-local implementation pass with visual, smoke, and manual QA kept explicit in the same branch.
- If the Home slice succeeds cleanly, create separate suffixed cards for Archscry and Maze rather than reopening VM-147 as a broad cleanup.
- Keep Chart.js loading/runtime review on its own path unless the Home slice finds a verified route-local defect.

## Next suggested agent

Implementation-focused frontend refactor agent

## Related Kanban card, docs, or plans

- `docs/kanban/backlog/VM-147-large-route-css-js-risk-reduction.md`
- `docs/kanban/ready/VM-147A-home-route-css-js-risk-reduction.md`
- `docs/kanban/done/VM-148-canonical-homepage-cutover.md`
- `docs/kanban/done/VM-149-identity-preview-registry-canonicalization.md`
- `docs/kanban/done/VM-088-home-auto-cycling-mana-lens-showcase.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/reference/manual-test-cases.md`
