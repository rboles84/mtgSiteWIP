# VM-298 - Witch Public-Copy And Source-Durability Repair

**Status:** done
**Type:** repair
**Area:** faction-data / source-of-truth / public-copy
**Priority:** high
**Created:** 2026-06-05
**Completed:** 2026-06-05

## Summary

Repaired Witch-only source-of-truth contamination identified by VM-297 while preserving live `WITCH` from VM-269. The repair restores the VM-264 through VM-268 five-claim evidence boundary after the untrusted VM-295 generated-authoring pass.

## What Changed

- Updated durable Witch raw profile and placement source so builder-readable metadata exposes exactly `witch_claim_0001` through `witch_claim_0005`.
- Added conservative Witch placement calibration, mechanics summary, and discriminator question detail from approved raw claims only.
- Rebuilt the WITCH placement object from repaired source and accepted only the WITCH generated object, leaving Jeskai and Mardu generated drift for VM-299.
- Cleaned Witch public copy by removing public `GWUB` / `WUBG` overreach, Atraxa Grand Unifier promotion, definitive-anchor wording, and naming-authority language.
- Added WITCH flavor-snippet exclusions for Witch-Maw, Atraxa, `Breed Lethality`, and color-code leakage, then regenerated and accepted only the WITCH snippet block.

## Acceptance Results

- Durable Witch source metadata now reflects five approved raw claims.
- Generated Witch placement now reports `profile_version: "0.1.1"` and `claim_count: 5`.
- Generated Witch placement no longer cites `WITCH-EVID-009` or `WITCH-EVID-011`.
- WITCH snippets no longer surface `GWUB`, `WUBG`, Atraxa, `Breed Lethality`, or Witch-Maw.
- Object-hash validation showed final generated changes were WITCH-only in faction display, placement, and snippets relative to the VM-298 pre-build snapshot.

## Tests

- Pass: JSON parse for Witch raw files plus faction, placement, and snippet JSON.
- Pass: `node --check research\build-faction-artifacts.mjs`.
- Pass: `node --check research\build-archscry-flavor-snippets.mjs`.
- Pass: focused VM-298 Witch source/generated validator.
- Pass: `node research\maze-search-tests.js`.
- Fail, unrelated existing residual: `npm.cmd run test:placement` still fails the Temur wording assertion.
- Fail, unrelated existing residual: `node research\archscry-dossier-followup-tests.js` still fails the Jeskai snippet provenance assertion.
- Pass: scoped trailing-whitespace check.
- Pass with line-ending warnings only: scoped `git diff --check`.

## Not Touched

- No Jeskai or Mardu repair.
- No Yore, Dune, Glint, Ink, five-color, colorless, or other placement-quality work.
- No new Witch raw claims or new evidence authority.
- No Home preview membership, routes, aliases, Maze redesign, hero work, schemas, Supabase logic, or VM-300 guardrails.

## Follow-Up

- VM-299 should repair Jeskai and Mardu source durability.
- VM-300 should add guardrails for generated-file authoring, raw/generated drift, evidence roles, public leakage, and builder reproducibility.
