# VM-227 - Mardu Horde Raw Packet Review Gate

ID: VM-227
Title: Mardu Horde Raw Packet Review Gate
Status: done
Type: Review / Gate
Area: Mardu Horde, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Review the VM-226 Mardu Horde authored-but-not-live raw-faction packet without editing, repairing, formatting, regenerating, building, or promoting it.

## Review Result

Verdict: `review-blocked-repair-required`

VM-227 did not edit, repair, format, regenerate, build, or promote the Mardu raw JSON packet. The packet passed JSON parsing, five-file shape, top-level Sultai/Temur precedent comparison, ten-claim sequence validation, exact evidence mapping, source-role resolution, support-only exclusion, profile/placement claim-reference checks, and raw JSON hash immutability checks.

The review is blocked because the packet is missing the required `not_placement_eligible` status marker. This is a JSON/status repair issue, not a VM-223 evidence-gap issue.

## Repair List

- Add the required `not_placement_eligible` non-live status marker in the Mardu raw packet using the Sultai/Temur raw-packet precedent and VM-226 intent, without changing evidence mappings or promoting Mardu.
- After repair, rerun VM-227-style review checks before VM-228 promotion planning.

## Before / After Raw JSON Hashes

Before and after SHA-256 hashes matched for all five Mardu JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `mardu.changelog.json` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` | `DB604EB784B66DB3D8F21BFB669FE67AAB0D696093E27D5B56F1A80EA3DED593` |
| `mardu.claims.json` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` | `9C504F043F58D52A60C6C16F1933154C52E313E21461C1151734461FF68B9CA2` |
| `mardu.placement.json` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` | `0467CEF88D8C67B9496F36D7B72419519F9F3C92436640E4FA601B942370EE47` |
| `mardu.profile.json` | `3B02D2A8EB5EACD31621DAFAB00F768B3E40D027A75D97F58041E75EBD824228` | `3B02D2A8EB5EACD31621DAFAB00F768B3E40D027A75D97F58041E75EBD824228` |
| `mardu.sources.json` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` | `A57C80D9EC7A806EA7CE5405C5036EC264A601D3C4B5FCFA3EF742CFA75C83A9` |

## Validation Summary

- Passed: exact five-file raw packet set and JSON parse.
- Passed: top-level JSON keys match Sultai and Temur raw-packet precedent.
- Passed: exactly 10 contiguous claims, `mardu_claim_0001` through `mardu_claim_0010`.
- Passed: exact expected evidence mapping for all ten claims.
- Passed: all cited evidence rows resolve in VM-223 and are `Promoted` or `Guardrail`.
- Passed: `MARDU-EVID-027`, `MARDU-EVID-028`, `MARDU-EVID-031`, `MARDU-CMD-###`, `MARDU-MF-###`, and direct `MARDU-SRC-###` tokens are absent from `mardu.claims.json`.
- Passed: every raw-claim source ID resolves to `claim-bearing` source records and covers the cited evidence rows.
- Passed: profile and placement claim references are subsets of the ten raw claims.
- Passed: `source_authored_review_gated`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []`.
- Failed: `not_placement_eligible` status marker is missing.
- Passed: no active/public integration fields or true preview/placement/live flags were detected.

## Dependency

VM-227 depends on VM-226 completion.

## Shared Reservation Facts

- `docs/research/mardu horde/` is unmanaged seed material.
- `docs/research/mardu/` is future VM-223 source-packet workspace only.
- `MARDU` is the future public key.
- `RWB` and `WBR` remain metadata/query-only.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Review VM-226 raw-faction source packet against VM-223 evidence, VM-224 identity architecture, and VM-225 parity docs.
- Record whether the packet is `review-approved-for-future-promotion-planning`, requires repair, or should remain blocked.
- Keep Mardu authored-but-not-live.

## Non-Goals

- Do not edit raw packet files except under a separate repair card.
- Do not edit research packet files or architecture docs except for review citations in the VM-227 handoff/card.
- Do not build, generate, promote, or wire Mardu into runtime.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, builders, placement fixtures, Abzan files, Temur files, Sultai files, or Jeskai files.

## Acceptance Criteria

- [x] Review verdict is recorded clearly.
- [x] Every raw claim maps to existing `MARDU-EVID-###` rows from VM-223.
- [x] Commander/operator material remains support-only and is not raw-claim proof.
- [x] `MARDU` remains non-live.
- [x] `RWB` and `WBR` remain metadata/query-only.
- [x] No raw, research, architecture, runtime, generated, schema, Maze, route, Home, Supabase, builder, or placement fixture files are changed unless explicitly documented as review-only citations.

## Suggested Tests

- Read-only raw packet schema and evidence review.
- Evidence-row resolver against VM-223.
- Support-only scan for Commander/operator material.
- Forbidden-path diff check for review-only scope.
- Scoped `git diff --check`.
