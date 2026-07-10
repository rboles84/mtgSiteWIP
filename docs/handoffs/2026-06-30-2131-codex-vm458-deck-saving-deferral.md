# VM-458 Deck Saving Deferral Handoff

Agent name: Codex

Task requested: Implement the deck-saving deferral plan: move VM-422 and VM-446 to backlog, hide the Archscry deck-saving surface, preserve the deferred implementation artifacts, update current readiness docs, validate, and do not run live deck-link RLS or visual baseline refreshes.

Related Kanban card, docs, or plans:

- `VM-458 - Deck Saving Deferral And Archscry Surface Suppression`
- `VM-422 - Account Deck Links And Community Deck Ledger`
- `VM-446 - VM-422 Live Private Deck-Link RLS Proof`
- `VM-452 - Public Demo And Strategic Case Study`
- `VM-455 - Remaining Readiness Residuals And Release Caveat Sweep`

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/blocked/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/kanban/done/VM-455-remaining-readiness-residuals-release-caveat-sweep.md`
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `assets/js/index.js`

## Files Changed

- `assets/js/index.js`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/kanban/done/VM-455-remaining-readiness-residuals-release-caveat-sweep.md`
- `docs/kanban/done/VM-458-deck-saving-deferral-archscry-surface-suppression.md`
- `docs/strategy/2026-06-30-vox-mana-public-demo-case-study.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-30-2131-codex-vm458-deck-saving-deferral.md`

## What Changed

- Used VM-458 because VM-457 was already occupied by the Loom Foundation Deep Dive.
- Moved VM-422 from in progress to backlog as a deferred enhancement.
- Moved VM-446 from blocked to backlog as a conditional security gate.
- Updated the board so backlog, in-progress, blocked, and done sections match the new state.
- Removed the active Archscry deck-saving panel registration, renderer, form submit listener, and save/remove/refresh action dispatch.
- Updated current reviewer/case-study caveats so deck saving is described as deferred and not production-proven.
- Added the VM-458 done card and this handoff.

## Why It Changed

The owner still wants deck saving eventually, but it is not the right next priority. Showing a disabled or coming-soon deck-saving panel would create a visible account-feature promise that is outside the current core product boundary and not live-production proven.

## Decisions Made

- Hide the Archscry surface rather than render a disabled coming-soon panel.
- Preserve deck-link modules, CSS, SQL, tests, package scripts, and live harness for later revival.
- Treat VM-446 as required only if VM-422 returns to active private account-backed deck-saving scope.
- Do not update older historical handoffs/cards that accurately described VM-446 as blocked at the time; update only current board/readiness/case-study wording.

## Risks / Uncertainties

- Deck-link CSS and service/test artifacts remain dormant in the repo, so future cleanup may be tempting; preserve them unless deck saving is explicitly killed.
- Private deck-link behavior is still not production-proven.
- If deck saving returns, VM-446 must run against real Supabase credentials before user-facing account-backed saving ships.

## Tests Run

- `rg -n "External Deck Links|Save Private Deck Link|deck-link-form|save-deck-link" assets\js\index.js archscry\index.html index.html` - no matches.
- Public anti-fit copy search - only the intentional Home `Not a deckbuilder` boundary line was found.
- Stale identity-scope search - remaining hits were source titles/links, internal mode names, tests, parser comments, or research/source-era text.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `npm.cmd run test:copy-boundaries` - passed.
- `git diff --check` - passed with LF-to-CRLF warnings across the already-dirty tree.

Not run:

- `npm.cmd run test:deck-links:live` - intentionally skipped.
- Visual baseline refresh - intentionally skipped.

## Not Touched

- Supabase schema or policies.
- Deck-link service modules.
- Deck-link SQL artifact.
- Deck-link tests or live RLS harness.
- Storage keys.
- Placement logic.
- Route structure.
- Visual baselines.
- VM-453.

## Follow-Up Recommendations

- Keep VM-422 and VM-446 in backlog until the owner intentionally revives deck saving.
- If revived, create a small reactivation ticket before restoring any public Archscry surface.
- Run VM-446 live RLS proof before claiming private account-backed deck saving is safe to ship.

## Next Suggested Agent

Planning Architect or Test Strategist, only if the owner decides to reactivate deck saving later.
