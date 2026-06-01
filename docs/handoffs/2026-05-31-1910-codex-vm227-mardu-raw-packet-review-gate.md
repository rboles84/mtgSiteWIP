# 2026-05-31 19:10 - Codex - VM-227 Mardu Raw Packet Review Gate

## Agent Name

Codex acting as JSON Cartographer and Test Strategist.

## Task Requested

Implement VM-227 as a review-only gate for the VM-226 Mardu Horde authored-but-not-live raw packet. Review without editing, repairing, formatting, regenerating, building, or promoting the raw JSON. Record one of the requested verdicts and keep VM-228 blocked unless the packet is approved for future promotion planning.

## Review Result

Status: `review-blocked-repair-required`

The VM-226 raw packet passed the structural, source-role, evidence-resolution, support-only exclusion, claim-reference, leakage, and hash-immutability checks, but it failed the required non-live status marker check because `not_placement_eligible` is absent from the Mardu raw JSON packet.

This is a JSON/status repair issue. It is not a `review-blocked-evidence-gap` result because every reviewed `MARDU-EVID-###` row resolved to VM-223 and the exact expected evidence mapping passed.

## Repair List

- Add the required `not_placement_eligible` non-live status marker to the Mardu raw packet using the Sultai/Temur raw-packet precedent and VM-226 intent, without changing evidence mappings or promoting Mardu.
- After repair, rerun VM-227-style review checks before VM-228 promotion planning.

## Pre-Flight Summary

Recent related work:

- VM-223 created the accepted Mardu source/evidence/manual-fill packet.
- VM-224 created Mardu identity and metaphysics architecture while keeping `MARDU` non-live and `RWB`/`WBR` metadata/query-only.
- VM-225 added docs-only parity, pair overlaps, wedge separators, support-only Commander anchors, false-positive boundaries, and prose-only placement guidance.
- VM-226 created the five-file Mardu authored-but-not-live raw packet.
- VM-213 provided the closest Sultai review-gate precedent.

Current known risks:

- The worktree was already broadly dirty, including tracked runtime/generated/data files and untracked Abzan, Temur, Sultai, Jeskai, and Mardu docs/raw/research/Kanban/handoff paths.
- `data/raw-factions/mardu/` is untracked in this worktree, so before/after SHA-256 hashes are the primary proof that VM-227 did not mutate raw JSON.
- Concurrent board state shows unrelated VM-214 and VM-232 work in progress; VM-227 preserved those entries.

Relevant decisions already made:

- `MARDU` remains non-live.
- `RWB` and `WBR` remain metadata/query-only.
- Commander/operator rows are support-only and cannot prove lore, legality, exact decklists, raw claims, placement scoring, or runtime readiness.
- VM-224/VM-225 architecture docs are shaping-only for raw authoring and are not raw-claim evidence.
- VM-228 must not start unless a review gate records `review-approved-for-future-promotion-planning`.

Files recently changed before or outside this task:

