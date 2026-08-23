# VM-580 and VM-583 Owner-Rejection Remediation Independent RobQA

## Review result

**PASS — Owner Review Ready**

Exact candidate reviewed: `3fb00c0319428204d641bf636adfaa78ba54b0e0`

Exact parent: `89db2c136b0fbe7b6b5182700e8cc8cb2428c29d`

Branch: `codex/vm580-vm583-owner-qa-remediation`

## Agent name

Independent RobQA reviewer (`vm580_vm583_rejection_robqa`)

## Task requested

Independently review the exact owner-rejection remediation candidate for VM-580 and VM-583. Treat prior implementation and QA claims as untrusted; verify repeated real-pointer transform-hover flipping and the actual mobile Maze spacing owner on a fresh origin; preserve owner-approved VM-581 and VM-582; and do not implement, merge, push, close, or mark Done.

## Related Kanban cards, docs, or plans

- `docs/kanban/in-progress/VM-580-transform-hover-preview-interaction-contract.md`
- `docs/kanban/in-progress/VM-583-maze-mobile-search-control-gap.md`
- Protected accepted controls: VM-581 and VM-582
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/2026-08-22-1801-codex-vm580-vm583-owner-rejection-remediation-robdev.md`

## Preflight and exact-SHA state

- `HEAD` exactly matched candidate `3fb00c0319428204d641bf636adfaa78ba54b0e0` before review.
- The tracked tree was clean before this handoff. The only pre-existing untracked item was `docs/research/maze-player-language/corpus/vm578.zip`; it remained untouched.
- One registered worktree and one related branch were present; no parallel worktree or replacement branch was created.
- Exact parent-to-candidate diff contains only the existing Archscry preview JS/CSS seams, existing Maze CSS owner, strengthened focused tests, VM-580/VM-583 cards, the RobDev handoff, and handoff index.

## Files reviewed

- Mandatory handoff index, Kanban board, VM-580 through VM-583 cards, recent VM-579 closeout and prior VM-580 through VM-583 handoffs
- `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md`
- Exact diff `89db2c136b0fbe7b6b5182700e8cc8cb2428c29d..3fb00c0319428204d641bf636adfaa78ba54b0e0`
- `assets/js/archscry/runtime/card-media.js`
- `assets/css/archscry.css`
- `assets/css/maze.css`
- `tests/archscry/archscry-transform-tests.js`
- `tests/archscry/post-vm579-owner-qa-tests.js`
- Relevant transform/shared-face/dev-review, Maze mode/layout, lint, validation, and smoke tests
- Fresh-origin rendered Archscry and Maze routes at `1440x1000` and `390x844`

## Files changed

- `docs/handoffs/2026-08-22-1812-vm580-vm583-owner-rejection-independent-robqa.md`
- `docs/handoffs/HANDOFF_INDEX.md`

No runtime, CSS, test, package, card, board, branch, implementation handoff, VM-581/VM-582, VM-579, or data file was modified during independent review.

## Exact-diff architecture and protection review

- VM-580 preserves the singleton `.card-preview-overlay`, existing normalized Scryfall transform state, existing Flip button/listener, and existing source-plus-preview boundary. Face swaps still mutate the current image/copy/button nodes; no preview DOM replacement, new state owner, click-to-lock behavior, listener recreation, resolver/model rewrite, or parallel preview system was added.
- The remediation fixes the already-computed `63:88` overlay hit height and lets the current image fill that box. Both source and preview exits now call one deferred combined-boundary recheck. This is a narrow lifecycle repair in the existing owner.
- VM-583 changes only the existing `max-width:820px` `.search-input-row` layout owner from flex-column to a one-column grid with `grid-auto-rows:max-content`; obsolete mobile child flex resets are removed. There is no margin hack, viewport-derived sizing, markup/runtime/parser/compiler/query change, or responsive subsystem.
- The exact diff contains no VM-581/VM-582 product or card changes; no VM-579, placement, telemetry, persistence/storage, generated or Scryfall-authority data, provider routing, or Maze runtime/parser/query files; and no new architectural machinery.

## QA classification

- Overall tier: QA-3 because VM-580 changes a repeated pointer-boundary lifecycle.
- VM-583: QA-2 responsive component geometry.
- VM-581 and VM-582: accepted QA-2 controls, exercised only as focused regression protection.
- CPU-heavy placement, synthetic, mutation, recovery, and exhaustive journey suites were not required because no QA-4 owner changed.

## Tests selected and results

All selected tests passed on exact candidate `3fb00c0319428204d641bf636adfaa78ba54b0e0`:

- `npm run test:post-vm579-owner-qa` — PASS. Includes delayed/no-store alternate-face media, stable overlay witness/geometry, real source-to-preview pointer movement, three consecutive Flip clicks with preview re-entry, dismiss, Card Details, all-five College label/route matrix plus Orzhov, both provider surfaces, mobile Maze bounded geometry, and all three Maze modes.
- `npm run test:archscry-transform` — PASS.
- `npm run test:transform-faces` — PASS.
- `npm run test:dev-review` — PASS; protected VM-579 review behavior remains green.
- `npm run test:mode` — PASS, 12 mode cases and 12 leakage cases.
- `npm run test:maze-results-layout` — PASS.
- `npm run lint:js` — PASS for 31 frontend files.
- `npm run lint:html` — PASS.
- `npm run test:frontend-smoke` — PASS.
- `node --check assets/js/archscry/runtime/card-media.js` — PASS.
- `node --check tests/archscry/post-vm579-owner-qa-tests.js` — PASS.
- `git diff --check 89db2c136b0fbe7b6b5182700e8cc8cb2428c29d..3fb00c0319428204d641bf636adfaa78ba54b0e0` — PASS.

## Tests intentionally skipped

- CPU-heavy placement/journey/synthetic/mutation/recovery suites — not proportionate; placement and all QA-4 owners are absent from the exact diff.
- The broad dossier source-string and Maze `c:r` metadata assertions were not rerun. The preceding exact-parent review already reproduced both failures on parent and candidate, and this exact remediation diff does not touch their owners (`data.js`, Maze runtime/parser/query, or those broad test files). No broader-scope inference is used for either owner blocker.

## Independent rendered evidence

### VM-580 — repeated transform hover lifecycle

- Fresh origin, desktop `1440x1000`, Grixis Card Signals, real pointer and coordinate clicks with human-representative pauses.
- Ordinary Sedris preview: `is-transform=false`; Flip retained `hidden`, computed `display:none`, and measured `0x0`.
- Nicol Bolas source -> current preview preserved the boundary: preview was visible, `:hover=true`, and the source was no longer hovered.
- Front rendered `Nicol Bolas, the Ravager`, `Legendary Creature — Elder Dragon`, face-specific Oracle copy, front image URL, and matching alt text.
- First real Flip rendered `Nicol Bolas, the Arisen`, `Legendary Planeswalker — Bolas`, back-specific Oracle copy, back image URL, and matching alt text. The same single overlay remained visible and hovered with a stable `315x440` hit box.
- After the first swap, real pointer movement preview -> source -> preview preserved the Arisen state and re-entered the current overlay.
- Second real Flip returned to Ravager with matching front media/copy and the same single `315x440` overlay.
- After the second swap, real pointer movement preview -> source -> preview again preserved and re-entered the current overlay.
- Third real Flip returned to Arisen with matching media/copy; the current overlay remained visible and hovered. Moving outside both source and preview dismissed it (`is-visible=false`, `aria-hidden=true`).
- Card Details independently opened on Ravager, flipped to Arisen, flipped back to Ravager, and closed normally.
- The focused browser regression independently supplied the required delayed/uncached alternate-image case and stable DOM witness.
- Optical screenshot inspection showed the settled Arisen preview, Flip hit area, face copy, and surrounding Card Signals layout rendered coherently.

### VM-583 — mobile Maze spacing owner

- Fresh origin at `390x844`; browser reports `innerWidth=390` and zero horizontal overflow.
- Complete computed ancestor inspection from `textarea#search-input` through `.search-wrap`, `.search-input-row`, `.maze-search-shell`, `.maze-console-panel`, `.maze-command-deck`, and page shell found no inherited vertical allocation between textarea and Search.
- `#search-input` and immediate `.search-wrap` both measured exactly `88px` high.
- Owning `.search-input-row` computed `display:grid`, one `325.812px` column, `grid-auto-rows:max-content`, and exact row tracks `88px 60px 60px 60px 60px 60px`.
- Textarea bottom to Search top measured `10.390625px` against the computed `10.4px` row gap, within the explicit `<=24px` invariant.
- Search, Clear, Copy, Open in Scryfall, and Reading Finds each measured `325.8125x60px`. After a real local search, all five were visible, enabled/active, keyboard reachable, and `pointer-events:auto`.
- Real Operator's Hand (`raw`), Loom (`builder`), and Plain Reading (`ai`) clicks all succeeded and retained the same grid tracks, `88px` wrapper/textarea equality, `10.390625px` gap, and zero overflow.
- Optical mobile inspection showed Search immediately below the textarea followed naturally by Clear, Copy, Open in Scryfall, and Reading Finds, with no art-background void.
- Desktop `1440x1000` retained `display:flex`, row direction, wrapping, `88px` textarea, `60px` Search, and zero overflow.

