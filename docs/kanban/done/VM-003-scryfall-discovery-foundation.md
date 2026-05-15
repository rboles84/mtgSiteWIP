# VM-003 - Scryfall Discovery Foundation

ID: VM-003
Title: Scryfall Discovery Foundation
Status: done
Type: feature
Area: Scryfall data, Archscry, Maze
Priority: high
Created: 2026-05-14

## Summary

Build the hybrid Scryfall foundation for Vox Mana: ignored local oracle bulk data, lightweight committed card-expression indexes, a centralized tag taxonomy, Archscry discovery enrichment, Maze discovery paths, and a local card stash foundation.

## Source

User-provided "Vox Mana Scryfall + Discovery Experience Plan" in Codex thread.

## Acceptance Criteria

- Raw Scryfall bulk JSON is downloaded locally and ignored.
- Scryfall download, index, inspect, and refresh npm scripts exist.
- Lightweight committed Scryfall indexes are deterministic and inspectable.
- Rule-based detection emits categorized mechanical, playstyle, identity, and lore-tone tags.
- Vox Mana tag explanations live in `data/taxonomy/vox-mana-tags.json` and docs.
- Archscry result output includes placement summary, fit explanation, Commander recommendations, flavor echoes, Maze exploration paths, and Apocrypha links when available.
- Maze live Scryfall search remains standalone and keeps current modes.
- Maze shows general discovery paths, optional reading-based paths only when placement data exists, and a local normalized stash.
- Relevant tests and Scryfall inspect checks pass or blockers are recorded.

## Files Likely Impacted

- `.gitignore`
- `package.json`
- `scripts/*.mjs`
- `data/scryfall/**`
- `data/taxonomy/**`
- `docs/SCRYFALL_DATA_PIPELINE.md`
- `docs/VOX_MANA_TAG_TAXONOMY.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `assets/js/index.js`
- `assets/js/commander-dossier.js`
- `maze.html`
- `research/research-init.js`

## Risks

- Raw Scryfall bulk data is too large and must not be committed.
- A broad flavor/oracle-text mirror could be inappropriate for the public repo; committed indexes should stay lightweight.
- Maze search behavior is already useful and should not be displaced by personalized prompts.
- Commander legality is intentionally approximate in v1.

## Implementation Prompt

Use ignored `oracle_cards` bulk data for slow card-expression indexes, preserve live Scryfall API calls for Maze freshness, add centralized tag interpretation, enrich Archscry and Maze discovery, add a lightweight local stash, update docs, and create the required handoff.

## Notes

- Do not touch unrelated faction lore, generated faction artifacts, or Supabase schema/context.
- Completed with slim sampled flavor index guardrail active.
- Raw Scryfall bulk JSON and raw manifest are ignored locally.
