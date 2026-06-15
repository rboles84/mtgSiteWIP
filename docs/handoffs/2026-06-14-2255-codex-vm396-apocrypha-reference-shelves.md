# 2026-06-14 22:55 - Codex - VM-396 Apocrypha Reference Shelves

## Agent Name

Codex

## Task Requested

Implement VM-396 by converting only the Apocrypha `#ledger` `Official Wizards / Mark Rosewater` library group into native collapsible shelves, preserve all source links and non-MaRo groups, verify the expected Apocrypha visual baseline change, update manual QA documentation, and close the Kanban card without staging or committing.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`
- `docs/handoffs/2026-06-14-2213-codex-vm395-apocrypha-maro-source-links.md`
- `docs/handoffs/2026-06-14-2142-claude-vm396-apocrypha-shelf-disclosure-plan.md`
- `docs/kanban/ready/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/kanban/board.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`
- `scripts/visual-regression-apocrypha.mjs`

## Files Changed

- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-2255-codex-vm396-apocrypha-reference-shelves.md`
- Ignored local visual baseline artifacts under `artifacts/visual-regression/apocrypha/baseline/`

## What Changed

- Replaced only the four MaRo `.apoc-reference-card` wrappers with native `<details class="apoc-shelf">` shelves inside `.apoc-shelf-list`.
- Preserved the MaRo group container, heading, intro copy, all four existing `<ul class="apoc-reference-links">` lists, all 39 link texts/hrefs/order/attributes, and all non-MaRo reference cards.
- Added first-shelf-open defaults, `39 sources` group chip, `10 / 10 / 12 / 7` shelf count chips, moved `Used for:` lines into summary sublines, and kept shelf titles as `<h4>`.
- Added Apocrypha-local shelf CSS for nested glass surfaces, CSS-drawn chevrons, native marker hiding, gold outline focus, reduced-motion transition suppression, print-open bodies, and container-safe link columns.
- Updated manual QA documentation, moved VM-396 to `done/`, updated the Kanban board, and added this handoff/index entry.

## Why It Changed

VM-395 added 39 verified official Wizards / Mark Rosewater links, making the first reference library group much taller than the rest of the page. VM-396 compresses that group into a scannable disclosure shelf while keeping Apocrypha's transparency contract: every link remains in the page source and one expansion away.

## Decisions Made

- Used native `<details>`/`<summary>` with no new JS.
- Drew the chevron with CSS borders so no icon font, text glyph, SVG, or external asset is required.
- Used `outline` rather than `box-shadow` for focus because the shared reduced-motion path can make box-shadow evidence unreliable; the gold outline remains visible under reduced motion.
- Used `columns: 220px 2` so lists split only when the actual shelf body is wide enough, avoiding cramped columns in the 1280px visual snapshot.
- Refreshed the Apocrypha visual baseline only after reviewing the pre-refresh diff as targeted to the MaRo shelf change; small hero mismatches were under budget and attributable to page-height/scrollbar movement from the shortened reference section.

## Risks / Uncertainties

- The visual baseline command refreshes all three Apocrypha baseline captures, even though the intentional large diff was in `references-desktop`; final compare returned 0 mismatches.
- The repo remains intentionally dirty from earlier VM-387 through VM-395 release-train work and unrelated tracked/untracked files. This task did not clean, revert, stage, or commit any of that work.
- The VM-396 card text still contains some original planning language such as the older viewport-based column suggestion; the closeout section records the implemented container-safe behavior.

## Tests Run

- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `git diff --check` - PASS, with existing CRLF warnings only.
- `npm.cmd run test:visual:apocrypha` before baseline - expected FAIL: `references-desktop` exceeded budget; hero captures were under budget with scrollbar/page-height drift.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS.
- `npm.cmd run test:visual:apocrypha` after baseline - PASS with `hero-desktop: 0`, `hero-mobile: 0`, `references-desktop: 0`.
- Manual-style browser QA at 1366x900 and 390x844 - PASS for Tab reach to all four summaries, Enter/Space toggle, visible gold focus outline, reduced-motion transition suppression, visible chevrons, no horizontal overflow, preserved non-MaRo cards, and 39 reachable MaRo links after expansion.

## Not Touched

- Placement logic
- Generated placement data
- Raw faction packets
- Commander facts
- Source claim ledgers
- Route aliases
- Non-Apocrypha pages
- JavaScript
- Link text, source order, source hrefs, or MaRo source count
- Git staging, commits, pushes, tags, merges, or main promotion

## Follow-Up Recommendations

- If other Apocrypha reference groups later grow long, add a new card to extend the shelf pattern rather than widening VM-396 retroactively.
- Keep future visual baseline refreshes tied to reviewed route-specific diffs.

## Next Suggested Agent

No immediate follow-up agent required. Use a Frontend/UI agent only if a later source-library group grows enough to need shelves.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md`
- `docs/kanban/done/VM-395-apocrypha-official-maro-source-links.md`
- `docs/handoffs/2026-06-14-2213-codex-vm395-apocrypha-maro-source-links.md`
- `docs/handoffs/2026-06-14-1216-codex-vm388-apocrypha-card-spacing.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`
- `docs/reference/manual-test-cases.md`
