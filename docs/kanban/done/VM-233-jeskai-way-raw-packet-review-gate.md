# VM-233 - Jeskai Way Raw Packet Review Gate

ID: VM-233
Title: Jeskai Way Raw Packet Review Gate
Status: done
Type: Review / JSON Gate
Area: Jeskai Way, Raw Factions, Source Data
Priority: high
Created: 2026-05-31

## Summary

Review the VM-232 Jeskai Way authored-but-not-live raw-faction packet without editing, repairing, formatting, regenerating, building, or promoting it.

## Dependency

Blocked until VM-232 is complete.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Review exactly five Jeskai raw JSON files under `data/raw-factions/jeskai/`.
- Validate JSON parsing, source-role boundaries, claim evidence mapping, source coverage, non-live status fields, and promotion leakage.
- Record either `review-approved-for-future-promotion-planning` or create a repair follow-up card.
- Preserve the raw JSON byte-for-byte during review.

## Non-Goals

- Do not edit or reformat the Jeskai raw JSON files.
- Do not create, edit, or regenerate runtime/generated artifacts.
- Do not add `JESKAI`, color-code permutations, or lowercase forms as live keys, aliases, route keys, lookup keys, fixture keys, placement keys, or Home preview entries.
- Do not run builders or promotion tests.
- Do not edit research packet files or architecture docs except for review citations in the VM-233 handoff/card.

## Review Result

Status: `review-approved-for-future-promotion-planning`

The VM-232 Jeskai raw packet passed the review gate as future VM-234 planning input only. This does not make `JESKAI` live, placement-eligible, preview-eligible, routed, generated, visible, or integrated into app surfaces.

## Acceptance Criteria

- [x] Before/after SHA-256 hashes match for all five Jeskai raw JSON files.
- [x] Every raw claim maps to existing `JESKAI-EVID-###` rows from VM-229.
- [x] Raw claims reference only claim-bearing sources.
- [x] Architecture docs are shaping-only and never raw-claim evidence.
- [x] Support-only, manual-fill, Commander/operator, seed, generated HTML, and comparator rows are absent from raw claims.
- [x] Non-live fields preserve review-gated, placement-ineligible, preview-ineligible status.
- [x] No VM-233-introduced runtime/generated/Home/route/Maze/Supabase/fixture leakage appears.

## Review Checklist

| Check | Status | Blocking Notes |
|---|---|---|
| Exact five-file packet set | Pass | Found only the five expected Jeskai raw JSON files. |
| JSON parse | Pass | All five files parsed read-only with `ConvertFrom-Json`. |
| Top-level shape precedent | Pass | All five files match Mardu and Sultai raw-packet top-level keys. |
| Ten contiguous claim IDs | Pass | `jeskai_claim_0001` through `jeskai_claim_0010`. |
| Exact evidence mapping | Pass | All ten claims matched the VM-233 expected mapping. |
| Evidence rows resolve to VM-229 | Pass | All cited `JESKAI-EVID-###` rows exist in VM-229. |
| Claim-bearing source IDs only | Pass | Every raw-claim `source_id` resolves to `source_role: claim-bearing`. |
| Excluded material absent from claims | Pass | Blocked evidence rows, source rows, Commander rows, manual-fill rows, architecture paths, seed paths, and generated HTML are absent from `jeskai.claims.json`. |
| Architecture sources shaping-only | Pass | VM-230/VM-231 architecture appears only as shaping-only source context. |
| Profile/placement claim refs subset | Pass | All profile and placement claim references are within the ten raw claims. |
| Non-live status fields | Pass | `source_authored_review_gated`, `not_placement_eligible`, false preview/placement/live flags, `review_gated: true`, and empty `placement_axes` verified. |
| Promotion leakage | Pass | No true live flags, non-empty axes, or route/alias/generated/placement key fields detected in the raw packet. |
| Runtime/generated dirty-path scan | Pass | Existing changed runtime/generated paths contain pre-existing Jeskai boundary text, not VM-233-introduced leakage. |
| Raw JSON byte preservation | Pass | Before/after hashes match for all five raw files. |

## Before / After Hashes

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `jeskai.changelog.json` | `5130A9444A31F6DD4B03266BBC2522A04E228A0225D124DA96F3AD12EF53C101` | `5130A9444A31F6DD4B03266BBC2522A04E228A0225D124DA96F3AD12EF53C101` |
| `jeskai.claims.json` | `CFC200B639201680912BD15D5AF75D490A2EDC5206B65CB2A386B5EA08FBFDD4` | `CFC200B639201680912BD15D5AF75D490A2EDC5206B65CB2A386B5EA08FBFDD4` |
| `jeskai.placement.json` | `1511882A9AF9D9FAB7071234F9AB60C3E0FE2A1A2F52554AF40227F52119BE6E` | `1511882A9AF9D9FAB7071234F9AB60C3E0FE2A1A2F52554AF40227F52119BE6E` |
| `jeskai.profile.json` | `5ECAA1F7FC6349053CAC0B8772BEE9D85EFFD145548DBCB88166E5FB2B8AB006` | `5ECAA1F7FC6349053CAC0B8772BEE9D85EFFD145548DBCB88166E5FB2B8AB006` |
| `jeskai.sources.json` | `48BA180ECC5DF9534648DBBCFD83A93D02848D9AF000944EE15312BFA5040A0F` | `48BA180ECC5DF9534648DBBCFD83A93D02848D9AF000944EE15312BFA5040A0F` |

## Suggested Tests

- File-count and exact-file-set check for `data/raw-factions/jeskai/`.
- JSON parse check across all five Jeskai raw files.
- Raw claim/source-role/evidence resolver.
- Before/after hash comparison.
- Promotion leakage scans.
- Scoped `git diff --check` for VM-233 bookkeeping only.
