# Handoff - VM-107 Homepage Hero Shape Concept

Agent name: Codex

Task requested: Replace the current left hero headline area in `newIndex2.html` with the new "Your colors have a shape." hero concept while preserving the right Identity Signal panel and existing homepage behavior.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-21-1729-codex-vm097-homepage-radar-presentation-lift-from-archscry.md`
- `docs/handoffs/2026-05-22-2229-codex-merge-vm106-back-into-ui-branch.md`
- `docs/kanban/board.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-107-homepage-hero-shape-concept.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-22-2313-codex-vm107-homepage-hero-shape-concept.md`

## What Changed

- Replaced the active visible `.vm-hero-copy` content with the `VOX MANA` eyebrow, stacked `Your colors / have a / shape.` headline, and the short lede `A quiet map of instinct, pressure, philosophy, and play.`
- Replaced the old visible Basics helper line with a non-interactive `.vm-color-axis` strip showing W/U/B/R/G medallions and the Order/Knowledge/Ambition/Freedom/Growth philosophy labels.
- Added scoped inline CSS for `.vm-hero-title`, `.vm-hero-lede`, `.vm-color-axis`, and responsive color-axis sizing.
- Used `&middot;` separators to keep the source ASCII-safe while rendering the requested separator dot.
- Moved VM-107 from in progress to done on the file-based Kanban board.

## Why It Changed

The homepage hero needed a sharper, more mystical left-side concept that communicates Vox Mana as a color-shape identity system without disturbing the right-side Identity Signal or lower Living Index structure.

## Decisions Made

- Preserved the commented-out hero CTA block instead of deleting it.
- Kept the new color-axis strip non-interactive with no anchors, buttons, click handlers, pointer affordance, or route links.
- Used `#c8a8ff` as the readable Black/violet medallion color rather than pure `--mana-black`.
- Did not modify `.vm-hero-grid`, `.vm-hero-stack`, `.vm-home-hero`, `.vm-hero-mana`, or right-panel sizing rules.

## Risks / Uncertainties

- Browser smoke at 390px showed existing top navigation horizontal overflow, but the new color-axis strip itself fit within the viewport. Nav behavior was intentionally not changed in this hero-left-only pass.
- `newIndex2.html` was already locally modified before this task; this pass worked within that existing WIP rather than reverting or normalizing unrelated changes.

## Tests Run

- Static scan of active `.vm-hero-copy` markup for old and new hero strings.
- Static scan confirming `vmHeroManaChart`, `heroManaGlow`, `heroManaTitle`, `heroManaText`, and `heroManaDatasetPills` each exist once.
- Static scan confirming `.vm-color-axis` contains no links, buttons, pointer styling, click handlers, or route links.
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- newIndex2.html docs/kanban/board.md docs/kanban/in-progress/VM-107-homepage-hero-shape-concept.md`
- Inline script compile check with Node.
- `npm.cmd test`
- Local route check: `http://localhost:8000/newIndex2.html` returned `200`.
- Browser smoke at `1280x720` and `390x844` for hero copy, color-axis fit, Identity Signal chart visibility, Living Index/footer presence, and console errors.

## Not Touched

- Right Identity Signal markup and IDs
- Homepage chart data, cycle behavior, pause behavior, reduced-motion behavior, and Chart.js setup
- Parent hero grid/sizing rules
- Background and atmosphere scripts
- Living Index section behavior and routes
- `/archscry/`, `/maze/`, `/apocrypha/`, `/basics/`, root `index.html`, and `newIndex.html`

## Follow-Up Recommendations

- If desired, handle the existing mobile top nav overflow in a separate nav-focused responsive pass.
- Do a human visual pass on the new color-axis strip at common laptop widths and decide whether the medallion glow should be slightly calmer or brighter.

## Next Suggested Agent

Frontend QA or visual polish agent for any next responsive nav or hero micro-tuning pass.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-107-homepage-hero-shape-concept.md`
- `docs/handoffs/2026-05-21-1729-codex-vm097-homepage-radar-presentation-lift-from-archscry.md`
- `docs/handoffs/2026-05-22-2229-codex-merge-vm106-back-into-ui-branch.md`
