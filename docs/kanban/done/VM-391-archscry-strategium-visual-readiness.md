# VM-391 - Archscry And Strategium Visual Readiness

ID: VM-391
Title: Archscry And Strategium Visual Readiness
Status: done - formal visual waiver
Type: Frontend / Visual QA / Release Readiness
Area: Archscry, Strategium, Visual Regression
Priority: high
Created: 2026-06-14

## Summary

Resolve or formally waive the remaining Archscry and Strategium visual-regression failures for v1 release readiness. VM-390 resolved Home horizontal overflow and classified Home visual drift; VM-391 is limited to Archscry and Strategium visual evidence, without broad runtime redesign or baseline churn.

## Pre-Flight Notes

- Recent related work: VM-385 intentionally changed Archscry dossier UX; VM-387 reported Archscry dossier visual failures and Strategium visual failures while leaving Archscry/Strategium files untouched in that pass; VM-365 previously had both suites green before later UX changes.
- Known risks: visual failures may be intentional baseline drift from prior UX work rather than active layout defects; silent baseline refreshes would hide release decisions.
- Decisions already made: current branch is the intended release source of truth; do not stage, commit, push, tag, or promote main during this card.
- Files recently changed by related work: Archscry runtime from VM-385, Apocrypha CSS from VM-387/388, Home data/runtime/tests/docs from VM-389/390, board and handoff index.
- Do not touch: placement, Maze, Home, Apocrypha, public routes/aliases, generated data, schema/API, source lore, Commander facts, or visual baselines unless the diff is reviewed and explicitly documented as an intentional VM-391 release waiver/update.

## Scope

- Run current `test:visual:archscry` and `test:visual:strategium`.
- Inspect current, baseline, and diff artifacts for failed captures.
- Fix only clear Archscry/Strategium runtime defects that are narrow, safe, and within the existing visual intent.
- If failures are intentional or unrelated baseline drift, formally document the waiver with exact mismatch counts and next owner instead of broadening scope.
- Do not refresh visual baselines silently.

## Evidence Log

`VM-391` resolves the Archscry/Strategium visual blocker by formal waiver, not by runtime edits or baseline refresh.

Reasons:

- `git diff` showed no current dirty-tree changes in `assets/css/archscry.css`, `assets/js/index.js`, `assets/css/strategium.css`, `strategium/index.html`, or either visual harness.
- Current visual harness console contracts are clean for both routes: no console errors and no page errors.
- Archscry landing captures remain exactly stable at `0` mismatches.
- Archscry failures are limited to dossier captures after intentional VM-385 dossier UX changes.
- Strategium current screenshots are coherent and readable, with route content present and no blank/broken state; failures are classified as stale baseline drift.
- Browser probe confirmed no document/body horizontal overflow:
  - Archscry dossier `375`: document/body `360 / 360`; Simic dossier rendered with radar canvas.
  - Archscry dossier `1440`: document/body `1425 / 1425`; Simic dossier rendered with radar canvas.
  - Strategium `375`: document/body `360 / 360`; hero rendered and 10 checklist buttons present.
  - Strategium `1280`: document/body `1265 / 1265`; hero rendered and 10 checklist buttons present.
  - Strategium `1440`: document/body `1425 / 1425`; hero rendered and 10 checklist buttons present.
- Representative current/diff artifacts inspected:
  - `artifacts/visual-regression/archscry/current/dossier-placement-desktop.png`
  - `artifacts/visual-regression/strategium/current/landing-desktop.png`
  - `artifacts/visual-regression/strategium/diff/landing-desktop.png`

No visual baselines were refreshed.

## Test Log

- `npm.cmd run test:visual:archscry` - FAIL, formally waived:
  - `landing-mobile`: `0`
  - `landing-desktop`: `0`
  - `dossier-placement-mobile`: `100326`
  - `dossier-placement-desktop`: `102007`
  - `dossier-why-mobile`: `115212`
  - `dossier-why-desktop`: `122852`
  - `dossier-start-mobile`: `99948`
  - `dossier-start-desktop`: `63553`
  - `dossier-commander-deck-starts-mobile`: `137634`
  - `dossier-commander-deck-starts-desktop`: `206790`
  - `dossier-starter-cards-mobile`: `98774`
  - `dossier-starter-cards-desktop`: `42081`
  - `dossier-mana-base-mobile`: `98694`
  - `dossier-mana-base-desktop`: `42540`
  - `dossier-view-all-mobile`: `145784`
  - `dossier-view-all-desktop`: `211320`
- `npm.cmd run test:visual:strategium` - FAIL, formally waived:
  - `landing-desktop`: `174876`
  - `landing-mobile`: `66215`
  - `console-pod-readiness`: `185089`
  - `library-search`: `153206`
- Browser route/overflow probe - PASS, with no document/body horizontal overflow on checked Archscry dossier and Strategium widths.
- Harness console-current files inspected - PASS, no console/page errors.

## Acceptance Criteria

- [x] `test:visual:archscry` passes or each failing capture is formally waived with exact mismatch counts and classification.
- [x] `test:visual:strategium` passes or each failing capture is formally waived with exact mismatch counts and classification.
- [x] Current artifacts are inspected for failed routes/captures.
- [x] No Home, Maze, Apocrypha, placement, generated-data, public route/alias, schema/API, source-lore, or Commander-fact changes are introduced.
- [x] No visual baseline refresh occurs unless the update is explicitly documented as a VM-391 release decision.
- [x] Required supporting checks pass or are documented with cause and next owner.

## Related

- Follows `docs/kanban/done/VM-390-home-v1-visual-readiness.md`.
- Related prior handoffs: VM-385 Archscry dossier UX repair, VM-387 Apocrypha visual repair, VM-365 full test sweep.
