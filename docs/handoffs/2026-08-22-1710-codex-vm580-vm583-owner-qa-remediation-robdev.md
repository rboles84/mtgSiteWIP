# VM-580 through VM-583 Owner-QA Remediation RobDev Handoff

## Agent name

Codex

## Task requested

Remediate the four owner-QA findings routed after VM-579 as separate governed work identities: VM-580 transform hover-preview behavior, VM-581 Strixhaven College browsing labels, VM-582 intrinsic mobile provider controls, and VM-583 the mobile Maze search gap. Preserve VM-579, production placement, telemetry, persistence, generated data, and Scryfall authority; reuse existing production seams and stop rather than broadening architecture.

## Related Kanban cards, docs, or plans

- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/kanban/in-progress/VM-581-college-commander-browsing-identity-labels.md`
- `docs/kanban/in-progress/VM-582-mobile-provider-control-intrinsic-sizing.md`
- `docs/kanban/in-progress/VM-583-maze-mobile-search-control-gap.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- VM-576 and VM-579 implementation/review/closeout handoffs indexed in `HANDOFF_INDEX.md`

## Files reviewed

- Mandatory current handoff index, recent VM-576/VM-579 handoffs, Kanban board/cards, `docs/dev/RobDevPass.md`, and `docs/qa/RobQAPass.md`
- Existing Archscry preview/transform owners in `assets/js/archscry/runtime/card-media.js`, `assets/js/shared/scryfall-transform-faces.js`, and `assets/css/archscry.css`
- Existing Commander Browsing presenter, identity display authority, and provider routing helpers in `assets/js/archscry/runtime/dossier-view.js` and `assets/js/archscry/runtime/data.js`
- Existing mobile Maze search layout in `maze/index.html` and `assets/css/maze.css`
- Related focused and broad Archscry/Maze tests

## Files changed

