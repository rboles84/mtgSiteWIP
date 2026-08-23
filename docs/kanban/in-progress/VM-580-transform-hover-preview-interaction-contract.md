# VM-580 - Transform Hover Preview Interaction Contract

ID: VM-580
Title: Transform Hover Preview Interaction Contract
Status: In Progress
Type: Product interaction repair
Area: Archscry card media
Priority: High
Created: 2026-08-22

## Source

Owner observation during VM-579 acceptance, routed as a follow-up to completed VM-576 transform work.

## Finding

- A transform/flip affordance appears on hover-preview surfaces for non-transform cards.
- For a true transform card such as Nicol Bolas, the Ravager // Nicol Bolas, the Arisen, moving from the source card into the preview does not yet provide the complete pointer-interactive transform contract.
- The existing card-details modal transform behavior works and must remain protected.

## Required outcome

- Only true transform cards expose the hover-preview flip affordance.
- Card hover opens the preview; moving into the preview keeps it open; its flip control is clickable; front/back media and content update in place; leaving both the source card and preview boundary dismisses it.
- Keyboard/focus behavior and non-transform preview dismissal remain coherent.

## Causality and ownership

The responsible implementation is `assets/js/archscry/runtime/card-media.js` with existing transform/preview CSS and tests. VM-579 did not change `card-media.js`, and its CSS diff added only development-panel/direct-review styles. Treat this as a VM-576 follow-up, not VM-579 remediation.

## Not authorized by this intake

No implementation, transform-model change, card resolver rewrite, modal redesign, or VM-579 scope expansion. Reproduce under normal governance before editing.

## Gate A Preflight — 2026-08-22

- Normal hover preview owner: `assets/js/archscry/runtime/card-media.js` creates, positions, populates, flips, and dismisses `.card-preview-overlay`; `assets/css/archscry.css` owns its presentation.
- Transform-face owner: `assets/js/shared/scryfall-transform-faces.js` recognizes authoritative Scryfall `layout: "transform"` records and owns normalized active/next-face state. `card-media.js` already reuses it for both hover preview and Card Details.
- False ordinary-card affordance cause: the button correctly retains `hidden`, but the author rule `.card-preview-flip { display:grid }` overrides the browser's hidden presentation, so the control occupies 44x44 pixels on an ordinary preview.
- Current dismissal boundary: source `pointerout` defers and checks source hover/focus plus preview hover/focus; preview `pointerleave`/`focusout` checks the originating boundary. Real pointer QA confirmed source -> preview -> flip -> flip back -> leave already stays open and dismisses correctly for Nicol Bolas.
- Reusable interaction boundary: `cardPreviewBoundary` plus the existing source/overlay related-target and hover/focus checks already define the combined boundary.
- Smallest complete change: make `hidden` authoritative for the existing Flip control, render face-specific title/type/Oracle copy from the existing normalized transform state, update that copy in the existing flip function, and add real interaction coverage. Do not duplicate transform state or rewrite preview architecture.
- QA tier: QA-3 because pointer/focus interaction and visible transform state change; Card Details and ordinary preview behavior are protected contracts.
- Stop condition: stop and split only if the existing overlay/boundary/shared face state cannot express the contract. Preflight proves it can.

## RobDev implementation and QA — 2026-08-22

- Reused `card-media.js`'s existing normalized transform state and combined source/overlay pointer-focus boundary; no new resolver, state model, or preview system was introduced.
- Made the existing `hidden` state authoritative for the hover Flip control and added a face-copy layer populated from the active normalized face (name, type line, and Oracle text/excerpt).
- Both initial transform rendering and in-place flips now pass through `renderCardPreviewFace`; Card Details remains on its existing transform renderer.
- Focused browser automation and fresh-origin rendered QA at 1440x1000 confirmed ordinary Sedris has no visible/focusable Flip control; Nicol Bolas remains open across the source/preview boundary, flips to the Arisen and back with matching media/copy, dismisses after leaving both surfaces, and retains Card Details flip behavior.
- `npm run test:transform-faces`, `npm run test:archscry-transform`, `npm run test:post-vm579-owner-qa`, and `npm run test:dev-review` pass. Independent exact-SHA RobQA remains required before owner review.

