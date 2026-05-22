# Agent Handoff: Codex - VM-011 Apocrypha Public Reference Library

- Agent Name: Codex
- Date: 2026-05-21 17:34
- Task Requested: Retool `/apocrypha/` from a source-group-heavy archive page into a simpler visitor-first public reference library while preserving the shared Vox Mana shell, the `/library/` compatibility alias, and all 10 existing public source URLs.
- Related Kanban Card: `VM-011 - Apocrypha Source Atlas and Source Bridge`
- Status: Complete

## Files Reviewed

- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\newIndex2.html`
- `C:\dev\mtgSiteWIP\archscry\index.html`
- `C:\dev\mtgSiteWIP\apocrypha\index.html`
- `C:\dev\mtgSiteWIP\assets\css\apocrypha.css`
- `C:\dev\mtgSiteWIP\assets\js\apocrypha.js`
- `C:\dev\mtgSiteWIP\library\index.html`

## Files Changed

- `C:\dev\mtgSiteWIP\apocrypha\index.html`
- `C:\dev\mtgSiteWIP\assets\css\apocrypha.css`
- `C:\dev\mtgSiteWIP\assets\js\apocrypha.js`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`

## What Changed

- Rebuilt the Apocrypha content flow into a simpler visitor-first sequence:
  - Why This Page Exists
  - What Should I Look At?
  - Public Reference Library
  - How These References Are Used
  - Phase 2: Research Vault
  - What Is Not Published
- Rewrote the hero so it introduces Apocrypha as the public reference library behind Vox Mana rather than an internal archive console.
- Replaced the old source-group browser with a static quick-guide card grid that explains what to look at without hiding content behind panel switching.
- Replaced the public-source table with grouped public reference panels that keep every source title visible and clickable.
- Preserved all 10 existing public source URLs and added a short plain-language `Used for:` line to every visible reference entry.
- Switched the Apocrypha background image to the same `background-vox-gateway-clean-09.webp` family used by Archscry while keeping the shared `vm-bg` atmosphere stack and page-local tuning.
- Simplified `assets/js/apocrypha.js` so it keeps atmosphere, reveal behavior, rail highlighting, reduced-motion handling, and the return dock, while removing the obsolete source-group browser logic.
- Retargeted the return dock from `Back to source groups` to `Back to references`.

## Why It Changed

- The prior page had useful links, but it still centered the experience on internal archive architecture instead of visitor needs.
- This pass makes Apocrypha easier to understand at a glance: why the page exists, what kinds of references are here, where the live links are, and what may arrive later.
- The page now behaves more like a calm public reference room and less like an internal system map, while still staying inside the existing Vox Mana visual family.

## Decisions Made

- `/apocrypha/` remains the canonical route and `/library/` remains the compatibility alias.
- All 10 existing public source URLs remain present and clickable.
- The visible `Source Groups` browser metaphor was removed because it made the public links harder to reach quickly.
- The simplified page keeps the existing main section ids where practical:
  - `#top`
  - `#decks`
  - `#ledger`
  - `#method`
  - `#dossiers`
  - `#notice`
- The Apocrypha route now uses the same background family as Archscry through the shared `vm-bg` structure instead of the older Apocrypha-specific painted library asset.

## Risks / Uncertainties

- `assets/css/apocrypha.css` still contains some old page-local selectors from the previous browser-based version; they are harmless now but could be cleaned up in a later maintenance pass.
- There is unrelated dirty worktree drift in Archscry, docs, and homepage files that this task intentionally did not touch.
- Phase 2 preview cards are intentionally non-clickable and descriptive only; future vault publication work will still need its own IA and content rules.

## Tests Run

- `node --check assets/js/apocrypha.js`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- apocrypha/index.html assets/css/apocrypha.css assets/js/apocrypha.js docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md docs/handoffs/HANDOFF_INDEX.md docs/handoffs/2026-05-21-1734-codex-vm011-apocrypha-public-reference-library.md`
- Browser QA against a local static server:
  - opened `/apocrypha/`
  - confirmed the hero explains why the page exists
  - confirmed the quick-guide section renders above the public reference library
  - confirmed all 10 public links remain visible and clickable
  - confirmed every public reference entry shows a `Used for:` line
  - confirmed the rail and return dock still work
  - confirmed `/library/` still forwards into `/apocrypha/`
  - confirmed mobile layout remains usable at a narrow viewport

## Not Touched

- `C:\dev\mtgSiteWIP\archscry\index.html`
- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\newIndex2.html`
- `C:\dev\mtgSiteWIP\library\index.html`
- Existing public source URLs
- Placement scoring logic
- Prompt internals
- Hidden weights
- Placement calculations
- Unrelated dirty worktree changes outside this task

## Follow-Up Recommendations

- If Apocrypha stays on this simpler path, do one later cleanup pass to remove dead page-local CSS left over from the old source-group browser.
- When a Research Vault route becomes real, define publication rules first so previews graduate into live files without exposing raw working material.
- Consider moving the public reference inventory into a checked-in manifest later if the library keeps growing.

## Next Suggested Agent

- Frontend QA or Documentation Steward

## Related Kanban Card, Docs, Or Plans

- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`
- User plan: `Apocrypha Public Reference Library Retool`
