# VM-580 through VM-583 Independent Exact-SHA RobQA Handoff

## Review result

**PASS — Owner Review Ready**

Exact candidate reviewed: `44547a8c967e56d67090b9b5bafb7bf4eb868e11`

Exact parent: `fa3eafefacf6c1518753bda6fd4261070e624aae`

Branch: `codex/vm580-vm583-owner-qa-remediation`

## Agent name

Euclid — fresh independent RobQA reviewer

## Task requested

Independently review the exact VM-580 through VM-583 candidate without modifying implementation, tests, Kanban, board, package metadata, branch state, or VM-579. Verify the four owner-QA contracts in the rendered product, confirm protected production owners remain untouched, reproduce the two documented broad-suite failures against the exact parent before classifying them as inherited, and advance only to bounded owner review if the exact candidate passes.

## Related Kanban cards, docs, or plans

- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/kanban/in-progress/VM-581-college-commander-browsing-identity-labels.md`
- `docs/kanban/in-progress/VM-582-mobile-provider-control-intrinsic-sizing.md`
- `docs/kanban/in-progress/VM-583-maze-mobile-search-control-gap.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/2026-08-22-1710-codex-vm580-vm583-owner-qa-remediation-robdev.md`

## Preflight and exact-SHA state

- `HEAD` matched exact candidate `44547a8c967e56d67090b9b5bafb7bf4eb868e11` before review.
- The tracked tree was clean before independent governance recording.
- The only pre-existing untracked item was `docs/research/maze-player-language/corpus/vm578.zip`; it remained untouched.
- One registered worktree was present on the intended branch. No parallel VM-580 through VM-583 branch/worktree existed.
- The exact diff from parent contains the four cards/board/handoff lifecycle records, two existing Archscry runtime modules, two existing CSS owners, focused tests, and the package test alias. It contains no placement, telemetry, persistence/storage, generated-data, Scryfall-authority, VM-579, Maze runtime/parser, or source-data file.

## Files reviewed

- Mandatory current handoff index, Kanban board, all four in-progress cards, recent VM-579 closeout/review records, and the VM-580 through VM-583 RobDev handoff
- `docs/dev/RobDevPass.md`, `docs/qa/RobQAPass.md`, and `docs/reference/token-reasoning-cost-control.md`
- Exact candidate-versus-parent diff for:
  - `assets/js/archscry/runtime/card-media.js`
  - `assets/js/archscry/runtime/dossier-view.js`
  - `assets/css/archscry.css`
  - `assets/css/maze.css`
  - `tests/archscry/archscry-transform-tests.js`
  - `tests/archscry/post-vm579-owner-qa-tests.js`
  - `package.json`
- Relevant transform, dev-review, dossier, Maze mode/layout/search, lint, validation, and smoke tests
- Fresh-origin rendered Archscry and Maze surfaces at `1440x1000` and `390x844`

## Files changed

- `docs/handoffs/2026-08-22-1722-euclid-vm580-vm583-independent-robqa.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No runtime, CSS, test, package, card, board, source/generated data, branch, or implementation handoff file was modified during independent review.

## QA classification

- Overall tier: QA-3 because VM-580 changes a visible pointer/focus state transition and preserves Card Details.
- VM-581 through VM-583: QA-2 presentation/responsive component contracts.
- Protected higher-risk behavior: production placement, identity meaning, telemetry, persistence, generated data, Scryfall authority, VM-579 direct-review behavior, provider destinations, and Maze parser/query behavior remain unchanged.
- No heavy placement, synthetic, mutation, recovery, or exhaustive journey suite was justified because no QA-4 decision owner changed.

## Architecture and contract verification

- VM-580 reuses the existing `card-media.js` preview controller, existing combined source/overlay pointer-focus boundary, and shared Scryfall transform state. The candidate adds one face renderer and an authoritative hidden-style rule; it does not add a resolver, transform model, overlay subsystem, or Card Details path.
- VM-581 reuses `playerFacingIdentityDisplayLabel(faction)` only for visible directory labels while retaining `getExternalDeckRoutingAlias`, existing provider URLs, and existing provider color/slug routing. Archidekt tag-lane labels remain distinct.
- VM-582 changes only the existing mobile `.service-chip` width rule shared by Precon Starting Points and Commander Browsing Starts.
- VM-583 changes only the existing `820px` Maze column breakpoint to neutralize row-oriented flex bases. Maze markup, runtime, parser, compiler, modes, and queries are unchanged.
- No second renderer, placement engine, transform state container, provider system, responsive component, or QA framework was introduced.

