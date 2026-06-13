# VM-256 - Dune Review Gate

ID: VM-256
Title: Dune Review Gate
Status: done
Type: Review / Promotion Gate
Area: Four-Color, Dune, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-03

## Summary

Review the VM-255 Dune authored-but-not-live raw packet without editing, repairing, formatting, regenerating, building, or promoting it.

## Review Result

Verdict: `review-approved-for-future-promotion-planning`

The VM-255 Dune raw packet passed the review gate as future VM-257 planning input only. This does not make `DUNE` live, generated, routed, previewed, placed, public, or integrated into app surfaces.

## Future VM-257 Policy Approval

- `vm257_placement_policy`: `approved_for_controlled_live_promotion_only`
- `vm257_core_color_policy`: `technical_aggregate_brgw_only`
- `approved_core_color_value`: `BRGW`

Dune is a four-color BRGW/non-Blue expression with no approved single-color center. `BRGW` is approved only as a technical aggregate to satisfy required runtime fields during any future VM-257 work. It is not a public alias, color-code route, official MTG name, single-color center, or human-facing label.

Approval does not require VM-257 to promote. It only removes the VM-256 review blocker if VM-257 is later executed.

Raw-packet status remains distinct from future promotion policy: the VM-255 raw packet remains `not_placement_eligible`, `placement_eligible: false`, `preview_eligible: false`, and `live_pilot: false`. This VM-256 approval may only authorize VM-257 to set live/generated placement eligibility later if VM-257 passes its own gates.

The approval policy was recorded only in VM-256 bookkeeping and handoff surfaces, not inside the raw Dune JSON packet.

## Route Policy

VM-256 does not approve alternate route aliases or a concrete `/dune/` route. A future `/dune/` surface is allowed only if VM-257 independently proves it is an existing Vox Mana live dossier route precedent and can use that precedent without exposing `BRGW`, `WBRG`, `Aggression`, or same-color permutation routes. `/brgw/`, `/wbrg/`, and permutation routes remain forbidden.

## Before / After Raw JSON Hashes

Before and after SHA-256 hashes matched for all five Dune JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `dune.changelog.json` | `1706F08BF84B97DF22CEF16E5A9AEF92C2B4705DF86D40AF117FD4C806B84D1B` | `1706F08BF84B97DF22CEF16E5A9AEF92C2B4705DF86D40AF117FD4C806B84D1B` |
| `dune.claims.json` | `496A4F15AD0CDB5818F989053A431C6A30F6404DEA8A953B833E0EB0E2600D13` | `496A4F15AD0CDB5818F989053A431C6A30F6404DEA8A953B833E0EB0E2600D13` |
| `dune.placement.json` | `55D829041F6A8895F1DE1E41CDEFF34D861C322A82F413D3D9FD5C9E257D8BF3` | `55D829041F6A8895F1DE1E41CDEFF34D861C322A82F413D3D9FD5C9E257D8BF3` |
| `dune.profile.json` | `F941A22FAF218871645FF87DBF272C2739C5568449070D8D8D532C9D8B76865E` | `F941A22FAF218871645FF87DBF272C2739C5568449070D8D8D532C9D8B76865E` |
| `dune.sources.json` | `F1466612A762BC19A4BFD35F29BDBCE4883DB6CC6A52CA1FEAAF39457E5B4853` | `F1466612A762BC19A4BFD35F29BDBCE4883DB6CC6A52CA1FEAAF39457E5B4853` |

Raw-packet hash comparison result: passed; all before and after hashes matched.

## Validation Summary

