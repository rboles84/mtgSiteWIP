# VM-258 - Ink Source Packet And Evidence Ledger

ID: VM-258
Title: Ink Source Packet And Evidence Ledger
Status: done
Type: Research / Source Packet
Area: Four-Color, Ink, Research
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Normalize the first Ink source packet and evidence ledger while keeping VM-258 source-only. This card does not authorize identity docs, raw packets, review gates, runtime promotion, generated artifacts, Home preview changes, or work on Yore, Glint, Dune, or Witch.

## Scope Completed

- Created the normalized Ink research packet under `docs/research/ink/`.
- Created the Ink evidence ledger and explicit source-role classification.
- Preserved the three existing Ink draft inputs in place with discovery-only classification and recorded SHA-256 hashes.
- Added a concrete unsupported-claim audit for the preserved drafts so later cards have an explicit stop list.
- Added clear future-use notes for VM-259 through VM-263.

## Explicit Non-Goals

- Do not edit canon files in place.
- Do not create `docs/architecture/colors/ink/`.
- Do not create `data/raw-factions/ink/`.
- Do not create runtime keys, generated artifacts, aliases, routes, Home preview entries, or promotion work.
- Do not bundle any Yore, Glint, Dune, or Witch work into VM-258.

## Dependencies

- Depends on the VM-240 through VM-269 reservation lane remaining intact.
- First future Ink implementation card; no earlier Ink card dependency.

## Acceptance Criteria

- [x] A future execution pass creates the Ink source packet and evidence ledger only.
- [x] Shared four-color canon and Commander support inputs remain preserved as inputs.
- [x] No identity docs, raw packet, review gate, or runtime promotion work is bundled into VM-258.

## Files Changed

- `docs/research/ink/README.md`
- `docs/research/ink/ink-source-ledger.md`
- `docs/research/ink/ink-evidence-ledger.md`
- `docs/research/ink/ink-reliability-audit.md`
- `docs/research/ink/ink-manual-fill.md`
- `docs/research/ink/ink-research-dossier.md`
- `docs/research/ink/ink-lore-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2236-codex-vm258-ink-source-packet.md`

## Tests Run

- Verified `docs/research/ink/` ends with the exact expected 10-file state: 7 approved packet files plus 3 preserved unmanaged inputs.
- Rehashed the three preserved Ink inputs and recorded the SHA-256 values in `ink-source-ledger.md` and `ink-reliability-audit.md`.
- Validated that `docs/architecture/colors/ink/` and `data/raw-factions/ink/` do not exist.
- Ran an Ink packet reference validation that source IDs, evidence IDs, manual-fill IDs, dossier/lore references, and the 24 RGWU metadata/query-only permutations resolve cleanly with no missing IDs or duplicate codes.
- Ran a scoped discovery-draft overclaim scan for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, and public RGWU/WURG alias risks.
- Ran scoped trailing-whitespace scans on the VM-258 research, Kanban, board, and handoff files.
- Ran scoped `git diff --check` on tracked VM-258 bookkeeping files.

## Not Touched

- `docs/research/ink/ink-deep-research-report.md`
- `docs/research/ink/ink-treader-research-packet.html`
- `docs/research/ink/ink_altruism_rgwu_research_report.md`
- `docs/research/canon/**`
- `docs/architecture/colors/ink/`
- `data/raw-factions/ink/`
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
- VM-259 through VM-263 cards
- Yore, Glint, Dune, and Witch files

## Follow-Up Recommendations

- Start VM-259 as a separate prompt only after accepting VM-258.
- VM-259 should use the Ink packet as a guarded source floor and treat the unsupported-claim audit as a stop list rather than a source list.
- Preserve the naming distinction between Vox Mana's `INK` expression label and Commander 2016's `Altruism` theme alias.
- Keep `RGWU`, `WURG`, and all same-color permutations metadata/query-only through every later Ink card.

## Next Suggested Agent

Documentation Steward for VM-259 Ink identity and metaphysics docs.