### Accepted VM-581 and VM-582 controls

- The focused test passed the all-five College display/route matrix plus ordinary Orzhov without changes.
- Mobile Silverquill spot review retained `Silverquill` labels with the existing Orzhov/WB destinations. Commander Browsing controls remained `42.625px` high and approximately `59%`–`73.5%` of parent width; visible Precon EDHREC controls remained approximately `35.3%` of parent width. Both sections had zero horizontal overflow.

## Console and runtime health

- Browser console errors across the fresh Archscry and Maze journeys: **0**.
- No unexpected network, page, or runtime failure was observed.

## Manual findings converted to invariants

- Owner finding: transform preview became non-interactive after the first swap. Invariant: on the same overlay boundary, real pointer movement must support at least three consecutive in-boundary face swaps with re-entry between swaps, stable hit geometry during delayed alternate media, then dismiss only after leaving source and preview.
- Owner finding: mobile Maze retained a large textarea-to-Search void. Invariant: the owning mobile row must compute as one-column max-content grid; wrapper height must equal textarea height; textarea-bottom to Search-top must match the design row gap and remain `<=24px`; every action, mode, overflow, and desktop wrap contract remains protected.

## Risks / uncertainties

- No correctness blocker remains in the reviewed candidate.
- Owner acceptance is still required for the two explicitly bounded visual/interaction judgments. This PASS does not authorize merge, push, closeout, or Done transition.

## Not touched

- Accepted VM-581 and VM-582 implementation/cards/board state
- VM-579 implementation, governance, or history
- Placement, identity semantics, evidence, telemetry, persistence, auth, saved state, provider routing, generated/canonical/Scryfall data
- Maze markup, runtime, parser, compiler, or query behavior
- Unrelated `docs/research/maze-player-language/corpus/vm578.zip`
- Merge, push, deployment, card closure, or Done transition

## Remaining owner judgment

Only these two bounded checks remain:

1. Repeated Nicol Bolas hover flipping: source -> preview -> Arisen -> Ravager -> Arisen, with preview re-entry after swaps, then leave both to dismiss.
2. Mobile Maze at approximately 390px: textarea-to-Search spacing feels compact and intentional with the action stack immediately following.

## Follow-up recommendations

- Return `PASS — Owner Review Ready` for exact SHA `3fb00c0319428204d641bf636adfaa78ba54b0e0` and ask only for the two checks above.
- Do not merge, push, close, or mark Done until owner acceptance is explicit.

## Next suggested agent

Owner for the two-case bounded acceptance recheck, then closeout governance only if accepted.
