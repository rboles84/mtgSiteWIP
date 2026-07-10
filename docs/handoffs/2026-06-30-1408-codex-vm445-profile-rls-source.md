# Codex Handoff - VM-445 Profile Supabase RLS Source Artifact

## Agent Name

Codex

## Task Requested

Continue executing the VM-429 Sections 11/12/14 readiness queue after VM-444 by restoring the checked-in profile Supabase SQL/RLS source artifact and updating the related security traceability docs.

## Files Reviewed

- `C:\Users\obake\.codex\attachments\8f9dd8ab-db18-4428-90e7-26d3911a5407\pasted-text-1.txt`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-06-30-1358-codex-vm444-37-identity-docs.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/handoffs/2026-05-28-1715-codex-vm155-supabase-frontend-security-review.md`
- `docs/supabase-vm422-deck-links.sql`
- `assets/js/shared.js`
- `assets/js/deck-links-tests.js`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/move-into-repo.md`

## Files Changed

- `docs/supabase-profile-update.sql`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/data-contracts.md`
- `docs/kanban/done/VM-445-profile-supabase-rls-source-artifact.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-1408-codex-vm445-profile-rls-source.md`

## What Changed

- Added `docs/supabase-profile-update.sql` as the checked-in profile schema/RLS artifact referenced by `assets/js/shared.js`, manual setup docs, and VM-155.
- Covered current `profiles` fields read/written by `assets/js/shared.js`: identity/session display fields, legacy placement fields, score payload, `taken_at`, and `placement_result`.
- Enabled and forced RLS on `public.profiles`.
- Added owner-scoped select, insert, and update policies using `auth.uid() = id`.
- Revoked profile table grants from `anon`; granted only select/insert/update column sets needed by the authenticated frontend contract.
- Updated `docs/architecture/supabase-frontend-security-review.md` so profile SQL traceability is no longer described as missing.
- Updated `docs/reference/data-contracts.md` to name `docs/supabase-profile-update.sql` as the profile storage artifact and keep live verification separate.

## Why It Changed

VM-155, VM-429, VM-430, and the VM-445 plan all treated missing profile SQL/RLS source as a blocker for account/profile trust. The repo had client code and docs pointing to `docs/supabase-profile-update.sql`, but that artifact was absent. VM-445 restores repo traceability without making an unsupported live production claim.

## Decisions Made

- Kept the ticket source/security documentation only; no runtime behavior was changed.
- Scoped the SQL to the existing frontend contract instead of adding new account/profile features.
- Did not add delete grants or public profile views because the frontend does not use them.
- Did not expose `profiles` data to anonymous users.
- Kept VM-422 public ledger display names separate from profile display-name fallback behavior.
- Did not claim the SQL has been applied in the live Supabase project.

## Risks / Uncertainties

- The SQL artifact has not been run against the live Supabase project in this pass.
- Existing live `profiles` schema/policies may drift from the checked-in artifact until manually compared.
- The archived `guild-recruiter` Edge Function auth/throttle questions from VM-155 remain unresolved.
- VM-422 live deck-link RLS proof remains pending credentials/schema verification.
- Existing unrelated dirty-tree changes from VM-428 through VM-444 remain present and were not staged, committed, or reverted.

## Tests Run

- Static profile SQL/policy scan for `supabase-profile-update.sql`, owner-scoped `auth.uid() = id` policies, RLS enablement, anon revoke, and column grants - passed.
- Stale missing-artifact scan across `docs/architecture/supabase-frontend-security-review.md`, `docs/reference`, and the VM-445 card - no matches.
- Policy-smell scan for `grant delete`, `for delete`, `to anon`, `using (true)`, `with check (true)`, and `for all` in `docs/supabase-profile-update.sql` - no matches.
- `npm.cmd run test:deck-links` - passed.

## Not Touched

- Runtime JS, route HTML, generated data, source packets, visual baselines, Supabase live settings, service-role keys, VM-422 live harness, account UI, public ledger/community behavior, git staging, committing, pushing, or branch changes.

## Follow-Up Recommendations

- Continue with VM-446: run VM-422 live private deck-link RLS proof only when owner/non-owner credentials and service-role key are available.
- Add a future live profile RLS verification step or harness if saved profiles become release-critical.
- Keep `docs/supabase-profile-update.sql` synchronized with live Supabase schema/policies after any project-side change.

## Next Suggested Agent

Security/Supabase verification pass for VM-446 live RLS proof, or Test Strategist if live credentials are unavailable and the next feasible item is CI validation.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-445-profile-supabase-rls-source-artifact.md`
- `docs/supabase-profile-update.sql`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/data-contracts.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
