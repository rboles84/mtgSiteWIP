# VM-470 - Account Scope Freeze And Reactivation Checklist

ID: VM-470
Title: Account Scope Freeze And Reactivation Checklist
Status: Complete
Type: Scope Control / Documentation
Area: Account, Deck Saving, Supabase
Priority: High
Created: 2026-07-03
Completed: 2026-07-03

## Summary

Reaffirmed the VM-461 account-backed deck-saving freeze so future agents cannot treat dormant VM-422/VM-446 artifacts as active release scope.

## Outcome

- Updated the account scope freeze note with a VM-470 reaffirmation.
- Updated data contracts to identify VM-470 as part of the current dormant/deferred deck-link boundary.
- Updated VM-422 and VM-446 backlog cards with reaffirmation notes.
- Verified visible deck-saving surface language remains absent from active public surfaces except deferred/negative docs and ordinary outbound deck-resource references.

## Acceptance Criteria

- [x] Current-scope note names account-backed deck saving as hidden.
- [x] VM-422 and VM-446 are identified as backlog.
- [x] Reactivation requires owner approval plus live RLS proof.
- [x] Visible deck-saving surface language scan is recorded.
- [x] `npm.cmd run test:copy-boundaries` passes.

## Validation

- Visible surface `rg` scan - only deferred/negative docs, dormant data-contract language, and ordinary outbound deck-resource references found.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run lint:html` - passed.

## Related Work

- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/reference/data-contracts.md`
- VM-422
- VM-446
- VM-458
- VM-461
