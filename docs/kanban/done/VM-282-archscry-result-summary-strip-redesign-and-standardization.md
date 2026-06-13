# VM-282 - Archscry Result Summary Strip Redesign And Standardization

ID: VM-282
Title: Archscry Result Summary Strip Redesign And Standardization
Status: done
Type: Runtime UX / Shared Dossier Contract / Tests
Area: Archscry, Commander Dossier, Presentation, CSS
Priority: high
Created: 2026-06-04
Completed: 2026-06-04

## Summary

Replace the current four-card Archscry placement snapshot with a shared three-card result summary strip that renders `Adjacent fit`, `Where this leads`, and `Play pattern` from a completed dossier-side contract instead of composing selection and copy inside the DOM renderer.

## Results

- Added pure `resultSummaryStrip` helpers in `assets/js/commander-dossier.js`:
  - `resolveSummaryAdjacentFit(...)`
  - `resolveSignalBand(...)`
  - `buildWhereThisLeadsSummary(...)`
  - `buildPlayPatternSummary(...)`
  - `buildResultSummaryStrip(...)`
- Added the `resultSummaryStrip` contract to `buildCommanderDossier(...)`.
- Switched `assets/js/index.js` to render the placement strip only from `dossier.resultSummaryStrip`.
- Replaced the old four-card snapshot with the three-card `Adjacent fit`, `Where this leads`, `Play pattern` strip.
- Updated Archscry strip CSS for the weighted desktop layout, mobile stacking order, tag-row hiding, and the subtle adjacent-signal treatment.
- Added focused summary-strip coverage to `assets/js/quick-reading-tests.js` and renderer/CSS assertions to `research/archscry-dossier-followup-tests.js`.
- Updated shared docs for the new contract and manual QA surface.

## Guardrails

- Do not touch raw faction packets, generated placement/runtime artifacts, routes, or public four-color promotion state.
- Do not reintroduce mana pips, compact identity strings, or CTA buttons inside the strip.
- Do not change hero, dossier rail, `Start Here`, or adjacent-switching behavior.
- Do not overwrite unrelated dirty four-color or docs work already present in the tree.

## Verification

- `node --check assets/js/index.js`
- `node --check assets/js/commander-dossier.js`
- `node --check assets/js/archscry-presentation.js`
- `node --check assets/js/quick-reading-tests.js`
- `node --check research/archscry-dossier-followup-tests.js`
- `node research/archscry-dossier-followup-tests.js`
- `npm.cmd run test:visual:archscry:baseline`
- `npm.cmd run test:visual:archscry`

## Known Follow-Up

- `npm.cmd run test:placement` and `npm.cmd test` remain blocked by the existing unrelated `QUANDRIX` golden-path regression in `assets/js/quick-reading-tests.js`, where the current repo returns `U` instead of `QUANDRIX`.
- Browser-plugin manual QA was not callable in this thread, so rendered verification relied on the passing Archscry visual-regression run.

## Related Handoff

- `docs/handoffs/2026-06-04-0030-codex-vm282-archscry-summary-strip-redesign.md`
