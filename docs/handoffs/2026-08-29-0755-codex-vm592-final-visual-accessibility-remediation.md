# VM-592 Final Visual / Accessibility Remediation Handoff

## Handoff Summary

- **Agent:** Codex
- **Task requested:** Apply the final bounded VM-592 visual/accessibility polish pass, preserve every accepted Loom behavior and protected Maze boundary, and stop uncommitted at Owner Re-Review.
- **Related card:** [VM-592 — The Loom v0 Usability, Intent, and Product-Alignment Pass](../kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md)
- **Baseline SHA:** `93dd5486cb8ac75eb4f6899c99d4aeb41447d73b`
- **Branch / divergence:** `main`, `0/0` against `origin/main`
- **Current disposition:** **READY FOR FINAL OWNER RE-REVIEW.** VM-592 remains In Progress and uncommitted.
- **Governance applied:** repo-local `robdev` and `robqa`, with `docs/dev/RobDevPass.md` and `docs/qa/RobQAPass.md` as frozen gates.

## Files Reviewed

- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- all prior VM-592 handoffs
- `docs/kanban/board.md`
- the active VM-592 card
- VM-590 Loom findings/handoff
- VM-591 contract/schema `1.0.0`
- current Maze query and route-ownership documentation
- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-builder.js`
- `assets/js/maze/research-init.js`
- focused Maze tests
- `assets/vendor/mana/css/mana.min.css`
- current repository usage of Mana, Keyrune, metallic/glow, selected, and focus treatments

## Files Changed From the VM-592 Baseline

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-builder.js`
- `assets/js/maze/research-init.js`
- `tests/maze/research-builder-tests.js`
- `tests/maze/research-mode-tests.js`
- `tests/maze/maze-search-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-08-28-1659-codex-vm592-story-registration.md`
- `docs/handoffs/2026-08-28-1821-codex-vm592-loom-v0-owner-review.md`
- `docs/handoffs/2026-08-28-2313-codex-vm592-owner-review-remediation.md`
- `docs/handoffs/2026-08-28-2345-codex-vm592-second-owner-rereview-remediation.md`
- `docs/handoffs/2026-08-29-0755-codex-vm592-final-visual-accessibility-remediation.md`

The untracked `docs/research/maze-player-language/corpus/` tree is unrelated concurrent work and was not touched. Its protected owner archive `docs/research/maze-player-language/corpus/vm578.zip` remains present at 87,977 bytes with timestamp `2026-08-22 08:35:12`.

## RobDev Compact Transfer Packet

- **Owning authority:** the registered VM-592 card and final Owner Re-Review disposition; VM-590, VM-591 `1.0.0`, VM-583 mobile treatment, current Maze query contract, and route ownership remain constraints.
- **Owning producers:** `research-builder.js` remains the builder query producer; `research-init.js` remains route state/action/presentation ownership; `MazeQueryResult.query` remains the sole executable query; `maze/index.html` and `maze.css` own route-local presentation.
- **Changed behavior:** passive desktop Current Weave; verified local Mana reinforcement for types, governed abilities, and rarity; keyboard-complete governed ability autocomplete; completed native relation disclosure keyboard behavior; premium non-color-only rarity states; one visible Reset Loom.
- **Protected consumers/contracts:** Plain Reading, Operator Hand, Loom/Operator continuity, `MazeQueryResult.query`, result cards, Reading Finds, modal, Archscry handoff, Scryfall execution, dossier truth, accepted Commander/colorless syntax, and VM-591's dormant runtime boundary.
- **Reuse-first decision:** used existing builder state, query projection, action controls, vendored Mana v1.18.0, native `details`/`summary`, local tokens, and result metadata. No new query owner, asset, dependency, framework, state model, or generalized picker was introduced.
- **Primary risks:** presentation accidentally writing query state; ARIA semantics exceeding behavior; icon class mismatch; mobile regression; duplicate reset behavior; rarity selection communicated only through color.
- **Mitigation:** Current Weave presenter is read-only and statically/dynamically tested; exact vendored classes were verified; keyboard paths were automated and rendered; selection includes persistent text and check states; the generic builder Clear action is hidden only in Loom.
- **Non-goals maintained:** no Loom v1, graph, preview, recommendation, ranking, deckbuilding, mechanics taxonomy, semantic-state runtime migration, result redesign, Operator correction, or Keyrune addition.
- **Stop condition:** Owner Re-Review. No commit, push, Done transition, or follow-on story.

## Final Implementation

### Local asset authority

The only reused icon asset is checked-in Mana Font v1.18.0 at `assets/vendor/mana/css/mana.min.css`. Keyrune is not vendored and was not added. No CDN, hotlink, or new asset was required.

