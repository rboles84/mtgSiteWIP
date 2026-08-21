# VM-576 Transform Card UX + Targeted Dossier Visual Repair

- Agent name: Codex
- Task requested: Implement the frozen VM-576 plan on the closed VM-575 baseline, adding true-transform card UX to Archscry and Maze plus the Dimir hero and Colorless Mana Notes repairs.
- Related Kanban card: `docs/kanban/done/VM-576-transform-card-ux-targeted-dossier-visual-repair.md`
- Baseline: clean `main` and `origin/main` at `6898ce821e04909e8351b225274d591b11c29203`, `0/0` divergence, one canonical worktree.
- Implementation commit: `8ed9ed6a49665e45b1ff5e1ceedcbceca6be6755`.
- Status: implementation complete; owner visual acceptance complete; RobQAPass Ready and accepted for closeout.

## Files Reviewed

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-20-2334-codex-vm575-product-telemetry-v1.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-575-product-telemetry-v1.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- Archscry lifecycle, action, card-media, dossier-view, data/cache, and CSS owners
- Maze result/modal, scratchpad, HTML, and CSS owners
- Governed Archscry media and commander indexes for Nicol Bolas and Bruce Banner

## Files Changed

- `assets/js/shared/scryfall-transform-faces.js`
- `assets/js/archscry/runtime/card-media.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/maze/research-init.js`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `maze/index.html`
- `assets/img/identity-hero/official/dimir-mortus-strider.jpg`
- `tests/shared/scryfall-transform-faces-tests.js`
- `tests/archscry/archscry-transform-tests.js`
- `tests/maze/maze-transform-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- `scripts/lint-frontend-js.mjs`
- `package.json`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-576-transform-card-ux-targeted-dossier-visual-repair.md`
- This handoff and `docs/handoffs/HANDOFF_INDEX.md`

## What Changed

- Added a DOM-independent helper that recognizes only Scryfall `layout: "transform"` records with at least two usable named/image-backed faces.
- Normalized face name, image, mana cost, type line, Oracle text/excerpt, power, toughness, loyalty, defense, flavor, artist, face index/count, selected face, and next face without mutating or persisting the record.
- Archscry transform hover previews now have one face and an interactive Flip control while preserving the pointer/focus boundary between source and preview. Card Details renders one face atomically and flips image, face name, mana, type, rules/excerpt, and alt text together.
- Maze `transform` and `modal_dfc` results now use a non-interactive container with sibling Details, Flip, and Set Aside controls. Card Details deliberately ignores result face state and shows all multiface images and combined face text with no modal Flip.
- Replaced detached Flip text buttons in Archscry and Maze with 44px circular Transform controls over the card artwork, using a familiar clockwise transform glyph plus exact title and accessible-name text. Maze's image/details button and Transform button remain semantic siblings.
- Replaced the Dimir hero with the owner-supplied Mortus Strider art crop, retained bar-proof cover sizing, shifted the focal position to `54% 45%`, muted the Dimir-only title color, and updated the Tomasz Jedruszek / Mortus Strider attribution.
- Reduced Colorless Mana Notes to Wastes First plus Rocks and Colorless Sources, preserved `mana-notes / rocks-and-sources`, removed the redundant runtime caution target, and added a two-column/one-column scoped grid.
- Stopped fresh Operator's Hand submissions from inheriting the sidebar's Commander format default. Explicit `f:commander` terms from Archscry, dossier paths, and sidebar actions remain unchanged.
- Added `2x` in-place desktop artwork magnification for the currently displayed result face; edge columns expand inward, no detached preview is created, and touch-sized layouts do not magnify.
- Moved the existing Reading Finds panel into an initially closed floating panel opened from the search action row and gave it a 97%-opaque near-black, modal-like surface. Desktop dragging uses non-interactive header space, clamps inside the viewport, remains ephemeral, and resets to the fitted position on mobile. The result shell now uses the recovered width for a five-column maximum with larger cards, stepping to four columns at intermediate width and two on mobile.
- Removed the remaining ordinary-card nested interactive container: all results now expose sibling Details and Set Aside controls, with Flip added as a sibling only for eligible multiface layouts.

