# VM-300 - Source / Generated Guardrails

**Status:** done
**Type:** validation / data governance
**Area:** faction-data / raw-factions / generated-artifacts
**Priority:** critical
**Created:** 2026-06-05
**Completed:** 2026-06-05

## Summary

Add focused guardrails so source-first faction quality passes cannot silently promote generated-only placement/profile output as durable truth.

## Scope

- Add validation scripts, package scripts/tests, fixtures if needed, and docs.
- Validate target factions by comparing `data/raw-factions/**` source backing against generated `data/placement-model.json`.
- Fail when generated placement/profile output appears stronger, newer, or more complete than raw source backing.
- Do not redesign placement schemas.
- Do not hand-edit generated placement output.
- Do not treat generated files as source of truth.
- Do not author Yore, Dune, Glint, Ink, Witch, Jeskai, Mardu, or any other faction data in this card.

## Acceptance Criteria

- Validator flags generated-only additions to claim IDs, claim counts, placement model version, calibration axes, discriminator fields, good/poor fit indicators, inhibitor traps, collision targets, and profile metadata.
- Validator reports exact target faction and field path for each source/generated durability defect.
- Package script exists for focused validation.
- Documentation clarifies approved display inputs and generated-output exclusions.
- VM-300 validation runs successfully for the repaired Jeskai/Mardu source-durable regression set.
- Existing known Temur color-order residual remains documented and unfixed.

## Validation

- [x] JSON parse for relevant files.
- [x] `node --check research\validate-source-generated-guardrails.mjs`
- [x] `node --check research\build-faction-artifacts.mjs`
- [x] `node --check research\build-archscry-flavor-snippets.mjs`
- [x] VM-300 source/generated guardrail validator passed for default Jeskai/Mardu regression set.
- [x] VM-300 exploratory four-color audit failed as expected, documenting Yore/Dune/Glint/Ink generated-vs-raw durability defects before downstream authoring.
- [x] `node research\archscry-dossier-followup-tests.js`
- [x] `node research\maze-search-tests.js`
- [x] `npm run test:placement` rerun; known Temur residual remains the only failure.

## Outcome

- Added `research/validate-source-generated-guardrails.mjs`.
- Added `validate:source-generated` and `test:source-generated` package scripts.
- Documented the VM-300 source/generated contract in `docs/reference/source-generated-guardrails.md`.
- Linked the guardrail contract from `docs/reference/data-contracts.md`.
- No generated placement output, schemas, Supabase context, or faction authoring data was edited to satisfy the validator.

## Current Findings

- Default validator target set `JESKAI,MARDU` passes with model-owned biological-prior inhibitor warnings.
- Exploratory `YORE,DUNE,GLINT,INK` validation fails. This is the intended next-pass stop signal: repair raw source or approved display input, rebuild, then rerun validation before continuing downstream.
- Witch remains excluded from new authoring scope per user direction, but the validator can target it explicitly if a future Witch audit is desired.

## Related Work

- VM-297 - Placement Data Source-Of-Truth Contamination Audit
- VM-298 - Witch Public-Copy And Source-Durability Repair
- VM-299 - Jeskai And Mardu Source-Durability Repair
