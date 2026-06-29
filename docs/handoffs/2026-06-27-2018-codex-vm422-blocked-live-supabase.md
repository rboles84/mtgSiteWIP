# 2026-06-27 20:18 - Codex - VM-422 Blocked On Live Supabase

## Agent Name

Codex

## Task Requested

Continue VM-422 to the requested end state, audit current evidence, and decide whether the goal is complete or truly blocked under the active goal rules.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/blocked/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/2026-06-27-2011-codex-vm422-grant-account-list-hardening.md`
- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`

## Files Changed

- `docs/kanban/board.md`
- `docs/kanban/blocked/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-2018-codex-vm422-blocked-live-supabase.md`

## What Changed

- Moved VM-422 from `docs/kanban/in-progress/` to `docs/kanban/blocked/`.
- Updated the Kanban board to show no in-progress cards and VM-422 blocked.
- Added the exact unblock condition to the VM-422 card: apply `docs/supabase-vm422-deck-links.sql`, provide two test users plus `SUPABASE_SERVICE_ROLE_KEY`, run `npm.cmd run test:deck-links:live`, and finish manual live QA.

## Why It Changed

The same external blocking condition has recurred across multiple VM-422 continuations. Local implementation, SQL artifact, service layer, UI, tests, manual QA documentation, live verifier, and local hardening passes are complete enough to stop finding meaningful local substitutes. Completion still requires live Supabase SQL/RLS and account behavior proof, which this workspace cannot perform without external schema access and credentials.

## Decisions Made

- Do not mark VM-422 complete without live RLS/account QA.
- Do not keep VM-422 in In Progress when the remaining work is externally blocked.
- Keep the active goal blocked rather than redefining success around local tests.

## Risks / Uncertainties

- Live Supabase may reveal additional SQL/RLS adjustments once `npm.cmd run test:deck-links:live` is run.
- Manual OAuth/browser QA may still be needed if production users do not authenticate with email/password.
- The broader dirty tree still contains unrelated VM-420/VM-421/VM-424 work and two docs/research deletions.

## Tests Run

- No new tests for the blocked-status move itself.
- Current local proof from the immediately preceding VM-422 slice:
  - `npm.cmd run test:deck-links` - Passed.
  - `node --check scripts\vm422-live-rls-check.mjs` - Passed.
  - `npm.cmd run lint:js` - Passed.
  - `npm.cmd run lint:html` - Passed.
  - `npm.cmd run test:frontend-smoke` - Passed.
  - `npm.cmd test` - Passed; generated Gate bias timestamp churn restored.
  - `git diff --check` - No whitespace errors; LF-to-CRLF warnings only.

## Not Touched

- Live Supabase project schema
- Live Supabase credentials or test users
- Manual moderation UI/tooling
- Decklist parsing/importing/hosting
- Runtime placement data
- Commander/card/lore facts
- Unrelated VM-420/VM-421/VM-424 dirty-tree work

## Follow-Up Recommendations

- Apply `docs/supabase-vm422-deck-links.sql` to the target Supabase project.
- Set `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY`.
- Run `npm.cmd run test:deck-links:live`.
- Manually QA Archscry save/list/submit, Apocrypha public ledger/upvote flow, rejected/archived non-exposure, owner public-edit resubmission, mobile layout, and public copy boundary.

## Next Suggested Agent

Security Reviewer or Test Strategist with Supabase project access.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/blocked/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`
- `docs/reference/manual-test-cases.md`
- `docs/handoffs/2026-06-27-2015-codex-vm422-moderation-state-hardening.md`