## Deterministic tests and results

Passing:

- `npm run test:post-vm579-owner-qa` — PASS
- `npm run test:transform-faces` — PASS
- `npm run test:archscry-transform` — PASS
- `npm run test:dev-review` — PASS
- `npm run test:mode` — PASS, 12 mode and 12 leakage cases
- `npm run test:maze-results-layout` — PASS
- `npm run lint:js` — PASS, 31 frontend files
- `npm run lint:html` — PASS
- `npm run test:frontend-smoke` — PASS
- `node --check assets/js/archscry/runtime/card-media.js` — PASS
- `node --check assets/js/archscry/runtime/dossier-view.js` — PASS
- `node --check tests/archscry/post-vm579-owner-qa-tests.js` — PASS
- `git diff --check fa3eafe..44547a8` — PASS

Inherited failures independently proven against exact parent:

- `node tests/archscry/archscry-dossier-followup-tests.js` fails on candidate at the existing expected ``The complete ${activeExpressionCount}-identity atlas...`` source-string assertion. An isolated `git archive` of exact parent `fa3eafefacf6c1518753bda6fd4261070e624aae`, supplied the same repository-local ignored Oracle fixture required by the test, fails at the same assertion and corresponding line. The candidate does not change the failing `data.js` owner or this broad test.
- `node tests/maze/maze-search-tests.js` fails on candidate with actual `c:r` versus expected `c:r f:commander`. The isolated exact-parent archive fails with the same values at the corresponding line. The candidate changes only Maze CSS, not the failing runtime/test owner.
- The isolated parent review directory was validated as a workspace-local temporary path and removed after reproduction.

## Independent rendered evidence

### VM-580 — transform hover preview

- Desktop `1440x1000`, Grixis Card Signals: real pointer hover over ordinary Sedris rendered the preview with `is-transform=false`; the Flip button retained `hidden`, computed `display:none`, measured `0x0`, and exposed no face-copy layer.
- Real pointer movement from Nicol Bolas's visible source into the visible overlay preserved the preview across the combined boundary.
- Front state rendered Nicol Bolas, the Ravager with its front image, `Legendary Creature — Elder Dragon`, face-specific Oracle text, correct image alt, and a Flip label targeting Nicol Bolas, the Arisen.
- A real click changed image URL, name, type, Oracle text, alt, selected-face state, and inverse Flip label to Nicol Bolas, the Arisen / `Legendary Planeswalker — Bolas`; a second real click returned to the Ravager.
- Real pointer leave from both surfaces dismissed the overlay.
- Card Details still opened from the visible card, flipped Ravager -> Arisen -> Ravager, and retained its existing accessible transform label.
- Optical inspection confirmed the settled hover card, Flip target, gradient face copy, and surrounding layout render coherently.

### VM-581 — College display identity versus provider routing

- Quandrix displayed `Quandrix` across EDHREC, Archidekt base, and MTGDecks while retaining `simic`, `UG`, and `simic-commanders` routes.
- Lorehold displayed `Lorehold` while retaining `boros`, `WR`, and `boros-commanders` routes.
- Prismari displayed `Prismari` while retaining `izzet`, `UR`, and `izzet-commanders` routes.
- Silverquill displayed `Silverquill` while retaining `orzhov`, `WB`, and `orzhov-commanders` routes.
- Witherbloom displayed `Witherbloom` while retaining `golgari`, `BG`, and `golgari-commanders` routes.
- Ordinary `WB` retained `Orzhov commanders` / `Orzhov Commander decks` and the existing Orzhov/WB destinations.
- Archidekt archetype/tag lanes remained their existing player-facing lane labels.

### VM-582 — intrinsic mobile provider controls

