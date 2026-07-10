# VM-457 - Loom Foundation Deep Dive

ID: VM-457
Title: Loom Foundation Deep Dive
Status: Done
Type: Documentation / Product Synthesis
Area: Maze, Loom, Commander Compass, Strategy
Priority: High
Created: 2026-06-30
Completed: 2026-06-30

## Summary

Create a reviewable deep-dive document that gathers the Loom idea across current Kanban cards, repo docs, and the curated external vault, especially the foundation-to-generation lane: using placement/metaphysics/parser/tag foundations to generate or surface cards, concepts, strategies, archetypes, threads, and keyword-based searches.

## Source

- User request to check all Kanban cards and the vault for Loom ideas.
- `docs/kanban/backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md`
- `docs/kanban/done/VM-003-scryfall-discovery-foundation.md`
- `docs/kanban/done/VM-012-scryfall-parser-expansion-diagnostics.md`
- `docs/kanban/done/VM-022-maze-core-extraction.md`
- `docs/kanban/done/VM-426-reading-finds-dossier-reflection.md`
- `docs/kanban/done/VM-449-maze-return-loop-microcopy-tightening.md`
- Curated external vault at `C:\WIP\obsidianVault\vox-mana-vault\vox-mana-vault-fresh`

## Acceptance Criteria

- A deep-dive document exists under `docs/strategy/` for owner review.
- The document separates current shipped behavior, planned Loom v1 behavior, and adjacent generation ideas.
- The document identifies the foundation layers that can feed cards, concepts, strategies, archetypes, threads, and keyword-based queries.
- The document records guardrails: no deckbuilder/recommendation clone drift, no runtime invention of Magic facts, and no parser/search duplication.
- Handoff and board/index traceability are updated.

## Non-Goals

- No runtime code changes.
- No generated-data edits.
- No external vault edits.
- No new card facts, commander facts, lore claims, or gameplay assertions beyond reviewed source material.

## Notes

Keep this as synthesis for review, not implementation approval.

## Outcome

Created `docs/strategy/2026-06-30-loom-foundation-deep-dive.md`, a review draft that separates shipped Maze/Loom v0 behavior from planned Loom v1 graph work, maps the foundation-to-generation idea, and identifies owner review questions before any implementation.

## Verification

- `git diff --check` scoped to the new doc, VM-457 card, and board passed with only the existing board line-ending warning.
- `rg` traceability check for `VM-457`, the deep-dive title, and review-section anchors passed.

## Not Touched

- Runtime code.
- Generated data.
- Raw lore/source packets.
- Placement scoring or model data.
- Supabase/RLS.
- Visual baselines.
- External vault files.
