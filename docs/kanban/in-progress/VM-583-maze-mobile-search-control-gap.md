# VM-583 - Maze Mobile Search Control Gap

ID: VM-583
Title: Maze Mobile Search Control Gap
Status: In Progress
Type: Responsive layout repair
Area: Maze search controls
Priority: Medium
Created: 2026-08-22

## Source

Owner observation during VM-579 acceptance.

## Finding

On mobile Maze, a large unexplained vertical gap appears after `textarea#search-input` and before the Search controls.

## Required outcome

- Reproduce and measure the textarea, wrapper, row, and Search-control geometry at representative narrow widths.
- Correct the responsible grid/flex/min-height/gap rule rather than applying arbitrary negative spacing.
- Preserve textarea resizing, search actions, keyboard/focus behavior, Reading Finds, and desktop layout.

## Causality and ownership

The responsible surface is existing `assets/css/maze.css`/Maze route markup. Neither Maze CSS nor Maze runtime was changed by VM-579. This is a separate Maze responsive-layout follow-up.

## Not authorized by this intake

No implementation, search behavior change, parser/query change, broad Maze layout redesign, or VM-579 scope expansion.

## Gate A Preflight — 2026-08-22

- Container owner: `.search-input-row` contains `.search-wrap`, `textarea#search-input`, and Search/Clear/Copy/Open/Reading Finds controls in `maze/index.html`; `assets/css/maze.css` owns its responsive geometry.
- Measured baseline at 390x844: textarea bottom `1075.27`, Search top `1469.95`, unexplained gap `394.69px`; `.search-wrap` expands to `472.30px` while the textarea remains `88px` high.
- Exact cause: `@media(max-width:1050px)` changes `.search-wrap` to `flex-basis:100%`; `@media(max-width:820px)` changes the parent flex direction to column but does not reset that basis, so a desktop width basis becomes a large vertical allocation.
- Smallest responsible correction: at the mobile column breakpoint reset `.search-wrap` and the action controls to non-growing intrinsic block flex sizing (`flex:0 0 auto`) so the earlier row-oriented percentage/`10rem` bases cannot become column heights; retain width, textarea min/max height, row gap, and explicit button height.
- QA tier: QA-2 responsive interaction/layout.
- Stop condition: stop if parser/runtime or broad page layout changes become necessary. Preflight proves the responsible rule is local CSS geometry.

## RobDev implementation and QA — 2026-08-22

- Corrected only the 820px column breakpoint: `.search-wrap` and the five action controls now reset inherited row-oriented flex bases to `flex:0 0 auto`.
- No Maze runtime, parser, query, markup, textarea sizing, or desktop rule changed.
- Fresh-origin rendered QA and focused automation at 390x844 measure a 10.39px textarea-to-Search gap against the intended 10.4px row gap, an 88px textarea, five 60px-high full-width actions, and zero horizontal overflow.
- Real clicks confirmed Plain Reading (`ai`), Operator's Hand (`raw`), and Loom (`builder`) still switch normally. `npm run test:mode`, `npm run test:maze-results-layout`, `npm run test:post-vm579-owner-qa`, JS lint, HTML validation, and frontend smoke pass.
- The broad `maze-search-tests.js` still has its inherited main-branch `c:r` versus `c:r f:commander` assertion; no changed file participates in that failure. Independent exact-SHA RobQA remains required before owner review.

## Acceptance Criteria

- [x] At 390x844 the textarea-to-first-action vertical gap is bounded by the intended row gap rather than a percentage flex basis.
- [x] Textarea remains resizable/usable; Search, Clear, Copy, Open, and Reading Finds remain visible and tappable.
- [x] Plain Reading, Operator's Hand, and Loom mode switching remains functional.
- [x] No mobile horizontal overflow and no desktop search-layout regression.
- [x] Focused geometry automation, rendered RobDev QA, and independent exact-SHA RobQA pass.

## Independent exact-SHA RobQA — 2026-08-22

- **PASS — Owner Review Ready** on exact candidate `44547a8c967e56d67090b9b5bafb7bf4eb868e11` against parent `fa3eafefacf6c1518753bda6fd4261070e624aae`.
- Euclid independently measured the 390x844 gap at 10.391px against the 10.4px row gap, confirmed the 88px textarea, five 60px actions, zero overflow, all three mode clicks, desktop protection, and zero console errors.
- Awaiting only bounded owner acceptance; do not merge, push, close, or mark Done yet.

## Owner acceptance rejection — 2026-08-22

- **FAIL — Return to RobDev.** The owner's mobile path still showed a large art-background region between the Plain Reading textarea and Search, so the prior child `flex` reset is not accepted as sufficient.
- Fresh rendered inspection across 320–1051px and all three modes shows the current committed path at 390px computes an 88px textarea/wrapper and a 10.39px gap, but the owning `.search-input-row` remains a flex container. The remediation must make the mobile stack structurally independent of inherited flex bases rather than relying only on child overrides.
- Reopened scope is limited to the mobile search stack owner plus a stronger ancestor/geometry invariant. No runtime, parser, query, markup, negative margin, viewport-height hack, or broad Maze redesign is authorized.

## Remediation acceptance state

- [x] At approximately 390px, the owning mobile search layout structurally prevents any inherited flex basis from creating vertical blank space.
- [x] `#search-input` bottom to Search top remains bounded by the actual design row gap and an explicit compact maximum.
- [x] Textarea, actions, all three modes, and zero horizontal overflow remain protected.
- [ ] Strengthened focused automation, rendered RobDev QA, and fresh independent exact-SHA RobQA pass.

## Owner-rejection RobDev remediation — 2026-08-22

- Corrected the actual mobile owner, `.search-input-row`, from a flex column to a one-column grid with `grid-auto-rows:max-content`; inherited child flex bases remain visible in computed style but can no longer create vertical tracks.
- Removed the now-unnecessary mobile child flex resets. No margins, viewport-derived height, runtime, parser, query, markup, or desktop rule changed.
- At 390x844 the computed grid is exactly `88px 60px 60px 60px 60px 60px`; `.search-wrap` and the textarea both measure 88px, Search begins 10.39px below the textarea against the 10.4px design gap, and horizontal overflow is zero.
- Real clicks confirm the same compact geometry in Plain Reading, Operator's Hand, and Loom. Fresh rendered optical QA shows Search immediately below the textarea and the five actions in a natural stack. Desktop 1440x1000 retains the existing flex/wrap layout and zero overflow.
- The strengthened browser invariant requires the grid owner, wrapper/textarea height equality, design-gap match, an explicit <=24px maximum, usable actions, all three modes, and zero overflow. Focused Maze/mode tests, JS/HTML lint, frontend smoke, and `git diff --check` pass. Fresh exact-SHA RobQA remains required.
