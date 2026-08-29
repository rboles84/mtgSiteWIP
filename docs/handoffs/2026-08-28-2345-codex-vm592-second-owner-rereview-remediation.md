# VM-592 Second Owner Re-Review Remediation Handoff

## Agent name

Codex

## Task requested

Apply the second bounded VM-592 Owner Re-Review visual/interaction remediation while preserving the already accepted Loom architecture, query behavior, Commander/colorless semantics, validation, dossier disclosure, result delivery, mobile causal order, and protected Maze runtime boundaries. Stop uncommitted at Owner Re-Review.

## Baseline and local state

- Baseline SHA: `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b`
- Branch/worktree: the existing single `main` worktree at `C:/dev/voxmana.io`
- Divergence: no upstream divergence was observed in pre-flight; no branch or worktree was created.
- VM-592 remains In Progress.
- VM-591 remains Done at contract/schema `1.0.0` with no runtime migration.
- `docs/research/maze-player-language/corpus/vm578.zip` remained untouched at 87,977 bytes with the same `2026-08-22 08:35:12` timestamp.
- No commit or push was made.

## Files reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-28-2313-codex-vm592-owner-review-remediation.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
- `docs/architecture/route-ownership-matrix.md`
- current Maze HTML, CSS, Loom state/action owner, query builder, governed keyword catalogs, and focused tests
- current repository disclosure, menu, dropdown, autocomplete, and focus patterns

