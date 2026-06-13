# VM-262 - Ink Review Gate

ID: VM-262
Title: Ink Review Gate
Status: done
Type: Review / Promotion Gate
Area: Four-Color, Ink, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Review the VM-261 Ink authored-but-not-live raw packet without editing, repairing, formatting, reordering, regenerating, building, or promoting it.

## Review Result

Verdict: `review-approved-for-future-promotion-planning`

The VM-261 Ink raw packet passed the review gate as future VM-263 planning input only. This does not make `INK` live, generated, routed, previewed, placed, public, or integrated into app surfaces.

## Future VM-263 Policy Approval

- `vm263_placement_policy`: `approved_for_controlled_live_promotion_only`
- `vm263_core_color_policy`: `technical_aggregate_rgwu_only`
- `approved_core_color_value`: `RGWU`

Ink is a four-color RGWU/non-Black expression with no approved single-color center. `RGWU` is approved only as a technical aggregate to satisfy required runtime fields during any future VM-263 work. It is not a public alias, color-code route, official MTG name, single-color center, or human-facing label.

Approval does not require VM-263 to promote. It only removes the VM-262 review blocker if VM-263 is later executed.

Raw-packet status remains distinct from future promotion policy: the VM-261 raw packet remains `not_placement_eligible`, `placement_eligible: false`, `preview_eligible: false`, and `live_pilot: false`. This VM-262 approval may only authorize VM-263 to set live/generated placement eligibility later if VM-263 independently recomputes baselines, verifies raw hash stability, and passes its own gates.

The approval policy was recorded only in VM-262 bookkeeping and handoff surfaces, not inside the raw Ink JSON packet.

## Route Policy

VM-262 does not approve alternate route aliases or a concrete `/ink/` route. A future `/ink/` surface is allowed only if VM-263 independently verifies that it matches an existing Vox Mana live dossier route precedent and can be added without exposing `RGWU`, `WURG`, `Altruism`, or same-color permutation routes. `/rgwu/`, `/wurg/`, `/altruism/`, and permutation routes remain forbidden.

## Before / After Raw JSON Hashes

Before and after SHA-256 hashes matched for all five Ink JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `ink.changelog.json` | `323A051B3D81042A0BE7A9A7EA09F787D7B59698519D46C9AC9F4CB575D3B944` | `323A051B3D81042A0BE7A9A7EA09F787D7B59698519D46C9AC9F4CB575D3B944` |
| `ink.claims.json` | `C2EF1FE2BD91143FC6FDE493DBC0A9DA3CA5164BB62B2D38BA9557D8864C7648` | `C2EF1FE2BD91143FC6FDE493DBC0A9DA3CA5164BB62B2D38BA9557D8864C7648` |
| `ink.placement.json` | `2AF6CDFC6B968F88563FE57093C37841330F2BB98AED7FA4336B210ED35E0081` | `2AF6CDFC6B968F88563FE57093C37841330F2BB98AED7FA4336B210ED35E0081` |
| `ink.profile.json` | `8B909D19076A54F87F411A63441A9A76E86F717B069AD424B75DDB14DDCE5408` | `8B909D19076A54F87F411A63441A9A76E86F717B069AD424B75DDB14DDCE5408` |
| `ink.sources.json` | `43635671422B31611A56228A21A86783AE7F350AD964510053BD7CEFF365275A` | `43635671422B31611A56228A21A86783AE7F350AD964510053BD7CEFF365275A` |

Raw-packet hash comparison result: passed; all before and after hashes matched.

## Validation Summary

