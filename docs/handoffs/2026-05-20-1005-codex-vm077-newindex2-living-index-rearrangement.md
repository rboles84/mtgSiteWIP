# Handoff - VM-077 newIndex2 Living Index Rearrangement

Agent name: Codex

Task requested: Implement the agreed Batch 1 HTML-only rearrangement plan for `newIndex2.html`, preserve CSS and JavaScript behavior, verify live links where possible, and update the project-memory trail.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-19-2355-codex-vm066-newindex2-wiring-only.md`
- `docs/handoffs/2026-05-20-0108-codex-vm075-newindex2-atmosphere-tuning-notes.md`
- `docs/handoffs/2026-05-20-0657-codex-vm076-cleanup-push-preview-archive-batch.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/kanban/backlog/VM-017-main-index-gateway-mockup-set.md`
- `docs/mockups/homepage-gateway-mockup-set.md`
- `docs/design/visual-style-guide.md`
- `newIndex2.html`

## Files Changed

- `newIndex2.html`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-20-1005-codex-vm077-newindex2-living-index-rearrangement.md`

## What Changed

- Reworked `newIndex2.html` runtime HTML into a Living Index flow: Hero, Start Here, Main Areas, What is Vox Mana, Magic Basics / Color Matrix, How Vox Mana Connects, and Library Preview.
- Updated top nav `What is this?` and `Magic Basics` links to jump to real anchors instead of placeholder links.
- Restored the hero action row with buttons to Archscry, Maze, and Apocrypha.
- Added a Start Here section using existing layout classes and moved the “What You Can Do Here” list there.
- Kept `#paths` as a backward-compatible section anchor and added `#main-areas` on the visible Main Areas heading.
- Replaced the duplicated What section action list with a short “Why This Exists” panel.
- Added a How Vox Mana Connects section using existing panels and list items.
- Removed visible door/gateway framing from the primary homepage copy while leaving functional asset names and JavaScript observer options untouched.
- Added the completed VM-077 Kanban card and board entry.

## Why It Changed

The user wanted `newIndex2.html` to feel like a real interactive homepage and living index without a redesign, CSS rewrite, JavaScript rewrite, or behavior change.

## Decisions Made

- Kept `#paths` for compatibility instead of replacing it outright.
- Used `#main-areas` on the heading as the new anchor target without adding CSS.
- Left all CSS and inline JavaScript byte-equivalent after line-ending normalization.
- Left the placeholder-link JavaScript in place because no marked placeholder links remain and editing the script would violate the batch boundary.
- Used local server HTTP checks and browser click checks to verify route links instead of adding anything to the manual test plan.

## Risks / Uncertainties

- The page still contains `gateway` in the background asset filename and `threshold` in IntersectionObserver options; those are not visible homepage framing.
- Local browser/server logs still show a pre-existing `404` for `/assets/bg-archscry.webp` from the unchanged CSS variable. The visible picture background used by `newIndex2.html` returned `200`.
- The browser check covered core interactions and hero route clicks, not an exhaustive click of every duplicate Apocrypha card/footer link. Local HTTP checks covered those target routes.
- A human visual skim is still recommended because this was an information architecture pass inside existing CSS constraints.

## Tests Run

- Static section-order and ID scan for `#start`, `#paths`, `#main-areas`, `#what`, `#basics`, `#connects`, `#library`, and Color Matrix/radar IDs.
- Static visible-copy scan for `Choose a Path`, `Three simple doors`, `Open the maze`, and `Enter the library` - no visible-copy matches remained.
- Static CSS/script hash check against `HEAD:newIndex2.html` after line-ending normalization - style and inline script matched.
- Local static server HTTP checks:
  - `/newIndex2.html` -> 200
  - `/archscry/` -> 200
  - `/maze/` -> 200
  - `/apocrypha/` -> 200
  - `/privacy/` -> 200
  - `/terms/` -> 200
- Browser smoke check:
  - `What is this?` nav clicked to `#what`
  - `Magic Basics` nav clicked to `#basics`
  - Color Matrix changed from hidden to visible through the existing button
  - Radar canvas was present and ready
  - Hero buttons navigated to `/archscry/`, `/maze/`, and `/apocrypha/` with non-404 titles
- `npm.cmd test` - passed.

## Not Touched

- Root `index.html`
- `newIndex.html`
- Shared `assets/css/home.css`
- Shared `assets/js/home.js`
- Color Matrix data
- Chart.js setup
- Magic Basics tab logic
- Radar chart logic
- Reveal observers
- Atmosphere/star/orb canvas logic
- Pointer glow logic
- Back-to-top logic
- Route-page internals for Archscry, Maze, Apocrypha, Privacy, or Terms
- Unrelated worktree noise visible after verification: deleted `docs/research/canon/guild_research/*.md` files and untracked `assets/js.zip`

## Follow-Up Recommendations

- Do one human visual skim of `newIndex2.html` at desktop and mobile widths to judge whether the added HTML sections feel balanced under the existing CSS.
- Use a later batch for copy polish, responsive refinements, CSS modernization, or component extraction.
- If `newIndex2.html` is promoted to root home later, handle that as a separate scoped promotion pass.

## Next Suggested Agent

Frontend follow-up for Batch 2 copy polish or responsive polish after human review.

## Related Kanban Card, Docs, or Plans

- `docs/kanban/done/VM-077-newindex2-living-index-rearrangement.md`
- `docs/kanban/done/VM-066-newindex2-self-contained-wiring.md`
- `docs/kanban/done/VM-075-newindex2-atmosphere-tuning-notes.md`
- `docs/handoffs/HANDOFF_INDEX.md`
