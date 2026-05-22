# Agent Handoff: Codex - VM-011 Apocrypha Source Group Simplification

- Agent Name: Codex
- Date: 2026-05-21 13:56
- Task Requested: Simplify the Apocrypha page wording and structure so it reads like a public research archive, move Source Groups above Public Sources, preserve all live source links, and keep the work under `VM-011`.
- Related Kanban Card: `VM-011 - Apocrypha Source Atlas and Source Bridge`
- Status: Complete

## Files Reviewed

- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-2254-codex-vm092-homepage-compression-ambient-signal-polish.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-2336-codex-archscry-background-parity-gateway-09.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\architecture\project-atlas.md`
- `C:\dev\mtgSiteWIP\newIndex2.html`
- `C:\dev\mtgSiteWIP\apocrypha\index.html`
- `C:\dev\mtgSiteWIP\assets\css\apocrypha.css`
- `C:\dev\mtgSiteWIP\assets\js\apocrypha.js`
- `C:\dev\mtgSiteWIP\library\index.html`

## Files Changed

- `C:\dev\mtgSiteWIP\apocrypha\index.html`
- `C:\dev\mtgSiteWIP\assets\css\apocrypha.css`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-21-1356-codex-vm011-apocrypha-source-group-simplification.md`

## What Changed

- Rewrote the Apocrypha hero and archive-status copy into calmer research-archive language.
- Updated the status block to the exact wording `10 public sources`, `5 source groups`, and `2 private method areas`.
- Reordered the main content so Source Groups now appear above Public Sources.
- Kept the existing group browser interaction, but changed all visible framing from `decks` to `source groups`.
- Rewrote the five group panels so each one now reads as:
  - description
  - used for
  - trust and access
  - current sources or visible examples
  - boundary
- Simplified the Public Sources intro, Research Dossiers copy, method flow labels, and What Stays Private section.
- Added small CSS support for the new hero follow-up note and compact bullet lists inside the source-group cards.
- Refreshed the VM-011 done card so the refinement is recorded under the existing story instead of creating a new card.

## Why It Changed

- The previous Apocrypha rebuild had the right structure, but the copy still leaned too hard into secret-system language.
- The page now reads more like a public research archive and less like a classified dashboard.
- Moving Source Groups above Public Sources makes the archive categories clear before visitors hit the raw evidence table.

## Decisions Made

- Kept `/apocrypha/` canonical and left `/library/` as the compatibility alias.
- Preserved all 10 existing public source links exactly.
- Left the working group browser, rail, and return dock behavior intact instead of replacing the interaction model again.
- Kept the internal implementation ids/classes that still use `deck` naming where they are runtime-only, but removed the visible `deck` framing from the page copy.
- Updated the VM-011 done card in place rather than creating a new Kanban story for the wording/IA pass.

## Risks / Uncertainties

- Some internal runtime names still use `deck` terminology behind the scenes; that is intentional for this pass to avoid unnecessary JS churn.
- The current page still uses the existing Apocrypha-specific background asset, but it now reads inside the newer `newIndex2` / Archscry visual family rather than the earlier archive shell.
- There is unrelated dirty worktree drift in Archscry, docs, and homepage files that was not touched here.

## Tests Run

- `node --check assets/js/apocrypha.js`
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- apocrypha/index.html assets/css/apocrypha.css docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md`
  - Result: authored diffs passed with existing LF/CRLF warnings only
- Static copy scan confirming removal of the old visible phrases:
  - `Five Decks`
  - `Evidence decks`
  - `Protected summary shelves`
  - `Recognized shelf`
  - `Redacted Logic Notice`
- Static source-link check confirming all 10 public source URLs remain present in `apocrypha/index.html`
- Browser QA against a local static server on `http://127.0.0.1:4173`
  - Confirmed `/apocrypha/` loads with the revised hero and exact archive-status wording
  - Confirmed Source Groups renders above Public Sources
  - Confirmed group switching still updates the active panel and hash
  - Confirmed the return dock still jumps back to Source Groups and back to Top
  - Confirmed the local rail updates `aria-current`
  - Confirmed mobile layout at `390x844` collapses to single-column hero/group/tray layout
  - Confirmed `/library/` still forwards into `/apocrypha/`

## Not Touched

- `C:\dev\mtgSiteWIP\archscry\index.html`
- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\newIndex2.html`
- `C:\dev\mtgSiteWIP\library\index.html`
- Placement scoring logic
- Prompt internals
- Hidden scoring relationships
- Existing live source URLs
- Unrelated dirty worktree changes outside this task

## Follow-Up Recommendations

- If the page keeps trending toward a calmer information-architecture style, consider renaming the runtime-only `deck` ids/classes in a later cleanup pass once the content direction is stable.
- When the first dossier page goes live, publish it under the same calmer language rules used in this pass so the archive stays consistent.
- If users continue to lean on the Public Sources ledger first, consider later moving the trust-role metadata into a checked-in source manifest so the ledger and group cards share a single data source.

## Next Suggested Agent

- Frontend QA or Documentation Steward

## Related Kanban Card, Docs, Or Plans

- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`
- User prompt: `Apocrypha Simplification Prompt v2`
