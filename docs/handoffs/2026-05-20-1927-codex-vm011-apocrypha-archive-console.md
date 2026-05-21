# Agent Handoff: Codex - VM-011 Apocrypha Archive Console

- Agent Name: Codex
- Date: 2026-05-20 19:27
- Task Requested: Rebuild the Apocrypha experience as a full Archive Console on `/apocrypha/`, preserve all valid public source links, restore `/library/` as a compatibility route, and keep the work under `VM-011`.
- Related Kanban Card: `VM-011 - Apocrypha Source Atlas and Source Bridge`
- Status: Complete

## Files Reviewed

- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-18-2332-codex-vm020-maze-route-shell-restoration.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\backlog\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\architecture\project-atlas.md`
- `C:\dev\mtgSiteWIP\docs\design\visual-style-guide.md`
- `C:\dev\mtgSiteWIP\newIndex2.html`
- `C:\dev\mtgSiteWIP\assets\js\home-preview.js`
- `C:\dev\mtgSiteWIP\assets\js\color-matrix-radar.js`
- `C:\dev\mtgSiteWIP\archscry\index.html`
- `C:\dev\mtgSiteWIP\apocrypha\index.html`
- `C:\dev\mtgSiteWIP\components\topbar.html`
- `C:\dev\mtgSiteWIP\components\atmosphere.html`
- `C:\dev\mtgSiteWIP\components\reduce-motion.html`
- `C:\dev\mtgSiteWIP\docs\research\ui_research\design_references.md`
- `C:\dev\mtgSiteWIP\docs\research\ui_research\archscry\`

## Files Changed

- `C:\dev\mtgSiteWIP\apocrypha\index.html`
- `C:\dev\mtgSiteWIP\assets\css\apocrypha.css`
- `C:\dev\mtgSiteWIP\assets\js\apocrypha.js`
- `C:\dev\mtgSiteWIP\library\index.html`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\architecture\project-atlas.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\HANDOFF_INDEX.md`
- `C:\dev\mtgSiteWIP\docs\handoffs\2026-05-20-1927-codex-vm011-apocrypha-archive-console.md`

## What Changed

- Rebuilt `apocrypha/index.html` into a full Archive Console aligned with the current Vox Mana home and Archscry direction.
- Added a dedicated `assets/css/apocrypha.css` stylesheet for the dark-fantasy archive shell, glass panels, side rail, dossier cards, ledger, and responsive layouts.
- Added `assets/js/apocrypha.js` for reduced-motion-safe reveal behavior and fully wired local anchor rail state.
- Preserved the existing 10 valid public source links and reorganized them into Canon Vault, Scholar Stacks, and Scrying Glass archive wings.
- Added public-safe Codex Shelf and Logic Reliquary panels without exposing private scoring, prompt internals, or hidden placement logic.
- Created `library/index.html` as a compatibility shell that forwards to `/apocrypha/` and still works with `noscript`.
- Moved `VM-011` out of backlog and into done-state documentation, and updated board/project routing docs to record `/library/` as a legacy alias.
- Added cache-busting query strings on the new Apocrypha CSS and JS after browser QA revealed stale asset caching during verification.

## Why It Changed

- The previous Apocrypha page behaved more like a small link list than the public archive and provenance layer described in the product direction.
- Vox Mana now needs a public-facing archive page that explains where its lore summaries, dossier support, and research structure come from without exposing private placement machinery.
- The legacy `/library/` route still appears in existing docs and policy pages, so keeping it as a compatibility alias avoids broken navigation while preserving `/apocrypha/` as canonical.

## Decisions Made

- `/apocrypha/` remains the canonical public archive route.
- `/library/` is now a compatibility alias that forwards to `/apocrypha/`.
- Exact numeric counts are shown only for groups backed by the current public inventory:
  - Canon Vault: 4
  - Scholar Stacks: 3
  - Scrying Glass: 3
- `Codex Shelf` and `Logic Reliquary` use non-numeric exposure/status language instead of guessed counts.
- Featured dossier cards remain preview-only with `Planned` tags because no new public dossier routes were created in this pass.
- The page intentionally avoids fake search, fake filters, fake tabs, and an unwired radar/chart surface.
- `archscry/index.html`, `assets/js/index.js`, and `newIndex2.html` were treated as reference material only and were not edited for this task.

## Risks / Uncertainties

- The ledger `Trust Level` presentation is grounded in the current source roles on the page, not in a separate checked-in metadata system yet.
- Future public dossier pages will need a consistent publication rule so preview cards can graduate into live routes without drifting from the redaction boundary.
- Existing `/library/` references outside the Apocrypha flow are preserved by the compatibility alias for now, but broader route cleanup may still be worth doing later.

## Tests Run

- `node --check assets/js/apocrypha.js`
- Static anchor scan to confirm all required section and wing anchors exist exactly once
- Static control scan to confirm no search inputs, fake filters, tabs, canvases, or Chart.js dependencies were added to Apocrypha
- Static source-link scan to confirm the 10 existing valid public source URLs remain present
- `npm.cmd test`
- `git -c safe.directory=C:/dev/mtgSiteWIP diff --check -- apocrypha/index.html assets/css/apocrypha.css assets/js/apocrypha.js library/index.html docs/kanban/board.md docs/kanban/done/VM-011-apocrypha-source-atlas-source-bridge.md docs/architecture/project-atlas.md`
  - Result: no authored diff syntax issues; only existing LF/CRLF line-ending warnings
- Browser QA against a local static server
  - Opened `/apocrypha/`
  - Confirmed `/library/` forwards to `/apocrypha/`
  - Confirmed topbar behavior and reduce-motion menu item
  - Confirmed background and archive shell render
  - Confirmed desktop anchor navigation and `aria-current` updates on the local rail
  - Confirmed mobile layout at a narrow viewport
  - Spot-checked preserved source links, including all three YouTube entries

## Not Touched

- `C:\dev\mtgSiteWIP\archscry\index.html`
- `C:\dev\mtgSiteWIP\assets\js\index.js`
- `C:\dev\mtgSiteWIP\newIndex2.html`
- Existing valid public source URLs
- Placement scoring logic
- Prompt internals
- Hidden scoring relationships
- Raw extraction logic
- Unrelated dirty worktree changes already present in the repository

## Follow-Up Recommendations

- Choose the first public dossier route to graduate from `Planned` into a live archive page.
- Consider moving public source metadata into a checked-in data file so the ledger and source cards can stay synchronized from one source of truth.
- Tackle the broader legacy route cleanup, including old `/maze.html` references, in a separate scoped task instead of folding it into VM-011.

## Next Suggested Agent

- Frontend QA or Documentation Steward

## Related Kanban Card, Docs, or Plans

- `C:\dev\mtgSiteWIP\docs\kanban\done\VM-011-apocrypha-source-atlas-source-bridge.md`
- `C:\dev\mtgSiteWIP\docs\kanban\board.md`
- `C:\dev\mtgSiteWIP\docs\architecture\project-atlas.md`
- `C:\dev\mtgSiteWIP\docs\design\visual-style-guide.md`
- User implementation plan: Apocrypha Archive Console Rebuild