## Acceptance Criteria

- [x] Ordinary single-face hover preview has no visible or focusable transform control.
- [x] Nicol Bolas hover stays open from source into preview, flips both directions in place, updates image/title/type/Oracle content, and dismisses after leaving the combined boundary.
- [x] At least one additional governed transform record remains recognized by the shared face model.
- [x] Card Details flip remains functional and keyboard/focus behavior does not regress.
- [x] Focused automation, rendered RobDev QA, and independent exact-SHA RobQA pass.

## Independent exact-SHA RobQA — 2026-08-22

- **PASS — Owner Review Ready** on exact candidate `44547a8c967e56d67090b9b5bafb7bf4eb868e11` against parent `fa3eafefacf6c1518753bda6fd4261070e624aae`.
- Euclid independently reran focused automation and fresh-origin 1440x1000 rendered QA with real pointer/click input: ordinary hidden state, source-to-preview boundary, both Nicol Bolas faces and copy, flip/back/dismiss, and Card Details all passed with zero console errors.
- Awaiting only bounded owner acceptance; do not merge, push, close, or mark Done yet.

## Owner acceptance rejection — 2026-08-22

- **FAIL — Return to RobDev.** The owner confirmed ordinary-card hidden state, initial source-to-preview entry, the first Ravager -> Arisen flip, and Card Details, but repeated hover-preview flipping failed after the first face swap.
- Reopened scope is limited to the post-flip lifecycle: preserve the same preview DOM/listeners/boundary and prove `source -> preview -> flip -> flip back -> flip again -> leave -> dismiss` with real pointer movement.
- Current code inspection proves `renderCardPreviewFace` mutates the existing image/copy/button nodes and does not replace the overlay or listeners. Remaining risk is transient hit geometry and asymmetric immediate dismissal on overlay `pointerleave`; the source boundary already defers dismissal and rechecks both surfaces.
- Stop condition remains: no click-to-lock state and no preview architecture rewrite.

## Remediation acceptance state

- [x] Ordinary single-face hover preview has no visible or focusable transform control.
- [x] Repeated Nicol Bolas hover flips retain the same interactive source/preview boundary through at least three consecutive face swaps.
- [x] Card Details flip remains functional.
- [x] Strengthened focused automation, rendered RobDev QA, and fresh independent exact-SHA RobQA pass.

## Owner-rejection RobDev remediation — 2026-08-22

- Preserved the existing overlay DOM, listeners, shared transform state, and click contract. `positionCardPreviewOverlay` now fixes the already-computed 63:88 preview height, while the existing image node fills that stable box during uncached face loads.
- Reused one deferred boundary-dismissal function from both source `pointerout` and preview `pointerleave`, symmetrically rechecking current source hover/focus plus preview hover/focus before clearing state. No pinned/click-to-lock state was added.
- The strengthened browser invariant delays the alternate-face image, proves the same overlay node and hit box survive, then performs real pointer movement through `source -> preview -> flip -> preview -> flip back -> preview -> flip again -> leave -> dismiss`; Card Details flips Ravager -> Arisen -> Ravager afterward.
- Fresh-origin 1440x1000 RobDev QA repeated three human-speed flips, moved preview -> source -> preview after the third swap, and dismissed only after leaving both. The settled Arisen face rendered correctly and browser console errors were zero.
- Focused transform/shared-face/dev-review tests, JS/HTML lint, frontend smoke, and `git diff --check` pass. Fresh exact-SHA RobQA remains required.

## Owner-rejection remediation independent exact-SHA RobQA — 2026-08-22

- **PASS — Owner Review Ready** on exact remediation candidate `3fb00c0319428204d641bf636adfaa78ba54b0e0` against parent `89db2c136b0fbe7b6b5182700e8cc8cb2428c29d`.
- Fresh independent review repeated three real-pointer Flip clicks with preview re-entry between swaps, verified the same singleton overlay and stable `315x440` hit geometry through delayed alternate-face media, and confirmed dismissal only after leaving both source and preview.
- Ordinary-card hidden state and Card Details Ravager -> Arisen -> Ravager remained green; focused and protected automation passed with zero rendered-console errors.
- Awaiting only the owner's repeated Nicol Bolas hover-flipping recheck. Do not merge, push, close, or mark Done before explicit acceptance.

