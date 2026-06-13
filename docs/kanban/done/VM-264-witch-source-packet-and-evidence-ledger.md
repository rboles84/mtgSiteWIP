# VM-264 - Witch Source Packet And Evidence Ledger

ID: VM-264
Title: Witch Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Four-Color, Witch, Research
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Normalize the first Witch source packet and evidence ledger while keeping VM-264 source-only. This card does not authorize identity docs, raw packets, review gates, runtime promotion, generated artifacts, Home preview changes, or work on Yore, Glint, Dune, or Ink.

## Scope Completed

- Created the normalized Witch research packet under `docs/research/witch/`.
- Created the Witch evidence ledger and explicit source-role classification spanning the claim-bearing canon/dossier floor, support-only Commander/precon rows, and the shaping-only lore-compendium boundary.
- Preserved the three existing Witch draft inputs in place with discovery-only classification and recorded SHA-256 hashes.
- Added a concrete unsupported-claim audit for EDHREC-style counts, commander-rank language, house-rule commander claims, cEDH/Tymna-Thrasios claims, Atraxa-overfit, and Phyrexia-overreach so later cards have an explicit stop list.
- Added clear future-use notes for VM-265 through VM-269.

## Explicit Non-Goals

- Do not edit canon files in place.
- Do not create `docs/architecture/colors/witch/`.
- Do not create `data/raw-factions/witch/`.
- Do not create runtime keys, generated artifacts, aliases, routes, Home preview entries, or promotion work.
- Do not bundle any Yore, Glint, Dune, or Ink work into VM-264.

## Dependencies

- Depends on the VM-240 through VM-269 reservation lane remaining intact.
- First future Witch implementation card; no earlier Witch card dependency.

## Acceptance Criteria

- [x] A future execution pass creates the Witch source packet and evidence ledger only.
- [x] Shared four-color canon and Commander support inputs remain preserved as inputs.
- [x] No identity docs, raw packet, review gate, or runtime promotion work is bundled into VM-264.

## Files Changed

- `docs/research/witch/README.md`
- `docs/research/witch/witch-source-ledger.md`
- `docs/research/witch/witch-evidence-ledger.md`
- `docs/research/witch/witch-reliability-audit.md`
- `docs/research/witch/witch-manual-fill.md`
- `docs/research/witch/witch-research-dossier.md`
- `docs/research/witch/witch-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-1206-codex-vm264-witch-source-packet.md`

## Tests Run

- Verified `docs/research/witch/` ends with the exact expected 10-file state: 7 approved packet files plus 3 preserved unmanaged inputs.
- Rehashed the three preserved Witch inputs and recorded the SHA-256 values in `witch-source-ledger.md` and `witch-reliability-audit.md`.
- Validated that `docs/architecture/colors/witch/` and `data/raw-factions/witch/` do not exist.
- Verified the `Breed Lethality` / `Atraxa, Praetors' Voice` support record locally by content match across:
  - `docs/research/canon/misc/commander_deck_list.txt`
  - `docs/research/vox_mana_second_commander_recommendations_enhanced.jsonl`
  - `data/precons/vox-mana-precons.source.json`
  - `data/precons/vox-mana-precon-catalog.json`
- Ran a Witch packet reference validation that source IDs, evidence IDs, manual-fill IDs, dossier/lore references, and the 24 `GWUB` metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran scoped discovery-draft overclaim scans for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, public `GWUB` / `WUBG` alias risks, EDHREC/ranking language, house-rule commander language, cEDH/Tymna-Thrasios claims, and Phyrexia-overfit language.
- Ran scoped trailing-whitespace scans on the VM-264 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-264 bookkeeping files.

## Not Touched

- `docs/research/witch/GWUB Four-Color Identity Research.md`
- `docs/research/witch/the_systemic_altar.html`
- `docs/research/witch/witch-maw-research-packet.html`
- `docs/research/canon/**`
- `docs/architecture/colors/witch/`
- `data/raw-factions/witch/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, fixture, and identity-hero files
- VM-265 through VM-269 cards
- Yore, Glint, Dune, and Ink files

## Follow-Up Recommendations

- Start VM-265 as a separate prompt only after accepting VM-264.
- VM-265 should use the Witch packet as a guarded source floor and treat the unsupported-claim audit as a stop list rather than a source list.
- Preserve the naming distinction between Vox Mana's `WITCH` expression label and Commander 2016's `Growth` support/display alias.
- Keep `GWUB` canonical and keep `WUBG` plus all other same-color permutations metadata/query-only through every later Witch card.
- Keep Atraxa and Phyrexian texture bounded as support/context rather than collapsing the entire Witch lane into one commander or one plane.

## Next Suggested Agent

Documentation Steward for VM-265 Witch identity and metaphysics docs.
