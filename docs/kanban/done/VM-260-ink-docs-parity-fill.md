# VM-260 - Ink Docs Parity Fill

ID: VM-260
Title: Ink Docs Parity Fill
Status: done
Type: Documentation / Parity
Area: Four-Color, Ink, Architecture
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Bring the existing Ink docs-only architecture layer up to the current four-color parity standard while preserving non-live `INK`, keeping `RGWU`, `WURG`, and permutations metadata-query-only, keeping `Altruism` paired/support framing only, and leaving the VM-258 Ink packet unchanged.

## Scope Completed

- Expanded `docs/architecture/colors/ink/identity.md` with pair-overlap boundaries, near-match separators, support-only Commander anchors, false-positive risks, docs-only system mapping, editorial identity signals, descriptive placement guidance, and editorial search-planning shapes.
- Expanded `docs/architecture/colors/ink/metaphysics.md` with bounded structural/mechanical support texture, ludological matrix mapping, matrix implications, parity boundary notes, canon boundary, manual-fill notes, source boundary, and summary.
- Preserved the VM-258 evidence floor, the VM-259 core interpretation, non-live `INK`, metadata-query-only `RGWU` / `WURG` / permutation boundaries, and support-only `Altruism` / Kynaios and Tiro / `Stalwart Unity` boundaries.
- Carried the `INK-MF-010` / `INK-MF-011` packet drift as a handoff risk and used `ink-manual-fill.md` as the manual-fill authority.
- Stopped before raw packets, review, runtime, generated artifacts, routing, schema, tests, or implementation guidance.

## Explicit Non-Goals

- Do not author raw JSON or runtime mappings.
- Do not treat support commanders as lore proof.
- Do not bundle later Ink lane work into VM-260.
- Do not repair `docs/research/ink/**` packet drift in this card.
- Do not introduce raw readiness, review approval, placement eligibility, generated-output readiness, runtime readiness, score weights, thresholds, query builders, packet fields, runtime keys, generated data fields, fixtures, tests, route files, or schema work.

## Dependencies

- Depends on VM-258 and VM-259 completion.

## Acceptance Criteria

- [x] A future execution pass fills Ink docs parity only.
- [x] Commander support rows remain support-only.
- [x] No raw packet, review gate, or runtime promotion work is bundled into VM-260.
- [x] `data/raw-factions/ink/` is not created.
- [x] `docs/research/ink/**` remains unchanged.
- [x] VM-260 handoff and board bookkeeping are completed.

## Files Changed

- `docs/architecture/colors/ink/identity.md`
- `docs/architecture/colors/ink/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-260-ink-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0705-codex-vm260-ink-docs-parity-fill.md`

## Tests Run

- Re-ran AGENTS pre-flight review against the handoff index, VM-258 and VM-259 handoffs, VM-248 and VM-254 parity precedents, the board, the VM-260 card, the current Ink architecture docs, and the VM-258 Ink packet.
- Confirmed before editing that `VM-260` was in backlog, `VM-258` and `VM-259` were done, `docs/architecture/colors/ink/` contained exactly `identity.md` and `metaphysics.md`, and `data/raw-factions/ink/` did not exist.
- Ran pre-edit and post-edit scoped `git diff -- docs/research/ink` checks; both produced no tracked research diff.
- Validated all cited `INK-EVID-###` references against `docs/research/ink/ink-evidence-ledger.md` and all cited `INK-MF-###` references against `docs/research/ink/ink-manual-fill.md`.
- Ran required-heading scans for the new VM-260 parity sections in both Ink docs.
- Ran scoped overclaim scans for official-name, official-faction, Altruism-as-co-equal-name, Ink-Treader-as-institution, Kynaios-as-naming-authority, Commander-support-as-lore, discovery-draft-as-evidence, public `RGWU` / `WURG` alias risks, and Dune/Witch status implications.
- Ran scoped forbidden-drift scans for raw readiness, review approval, placement eligibility, generated output, runtime promotion, score weights, thresholds, query builders, packet fields, runtime keys, generated fields, fixtures, tests, route/schema language, Maze/Home work, and VM-261+ instructions.
- Ran scoped placeholder scans for `TODO`, `TBD`, placeholder, stub, and future-work sections.
- Ran scoped trailing-whitespace scans on touched VM-260 files.
- Ran scoped `git diff --check` on tracked VM-260 bookkeeping files; it exited 0 with the repo's existing LF-to-CRLF warnings on touched tracked Markdown files.
- Skipped `npm test` and `npm run test:parser` because VM-260 touched only architecture docs and bookkeeping.

## Not Touched

- `docs/research/ink/**`
- `docs/research/canon/**`
- `data/raw-factions/ink/`
- Raw JSON files
- Runtime files
- Generated artifacts
- Schemas
- Route files
- CSS/JS
- Supabase files
- Maze and Home preview surfaces
- VM-261 through VM-263 cards
- Unrelated dirty files

## Follow-Up Recommendations

- Start VM-261 as a separate raw-packet prompt only after accepting VM-260.
- VM-261 should treat VM-260 separator prose, support anchors, placement guidance, and search-planning shapes as architecture guidance only until source-bound claims are explicitly selected.
- Preserve `INK` as non-live and keep `RGWU`, `WURG`, `Altruism`, and all same-color permutations out of public alias/key exposure through VM-261 and VM-262.
- Carry the `INK-MF-010` / `INK-MF-011` packet drift forward only as a packet-follow-up concern; do not retroactively treat VM-260 architecture prose as a packet repair.

## Next Suggested Agent

JSON Cartographer for VM-261 Ink non-live raw packet, with Documentation Steward review before any raw packet becomes promotion-eligible.
