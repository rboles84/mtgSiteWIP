# Codex Handoff - VM-422 Private Deck Links Scope Correction

## Agent Name

Codex

## Task Requested

Scope-correct VM-422 from the larger Community Deck Ledger launch to a private-first Archscry deck-link save loop: users restore/complete a reading, open `Decks Saved`, paste an allowed external deck URL, save it privately, and later see it attached to the same reading.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-2018-codex-vm422-blocked-live-supabase.md`
- `docs/handoffs/2026-06-27-1951-codex-vm422-ui-community-ledger.md`
- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-422-account-deck-links-community-deck-ledger.md`
- `assets/js/index.js`
- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`
- `apocrypha/index.html`
- `privacy/index.html`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`

## Files Changed

- `assets/js/index.js`
- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`
- `apocrypha/index.html`
- `privacy/index.html`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-28-2040-codex-vm422-private-deck-links.md`

## What Changed

- Moved VM-422 from blocked to in progress after the owner reported the Supabase SQL was applied successfully.
- Moved the Archscry deck-link form out from below the placement snapshot into a new `Decks Saved` dossier panel after `Commander Deck Starts`.
- Removed visible Archscry Community Deck Ledger link, visibility selector, submit-for-review path, voting/public discovery language, and public ledger CTA.
- Added owner-only removal by archiving a saved deck link with `visibility = 'archived'`.
- Made client/service saves private-only and required a restored/completed placement snapshot before saving.
- Added duplicate prevention for the same normalized URL and placement in the client and a partial active-row unique index in SQL.
- Tightened SQL/RLS artifact so browser inserts/updates can create/update only private rows or archive owner-owned rows.
- Made the owner account RPC return only private active rows.
- Tightened the dormant public view and vote guard to approved public rows only.
- Removed the Apocrypha Community Deck Ledger rail entry, live section, Supabase/shared ledger loading, and deck-ledger module script from v1.
- Updated Privacy and reference docs for private saved external deck links.
- Updated the optional live RLS harness to verify the private-first behavior rather than the deferred moderation/voting flow.

## Why It Changed

The product direction changed from launching a public community ledger immediately to first proving the private loop: reading -> external deck browsing -> save a private deck link -> return later and see it attached to that reading.

## Decisions Made

- Keep the `user_deck_links` schema direction; do not roll it back.
- Keep already-built public/vote helpers dormant where present, but remove reachable v1 UI and client paths.
- Use `visibility = 'archived'` for owner removal because the existing schema already allows it.
- Use placement key plus normalized deck URL as the active duplicate boundary for v1.
- Do not expose visibility selection in Archscry v1.

## Risks / Uncertainties

- Live Supabase RLS verification still needs service-role and two test-user environment variables in this shell.
- The active workspace remains dirty with unrelated VM-405/423/424/425 and docs changes; those were not reverted.
- The optional live harness was syntax-checked but not run against Supabase credentials here.
- A user who saved a row during the older submitted/public experiment may not see it in the private v1 owner list because the RPC now intentionally returns only active private rows.

## Tests Run

- `npm.cmd run test:deck-links`
- `npm.cmd run lint:js`
- `node --check scripts\vm422-live-rls-check.mjs`
- `npm.cmd run lint:html`
- `npm.cmd test`
- `npm.cmd run test:frontend-smoke`

## Not Touched

- No decklist parsing, card JSON storage, legality checks, scraping, crawling, or deck hosting.
- No Supabase CLI or live database execution from this workspace.
- No unrelated VM-405 Maze tray, VM-423 feedback, VM-424 homepage, or VM-425 mock cleanup changes were reverted.
- No generated JSON/data artifacts were changed.

## Follow-Up Recommendations

- Set `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY`, then run `npm.cmd run test:deck-links:live`.
- Manually QA Google sign-in save/refresh/sign-out/sign-in restore for one real Moxfield or Archidekt URL.
- Confirm the Supabase SQL editor has the latest private-first SQL artifact applied after this change, not only the older community-ledger version.
- Create a later normal VM card for public ledger, moderation, submit-for-review, and voting after private saves are working.

## Next Suggested Agent

Test Strategist or QA-focused Codex pass for live Supabase account/RLS verification.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
