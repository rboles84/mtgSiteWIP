# VM-370 - WUBRG Claim-Backed Lore Depth

ID: VM-370
Title: WUBRG Claim-Backed Lore Depth
Status: done
Type: Source-bound lore/profile repair
Area: WUBRG / Layer 2 / raw profile
Priority: high
Created: 2026-06-13

## Summary

Add a WUBRG depth/readiness matrix before raw/profile edits, then promote only exact source-backed rows into WUBRG claims and profile fields.

## Scope

- Record a WUBRG depth/readiness matrix before raw/profile edits.
- Promote only exact source-backed rows into claims/profile fields.
- Use product anchors only for named examples, deck/product texture, and source coverage unless a source explicitly supports lore or philosophy.
- Preserve WUBRG as source-bound Five-Color synthesis, not an endpoint, universal superset, default high-complexity answer, or completion state.

## Out Of Scope

- No lore invention, product-anchor metaphysics, public API, schema, route, Home preview, alias expansion, hero asset, directory-link expansion, staging, or commits.
- No direct generated-file evidence.

## Acceptance Criteria

- [x] WUBRG depth/readiness matrix exists before raw/profile promotion.
- [x] Any new claim/profile row traces to source/evidence IDs.
- [x] Product anchors remain support/product texture only unless explicitly claim-bearing.
- [x] WUBRG remains placement-eligible, preview-ineligible, and directory-link suppressed.
- [x] Required WUBRG validation and full test plan pass or failures are reported.

## Completion Notes

- Added `docs/research/wubrg/wubrg-depth-readiness-matrix.md` before raw/profile promotion.
- Promoted only exact source-backed rows into WUBRG claims/profile fields.
- Added a product-anchor boundary claim so official product/decklist anchors support named examples, deck/product texture, and source coverage only.
- Preserved WUBRG as source-bound Five-Color synthesis, not a universal superset, best identity, endpoint identity, completion state, or default high-complexity answer.

## Validation

- `node research/validate-source-generated-guardrails.mjs WUBRG`
- `npm.cmd run test:placement`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:parser`
