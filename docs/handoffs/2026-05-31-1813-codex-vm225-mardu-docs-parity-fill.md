# 2026-05-31 18:13 - Codex - VM-225 Mardu Docs Parity Fill

## Agent Name

Codex acting as Documentation Steward.

## Task Requested

Implement VM-225 as a docs-only Mardu Horde parity pass: extend the accepted VM-224 architecture with pair overlaps, wedge separators, support-only Commander anchors, false-positive boundaries, prose-only placement guidance, and non-runtime search planning, using only VM-223 packet IDs.

## Pre-Flight Summary

- Recent related work: VM-223 normalized the Mardu source/evidence/manual-fill packet, and VM-224 created Mardu identity and metaphysics architecture while keeping `MARDU` non-live and `RWB` / `WBR` metadata/query-only.
- Current known risks: the worktree is broadly dirty from unrelated Abzan, Temur, Sultai, Jeskai, runtime, generated, raw, and research work. VM-225 had to stay isolated to Mardu architecture plus Kanban/handoff bookkeeping.
- Relevant decisions already made: Commander/operator rows are `support-only`; seed copies are discovery-only; `MARDU` is future docs/public expression only; `RWB` and `WBR` remain metadata/query-only; Kolaghan and Dragonstorm material must stay timeline-bounded.
- Files recently changed by related work include Mardu research packet files, Mardu identity/metaphysics docs, Sultai raw packet work, and Jeskai source packet work.
- Do not touch: `docs/research/mardu/**`, raw-faction data, runtime/generated files, Maze, routes, Home, schemas, Supabase, builders, placement fixtures, Abzan/Temur/Sultai/Jeskai architecture, or shared architecture.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1729-codex-vm223-mardu-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1753-codex-vm224-mardu-identity-metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-manual-fill.md`
- `docs/research/mardu/mardu-reliability-audit.md`
- `docs/research/mardu/mardu-research-dossier.md`
- `docs/research/mardu/mardu-lore-source-packet.md`

## Files Changed

- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1813-codex-vm225-mardu-docs-parity-fill.md`

## What Changed

- Added VM-225 docs-only parity sections to `identity.md`: `Pair-Overlap Boundaries`, `Wedge Separators`, `Commander And Archetype Anchors`, `False Positive Risks`, `Placement Guidance`, and `Non-runtime Search Planning Shapes`.
- Marked Commander/operator rows `MARDU-CMD-001` through `MARDU-CMD-008` as support-only texture and not as sources for lore, legality, decklist, raw, or placement-scoring claims.
- Updated `metaphysics.md` only for consistency, clarifying that raw/runtime use of VM-225 parity remains future-gated.
- Moved VM-225 Backlog -> In Progress -> Done in Kanban and updated `docs/kanban/board.md`.
- Added this handoff and indexed it.

## Why It Changed

VM-225 needed to bring Mardu to the same docs-only parity layer used by earlier clan lanes before any raw-faction packet authoring. The new sections give future VM-226 work bounded guidance without promoting Mardu into runtime, generated data, aliases, placement scoring, or raw JSON.

## Decisions Made

- Pair-overlap and wedge-separator prose stays documentation-only and evidence-cited.
- `MARDU-CMD-###` rows remain player-facing/operator texture only.
- Placement guidance is prose-only: no scores, weights, thresholds, fixtures, generated behavior, or test data.
- Search planning shapes are descriptive docs-only examples, not schema, aliases, route keys, generated data, or raw JSON.
- Mardu remains non-live after VM-225.

## Risks / Uncertainties

- Exact raid, dash, and mobilize rules remain `Manual fill required`.
- Full Alesha, Zurgo, Vial Smasher, Zurgo Stormrender, generals, stormsingers, and Dragonstorm chronology remain manual-fill unless later packet work adds direct evidence.
- The broader worktree remains dirty with unrelated changes. VM-225 did not attempt to clean, repair, or revert them.

## Tests Run

- Kanban state checks for VM-225 Done, VM-226 through VM-228 Backlog, and no Mardu VM-223 through VM-228 card In Progress.
- Required-section scan for pair overlaps, wedge separators, Commander anchors, false-positive risks, placement guidance, and non-runtime search planning.
- Required-term scan for `MARDU`, `RWB`, `WBR`, `Red-centered`, `Vox Mana synthesis`, `Manual fill required`, `support-only`, `metadata/query-only`, `non-live`, and adjacent clan/pair boundary terms.
- Reference-resolution scan: 48 architecture references checked against 50 VM-223 packet definitions; missing references: none.
- Guard scan for direct source-material proof citations: none found.
- Guard scan for `MARDU-CMD-###` proof/canon/lore/raw-claim language: none found.
- Folder guard confirmed `docs/architecture/colors/mardu/` contains only `identity.md` and `metaphysics.md`.
- Path guard confirmed `data/raw-factions/mardu` remains absent.
- `git diff --name-only -- docs/research/mardu` returned no tracked research-packet edits.
- Targeted status for VM-225 touched files returned only Mardu architecture, VM-225 Kanban, board, handoff, and handoff-index paths.
- Broader forbidden-path diff still reports pre-existing dirty `assets/js/*` and `data/*.json` files from earlier worktree state; VM-225 left those files untouched.
- Scoped `git diff --check` and trailing-whitespace scan on VM-225 touched files.
- Skipped `npm test` and `npm run test:parser` because VM-225 touched docs/Kanban/handoff files only.

## Not Touched

- `docs/research/mardu/**`
- `data/raw-factions/mardu`
- Runtime files
- Generated files
- Maze files
- Route files
- Home preview files
- Schema files
- Supabase files
- Builder files
- Placement fixtures
- Abzan, Temur, Sultai, Jeskai, and shared architecture docs

## Follow-Up Recommendations

- Next Mardu work is VM-226, authored-but-not-live raw-faction source packet authoring from accepted VM-223 evidence plus VM-224/VM-225 architecture.
- VM-226 should recompute current runtime baseline and keep `MARDU` non-live until a later review gate approves promotion planning.
- Continue treating Commander rows as support-only and mechanics/figure chronology as manual-fill unless directly resolved by local accepted sources.

## Next Suggested Agent

JSON Cartographer for VM-226, after AGENTS.md pre-flight and Kanban move.

## Related Kanban Card, Docs, Or Plans

- VM-225 - Mardu Horde Docs Parity Fill
- VM-223 - Mardu Horde Source Packet And Evidence Ledger
- VM-224 - Mardu Horde Identity And Metaphysics
- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`

## Explicit Final Scope Confirmation

Mardu remains non-live after VM-225. VM-225 did not change raw-faction data, runtime files, generated files, Maze files, route files, Home preview files, schemas, Supabase files, builders, placement fixtures, shared architecture, or cross-lane architecture files.
