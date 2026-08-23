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
