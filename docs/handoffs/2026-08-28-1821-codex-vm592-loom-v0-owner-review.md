# VM-592 Loom v0 First Implementation Pass — Owner Review

> **Superseded disposition:** Owner Review returned **NEEDS REVISION**. This file remains the first-pass record. The bounded remediation and current Owner Re-Review packet are in [2026-08-28-2313-codex-vm592-owner-review-remediation.md](2026-08-28-2313-codex-vm592-owner-review-remediation.md).

## Handoff identity

- **Agent name:** Codex (`/root`)
- **Task requested:** Implement the registered VM-592 Loom v0 usability, intent, and product-alignment pass, follow RobDev/RobQA, and stop at Owner Review without commit, push, or Done transition.
- **Related Kanban card:** [VM-592 — The Loom v0 Usability, Intent, and Product-Alignment Pass](../kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md)
- **Baseline SHA:** `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b`
- **Branch / worktree:** `main`, one registered worktree at `C:/dev/voxmana.io`, even with `origin/main` at pre-flight.
- **Disposition:** First authorized implementation pass is complete and stopped at bounded Owner Review. No commit or push was made and VM-592 remains In Progress.

## Files reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-27-2259-codex-vm590-loom-red-team.md`
- `docs/handoffs/2026-08-28-1027-codex-vm591-semantic-state-contract.md`
- `docs/handoffs/2026-08-28-1659-codex-vm592-story-registration.md`
- `docs/handoffs/2026-08-22-1523-codex-vm579-owner-remediation-robdev.md`
- `docs/handoffs/2026-08-22-1534-poincare-vm579-owner-remediation-robqa.md`
- `docs/handoffs/2026-08-22-1710-codex-vm580-vm583-owner-qa-remediation-robdev.md`
- `docs/handoffs/2026-08-22-1722-euclid-vm580-vm583-independent-robqa.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-590-implicit-maze-loom-red-team.md`
- `docs/kanban/done/VM-591-freeze-plain-reading-shared-semantic-state-contract.md`
- `docs/kanban/done/VM-583-maze-mobile-search-control-gap.md`
- `docs/kanban/done/VM-329-colorless-dossier-hero-precon-mana-base-maze-ux-repair.md`
- `docs/kanban/done/VM-331-colorless-placement-copy-polish-maze-query-repair.md`
- `docs/contracts/maze-query-contract.md`
- `docs/contracts/maze-semantic-state-contract.md`
- `docs/architecture/route-ownership-matrix.md`
- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `assets/js/maze/research-builder.js`
- `tests/maze/research-builder-tests.js`
- `tests/maze/research-mode-tests.js`
- `tests/maze/maze-search-tests.js`
- `tests/maze/maze-query-contract-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- Local Mana Font use in current Vox Mana route assets and styles.

## Pre-flight summary

- **Recent related work:** VM-590 established the bounded Loom v0 findings. VM-591 froze semantic-state contract/schema `1.0.0` but deliberately left it dormant. VM-583 froze the accepted mobile max-content action stack.
- **Current known risks:** query-label/query-result disagreement; treating `C` as a sixth Commander color; a second execution owner; false dossier application; mobile causal-order regression; focus/scroll disruption; and scope drift into Loom v1 or semantic-state migration.
- **Relevant decisions already made:** default color behavior is **Fits these Commander colors** using `id<=`; W/U is `id<=wu`; `MazeQueryResult.query` remains sole executable-query authority; dossier context is disclosure only.
- **Files recently changed before implementation:** the story-registration handoff, handoff index, board, untracked VM-592 card, and unrelated player-language corpus were already dirty/untracked. Runtime implementation owners were clean.
- **What must not be touched:** Plain Reading, protected Operator behavior, `MazeQueryResult.query`, result cards, Reading Finds, modal, Archscry handoff semantics, placement, recommendation/ranking, generated data, VM-591 contract/schema, Loom v1, graph surfaces, and unrelated `docs/research/maze-player-language/corpus/vm578.zip`.
- **Concurrency check:** no related branch/worktree and no overlapping runtime edits were found.

## RobDev compact implementation packet

- **Owning authority:** VM-592 and its frozen owner decision, constrained by VM-590, VM-591 schema `1.0.0`, the Maze query contract, route ownership, and VM-583 mobile treatment.
- **Owning producer / seam:** `research-builder.js` owns pure Loom query projection and local validation; `research-init.js` owns route-local state, live actions, disclosure, execution handoff, and result delivery; `maze/index.html` and `maze.css` own structure/presentation.
- **Consumers:** Loom controls and summary, the sole visible search input, Copy/Open, the existing Maze route-query resolver, Scryfall execution, result status/focus, and mode switching.
- **Changed behavior:** all nine VM-592 Must Fix items listed below.
- **Protected behavior:** Plain Reading and Operator query behavior, query-result execution contract, card/result rendering, Reading Finds, modal, placement/ranking, dossier handoff truth, generated data, and VM-591 runtime dormancy.
- **Realistic failure states:** min MV greater than max MV; unresolved mixed colorless Commander-fit selection; invalid pre-search actions; stale executed query being copied; result destination not visible; dossier context falsely altering filters.
- **Smallest complete implementation:** reuse the existing Maze route shell, builder state, search input, action controls, result infrastructure, handoff reader, shared tokens, and local Mana Font; add only a route-local builder validator.
- **Non-goals:** Loom v1, new query owner, general Maze redesign, graph/recommendation/deckbuilding behavior, semantic-state runtime migration, broad CSS cleanup, or new runtime owner.
- **Stop conditions:** no additional production owner was required. Mixed `C` plus colored pips lacked accepted semantics, so that state was stopped locally and returned to owner judgment instead of inventing a rule.

## Exact files changed

### Product and focused tests

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-builder.js`
- `assets/js/maze/research-init.js`
- `tests/maze/research-builder-tests.js`
- `tests/maze/research-mode-tests.js`
- `tests/maze/maze-search-tests.js`
- `tests/maze/maze-results-layout-tests.js`

