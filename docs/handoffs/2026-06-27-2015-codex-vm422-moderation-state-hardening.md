# 2026-06-27 20:15 - Codex - VM-422 Moderation State Hardening

## Agent Name

Codex

## Task Requested

Continue VM-422 toward completion by auditing current local evidence, fixing any remaining locally provable data/security gap, and preserving the live Supabase blocker honestly.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/2026-06-27-2011-codex-vm422-grant-account-list-hardening.md`
- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`

## Files Changed

- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-2015-codex-vm422-moderation-state-hardening.md`

## What Changed

- Blocked browser save/update requests that try to set `visibility = rejected`.
- Tightened the SQL owner update policy from `private/submitted/rejected/archived` to `private/submitted/archived`.
- Added a trigger-level owner guard that raises if a browser owner attempts to reject a deck link.
- Added local tests for rejected visibility blocking on save/update and SQL-policy scanning.
- Extended the live RLS harness to verify browser users cannot reject submitted deck links.
- Updated data-contract, manual QA, and VM-422 card notes with the visibility boundary.

## Why It Changed

`rejected` is a moderation outcome. The UI did not expose owner rejection, but the service and SQL policy still allowed authenticated owners to set the state directly. VM-422 requires manual moderation outside the public frontend in v1, so both approval and rejection should remain trusted moderation paths.

## Decisions Made

- Browser users may use `private`, `submitted`, and `archived`.
- Browser users may not directly use `public` or `rejected`.
- Trusted service-role/manual moderation paths may still approve or reject because service-role bypasses browser RLS and the trigger guard is scoped to the authenticated owner.

## Risks / Uncertainties

- Live Supabase application and RLS verification remain unproven in this workspace.
- The live harness has been expanded, but still requires SQL to be applied plus service-role/test-user credentials.

## Tests Run

- `npm.cmd run test:deck-links` - Passed.
- `node --check scripts\vm422-live-rls-check.mjs` - Passed.
- `npm.cmd run lint:js` - Passed.
- `npm.cmd run lint:html` - Passed.
- `npm.cmd run test:frontend-smoke` - Passed.
- `npm.cmd test` - Passed. It rewrote only generated Gate bias report timestamps, which were restored to avoid unrelated audit churn.
- `git diff --check` - No whitespace errors; Git emitted LF-to-CRLF warnings for touched files.

## Not Touched

- Live Supabase project schema
- Live Supabase credentials or test users
- Manual moderation UI/tooling
- Decklist parsing/importing/hosting
- Runtime placement data
- Commander/card/lore facts
- Unrelated VM-420/VM-421/VM-424 dirty-tree work

## Follow-Up Recommendations

- Apply `docs/supabase-vm422-deck-links.sql` to Supabase.
- Run `npm.cmd run test:deck-links:live` with owner/non-owner test users and `SUPABASE_SERVICE_ROLE_KEY`.
- Manually verify browser users cannot directly approve or reject rows after SQL is applied.

## Next Suggested Agent

Security Reviewer or Test Strategist with Supabase credentials for live RLS verification.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-06-27-2011-codex-vm422-grant-account-list-hardening.md`