## Final owner acceptance rejection and direction — 2026-08-22

- **FAIL — Return to RobDev.** VM-580 is the sole remaining blocker. VM-581, VM-582, and VM-583 are owner-accepted and frozen.
- Stop iterating on bespoke Archscry hover-preview lifecycle patches. Inspect the proven Maze `.transform-card-media` / `.transform-card-button` selected-face pattern and reuse or extract only the smallest shared transform-media behavior needed by Archscry.
- Apply the reused behavior at the common Archscry hover-preview owner so every Archscry card-bearing surface routed through the existing preview system inherits it. Nicol Bolas is fixture and owner-acceptance evidence only; no card-name, identity, dossier, or section-specific transform logic is permitted.
- The shared face interaction must own authoritative transformability, selected face, active image, face-specific name/type/Oracle content, and repeated Flip state while Archscry retains its dossier presentation, overlay positioning, source-plus-preview dismissal boundary, styling, and Card Details behavior.
- Required real-pointer invariant: `source -> preview -> flip -> flip back -> flip -> flip back -> leave combined boundary -> dismiss`, including an initially uncached alternate-face image.

## Final RobDev pre-edit contract — 2026-08-22

- Product outcome: every Archscry surface using the common hover-preview system gets stable, indefinitely repeatable true-transform face interaction; ordinary cards never get Flip.
- Current behavior: the shared Scryfall normalizer is reused, but Archscry still owns a separate module-global preview renderer and lifecycle compensations that the owner has repeatedly observed failing after face changes.
- Owning layer and existing machinery: `assets/js/archscry/runtime/card-media.js` owns the common preview; `assets/js/shared/scryfall-transform-faces.js` owns authoritative normalized face facts; Maze proves stable closure-owned selected-face mutation in one persistent media container.
- Changed behavior: replace the failed bespoke preview face-state/render path with the smallest Maze-derived shared face-interaction seam at the common preview owner.
- Protected behavior: all Archscry preview consumers, Card Details, keyboard/focus and combined-boundary dismissal, VM-581/582/583, Maze search/result presentation, placement, telemetry, persistence, generated data, and Scryfall authority.
- Smallest complete implementation: extract/reuse shared ephemeral face interaction and bind it once to the existing singleton Archscry preview DOM; retain route-local positioning/dismissal and CSS presentation.
- Non-goals and stop condition: no Maze component/layout import, no preview rewrite, no click-to-lock, no new Scryfall model, and no name/identity/section branching. Stop if broader architecture or frozen Maze product changes become necessary.

## Final shared transform-media RobDev remediation - 2026-08-22

- Extracted the proven Maze closure-owned face progression into createScryfallTransformMediaBehavior inside the existing shared Scryfall face module. It owns ephemeral selected-face state and exposes the current and next authoritative normalized faces; ordinary cards receive no behavior.
- Bound that behavior once at the common Archscry singleton preview owner. All existing staple-img, land-img, card-voice, and card-rationale preview consumers inherit the same path through cardPreviewTriggerFromEvent; production code contains no Nicol Bolas, Grixis, Card Signals, identity, or section branching.
- Replaced the old preview card/state global pair with one shared media behavior and reused stable transform-card-media / transform-card-button structure. The prior deferred lifecycle compensation and JavaScript height assignment were removed; Archscry retains positioning and combined-boundary dismissal, with stable card-ratio geometry owned by persistent preview DOM/CSS.
- Automation proves source -> preview -> Arisen -> Ravager -> Arisen -> Ravager -> leave -> dismiss with re-entry between swaps and delayed no-store alternate media. Image, selected face, name, type, Oracle copy, alt, next-face label, singleton witness, and 315x440 hit box remain synchronized.
- Fresh 1440x1000 rendered QA repeated four real-mouse flips, verified ordinary Sedris has no Flip, confirmed Card Details both ways plus Escape focus restoration, inspected settled Arisen optically, and found zero console errors.
- Focused shared-face, Archscry transform, owner-QA, Maze compatibility, dev-review, lint, smoke, syntax, and diff checks pass. VM-581/582/583 runtime and CSS remain unchanged.

