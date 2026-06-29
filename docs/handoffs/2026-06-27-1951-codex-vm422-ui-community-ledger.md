# 2026-06-27 19:51 - Codex - VM-422 UI And Community Ledger

## Agent Name

Codex

## Task Requested

Continue VM-422 after the data/security slice by wiring the Archscry deck-link account surface, Apocrypha Community Deck Ledger, upvote controls, UI-safe rendering, focused tests, browser QA, docs, and handoff trail.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/2026-06-27-1815-codex-vm422-account-deck-links.md`
- `docs/handoffs/2026-06-27-1842-codex-vm422-data-security-layer.md`
- `assets/js/index.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links.js`
- `assets/js/deck-links-tests.js`
- `assets/js/shared.js`
- `archscry/index.html`
- `apocrypha/index.html`
- `assets/css/archscry.css`
- `assets/css/apocrypha.css`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `assets/js/index.js`
- `assets/css/archscry.css`
- `apocrypha/index.html`
- `assets/css/apocrypha.css`
- `assets/js/community-deck-ledger.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-1951-codex-vm422-ui-community-ledger.md`

## What Changed

- Added the Archscry result `Account Deck Links` panel with `Save a Deck Link for this Reading`, URL/title/commander/note fields, attach-current-placement checkbox, private versus submit-for-review select, saved-link list, provider/status badges, and submit-for-review actions.
- Added DOM/text-safe rendering for saved account deck links in Archscry; submitted fields are not rendered with `innerHTML`.
- Added `assets/js/community-deck-ledger.js` for Apocrypha public ledger reads, signed-in own-vote reads, positive vote toggles, safe external deck anchors, and product-safe unavailable fallback copy.
- Added the Apocrypha `Community Deck Ledger` section, rail link, required public copy boundary, and cache-busted module load alongside Supabase/shared session scripts.
- Added `listOwnCommunityDeckVotes` to the deck-link service so public vote buttons can reflect signed-in upvote state.
- Extended `npm run test:deck-links` with source checks for Archscry/Apocrypha wiring and text-safe field rendering.
- Added VM-422 manual QA cases and updated the VM-422 card progress/acceptance notes.

## Why It Changed

VM-422 needed the UI layer to hang off the previously added URL/provider/RLS contract. The implementation keeps Vox Mana as a deck-link discovery and identity-matching layer, while preserving the boundary that decklists stay hosted elsewhere.

## Decisions Made

- Keep the account deck-link surface inside the Archscry result view for v1 instead of creating a new account route.
- Render all deck-link rows with DOM methods and `textContent`, while allowing static route shell HTML to remain template-based.
- Use Apocrypha as the first public Community Deck Ledger surface, with a future dedicated community route still possible.
- Add a product-safe fallback message when the public ledger cannot load; raw Supabase schema/cache errors are logged for development but not shown to visitors.
- Cache-bust the new Apocrypha ledger module as `community-deck-ledger.js?v=20260627a`.

## Risks / Uncertainties

- Live Supabase execution and RLS verification are still pending. Browser QA against the current hosted Supabase project reported `community_deck_ledger_public` missing from the schema cache, which means `docs/supabase-vm422-deck-links.sql` has not been applied there yet.
- Signed-in account save/list/submit and vote behavior is covered by mocked Supabase tests and UI wiring, but not by live account QA against applied SQL.
- The broader worktree now includes unrelated VM-424 Home positioning edits in `index.html`, `assets/css/home.css`, `docs/reference/manual-test-cases.md`, and related VM-424 docs/handoff/card files. Those were not part of VM-422.
- Existing VM-420/VM-421 docs dirt and two docs/research deletions remain unrelated and untouched.

## Tests Run

- `npm.cmd run test:deck-links`
  - Passed after UI/service/test updates.
- `npm.cmd run lint:js`
  - Passed.
- `npm.cmd run lint:html`
  - Passed.
- `npm.cmd run test:frontend-smoke`
  - Passed.
- `npm.cmd test`
  - Passed. The live Gate bias report writer changed only generated timestamp fields; those timestamp lines were restored to avoid unrelated audit churn.
- `git diff --check`
  - No whitespace errors; Git emitted LF-to-CRLF warnings for existing/touched files.
- Browser QA via local static server `http://127.0.0.1:4173/`
  - Apocrypha: Community Deck Ledger section, rail link, boundary copy, no desktop/mobile horizontal overflow, product-safe unavailable fallback when live Supabase schema is missing.
  - Archscry: restored result shows deck-link panel, field limits are present, no desktop/mobile horizontal overflow, signed-out save attempt does not reload and shows sign-in-first status.

## Not Touched

- Supabase live project schema execution
- Manual live RLS proof
- Manual moderation tooling
- Dedicated account route
- Decklist parsing, scraping, crawling, hosting, legality checks, card JSON storage, or decklist rendering
- Maze scratchpad behavior
- Runtime placement model
- Commander facts, card facts, or MTG lore source data
- Visual baselines
- Unrelated VM-420/VM-421/VM-424 dirty-tree work

## Follow-Up Recommendations

- Apply or dry-run `docs/supabase-vm422-deck-links.sql` against Supabase.
- Manually verify RLS for anonymous, signed-in owner, signed-in non-owner, public approved rows, rejected/archived rows, public-row edit attempts, and vote constraints.
- Run live signed-in QA for Archscry save/list/submit and Apocrypha vote toggle after the SQL artifact is applied.
- Decide whether a dedicated account/community route is needed after the Archscry/Apocrypha MVP is accepted.

## Next Suggested Agent

Security Reviewer or Test Strategist for live Supabase RLS/manual account QA, then Implementation Engineer only if live schema QA finds policy or UI gaps.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-06-27-1815-codex-vm422-account-deck-links.md`
- `docs/handoffs/2026-06-27-1842-codex-vm422-data-security-layer.md`
