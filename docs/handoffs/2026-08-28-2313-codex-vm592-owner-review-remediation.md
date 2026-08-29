# VM-592 Bounded Owner Review Remediation — Owner Re-Review

## Handoff identity

- **Agent name:** Codex (`/root`)
- **Task requested:** Apply only the registered VM-592 Owner Review corrections, rerun focused deterministic and rendered QA, and stop at Owner Re-Review without commit, push, Done, Loom v1, or VM-591 runtime migration.
- **Related Kanban card:** [VM-592 — The Loom v0 Usability, Intent, and Product-Alignment Pass](../kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md)
- **Baseline SHA:** `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b`
- **Branch / worktree:** `main`; the existing single worktree at `C:/dev/voxmana.io`; pre-flight divergence 0/0.
- **Owner input:** First implementation direction accepted; disposition **NEEDS REVISION** with a bounded remediation list.
- **Current disposition:** **READY FOR BOUNDED OWNER RE-REVIEW WITH AN INHERITED OPERATOR BASELINE EXCEPTION DISCLOSED.** VM-592 remains In Progress and uncommitted.

## Files reviewed

- `AGENTS.md`, `CLAUDE.md`
- Repo-local RobDev and RobQA skills, usage guides, and frozen passes
- VM-592 active card and first-pass handoff
- VM-590 findings and VM-591 schema/contract `1.0.0`
- Maze query contract and route ownership docs
- Current Maze HTML, CSS, builder, route adapter, focused tests, Mana Font usage, board, and handoff index
- Owner Review remediation text supplied on 2026-08-28

## Exact files changed from the VM-592 baseline

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
- `docs/handoffs/2026-08-28-1659-codex-vm592-story-registration.md`
- `docs/handoffs/2026-08-28-1821-codex-vm592-loom-v0-owner-review.md`
- `docs/handoffs/2026-08-28-2313-codex-vm592-owner-review-remediation.md`

## RobDev compact packet

- **Owning authority:** the VM-592 card plus the explicit bounded Owner Review disposition; VM-590, VM-591 `1.0.0`, the Maze query contract, route ownership, and VM-583 remain constraints.
- **Owning seams:** `research-builder.js` owns pure builder projection/validation; `research-init.js` owns route-local state/actions/disclosure/result delivery; HTML/CSS own structure and presentation.
- **Changed behavior:** purpose hierarchy, centered workspace, semantic grouping, compact relation/format controls, keyword commit, live-query presentation, result delivery, reset feedback, validation placement, dossier disclosure, Loom-only sidebar controls, Loom empty state, and colorless/exclusion behavior.
- **Consumers:** Loom controls, one search textarea projection, Copy/Open, existing `MazeQueryResult.query` execution, result count/status, sidebar mode state, and Archscry handoff disclosure.
- **Protected behavior:** Plain Reading, Operator execution semantics, `MazeQueryResult.query`, result cards/ranking, Reading Finds, modal, Scryfall adapter, Archscry handoff application, placement/recommendation, generated data, VM-591 dormancy, and Loom v1/graph surfaces.
- **Failure states:** uncommitted keyword text, min MV greater than max MV, mixed C+WUBRG state, stale pre-search actions, false dossier application, lost Search focus, or duplicate sidebar/live-query authority.
- **Smallest complete implementation:** reuse current controls and route owners; add no framework, runtime owner, query owner, taxonomy, or semantic-state wiring.
- **Stop conditions:** no additional owner was needed. Mixed C+WUBRG is prevented across all relations; no ambiguous syntax is emitted.

## What changed

