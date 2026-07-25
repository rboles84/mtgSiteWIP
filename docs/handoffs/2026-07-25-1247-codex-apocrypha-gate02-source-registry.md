# Codex Handoff - Apocrypha Gate 2 Source Registry

## Agent Name

Codex

## Task Requested

Continue the Apocrypha source-integrity and voice repair for Gate 2 only by creating the source registry and focused validation foundation in the existing `codex/apocrypha-gate01-source-inventory` worktree.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- `docs/kanban/board.md`
- `docs/research/apocrypha-gate01-baseline-inventory.md`
- `docs/research/canon/misc/color_pie_articles_for_apocrypha.md`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/apocrypha.js`
- `package.json`

## Files Changed

- `data/apocrypha-source-registry.json`
- `scripts/validate-apocrypha-sources.mjs`
- `docs/research/apocrypha-gate02-source-registry.md`
- `docs/handoffs/2026-07-25-1247-codex-apocrypha-gate02-source-registry.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a 49-record Apocrypha source registry preserving every currently rendered Gate 1 source.
- Marked 40 `magic.wizards.com` records as official but not online verified.
- Marked 9 GitHub/Reddit/MTGLore/Fandom/Draftsim/YouTube records as supplemental, non-official move candidates.
- Added a focused validator for registry integrity, canonical URL duplication, source authority boundaries, vague `usedFor` language, social/media placement, date formats, and manual count fields.
- Added the Gate 2 report with counts, verification limitations, minimum official-source gaps, and next Gate 3 recommendation.
- Updated the handoff index with this Gate 2 work.

## Why It Changed

Gate 2 needs a registry and validation foundation before later gates can move Apocrypha from hardcoded source cards to source-aware rendering and copy.

## Decisions Made

- Kept `package.json` unchanged; the direct validator command is `node scripts/validate-apocrypha-sources.mjs`.
- Kept all current official-looking records `status: "not-checked"` because links were not verified online.
- Kept all supplemental records present and explicitly non-claim-bearing; none were removed.
- Did not add non-rendered official minimum sources from the retained audit without online verification or a dedicated canonical-source reconciliation step.
- Did not edit Kanban files because the Gate 2 prompt restricted allowed commit files; this is recorded as a scoped exception to the general repo convention.

## Risks / Uncertainties

- All 49 links remain online-unverified.
- Rendered Wizards URLs disagree with the retained preimplementation audit in several places.
- Required official-source minimum categories remain incomplete for rules/card-records, official archives, plane pages, full wedge coverage, the Magic Story archive, and the second Ravnica flavor guide.
- Apocrypha visible counts are still hardcoded in HTML and not registry-driven.

## Tests Run

- `node scripts/validate-apocrypha-sources.mjs`

Result:

```text
Apocrypha source registry validation PASS: 49 records, 40 official, 9 supplemental, 49 not checked, 9 move/remove candidates.
```

## Not Touched

- Original main worktree `C:\dev\voxmana.io`
- `apocrypha/index.html`
- Apocrypha CSS
- Apocrypha JavaScript
- Apocrypha UI rendering
- Visible Apocrypha copy
- Strategium files
- Archscry placement logic
- CRIT-001 files
- CRIT semantic data
- Generated files
- Package files
- Kanban files
- GitHub remote, push, or PR

## Follow-up Recommendations

- Gate 3 should reconcile canonical official sources before wiring the registry into rendering.
- Gate 3 should define registry-driven grouping/count behavior and a no-JavaScript fallback before any UI migration.
- A later verification pass should perform GET-based link checks and record final URLs, HTTP statuses, redirect chains, and check dates.

## Next Suggested Agent

Planning Architect for Gate 3 information architecture, paired with JSON Cartographer for canonical-source reconciliation.

## Related Kanban Card, Docs, Or Plans

- Related prior report: `docs/research/apocrypha-gate01-baseline-inventory.md`
- Related Gate 2 report: `docs/research/apocrypha-gate02-source-registry.md`
- Related handoff: `docs/handoffs/2026-07-25-1320-codex-apocrypha-gate01-source-inventory.md`
- Related Kanban area: `VM-011 - Apocrypha Source Atlas and Source Bridge`
