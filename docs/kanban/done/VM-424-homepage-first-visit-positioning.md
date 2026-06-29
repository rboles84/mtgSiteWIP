# VM-424 - Homepage First-Visit Positioning

## Status

Done

## Type

Frontend / Product Positioning

## Area

Home

## Summary

Clarify the Home first viewport so new visitors understand Vox Mana as a Commander identity and taste compass, not a deckbuilding platform.

## Pre-Flight Findings

- Fresh collision scan confirmed `VM-422` is already active for Account Deck Links and Community Deck Ledger.
- `VM-423` is treated as unavailable per owner context for feedback composer/static email processor work, even though the local repo scan only surfaced historical `VM-423` collision notes.
- No local `VM-424` hit existed before this card, so `VM-424` was selected.
- Recent Home work left the Identity Signal, radar, visual baseline drift, topbar hints, and overflow repairs as known constraints.
- The worktree already contained unrelated VM-420, VM-421, and VM-422 dirty files; those are not part of this card.

## Scope

- Update Home hero and route-card copy for first-visit clarity.
- Preserve the current visual system, radar panel, atmosphere, topbar, routes, and runtime behavior.
- Add focused manual QA coverage.
- Create required Kanban and handoff records.

## Outcome

- Reframed the hero around Vox Mana as a Commander identity and taste compass.
- Added an explicit not-a-deckbuilder orientation line.
- Kept focused CTAs on the existing route cards for Archscry, Maze, and Strategium.
- Replaced the abstract living-index section heading with a direct `What can you do here?` prompt.
- Rewrote the four route cards as user jobs: placement, plain-English card search, source/lore model reading, and Commander learning.
- Omitted saved-reading, deck-import, deck-hosting, decklist-management, and community-sharing claims from the homepage.

## Acceptance Criteria

- The first viewport answers what Vox Mana is, what to do first, and whether it is a deckbuilder.
- Route-card CTAs route to Archscry, Maze, and Strategium.
- Route cards remain job-based and do not imply native deckbuilding.
- No route, schema, JSON, Supabase, generated data, parser, placement, radar, or baseline changes are made.
- Home visual diffs are classified only as expected when caused by copy/CTA/orientation changes.

## Tests Run

- PASS `npm.cmd run lint:html`
- PASS `npm.cmd run test:frontend-smoke`
- PASS scoped `git diff --check -- index.html assets/css/home.css docs/reference/manual-test-cases.md docs/kanban/board.md docs/kanban/done/VM-424-homepage-first-visit-positioning.md` with line-ending warnings only
- PASS targeted text scan for the new hero framing, not-a-deckbuilder line, CTAs, and `What can you do here?`
- EXPECTED FAIL `npm.cmd run test:visual:home`: mobile `182225`, tablet `351002`, desktop `225703` mismatched pixels against the stale `300` budget. Classified as expected copy/CTA/orientation drift after screenshot review; the harness verified the radar canvas before masking it for capture stability.
- PASS Edge/Puppeteer DOM probe at `375`, `768`, and `1280` widths: no document/body horizontal overflow, route-card CTAs present with expected hrefs, topbar present, radar element present, and route cards present.

## Not Touched

- Placement/source JSON
- Generated artifacts
- Maze parser/search logic
- Archscry scoring
- Radar resolver behavior
- Supabase save plumbing
- Visual baselines
- VM-420, VM-421, or VM-422 unrelated files
- Commits or pushes

## Related

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/reference/manual-test-cases.md`
- `index.html`
- `assets/css/home.css`
