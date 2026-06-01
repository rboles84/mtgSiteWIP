# 2026-05-31 19:31 - Codex - VM-235 Mardu Status Marker Repair

## Agent Name

Codex acting as JSON Cartographer and Test Strategist.

## Task Requested

Implement VM-235 as a narrow Mardu raw packet repair: add the missing `not_placement_eligible` status marker that blocked VM-227, rerun VM-227-style review checks, close VM-235, and update VM-228 only if the repair re-review approves future promotion planning.

## Final Verdict

VM-235 recorded `review-approved-for-future-promotion-planning`.

VM-228 remains in Backlog but is eligible to start next because VM-235 is the repair re-review successor to VM-227's blocked gate.

## Pre-Flight Summary

Recent related work:

- VM-226 created the five-file Mardu authored-but-not-live raw packet and intended the non-live status set.
- VM-227 reviewed the packet, preserved raw JSON hashes, and recorded `review-blocked-repair-required` because `not_placement_eligible` was missing.
- VM-214 and VM-232 closed before this pass, updating the board and handoff index outside Mardu VM-235 scope.

Current known risks:

- The worktree remains broadly dirty with tracked runtime/generated/data changes and untracked Abzan, Temur, Sultai, Jeskai, and Mardu docs/raw/research/Kanban/handoff paths.
- `data/raw-factions/mardu/` is untracked, so before/after SHA-256 hashes are the primary proof of the raw repair scope.
- VM-228 must not treat VM-227 itself as approval; VM-235 is the repair re-review approval gate.

Relevant decisions already made:

- `MARDU` remains non-live until VM-228 explicitly promotes it through the approved build path.
- `RWB` and `WBR` remain metadata/query-only.
- Commander/operator rows remain support-only.
- VM-227 card and handoff remain historical blocked records and were not modified.

Files recently changed before or outside this task:

- `docs/handoffs/HANDOFF_INDEX.md` and `docs/kanban/board.md` had active prior edits.
- Sultai VM-214 and Jeskai VM-232 handoffs/cards completed before VM-235.
- Runtime/generated tracked files and prior clan folders remained dirty from earlier work.

What should not be touched:

- VM-227 card and handoff.
- Mardu claims, sources, placement, changelog, research, and architecture docs.
- Runtime files, generated artifacts, schemas, Maze, Home, routes, Supabase, builders, fixtures, registries, aliases, promotion lists, and cross-lane files.

## Files Reviewed

- `AGENTS.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1910-codex-vm227-mardu-raw-packet-review-gate.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/kanban/done/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.profile.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`
- `data/raw-factions/sultai/*.json`
- `data/raw-factions/temur/*.json`

## Files Changed

- `data/raw-factions/mardu/mardu.profile.json`
- `docs/kanban/done/VM-235-mardu-raw-packet-non-live-status-marker-repair.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-05-31-1931-codex-vm235-mardu-status-marker-repair.md`

## What Changed

- Created VM-235, moved it Backlog to In Progress to Done, and recorded `review-approved-for-future-promotion-planning`.
- Added `"placement_status": "not_placement_eligible"` to `search_and_filter_metadata` in `mardu.profile.json`.
- Reran VM-227-style review checks and confirmed the Mardu packet now passes.
- Updated VM-228's promotion gate note to reference VM-235 as the repair re-review approval gate.
- Added this handoff and indexed it.

## Why It Changed

VM-227 blocked Mardu because the raw packet lacked the literal `not_placement_eligible` marker. VM-235 repairs that status-marker gap without changing evidence, claims, semantics, placement readiness, runtime status, or generated surfaces.

## Decisions Made

- Used `data/raw-factions/mardu/mardu.profile.json` as the only raw repair target because `search_and_filter_metadata.runtime_status` already existed and equaled `source_authored_review_gated`.
- Added only the missing `placement_status` sibling field.
- Did not update VM-227 card or handoff; VM-235 supersedes the blocked review as a repair re-review record.
- Marked VM-228 eligible to start next, while keeping it physically in Backlog.

