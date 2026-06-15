# 2026-06-14 10:26 - Codex - VM-387 Apocrypha Visual Repair

## Agent Name

Codex

## Task Requested

Repair Apocrypha's lower-page visual drift so it matches the established Vox Mana rounded glass card system while preserving page content, routing, data, lore, placement behavior, generated artifacts, dependencies, and unrelated dirty work.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-0939-codex-vm386-publish-gate-dossier-cleanup.md`
- `docs/handoffs/2026-06-14-0009-codex-vm385-archscry-dossier-ux-repair.md`
- `docs/handoffs/2026-05-25-2340-codex-vm134-apocrypha-hero-unification.md`
- `docs/handoffs/2026-05-26-2308-codex-vm142-maze-strategium-glass.md`
- `docs/handoffs/2026-05-25-2322-codex-vm133-strategium-glass-readability-polish.md`
- `docs/handoffs/2026-05-24-1453-codex-vm114-p0-shared-css-foundation-pass.md`
- `docs/kanban/board.md`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `strategium/index.html`
- `assets/css/home.css`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `assets/css/apocrypha.css`
- `assets/css/strategium.css`
- `docs/reference/manual-test-cases.md`
- `package.json`

## Files Changed

- `assets/css/apocrypha.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-387-apocrypha-visual-consistency-repair.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-14-1026-codex-vm387-apocrypha-visual-repair.md`

## What Changed

- Added Apocrypha-local tokens for `24px` major radius, `18px` nested radius, `16px` mobile nested radius, the route's blur/saturate treatment, and nested surface styling.
- Applied Apocrypha's existing hero-style glass surface to `.apoc-rail`, `.apoc-guide-card`, `.apoc-library-group`, `.apoc-use-card`, `.apoc-use-note`, `.apoc-vault-overview`, `.apoc-vault-card`, and kept `.apoc-redaction-panel` aligned.
- Added the subtle overlay treatment to lower major cards and kept card content above the overlay.
- Converted `.apoc-reference-card` and `.apoc-redaction-grid > div` from divider/naked blocks into rounded nested surfaces with low-alpha dark background, soft gold border, shadow, and `:focus-within` styling.
- Added a manual test case for lower Apocrypha rounded/glass surfaces.
- Created and closed VM-387 in the Kanban board.

## Why It Changed

The Apocrypha hero already used the VM-134 route-local rounded glass language, but lower content panels computed to square, flatter surfaces. This made the route feel visually less polished than Home, Archscry, Maze, and Strategium. The repair normalizes Apocrypha's lower panels without redesigning the page or changing public content.

## Decisions Made

- Kept runtime styling Apocrypha-local in `assets/css/apocrypha.css`.
- Preserved Apocrypha's archive/hero glass language instead of forcing Maze/Strategium no-blur behavior onto it.
- Used `overflow: hidden` only on major panels where internal background/overlay bleed needed clipping; kept `.apoc-rail`, nested reference cards, and redaction nested blocks overflow-visible.
- Did not use persistent global opacity on text-bearing containers. Existing `[data-reveal]` opacity remains transient reveal behavior.
- Refreshed only the ignored local Apocrypha visual baseline after reviewing the intentional Apocrypha diff.

## Computed-Style Notes

