# VM-461 - Account Scope Freeze And Reactivation Checklist

ID: VM-461
Title: Account Scope Freeze And Reactivation Checklist
Status: Complete
Type: Documentation / Scope Control / Release Readiness
Area: Account, Archscry, Supabase, Product Boundary
Priority: High
Created: 2026-07-03
Completed: 2026-07-03

## Summary

Confirmed current account-backed deck-saving scope after VM-458 so future agents do not accidentally restore public/demo claims or visible Archscry deck-saving UI.

## Outcome

- Confirmed VM-422 and VM-446 are backlog.
- Confirmed active Archscry deck saving is hidden.
- Added `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`.
- Updated `docs/reference/data-contracts.md` so the Archscry Account Deck Links panel is described as hidden/deferred, not active.
- Removed stale public legal copy that described private saved deck links as currently available.
- Documented reactivation as requiring owner approval plus VM-446 live RLS proof.

## Validation

- `rg` visible deck-saving surface scan - final hits are deferred/negative notes, ordinary outbound deck-resource references, or dormant data-contract language; no active Archscry deck-saving surface found.
- `npm.cmd run test:copy-boundaries` - passed.
- `npm.cmd run lint:html` - passed.

## Acceptance Criteria

- [x] Current-scope note exists and names VM-422/VM-446 as backlog.
- [x] Reactivation checklist requires owner approval and live RLS proof.
- [x] `rg` evidence confirms no active visible deck-saving surface language.
- [x] `npm.cmd run test:copy-boundaries` passes.

## Related Work

- `VM-422` - Account Deck Links And Community Deck Ledger
- `VM-446` - VM-422 Live Private Deck-Link RLS Proof
- `VM-458` - Deck Saving Deferral And Archscry Surface Suppression