## Before / After Hashes

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `mardu.changelog.json` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` |
| `mardu.claims.json` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` |
| `mardu.placement.json` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` |
| `mardu.profile.json` | `3B02D2A8EB5EACD31621DAFAB00F768B3E40D027A75D97F58041E75EBD824228` | `4E605460956961D6AC6980578E0F299214F8F03FB1DBCB41827B56E978F2EFE1` |
| `mardu.sources.json` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` |

Only `mardu.profile.json` changed among the five raw JSON files.

## Re-Review Result

Passed:

- Exact five-file Mardu raw packet set.
- JSON parse for all five Mardu raw files.
- Top-level JSON keys match Sultai and Temur raw-packet precedent.
- Exactly 10 contiguous claims, `mardu_claim_0001` through `mardu_claim_0010`.
- Exact expected evidence mapping for all ten claims.
- All cited evidence rows exist in VM-223 and are `Promoted` or `Guardrail`.
- `MARDU-EVID-027`, `MARDU-EVID-028`, `MARDU-EVID-031`, `MARDU-CMD-###`, `MARDU-MF-###`, and direct `MARDU-SRC-###` tokens are absent from `mardu.claims.json`.
- All raw-claim source IDs resolve to `claim-bearing` source records.
- Profile and placement claim references are subsets of the ten raw claims.
- Required status scan found `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []`.
- No active/public integration fields or true preview/placement/live flags were detected.

## Risks / Uncertainties

- The broader dirty worktree remains. VM-235 did not attempt to clean, stage, commit, or revert unrelated changes.
- VM-228 must recompute the live runtime baseline at execution time and must not assume the current board/runtime state.
- VM-235 approval permits planning/execution of VM-228 only; it does not itself promote Mardu.

## Tests Run

- Hard-stop checks for VM-235 occupancy, VM-228 Backlog state, VM-227 Done blocked verdict, raw file presence, absent raw `not_placement_eligible`, and profile insertion shape.
- `Get-FileHash -Algorithm SHA256 data\raw-factions\mardu\*.json` before and after repair.
- JSON parse check for all five Mardu raw JSON files.
- VM-227-style validation script covering file set, shape precedent, claim IDs, evidence mapping, ledger roles, source roles, support-only exclusions, profile/placement claim references, non-live status markers, and leakage fields.
- Scoped `git diff --check` and trailing-whitespace scans were run during closeout on VM-235 touched files.

Skipped:

- `npm test`, because VM-235 only repaired raw JSON status metadata and Kanban/handoff docs.
- `npm run test:parser`, because parser behavior did not change.
- Builders and generators, because VM-235 must not promote or regenerate.

## Not Touched

- VM-227 card and handoff.
- `data/raw-factions/mardu/mardu.claims.json`
- `data/raw-factions/mardu/mardu.sources.json`
- `data/raw-factions/mardu/mardu.placement.json`
- `data/raw-factions/mardu/mardu.changelog.json`
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
- Abzan, Temur, Sultai, and Jeskai files outside existing dirty context
- Staging or commits

## Follow-Up Recommendations

- VM-228 can start next as the controlled Mardu runtime promotion pass.
- VM-228 should use VM-235 approval as the review gate, recompute the live runtime baseline at execution time, and keep `RWB`/`WBR` metadata/query-only.

## Next Suggested Agent

Runtime Promotion / Placement steward for VM-228 Mardu Horde Controlled Runtime Promotion.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/done/VM-235-mardu-raw-packet-non-live-status-marker-repair.md`
- `docs/kanban/backlog/VM-228-mardu-horde-controlled-runtime-promotion.md`
- `docs/kanban/done/VM-227-mardu-horde-raw-packet-review-gate.md`
- `docs/kanban/done/VM-226-mardu-horde-raw-faction-source-packet.md`
- `docs/handoffs/2026-05-31-1910-codex-vm227-mardu-raw-packet-review-gate.md`
- `docs/handoffs/2026-05-31-1846-codex-vm226-mardu-raw-faction-source-packet.md`
- `data/raw-factions/mardu/mardu.profile.json`

## Explicit Final Scope Confirmation

Mardu remains non-live after VM-235. VM-235 recorded `review-approved-for-future-promotion-planning`; VM-228 remains in Backlog but is eligible to start. VM-235 did not approve placement, preview, generation, runtime, promotion, routes, aliases, registries, Home, Maze, schemas, Supabase, builders, fixtures, or app integration by itself.