### Card Type mapping

| Type | Verified Mana class |
| --- | --- |
| Creature | `ms-creature` |
| Instant | `ms-instant` |
| Sorcery | `ms-sorcery` |
| Artifact | `ms-artifact` |
| Enchantment | `ms-enchantment` |
| Land | `ms-land` |
| Planeswalker | `ms-planeswalker` |
| Battle | `ms-battle` |

Every control keeps visible text; glyphs are `aria-hidden` reinforcement only.

### Ability mapping

| Ability | Verified Mana class |
| --- | --- |
| Flying | `ms-ability-flying` |
| Haste | `ms-ability-haste` |
| Vigilance | `ms-ability-vigilance` |
| Trample | `ms-ability-trample` |
| Deathtouch | `ms-ability-deathtouch` |
| Lifelink | `ms-ability-lifelink` |
| Ward | `ms-ability-ward` |
| Hexproof | `ms-ability-hexproof` |
| First strike suggestion | `ms-ability-first-strike` |

Other governed keywords remain text-only when no exact local mapping was established. Icon availability did not change the governed keyword catalog or query authority.

### More Abilities keyboard behavior

- Input uses a real combobox/listbox relationship with `aria-expanded`, `aria-controls`, `aria-autocomplete`, `aria-haspopup`, and active option exposure through `aria-activedescendant`.
- Typing filters the existing governed `keywordAbilities` catalog.
- ArrowDown/ArrowUp move within boundaries; Enter chooses the active option.
- Direct valid Enter, comma, Add, and multiword commits remain supported.
- Escape closes suggestions without changing current selections and retains input focus.
- Pointer/touch option selection remains available.
- All entry paths write the same existing `bFilters.keywords` collection and prevent duplicates.

### Rarity system

All four controls reuse the verified generic `ms-rarity` glyph with persistent Common/Uncommon/Rare/Mythic text. Common uses restrained gunmetal, Uncommon cool silver, Rare warm gold, and Mythic copper/ember. Selected states add a check marker, tint, border, and restrained inner light; keyboard focus uses a separate high-contrast focus ring. No set symbol or continuous animation is used.

### Reset disposition

`#builder-reset-btn` calls `resetBuilderFilters`. In Loom, the generic `#clear-search-btn` also ultimately calls `resetBuilderFilters`, so it was not a distinct Clear Results action. The generic Clear action is hidden only in Loom; one visible **Reset Loom** remains. Plain Reading and Operator Hand retain their generic Clear action and behavior.

### Current Weave

The desktop-only read-only aside reflects:

- selected Commander colors/relation or Colorless only;
- Exclude colorless;
- selected card types;
- selected governed abilities;
- format;
- mana-value bounds;
- rarity;
- local validation state;
- completed result count only while it still matches the current builder projection.

It shows a neutral or restrained identity-responsive accent, semantic text, constraint count, readiness, invalid summary, and current result count. At `<=820px` it is omitted so the accepted mobile construction/action flow remains clear.

`renderCurrentWeave` reads `bFilters`, the already-produced projection, validation, and matched result metadata. It contains no `bFilters` assignments, does not write the search input, never calls the builder, and has no execution path. Static layout tests assert the aside has no buttons/inputs and the presenter has no builder/query writes; runtime tests compare the query before and after direct presentation rendering.

## RobQA Disposition

- **Risk class:** QA-2 interaction/presentation change plus QA-1 styling, with protected query/result/runtime contracts explicitly held fixed.
- **Automation posture:** smallest deterministic suites covering changed behavior plus adjacent Maze contracts; no CPU-heavy or unrelated broad suite was justified.
- **Owner judgment remaining:** visual balance, premium feel, terminology, and acceptance of the final rendered composition only.

### Deterministic tests run

- `node tests/maze/research-builder-tests.js` — PASS, 11 cases
- `node tests/maze/maze-search-tests.js --vm592-focused` — PASS
- `node tests/maze/research-mode-tests.js` — PASS, 14 mode + 12 leakage cases
- `node tests/maze/maze-results-layout-tests.js` — PASS
- `node tests/maze/maze-query-contract-tests.js` — PASS
- `node --check assets/js/maze/research-init.js` — PASS
- `npm.cmd run lint:js` — PASS, 31 files
- `npm.cmd run lint:html` — PASS
- `git diff --check` — PASS; only repository line-ending conversion warnings were emitted

### Inherited Operator exception