1. The active hierarchy is **The Loom** → **Shape a Commander search** → “Choose what you want. The Loom builds the Scryfall query as you refine it.”
2. The Loom panel and action region use a centered 1080px route-local maximum width; results remain on the existing layout.
3. Commander-color relation and Format remain compact native selects. The permanent default-explanation sentence is removed.
4. `#builder-summary` is screen-reader-only. The search textarea is the sole visible projection and is labeled **Live Scryfall query** without the decorative equals sign.
5. Groups are **Commander colors**, **Card type**, and **Refine**; Refine owns Format, Mana value, Rarity, and Keywords.
6. Keyword text commits by explicit **Add**, Enter, or comma. `haste` becomes `kw:haste`; `first strike` remains one chip and emits `kw:"first strike"`.
7. Search no longer targets or scrolls results. The initiating Search button regains focus with `preventScroll`; a visible count and explicit **View results** provide deliberate delivery.
8. Reset does not call a visual toast. Its acknowledgment remains screen-reader-only.
9. Invalid MV shows one specific message inside Refine; no generic second warning appears.
10. Dossier context appears beside the Loom purpose as `<name> dossier context available · not applied to filters` and never changes filters/query.
11. Sidebar **By Color** and **Format** are hidden only in Loom and restored in Plain/Operator.
12. Loom first-load/reset says: “Build a query above, then Search to see matching cards.”
13. WUBRG pips remain canonical 44×44 native buttons. **Colorless only** is a separate mutually exclusive native button.
14. `C` alone remains `id:c`. Selecting WUBRG replaces Colorless only; selecting Colorless only clears WUBRG. Mixed C syntax cannot be produced under any relation.
15. For Commander-fit WUBRG, **Exclude colorless cards** adds the live-probed `-id:c` fragment. Changing to a printed-color relation clears and hides the exclusion.

## Colorless live-probe decision and evidence

The owner-proposed syntax was tested live on Scryfall before implementation:

- `id<=br -id:c f:commander` — accepted; 9,992 cards; Scryfall described BR-or-within, excluding colorless identity, Commander legal.
- `name:"Terminate" id<=br -id:c f:commander` — positive colored control retained Terminate (and Exterminate!).
- `!"Sol Ring" id<=br f:commander` — baseline colorless control returned Sol Ring.
- `!"Sol Ring" id<=br -id:c f:commander` — negative control returned 0 cards.

**Frozen disposition:** default W/U remains `id<=wu`; optional exclusion produces `id<=wu -id:c`; Colorless only produces `id:c`; no `id<=wc` or mixed printed-color C state can be generated.

## RobQA readiness

- **Classification:** QA-4 bounded query meaning, QA-3 navigation/focus, QA-2 form semantics, QA-1 visible presentation.
- **Manual finding → invariant:** keyword text needs an explicit commit; Add/Enter/comma now produce one or more chips and live syntax, with `haste` and multiword regression witnesses.
- **Manual finding → invariant:** results may not steal viewport/focus; render paths contain no automatic delivery call, Search regains focus, and only View results invokes reduced-motion-aware focus/scroll.
- **Manual finding → invariant:** duplicate sidebar controls must be absent in Loom and restored elsewhere; focused mode tests assert both states.
- **Manual finding → invariant:** C is not a sixth Commander-fit color; UI mutual exclusion plus pure validation/build guards prevent mixed syntax.
- **CPU-heavy validation:** `NOT REQUIRED`; no placement, ranking, scoring, generated artifact, or engine owner changed.

## Tests run

| Command / check | Result |
|---|---|
| `node tests/maze/research-builder-tests.js` | PASS — 11 cases including W/U, alternate relation, C alone, exclusion, haste, multiword, MV |
| `node tests/maze/maze-search-tests.js --vm592-focused` | PASS |
| `node tests/maze/research-mode-tests.js` | PASS — 14 mode + 12 leakage cases |
| `node tests/maze/maze-query-contract-tests.js` | PASS |
| `node tests/maze/maze-results-layout-tests.js` | PASS |
| `npm run lint:js` | PASS — 31 files |
| `npm run lint:html` | PASS |
| `git diff --check` | PASS; only expected Windows LF→CRLF notices |
| `node tests/maze/maze-search-tests.js` | Inherited baseline exception only: line 557 expects `c:r f:commander`, protected runtime returns `c:r` |

The broad Operator assertion is unchanged and was not weakened. VM-592 focused cases pass independently.

## Rendered self-QA

### Desktop — 1440 × 1000

- PASS: centered purpose hierarchy, dossier disclosure, canonical pips, semantic groups, compact selects, one live query, pre-search Copy/Open, explicit keyword Add, quoted multiword keyword, and no duplicate Loom sidebar controls.
- PASS: W/U + Creature + haste + first strike produced `id<=wu t:creature f:commander (kw:haste OR kw:"first strike")`; alternate exact printed relation produced `c=wu ...`; Copy matched the live query.
- PASS: Search returned 162 cards in the final walkthrough, restored focus to `#search-btn`, preserved the query, showed `162 cards found`, and exposed **View results** without automatic result targeting.
- PASS: min 5 / max 2 showed only the Refine-local specific message and disabled Copy/Open while preserving values.
- PASS: Colorless only rendered `id:c f:commander`; W/U + exclusion rendered `id<=wu -id:c f:commander`.

