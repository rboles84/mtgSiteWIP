ID: VM-292
Title: Dossier Warning Content Repair
Status: Done
Type: Data / Content Repair
Area: Commander Dossier, Faction Data, Audit
Priority: high

## Summary

Used the aligned Commander dossier research packet to author the covered starter-card and commander-recommendation warning fixes into the dossier source path.

## Scope Completed

- Added packet-backed starter-card staples for the affected wedge and four-color dossier identities.
- Added curated commander recommendation coverage for Bant, Abzan, Temur, Sultai, Mardu, Jeskai, Yore, Glint, Dune, and Ink.
- Kept four-color commander coverage conservative: one validated canonical/precon-derived face per four-color identity, with no invented expansion beyond local validation.
- Rewrote the first attempted Abzan commander description after audit correctly flagged a banned generic phrase.
- Updated focused dossier follow-up assertions so newly authored starter-card coverage is expected rather than advisory warnings.
- Regenerated the dossier audit report and warning inventory from the current audit output.

## Result

- `npm.cmd run dossier:audit` exits successfully with `failures: 0`.
- Optional starter-card content-gap warnings are gone.
- Generic commander recommendation fallback warnings are gone.
- Commander path identity-specificity warnings are gone.
- Remaining warnings are land-source cleanup only:
  - 104 generated dossier files still carry warnings.
  - 327 unique exact warning entries remain in the refreshed inventory.
  - 327/327 exact entries are unique with no duplicates.

## Out Of Scope Preserved

- Broad land-warning cleanup for the remaining duplicate/source land warnings.
- Generated dossier markdown manual edits.
- Audit-policy loosening.
- Runtime UI redesign.
- Unrelated dirty-worktree cleanup.

## Validation

- Local Scryfall starter-card validation: 85 proposed starter-card names checked, 0 missing.
- Local Scryfall commander-face validation: all added commander faces found in the local commander index.
- Commander preview diagnostic confirmed coverage:
  - Bant 3
  - Abzan 3
  - Temur 3
  - Sultai 3
  - Mardu 3
  - Jeskai 2
  - Yore 1
  - Glint 1
  - Dune 1
  - Ink 1
- `npm.cmd run dossier:audit` passed with `Pass: 0; warnings: 104; failures: 0`.
- `node research/archscry-dossier-followup-tests.js` passed.
- `npm.cmd test` passed.
- Warning inventory validation passed: 327 exact entries, 327 unique, 0 duplicates, and no stale starter/commander warning phrases.
- `git diff --check` passed for touched tracked paths, with line-ending normalization warnings only.

## Notes

- The `warnings: 104` audit number is a generated-file count, not proof that the starter/commander warning classes remain. Current warning content is land-source cleanup only.
- Some touched files already had pre-existing tracked drift from prior VM work. VM-292 documentation and handoff distinguish this slice's targeted changes from the broader dirty worktree.
