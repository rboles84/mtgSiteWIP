# VM-253 - Dune Identity And Metaphysics Docs

ID: VM-253
Title: Dune Identity And Metaphysics Docs
Status: done
Type: Documentation / Identity Architecture
Area: Four-Color, Dune, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Create the docs-only Dune identity and metaphysics architecture from the approved VM-252 packet while preserving non-live status, metadata/query-only BRGW boundaries, support-only Saskia / `Open Hostility` texture, and clean stop gates ahead of VM-254 parity work.

## Scope Completed

- Create `docs/architecture/colors/dune/identity.md` and `metaphysics.md`.
- Base both documents on the approved Dune packet and bounded manual-fill decisions only.
- Preserve Dune as non-live during this docs pass.
- Stop before docs parity, raw packets, review, runtime, generated artifacts, or search/placement wiring.

## Explicit Non-Goals

- Do not author raw JSON, builder mappings, generated files, or runtime support.
- Do not treat Nephilim as institutions or faction authorities.
- Do not bundle later Dune lane work into VM-253.

## Dependencies

- Depends on VM-252 completion.

## Acceptance Criteria

- [x] A future execution pass creates Dune identity and metaphysics docs only.
- [x] The docs stay evidence-bound to the approved Dune packet.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-253.

## Files Changed

- `docs/architecture/colors/dune/identity.md`
- `docs/architecture/colors/dune/metaphysics.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-0736-codex-vm253-dune-identity-metaphysics.md`

## Tests Run

- Re-ran AGENTS pre-flight review against handoff index, relevant Dune, Yore, and Glint handoffs, the Kanban board, VM-253 through VM-257 cards, and the approved Dune packet.
- Verified `docs/architecture/colors/dune/` did not exist before VM-253 and contains exactly `identity.md` and `metaphysics.md` after the pass.
- Verified `data/raw-factions/dune/` does not exist and was not created.
- Rehashed every file under `docs/research/dune/` and confirmed the packet remains unchanged, including `dune-brood-research-packet.html` at `0B6608291A864EC0A2DCEC8B82BB13FCF4B3863D0716847312DC6C985E36B8F7`.
- Validated all cited `DUNE-EVID-###` references against `docs/research/dune/dune-evidence-ledger.md` and all cited `DUNE-MF-###` references against `docs/research/dune/dune-manual-fill.md`.
- Ran scoped overclaim scans for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, and public `BRGW` / `WBRG` / `Aggression` alias leakage risks.
- Ran scoped forbidden-scope scans for pair-overlap sections, separator sections, placement guidance, search-planning sections, raw/review/runtime/generated language, and public permutation exposure.
- Ran scoped trailing-whitespace scans on touched VM-253 files.
- Ran scoped `git diff --check` on tracked VM-253 bookkeeping files.

## Not Touched

- `docs/research/dune/`
- `docs/research/canon/**`
- `data/raw-factions/dune/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- `research/build-faction-artifacts.mjs`
- `research/build-archscry-flavor-snippets.mjs`
- `supabase/functions/guild-recruiter/faction-context.ts`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, fixture, and identity-hero files
- VM-254 through VM-257 cards
- Yore, Glint, Ink, and Witch files

## Follow-Up Recommendations

- Start VM-254 as a separate prompt only after accepting VM-253.
- VM-254 should own the full separator/parity layer: pair overlaps, adjacent identity boundaries, false-positive risks, placement guidance, and non-runtime search planning.
- Preserve `DUNE` as non-live and keep `BRGW`, `WBRG`, `Aggression`, and all same-color permutations out of public alias/key exposure through VM-254.
- Keep `Aggression` bounded as a support-source Commander 2016 theme reference unless a future source pass adds stronger official local capture.

## Next Suggested Agent

Documentation Steward for VM-254 Dune docs parity fill.
