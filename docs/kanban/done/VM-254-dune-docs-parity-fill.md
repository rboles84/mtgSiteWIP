# VM-254 - Dune Docs Parity Fill

ID: VM-254
Title: Dune Docs Parity Fill
Status: done
Type: Documentation / Parity
Area: Four-Color, Dune, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Bring the existing Dune docs-only architecture layer up to the current shard, wedge, and four-color parity standard while preserving non-live `DUNE`, keeping `BRGW` canonical, keeping `Aggression` paired-framing support-only, and leaving the VM-252 Dune research packet unchanged.

## Scope Completed

- Expand `docs/architecture/colors/dune/identity.md` with pair-overlap boundaries, near-match separators, support-only Commander/operator anchors, false-positive risks, prose-only system mapping, non-runtime identity signals, descriptive placement guidance, and editorial search-planning shapes.
- Expand `docs/architecture/colors/dune/metaphysics.md` with bounded structural/mechanical support texture, ludological matrix mapping, matrix implications, and parity boundary notes.
- Preserve the VM-252 evidence floor, the VM-253 core interpretation, non-live `DUNE`, canonical `BRGW`, and paired-framing-only `Aggression` boundaries.
- Carry the `DUNE-MF-011` / `DUNE-MF-012` adjacent-separator drift as an architecture-only workaround by using plain `Manual fill required` language instead of unstable numeric citation.
- Stop before raw packets, review, runtime, generated artifacts, routing, schema, or implementation guidance.

## Explicit Non-Goals

- Do not author raw JSON or runtime mappings.
- Do not treat support commanders as lore proof.
- Do not bundle later Dune lane work into VM-254.
- Do not repair `docs/research/dune/**` packet drift in this card.
- Do not introduce raw-claim readiness, review approval, placement eligibility, preview eligibility, runtime registration, or generated-output readiness language.

## Dependencies

- Depends on VM-252 and VM-253 completion.

## Acceptance Criteria

- [x] Dune docs parity is filled in architecture docs only.
- [x] Commander support rows remain support-only.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-254.
- [x] `data/raw-factions/dune/` is not created.
- [x] `docs/research/dune/` remains unchanged.
- [x] VM-254 handoff and board bookkeeping are completed.

## Files Changed

- `docs/architecture/colors/dune/identity.md`
- `docs/architecture/colors/dune/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-254-dune-docs-parity-fill.md`
- `docs/handoffs/2026-06-03-1226-codex-vm254-dune-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, four-color reservation handoff, VM-252 and VM-253 Dune handoffs, VM-242 and VM-248 parity handoffs, the board, VM-254 through VM-257 cards, the Dune packet, and the current Dune architecture docs.
- Verified `docs/architecture/colors/dune/` still contains exactly `identity.md` and `metaphysics.md`.
- Verified `data/raw-factions/dune/` does not exist and was not created.
- Rehashed every file under `docs/research/dune/` and confirmed the packet remains unchanged, including `dune-brood-research-packet.html` at `0B6608291A864EC0A2DCEC8B82BB13FCF4B3863D0716847312DC6C985E36B8F7`.
- Validated all cited `DUNE-EVID-###` references against `docs/research/dune/dune-evidence-ledger.md` and all cited non-ambiguous `DUNE-MF-###` references against `docs/research/dune/dune-manual-fill.md`.
- Ran required-heading scans for the new VM-254 parity sections in both Dune docs.
- Ran scoped overclaim scans for official-name, official-faction, Nephilim-as-institution, Commander-support-as-lore, discovery-draft-as-canon, public `BRGW` / `WBRG` / permutation alias leakage, and public `Aggression` alias leakage.
- Ran scoped forbidden-drift scans for raw packet language, review verdict language, runtime promotion language, score weights, thresholds, routing rules, JSON-like fields, fixture keys, generated keys, public alias/key exposure, and raw-claim-readiness language.
- Ran a targeted scan to confirm the architecture docs no longer misuse `DUNE-MF-011` for adjacent separators.
- Ran scoped trailing-whitespace scans on touched VM-254 files.
- Ran scoped `git diff --check` on tracked VM-254 files.

## Not Touched

- `docs/research/dune/`
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
- Maze, route, Home preview, Supabase, schema, and fixture files
- VM-255 through VM-257 cards
- Yore, Glint, Ink, and Witch files

## Follow-Up Recommendations

- Start VM-255 as a separate raw-packet prompt only after accepting VM-254.
- Treat VM-254 separator prose, system mapping, placement guidance, and search-planning shapes as architecture guidance only until a raw review explicitly promotes any claim.
- Preserve `DUNE` as non-live and keep `BRGW`, `WBRG`, `Aggression`, and all same-color permutations out of public alias/key exposure through VM-255 and VM-256.
- Carry the `DUNE-MF-011` / `DUNE-MF-012` packet drift forward only as a packet-follow-up concern; do not retroactively treat VM-254 architecture prose as a packet repair.

## Next Suggested Agent

JSON Cartographer for VM-255 Dune non-live raw packet, with Documentation Steward review before any raw packet becomes promotion-eligible.
