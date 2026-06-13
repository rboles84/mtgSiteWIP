# VM-277 - Glint Live Placement Copy Polish And Precon Framing Repair

ID: VM-277
Title: Glint Live Placement Copy Polish And Precon Framing Repair
Status: done
Type: Runtime Presentation / Manual QA Repair
Area: Glint, Archscry, Commander Dossier, Precon Previews
Priority: high
Created: 2026-06-03
Completed: 2026-06-03

## Summary

Repaired the live Glint placement-page copy issues surfaced in pasted Archscry output without reopening Glint raw data, source-packet, route, alias, preview, hero, or schema work.

## Results

- Rewrote Glint presentation copy so the live page no longer leaks internal model language such as `strict separation from generic chaos` or `strict non-White false-positive boundaries`.
- Replaced the broken reusable clause behind `turns that pressure into keep the surge alive...` with a grammatically reusable Glint table-experience line.
- Added authored Glint/Black comparison copy so the adjacent fork stops falling back to `What does this path do with the same tension?`.
- Added presentation-only Glint precon preview overrides so `Entropic Uprising` reads as product-support Commander texture rather than generic chaos spectacle and Glint stretch fits no longer claim that adding White preserves core Glint identity.
- Replaced the stale Archscry frontier/footer sentence with a truthful total-count-led line that no longer mixes `32` with incomplete subgroup math.
- Added focused Glint regression coverage in the runtime and dossier follow-up suites.

## Verification

- `node --check assets\js\archscry-presentation.js`
- `node --check assets\js\commander-dossier.js`
- `node --check assets\js\index.js`
- `node --check assets\js\quick-reading-tests.js`
- `node --check research\archscry-dossier-followup-tests.js`
- `node research\archscry-dossier-followup-tests.js`
- `npm.cmd run test:presentation-snapshots`
- `npm.cmd test` -> blocked by an unrelated existing `QUANDRIX` golden-path failure in `assets/js/quick-reading-tests.js`
- scoped `git diff --check`

## Protected Surfaces

- Did not edit `data/raw-factions/glint/**`.
- Did not edit `docs/research/glint/**`.
- Did not edit `docs/architecture/colors/glint/**`.
- Did not edit `data/precons/**` or rebuild the precon catalog.
- Did not change routes, aliases, Home preview membership, Glint hero behavior, generated faction/raw data, or schema files.
- Did not touch non-Glint runtime behavior except for a focused Dune test expectation fix that matched current deck-search ordering already present in repo truth.

## Related Handoff

- `docs/handoffs/2026-06-03-2122-codex-vm277-glint-placement-copy-polish.md`
