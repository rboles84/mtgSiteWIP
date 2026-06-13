# 2026-06-02 11:53 - Codex - VM-240 Yore Naming Clarification

## Agent Name

Codex acting as Planning Architect for naming-policy scope control, with Documentation Steward support.

## Task Requested

Add the four-color naming clarification requested after VM-240: Yore should be treated as Vox Mana's Nephilim-derived expression label for WUBR, Artifice as the Commander 2016 theme alias, and neither as the official exclusive MTG name for the color quadruple.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-1135-codex-vm240-yore-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-240-yore-source-packet-and-evidence-ledger.md`
- `docs/research/yore/README.md`
- `docs/research/yore/yore-source-ledger.md`
- `docs/research/yore/yore-evidence-ledger.md`
- `docs/research/yore/yore-lore-source-packet.md`
- `docs/research/yore/yore-reliability-audit.md`
- `docs/research/yore/yore-manual-fill.md`
- `docs/research/canon/canon-inventory-four-color-reference-audit.md`
- `docs/research/canon/misc/Magic Four-Color Identity Dossier.md`
- `docs/research/4 color/WUBR_ Artifice and Yore Research.md`

## Files Changed

- `docs/research/yore/README.md`
- `docs/research/yore/yore-source-ledger.md`
- `docs/research/yore/yore-evidence-ledger.md`
- `docs/research/yore/yore-lore-source-packet.md`
- `docs/research/yore/yore-reliability-audit.md`
- `docs/research/yore/yore-manual-fill.md`
- `docs/kanban/done/VM-240-yore-source-packet-and-evidence-ledger.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-1153-codex-vm240-yore-naming-clarification.md`

## What Changed

- Added a Naming Authority Note to the Yore README.
- Added `YORE-EVID-010` to distinguish Vox Mana's `YORE` label from Commander 2016's `Artifice` theme alias.
- Updated lore-source, reliability, manual-fill, and source-ledger wording so future docs avoid official-name overclaims.
- Added a post-completion clarification to the VM-240 done card.
- Indexed this handoff.

## Why It Changed

The user flagged that four-color combinations do not have settled universal official names. The VM-240 packet needed a guardrail so future Yore docs can use the chosen Vox Mana label without implying that Magic officially names WUBR "Yore" or exclusively names it "Artifice."

## Decisions Made

- `YORE` remains the reserved Vox Mana public expression/research label for WUBR/non-Green.
- `Artifice` remains the Commander 2016 theme/mechanical alias for WUBR.
- `Yore / Artifice` is safe as a paired internal frame.
- Neither term should be presented as the official, exclusive, or universally accepted MTG name for WUBR.
- The clarification does not authorize runtime aliases, route keys, raw packet work, generated artifacts, or public promotion.

## Risks / Uncertainties

- VM-241 should still capture direct naming/context sources before using the distinction in polished public docs.
- Existing local seed material is discovery-only, so it should not become direct canon evidence without later audit.

## Tests Run

- Reviewed local naming references in the four-color audit, four-color dossier, and WUBR seed research.
- Scoped trailing-whitespace scan on amended VM-240 research, Kanban, handoff, board, and index files.
- Scoped `git diff --check` on amended VM-240 tracked bookkeeping and research files.
- Scoped forbidden-surface diff check against runtime, generated, raw, architecture, data, Supabase, app entry, and package files.

Not run:

- `npm test`
- `npm run test:parser`
- Runtime/build suites, because this clarification was docs/source-only.

## Not Touched

- `docs/research/4 color/`
- `docs/research/canon/**`
- `docs/architecture/colors/yore/`
- `data/raw-factions/yore/`
- `data/identity-layers.json`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, and fixture files
- Glint, Dune, Ink, and Witch files
- `assets/img/identity-hero/colorless.webp`

## Follow-Up Recommendations

- VM-241 should preserve this naming distinction in identity/metaphysics docs.
- VM-241 should cite direct naming/context sources before writing polished user-facing copy about four-color naming.
- Later source packets for Glint, Dune, Ink, and Witch should use the same naming-authority structure.

## Next Suggested Agent

Documentation Steward for VM-241 Yore identity and metaphysics docs.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-240-yore-source-packet-and-evidence-ledger.md`
- `docs/research/yore/README.md`
- `docs/research/yore/yore-evidence-ledger.md`
- `docs/research/yore/yore-lore-source-packet.md`
- `docs/handoffs/2026-06-02-1135-codex-vm240-yore-source-packet.md`
