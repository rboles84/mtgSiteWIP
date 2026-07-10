# VM-445 - Profile Supabase RLS Source Artifact

ID: VM-445
Title: Profile Supabase RLS Source Artifact
Status: Complete
Type: Security / Supabase / Documentation
Area: Account, Profiles, Supabase, RLS
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Restore the checked-in `docs/supabase-profile-update.sql` artifact referenced by `assets/js/shared.js`, manual QA docs, migration notes, and the VM-155 Supabase frontend security review. The artifact must document the optional signed-in profile storage schema and RLS expectations used by saved Archscry placement results.

## Pre-Flight Carry-Forward

- VM-155 found that the browser client can upsert/read/update `profiles` rows, but repo-only validation was blocked because `docs/supabase-profile-update.sql` was missing.
- `assets/js/shared.js` still instructs maintainers to run `docs/supabase-profile-update.sql` when profile columns are missing.
- Manual QA and move-into-repo docs already reference the same SQL file.
- VM-422 depends on a public-safe display-name boundary, but v1 private saved deck links do not require browser writes to public ledger display names.
- VM-444 is complete; this ticket must not reopen identity-count docs or copy-boundary repairs.

## Scope

- Add or restore `docs/supabase-profile-update.sql`.
- Ensure the artifact covers current frontend fields: `id`, `email`, `username`, `display_name`, `avatar_url`, `guild`, `guild_name`, `runner_up`, `confidence`, `decree`, `scores`, `taken_at`, and `placement_result`.
- Enable and force RLS for `public.profiles`.
- Grant authenticated users only the table operations the frontend uses: select, insert/upsert, and update.
- Add owner-scoped policies using `auth.uid() = id`.
- Update the security review from "missing artifact" to "artifact restored; live verification still pending."

## Explicit Non-Goals

- No runtime behavior changes.
- No Supabase live execution claim.
- No service-role key handling.
- No public profile directory, public display-name publishing, community ledger, account UX, delete flow, or moderation workflow.
- No changes to VM-422 live RLS proof.

## Acceptance Criteria

- [x] `docs/supabase-profile-update.sql` exists and is idempotent enough for manual review/application.
- [x] The SQL includes `profiles` fields read/written by `assets/js/shared.js`.
- [x] The SQL enables and forces RLS on `public.profiles`.
- [x] The SQL has separate select, insert, and update policies scoped to `auth.uid() = id`.
- [x] Anonymous users do not receive profile table grants.
- [x] Security review/docs no longer state the profile SQL artifact is missing.
- [x] Live RLS remains explicitly unproved unless credentials/schema verification is performed.

## Validation

- Static review of `docs/supabase-profile-update.sql`.
- `rg "supabase-profile-update.sql|profiles.*RLS|auth.uid\\(\\) = id|profiles select own|profiles insert own|profiles update own" docs assets/js/shared.js`
- `npm.cmd run test:deck-links`
- `git diff --check`

## Related Work

- `VM-155` - Targeted Supabase Frontend Security Review
- `VM-422` - Account Deck Links And Community Deck Ledger
- `VM-444` - Canonical 37-Identity Documentation Reconciliation

## Closeout

Added `docs/supabase-profile-update.sql` as the checked-in profile schema/RLS artifact for optional signed-in Archscry saved-placement storage. Updated the Supabase security review and data contracts to treat profile SQL traceability as restored while keeping live Supabase verification explicitly pending.

## Tests Run

- Static profile SQL/policy scan for `supabase-profile-update.sql`, owner-scoped `auth.uid() = id` policies, RLS enablement, anon revoke, and column grants - passed.
- Stale missing-artifact scan across the security review/reference docs - no matches.
- Broad policy-smell scan for profile `grant delete`, `for delete`, `to anon`, `using (true)`, `with check (true)`, and `for all` - no matches.
- `npm.cmd run test:deck-links` - passed.