## Why It Changed

- Owner QA found side bars on Dimir, stale/stacked multiface rendering, missing flip controls, nested Maze interactions, and a three-card Colorless primer that broke the panel composition.

## Decisions Made

- Face selection remains DOM/module-local ephemeral presentation state. Nothing is written to storage, URLs, placement state, telemetry, or Scryfall caches by Flip.
- Maze result face state remains local to each result. Opening details always shows the complete multiface record; Archscry hover and details remain independent.
- Atomic rendering is implemented by rebuilding each dialog's complete face-specific block from one normalized face state.
- Maze result Flip is explicitly layout-based for `transform` and `modal_dfc`; Archscry stays true-transform-only, and all other non-transform layouts retain their prior behavior.
- Fresh raw syntax is treated as exact user input. This changes only implicit format-default application; it never strips an explicit format term from an incoming or typed query.
- The existing governed Archscry media projection already contains Nicol Bolas `layout: "transform"` and both face records, so no schema/projection expansion was required.

## Risks / Uncertainties

- Automated named-dossier navigation remains bounded by the existing comparison rules, so no page-local state was injected to force Grixis, Dimir, or Colorless. The owner directly inspected and accepted the affected Archscry and Maze surfaces during iterative QA, while focused contracts protect their structural invariants.
- The original broad 500% matrix was not rerun during final closeout. Under `RobQAPass`, the completed owner review, responsive rendered checks, focused interaction checks, and deterministic contracts are sufficient for this VM-sized repair; exhaustive optical repetition would be disproportionate.

## Tests Run

- `npm run test:transform-faces` - PASS, including governed Nicol Bolas projection.
- `npm run test:archscry-transform` - PASS.
- `npm run test:maze-transform` - PASS.
- `npm run lint:js` - PASS, 29 files.
- `npm run lint:html` - PASS.
- `npm run test:frontend-smoke` - PASS.
- `npm run test:telemetry` - PASS as local regression proof only; no live events.
- `git diff --check` - PASS; line-ending warnings only.
- Browser: real Maze and Archscry shells rendered on a fresh local origin; owner review accepted the affected Archscry, Dimir, Colorless, and Maze presentation.
- Fresh-port rendered Maze QA: genuine `layout:transform` Nicol Bolas and `layout:modal_dfc` Bruce Banner results changed faces without opening a modal; Details opened a combined multiface view with exactly two images and no modal Flip; Escape closed and returned focus to the result Details control.
- Fresh-port mobile Maze QA at `390x844`: zero document horizontal overflow, zero nested interactive controls, two modal card images, and a 44x44 result Transform target. Desktop and mobile screenshots were visually inspected; the initial Mana glyph was rejected and replaced with the clearer clockwise transform mark.
- Live Scryfall authority check: Bruce Banner is currently `layout: "modal_dfc"`; both faces have usable images.
- `node tests/maze/maze-query-contract-tests.js` - PASS, including a ten-query fresh Operator's Hand matrix across color/identity, type, Oracle text, groups, negation, numeric comparisons, names, sets/languages, ordering, explicit formats, and syntax cleanup; incoming `id=ub is:commander f:commander` remains preserved.
- Fresh-port rendered Operator's Hand QA: with the sidebar format still set to Commander, direct `c:w` produced `https://scryfall.com/search?q=c%3Aw&unique=cards&order=name`; an Archscry-loaded Dimir query and all four dossier sidebar paths retained their explicit `f:commander` terms.
- `npm run test:maze-results-layout` - PASS.
- Fresh-port rendered Maze result QA: desktop retained exactly five columns, magnified the hovered media in place from 147x204 to 295x409 via the expected `2` transform with inward first-column origin, and moved the 390px Reading Finds panel from `(852,108)` to `(497,164)` by header drag. Header input focus/edit did not move the panel; release cleared drag state; the panel remained viewport-clamped with zero nested controls/overflow. Mobile used two columns, computed no media transform, cleared transient drag positioning, and reported zero nested controls/overflow.
- Final proportional RobQA rerun: `test:transform-faces`, `test:archscry-transform`, `test:maze-transform`, `test:maze-results-layout`, Maze query contracts, `test:mode`, `test:maze-scratchpad`, `test:frontend-smoke`, `lint:js`, `lint:html`, `test:telemetry`, and `git diff --check` all PASS.
- Final fresh-port RobQA spot-check: real-pointer Bruce Flip worked at `2x` without opening details; details showed two images and no modal Flip; Escape returned focus to the Details button. Fresh `c:w` stayed exact with the Commander sidebar default present. Reading Finds drag released cleanly with no overflow; mobile reset transient coordinates, retained two columns, and had zero overflow/nested controls.
- Exhaustive placement, all-37, giant journey, mutation, bias, and equivalent heavyweight suites were intentionally skipped because placement, scoring, weighting, routing, qualification, stopping, generated-data, and telemetry contracts were unchanged.

