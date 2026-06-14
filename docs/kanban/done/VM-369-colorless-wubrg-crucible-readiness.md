# VM-369 - COLORLESS/WUBRG Crucible Readiness

ID: VM-369
Title: COLORLESS/WUBRG Crucible Readiness
Status: done
Type: Placement calibration / source gate
Area: Colorless / WUBRG / Crucible
Priority: high
Created: 2026-06-13

## Summary

Evaluate whether exactly one canonical `COLORLESS/WUBRG` Crucible is source-backed and reproducibly needed. Add it only if WUBRG and Colorless source support plus placement confusion reproduction both pass.

## Scope

- Use canonical pair key/order: `COLORLESS/WUBRG`.
- Cite `wubrg_claim_0007` plus relevant Colorless boundary claims if a Crucible is added.
- Separate "all five colors present and negotiated" from "chosen outside-WUBRG restriction."
- If no Crucible is added, record exactly one blocker type from the approved blocker list.

## Out Of Scope

- No `WUBRG/COLORLESS` reverse-order duplicate.
- No WUBRG/four-color Crucibles.
- No Colorless Compass links, deck links, research links, Home route, preview eligibility, directory links, aliases, or broad public richness.
- No public API, schema, route, Home preview, alias expansion, hero asset, directory-link expansion, staging, or commits.

## Acceptance Criteria

- [x] Source support is documented before any generated question-bank change.
- [x] Placement confusion is reproduced, or one approved blocker type is recorded.
- [x] At most one `COLORLESS/WUBRG` Crucible exists.
- [x] No reverse-order duplicate exists.
- [x] Required placement and dossier tests pass or failures are reported.

## Completion Notes

- Reproduced WUBRG/COLORLESS close-call placement confusion with paired Hall answers: WUBRG and COLORLESS were top two candidates with a 0.0178 probability gap and `needsCrucible=true`.
- Added exactly one `crucible_COLORLESS_WUBRG` question with canonical pair order `["COLORLESS", "WUBRG"]`.
- Added claim-backed collision guidance using `wubrg_claim_0007`, `colorless_claim_0002`, `colorless_claim_0005`, and `colorless_claim_0008`.
- Preserved Colorless public-richness gates: no Compass links, deck links, research links, route, Home preview, directory links, aliases, schema/API expansion, or broad public richness.

## Validation

- `node research/validate-source-generated-guardrails.mjs WUBRG`
- `npm.cmd run test:placement`
- `npm.cmd run dossier:audit`
- `npm.cmd test`
- `npm.cmd run test:parser`
- Explicit no-leak assertion: WUBRG placement true/preview false/no route/Home/directory/hero; Colorless preview false/no Compass/deck/research/route/Home/directory; WUBRG Crucibles exactly `crucible_COLORLESS_WUBRG:COLORLESS/WUBRG`.
