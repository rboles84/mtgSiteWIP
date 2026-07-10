# VM-455 - Remaining Readiness Residuals And Release Caveat Sweep

Status: done

## Summary

Run the final small residual readiness pass after VM-452 and VM-454. Confirm the remaining blockers and caveats are represented honestly, sweep public copy for stale identity-scope and anti-fit language, apply only minimal copy/docs fixes, and record what can and cannot be claimed.

## Pre-Flight Summary

- VM-444 through VM-454 were accepted as complete except VM-446, which remained blocked at the time of VM-455.
- `VM-455` was available in a fresh collision scan; no `VM-455` card or handoff existed.
- VM-446 is represented as blocked in the board, blocked card, handoff index, and VM-452 case study.
- VM-450 documents route visual compare failures as waived/documented, not green, in `docs/qa/visual-baseline-waivers.md`.
- VM-447 CI is no-secret deterministic validation only; it intentionally excludes live Supabase, visual compare, Lighthouse, and external refresh gates.
- VM-452 already contains the strategic options and anti-fit decision record; VM-453 is not reused.

## What Changed

- Repaired Home Identity Signal subtitle copy in `index.html` from the stale "colors, guilds, and colleges" frame to the current live identity-field wording.
- Repaired JS-fed Home atlas frontier copy in `assets/js/index.js` so it no longer frames the live identity field as guilds/colleges first.
- Updated `docs/qa/visual-baseline-waivers.md` to record that the stale Home subtitle was fixed by VM-455 without refreshing visual baselines.
- Added this VM-455 done card.
- Updated `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`.
- Added the VM-455 handoff.

## Residual Status

Docs, metadata, CI, browser smoke, and product-boundary checks are ready for review. VM-458 later moved private deck-link saving and its live RLS proof gate to backlog; private deck-link behavior remains not production-proven. Visual baselines are documented/waived, not green.

Do not claim:

- VM-422 private deck-link/account behavior is live-production proven.
- VM-446 has passed.
- Visual compare scripts are green.
- No-secret CI proves live Supabase, visual baseline acceptance, Lighthouse, or live Scryfall refresh behavior.
- Vox Mana is production-ready, monetization-ready, or account/community-ready.

## VM-446 Check

The required live Supabase env vars are missing:

- `VM422_OWNER_EMAIL`
- `VM422_OWNER_PASSWORD`
- `VM422_OTHER_EMAIL`
- `VM422_OTHER_PASSWORD`
- `SUPABASE_SERVICE_ROLE_KEY`

`npm.cmd run test:deck-links:live` was not run during VM-455. VM-458 later moved VM-446 to backlog as a conditional gate.

## Search Findings

- Exact stale identity-scope phrases are gone from live public HTML after the Home copy fix.
- Remaining `guilds` / `colleges` hits in `assets/js` and `research` are internal mode names, comments, parser/test language, or source-era text, not current public scope copy.
- Public-route anti-fit search found only the intentional Home "Not a deckbuilder" boundary statement.
- Public-facing docs mention deckbuilder, recommendation, legality, EDHREC, account/community, and "best commander" language as explicit anti-fit guardrails.
- Test files contain blocked terms as fixtures.
- A broader out-of-scope data spot-check still finds "best deck" wording in precon source/generated catalog fields. Those data files were not edited because this ticket forbids data-file changes and the phrases were not found in the current public route/body copy sweep.

## Scope Guardrails

- No VM-453 card was created or reused.
- VM-444 through VM-454 were not reopened.
- No visual baselines were refreshed.
- No placement logic, route structure, storage keys, identity counts, Supabase schema/policies, account/community features, monetization features, or deckbuilder features were changed.

## Acceptance Criteria

- [x] VM-446 was clearly blocked, not passed, at the time of VM-455; VM-458 later moved it to backlog as a conditional gate.
- [x] VM-422 account/private deck-link scope is not claimed as production-proven.
- [x] Visual baselines remain documented/waived, not green.
- [x] CI is described as no-secret deterministic validation only.
- [x] Stale Home identity-scope public copy is repaired.
- [x] Anti-fit public copy sweep is documented.
- [x] Optional VM-446 live check is skipped because required env vars are missing.
- [x] Final reviewer-readiness status avoids unqualified release-ready or production-ready claims.
- [x] Required validation commands pass or are honestly classified.

## Validation

- `npm.cmd run test:route-metadata` - passed.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `git diff --check` - passed with LF-to-CRLF warnings across the already-dirty tree.
- Stale identity-scope public HTML search - no exact stale public HTML matches after the copy fix.
- Stale identity-scope `assets/js` / `research` search - remaining hits are internal/test/source-era language.
- Public-route anti-fit search - only intentional "Not a deckbuilder" copy found.
- Public-facing docs anti-fit search - hits are explicit guardrails.
- VM-446 env check - all five required vars missing; live test not run.

## Risk If Skipped

Reviewers could overread the post-VM-452 queue as production-ready, miss that VM-446 and visual baselines remain caveated, or keep seeing stale guild/college scope copy in the Home Identity Signal.
