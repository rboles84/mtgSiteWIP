# VM-580 and VM-583 Owner-Rejection Remediation RobDev Handoff

## Agent name

Codex

## Task requested

Remediate only the two owner-rejected blockers after the first VM-580 through VM-583 acceptance pass: repeated Nicol Bolas hover-preview flipping (VM-580) and the mobile Maze textarea-to-Search gap (VM-583). Preserve owner-approved VM-581 and VM-582, do not reopen VM-579, and do not merge, push, close, or mark Done before a fresh exact-SHA RobQA PASS and bounded owner recheck.

## Related Kanban cards, docs, or plans

- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/kanban/in-progress/VM-583-maze-mobile-search-control-gap.md`
- Owner-approved protected controls: VM-581 and VM-582
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- Prior RobDev candidate handoff `2026-08-22-1710-codex-vm580-vm583-owner-qa-remediation-robdev.md`
- Prior independent PASS handoff `2026-08-22-1722-euclid-vm580-vm583-independent-robqa.md`

## Files reviewed

- Mandatory handoff index, prior RobDev/RobQA records, current Kanban board/cards, governing RobDev/RobQA gates, and the owner rejection
- `assets/js/archscry/runtime/card-media.js`, `assets/js/archscry/runtime/actions.js`, `assets/js/shared/scryfall-transform-faces.js`, and transform/hover CSS/tests
- `maze/index.html`, all `.search-input-row`/`.search-wrap` responsive rules in `assets/css/maze.css`, and Maze runtime searches for dynamic height/flex mutations
- Focused owner-QA browser test and relevant protected regression suites

## Files changed

- `assets/js/archscry/runtime/card-media.js`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `tests/archscry/archscry-transform-tests.js`
- `tests/archscry/post-vm579-owner-qa-tests.js`
- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/kanban/in-progress/VM-583-maze-mobile-search-control-gap.md`
- This handoff and `docs/handoffs/HANDOFF_INDEX.md`

## Compact implementation packet

### Owning authority and producer

- VM-580 remains owned by the single existing `card-media.js` preview overlay/controller and the unchanged shared Scryfall transform state.
- VM-583 remains owned by `.search-input-row` in existing Maze CSS; Maze markup/runtime/parser are not producers of the observed geometry.

### Changed behavior

- The hover overlay now retains its already-computed card-aspect height during face image swaps, and source/preview pointer exits use one deferred combined-boundary recheck before dismissal.
- The mobile Maze search owner is now a one-column max-content grid, so row-oriented child flex bases cannot become vertical allocations.

### Protected behavior and consumers

- Ordinary preview hidden state, transform recognition from authoritative metadata, face-specific image/name/type/Oracle copy, focus behavior, leave-to-dismiss, and Card Details.
- Maze textarea/action dimensions, Plain Reading/Operator's Hand/Loom, desktop flex/wrap layout, query/parser behavior, and zero overflow.
- All five College display/route matrices and ordinary Orzhov (VM-581), plus Precon/Commander Browsing provider geometry (VM-582), remain covered unchanged.
- VM-579, placement, telemetry, persistence, generated/identity/Scryfall data, provider routes, and the unrelated VM-578 archive remain untouched.

### Realistic risks

- An uncached face image can perturb hit testing during a swap; fixed hit geometry plus delayed-image real-pointer automation protects this.
- Immediate asymmetric preview `pointerleave` can clear the state while the pointer is transitioning within the established source/preview interaction; shared deferred rechecking protects both directions without pinning.
- Mobile flex declarations can regain column-axis meaning through cascade/state differences; changing the owning mobile container to max-content grid makes those declarations structurally irrelevant.

### Smallest complete implementation

- Four additions in existing preview seams: one explicit overlay height assignment, image fill styles, and one reused deferred dismissal helper replacing duplicated/immediate dismissal.
- One mobile owner change from flex-column semantics to a one-column max-content grid; obsolete child flex resets removed.

### Non-goals

No preview DOM replacement, new state, click-to-lock behavior, transform model/resolver rewrite, Card Details change, Maze markup/runtime/parser/query edit, negative margin, viewport-height rule, responsive overhaul, VM-581/582 product change, or VM-579 work.

### Stop conditions

