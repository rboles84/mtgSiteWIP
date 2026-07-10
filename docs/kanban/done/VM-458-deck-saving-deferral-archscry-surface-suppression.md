# VM-458 - Deck Saving Deferral And Archscry Surface Suppression

Status: done

## Summary

Defer VM-422 deck saving and VM-446 live private deck-link RLS proof to backlog, then hide the account-backed deck-saving surface from Archscry. Deck saving remains a wanted future enhancement, but it is no longer active release scope and must not block current readiness.

VM-457 was already occupied by the Loom Foundation Deep Dive, so this cleanup used the next available card ID, VM-458.

## What Changed

- Moved `VM-422` from `docs/kanban/in-progress/` to `docs/kanban/backlog/` as `Backlog - deferred enhancement`.
- Moved `VM-446` from `docs/kanban/blocked/` to `docs/kanban/backlog/` as `Backlog - conditional security gate`.
- Updated `docs/kanban/board.md` so backlog, in-progress, blocked, and done sections match the deferral.
- Removed the Archscry deck-saving dossier entry, panel rendering, submit hook, and save/remove/refresh actions from `assets/js/index.js`.
- Updated current reviewer/case-study caveats so VM-422/VM-446 are described as deferred backlog work, not active blockers.
- Preserved deck-link modules, CSS, tests, SQL, package scripts, and live RLS harness for possible later revival.

## Acceptance Criteria

- [x] No greyed coming-soon deck-saving panel appears in Archscry.
- [x] `External Deck Links` dossier entry does not render in Archscry JS/HTML.
- [x] `External Deck Links Saved For This Reading` does not render in Archscry JS/HTML.
- [x] `Save Private Deck Link`, saved-link list, refresh action, and deck-link form are not exposed in active Archscry JS/HTML.
- [x] VM-422 is backlog and clearly says deck saving is wanted but deferred.
- [x] VM-446 is backlog and clearly says the live RLS proof is required only before shipping account-backed deck saving.
- [x] Current readiness/case-study wording keeps the caveat that private deck-link behavior is not production-proven.
- [x] No Supabase schema, policy, storage-key, placement-logic, route-structure, or visual-baseline changes were made.

## Validation

- `rg -n "External Deck Links|Save Private Deck Link|deck-link-form|save-deck-link" assets\js\index.js archscry\index.html index.html` - no matches.
- Public anti-fit copy search - only the intentional Home `Not a deckbuilder` boundary line was found.
- Stale identity-scope search - remaining hits were Apocrypha source titles/links, internal mode names, tests, parser comments, or research/source-era text.
- `npm.cmd run lint:js` - passed.
- `npm.cmd run lint:html` - passed.
- `npm.cmd run test:frontend-smoke` - passed.
- `npm.cmd run test:browser-smoke` - passed for desktop and mobile.
- `npm.cmd run test:copy-boundaries` - passed.
- `git diff --check` - passed with existing LF-to-CRLF warnings across the dirty tree.

Not run:

- `npm.cmd run test:deck-links:live` - intentionally skipped because VM-446 is now a backlog conditional gate.
- Visual baseline refresh - intentionally skipped.

## Risk If Skipped

Archscry would continue advertising an account-backed deck-saving promise that is not core to the current product, not live-production proven, and not something the owner wants to prioritize before readiness work.

## Follow-Up

- Revisit VM-422 only after the owner decides deck saving belongs back in active scope.
- Before shipping any private account-backed deck saving, revive VM-446 and pass `npm.cmd run test:deck-links:live` with real owner, non-owner, and service-role credentials.