### Governance

- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-28-1821-codex-vm592-loom-v0-owner-review.md`

## What changed — nine Must Fix items

1. **Loom purpose and hierarchy:** Active copy now explains that Loom visually shapes a Commander-first Maze/Scryfall query and exposes the actual syntax. Redundant “Query loom” hierarchy was removed.
2. **Construction before execution:** Builder controls now precede the live query and actions in actual DOM/focus order. Desktop and mobile show purpose → context → controls → live query → Search/Reset/Copy/Open → Reading Finds/results.
3. **Commander-first colors:** Default relation is **Fits these Commander colors** and W/U yields `id<=wu`. Printed-color alternatives retain separate player labels and syntax.
4. **Mana Font pips:** WUBRGC controls use the local Mana Font with accessible names, native buttons, `aria-pressed`, non-color check/ring state, visible focus, and measured 44 × 44 targets.
5. **One live query reflection:** Removed the second generated-syntax output. The existing search input is the single visible live query and immediately drives Copy/Open while valid. It does not set `currentQuery`; Search still executes only `MazeQueryResult.query`.
6. **Dossier truthfulness:** Existing handoff context is disclosed as `Dossier context: <name> · not applied to filters`; it does not select colors or change the query.
7. **Semantic grouping and language:** Native fieldsets/legends group Commander colors, card shape/type, and search scope/details. Player copy uses **Mana value**.
8. **Result delivery:** Successful Search announces the count, focuses the results header without losing the query, and scrolls smoothly or instantly under reduced motion. No result-card or Reading Finds redesign was made.
9. **Invalid Loom state:** A route-local validator blocks min MV greater than max MV, preserves values, marks/associates the controls, gives specific guidance, focuses minimum MV on attempted Search, and prevents Scryfall execution.

## Final default W/U query

`id<=wu f:commander`

With the rendered walkthrough’s Creature and Flying additions:

`id<=wu t:creature f:commander kw:flying`

## Colorless `C` disposition and evidence

- Existing accepted behavior for `C` alone is preserved: Commander-fit mode projects to `id:c`; printed-color mode projects to `c:c`.
- `docs/contracts/maze-semantic-state-contract.md` and VM-591 fixtures constrain `[C]` plus identity to exact colorless identity.
- VM-329/VM-331 preserve historical Colorless dossier paths using explicit colorless identity syntax.
- No accepted authority defines mixed `C` plus W/U/B/R/G under the new default `id<=` relation.
- Therefore mixed `C` plus colored pips fails closed before execution with player-facing local guidance. Ordinary W/U/B/R/G operation is unaffected. The owner may later define a mixed rule; VM-592 does not guess one.

## Why it changed

The shipped Loom v0 was causally inverted on mobile, visually disconnected from Vox Mana’s mana language, ambiguous about Commander color meaning, redundant in query display, dependent on executed state for valid actions, and insufficiently truthful about dossier context and local contradictions. The patch corrects those bounded defects through current owners without migrating architecture.

## Decisions made

- Kept the existing search input as the one visible live projection.
- Kept `currentQuery` and `MazeQueryResult.query` as execution/result authority.
- Used a small pure route-local validation helper rather than VM-591 runtime wiring.
- Preserved `C` alone, failed closed for unresolved mixed default behavior, and left printed-color combinations unchanged.
- Included only the cohesive Should Fix of concise Loom/Operator continuity copy and redundant-heading removal; no sigil or refinement guidance was added.

## Risks / uncertainties

- Human judgment remains on visual balance, public wording, and whether the selected-pip treatment feels sufficiently canonical.
- Mixed `C` plus colored Commander-fit semantics remain an explicit owner decision.
- The broad Maze search test file retains an inherited protected Operator assertion mismatch described below.

## RobQAPass readiness

### Change classification

- **QA tier:** QA-4 for the bounded query-meaning default, with QA-3 focus/scroll/state transition, QA-2 form/focus behavior, and QA-1 presentation/accessibility.
- **Changed behavior:** Loom-only query projection, live valid actions, local invalid states, structure/copy, pip presentation, disclosure, and result destination.
- **Protected behavior intentionally untouched:** Plain Reading, Operator execution policy, Maze query-result contract, result cards, Reading Finds, modal, Scryfall adapter, placement/ranking, generated data, and VM-591 runtime.

### Tests selected

| Test | Reason | Result |
|---|---|---|
| `node --check assets/js/maze/research-builder.js` | Builder syntax | PASS |
| `node --check assets/js/maze/research-init.js` | Route syntax | PASS |
| `npm run test:builder` | Default/alternate colors, colorless-alone, ranges, reset projection | PASS — 9 cases |
| `npm run test:mode` | Loom ↔ Operator continuity and leakage protection | PASS — 14 mode + 12 leakage cases |
| `node tests/maze/maze-search-tests.js --vm592-focused` | Live query, Copy/Open before Search, invalid block/recovery, dossier isolation, execution parity, result focus | PASS |
| `node tests/maze/maze-query-contract-tests.js` | Sole executable-query and raw-mode contract protection | PASS |
| `npm run test:maze-results-layout` | DOM order, semantic fieldsets, 44px pips, accepted mobile stack | PASS |
| `npm run lint:js` | Front-end JS source guard | PASS — 31 files |
| `npm run lint:html` | HTML/landmark/Maze validation | PASS |
| `git diff --check` | Whitespace guard | PASS; only expected Windows LF→CRLF notices |
| Rendered desktop walkthrough | Real product hierarchy, controls, actions, invalid state, mode continuity, Scryfall result delivery | PASS |
| Rendered `390 × 844` walkthrough | Overflow, causal order, action stack, pips, focus order | PASS |

### Disclosed inherited broad-test result

`node tests/maze/maze-search-tests.js` exits 1 at the protected Operator assertion that expects `c:r f:commander` while shipped runtime returns `c:r`.

- The assertion dates to May 2026.
- VM-576 commit `8ed9ed6a49665e45b1ff5e1ceedcbceca6be6755` intentionally uses `useFormatDefault: false` for raw mode.
- VM-579 and VM-583 handoffs independently reproduced the same mismatch from exact parent archives.
- VM-592 changes neither that assertion nor protected raw execution behavior. The focused VM-592 cases run separately and pass.

This is treated as an inherited baseline exception, not hidden as a VM-592 pass and not “fixed” by weakening the test or changing protected Operator semantics.

### Tests intentionally skipped

- **`npm test` / unrelated full repository suite:** not justified by the bounded route-local Loom change; it would run unrelated placement, data, and product areas and would not resolve the already documented broad Maze baseline mismatch.
- **CPU-heavy placement, journey, synthetic, mutation, recovery, and certification suites:** no placement, scoring, ranking, qualification, generated artifact, or protected engine changed.
- **Full VM-591 semantic-state suite:** schema/fixtures/runtime dormancy were untouched; the Maze query-contract test is the relevant protection.

### CPU-heavy validation

`NOT REQUIRED`

The changed query rule is pure builder composition with exact deterministic witnesses; no placement/scoring/ranking or engine contract changed.

### Self-QA rendered evidence

| Deterministic case | Viewport | Actual rendered result | Interaction checked | Verdict |
|---|---|---|---|---|
| Cold Loom with existing dossier context | 1440 × 1000 | Purpose, “not applied” disclosure, builder before actions, one live query | Mode activation and top-to-bottom reading | PASS |
| W/U + Creature + Flying | 1440 × 1000 | `id<=wu t:creature f:commander kw:flying` and matching human summary | Pip selection, keyword/type, Copy, Open href | PASS |
| Min 5 / max 2 | 1440 × 1000 | Specific local guidance; Copy/Open disabled; values preserved | Search block and focus to `#cmc-min`; recovery at max 6 | PASS |
| Successful Search | 1440 × 1000 | “Showing 24 of 530 cards”; 24 visible initial cards | Results header focus, deliberate scroll, query preserved | PASS |
| W/U default | 390 × 844 | `id<=wu f:commander`; controls precede stacked actions | Responsive layout and DOM/focus order | PASS |
| Pip sizing/focus | 390 × 844 | all six targets measured 44 × 44; focused pip receives visible 2px/3px outline treatment | Native button focus and selected state | PASS |
| Mixed C + W/U | 390 × 844 | specific unresolved-state guidance; Copy/Open disabled | Fail-closed local guard | PASS |

