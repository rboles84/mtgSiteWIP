# VM-006 - Archscry / Maze Verification and Repeat-Visit Polish

ID: VM-006
Title: Archscry / Maze Verification and Repeat-Visit Polish
Status: backlog
Type: UX / Testing
Area: Archscry, Maze
Priority: medium
Created: 2026-05-15

## Summary

Harden the Archscry-to-Maze experience with a real-browser verification pass, repeat-visit continuity checks, and a follow-up on the lazy-loading and diagnostics work that was left as future optimization after the Scryfall discovery foundation landed.

## Source

- `docs/handoffs/2026-05-15-0914-codex-vm005-archscry-maze-continuity.md` - notes that browser visual verification was limited and recommends a real browser pass for mobile wrapping and Maze continuity.
- `docs/handoffs/2026-05-15-0038-codex-scryfall-discovery-foundation.md` - calls out future lazy-loading of local discovery data when opening a result.
- `docs/architecture/data-flow-map.md` and `docs/architecture/project-atlas.md` - document the current Archscry, Maze, and Scryfall data flow.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\04-the-implicit-maze\\_index.md` - clarifies that the shipped Loom tab is v0 and that Maze mode naming still needs careful handling.

## Acceptance Criteria

- Real browser and mobile checks confirm Archscry result pages, Maze entry, and return behavior remain coherent on repeat visits.
- Discovery data fetches can be deferred or lazy-loaded without breaking first-use rendering or return flow state.
- Maze copy continues to reflect the active lens, and the Archscry handoff payload stays stable across navigation.
- Any browser-specific regression or timing issue has an explicit follow-up or test note.

## Dependencies / Related Work

- VM-005 continuity and link reliability work
- VM-003 Scryfall discovery foundation
- Existing Maze handoff payload shape and return-banner behavior

## Files Likely Impacted

- `archscry/index.html`
- `maze.html`
- `assets/js/index.js`
- `research/research-init.js`
- `research/maze-search-tests.js`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`

## Risks / Uncertainties

- Browser-only regressions may not show up in unit-style checks.
- Repeat-visit state can drift if return-banner or dismissal handling changes.
- Lazy-loading discovery data may alter perceived responsiveness if it is not staged carefully.

## Implementation Prompt

Verify and tighten the Archscry-to-Maze handoff under real browser conditions, then decide whether lazy-loaded discovery data and repeat-visit polish are ready to ship or should remain as tracked follow-up.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- Browser/mobile smoke checks pass for the Archscry-to-Maze round trip and repeat-visit continuity.
- Lazy-loading or other discovery-data follow-ups are either implemented and tested, or explicitly split into a new tracked card.

## Human Review

Yes - this is a UX and verification follow-up that depends on live browser behavior, not just static review.

## Notes

Broad follow-up card. Keep it focused on verification and continuity, not on rewriting the current Maze parser or changing the placement model.