## Files changed in this second remediation

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `tests/maze/maze-search-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- `docs/kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-28-2345-codex-vm592-second-owner-rereview-remediation.md`

The cumulative uncommitted VM-592 work also includes the prior accepted-pass changes in `assets/js/maze/research-builder.js`, `tests/maze/research-builder-tests.js`, and `tests/maze/research-mode-tests.js`, plus the three earlier VM-592 handoffs. Those were not reopened outside this bounded delta.

## RobDev compact packet

### Product outcome and owning layer

The Loom now reads as one coherent desktop composer: **Colors**, **Card Type**, **Abilities**, **Refine**, the live query, then actions. Route-local HTML/CSS own composition and presentation; `research-init.js` continues to own Loom filter state and UI actions; `research-builder.js` and `MazeQueryResult.query` remain the query projection/execution authorities.

### Existing machinery reused

- existing native `<details>/<summary>` disclosure pattern for the color-relation selector and More abilities;
- existing action-button delegation, focus handling, `aria-pressed`, keyword chip state, and local parser/grounding loads;
- existing `grounding.catalogs.keywordAbilities` as the governed inventory for More abilities;
- existing eight top-level card types and `kw:` query projection;
- existing Maze result-delivery, mode-continuity, dossier, sidebar, mobile action, and query-action infrastructure.

### Changed behavior

- Loom construction/query/action maximum width increased from 1080px to 1200px; results and the page shell were not widened.
- Desktop changed from two columns to four full-width causal sections with quieter top separators and compact internal rows.
- Visible redundant `WUBRG`, `Colorless`, `Color relation`, and `Type` micro-labels were removed. Accessible names remain.
- Colorless only is visibly separated by a divider, dashed neutral treatment, and its label; when active it hides the WUBRG-only relation/exclusion row. Its accepted `id:c` behavior is unchanged.
- The visible native select was replaced with a native disclosure and four ordinary buttons. Closed label: **Fits Commander colors**. It supports pointer/touch, native summary keyboard activation, focus-visible states, explicit `aria-pressed`, Escape close/focus restoration, outside close, and selected-state checkmark.
- All eight existing top-level type chips remain directly visible. No ungoverned More types inventory was added.
- Added a first-class Abilities section with Flying, Haste, Vigilance, Trample, Deathtouch, Lifelink, Ward, and Hexproof controls.
- More abilities uses the checked-in governed keyword-ability catalog, existing autocomplete/Add/Enter/comma/multiword behavior, and removable additional chips. Keyword actions/mechanics such as Investigate are not offered or committed as abilities; unsupported input is preserved with local guidance.
- Refine now contains only Format, Mana value, and Rarity in one compact desktop row.
- The Loom mode-card copy now names abilities rather than exposing generic keywords.

### Protected behavior

- default W/U remains `id<=wu f:commander`;
- exact printed colors remain `c=wu f:commander`;
- Colorless only remains `id:c`; selecting W/U/B/R/G replaces C rather than mixing it;
- explicit WUBRG colorless exclusion remains `id<=COLORS -id:c`;
- dossier context remains disclosure-only;
- valid Copy/Open-before-Search, local MV validation, result delivery, Loom/Operator continuity, Plain Reading, Operator Hand, sidebar restoration, Reading Finds, modal, result cards, Scryfall execution, placement/ranking, VM-591, and Loom v1 boundaries remain unchanged.

### Non-goals and stop conditions held

No new query owner, framework, custom ARIA listbox, general mechanics picker, card-type taxonomy, result redesign, Operator correction, semantic-state runtime, graph/Loom v1 work, data change, branch, commit, push, or Done transition was introduced.

## Decisions made

1. Reuse the native disclosure pattern rather than the route-specific navigation menu or a speculative listbox. This provides a safe accessible selector without pretending to implement listbox arrow-key semantics.
2. Do not add More types. The repository has the eight safe top-level types but no accepted player-facing inventory that cleanly separates types, supertypes, subtypes, and card forms.
3. Use only `catalogs.keywordAbilities` for More abilities. Existing keyword actions and ability words remain valid elsewhere in Plain Reading/compiler ownership but are not presented as Loom abilities.
4. Common ability controls and additional removable chips share the existing `bFilters.keywords`; no second query or state owner was created.

## Risks / uncertainties

- Final optical preference for the 1200px width, separator density, popup styling, and chip density remains owner judgment.
- More types is intentionally deferred until a governed taxonomy and query-language decision exists.
- The broad `maze-search-tests.js` command has the already disclosed inherited Operator assertion mismatch (`c:r` versus stale `c:r f:commander`). This bounded remediation did not change or weaken that protected assertion; the VM-592 focused path is green.

## RobQA disposition

### Change classification

- QA tier: QA-2 component interaction with QA-1 visual composition and responsive presentation.
- CPU-heavy validation: `NOT REQUIRED`; placement, ranking, query core, generated data, and shared semantic runtime were not changed.

### Tests run

- `node tests/maze/research-builder-tests.js` — PASS, 11 cases.
- `node tests/maze/maze-search-tests.js --vm592-focused` — PASS.
- `node tests/maze/research-mode-tests.js` — PASS, 14 mode and 12 leakage cases.
- `node tests/maze/maze-query-contract-tests.js` — PASS.
- `node tests/maze/maze-results-layout-tests.js` — PASS.
- `node --check assets/js/maze/research-init.js` — PASS.
- `npm run lint:js` — PASS for 31 files.
- `npm run lint:html` — PASS.
- `git diff --check` — PASS; only existing line-ending conversion warnings were emitted.

### Rendered self-QA evidence

#### Desktop — 1440 × 1000

- builder and live-query/action regions both measured exactly 1200px wide and centered;
- section order was Colors → Card Type → Abilities → Refine;
- each section measured 1166px inner width;
- all W/U/B/R/G targets measured 44 × 44;
- only Format, Mana value, and Rarity remained as visible micro-labels;
- the relation owner rendered as native `DETAILS`, closed as **Fits Commander colors**;
- real pointer selection changed W/U from `id<=wu ...` to `c=wu ...`, updated the closed label to **Exactly these printed colors**, marked only `c` selected, and restored focus to the trigger;
- real keyboard activation plus Escape closed the disclosure and restored focus to `#color-relation-trigger`;
- Haste plus typed First strike produced `(kw:haste OR kw:"first strike")`; toggling Haste again removed it;
- no browser console warnings or errors were present.

#### Mobile — 390 × 844