- Mobile `390x844`, Silverquill: Precon and Commander Browsing controls measured `42.63px` high, remained readable and unclipped, and sized to approximately `35.3%` through `73.5%` of their parent rather than stretching full width.
- The visible surface covered Precon EDHREC and Commander Browsing EDHREC, Archidekt, MTGDecks, and Archidekt lane controls.
- Both sections were optically inspected; labels remained legible, tap targets remained clear, wrapping stayed within the card, and document horizontal overflow was exactly `0`.
- Desktop `1440x1000` retained the established Precon and Commander Browsing composition with content-sized chips and zero overflow.

### VM-583 — mobile Maze search geometry

- Mobile `390x844`: textarea height remained `88px`; Search top minus textarea bottom measured `10.391px` against the computed `10.4px` row gap.
- `.search-wrap` and Search/Clear/Copy/Open/Reading Finds actions computed `flex: 0 0 auto` at the column breakpoint.
- All five actions measured `325.81px` wide and `60px` high, remained visible/tappable, and produced exactly zero horizontal overflow.
- The rendered gap and action stack were optically inspected with no unexplained blank region.
- Real visible-control clicks changed body mode and selected state for Operator's Hand (`raw`), Loom (`builder`), and Plain Reading (`ai`).
- Desktop `1440x1000` retained a wrapping row layout, `88px` textarea, `60px` Search action, normal action composition, and zero overflow.

## Console and runtime protection

- Fresh-origin browser console errors: **0** across Archscry and Maze review journeys.
- `test:dev-review` independently protects the completed VM-579 seam and passed.
- Exact diff inspection found no placement, telemetry, persistence, saved-state, generated-data, Scryfall-authority, provider-route, Maze runtime/parser, or VM-579 change.

## Manual findings converted to invariants

- Ordinary preview controls must be judged by rendered visibility and hit geometry, not the presence of `hidden` alone; the focused test now requires hidden plus `display:none` for a single-face card.
- College identity is a presentation contract separate from external provider route identity; the five-College matrix asserts visible labels and provider routes independently, with ordinary Orzhov as a control.
- Shared mobile provider sizing must be verified in both named consumers; the geometry invariant requires intrinsic width when content fits, minimum tap height, no clipping, and no document overflow.
- Maze mobile spacing must be measured between the textarea and first action and compared with the owning row gap; action geometry, modes, and desktop layout are protected in the same focused path.

## Decisions made

- Accepted the candidate as the smallest complete set of four contextual fixes through existing production owners.
- Classified the two broad-suite failures as inherited only after exact-parent reproduction.
- Kept placement recertification out of this QA-2/QA-3 review because the candidate changes no decision owner and the focused VM-579 protection suite is green.
- Advanced only to owner review; no merge, push, closure, Done transition, or follow-up implementation is authorized by this PASS.

## Risks / uncertainties

- The two inherited broad-suite assertions remain repository debt outside VM-580 through VM-583.
- Final acceptance still requires the owner's bounded visual/product judgment. No candidate-specific correctness uncertainty remains from independent review.

## Remaining owner judgment

1. Confirm the Nicol Bolas hover preview feels right when crossing into it, flipping both ways, and leaving it; confirm ordinary cards show no Flip.
2. Confirm the five College names read correctly in Commander Browsing while provider destinations remain the expected guild/color routes.
3. Confirm mobile provider controls feel appropriately intrinsic and tappable in both Precon and Commander Browsing surfaces.
4. Confirm the mobile Maze textarea-to-Search spacing and action stack feel intentional.

## What changed and why

This review added only its independent evidence handoff and handoff-index entry, as required by repository governance. The exact candidate implementation was not changed.

## Not touched

- Runtime, CSS, tests, package metadata, Kanban cards, board lifecycle, VM-579, source/generated data, placement, telemetry, persistence, Scryfall authority, provider routes, Maze runtime/parser, branch/worktree topology, commit history, merge, push, deployment, closure, or Done transitions
- Unrelated `docs/research/maze-player-language/corpus/vm578.zip`

## Follow-up recommendations

1. Let the main Goal workflow inspect and commit only this governance evidence as appropriate while preserving exact candidate `44547a8`.
2. Request the four bounded owner judgments above.
3. Do not merge, push, close, mark Done, or implement any unrelated follow-up until owner acceptance.

## Next suggested agent

Main Goal Mode orchestrator for governance-only PASS recording, then the owner for bounded acceptance.
