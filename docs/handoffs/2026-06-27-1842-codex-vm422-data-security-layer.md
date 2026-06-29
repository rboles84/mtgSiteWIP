# 2026-06-27 18:42 - Codex - VM-422 Data Security Layer

## Agent Name

Codex

## Task Requested

Continue VM-422 from planning into implementation, starting at the data/security layer rather than UI. Confirm unrelated dirty tree state, discover Supabase/schema conventions, add the core deck-link contract, add focused tests, add the Supabase SQL/RLS artifact, and leave UI wiring for a later slice.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/2026-06-27-1815-codex-vm422-account-deck-links.md`
- `docs/handoffs/2026-05-28-1715-codex-vm155-supabase-frontend-security-review.md`
- `docs/handoffs/2026-06-14-1832-codex-vm394-pre-push-exposure-gitignore-audit.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/reference/data-contracts.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `assets/js/shared.js`
- `assets/js/index.js`
- `package.json`
- Existing focused test files under `research/` and `assets/js/`
- `supabase/functions/guild-recruiter/index.ts`

## Files Changed

- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `assets/js/deck-links-tests.js`
- `docs/supabase-vm422-deck-links.sql`
- `package.json`
- `docs/reference/data-contracts.md`
- `docs/reference/README.md`
- `docs/reference/spec-index.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-27-1842-codex-vm422-data-security-layer.md`

## What Changed

- Moved VM-422 into In Progress on the Kanban board.
- Added `assets/js/deck-links.js` as the deck-link contract utility.
- Added `assets/js/deck-link-service.js` as the Supabase-facing service layer for account save/list/update, submit, public ledger reads, and vote toggles.
- Added `npm run test:deck-links`.
- Added `assets/js/deck-links-tests.js` covering provider detection, lookalike rejection, URL normalization, length limits, browser publish blocking, visibility mapping, public-edit moderation behavior, mocked Supabase account save/list/update, submit flow, public-view reads, vote toggles, blocked/non-owner error propagation, and SQL artifact guardrail scans.
- Added `docs/supabase-vm422-deck-links.sql` with `user_deck_links`, `community_deck_votes`, sanitized `community_deck_ledger_public`, explicit grants, RLS, indexes, constraints, provider checks, public-edit resubmission trigger, vote-public-only trigger, and maintained `upvote_count`.
- Added reference docs pointing to the VM-422 SQL artifact and deck-link storage contract.
- Updated the VM-422 card acceptance/progress to mark only the completed data/security items.

## Why It Changed

VM-422 should be built from the policy/data contract outward. This slice establishes the allowed deck providers, SQL/RLS boundary, public-view exposure limits, positive-only vote model, and focused tests before Archscry, account, or Apocrypha UI relies on the feature.

## Decisions Made

- Use `assets/js/deck-links.js` for reusable provider/visibility/vote helpers so later UI can call one contract.
- Use `assets/js/deck-link-service.js` for the later UI's Supabase calls instead of scattering table names and select lists through route code.
- Keep `docs/supabase-vm422-deck-links.sql` under `docs/` because VM-155 found no existing Supabase migration folder and existing docs already reference SQL artifacts in that location.
- Store `public_display_name` as a public-safe snapshot rather than exposing `owner_id` or joining profile email-sensitive fields in the public view.
- Maintain `upvote_count` on `user_deck_links` with vote triggers so the public view does not need to expose or aggregate raw voter rows.
- Require SQL-level deck URLs to be `https://`; browser normalization upgrades allowed `http://` URLs to `https://` before persistence.
- Leave UI and live Supabase execution for the next slice.

## Risks / Uncertainties

- The SQL artifact has not been executed against a live Supabase project in this slice.
- Live `profiles` RLS and display-name source policy remain outside repo evidence; VM-422 avoids owner email and raw owner id exposure by using `public_display_name`.
- Manual RLS verification is still required for anonymous, owner, non-owner, public row, public-row edit, rejected row, and archived row cases.
- The eventual UI must render deck-link fields with text-safe APIs and avoid `innerHTML`.
- Existing dirty VM-420/VM-421 docs work and two docs/research deletions remain unrelated and untouched.

## Tests Run

- `npm.cmd run test:deck-links`
  - Passed before and after adding the Supabase service layer.
- `npm.cmd run lint:js`
  - Passed before and after adding the Supabase service layer.
- `npm.cmd test`
  - Passed.
- `npm.cmd run lint:html`
  - Passed.
- `npm.cmd run test:frontend-smoke`
  - Passed.
- `git diff --check`
  - No whitespace errors reported. Git emitted existing LF-to-CRLF warnings for touched docs/package files.
- `git status --short`
  - Confirmed VM-422 changes plus pre-existing unrelated dirty docs/deletions.
  - `docs/audits/gate-compression/live-gate-bias.md` and `.json` were rewritten by `npm test`; their timestamp content was restored, and `git diff --` shows no content diff for those files, but `git status` still flags them with LF-to-CRLF warnings in this sandbox.

## Not Touched

- Archscry CTA UI
- Account saved deck-link UI
- Apocrypha Community Deck Ledger UI
- Live Supabase project or migrations applied in Supabase
- Existing `profiles` SQL or backfill
- Runtime placement model
- Source lore
- Commander facts
- Generated faction data
- Maze scratchpad behavior
- Visual baselines
- VM-420/VM-421 unrelated dirty docs and existing docs/research deletions

## Follow-Up Recommendations

- Next implementation slice should wire Archscry/account UI around `assets/js/deck-link-service.js`, `assets/js/deck-links.js`, and `docs/supabase-vm422-deck-links.sql`.
- Add Archscry result CTA copy only after the save/list functions are in place.
- Add Apocrypha Community Deck Ledger UI using `textContent`/safe DOM construction for user fields.
- Execute or dry-run the SQL in Supabase and manually verify RLS for anonymous, owner, non-owner, public approved row reads, public-row edit attempts, rejected rows, and archived rows.
- Add UI-focused tests or smoke coverage once the account/ledger surfaces exist.

## Next Suggested Agent

Implementation Engineer for account/API and UI wiring, followed by Test Strategist or Security Reviewer for live RLS verification.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/supabase-vm422-deck-links.sql`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/kanban/done/VM-155-targeted-supabase-frontend-security-review.md`
- `docs/kanban/done/VM-394-pre-push-exposure-and-gitignore-audit.md`
- `docs/handoffs/2026-06-27-1815-codex-vm422-account-deck-links.md`
