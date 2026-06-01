# VM-207 - Temur Frontier Raw Packet Review Gate

ID: VM-207
Title: Temur Frontier Raw Packet Review Gate
Status: done
Type: JSON / Data Review
Area: Temur Frontier, Raw Factions, Review Gate
Priority: high
Created: 2026-05-31
Updated: 2026-05-31
Completed: 2026-05-31

## Summary

Review the VM-206 Temur raw-faction packet as a review-only gate before any later runtime planning.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Require VM-206 to be complete before starting.
- Review exactly five raw JSON files under `data/raw-factions/temur/`.
- Verify the packet remains authored-but-not-live.
- Verify raw claims remain bound only to approved VM-203 evidence rows.
- Verify every source has an allowed `source_role` value: `claim-bearing`, `shaping-only`, or `support-only`.
- Verify raw claims reference only `claim-bearing` sources.
- Record the review result and caveats in the VM-207 handoff.

## Non-Goals

- Do not edit `data/raw-factions/temur/` unless the user explicitly asks for repair.
- Do not edit `docs/research/temur/`.
- Do not edit `docs/architecture/colors/temur/`.
- Do not edit Abzan, Jeskai, Mardu, or Sultai files.
- Do not edit builders, generated artifacts, schemas, placement fixtures, route maps, browser bundles, runtime code, Home, Maze, Supabase, or tests.
- Do not run `npm run build:factions`.

## Review Result Options

- `review-approved-for-future-promotion-planning`
- `review-blocked-repair-required`
- `review-blocked-evidence-gap`

This is a source-packet review result only. It does not approve Temur for runtime, placement, generated data, Home preview, routing, fixtures, or app integration.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This approval means the Temur raw packet is acceptable as a future VM-208 input only. It does not make Temur live, placement-eligible, preview-eligible, routed, generated, or visible.

## Validation Results

- Reviewed exactly five target files:
  - `data/raw-factions/temur/temur.sources.json`
  - `data/raw-factions/temur/temur.claims.json`
  - `data/raw-factions/temur/temur.profile.json`
  - `data/raw-factions/temur/temur.placement.json`
  - `data/raw-factions/temur/temur.changelog.json`
- Before/after SHA-256 hashes matched for all five Temur JSON files:
  - `temur.sources.json` - `D2D2C96E40D78BE58E9BB5FA2AC414F6738074E611237C56412E9B551C4C3435`
  - `temur.claims.json` - `C2C7839BE001619C2A5BEA0F2CAC2838FDC94C632AFFC3C7CC5888F79800E029`
  - `temur.profile.json` - `3D27A5927B9687713393834FC1415327696B85A307FA41095BAE24DA0755206C`
  - `temur.placement.json` - `C364F7C48FB6FEE08080DD133E8EA988AF6C814152313A5AC7ACBED1D79A86F8`
  - `temur.changelog.json` - `506E6F535D5D14FCB40F90335DD7720148F151FC87DBE2145D23973B5B14A937`
- Evidence mapping matched the expected VM-207 mapping.
- Source-role validation passed.
- Non-live status validation passed.
- Leakage scan passed.

## Acceptance Criteria

- [x] Exactly five expected JSON files exist and parse.
- [x] Top-level packet shape matches the accepted Bant/Esper/Grixis/Jund/Naya raw packet family.
- [x] Raw claim IDs are contiguous `temur_claim_####` IDs.
- [x] All raw-claim source IDs resolve.
- [x] Raw-claim sources are classified as `claim-bearing`.
- [x] Source roles are limited to `claim-bearing`, `shaping-only`, and `support-only`.
- [x] Raw claims reference only approved `TEMUR-EVID-###` rows.
- [x] Support-only rows, manual-fill rows, Commander/operator rows, generic GUR support, seed material, generated HTML, and architecture prose do not become raw claims.
- [x] VM-204/VM-205 architecture docs remain shaping-only inputs.
- [x] `placement_axes` remains empty unless already approved.
- [x] No live-status, runtime, generated-data, Home preview, routing, fixture, or app-integration fields are introduced.

## Suggested Tests

- JSON parse check across all five Temur raw files.
- Raw claim/source-role/evidence resolver.
- Content hash before/after review to verify no unintended raw edits.
- Scope guard confirming no runtime/generated/builder/Maze/route/Supabase/Home-preview paths changed.
