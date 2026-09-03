# VM-624 Plain Reading and Release-Year Remediation — Owner Review Handoff

## Agent and task

- **Agent:** Codex
- **Task requested:** remediate the Owner-reported Plain Reading `year=` leakage, reduce release-year validation noise while typing, and contain the recovery block.
- **Card:** [VM-624](../kanban/in-progress/VM-624-loom-printing-artwork-refinement.md)
- **Branch / state:** `codex/vm-624-loom-printing-artwork`; continuing the uncommitted VM-624 candidate.

## Files reviewed

- Repository RobDev/RobQA skills and frozen `docs/dev/RobDevPass.md` / `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`, the prior VM-624 handoff, board, card, and Maze query contract
- `assets/js/maze/research-syntax-language.js`, `research-mode.js`, `research-init.js`, `maze/index.html`, `assets/css/maze.css`, and their focused tests
- The supplied Owner screenshot and one local `/maze/` desktop interaction route

## Files changed

- `assets/js/maze/research-syntax-language.js`, `assets/js/maze/research-mode.js`, `assets/js/maze/research-init.js`, `assets/js/maze/maze-query-core.js`
- `maze/index.html`, `assets/css/maze.css`, `scripts/validate-frontend-html.mjs`
- `tests/maze/research-mode-tests.js`, `tests/maze/maze-search-tests.js`, `tests/maze/maze-results-layout-tests.js`
- `docs/contracts/maze-query-contract.md`, the VM-624 card, this handoff, and `HANDOFF_INDEX.md`

## What changed and why

- The display-only Plain Reading translator now renders `year=2015` as **cards printed in 2015**, `is:firstprinting` as **cards in their first printing**, and `new:art` as **cards that introduced new art**. It never changes the executable query.
- The exact supplied query now reads: **within Azorius color identity commander legal cards printed in 2015 in their first printing**.
- Release year retains its immediate disabled-action safety boundary, but one-to-three-character entry is now a neutral completion state with the static helper **Enter a four-digit year.** The pre-existing actionable error appears only when Search or Copy requests recovery.
- The error element moved inside the Release year control and is capped to that control, preventing the red block from spanning the entire Printing & artwork fieldset.
- Advanced the direct Maze entry and its builder/core/Plain Reading module chain to `vm627`; a live witness found and corrected the stale presentation-module cache edge.

## Decisions made

- Kept the existing error wording, minimum year, focus recovery, disabled Printing rule, disabled Copy/Open, and no-request behavior.
- Treated the Owner note as a UI-presenter and interaction remediation, not a new parser, query-owner, Scryfall, or artwork-grouping feature.
- Chose recovery-on-attempt rather than per-keystroke error presentation; this preserves proactive guidance without interrupting ordinary typing.

## Risks / uncertainties

- Translation reads naturally for the known printing terms and is protected by syntax-display tests. Broader Scryfall operator phrasing remains unchanged.
- Objective containment is verified on the local desktop route. Visual hierarchy, wrapping, and narrow-width comfort remain for Owner judgment as requested.

## RobDev packet

- **Owner / producer:** `research-syntax-language.js` is the existing display translator; `research-init.js` remains the route-local validation and recovery owner; HTML/CSS remain the rendering owner.
- **Changed behavior:** human display wording for three existing printing clauses; partial release-year feedback timing; recovery-message ownership and width.
- **Protected behavior:** executable Loom query, Plain Reading compilation/execution, Operator execution, core semantics, Scryfall delivery, action lockout, storage/handoff, results, placement, and `unique=art` deferral.
- **Smallest complete implementation:** extend existing syntax phrase buckets, gate the existing release-year error by recovery intent, relocate one existing alert, and version only directly dependent modules.
- **Non-goals / stop conditions:** no parser/compiler changes, no date ranges, no API metadata UI, no storage/migration, no result-card work, no screenshot baseline, and no visual acceptance claim.

## RobQA readiness

- **Tier:** QA-1 presentation plus QA-2 local interaction. CPU-heavy validation: **NOT REQUIRED**; no data, placement, parser/compiler, core semantic, migration, or deployment contract changed.
- **PASS:** `npm.cmd run test:mode` — the exact printing query and `new:art` now have human, operator-free Plain Reading output.
- **PASS:** `node tests/maze/maze-search-tests.js --vm592-focused` — partial input stays quiet, Search reveals recovery/focus, actions remain blocked, and delivery stays blocked.
- **PASS:** `npm.cmd run test:maze-results-layout` — helper text, recovery ownership, and non-spanning CSS are pinned.
- **PASS:** `npm.cmd run test:builder`, `node tests/maze/maze-query-contract-tests.js`, `npm.cmd run lint:js`, `npm.cmd run lint:html`, and `git diff --check`.
- **Rendered evidence:** local `/maze/` desktop route; partial `1` showed no error and neutral completion guidance; Search revealed the retained error and focused the field; recovery geometry was 438px within a 1127px fieldset; Operator-to-Plain Reading showed the exact translated sentence above. No screenshots captured.
- **Tests intentionally skipped:** exhaustive engine, journey, placement, synthetic, and screenshot-baseline suites — they do not protect the changed presenter/local feedback risk.

## Not touched

- Scryfall query syntax/semantics, parser/compiler behavior, result fetching/rendering, `unique=art`, Reading Finds, card modal, Archscry handoff, placement/ranking, generated data, and visual baselines.

## Owner review

1. In `/maze/`, switch from Operator's Hand to Plain Reading with `id<=wu f:commander year=2015 is:firstprinting`; confirm the year reads naturally as **cards printed in 2015**.
2. In The Loom, type one to three year digits; confirm the short helper is useful and no red recovery block interrupts typing.
3. Attempt Search with an incomplete year; confirm the existing error appears beneath Release year, stays visually contained there, and focus returns to that field.

## Follow-up recommendations

- Await Owner disposition. If accepted, bind the exact candidate SHA, update VM-624 lifecycle status, and do not broaden into `unique=art`.
- **Next suggested agent:** Owner visual/product reviewer.