Evidence files:

- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592/vm592-desktop-loom.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592/vm592-mobile-390x844.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592/vm592-desktop-results.png`

### Manual findings converted to invariants

- **Finding:** mobile actions previously preceded their causes. **Defect class:** causal DOM/order. **Invariant:** builder panel precedes `.search-input-row` and mobile rows remain `max-content`.
- **Finding:** letter-circle mana controls were undersized and color-dependent. **Defect class:** accessible control language. **Invariant:** local `ms-w` through `ms-c` classes, accessible button names, `aria-pressed`, and 44px targets.
- **Finding:** live actions depended on executed `currentQuery`. **Defect class:** stale authority coupling. **Invariant:** valid builder input drives Copy/Open pre-search while execution still resolves `MazeQueryResult.query`.
- **Finding:** contradictory MV could reach execution. **Defect class:** locally knowable invalid state. **Invariant:** min > max blocks fetch, preserves values, associates guidance, and focuses minimum.
- **Finding:** successful results could remain out of view. **Defect class:** destination delivery. **Invariant:** non-append successful render focuses and scrolls to the result header with reduced-motion support.

### Remaining owner judgment

- Does the Loom hierarchy and wording feel coherent with Vox Mana?
- Are the canonical pips, selected check/ring, and focus treatment visually balanced?
- Is the mobile long-form composition acceptable once the causal order is correct?
- Should mixed `C` plus colored pips remain blocked, or should the owner authorize a specific Commander-fit rule in a follow-up?

### RobQA disposition

**READY FOR BOUNDED OWNER REVIEW WITH AN INHERITED BASELINE EXCEPTION DISCLOSED.**

All changed-risk automation and rendered cases are green; no known VM-592 correctness blocker remains. The owner should not be asked to re-prove deterministic query, layout, or accessibility facts. The inherited broad Operator assertion remains separate and must not be silently conflated with this Loom pass.

## Exact Owner Review route and steps

From `C:/dev/voxmana.io`:

`python -m http.server 4174 --bind 127.0.0.1`

Open:

`http://127.0.0.1:4174/maze/`

