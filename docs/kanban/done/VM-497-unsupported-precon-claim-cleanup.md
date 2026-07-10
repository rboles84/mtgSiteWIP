# VM-497 - Unsupported Precon Claim Cleanup

## Status

Complete

## Summary

Neutralized unsupported popularity, strength, primacy, consensus, and six-color claims in the canonical precon catalog; rebuilt the runtime catalog; and added a semantic, path-scoped builder guard with positive and negative fixtures.

## Scope Completed

- Rewrote guarded editorial fields in `data/precons/vox-mana-precons.source.json` while preserving mechanical descriptions, commander abilities, deck plans, and tactical comparisons.
- Corrected Eldrazi Incursion to a five-color identity with colorless-mana requirements.
- Added semantic authority-language validation to `research/build-precon-artifacts.mjs` without introducing a blanket word ban.
- Added failing fixtures for popularity, strength, instructional primacy, broad consensus, and six-color language, plus passing ordinary-terminology and tactical fixtures.
- Rebuilt `data/precons/vox-mana-precon-catalog.json` only through the canonical builder.
- Documented the CSV and workbook under `data/precons/reference/` as historical provenance rather than runtime input.

## Acceptance Results

- [x] Canonical and generated catalogs contain no prohibited authority patterns in guarded fields.
- [x] Eldrazi Incursion uses five-color identity plus colorless-mana-requirement wording.
- [x] Mechanical descriptions and tactical `best target` language remain allowed.
- [x] Builder fixtures cover popularity, strength, primacy, consensus, six-color, ordinary terminology, and tactical language.
- [x] Source/generated counts remain 155 and the generated catalog was rebuilt only from canonical inputs.
- [x] Reference and archive lanes are explicitly documented as non-runtime provenance.
- [x] Validation, handoff, board, and commit isolation are complete.

## Validation

- `npm.cmd run build:precons` - passed; rebuilt 155 records.
- `node research/precon-artifact-tests.js` - passed.
- Semantic negative scan of canonical and generated catalogs - passed with no prohibited patterns.
- Positive fixtures for ordinary Commander/deck terminology, support packages, and tactical comparisons - passed.
- `npm.cmd test` - passed.
- `git diff --check` - passed.

## Guardrails Preserved

- No reference CSV or archived workbook content was rewritten.
- No placement scoring, ranking logic, routes, identities, legality claims, prices, lore, or card facts changed.
- VM-496 files remained unstaged and outside the VM-497 commit.

## Related Work

- VM-136 - Archscry Precon Layer.
- VM-139 - Validated Precon Mechanics Import.
- VM-496 - Vox Mana Self-Snapshot 2026-07-10.
