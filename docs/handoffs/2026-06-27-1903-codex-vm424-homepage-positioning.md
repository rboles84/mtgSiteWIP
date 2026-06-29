# 2026-06-27 19:03 - Codex - VM-424 Homepage First-Visit Positioning

## Agent Name

Codex

## Task Requested

Implement a focused homepage clarity pass so first-time visitors understand Vox Mana as a Commander identity and taste compass, not a deckbuilding platform. Run a fresh collision scan, avoid VM-422/VM-423, use the next unused VM number, expected VM-424, preserve unrelated dirty files, update the Kanban/manual QA/handoff trail, and do not commit, push, delete unrelated files, or refresh visual baselines.

## Files Reviewed

- `AGENTS.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-21-1857-codex-vm415-readability-polish.md`
- `docs/handoffs/2026-06-16-1901-codex-vm407-identity-radar-v2.md`
- `docs/handoffs/2026-06-14-1647-codex-vm390-home-visual-readiness.md`
- `docs/handoffs/2026-06-14-1555-codex-vm389-home-identity-signal.md`
- `index.html`
- `assets/css/home.css`
- `docs/reference/manual-test-cases.md`
- VM collision scan results for `VM-422`, `VM-423`, `VM-424`, first-visit, deck ledger, and feedback/static-email wording

## Files Changed

- `index.html`
- `assets/css/home.css`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-424-homepage-first-visit-positioning.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-1903-codex-vm424-homepage-positioning.md`

## What Changed

- Selected `VM-424` after confirming `VM-422` is already active for Account Deck Links and Community Deck Ledger, treating `VM-423` as owner-reserved, and finding no local `VM-424` hits before this work.
- Replaced the Home hero lede with direct Commander identity/taste compass positioning.
- Added the explicit line: `Not a deckbuilder: Vox Mana helps you choose a direction before you build or browse decklists somewhere else.`
- Kept focused CTAs on the existing route cards for Archscry, Maze, and Strategium.
- Replaced the abstract `Vox Mana is a living index.` heading with `What can you do here?`
- Rewrote the four Home route cards as job-based paths: placement, plain-English card search, source/lore/model reading, and Commander learning.
- Added VM-424 manual QA coverage and a closed VM-424 Kanban card.
- Added this handoff and updated the handoff index.

## Why It Changed

The existing Home page was visually strong but too abstract for a first-time visitor. VM-424 keeps the current atmosphere, radar, topbar, and route layout while making the product promise explicit: Vox Mana helps users understand Commander identity and discovery direction before they browse or build decklists elsewhere.

## Decisions Made

- Used `VM-424` and did not use `VM-422` or `VM-423`.
- Omitted saved-reading, deck-import, deck-hosting, decklist-management, and community-sharing claims from Home.
- Kept the change copy/CSS-only for runtime behavior; no JavaScript was changed.
- Kept Home visual baseline drift classified rather than refreshing baselines.
- Preserved unrelated VM-420, VM-421, and VM-422 dirty work.

## Risks / Uncertainties

- `npm.cmd run test:visual:home` still fails the stale 300px baseline budget, now with expected first-viewport copy/CTA/orientation drift.
- The worktree was already dirty with unrelated VM-420, VM-421, and VM-422 files before VM-424; `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` contain both prior dirty work and VM-424 additions.
- Final status also showed unrelated Apocrypha and community-deck-ledger changes outside VM-424; they were not reviewed as part of this pass.
- The Home visual harness masks the radar canvas after verifying it renders, so current capture PNGs show a dark chart region by design.
- Git still warns that it cannot access `C:\Users\obake/.config/git/ignore` during status and reports LF-to-CRLF line-ending notices.

## Tests Run

- `git status --short --branch` - confirmed pre-existing dirty tree and current branch `codex/docs-cleanup`.
- Collision scans for `VM-422`, `VM-423`, `VM-424`, `Homepage First-Visit`, `first-visit`, `deck ledger`, `feedback composer`, and `static email` - confirmed VM-422 active, VM-423 owner-reserved by instruction, and no pre-existing local VM-424 hits.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- Scoped `git diff --check -- index.html assets/css/home.css docs/reference/manual-test-cases.md docs/kanban/board.md docs/kanban/done/VM-424-homepage-first-visit-positioning.md` - passed with line-ending warnings only.
- Targeted `rg` scan for hero framing, not-a-deckbuilder copy, CTAs, and `What can you do here?` - passed.
- `npm.cmd run test:visual:home` - expected fail: mobile `182225`, tablet `351002`, desktop `225703` mismatched pixels against budget `300`; classified as expected drift after screenshot review.
- Edge/Puppeteer DOM probe at `375`, `768`, and `1280` widths - passed for no document/body horizontal overflow, expected route-card CTA hrefs, topbar presence, radar element presence, and route-card presence.
- `npm.cmd run lint:js` - skipped because no JavaScript files were changed.

## Not Touched

- Placement/source JSON
- Generated artifacts
- Maze parser/search/stash logic
- Archscry scoring
- Radar resolver behavior
- Supabase save plumbing
- Home visual baselines
- VM-420, VM-421, or VM-422 unrelated runtime/docs files
- Unrelated Apocrypha/community-deck-ledger files visible in final status
- Commits, pushes, or staged changes

## Follow-Up Recommendations

- Owner visual QA should review Home desktop/tablet/mobile captures and decide later whether the new first-visit framing should become the accepted Home baseline.
- If accepted, refresh Home visual baselines only under a separate explicit baseline card.
- Keep community deck sharing language off Home until VM-422 UI/community ledger behavior is visibly live and accepted.

## Next Suggested Agent

Owner visual QA, then Codex for an explicit Home baseline-refresh card only if the owner accepts the new look.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-424-homepage-first-visit-positioning.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-1842-codex-vm422-data-security-layer.md`
- `docs/handoffs/2026-06-21-1857-codex-vm415-readability-polish.md`