Shortest bounded review:

1. Select **The Loom**.
2. Select White and Blue; confirm the live query is `id<=wu f:commander` and the summary says **Fits these Commander colors**.
3. Select Creature and add Flying; confirm the query updates immediately.
4. Use Copy before Search and confirm the copied query.
5. Inspect Open in Scryfall before Search; it should carry the same `q` value in a safe `target="_blank" rel="noopener"` link.
6. Search; confirm the result count is announced, results receive focus/scroll, and the Loom query remains available above for refinement.
7. Set minimum mana value to 5 and maximum to 2; confirm specific guidance, blocked Search, preserved values, and focus to minimum. Set maximum to 6 and confirm recovery.
8. Switch Loom → Operator → Loom without editing and confirm query continuity.
9. Select **Exactly these printed colors** and confirm W/U becomes `c=wu` with matching summary, then return to the default.
10. Tab/focus the pips and inspect the visible focus and selected/unselected non-color cues.
11. At `390 × 844`, confirm no horizontal overflow, all builder controls appear before Search/Reset/Copy/Open, and the accepted single-column action stack remains.

For dossier disclosure, open:

`http://127.0.0.1:4174/maze/?from=archscry&fit=JUND&factionName=Jund&readingId=vm592-owner-review&returnUrl=..%2Farchscry%2Findex.html`