- `assets/js/archscry/runtime/card-media.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `tests/archscry/archscry-transform-tests.js`
- `tests/archscry/post-vm579-owner-qa-tests.js`
- `package.json`
- `docs/kanban/board.md`
- Four cards moved from `docs/kanban/backlog/` to `docs/kanban/in-progress/` and updated with Gate A plus RobDev evidence
- This handoff and `docs/handoffs/HANDOFF_INDEX.md`

## Compact implementation packet

### Owning authority and producer

- VM-580: the existing `card-media.js` overlay/controller and shared Scryfall transform-face normalizer; no second state model.
- VM-581: the existing `buildDeckDiscoveryGroups` presenter for visible copy, `playerFacingIdentityDisplayLabel` for display identity, and `getExternalDeckRoutingAlias`/provider builders for route identity.
- VM-582: the shared mobile `.service-chip` rule used by both named provider surfaces.
- VM-583: the existing Maze search row and its 820px column breakpoint.

### Changed behavior

- Ordinary hover previews now honor `hidden` for their Flip control. True transform previews display face name, type line, and Oracle text/excerpt from the existing normalized active face and update all media/copy in place when flipped.
- All five College dossiers display their College identity in Commander Browsing Starts while provider slugs, color codes, and URLs remain unchanged. Ordinary guilds retain guild-facing labels.
- Mobile provider controls size to content up to the container width instead of stretching to 100%.
- Mobile Maze resets inherited row-oriented flex bases at the column breakpoint, reducing the measured textarea-to-Search gap from 394.69px to the intended 10.4px row gap.

### Protected behavior and consumers

- Card Details transform rendering, the combined source/preview pointer-focus boundary, normal single-face dismissal, and shared Scryfall recognition.
- EDHREC, Archidekt, and MTGDecks routes; Archidekt tag-lane labels; ordinary guild display; all identity families using the shared presenter.
- Precon Starting Points and Commander Browsing Starts tap size, wrapping, routes, desktop layout, and horizontal overflow.
- Maze textarea sizing, Search/Clear/Copy/Open/Reading Finds actions, all three modes, parser/query behavior, keyboard/focus behavior, and desktop layout.
- VM-579 dev-review behavior, production placement, telemetry, persistence, canonical/generated data, and Scryfall authority are untouched.

### Realistic risks

- Hover overlays can race across pointer boundaries or expose stale face state; real-pointer source/preview/flip/leave tests cover this.
- Display/routing separation can accidentally rewrite provider destinations; the five-College matrix asserts labels and exact route families separately, plus an ordinary guild control.
- Intrinsic controls can become too short or overflow on narrow screens; geometry checks cover both consumers and all three directory services.
- Flex-basis corrections can collapse action targets or disturb mode behavior; exact mobile geometry and real mode clicks cover the correction.

### Smallest complete implementation

Four local seam changes: one shared hover-face renderer plus authoritative hidden styling, one presenter-level display-label substitution, one shared mobile chip width rule, and two flex-basis resets inside the existing mobile Maze breakpoint. No architectural rework was needed.

### Non-goals

No VM-579 reopening, placement/telemetry/persistence changes, provider-route changes, transform resolver or modal redesign, identity-data or generated-data edits, Maze parser/runtime work, desktop redesign, or unrelated follow-up implementation.

### Stop conditions

The work would have stopped if any finding required a new transform state system, consumer-specific provider machinery, route/data rewrites, Maze runtime/parser edits, or broad architectural change. Gate A proved each defect was expressible through its existing owner.

## What changed and why

- A CSS specificity defect made the ordinary-card Flip button visible even while its `hidden` attribute was true; an explicit `[hidden]` rule now resolves that exact cause.
- The existing transform state already held face-specific copy, so one shared renderer now supplies the hover view on initial display and flip without duplicating state or touching Card Details.
- The presenter had reused an external routing alias as player-facing copy; it now draws visible identity from the existing display authority while retaining routing authority for destinations.
- The shared mobile provider rule explicitly forced `width:100%`; it now uses intrinsic sizing bounded by `max-width:100%`.
- Maze's 1050px row-oriented percentage/`10rem` bases became vertical allocations after the 820px parent switched to a column; the column breakpoint now resets those bases to `auto`.

## Decisions made

- Keep the four cards separate even though one focused browser harness covers their shared owner-QA pass.
- Do not modify the existing source/preview boundary because reproduction proved it already satisfies the pointer contract when the visible source is exercised.
- Relabel only the directory/base links; preserve Archidekt theme/archetype lane names.
- Record two broad-suite failures as inherited only after confirming the failing source/test paths are byte-identical to parent `fa3eafefacf6c1518753bda6fd4261070e624aae`.

## QA classification and readiness

- Overall tier: QA-3 because VM-580 changes visible pointer/focus interaction; VM-581 through VM-583 are QA-2 presentation/layout changes.
- Changed behaviors and protected contracts are named above.
- Deterministic review surfaces: Grixis Card Signals, the five College Commander Browsing Starts dossiers plus ordinary Orzhov, Silverquill Commander Browsing/Precon controls at 390x844, and Maze at 390x844.
- RobDev rendered self-QA: PASS on a fresh local origin with real pointer/click input at 1440x1000 and 390x844; screenshots were inspected and browser console errors were zero.
- Independent review status: pending fresh exact-SHA RobQA. This handoff does not claim owner-review readiness before that gate.

## Tests run

Passing:

- `npm run test:post-vm579-owner-qa` (twice after harness stabilization)
- `npm run test:transform-faces`
- `npm run test:archscry-transform`
- `npm run test:dev-review`
- `npm run test:mode`
- `npm run test:maze-results-layout`
- `npm run lint:js`
- `npm run lint:html`
- `npm run test:frontend-smoke`
- `node --check` on both changed runtime modules and the new browser test
- `git diff --check`
- Fresh-origin in-app browser QA: desktop ordinary/transform hover and Card Details; all five College display/route matrices; ordinary Orzhov; mobile provider geometry/visuals; mobile Maze geometry/visuals/modes; zero console errors

Inherited failures, not changed by this candidate:

- `node tests/archscry/archscry-dossier-followup-tests.js` stops at its existing expected `The complete ${activeExpressionCount}-identity atlas...` source-string assertion. The failing `data.js` and test file are unchanged from parent.
- `node tests/maze/maze-search-tests.js` stops at its existing `c:r` versus expected `c:r f:commander` metadata assertion. Maze runtime and the failing test file are unchanged from parent; this candidate changes only Maze CSS.

## Risks / uncertainties

- Independent exact-SHA RobQA and bounded owner acceptance remain open gates.
- The two inherited broad-suite assertions remain repository debt outside these four cards; they were not weakened or repaired during this work.

## Not touched

- VM-579 card/history and completed runtime
- Production placement engine/model/data and questionnaire semantics
- Telemetry, persistence, authentication, or saved-state behavior
- Canonical/generated dossier, identity, provider-validation, or Scryfall data
- Provider URLs/slugs/color identities
- Maze parser, compiler, search runtime, markup, and desktop behavior
- Unrelated untracked `docs/research/maze-player-language/corpus/vm578.zip`

## Follow-up recommendations

1. Commit this bounded candidate and independently review that exact SHA using the deterministic surfaces above.
2. If independent RobQA passes, request only the short owner review; do not merge, push, close, or mark Done before owner acceptance.
3. Keep any unrelated broad-suite contract reconciliation outside VM-580 through VM-583.

## Next suggested agent

Fresh independent RobQA reviewer for the exact candidate SHA, followed by the owner for bounded acceptance.
