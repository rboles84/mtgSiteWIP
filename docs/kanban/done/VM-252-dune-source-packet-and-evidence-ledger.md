# VM-252 - Dune Source Packet And Evidence Ledger

ID: VM-252
Title: Dune Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Four-Color, Dune, Research
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Normalize the first Dune source packet and evidence ledger while keeping VM-252 source-only. This card does not authorize identity docs, raw packets, review gates, runtime promotion, generated artifacts, Home preview changes, or work on Yore, Glint, Ink, or Witch.

## Scope Completed

- Created the normalized Dune research packet under `docs/research/dune/`.
- Created the Dune evidence ledger and explicit source-role classification.
- Preserved the existing Dune draft input in place with discovery-only classification and recorded SHA-256 hash.
- Added a concrete unsupported-claim audit for the discovery draft so later cards have an explicit stop list.
- Added clear future-use notes for VM-253 through VM-257.

## Explicit Non-Goals

- Do not edit canon files in place.
- Do not create `docs/architecture/colors/dune/`.
- Do not create `data/raw-factions/dune/`.
- Do not create runtime keys, generated artifacts, aliases, routes, Home preview entries, or promotion work.
- Do not bundle any Yore, Glint, Ink, or Witch work into VM-252.

## Dependencies

- Depends on the VM-240 through VM-269 reservation lane remaining intact.
- First future Dune implementation card; no earlier Dune card dependency.

## Acceptance Criteria

- [x] A future execution pass creates the Dune source packet and evidence ledger only.
- [x] Shared four-color canon and Commander support inputs remain preserved as inputs.
- [x] No identity docs, raw packet, review gate, or runtime promotion work is bundled into VM-252.

## Files Changed

- `docs/research/dune/README.md`
- `docs/research/dune/dune-source-ledger.md`
- `docs/research/dune/dune-evidence-ledger.md`
- `docs/research/dune/dune-reliability-audit.md`
- `docs/research/dune/dune-manual-fill.md`
- `docs/research/dune/dune-research-dossier.md`
- `docs/research/dune/dune-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-0655-codex-vm252-dune-source-packet.md`

## Tests Run

- Verified `docs/research/dune/` ends with the exact expected 8-file state: 7 approved packet files plus 1 preserved unmanaged input.
- Rehashed `docs/research/dune/dune-brood-research-packet.html` and recorded the unchanged SHA-256 value in `dune-source-ledger.md` and `dune-reliability-audit.md`.
- Validated that `docs/architecture/colors/dune/` and `data/raw-factions/dune/` do not exist.
- Ran a Dune packet reference validation that source IDs, evidence IDs, manual-fill IDs, dossier/lore references, and the 24 BRGW metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran a scoped discovery-draft overclaim scan for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, and public BRGW/WBRG alias risks.
- Ran scoped trailing-whitespace scans on the VM-252 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-252 bookkeeping files.

## Not Touched

- `docs/research/dune/dune-brood-research-packet.html`
- `docs/research/canon/**`
- `docs/architecture/colors/dune/`
- `data/raw-factions/dune/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `data/archscry-flavor-snippets.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, fixture, and identity-hero files
- VM-253 through VM-257 cards
- Yore, Glint, Ink, and Witch files

## Follow-Up Recommendations

- Start VM-253 as a separate prompt only after accepting VM-252.
- VM-253 should use the Dune packet as a guarded source floor and treat the unsupported-claim audit as a stop list rather than a source list.
- Preserve the naming distinction between Vox Mana's `DUNE` expression label and Commander 2016's `Aggression` theme alias.
- Keep `BRGW`, `WBRG`, and all same-color permutations metadata/query-only through every later Dune card.

## Next Suggested Agent

Documentation Steward for VM-253 Dune identity and metaphysics docs.
