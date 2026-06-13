# VM-246 - Glint Source Packet And Evidence Ledger

ID: VM-246
Title: Glint Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Four-Color, Glint, Research
Priority: high
Created: 2026-05-31
Completed: 2026-06-02

## Summary

Normalize the first Glint source packet and evidence ledger while keeping VM-246 source-only. This card does not authorize identity docs, raw packets, review gates, runtime promotion, generated artifacts, Home preview changes, or work on Yore, Dune, Ink, or Witch.

## Scope Completed

- Created the normalized Glint research packet under `docs/research/glint/`.
- Created the Glint evidence ledger and explicit source-role classification.
- Preserved the three existing Glint draft inputs in place with discovery-only classification and recorded hashes.
- Added clear future-use notes for VM-247 through VM-251.

## Explicit Non-Goals

- Do not edit canon files in place.
- Do not create `docs/architecture/colors/glint/`.
- Do not create `data/raw-factions/glint/`.
- Do not create runtime keys, generated artifacts, aliases, routes, Home preview entries, or promotion work.
- Do not bundle any Yore, Dune, Ink, or Witch work into VM-246.

## Dependencies

- Depends on the VM-240 through VM-269 reservation lane remaining intact.
- First future Glint implementation card; no earlier Glint card dependency.

## Acceptance Criteria

- [x] A future execution pass creates the Glint source packet and evidence ledger only.
- [x] Shared four-color canon and Commander support inputs remain preserved as inputs.
- [x] No identity docs, raw packet, review gate, or runtime promotion work is bundled into VM-246.

## Files Changed

- `docs/research/glint/README.md`
- `docs/research/glint/glint-source-ledger.md`
- `docs/research/glint/glint-evidence-ledger.md`
- `docs/research/glint/glint-reliability-audit.md`
- `docs/research/glint/glint-manual-fill.md`
- `docs/research/glint/glint-research-dossier.md`
- `docs/research/glint/glint-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-02-1825-codex-vm246-glint-source-packet.md`

## Tests Run

- Verified `docs/research/glint/` ends with the exact expected 10-file state: 7 approved packet files plus 3 preserved unmanaged inputs.
- Rehashed the three preserved unmanaged Glint inputs and recorded unchanged SHA-256 values in `glint-source-ledger.md`.
- Validated that `docs/architecture/colors/glint/` and `data/raw-factions/glint/` do not exist.
- Ran a Node validation that source IDs, evidence IDs, dossier/lore references, and the 24 UBRG metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran scoped trailing-whitespace scans on the VM-246 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-246 bookkeeping files.

## Not Touched

- `docs/research/canon/**`
- `docs/architecture/colors/glint/`
- `data/raw-factions/glint/`
- `data/identity-layers.json`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, and fixture files
- Yore, Dune, Ink, and Witch files

## Follow-Up Recommendations

- Start VM-247 as a separate prompt only after accepting VM-246.
- VM-247 should use the Glint packet as a guarded source floor and add stronger source verification before making detailed identity/metaphysics claims.
- Preserve the naming distinction between Vox Mana's `GLINT` expression label and Commander 2016's `Chaos` theme alias.
- Keep `UBRG` and all permutations metadata/query-only through every later Glint card.

## Next Suggested Agent

Documentation Steward for VM-247 Glint identity and metaphysics docs.
