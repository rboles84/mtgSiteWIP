# VM-325 - Source-Bound Gold Standard Rule

ID: VM-325
Title: Source-Bound Gold Standard Rule
Status: done
Type: Governance / Data Quality Contract
Area: faction-data / raw-factions / placement / dossier / workflow
Priority: critical
Created: 2026-06-10
Completed: 2026-06-10

## Summary

Implement the governing source-bound gold standard rule for future faction parity, placement, dossier, and source-quality work.

Gold standard now means source-backed parity, not output symmetry. Generated/runtime surfaces can expose gaps, but they cannot become canonical source backing.

## Pre-Flight Summary

Recent related work:
- VM-297 found source-of-truth contamination in earlier Jeskai/Witch/Mardu placement-quality passes.
- VM-300 added source/generated guardrails and the target-scoped validator.
- VM-301 through VM-304 repaired four-color source durability.
- VM-308 through VM-313 kept Colorless source-first and non-live pending separate readiness/promotion work.

Current known risks:
- The broader worktree is dirty with unrelated runtime, generated, raw, docs, asset, and kanban changes.
- VM-324 is reserved by VM-313 as the next likely Colorless implementation card, so this governance work uses VM-325.
- `data/factions.json`, hardcoded dossier copy, generated snippets, and live UI output can look polished while lacking source traceability.

Relevant decisions already made:
- Durable placement/profile backing belongs in raw packets, source/evidence ledgers, approved research, and approved Commander source files.
- Generated placement output, generated Supabase context, generated flavor/snippets, and runtime UI copy are not source truth.
- Colorless must remain non-live until a separate readiness/promotion implementation passes.

Files recently changed by related work:
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `research/validate-source-generated-guardrails.mjs`
- four-color raw faction packets and generated rebuild outputs
- Colorless research/raw/docs/planning files

What should not be touched:
- Runtime JS
- Generated faction/placement/identity/snippet JSON
- Raw faction data
- Builders/schemas
- Supabase context
- Home, Maze, route, and Colorless promotion surfaces

## Source

User-approved governing contract for source-bound gold standard work, refined from the recon on mono colors, guilds, Strixhaven colleges, shards, Tarkir clans, four-color identities, and Colorless.

## Acceptance Criteria

- [x] Guardrail docs define official researched data.
- [x] Guardrail docs state generated/runtime surfaces are comparison targets only.
- [x] Guardrail docs prohibit web search, model memory, general MTG knowledge, and unsourced inference outside explicit source-intake cards.
- [x] Workflow docs define recon, review, repair, source-intake, and implementation card rules.
- [x] Implementation cards must classify changed or preserved fields as `backed-repair`, `source-normalization`, `source-intake-needed`, or `blocked-noncanonical`.
- [x] Four-color requires a per-identity, per-field source-readiness matrix before parity implementation.
- [x] Colorless remains non-live unless separately promoted through readiness gates.
- [x] Data contracts point to the stricter source-bound rule.

## Files Impacted

- `docs/reference/source-generated-guardrails.md`
- `docs/reference/data-contracts.md`
- `docs/reference/workflow.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-325-source-bound-gold-standard-rule.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-10-1922-codex-vm325-source-bound-gold-standard-rule.md`

## Risks

- This card is governance-only; it does not make existing data source-backed by itself.
- Existing generated/runtime values must still be audited field by field before preservation or repair.
- Older cards may use looser language; future implementation should follow this stricter VM-325 contract when conflicts appear.

## Implementation Prompt

For any future gold-standard, parity, placement, dossier, or faction-data card:

1. Classify the card as recon, review, repair, source-intake, or implementation.
2. Identify the official researched source category for every changed or preserved field.
3. Treat generated/runtime surfaces as comparison targets only.
4. If a field lacks source backing, classify it as `source-intake-needed` or `blocked-noncanonical`.
5. Do not use web search, model memory, general MTG knowledge, or unsourced inference unless the card is explicitly source-intake and records the new source.

## Notes

This card intentionally does not run generators or validators because no source data, placement model, runtime behavior, or generated artifact was changed.