Stop if repeated flipping requires a new preview lifecycle/state system or if Maze spacing requires runtime/markup/broad layout changes. Neither condition occurred.

## What changed and why

### VM-580

- Inspection proved face swaps mutate the same overlay/image/copy/button nodes, so listeners and the boundary reference are not replaced.
- The overlay previously derived its height only from the current image and dismissed immediately from overlay `pointerleave`, while source exits received a deferred two-surface recheck. Stable explicit hit geometry and symmetric reuse of that existing defer/recheck seam address the post-flip lifecycle without locking or rewriting the overlay.
- The focused browser path now delays the Arisen image, witnesses the same DOM boundary and dimensions, performs three consecutive real-pointer flips with preview re-entry, then leaves and observes dismissal before verifying Card Details.

### VM-583

- Ancestor inspection at 390x844 measured the committed path as 88px textarea/wrapper and 10.39px gap, but `.search-input-row` itself remained flex. A 320–1051px/all-mode scan confirmed no runtime or hidden element owns height; the remaining structural owner was the flex container and its sensitivity to inherited bases.
- The mobile container now uses explicit max-content grid rows. At 390x844 it computes `88px 60px 60px 60px 60px 60px`, a 10.39px gap against the 10.4px design token, and zero overflow in all modes.

## Decisions made

- Treat the owner's observed product behavior as authoritative even though the prior 390px harness computed a compact path.
- Strengthen the responsible owners rather than add margins, pinned preview state, surface-specific workarounds, or new machinery.
- Keep VM-581 and VM-582 frozen and use their existing focused matrix/geometry cases only as regression controls.
- Use a fresh origin for rendered verification; a same-origin tab loaded before edits demonstrably retained the previous CSS/JS assets.

## QA classification and readiness

- Overall QA tier remains QA-3 because VM-580 changes a pointer-boundary lifecycle; VM-583 is QA-2 responsive layout.
- RobDev fresh-origin rendered QA: PASS at 1440x1000 and 390x844 with real pointer/click input and zero console errors.
- Owner acceptance is not claimed. A fresh independent reviewer must inspect the exact remediation SHA before the two-case owner recheck.

## Tests run

Passing:

- `npm run test:post-vm579-owner-qa`
- `npm run test:archscry-transform`
- `npm run test:transform-faces`
- `npm run test:dev-review`
- `npm run test:mode`
- `npm run test:maze-results-layout`
- `npm run lint:js`
- `npm run lint:html`
- `npm run test:frontend-smoke`
- `node --check assets/js/archscry/runtime/card-media.js`
- `node --check tests/archscry/post-vm579-owner-qa-tests.js`
- `git diff --check`
- Fresh-origin rendered VM-580: source -> preview -> Arisen -> Ravager -> Arisen, preview -> source -> preview, leave -> dismiss; settled-face optical QA; zero console errors
- Fresh-origin rendered VM-583: complete ancestor geometry at 390x844, optical search stack, real raw/builder/ai clicks, desktop 1440x1000 protection, zero overflow/errors

Previously independently classified inherited failures remain outside this remediation: the dossier source-string assertion and Maze `c:r` metadata assertion. This change touches neither failing owner/test path.

## Risks / uncertainties

- Fresh exact-SHA RobQA and the owner's two bounded judgments remain open gates.
- Browser cache can obscure changed local assets; reviewers should use a fresh origin or disable cache and verify computed owner styles before judging.

## Not touched

- VM-581 or VM-582 implementation, cards, or accepted behavior
- VM-579 implementation/card/history
- Placement, telemetry, persistence, auth, saved state, canonical/generated data, Scryfall authority, provider routing
- Maze HTML/runtime/parser/compiler/query behavior
- Unrelated `docs/research/maze-player-language/corpus/vm578.zip`
- Merge, push, deployment, Done transitions, or closeout

## Follow-up recommendations

1. Commit this bounded remediation as an exact candidate.
2. Fresh independent RobQA should rerun only the two blockers plus protected VM-581/582 controls on that SHA.
3. If PASS, return only repeated Nicol Bolas hover flipping and mobile Maze textarea-to-Search spacing to the owner.

## Next suggested agent

Fresh independent exact-SHA RobQA reviewer, then the owner for the two-case recheck.