- document/client width was 375px inside the 390px viewport with no horizontal overflow;
- construction ended at y=953.5 and the action region began at y=966.3;
- section order remained Colors → Card Type → Abilities → Refine;
- all pips remained 44 × 44;
- Search, Reset, Copy, Open in Scryfall, and Reading Finds each measured 297px and retained the accepted full-width action stack;
- W/U + Flying reflected `id<=wu f:commander kw:flying`;
- dossier disclosure read `Jund dossier context available · not applied to filters`;
- the 320px relation popup stayed within the 390px viewport (`left 41.6`, `right 361.6`);
- no browser console warnings or errors were present.

#### Result delivery protection

- live Search returned `1,789 cards found` for `id<=wu f:commander kw:flying`;
- Search focus remained on `#search-btn` and the query stayed intact;
- explicit View results moved focus to `#results-header` and made the result destination visible.

#### Governed ability guard

- typed `investigate` was preserved for correction;
- it did not alter `f:commander`, was not offered as an ability suggestion, set `aria-invalid="true"`, and displayed `Choose a supported keyword ability.`

### Manual findings converted to invariants

- desktop column imbalance → Loom semantic sections are full-width in causal order and the builder grid has one column;
- redundant visual labels → only meaningful Refine labels remain visible; semantic control names remain accessible;
- unsafe/native selector concern → color relation uses a native disclosure with ordinary buttons, Escape/focus restoration, and one selected state;
- buried keywords → governed common abilities are first-class and additional true keyword abilities remain discoverable/removable;
- mechanics conflation → More abilities consumes only the governed keyword-ability catalog and fails closed on actions/mechanics.

### Tests intentionally skipped

- broad placement/journey/synthetic/mutation/recovery suites: no protected decision logic changed;
- full unfiltered `maze-search-tests.js`: the focused VM-592 route covers the changed interaction while the broad command retains the separately disclosed inherited Operator assertion.

### RobQA result

`READY FOR BOUNDED OWNER RE-REVIEW`, with only final visual/product judgment remaining.

## Not touched

Plain Reading, Operator Hand semantics, query core/execution authority, result cards, Reading Finds, modal, Archscry handoff truth, placement, recommendations/ranking, generated data, VM-591 schema/runtime boundary, Loom v1/graph surfaces, and `vm578.zip`.

## Follow-up recommendations

Owner should judge only desktop visual balance/density, mobile polish, the relation disclosure feel, and the common/More ability composition. If additional type discoverability is wanted, register a separate taxonomy/product-language decision before implementation.

## Owner Re-Review route and steps

1. Start a local server from the repository, for example `python -m http.server 4173`.
2. Open `http://localhost:4173/maze/` and select **The Loom**.
3. At 1440 × 1000, inspect Colors, Card Type, Abilities, Refine, Live Scryfall query, and actions in order.
4. Select W + U, Creature, Haste, then open More abilities and add `first strike`. Confirm `id<=wu t:creature f:commander (kw:haste OR kw:"first strike")`.
5. Open **Fits Commander colors**, use Escape, reopen, and choose **Exactly these printed colors**. Confirm the label/query change and focus restoration.
6. Toggle Haste off. Confirm the selected ability is removed from the query.
7. Select **Colorless only**. Confirm `id:c...`, no mixed pips, and no WUBRG relation/exclusion controls. Select W to confirm it replaces Colorless.
8. Open `http://localhost:4173/maze/?from=archscry&fit=JUND&factionName=Jund&readingId=vm592-review`, choose Loom, and confirm the context says it is not applied.
9. At 390 × 844, confirm no horizontal overflow, 44px pips, construction before the full-width action stack, and usable relation/More disclosures.
10. Search a valid query and use **View results**; confirm focus/destination delivery and preserved query.

## Next suggested agent

Owner re-review only. Do not begin Loom v1, semantic-state runtime work, or a new implementation pass without a new owner disposition.

## Related Kanban card, docs, or plans

- VM-592
- VM-590
- VM-591
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