- Before repair, `.apoc-guide-card`, `.apoc-library-group`, `.apoc-use-card`, and `.apoc-vault-card` computed to `border-radius: 0px`, `backdrop-filter: none`, `overflow: visible`, `border: 1px solid rgba(247, 215, 132, 0.18)`, and the same shadow as major panels.
- After repair, those representative lower major surfaces compute to `border-radius: 24px`, `backdrop-filter: blur(12px) saturate(1.12)`, `border: 1px solid rgba(247, 215, 132, 0.18)`, `box-shadow: rgba(0, 0, 0, 0.42) 0px 32px 90px`, `overflow: hidden`, and the Apocrypha gradient glass background.
- Major Apocrypha panels still report `background-color: rgba(0, 0, 0, 0)` because the established route system uses layered gradients for the surface fill rather than a standalone background color.
- `.apoc-reference-card` and `.apoc-redaction-grid > div` now compute to `border-radius: 18px` on desktop, `16px` on mobile, `background-color: rgba(8, 11, 19, 0.42)`, low-alpha white gradient background image, `border: 1px solid rgba(247, 215, 132, 0.14)`, and `box-shadow: rgba(0, 0, 0, 0.22) 0px 14px 34px`.
- Cross-page representative styles remained intentionally varied: Archscry keeps blurred `28px` hero glass, Maze and Strategium keep `24px` no-blur glass from VM-142, Home keeps its established `22px` hero/card surfaces, and Apocrypha now consistently uses its `24px` blurred archive glass for major surfaces.

## Risks / Uncertainties

- Home visual compare failed against baseline and the browser probe found a pre-existing Home mobile/tablet horizontal overflow signal from existing menu/background behavior. It was out of scope and no Home files were changed.
- Archscry dossier visual captures failed against baseline, likely from recent VM-385 visual changes; Archscry landing was 0 mismatch and no Archscry files were changed.
- Strategium visual compare failed against baseline despite no Strategium file changes.
- The in-app browser's read-only page wrapper did not allow a synthetic `.focus()` call on the Apocrypha reference link, so the `:focus-within` affordance was verified by CSS inspection rather than synthetic browser focus.

## Tests Run

- `git diff --check` - PASS; line-ending normalization warnings only.
- `npm.cmd run lint:html` - PASS.
- `npm.cmd run lint:js` - PASS.
- `npm.cmd run test:frontend-smoke` - PASS.
- `npm.cmd test` - PASS.
- `npm.cmd run test:visual:home` - FAIL against existing baseline; Home untouched. Mismatches: mobile 59348, tablet 101009, desktop 132475.
- `npm.cmd run test:visual:archscry` - FAIL against existing baseline; Archscry untouched. Landing captures 0 mismatch; dossier captures exceeded budget.
- `npm.cmd run test:visual:strategium` - FAIL against existing baseline; Strategium untouched. Mismatches: landing-desktop 174876, landing-mobile 66215, console-pod-readiness 185089, library-search 153206.
- `npm.cmd run test:visual:apocrypha` - Initial expected FAIL after visual repair; hero-desktop 20382, hero-mobile 75, references-desktop 131516. Diff reviewed before accepting.
- `npm.cmd run test:visual:apocrypha:baseline` - PASS; refreshed ignored local Apocrypha baseline.
- `npm.cmd run test:visual:apocrypha` - PASS after refresh; all captures 0 mismatches.
- Manual browser QA via local static server on Home, Archscry, Maze, Apocrypha, and Strategium at desktop, tablet-ish, and mobile widths.

## Not Touched

- HTML content and route structure.
- `assets/js/index.js`
- `assets/css/archscry.css`
- Home, Maze, and Strategium runtime CSS.
- Raw faction packets.
- Claims, source ledgers, placement model generation, generated data, Commander data, and source-ledger contracts.
- Dependencies.
- Git staging and commits.

## Follow-Up Recommendations

- Create a separate Home mobile/tablet overflow repair card if that pre-existing signal should be addressed.
- Refresh Home, Archscry dossier, and Strategium visual baselines only under separate reviewed cards.
- If deeper focus-state proof is needed, use a browser workflow that can drive real keyboard tab focus rather than synthetic read-only evaluation.

## Next Suggested Agent

Frontend/UI agent for the optional Home mobile overflow follow-up, or Test Strategist for visual-baseline governance if the current baseline drift should be normalized.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-387-apocrypha-visual-consistency-repair.md`
- `docs/reference/manual-test-cases.md`
- VM-134 Apocrypha hero unification
- VM-142 Maze/Strategium glass unification
- VM-385 Archscry UX repair
