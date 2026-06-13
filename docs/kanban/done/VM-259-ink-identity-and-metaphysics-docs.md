# VM-259 - Ink Identity And Metaphysics Docs

ID: VM-259
Title: Ink Identity And Metaphysics Docs
Status: done
Type: Documentation / Identity Architecture
Area: Four-Color, Ink, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Create the docs-only Ink identity and metaphysics architecture from the approved VM-258 packet while preserving non-live status, metadata/query-only RGWU/WURG/permutation boundaries, support-only `Altruism` / Kynaios and Tiro / `Stalwart Unity` texture, and clean stop gates ahead of VM-260 parity work.

## Scope Completed

- Created `docs/architecture/colors/ink/identity.md` and `metaphysics.md`.
- Based both documents on the approved VM-258 Ink packet and bounded manual-fill decisions only.
- Preserved Ink as non-live during this docs pass.
- Stopped before docs parity, raw packets, review, runtime, generated artifacts, route work, schema work, Maze work, or Home preview work.

## Explicit Non-Goals

- Do not author raw JSON, builder mappings, generated files, or runtime support.
- Do not treat Nephilim as institutions or faction authorities.
- Do not treat `Altruism`, Kynaios and Tiro, or `Stalwart Unity` as Ink naming authority.
- Do not bundle later Ink lane work into VM-259.

## Dependencies

- Depends on VM-258 completion.

## Acceptance Criteria

- [x] A future execution pass creates Ink identity and metaphysics docs only.
- [x] The docs stay evidence-bound to the approved Ink packet.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-259.

## Files Changed

- `docs/architecture/colors/ink/identity.md`
- `docs/architecture/colors/ink/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-259-ink-identity-and-metaphysics-docs.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0005-codex-vm259-ink-identity-metaphysics.md`

## Tests Run

- Re-ran AGENTS pre-flight review against handoff index, relevant Ink, Dune, Glint, and Yore handoffs, the Kanban board, VM-259 card, and the approved VM-258 Ink packet.
- Verified `docs/architecture/colors/ink/` did not exist before VM-259 and contains exactly `identity.md` and `metaphysics.md` after the pass.
- Verified `data/raw-factions/ink/` does not exist and was not created.
- Validated all cited `INK-EVID-###` references against `docs/research/ink/ink-evidence-ledger.md` and all cited `INK-MF-###` references against `docs/research/ink/ink-manual-fill.md`.
- Ran scoped scans for forbidden placeholder language, VM-260-only section families, future-phase implementation language, and route/alias leakage in the two Ink architecture docs.
- Ran scoped overclaim scans for official-name, official-faction, Ink-Treader institution, Kynaios naming authority, Commander-support-as-lore, discovery-draft-as-evidence, and public `RGWU` / `WURG` alias risks.
- Ran scoped trailing-whitespace scans on touched VM-259 files.
- Ran scoped `git diff --check` on tracked VM-259 bookkeeping files; it exited 0 with the repo's existing LF-to-CRLF warnings on touched tracked Markdown files.
- Skipped `npm test` and `npm run test:parser` because VM-259 touched only architecture docs and bookkeeping.

## Not Touched

- `docs/research/ink/**`
- `docs/research/canon/**`
- `data/raw-factions/ink/`
- `data/identity-layers.json`
- `data/factions.json`
- `data/placement-model.json`
- `data/placement-model.schema.json`
- Runtime files
- Generated artifacts
- Home preview membership
- Maze, route, Supabase, schema, fixture, and identity-hero files
- VM-260 through VM-263 cards
- Yore, Glint, Dune, and Witch files

## Follow-Up Recommendations

- Start VM-260 as a separate prompt only after accepting VM-259.
- VM-260 should own parity expansion: adjacent-identity boundaries, near-match separators, false-positive risks, descriptive placement guidance, and non-runtime search planning.
- Preserve `INK` as non-live and keep `RGWU`, `WURG`, `Altruism`, and all same-color permutations out of public alias/key exposure through VM-260.
- Keep the three unmanaged Ink drafts discovery-only unless a later explicit source pass independently promotes specific claims into approved packet rows.

## Next Suggested Agent

Documentation Steward for VM-260 Ink docs parity fill.