## Owner acceptance rejection of `d590970` - 2026-08-22

- **FAIL - Return to bounded RobDev.** Exact rejected candidate: `d590970521d5880ec128f734b2491d2d80915c00`. Do not merge, push, close, or mark VM-580 Done.
- The shared transform-face behavior and rendered transform metadata are retained. The remaining defect is the common source-card to hover-preview pointer transition, not Nicol Bolas-specific transform logic.
- Pre-edit real-browser reproduction used 18 incremental screen-coordinate moves from the Nicol Bolas source center toward the visible Flip control. While the pointer remained on the source, `handleCardPreviewPointerMove` moved the overlay roughly 18px ahead of every new pointer coordinate. At the first coordinate beyond the source (`788,430`), the preview had chased to `x ~= 795`, neither surface was hovered, and the overlay became `aria-hidden="true"` before it could receive pointer entry.
- Exact dismissal cause: the delegated `.app` `pointermove` resolves no preview trigger in the geometric gap and synchronously calls `hideCardPreviewOverlay()`; the source `pointerout` requestAnimationFrame check is a second competing dismissal path. The active preview has `pointer-events: auto`, so pointer-event suppression is not the failure.
- Smallest complete correction: keep the existing preview source-anchored instead of cursor-chasing, add one bounded 150-250ms source/preview transition grace with symmetric schedule/cancel behavior, and ensure delegated pointer movement cannot defeat active combined-boundary ownership.
- Required regression: use rendered source/preview rectangles and multiple real pointer coordinates through the source edge and actual gap into preview body and Flip, include a deliberately slower transition, repeat Ravager -> Arisen -> Ravager -> Arisen -> Ravager without reopening, then leave both surfaces and dismiss.
- Protected and frozen: shared transform-face state and content parity, Card Details, ordinary-card behavior, every common Archscry preview consumer, VM-581, VM-582, VM-583, Maze runtime/CSS, placement, data, telemetry, persistence, VM-578, and unrelated VM-584/`.agents` work.
- Stop condition: no new preview architecture, click-to-lock state, card/identity/section branch, or transform-state duplication. Stop and report if the existing common preview owner cannot express the bounded ownership timer.

## Human-pointer transition RobDev remediation - 2026-08-22

- Reproduced the owner failure before runtime editing with incremental CUA screen coordinates. The cursor-anchored preview moved ahead of every source `pointermove`; in the rendered gap, the delegated handler resolved no trigger and synchronously hid the overlay before `pointerenter`. Source `pointerout` also queued dismissal.
- Kept the existing shared transform-media behavior. The common Archscry preview is now source-anchored, uses one 200ms bounded source/preview transition timer, cancels on either entry, schedules on either exit, and no longer lets delegated pointer movement destroy an active preview.
- Pointer-derived Flip focus is released on pointer exit so the preview dismisses after mouse use; genuine keyboard-visible focus remains protected.
- The focused browser regression now uses live source/preview rectangles and 20 incremental source/edge/gap/body coordinates before moving through the preview to Flip. It failed on rejected `d590970` and passes after the remediation, including a deliberately slow crossing, four swaps, delayed uncached alternate media, click-focus dismissal, ordinary exclusion, and Card Details protection.
- Final manual 1440x1000 CUA pass followed Dossier Review -> Grixis -> Card Signals -> Nicol Bolas, crossed the rendered 18px gap, completed Ravager -> Arisen -> Ravager -> Arisen -> Ravager without reopening, dismissed after leaving both surfaces, confirmed ordinary Sedris has no Flip, and confirmed Card Details both ways plus focus restoration.
- Focused transform, post-VM579 browser, dev-review, shared-face, JS lint, syntax, and diff checks pass. Placement and unrelated heavyweight suites were intentionally not run.
- VM-581, VM-582, VM-583, Maze runtime/CSS, shared transform-face authority, placement, data, telemetry, persistence, VM-578, VM-584, and `.agents` remain untouched. Do not merge, push, close, or mark Done before owner acceptance.