- Passed: exact five-file raw packet set and JSON parse.
- Passed: top-level raw-packet shape validation for all five files against Yore VM-243, Glint VM-249, and Dune VM-255 precedent.
- Passed: all files use `schema_version: "1.0.0"`.
- Passed: `profile_version`, `placement_profile_version`, and `based_on_profile_version` are `0.1.0`.
- Passed: exactly five contiguous raw claim IDs, `ink_claim_0001` through `ink_claim_0005`.
- Passed: raw claims cite only `INK-EVID-001`, `INK-EVID-002`, `INK-EVID-003`, `INK-EVID-004`, `INK-EVID-007`, and `INK-EVID-010`.
- Passed: exact claim-to-evidence mapping for all five claims.
- Passed: every cited evidence row resolves in `docs/research/ink/ink-evidence-ledger.md`.
- Passed: every raw-claim authority chain terminates in `source_role: claim-bearing`.
- Passed: the three unmanaged Ink draft records remain quarantine-only, have no `source_id`, and cannot be cited by raw claims.
- Passed: `placement_axes: []`.
- Passed: `not_placement_eligible`, `review_gated: true`, `placement_eligible: false`, `preview_eligible: false`, and `live_pilot: false`.
- Passed: all 48 uppercase and lowercase RGWU metadata/query-only forms are present.
- Passed: the VM-261 packet uses consistent `2026-06-04` packet date fields where the raw precedent expects dates.

## Exclusion Review Result

Passed. `INK-MF` rows, VM-259 and VM-260 architecture prose, Commander/precon rows, support-only rows, shaping-only rows, synthesis-only rows, manual-fill rows, and the three unmanaged discovery drafts were not used as raw-claim proof.

## Leakage Scan Result

Passed for VM-262 scope. No exact `INK`, `RGWU`, `WURG`, `Altruism`, `/ink/`, `/rgwu/`, `/wurg/`, or `/altruism/` matches were found in the targeted live/generated data surfaces reviewed for this pass: `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, and `data/archscry-flavor-snippets.json`.

A wider repo scan found pre-existing non-live/test/dictionary mentions in `research/maze-search-tests.js`, `research/archscry-dossier-followup-tests.js`, `assets/js/quick-reading-tests.js`, `research/scryfall-parser-seed-2026.json`, and `research/scryfall-dictionary.js`. These were recorded as unrelated pre-existing context and not repaired under VM-262.

## Overclaim Scan Result

Passed. Matches for official-name, official-faction, institution, lore-proof, legality-proof, Ink-Treader, Kynaios, Commander texture, discovery-draft evidence, public alias, route-key, and placement-key language in the raw packet were boundary or exclusion language only. No reviewed match promoted those concepts into official faction proof, lore proof, runtime readiness, placement readiness, public alias authority, or review approval.

## Dependency

VM-262 depends on VM-258 through VM-261 completion.

## Non-Goals

- Do not activate `INK` as a live key.
- Do not convert `Altruism`, `RGWU`, `WURG`, or permutations into public aliases, route keys, expression keys, placement keys, Home preview keys, Maze keys, or fixture keys.
- Do not edit raw Ink JSON.
- Do not build, generate, promote, or wire Ink into runtime.
- Do not edit schemas, Home preview, Maze files, route CSS/JS, Supabase files, generated artifacts, or other four-color lanes.
- Do not create, move, rename, or edit a repair card during VM-262.

## Acceptance Criteria

- [x] A clear Ink review verdict is recorded.
- [x] Raw packet review preserved byte stability for `data/raw-factions/ink/*.json`.
- [x] No runtime promotion work was bundled into VM-262.
- [x] Future VM-263 placement policy is recorded for controlled live promotion only.
- [x] Future VM-263 `core_color` policy is recorded as technical aggregate `RGWU` only.
- [x] Approval policy is recorded only in VM-262 bookkeeping and handoff surfaces.

## Suggested Tests

- Before/after SHA-256 hash comparison for all five Ink raw JSON files.
- Exact file-set and JSON parse check.
- Raw claim/evidence/source-role authority-chain resolver.
- Non-live status validator.
- Metadata-query-only RGWU form validator.
- Promotion and overclaim leakage scans.
- Scoped `git diff --check` for VM-262 bookkeeping only.
