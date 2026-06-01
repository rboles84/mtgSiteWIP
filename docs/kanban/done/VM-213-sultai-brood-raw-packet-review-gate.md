# VM-213 - Sultai Brood Raw Packet Review Gate

ID: VM-213
Title: Sultai Brood Raw Packet Review Gate
Status: done
Type: Review Gate
Area: Sultai Brood, Raw Factions, Evidence Validation
Priority: high
Created: 2026-05-31

## Summary

Review the VM-212 Sultai Brood authored-but-not-live raw-faction packet without editing, repairing, formatting, regenerating, building, or promoting it.

## Dependency

Blocked until VM-212 is complete.

## Gate

Only a recorded `review-approved-for-future-promotion-planning` result can unblock VM-214.

## Review Result

Status: `review-approved-for-future-promotion-planning`

This is a review-only approval. It means the VM-212 Sultai raw packet is acceptable as a future VM-214 planning input only. It does not make Sultai live, placement-eligible, preview-eligible, routed, generated, visible, or integrated into app surfaces.

## Scope

- Perform the AGENTS.md pre-flight review before implementation.
- Capture before/after hashes for all five Sultai raw JSON files.
- Validate JSON parse, exact file set, top-level shape, evidence-row resolution, source-role policy, claim references, profile references, placement references, and non-live status fields.
- Run leakage scans for runtime, generated, route, Home, Maze, Supabase, placement eligibility, preview eligibility, and live-pilot terms.
- Record either `review-approved-for-future-promotion-planning` or a repair-needed result.

## Non-Goals

- Do not edit, repair, reformat, regenerate, build, or promote Sultai raw JSON.
- Do not edit runtime, generated artifacts, schemas, Maze files, route files, Home preview files, Supabase files, Abzan files, or Temur files.
- Do not approve placement eligibility, preview eligibility, routing, generated data, Home/Maze visibility, schemas, Supabase, fixtures, aliases, lookup keys, or app integration.

## Acceptance Criteria

- [x] Before/after hashes match for all five Sultai raw JSON files.
- [x] Source-role validation passes.
- [x] Evidence-row resolver passes.
- [x] Non-live status validation passes.
- [x] Leakage scans pass.
- [x] Review result is recorded clearly.
- [x] No raw JSON, generated, runtime, schema, Maze, route, Home, Supabase, Abzan, or Temur files are changed by VM-213.

## Before / After Hashes

| File | Before SHA-256 | After SHA-256 |
|---|---|---|
| `sultai.changelog.json` | `921C1E24450495978C601F02C541694CABA2F7CD5E6D32906E7738B5CAFDF227` | `921C1E24450495978C601F02C541694CABA2F7CD5E6D32906E7738B5CAFDF227` |
| `sultai.claims.json` | `9F5BEBE900EC12497A265E476D6EBC14FA87967859B2E9C9955A92A593244785` | `9F5BEBE900EC12497A265E476D6EBC14FA87967859B2E9C9955A92A593244785` |
| `sultai.placement.json` | `6E8C5A4B83DBBB783B4376B9A0AF2D09E04FDD22E53B7429A79C3DD1BDB65A6C` | `6E8C5A4B83DBBB783B4376B9A0AF2D09E04FDD22E53B7429A79C3DD1BDB65A6C` |
| `sultai.profile.json` | `F823F04D6B6BCCB945C708DFB935E942D0C88641EECFA563C30630FBF1100180` | `F823F04D6B6BCCB945C708DFB935E942D0C88641EECFA563C30630FBF1100180` |
| `sultai.sources.json` | `41B42CF330D7303FC58E11D29520D94FCA55D9C12C8D52794139B8B2F9D207E3` | `41B42CF330D7303FC58E11D29520D94FCA55D9C12C8D52794139B8B2F9D207E3` |

## Validation Notes

- Exact five-file set and JSON parse passed.
- Top-level key parity passed against the source-authored raw packet shape.
- Exactly 10 contiguous claim IDs were found: `sultai_claim_0001` through `sultai_claim_0010`.
- Every raw-claim `SULTAI-EVID-###` row resolved against the VM-209 evidence ledger.
- Non-boundary raw claims use only `Promoted` evidence rows.
- Boundary and lifecycle raw claims use `Guardrail` rows only for boundary, false-positive, source-role, or non-live lifecycle claims.
- Raw claims do not use `SULTAI-EVID-031`, `SULTAI-EVID-032`, `SULTAI-EVID-035`, `SULTAI-CMD-###`, `SULTAI-MF-###`, `SULTAI-SRC-###`, seed files, architecture prose, generated files, or support-only sources as evidence.
- Every raw-claim source resolves and has `source_role: claim-bearing`; architecture docs remain `shaping-only`; Commander, Scryfall, and manual-fill sources remain `support-only`.
- Profile and placement claim references are subsets of the 10 raw claims.
- Non-live fields remain set: `source_authored_review_gated`, `not_placement_eligible`, `preview_eligible: false`, `review_gated: true`, `placement_eligible: false`, `live_pilot: false`, and `placement_axes: []`.
- Leakage scan found no promotion wiring terms.

## Suggested Tests

- `Get-FileHash -Algorithm SHA256` before and after review for all five Sultai raw JSON files.
- JSON parse check.
- File-count and exact-file-set check.
- Source-role resolver.
- Evidence-row resolver.
- Non-live status validator.
- Raw packet leakage scan.
- Promotion-leakage `git diff --name-only` check.
- Scoped `git diff --check`.
