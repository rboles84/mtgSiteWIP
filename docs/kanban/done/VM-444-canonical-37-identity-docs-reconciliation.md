# VM-444 - Canonical 37-Identity Documentation Reconciliation

ID: VM-444
Title: Canonical 37-Identity Documentation Reconciliation
Status: Complete
Type: Documentation / Source Of Truth / Release Readiness
Area: Architecture, Data Contracts, Manual QA
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Reconcile active documentation that still describes Vox Mana as a 30- or 36-expression runtime with the current repo truth: `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, VM-389, and VM-427 show 37 live placement identities and 37 Home Identity Signal preview identities.

## Pre-Flight Carry-Forward

- VM-389 promoted all 37 live placement identities into the Home Identity Signal.
- VM-427 recorded `test:placement` passing with 37 factions and 37 golden paths, `test:bias:all` passing with 37 golden paths, and Gate compression reaching 37/37.
- VM-429 and VM-430 both flagged stale 30/36 identity documentation as a release-readiness and trust issue.
- VM-440 through VM-443 already repaired visible copy and copy-boundary guardrails; do not reopen that copy audit here.
- VM-422 remains in progress and live Supabase RLS proof is outside this ticket.

## Scope

- Update active architecture/reference/manual QA docs that currently describe the live placement set, Home preview set, or Colorless/WUBRG preview state incorrectly.
- Preserve historical cards and handoffs as history unless an active doc uses them as current truth.
- Keep this as a docs-only repair.

## Explicit Non-Goals

- No runtime behavior changes.
- No generated data edits.
- No identity count, placement logic, Home signal, route, Supabase, account, Maze, Archscry, visual-baseline, or storage-key changes.
- No new lore, card, Commander, or legality claims.

## Acceptance Criteria

- [x] Active docs state that the current live placement set has 37 identities.
- [x] Active docs state that the Home Identity Signal preview set is 37 v1-visible placement identities.
- [x] Active docs distinguish the historical 20-expression baseline/domain anchor from current runtime/preview counts.
- [x] Stale active-doc references to current 30-expression or 36-expression sets are removed or marked historical.
- [x] Colorless/WUBRG current preview behavior is reconciled without rewriting VM-334/VM-362/VM-372 as if they had made later VM-389 decisions.
- [x] Manual QA steps expect 37 factions/golden paths where they describe current placement validation.

## Validation

- `rg "30-expression|36-expression|active 36|live 30|30 factions|30 golden|20 Home preview entries|Current counts remain at 36|Home preview remains disabled" docs/architecture docs/reference`
- `npm.cmd run test:placement`
- `npm.cmd run validate:source-generated`

## Related Work

- `VM-389` - V1 Home Identity Signal Promotion
- `VM-427` - Repo Scan, Test Sweep, And Main Promotion
- `VM-429` - Vox Mana Self-Snapshot
- `VM-430` - Vox Mana Comprehensive QA Test Plan
- `VM-439` through `VM-443` - Voice/copy audit and repairs

## Closeout

Updated active architecture, data contract, manual QA, Colorless, and WUBRG-adjacent docs to treat 37 live placement identities and 37 Home Identity Signal preview identities as current truth. Historical decision docs now label older Colorless/WUBRG preview and count states as superseded history rather than current runtime authority.

## Tests Run

- `rg "30-expression|36-expression|active 36|live 30|30 factions|30 golden|Current counts remain at 36|Home preview remains disabled" docs\architecture docs\reference` - no matches.
- `npm.cmd run test:placement` - passed, 37 factions and 37 golden paths.
- `npm.cmd run validate:source-generated` - passed with existing warning-only JESKAI/MARDU inhibitor notes.
