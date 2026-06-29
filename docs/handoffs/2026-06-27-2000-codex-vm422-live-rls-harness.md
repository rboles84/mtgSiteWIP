# 2026-06-27 20:00 - Codex - VM-422 Live RLS Harness

## Agent Name

Codex

## Task Requested

Continue VM-422 toward the remaining live Supabase/RLS verification requirement after the data/security and UI/community slices. Determine whether live verification can be run from this workspace, add an executable verification path if direct execution is unavailable, and update docs/handoff trail.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/2026-06-27-1951-codex-vm422-ui-community-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
- `assets/js/shared.js`
- `assets/js/deck-links-tests.js`
- `package.json`
- `supabase/functions/guild-recruiter/index.ts`

## Files Changed

- `scripts/vm422-live-rls-check.mjs`
- `assets/js/deck-links-tests.js`
- `package.json`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-2000-codex-vm422-live-rls-harness.md`

## What Changed

- Added `scripts/vm422-live-rls-check.mjs`, a dependency-free Node harness for live VM-422 Supabase RLS verification.
- Added `npm run test:deck-links:live`.
- The live verifier uses Supabase Auth and REST endpoints directly, deriving default Supabase URL/anon key from `assets/js/shared.js` while allowing `SUPABASE_URL` and `SUPABASE_ANON_KEY` overrides.
- The live verifier requires existing owner/non-owner test users and `SUPABASE_SERVICE_ROLE_KEY` for moderation setup and cleanup.
- Updated manual QA and data-contract docs to point future agents at the live verifier.
- Updated the VM-422 card to distinguish prepared live verification from completed live proof.
- Clarified the public display-name boundary: existing profile/session naming can fall back to an email local part, so VM-422 does not let browser save/update flows write `public_display_name`; the public ledger uses the trusted snapshot/default until a sanitized public profile name source exists.
- Added a focused regression check that `public_display_name` is not included in browser insert/update grants.

## Why It Changed

The current workspace cannot prove live RLS because it has no Supabase CLI, no connection string, no service-role key, no test-user credentials, and the current hosted project reports the VM-422 public view as missing from the schema cache. The harness turns the remaining requirement into an executable check once the SQL is applied and credentials are available.

## Decisions Made

- Do not attempt to apply SQL with the checked-in browser anon key.
- Do not print or persist secret values.
- Require a service-role key for the live verifier so it can publish rows for moderation-state checks and clean up test data afterward.
- Keep the live verifier out of the default `npm test` path because it depends on live external credentials and mutates temporary test rows.
- Do not derive public ledger names from `SESSION.username` or the existing shared display-name helper, because that helper can fall back to the user's email local part.

## Risks / Uncertainties

- `npm run test:deck-links:live` was not executed because required credentials are absent in this workspace.
- Live Supabase SQL/RLS remains unproven until `docs/supabase-vm422-deck-links.sql` is applied and the live verifier/manual QA passes.
- The script assumes owner and non-owner test users already exist and can sign in with email/password.
- Supabase Auth settings may disable password sign-in for the provided users; in that case, the live verifier will fail at sign-in and manual browser/OAuth QA will still be needed.

## Tests Run

- `node --check scripts\vm422-live-rls-check.mjs`
  - Passed.
- `npm.cmd run test:deck-links`
  - Passed.
- `npm.cmd run lint:js`
  - Passed.
- 2026-06-27 20:03 verification pass:
  - `npm.cmd run test:frontend-smoke` - Passed.
  - `git diff --check` - No whitespace errors; Git emitted LF-to-CRLF warnings for touched files.
  - `node --check scripts\vm422-live-rls-check.mjs` - Passed.
  - `npm.cmd run test:deck-links` - Passed after the public-display-name grant regression check.
  - `npm.cmd run lint:js` - Passed.
  - `npm.cmd run lint:html` - Passed.
  - `npm.cmd test` - Passed. It rewrote only the generated Gate bias report timestamp, which was restored to avoid unrelated audit churn.

## Not Touched

- Live Supabase project schema
- Live Supabase test users
- Service-role secrets
- Manual moderation tooling
- Runtime placement data
- Decklist parsing/importing/hosting
- Unrelated VM-420/VM-421/VM-424 dirty-tree work

## Follow-Up Recommendations

- Apply `docs/supabase-vm422-deck-links.sql` to the target Supabase project.
- Create or identify two test users that can sign in with email/password.
- Run `npm.cmd run test:deck-links:live` with `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY` set.
- Follow with manual browser QA for Google/OAuth account flows if production users will not use email/password auth.
- Close VM-422 only after live RLS and account/ledger QA passes against the applied schema.

## Next Suggested Agent

Security Reviewer or Test Strategist with access to the Supabase project credentials.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/reference/manual-test-cases.md`
- `docs/reference/data-contracts.md`
- `docs/handoffs/2026-06-27-1842-codex-vm422-data-security-layer.md`
- `docs/handoffs/2026-06-27-1951-codex-vm422-ui-community-ledger.md`
