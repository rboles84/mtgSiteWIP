# 2026-05-31 18:46 - Codex - VM-226 Mardu Raw-Faction Source Packet

## Agent Name

Codex acting as JSON Cartographer.

## Task Requested

Implement VM-226 only: create Mardu Horde's authored-but-not-live raw-faction source packet under `data/raw-factions/mardu/`, using VM-223 evidence rows as raw-claim evidence and VM-224/VM-225 architecture docs only as shaping-only context.

## Pre-Flight Summary

- Recent related work: VM-223 created the Mardu source/evidence/manual-fill packet, VM-224 created docs-only identity/metaphysics architecture, VM-225 added docs-only parity, and VM-212 established the current Sultai five-file raw-packet precedent.
- Current known risks: the worktree was already broadly dirty, including unrelated runtime/generated/data files, raw packets, architecture docs, research folders, Kanban cards, and handoffs. VM-226 needed to stay isolated to Mardu raw JSON plus Kanban/handoff bookkeeping.
- Relevant decisions already made: `MARDU` remains non-live; `RWB` and `WBR` remain metadata/query-only; Commander/operator rows are support-only; seed copies are discovery-only; Kolaghan and modern Dragonstorm material must stay timeline-labeled.
- Files recently changed before this pass include Mardu research and architecture docs through VM-225, Sultai raw/review work, Jeskai architecture work, and unrelated runtime/generated files.
- Do not touch: `docs/research/mardu/**`, `docs/architecture/colors/mardu/**`, existing raw packets, runtime files, generated files, Maze, routes, Home, schemas, Supabase, builders, fixtures, raw registries/build maps, aliases, promotion lists, or cross-lane files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1729-codex-vm223-mardu-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1753-codex-vm224-mardu-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1813-codex-vm225-mardu-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-1810-codex-vm212-sultai-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-manual-fill.md`
- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
- `data/raw-factions/sultai/*.json`
- `data/raw-factions/temur/*.json`

## Files Changed

- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`
- `docs/kanban/done/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added five Mardu raw-faction JSON files matching the Sultai/Temur top-level shape.
- Created exactly 10 contiguous raw claims, `mardu_claim_0001` through `mardu_claim_0010`.
- Bound raw claims only to promoted Mardu evidence rows plus allowed guardrail/lifecycle rows for boundary claims.
- Classified source records as `claim-bearing`, `shaping-only`, or `support-only`.
- Included VM-224 and VM-225 Mardu architecture docs only as `shaping-only` source records.
- Kept Commander/operator rows, manual-fill rows, seed files, direct `MARDU-SRC-###` rows, support-only evidence rows, synthesis rows, and architecture prose out of raw-claim evidence.
- Left `placement_axes` empty.
- Set non-live/review-gated status values: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, and `live_pilot: false`.
- Moved VM-226 from backlog to in progress, then to done after validation.

## Ten Claim Themes

- `mardu_claim_0001`: red-white-black Mardu Horde identity, future `MARDU` expression name, `RWB`/`WBR` metadata-only boundary, and non-live lifecycle.
- `mardu_claim_0002`: Red design center and speed as Mardu wedge attribute.
- `mardu_claim_0003`: Khans-era Horde culture, Edicts of Ilagra, war names, raiding society, and low-infrastructure war economy.
- `mardu_claim_0004`: Khans-era tactics, magic, roles, Zurgo, Wingthrone, Goldengrave, The Scour, and Screamreach.
- `mardu_claim_0005`: Fate Reforged/Alesha bridge and story-specific war-name support.
- `mardu_claim_0006`: Kolaghan clan as Dragons-era boundary and contrast, not Khans-era Mardu continuity.
- `mardu_claim_0007`: modern Dragonstorm-era Mardu revival, governance, culture, law, and civilian/military life.
- `mardu_claim_0008`: modern Dragonstorm-era belief, magic, clan dragons, dragonstorm mobility, and geography.
- `mardu_claim_0009`: color-pair and seed-file source hygiene boundary.
- `mardu_claim_0010`: generic color-code, Kolaghan, Dragonstorm backfill, seed, and lifecycle false-positive boundary.

## Why It Changed

VM-226 creates the source-data airlock that VM-227 can review without wiring Mardu, RWB, or WBR into runtime, generated, placement, builder, fixture, route, Home, Maze, schema, Supabase, alias, raw registry, build-map, or promotion-list surfaces.

## Decisions Made

- Preserved the established five-file raw packet shape and top-level key pattern.
- Used `mardu_claim_0001`-style raw claim IDs to match the accepted raw packet family.
- Kept `MARDU-EVID-###` rows as evidence references only.
- Used only claim-bearing sources in raw claims.
- Used guardrail rows only for boundary, false-positive, source-role, or non-live lifecycle claims.
- Excluded `MARDU-EVID-027`, `MARDU-EVID-028`, and `MARDU-EVID-031` from raw claims because they are support-only or Vox Mana synthesis.
- Excluded all `MARDU-MF-###`, `MARDU-CMD-###`, and `MARDU-SRC-###` identifiers from raw-claim evidence.
- Kept VM-224/VM-225 architecture docs as shaping-only source records and out of claim evidence.
- Kept `RWB` and `WBR` metadata/query-only.
- Recorded VM-226 as source-authored, review-gated, non-live, and generated from no runtime builder.

## Source-Role Policy

- Raw claims may cite only sources whose `source_role` is `claim-bearing`.
- Boundary claims may use allowed VM-223 guardrail/lifecycle evidence rows only when the claim is itself a boundary, false-positive, source-role, or non-live lifecycle claim.
- Architecture docs, research dossiers, reliability audits, lore packets, source-selection audits, manual-fill queues, Commander/operator data, seed artifacts, and generated reports may not serve as raw-claim evidence in VM-226.
- Architecture docs appear only in `mardu.sources.json` with `source_role: shaping-only`.
- Commander/operator material appears only as support-only vocabulary and does not prove Mardu canon, setting, Commander legality, or placement readiness.

## Risks / Uncertainties

- The worktree was already broadly dirty/untracked before VM-226, including unrelated runtime/generated tracked files and Abzan/Temur/Sultai/Jeskai/Mardu docs and raw folders.
- Exact raid/dash/mobilize card facts, full Alesha/Zurgo biographies, detailed named figures, exact Dragonstorm chronology, and Commander legality remain deferred.
- VM-226 does not make Mardu placement-ready or preview-ready; VM-227 must review this raw packet before any VM-228 controlled promotion planning.

## Tests Run

- VM-226 hard-stop checks confirmed the card existed in Backlog, was not already In Progress or Done, VM-225 was Done, required Mardu packet/docs existed, and `data/raw-factions/mardu` did not exist before authoring.
- Evidence role check confirmed `MARDU-EVID-027` and `MARDU-EVID-028` are support-only and `MARDU-EVID-031` is Vox Mana synthesis.
- Shape discovery confirmed the Sultai five-file top-level keys for sources, claims, profile, placement, and changelog.
- File-set and JSON parse check confirmed exactly five Mardu raw JSON files.
- Top-level key comparison against the Sultai packet passed for all five files.
- Claim-count and ID validation confirmed exactly 10 raw claims with contiguous IDs `mardu_claim_0001` through `mardu_claim_0010`.
- Evidence-row policy validation confirmed every cited `MARDU-EVID-###` row exists in the VM-223 evidence ledger; support-only and Vox Mana synthesis rows are absent from raw claims; guardrail rows are used only in boundary/lifecycle claims.
- Source-role resolver confirmed every raw-claim source has `source_role: claim-bearing`, and all source records use only `claim-bearing`, `shaping-only`, or `support-only`.
- Profile and placement claim-reference validation confirmed all referenced `mardu_claim_####` IDs are subsets of the 10 raw claims.
- Blocked raw-claim token scan confirmed no `MARDU-EVID-027`, `MARDU-EVID-028`, `MARDU-EVID-031`, `MARDU-CMD-`, `MARDU-MF-`, or `MARDU-SRC-` tokens appear in `mardu.claims.json`.
- Raw packet leakage scan found no `RAW_TO_KEY`, `placement_key`, route-map, alias-map, promotion-list, Home preview, Maze, Supabase, `preview_eligible: true`, `placement_eligible: true`, or `live_pilot: true` markers.
- Scoped forbidden-path diff check for `docs/research/mardu`, `docs/architecture/colors/mardu`, and existing raw-faction packets produced no output.
- Board check confirmed VM-226 is Done, VM-227/VM-228 remain Backlog, and no card is currently In Progress.
- Scoped `git diff --check` and trailing-whitespace scans passed for VM-226 touched files.

Skipped:

- `npm test`, because VM-226 is source-authored raw data only and no runtime/parser files were intentionally changed.
- `npm run test:parser`, because parser behavior did not change.
- Builders and generation scripts, per VM-226 hard stop.

## Not Touched

- `docs/research/mardu/**`
- `docs/architecture/colors/mardu/**`
- Existing raw-faction packets
- Runtime files
- Generated artifacts
- Schemas
- Supabase files
- Maze files
- Home files
- Route files
- Fixtures
- Builders
- Raw registries/build maps
- Alias maps
- Promotion lists
- Tests
- VM-227 and VM-228 implementation
- Staging or commits

## Follow-Up Recommendations

- VM-227 should review the VM-226 raw packet before any promotion planning.
- VM-227 should re-run the source-role resolver, evidence-row lookup, non-live status checks, and leakage scans before approving or requesting corrections.
- VM-228 should remain blocked until VM-227 explicitly approves the raw packet for controlled runtime promotion planning.

## Next Suggested Agent

JSON Cartographer or Test Strategist for VM-227 Mardu Horde Raw Packet Review Gate.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/kanban/done/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/kanban/done/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/kanban/done/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `docs/research/mardu/mardu-source-ledger.md`
- `docs/research/mardu/mardu-manual-fill.md`
- `docs/architecture/colors/mardu/identity.md`
- `docs/architecture/colors/mardu/metaphysics.md`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`

## Explicit Final Scope Confirmation

VM-226 created an authored-but-not-live raw packet only. It did not approve Mardu for placement, preview, generation, runtime, or promotion; VM-227 remains the required review gate.