## RobDevPass Packet

- Owning producers: shared Scryfall face presentation helper; Archscry card-media runtime; Maze result/modal runtime; Archscry dossier-view and scoped CSS.
- Changed behavior: true transform cards gain route-local one-face flip state; Maze results add the same ephemeral presentation to `modal_dfc`; Maze details show full multiface records; Dimir uses adjusted cover and a muted title; Colorless uses a contained two-card primer.
- Protected behavior: telemetry, placement/scoring, curation, generated authorities, non-transform layouts outside the explicit Maze result allowance, unrelated Maze search semantics, and scratchpad persistence.
- Consumers: Archscry hover/details, Maze results/modal, Colorless Mana Notes, and Dimir dossier hero.
- Realistic risks: mixed-face fields, hover dismissal, modal focus regression, nested controls, and horizontal overflow.
- Smallest complete implementation: one shared normalizer with separate true-transform and Maze-result eligibility gates, plus route-owned ephemeral state and scoped presentation changes.
- Stop condition: schema/projection generation, governed media regeneration, telemetry changes, or non-transform multiface redesign. None was required.

## RobQAPass Readiness

- QA tier: QA-3.
- Changed behavior: transform face state/interaction, modal focus, and responsive dossier presentation.
- Protected behavior intentionally untouched: placement, telemetry, unrelated Maze search semantics, stash/deck persistence, generated data, and non-transform layouts.
- CPU-heavy validation: NOT REQUIRED.
- Automated status: green on the final proportional closeout rerun.
- Rendered status: Maze transform/modal/query/hover/drag desktop and mobile green; owner reviewed and accepted the affected Archscry and Maze presentation. No exhaustive 500% rerun was required for final closeout.
- Verdict: READY, owner accepted, and approved for closeout. Remaining risk is low and limited to ordinary browser-specific optical variation.
- Manual finding converted to invariant: Archscry true transforms and Maze eligible results render one active face atomically; Maze details render all multiface faces with no modal Flip; Maze results cannot use a button-role parent around child controls; Colorless primer must be exactly 2/2/1 columns by viewport class.

## Not Touched

- `assets/js/shared/vox-telemetry.js`, PostHog configuration, event/property contracts, and privacy policy
- Placement/scoring and faction definitions
- Card curation, VM-569 media inventory, VM-574 Card Signals selections, generated Scryfall data, and canonical VM-565 education authority
- Unrelated Maze search behavior and deck/scratchpad storage; the accepted fresh raw-query default correction is the only query-path change

## Closeout

- Implementation is committed at `8ed9ed6a49665e45b1ff5e1ceedcbceca6be6755`.
- The VM-576 card is Done, owner acceptance is complete, and the accepted validation state is carried forward without rerunning heavyweight suites.
- Closeout changed governance records only; no runtime behavior changed after acceptance.

## Next Suggested Agent

- None. VM-576 is complete.
