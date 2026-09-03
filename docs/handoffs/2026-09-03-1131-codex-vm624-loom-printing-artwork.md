# VM-624 Loom Printing & Artwork Refinement — Owner Review Handoff

## Agent and task

- **Agent:** Codex
- **Task:** implement the owner-approved Loom printing/artwork plan and stop for final Owner validation.
- **Card:** [VM-624](../kanban/in-progress/VM-624-loom-printing-artwork-refinement.md)
- **Branch / baseline:** `codex/vm-624-loom-printing-artwork` from clean `origin/main = e7435d24bdcd8a7325b16a48b6a66abd9576ec8d`.

## Pre-flight

- **Recent related work:** VM-592 established Loom's one live query, route-local builder state, explicit invalid-state recovery, and protected mode/query contracts. VM-612 is closed and no longer overlaps Maze presentation. VM-016 is owner-approved and already present in `origin/main`.
- **Known risks:** creating a second query owner, confusing eligibility with artwork grouping, losing invalid input, leaking Loom filters into Plain Reading/Operator semantics, and mobile action-order drift.
- **Decisions preserved:** release year is printing metadata; first-printing/new-art rules require a valid year; `unique=art` stays API metadata and is deferred; `MazeQueryResult.query` remains the only executable query.
- **Not touched:** parser/core, Scryfall fetch/result delivery, API `unique` metadata, Plain Reading, Operator's Hand semantics, Reading Finds, modal, Archscry handoff, placement/ranking, VM-591, generated data, and visual baselines.

## Files reviewed

- RobDev and RobQA skills/guides plus frozen `RobDevPass.md` and `RobQAPass.md`
- Maze contract, route ownership matrix, board, handoff index, VM-592 card/handoff, and current VM-016 handoff
- Loom markup/CSS, builder/init owners, focused Maze tests, and the local browser route

## Files changed

- `maze/index.html`, `assets/css/maze.css`
- `assets/js/maze/research-builder.js`, `assets/js/maze/research-init.js`, `assets/js/maze/maze-query-core.js` (cache-version import only)
- `scripts/validate-frontend-html.mjs`
- `tests/maze/research-builder-tests.js`, `tests/maze/maze-search-tests.js`, `tests/maze/maze-results-layout-tests.js`
- `docs/contracts/maze-query-contract.md`, VM-624 card, board, and this handoff/index

## What changed and why

- Added **Printing & artwork** after **Refine**: an optional four-digit release-year text field and a dependent native printing-rule select.
- Valid year values add `year=<year>`; the enabled rules add only `is:firstprinting` or `new:art`. W/U Commander plus 2015/first printing is exactly `id<=wu f:commander year=2015 is:firstprinting`.
- Invalid years preserve the entered text, show one associated local error, disable the rule/Copy/Open, prevent Scryfall execution, and receive focus on attempted Search.
- Extended existing Reset, summary, Current Weave, choice-count, mode-continuity, and action-refresh paths. No parser or core semantics, API metadata, or storage owner changed.
- Advanced the Maze CSS/module dependency chain to `vm624`; the changed builder module and the existing core consumer share that versioned import, preventing a stale cached module from omitting release-year clauses.
- The direct route witness exposed a misleading Current Weave error label; the narrow fix now says **Release year needs attention** and **Correct the release year in Printing & artwork.**

## RobDev packet

- **Owner / producer:** Loom builder projects clauses and validates; the Maze route owns control state, recovery, and presentation.
- **Changed behavior:** Loom-only printing eligibility constraints, dependent control state, validation/focus recovery, passive summaries, and valid live-action projection.
- **Protected behavior:** all non-Loom modes, sole executable query contract, Scryfall delivery/metadata, result surfaces, handoff/persistence, and placement semantics.
- **Smallest complete slice:** two controls, two local state fields, one pure projection extension, and existing validation/presentation seams.
- **Non-goals / stop conditions:** no set/date-range/art-tag/image-search/artwork-rollup UI; stop if API metadata or a second query owner becomes necessary.

## RobQA readiness

- **Tier:** QA-2 interaction with QA-3 local state/action delivery.
- **CPU-heavy validation:** `NOT REQUIRED`; no placement, ranking, parser, core, data, or deployment contract changed.
- **PASS:** `npm.cmd run test:builder` — default and printing clauses plus blank/invalid/minimum-year validation.
- **PASS:** `node tests/maze/maze-search-tests.js --vm592-focused` — live query, Copy/Open, invalid delivery block/focus, replacement rule, and mode continuity.
- **PASS:** `npm.cmd run test:mode`, `node tests/maze/maze-query-contract-tests.js`, and `npm.cmd run test:maze-results-layout`.
- **PASS:** `npm.cmd run lint:js`, `npm.cmd run lint:html`, and `git diff --check`.
- **Rendered sanity:** one local `http://127.0.0.1:4175/maze/` interaction pass only; confirmed disabled rule before a year, `f:commander year=2015 is:firstprinting`, matching Open URL, and invalid-year message/action block. No screenshots, visual-baseline run, or visual pass claimed.
- **Remaining Owner judgment:** only wording/visual balance and the compact desktop/narrow-width product feel.

## Owner review

Open `/maze/`, choose **The Loom**, then:

1. Confirm **Printing & artwork** reads naturally after **Refine**.
2. Enter `2015`, select **Card's first printing**, and confirm the live query is `f:commander year=2015 is:firstprinting` (or retains any other selected Loom filters before it).
3. Replace the year with `201`; confirm the local guidance is clear, the printing rule and Copy/Open disable, and Search returns focus to the year without a request.
4. At a narrow width, confirm the two printing controls stack cleanly and the existing action order remains controls → query → actions.

## Follow-up

- On acceptance, bind the exact commit SHA to the card/handoff and move VM-624 to Done. Do not expand into `unique=art` without a separate card.
- **Next agent:** Owner visual/product reviewer.
