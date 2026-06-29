# 2026-06-27 20:11 - Codex - VM-422 Grant And Account List Hardening

## Agent Name

Codex

## Task Requested

Continue VM-422 toward the data/security and manual RLS objective. Re-audit the checked-in Supabase contract for public exposure and owner-account list behavior while live Supabase execution remains unavailable.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `scripts/vm422-live-rls-check.mjs`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`

## Files Changed

- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `scripts/vm422-live-rls-check.mjs`
- `docs/supabase-vm422-deck-links.sql`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-2011-codex-vm422-grant-account-list-hardening.md`

## What Changed

- Added `public.vm422_list_my_deck_links()`, an owner-scoped account-list RPC that returns only the authenticated user's saved deck links without exposing `owner_id` to browser clients.
- Changed `listUserDeckLinks()` to use the owner-scoped RPC instead of selecting `user_deck_links` directly.
- Narrowed direct browser `user_deck_links` SELECT grants to the columns needed by the `security_invoker` public ledger view.
- Removed direct base-table SELECT grants for private/account-only timestamps and moderation/owner fields.
- Added local regression coverage for the owner-scoped RPC path, blocked `public_display_name` write grants, and narrowed public table grants.
- Extended the live RLS harness so it will verify the owner account RPC includes the owner's saved rows and excludes another user's approved public deck link.
- Updated manual QA and data-contract docs with the owner-list/public-grant boundary.

## Why It Changed

The previous service path listed `user_deck_links` directly. Because the table also needs a public approved-row SELECT policy for the `security_invoker` public ledger view, a signed-in account list could include other users' approved public deck links. VM-422 needs the account surface to show the owner's saved links, while the public ledger remains a separate curated view.

## Decisions Made

- Keep `community_deck_ledger_public` as `security_invoker = true` per the VM-422 guardrail.
- Accept narrow base-table SELECT grants for the public ledger view columns because they are required for `security_invoker` view access.
- Use an owner-scoped RPC for account saved links instead of granting/selecting `owner_id` in browser code.
- Keep `public_display_name` out of browser insert/update grants; it remains a trusted snapshot/default.

## Risks / Uncertainties

- `npm run test:deck-links:live` is still not executed because this workspace lacks the Supabase service-role key, test-user credentials, and applied live schema.
- The SQL artifact still needs live application and RLS verification before VM-422 can close.
- Security-definer RPC behavior must be verified in the target Supabase project with the live harness.

## Tests Run

- `npm.cmd run test:deck-links` - Passed.
- `node --check scripts\vm422-live-rls-check.mjs` - Passed.
- `npm.cmd run lint:js` - Passed.
- `npm.cmd run lint:html` - Passed.
- `git diff --check` - No whitespace errors; Git emitted LF-to-CRLF warnings for touched files.

## Not Touched

- Live Supabase project schema
- Live Supabase credentials or test users
- Manual moderation tooling
- Decklist parsing/importing/hosting
- Runtime placement data
- Commander facts, card facts, or MTG lore
- Unrelated VM-420/VM-421/VM-424 dirty-tree work

## Follow-Up Recommendations

- Apply `docs/supabase-vm422-deck-links.sql` to Supabase.
- Run `npm.cmd run test:deck-links:live` with owner/non-owner test users and `SUPABASE_SERVICE_ROLE_KEY`.
- Manually QA that the Archscry saved-link account list excludes non-owner approved public rows.
- Keep any future account-list expansion behind owner-scoped RPC/view paths rather than broad base-table reads.

## Next Suggested Agent

Security Reviewer or Test Strategist with Supabase credentials for live RLS verification.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-06-27-2000-codex-vm422-live-rls-harness.md`
