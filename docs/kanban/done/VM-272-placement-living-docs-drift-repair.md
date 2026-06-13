ID: VM-272
Title: Placement Living-Docs Drift Repair
Status: done
Type: Documentation Repair
Area: Architecture, Reference Docs, Kanban
Priority: medium
Created: 2026-06-02

## Summary

Repair living Vox Mana architecture and reference docs that still describe older live-placement count checkpoints so they match the current 30-expression live model while preserving the 20-entry Home preview and the no-live-domain runtime contract.

## Scope

- Perform AGENTS.md pre-flight before editing.
- Treat this as a docs-only repair, not a placement-logic rewrite.
- Read `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, and `assets/js/quick-reading-tests.js` for verification only.
- Do not edit runtime, data, schema, generated artifacts, or placement logic in this card.
- Update only living architecture/reference docs plus the new VM-272 Kanban and handoff records.
- Preserve historical handoffs and done cards as audit evidence unless a VM-272 closeout note needs to reference them.

## Acceptance Criteria

- [x] Living architecture/reference docs describe the live placement set as 30 expressions.
- [x] Updated docs still distinguish the 20-entry Home preview from the 30-expression live placement set.
- [x] Updated docs still state that no runtime or generated contract exposes a live `domain` field.
- [x] `docs/reference/manual-test-cases.md` expects `30 factions, 30 golden paths`.
- [x] Mono-adjacent acceptance wording matches current test behavior: pair shells remain the core boundary and live shard/wedge pilots are valid adjacent examples when they share those shells.
- [x] Runtime/source-of-truth files remain unedited in VM-272.

## Closeout

Completed as a docs-only repair. Living architecture/reference docs now reflect the current 30-expression live placement set, keep the 20-entry Home preview distinct, and preserve the existing no-live-domain runtime contract. Runtime/data/schema/generated artifacts were reviewed for verification only and were not edited in this slice.