- Passed: exact five-file raw packet set and JSON parse.
- Passed: top-level raw-packet schema families for all five files against the Yore VM-243 and Glint VM-249 review precedent.
- Passed: all files use `schema_version: "1.0.0"`.
- Passed: `profile_version`, `placement_profile_version`, and `based_on_profile_version` are `0.1.0`.
- Passed: exactly five contiguous raw claim IDs, `dune_claim_0001` through `dune_claim_0005`.
- Passed: raw claims cite only `DUNE-EVID-001`, `DUNE-EVID-002`, `DUNE-EVID-003`, `DUNE-EVID-004`, `DUNE-EVID-007`, and `DUNE-EVID-010`.
- Passed: exact claim-to-evidence mapping for all five claims.
- Passed: `DUNE-EVID-010` appears only in `dune_claim_0001` and `dune_claim_0002`.
- Passed: every raw-claim authority chain terminates in `source_role: claim-bearing`.
- Passed: `placement_axes: []`.
- Passed: `source_grounded_review_gated`, `not_placement_eligible`, `review_gated: true`, `placement_eligible: false`, `preview_eligible: false`, and `live_pilot: false`.
- Passed: all 48 uppercase and lowercase BRGW metadata/query-only forms are present with one-to-one lowercase derivation.
- Passed: the VM-255 packet uses one consistent `2026-06-03` packet date across `source_review_date`, `last_updated`, and related changelog metadata.
- Passed: the current live/generated baseline still excludes `DUNE` from `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, and `data/archscry-flavor-snippets.json`.

## Exclusion Review Result

Passed. Support-only Saskia / `Open Hostility` / Commander rows, precon support rows, VM-253 and VM-254 architecture prose, manual-fill rows, synthesis-only rows, and the preserved discovery HTML draft were not used as raw-claim proof.

## Leakage Scan Result

Passed for VM-256 scope. No active/public raw-packet wiring was found for `DUNE`, `/dune/`, `/brgw/`, `/wbrg/`, route aliases, generated keys, placement keys, preview/live flags, Home preview activation, Maze leakage, or Supabase leakage in the targeted live/generated surfaces reviewed for this pass.

An intentionally wider raw-packet scan found `Aggression`, `BRGW`, `WBRG`, architecture-doc references, and the discovery HTML draft only in boundary, exclusion, shaping-only, or metadata-query-only language, not as public alias or runtime authority.

## Overclaim Scan Result

Passed. Matches for official-name, official-faction, institution, lore-proof, legality-proof, Saskia, `Open Hostility`, Commander texture, Dune-Brood, and Nephilim language in the raw packet were boundary or exclusion language only. No reviewed match promoted those concepts into official faction proof, lore proof, runtime readiness, placement readiness, or public alias authority.

## Dependency

VM-256 depends on VM-252 through VM-255 completion.

## Non-Goals

- Do not activate `DUNE` as a live key.
- Do not convert `Aggression`, `BRGW`, `WBRG`, or permutations into public aliases, route keys, expression keys, placement keys, Home preview keys, Maze keys, or fixture keys.
- Do not edit raw Dune JSON.
- Do not build, generate, promote, or wire Dune into runtime.
- Do not edit schemas, Home preview, Maze files, route CSS/JS, Supabase files, generated artifacts, or other four-color lanes.
- Do not create, move, rename, or edit a repair card during VM-256.

## Acceptance Criteria

- [x] A clear Dune review verdict is recorded.
- [x] Raw packet review preserved byte stability for `data/raw-factions/dune/*.json`.
- [x] No runtime promotion work was bundled into VM-256.
- [x] Future VM-257 placement policy is recorded for controlled live promotion only.
- [x] Future VM-257 `core_color` policy is recorded as technical aggregate `BRGW` only.
- [x] Approval policy is recorded only in VM-256 bookkeeping and handoff surfaces.

## Suggested Tests

- Before/after SHA-256 hash comparison for all five Dune raw JSON files.
- Exact file-set and JSON parse check.
- Raw claim/evidence/source-role authority-chain resolver.
- Non-live status validator.
- Metadata-query-only BRGW form validator.
- Promotion and overclaim leakage scans.
- Scoped `git diff --check` for VM-256 bookkeeping only.