The broad unfiltered `node tests/maze/maze-search-tests.js` command retains the already documented inherited Operator assertion mismatch: current protected runtime output is `c:r`, while the stale assertion expects `c:r f:commander`. VM-592 did not modify or weaken that assertion, and the focused VM-592 path remains green.

## Rendered QA

### Desktop — `1440 × 1000`

PASS:

- empty and populated Loom use the desktop workspace purposefully without stretching controls into equal-height panels;
- W/U renders `Azorius fit`, persistent W/U pips, and `id<=wu` semantics;
- type, common ability, autocomplete ability, Rare, and Mythic selections are legible and scan quickly;
- the long query wraps inside the one authoritative live reflection;
- Copy matched the valid query before Search and Open exposed the matching Scryfall URL before Search;
- the populated search returned 704 cards, Current Weave showed that count, and the query remained available for refinement; a subsequent W/U Exclude-colorless search exposed **9,942 cards found / View Results**, and activating it moved focus to the results header;
- the 5/2 mana-value contradiction stayed local, preserved values, focused `#cmc-min`, and recovered after changing maximum to 7;
- Colorless only rendered `id:c f:commander` and W/U Exclude colorless rendered `id<=wu -id:c f:commander`;
- relation ArrowDown opened and focused the selected option, arrow navigation moved predictably, and Escape closed unchanged with focus back on the summary;
- no browser runtime errors were reported.

Evidence:

- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-final-desktop-empty.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-final-desktop-combobox.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-final-desktop-populated.png`

### Mobile — `390 × 844`

PASS:

- `scrollWidth === clientWidth === 375` CSS pixels inside the captured 390px browser viewport; no horizontal overflow;
- construction precedes the live query/actions in actual DOM and visual order;
- Current Weave is omitted;
- WUBRG targets are exactly 44 × 44 and Colorless only is larger;
- type/ability icon + text controls remain usable, and rarity wraps legibly;
- autocomplete opens within the viewport, active options remain 44px high, Escape closes and retains focus/text;
- relation disclosure opens fully within the viewport and Escape returns focus to its summary;
- Search/Copy/Open/Reading Finds retain the accepted single-column action treatment;
- exactly one Reset Loom is visible;
- no browser runtime errors were reported.

Evidence:

- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-final-mobile-390x844.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-final-mobile-combobox-visible.png`
- `C:/Users/obake/.codex/visualizations/2026/08/28/01a04aca-b443-7813-9cfa-fb0d9602cf59/vm592-final-mobile-relation-visible.png`

## Not Touched

- Plain Reading semantics
- Operator Hand semantics or inherited assertion
- `MazeQueryResult.query` ownership
- result cards, ranking, Reading Finds, modal, or Archscry handoff
- placement, recommendations, or generated data
- VM-591 contract/schema/runtime boundary
- Loom v1 or graph surfaces
- Keyrune or any external asset/dependency
- unrelated player-language corpus
- `vm578.zip`

## Risks / Uncertainties

No known VM-592 correctness or accessibility blocker remains. Owner judgment is still required for the final visual feel and balance. The inherited Operator assertion remains a separate protected-baseline issue.

## Follow-up Recommendations

1. Owner performs the short deterministic local walkthrough below and accepts or returns only concrete final product-judgment findings.
2. Do not fix the inherited Operator assertion inside VM-592.
3. Do not start Loom v1 or VM-591 runtime work from this handoff.

## Local Owner Review Steps

1. From the repository root, serve the site locally, for example `python -m http.server 4173`.
2. Open `http://localhost:4173/maze/` and choose **The Loom**.
3. At `1440 × 1000`, inspect the empty Current Weave, choose W/U, Creature, Flying, Rare, and Mythic, then open More abilities, type `strike`, use arrows, and commit First strike with Enter.
4. Confirm the visible query is `id<=wu t:creature f:commander (r:r OR r:m) (kw:flying OR kw:"first strike")`; Copy and Open are available before Search.
5. Search, confirm the result count appears in Current Weave and View Results remains reachable, then refine without losing the query.
6. Enter mana values 5 and 2, confirm local blocking/focus, then change maximum to 7.
7. Reset, select Colorless only, and confirm `id:c f:commander`; reset, choose W/U plus Exclude colorless and confirm `id<=wu -id:c f:commander`.
8. Exercise relation ArrowDown/ArrowUp/Escape and pointer selection.
9. At `390 × 844`, confirm no overflow, Current Weave omitted, 44px pips, usable type/ability/rarity controls, autocomplete and relation disclosure, and construction before the single-column actions.
10. Switch Loom → Operator → Loom and verify the live query remains continuous.

## Next Suggested Agent

Owner Reviewer for final VM-592 visual/product acceptance. Stop here until the owner provides disposition.
