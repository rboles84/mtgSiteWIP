# VM-268 - Witch Review Gate

ID: VM-268
Title: Witch Review Gate
Status: done
Reservation State: Complete
Type: Review / Promotion Gate
Area: Four-Color, Witch, Raw Data
Priority: high
Created: 2026-05-31
Completed: 2026-06-04

## Summary

Review the VM-267 Witch authored-but-not-live raw packet without editing, repairing, formatting, reordering, staging, regenerating, building, or promoting it.

## Review Result

Verdict: `review-approved-for-future-promotion-planning`

The VM-267 Witch raw packet passed the review gate as future VM-269 planning input only. This does not make `WITCH` live, generated, routed, previewed, placed, public, or integrated into app surfaces.

## Future VM-269 Policy Approval

- `vm269_placement_policy`: `approved_for_controlled_live_promotion_only`
- `vm269_rollout_mode`: `live-with-Maze-if-executed`
- `vm269_core_color_policy`: `technical_aggregate_gwub_only`
- `approved_core_color_value`: `GWUB`

Witch is a four-color GWUB/non-Red expression with no approved single-color center. `GWUB` is approved only as a technical aggregate/query value where required by a future VM-269 runtime path. It is not a public alias, color-code route, official MTG name, single-color center, or human-facing label.

Approval does not require VM-269 to promote. VM-269 remains optional and must still verify VM-268 approval, raw hash stability, current live/generated baseline, and its own live-with-Maze gates before any promotion work.

Raw-packet status remains distinct from future promotion policy: the VM-267 raw packet remains `not_placement_eligible`, `placement_eligible: false`, `preview_eligible: false`, and `live_pilot: false`. This VM-268 approval may only authorize VM-269 to set live/generated placement eligibility later if VM-269 independently recomputes baselines, verifies raw hash stability, and passes its own gates.

The approval policy was recorded only in VM-268 bookkeeping and handoff surfaces, not inside the raw Witch JSON packet.

## Route And Surface Policy

VM-268 does not approve alternate route aliases, a concrete `/witch/` route, color-code aliases, Home preview membership, hero assets, generated output, runtime code, builder work, schema work, Maze changes, or Supabase changes. `/gwub/`, `/wubg/`, `/growth/`, and same-color permutation routes remain forbidden.

## Before / After Raw JSON Hashes

Before and after SHA-256 hashes matched for all five Witch JSON files:

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `witch.changelog.json` | `BC2B203865D7F56B1BE860C1EAEC212560DBA5B453AF6920CB7902E2E01D9D85` | `BC2B203865D7F56B1BE860C1EAEC212560DBA5B453AF6920CB7902E2E01D9D85` |
| `witch.claims.json` | `6A6E4AB280DB775862FF00E8E2F4C680F4EAF7E6329423CCB5A144F1E2214D2E` | `6A6E4AB280DB775862FF00E8E2F4C680F4EAF7E6329423CCB5A144F1E2214D2E` |
| `witch.placement.json` | `BFAD914A9A47B7B9C46A5E75E462D7D54B3D1A8B5D360B7AA76686021B6E5084` | `BFAD914A9A47B7B9C46A5E75E462D7D54B3D1A8B5D360B7AA76686021B6E5084` |
| `witch.profile.json` | `534719C82ABC79BD3A8B6788D31AE8F5A0174A5B96871C791D5CD9F073DAD1FA` | `534719C82ABC79BD3A8B6788D31AE8F5A0174A5B96871C791D5CD9F073DAD1FA` |
| `witch.sources.json` | `C6BF2968B1B8F87C537326D1B9FD963B42596FC4E11D4A8FF741030E8DC22FC7` | `C6BF2968B1B8F87C537326D1B9FD963B42596FC4E11D4A8FF741030E8DC22FC7` |

Raw-packet hash comparison result: passed; all before and after hashes matched. The raw folder remains unstaged and unnormalized by VM-268.

## Validation Summary

