# VM-576 - Transform Card UX + Targeted Dossier Visual Repair

Status: Done
Completed: 2026-08-21

## Baseline

- VM-575 is closed and integrated at `6898ce821e04909e8351b225274d591b11c29203`.
- VM-576 begins from clean `main` at that exact SHA with `origin/main` aligned, `0/0` divergence, and one canonical worktree.

## Scope

### Dimir hero crop

- Use the owner-supplied `dimir-mortus-strider.jpg` art crop with shared cover behavior, position `54% 45%`, and Tomasz Jedruszek / Mortus Strider attribution.
- Mute only the Dimir hero title color so it supports rather than distracts from the artwork.
- Do not use the supplied full-card scan as hero art.

### Shared transform utility

- Add a small DOM-independent utility that recognizes only Scryfall `layout: "transform"` records with usable `card_faces`.
- Normalize each face's available name, image, mana cost, type line, Oracle text, power, toughness, loyalty, defense, face index/count, next-face handling, and other face-specific characteristics already present in the supplied record.
- Use a valid existing `selected_face_name` when supplied; otherwise begin at face index 0.
- Face selection is ephemeral presentation state only. Do not persist it to storage, URLs, placement state, telemetry, or the Scryfall cache.
- Do not expand the Scryfall cache/projection schema solely to populate fields the affected UI does not currently display.
- The true-transform model remains restricted to `layout: "transform"`. Maze may reuse the same normalized face state for result-only presentation of `layout: "modal_dfc"`; split cards, adventures, reversible cards, meld cards, and ordinary cards remain unchanged.

### Atomic face rendering

- Whenever Flip changes the active face, every face-specific field exposed by that surface must update from the same face together: image, displayed face name, mana cost, type line, Oracle text, image alt/accessibility text, and any other exposed face characteristic.
- Never show one face's art with another face's rules or metadata.

### Archscry

- Transform hover previews show one active face and a Scryfall-like circular Transform control over the artwork, with an exact `Transform preview to [face name]` accessible name.
- For transform cards only, the desktop preview is pointer-interactive. Moving between source and preview does not dismiss it; leaving both dismisses normally.
- Preview Flip does not open Card Details. Non-transform previews remain passive.
- Card Details shows one face with the same artwork-overlay Transform treatment and no concatenated face rules.
- Archscry hover and Card Details may maintain independent ephemeral face state.
- Existing open, close, Scryfall-link, and focus-return behavior remains intact.

### Maze

- `transform` and `modal_dfc` search results show one active face with sibling semantic image/details, artwork-overlay Transform, and Set Aside controls.
- Do not retain `role="button"` on a parent containing child buttons. Flip and Set Aside do not open the modal.
- Maze Card Details does not inherit result face state.
- Card Details preserves the established multiface view: all available face images and combined face text are visible together, with no modal Flip control.
- Existing close, Escape, focus-return, search semantics, and stash behavior remain intact.
- A freshly typed Operator's Hand query is exact: Maze does not append the sidebar's default format. Incoming Archscry/dossier and sidebar queries preserve every explicit term, including `f:commander`.
- Desktop result hover magnifies the currently displayed artwork in place at `2x` rather than opening a detached preview. Edge columns expand inward; touch-sized layouts do not magnify.
- Reading Finds opens from the search action row as an initially closed, near-black modal-like floating panel. Desktop users can drag it by non-interactive header space; movement is viewport-clamped and ephemeral. Mobile resets to the fitted fixed position. Storage, sections, counts, export, return link, and card Set Aside behavior remain unchanged.
- The result shell reserves only the existing navigation sidebar plus results lane. Results are capped at five wider columns on desktop, four at intermediate width, and two on mobile; no sixth desktop column is introduced.
- Every result uses separate Details and Set Aside buttons, with Flip as a third sibling when eligible. No result container wraps interactive controls inside another interactive role.

### Colorless Mana Notes

