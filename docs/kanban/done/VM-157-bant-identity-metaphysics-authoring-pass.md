# VM-157 - Bant Identity And Metaphysics Authoring Pass

ID: VM-157
Title: Bant Identity And Metaphysics Authoring Pass
Status: done
Type: Documentation / content architecture
Area: Bant shard authoring, evidence-bound tri-color architecture
Priority: high
Created: 2026-05-28
Completed: 2026-05-28

## Summary

Created Bant shard `identity.md` and `metaphysics.md` under `docs/architecture/colors/bant/` using the curated Bant research packet as the primary evidence base and the three-color canon inventory as a discovery aid.

This pass is intentionally authoring-first and docs-only. It does not create live Bant runtime data, does not touch generated artifacts, and does not promote unsupported Bant lore into the placement stack.

## Outcomes

- Added `docs/architecture/colors/bant/identity.md`.
- Added `docs/architecture/colors/bant/metaphysics.md`.
- Kept the files aligned with the existing Vox Mana expression-doc shape used by guild and college identity/metaphysics docs.
- Anchored major claims to the Bant ledgers, Bant dossier, Bant reliability audit, approved official Bant article capture, and the canon inventory trail.
- Added explicit `Manual fill required` boundaries for unsupported material such as exact nation breakdown, detailed Bant-to-shard relationships, Asha doctrine, Elspeth story specifics, and Commander Compass/runtime promotion.
- Explicitly rejected fan or unmanaged summary artifacts as primary evidence for this pass.

## Evidence Basis

- `docs/research/bant/README.md`
- `docs/research/bant/bant-source-ledger.md`
- `docs/research/bant/bant-evidence-ledger.md`
- `docs/research/bant/bant-research-dossier.md`
- `docs/research/bant/bant-reliability-audit.md`
- `docs/research/bant/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md`
- `docs/research/canon/canon-inventory-three-color-reference-audit.md`
- Existing expression-doc patterns in `docs/architecture/colors/azorius/` and `docs/architecture/colors/lorehold/`

## Validation

- Bant `identity.md` and `metaphysics.md` both include explicit source-boundary language and manual-fill gates.
- Major section claims point back to Bant ledger IDs, Bant dossier sections, or the canon inventory trail.
- Unsupported or low-confidence material is marked instead of promoted.
- `git diff --check`: to be run as part of closeout verification.
- Scoped status check: no runtime or generated Bant integration was added in this pass.

## Not Touched

- `data/raw-factions/bant/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Route CSS, route JS, Maze controllers, or frontend cleanup files
- The untracked `docs/research/bant/Magic_ The Gathering Bant Lore Research.md` draft