- Passed: exact five-file raw packet set and JSON parse.
- Passed: exactly five contiguous raw claim IDs, `witch_claim_0001` through `witch_claim_0005`.
- Passed: raw claims cite only `WITCH-EVID-001`, `WITCH-EVID-002`, `WITCH-EVID-003`, `WITCH-EVID-004`, `WITCH-EVID-005`, `WITCH-EVID-007`, and `WITCH-EVID-010`.
- Passed: every cited evidence row resolves in `docs/research/witch/witch-evidence-ledger.md`.
- Passed: every raw-claim `source_id` maps to a `source_role: claim-bearing` source.
- Passed: support-only, shaping-only, manual-fill, synthesis, Commander/precon, architecture, and discovery/quarantine sources are not used as raw proof.
- Passed: the three unmanaged Witch draft records remain quarantine-only, preserve the VM-264 hashes, have no `source_id`, and cannot be cited by raw claims.
- Passed: `placement_axes: []`.
- Passed: `review_gated: true`, `placement_eligible: false`, `preview_eligible: false`, and `live_pilot: false`.
- Passed: all 48 uppercase and lowercase GWUB same-color permutation forms are present only in metadata/query-only fields.
- Passed: the VM-267 packet uses consistent `2026-06-04` packet date fields.

## Exclusion Review Result

Passed. `WITCH-MF` rows, VM-265 and VM-266 architecture prose, Commander/precon rows, support-only rows, shaping-only rows, synthesis-only rows, manual-fill rows, and the three unmanaged discovery drafts were not used as raw-claim proof.

## Leakage Scan Result

Passed for VM-268 scope. No exact `WITCH`, `GWUB`, `WUBG`, `/witch/`, `/gwub/`, or `/wubg/` matches were found in the targeted live/generated data surfaces reviewed for this pass: `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `data/placement-model.schema.json`, and `data/archscry-flavor-snippets.json`.

A wider public-surface scan found one pre-existing `WITCH` sentinel in `assets/js/quick-reading-tests.js` that asserts `WITCH` must not be generated into live factions, placement model, identity layers, or Home preview. This is non-live guard coverage, not identity availability leakage.

Incidental `Growth` text exists in live data as unrelated established vocabulary. No scan result promoted `Growth` to a Witch public alias, route, live key, placement key, preview key, or naming authority.

## Overclaim Scan Result

Passed. Matches for official-name, official-faction, institution, lore-proof, legality-proof, Witch-Maw, Atraxa, Commander texture, discovery-draft evidence, public alias, route-key, placement-key, EDHREC, ranking, cEDH, and Phyrexia-only language in the raw packet were boundary, exclusion, or manual-fill language only. No reviewed match promoted those concepts into official faction proof, lore proof, runtime readiness, placement readiness, public alias authority, or review approval.

## Dependency

VM-268 depends on VM-264 through VM-267 completion. VM-264, VM-265, VM-266, and VM-267 were confirmed Done before this review.

## Non-Goals

- Do not activate `WITCH` as a live key.
- Do not convert `Growth`, `GWUB`, `WUBG`, or same-color permutations into public aliases, route keys, expression keys, placement keys, Home preview keys, Maze keys, or fixture keys.
- Do not edit, stage, normalize, repair, or reformat raw Witch JSON.
- Do not build, generate, promote, or wire Witch into runtime.
- Do not edit schemas, Home preview, Maze files, route CSS/JS, Supabase files, generated artifacts, research docs, architecture docs, or other four-color lanes.
- Do not create, move, rename, or edit a repair card during VM-268.

## Acceptance Criteria

- [x] A clear Witch review verdict is recorded.
- [x] Raw packet review preserved byte stability for `data/raw-factions/witch/*.json`.
- [x] No runtime promotion work was bundled into VM-268.
- [x] Future VM-269 placement policy is recorded for controlled live promotion only.
- [x] Future VM-269 rollout mode is recorded as optional `live-with-Maze-if-executed`.
- [x] Future VM-269 `core_color` policy is recorded as technical aggregate `GWUB` only.
- [x] Approval policy is recorded only in VM-268 bookkeeping and handoff surfaces.

## Suggested Tests

- Before/after SHA-256 hash comparison for all five Witch raw JSON files.
- Exact file-set and JSON parse check.
- Raw claim/evidence/source-role authority-chain resolver.
- Non-live status validator.
- Metadata-query-only GWUB form validator.
- Promotion and overclaim leakage scans.
- Scoped `git diff --check` for VM-268 bookkeeping only.
