# VM-158 - Bant Docs Parity Fill Pass

ID: VM-158
Title: Bant Docs Parity Fill Pass
Status: done
Type: Documentation / content architecture
Area: Bant shard authoring, identity and metaphysics parity
Priority: high
Created: 2026-05-29
Completed: 2026-05-29

## Summary

Brought Bant's `identity.md` and `metaphysics.md` closer to the practical authoring standard used by mature guild, color, and college docs.

This pass was docs-only. It did not create live Bant runtime data, did not touch raw-faction sources, did not update generated artifacts, and did not alter route, Maze, schema, or Supabase files.

## Outcomes

- Added `Commander expression` and `Primary tension` rows to Bant's canonical system mapping.
- Added expression-level separator sections for Bant against Azorius, Selesnya, Simic, Naya, Esper, Grixis, and Jund.
- Strengthened Bant operator guidance with Commander/archetype anchors, stronger inhibitors, and a `Useful Scryfall/search seed shape` section.
- Added an `Information` axis to Bant metaphysics and aligned the failure/source-boundary language with the new primary-tension framing.
- Normalized the canon inventory reference to `docs/analysis/canon-inventory-three-color-reference-audit.md`.
- Explicitly excluded `docs/research/bant/Bant Commander Analysis Framework.md` from the evidence chain.

## Source Boundaries

- New separator language is Vox Mana placement guidance, not canon faction diplomacy.
- Commander-expression language is curation from `bant-manual-fill.md` and the Commander workbook, tied back to Bant's exalted, champion, and community-first evidence.
- Bant nation, Asha, Elspeth, post-Conflux, and post-Phyrexia claims remain source-bounded and are not promoted beyond their support.

## Validation

- Structural searches confirmed the expected `Commander expression`, `Primary tension`, separator sections, Scryfall seed block, and metaphysics `Information` axis.
- Source-boundary searches confirmed the old canon-inventory path is absent from the edited Bant architecture docs.
- `Bant Commander Analysis Framework.md` appears only as an explicitly excluded source note in the Bant architecture docs.
- `git diff --check` completed with only existing LF-to-CRLF warnings for tracked bookkeeping files.

## Not Touched

- `data/raw-factions/bant/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Route CSS, route JS, Maze files, or source research files
