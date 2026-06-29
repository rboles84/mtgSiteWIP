# 2026-06-27 18:15 - Codex - VM-422 Account Deck Links

## Agent Name

Codex

## Task Requested

Act as Planning Architect and convert the approved `Account Deck Links And Community Deck Ledger` direction into a Kanban card. Before creating the card, scan board cards, handoffs, and repo text for `VM-422`, `VM-423`, and the next available VM number; use `VM-422` only if available.

## Files Reviewed

- `AGENTS.md` instructions supplied in-thread
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md`
- `docs/kanban/backlog/VM-405-deck-scratchpad-redesign-concept.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/kanban/done/VM-394-pre-push-exposure-and-gitignore-audit.md`
- `docs/kanban/done/VM-421-vox-mana-vault-refresh-learnings.md`
- Repo text search results for `VM-422`, `VM-423`, `Account Deck Links`, `Community Deck Ledger`, `user_deck_links`, and `community_deck_votes`

## Files Changed

- `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-1815-codex-vm422-account-deck-links.md`

## What Changed

- Created the VM-422 backlog card for Account Deck Links And Community Deck Ledger.
- Added VM-422 to the Kanban board backlog.
- Added this handoff to the handoff index.
- Captured the planning decisions, product boundaries, Supabase/RLS guardrails, public-view restrictions, moderation protections, and test plan.

## Why It Changed

The approved MVP shape replaces decklist import with external deck-link intake. The planning card protects the product concept so a future implementation agent builds Vox Mana as a deck discovery and identity-matching layer, not a deck editor, deck host, crawler, or legality engine.

## Decisions Made

- `VM-422` is available and used consistently. The only related prior hit was VM-421 noting that VM-422 had no hits at that time; no active VM-422 or VM-423 reservation was found.
- The table name is `user_deck_links`, not `user_decks`.
- The MVP stores only external deck URLs, provider, owner/submission metadata, placement metadata, visibility/moderation state, and simple upvotes.
- Decklist parsing, scraping, crawling, hosting, card JSON storage, legality checks, and decklist rendering are explicit non-goals.
- Public deck-link editing must be blocked or forced back to `submitted` after approval.
- Public display names must come from sanitized profile/display-name data, never owner email.
- Apocrypha can host the first Community Deck Ledger surface, with a future dedicated route still possible.
- Manual moderation remains outside the public frontend in v1.

## Recent Related Work

- `VM-009` already covers broader future saved taste profile/deck import work.
- `VM-405` preserves Maze scratchpad behavior until a design is approved.
- `VM-406` records Archscry placement bridge concepts that can inform the result CTA.
- `VM-155` and `VM-394` require Supabase RLS/schema traceability and exposure review before new user tables are safe.
- `VM-421` refreshed project memory and documented that unrelated VM-420 dirty-tree work was already present.

## Current Known Risks

- Supabase SQL location and profile/display-name conventions need discovery before implementation.
- New user-submitted links require moderation, URL normalization, abuse protection, and safe rendering.
- Public ledger copy must keep deck links out of canon/source/rules authority.
- Browser anon access must remain constrained by explicit grants, RLS, and operation-specific policies.
- The existing worktree contains unrelated dirty docs/deletions that should not be bundled into VM-422.

## Files Recently Changed Or Dirty

- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already dirty before VM-422 edits.
- VM-420/VM-421 docs artifacts were present as prior untracked changes.
- Two docs/research deletions were present before this task.

## Not Touched

- Runtime app code
- Supabase implementation SQL
- Generated data
- Source lore
- Commander facts
- Placement model
- Visual baselines
- Maze scratchpad behavior
- VM-420 dirty docs/deletions and unrelated untracked files

## Risks / Uncertainties

- The future SQL implementation must prove view exposure and RLS behavior with manual verification, not just mocked tests.
- If no sanitized public profile/display-name source exists, implementation should add only the minimum field needed and avoid backfilling unrelated profile SQL.
- Apocrypha may be enough for v1 ledger display, but a larger community feature may later need its own route.

## Tests Run

- Searched repo text for `VM-422`, `VM-423`, `Account Deck Links`, `Community Deck Ledger`, `user_deck_links`, and `community_deck_votes`.
- Searched repo text for existing VM number usage.
- Reviewed relevant cards and handoffs listed above.
- Ran `git status --short` before edits to identify unrelated dirty worktree state.
- Ran scoped `rg` after edits to confirm VM-422 card, board link, handoff index entry, deck-link test command, table names, and guardrail terms are present.
- Ran scoped `git diff --check` for the VM-422 docs changes; no whitespace errors reported. Git emitted existing LF-to-CRLF warnings for `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md`.
- Ran `git status --short` after edits to confirm changed files and preserve unrelated dirty worktree state.

## Follow-Up Recommendations

- Start implementation with provider detection and `npm run test:deck-links`.
- Add the Supabase SQL/policy artifact before wiring public UI.
- Verify RLS manually for anonymous, owner, non-owner, public approved rows, public-row edit attempts, rejected rows, and archived rows.
- Keep moderation outside the public frontend for v1.
- Add the Community Deck Ledger copy boundary before exposing public entries.

## Next Suggested Agent

Implementation Engineer with Supabase/RLS focus, followed by Test Strategist or security review for policy and public-user-content checks.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md`
- `docs/kanban/backlog/VM-405-deck-scratchpad-redesign-concept.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/kanban/done/VM-394-pre-push-exposure-and-gitignore-audit.md`
- `docs/kanban/done/VM-421-vox-mana-vault-refresh-learnings.md`
