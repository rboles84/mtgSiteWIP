# VM-299 - Jeskai And Mardu Source-Durability Repair

**Status:** done
**Type:** repair
**Area:** faction-data / source-of-truth / generated-artifacts
**Priority:** high
**Created:** 2026-06-05

## Summary

Repair Jeskai and Mardu source durability after VM-297 audited VM-294 and VM-296 and classified their generated/display edits as useful but non-durable until ported back to raw-owned sources.

## Scope

- Jeskai and Mardu only.
- Work from `data/raw-factions/**` first.
- Regenerate through approved builders, then accept only intended Jeskai/Mardu generated output.
- Do not touch Witch, Yore, Dune, Glint, Ink, five-color, colorless, Home, Maze, routes, schema design, or VM-300 guardrails.

## Acceptance Criteria

- Jeskai and Mardu raw placement/profile files carry the builder-owned placement calibration, indicators, discriminator details, and metadata needed for generated durability.
- Generated `source_metadata.profile_version` and `claim_count` match promoted raw claim/evidence floors, not hand-edited generated claims.
- Desired generated/display improvements that cannot be traced to promoted raw claim IDs plus source/evidence rows are left out and documented as support-only/manual-fill.
- Jeskai flavor snippets are reproducible from committed Scryfall indexes.
- Mardu snippets remain unchanged unless a concrete source defect is found.
- Builder output is accepted only for Jeskai/Mardu generated objects and the existing generated Supabase faction-context artifact if rewritten for those factions.

## Stop Conditions

- Stop if promoted raw claim IDs and evidence rows are insufficient to support the intended port.
- Stop if generated output cannot be made to match raw metadata without broad builder, schema, or VM-300 guardrail work.
- Stop rather than fixing unrelated failures; capture exact command/output summaries in the handoff.

## Validation

- [x] JSON parse for touched raw/generated data.
- [x] `node --check research\build-faction-artifacts.mjs`
- [x] `node --check research\build-archscry-flavor-snippets.mjs`
- [x] Focused source/generated validation for Jeskai/Mardu.
- [x] `node research\archscry-dossier-followup-tests.js`
- [x] `npm.cmd run test:placement` rerun after focused assertion update; only the pre-existing Temur Maze query wording residual remains.
- [x] `node research\maze-search-tests.js`
- [x] `supabase/functions/guild-recruiter/faction-context.ts` generated object parsed by focused validation; no dedicated Supabase/Deno/TypeScript check was found in repo scripts/config.

## Outcome

- Completed VM-299 source-durability repair for Jeskai and Mardu only.
- Ported supported profile, placement, discriminator, calibration, lifecycle, and claim/source metadata into raw-owned files.
- Regenerated approved artifacts and accepted only Jeskai/Mardu generated object changes, plus Jeskai flavor snippets reproduced from committed Scryfall indexes.
- Restored non-target generated Supabase `WITCH` context drift from the pre-build snapshot.
- Left the unrelated Temur Maze query wording residual unfixed and recorded it for handoff.

## Related Work

- VM-294 - Jeskai Placement Data Quality Authoring Pass
- VM-296 - Mardu Placement Data Quality Authoring Pass
- VM-297 - Placement Data Source-Of-Truth Contamination Audit
- VM-298 - Witch Public-Copy And Source-Durability Repair