### Mobile — 390 × 844

- PASS: measured `390 × 844`; document `scrollWidth` equaled `clientWidth` (375px content area), so no horizontal overflow.
- PASS: builder bottom preceded action-region top; Search/Reset/Copy/Open/Reading Finds retained the accepted single-column order.
- PASS: all five WUBRG pip controls measured 44 × 44; native buttons expose accessible labels/pressed state and a visible focus outline.
- PASS: Loom sidebar color/format controls remained hidden; Operator restored both and Loom hid them again without changing `id:c f:commander`.
- PASS: captured W/U exclusion action stack and separate Colorless-only selection.

Evidence directory:

`C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-rereview/`

Key files:

- `desktop-1440x1000-hierarchy.png`
- `desktop-1440x1000-query-results.png`
- `desktop-invalid-mana-value.png`
- `desktop-colorless-only.png`
- `desktop-wu-exclude-colorless.png`
- `mobile-390x844-hierarchy.png`
- `mobile-390x844-wu-exclude-actions.png`
- `mobile-390x844-colorless-only.png`

## Should Fix items included

- Simplified redundant active hierarchy.
- Retained Loom ↔ Operator continuity through the existing mode seam.
- Added narrow Loom-specific empty-state guidance.

No new sigil, taxonomy expansion, recommendation, graph, or refinement system was added.

## Risks / uncertainties

- Remaining owner judgment is limited to visual balance, copy tone, and whether the compact grouping feels right in the real product.
- The inherited protected Operator-format assertion remains a separate contract task.
- The in-app browser keyboard driver exposed the native focus outline but did not synthesize native button activation from its Enter command; the controls are real `<button>` elements with standard keyboard semantics, and Owner Re-Review should include one manual Tab + Enter activation.

## Not touched

- Plain Reading or protected Operator execution behavior
- `MazeQueryResult.query` or `maze-query-core.js`
- Result cards/ranking, Reading Finds, modal, Scryfall adapter
- Archscry handoff application, placement, recommendations, personalization
- Generated data, VM-591 contract/schema/runtime boundary
- Loom v1, graph surfaces, Related Threads
- `docs/research/maze-player-language/corpus/vm578.zip` or unrelated corpus contents

## Exact Owner Re-Review page and steps

From `C:/dev/voxmana.io`:

`python -m http.server 4175 --bind 127.0.0.1`

Open the dossier-context route:

`http://127.0.0.1:4175/maze/?from=archscry&fit=JUND&factionName=Jund&readingId=vm592-owner-rereview&returnUrl=..%2Farchscry%2Findex.html`

1. Select **The Loom**. Confirm the three-line purpose hierarchy and `Jund dossier context available · not applied to filters`.
2. Confirm sidebar By Color/Format are absent in Loom. Switch to Operator and back; confirm they restore/hide and the live query survives.
3. Select W + U; confirm `id<=wu f:commander`.
4. Select Creature, enter `haste`, click **Add**, then enter `first strike` and press Enter. Confirm two chips and quoted multiword syntax.
5. Use Copy and inspect Open in Scryfall before Search; both must carry the same live query.
6. Switch to **Exactly these printed colors** and confirm `c=wu`; return to **Fits these Commander colors**.
7. Search. Confirm focus remains on Search, a nearby count appears, and results do not move into view until **View results** is activated.
8. Set mana value min 5 / max 2. Confirm one Refine-local message, preserved values, blocked Search, and recovery after max 6.
9. Reset, select **Colorless only**, and confirm `id:c f:commander`.
10. Select W + U, check **Exclude colorless cards**, and confirm `id<=wu -id:c f:commander`.
11. At `390 × 844`, confirm no horizontal overflow, 44px pips, builder-before-actions, and the single-column action stack. Tab to a pip and activate it with Enter.

## Follow-up recommendations

1. Owner performs only the bounded re-review above.
2. If accepted, authorize commit/exact-candidate independent RobQA/closeout separately under repository governance.
3. Keep the inherited Operator assertion and any future mixed-color taxonomy work out of VM-592.

## Next suggested agent

- **Owner / product reviewer** for bounded Owner Re-Review.
- After acceptance, a fresh **RobQA reviewer** if exact-candidate lifecycle review is required.
