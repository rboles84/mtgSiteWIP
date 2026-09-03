# VM-624 - Loom Printing and Artwork Refinement

ID: VM-624

Status: Done — Owner Accepted

Type: Maze / Loom query-builder refinement

Priority: Medium

Created: 2026-09-03

## Product outcome

Let a player refine a Loom query by the release year of a printing, then optionally restrict that year to a card's first printing or a printing that introduced new art. The surface must describe printing metadata truthfully and retain Loom's single visible live Scryfall query.

## Locked decisions

- **Release year** is optional, four-digit text input, and valid from 1993 onward.
- **Printing rule** is disabled until the release year is valid. It is not independently executable.
- `year=<year>`, `is:firstprinting`, and `new:art` are executable Scryfall eligibility clauses owned by the existing Loom builder projection.
- **Any matching printing** adds no scope clause; **Card's first printing** adds `is:firstprinting`; **Introduced new art** adds `new:art`.
- `unique=art` remains API metadata under `MazeQueryResult.api`; no artwork grouping UI, persistence, or Copy/Open wording changes are authorized here.

## Ownership and scope

- `assets/js/maze/research-builder.js` owns pure builder query projection and release-year validation.
- `assets/js/maze/research-init.js` owns DOM reads, dependent-control state, local error/focus recovery, summaries, Current Weave, Reset, live actions, and mode continuity.
- `assets/js/maze/research-syntax-language.js` owns Plain Reading's display-only translation of existing Scryfall terms.
- `maze/index.html` and `assets/css/maze.css` own the semantic fieldset and responsive presentation.

Protected: Plain Reading compilation and execution, Operator's Hand execution, `MazeQueryResult.query` as sole executable query, query-core semantics, Scryfall fetch/result delivery, `unique` metadata, Reading Finds, card modal, Archscry handoff, placement/ranking, VM-591 dormant semantic state, and generated data. (Module import versions may advance only to keep changed runtime dependencies cache-safe.)

## Acceptance criteria

1. Loom renders **Printing & artwork** after **Refine** and before the single live query. It explains that release year applies to the printing, not illustration creation.
2. A valid year generates `year=<year>`; the two enabled rules produce deterministic `is:firstprinting` or `new:art` clauses. W/U Commander plus 2015/first printing is exactly `id<=wu f:commander year=2015 is:firstprinting`.
3. Blank year remains valid. While the user is entering a partial year, concise static guidance remains visible but the local error stays quiet. Invalid values preserve input, disable printing scope and live actions, expose one associated error and focus the year field on attempted delivery, and make no Scryfall request.
4. Reset clears both fields; Loom to Operator to Loom restores valid controls without parsing or hydration. Summary and Current Weave remain passive presentations.
5. Focused deterministic and route tests pass; rendered review is limited to a direct desktop/narrow containment sanity check. Owner makes the final visual/product judgment.

## Non-goals and stop conditions

No set picker, year ranges, art-tag autocomplete, arbitrary image search, `unique=art` control, parser/core semantic change, semantic-state migration, storage, result-card change, or general Maze redesign. Stop if the requested behavior requires a second query owner, API metadata UI, or changed artwork-grouping semantics.

## RobDev / RobQA packet

- Changed behavior: Loom-only printing release filters, local validation, dependent native control, live query/action state, presentation summary, and reset/mode continuity.
- QA classification: QA-2 interaction plus QA-3 local state/action delivery. CPU-heavy validation is **NOT REQUIRED**: no placement, ranking, parser, core, data, or deployment contract changes.
- Deterministic checks: builder, focused Loom delivery, mode continuity, query contract, DOM/layout, lint, and whitespace. Run only a minimal direct responsive sanity check; leave visual balance to Owner Review.

## Implementation — Owner Review Ready

- Added the year/rule fieldset through the existing Loom markup, styling, builder projection, route-local validation, live action, summary, Current Weave, Reset, and mode-continuity owners. Advanced the Maze CSS/module dependency chain to `vm627` so production reloads cannot pair the new markup or Plain Reading presenter with stale Loom code.
- Corrected the direct browser finding that initially described an invalid release year as a color conflict; Current Weave now names the affected field and recovery location truthfully.
- Focused builder, Loom interaction, mode, query-contract, layout, JS lint, HTML lint, and whitespace checks pass. One direct local-route interaction pass verified valid `year=2015 is:firstprinting` projection and invalid-year blocking/recovery; no screenshot or visual-baseline suite was run.
- Status: **Owner Accepted** at exact implementation candidate `86c5c5f`.

## Owner finding remediation — 2026-09-03

- Plain Reading now translates Loom's existing printing syntax into natural language: `year=2015` reads **cards printed in 2015**; `is:firstprinting` and `new:art` also translate without leaking operators. This is display-only; executable query semantics are unchanged.
- The release-year helper is now **Enter a four-digit year.** Partial input remains a neutral finish-the-year state. The existing `Enter a four-digit release year from 1993 onward.` recovery error appears only after an attempted Search or Copy.
- The associated recovery block now sits within the Release year control instead of spanning the entire Printing & artwork fieldset.
- Focused mode, Loom, layout, JS/HTML lint, and whitespace checks pass. A live local desktop witness confirmed the exact Plain Reading transition, delayed recovery, and 438px-in-1127px containment. No screenshot or visual-baseline suite was run; Owner retains final visual judgment.

## Owner acceptance — 2026-09-03

- Owner confirmed the error treatment works as expected and authorized this candidate for `main`.
- Accepted candidate: `86c5c5f` (`feat(vm-624): refine Loom printing filters`).
- No product, test, or runtime files may change after this acceptance without a new Owner review.
