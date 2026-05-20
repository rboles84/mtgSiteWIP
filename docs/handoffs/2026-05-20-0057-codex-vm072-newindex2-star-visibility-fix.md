# Handoff - VM-072 newIndex2 Star Visibility Fix

Agent name: Codex

Task requested: Fix `newIndex2.html` so the stars are actually visible again, check whether any CSS layering is blocking the canvas, and keep the fix self-contained.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0046-codex-vm071-newindex2-layered-stars-and-orbs.md`
- `docs/handoffs/2026-05-20-0021-codex-vm070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/done/VM-072-newindex2-star-visibility-fix.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-0057-codex-vm072-newindex2-star-visibility-fix.md`

## What Changed

- Lowered the duplicate `body::before` background image behind the `.vm-bg` stack by changing its z-index from `-5` to `-11`.
- Added explicit visibility styling to `.vm-bg__stars` with `z-index: 2`, `opacity: 0.92`, and `mix-blend-mode: screen` so the canvas reads clearly over the image inside `.vm-bg`.
- Corrected the starburst condition in `drawStars()` from `alpha > 1.56` to `alpha > 0.56`, allowing bursts to trigger again.
- Added the `VM-072` done card plus the board and handoff index entries for this visibility fix.

## Why It Changed

The star canvas logic existed, but CSS stacking was effectively burying it behind another full-screen image layer. The effect also lost its burst flashes because the threshold could never be met. This pass restores visibility without changing the page structure or importing shared assets.

## Decisions Made

- Treated the duplicate `body::before` image as the primary blocker instead of rewriting the whole background system.
- Kept the fix inside `newIndex2.html` rather than borrowing from shared atmosphere code.
- Left the user's current background brightness choices alone and only corrected the layering needed to expose the stars.

## Risks / Uncertainties

- If the background image remains intentionally bright, star intensity may still want small artistic tuning after a browser review.
- The page still has two background-image mechanisms (`body::before` and `.vm-bg__picture img`), but this pass only corrected the stacking conflict rather than collapsing them.

## Tests Run

- Static scan confirming `body::before` now uses `z-index: -11`.
- Static scan confirming `.vm-bg__stars` now has explicit `z-index`, `opacity`, and `mix-blend-mode`.
- Static scan confirming the starburst threshold now uses `alpha > 0.56`.
- Local server check confirming `http://localhost:8000/newIndex2.html` responds with HTTP `200`.

## Not Touched

- `index.html`
- `newIndex.html`
- `assets/css/home.css`
- `assets/js/atmosphere.js`
- Navigation, cards, routes, content sections, and radar setup

## Follow-Up Recommendations

- Hard-refresh `newIndex2.html` to clear any cached inline CSS/JS and visually confirm stars are present.
- If the stars are still too faint after the stacking fix, the next smallest pass is to tune star alpha or orb density rather than restructure the background again.

## Next Suggested Agent

Frontend visual QA only if the star visibility still needs intensity tuning after a human refresh pass.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-072-newindex2-star-visibility-fix.md`
- `docs/kanban/done/VM-071-newindex2-layered-stars-and-orbs.md`
- `docs/kanban/done/VM-070-keep-stars-remove-only-home-bubble-layers.md`
- `docs/handoffs/HANDOFF_INDEX.md`
