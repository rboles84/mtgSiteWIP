# VM-349 - Thickness Readiness Matrix Decision Ledgers

ID: VM-349
Title: Thickness Readiness Matrix Decision Ledgers
Status: done
Type: source-readiness / governance
Area: docs/reference / raw-factions / source-bound repair
Priority: critical
Created: 2026-06-12

## Summary

Update source-readiness matrices before implementation repairs so every reviewed or modified field has a source-bound classification. This is the governing decision ledger for VM-350 through VM-355.

## Guardrails

- Generated/runtime/display surfaces are symptoms only.
- Do not use `data/factions.json`, dossier output, generated snippets, or runtime copy to prove readiness.
- Classify reviewed matrix fields as `backed-repair`, `source-normalization`, `source-intake-needed`, or `blocked-noncanonical`.
- Modified raw/profile/placement fields in later cards must map back to this matrix work.

## Scope

- Update guild, Strixhaven, shard/Tarkir, and Colorless readiness docs where this repair plan reviews fields.
- Add Colorless per-field readiness before any Colorless expansion decision.
- Record unsupported or ambiguous fields as intake/blockers rather than filler.

## Acceptance Criteria

- [ ] Readiness docs classify all reviewed fields for the target work.
- [ ] Colorless has a per-field readiness gate covering Crucibles, enrichment, links, Commander Compass, and public surfaces.
- [ ] No generated/runtime evidence is used as source backing.
- [ ] Follow-up intake/blocker fields are explicit.

## Test Plan

- Markdown review for classification coverage.
- Source-bound spot check against raw packets and source/evidence ledgers.
