ID: VM-280
Title: Four-Color Exact Commander Maze Handoff Contract And Deck-Start Fallback Repair
Status: done
Type: Runtime Repair / Maze Handoff / Commander Deck Starts
Area: Yore, Glint, Dune, Archscry, Maze, Commander Deck Starts
Priority: high
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Repair the shared live four-color dossier-to-Maze runtime contract so `YORE`, `GLINT`, and `DUNE` keep executable operator-query handoffs, suppress the outside-color stretch lane, and stop collapsing Commander Deck Starts to Archidekt-only when exact-color precon commanders are already available in the rendered dossier result.

2026-06-04 addendum: complete the stricter exact-commander lane repair for live four-color "From Your Dossier" Maze links. The `commanders-that-fit` lane now normalizes to broad identity-only commander searches for `YORE`, `GLINT`, and `DUNE`, while support-card and flavor-echo lanes retain bounded thematic terms.

## Results

- Added identity-set-safe live four-color permutation resolution and canonical query identity support for `YORE`, `GLINT`, and `DUNE` in `research/research-init.js`.
- Kept Archscry-origin live four-color Maze launches on executable operator syntax in the visible Maze input while preserving plain-reading metadata for return context.
- Restored live four-color personalized Maze labels to `Yore`, `Glint`, and `Dune`.
- Removed the outside-color stretch lane from live four-color personalized Maze paths.
- Preserved canonical executable identities as `wubr`, `ubrg`, and `brgw`, including rewriting Dune away from the old `wbrg` drift.
- Normalized live four-color exact commander Maze lanes to:
  - `YORE`: `id=wubr is:commander f:commander`
  - `GLINT`: `id=ubrg is:commander f:commander`
  - `DUNE`: `id=brgw is:commander f:commander`
- Hardened stale live four-color commander handoffs so a stale Glint launch containing `guild=WB` and themed Glint operator terms restores the visible hint as `Glint` and executes `id=ubrg is:commander f:commander`.
- Superseded the earlier VM-279 Dune exact commander expectation of `id=wbrg is:commander f:commander`; `brgw` is the live Vox Mana query payload for Dune exact commander Maze links.
- Added a presentation-only Commander Deck Starts fallback from exact/native rendered precon recommendations so `Breya`, `Yidris`, and `Saskia` can power commander-specific EDHREC/MTGDecks links when directory links are suppressed.
- Kept reserved `INK`, `WITCH`, `RGWU`, and `GWUB` non-live.

## Protected Surfaces

- Did not edit `data/raw-factions/**` for four-color lanes.
- Did not edit `docs/research/**` or `docs/architecture/colors/**` for four-color lanes.
- Did not edit `data/precons/**`.
- Did not edit generated JSON/data files.
- Did not change routes, aliases, Home preview, hero behavior, or schema surfaces.

## Verification

- Live four-color Maze launches now resolve permutations into their own canonical executable identities without crossing into another lane.
- Live four-color `commanders-that-fit` links contain no `o:`, `ft:`, `storm`, `spell chain`, `knowledge`, `study`, `hungry`, `devouring`, `aggro`, or `aggressive` filters.
- Support-card and flavor-echo paths remain present and may keep bounded thematic terms.
- Outside-color stretch paths remain absent for `YORE`, `GLINT`, and `DUNE`.
- `YORE`, `GLINT`, and `DUNE` Commander Deck Starts no longer rely on Archidekt alone when exact-color precon commanders are available in the rendered dossier result.
- No lowercase or uppercase color-code Commander directory links are emitted for four-color lanes.
- Reserved `INK`, `WITCH`, `RGWU`, and `GWUB` remain non-live in the shared runtime contract.

## Tests Run

- `node --check research/research-init.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/index.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/maze-search-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/maze-search-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `node --input-type=module -e "...focused personalized Maze exact commander checks for YORE/GLINT/DUNE..."` - passed
- `node --input-type=module -e "...buildPersonalizedMazePaths probe for YORE/GLINT/DUNE..."`
- `npm.cmd run test:presentation-snapshots`
- `node assets/js/quick-reading-tests.js` - still fails on the pre-existing unrelated QUANDRIX golden-path assertion before the VM-280 path assertions would run
- `npm.cmd test` - still fails on the same pre-existing unrelated QUANDRIX golden-path assertion via `assets/js/quick-reading-tests.js`
- `git diff --check` - passed; emitted only existing CRLF normalization warnings
- In-app browser verification attempt via Browser skill failed because the local browser runtime exited unexpectedly (`windows sandbox failed: spawn setup refresh`)

## Related Handoff

- `docs/handoffs/2026-06-03-2253-codex-vm280-four-color-maze-handoff-repair.md`
