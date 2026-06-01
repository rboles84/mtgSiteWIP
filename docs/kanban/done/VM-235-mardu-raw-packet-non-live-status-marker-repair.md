# VM-235 - Mardu Raw Packet Non-Live Status Marker Repair

ID: VM-235
Title: Mardu Raw Packet Non-Live Status Marker Repair
Status: done
Type: Raw Faction Repair / Review Gate
Area: Mardu Horde, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Repair the VM-227-blocking Mardu raw packet status marker gap by adding only the missing `not_placement_eligible` marker, then rerun VM-227-style review checks.

## Review Result

Verdict: `review-approved-for-future-promotion-planning`

VM-235 added the missing `placement_status: not_placement_eligible` marker to `data/raw-factions/mardu/mardu.profile.json`, then reran VM-227-style review checks. The repair re-review passed. VM-228 remains in Backlog but is now eligible to start as the next Mardu card.

## Repair Made

- Added `"placement_status": "not_placement_eligible"` immediately after `"runtime_status": "source_authored_review_gated"` in `search_and_filter_metadata`.
- Did not change `preview_eligible`, `review_gated`, `placement_eligible`, `live_pilot`, `placement_axes`, claim references, evidence mappings, source roles, profile semantics, placement semantics, or any other raw JSON content.
- Did not modify VM-227 card or VM-227 handoff.

## Before / After Raw JSON Hashes

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `mardu.changelog.json` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` |
| `mardu.claims.json` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` |
| `mardu.placement.json` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` |
| `mardu.profile.json` | `3B02D2A8EB5EACD31621DAFAB00F768B3E40D027A75D97F58041E75EBD824228` | `4E605460956961D6AC6980578E0F299214F8F03FB1DBCB41827B56E978F2EFE1` |
| `mardu.sources.json` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` |

Only `mardu.profile.json` changed among the five Mardu raw JSON files.

## Re-Review Summary

- Passed: exact five-file raw packet set and JSON parse.
- Passed: top-level JSON keys match Sultai and Temur raw-packet precedent.
- Passed: exactly 10 contiguous claims, `mardu_claim_0001` through `mardu_claim_0010`.
- Passed: exact expected evidence mapping for all ten claims.
- Passed: all cited evidence rows resolve in VM-223 and are `Promoted` or `Guardrail`.
- Passed: `MARDU-EVID-027`, `MARDU-EVID-028`, `MARDU-EVID-031`, `MARDU-CMD-###`, `MARDU-MF-###`, and direct `MARDU-SRC-###` tokens are absent from `mardu.claims.json`.
- Passed: every raw-claim source ID resolves to `claim-bearing` source records and covers the cited evidence rows.
- Passed: profile and placement claim references are subsets of the ten raw claims.
- Passed: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []`.
- Passed: no active/public integration fields or true preview/placement/live flags were detected.
- Passed: `search_and_filter_metadata` now has the expected `runtime_status`, `placement_status`, and `preview_eligible` status trio.

## Dependencies

- VM-235 depends on VM-227 being Done with `review-blocked-repair-required`.
- VM-235 keeps VM-228 blocked unless this repair re-review records `review-approved-for-future-promotion-planning`.

## Scope

- Perform AGENTS.md pre-flight before repair.
- Hard stop if VM-235 already exists elsewhere, VM-228 is not Backlog, VM-227 is not Done with the blocked verdict, raw files are missing, `not_placement_eligible` is already present, or `search_and_filter_metadata.runtime_status` is missing or not `source_authored_review_gated`.
- Edit only `data/raw-factions/mardu/mardu.profile.json`.
- Add `"placement_status": "not_placement_eligible"` immediately after `"runtime_status": "source_authored_review_gated"` in `search_and_filter_metadata`.
- Rerun VM-227-style raw packet review checks.
- If the repair re-review passes, update VM-228's gate note to reference VM-235 as the repair re-review approval.

## Non-Goals

- Do not change `preview_eligible`, `review_gated`, `placement_eligible`, `live_pilot`, `placement_axes`, claim references, profile semantics, placement semantics, or any other raw JSON content.
- Do not edit VM-227 card or VM-227 handoff.
- Do not edit Mardu claims, sources, placement, changelog, research, architecture, runtime, generated files, schemas, Maze, Home, routes, Supabase, builders, fixtures, registries, aliases, or promotion lists.
- Do not start VM-228.

## Acceptance Criteria

- [x] `mardu.profile.json` contains `placement_status: not_placement_eligible` in `search_and_filter_metadata`.
- [x] All five Mardu raw JSON files parse.
- [x] Only `mardu.profile.json` changes among Mardu raw JSON files.
- [x] VM-227-style review checks pass or the blocked verdict is recorded with a repair/evidence list.
- [x] Final verdict is recorded as `review-approved-for-future-promotion-planning`, `review-blocked-repair-required`, or `review-blocked-evidence-gap`.
- [x] VM-228 status is explicitly recorded as blocked or eligible to start.

## Suggested Tests

- JSON parse all five Mardu raw files.
- Before/after SHA-256 hash table for all five Mardu raw files.
- Exact five-file set check.
- Sultai/Temur top-level shape comparison.
- Claim count, contiguous IDs, exact evidence mapping, VM-223 ledger resolution, source-role validation, support-only exclusion, and profile/placement claim-reference checks.
- Non-live status scan for `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []`.
- Leakage scan for active/public integration fields and true preview/placement/live flags.
- Scoped `git diff --check` and trailing-whitespace scan on touched files.