- Reduce the runtime primer to exactly `Wastes First` and `Rocks and Colorless Sources`.
- Preserve the internal `mana-notes` / `rocks-and-sources` education field, fold the Command Tower and Reflecting Pool caution into it, and remove the redundant runtime `color-choice-caution` target.
- Add a `.mana-primer-grid` layout with two equal columns at desktop/intermediate widths, one column on narrow/mobile, and explicit overflow protection.
- Do not affect unrelated `.starter-grid` surfaces or rewrite canonical VM-565 education authority/catalog.

## Protected Boundaries

- No telemetry imports, calls, events, properties, PostHog changes, or live telemetry verification.
- No placement/scoring, faction, curation, Scryfall projection, generated-data, VM-569 media inventory, VM-574 Card Signal, Maze query translation, incoming query stripping, or deck/stash changes.
- Do not change Colorless card selections, utility-land caution, mana recommendation logic, or identity semantics.

## Regression Fixtures

- Nicol Bolas, the Ravager // Nicol Bolas, the Arisen
- Bruce Banner // The Incredible Hulk - current live `modal_dfc` result-flip fixture
- One additional ordinary transform DFC
- One `modal_dfc`
- One ordinary card
- One existing non-transform multiface card when fixture-backed

## Validation

- `npm run lint:js`
- `npm run lint:html`
- `npm run test:frontend-smoke`
- `npm run test:telemetry` as regression proof only, with no live events
- Focused transform utility, Archscry transform, and Maze transform tests
- Rendered QA at desktop, intermediate width, mobile, and 500% zoom
- Keyboard, focus-return, and Escape checks on affected interactions
- No horizontal overflow on Dimir or Colorless
- No nested interactive-control accessibility defect in Maze
- `git diff --check`
- Do not run giant placement journeys unless a placement-owned module unexpectedly changes.

## Stop Condition

Stop and report instead of widening VM-576 if correct transform behavior requires expanding the Scryfall cache/projection schema, regenerating governed media, changing telemetry, or redesigning non-transform multiface layouts.

Owner follow-up explicitly authorized result-only Flip behavior for Scryfall `layout: "modal_dfc"` records such as Bruce Banner while preserving the combined multiface Card Details view. This is layout-based, never name-based, and does not widen Archscry or other non-transform layouts.

## RobDevPass Packet

- Owning producers: shared Scryfall face presentation utility; Archscry card-media runtime; Maze result/modal runtime; Archscry dossier view and scoped CSS.
- Changed behavior: true transform cards gain ephemeral one-face flip state; Maze results also expose that presentation for `modal_dfc`, add `2x` in-place desktop magnification and wider capped columns, and move Reading Finds to a draggable floating panel; Maze details show all multiface faces; Dimir uses cover with a muted title; Colorless primer becomes a contained two-card grid.
- Protected behavior: telemetry, placement, content authorities, generated data, non-transform layouts outside the explicit Maze result allowance, search, and stash persistence.
- Smallest complete implementation: one shared face normalizer plus route-specific state/rendering and narrowly scoped presentation changes.
- Risks: stale mixed-face fields, preview dismissal boundary, nested controls, focus regression, and horizontal overflow.
- Non-goals and stop conditions: as stated above.

## RobQAPass Classification

- QA tier: QA-3, stateful interaction and focus/navigation behavior with visible responsive changes.
- CPU-heavy validation: NOT REQUIRED unless placement-owned code unexpectedly changes.

## Closeout

- Implementation commit: `8ed9ed6a49665e45b1ff5e1ceedcbceca6be6755`.
- Owner visual acceptance: complete for the affected Archscry, Dimir, Colorless, and Maze surfaces.
- RobQAPass verdict: Ready and accepted for closeout.
- Focused automated validation passed: JavaScript and HTML lint, transform utility, Archscry and Maze transform, Maze query and mode-isolation, Maze results-layout, Reading Finds, frontend smoke, telemetry regression, and diff checks.
- Rendered desktop/mobile validation passed for transform flipping, modal behavior, focus/Escape, draggable Reading Finds, magnification, and overflow.
- No exhaustive placement, all-37, giant journey, mutation, bias, or equivalent heavyweight suite was run. This was intentional and risk-proportional because placement, scoring, weighting, routing, qualification, stopping, generated-data, and telemetry contracts were unchanged.
- Residual risk is limited to minor browser-specific visual variation.