- Mardu research packet files from VM-223.
- Mardu architecture docs from VM-224 and VM-225.
- Mardu raw JSON files from VM-226.
- Sultai, Jeskai, Abzan, Temur, runtime, generated, and raw/data paths in the broader dirty worktree.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` were already modified before this task.

What should not be touched:

- `data/raw-factions/mardu/*.json`
- `docs/research/mardu/**`
- `docs/architecture/colors/mardu/**`
- Runtime files
- Generated artifacts
- Schemas
- Maze files
- Route files
- Home preview files
- Supabase files
- Builders
- Placement fixtures
- Raw registries/build maps
- Alias maps
- Promotion lists
- Abzan, Temur, Sultai, Jeskai, and shared architecture files

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1729-codex-vm223-mardu-source-packet-evidence-ledger.md`
- `docs/handoffs/2026-05-31-1753-codex-vm224-mardu-identity-metaphysics.md`
- `docs/handoffs/2026-05-31-1813-codex-vm225-mardu-docs-parity-fill.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1832-codex-vm213-sultai-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/backlog/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/done/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`
- `data/raw-factions/sultai/*.json`
- `data/raw-factions/temur/*.json`

## Files Changed

- `docs/kanban/done/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1910-codex-vm227-mardu-raw-packet-review-gate.md`

## What Changed

- Moved VM-227 from Backlog to In Progress, then to Done after recording the review verdict.
- Reviewed the five Mardu raw JSON files without modifying them.
- Recorded `review-blocked-repair-required` in the VM-227 card and this handoff.
- Added raw JSON before/after hash proof to the VM-227 card and this handoff.
- Left VM-228 in Backlog; the blocked verdict means VM-228 should not proceed until a repair and re-review pass approves the packet.
- Updated the handoff index.

## Why It Changed

VM-227 is the review gate between VM-226 raw authoring and any future VM-228 controlled runtime promotion planning. The review confirmed most of the raw packet contract, but the missing `not_placement_eligible` marker prevents approval for future promotion planning.

## Decisions Made

- Chose `review-blocked-repair-required` because the only failure found is a JSON/status-marker repair issue.
- Did not choose `review-blocked-evidence-gap` because evidence mapping, ledger row existence, source-role coverage, and excluded evidence-role checks passed.
- Did not repair the missing marker during VM-227 because the plan explicitly forbids raw JSON correction during the review gate.
- Did not create a repair card during this pass; follow-up should be explicitly authorized.
- Kept Mardu non-live and unapproved for placement, preview, generation, runtime, promotion, routes, aliases, registries, or app integration.

## Before / After Hashes

Before and after SHA-256 hashes matched for all five Mardu JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `mardu.changelog.json` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` |
| `mardu.claims.json` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` |
| `mardu.placement.json` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` |
| `mardu.profile.json` | `3B02D2A8EB5EACD31621DAFAB00F768B3E40D027A75D97F58041E75EBD824228` | `3B02D2A8EB5EACD31621DAFAB00F768B3E40D027A75D97F58041E75EBD824228` |
| `mardu.sources.json` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` |

## Validation Result

Passed:

- Exact five-file raw packet set and JSON parse.
- Top-level JSON keys match Sultai and Temur raw-packet precedent for sources, claims, profile, placement, and changelog.
- Exactly 10 contiguous claims, `mardu_claim_0001` through `mardu_claim_0010`.
- Exact expected evidence mapping for all ten claims.
- All cited evidence rows exist in the VM-223 evidence ledger.
- All raw-claim evidence rows are `Promoted` or `Guardrail`.
- `MARDU-EVID-027` and `MARDU-EVID-028` remain `Support-only`, and `MARDU-EVID-031` remains `Vox Mana synthesis`.
- `mardu.claims.json` contains no `MARDU-EVID-027`, `MARDU-EVID-028`, `MARDU-EVID-031`, `MARDU-CMD-###`, `MARDU-MF-###`, or direct `MARDU-SRC-###` tokens.
- All raw-claim source IDs resolve to `claim-bearing` source records.
- Every raw-claim evidence row is covered by at least one cited claim-bearing source record.
- Source roles are limited to `claim-bearing`, `shaping-only`, and `support-only`.
- Profile and placement claim references are subsets of the 10 raw claims.
- `source_authored_review_gated`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []` are present.
- No true preview/placement/live flags or active/public integration fields were detected.

Failed:

- `not_placement_eligible` status marker is missing.

## Risks / Uncertainties

- The broad worktree remains dirty with unrelated changes. VM-227 did not attempt to clean or revert them.
- Because the Mardu raw packet is untracked in this worktree, hash equality is the strongest local proof that VM-227 left raw JSON unchanged.
- VM-228 remains physically in Backlog on the board, but the VM-227 verdict blocks execution until the repair is made and reviewed.

## Tests Run

- AGENTS pre-flight review of handoff index, VM-223 through VM-226 handoffs, board, VM-227 card, VM-226 raw packet, VM-223 evidence ledger, and Sultai review-gate precedent.
- Hard-stop checks confirmed VM-227 was Backlog with title `Mardu Horde Raw Packet Review Gate`, VM-226 was Done, VM-228 was Backlog and not In Progress or Done, and all five Mardu raw JSON files existed.
- `git -c safe.directory=C:/dev/mtgSiteWIP status --short` captured the dirty baseline.
- `Get-FileHash -Algorithm SHA256 data\raw-factions\mardu\*.json` before and after review confirmed matching hashes.
- JSON parse and exact file-set validation passed for all five raw JSON files.
- Top-level key comparison passed against Sultai and Temur raw-packet precedent.
- Claim count, contiguous claim ID, exact evidence mapping, ledger row existence, evidence role, source role, source coverage, profile references, and placement references were validated.
- Support-only/synthesis/manual-fill/Commander/direct-source token scan passed for `mardu.claims.json`.
- Non-live/leakage scan passed except for missing `not_placement_eligible`.
- Scoped `git diff --check` and trailing-whitespace scans were run during closeout on VM-227 touched files.

Skipped:

- `npm test`, because VM-227 is review-only and did not touch runtime contracts.
- `npm run test:parser`, because parser behavior did not change.
- Builders and generators, because VM-227 must not generate or promote.
- Formatters and fixers, because VM-227 is review-only.

## Not Touched

- `data/raw-factions/mardu/*.json`
- `docs/research/mardu/**`
- `docs/architecture/colors/mardu/**`
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
- Abzan files
- Temur files
- Sultai files
- Jeskai files
- VM-228 implementation
- Staging or commits

## Follow-Up Recommendations

- Create or authorize a narrow Mardu raw-packet repair card for the missing `not_placement_eligible` status marker.
- After the repair, rerun the VM-227 review gate and record either approval or the next blocked verdict.
- Do not start VM-228 until a review gate records `review-approved-for-future-promotion-planning`.

## Next Suggested Agent

Kanban Steward or JSON Cartographer for a narrow Mardu raw-packet status-marker repair, followed by Test Strategist for re-review.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/done/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `docs/kanban/done/VM-225-mardu-horde-docs-parity-fill.md`
- `docs/kanban/done/VM-224-mardu-horde-identity-and-metaphysics.md`
- `docs/kanban/done/VM-223-mardu-horde-source-packet-evidence-ledger.md`
- `docs/research/mardu/mardu-evidence-ledger.md`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`

## Explicit Final Scope Confirmation

Mardu remains non-live. VM-227 did not approve Mardu for placement, preview, generation, runtime, promotion, routes, aliases, registries, Home, Maze, schemas, Supabase, builders, fixtures, or app integration. VM-228 remains blocked until a repaired packet passes review.