Then select The Loom and confirm:

- `Dossier context: Jund · not applied to filters`
- default live query remains `f:commander`
- selecting W/U still yields `id<=wu f:commander`

## Not touched

- Plain Reading query behavior
- Protected Operator query behavior
- `MazeQueryResult.query` contract or `maze-query-core.js`
- Result cards, ranking, Reading Finds, modal, Scryfall adapter
- Archscry handoff application, placement, recommendations, personalization
- Generated data
- VM-591 contract/schema/fixtures/runtime dormancy
- Loom v1, graph, Related Threads
- `docs/research/maze-player-language/corpus/vm578.zip`
- Unrelated untracked corpus contents

## Follow-up recommendations

1. Owner performs only the bounded rendered review above.
2. If accepted, authorize the normal commit/independent review/closeout sequence separately.
3. Resolve the inherited raw-format assertion in its own protected Operator contract task, not inside VM-592.
4. If desired, make an explicit owner decision for mixed `C` plus colored Commander-fit controls before enabling that state.

## Next suggested agent

- **Owner / product reviewer** for the bounded visual and wording judgment.
- After owner acceptance, a fresh **RobQA reviewer** for exact-candidate validation if the repository lifecycle requires it before commit/closeout.

## Related cards, docs, and plans

- VM-592 active card
- VM-590 Loom red-team findings
- VM-591 semantic-state contract/schema `1.0.0`
- VM-583 accepted mobile action stack
- `docs/contracts/maze-query-contract.md`
- `docs/contracts/maze-semantic-state-contract.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
