# VM-261 Ink Non-Live Raw Packet Handoff

Agent name: Codex
Task requested: Implement VM-261 as a non-live Ink raw-packet pass from approved VM-258 evidence and bounded VM-259/VM-260 shaping context.
Related Kanban card: `VM-261 - Ink Non-Live Raw Packet`
Status: Complete

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-03-2236-codex-vm258-ink-source-packet.md`
- `docs/handoffs/2026-06-04-0005-codex-vm259-ink-identity-metaphysics.md`
- `docs/handoffs/2026-06-04-0705-codex-vm260-ink-docs-parity-fill.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-261-ink-non-live-raw-packet.md`
- `docs/research/ink/ink-source-ledger.md`
- `docs/research/ink/ink-evidence-ledger.md`
- `docs/research/ink/ink-reliability-audit.md`
- `docs/research/ink/ink-manual-fill.md`
- `docs/architecture/colors/ink/identity.md`
- `docs/architecture/colors/ink/metaphysics.md`
- `data/raw-factions/yore/*.json`
- `data/raw-factions/glint/*.json`
- `data/raw-factions/dune/*.json`
- `docs/kanban/done/VM-243-yore-non-live-raw-packet.md`
- `docs/kanban/done/VM-249-glint-non-live-raw-packet.md`
- `docs/kanban/done/VM-255-dune-non-live-raw-packet.md`

## Files Changed

- `data/raw-factions/ink/ink.sources.json`
- `data/raw-factions/ink/ink.claims.json`
- `data/raw-factions/ink/ink.profile.json`
- `data/raw-factions/ink/ink.placement.json`
- `data/raw-factions/ink/ink.changelog.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-261-ink-non-live-raw-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-06-04-0754-codex-vm261-ink-non-live-raw-packet.md`

## What Changed

- Created the exact five-file Ink raw packet under `data/raw-factions/ink/`.
- Added exactly five conservative raw claims from approved VM-258 claim-bearing evidence rows.
- Preserved `INK` as review-gated and non-live.
- Preserved `RGWU`, `WURG`, and all same-color permutations as metadata-query-only.
- Preserved `Altruism` as display/support framing only.
- Listed unmanaged Ink drafts only as quarantine traceability records without source IDs.
- Moved VM-261 from backlog to done and updated the board.
- Added this handoff and indexed it.

## Why It Changed

VM-261 is the next Ink card after VM-258 source, VM-259 core docs, and VM-260 parity docs. The pass creates a source-grounded raw packet for VM-262 review without promoting Ink, touching generated/runtime surfaces, or converting architecture/support/discovery material into raw proof.

## Decisions Made

- Followed the five-file raw packet contract used by Yore, Glint, and Dune.
- Used only `INK-EVID-001`, `INK-EVID-002`, `INK-EVID-003`, `INK-EVID-004`, `INK-EVID-007`, and `INK-EVID-010` for raw claims.
- Excluded `INK-EVID-005`, `INK-EVID-006`, `INK-EVID-008`, `INK-EVID-009`, all `INK-MF-###` rows, VM-259/VM-260 architecture prose, Commander/precon rows, support-only rows, synthesis rows, and unmanaged drafts from raw-claim proof.
- Used `quarantine_id` rather than `source_id` for unmanaged discovery drafts so raw claims cannot cite them.
- Kept `ink.profile.json` and `ink.placement.json` explicitly review-gated and non-live.
- Did not repair the `INK-MF-010` / `INK-MF-011` drift in VM-258 packet files.

## Risks / Uncertainties

- Four-color canon remains thin, so raw claims remain intentionally conservative.
- The three unmanaged Ink drafts remain source-laundering risks; this pass quarantines them but does not audit or promote their claims.
- `INK-MF-010` / `INK-MF-011` drift remains unresolved in VM-258 packet files.
- Worktree remains broadly dirty from unrelated prior work; VM-261 did not clean or repair unrelated changes.
- The allowed-surface list did not explicitly name the backlog card, but moving VM-261 through normal Kanban status required removing the old backlog card after creating the done card.

## Tests Run

- Confirmed `VM-261` was in backlog and VM-258 through VM-260 were done before editing.
- Confirmed `data/raw-factions/ink/` did not exist before editing.
- Confirmed `docs/architecture/colors/ink/` contained exactly `identity.md` and `metaphysics.md`.
- Validated exact five-file set under `data/raw-factions/ink/`.
- Parsed all five Ink raw JSON files.
- Compared top-level JSON shape against Yore, Glint, and Dune raw packet contracts.
- Validated schema/version/faction/date fields across all five files.
- Validated exact claim IDs and claim count.
- Resolved every cited `INK-EVID-###` against `docs/research/ink/ink-evidence-ledger.md`.
- Confirmed every raw-claim source ID maps to a `claim-bearing` source record.
- Confirmed no `INK-MF`, architecture, Commander/precon, support-only, shaping-only, synthesis-only, manual-fill, or discovery-only source IDs appear in claim proof-bearing fields.
- Validated RGWU permutation metadata-query-only coverage.
- Diff-checked `docs/research/ink/**` and `docs/architecture/colors/ink/**`; no tracked diffs were produced by VM-261.
- Ran scoped overclaim scans for official-name/faction drift, Altruism-as-public-alias drift, Ink-Treader institution drift, Commander-as-lore drift, discovery-draft evidence drift, review-approved/self-approval language, and promotion-ready language.
- Ran scoped trailing-whitespace and JSON formatting checks on new raw JSON and bookkeeping files.
- Ran scoped `git diff --check` on tracked VM-261 bookkeeping files; it exited 0 with the repo's existing LF-to-CRLF warnings on touched tracked Markdown files.
- Skipped `npm test` and `npm run test:parser` because VM-261 touched no runtime/generated surfaces.

## Not Touched

- `docs/research/ink/**`
- `docs/architecture/colors/ink/**`
- `docs/research/canon/**`
- Runtime files
- Generated artifacts
- Schemas
- Route files
- CSS/JS
- Supabase files
- Maze and Home preview surfaces
- VM-262 and VM-263 cards
- Unrelated dirty files

## Follow-Up Recommendations

- Run VM-262 as a separate review gate before any promotion planning.
- VM-262 should verify raw packet hashes, source roles, excluded materials, non-live status, and metadata-query-only permutations.
- Preserve `INK` as non-live until VM-262 approval and an explicit VM-263 promotion pass.
- Keep `Altruism`, Kynaios and Tiro, `Stalwart Unity`, `RGWU`, `WURG`, and every same-color permutation out of public naming authority.

## Next Suggested Agent

JSON Cartographer / Test Strategist for VM-262 Ink review gate.
